import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

const VALID_ROLES = new Set(["parent", "tutor", "student"]);
const FRESH_PROFILE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

// Only honour same-origin relative redirect targets (audit L1). An absolute or
// protocol-relative `next` (https://evil.com, //evil.com) would be an open
// redirect after authentication.
function safeNext(next) {
  return typeof next === "string" &&
    next.startsWith("/") &&
    !next.startsWith("//")
    ? next
    : "/dashboard";
}

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = safeNext(url.searchParams.get("next"));
  const requestedRole = url.searchParams.get("role");

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Honour the role picker for OAuth signup, but only for accounts that
      // were just created — never override a returning user's role. Written
      // with the service-role client because the profile privilege-escalation
      // trigger blocks a user-JWT self-update of `role`.
      if (requestedRole && VALID_ROLES.has(requestedRole) && data?.user) {
        const admin = createAdminClient();
        const { data: profile } = await admin
          .from("profiles")
          .select("role, created_at")
          .eq("id", data.user.id)
          .maybeSingle();
        const justCreated =
          profile?.created_at &&
          Date.now() - new Date(profile.created_at).getTime() <
            FRESH_PROFILE_WINDOW_MS;
        if (profile && justCreated && !profile.role) {
          await admin
            .from("profiles")
            .update({ role: requestedRole })
            .eq("id", data.user.id);
        }
      }
      return NextResponse.redirect(new URL(next, url.origin));
    }
  }

  return NextResponse.redirect(new URL("/?error=auth", url.origin));
}

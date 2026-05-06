import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

const VALID_ROLES = new Set(["parent", "tutor", "student"]);
const FRESH_PROFILE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/dashboard";
  const requestedRole = url.searchParams.get("role");

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Honour the role picker for OAuth signup, but only for accounts that
      // were just created — never override a returning user's role.
      if (requestedRole && VALID_ROLES.has(requestedRole) && data?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role, created_at")
          .eq("id", data.user.id)
          .maybeSingle();
        const justCreated =
          profile?.created_at &&
          Date.now() - new Date(profile.created_at).getTime() <
            FRESH_PROFILE_WINDOW_MS;
        if (profile && justCreated && profile.role !== requestedRole) {
          await supabase
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

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { ensureReferralCode } from "@/lib/referrals";

export const runtime = "nodejs";

// Returns the signed-in user's referral code (generates one on first
// call). Used by the /dashboard/parent/refer page.
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const admin = createAdminClient();
    const code = await ensureReferralCode(admin, user.id);
    return NextResponse.json({ code });
  } catch (e) {
    console.error("[referral/code] failed:", e);
    return NextResponse.json(
      { error: "Could not allocate a referral code." },
      { status: 500 }
    );
  }
}

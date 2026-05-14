import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

// Lists the signed-in user's referrals (newest first) plus a quick
// summary of pending vs credited counts and a total earned-cents.
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data: rows, error } = await admin
    .from("referrals")
    .select(
      "id, referred_email, status, credit_amount_cents, credit_currency, credited_at, created_at"
    )
    .eq("referrer_id", user.id)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[referral/list] failed:", error);
    return NextResponse.json(
      { error: "Could not load referrals." },
      { status: 500 }
    );
  }

  const referrals = rows ?? [];
  const totalEarnedCents = referrals
    .filter((r) => r.status === "credited")
    .reduce((sum, r) => sum + (r.credit_amount_cents ?? 0), 0);
  const pendingCount = referrals.filter((r) => r.status === "signed_up").length;
  const creditedCount = referrals.filter((r) => r.status === "credited").length;

  return NextResponse.json({
    referrals,
    total_earned_cents: totalEarnedCents,
    pending_count: pendingCount,
    credited_count: creditedCount,
  });
}

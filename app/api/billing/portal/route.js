import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

// POST /api/billing/portal
//   Auth: signed-in parent
//
// Opens a Stripe Billing Portal session so the parent can self-serve:
// update their card, view invoices, or cancel their membership. Requires
// the Customer Portal to be enabled once in the Stripe Dashboard
// (Settings → Billing → Customer portal).
export async function POST(request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data: profile } = await admin
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle();
  let customerId = profile?.stripe_customer_id ?? null;
  if (!customerId) {
    const { data: sub } = await admin
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .not("stripe_customer_id", "is", null)
      .limit(1)
      .maybeSingle();
    customerId = sub?.stripe_customer_id ?? null;
  }
  if (!customerId) {
    return NextResponse.json(
      { error: "No billing account found yet." },
      { status: 404 }
    );
  }

  const origin =
    request.headers.get("origin") ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://app.tuterly.com.au";

  try {
    const portal = await stripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/dashboard/parent`,
    });
    return NextResponse.json({ url: portal.url });
  } catch (e) {
    console.error("[billing/portal] create failed:", e);
    return NextResponse.json(
      { error: e?.message || "Could not open the billing portal." },
      { status: 500 }
    );
  }
}

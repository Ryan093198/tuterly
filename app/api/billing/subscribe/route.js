import { NextResponse } from "next/server";
import {
  stripe,
  PARENT_PLAN_PRICE_ID,
  PARENT_PLAN_TRIAL_DAYS,
} from "@/lib/stripe";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

// POST /api/billing/subscribe
//   Auth: signed-in parent
//
// Starts a Stripe Checkout session (mode: subscription) for the $29/mo
// Tuterly Parent membership with a 7-day free trial.
//
// Unlike the anonymous /api/billing/checkout-session route (worksheet
// funnel — creates a brand-new user on the webhook), this route is for
// parents who ALREADY have an account. It reuses their Stripe customer
// when one exists (so cards + invoice history stay on one record) and
// passes their account email, which is how the webhook (onCheckoutCompleted,
// matched by email) links the subscription back to their existing profile
// instead of spinning up a duplicate user.
export async function POST(request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();

  // Guard: don't let a parent start a second subscription if they already
  // have a live one. `trialing`, `active`, and `past_due` all count as "has
  // a membership" — past_due is a payment problem to fix via the portal,
  // not a reason to open a new subscription.
  const { data: existing } = await admin
    .from("subscriptions")
    .select("status")
    .eq("user_id", user.id)
    .in("status", ["trialing", "active", "past_due"])
    .maybeSingle();
  if (existing) {
    return NextResponse.json(
      { error: "You already have an active membership." },
      { status: 409 }
    );
  }

  // Resolve email + reuse an existing Stripe customer if we have one (from a
  // pack purchase or an earlier subscription), so everything stays on a
  // single customer record.
  const { data: profile } = await admin
    .from("profiles")
    .select("email, stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle();
  const email = profile?.email || user.email || undefined;
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
    // Mirror it onto profiles so future calls hit the fast path.
    if (customerId) {
      await admin
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }
  }

  const origin =
    request.headers.get("origin") ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://app.tuterly.com.au";

  try {
    const session = await stripe().checkout.sessions.create({
      mode: "subscription",
      payment_method_collection: "always",
      ...(customerId
        ? { customer: customerId }
        : { customer_email: email }),
      line_items: [{ price: PARENT_PLAN_PRICE_ID(), quantity: 1 }],
      subscription_data: {
        trial_period_days: PARENT_PLAN_TRIAL_DAYS,
        trial_settings: {
          end_behavior: { missing_payment_method: "cancel" },
        },
        metadata: { source: "parent_dashboard", user_id: user.id },
      },
      success_url: `${origin}/dashboard/parent?membership=started`,
      cancel_url: `${origin}/dashboard/parent?membership=cancelled`,
      allow_promotion_codes: true,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[billing/subscribe] checkout create failed:", e);
    return NextResponse.json(
      { error: e?.message || "Could not start checkout. Please try again." },
      { status: 500 }
    );
  }
}

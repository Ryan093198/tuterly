import { NextResponse } from "next/server";
import { stripe, PARENT_PLAN_PRICE_ID, PARENT_PLAN_TRIAL_DAYS } from "@/lib/stripe";

export const runtime = "nodejs";

// Creates a Stripe Checkout session for the 7-day-free Tuterly Parent
// trial. Anonymous visitor → click "Start free trial" in the worksheet
// page modal → POST here → redirect to the returned `url`. Stripe
// collects email + card on its hosted page, and posts back to
// /api/billing/webhook with `checkout.session.completed` once the
// subscription is created. The webhook is what creates the Supabase
// user, profile, and subscription row — this route just kicks the
// session off.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }

  const email = sanitizeEmail(body?.email);

  const origin =
    request.headers.get("origin") ||
    request.headers.get("referer")?.match(/^https?:\/\/[^/]+/)?.[0] ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://app.tuterly.com.au";

  try {
    const session = await stripe().checkout.sessions.create({
      mode: "subscription",
      payment_method_collection: "always",
      line_items: [{ price: PARENT_PLAN_PRICE_ID(), quantity: 1 }],
      subscription_data: {
        trial_period_days: PARENT_PLAN_TRIAL_DAYS,
        // Cancel automatically if the trial ends without a valid card
        // (shouldn't fire because we collect card up front, but a safety
        // net for the rare case where Stripe couldn't authorise).
        trial_settings: {
          end_behavior: { missing_payment_method: "cancel" },
        },
        metadata: { source: "worksheets_landing" },
      },
      // Pre-fill email if the caller passed one (the worksheet email
      // gate already collected it). Customer record is created by Stripe
      // once they hit pay; we record it on the webhook.
      customer_email: email || undefined,
      success_url: `${origin}/worksheets?welcome=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/worksheets?signup_cancelled=1`,
      allow_promotion_codes: true,
      // Bill in AUD by default — Stripe inherits the currency from the
      // configured Price, so the dashboard is the single source of truth.
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[billing/checkout-session] failed:", e);
    return NextResponse.json(
      { error: e?.message || "Could not start checkout. Please try again." },
      { status: 500 }
    );
  }
}

function sanitizeEmail(raw) {
  if (typeof raw !== "string") return null;
  const t = raw.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return null;
  if (t.length > 254) return null;
  return t;
}

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { cleanEmail, familyCode, priceFor, SCH_PASS_LEVELS, STUDY_APP, STUDY_TRIAL_DAYS, studySubscriptionsFor } from "@/lib/study-plus";

export const runtime = "nodejs";

// POST /api/study/checkout  { kind: "self"|"family", plan: "monthly"|"weekly", email, agreed }
// Starts a Stripe Checkout for Tuterly Study Plus. The free week is on the
// monthly plan, once per email (like the App Store, once per person).
export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { body = {}; }
  const kind = body?.kind === "family" ? "family" : body?.kind === "self" ? "self" : null;
  // The Scholarship Pass is a one-off payment (no subscription, no trial).
  if (body?.product === "sch_pass") return passCheckout(request, body, kind);
  const plan = body?.plan === "weekly" ? "weekly" : body?.plan === "monthly" ? "monthly" : null;
  const email = cleanEmail(body?.email);
  if (!kind || !plan) return NextResponse.json({ error: "Pick who it's for and a plan." }, { status: 400 });
  if (!email) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (body?.agreed !== true) return NextResponse.json({ error: "Tick the box to continue." }, { status: 400 });

  try {
    const price = await priceFor(plan);
    if (!price) return NextResponse.json({ error: "Plus isn't on sale here just yet." }, { status: 503 });
    const { customers, subs } = await studySubscriptionsFor(email);
    const live = subs.find((s) => ["trialing", "active", "past_due"].includes(s.status));
    if (live) {
      return NextResponse.json({
        error: "This email already has Tuterly Study Plus. To change it, use Manage subscription.", manage: true,
      }, { status: 409 });
    }
    const trial = plan === "monthly" && subs.length === 0;
    const code = kind === "family" ? familyCode() : null;
    const metadata = { app: STUDY_APP, kind, plan, email, ...(code ? { family_code: code } : {}) };
    const site = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const session = await stripe().checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: price.id, quantity: 1 }],
      ...(customers[0] ? { customer: customers[0].id } : { customer_email: email }),
      metadata,
      subscription_data: {
        metadata,
        ...(trial ? { trial_period_days: STUDY_TRIAL_DAYS } : {}),
        ...(process.env.STRIPE_GST_TAX_RATE_ID ? { default_tax_rates: [process.env.STRIPE_GST_TAX_RATE_ID] } : {}),
      },
      payment_method_collection: "always",
      allow_promotion_codes: false,
      success_url: `${site}/study/plus/done?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/study/plus`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[study/checkout]", e?.message);
    return NextResponse.json({ error: "Couldn't start checkout. Try again in a moment." }, { status: 500 });
  }
}

async function passCheckout(request, body, kind) {
  const email = cleanEmail(body?.email);
  if (!kind) return NextResponse.json({ error: "Pick who it's for." }, { status: 400 });
  if (!email) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (body?.agreed !== true) return NextResponse.json({ error: "Tick the box to continue." }, { status: 400 });
  const entryYear = Number(body?.entry_year);
  if (!SCH_PASS_LEVELS.includes(entryYear)) return NextResponse.json({ error: "Pick which entry test." }, { status: 400 });
  try {
    const price = await priceFor(`sch_pass_y${entryYear}`);
    if (!price) return NextResponse.json({ error: "The Scholarship Pass isn't on sale here just yet." }, { status: 503 });
    const code = kind === "family" ? familyCode() : null;
    const metadata = { app: STUDY_APP, product: "sch_pass", kind, email, entry_year: String(entryYear), ...(code ? { family_code: code } : {}) };
    const site = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: price.id, quantity: 1 }],
      customer_email: email,
      metadata,
      payment_intent_data: { metadata },
      allow_promotion_codes: false,
      success_url: `${site}/study/plus/done?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/study/scholarship`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[study/checkout pass]", e?.message);
    return NextResponse.json({ error: "Couldn't start checkout. Try again in a moment." }, { status: 500 });
  }
}

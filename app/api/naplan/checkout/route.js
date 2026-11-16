import { NextResponse } from "next/server";
import { guardPublicForm } from "@/lib/public-form-guard";
import { stripe } from "@/lib/stripe";
import { cleanEmail } from "@/lib/study-plus";
import { NAPLAN_APP, PASS_YEARS, naplanPassKey } from "@/lib/naplan-access";
import { naplanSlug } from "@/lib/naplan";

export const runtime = "nodejs";

// POST /api/naplan/checkout { year: 3|5, email, agreed }
// The NAPLAN Pass: a one-off A$49 payment for Practice Tests 2 to 5 for one
// year level. Years 7 and 9 use the Tuterly subscription instead.
export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { body = {}; }
  const guard = await guardPublicForm(request, body ?? {}, "naplan-checkout", { perMinute: 5, perHour: 20, perDay: 40 });
  if (guard.blocked) return NextResponse.json({ error: "Too many tries. Please wait a minute and try again." }, { status: 429 });
  const year = Number(body?.year);
  const email = cleanEmail(body?.email);
  if (!PASS_YEARS.includes(year)) return NextResponse.json({ error: "Pick a year level." }, { status: 400 });
  if (!email) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (body?.agreed !== true) return NextResponse.json({ error: "Tick the box to continue." }, { status: 400 });
  try {
    const list = await stripe().prices.list({ lookup_keys: [naplanPassKey(year)], active: true, limit: 1 });
    const price = list.data[0];
    if (!price) return NextResponse.json({ error: "The NAPLAN Pass isn't on sale just yet." }, { status: 503 });
    const metadata = { app: NAPLAN_APP, product: "naplan_pass", year: String(year), email };
    const site = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: price.id, quantity: 1 }],
      customer_email: email,
      metadata,
      payment_intent_data: { metadata },
      allow_promotion_codes: false,
      success_url: `${site}/api/naplan/claim?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/naplan/${naplanSlug(year)}#more-tests`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[naplan/checkout]", e?.message);
    return NextResponse.json({ error: "Couldn't start checkout. Try again in a moment." }, { status: 500 });
  }
}

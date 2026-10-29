import { NextResponse } from "next/server";
import { sendStudyManageEmail } from "@/lib/email";
import { stripe } from "@/lib/stripe";
import { cleanEmail, studySubscriptionsFor } from "@/lib/study-plus";

export const runtime = "nodejs";

// POST /api/study/manage  { email }
// Emails a Stripe customer portal link (change plan, card, cancel) to the
// address the Study subscription was bought with. Always answers the same,
// so it can't be used to find out who has a subscription. The app calls this
// from Settings for students who bought Plus on the website.
export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { body = {}; }
  const email = cleanEmail(body?.email);
  if (!email) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  try {
    const { subs } = await studySubscriptionsFor(email);
    const sub = subs.sort((a, b) => b.created - a.created)[0];
    if (sub) {
      const site = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
      const portal = await stripe().billingPortal.sessions.create({
        customer: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
        return_url: `${site}/study/manage?done=1`,
      });
      await sendStudyManageEmail({ to: email, url: portal.url });
    }
  } catch (e) {
    console.error("[study/manage]", e?.message);
  }
  return NextResponse.json({ ok: true });
}

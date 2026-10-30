import { NextResponse } from "next/server";
import { sendStudyManageEmail } from "@/lib/email";
import { guardPublicForm } from "@/lib/public-form-guard";
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
  // Per-IP limit so this can't be used to flood a subscriber's inbox.
  const guard = await guardPublicForm(request, body ?? {}, "study-manage", { perMinute: 2, perHour: 5, perDay: 10 });
  if (guard.blocked) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
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

import { NextResponse } from "next/server";
import { guardPublicForm } from "@/lib/public-form-guard";
import { cleanEmail } from "@/lib/study-plus";
import { hasNaplanAccess, signinToken } from "@/lib/naplan-access";
import { sendNaplanSigninEmail } from "@/lib/email";

export const runtime = "nodejs";

// POST /api/naplan/signin { email, year }
// Emails a sign-in link if this email has access. The reply is the same
// either way, so it can't be used to check who has bought.
export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { body = {}; }
  const guard = await guardPublicForm(request, body ?? {}, "naplan-signin", { perMinute: 3, perHour: 10, perDay: 20 });
  if (guard.blocked) return NextResponse.json({ error: "Too many tries. Please wait a minute and try again." }, { status: 429 });
  const email = cleanEmail(body?.email);
  const year = Number(body?.year);
  if (!email) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  try {
    if (await hasNaplanAccess(email, year)) {
      const site = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
      const link = `${site}/api/naplan/verify?t=${encodeURIComponent(signinToken(email, year))}`;
      await sendNaplanSigninEmail({ to: email, link, year });
    }
  } catch (e) {
    console.error("[naplan/signin]", e?.message);
  }
  return NextResponse.json({ ok: true });
}

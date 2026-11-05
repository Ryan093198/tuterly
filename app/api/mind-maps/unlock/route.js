import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { trustedClientIp } from "@/lib/client-ip";
import { guardPublicForm } from "@/lib/public-form-guard";
import { UNLOCK_COOKIE, UNLOCK_FLAG, UNLOCK_MAX_AGE, unlockToken } from "@/lib/mind-map-unlock";

export const runtime = "nodejs";

// POST /api/mind-maps/unlock { email, year_level?, marketing_opt_in? }
// The email unlocks every mind map on this device. Saved to the same list
// as the worksheet gate (worksheet_email_signups). Marketing consent only
// when the box is ticked; an unticked resubmission never clears it.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { body = {}; }
  const guard = await guardPublicForm(request, body ?? {}, "mind-map-unlock", { perMinute: 5, perHour: 20, perDay: 40 });
  if (guard.blocked) {
    if (guard.silent) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: "Too many tries. Please wait a minute and try again." }, { status: 429 });
  }
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  const year = typeof body?.year_level === "string" && /^Year (7|8|9|10A?)$/.test(body.year_level) ? body.year_level : null;

  const row = { email, ip: trustedClientIp(request), last_seen_at: new Date().toISOString() };
  if (year) row.year_level = year;
  if (body?.marketing_opt_in === true) {
    row.marketing_opt_in = true;
    row.marketing_opt_in_at = new Date().toISOString();
  }
  const admin = createAdminClient();
  let { error } = await admin.from("worksheet_email_signups").upsert(row, { onConflict: "email" });
  if (error && /marketing_opt_in/.test(error.message || "")) {
    delete row.marketing_opt_in; delete row.marketing_opt_in_at;
    ({ error } = await admin.from("worksheet_email_signups").upsert(row, { onConflict: "email" }));
  }
  if (error) {
    console.error("[mind-maps/unlock] upsert failed", error.message);
    return NextResponse.json({ error: "Could not save your email. Try again." }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true });
  const secure = process.env.NODE_ENV === "production";
  res.cookies.set(UNLOCK_COOKIE, unlockToken(email), { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: UNLOCK_MAX_AGE });
  res.cookies.set(UNLOCK_FLAG, "1", { httpOnly: false, secure, sameSite: "lax", path: "/", maxAge: UNLOCK_MAX_AGE });
  return res;
}

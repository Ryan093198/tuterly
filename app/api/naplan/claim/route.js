import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { STUDY_APP } from "@/lib/study-plus";
import { ACCESS_COOKIE, accessCookieValue, cookieOptions, NAPLAN_APP, rememberAccess } from "@/lib/naplan-access";
import { naplanSlug } from "@/lib/naplan";

export const runtime = "nodejs";

// GET /api/naplan/claim?session_id=cs_...
// After a paid checkout (the NAPLAN Pass, or a Tuterly subscription), tie
// this browser to the buyer's email and open Practice Test 2.
export async function GET(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("session_id") || "";
  let s = null;
  try {
    if (id.startsWith("cs_")) s = await stripe().checkout.sessions.retrieve(id);
  } catch { s = null; }
  const email = s?.customer_details?.email || s?.metadata?.email || s?.customer_email || null;
  const pass = s?.metadata?.app === NAPLAN_APP && s.metadata.product === "naplan_pass" && s.payment_status === "paid";
  const sub = s?.metadata?.app === STUDY_APP && s.status === "complete" && s.metadata.product !== "sch_pass";
  if (!email || (!pass && !sub)) return NextResponse.redirect(new URL("/naplan?unlock=failed", url));
  const year = pass ? Number(s.metadata.year) : null;
  const target = year ? `/naplan/${naplanSlug(year)}/test-2?welcome=1` : "/naplan?unlocked=1#tests";
  const mail = String(s.metadata?.email || email).toLowerCase();
  if (year) rememberAccess(mail, year);
  const res = NextResponse.redirect(new URL(target, url));
  res.cookies.set(ACCESS_COOKIE, accessCookieValue(mail), cookieOptions);
  return res;
}

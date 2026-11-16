import { NextResponse } from "next/server";
import { ACCESS_COOKIE, accessCookieValue, cookieOptions, readSigninToken } from "@/lib/naplan-access";
import { naplanSlug } from "@/lib/naplan";

export const runtime = "nodejs";

// GET /api/naplan/verify?t=...  The emailed sign-in link.
export async function GET(request) {
  const url = new URL(request.url);
  const tok = readSigninToken(url.searchParams.get("t"));
  if (!tok) return NextResponse.redirect(new URL("/naplan?unlock=expired", url));
  const target = tok.year ? `/naplan/${naplanSlug(tok.year)}/test-2` : "/naplan#tests";
  const res = NextResponse.redirect(new URL(target, url));
  res.cookies.set(ACCESS_COOKIE, accessCookieValue(tok.email), cookieOptions);
  return res;
}

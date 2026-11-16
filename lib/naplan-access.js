import { createHmac, timingSafeEqual } from "node:crypto";
import { stripe } from "@/lib/stripe";
import { STUDY_APP, studySubscriptionsFor } from "@/lib/study-plus";

// Paid NAPLAN practice tests (Ryan, 17 Nov 2026). Each year has 5 tests:
// Test 1 is free on the year page; Tests 2 to 5 need access.
//   Years 3 and 5: the NAPLAN Pass, a one-off A$49 per year level, bought
//     on the website (Stripe price lookup key naplan_pass_y3 / naplan_pass_y5).
//   Years 7 and 9: an active Tuterly subscription (the app is Years 7 to 10).
//   A Tuterly subscriber also gets Years 3 and 5, for younger siblings.
// Access is tied to an email. Buying sets a signed cookie straight away;
// on another device, the parent asks for a sign-in link by email.

export const NAPLAN_TESTS = 5;
export const PASS_YEARS = [3, 5];
export const SUB_YEARS = [7, 9];
export const NAPLAN_PASS = { price: "$49" };
export const naplanPassKey = (y) => `naplan_pass_y${y}`;
export const NAPLAN_APP = "tuterly_naplan"; // Stripe metadata.app (the Study app's webhook ignores it)

export const ACCESS_COOKIE = "np_access";
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 365;
const LINK_TTL_MS = 2 * 60 * 60 * 1000;

const secret = () => process.env.NAPLAN_ACCESS_SECRET || process.env.MIND_MAP_SECRET || process.env.CRON_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const sig = (v) => createHmac("sha256", secret()).update(`naplan:${v}`).digest("base64url");

function sign(obj) {
  const v = Buffer.from(JSON.stringify(obj)).toString("base64url");
  return `${v}.${sig(v)}`;
}

function verify(raw) {
  const [v, s] = String(raw || "").split(".");
  if (!v || !s || !secret()) return null;
  const want = Buffer.from(sig(v));
  const got = Buffer.from(s);
  if (want.length !== got.length || !timingSafeEqual(want, got)) return null;
  try { return JSON.parse(Buffer.from(v, "base64url").toString("utf8")); } catch { return null; }
}

/** Cookie value proving the browser belongs to this email. */
export const accessCookieValue = (email) => sign({ e: email });

/** The email in a valid access cookie, or null. */
export function emailFromCookies(cookieStore) {
  const p = verify(cookieStore.get(ACCESS_COOKIE)?.value);
  return typeof p?.e === "string" ? p.e : null;
}

/** A short-lived sign-in link token. */
export const signinToken = (email, year) => sign({ e: email, y: year, x: Date.now() + LINK_TTL_MS });

export function readSigninToken(t) {
  const p = verify(t);
  if (!p || typeof p.e !== "string" || !(p.x > Date.now())) return null;
  return { email: p.e, year: Number(p.y) || null };
}

export const cookieOptions = { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: ACCESS_MAX_AGE };

// Stripe lookups are cached briefly so browsing between tests stays quick.
const cache = new Map();
const TTL = 5 * 60 * 1000;
export function rememberAccess(email, year) {
  cache.set(`${email}|${year}`, { ok: true, at: Date.now() });
}

const q = (s) => String(s).replace(/["\\]/g, "\\$&");

async function hasPass(email, year) {
  const res = await stripe().paymentIntents.search({
    query: `status:"succeeded" AND metadata["product"]:"naplan_pass" AND metadata["email"]:"${q(email)}" AND metadata["year"]:"${year}"`,
    limit: 1,
  });
  return res.data.length > 0;
}

async function hasSubscription(email) {
  const { subs } = await studySubscriptionsFor(email);
  return subs.some((s) => (s.metadata?.app ? s.metadata.app === STUDY_APP : true) && ["trialing", "active", "past_due"].includes(s.status));
}

/** Can this email open the paid tests for this year? */
export async function hasNaplanAccess(email, year) {
  if (!email || ![...PASS_YEARS, ...SUB_YEARS].includes(year)) return false;
  // Local testing only: never set in production.
  const testEmails = (process.env.NAPLAN_TEST_ACCESS_EMAILS || "").split(",").map((x) => x.trim()).filter(Boolean);
  if (testEmails.length && testEmails.includes(email)) return true;
  const key = `${email}|${year}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.ok;
  let ok = false;
  try {
    ok = (await hasSubscription(email)) || (PASS_YEARS.includes(year) && (await hasPass(email, year)));
  } catch (e) {
    console.error("[naplan-access]", e?.message);
    return false;
  }
  cache.set(key, { ok, at: Date.now() });
  return ok;
}

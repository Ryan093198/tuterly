import { createHmac, timingSafeEqual } from "node:crypto";

// Mind maps are free with an email (Nov 2026). Giving an email sets a signed
// cookie; the file route only serves PDFs and images when it's valid. The
// signature stops anyone forging the cookie without giving an email.
export const UNLOCK_COOKIE = "mm_unlock";
export const UNLOCK_FLAG = "mm_ok"; // readable by the page, only for the UI
export const UNLOCK_MAX_AGE = 60 * 60 * 24 * 365;

const secret = () => process.env.MIND_MAP_SECRET || process.env.CRON_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const sig = (v) => createHmac("sha256", secret()).update(`mind-map:${v}`).digest("base64url");

export function unlockToken(email) {
  const v = Buffer.from(email).toString("base64url");
  return `${v}.${sig(v)}`;
}

export function isUnlocked(request) {
  const raw = request.cookies.get(UNLOCK_COOKIE)?.value || "";
  const [v, s] = raw.split(".");
  if (!v || !s || !secret()) return false;
  const want = Buffer.from(sig(v));
  const got = Buffer.from(s);
  return want.length === got.length && timingSafeEqual(want, got);
}

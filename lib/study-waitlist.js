// Validation for the Tuterly Study waitlist form (app/api/study-waitlist).
const ROLES = ["parent", "student", "tutor"];
const INTERESTS = ["launch", "pilot", "android"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normaliseWaitlistSignup(body) {
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) return null;

  const role = ROLES.includes(body.role) ? body.role : "parent";
  const yearNum = Number(body.year_level);
  const year_level =
    role !== "tutor" && Number.isInteger(yearNum) && yearNum >= 7 && yearNum <= 10 ? yearNum : null;
  const interest = INTERESTS.includes(body.interest) ? body.interest : "launch";

  const src = typeof body.source_page === "string" ? body.source_page.trim() : "";
  const source_page = src.startsWith("/") ? src.slice(0, 200) : null;
  const pl = typeof body.placement === "string" ? body.placement.trim() : "";
  const placement = /^[a-z0-9_-]{1,60}$/i.test(pl) ? pl : null;

  return { email, role, year_level, interest, source_page, placement };
}

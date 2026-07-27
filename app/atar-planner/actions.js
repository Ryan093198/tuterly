"use server";

import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase-admin";
import { checkPublicRateLimit } from "@/lib/public-form-guard";

// Email capture for the public /atar-planner tool.
//
// This used to console.log the lead and nothing else, which meant every address
// captured since launch lived only in the Vercel logs. It now persists to
// atar_planner_signups (service-role only, see the 2026-07-26 migration).
//
// This is an unauthenticated entry point. A "use server" action is callable as
// an endpoint by anyone who has the action id, so it gets the same per-IP limit
// as the other public forms (audit H2) before it is allowed to write a row.
//
// Failure policy: this must never break the planner. The user has just spent
// several minutes entering subjects and is waiting to see their ATAR estimate,
// so a database problem degrades to a logged warning, not a thrown error.

const MAX_EMAIL_LEN = 254;
const MAX_COURSE_IDS = 10;
const MAX_SUBJECTS = 12;

// Matches the limits on the other public forms, slightly looser per-day because
// a family may legitimately model several course combinations in one sitting.
const RATE_LIMITS = { perMinute: 3, perHour: 12, perDay: 40 };

function cleanEmail(raw) {
  if (typeof raw !== "string") return null;
  const email = raw.trim().toLowerCase();
  if (!email || email.length > MAX_EMAIL_LEN) return null;
  // Deliberately permissive: one @, something either side, no whitespace.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

function cleanNumber(raw, { min, max }) {
  const n = typeof raw === "number" ? raw : Number.parseFloat(raw);
  if (!Number.isFinite(n)) return null;
  if (n < min || n > max) return null;
  return n;
}

function cleanCourseIds(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((id) => typeof id === "string" && id.trim())
    .slice(0, MAX_COURSE_IDS)
    .map((id) => id.trim().slice(0, 120));
}

// Keep only the fields we actually use, so nobody can stuff arbitrary payloads
// into a jsonb column through a public endpoint.
function cleanSubjects(raw) {
  if (!Array.isArray(raw)) return [];
  // The planner sends { subject, score } (see validSubjects in ATARPlanner.jsx).
  // Do not rename these keys without changing that component too.
  return raw.slice(0, MAX_SUBJECTS).map((s) => ({
    subject: typeof s?.subject === "string" ? s.subject.slice(0, 120) : null,
    score: cleanNumber(s?.score, { min: 0, max: 50 }),
  }));
}

export async function savePlannerLead({ email, courseIds, atar, aggregate, subjects }) {
  const cleanedEmail = cleanEmail(email);
  if (!cleanedEmail) {
    throw new Error("Valid email required.");
  }

  // trustedClientIp() reads from a request-like object; a server action has no
  // `request`, so hand it the incoming headers.
  const requestLike = { headers: await headers() };

  const rl = await checkPublicRateLimit(requestLike, "atar-planner", RATE_LIMITS);
  if (!rl.ok) {
    // Accept silently. The planner results are the user's, not a reward for
    // passing a rate limit, and a throttled bot learns nothing from this.
    return { ok: true, saved: false };
  }

  try {
    const admin = createAdminClient();
    const { error } = await admin.from("atar_planner_signups").insert({
      email: cleanedEmail,
      course_ids: cleanCourseIds(courseIds),
      atar: cleanNumber(atar, { min: 0, max: 99.95 }),
      aggregate: cleanNumber(aggregate, { min: 0, max: 250 }),
      subjects: cleanSubjects(subjects),
    });
    if (error) throw error;
  } catch (e) {
    // Keep the console line as a last-resort backstop so a lead is never lost
    // purely because the insert failed.
    console.error("[atar-planner] lead save failed:", e?.message || e, {
      email: cleanedEmail,
      courseIds: cleanCourseIds(courseIds),
      atar,
      aggregate,
    });
    return { ok: true, saved: false };
  }

  return { ok: true, saved: true };
}

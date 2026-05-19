// ATAR estimation engine for the /atar-planner tool.
//
// Method (VTAC-style aggregate calculation):
//   1. English score (any of English / EAL / English Language /
//      Literature) is mandatory and counts as one of the Primary 4.
//   2. Primary 4 = best English + next three highest scores, full
//      weight (100%).
//   3. Increments: 10% of the 5th score, then 10% of the 6th score
//      (if entered). Beyond six scores does not contribute.
//   4. Aggregate = Primary 4 total + increments.
//   5. Aggregate maps to ATAR via linear interpolation against the
//      published 2024 VTAC conversion table.
//
// IMPORTANT MVP SIMPLIFICATION: students enter raw study scores (0-50).
// Real ATARs use scaled scores, which vary by subject and cohort.
// This calculator treats raw as scaled, so estimates may differ from
// the official VTAC ATAR by a few points either way. Disclaimer on
// the page makes this explicit.

import { isEnglishSubject, scalePair } from "./vce-subjects";

// Official 2025 VTAC "Minimum Scaled Aggregate for ATAR" table -
// from the 2025 Scaling Report (published 11 Dec 2025). Each row is
// the minimum aggregate required to achieve at least that ATAR.
// Linearly interpolated between anchors for in-between aggregates.
//
// The 99.95 anchor is a linear extrapolation from (208.08, 99.90)
// using the slope of the last two published points - the official
// table stops at 99.90, but ATARs go up to 99.95.
const AGGREGATE_ATAR_TABLE = [
  { agg: 210.0, atar: 99.95 }, // extrapolated; VTAC table tops out at 99.90
  { agg: 208.08, atar: 99.9 },
  { agg: 204.33, atar: 99.8 },
  { agg: 201.93, atar: 99.7 },
  { agg: 199.91, atar: 99.6 },
  { agg: 198.2, atar: 99.5 },
  { agg: 194.8, atar: 99.25 },
  { agg: 192.1, atar: 99.0 },
  { agg: 187.53, atar: 98.5 },
  { agg: 183.81, atar: 98.0 },
  { agg: 180.84, atar: 97.5 },
  { agg: 178.1, atar: 97.0 },
  { agg: 173.56, atar: 96.0 },
  { agg: 169.85, atar: 95.0 },
  { agg: 166.49, atar: 94.0 },
  { agg: 163.3, atar: 93.0 },
  { agg: 160.53, atar: 92.0 },
  { agg: 157.79, atar: 91.0 },
  { agg: 155.19, atar: 90.0 },
  { agg: 150.51, atar: 88.0 },
  { agg: 146.36, atar: 86.0 },
  { agg: 144.45, atar: 85.0 },
  { agg: 142.52, atar: 84.0 },
  { agg: 139.0, atar: 82.0 },
  { agg: 135.65, atar: 80.0 },
  { agg: 132.22, atar: 78.0 },
  { agg: 129.18, atar: 76.0 },
  { agg: 127.68, atar: 75.0 },
  { agg: 126.21, atar: 74.0 },
  { agg: 123.27, atar: 72.0 },
  { agg: 120.42, atar: 70.0 },
  { agg: 117.73, atar: 68.0 },
  { agg: 114.99, atar: 66.0 },
  { agg: 113.64, atar: 65.0 },
  { agg: 112.34, atar: 64.0 },
  { agg: 109.74, atar: 62.0 },
  { agg: 107.03, atar: 60.0 },
  { agg: 100.64, atar: 55.0 },
  { agg: 94.06, atar: 50.0 },
  { agg: 87.44, atar: 45.0 },
  { agg: 80.53, atar: 40.0 },
];

// Map an aggregate to an ATAR estimate. Outside the table range we
// clamp to the nearest endpoint - the tool isn't useful for
// aggregates above 210 (already 99.95) or below 100 (below 30 ATAR).
export function aggregateToAtar(aggregate) {
  if (aggregate >= AGGREGATE_ATAR_TABLE[0].agg) return AGGREGATE_ATAR_TABLE[0].atar;
  const last = AGGREGATE_ATAR_TABLE[AGGREGATE_ATAR_TABLE.length - 1];
  if (aggregate <= last.agg) {
    // Below the lowest anchor: linear extrapolation but never below 0
    const second = AGGREGATE_ATAR_TABLE[AGGREGATE_ATAR_TABLE.length - 2];
    const slope = (second.atar - last.atar) / (second.agg - last.agg);
    return Math.max(0, last.atar + slope * (aggregate - last.agg));
  }
  // Interpolate between two anchors that bracket the aggregate
  for (let i = 0; i < AGGREGATE_ATAR_TABLE.length - 1; i++) {
    const hi = AGGREGATE_ATAR_TABLE[i];
    const lo = AGGREGATE_ATAR_TABLE[i + 1];
    if (aggregate >= lo.agg && aggregate <= hi.agg) {
      const t = (aggregate - lo.agg) / (hi.agg - lo.agg);
      return lo.atar + t * (hi.atar - lo.atar);
    }
  }
  return 0;
}

/**
 * Apply VCAA-style scaling to each subject. Raw study scores are
 * converted to estimated scaled scores using each subject's
 * scalingAt30 anchor (see lib/vce-subjects.js). The engine then
 * works with scaled scores throughout - they're what VTAC uses in
 * the real ATAR calculation.
 *
 * @param {{ subject: string, score: number }[]} rawSubjects
 * @returns {{ subject: string, rawScore: number, score: number, scaledScore: number, scalingAt30: number }[]}
 */
export function scaleSubjects(rawSubjects) {
  return (rawSubjects ?? [])
    .filter((s) => s && s.subject && typeof s.score === "number" && s.score > 0)
    .map((s) => scalePair(s));
}

/**
 * Sort subject scores into Primary 4 + increments per VTAC rules.
 * Accepts pre-scaled subjects (score = scaled study score).
 */
export function categoriseSubjects(subjects) {
  const valid = subjects.filter(
    (s) => s && s.subject && typeof s.score === "number" && s.score > 0
  );

  const englishCandidates = valid
    .filter((s) => isEnglishSubject(s.subject))
    .sort((a, b) => b.score - a.score);
  const english = englishCandidates[0] ?? null;

  // Remove the chosen English from the pool, sort the rest descending
  const rest = valid
    .filter((s) => s !== english)
    .sort((a, b) => b.score - a.score);

  const primary3 = rest.slice(0, 3);
  const primary4 = english ? [english, ...primary3] : primary3;

  const increment5 = rest[3] ?? null;
  const increment6 = rest[4] ?? null;
  const ignored = rest.slice(5);

  return { english, primary4, increment5, increment6, ignored };
}

/**
 * Compute the full ATAR breakdown for a list of subject scores.
 *
 * @param {{ subject: string, score: number }[]} subjects
 * @returns {{
 *   aggregate: number,
 *   atar: number,
 *   primary4Total: number,
 *   incrementTotal: number,
 *   primary4: { subject: string, score: number }[],
 *   increment5: { subject: string, score: number } | null,
 *   increment6: { subject: string, score: number } | null,
 *   english: { subject: string, score: number } | null,
 *   hasEnglish: boolean,
 *   hasMinSubjects: boolean,
 * }}
 */
/**
 * Compute the full ATAR breakdown for a list of raw subject scores.
 * Applies VCAA-style scaling before working out the Primary 4 +
 * increments + aggregate.
 *
 * @param {{ subject: string, score: number }[]} rawSubjects raw 0-50 scores
 */
export function calculateAtar(rawSubjects) {
  const scaled = scaleSubjects(rawSubjects);
  const { english, primary4, increment5, increment6 } = categoriseSubjects(scaled);

  const primary4Total = primary4.reduce((sum, s) => sum + s.score, 0);
  const incrementTotal =
    (increment5 ? increment5.score * 0.1 : 0) +
    (increment6 ? increment6.score * 0.1 : 0);

  const aggregate = primary4Total + incrementTotal;
  // VTAC reports ATARs in 0.05 increments (99.95, 99.90, 99.85 ...
  // down to the cut-off at 30.00). Round the interpolated value to
  // the nearest 0.05 so the displayed ATAR matches the VTAC format.
  const rawAtar = aggregateToAtar(aggregate);
  const atar = Math.round(rawAtar * 20) / 20;

  return {
    aggregate: Math.round(aggregate * 10) / 10,
    atar,
    primary4Total: Math.round(primary4Total * 10) / 10,
    incrementTotal: Math.round(incrementTotal * 100) / 100,
    primary4,
    increment5,
    increment6,
    english,
    scaled,
    hasEnglish: !!english,
    hasMinSubjects: primary4.length >= 4,
  };
}

/**
 * Check a student's subject scores against a course's prerequisites.
 * Returns array of { subject, requiredScore, actualScore, met } per prereq.
 *
 * "English" as a prerequisite is satisfied by any English variant.
 */
export function checkPrerequisites(course, subjects) {
  const prereqs = course?.prerequisites ?? [];
  return prereqs.map((req) => {
    const candidates =
      req.subject === "English"
        ? subjects.filter((s) => isEnglishSubject(s.subject) && typeof s.score === "number")
        : subjects.filter((s) => s.subject === req.subject && typeof s.score === "number");
    const best = candidates.sort((a, b) => b.score - a.score)[0];
    const actualScore = best?.score ?? 0;
    return {
      subject: req.subject,
      requiredScore: req.minimumScore,
      actualScore,
      met: actualScore >= req.minimumScore,
      actualSubject: best?.subject ?? null,
    };
  });
}

/**
 * Suggest the cheapest path to a target ATAR. For each Primary-4
 * subject, work out how many additional points would move the ATAR
 * by the most useful margin. Primary-4 subjects are prioritised
 * because they count at 100% vs the 10% increment.
 *
 * Returns up to `limit` suggestions, each with the subject, current
 * score, projected score, and projected ATAR after the bump.
 */
export function suggestImprovements(rawSubjects, targetAtar, { limit = 4 } = {}) {
  const baseResult = calculateAtar(rawSubjects);
  if (baseResult.atar >= targetAtar) return [];

  const findRaw = (name) =>
    rawSubjects.find((s) => s.subject === name)?.score ?? 0;

  const tryBump = (subjectName, weightLabel) => {
    const rawScore = findRaw(subjectName);
    if (rawScore >= 50) return null;
    const bumped = rawSubjects.map((s) =>
      s.subject === subjectName ? { ...s, score: Math.min(50, s.score + 5) } : s
    );
    const bumpedResult = calculateAtar(bumped);
    return {
      subject: subjectName,
      currentRawScore: rawScore,
      targetRawScore: Math.min(50, rawScore + 5),
      currentAtar: baseResult.atar,
      projectedAtar: bumpedResult.atar,
      atarLift: Math.round((bumpedResult.atar - baseResult.atar) * 100) / 100,
      weight: weightLabel,
    };
  };

  const suggestions = [
    ...baseResult.primary4.map((ps) => tryBump(ps.subject, "100%")),
    baseResult.increment5 && tryBump(baseResult.increment5.subject, "10%"),
    baseResult.increment6 && tryBump(baseResult.increment6.subject, "10%"),
  ].filter(Boolean);

  return suggestions.sort((a, b) => b.atarLift - a.atarLift).slice(0, limit);
}

/**
 * Find courses the student qualifies for (or comes close to), based
 * on their estimated ATAR and how well their subjects match the
 * course's prerequisites.
 *
 * Returns courses sorted by best fit:
 *   - within reach (ATAR >= guaranteed - 2)
 *   - then those slightly above reach
 *   - excludes the currently selected course
 */
export function findSimilarCourses(allCourses, studentAtar, subjects, options = {}) {
  const { excludeId = null, limit = 8 } = options;
  return allCourses
    .filter((c) => c.id !== excludeId)
    .map((c) => {
      const prereqResults = checkPrerequisites(c, subjects);
      const allPrereqsMet = prereqResults.every((r) => r.met);
      const atarGap = studentAtar - c.guaranteedAtar;
      return { course: c, prereqResults, allPrereqsMet, atarGap };
    })
    .filter((entry) => entry.atarGap >= -2)
    .sort((a, b) => {
      // Prefer prereqs met, then highest course ATAR they still qualify for
      if (a.allPrereqsMet !== b.allPrereqsMet) return a.allPrereqsMet ? -1 : 1;
      return b.course.guaranteedAtar - a.course.guaranteedAtar;
    })
    .slice(0, limit);
}

// Colour-code the ATAR result number per the spec
export function atarBand(atar) {
  if (atar >= 95) return "high"; // green
  if (atar >= 80) return "mid"; // teal
  if (atar >= 60) return "low"; // amber
  return "muted"; // grey
}

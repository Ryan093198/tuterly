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

// 2024 VTAC-style aggregate → ATAR points. Linearly interpolated
// between these anchors for in-between aggregates.
const AGGREGATE_ATAR_TABLE = [
  { agg: 210, atar: 99.95 },
  { agg: 205, atar: 99.85 },
  { agg: 200, atar: 99.6 },
  { agg: 195, atar: 99.2 },
  { agg: 190, atar: 98.55 },
  { agg: 185, atar: 97.6 },
  { agg: 180, atar: 96.3 },
  { agg: 175, atar: 94.65 },
  { agg: 170, atar: 92.6 },
  { agg: 165, atar: 90.15 },
  { agg: 160, atar: 87.25 },
  { agg: 155, atar: 83.9 },
  { agg: 150, atar: 80.1 },
  { agg: 145, atar: 75.85 },
  { agg: 140, atar: 71.2 },
  { agg: 135, atar: 66.25 },
  { agg: 130, atar: 61.05 },
  { agg: 125, atar: 55.7 },
  { agg: 120, atar: 50.35 },
  { agg: 115, atar: 45.1 },
  { agg: 110, atar: 40.1 },
  { agg: 105, atar: 35.5 },
  { agg: 100, atar: 31.2 },
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

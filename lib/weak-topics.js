// Derive the (topic, subtopic) pairs a student has been struggling with, so
// the parent practice generator can pre-suggest relevant material without
// the parent having to know what their kid is doing.
//
// Two signals feed in:
//   - `ratings`: per-session confidence ratings (1-5) on subtopics. We take
//     the *most recent* rating for each (topic, subtopic) - practice should
//     reflect current state, not what they were weak on six months ago.
//   - `flagged_questions`: questions the student tagged as "I want help with
//     this" and that haven't been marked understood. The topic is recorded
//     directly on the row.
//
// Output is a small ranked list of suggestions the modal can show as
// one-click chips.

const WEAK_THRESHOLD = 3;

/**
 * @param {{
 *   ratings: { topic: string, subtopic: string, confidence: number, session_date: string }[],
 *   flags: { topic: string | null }[],
 *   limit?: number,
 * }} args
 * @returns {{ topic: string, subtopic: string | null, source: 'rating' | 'flag', confidence?: number }[]}
 */
export function deriveWeakTopics({ ratings, flags, limit = 6 }) {
  const latestByKey = new Map();
  for (const r of ratings ?? []) {
    if (!r?.topic || !r?.subtopic) continue;
    const key = `${r.topic.trim()}|${r.subtopic.trim()}`;
    const prev = latestByKey.get(key);
    if (!prev || new Date(r.session_date) > new Date(prev.session_date)) {
      latestByKey.set(key, r);
    }
  }

  const weakRatings = Array.from(latestByKey.values())
    .filter((r) => r.confidence > 0 && r.confidence <= WEAK_THRESHOLD)
    .sort((a, b) => a.confidence - b.confidence)
    .map((r) => ({
      topic: r.topic.trim(),
      subtopic: r.subtopic.trim(),
      source: "rating",
      confidence: r.confidence,
    }));

  const seen = new Set(
    weakRatings.map((s) => `${s.topic}|${s.subtopic ?? ""}`)
  );
  const flagSuggestions = [];
  for (const f of flags ?? []) {
    const topic = f?.topic?.trim();
    if (!topic) continue;
    const key = `${topic}|`;
    if (seen.has(key)) continue;
    seen.add(key);
    flagSuggestions.push({ topic, subtopic: null, source: "flag" });
  }

  return [...weakRatings, ...flagSuggestions].slice(0, limit);
}

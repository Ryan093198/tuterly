// Per-child summary for the parent dashboard. Three numbers + a short
// list of practice suggestions, computed in one batch across every
// child so the dashboard can render N cards from a single round-trip
// to each underlying table.

import { deriveWeakTopics } from "@/lib/weak-topics";

const SNAPSHOT_WINDOW_MS = 4 * 7 * 24 * 60 * 60 * 1000;
const TOPIC_LIMIT = 3;

/**
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string[]} studentIds
 * @returns {Promise<Map<string, {
 *   sessions: number,
 *   flagsOpen: number,
 *   flagsResolved: number,
 *   suggestedTopics: { topic: string, subtopic: string | null, source: 'rating' | 'flag' | 'recent' }[],
 * }>>}
 */
export async function fetchChildSnapshots(supabase, studentIds) {
  const result = new Map();
  for (const id of studentIds) {
    result.set(id, {
      sessions: 0,
      flagsOpen: 0,
      flagsResolved: 0,
      suggestedTopics: [],
    });
  }
  if (!studentIds.length) return result;

  const sinceIso = new Date(Date.now() - SNAPSHOT_WINDOW_MS)
    .toISOString()
    .slice(0, 10);

  const [sessionsRes, flagsRes, ratingsRes] = await Promise.all([
    supabase
      .from("sessions")
      .select("student_id, date")
      .in("student_id", studentIds)
      .gte("date", sinceIso),
    supabase
      .from("flagged_questions")
      .select("student_id, topic, understood_at, flagged_at")
      .in("student_id", studentIds),
    supabase
      .from("ratings")
      .select("student_id, topic, subtopic, confidence, sessions(date)")
      .in("student_id", studentIds),
  ]);

  for (const s of sessionsRes.data ?? []) {
    const entry = result.get(s.student_id);
    if (entry) entry.sessions++;
  }

  const flagsByStudent = new Map();
  for (const f of flagsRes.data ?? []) {
    const entry = result.get(f.student_id);
    if (!entry) continue;
    if (f.understood_at) entry.flagsResolved++;
    else entry.flagsOpen++;
    if (!flagsByStudent.has(f.student_id)) flagsByStudent.set(f.student_id, []);
    flagsByStudent.get(f.student_id).push(f);
  }

  const ratingsByStudent = new Map();
  for (const r of ratingsRes.data ?? []) {
    if (!result.has(r.student_id)) continue;
    if (!ratingsByStudent.has(r.student_id))
      ratingsByStudent.set(r.student_id, []);
    ratingsByStudent.get(r.student_id).push({
      topic: r.topic,
      subtopic: r.subtopic,
      confidence: r.confidence,
      session_date: r.sessions?.date,
    });
  }

  for (const id of studentIds) {
    const ratings = ratingsByStudent.get(id) ?? [];
    const flags = (flagsByStudent.get(id) ?? []).filter((f) => !f.understood_at);
    result.get(id).suggestedTopics = suggestPracticeTopics(ratings, flags);
  }

  return result;
}

// 1. Prefer low-confidence ratings (open flags piggy-back through
//    deriveWeakTopics' built-in fallback).
// 2. If nothing scored as weak and no flagged topics exist, fall back
//    to whatever topics have been rated most recently — better than
//    showing nothing for a student who's been rated 4/5 across the
//    board.
function suggestPracticeTopics(ratings, flags) {
  const weak = deriveWeakTopics({ ratings, flags, limit: TOPIC_LIMIT });
  if (weak.length > 0) return weak;

  const seen = new Set();
  const recent = [];
  const sorted = [...ratings]
    .filter((r) => r?.topic)
    .sort((a, b) =>
      (b.session_date || "").localeCompare(a.session_date || "")
    );
  for (const r of sorted) {
    const topic = r.topic.trim();
    if (!topic || seen.has(topic)) continue;
    seen.add(topic);
    recent.push({ topic, subtopic: null, source: "recent" });
    if (recent.length >= TOPIC_LIMIT) break;
  }
  return recent;
}

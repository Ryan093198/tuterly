// Client-side helpers for the practice-worksheet flow. Callers live in
// PracticePanel (post-generation auto-open) and ResourcesPanel (re-opening
// an existing worksheet) — both need the same regenerate logic, so it's
// centralised here.

/**
 * Hit /api/practice with the parameters previously used to make this
 * worksheet. Throws on failure with the API error string.
 *
 * @param {object} resource — practice_questions resource (must have
 *                            metadata.topic_label at minimum)
 * @param {string} studentId
 * @returns {Promise<object>} the new resource row
 */
export async function regeneratePractice(resource, studentId) {
  const meta = resource?.metadata ?? {};
  if (!meta.topic_label) {
    throw new Error(
      "This worksheet was made before regenerate was supported. Use the New worksheet button."
    );
  }
  const res = await fetch("/api/practice", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      student_id: studentId,
      subject: meta.subject,
      topic_id: meta.topic_id || undefined,
      topic_label: meta.topic_label,
      subtopic: meta.subtopic || undefined,
      question_count: meta.question_count,
      difficulty: meta.difficulty,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || "Couldn't regenerate worksheet.");
  }
  return data.resource;
}

/**
 * Build the flagOptions object for a practice resource. Returns null for
 * non-practice resources so callers can pipe it straight into
 * MarkdownReport / ResourceViewer.
 */
export function buildPracticeFlagOptions(resource) {
  if (!resource || resource.category !== "practice_questions") return null;
  const meta = resource.metadata ?? {};
  return {
    resourceId: resource.id,
    topic: meta.topic_label || resource.name || null,
    flaggedSet: new Set(resource.flaggedNumbers ?? []),
  };
}

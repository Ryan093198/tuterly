// Shared helpers for the flagged-questions views (tutor / parent / student).
// Originally each page had its own extractor; with practice worksheets now
// also feeding into flagged_questions, the parsing is identical between
// reports and resources, so it lives here.

/**
 * Extract the Nth question's text + solution from markdown that follows the
 * report / practice format:
 *   **Question N** [optional difficulty]
 *   ...question body...
 *   <details>...solution...</details>
 *
 * The Nth <details> block in document order is question N.
 */
export function extractQuestion(content, n) {
  if (!content || n < 1) return null;
  const detailsRe = /<details[^>]*>([\s\S]*?)<\/details>/g;
  let count = 0;
  let prevEnd = 0;
  let match;
  while ((match = detailsRe.exec(content)) !== null) {
    count++;
    if (count === n) {
      const slice = content.slice(prevEnd, match.index);
      // Trim to the last "**Question" marker so Q1 doesn't grab the whole
      // section preamble.
      const markerIdx = slice.lastIndexOf("**Question");
      const question =
        markerIdx >= 0 ? slice.slice(markerIdx).trim() : slice.trim();
      const solution = match[1]
        .replace(/^\s*<summary>[\s\S]*?<\/summary>\s*/i, "")
        .trim();
      return { question, solution };
    }
    prevEnd = detailsRe.lastIndex;
  }
  return null;
}

/**
 * Take a raw flagged_questions row joined with reports + resources and turn
 * it into the shape the FlaggedQuestionCard expects: a single source object
 * with question text, solution, and a label to show in the card header.
 */
export function enrichFlag(flag) {
  const reportData = pickFirst(flag.reports);
  const resourceData = pickFirst(flag.resources);
  const sourceContent = reportData?.content ?? resourceData?.content ?? "";
  const extracted = extractQuestion(sourceContent, flag.question_number);
  const sessionData = pickFirst(reportData?.sessions);
  return {
    ...flag,
    question: extracted?.question,
    solution: extracted?.solution,
    source: reportData ? "report" : "resource",
    source_label: reportData
      ? sessionData?.date
        ? `Session on ${formatDate(sessionData.date)}`
        : "Session report"
      : resourceData?.name || "Practice worksheet",
    session_id: sessionData?.id ?? null,
    session_date: sessionData?.date ?? null,
    resource_name: resourceData?.name ?? null,
  };
}

function pickFirst(value) {
  if (!value) return null;
  return Array.isArray(value) ? value[0] ?? null : value;
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Shared helper: split a generated full-practice-test markdown blob into its
// two halves - the test (questions only) and the answer key (worked
// solutions). Used server-side (to persist / render PDFs) and client-side
// (to render the two download buttons). Keep the sentinel in sync with the
// one the model is instructed to emit in lib/full-test-prompt.js.

export const ANSWER_KEY_SENTINEL = "<!--TUTERLY-ANSWER-KEY-->";

/**
 * @param {string} content Full markdown as generated (test + sentinel + answers)
 * @returns {{ test: string, answers: string }}
 */
export function splitFullTest(content) {
  const raw = typeof content === "string" ? content : "";

  const idx = raw.indexOf(ANSWER_KEY_SENTINEL);
  if (idx !== -1) {
    return {
      test: raw.slice(0, idx).trim(),
      answers: raw.slice(idx + ANSWER_KEY_SENTINEL.length).trim(),
    };
  }

  // Fallback if the sentinel is missing: split on the first "# ... Answer
  // Key ..." H1 heading. Better a best-effort split than dumping the answers
  // onto the test PDF.
  const m = raw.match(/^#\s+.*answer key.*$/im);
  if (m) {
    const at = raw.indexOf(m[0]);
    return { test: raw.slice(0, at).trim(), answers: raw.slice(at).trim() };
  }

  return { test: raw.trim(), answers: "" };
}

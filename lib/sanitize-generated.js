// Deterministic clean-up for ALL AI-generated practice content: worksheets,
// practice topic questions, and full tests, at every year level.
//
// The model is told never to show its working-out chatter, but on harder
// questions it still leaks chain-of-thought / self-correction into the output
// ("wait", "let me recheck", "re-examine", "... corrected", "since the
// question expects ..."). A student or parent must never see that, so we
// strip any residue here, deterministically, before content is saved or
// turned into a PDF. This runs in-process (no extra model call) so it costs
// nothing against the function time budget.

// Phrases that mark a sentence as the model thinking out loud rather than
// stating a question or a final answer. Matched case-insensitively.
const COT_MARKERS = [
  /\bwait\b/i,
  /\bhmm+\b/i,
  /\boops\b/i,
  /let me\s+(re-?check|recompute|redo|re-?examine|re-?derive|try|be)/i,
  /let'?s\s+(re-?check|recompute|redo|re-?examine|be precise|try)/i,
  /re-?examine/i,
  /re-?check/i,
  /doesn'?t\s+reduce/i,
  /that\s+doesn'?t\b/i,
  /since the question (expects|wants|asks)/i,
  /\bcorrected\b/i,
  /\brevised\b/i,
  /\brestate/i,
  /checking\s+[a-z]\s*=/i,
  /^\s*actually[,: ]/i,
  /note\s+(to|for)\s+(the\s+)?(parent|student|tutor)/i,
];

function isReasoningSentence(sentence) {
  return COT_MARKERS.some((re) => re.test(sentence));
}

// Character-level artifacts that show up regardless of leaks.
function cleanupArtifacts(md) {
  if (typeof md !== "string") return "";
  return md
    // "(1,,-1)" / "a=1,,b=5" -> single comma
    .replace(/,\s*,+/g, ", ")
    // trailing ellipsis the model uses right before a self-correction
    .replace(/\.\.\.+/g, "")
    // collapse runs of spaces/tabs
    .replace(/[ \t]{2,}/g, " ")
    // tidy " ," -> ","
    .replace(/\s+,/g, ",");
}

// FULL clean, for any content that contains worked solutions or answers
// (worksheets with reveal solutions, practice sets, answer keys): character
// artifacts + strip chain-of-thought sentences + drop "corrected/revised"
// restart headers. Structure-preserving: it only removes sentences that read
// as the model reasoning out loud, and never touches <details>/<summary>
// tags, headings or question labels, so the worksheet layout stays intact.
export function sanitizeGenerated(md) {
  if (typeof md !== "string") return "";
  let out = cleanupArtifacts(md);

  out = out
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return line;
      // Never strip structural HTML lines (reveal-solution blocks etc.).
      if (/^<\/?(details|summary)/i.test(trimmed)) return line;
      // Drop a line that is only a "... corrected:" / "revised:" header.
      if (/\b(corrected|revised)\b\s*:?\s*$/i.test(trimmed)) return "";
      // Split into sentences and drop any that read as self-correction.
      const kept = trimmed
        .split(/(?<=[.!?])\s+/)
        .filter((s) => !isReasoningSentence(s));
      return kept.join(" ");
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return out;
}

// LIGHT clean, for question-only sheets (a full test's question paper): just
// the character artifacts. Questions should never contain reasoning, but the
// comma/space fixes still apply.
export function sanitizeArtifacts(md) {
  return cleanupArtifacts(md).replace(/\n{3,}/g, "\n\n").trim();
}

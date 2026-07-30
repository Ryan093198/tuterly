// Deterministic clean-up for generated full-test markdown.
//
// The model is told never to show its working-out chatter, but on harder
// questions it still leaks chain-of-thought and self-correction into the
// answer key ("wait", "let me recheck", "re-examine", "Question 15 -
// corrected", "Since the question expects ..."). A parent must never see
// that, so we strip any residue here, deterministically, before the content
// is ever saved or turned into a PDF. This runs in-process (no extra model
// call) so it costs nothing against the function time budget.

// Phrases that mark a sentence as the model thinking out loud rather than
// stating an answer. Matched case-insensitively against each sentence.
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

// Fix character-level artifacts that show up regardless of leaks.
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

// Full clean for answer keys: char artifacts + strip reasoning sentences +
// drop "corrected/revised" restart headers.
export function sanitizeAnswerKey(md) {
  if (typeof md !== "string") return "";
  let out = cleanupArtifacts(md);

  out = out
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return line;
      // Drop a whole line that is just a "... corrected:" / "revised:" header.
      if (/\b(corrected|revised)\b\s*:?\s*$/i.test(trimmed)) return "";
      // Split the line into sentences and drop any that read as the model
      // reasoning out loud; keep the clean ones (final answers, tidy steps).
      const sentences = trimmed.split(/(?<=[.!?])\s+/);
      const kept = sentences.filter((s) => !isReasoningSentence(s));
      return kept.join(" ");
    })
    .join("\n")
    // collapse the blank lines left behind by removed content
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return out;
}

// Lighter clean for the question sheet: just character artifacts (questions
// should never contain reasoning, but the comma/space fixes still apply).
export function sanitizeQuestions(md) {
  return cleanupArtifacts(md).replace(/\n{3,}/g, "\n\n").trim();
}

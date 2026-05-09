// Prompts for the parent-facing practice-question generator.
//
// Output contract — the markdown is rendered verbatim in MarkdownReport (and
// could be PDF'd later via the same parseBlocks pipeline as reports). Strict
// structure keeps it printable and parseable.

export const SYSTEM_INSTRUCTIONS = `You are an experienced one-on-one tutor preparing a short practice worksheet for a student to do on their own at home. The worksheet will be printed by a parent, not a tutor — assume no in-person guidance.

Produce a markdown worksheet with EXACTLY this structure:

# Practice — {Topic} — {Level}

{One short sentence (≤25 words) telling the student what the worksheet is about and to show working.}

## Questions

1. {Question text}
2. {Question text}
...

## Answer key

1. {Final answer plus 1–2 lines of working / brief explanation}
2. ...

WORKSHEET RULES:
- Generate exactly the number of questions the user requests.
- Calibrate difficulty to the student's level. Mix easier confidence-builder questions early with harder consolidation questions later.
- Questions must be self-contained — the student should be able to answer with paper, pencil and the question text alone. No "see your textbook" / "ask your tutor" / "look up X".
- Use plain ASCII / Unicode for maths. NO LaTeX (no \\frac, no $...$). Use × for multiply, ÷ for divide, ² ³ for powers, √ for square root, π for pi, fractions like 3/4, mixed numbers like 1 1/2.
- Keep numbers reasonable for mental and on-paper work — not deliberately ugly arithmetic unless the topic itself is about that.
- For English topics, questions can be short answer / multiple choice / "identify the X" / "rewrite this sentence" / "find the error" — whatever fits the topic.
- The Answer key must give the final answer AND a brief 1–2 line explanation or worked step. Don't write a full lesson — just enough for a parent to confirm the answer or for the student to self-check.
- No preamble, no closing remarks, no "I hope this helps". Output ONLY the markdown worksheet.`;

/**
 * Build the user message for a practice generation request.
 *
 * @param {{
 *   studentName: string,
 *   yearLevel: string,
 *   workingLevel?: string | null,
 *   subject: 'maths' | 'english',
 *   levelLabel: string,
 *   topicLabel: string,
 *   topicDescription?: string | null,
 *   subtopic?: string | null,
 *   questionCount: number,
 *   difficulty: 'review' | 'core' | 'stretch',
 *   recentReportContext?: string | null,
 * }} args
 */
export function buildPracticeUserMessage(args) {
  const {
    studentName,
    yearLevel,
    workingLevel,
    subject,
    levelLabel,
    topicLabel,
    topicDescription,
    subtopic,
    questionCount,
    difficulty,
    recentReportContext,
  } = args;

  const difficultyLine = {
    review: "Slant the worksheet toward review — confidence-building questions, with maybe the last 1–2 a small stretch.",
    core: "Aim for a normal mix — easier first, gradually harder, ending with one or two consolidation questions that combine ideas.",
    stretch: "Slant the worksheet harder than usual — fewer easy starters, more multi-step / unfamiliar-context questions to push the student.",
  }[difficulty] || "Aim for a normal mix — easier first, gradually harder, ending with one or two consolidation questions that combine ideas.";

  const topicLine = subtopic
    ? `Topic: ${topicLabel} — focus specifically on: ${subtopic}`
    : `Topic: ${topicLabel}`;

  return [
    `Student: ${studentName}`,
    `Year level: ${yearLevel}${
      workingLevel && workingLevel !== yearLevel
        ? ` (working at ${workingLevel})`
        : ""
    }`,
    `Subject: ${subject === "english" ? "English" : "Maths"}`,
    `Level for this worksheet: ${levelLabel}`,
    topicLine,
    topicDescription ? `Topic detail (from curriculum): ${topicDescription}` : null,
    "",
    `Number of questions: ${questionCount}`,
    difficultyLine,
    recentReportContext
      ? `\nFor context, here are excerpts from the student's most recent tutoring session report — use them to gauge what they've already covered and what level of language to use, but do not repeat these exact questions:\n\n${recentReportContext}`
      : null,
  ]
    .filter((s) => s !== null)
    .join("\n");
}

// Prompts for the parent-facing FULL PRACTICE TEST generator (behind the
// $29/mo software paywall). Unlike the short worksheet, this produces a
// whole-topic test of 25 questions in three difficulty bands, with a
// SEPARATE answer key rather than inline <details> reveals - so the two
// halves can be rendered into two printable PDFs (test + answer key).
//
// Output contract: one markdown blob = the test, then the ANSWER_KEY_SENTINEL
// line, then the answer key. lib/full-test-split.js splits on that sentinel.

import { ANSWER_KEY_SENTINEL } from "./full-test-split.js";

// Shared formatting rules, identical in spirit to the worksheet generator so
// the maths renders and no self-correction leaks through. Kept as one block
// so both prompts stay consistent.
const FORMATTING_RULES = `- USE LaTeX inside dollar-sign delimiters whenever notation matters: $...$ for inline math, $$...$$ for display math on its own line. Fractions, surds, powers, trig and Greek letters MUST be LaTeX so they render as stacked / properly-typeset notation - never as "1/2" or "x^2" in plain text.
- LaTeX commands you SHOULD use: \\frac{a}{b}, \\sqrt{x}, \\sqrt[3]{x}, x^{2}, x_{1}, \\sin, \\cos, \\tan, \\theta, \\pi, \\times, \\div, \\le, \\ge, \\ne, \\approx, \\pm.
- For systems of equations, multi-line working, or any equations that need to line up, use display math with \\begin{aligned} … \\end{aligned}. Separate lines with \\\\. The opening $$ AND closing $$ MUST each be on their own line. Example:
  $$
  \\begin{aligned}
  3x + 2y &= 16 \\\\
  5x - 2y &= 8
  \\end{aligned}
  $$
- VERIFY EACH LATEX EXPRESSION: every \\frac{}{}, every \\sqrt{}, every \\^{} must be syntactically complete and balanced. Mismatched braces break rendering.
- TABLES use GFM pipe syntax: a header row, a separator row, then data rows, each cell separated by \`|\`. Do NOT wrap whole rows in $...$ and do NOT use space-aligned columns. Each cell can contain its own inline math.
- DOLLAR SIGNS - three distinct cases, do not mix them up:
  1. MATH expressions ALWAYS use bare $...$ on both ends. Correct: "$2^{4}$", "$x^2 = 9$". Never escape a math close.
  2. PROSE MONEY (prices, costs, salaries) uses \\$NUMBER, never bare $. Correct: "She paid \\$120." (bare $ in prose opens a math span and swallows the prose to the next $).
  3. BARE NUMBERS in a sentence - data points, ages, counts, measurements - get NO dollar sign at all and are NEVER wrapped in $...$. Correct: "The temperatures were 22, 25, 19, 25."
- Outside $...$ blocks, plain Unicode is fine for short standalone symbols (½, x², √2, ×, ÷, ≈, π, θ) - but prefer LaTeX for anything more complex than a single symbol.
- WORK MATHS PRIVATELY BEFORE WRITING. Derive the full answer before emitting anything. Solutions must contain ONLY clean final reasoning. NEVER write any of: "wait", "hmm", "oops", "actually" (as a corrective interjection), "let me redo/recheck/re-derive/choose", "let's recheck/be precise/redo cleanly", "try cleaner numbers", "correction:", "correction note:", "Answer (corrected/confirmed/revised):", "Corrected question/version/setup", "Revised question", "Restatement", "Restated:", "clean(er) version", "cleaner numbers", "not clean", "isn't clean", "(see note)", "the question above is replaced", "replaced below/above". If a first attempt is wrong, silently re-derive and emit ONLY the corrected version - the reader must never see the false start.
- NEVER write meta-commentary aimed at the parent/student/tutor: no "Note to parent/student", "please disregard", "please contact your tutor", "the question above contains an error", "see the note above". If you cannot produce a clean question, REPLACE it entirely before emitting - never ship a broken one with an apology or a pointer.
- For word problems you invent (prices, distances, savings, ages), CHOOSE THE NUMBERS so the answer comes out clean (small integers, neat fractions, simple decimals). Derive backwards from a tidy answer if needed. Never ship a question whose solution produces ugly numbers you then apologise for.
- The "Answer:" line for each solution MUST agree numerically with the working below it. If they disagree you have made an error - redo privately and emit one consistent answer.`;

export const SYSTEM_INSTRUCTIONS_FULL_TEST = `You are an experienced tutor writing a full-length practice TEST that covers a whole topic, for a student to sit at home under exam-like conditions. A parent will print it. The test and its answer key are printed as two separate documents, so the answer key must be a completely separate section, NOT inline reveals.

Produce ONE markdown document with EXACTLY this structure:

# {Topic} - Practice Test - {Level}

{One short line (≤30 words): tell the student to attempt all questions, show full working, and give a suggested time (around 45-60 minutes).}

## Section A: Consolidating (Questions 1-5)

**Question 1**

{Question text. Plain prose, equations inline. Self-contained - answerable with paper and pencil alone.}

**Question 2**

{...}

(Questions 1 to 5: the most accessible questions on the topic - confidence-builders that check the core skill.)

## Section B: Standard (Questions 6-20)

**Question 6**

{...}

(Questions 6 to 20: standard questions at the student's level, spanning the whole topic. Vary the sub-skills so the 15 questions genuinely cover the topic rather than repeating one idea.)

## Section C: Advanced (Questions 21-25)

**Question 21**

{...}

(Questions 21 to 25: harder, multi-step or unfamiliar-context questions that stretch a confident student.)

${ANSWER_KEY_SENTINEL}

# {Topic} - Answer Key

**Question 1**

Answer: {final answer}

{1-3 lines of key working, enough to self-check, not a full re-teach.}

**Question 2**

Answer: {...}

{...}

(Continue for all 25 questions, in order, numbered to match the test exactly.)

TEST RULES:
- Produce EXACTLY 25 questions: 5 in Section A, 15 in Section B, 5 in Section C, numbered 1-25 continuously across the sections.
- Cover the WHOLE topic, not one narrow sub-skill. Spread the sub-skills of the topic across the 25 questions so a student who scores well has genuinely demonstrated command of the topic.
- Calibrate to the stated level. Section A is easier, Section B is on-level, Section C stretches.
- Every question is self-contained: no "see your textbook" / "ask your tutor" / "look up X".
- Use '**Question N**' on its own line, a blank line, then the question. Keep the same numbering in the test and the answer key.
- The answer key is ONE section after the ${ANSWER_KEY_SENTINEL} line. Do NOT use <details>/<summary> anywhere. Do NOT put answers next to the questions.
- Keep the answer key concise: an "Answer:" line plus 1-3 lines of working per question.
${FORMATTING_RULES}
- No preamble, no closing remarks, no "I hope this helps". Output ONLY the markdown document described above, including the ${ANSWER_KEY_SENTINEL} line exactly once between the test and the answer key.`;

/**
 * Build the user message for a full-test generation request.
 *
 * @param {{
 *   studentName: string,
 *   yearLevel: string,
 *   workingLevel?: string | null,
 *   subject: 'maths' | 'english',
 *   levelLabel: string,
 *   topicLabel: string,
 *   topicDescription?: string | null,
 *   recentReportContext?: string | null,
 * }} args
 */
export function buildFullTestUserMessage(args) {
  const {
    studentName,
    yearLevel,
    workingLevel,
    subject,
    levelLabel,
    topicLabel,
    topicDescription,
    recentReportContext,
  } = args;

  return [
    `Student: ${studentName}`,
    `Year level: ${yearLevel}${
      workingLevel && workingLevel !== yearLevel
        ? ` (working at ${workingLevel})`
        : ""
    }`,
    `Subject: ${subject === "english" ? "English" : "Maths"}`,
    `Level for this test: ${levelLabel}`,
    `Topic (cover the whole topic): ${topicLabel}`,
    topicDescription ? `Topic detail (from curriculum): ${topicDescription}` : null,
    "",
    "Produce a 25-question full practice test on this topic: 5 consolidating, 15 standard, 5 advanced, with a separate answer key, following the exact structure and rules in the system message.",
    recentReportContext
      ? `\nFor context, excerpts from the student's most recent session report - use them to gauge what they have covered and the right level of language, but do not reuse these exact questions:\n\n${recentReportContext}`
      : null,
  ]
    .filter((s) => s !== null)
    .join("\n");
}

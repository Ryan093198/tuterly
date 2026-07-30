// Prompts for the parent-facing FULL PRACTICE TEST generator (behind the
// $29/mo software paywall). A full test is a whole-topic-area test of 25
// questions in three difficulty bands, with a SEPARATE answer key.
//
// Generation is split into TWO calls so each stays well under Vercel's 60s
// function limit:
//   1. QUESTIONS ONLY  -> SYSTEM_INSTRUCTIONS_FULL_TEST_QUESTIONS
//   2. ANSWER KEY for those questions -> SYSTEM_INSTRUCTIONS_FULL_TEST_ANSWERS
// The two halves are stored joined by ANSWER_KEY_SENTINEL (see
// lib/full-test-split.js) so both PDFs can be rendered later.

import { ANSWER_KEY_SENTINEL } from "./full-test-split.js";

// Shared formatting rules, identical in spirit to the worksheet generator so
// the maths renders and no self-correction leaks through.
const FORMATTING_RULES = `- USE LaTeX inside dollar-sign delimiters whenever notation matters: $...$ for inline math, $$...$$ for display math on its own line. Fractions, surds, powers, trig and Greek letters MUST be LaTeX so they render as stacked / properly-typeset notation - never as "1/2" or "x^2" in plain text.
- LaTeX commands you SHOULD use: \\frac{a}{b}, \\sqrt{x}, \\sqrt[3]{x}, x^{2}, x_{1}, \\sin, \\cos, \\tan, \\theta, \\pi, \\times, \\div, \\le, \\ge, \\ne, \\approx, \\pm.
- For systems of equations or multi-line working, use display math with \\begin{aligned} … \\end{aligned}. Separate lines with \\\\. The opening $$ AND closing $$ MUST each be on their own line.
- VERIFY EACH LATEX EXPRESSION: every \\frac{}{}, every \\sqrt{}, every \\^{} must be syntactically complete and balanced. Mismatched braces break rendering.
- TABLES use GFM pipe syntax: a header row, a separator row, then data rows, each cell separated by \`|\`. Do NOT wrap whole rows in $...$.
- DOLLAR SIGNS - three cases, do not mix them up:
  1. MATH expressions ALWAYS use bare $...$ on both ends. Never escape a math close.
  2. PROSE MONEY (prices, costs) uses \\$NUMBER, never bare $. Correct: "She paid \\$120."
  3. BARE NUMBERS in a sentence (data points, ages, counts) get NO dollar sign and are NEVER wrapped in $...$. Correct: "The temperatures were 22, 25, 19, 25."
- Outside $...$ blocks, plain Unicode is fine for short standalone symbols (½, x², √2, ×, ÷, ≈, π, θ) - but prefer LaTeX for anything more complex than a single symbol.
- For word problems you invent (prices, distances, savings, ages), CHOOSE THE NUMBERS so the answer comes out clean (small integers, neat fractions, simple decimals). Derive backwards from a tidy answer if needed.`;

const NO_LEAK_RULES = `- WORK MATHS PRIVATELY BEFORE WRITING. Derive the full answer before emitting anything. Solutions must contain ONLY clean final reasoning. NEVER write any of: "wait", "hmm", "oops", "actually" (as a corrective interjection), "let me redo/recheck/re-derive/choose", "let's recheck/be precise/redo cleanly", "try cleaner numbers", "correction:", "correction note:", "Answer (corrected/confirmed/revised):", "Corrected question/version/setup", "Revised question", "Restatement", "Restated:", "clean(er) version", "cleaner numbers", "not clean", "isn't clean", "(see note)", "the question above is replaced", "replaced below/above". If a first attempt is wrong, silently re-derive and emit ONLY the corrected version.
- NEVER write meta-commentary aimed at the parent/student/tutor: no "Note to parent/student", "please disregard", "please contact your tutor", "the question above contains an error", "see the note above". If you cannot produce a clean question, REPLACE it entirely before emitting.`;

// ---- Call 1: questions only --------------------------------------------

export const SYSTEM_INSTRUCTIONS_FULL_TEST_QUESTIONS = `You are an experienced tutor writing a full-length practice TEST that covers a whole topic area, for a student to sit at home under exam-like conditions. A parent will print it. Output ONLY the questions - the answer key is produced separately, so do NOT include any answers, solutions, working, or <details> blocks here.

Produce ONE markdown document with EXACTLY this structure:

# {Topic area} - Practice Test - {Level}

{One short line (≤30 words): tell the student to attempt all questions, show full working, and give a suggested time (around 45-60 minutes).}

## Section A: Consolidating (Questions 1-5)

**Question 1**

{Question text. Plain prose, equations inline. Self-contained - answerable with paper and pencil alone.}

**Question 2**

{...}

## Section B: Standard (Questions 6-20)

**Question 6**

{...}

## Section C: Advanced (Questions 21-25)

**Question 21**

{...}

TEST RULES:
- Produce EXACTLY 25 questions: 5 in Section A, 15 in Section B, 5 in Section C, numbered 1-25 continuously across the sections.
- Cover the WHOLE topic area broadly, not one narrow sub-skill. Spread the sub-skills across the 25 questions so a student who scores well has genuinely demonstrated command of the area. Section A is easier, Section B on-level, Section C stretches.
- Every question is self-contained: no "see your textbook" / "ask your tutor".
- Use '**Question N**' on its own line, a blank line, then the question.
- DO NOT include any answers, solutions, hints, or working. Questions only.
${FORMATTING_RULES}
${NO_LEAK_RULES}
- No preamble, no closing remarks. Output ONLY the markdown test described above.`;

// ---- Call 2: answer key for the given questions ------------------------

export const SYSTEM_INSTRUCTIONS_FULL_TEST_ANSWERS = `You are writing the ANSWER KEY for a practice test that has already been written. You will be given the exact 25 questions. This is a clean answer key, like the back of a textbook - NOT a worked-solutions essay. A parent reads it, so it must look polished and finished.

Output ONE markdown document with EXACTLY this structure:

# {Topic area} - Answer Key

**Question 1**

Answer: {the final answer, stated once}

{OPTIONAL: at most ONE short, tidy line showing the key step. Omit it entirely if the answer speaks for itself.}

**Question 2**

Answer: {...}

...

ABSOLUTE RULES:
- Solve each question COMPLETELY in private before writing anything for it. Everything you write is final and correct on the first pass.
- State exactly ONE final answer per question (or per part, e.g. (a) and (b)). Never give two versions, never revise, never show a first attempt or an alternative.
- Show AT MOST one or two short, tidy steps - or none at all. This is an answer key, not a walkthrough.
- It is STRICTLY FORBIDDEN to show any thinking, checking, verifying, re-deriving or second-guessing. Never write: "wait", "hmm", "oops", "actually", "let me check/recheck/redo/re-examine/re-derive", "let's ...", "re-examine", "doesn't reduce", "that doesn't ...", "since the question expects", "checking x=", "corrected", "revised", "restate", or any note to the parent/student/tutor. If a question is hard or a line looks messy, silently discard it and write ONLY the clean final answer - the reader must never see a correction.
- Never end a line with "..." leading into a reconsideration. Every line is finished, correct maths.
- Provide an answer for ALL 25 questions, numbered 1-25 to match the test exactly, in order.
- Do NOT restate the question. Do NOT use <details>/<summary>.
${FORMATTING_RULES}
${NO_LEAK_RULES}
- No preamble, no closing remarks. Output ONLY the answer key markdown, starting with the "# ... Answer Key" heading.`;

export { ANSWER_KEY_SENTINEL };

function levelLine(yearLevel, workingLevel) {
  return `Year level: ${yearLevel}${
    workingLevel && workingLevel !== yearLevel ? ` (working at ${workingLevel})` : ""
  }`;
}

/**
 * User message for call 1 (questions).
 * @param {{ studentName: string, yearLevel: string, workingLevel?: string|null,
 *   subject: 'maths'|'english', levelLabel: string, topicLabel: string,
 *   topicDescription?: string|null, recentReportContext?: string|null }} args
 */
export function buildFullTestQuestionsMessage(args) {
  const {
    studentName, yearLevel, workingLevel, subject, levelLabel,
    topicLabel, topicDescription, recentReportContext,
  } = args;
  return [
    `Student: ${studentName}`,
    levelLine(yearLevel, workingLevel),
    `Subject: ${subject === "english" ? "English" : "Maths"}`,
    `Level for this test: ${levelLabel}`,
    `Topic area (cover the whole area broadly): ${topicLabel}`,
    topicDescription ? `Area detail (from curriculum): ${topicDescription}` : null,
    "",
    "Produce a 25-question full practice test covering this whole topic area: 5 consolidating, 15 standard, 5 advanced. Questions only, no answers, following the exact structure and rules in the system message.",
    recentReportContext
      ? `\nFor context, excerpts from the student's most recent session report - use them to gauge level and language, but do not reuse these exact questions:\n\n${recentReportContext}`
      : null,
  ].filter((s) => s !== null).join("\n");
}

/**
 * User message for call 2 (answer key).
 * @param {{ topicLabel: string, levelLabel: string, subject: 'maths'|'english',
 *   questionsMarkdown: string }} args
 */
export function buildFullTestAnswersMessage(args) {
  const { topicLabel, levelLabel, subject, questionsMarkdown } = args;
  return [
    `Topic area: ${topicLabel}`,
    `Level: ${levelLabel}`,
    `Subject: ${subject === "english" ? "English" : "Maths"}`,
    "",
    "Here is the full practice test. Produce the answer key for these exact questions, numbered to match, following the structure and rules in the system message.",
    "",
    questionsMarkdown,
  ].join("\n");
}

// Independent check of a generated worksheet before it is reused for other
// visitors (app/api/worksheets/verify). The checker solves each question
// itself, then compares with the worksheet's answer and working.

export const CHECK_SYSTEM = `You are a meticulous Australian maths teacher checking a practice worksheet before it is given to students. You did not write it.

For EACH of the six questions:
1. Read the question. Decide whether it is clear, self-contained and solvable as written (all needed numbers given, no contradictions, e.g. a triangle claimed to be right-angled must actually be right-angled).
2. Solve it yourself from scratch, showing brief working in the "working" field. Do this BEFORE looking closely at the worksheet's solution.
3. Compare: does the worksheet's stated final answer match yours? Does the worksheet's own working reach the same answer it states (no answer line that disagrees with the working, no two different final answers)?
4. Flag any visible self-correction or thinking out loud in the solution (e.g. "wait", "let me recompute", "corrected question"), any duplicated or missing question, and any question that is clearly above the stated year level.

Rounding differences that follow the question's instructions are fine. Equivalent forms (0.5 and 1/2, x = 2 or 3 written either way) are fine. Multi-part questions must be right in every part.

Call the report_check tool once with your findings.`;

export const CHECK_TOOL = {
  name: "report_check",
  description: "Report the check of the six worksheet questions.",
  input_schema: {
    type: "object",
    properties: {
      questions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            n: { type: "integer" },
            working: { type: "string", description: "Your own brief working, done before comparing." },
            my_answer: { type: "string" },
            stated_answer: { type: "string" },
            ok: { type: "boolean", description: "True only if the question is sound and the worksheet's answer and working are both correct and agree." },
            issue: { type: "string", description: "Empty if ok. Otherwise what is wrong, in one sentence." },
          },
          required: ["n", "working", "my_answer", "stated_answer", "ok", "issue"],
        },
      },
      structure_ok: { type: "boolean", description: "Exactly six questions numbered 1 to 6, Foundation (1-2), Standard (3-4) and Extension (5-6), each with one worked solution." },
      structure_issue: { type: "string" },
    },
    required: ["questions", "structure_ok", "structure_issue"],
  },
};

export function checkUserMessage({ yearLevel, topicLabel, content }) {
  return `Year level: ${yearLevel}\nTopic: ${topicLabel}\n\nWorksheet to check:\n\n${content}`;
}

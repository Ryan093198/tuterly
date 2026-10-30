import fs from "node:fs";
import path from "node:path";
import { cleanMathText } from "@/lib/math-text-fixes";

// Worked examples, common mistakes and a practice question for each topic
// page (/worksheets/[slug]). Content lives in content/worked-examples/
// <slug>.json, written by AI and checked before it was saved: every
// question's answer was confirmed by an independent second solve.
// Pages without a file simply don't show these sections.
const DIR = path.join(process.cwd(), "content", "worked-examples");

export function getWorkedExamples(slug) {
  const file = path.join(DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  let d;
  try {
    d = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
  if (!d || d.failed || !d.checked || !Array.isArray(d.examples)) return null;
  const c = cleanMathText;
  return {
    examples: d.examples.map((e) => ({ title: c(e.title), question: c(e.question), solution: c(e.solution), answer: c(e.answer) })),
    mistakes: (d.mistakes || []).map((m) => ({ title: c(m.title), wrong: c(m.wrong), fix: c(m.fix) })),
    practice: d.practice ? { question: c(d.practice.question), answer: c(d.practice.answer), solution: c(d.practice.solution) } : null,
    // The short direct answer at the top of the page (40 to 60 words), and
    // the auto-marked "Your turn" question. Both were checked by an
    // independent second solve and, for the answer, by code (Oct 2026).
    summary: d.summary?.a ? { q: c(d.summary.q), a: c(d.summary.a) } : null,
    turn: d.turn?.question && d.turn_checked
      ? {
          question: c(d.turn.question),
          kind: d.turn.kind,
          accept: d.turn.accept || {},
          answer: c(d.turn.answer_display),
          hint: c(d.turn.hint || ""),
          solution: c(d.turn.solution),
        }
      : null,
  };
}

import fs from "node:fs";
import path from "node:path";
import { cleanMathText } from "@/lib/math-text-fixes";

// NAPLAN numeracy practice hubs (/naplan, /naplan/year-N-numeracy).
// Facts checked 30 Oct 2026 against the official sources in NAPLAN_SOURCES.
// The 20 questions per year are Tuterly's own NAPLAN-style questions
// (content/naplan/year-N.json), written by AI and each confirmed by an
// independent second solve; never copies of real NAPLAN questions.
export const NAPLAN_YEARS = [3, 5, 7, 9];
export const naplanSlug = (y) => `year-${y}-numeracy`;
export const yearFromSlug = (slug) => {
  const m = /^year-(3|5|7|9)-numeracy$/.exec(slug || "");
  return m ? Number(m[1]) : null;
};

export const NAPLAN_FACTS = {
  window: "10 to 22 March 2027",
  windowNote: "Schools choose the exact days within the national test window.",
  minutes: { 3: 45, 5: 50, 7: 65, 9: 65 },
  strands: "number, algebra, measurement, space, statistics and probability",
  levels: ["Exceeding", "Strong", "Developing", "Needs additional support"],
};

export const NAPLAN_SOURCES = [
  { label: "NAP: key dates", url: "https://www.nap.edu.au/naplan/key-dates" },
  { label: "NAP: numeracy", url: "https://www.nap.edu.au/naplan/numeracy" },
  { label: "NAP: tailored tests", url: "https://www.nap.edu.au/naplan/understanding-online-assessment/tailored-tests" },
  { label: "NAPLAN 2026 information for parents and carers (SCSA WA)", url: "https://k10outline.scsa.wa.edu.au/__data/assets/pdf_file/0017/1230515/NAPLAN-2026-Information-for-parents-and-carers-brochure-alternative-format-paper.PDF" },
  { label: "NAP: public demonstration site", url: "https://www.nap.edu.au/naplan/public-demonstration-site" },
];

export const OFFICIAL_DEMO = "https://www.nap.edu.au/naplan/public-demonstration-site";

export function calculatorLine(y) {
  return y >= 7
    ? "The test starts with a short non-calculator section. For the rest of the test an online calculator is available."
    : "No calculator. Students work questions out mentally or on paper.";
}

export function naplanFaqs(y) {
  const mins = NAPLAN_FACTS.minutes[y];
  return [
    {
      q: `When is the Year ${y} NAPLAN numeracy test in 2027?`,
      a: `NAPLAN 2027 runs from ${NAPLAN_FACTS.window}. ${NAPLAN_FACTS.windowNote} Ask your child’s school for their timetable.`,
    },
    {
      q: `How long is the Year ${y} numeracy test?`,
      a: `${mins} minutes. ${calculatorLine(y)}`,
    },
    {
      q: "What does the numeracy test cover?",
      a: `Maths from the Australian Curriculum across ${NAPLAN_FACTS.strands}. Questions are multiple choice, typed answers and on-screen tasks such as drag and drop.`,
    },
    {
      q: "Is NAPLAN online and does it change as you go?",
      a: "Yes. Most schools sit NAPLAN online, and the numeracy test is tailored: everyone starts with the same set of questions, and how a student goes decides whether the next sets are easier or harder.",
    },
    {
      q: "How are NAPLAN results reported?",
      a: `Results are reported against four proficiency levels: ${NAPLAN_FACTS.levels.join(", ")}. Schools give families an individual student report later in the year.`,
    },
    {
      q: "Is this an official NAPLAN test?",
      a: "No. These are Tuterly’s own NAPLAN-style practice questions, written to match the style and content of the numeracy test, with a worked solution for each. NAPLAN is run by ACARA, and its public demonstration site has official sample tests (without answers).",
    },
  ];
}

const DIR = path.join(process.cwd(), "content", "naplan");

export function getNaplanTest(y) {
  const file = path.join(DIR, `year-${y}.json`);
  if (!fs.existsSync(file)) return null;
  const d = JSON.parse(fs.readFileSync(file, "utf8"));
  const c = cleanMathText;
  return d.questions.map((q) => ({
    n: q.n,
    strand: q.strand,
    skill: q.skill,
    calculator: !!q.calculator,
    format: q.format,
    question: c(q.question),
    options: q.format === "choice" ? q.options.map((o) => c(o)) : null,
    answerIndex: q.format === "choice" ? q.answer_index : null,
    accept: q.format === "number" ? q.accept : null,
    solution: c(q.solution),
  }));
}

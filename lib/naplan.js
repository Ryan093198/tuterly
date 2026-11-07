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

// ACARA's archive of the old paper tests, with answers (checked 7 Nov 2026).
// "ACARA does not provide access to the NAPLAN tests after 2016."
export const PAST_PAPERS = {
  "2012-2016": "https://acara.edu.au/assessment/naplan/naplan-2012-2016-test-papers",
  "2008-2011": "https://acara.edu.au/assessment/naplan/naplan-2008-2011-test-papers",
};

export const naplanPdfPath = (y) => `/naplan/${naplanSlug(y)}/practice-test.pdf`;

// Practise by strand: the Year 7 to 9 worksheet pages that cover what each
// NAPLAN year tests (each has a free 10-question PDF with answers).
export const STRAND_PRACTICE = {
  7: [
    { strand: "Number", slugs: ["year-7-percentages", "year-7-fraction-operations", "year-7-integers", "year-7-ratios", "year-7-prime-factors", "year-7-square-roots"] },
    { strand: "Algebra", slugs: ["year-7-algebra", "year-7-linear-equations", "year-7-expressions", "year-7-tables-of-values"] },
    { strand: "Measurement", slugs: ["year-7-area-perimeter", "year-7-volume", "year-7-circles"] },
    { strand: "Space", slugs: ["year-7-angles", "year-7-angles-in-triangles", "year-7-transformations", "year-7-geometry"] },
    { strand: "Statistics and probability", slugs: ["year-7-statistics", "year-7-probability", "year-7-dot-plots-stem-and-leaf"] },
  ],
  9: [
    { strand: "Number", slugs: ["year-9-scientific-notation", "year-9-exponent-laws", "year-9-simple-interest", "year-8-percentages", "year-9-direct-proportion", "year-8-speed-distance-time"] },
    { strand: "Algebra", slugs: ["year-9-algebra", "year-9-linear-equations", "year-9-coordinate-geometry"] },
    { strand: "Measurement", slugs: ["year-9-surface-area-volume", "year-8-circles", "year-8-area-perimeter", "year-9-measurement-error"] },
    { strand: "Space", slugs: ["year-9-pythagoras", "year-9-enlargements", "year-8-congruence-similarity", "year-9-trigonometry"] },
    { strand: "Statistics and probability", slugs: ["year-9-statistics", "year-9-probability", "year-9-venn-diagrams-probability", "year-9-comparing-data"] },
  ],
};

// Learn articles for each NAPLAN year.
export const NAPLAN_READING = {
  3: ["year-3-naplan-preparation-guide-victorian-parents", "naplan-maths-practice-what-actually-helps"],
  5: ["year-5-naplan-what-to-expect", "year-5-naplan-preparation-guide-victorian-parents", "naplan-maths-practice-what-actually-helps"],
  7: ["how-to-read-naplan-results-victorian-parents", "naplan-below-national-average-how-to-close-the-gap"],
  9: ["year-9-naplan-preparation-guide-victorian-parents", "how-to-read-naplan-results-victorian-parents"],
};

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
      a: "No. These are Tuterly’s own NAPLAN-style practice questions, written to match the style and content of the numeracy test, with a worked solution for each. NAPLAN is run by ACARA. Its public demonstration site has official example tests, with answer keys but no worked solutions.",
    },
    {
      q: `Where can I find Year ${y} NAPLAN past papers?`,
      a: `ACARA publishes the old paper tests from 2008 to 2016, with answers, for free on its website. It doesn’t release tests after 2016. Our NAPLAN past papers guide links to them and explains how to use them now that NAPLAN is online.`,
    },
    {
      q: "Can I print this practice test?",
      a: `Yes. Download the free PDF: all 20 questions, then the answers with a worked solution for each. No sign-up needed.`,
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

const LETTERS = ["A", "B", "C", "D", "E"];
// Each line its own paragraph, except rows of a markdown table.
const para = (t) =>
  String(t || "").replace(/\.\.\./g, "…")
    .split(/\n+/)
    .reduce((out, line, i, all) => {
      if (i === 0) return line;
      const table = /^\s*\|/.test(line) && /^\s*\|/.test(all[i - 1]);
      return out + (table ? "\n" : "\n\n") + line;
    }, "");

// The printable version of a year's test, as markdown for the PDF pipeline:
// questions (with lettered options), then answers with worked solutions.
export function naplanPdfMarkdown(y) {
  const qs = getNaplanTest(y);
  if (!qs?.length) return null;
  const nonCalc = qs.filter((q) => !q.calculator).length;
  const head =
    y >= 7
      ? `Do questions 1 to ${nonCalc} without a calculator. You can use a calculator for the rest. Suggested time: about 30 minutes.`
      : "No calculator. Use paper for working. Suggested time: about 25 minutes.";
  const qmd = [head];
  const amd = [];
  qs.forEach((q, i) => {
    if (y >= 7 && i === 0) qmd.push(`## Non-calculator (Questions 1-${nonCalc})`);
    if (y >= 7 && i === nonCalc) qmd.push(`## Calculator allowed (Questions ${nonCalc + 1}-${qs.length})`);
    qmd.push(`**Question ${q.n}**`, para(q.question));
    if (q.options) qmd.push(q.options.map((o, j) => `(${LETTERS[j]}) ${o}`).join("\n\n"));
    else qmd.push("Answer: ____________");
    const ans = q.options ? `(${LETTERS[q.answerIndex]}) ${q.options[q.answerIndex]}` : null;
    amd.push(`**Question ${q.n}**${ans ? `: ${ans}` : ""}`, para(q.solution));
  });
  return { questions: qmd.join("\n\n"), answers: amd.join("\n\n"), count: qs.length };
}

import fs from "node:fs";
import path from "node:path";
import { cleanMathText } from "@/lib/math-text-fixes";
import { getWorkedExamples } from "@/lib/worked-examples";
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";

// Exam generator topics by textbook section name (Ryan, 8 Nov 2026: "we
// don't need chapter numbers, just the names"). content/exam-sections/
// <year>.json lists each section, its strand and the questions that test
// it, drawn from three checked sources:
//   tt: a question from that year's written topic test (answer key only)
//   we: a worked example, "Your turn" or practice question (full solution)
//   nq: a question written for that section, stored in the file itself
//       (full solution, every answer checked by code)
// A year without a file falls back to the topic-page catalogue.
const DIR = path.join(process.cwd(), "content", "exam-sections");
const TT_DIR = path.join(process.cwd(), "content", "topic-tests");

export const STRAND_ORDER = ["Number", "Algebra", "Measurement", "Space", "Statistics", "Probability"];

const yearFile = (year) => year.toLowerCase().replace(/\s+/g, "-"); // "Year 10A" -> "year-10a"
const sectionSlug = (year, code) => `${yearFile(year)}-${String(code).toLowerCase()}`;

const mapCache = new Map();
export function getSectionMap(year) {
  if (mapCache.has(year)) return mapCache.get(year);
  const file = path.join(DIR, `${yearFile(year)}.json`);
  let d = null;
  try {
    if (fs.existsSync(file)) d = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    d = null;
  }
  mapCache.set(year, d);
  return d;
}

// "**Question N**" blocks of a topic test, by number. The section header
// lines between questions ("## Section C: Advanced ...") are dropped, and
// questions from the last section are marked extended response.
const ttCache = new Map();
function topicTest(year, topicId) {
  const key = `${year}|${topicId}`;
  if (ttCache.has(key)) return ttCache.get(key);
  let out = null;
  try {
    const d = JSON.parse(fs.readFileSync(path.join(TT_DIR, yearFile(year), `${topicId}.json`), "utf8"));
    const split = (md) => {
      const parts = String(md || "").split(/^\*\*Question (\d+)\*\*\s*$/m);
      const m = {};
      for (let i = 1; i < parts.length; i += 2) {
        m[Number(parts[i])] = parts[i + 1].replace(/^##\s.*$/gm, "").trim();
      }
      return m;
    };
    const advanced = new Set();
    const sec = String(d.questions_md).match(/##\s*Section C[^\n]*\(Questions\s*(\d+)\s*-\s*(\d+)\)/i);
    if (sec) for (let n = Number(sec[1]); n <= Number(sec[2]); n++) advanced.add(n);
    out = { q: split(d.questions_md), a: split(d.answers_md), advanced };
  } catch {
    out = null;
  }
  ttCache.set(key, out);
  return out;
}

const pageByTopicId = (year, topicId) => WORKSHEET_LANDING_PAGES.find((p) => p.yearLevel === year && p.topicId === topicId);

// One item reference -> { kind, question, answer, solution, slug } or null.
// An item may come from another year's bank ("year": "Year 10A" on a
// Year 10 section, for Year 10 content that sits in the 10A topic tests).
function resolve(sectionYear, it) {
  const year = it.year || sectionYear;
  const c = cleanMathText;
  if (it.src === "tt") {
    const t = topicTest(year, it.topic_id);
    const q = t?.q[it.q];
    const a = t?.a[it.q];
    if (!q || !a) return null;
    return {
      kind: t.advanced.has(it.q) ? "extended" : "short",
      question: c(q),
      answer: c(a.replace(/^Answer:\s*/i, "")),
      solution: "",
      slug: pageByTopicId(year, it.topic_id)?.slug || null,
    };
  }
  if (it.src === "we") {
    const w = getWorkedExamples(it.slug);
    if (!w) return null;
    if (it.part === "examples") {
      const e = w.examples[it.i];
      return e ? { kind: "short", question: e.question, answer: e.answer, solution: e.solution, slug: it.slug } : null;
    }
    if (it.part === "turn" && w.turn) {
      return { kind: "short", question: w.turn.question.replace(/\s*Enter [^.]*\.\s*$/i, ""), answer: w.turn.answer, solution: w.turn.solution, slug: it.slug };
    }
    if (it.part === "practice" && w.practice) {
      return { kind: "extended", question: w.practice.question, answer: w.practice.answer, solution: w.practice.solution, slug: it.slug };
    }
    return null;
  }
  if (it.src === "nq" && it.question && it.answer) {
    return { kind: it.kind === "extended" ? "extended" : "short", question: c(it.question), answer: c(it.answer), solution: c(it.solution || ""), slug: it.slug || null };
  }
  return null;
}

const qCache = new Map();
// Questions for one section slug ("year-7-1c"), resolved and cached.
export function sectionQuestions(year, slug) {
  const key = `${year}|${slug}`;
  if (qCache.has(key)) return qCache.get(key);
  const map = getSectionMap(year);
  const sec = map?.sections?.find((s) => sectionSlug(year, s.code) === slug);
  const list = sec ? sec.items.map((it) => resolve(year, it)).filter(Boolean).map((q) => ({ ...q, topic: sec.name, strand: sec.strand })) : [];
  qCache.set(key, list);
  return list;
}

// The picker for one year, or null if the year has no section file:
// [{ key, name, topics: [{ slug, name, count }] }], strands in order,
// sections in textbook order, only sections with questions.
export function sectionCatalogue(year) {
  const map = getSectionMap(year);
  if (!map?.sections?.length) return null;
  const groups = [];
  for (const strand of STRAND_ORDER) {
    const topics = map.sections
      .filter((s) => s.strand === strand)
      .map((s) => ({ slug: sectionSlug(year, s.code), name: s.name, count: sectionQuestions(year, sectionSlug(year, s.code)).length }))
      .filter((t) => t.count > 0);
    if (topics.length) groups.push({ key: strand, name: strand, topics });
  }
  return groups;
}

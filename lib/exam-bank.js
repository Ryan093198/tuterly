import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { getWorkedExamples } from "@/lib/worked-examples";
import { sectionCatalogue, sectionQuestions } from "@/lib/exam-sections";

// Practice exam generator (/exam-generator). Builds an exam from the
// questions already published on the topic pages (content/worked-examples):
// per topic, three worked-example questions, the practice question and the
// "Your turn" question, each one checked by an independent second solve.
// Nothing is written by AI at request time.

export const EXAM_YEARS = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 10A"];
export const EXAM_MAX_QUESTIONS = 20;

const STRANDS = [
  ["N", "Number"],
  ["A", "Algebra"],
  ["M", "Measurement"],
  ["SP", "Space and geometry"],
  ["ST", "Statistics"],
  ["P", "Probability"],
];
const STRAND_NAME = Object.fromEntries(STRANDS);

function strandOf(page) {
  let rest = page.topicId.replace(/^VC2M/, "");
  rest = page.yearLevel === "Year 10A" ? rest.replace(/^10A/, "") : rest.replace(/^\d+/, "");
  return (rest.match(/^(SP|ST|N|A|M|P)/) || ["N"])[0];
}

// What the topic picker shows: { "Year 7": [{ key, name, topics: [{ slug, name }] }] }.
// Only topics that have checked questions are listed.
export function getExamCatalogue() {
  const out = {};
  for (const year of EXAM_YEARS) {
    const bySection = sectionCatalogue(year);
    if (bySection) {
      out[year] = bySection;
      continue;
    }
    const groups = [];
    for (const [key, name] of STRANDS) {
      const topics = WORKSHEET_LANDING_PAGES.filter(
        (p) => p.yearLevel === year && strandOf(p) === key && hasQuestions(p.slug)
      ).map((p) => ({ slug: p.slug, name: p.topic, count: topicQuestions(p.slug).length }));
      if (topics.length) groups.push({ key, name, topics });
    }
    out[year] = groups;
  }
  return out;
}

const qCache = new Map();
function topicQuestions(slug) {
  if (qCache.has(slug)) return qCache.get(slug);
  const w = getWorkedExamples(slug);
  const list = [];
  if (w) {
    for (const e of w.examples) list.push({ kind: "short", question: e.question, answer: e.answer, solution: e.solution });
    if (w.turn) list.push({ kind: "short", question: w.turn.question.replace(/\s*Enter [^.]*\.\s*$/i, ""), answer: w.turn.answer, solution: w.turn.solution });
    if (w.practice) list.push({ kind: "extended", question: w.practice.question, answer: w.practice.answer, solution: w.practice.solution });
  }
  qCache.set(slug, list);
  return list;
}
function hasQuestions(slug) {
  return topicQuestions(slug).length > 0;
}

// Marks from the length of the worked solution (numbered steps), so a
// one-step question is worth 1 and a long worded problem up to 4.
// Topic test questions have no numbered solution, so their marks come from
// the number of parts, (a), (b) and so on.
function marksFor(q) {
  const steps = (q.solution.match(/^\s*\d+\.\s/gm) || []).length;
  const parts = new Set((q.question.match(/\(([a-h])\)/g) || [])).size;
  const m = q.solution ? Math.max(1, Math.min(4, Math.round(steps / 2))) : Math.max(1, Math.min(4, parts || 1));
  return q.kind === "extended" ? Math.max(2, m) : m;
}

function shuffle(arr, rand) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Small seeded random, so one exam can be rebuilt from its seed.
function seeded(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Returns null if the year or topics are invalid.
// onlyAuto: only questions with a reviewed marking key (Teacher Zone papers),
// and the keys are kept on each question (server side only).
export function buildExam({ year, slugs, seed = Date.now(), max = EXAM_MAX_QUESTIONS, onlyAuto = false }) {
  if (!EXAM_YEARS.includes(year) || !Array.isArray(slugs)) return null;
  const bySection = sectionCatalogue(year);
  const valid = new Set(
    bySection
      ? bySection.flatMap((g) => g.topics.map((t) => t.slug))
      : WORKSHEET_LANDING_PAGES.filter((p) => p.yearLevel === year && hasQuestions(p.slug)).map((p) => p.slug)
  );
  const questionsFor = (s) => {
    const qs = bySection ? sectionQuestions(year, s) : topicQuestions(s);
    return onlyAuto ? qs.filter((q) => q.key) : qs;
  };
  const chosen = [...new Set(slugs)].filter((s) => valid.has(s) && (!onlyAuto || questionsFor(s).length));
  if (!chosen.length) return null;
  const rand = seeded(seed);

  // Share the questions out across the topics, round robin, up to the max.
  const pools = Object.fromEntries(chosen.map((s) => [s, shuffle(questionsFor(s), rand)]));
  const order = shuffle(chosen, rand);
  const picked = [];
  let added = true;
  while (picked.length < max && added) {
    added = false;
    for (const s of order) {
      if (picked.length >= max) break;
      const q = pools[s].shift();
      if (q) {
        picked.push({ ...q, pool: s, slug: bySection ? q.slug : s });
        added = true;
      }
    }
  }

  const pageBySlug = Object.fromEntries(WORKSHEET_LANDING_PAGES.map((p) => [p.slug, p]));
  const withMeta = picked.map((q) => ({
    ...q,
    topic: bySection ? q.topic : pageBySlug[q.slug].topic,
    strand: bySection ? q.strand : STRAND_NAME[strandOf(pageBySlug[q.slug])],
    marks: marksFor(q),
  }));
  // Section A: short answer, Section B: extended response. Shuffled within each.
  const a = shuffle(withMeta.filter((q) => q.kind === "short"), rand);
  const b = shuffle(withMeta.filter((q) => q.kind === "extended"), rand);
  const sections = [];
  let n = 0;
  const number = (qs) => qs.map((q) => ({ ...q, n: ++n }));
  if (a.length) sections.push({ title: "Section A: Short answer", questions: number(a) });
  if (b.length) sections.push({ title: "Section B: Extended response", questions: number(b) });

  const totalMarks = withMeta.reduce((s, q) => s + q.marks, 0);
  const minutes = Math.max(10, Math.round((totalMarks * 1.5) / 5) * 5);
  const nameOf = bySection ? Object.fromEntries(bySection.flatMap((g) => g.topics.map((t) => [t.slug, t.name]))) : null;
  const topicNames = order.map((s) => (bySection ? nameOf[s] : pageBySlug[s].topic));
  return {
    year,
    seed,
    title: `${year} Maths Practice Exam`,
    topics: topicNames,
    questionCount: withMeta.length,
    totalMarks,
    minutes,
    sections: sections.map((s) => ({
      title: s.title,
      questions: s.questions.map(({ n, question, answer, solution, marks, topic, slug, key }) => ({ n, question, answer, solution, marks, topic, slug, ...(onlyAuto ? { key } : {}) })),
    })),
  };
}

// A fixed, ready-made exam for a year (the exam preparation pages, Ryan,
// 9 Nov 2026): every topic in the year, 20 questions, the same paper on
// every build. Of the first 40 seeds, the one with the most worked
// solutions. The topic line lists chapters, not every subtopic.
export function readyMadeExam(year) {
  const groups = sectionCatalogue(year) || getExamCatalogue()[year] || [];
  const slugs = groups.flatMap((g) => g.topics.map((t) => t.slug));
  let best = null;
  for (let seed = 1; seed <= 40; seed++) {
    const exam = buildExam({ year, slugs, seed, max: EXAM_MAX_QUESTIONS });
    if (!exam) continue;
    const solved = exam.sections.flatMap((s) => s.questions).filter((q) => q.solution).length;
    if (!best || solved > best.solved) best = { exam, solved };
  }
  if (!best) return null;
  const exam = best.exam;
  const used = new Set(exam.sections.flatMap((s) => s.questions.map((q) => q.topic)));
  const chapters = groups.filter((g) => g.topics.some((t) => used.has(t.name))).map((g) => g.name);
  return { ...exam, title: `${year} Maths Practice Exam (all topics)`, topics: chapters.length ? chapters : exam.topics };
}

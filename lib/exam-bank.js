import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { getWorkedExamples } from "@/lib/worked-examples";

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
function marksFor(q) {
  const steps = (q.solution.match(/^\s*\d+\.\s/gm) || []).length;
  const m = Math.max(1, Math.min(4, Math.round(steps / 2)));
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
export function buildExam({ year, slugs, seed = Date.now() }) {
  if (!EXAM_YEARS.includes(year) || !Array.isArray(slugs)) return null;
  const valid = new Set(
    WORKSHEET_LANDING_PAGES.filter((p) => p.yearLevel === year).map((p) => p.slug)
  );
  const chosen = [...new Set(slugs)].filter((s) => valid.has(s) && hasQuestions(s));
  if (!chosen.length) return null;
  const rand = seeded(seed);

  // Share the questions out across the topics, round robin, up to the max.
  const pools = Object.fromEntries(chosen.map((s) => [s, shuffle(topicQuestions(s), rand)]));
  const order = shuffle(chosen, rand);
  const picked = [];
  let added = true;
  while (picked.length < EXAM_MAX_QUESTIONS && added) {
    added = false;
    for (const s of order) {
      if (picked.length >= EXAM_MAX_QUESTIONS) break;
      const q = pools[s].shift();
      if (q) {
        picked.push({ ...q, slug: s });
        added = true;
      }
    }
  }

  const pageBySlug = Object.fromEntries(WORKSHEET_LANDING_PAGES.map((p) => [p.slug, p]));
  const withMeta = picked.map((q) => ({
    ...q,
    topic: pageBySlug[q.slug].topic,
    strand: STRAND_NAME[strandOf(pageBySlug[q.slug])],
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
  const topicNames = order.map((s) => pageBySlug[s].topic);
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
      questions: s.questions.map(({ n, question, answer, solution, marks, topic, slug }) => ({ n, question, answer, solution, marks, topic, slug })),
    })),
  };
}

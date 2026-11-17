import { sectionCatalogue, sectionQuestions } from "@/lib/exam-sections";
import { markQuestion, inputHint } from "@/lib/automark";
import { NEXT_YEAR_WHY } from "@/lib/diagnostic-next";

// Free maths diagnostic test (Ryan, 17 Nov 2026): a student picks the year
// they are in now (7, 8 or 9; Year 10 students split into different maths
// for Year 11, so it is left out), answers two checked questions from each
// textbook chapter of that year, and gets a result for every chapter. The
// parent can have the report emailed, with what each weak chapter leads to
// next year (lib/diagnostic-next.js).
//
// The paper is the same every time for a year (a fixed seed), built from the
// auto-markable questions the Teacher Zone uses, so it can be rebuilt on the
// server to mark it. Nothing about the student is stored.

export const DIAG_PATH = "/maths-diagnostic-test";
export const DIAG_YEARS = [
  { slug: "year-7", year: "Year 7", next: "Year 8" },
  { slug: "year-8", year: "Year 8", next: "Year 9" },
  { slug: "year-9", year: "Year 9", next: "Year 10" },
];
export const diagYear = (slug) => DIAG_YEARS.find((y) => y.slug === slug || y.year === slug) || null;

const PER_CHAPTER = 2;
const SEED = 20261117;

function seeded(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffle(arr, rand) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// A question suits a quick check when it has one or two answer boxes, no
// table or picture, and isn't a long worded problem.
function suits(q) {
  if (!q.key?.length || q.key.length > 2) return false;
  if (q.kind !== "short") return false;
  if (/\|.*\|/.test(q.question) || /!\[/.test(q.question)) return false;
  if (q.question.length > 420) return false;
  return true;
}

const cache = new Map();
export function buildDiagnostic(yearOrSlug) {
  const y = diagYear(yearOrSlug);
  if (!y) return null;
  if (cache.has(y.year)) return cache.get(y.year);
  const groups = sectionCatalogue(y.year) || [];
  const rand = seeded(SEED + Number(y.year.replace(/\D/g, "")));
  const chapters = [];
  const questions = [];
  let n = 0;
  for (const g of groups) {
    // One question from each of two different sections where possible.
    const sections = shuffle(g.topics.filter((t) => t.auto > 0), rand);
    const pools = sections.map((t) => shuffle(sectionQuestions(y.year, t.slug).filter(suits), rand)).filter((p) => p.length);
    const picked = [];
    for (let round = 0; picked.length < PER_CHAPTER && round < 3; round++) {
      for (const p of pools) {
        if (picked.length >= PER_CHAPTER) break;
        if (p[round]) picked.push(p[round]);
      }
    }
    if (!picked.length) continue;
    chapters.push({ key: g.key, name: g.name, why: NEXT_YEAR_WHY[y.year]?.[g.name] || null });
    for (const q of picked) {
      questions.push({
        n: ++n,
        chapter: g.name,
        topic: q.topic,
        slug: q.slug || null,
        question: q.question,
        answer: q.answer,
        solution: q.solution,
        key: q.key,
        marks: q.key.length,
      });
    }
  }
  const totalMarks = questions.reduce((s, q) => s + q.marks, 0);
  const d = {
    ...y,
    chapters,
    questions,
    totalMarks,
    minutes: Math.max(20, Math.round((questions.length * 1.75) / 5) * 5),
  };
  cache.set(y.year, d);
  return d;
}

// What the test page gets (no answers or marking keys), in the shape the
// Teacher Zone test screen (components/paper/PaperClient.jsx) takes. Each
// chapter is a section.
export function studentDiagnostic(d) {
  return {
    id: `diagnostic-${d.slug}`,
    title: `${d.year} Maths Diagnostic Test`,
    year: d.year,
    chapters: d.chapters.map((c) => c.name),
    questionCount: d.questions.length,
    totalMarks: d.totalMarks,
    minutes: d.minutes,
    sections: d.chapters.map((c, i) => ({
      title: `${i + 1}. ${c.name}`,
      questions: d.questions
        .filter((q) => q.chapter === c.name)
        .map((q) => ({
          n: q.n,
          marks: q.marks,
          topic: q.topic,
          question: q.question,
          parts: q.key.map((k) => ({ label: k.label || null, hint: inputHint(k), unit: k.pct ? "%" : k.money ? "$" : k.unit || null })),
        })),
    })),
  };
}

// Strong: every mark in the chapter. Needs work: some. Not yet: none.
export const STATUS = {
  strong: { label: "Strong", tone: "ok" },
  work: { label: "Needs work", tone: "mid" },
  notyet: { label: "Not yet", tone: "low" },
};

const half = (x) => Math.round(x * 2) / 2;

// answers: { [questionNumber]: [part strings] }.
export function markDiagnostic(d, answers) {
  const results = [];
  let score = 0, correct = 0;
  for (const q of d.questions) {
    const given = Array.isArray(answers?.[q.n]) ? answers[q.n].slice(0, 4).map((a) => String(a ?? "").slice(0, 120)) : [];
    const m = markQuestion(q.key, given);
    const got = half((q.marks * m.parts.filter(Boolean).length) / q.key.length);
    score += got;
    if (m.correct) correct++;
    results.push({ n: q.n, parts: m.parts, correct: m.correct, got, marks: q.marks, answer: q.answer, solution: q.solution, topic: q.topic, slug: q.slug, chapter: q.chapter });
  }
  const chapters = d.chapters.map((c) => {
    const rs = results.filter((r) => r.chapter === c.name);
    const got = rs.reduce((s, r) => s + r.got, 0);
    const of = rs.reduce((s, r) => s + r.marks, 0);
    const status = got >= of ? "strong" : got > 0 ? "work" : "notyet";
    return { name: c.name, why: c.why, got, of, status };
  });
  return { score: half(score), total: d.totalMarks, correct, questions: d.questions.length, results, chapters };
}

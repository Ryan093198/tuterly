import { randomBytes } from "node:crypto";
import { createAdminClient } from "@/lib/supabase-admin";
import { buildExam } from "@/lib/exam-bank";
import { markQuestion, inputHint } from "@/lib/automark";

// Teacher Zone papers (Ryan, 8 Nov 2026). A teacher builds a paper from the
// auto-markable questions in the bank; it is saved as a snapshot in
// shared_papers and shared by two links:
//   /paper/<id>                          students answer it, marked online
//   /paper/<id>/solutions/<token>        answers and worked solutions
// Answers, solutions and marking keys never reach the student page; the
// marking happens in /api/papers/<id>/mark.

export const TEACHER_PER_DAY = 5;
export const PAPER_LENGTHS = [5, 10, 15, 20];

const ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789"; // no l, o, 0, 1
function token(n) {
  const bytes = randomBytes(n);
  let s = "";
  for (let i = 0; i < n; i++) s += ALPHABET[bytes[i] % ALPHABET.length];
  return s;
}

export const paperPath = (id) => `/paper/${id}`;
export const solutionsPath = (id, t) => `/paper/${id}/solutions/${t}`;

export function cleanTitle(raw, fallback) {
  const t = String(raw || "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 70);
  return t || fallback;
}

// Builds the paper (or null). count: number of questions wanted.
export function buildTeacherPaper({ year, slugs, count = 10, title }) {
  const max = PAPER_LENGTHS.includes(Number(count)) ? Number(count) : 10;
  const exam = buildExam({ year, slugs, max, onlyAuto: true, seed: Math.floor(Math.random() * 2 ** 31) });
  if (!exam) return null;
  return { ...exam, title: cleanTitle(title, `${year} Maths Practice Test`) };
}

export async function savePaper({ paper, email, school }) {
  const admin = createAdminClient();
  const row = {
    solutions_token: token(14),
    teacher_email: email,
    school: school || null,
    year_level: paper.year,
    title: paper.title,
    topics: paper.topics,
    paper,
    question_count: paper.questionCount,
    total_marks: paper.totalMarks,
    minutes: paper.minutes,
  };
  for (let attempt = 0; attempt < 4; attempt++) {
    const id = token(8);
    const { error } = await admin.from("shared_papers").insert({ id, ...row });
    if (!error) return { id, solutionsToken: row.solutions_token };
    if (!/duplicate key/i.test(error.message)) throw error;
  }
  throw new Error("could not save the paper");
}

export async function loadPaper(id) {
  if (!/^[a-z2-9]{6,12}$/.test(String(id))) return null;
  const admin = createAdminClient();
  const { data, error } = await admin.from("shared_papers").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return data;
}

export async function bumpPaper(id, field) {
  try {
    const admin = createAdminClient();
    await admin.rpc("bump_paper_counter", { p_id: id, p_field: field });
  } catch {}
}

// What the student page gets: the questions and the answer boxes, nothing
// that gives the answers away.
export function studentPaper(row) {
  const p = row.paper;
  return {
    id: row.id,
    title: row.title,
    year: row.year_level,
    topics: row.topics,
    questionCount: row.question_count,
    totalMarks: row.total_marks,
    minutes: row.minutes,
    sections: p.sections.map((s) => ({
      title: s.title,
      questions: s.questions.map((q) => ({
        n: q.n,
        marks: q.marks,
        topic: q.topic,
        question: q.question,
        parts: (q.key || []).map((k) => ({ label: k.label || null, hint: inputHint(k), unit: k.pct ? "%" : k.money ? "$" : k.unit || null })),
      })),
    })),
  };
}

const half = (x) => Math.round(x * 2) / 2;

// answers: { [questionNumber]: [part strings] }.
export function markPaper(row, answers) {
  const results = [];
  let score = 0, correct = 0;
  for (const s of row.paper.sections) {
    for (const q of s.questions) {
      const given = Array.isArray(answers?.[q.n]) ? answers[q.n].map((a) => String(a ?? "").slice(0, 120)) : [];
      const m = markQuestion(q.key || [], given);
      const got = q.key?.length ? half((q.marks * m.parts.filter(Boolean).length) / q.key.length) : 0;
      score += got;
      if (m.correct) correct++;
      results.push({ n: q.n, parts: m.parts, correct: m.correct, got, marks: q.marks, answer: q.answer, solution: q.solution, topic: q.topic, slug: q.slug || null });
    }
  }
  return { score: half(score), total: row.total_marks, correct, questions: row.question_count, results };
}

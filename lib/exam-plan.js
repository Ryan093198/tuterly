import { getChapterPages } from "@/lib/chapter-pages";
import { sectionQuestions } from "@/lib/exam-sections";
import { findKatexErrors } from "@/lib/markdown-katex-validate";

// The free exam plan (/exam-plan, Ryan 18 Nov 2026). A Year 7 to 10 student
// signs in to a real Tuterly app account (the app's Supabase project), uploads
// a marked test, and gets a study plan to their exam date and a customised test of
// at most 10 questions from our question bank on what they got wrong. The
// upload is read by the app's own functions (process-paper, confirm-paper,
// exam save), so the exam and the mistakes are waiting in the app.
// Brief for the app side: claude/BRIEF_APP_WEB_EXAM_PLAN.md (Tuterly project).

export const APP_URL = process.env.TUTERLY_APP_SUPABASE_URL || "https://iuiqiqtthmpvtxmirdam.supabase.co";
export const APP_KEY = process.env.TUTERLY_APP_SUPABASE_KEY || "sb_publishable_ZYFGIG5b3L8SnnidBGjyFQ_Laie64Fo";
export const PLAN_YEARS = [7, 8, 9, 10];
export const TEST_MAX = 10;
export const PER_SECTION_MAX = 3;
export const MAX_CONFIRM = 10;

const headers = (token, extra = {}) => ({ apikey: APP_KEY, Authorization: `Bearer ${token}`, ...extra });

/** The signed-in app user for a bearer token, or null. */
export async function appUser(token) {
  if (!token || token.length > 4000) return null;
  try {
    const r = await fetch(`${APP_URL}/auth/v1/user`, { headers: headers(token), signal: AbortSignal.timeout(8000) });
    if (!r.ok) return null;
    const u = await r.json();
    return u?.id ? { id: u.id, email: u.email || null } : null;
  } catch {
    return null;
  }
}

export function bearer(request) {
  const h = request.headers.get("authorization") || "";
  return h.startsWith("Bearer ") ? h.slice(7).trim() : null;
}

/** Read rows the student can see (app RLS), as the student. */
export async function appSelect(token, table, query) {
  const r = await fetch(`${APP_URL}/rest/v1/${table}?${query}`, { headers: headers(token), signal: AbortSignal.timeout(10000) });
  if (!r.ok) throw new Error(`${table} read failed (${r.status})`);
  return r.json();
}

/** Call one of the app's edge functions as the student. */
export async function appFunction(token, name, body) {
  const r = await fetch(`${APP_URL}/functions/v1/${name}`, {
    method: "POST",
    headers: headers(token, { "Content-Type": "application/json" }),
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30000),
  });
  let data = null;
  try { data = await r.json(); } catch {}
  if (!r.ok) {
    const err = new Error(data?.error || `${name} failed (${r.status})`);
    err.status = r.status;
    throw err;
  }
  return data;
}

// ---------------------------------------------------------------------------
// Curriculum: the app's section codes ("8-3B") are the website's chapter
// sections ("3B" in Year 8, chapter 3). Checked 18 Nov 2026: all 409 match.

function chaptersFor(year) {
  return getChapterPages().filter((c) => c.year === `Year ${year}`);
}

/** "8-3B" -> { chapter, section } on the website, or null. */
export function findSection(year, appCode) {
  const m = /^(\d+)-(\d+)([A-Z]+)$/.exec(String(appCode || ""));
  if (!m || Number(m[1]) !== year) return null;
  const ch = chaptersFor(year).find((c) => c.chapter === Number(m[2]));
  const sec = ch?.sections.find((s) => s.code === `${m[2]}${m[3]}`);
  return sec ? { chapter: ch, section: sec } : null;
}

/** The questions a student ticked, grouped into weak sections (most wrong first, then textbook order). */
export function weakSections(year, items) {
  const map = new Map();
  for (const it of items) {
    const hit = findSection(year, it.section_code);
    if (!hit) continue;
    const key = hit.section.code;
    const cur = map.get(key) || { code: key, appCode: it.section_code, name: hit.section.name, chapter: hit.chapter.name, chapterNo: hit.chapter.chapter, chapterKey: `y${year}-ch${hit.chapter.chapter}`, path: hit.chapter.path, slug: hit.section.slug, fileYear: hit.chapter.fileYear, wrong: 0 };
    cur.wrong += 1;
    map.set(key, cur);
  }
  const order = (code) => code.replace(/^(\d+)([A-Z]+)$/, (_, n, l) => `${n.padStart(2, "0")}${l}`);
  return [...map.values()].sort((a, b) => b.wrong - a.wrong || order(a.code).localeCompare(order(b.code)));
}

/** Exam topics for the app's exam save: chapter keys with the weak sections. */
export function examTopics(weak) {
  const by = new Map();
  for (const w of weak) {
    if (!by.has(w.chapterKey)) by.set(w.chapterKey, []);
    by.get(w.chapterKey).push(w.appCode);
  }
  return [...by.entries()].slice(0, 8).map(([chapter_key, sections]) => ({ chapter_key, sections }));
}

// ---------------------------------------------------------------------------
// The custom test: up to 10 questions from the bank on the weak sections,
// at most 3 per section, worked solutions first.

const renders = (q) => !findKatexErrors(`${q.question}\n\n${q.solution || q.answer}`).length;

function shuffle(a) {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export function customTest(weak) {
  // Share 10 across the sections: more for the ones with more wrong.
  // Round robin in weak order (most wrong first): everyone gets 1, then 2,
  // then 3, until the test is full.
  const n = Math.min(TEST_MAX, weak.length * PER_SECTION_MAX);
  const per = new Map(weak.map((w) => [w.code, 0]));
  let given = 0;
  for (let round = 1; round <= PER_SECTION_MAX && given < n; round++) {
    for (const w of weak) {
      if (given >= n) break;
      per.set(w.code, round);
      given++;
    }
  }
  const out = [];
  for (const w of weak) {
    const k = per.get(w.code) || 0;
    if (!k) continue;
    const pool = sectionQuestions(w.fileYear, w.slug).filter((q) => q.question.length < 600 && renders(q));
    const picked = [...shuffle(pool.filter((q) => q.solution)), ...shuffle(pool.filter((q) => !q.solution))].slice(0, k);
    for (const q of picked) out.push({ section: w.name, code: w.code, chapter: w.chapter, question: q.question, answer: q.answer, solution: q.solution || null });
  }
  return out.slice(0, TEST_MAX).map((q, i) => ({ ...q, n: i + 1 }));
}

// ---------------------------------------------------------------------------
// The study plan: one weak section a day from tomorrow, a mixed review every
// few days, and a last practice the day before the exam.

const DAY = 86_400_000;
const melbDate = (d) => new Date(d).toLocaleDateString("en-CA", { timeZone: "Australia/Melbourne" });
const pretty = (iso) => new Date(`${iso}T00:00:00+10:00`).toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short", timeZone: "Australia/Melbourne" });

export function studyPlan(weak, examDate) {
  const today = melbDate(Date.now());
  const exam = examDate && /^\d{4}-\d{2}-\d{2}$/.test(examDate) && examDate > today ? examDate : null;
  const daysLeft = exam ? Math.round((new Date(`${exam}T00:00:00Z`) - new Date(`${today}T00:00:00Z`)) / DAY) : 7;
  // Study days: tomorrow to the day before the exam (or the next 7), at most 28.
  const studyDays = Math.max(1, Math.min(28, exam ? daysLeft - 1 : 7));
  const dates = Array.from({ length: studyDays }, (_, i) => melbDate(Date.now() + (i + 1) * DAY));
  const days = [];
  if (studyDays === 1) {
    days.push({ date: dates[0], label: pretty(dates[0]), kind: "review", title: "Your customised test, then your weakest topic", sections: weak.slice(0, 3).map((w) => w.code) });
  } else {
    // The last day is a full practice. Before it:
    //  - every weak section gets a day (shared out evenly when there are
    //    more sections than days, so none is dropped);
    //  - any days left go round the sections again, most wrong first, with a
    //    mixed review every fourth day.
    const slots = dates.slice(0, -1);
    const name = (s) => `${s.code} ${s.name}`;
    let si = 0;
    slots.forEach((d, i) => {
      if (si < weak.length) {
        const take = Math.ceil((weak.length - si) / (slots.length - i));
        const secs = weak.slice(si, si + take);
        si += take;
        days.push({ date: d, label: pretty(d), kind: "learn", title: secs.map(name).join(" + "), sections: secs.map((s) => s.code) });
        return;
      }
      const again = days.filter((x) => x.kind === "again").length;
      const sinceReview = days.length - 1 - days.map((x) => x.kind).lastIndexOf("review");
      if (sinceReview >= 4 || (weak.length === 1 && again % 2 === 1)) {
        days.push({ date: d, label: pretty(d), kind: "review", title: "Mixed review: a few questions from each weak spot", sections: weak.slice(0, 4).map((w) => w.code) });
        return;
      }
      const s = weak[again % weak.length];
      days.push({ date: d, label: pretty(d), kind: "again", title: `Practise again: ${name(s)}`, sections: [s.code] });
    });
    const last = dates[dates.length - 1];
    days.push({ date: last, label: pretty(last), kind: "practice", title: exam ? "Full practice the day before: redo your customised test" : "Redo your customised test", sections: weak.map((w) => w.code) });
  }
  return { exam_date: exam, days_left: exam ? daysLeft : null, days };
}

/** Where to practise a section on the website. */
export function sectionHref(w) {
  return w.path;
}

// ---------------------------------------------------------------------------
// No test to upload (Ryan, 18 Nov 2026): the student picks topics instead.

export const MAX_TOPIC_SECTIONS = 12;

/** The year's chapters and subtopics, for the topic picker. */
export function topicChoices(year) {
  return chaptersFor(year).map((c) => ({ n: c.chapter, name: c.name, sections: c.sections.map((s) => ({ code: s.code, name: s.name })) }));
}

/** Picked subtopic codes ("3B") as the plan's sections, in textbook order. */
export function pickedSections(year, codes) {
  const uniq = [...new Set((codes || []).filter((c) => typeof c === "string" && /^\d+[A-Z]+$/.test(c)))];
  return weakSections(year, uniq.map((c) => ({ section_code: `${year}-${c}` }))).map((w) => ({ ...w, wrong: 0 }));
}

const melbDayOf = (d) => new Date(d).toLocaleDateString("en-CA", { timeZone: "Australia/Melbourne" });

/**
 * Today's free plans (Melbourne day), not counting a test the app couldn't
 * read: those runs are deleted so they don't use up the day.
 */
export async function todaysRuns(admin, token, userId) {
  const since = new Date(Date.now() - 30 * 3600 * 1000).toISOString();
  const { data: recent } = await admin.from("exam_plan_runs").select("id, created_at, status, paper_id").eq("app_user_id", userId).gte("created_at", since);
  const today = melbDayOf(Date.now());
  const counted = [];
  for (const r of (recent || []).filter((x) => melbDayOf(x.created_at) === today)) {
    if (r.status === "uploaded" && r.paper_id) {
      try {
        const [p] = await appSelect(token, "papers", `id=eq.${r.paper_id}&select=status`);
        if (!p || p.status === "failed") {
          await admin.from("exam_plan_runs").delete().eq("id", r.id);
          continue;
        }
      } catch {}
    }
    counted.push(r);
  }
  return counted;
}

export const LIMIT_MESSAGE = "That's your free plan for today. Come back tomorrow for another, or get Tuterly for unlimited uploads and practice.";

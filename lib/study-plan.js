import { chaptersForYear, chapterGeneratorHref } from "@/lib/chapter-pages";
import { chapterMindMap } from "@/lib/teacher-resources";

// The maths exam study planner (Ryan, 9 Nov 2026). Builds a night-by-night
// plan from the exam date, the chapters on the test and the nights a week
// the student can study. Every night links to free Tuterly resources, and
// every night ends with "snap what you got wrong" in the app.
//
// Plans are saved in study_plans and opened from a private emailed link
// (/plan/<id>).

export const PLANNER_YEARS = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 10A"];
export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MIN_DAYS_AHEAD = 2;
export const MAX_DAYS_AHEAD = 70;

// Year 10 and 10A share the Year 10 chapter pages (10A adds extension
// subtopics).
const yearSlugFor = (year) => (year === "Year 10A" ? "year-10" : `year-${year.replace("Year ", "")}`);
const isStandard10 = (year) => year === "Year 10";

export function plannerChapters(year) {
  if (!PLANNER_YEARS.includes(year)) return [];
  return chaptersForYear(yearSlugFor(year)).map((c) => ({
    slug: c.slug,
    name: c.name,
    weight: isStandard10(year) ? c.sections.filter((s) => !s.extension).length || 1 : c.sections.length,
  }));
}

const formulaSheetPath = (year) => `/formula-sheets/${year === "Year 10A" ? "year-10a" : yearSlugFor(year)}-maths`;

// Melbourne calendar date as YYYY-MM-DD.
export function melbourneToday(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Melbourne", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}
const addDays = (iso, n) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const daysBetween = (a, b) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);
const weekdayOf = (iso) => new Date(`${iso}T00:00:00Z`).getUTCDay();

export function formatPlanDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
}

// Checks the planner inputs. Returns { error } or the cleaned values.
export function validatePlanInput({ year, examDate, chapters, weekdays }, today = melbourneToday()) {
  if (!PLANNER_YEARS.includes(year)) return { error: "Choose a year level." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(examDate || ""))) return { error: "Choose the exam date." };
  const ahead = daysBetween(today, examDate);
  if (ahead < MIN_DAYS_AHEAD) return { error: "The exam needs to be at least 2 days away for a plan to help." };
  if (ahead > MAX_DAYS_AHEAD) return { error: "Choose an exam date within the next 10 weeks." };
  const all = plannerChapters(year);
  const valid = new Set(all.map((c) => c.slug));
  const picked = [...new Set((Array.isArray(chapters) ? chapters : []).filter((s) => valid.has(s)))];
  if (!picked.length) return { error: "Tick at least one topic that's on the test." };
  const days = [...new Set((Array.isArray(weekdays) ? weekdays : []).map(Number).filter((d) => Number.isInteger(d) && d >= 0 && d <= 6))].sort();
  if (!days.length) return { error: "Choose at least one night a week to study." };
  // Keep the chapters in book order.
  return { year, examDate, chapters: all.filter((c) => picked.includes(c.slug)).map((c) => c.slug), weekdays: days };
}

// Splits `n` nights across chapters in proportion to their size, at least
// one each, when there are enough nights.
function allocate(chapters, n) {
  const total = chapters.reduce((s, c) => s + c.weight, 0);
  const counts = chapters.map((c) => Math.max(1, Math.floor((c.weight / total) * n)));
  let used = counts.reduce((a, b) => a + b, 0);
  // Give leftovers to the biggest chapters; trim if the minimums overshoot.
  const order = chapters.map((c, i) => i).sort((a, b) => chapters[b].weight - chapters[a].weight);
  for (let k = 0; used < n; k++, used++) counts[order[k % order.length]]++;
  for (let k = order.length - 1; used > n && k >= 0; k--) {
    while (counts[order[k]] > 1 && used > n) { counts[order[k]]--; used--; }
  }
  return counts;
}

/**
 * Builds the plan. Returns
 * { year, examDate, nights: [{ key, date, kind, title, chapters, tasks: [{ text, href?, app? }] }], weeks, chapters }
 * kind: "topic" | "practice_exam" | "review"
 */
export function buildStudyPlan({ year, examDate, chapters, weekdays }, today = melbourneToday()) {
  const all = plannerChapters(year);
  const chosen = all.filter((c) => chapters.includes(c.slug));
  const full = chaptersForYear(yearSlugFor(year)).filter((c) => chapters.includes(c.slug));
  const byslug = Object.fromEntries(full.map((c) => [c.slug, c]));
  const opts = { standard: isStandard10(year) };

  // Study nights: tomorrow up to the night before the exam, on the chosen
  // weekdays. Too few? Use every night.
  const span = [];
  for (let d = addDays(today, 1); d < examDate; d = addDays(d, 1)) span.push(d);
  let dates = span.filter((d) => weekdays.includes(weekdayOf(d)));
  if (dates.length < Math.min(3, span.length)) dates = span;

  const nights = [];
  const reserve = dates.length >= 4 ? 2 : dates.length >= 2 ? 1 : 0;
  const topicDates = dates.slice(0, dates.length - reserve);

  const SNAP = { text: "Snap anything you got wrong in Tuterly. You'll see the worked solution, then fresh questions on the same skill until it clicks.", app: true };

  if (topicDates.length >= chosen.length) {
    const counts = allocate(chosen, topicDates.length);
    let i = 0;
    chosen.forEach((c, ci) => {
      const ch = byslug[c.slug];
      const mm = chapterMindMap(ch);
      for (let k = 0; k < counts[ci]; k++, i++) {
        const last = k === counts[ci] - 1 && counts[ci] > 1;
        const tasks = k === 0
          ? [
              { text: `Read through the worked examples for ${c.name}, then do the practice questions.`, href: ch.path },
              ...(mm ? [{ text: "Look over the mind map for this topic.", href: mm.path }] : []),
              SNAP,
            ]
          : last
            ? [{ text: `Sit a short practice test on ${c.name}, timed, without notes.`, href: chapterGeneratorHref(ch, opts) }, { text: "Mark it with the answers, then redo anything you lost marks on.", href: null }, SNAP]
            : [{ text: `More practice on ${c.name}: start with the questions you found hardest last time.`, href: ch.path }, SNAP];
        nights.push({ date: topicDates[i], kind: "topic", title: counts[ci] > 1 ? `${c.name} (${k + 1} of ${counts[ci]})` : c.name, chapters: [c.slug], tasks });
      }
    });
  } else {
    // Fewer nights than topics: share them out, in book order.
    const per = Math.ceil(chosen.length / Math.max(1, topicDates.length));
    topicDates.forEach((date, i) => {
      const group = chosen.slice(i * per, i * per + per);
      if (!group.length) return;
      nights.push({
        date,
        kind: "topic",
        title: group.map((c) => c.name).join(", "),
        chapters: group.map((c) => c.slug),
        tasks: [
          ...group.map((c) => ({ text: `Worked examples and practice questions: ${c.name}.`, href: byslug[c.slug].path })),
          SNAP,
        ],
      });
    });
  }

  // The full practice exam on everything chosen, then the final review.
  const allTopics = full.flatMap((c) =>
    (opts.standard ? c.sections.filter((s) => !s.extension).map((s) => s.slug.replace(/^year-10a-/, "year-10-")) : c.sections.map((s) => s.slug))
  );
  const fileYear = opts.standard ? "Year 10" : full[0]?.fileYear || year;
  const examHref = `/exam-generator?year=${encodeURIComponent(fileYear)}&topics=${allTopics.join(",")}#build`;
  const reserveDates = dates.slice(dates.length - reserve);
  if (reserve === 2) {
    nights.push({
      date: reserveDates[0],
      kind: "practice_exam",
      title: "Full practice exam",
      chapters,
      tasks: [
        { text: "Sit a full practice exam on every topic on your test, timed, in exam conditions.", href: examHref },
        { text: "Mark it with the answers and worked solutions.", href: null },
        { text: "Snap every question you lost marks on. These are your list for tomorrow.", app: true },
      ],
    });
  }
  if (reserve >= 1) {
    nights.push({
      date: reserveDates[reserve - 1],
      kind: "review",
      title: "Final review",
      chapters,
      tasks: [
        { text: "Redo the questions you snapped in Tuterly over the past few weeks, without looking at the solutions first.", app: true },
        { text: "Read through the formula sheet once, slowly.", href: formulaSheetPath(year) },
        { text: "Pack your calculator and pens, and get a good night's sleep.", href: null },
      ],
    });
  }

  nights.sort((a, b) => (a.date < b.date ? -1 : 1));
  nights.forEach((n, i) => (n.key = `n${i + 1}`));

  return {
    year,
    examDate,
    chapters: chosen.map((c) => ({ slug: c.slug, name: c.name })),
    nights,
    nightsPerWeek: weekdays.length,
  };
}

// Weekly check-ins for the parent view.
export function parentCheckIns(plan) {
  const weeks = [];
  for (const n of plan.nights) {
    const wk = Math.floor(daysBetween(plan.nights[0].date, n.date) / 7);
    (weeks[wk] ||= []).push(n);
  }
  return weeks.filter(Boolean).map((ns, i) => {
    const hasExam = ns.some((n) => n.kind === "practice_exam");
    const hasReview = ns.some((n) => n.kind === "review");
    const names = Object.fromEntries(plan.chapters.map((c) => [c.slug, c.name]));
    const topics = [...new Set(ns.filter((n) => n.kind === "topic").flatMap((n) => n.chapters.map((c) => names[c])))].filter(Boolean);
    const list = topics.length > 1 ? `${topics.slice(0, -1).join("; ")} and ${topics[topics.length - 1]}` : topics[0];
    const tips = [];
    if (topics.length) tips.push(`This week covers ${list}. Ask them to show you two questions they got wrong and then fixed.`);
    if (hasExam) tips.push("Practice exam night: help keep it timed, phone in another room, notes away.");
    if (hasReview) tips.push("The night before: no new topics. Reviewing the questions they've snapped is enough, then an early night.");
    if (!hasExam && !hasReview) tips.push("A quick check that the nights are getting ticked off is more useful than sitting with them.");
    return { week: i + 1, from: ns[0].date, tips };
  });
}

import { getChapterPages } from "@/lib/chapter-pages";
import { sectionQuestions } from "@/lib/exam-sections";
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { chapterQuestionCount } from "@/lib/worksheet-count";

// Worksheet generator topics for Years 7 to 10 (Ryan, 17 Nov 2026): pick one
// textbook chapter at a time, every subtopic ticked, then untick any you
// don't need. Chapter and subtopic names follow Cambridge Essential
// Mathematics for the Victorian Curriculum (names only), the same list the
// practice tests, exam generator and teacher resources use (lib/chapter-pages).
// Year 10 leaves out the 10A extension subtopics; Year 10A has all of them.
// Years 3 to 6 keep the curriculum list grouped by strand.

export const CHAPTER_WORKSHEET_YEARS = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 10A"];

let cache = null;

function build() {
  const pages = getChapterPages();
  const out = {};
  for (const year of CHAPTER_WORKSHEET_YEARS) {
    const pageYear = year === "Year 10A" ? "Year 10" : year;
    out[year] = pages
      .filter((c) => c.year === pageYear)
      .map((c) => {
        const secs = c.sections.filter((s) => year !== "Year 10" || !s.extension);
        if (!secs.length) return null;
        return {
          n: c.chapter,
          name: c.name,
          fileYear: c.fileYear,
          testTopicId: testTopicFor(c, secs, year),
          sections: secs.map((s) => ({ code: s.code, name: s.name, slug: s.slug, ext: year === "Year 10A" && !!s.extension })),
        };
      })
      .filter(Boolean);
  }
  return out;
}

// Worksheet topic pages (VCAA codes) whose questions feed these sections,
// most common first. Used to map a chapter to a full topic test and a
// topic page's preset back to a chapter.
function landingCounts(fileYear, secs) {
  const counts = new Map();
  for (const s of secs) {
    for (const q of sectionQuestions(fileYear, s.slug)) {
      if (!q.slug) continue;
      counts.set(q.slug, (counts.get(q.slug) || 0) + 1);
    }
  }
  return counts;
}

function testTopicFor(c, secs, year) {
  const counts = landingCounts(c.fileYear, secs);
  const ranked = [...counts.entries()]
    .map(([slug, n]) => ({ p: WORKSHEET_LANDING_PAGES.find((w) => w.slug === slug), n }))
    .filter((x) => x.p?.topicId)
    .sort((a, b) => (b.p.yearLevel === year) - (a.p.yearLevel === year) || b.n - a.n);
  return ranked[0]?.p.topicId || null;
}

export function worksheetChapters() {
  if (!cache) cache = build();
  return cache;
}

/** The chapters for one year, without server-only fields, for the picker. */
export function chapterPickerData() {
  const all = worksheetChapters();
  return Object.fromEntries(
    Object.entries(all).map(([y, chs]) => [
      y,
      chs.map((c) => ({ n: c.n, name: c.name, testTopicId: c.testTopicId, sections: c.sections.map(({ code, name, ext }) => ({ code, name, ext })) })),
    ]),
  );
}

export function findWorksheetChapter(year, n) {
  return worksheetChapters()[year]?.find((c) => c.n === Number(n)) || null;
}

// A topic page (e.g. /worksheets/year-8-pythagoras) presets a VCAA code.
// For Years 7 to 10 that becomes the chapter whose questions use that page,
// with only the matching subtopics ticked.
const presetCache = new Map();
export function chapterPreset(year, topicId) {
  if (!year || !topicId || !CHAPTER_WORKSHEET_YEARS.includes(year)) return null;
  const key = `${year}|${topicId}`;
  if (presetCache.has(key)) return presetCache.get(key);
  const slugs = new Set(WORKSHEET_LANDING_PAGES.filter((w) => w.topicId === topicId).map((w) => w.slug));
  let best = null;
  for (const c of worksheetChapters()[year] || []) {
    const codes = c.sections.filter((s) => sectionQuestions(c.fileYear, s.slug).some((q) => slugs.has(q.slug))).map((s) => s.code);
    if (codes.length && (!best || codes.length > best.codes.length)) best = { n: c.n, codes };
  }
  presetCache.set(key, best);
  return best;
}

/**
 * A worksheet request for a chapter: the label shown on the sheet, an id
 * for the reuse pool and logging, and a few example questions (one per
 * ticked subtopic) to pin the level. Null if the chapter or codes are bad.
 */
export function chapterRequest(year, n, codes) {
  const c = findWorksheetChapter(year, n);
  if (!c || !Array.isArray(codes)) return null;
  const want = new Set(codes.map(String));
  const secs = c.sections.filter((s) => want.has(s.code));
  if (!secs.length) return null;
  const all = secs.length === c.sections.length;
  const label = all
    ? c.name
    : secs.length <= 3
      ? `${c.name}: ${secs.map((s) => s.name).join(", ")}`
      : `${c.name} (${secs.length} of ${c.sections.length} subtopics)`;
  const examples = secs.slice(0, 8).map((s) => {
    const qs = sectionQuestions(c.fileYear, s.slug);
    const q = qs.find((x) => x.kind === "short") || qs[0];
    return q ? { section: s.name, question: String(q.question).slice(0, 400) } : null;
  }).filter(Boolean);
  return {
    chapter: c.name,
    // The question count is in the id so reused worksheets always match it.
    topicId: `ch:${year.replace(/\s+/g, "").toLowerCase()}:${c.n}:${secs.map((s) => s.code).join(".")}:q${chapterQuestionCount(secs.length)}`,
    topicLabel: label.length > 240 ? `${label.slice(0, 237)}...` : label,
    sections: secs.map((s) => s.name),
    count: chapterQuestionCount(secs.length),
    examples,
  };
}

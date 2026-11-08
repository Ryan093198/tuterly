import { getSectionMap, sectionQuestions } from "@/lib/exam-sections";
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";

// One practice test page per textbook chapter, Years 7 to 10 (Ryan, 8 Nov
// 2026): chapter and subtopic names follow the Cambridge Essential
// Mathematics for the Victorian Curriculum contents (names only), built from
// the exam generator's section files. Year 10 pages cover Year 10 and 10A
// (same chapters; 10A extension subtopics are marked).

export const CHAPTER_YEARS = [
  { year: "Year 7", slug: "year-7", label: "Year 7", file: "Year 7" },
  { year: "Year 8", slug: "year-8", label: "Year 8", file: "Year 8" },
  { year: "Year 9", slug: "year-9", label: "Year 9", file: "Year 9" },
  { year: "Year 10", slug: "year-10", label: "Year 10 and 10A", file: "Year 10A" },
];

const slugify = (s) =>
  s.toLowerCase().replace(/’|'/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const sectionSlug = (fileYear, code) => `${fileYear.toLowerCase().replace(/\s+/g, "-")}-${code.toLowerCase()}`;
const chapterOf = (code) => String(code).match(/^\d+/)?.[0];

let cache = null;
export function getChapterPages() {
  if (cache) return cache;
  const out = [];
  for (const y of CHAPTER_YEARS) {
    const map = getSectionMap(y.file);
    if (!map?.chapters) continue;
    const order = [...new Set(map.sections.map((s) => chapterOf(s.code)))];
    for (const ch of order) {
      const name = map.chapters[ch];
      if (!name) continue;
      const sections = map.sections
        .filter((s) => chapterOf(s.code) === ch)
        .map((s) => ({
          code: s.code,
          name: s.name,
          strand: s.strand,
          slug: sectionSlug(y.file, s.code),
          extension: y.file === "Year 10A" && !s.from_year_10,
        }));
      out.push({
        year: y.year,
        yearSlug: y.slug,
        yearLabel: y.label,
        fileYear: y.file,
        chapter: Number(ch),
        name,
        slug: slugify(name),
        path: `/maths-tests/${y.slug}/${slugify(name)}`,
        sections,
      });
    }
  }
  cache = out;
  return out;
}

export const getChapterPage = (yearSlug, slug) => getChapterPages().find((c) => c.yearSlug === yearSlug && c.slug === slug) || null;
export const chaptersForYear = (yearSlug) => getChapterPages().filter((c) => c.yearSlug === yearSlug);

// Sample questions: one per subtopic, preferring ones with a full worked
// solution, spread across the chapter, up to `max`.
export function chapterSamples(c, max = 8) {
  const per = c.sections.map((s) => {
    const qs = sectionQuestions(c.fileYear, s.slug);
    const best = qs.find((q) => q.solution && q.kind === "short") || qs.find((q) => q.solution) || qs[0];
    return best ? { ...best, section: s.name } : null;
  }).filter(Boolean);
  if (per.length <= max) return per;
  const step = per.length / max;
  return Array.from({ length: max }, (_, i) => per[Math.floor(i * step)]);
}

// Worksheet topic pages whose questions feed this chapter.
export function chapterWorksheets(c, max = 10) {
  const seen = new Map();
  for (const s of c.sections) {
    for (const q of sectionQuestions(c.fileYear, s.slug)) {
      if (q.slug && !seen.has(q.slug)) {
        const p = WORKSHEET_LANDING_PAGES.find((w) => w.slug === q.slug);
        if (p) seen.set(q.slug, p);
      }
    }
  }
  return [...seen.values()].slice(0, max);
}

// The exam generator, opened with this chapter's subtopics ticked.
// For Year 10 pages, `standard: true` gives the Year 10 version without the
// 10A extension subtopics.
export function chapterGeneratorHref(c, { standard = false } = {}) {
  if (standard && c.fileYear === "Year 10A") {
    const secs = c.sections.filter((s) => !s.extension).map((s) => sectionSlug("Year 10", s.code));
    return `/exam-generator?year=${encodeURIComponent("Year 10")}&topics=${secs.join(",")}#build`;
  }
  return `/exam-generator?year=${encodeURIComponent(c.fileYear)}&topics=${c.sections.map((s) => s.slug).join(",")}#build`;
}

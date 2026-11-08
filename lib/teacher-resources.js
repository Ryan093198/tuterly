import { getChapterPages, chapterWorksheets } from "@/lib/chapter-pages";
import { writtenTopicTest } from "@/lib/topic-test-files";
import { mindMapsForYear, mindMapPath, mindMapFiles } from "@/lib/mind-maps";

// Teacher resource pages (Ryan, 8 Nov 2026): /teachers is just the Teacher
// Zone; everything else for teachers lives on focused pages:
//   /teachers/resources                      hub, by year and chapter
//   /teachers/resources/<year>/<chapter>     one page per textbook chapter
//   /teachers/printable-exam                 the paper exam builder
// Chapters are the same 40 as /maths-tests (lib/chapter-pages.js).

export const TEACHER_RESOURCES_PATH = "/teachers/resources";
export const PRINTABLE_EXAM_PATH = "/teachers/printable-exam";

export const teacherChapterPath = (c) => `${TEACHER_RESOURCES_PATH}/${c.yearSlug}/${c.slug}`;
export const getTeacherChapter = (yearSlug, slug) => getChapterPages().find((c) => c.yearSlug === yearSlug && c.slug === slug) || null;

// Worksheet topics for a chapter that have a printable practice sheet and a
// full emailed topic test.
export function chapterPrintables(c) {
  return chapterWorksheets(c, 20).filter((p) => writtenTopicTest(p.yearLevel, p.topicId));
}

function topicQuery(c, { standard = false } = {}) {
  if (standard && c.fileYear === "Year 10A") {
    const secs = c.sections.filter((s) => !s.extension).map((s) => `year-10-${s.code.toLowerCase()}`);
    return `year=${encodeURIComponent("Year 10")}&topics=${secs.join(",")}`;
  }
  return `year=${encodeURIComponent(c.fileYear)}&topics=${c.sections.map((s) => s.slug).join(",")}`;
}

// The revision mind map for a chapter (the maps follow the same textbook
// chapters, one per chapter). Year 10 pages use the Year 10 map.
export function chapterMindMap(c) {
  const y = Number(String(c.year).match(/\d+/)?.[0]);
  const m = mindMapsForYear(y).find((x) => x.chapter === c.chapter);
  return m ? { ...m, path: mindMapPath(m), preview: mindMapFiles(m).preview } : null;
}

// The Teacher Zone with this chapter's topics ticked.
export const teacherZoneHref = (c, opts) => `/teachers?${topicQuery(c, opts)}#teacher-zone`;
// The printable exam builder with this chapter's topics ticked.
export const printableExamHref = (c, opts) => `${PRINTABLE_EXAM_PATH}?${topicQuery(c, opts)}#build`;

export const CLASS_USES = [
  { t: "Warm-up", x: "Questions 1 to 4 of each topic test are the basics. Put one or two on the board to start the lesson." },
  { t: "Exit ticket", x: "Set a 5-question auto-marked test at the end of a lesson. Students see their mark straight away, and you see who needs another go when they tell you their score." },
  { t: "Homework with answers", x: "Print the practice sheet with the answers on the last page so students can self-mark, or share a Teacher Zone link and it marks itself." },
  { t: "Topic test revision", x: "The full 20-question test runs from the basics to harder problems. A week before the real test, it shows students where their gaps are." },
  { t: "Mixed revision", x: "The printable exam builder mixes topics with marks and a suggested time, for end-of-term and end-of-year revision." },
  { t: "Extension", x: "The last section of each full test (questions 17 to 20) has multi-step and problem-solving questions for students who finish early." },
];

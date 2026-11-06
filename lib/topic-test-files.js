import fs from "node:fs";
import path from "node:path";

// Topic tests written ahead of time and checked:
// content/topic-tests/<year>/<topic_id>.json (see lib/topic-test.js and
// scripts/check-topic-tests.mjs). Kept apart from lib/topic-test.js so pages
// can read them without pulling in the AI writer.
const CONTENT_DIR = path.join(process.cwd(), "content", "topic-tests");
const yearDir = (yearLevel) => yearLevel.toLowerCase().replace(/\s+/g, "-"); // "Year 10A" -> "year-10a"

// The written-ahead test for a topic, or null.
export function writtenTopicTest(yearLevel, topicId) {
  if (!/^[A-Za-z0-9:_-]{1,40}$/.test(topicId || "")) return null;
  const file = path.join(CONTENT_DIR, yearDir(yearLevel), `${topicId}.json`);
  try {
    const d = JSON.parse(fs.readFileSync(file, "utf8"));
    if (!d.checked || !d.questions_md || !d.answers_md) return null;
    return d;
  } catch {
    return null;
  }
}

// The "Section A" questions (the first four, the easier ones) as markdown,
// for the sample on the topic pages.
export function sectionA(questionsMd) {
  const md = String(questionsMd || "");
  const start = md.indexOf("## Section A");
  const end = md.indexOf("## Section B");
  if (start === -1 || end === -1) return "";
  return md.slice(md.indexOf("\n", start) + 1, end).trim();
}

// The free practice sheet: the first `n` questions of a written test and
// their answers, as markdown. Section headings past question n are dropped,
// a section's "(Questions 5-16)" range is cut to n, and the suggested time
// is halved to fit.
export const SHEET_QUESTIONS = 10;
export function practiceSheet(test, n = SHEET_QUESTIONS) {
  if (!test) return null;
  const cut = (md) => {
    const s = String(md || "");
    const at = s.search(new RegExp(`^\\*\\*Question ${n + 1}\\*\\*`, "m"));
    return (at === -1 ? s : s.slice(0, at)).trim();
  };
  let q = cut(test.questions_md);
  if (!/\*\*Question 1\*\*/.test(q)) return null;
  q = q
    .replace(/^## (.*)\(Questions (\d+)-(\d+)\)/gm, (m, label, a, b) => `## ${label}(Questions ${a}-${Math.min(Number(b), n)})`)
    .replace(/Suggested time: 30 to 35 minutes\./, "Suggested time: 15 to 20 minutes.")
    .replace(/^# .*\n+/m, ""); // the PDF header carries the title
  const a = cut(test.answers_md).replace(/^# .*\n+/m, "");
  return { questions: q, answers: a, count: n };
}

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

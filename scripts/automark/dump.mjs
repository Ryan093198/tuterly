// Writes one review file per chunk to <out>/<chunk>.json:
// [{ hash, year, code, section, kind, question, answer, suggested }]
// Usage (from the repo root, with the @/ alias loader):
//   node --import <reg.mjs> scripts/automark/dump.mjs <outDir>
import fs from "node:fs";
import path from "node:path";
const { getSectionMap, sectionQuestions } = await import(path.resolve("lib/exam-sections.js"));
const { suggestKey } = await import(path.resolve("lib/automark.js"));
const { questionHash } = await import(path.resolve("lib/automark-keys.js"));
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });
const seen = new Set();
const chunks = {};
for (const [year, file] of [["Year 7", "year-7"], ["Year 8", "year-8"], ["Year 9", "year-9"], ["Year 10", "year-10"], ["Year 10A", "year-10a"]]) {
  const map = getSectionMap(year);
  const chapters = [...new Set(map.sections.map((s) => Number(String(s.code).match(/^\d+/)[0])))];
  const half = chapters[Math.ceil(chapters.length / 2) - 1];
  for (const s of map.sections) {
    if (s.from_year_10) continue;
    const ch = Number(String(s.code).match(/^\d+/)[0]);
    const chunk = year === "Year 10A" ? file : `${file}-${ch <= half ? "a" : "b"}`;
    for (const q of sectionQuestions(year, `${file}-${s.code.toLowerCase()}`)) {
      const hash = questionHash(q.question);
      if (seen.has(hash)) continue;
      seen.add(hash);
      (chunks[chunk] ||= []).push({ hash, year, code: s.code, section: s.name, kind: q.kind, question: q.question, answer: q.answer, suggested: suggestKey(q.question, q.answer) });
    }
  }
}
for (const [c, list] of Object.entries(chunks)) {
  fs.writeFileSync(path.join(out, `${c}.json`), JSON.stringify(list, null, 1));
  console.log(c, list.length, "questions,", list.filter((x) => x.suggested).length, "with a suggested key");
}

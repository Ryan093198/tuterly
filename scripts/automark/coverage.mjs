// Auto-markable questions per section for one review chunk.
//   node scripts/automark/coverage.mjs <reviewChunk.json> <keysFile> [newFile]
// Lists every section with fewer than 6 (reviewed keys + new questions).
import fs from "node:fs";
const [review, keysF, newF] = process.argv.slice(2);
const r = JSON.parse(fs.readFileSync(review, "utf8"));
const keys = fs.existsSync(keysF) ? JSON.parse(fs.readFileSync(keysF, "utf8")) : {};
const neu = newF && fs.existsSync(newF) ? JSON.parse(fs.readFileSync(newF, "utf8")) : {};
const secs = {};
for (const q of r) {
  const s = (secs[`${q.year}|${q.code}`] ||= { year: q.year, code: q.code, name: q.section, total: 0, auto: 0, reviewed: 0, added: 0 });
  s.total++;
  if (q.hash in keys) s.reviewed++;
  if (Array.isArray(keys[q.hash])) s.auto++;
}
for (const [y, m] of Object.entries(neu)) for (const [c, items] of Object.entries(m)) if (secs[`${y}|${c}`]) secs[`${y}|${c}`].added += items.length;
const list = Object.values(secs);
const unrev = r.filter((q) => !(q.hash in keys)).length;
console.log(`${r.length} questions, ${unrev} not reviewed yet; ${list.length} sections`);
const short = list.filter((s) => s.auto + s.added < 6);
for (const s of short) console.log(`  ${s.year} ${s.code} ${s.name}: ${s.auto} keyed + ${s.added} new = ${s.auto + s.added} (needs ${6 - s.auto - s.added} more)`);
console.log(short.length ? `${short.length} sections under 6` : "every section has 6 or more");

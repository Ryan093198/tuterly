// Checks the hand-written topic tests in content/topic-tests/<year>/<topic_id>.json
// (see lib/topic-test.js): structure, numbering, maths that renders, house style.
// Usage: node scripts/check-topic-tests.mjs [content/topic-tests/year-7]
import fs from "node:fs";
import path from "node:path";
import { findKatexErrors } from "../lib/markdown-katex-validate.js";

const root = process.argv[2] || "content/topic-tests";
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".json")) files.push(p);
  }
})(root);

const US = /\b(color|center|meter|liter|organize|analyze|favorite|neighbor|gray|behavior|labeled|traveled|modeled)s?\b/i;
let bad = 0;
for (const f of files) {
  const problems = [];
  let d;
  try { d = JSON.parse(fs.readFileSync(f, "utf8")); } catch (e) { console.log(`✗ ${f}: invalid JSON ${e.message}`); bad++; continue; }
  for (const k of ["year_level", "topic_id", "topic_label", "questions_md", "answers_md"]) if (!d[k]) problems.push(`missing ${k}`);
  if (path.basename(f, ".json") !== d.topic_id) problems.push("file name isn't the topic_id");
  const nums = (md) => [...String(md || "").matchAll(/^\*\*Question (\d+)\*\*\s*$/gm)].map((m) => Number(m[1]));
  const q = nums(d.questions_md), a = nums(d.answers_md);
  const want = Array.from({ length: 20 }, (_, i) => i + 1).join(",");
  if (q.join(",") !== want) problems.push(`questions numbered ${q.join(",")}`);
  if (a.join(",") !== want) problems.push(`answers numbered ${a.join(",")}`);
  for (const h of ["## Section A: Consolidating (Questions 1-4)", "## Section B: Standard (Questions 5-16)", "## Section C: Advanced (Questions 17-20)"])
    if (!d.questions_md?.includes(h)) problems.push(`missing heading "${h}"`);
  if (!/^# .+ Answer Key\s*$/m.test(d.answers_md || "")) problems.push('answer key needs a "# ... Answer Key" heading');
  const answerLines = (d.answers_md || "").split(/^\*\*Question \d+\*\*\s*$/m).slice(1);
  answerLines.forEach((t, i) => { if (!/Answer:/.test(t)) problems.push(`answer ${i + 1} has no "Answer:" line`); });
  for (const [k, md] of [["questions", d.questions_md], ["answers", d.answers_md]]) {
    const errs = findKatexErrors(md || "");
    if (errs.length) problems.push(`${k}: ${errs.length} maths error(s): ${errs.slice(0, 3).map((e) => `${e.message || e.error || JSON.stringify(e)}`).join(" | ").slice(0, 300)}`);
    if (/[–—]/.test(md || "")) problems.push(`${k}: en or em dash`);
    const us = (md || "").match(US);
    if (us) problems.push(`${k}: US spelling "${us[0]}"`);
    if (/<details|\bwait\b|\bhmm\b|let me /i.test(md || "")) problems.push(`${k}: leaked working or details block`);
  }
  if (problems.length) { bad++; console.log(`✗ ${f}\n   ${problems.join("\n   ")}`); }
  else console.log(`✓ ${f}`);
}
console.log(`\n${files.length - bad} of ${files.length} OK`);
process.exit(bad ? 1 : 0);

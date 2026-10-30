// Fills the worksheet pool so visitors get a checked worksheet instantly
// instead of waiting for a fresh one. For each topic (scripts/
// worksheet-topics.json) with fewer than --per verified worksheets, it
// writes one with the same prompt and settings as the live generator,
// checks the layout, then has a second model solve every question
// (lib/worksheet-check-prompt.js). Passes are saved as 'verified', fails
// as 'rejected'.
//
// Run from the repo root (reads .env.local):
//   node scripts/seed-worksheet-pool.mjs                 # Years 7 to 10A, 1 per topic
//   node scripts/seed-worksheet-pool.mjs --years 3-10 --per 2
//   node scripts/seed-worksheet-pool.mjs --limit 10       # try a few first
//
// Roughly 1 minute and about 10 cents per topic, 4 at a time. Safe to stop
// and re-run: it skips topics that already have enough.

import fs from "node:fs";
import { SYSTEM_INSTRUCTIONS, buildWorksheetUserMessage } from "../lib/worksheet-prompt.js";
import { CHECK_SYSTEM, CHECK_TOOL, checkUserMessage } from "../lib/worksheet-check-prompt.js";
import { worksheetStructureProblems } from "../lib/worksheet-structure.js";
import { sanitizeGenerated } from "../lib/sanitize-generated.js";
import { findKatexErrors } from "../lib/markdown-katex-validate.js";

const args = Object.fromEntries(
  process.argv.slice(2).join(" ").split("--").filter(Boolean).map((a) => {
    const [k, ...v] = a.trim().split(/\s+/);
    return [k, v.join(" ") || "true"];
  })
);
const PER = Number(args.per || 1);
const LIMIT = Number(args.limit || 1e9);
const CONCURRENCY = Number(args.concurrency || 4);
const [yFrom, yTo] = String(args.years || "7-10").split("-").map(Number);
const THINKING_BUDGET = 3000;

const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split("\n").filter((l) => /^[A-Z_]+=/.test(l)).map((l) => {
    const i = l.indexOf("=");
    return [l.slice(0, i), l.slice(i + 1).trim().replace(/^"|"$/g, "")];
  })
);
const SUPA = env.NEXT_PUBLIC_SUPABASE_URL;
const SKEY = env.SUPABASE_SERVICE_ROLE_KEY;
const AKEY = env.ANTHROPIC_API_KEY;
if (!SUPA || !SKEY || !AKEY) throw new Error("Need NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and ANTHROPIC_API_KEY in .env.local");

const supa = async (path, init = {}) => {
  const r = await fetch(`${SUPA}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: SKEY, authorization: `Bearer ${SKEY}`, "content-type": "application/json", ...(init.headers || {}) },
  });
  if (!r.ok) throw new Error(`supabase ${r.status}: ${await r.text()}`);
  return r.status === 204 ? null : r.json();
};
const claude = async (body) => {
  for (let attempt = 0; attempt < 3; attempt++) {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": AKEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.status === 429 || r.status >= 500) { await new Promise((s) => setTimeout(s, 5000 * (attempt + 1))); continue; }
    const d = await r.json();
    if (d.error) throw new Error(d.error.message);
    return d;
  }
  throw new Error("Anthropic API kept failing");
};

const yearNum = (y) => Number(y.match(/\d+/)[0]) + (y.endsWith("A") ? 0.5 : 0);
const topics = JSON.parse(fs.readFileSync("scripts/worksheet-topics.json", "utf8"))
  .filter((t) => yearNum(t.year) >= yFrom && yearNum(t.year) <= yTo + 0.5)
  .sort((a, b) => yearNum(b.year) - yearNum(a.year));

let done = 0, verified = 0, rejected = 0, skipped = 0;
async function one(t) {
  const key = `id:${t.id}`;
  const have = await supa(`worksheet_pool?select=id&year_level=eq.${encodeURIComponent(t.year)}&topic_key=eq.${encodeURIComponent(key)}&status=eq.verified`);
  if (have.length >= PER) { skipped++; return; }
  for (let k = have.length; k < PER; k++) {
    const gen = await claude({
      model: "claude-sonnet-4-6",
      max_tokens: 3500 + THINKING_BUDGET,
      thinking: { type: "enabled", budget_tokens: THINKING_BUDGET },
      system: SYSTEM_INSTRUCTIONS,
      messages: [{ role: "user", content: buildWorksheetUserMessage({ yearLevel: t.year, topicLabel: t.label, topicDescription: t.desc, variantSeed: Math.random().toString(36).slice(2, 10) }) }],
    });
    const raw = gen.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
    const md = sanitizeGenerated(raw);
    const layout = worksheetStructureProblems(md);
    const katex = findKatexErrors(raw);
    let status = "rejected", notes = [...layout, ...katex.map(() => "maths that won't render")].join(" | ");
    if (!layout.length && !katex.length) {
      const chk = await claude({
        model: "claude-sonnet-4-6",
        max_tokens: 6000,
        system: CHECK_SYSTEM,
        tools: [CHECK_TOOL],
        tool_choice: { type: "tool", name: "report_check" },
        messages: [{ role: "user", content: checkUserMessage({ yearLevel: t.year, topicLabel: t.label, content: md }) }],
      });
      const r = chk.content.find((b) => b.type === "tool_use")?.input;
      const bad = (r?.questions || []).filter((q) => !q.ok);
      const pass = r && r.questions.length === 6 && !bad.length && r.structure_ok !== false;
      status = pass ? "verified" : "rejected";
      notes = [r?.structure_ok === false ? `Structure: ${r.structure_issue}` : null, ...bad.map((q) => `Q${q.n}: ${q.issue}`)].filter(Boolean).join(" | ");
    }
    await supa("worksheet_pool", {
      method: "POST",
      headers: { prefer: "return=minimal" },
      body: JSON.stringify({ year_level: t.year, topic_key: key, topic_label: t.label, content: md, status, check_notes: notes || null, checked_at: new Date().toISOString() }),
    });
    status === "verified" ? verified++ : rejected++;
    console.log(`${status === "verified" ? "✓" : "✗"} ${t.year} ${t.label}${notes ? "  (" + notes.slice(0, 140) + ")" : ""}`);
  }
}

const queue = topics.slice(0, LIMIT);
console.log(`Topics: ${queue.length} (${yFrom} to ${yTo}), ${PER} checked worksheet each, ${CONCURRENCY} at a time.`);
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const t = queue.shift();
      try { await one(t); } catch (e) { console.log(`! ${t.year} ${t.label}: ${e.message}`); }
      done++;
    }
  })
);
console.log(`Done. Verified ${verified}, rejected ${rejected}, already had enough ${skipped}.`);
console.log("Rejected topics are simply tried again on the next run.");

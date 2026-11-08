import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

// Reviewed marking keys for the Teacher Zone online papers.
//   content/automark/keys/*.json  { "<hash>": [parts] | null }
//     one entry per bank question, by a hash of its question text; null
//     means reviewed and paper-only (not auto-markable).
//   content/automark/new/*.json   { "<Year>": { "<section code>": [items] } }
//     questions written to be auto-marked, each with its key inline.
// See lib/automark.js for the key format.
const DIR = path.join(process.cwd(), "content", "automark");

export const questionHash = (text) => createHash("sha1").update(String(text).trim()).digest("hex").slice(0, 16);

function readDir(sub) {
  const dir = path.join(DIR, sub);
  let files = [];
  try { files = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort(); } catch { return []; }
  return files.map((f) => {
    try { return JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")); } catch { return null; }
  }).filter(Boolean);
}

let keys = null;
function allKeys() {
  if (keys) return keys;
  keys = new Map();
  for (const d of readDir("keys")) for (const [h, k] of Object.entries(d)) keys.set(h, k);
  return keys;
}

// The reviewed key for a question: an array of parts, or null (paper-only
// or not reviewed yet).
export function reviewedKey(questionText) {
  const k = allKeys().get(questionHash(questionText));
  return Array.isArray(k) && k.length ? k : null;
}

let extras = null;
// New auto-markable questions for one section: [{ kind, question, answer, solution, key }].
export function extraItems(year, code) {
  if (!extras) {
    extras = {};
    for (const d of readDir("new")) for (const [y, secs] of Object.entries(d)) for (const [c, items] of Object.entries(secs || {})) {
      ((extras[y] ||= {})[c] ||= []).push(...(Array.isArray(items) ? items : []));
    }
  }
  return extras[year]?.[code] || [];
}

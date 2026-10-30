import fs from "node:fs";
import path from "node:path";

// The website's share of the home page question counter.
//   - bumpQuestionTally: add n to a source after a successful generation
//     (supabase/migrations/2026-10-30_question_tally.sql). Best effort:
//     never fails the request.
//   - getSiteQuestionCount: the running total plus the questions published
//     on the site (worked examples, "Your turn", practice questions on the
//     topic pages, and the NAPLAN tests).

export async function bumpQuestionTally(admin, source, n) {
  try {
    const { error } = await admin.rpc("bump_question_tally", { p_source: source, p_n: n });
    if (error) console.warn("[question-tally] bump failed:", error.message);
  } catch (e) {
    console.warn("[question-tally] bump failed:", e?.message || e);
  }
}

let published = null;
export function publishedQuestionCount() {
  if (published !== null) return published;
  let n = 0;
  try {
    const wx = path.join(process.cwd(), "content", "worked-examples");
    for (const f of fs.readdirSync(wx)) {
      if (!f.endsWith(".json")) continue;
      const d = JSON.parse(fs.readFileSync(path.join(wx, f), "utf8"));
      n += (d.examples?.length || 0) + (d.practice ? 1 : 0) + (d.turn ? 1 : 0);
    }
    const np = path.join(process.cwd(), "content", "naplan");
    for (const f of fs.readdirSync(np)) {
      if (!f.endsWith(".json")) continue;
      n += JSON.parse(fs.readFileSync(path.join(np, f), "utf8")).questions?.length || 0;
    }
  } catch {
    // leave n as counted so far
  }
  published = n;
  return n;
}

// Running total from the website's Supabase (service role, server only).
// Cached for an hour. 0 on any problem.
export async function getSiteTally() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return 0;
  try {
    const r = await fetch(`${url}/rest/v1/question_tally?select=total`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    });
    if (!r.ok) return 0;
    const rows = await r.json();
    return Array.isArray(rows) ? rows.reduce((s, x) => s + (Number(x.total) || 0), 0) : 0;
  } catch {
    return 0;
  }
}

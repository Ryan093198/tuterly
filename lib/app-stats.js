// Live numbers from the Tuterly app's own Supabase project (separate from
// the website's). Read through public.public_stats() in the app project
// (tuterly-study/supabase/migrations/20261029001000_public_stats.sql),
// which returns counts only. The publishable key is the one the app ships
// with, so it's safe here. Cached for an hour; null on any problem, and
// callers hide the counter.
const APP_URL = process.env.TUTERLY_APP_SUPABASE_URL || "https://iuiqiqtthmpvtxmirdam.supabase.co";
const APP_KEY = process.env.TUTERLY_APP_SUPABASE_KEY || "sb_publishable_ZYFGIG5b3L8SnnidBGjyFQ_Laie64Fo";

// Below this the number undersells the app, so don't show it.
export const COUNTER_MIN = Number(process.env.TUTERLY_COUNTER_MIN) || 500;

// App questions plus the website's (generated worksheets, Try it free and
// the questions published on the site). Null if the app's count can't be
// read, so the counter hides rather than showing a partial number.
export async function getQuestionTotal() {
  const app = await getAppStats();
  if (!app) return null;
  const { getSiteTally, publishedQuestionCount } = await import("@/lib/question-tally");
  const site = await getSiteTally();
  return { app: app.questionsGenerated, site: site + publishedQuestionCount(), total: app.questionsGenerated + site + publishedQuestionCount() };
}

export async function getAppStats() {
  try {
    const r = await fetch(`${APP_URL}/rest/v1/rpc/public_stats`, {
      method: "POST",
      headers: { apikey: APP_KEY, "Content-Type": "application/json" },
      body: "{}",
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    });
    if (!r.ok) return null;
    const d = await r.json();
    const n = Number(d?.questions_generated);
    return Number.isFinite(n) ? { questionsGenerated: n } : null;
  } catch {
    return null;
  }
}

import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { searchAnalytics, melbDate, GSC_SITE } from "@/lib/search-console";
import { sendSearchReportEmail } from "@/lib/email";

export const runtime = "nodejs";
export const maxDuration = 60;

// Weekly organic search report (Search Console). Scheduled in vercel.json for
// Monday morning Melbourne time. Vercel Cron sends `Authorization: Bearer
// $CRON_SECRET`; ?key= works for manual runs, and ?dry=1 returns the report as
// JSON without emailing or saving. Fails closed if CRON_SECRET is unset.
//
// The week is the 7 days ending 3 days ago (Search Console data lags), compared
// with the 7 days before that. Each run also saves that week's page and query
// rows to search_console_weekly, so trends build up over time.

const TUTOR = /tutor|tuition|tutoring/i; // old marketplace searches: not the focus now

function authorized(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  if (request.headers.get("authorization") === `Bearer ${secret}`) return true;
  return new URL(request.url).searchParams.get("key") === secret;
}

const byKey = (rows) => new Map(rows.map((r) => [r.keys[0], r]));
const sum = (rows, f) => rows.reduce((s, r) => s + (r[f] || 0), 0);
const path = (url) => url.replace(/^https?:\/\/(www\.)?tuterly\.com\.au/, "") || "/";

async function buildReport() {
  const w = { start: melbDate(9), end: melbDate(3) };
  const p = { start: melbDate(16), end: melbDate(10) };
  const m = { start: melbDate(30), end: melbDate(3) };
  const before = { start: melbDate(37), end: melbDate(10) };

  const [pagesNow, pagesPrev, queriesNow, queries28, queriesBefore] = await Promise.all([
    searchAnalytics({ startDate: w.start, endDate: w.end, dimensions: ["page"] }),
    searchAnalytics({ startDate: p.start, endDate: p.end, dimensions: ["page"] }),
    searchAnalytics({ startDate: w.start, endDate: w.end, dimensions: ["query"] }),
    searchAnalytics({ startDate: m.start, endDate: m.end, dimensions: ["query"], rowLimit: 5000 }),
    searchAnalytics({ startDate: before.start, endDate: before.end, dimensions: ["query"], rowLimit: 5000 }),
  ]);

  const totals = (rows) => ({ clicks: sum(rows, "clicks"), impressions: sum(rows, "impressions") });
  const prevPages = byKey(pagesPrev);

  const pages = pagesNow.map((r) => {
    const old = prevPages.get(r.keys[0]);
    return {
      page: path(r.keys[0]), clicks: r.clicks, impressions: r.impressions, position: r.position,
      clicksChange: r.clicks - (old?.clicks || 0), impressionsChange: r.impressions - (old?.impressions || 0),
    };
  });
  for (const [url, old] of prevPages) {
    if (!pagesNow.find((r) => r.keys[0] === url)) {
      pages.push({ page: path(url), clicks: 0, impressions: 0, position: null, clicksChange: -old.clicks, impressionsChange: -old.impressions });
    }
  }

  const topPages = [...pages].sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions).slice(0, 10);
  const risers = [...pages].filter((x) => x.impressionsChange > 0).sort((a, b) => b.impressionsChange - a.impressionsChange).slice(0, 5);
  const fallers = [...pages].filter((x) => x.impressionsChange < 0).sort((a, b) => a.impressionsChange - b.impressionsChange).slice(0, 5);

  // Searches where we sit just off page 1 (positions 8 to 20) over 28 days:
  // the cheapest wins, usually by improving or splitting the page.
  const nearPage1 = queries28
    .filter((r) => !TUTOR.test(r.keys[0]) && r.position >= 8 && r.position <= 20 && r.impressions >= 10)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15)
    .map((r) => ({ query: r.keys[0], impressions: r.impressions, clicks: r.clicks, position: r.position }));

  // Searches seen this week that didn't appear in the 4 weeks before it.
  const seen = new Set(queriesBefore.map((r) => r.keys[0]));
  const newSearches = queriesNow
    .filter((r) => !seen.has(r.keys[0]) && !TUTOR.test(r.keys[0]))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15)
    .map((r) => ({ query: r.keys[0], impressions: r.impressions, clicks: r.clicks, position: r.position }));

  return {
    site: GSC_SITE, week: w, previousWeek: p,
    totals: { now: totals(pagesNow), prev: totals(pagesPrev) },
    topPages, risers, fallers, nearPage1, newSearches,
    _save: { weekEnd: w.end, pagesNow, queriesNow },
  };
}

async function saveWeek({ weekEnd, pagesNow, queriesNow }) {
  const admin = createAdminClient();
  const row = (dimension) => (r) => ({
    week_end: weekEnd, dimension, key: r.keys[0],
    clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
  });
  const rows = [...pagesNow.map(row("page")), ...queriesNow.map(row("query"))];
  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await admin.from("search_console_weekly").upsert(rows.slice(i, i + 500), { onConflict: "week_end,dimension,key" });
    if (error) return `error: ${error.message}`;
  }
  return rows.length;
}

async function handle(request) {
  if (!authorized(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const dry = new URL(request.url).searchParams.get("dry") === "1";
  try {
    const { _save, ...report } = await buildReport();
    if (dry) return NextResponse.json({ ok: true, dry: true, report });
    const saved = await saveWeek(_save);
    const email = await sendSearchReportEmail(report);
    return NextResponse.json({ ok: true, saved, emailed: !!email?.id, week: report.week });
  } catch (err) {
    console.error("[search-console]", err);
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}

export async function GET(request) { return handle(request); }
export async function POST(request) { return handle(request); }

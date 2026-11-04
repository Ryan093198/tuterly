import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sweepStuckRequests } from "@/lib/topic-test";
import { sendTopicTestEmail } from "@/lib/email";

export const runtime = "nodejs";
// Room for the topic test sweep below (one test can take a couple of minutes).
export const maxDuration = 300;

// Cleanup cron (audit M1). The rate-limit / abuse-log tables gain a row per AI
// call or public-form submission and are never pruned, so the COUNT queries the
// hot paths run against them degrade over time. This deletes rows older than the
// retention window. Scheduled in vercel.json (daily). Vercel Cron sends the
// header `Authorization: Bearer $CRON_SECRET`; we also accept ?key= for manual
// runs. If CRON_SECRET is unset we refuse (fail closed) so the endpoint can't be
// hit anonymously in production.
const RETENTION_DAYS = 2;

function authorized(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const auth = request.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;
  const url = new URL(request.url);
  return url.searchParams.get("key") === secret;
}

async function handle(request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const cutoff = new Date(
    Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();
  const admin = createAdminClient();

  const tables = [
    { table: "api_rate_limits", column: "called_at" },
    // Kept 15 days: the Monday report counts worksheets made this week and
    // last week (app/api/cron/search-console).
    { table: "worksheet_generations", column: "created_at", days: 15 },
    { table: "public_request_log", column: "created_at" },
  ];

  const results = {};
  for (const { table, column, days } of tables) {
    const { error, count } = await admin
      .from(table)
      .delete({ count: "exact" })
      .lt(column, days ? new Date(Date.now() - days * 86_400_000).toISOString() : cutoff);
    results[table] = error ? `error: ${error.message}` : (count ?? 0);
  }

  // Topic tests whose run was cut off before sending (lib/topic-test.js).
  let topicTestsRetried = 0;
  try {
    topicTestsRetried = await sweepStuckRequests({ sendEmail: sendTopicTestEmail, limit: 2 });
  } catch (e) {
    console.error("[cleanup] topic test sweep failed", e?.message || e);
  }

  return NextResponse.json({ ok: true, deleted: results, cutoff, topicTestsRetried });
}

export async function GET(request) {
  return handle(request);
}

export async function POST(request) {
  return handle(request);
}

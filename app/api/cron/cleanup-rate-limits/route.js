import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

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
    { table: "worksheet_generations", column: "created_at" },
    { table: "public_request_log", column: "created_at" },
  ];

  const results = {};
  for (const { table, column } of tables) {
    const { error, count } = await admin
      .from(table)
      .delete({ count: "exact" })
      .lt(column, cutoff);
    results[table] = error ? `error: ${error.message}` : (count ?? 0);
  }

  return NextResponse.json({ ok: true, deleted: results, cutoff });
}

export async function GET(request) {
  return handle(request);
}

export async function POST(request) {
  return handle(request);
}

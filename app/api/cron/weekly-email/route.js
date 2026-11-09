import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase-admin";
import { WEEKLY_YEARS, weekOf, topicForWeek, buildWeeklyEmail } from "@/lib/weekly-email";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";
export const maxDuration = 300;

// Weekly worksheet email, Monday 7pm Melbourne in daylight saving, 6pm in
// winter (vercel.json: 08:07 UTC Mondays). Sends to
// worksheet_email_signups rows with weekly_opt_in, not unsubscribed, a
// Year 7 to 10A year level, and nothing sent in the last 6 days.
// Auth: `Authorization: Bearer $CRON_SECRET`, or ?key= for manual runs.
//   ?dry=1          list who would get what, send nothing
//   ?preview=Year 8 return that year's email HTML (no send)
//   ?to=a@b.com     send this week's email for ?year= to one address only (test)
// Fails closed if CRON_SECRET is unset.

// Paused by Ryan on 9 Nov 2026 while the email content is reworked: the
// cron is also out of vercel.json. ?preview= and ?to= (single test send)
// still work. To resume, set this to false and put the cron back.
const PAUSED = true;

const FROM = process.env.RESEND_FROM_EMAIL || "Tuterly <noreply@tuterly.com.au>";

function authorized(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  if (request.headers.get("authorization") === `Bearer ${secret}`) return true;
  return new URL(request.url).searchParams.get("key") === secret;
}

const links = (sendId, token) => ({
  track: (path) => `${SITE_URL}/api/email/c/${sendId}?u=${encodeURIComponent(path)}`,
  pixelUrl: `${SITE_URL}/api/email/o/${sendId}`,
  unsubscribeUrl: `${SITE_URL}/api/email/unsubscribe?t=${token}`,
});

async function handle(request) {
  if (!authorized(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const params = new URL(request.url).searchParams;
  const week = weekOf();

  const preview = params.get("preview");
  if (preview) {
    const page = topicForWeek(preview, week);
    if (!page) return NextResponse.json({ error: "no topic for that year" }, { status: 400 });
    const { html } = buildWeeklyEmail({ page, yearLevel: preview, ...links("preview", "preview") });
    return new NextResponse(html, { headers: { "content-type": "text/html; charset=utf-8" } });
  }

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  const testTo = params.get("to");
  if (testTo) {
    const year = params.get("year") || "Year 8";
    const page = topicForWeek(year, week);
    if (!page || !resend) return NextResponse.json({ error: !page ? "no topic" : "RESEND_API_KEY not set" }, { status: 400 });
    const { subject, html, text } = buildWeeklyEmail({ page, yearLevel: year, ...links("test", "test") });
    const { data, error } = await resend.emails.send({ from: FROM, to: testTo, subject: `[Test] ${subject}`, html, text });
    return NextResponse.json({ ok: !error, id: data?.id, error: error?.message });
  }

  if (PAUSED) return NextResponse.json({ ok: true, paused: true, sent: 0 });

  const admin = createAdminClient();
  const cutoff = new Date(Date.now() - 6 * 86_400_000).toISOString();
  const { data: subs, error: qErr } = await admin
    .from("worksheet_email_signups")
    .select("id, email, year_level, unsub_token, last_weekly_sent_at")
    .eq("weekly_opt_in", true)
    .is("unsubscribed_at", null)
    .in("year_level", WEEKLY_YEARS)
    .or(`last_weekly_sent_at.is.null,last_weekly_sent_at.lt.${cutoff}`)
    .limit(2000);
  if (qErr) return NextResponse.json({ ok: false, error: qErr.message }, { status: 500 });

  const plan = subs.map((s) => ({ s, page: topicForWeek(s.year_level, week) })).filter((x) => x.page);
  if (params.get("dry") === "1") {
    const byYear = {};
    for (const { s, page } of plan) (byYear[s.year_level] ||= { topic: page.topic, count: 0 }).count++;
    return NextResponse.json({ ok: true, dry: true, week, recipients: plan.length, byYear });
  }
  if (!resend) return NextResponse.json({ ok: false, error: "RESEND_API_KEY not set" }, { status: 500 });

  let sent = 0, skipped = 0, failed = 0;
  for (const { s, page } of plan) {
    // Claim the (subscriber, week) slot first, so a re-run never double-sends.
    const { data: row, error: insErr } = await admin
      .from("weekly_email_sends")
      .insert({ signup_id: s.id, week, year_level: s.year_level, topic_slug: page.slug })
      .select("id")
      .single();
    if (insErr) { skipped++; continue; }

    const l = links(row.id, s.unsub_token);
    const { subject, html, text } = buildWeeklyEmail({ page, yearLevel: s.year_level, ...l });
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: s.email,
      subject,
      html,
      text,
      headers: {
        "List-Unsubscribe": `<${l.unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });
    if (error) {
      failed++;
      await admin.from("weekly_email_sends").delete().eq("id", row.id);
      console.error("[weekly-email] send failed", error.message);
      continue;
    }
    sent++;
    await admin.from("weekly_email_sends").update({ resend_id: data?.id || null }).eq("id", row.id);
    await admin.from("worksheet_email_signups").update({ last_weekly_sent_at: new Date().toISOString() }).eq("id", s.id);
    await new Promise((r) => setTimeout(r, 550)); // stay under Resend's 2 requests a second
  }
  return NextResponse.json({ ok: true, week, sent, skipped, failed });
}

export async function GET(request) { return handle(request); }
export async function POST(request) { return handle(request); }

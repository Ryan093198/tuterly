import { NextResponse, after } from "next/server";
import { guardPublicForm } from "@/lib/public-form-guard";
import { createAdminClient } from "@/lib/supabase-admin";
import { resolveTopic, getOrCreateTopicTest } from "@/lib/topic-test";
import { sendTopicTestEmail } from "@/lib/email";

export const runtime = "nodejs";
// The reply returns straight away; the test is written (first request for
// a topic only, about a minute) and emailed after the response, in after().
export const maxDuration = 300;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PER_EMAIL_PER_DAY = 3;

// POST /api/topic-test/request
//   { email, year_level, topic_id, placement }
// From the worksheet generator's free-limit box (TopicTestOffer). Puts the
// address on the Tuterly app waitlist (the box says so) and emails a full
// 25-question test on the topic with its answer key.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }

  const guard = await guardPublicForm(request, body, "topic-test", { perMinute: 2, perHour: 5, perDay: 8 });
  if (guard.blocked) {
    if (guard.silent) return NextResponse.json({ ok: true });
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(guard.retryAfterSeconds) } }
    );
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  const topic = resolveTopic(String(body.year_level || ""), String(body.topic_id || ""));
  if (!topic) {
    return NextResponse.json({ error: "Pick a Years 7 to 10 topic first." }, { status: 400 });
  }
  const pl = typeof body.placement === "string" ? body.placement.trim() : "";
  const placement = /^[a-z0-9_-]{1,60}$/i.test(pl) ? pl : "topic_test";

  const admin = createAdminClient();
  const since = new Date(Date.now() - 86_400_000).toISOString();
  const { count } = await admin
    .from("topic_test_requests")
    .select("id", { count: "exact", head: true })
    .eq("email", email)
    .gte("created_at", since);
  if ((count || 0) >= PER_EMAIL_PER_DAY) {
    return NextResponse.json(
      { error: "You've asked for a few tests today already. Check your inbox, and come back tomorrow for more." },
      { status: 429 }
    );
  }

  const { data: req, error: reqErr } = await admin
    .from("topic_test_requests")
    .insert({ email, year_level: topic.yearLevel, topic_id: topic.topicId, placement })
    .select("id")
    .single();
  if (reqErr) {
    console.error("[topic-test] request insert failed", reqErr.message);
    return NextResponse.json({ error: "Sorry, something went wrong. Please try again." }, { status: 500 });
  }

  // On the app waitlist (one row per email; already there is fine).
  const yearNum = Number(topic.yearLevel.match(/\d+/)?.[0]);
  const { error: wlErr } = await admin.from("study_waitlist").insert({
    email,
    role: "parent",
    year_level: yearNum >= 7 && yearNum <= 10 ? yearNum : null,
    interest: "launch",
    source_page: typeof body.source_page === "string" && body.source_page.startsWith("/") ? body.source_page.slice(0, 200) : null,
    placement,
  });
  const newOnWaitlist = !wlErr;
  if (wlErr && wlErr.code !== "23505") console.error("[topic-test] waitlist insert failed", wlErr.message);

  after(async () => {
    try {
      const test = await getOrCreateTopicTest(topic);
      await sendTopicTestEmail({ to: email, test, newOnWaitlist });
      await admin.from("topic_test_requests").update({ test_id: test.id, sent_at: new Date().toISOString() }).eq("id", req.id);
      if (newOnWaitlist) {
        // The test email doubles as the waitlist confirmation.
        await admin
          .from("study_waitlist")
          .update({ confirmation_sent_at: new Date().toISOString() })
          .eq("email", email)
          .is("confirmation_sent_at", null);
      }
    } catch (err) {
      console.error("[topic-test] failed", err?.message || err);
      await admin.from("topic_test_requests").update({ error: String(err?.message || err).slice(0, 300) }).eq("id", req.id);
    }
  });

  return NextResponse.json({ ok: true });
}

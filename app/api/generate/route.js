import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase-server";
import { buildReportPrompt } from "@/lib/report-prompt";
import { signedUrlForPhoto } from "@/lib/storage-signing";
import { checkRateLimit } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase-admin";
import {
  findKatexErrors,
  formatErrorsForRetry,
} from "@/lib/markdown-katex-validate";
import { stripEmDashes, stripLinks } from "@/lib/markdown-voice";
import { stripe } from "@/lib/stripe";
import { awardReferralCreditForReferee } from "@/lib/referrals";

export const runtime = "nodejs";
// Reports with photos + LaTeX + Sonnet routinely take 30-50s. Was relying
// on the platform default which is too short for the slow path.
export const maxDuration = 60;

// If the first generation took longer than this, skip the validate-and-retry
// pass — a second Sonnet call on top would risk the 60s maxDuration cap.
const RETRY_BUDGET_MS = 30_000;

export async function POST(request) {
  try {
    return await handle(request);
  } catch (err) {
    // Without this, an unhandled exception (Anthropic call failure, DB
    // glitch, etc.) bubbles to Next's default HTML error page — the client
    // then fails to parse it as JSON and the tutor sees a cryptic
    // "Unexpected token" instead of the real cause.
    console.error("[generate] unhandled error:", err);
    const message =
      err?.message && typeof err.message === "string"
        ? err.message
        : "Report generator failed. Try again in a moment.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function handle(request) {
  const { session_id } = await request.json();
  if (!session_id) {
    return NextResponse.json({ error: "session_id required" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // One service-role client for the whole request (audit H1: the referral
  // block previously referenced `admin` before it was declared, so it always
  // threw and was silently swallowed — the credit never fired).
  const admin = createAdminClient();

  const limit = await checkRateLimit(user.id, "generate", {
    perMinute: 3,
    perHour: 30,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: limit.message },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  const { data: session } = await supabase
    .from("sessions")
    .select("id, date, duration_minutes, raw_notes, tutor_id, student_id, subject")
    .eq("id", session_id)
    .eq("tutor_id", user.id)
    .single();
  if (!session) {
    return NextResponse.json({ error: "session not found" }, { status: 404 });
  }

  const { data: studentRow } = await supabase
    .from("students")
    .select(
      "id, parent_id, first_name, last_name, year_level, working_level, school, subject, subjects, goals, concerns, term_outline"
    )
    .eq("id", session.student_id)
    .single();

  // Sessions can override the student's curriculum framework so a tutor
  // teaching the same kid both subjects doesn't need duplicate student
  // records. Fall back to the student's subject when the session hasn't
  // picked one.
  const student = studentRow
    ? { ...studentRow, subject: session.subject || studentRow.subject }
    : studentRow;

  const { data: tutor } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  const { data: resources } = await supabase
    .from("resources")
    .select("name, category, content, notes")
    .eq("student_id", session.student_id);

  const { data: photoRows } = await supabase
    .from("session_photos")
    .select("file_url")
    .eq("session_id", session_id)
    .order("created_at", { ascending: true });

  const photoUrls = (
    await Promise.all(
      (photoRows ?? []).map((p) => signedUrlForPhoto(p.file_url))
    )
  ).filter(Boolean);

  const { system, user: userMessage } = buildReportPrompt({
    student,
    session,
    resources: resources ?? [],
    tutor,
  });

  const userContent = [
    ...photoUrls.map((url) => ({
      type: "image",
      source: { type: "url", url },
    })),
    { type: "text", text: userMessage },
  ];

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const baseMessages = [{ role: "user", content: userContent }];

  async function generateOnce(messages) {
    const m = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      system,
      messages,
    });
    const t = m.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n");
    return { message: m, text: t };
  }

  const startedAt = Date.now();
  let { text: content } = await generateOnce(baseMessages);

  // Validate every math block via KaTeX. If anything fails to render, the
  // tutor would see red error text in the browser — better to ask the
  // model to redo with the exact errors than to save broken markdown.
  //
  // Skip the retry if the first call already used more than half the
  // function budget — a second 30-40s call would risk Vercel's 60s cap.
  const katexErrors = findKatexErrors(content);
  const elapsedMs = Date.now() - startedAt;
  if (katexErrors.length > 0 && elapsedMs < RETRY_BUDGET_MS) {
    console.warn(
      "[generate] katex errors, retrying:",
      katexErrors.length,
      "elapsed:",
      elapsedMs
    );
    const retry = await generateOnce([
      ...baseMessages,
      { role: "assistant", content },
      { role: "user", content: formatErrorsForRetry(katexErrors) },
    ]);
    if (retry.text) content = retry.text;
  } else if (katexErrors.length > 0) {
    console.warn(
      "[generate] katex errors but skipping retry — elapsed",
      elapsedMs,
      "exceeds budget",
      RETRY_BUDGET_MS
    );
  }

  // Final voice scrub — strip any em dashes the model emitted despite the
  // prompt rule. They're the single biggest "this is AI" tell.
  content = stripEmDashes(content);
  // Enforce the no-URL/no-link rule programmatically (audit H3), in case a
  // prompt-injection payload pushed a link past the prompt instructions.
  content = stripLinks(content);

  const { data: existing } = await supabase
    .from("reports")
    .select("id")
    .eq("session_id", session_id)
    .maybeSingle();

  let reportId = existing?.id ?? null;
  if (existing) {
    await supabase
      .from("reports")
      .update({ content, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
  } else {
    // Upsert on the session_id unique constraint (audit L1) so a concurrent
    // generation for the same session can't create a duplicate report row.
    const { data: inserted } = await supabase
      .from("reports")
      .upsert({ session_id, content }, { onConflict: "session_id" })
      .select("id")
      .single();
    reportId = inserted?.id ?? null;
  }

  await supabase
    .from("sessions")
    .update({ status: "report_generated" })
    .eq("id", session_id);

  // Trigger the referral credit, if this is the first generated report
  // for the referee. We treat "first report ever for this student" as
  // the firing event — once the student has any other report on file
  // we skip silently. Best-effort: any failure (no referral row, no
  // Stripe customer yet, network error) just logs and moves on; the
  // tutor still gets their report.
  //
  // GATED OFF by default (audit H1/H4): this awards a real $20 Stripe credit,
  // and the referral-abuse guards (self-referral, paid-state requirement,
  // atomic status flip) are P2 work that lands with billing. Set
  // REFERRALS_ENABLED=true only once those are in and billing is live.
  if (
    process.env.REFERRALS_ENABLED === "true" &&
    !existing &&
    student?.parent_id
  ) {
    try {
      // Check this was actually the first report for the student. We
      // count reports across the student's sessions other than the one
      // we just wrote; if any exist, this isn't the first lesson.
      const { count: otherReportCount } = await admin
        .from("reports")
        .select("id, sessions!inner(student_id)", {
          count: "exact",
          head: true,
        })
        .eq("sessions.student_id", student.id)
        .neq("session_id", session_id);
      if ((otherReportCount ?? 0) === 0) {
        const result = await awardReferralCreditForReferee(
          admin,
          stripe(),
          student.parent_id
        );
        if (result.applied) {
          console.log(
            "[generate] referral credit applied:",
            result.amountCents,
            "cents to parent",
            student.parent_id
          );
        }
      }
    } catch (e) {
      console.warn("[generate] referral credit hook failed:", e?.message || e);
    }
  }

  // Best-effort flat-audit row in session_report_log. Browsable in the
  // Supabase Table Editor without needing joins — one row per generated
  // report with tutor name, student name, duration, date, subject, and a
  // semicolon-joined list of topics covered (from the session's ratings).
  // Failure here never blocks the response — the user already has their
  // report, this is just the audit log.
  try {
    const { data: ratings } = await admin
      .from("ratings")
      .select("topic, subtopic")
      .eq("session_id", session_id);
    const topics =
      (ratings ?? [])
        .map((r) =>
          r.subtopic && r.subtopic !== r.topic
            ? `${r.topic} — ${r.subtopic}`
            : r.topic
        )
        .filter(Boolean)
        .join("; ") || null;
    await admin.from("session_report_log").insert({
      session_id,
      report_id: reportId,
      tutor_id: user.id,
      tutor_name: tutor?.full_name ?? null,
      student_id: student?.id ?? null,
      student_name: student
        ? `${student.first_name} ${student.last_name}`
        : null,
      year_level: student?.year_level ?? null,
      subject: session.subject || student?.subject || null,
      session_date: session.date,
      duration_minutes: session.duration_minutes,
      topics,
    });
  } catch (e) {
    console.warn("[generate] session_report_log insert failed:", e?.message || e);
  }

  return NextResponse.json({ content });
}

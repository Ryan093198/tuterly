import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { checkRateLimit } from "@/lib/rate-limit";
import { hasSoftwareAccess } from "@/lib/entitlements";
import { getCurriculumForStudent } from "@/lib/curriculum";
import {
  SYSTEM_INSTRUCTIONS_FULL_TEST_QUESTIONS,
  buildFullTestQuestionsMessage,
} from "@/lib/full-test-prompt";

export const runtime = "nodejs";
// This call now generates the QUESTIONS ONLY (the answer key is a separate
// request, /api/practice/full-test/answers). Splitting keeps each call well
// under Vercel's 60s function limit - generating 25 questions plus a full
// answer key in one call was overrunning it (FUNCTION_INVOCATION_TIMEOUT).
export const maxDuration = 60;

const DAILY_LIMIT = Number(process.env.FULL_TEST_DAILY_LIMIT) || 8;

export async function POST(request) {
  try {
    return await handle(request);
  } catch (err) {
    console.error("[full-test] unhandled error:", err);
    const message =
      err?.message && typeof err.message === "string"
        ? err.message
        : "Practice test generation failed. Try again in a moment.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function handle(request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const limit = await checkRateLimit(user.id, "full_test", {
    perMinute: 1,
    perHour: 4,
    perDay: DAILY_LIMIT,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: limit.message },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }

  const studentId = body?.student_id?.toString();
  if (!studentId) {
    return NextResponse.json({ error: "student_id required" }, { status: 400 });
  }

  const [{ data: student }, { data: tutorLink }] = await Promise.all([
    supabase
      .from("students")
      .select(
        "id, first_name, last_name, year_level, working_level, subject, subjects, parent_id, student_user_id"
      )
      .eq("id", studentId)
      .single(),
    supabase
      .from("tutor_students")
      .select("student_id")
      .eq("tutor_id", user.id)
      .eq("student_id", studentId)
      .maybeSingle(),
  ]);
  if (!student) {
    return NextResponse.json({ error: "student not found" }, { status: 404 });
  }
  const isParent = student.parent_id === user.id;
  const isStudent = student.student_user_id === user.id;
  const isTutor = !!tutorLink;
  if (!isParent && !isStudent && !isTutor) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  // HARD paywall. Full tests need an active Tuterly plan (subscription, trial,
  // or a purchased pack). Tutors are never gated.
  if (!isTutor) {
    const payerId = isParent ? user.id : student.parent_id;
    const entitled = await hasSoftwareAccess(payerId);
    if (!entitled) {
      return NextResponse.json(
        {
          error:
            "Full practice tests need an active Tuterly plan. Please renew your subscription or top up a session pack to unlock them.",
          need_upgrade: true,
        },
        { status: 402 }
      );
    }
  }

  const subject = body?.subject === "english" ? "english" : student.subject || "maths";
  const levelOverride = body?.level?.toString().trim() || null;
  const level = levelOverride || student.working_level || student.year_level;

  const topicLabel = body?.topic_label?.toString().trim();
  if (!topicLabel) {
    return NextResponse.json({ error: "topic_label required" }, { status: 400 });
  }

  // topic_id is optional - full tests usually target a whole strand (no single
  // curriculum code), so a descriptor lookup only happens when an id is passed.
  const topicId = body?.topic_id?.toString() || null;
  let topicDescription = null;
  if (topicId) {
    topicDescription = lookupTopicDescription(level, subject, topicId, student.subjects);
  }

  let recentReportContext = null;
  try {
    const { data: latestReport } = await supabase
      .from("reports")
      .select("content, sessions(student_id, date)")
      .eq("sessions.student_id", studentId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    const latestText = latestReport?.content;
    if (latestText && latestText.length > 0) {
      recentReportContext = latestText.slice(0, 1500);
    }
  } catch (e) {
    console.warn("[full-test] recent report fetch failed:", e?.message || e);
  }

  const userMessage = buildFullTestQuestionsMessage({
    studentName: `${student.first_name} ${student.last_name}`,
    yearLevel: student.year_level,
    workingLevel: student.working_level,
    subject,
    levelLabel: level,
    topicLabel,
    topicDescription,
    recentReportContext,
  });

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const baseMessages = [{ role: "user", content: userMessage }];

  async function generateOnce(messages) {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      system: [
        {
          type: "text",
          text: SYSTEM_INSTRUCTIONS_FULL_TEST_QUESTIONS,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages,
    });
    const text = message.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    return { message, text };
  }

  // Single generation call, no validate-retry pass. A second full generation
  // could push total time past the 60s function limit; 25 questions (no
  // solutions) is a smaller job than the worksheet generator already handles
  // in one call, so one pass is enough. The prompt carries the anti-leak and
  // KaTeX rules.
  const { message, text: testMd } = await generateOnce(baseMessages);
  const totalUsage = message.usage;

  if (!testMd) {
    return NextResponse.json(
      { error: "Test generation returned empty content. Try again." },
      { status: 502 }
    );
  }

  const dateLabel = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const shortLabel = topicLabel.length > 55 ? topicLabel.slice(0, 52) + "…" : topicLabel;
  const resourceName = `Practice test — ${shortLabel} (${dateLabel})`;

  const metadata = {
    kind: "full_test",
    subject,
    level,
    topic_id: topicId,
    topic_label: topicLabel,
    question_count: 25,
    bands: { consolidating: 5, standard: 15, advanced: 5 },
    // The answer key is generated by a follow-up request; until it lands the
    // resource holds questions only.
    answers_pending: true,
  };

  const admin = createAdminClient();
  const { data: inserted, error: insertErr } = await admin
    .from("resources")
    .insert({
      student_id: studentId,
      uploaded_by: user.id,
      name: resourceName,
      category: "practice_test",
      content: testMd,
      file_url: null,
      notes: "25-question practice test with separate answer key",
      metadata,
    })
    .select("id, name, category, content, file_url, notes, metadata, created_at, uploaded_by")
    .single();
  if (insertErr) {
    console.error("[full-test] insert failed:", insertErr);
    return NextResponse.json(
      { error: "Could not save the generated test." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    resource: inserted,
    test_md: testMd,
    usage: totalUsage,
  });
}

function lookupTopicDescription(level, subject, topicId, subjects = null) {
  const lookup = getCurriculumForStudent(level, subjects ?? [level], subject);
  if (!lookup) return null;
  for (const [strand, items] of Object.entries(lookup.curriculum)) {
    for (const item of items) {
      const id = lookup.isVCE ? `${strand}::${item.topic}` : item.code;
      if (id === topicId) return item.desc;
    }
  }
  return null;
}

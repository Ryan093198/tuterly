import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { checkRateLimit } from "@/lib/rate-limit";
import { hasSoftwareAccess } from "@/lib/entitlements";
import {
  SYSTEM_INSTRUCTIONS_FULL_TEST_ANSWERS,
  buildFullTestAnswersMessage,
} from "@/lib/full-test-prompt";
import { ANSWER_KEY_SENTINEL, splitFullTest } from "@/lib/full-test-split";
import { sanitizeGenerated } from "@/lib/sanitize-generated";

export const runtime = "nodejs";
// Second half of full-test generation: the answer key for an already-created
// test resource. Kept separate from the questions call so each stays under
// Vercel's 60s function limit.
export const maxDuration = 60;

export async function POST(request) {
  try {
    return await handle(request);
  } catch (err) {
    console.error("[full-test/answers] unhandled error:", err);
    const message =
      err?.message && typeof err.message === "string"
        ? err.message
        : "Answer key generation failed. Try again in a moment.";
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

  const limit = await checkRateLimit(user.id, "full_test_answers", {
    perMinute: 2,
    perHour: 8,
    perDay: 16,
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

  const resourceId = body?.resource_id?.toString();
  if (!resourceId) {
    return NextResponse.json({ error: "resource_id required" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: resource } = await admin
    .from("resources")
    .select("id, student_id, uploaded_by, category, content, metadata")
    .eq("id", resourceId)
    .single();
  if (!resource || resource.category !== "practice_test") {
    return NextResponse.json({ error: "test not found" }, { status: 404 });
  }

  // Authorize the caller against the resource's student, same rule as the
  // questions route.
  const [{ data: student }, { data: tutorLink }] = await Promise.all([
    supabase
      .from("students")
      .select("id, parent_id, student_user_id")
      .eq("id", resource.student_id)
      .single(),
    supabase
      .from("tutor_students")
      .select("student_id")
      .eq("tutor_id", user.id)
      .eq("student_id", resource.student_id)
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

  // The questions live in the resource content. If an answer key already got
  // appended, split it back out and regenerate from the questions half.
  const { test: questionsMd } = splitFullTest(resource.content || "");
  if (!questionsMd) {
    return NextResponse.json({ error: "no questions to solve" }, { status: 400 });
  }

  const topicLabel = resource.metadata?.topic_label || "this topic";
  const level = resource.metadata?.level || "";
  const subject = resource.metadata?.subject === "english" ? "english" : "maths";

  const userMessage = buildFullTestAnswersMessage({
    topicLabel,
    levelLabel: level,
    subject,
    questionsMarkdown: questionsMd,
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
          text: SYSTEM_INSTRUCTIONS_FULL_TEST_ANSWERS,
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

  // Single generation call, no validate-retry pass (keeps us under the 60s
  // function limit). The prompt carries the anti-leak and KaTeX rules, and
  // sanitizeAnswerKey strips any chain-of-thought / self-correction the model
  // still leaks so a parent never sees it.
  const generated = await generateOnce(baseMessages);
  const answersMd = sanitizeGenerated(generated.text);

  if (!answersMd) {
    return NextResponse.json(
      { error: "Answer key generation returned empty content. Try again." },
      { status: 502 }
    );
  }

  // Persist questions + sentinel + answer key so both PDFs can be re-rendered.
  const combined = `${questionsMd}\n\n${ANSWER_KEY_SENTINEL}\n\n${answersMd}`;
  const newMeta = { ...(resource.metadata || {}), answers_pending: false };
  const { error: updateErr } = await admin
    .from("resources")
    .update({ content: combined, metadata: newMeta })
    .eq("id", resourceId);
  if (updateErr) {
    console.error("[full-test/answers] update failed:", updateErr);
    // The answer key still generated fine; return it so the client can offer
    // the download even if persistence hiccupped.
  }

  return NextResponse.json({ answers_md: answersMd });
}


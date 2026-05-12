import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { checkRateLimit } from "@/lib/rate-limit";
import { getCurriculumForStudent } from "@/lib/curriculum";
import {
  SYSTEM_INSTRUCTIONS,
  buildPracticeUserMessage,
} from "@/lib/practice-prompt";

export const runtime = "nodejs";
// Sonnet generating a worksheet's worth of LaTeX-heavy math comfortably
// runs 30-50s, so 30s timed out FUNCTION_INVOCATION_TIMEOUT for parents.
// Matches /api/lesson-plan, which has the same shape.
export const maxDuration = 60;

const DEFAULT_QUESTIONS = 8;
const MAX_QUESTIONS = 15;
const MIN_QUESTIONS = 3;
// Conservative cap — model output is also capped by max_tokens — but we want
// generation cheap enough that we can give parents a generous daily quota
// without sweating cost. Tunable via env without a deploy.
const DAILY_LIMIT = Number(process.env.PRACTICE_DAILY_LIMIT) || 5;

const ALLOWED_DIFFICULTIES = new Set(["review", "core", "stretch"]);

export async function POST(request) {
  try {
    return await handle(request);
  } catch (err) {
    // Anything that escapes the handler — Anthropic call failures,
    // unexpected DB errors, transient network issues — gets surfaced as a
    // JSON error instead of Next's default HTML error page. Without this
    // the client's res.json() blows up on the HTML and the user just sees
    // "Unexpected token 'A'..." with no actionable info.
    console.error("[practice] unhandled error:", err);
    const message =
      err?.message && typeof err.message === "string"
        ? err.message
        : "Worksheet generator failed. Try again in a moment.";
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

  const limit = await checkRateLimit(user.id, "practice", {
    perMinute: 2,
    perHour: 10,
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

  // Authorization: must be the parent linked to this student. Tutors and
  // students don't hit this route — they have their own flows.
  const { data: student } = await supabase
    .from("students")
    .select("id, first_name, last_name, year_level, working_level, subject, subjects, parent_id")
    .eq("id", studentId)
    .single();
  if (!student) {
    return NextResponse.json({ error: "student not found" }, { status: 404 });
  }
  if (student.parent_id !== user.id) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const subject = body?.subject === "english" ? "english" : student.subject || "maths";
  const levelOverride = body?.level?.toString().trim() || null;
  const level = levelOverride || student.working_level || student.year_level;

  const topicLabel = body?.topic_label?.toString().trim();
  const subtopic = body?.subtopic?.toString().trim() || null;
  if (!topicLabel) {
    return NextResponse.json({ error: "topic_label required" }, { status: 400 });
  }

  // Optional: caller can pass the curriculum-id of the picked topic so we
  // can pull the official descriptor into the prompt. Not strictly required
  // — when generating from a "weak topic" suggestion we only have the
  // subtopic-as-described-by-the-tutor, no curriculum id.
  const topicId = body?.topic_id?.toString() || null;
  let topicDescription = null;
  if (topicId) {
    topicDescription = lookupTopicDescription(
      level,
      subject,
      topicId,
      student.subjects
    );
  }

  const questionsRaw = parseInt(body?.question_count?.toString() || "", 10);
  const questionCount = Number.isFinite(questionsRaw)
    ? Math.min(MAX_QUESTIONS, Math.max(MIN_QUESTIONS, questionsRaw))
    : DEFAULT_QUESTIONS;

  const difficulty = ALLOWED_DIFFICULTIES.has(body?.difficulty)
    ? body.difficulty
    : "core";

  // Pull a small slice of the most recent report so the model can pitch
  // language at the right level. Best-effort — not having one is fine.
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
    console.warn("[practice] recent report fetch failed:", e?.message || e);
  }

  const userMessage = buildPracticeUserMessage({
    studentName: `${student.first_name} ${student.last_name}`,
    yearLevel: student.year_level,
    workingLevel: student.working_level,
    subject,
    levelLabel: level,
    topicLabel,
    topicDescription,
    subtopic,
    questionCount,
    difficulty,
    recentReportContext,
  });

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const baseMessages = [{ role: "user", content: userMessage }];

  async function generateOnce(messages) {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      system: [
        {
          type: "text",
          text: SYSTEM_INSTRUCTIONS,
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

  let { message, text: worksheetMarkdown } = await generateOnce(baseMessages);
  let totalUsage = message.usage;

  // The model intermittently leaks scratch-work ("let me recheck"),
  // self-flagged errors ("Note to parent: Q2 has an arithmetic error"), or
  // contradictory Answer:/working pairs. The prompt forbids all of this, but
  // it still slips through 1 generation in ~5. One automatic retry — with
  // the bad output shown back so the model can see what to avoid — clears
  // the vast majority without burning the user's daily quota.
  const leaks = detectLeaks(worksheetMarkdown);
  if (leaks.length > 0) {
    console.warn("[practice] leak detected, retrying:", leaks);
    const retryMessages = [
      ...baseMessages,
      { role: "assistant", content: worksheetMarkdown },
      {
        role: "user",
        content: `That worksheet violated the rules: ${leaks.join(
          "; "
        )}. Re-emit the ENTIRE worksheet from scratch. Derive every answer privately before writing — solutions must be clean final reasoning only, with no "wait" / "hmm" / "let me recheck" / "Answer (corrected)" language and no notes to the parent/student. If any question's arithmetic doesn't come out clean, REPLACE that question with a different one on the same topic whose answer is tidy.`,
      },
    ];
    const retry = await generateOnce(retryMessages);
    if (retry.text) {
      worksheetMarkdown = retry.text;
      totalUsage = retry.message.usage;
    }
  }

  if (!worksheetMarkdown) {
    return NextResponse.json(
      { error: "Worksheet generation returned empty content. Try again." },
      { status: 502 }
    );
  }

  const dateLabel = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  // Compose a name that's both informative and short enough to fit in the
  // resource list. The full topic description goes into `notes`.
  const shortLabel = topicLabel.length > 60
    ? topicLabel.slice(0, 57) + "…"
    : topicLabel;
  const resourceName = `Practice — ${shortLabel} (${dateLabel})`;

  // Persist the exact generation parameters so a "Regenerate" click can
  // replay them without re-parsing the markdown or re-deriving the topic.
  const metadata = {
    kind: "practice",
    subject,
    level,
    topic_id: topicId,
    topic_label: topicLabel,
    subtopic: subtopic || null,
    question_count: questionCount,
    difficulty,
  };

  const admin = createAdminClient();
  const { data: inserted, error: insertErr } = await admin
    .from("resources")
    .insert({
      student_id: studentId,
      uploaded_by: user.id,
      name: resourceName,
      category: "practice_questions",
      content: worksheetMarkdown,
      file_url: null,
      notes: subtopic
        ? `${questionCount}-question worksheet · ${subtopic}`
        : `${questionCount}-question worksheet`,
      metadata,
    })
    .select(
      "id, name, category, content, file_url, notes, metadata, created_at, uploaded_by"
    )
    .single();
  if (insertErr) {
    console.error("[practice] insert failed:", insertErr);
    return NextResponse.json(
      { error: "Could not save the generated worksheet." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    resource: inserted,
    usage: totalUsage,
  });
}

// Patterns the prompt forbids but the model keeps emitting anyway. Matched
// case-insensitively. Each entry is a short label + a regex; the label flows
// into the retry message so the model knows exactly what to fix.
const LEAK_PATTERNS = [
  ["visible self-correction", /\b(?:let me|let'?s)\s+(?:redo|recheck|re-?check|re-?derive|be precise|choose|pick|use|try|fix)/i],
  ["scratch-work interjection", /(?:^|[\s>])(?:wait|hmm|oops|actually)\b\s*[,—\-:]/im],
  ["correction header", /\b(?:correction(?:\s+note)?:|answer\s*\((?:corrected|confirmed|revised)\)|corrected\s+(?:question|version|answer|text|setup|equation|solution|note|below)|revised\s+(?:question|answer|version))/i],
  ["question replacement", /\b(?:restate(?:d|ment)?\b|replaced\s+(?:above|below)|question\s+above\s+is\s+(?:replaced|incorrect|wrong)|clean(?:er)?\s+version|cleaner\s+numbers|not\s+clean\b|isn'?t\s+clean\b|that'?s\s+not\s+clean\b)/i],
  ["meta-note to parent/student", /\bnote\s+(?:to|for)\s+(?:the\s+)?(?:parent|student|tutor)/i],
  ["see-note reference", /\(\s*see\s+note(?:\s+above|\s+below)?\s*\)/i],
  ["apology / disclaimer", /\b(?:please\s+disregard|contains?\s+(?:a|an|the)?\s*(?:arithmetic|self-correction)?\s*error|please\s+contact\s+your\s+tutor|disregard\s+(?:the|this)\s+(?:above|previous))/i],
];

function detectLeaks(markdown) {
  const hits = [];
  for (const [label, re] of LEAK_PATTERNS) {
    if (re.test(markdown)) hits.push(label);
  }
  return hits;
}

function lookupTopicDescription(level, subject, topicId, subjects = null) {
  const lookup = getCurriculumForStudent(level, subjects ?? [level], subject);
  if (!lookup) return null;
  // VCAA F-10 topics are keyed by the VCAA code (e.g. "VC2M5N03"); VCE
  // topics use a synthetic id "{strand}::{topic}" generated in
  // lib/curriculum-topics.js.
  for (const [strand, items] of Object.entries(lookup.curriculum)) {
    for (const item of items) {
      const id = lookup.isVCE
        ? `${strand}::${item.topic}`
        : item.code;
      if (id === topicId) return item.desc;
    }
  }
  return null;
}

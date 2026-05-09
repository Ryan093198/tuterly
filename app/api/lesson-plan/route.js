import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { checkRateLimit } from "@/lib/rate-limit";
import { extractPdfText } from "@/lib/pdf";
import {
  getCurriculumForStudent,
  formatCurriculumForPrompt,
} from "@/lib/curriculum";

export const runtime = "nodejs";
// 40-week plans take a chunk of time; allow up to 60s.
export const maxDuration = 60;

const MAX_PLANNER_BYTES = 25 * 1024 * 1024;
const MAX_WEEKS = 40;
const DEFAULT_WEEKS = 10;

const SYSTEM_INSTRUCTIONS = `You are an experienced one-on-one tutor planning a sequence of weekly tutoring sessions for a single student. Each tutoring session is roughly an hour, occurring once per week.

Produce a markdown lesson plan with EXACTLY this structure:

# Lesson Plan — {Subject} — {N} weeks

## Week 1: {Main topic for the week}
**Subtopics:**
- {Specific subtopic 1}
- {Specific subtopic 2}
- {Specific subtopic 3}

## Week 2: {Main topic}
**Subtopics:**
- ...

(continue for every week)

PLANNING RULES:
- One main topic per week, with 3–5 specific subtopics under it.
- Order topics so prior knowledge supports later topics. Foundations first, harder material later.
- If the tutor supplied a school term planner, mirror its sequence as closely as possible — the school's progression takes priority over the curriculum data.
- If the tutor supplied a list of topics they want to cover, prioritise those, ordered logically.
- Otherwise plan from the curriculum reference.
- Subtopics should be specific (e.g. "Solving quadratic equations using the null factor law") not vague (e.g. "Quadratics").
- Do NOT invent textbook page numbers, chapter numbers, or section references. Refer to topics by name only.
- Keep it concise — this is a planning aid for the tutor, not a full lesson script. No worked examples, no homework instructions, no padding.
- Output ONLY the markdown plan. No preamble, no closing remarks, no commentary about your own process.`;

export async function POST(request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const limit = await checkRateLimit(user.id, "lesson-plan", {
    perMinute: 2,
    perHour: 20,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: limit.message },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "expected multipart form" }, { status: 400 });
  }

  const studentId = formData.get("student_id")?.toString();
  if (!studentId) {
    return NextResponse.json({ error: "student_id required" }, { status: 400 });
  }

  // Authorize: must be the tutor linked to this student.
  const { data: link } = await supabase
    .from("tutor_students")
    .select("student_id")
    .eq("tutor_id", user.id)
    .eq("student_id", studentId)
    .maybeSingle();
  if (!link) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const weeksRaw = parseInt(formData.get("weeks")?.toString() || "", 10);
  const weeks = Number.isFinite(weeksRaw)
    ? Math.min(MAX_WEEKS, Math.max(1, weeksRaw))
    : DEFAULT_WEEKS;
  const subject = (formData.get("subject")?.toString() || "maths") === "english"
    ? "english"
    : "maths";
  // `level` is an explicit override picked from CURRICULUM_LEVELS. When
  // empty/unset the curriculum lookup falls back to the student's
  // working_level (or year_level if working_level is unset).
  const levelOverride = formData.get("level")?.toString().trim() || null;
  const customTopics = formData.get("topics")?.toString().trim() || null;

  const { data: student } = await supabase
    .from("students")
    .select("first_name, last_name, year_level, working_level, school, subject, subjects, goals, concerns")
    .eq("id", studentId)
    .single();
  if (!student) {
    return NextResponse.json({ error: "student not found" }, { status: 404 });
  }

  // Optional term-planner PDF / text input — extract text if present.
  let plannerText = null;
  const plannerFile = formData.get("planner_file");
  if (
    plannerFile &&
    typeof plannerFile === "object" &&
    "arrayBuffer" in plannerFile &&
    plannerFile.size > 0
  ) {
    if (plannerFile.size > MAX_PLANNER_BYTES) {
      return NextResponse.json(
        { error: "Planner file too large (max 25MB)" },
        { status: 413 }
      );
    }
    try {
      const ab = await plannerFile.arrayBuffer();
      const isPdf =
        plannerFile.type === "application/pdf" ||
        /\.pdf$/i.test(plannerFile.name || "");
      if (isPdf) {
        plannerText = (await extractPdfText(ab)).trim();
      } else if (/^text\//.test(plannerFile.type) || /\.(txt|md|csv)$/i.test(plannerFile.name || "")) {
        plannerText = await plannerFile.text();
      }
    } catch (e) {
      console.warn("[lesson-plan] planner extraction failed:", e?.message || e);
    }
    if (plannerText && plannerText.length > 30000) {
      plannerText = plannerText.slice(0, 30000) + "\n\n[Planner truncated]";
    }
  }

  // Curriculum block: pulled from `level` (explicit override) or the
  // student's working_level / year_level. Pass `level` as both the year-level
  // arg AND as a single-element subjects[] so the lookup function picks up
  // VCE study designs (e.g. "VCE Maths Methods") via either branch.
  const curriculumLevel =
    levelOverride || student.working_level || student.year_level;
  const subjectsForLookup = levelOverride
    ? [levelOverride]
    : student.subjects;
  const curriculumLookup = getCurriculumForStudent(
    curriculumLevel,
    subjectsForLookup,
    subject
  );
  const curriculumBlock = curriculumLookup
    ? formatCurriculumForPrompt(curriculumLookup.curriculum, curriculumLookup.isVCE)
    : "(No curriculum data available for this level/subject — plan from general knowledge of the subject at the student's year level.)";

  const subjectLabel = levelOverride
    ? levelOverride
    : subject === "english"
      ? "English"
      : "Maths";

  const userMessage = [
    `Student: ${student.first_name} ${student.last_name}`,
    `Year level: ${student.year_level}${
      student.working_level && student.working_level !== student.year_level
        ? ` (working at ${student.working_level})`
        : ""
    }`,
    `School: ${student.school || "—"}`,
    `Subject for this plan: ${subjectLabel}`,
    student.goals ? `Tutoring goals: ${student.goals}` : null,
    student.concerns ? `Concerns: ${student.concerns}` : null,
    "",
    `Generate a ${weeks}-week lesson plan.`,
    "",
    plannerText
      ? `THE TUTOR SUPPLIED THE STUDENT'S SCHOOL TERM PLANNER. Mirror its progression — the school's sequence is the spine of the plan:\n\n${plannerText}`
      : customTopics
        ? `THE TUTOR WANTS TO COVER THESE TOPICS (in roughly this order):\n\n${customTopics}`
        : "NO SPECIFIC TOPICS OR PLANNER WERE SUPPLIED. Plan from the curriculum reference below, picking topics appropriate for the student's level.",
    "",
    "CURRICULUM REFERENCE:",
    curriculumBlock,
  ]
    .filter((s) => s !== null)
    .join("\n");

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 6000,
    system: [
      {
        type: "text",
        text: SYSTEM_INSTRUCTIONS,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: userMessage }],
  });

  const planMarkdown = message.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  if (!planMarkdown) {
    return NextResponse.json(
      { error: "Plan generation returned empty content. Try again." },
      { status: 502 }
    );
  }

  // Save as a resource. inline-text only (no file_url) — matches the existing
  // "paste contents" pattern and means it shows up in the resource panel
  // immediately and feeds into the report-generation prompt automatically.
  const dateLabel = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const resourceName = `Lesson plan — ${subjectLabel} — ${weeks} ${
    weeks === 1 ? "week" : "weeks"
  } (${dateLabel})`;

  const admin = createAdminClient();
  const { data: inserted, error: insertErr } = await admin
    .from("resources")
    .insert({
      student_id: studentId,
      uploaded_by: user.id,
      name: resourceName,
      category: "lesson_plan",
      content: planMarkdown,
      file_url: null,
      notes: plannerText
        ? "Generated from school term planner."
        : customTopics
          ? "Generated from tutor-specified topics."
          : "Generated from curriculum reference.",
    })
    .select("id")
    .single();
  if (insertErr) {
    console.error("[lesson-plan] insert failed:", insertErr);
    return NextResponse.json(
      { error: "Could not save the generated plan." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    resource_id: inserted.id,
    name: resourceName,
    weeks,
    usage: message.usage,
  });
}

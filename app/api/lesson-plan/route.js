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

Schools typically spend 3–4 weeks on a major topic before moving on. Match that pacing — give each main topic enough time for the student to actually internalise it, with each week of the topic going deeper or covering a different sub-skill.

Produce a markdown lesson plan with EXACTLY this structure:

# Lesson Plan — {Subject} — {N} weeks

## Topic 1: {Main topic name} (Weeks 1–4)

### Week 1: {What this week focuses on within the topic}
**Subtopics:**
- {Specific subtopic}
- {Specific subtopic}
- {Specific subtopic}
- {Specific subtopic}

### Week 2: {Different angle / next sub-skill on the same main topic}
**Subtopics:**
- ...

(continue for every week of this topic, then start the next topic)

## Topic 2: {Main topic name} (Weeks 5–8)

### Week 5: ...

PLANNING RULES:
- Each main topic spans 3–4 weeks. Don't power through a major topic in a single week.
- Each week within a topic must focus on a DIFFERENT angle or sub-skill of that topic — don't repeat. Examples for "Quadratic Functions": Week 1 expanding/factorising, Week 2 solving equations and the null factor law, Week 3 graphing parabolas and key features, Week 4 applications and word problems.
- 3–5 specific subtopics per week. Subtopics should be concrete (e.g. "Solving quadratic equations using the null factor law"), not vague (e.g. "Quadratics").
- Order topics so prior knowledge supports later topics. Foundations first, harder material later.
- If the tutor supplied a school term planner, mirror its sequence as closely as possible — the school's progression takes priority over the curriculum data. Match the school's pacing too.
- If the tutor supplied a list of topics, prioritise those in roughly that order, still allocating 3–4 weeks per main topic.
- Otherwise plan from the curriculum reference.
- For shorter total durations (e.g. a 1–3 week plan), it's fine for a topic to span fewer weeks — but never just label every week as a separate main topic.
- Use the exact "## Topic N: ... (Weeks A–B)" / "### Week N: ..." / "**Subtopics:**" / bulleted list structure. The PDF/email pipeline parses these markers.
- Do NOT invent textbook page numbers, chapter numbers, or section references. Refer to topics by name only.
- Keep it concise — this is a planning aid, not a full lesson script. No worked examples, no homework instructions, no padding.
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

  // Authorize: caller must be the tutor linked to this student, OR the
  // parent who owns the student record, OR the student themselves.
  // Lets parents/students generate plans from their own Resources tab
  // without needing a tutor relationship.
  const [{ data: link }, { data: studentRow }] = await Promise.all([
    supabase
      .from("tutor_students")
      .select("student_id")
      .eq("tutor_id", user.id)
      .eq("student_id", studentId)
      .maybeSingle(),
    supabase
      .from("students")
      .select("id, parent_id, student_user_id")
      .eq("id", studentId)
      .maybeSingle(),
  ]);
  const isTutor = !!link;
  const isParent = studentRow?.parent_id === user.id;
  const isStudent = studentRow?.student_user_id === user.id;
  if (!isTutor && !isParent && !isStudent) {
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
    resource: {
      id: inserted.id,
      name: resourceName,
      category: "lesson_plan",
      content: planMarkdown,
      file_url: null,
      notes: plannerText
        ? "Generated from school term planner."
        : customTopics
          ? "Generated from tutor-specified topics."
          : "Generated from curriculum reference.",
    },
    weeks,
    usage: message.usage,
  });
}

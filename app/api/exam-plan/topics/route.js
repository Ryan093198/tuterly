import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { LIMIT_MESSAGE, MAX_TOPIC_SECTIONS, PLAN_YEARS, appFunction, appSelect, appUser, bearer, customTest, examTopics, pickedSections, studyPlan, todaysRuns } from "@/lib/exam-plan";
import { mdToHtml } from "@/lib/md-html";
import { sendExamPlanEmail } from "@/lib/email";

// POST /api/exam-plan/topics   Authorization: Bearer <app access token>
//   { sections: ["3B", ...], exam_date?, exam_name? }
// No test to upload (Ryan, 18 Nov 2026): the student picks the topics on
// their exam instead. Same daily limit as an upload (one free plan a day).
// The exam is saved in the app; the plan and the customised test come from
// our bank, like the exam generator.
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const DATE = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(request) {
  const token = bearer(request);
  const user = await appUser(token);
  if (!user) return NextResponse.json({ error: "Sign in again to continue." }, { status: 401 });

  let body;
  try { body = await request.json(); } catch { body = null; }

  const [profile] = await appSelect(token, "profiles", `id=eq.${user.id}&select=role,year_level`);
  if (!profile || profile.role !== "student" || !PLAN_YEARS.includes(profile.year_level)) {
    return NextResponse.json({ error: "The free exam plan is for Years 7 to 10 students." }, { status: 403 });
  }
  const year = profile.year_level;

  const weak = pickedSections(year, Array.isArray(body?.sections) ? body.sections : []);
  if (!weak.length) return NextResponse.json({ error: "Pick at least one topic that's on your exam." }, { status: 400 });
  if (weak.length > MAX_TOPIC_SECTIONS) return NextResponse.json({ error: `Pick up to ${MAX_TOPIC_SECTIONS} subtopics. Start with the ones you find hardest.` }, { status: 400 });

  const admin = createAdminClient();
  if ((await todaysRuns(admin, token, user.id)).length) {
    return NextResponse.json({ error: LIMIT_MESSAGE, limit: true }, { status: 429 });
  }

  const examDate = typeof body?.exam_date === "string" && DATE.test(body.exam_date) ? body.exam_date : null;
  const examName = (typeof body?.exam_name === "string" ? body.exam_name : "").trim().slice(0, 60) || "Maths exam";

  try {
    await appFunction(token, "exam", { action: "save", name: examName, exam_date: examDate, topics: examTopics(weak), size: 20 });
  } catch (e) {
    console.warn("[exam-plan/topics] exam save", e?.status, e?.message);
  }

  const plan = studyPlan(weak, examDate);
  const test = customTest(weak).map((q) => ({
    ...q,
    question_html: mdToHtml(q.question),
    solution_html: q.solution ? mdToHtml(q.solution) : null,
    answer_html: mdToHtml(String(q.answer ?? "")),
  }));
  const weakOut = weak.map((w) => ({ code: w.code, name: w.name, chapter: w.chapter, wrong: 0, path: w.path }));

  const { data: run, error } = await admin
    .from("exam_plan_runs")
    .insert({ app_user_id: user.id, email: user.email, year_level: year, paper_id: null, status: "built", exam_name: examName, exam_date: plan.exam_date, weak: weakOut, plan, test, added: 0, built_at: new Date().toISOString() })
    .select("id")
    .single();
  if (error) {
    console.error("[exam-plan/topics] save", error.message);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }

  if (user.email) {
    try {
      await sendExamPlanEmail({ to: user.email, examName, plan, weak: weakOut, year, fromTopics: true });
    } catch (e) {
      console.warn("[exam-plan/topics] email", e?.message || e);
    }
  }
  return NextResponse.json({ ok: true, run_id: run.id, exam_name: examName, weak: weakOut, plan, test, added: 0, year, from_topics: true });
}

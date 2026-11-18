import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { MAX_CONFIRM, appFunction, appSelect, appUser, bearer, customTest, examTopics, studyPlan, weakSections } from "@/lib/exam-plan";
import { mdToHtml } from "@/lib/md-html";
import { sendExamPlanEmail } from "@/lib/email";

// POST /api/exam-plan/build   Authorization: Bearer <app access token>
//   { run_id, selected: [item index], exam_date?, exam_name? }
// After the student checks what was found on their test: the ticked
// questions go into their app bank (confirm-paper), the exam and its date
// are saved in the app (exam save), and the website makes the study plan
// and the custom test (from our question bank), then emails the plan.
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const UUID = /^[0-9a-f-]{36}$/i;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(request) {
  const token = bearer(request);
  const user = await appUser(token);
  if (!user) return NextResponse.json({ error: "Sign in again to continue." }, { status: 401 });

  let body;
  try { body = await request.json(); } catch { body = null; }
  const runId = typeof body?.run_id === "string" && UUID.test(body.run_id) ? body.run_id : null;
  if (!runId) return NextResponse.json({ error: "Start again." }, { status: 400 });

  const admin = createAdminClient();
  const { data: run } = await admin.from("exam_plan_runs").select("*").eq("id", runId).eq("app_user_id", user.id).maybeSingle();
  if (!run) return NextResponse.json({ error: "Start again." }, { status: 404 });
  if (run.status === "built") return NextResponse.json({ ok: true, ...resultOf(run) });

  const [paper] = await appSelect(token, "papers", `id=eq.${run.paper_id}&select=status,items,title`);
  if (!paper || paper.status !== "review") return NextResponse.json({ error: "Your test is still being read. Give it a moment." }, { status: 409 });
  const items = Array.isArray(paper.items) ? paper.items : [];
  const wanted = new Set((Array.isArray(body?.selected) ? body.selected : []).filter((n) => Number.isInteger(n)));
  const chosen = items.filter((it) => wanted.has(it.index));
  if (!chosen.length) return NextResponse.json({ error: "Tick at least one question you got wrong." }, { status: 400 });

  const year = run.year_level;
  const weak = weakSections(year, chosen);
  if (!weak.length) return NextResponse.json({ error: "We couldn't match those questions to Year " + year + " topics. Check your year level, or tick different questions." }, { status: 400 });

  const examDate = typeof body?.exam_date === "string" && DATE.test(body.exam_date) ? body.exam_date : null;
  const examName = (typeof body?.exam_name === "string" ? body.exam_name : "").trim().slice(0, 60) || "Maths exam";

  // Into the app: the mistakes (at most 10) and the exam. Best effort: the
  // student still gets their plan and test if either fails.
  let added = 0;
  try {
    const r = await appFunction(token, "confirm-paper", { paper_id: run.paper_id, selected: chosen.slice(0, MAX_CONFIRM).map((it) => it.index) });
    added = Number(r?.added) || 0;
  } catch (e) {
    console.warn("[exam-plan/build] confirm-paper", e?.status, e?.message);
  }
  try {
    await appFunction(token, "exam", { action: "save", name: examName, exam_date: examDate, topics: examTopics(weak), size: 20 });
  } catch (e) {
    console.warn("[exam-plan/build] exam save", e?.status, e?.message);
  }

  const plan = studyPlan(weak, examDate);
  const test = customTest(weak).map((q) => ({
    ...q,
    question_html: mdToHtml(q.question),
    solution_html: q.solution ? mdToHtml(q.solution) : null,
    answer_html: mdToHtml(String(q.answer ?? "")),
  }));
  const weakOut = weak.map((w) => ({ code: w.code, name: w.name, chapter: w.chapter, wrong: w.wrong, path: w.path }));

  const { data: saved, error } = await admin
    .from("exam_plan_runs")
    .update({ status: "built", exam_name: examName, exam_date: plan.exam_date, weak: weakOut, plan, test, added, built_at: new Date().toISOString() })
    .eq("id", run.id)
    .select("*")
    .single();
  if (error) console.error("[exam-plan/build] save", error.message);

  if (user.email) {
    try {
      await sendExamPlanEmail({ to: user.email, examName, plan, weak: weakOut, year });
    } catch (e) {
      console.warn("[exam-plan/build] email", e?.message || e);
    }
  }
  return NextResponse.json({ ok: true, ...resultOf(saved || { ...run, exam_name: examName, weak: weakOut, plan, test, added }) });
}

function resultOf(run) {
  return { run_id: run.id, exam_name: run.exam_name, weak: run.weak, plan: run.plan, test: run.test, added: run.added, year: run.year_level };
}

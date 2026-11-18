import { NextResponse } from "next/server";
import { PLAN_YEARS, exampleQuestion } from "@/lib/exam-plan";

// POST /api/exam-plan/example   { year, code, not: [question start] }
// One worked example from our bank for a topic in the student's plan
// (Ryan, 18 Nov 2026): tap a day in the plan to see one. Never one of the
// questions in their customised test (`not` holds the start of each) or one
// they've already been shown. Public: it's the same bank as the topic pages.
export const dynamic = "force-dynamic";

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { body = null; }
  const year = Number(body?.year);
  const code = typeof body?.code === "string" ? body.code : "";
  if (!PLAN_YEARS.includes(year) || !/^\d+[A-Z]+$/.test(code)) return NextResponse.json({ error: "Pick a topic." }, { status: 400 });
  const not = (Array.isArray(body?.not) ? body.not : []).filter((s) => typeof s === "string").slice(0, 40).map((s) => s.slice(0, 400));
  const q = exampleQuestion(year, code, not);
  if (!q) return NextResponse.json({ error: "No example for this topic yet." }, { status: 404 });
  return NextResponse.json({ ok: true, ...q });
}

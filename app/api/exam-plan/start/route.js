import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { PLAN_YEARS, appFunction, appSelect, appUser, bearer } from "@/lib/exam-plan";

// POST /api/exam-plan/start   Authorization: Bearer <app access token>
//   { paper_id, page_paths }
// The free exam plan's upload (Ryan, 18 Nov 2026): one a day per account
// (Melbourne day). The pages are already in the app's storage under the
// student's folder; this checks the limit, then asks the app to read them
// (process-paper) as the student.
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f-]{36}$/i;
const melbDay = (d) => new Date(d).toLocaleDateString("en-CA", { timeZone: "Australia/Melbourne" });

export async function POST(request) {
  const token = bearer(request);
  const user = await appUser(token);
  if (!user) return NextResponse.json({ error: "Sign in again to continue." }, { status: 401 });

  let body;
  try { body = await request.json(); } catch { body = null; }
  const paperId = typeof body?.paper_id === "string" && UUID.test(body.paper_id) ? body.paper_id : null;
  const paths = Array.isArray(body?.page_paths) ? body.page_paths.filter((p) => typeof p === "string").slice(0, 10) : [];
  if (!paperId || !paths.length) return NextResponse.json({ error: "Add your test first." }, { status: 400 });

  const [profile] = await appSelect(token, "profiles", `id=eq.${user.id}&select=role,year_level,first_name`);
  if (!profile || profile.role !== "student" || !PLAN_YEARS.includes(profile.year_level)) {
    return NextResponse.json({ error: "The free exam plan is for Years 7 to 10 students." }, { status: 403 });
  }

  const admin = createAdminClient();
  const since = new Date(Date.now() - 30 * 3600 * 1000).toISOString();
  const { data: recent } = await admin.from("exam_plan_runs").select("id, created_at").eq("app_user_id", user.id).gte("created_at", since);
  const today = melbDay(Date.now());
  if ((recent || []).some((r) => melbDay(r.created_at) === today)) {
    return NextResponse.json(
      { error: "That's your free upload for today. Come back tomorrow for another, or get Tuterly for unlimited uploads and practice.", limit: true },
      { status: 429 },
    );
  }

  const { data: run, error } = await admin
    .from("exam_plan_runs")
    .insert({ app_user_id: user.id, email: user.email, year_level: profile.year_level, paper_id: paperId, status: "uploaded" })
    .select("id")
    .single();
  if (error) {
    console.error("[exam-plan/start]", error.message);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }

  try {
    await appFunction(token, "process-paper", { paper_id: paperId, page_paths: paths });
  } catch (e) {
    // Don't use up their day on our failure.
    await admin.from("exam_plan_runs").delete().eq("id", run.id);
    console.error("[exam-plan/start] process-paper", e?.status, e?.message);
    const msg = e?.status === 402 ? "Uploading is paused on free accounts right now. Try again later." : e?.message || "We couldn't read that. Try again.";
    return NextResponse.json({ error: msg }, { status: e?.status && e.status < 500 ? e.status : 502 });
  }
  return NextResponse.json({ ok: true, run_id: run.id });
}

import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { appSelect, appUser, bearer } from "@/lib/exam-plan";

// GET /api/exam-plan/latest   Authorization: Bearer <app access token>
// The student's latest exam plan run (so a reload, or coming back later,
// shows their plan again) and whether today's free upload is used.
export const dynamic = "force-dynamic";

const melbDay = (d) => new Date(d).toLocaleDateString("en-CA", { timeZone: "Australia/Melbourne" });

export async function GET(request) {
  const token = bearer(request);
  const user = await appUser(token);
  if (!user) return NextResponse.json({ error: "Sign in again to continue." }, { status: 401 });
  const admin = createAdminClient();
  const { data } = await admin.from("exam_plan_runs").select("*").eq("app_user_id", user.id).order("created_at", { ascending: false }).limit(1);
  let run = data?.[0] || null;
  // A test the app couldn't read doesn't count as today's upload.
  if (run?.status === "uploaded" && run.paper_id) {
    try {
      const [p] = await appSelect(token, "papers", `id=eq.${run.paper_id}&select=status`);
      if (!p || p.status === "failed") {
        await admin.from("exam_plan_runs").delete().eq("id", run.id);
        run = null;
      }
    } catch {}
  }
  const usedToday = !!run && melbDay(run.created_at) === melbDay(Date.now());
  return NextResponse.json({
    ok: true,
    used_today: usedToday,
    run: run
      ? { run_id: run.id, status: run.status, paper_id: run.paper_id, exam_name: run.exam_name, weak: run.weak, plan: run.plan, test: run.test, added: run.added, year: run.year_level }
      : null,
  });
}

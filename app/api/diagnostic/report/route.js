import { NextResponse } from "next/server";
import { buildDiagnostic, markDiagnostic } from "@/lib/diagnostic";
import { guardPublicForm } from "@/lib/public-form-guard";
import { sendDiagnosticReportEmail } from "@/lib/email";
import { createAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

// POST /api/diagnostic/report
//   { year, answers, email, name?, notify?, company_website }
// Re-marks the test on the server and emails the parent report from
// learn@tuterly.com.au. That report is the only email sent. If the parent
// ticks "Email me when the app launches" (never pre-ticked), they go on the
// app waitlist, with the report counting as their one confirmation.
export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 400 }); }

  const guard = await guardPublicForm(request, body, "diagnostic-report", { perMinute: 2, perHour: 6, perDay: 15 });
  if (guard.blocked) {
    if (guard.silent) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: "Too many reports from here. Please try again later." }, { status: 429 });
  }

  const d = buildDiagnostic(String(body?.year || ""));
  if (!d) return NextResponse.json({ error: "We couldn't find that test." }, { status: 404 });
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  const name = typeof body?.name === "string" ? body.name.replace(/[<>]/g, "").trim().split(/\s+/)[0]?.slice(0, 40) || "" : "";
  const notify = body?.notify === true;

  const marked = markDiagnostic(d, body?.answers || {});
  try {
    await sendDiagnosticReportEmail({ to: email, name, diag: d, marked, notify });
  } catch (e) {
    console.error("[diagnostic/report] send failed", e?.message || e);
    return NextResponse.json({ error: "We couldn't send the report just now. Please try again in a minute." }, { status: 500 });
  }

  if (notify) {
    try {
      const { error } = await createAdminClient().from("study_waitlist").insert({
        email,
        role: "parent",
        year_level: Number(d.year.replace(/\D/g, "")),
        interest: "launch",
        source_page: "/maths-diagnostic-test",
        placement: "diagnostic_report",
        confirmation_sent_at: new Date().toISOString(),
      });
      if (error && error.code !== "23505") console.error("[diagnostic/report] waitlist insert failed", error.message);
    } catch (e) {
      console.error("[diagnostic/report] waitlist insert failed", e?.message || e);
    }
  }
  return NextResponse.json({ ok: true });
}

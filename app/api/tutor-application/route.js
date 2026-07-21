import { NextResponse } from "next/server";
import { sendTutorApplicationEmail } from "@/lib/email";
import { createAdminClient } from "@/lib/supabase-admin";
import { guardPublicForm } from "@/lib/public-form-guard";

export const runtime = "nodejs";

// POST /api/tutor-application
//   Body: { name, email, phone?, subjects, year_levels, experience }
//   Auth: none (public form on /tutors).
//
// Forwards the application to the recruiting inbox via Resend.
// TUTOR_APPLICATIONS_TO_EMAIL env var overrides the default
// admin@baysideacademics.com.au destination.

const DEFAULT_TO = "admin@baysideacademics.com.au";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }

  // Abuse protection (audit H2): honeypot + per-IP rate limit. Applications
  // are lower-frequency, so a tighter daily cap is fine.
  const guard = await guardPublicForm(request, body, "tutor-application", {
    perMinute: 2,
    perHour: 5,
    perDay: 10,
  });
  if (guard.blocked) {
    if (guard.silent) return NextResponse.json({ ok: true });
    return NextResponse.json(
      { error: "Too many submissions. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(guard.retryAfterSeconds) } }
    );
  }

  const name = trimStr(body?.name, 120);
  const email = sanitizeEmail(body?.email);
  const phone = trimStr(body?.phone, 40);
  const subjects = trimStr(body?.subjects, 500);
  const yearLevels = trimStr(body?.year_levels, 200);
  const experience = trimStr(body?.experience, 4000);

  if (!name) return NextResponse.json({ error: "name required" }, { status: 400 });
  if (!email)
    return NextResponse.json(
      { error: "valid email required" },
      { status: 400 }
    );
  if (!phone)
    return NextResponse.json({ error: "phone required" }, { status: 400 });
  if (!subjects)
    return NextResponse.json({ error: "subjects required" }, { status: 400 });
  if (!yearLevels)
    return NextResponse.json({ error: "year_levels required" }, { status: 400 });
  if (!experience)
    return NextResponse.json(
      { error: "tell us a bit about your tutoring experience" },
      { status: 400 }
    );

  // Persist the application so the team can vet it in the admin dashboard,
  // not just receive an email (audit C5). Service-role write; the table is
  // default-deny RLS. Best-effort: if the DB write fails we still email.
  try {
    const admin = createAdminClient();
    await admin.from("tutor_applications").insert({
      name,
      email,
      phone,
      subjects,
      year_levels: yearLevels,
      experience,
    });
  } catch (e) {
    console.error("[tutor-application] persist failed:", e);
  }

  try {
    await sendTutorApplicationEmail({
      to: process.env.TUTOR_APPLICATIONS_TO_EMAIL || DEFAULT_TO,
      replyTo: email,
      applicantName: name,
      applicantEmail: email,
      applicantPhone: phone,
      subjects,
      yearLevels,
      experience,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[tutor-application] send failed:", e);
    // The application is already saved, so acknowledge success — the team
    // will see it in the admin dashboard even if the notification email
    // didn't go out.
    return NextResponse.json({ ok: true, emailed: false });
  }
}

function trimStr(raw, max) {
  if (typeof raw !== "string") return "";
  return raw.trim().slice(0, max);
}
function sanitizeEmail(raw) {
  if (typeof raw !== "string") return null;
  const t = raw.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return null;
  if (t.length > 254) return null;
  return t;
}

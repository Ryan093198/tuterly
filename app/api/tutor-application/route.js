import { NextResponse } from "next/server";
import { sendTutorApplicationEmail } from "@/lib/email";

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
  if (!subjects)
    return NextResponse.json({ error: "subjects required" }, { status: 400 });
  if (!experience)
    return NextResponse.json(
      { error: "tell us a bit about your tutoring experience" },
      { status: 400 }
    );

  try {
    await sendTutorApplicationEmail({
      to: process.env.TUTOR_APPLICATIONS_TO_EMAIL || DEFAULT_TO,
      replyTo: email,
      applicantName: name,
      applicantEmail: email,
      applicantPhone: phone,
      subjects,
      yearLevels: yearLevels || "Not specified",
      experience,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[tutor-application] send failed:", e);
    return NextResponse.json(
      { error: "Could not send your application. Please try again or give us a call." },
      { status: 500 }
    );
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

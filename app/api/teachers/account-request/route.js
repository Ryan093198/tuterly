import { NextResponse } from "next/server";
import { sendTeacherSignupEmail } from "@/lib/email";
import { guardPublicForm } from "@/lib/public-form-guard";
import { CONTACT_EMAIL } from "@/lib/site";

export const runtime = "nodejs";

// POST /api/teachers/account-request
//   Body: { want, name, email, school, role?, years?, phone?, message? }
//   Auth: none (public form on /teachers and /teachers/how-it-works).
//
// Tuterly for Teachers sign-up or demo request. Accounts are set up by the
// team, so this emails learn@tuterly.com.au (TEACHER_SIGNUP_TO_EMAIL
// overrides) with the teacher as reply-to. No email goes to the teacher.

const WANTS = { account: "A teacher account", demo: "A demo first", school: "Set up our school or department" };

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 400 });
  }

  const guard = await guardPublicForm(request, body, "teacher-signup");
  if (guard.blocked) {
    if (guard.silent) return NextResponse.json({ ok: true });
    return NextResponse.json(
      { error: "Too many sign-ups from here. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(guard.retryAfterSeconds) } }
    );
  }

  const want = WANTS[body?.want] || WANTS.account;
  const name = trimStr(body?.name, 120);
  const email = sanitizeEmail(body?.email);
  const school = trimStr(body?.school, 160);
  const role = trimStr(body?.role, 80);
  const years = trimStr(body?.years, 80);
  const phone = trimStr(body?.phone, 40);
  const message = trimStr(body?.message, 3000);

  if (!name) return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  if (!email) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (school.length < 2) return NextResponse.json({ error: "Please add your school." }, { status: 400 });

  try {
    await sendTeacherSignupEmail({
      to: process.env.TEACHER_SIGNUP_TO_EMAIL || CONTACT_EMAIL,
      replyTo: email,
      want, name, email, school, role, years, phone, message,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[teachers/account-request] send failed", err);
    return NextResponse.json(
      { error: `Could not send right now. Please try again, or email ${CONTACT_EMAIL}.` },
      { status: 500 }
    );
  }
}

function trimStr(value, max) {
  if (typeof value !== "string") return "";
  return value.replace(/[<>]/g, "").trim().slice(0, max);
}

function sanitizeEmail(value) {
  const s = trimStr(value, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return "";
  return s;
}

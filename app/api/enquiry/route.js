import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { sendEnquiryEmail } from "@/lib/email";

export const runtime = "nodejs";

// POST /api/enquiry
//   Body: { tutor_name, parent_name, parent_email, child_name,
//           child_year_level, message }
//   Auth: signed-in parent (no role check for now — anyone signed in
//         can submit, since the directory's enquiry CTA is gated to
//         signed-in viewers).
//
// Forwards the enquiry to the team inbox via Resend
// (ENQUIRY_TO_EMAIL env var, default admin@baysideacademics.com.au).
// We deliberately don't store the enquiry in the database for v1 —
// the email is the system of record. A `enquiries` table can come
// later if we want a CRM-style view.

const DEFAULT_TO = "admin@baysideacademics.com.au";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }

  const tutorName = trimStr(body?.tutor_name, 120);
  const parentName = trimStr(body?.parent_name, 120);
  const parentEmail = sanitizeEmail(body?.parent_email);
  const childName = trimStr(body?.child_name, 120);
  const childYearLevel = trimStr(body?.child_year_level, 40);
  const message = trimStr(body?.message, 4000);

  if (!tutorName) {
    return NextResponse.json({ error: "tutor_name required" }, { status: 400 });
  }
  if (!parentName) {
    return NextResponse.json({ error: "parent_name required" }, { status: 400 });
  }
  if (!parentEmail) {
    return NextResponse.json(
      { error: "valid parent_email required" },
      { status: 400 }
    );
  }
  if (!message) {
    return NextResponse.json({ error: "message required" }, { status: 400 });
  }

  // Soft auth check — we expect a signed-in viewer (the enquire button
  // is gated behind it), but we don't hard-block. Anonymous submissions
  // are still useful to the team if something slips through; we just
  // log it.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const submittedByUserId = user?.id ?? null;

  try {
    await sendEnquiryEmail({
      to: process.env.ENQUIRY_TO_EMAIL || DEFAULT_TO,
      replyTo: parentEmail,
      tutorName,
      parentName,
      parentEmail,
      childName,
      childYearLevel,
      message,
      submittedByUserId,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[enquiry] send failed:", e);
    return NextResponse.json(
      { error: "Could not send enquiry. Please try again or call us." },
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

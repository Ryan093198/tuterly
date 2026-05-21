import { NextResponse } from "next/server";
import { sendContactEnquiryEmail } from "@/lib/email";

export const runtime = "nodejs";

// POST /api/contact
//   Body: { name, email, phone?, year_level?, message?, page_context? }
//   Auth: none (public form on the marketing site).
//
// Forwards a contact form submission to admin@baysideacademics.com.au
// via Resend. CONTACT_TO_EMAIL env var overrides the destination.

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
  const yearLevel = trimStr(body?.year_level, 80);
  const message = trimStr(body?.message, 4000);
  const pageContext = trimStr(body?.page_context, 200);

  if (!name) return NextResponse.json({ error: "name required" }, { status: 400 });
  if (!email)
    return NextResponse.json(
      { error: "valid email required" },
      { status: 400 }
    );

  try {
    await sendContactEnquiryEmail({
      to: process.env.CONTACT_TO_EMAIL || DEFAULT_TO,
      replyTo: email,
      name,
      email,
      phone,
      yearLevel,
      message,
      pageContext,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json(
      { error: "Could not send right now - please try again or call us." },
      { status: 500 }
    );
  }
}

function trimStr(value, max) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim().slice(0, max);
  return trimmed.length > 0 ? trimmed : "";
}

function sanitizeEmail(value) {
  const s = trimStr(value, 240).toLowerCase();
  if (!s) return "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return "";
  return s;
}

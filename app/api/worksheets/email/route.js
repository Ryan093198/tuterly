import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

// Marketing email capture for the public /worksheets gate. Idempotent —
// resubmitting the same address bumps last_seen_at instead of inserting
// a duplicate row.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }

  const email = sanitizeEmail(body?.email);
  if (!email) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const ip = clientIp(request);
  const admin = createAdminClient();

  const { error } = await admin
    .from("worksheet_email_signups")
    .upsert(
      { email, ip, last_seen_at: new Date().toISOString() },
      { onConflict: "email" }
    );
  if (error) {
    console.error("[worksheets/email] upsert failed:", error);
    return NextResponse.json(
      { error: "Could not save your email. Try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

function sanitizeEmail(raw) {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim().toLowerCase();
  // Intentionally lenient — we mostly want to deduplicate the marketing list,
  // not block typos. Resend / similar handles deliverability at send time.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return null;
  if (trimmed.length > 254) return null;
  return trimmed;
}

function clientIp(request) {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") || null;
}

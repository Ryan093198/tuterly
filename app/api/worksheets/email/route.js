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
  const yearLevel = sanitizeYearLevel(body?.year_level);

  const ip = clientIp(request);
  const admin = createAdminClient();

  // year_level is only written when present so re-submissions without
  // a year (eg. older clients) don't blank out a previously-captured
  // value.
  const upsertRow = {
    email,
    ip,
    last_seen_at: new Date().toISOString(),
  };
  if (yearLevel) upsertRow.year_level = yearLevel;

  const { error } = await admin
    .from("worksheet_email_signups")
    .upsert(upsertRow, { onConflict: "email" });
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

function sanitizeYearLevel(raw) {
  if (typeof raw !== "string") return null;
  const t = raw.trim();
  // Accept "Year 3" through "Year 10"; reject anything else so we don't
  // pollute the list with freeform input.
  if (!/^Year (3|4|5|6|7|8|9|10)$/.test(t)) return null;
  return t;
}

function clientIp(request) {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") || null;
}

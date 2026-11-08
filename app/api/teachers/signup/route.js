import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { trustedClientIp } from "@/lib/client-ip";

export const runtime = "nodejs";

// Teacher Zone sign-up: email and school. Idempotent, so signing up again
// on another device just updates the row.
export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 400 }); }
  const email = sanitizeEmail(body?.email);
  if (!email) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  const school = String(body?.school || "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 120);
  if (school.length < 2) return NextResponse.json({ error: "Enter your school's name." }, { status: 400 });

  const row = { email, school, ip: trustedClientIp(request), last_seen_at: new Date().toISOString() };
  if (body?.marketing_opt_in === true) {
    row.marketing_opt_in = true;
    row.marketing_opt_in_at = new Date().toISOString();
  }
  const { error } = await createAdminClient().from("teacher_signups").upsert(row, { onConflict: "email" });
  if (error) {
    console.error("[teachers/signup]", error.message);
    return NextResponse.json({ error: "Could not save your details. Try again in a moment." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

function sanitizeEmail(raw) {
  if (typeof raw !== "string") return null;
  const t = raw.trim().toLowerCase();
  if (t.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return null;
  return t;
}

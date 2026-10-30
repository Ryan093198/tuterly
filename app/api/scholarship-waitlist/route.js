import { NextResponse } from "next/server";
import { guardPublicForm } from "@/lib/public-form-guard";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendScholarshipWaitlistEmail } from "@/lib/email";

export const runtime = "nodejs";

// POST /api/scholarship-waitlist: "Tell me when Tuterly Scholarship is
// ready" from the numerical reasoning practice pages. Honeypot + per-IP
// rate limit, one row per email, one confirmation email per address.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PROVIDERS = ["acer", "edutest", "aas", "selective", "not_sure"];

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }
  const guard = await guardPublicForm(request, body, "scholarship-waitlist", { perMinute: 3, perHour: 10, perDay: 20 });
  if (guard.blocked) {
    if (guard.silent) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  const int = (v, lo, hi) => (v === null || v === undefined || v === "" ? null : Number.isInteger(Number(v)) && Number(v) >= lo && Number(v) <= hi ? Number(v) : null);
  const src = typeof body.source_page === "string" ? body.source_page.trim() : "";
  const row = {
    email,
    role: ["parent", "student", "tutor"].includes(body.role) ? body.role : "parent",
    child_year: int(body.child_year, 3, 8),
    test_provider: PROVIDERS.includes(body.test_provider) ? body.test_provider : null,
    practice_score: int(body.practice_score, 0, 10),
    practice_level: int(body.practice_level, 5, 7),
    source_page: src.startsWith("/") ? src.slice(0, 200) : null,
  };

  const admin = createAdminClient();
  const { data: inserted, error } = await admin.from("scholarship_waitlist").insert(row).select("id").single();
  if (error) {
    if (error.code === "23505") return NextResponse.json({ ok: true, already: true });
    console.error("[scholarship-waitlist] insert failed", error.message);
    return NextResponse.json({ error: "Sorry, something went wrong. Please try again later." }, { status: 500 });
  }

  try {
    const sent = await sendScholarshipWaitlistEmail({ to: email, provider: row.test_provider });
    if (sent && !sent.skipped) {
      await admin.from("scholarship_waitlist").update({ confirmation_sent_at: new Date().toISOString() }).eq("id", inserted.id).is("confirmation_sent_at", null);
    }
  } catch (e) {
    console.warn("[scholarship-waitlist] confirmation email failed", e?.message || e);
  }
  return NextResponse.json({ ok: true });
}

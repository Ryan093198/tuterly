import { NextResponse } from "next/server";
import { guardPublicForm } from "@/lib/public-form-guard";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendStudyWaitlistEmail } from "@/lib/email";
import { STUDY_APP } from "@/lib/study-app";
import { normaliseWaitlistSignup as normalise } from "@/lib/study-waitlist";

export const runtime = "nodejs";

// POST /api/study-waitlist
//   "Get notified when it launches" / "Join the free pilot" form from
//   components/StudyAppCTA.jsx. Honeypot + per-IP rate limit, one row per
//   email, and exactly one confirmation email per address. A repeat signup
//   returns { ok: true, already: true } and sends nothing.

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

  const guard = await guardPublicForm(request, body, "study-waitlist", {
    perMinute: 3,
    perHour: 10,
    perDay: 20,
  });
  if (guard.blocked) {
    if (guard.silent) return NextResponse.json({ ok: true });
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(guard.retryAfterSeconds) } }
    );
  }

  const row = normalise(body);
  if (!row) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: inserted, error } = await admin
    .from("study_waitlist")
    .insert(row)
    .select("id")
    .single();

  if (error) {
    // 23505 = unique violation on lower(email): already on the list.
    if (error.code === "23505") return NextResponse.json({ ok: true, already: true });
    console.error("[study-waitlist] insert failed", error.message);
    return NextResponse.json(
      { error: "Sorry, something went wrong. Please try again later." },
      { status: 500 }
    );
  }

  // One confirmation, best effort. The row is the source of truth; a failed
  // send leaves confirmation_sent_at null so it can be retried by hand.
  try {
    const sent = await sendStudyWaitlistEmail({
      to: row.email,
      appName: STUDY_APP.name,
      interest: row.interest,
    });
    if (sent && !sent.skipped) {
      await admin
        .from("study_waitlist")
        .update({ confirmation_sent_at: new Date().toISOString() })
        .eq("id", inserted.id)
        .is("confirmation_sent_at", null);
    }
  } catch (e) {
    console.warn("[study-waitlist] confirmation email failed", e?.message || e);
  }

  return NextResponse.json({ ok: true });
}

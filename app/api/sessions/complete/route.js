import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendReportEmail } from "@/lib/email";

export const runtime = "nodejs";
export const maxDuration = 30;

// Tuterly Payment System — Phase 3, item 4.
//
// POST /api/sessions/complete
//   Body: { session_id: uuid }
//   Auth: must be the tutor who owns the session.
//
// This is the trigger chain that fires once per session AFTER the
// session report has been generated and saved. Each step is idempotent
// so duplicate calls (retries, double-clicks, webhook redeliveries)
// don't double-deduct or double-pay.
//
// Steps:
//   1. Authorise the caller and load session + student + tutor + report.
//   2. Hard-block if no report exists for the session yet — the caller
//      must generate the report first (POST /api/generate). The chain
//      does NOT generate reports itself.
//   3. Idempotency: if session.parent_credit_deducted is already true,
//      return the existing payout/credits state without touching the
//      ledger again.
//   4. Deduct one credit from the parent's balance. Insert a row in
//      credit_transactions for the ledger. If the balance hits 1 or 0,
//      flag for the low-credit / auto-topup paths (those run in cron
//      jobs not built yet — for now we just log).
//   5. Queue a tutor_payouts row computed from the tutor's hourly_rate
//      and the session's duration_minutes. 15% Tuterly commission. The
//      actual Stripe Connect transfer happens in a weekly cron later.
//   6. Mark the session parent_credit_deducted = true + link the new
//      payout id + set status = 'sent_to_parent'.
//   7. Email the parent a "report ready" notification with a link.
//
// Best-effort: the credit deduction and payout queue rows are critical
// (we throw on failure); the email send is best-effort (we log and move
// on). The session row is the source of truth — if parent_credit_deducted
// is set, the chain ran.

const TUTERLY_COMMISSION_RATE = 0.15;
const DEFAULT_HOURLY_RATE = 60; // matches the directory-average promise

export async function POST(request) {
  try {
    return await handle(request);
  } catch (err) {
    console.error("[sessions/complete] unhandled error:", err);
    return NextResponse.json(
      { error: err?.message || "Could not complete session." },
      { status: 500 }
    );
  }
}

async function handle(request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }
  const sessionId = body?.session_id?.toString();
  if (!sessionId) {
    return NextResponse.json(
      { error: "session_id required" },
      { status: 400 }
    );
  }

  const admin = createAdminClient();

  // Authorise + load session in one query. Has to belong to the caller.
  const { data: session, error: sessionErr } = await admin
    .from("sessions")
    .select(
      "id, student_id, tutor_id, duration_minutes, parent_credit_deducted, tutor_payout_id, status"
    )
    .eq("id", sessionId)
    .eq("tutor_id", user.id)
    .maybeSingle();
  if (sessionErr) throw sessionErr;
  if (!session) {
    return NextResponse.json(
      { error: "session not found" },
      { status: 404 }
    );
  }

  // Verify report exists. We refuse to run the chain without one.
  const { data: report } = await admin
    .from("reports")
    .select("id")
    .eq("session_id", sessionId)
    .maybeSingle();
  if (!report) {
    return NextResponse.json(
      {
        error:
          "Generate the session report before completing — no report on file for this session.",
      },
      { status: 400 }
    );
  }

  // Idempotency: if we've already run the chain for this session, return
  // the current state without re-deducting / re-queuing.
  if (session.parent_credit_deducted) {
    return NextResponse.json({
      already_completed: true,
      session_id: session.id,
      tutor_payout_id: session.tutor_payout_id,
    });
  }

  // Load the related rows we need for the chain.
  const [studentRes, tutorRes] = await Promise.all([
    admin
      .from("students")
      .select("id, first_name, last_name, parent_id")
      .eq("id", session.student_id)
      .maybeSingle(),
    admin
      .from("profiles")
      .select("id, full_name, hourly_rate")
      .eq("id", session.tutor_id)
      .maybeSingle(),
  ]);
  const student = studentRes.data;
  const tutor = tutorRes.data;
  if (!student) {
    return NextResponse.json(
      { error: "student linked to session not found" },
      { status: 404 }
    );
  }
  const parentId = student.parent_id;

  // ─── STEP: DEDUCT CREDIT ────────────────────────────────────────────
  let creditsAfter = null;
  let creditWarning = null;
  if (parentId) {
    // Get or create the parent's credits row. New parents start at zero.
    const { data: creditsRow, error: creditsErr } = await admin
      .from("credits")
      .upsert(
        { parent_id: parentId },
        { onConflict: "parent_id", ignoreDuplicates: true }
      )
      .select("id, credits_remaining, pack_size, auto_topup, stripe_payment_method_id")
      .maybeSingle();
    if (creditsErr) throw creditsErr;

    // upsert with ignoreDuplicates returns null on the conflict path, so
    // fall back to a select if the upsert was a no-op.
    let credits = creditsRow;
    if (!credits) {
      const { data: existing } = await admin
        .from("credits")
        .select(
          "id, credits_remaining, pack_size, auto_topup, stripe_payment_method_id"
        )
        .eq("parent_id", parentId)
        .single();
      credits = existing;
    }

    // Append the ledger row first. Doing it before the balance update
    // means a failure here aborts the chain BEFORE we've touched the
    // balance — the txn log stays the source of truth.
    const { error: txErr } = await admin.from("credit_transactions").insert({
      parent_id: parentId,
      type: "deduction",
      credits: -1,
      session_id: sessionId,
      notes: `Session report ${report.id}`,
    });
    if (txErr) throw txErr;

    const newRemaining = Math.max(0, (credits?.credits_remaining ?? 0) - 1);
    const { error: balanceErr } = await admin
      .from("credits")
      .update({
        credits_remaining: newRemaining,
        updated_at: new Date().toISOString(),
      })
      .eq("parent_id", parentId);
    if (balanceErr) throw balanceErr;
    creditsAfter = newRemaining;

    // Flag low-balance / out-of-credits states for the (not-yet-built)
    // cron jobs to pick up. The actual emails and auto-topup charges
    // ship in a later phase.
    if (newRemaining === 1) {
      creditWarning = "low_balance";
      console.log(
        "[sessions/complete] parent",
        parentId,
        "is down to 1 credit"
      );
    } else if (newRemaining === 0) {
      creditWarning = "out_of_credits";
      console.log(
        "[sessions/complete] parent",
        parentId,
        "is out of credits — auto-topup hook will fire when wired"
      );
    }
  }

  // ─── STEP: QUEUE TUTOR PAYOUT ───────────────────────────────────────
  // Default rate to $60/hr if the tutor hasn't set their own yet. This
  // matches the headline rate quoted in the parent-facing comparison;
  // tutors who set a custom rate via their profile override it.
  const hourlyRate = Number(tutor?.hourly_rate ?? DEFAULT_HOURLY_RATE);
  const hours = (session.duration_minutes || 60) / 60;
  const gross = round2(hourlyRate * hours);
  const commission = round2(gross * TUTERLY_COMMISSION_RATE);
  const amount = round2(gross - commission);

  const { data: payout, error: payoutErr } = await admin
    .from("tutor_payouts")
    .insert({
      tutor_id: session.tutor_id,
      session_id: sessionId,
      amount,
      commission,
      status: "pending",
    })
    .select("id, amount, commission, status")
    .single();
  if (payoutErr) throw payoutErr;

  // ─── STEP: UPDATE SESSION ───────────────────────────────────────────
  const { error: sessionUpdateErr } = await admin
    .from("sessions")
    .update({
      parent_credit_deducted: true,
      tutor_payout_id: payout.id,
      status: "sent_to_parent",
    })
    .eq("id", sessionId);
  if (sessionUpdateErr) throw sessionUpdateErr;

  // ─── STEP: NOTIFY PARENT ────────────────────────────────────────────
  // Best-effort. The session is already complete; if email delivery
  // fails the tutor can resend from the report page.
  let emailSent = false;
  if (parentId) {
    try {
      const { data: parentProfile } = await admin
        .from("profiles")
        .select("email, full_name")
        .eq("id", parentId)
        .maybeSingle();
      if (parentProfile?.email) {
        const origin =
          process.env.NEXT_PUBLIC_APP_URL ||
          "https://app.tuterly.com.au";
        await sendReportEmail({
          to: parentProfile.email,
          recipientName: parentProfile.full_name || null,
          recipientRole: "parent",
          studentName: `${student.first_name} ${student.last_name}`,
          reportUrl: `${origin}/dashboard/parent/reports/${report.id}`,
        });
        emailSent = true;
      }
    } catch (e) {
      console.warn("[sessions/complete] notify-parent email failed:", e?.message || e);
    }
  }

  return NextResponse.json({
    session_id: sessionId,
    report_id: report.id,
    credits_remaining: creditsAfter,
    credit_warning: creditWarning,
    tutor_payout: {
      id: payout.id,
      amount: payout.amount,
      commission: payout.commission,
      status: payout.status,
    },
    parent_notified: emailSent,
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

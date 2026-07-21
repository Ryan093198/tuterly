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

  // Idempotency fast-path: if we've already run the chain, return the
  // current state without re-deducting / re-queuing.
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

  // ─── GUARD: a session must have a billable parent (H4) ──────────────
  // Refuse to queue a tutor payout for a session nobody is paying for.
  if (!parentId) {
    return NextResponse.json(
      {
        error:
          "This student has no linked parent to bill. Link a parent before completing the session.",
        code: "no_parent",
      },
      { status: 409 }
    );
  }

  // ─── ATOMIC CLAIM (H4) ──────────────────────────────────────────────
  // Flip parent_credit_deducted false→true in a single conditional UPDATE.
  // Only one concurrent/retried request wins the claim; the rest get
  // rowcount 0 and return already_completed. Claiming BEFORE the side
  // effects means the worst-case failure is under-processing (recoverable)
  // rather than double-charging or double-paying.
  const { data: claimed, error: claimErr } = await admin
    .from("sessions")
    .update({ parent_credit_deducted: true })
    .eq("id", sessionId)
    .eq("parent_credit_deducted", false)
    .select("id")
    .maybeSingle();
  if (claimErr) throw claimErr;
  if (!claimed) {
    return NextResponse.json({
      already_completed: true,
      session_id: session.id,
      tutor_payout_id: session.tutor_payout_id,
    });
  }

  async function releaseClaim() {
    await admin
      .from("sessions")
      .update({ parent_credit_deducted: false })
      .eq("id", sessionId);
  }

  // ─── STEP: DEDUCT CREDIT (atomic, hard-stop at zero) ────────────────
  // deduct_one_credit decrements iff balance >= 1 and returns the new
  // balance, or null when there was nothing to deduct. On a hard stop we
  // release the claim so the session isn't left marked as processed.
  const { data: newRemaining, error: deductErr } = await admin.rpc(
    "deduct_one_credit",
    { p_parent_id: parentId }
  );
  if (deductErr) {
    await releaseClaim();
    throw deductErr;
  }
  if (newRemaining === null || newRemaining === undefined) {
    await releaseClaim();
    // This is the hook point for the (future) auto-topup: no credits, so
    // don't complete or pay out. Surface a clear, machine-readable status.
    return NextResponse.json(
      {
        error:
          "The parent has no session credits remaining. Ask them to top up before this session can be completed.",
        code: "no_credits",
      },
      { status: 402 }
    );
  }
  const creditsAfter = newRemaining;

  // Ledger row for the deduction. The unique index on (session_id) where
  // type='deduction' makes this idempotent; a duplicate is a no-op.
  const { error: txErr } = await admin.from("credit_transactions").insert({
    parent_id: parentId,
    type: "deduction",
    credits: -1,
    session_id: sessionId,
    notes: `Session report ${report.id}`,
  });
  if (txErr && !isUniqueViolation(txErr)) {
    // A real failure after the balance was decremented — roll the balance
    // back and release the claim so the session can be retried cleanly.
    await admin.rpc("add_credits", {
      p_parent_id: parentId,
      p_amount: 1,
      p_pack_size: null,
    });
    await releaseClaim();
    throw txErr;
  }

  let creditWarning = null;
  if (creditsAfter === 1) creditWarning = "low_balance";
  else if (creditsAfter === 0) creditWarning = "out_of_credits";

  // ─── STEP: QUEUE TUTOR PAYOUT ───────────────────────────────────────
  // Default rate to $60/hr if the tutor hasn't set their own yet. Rounding
  // is done so commission + amount always equals the rounded gross (L1).
  const hourlyRate = Number(tutor?.hourly_rate ?? DEFAULT_HOURLY_RATE);
  const hours = (session.duration_minutes || 60) / 60;
  const gross = round2(hourlyRate * hours);
  const commission = round2(gross * TUTERLY_COMMISSION_RATE);
  const amount = round2(gross) - commission;

  // Idempotent insert: the unique index on tutor_payouts(session_id) means a
  // retry collapses onto the existing row instead of queuing a second payout.
  let payout;
  const { data: insertedPayout, error: payoutErr } = await admin
    .from("tutor_payouts")
    .insert({
      tutor_id: session.tutor_id,
      session_id: sessionId,
      amount,
      commission,
      status: "pending",
    })
    .select("id, amount, commission, status")
    .maybeSingle();
  if (payoutErr && isUniqueViolation(payoutErr)) {
    const { data: existingPayout } = await admin
      .from("tutor_payouts")
      .select("id, amount, commission, status")
      .eq("session_id", sessionId)
      .maybeSingle();
    payout = existingPayout;
  } else if (payoutErr) {
    throw payoutErr;
  } else {
    payout = insertedPayout;
  }

  // ─── STEP: UPDATE SESSION ───────────────────────────────────────────
  const { error: sessionUpdateErr } = await admin
    .from("sessions")
    .update({
      tutor_payout_id: payout?.id ?? null,
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
      id: payout?.id ?? null,
      amount: payout?.amount ?? null,
      commission: payout?.commission ?? null,
      status: payout?.status ?? null,
    },
    parent_notified: emailSent,
  });
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

// Postgres unique-violation is SQLSTATE 23505; supabase-js surfaces it as
// error.code === "23505". Used to make insert-based idempotency safe.
function isUniqueViolation(err) {
  return err?.code === "23505" || /duplicate key/i.test(err?.message || "");
}

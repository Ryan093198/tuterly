import { tutorBaseRate, superRate } from "@/lib/billing-config";

// Shared settlement for the billable event: a session report delivered to the
// parent. Deducts one parent credit and queues the tutor payout, atomically and
// idempotently. Used by both the report-send flow (sendReport) and the
// standalone /api/sessions/complete endpoint so the money logic lives in one
// place.
//
// Idempotency + safety (audit H4, carried over from the P2 hardening):
//   - an atomic claim on sessions.parent_credit_deducted gates the whole thing,
//     so double-clicks / retries settle at most once;
//   - deduct_credits is an atomic proportional DB decrement (can't go negative);
//   - the tutor_payouts(session_id) unique index makes the payout insert
//     idempotent.
//
// Returns one of:
//   { ok: true, alreadyCompleted: true }                     nothing to do
//   { ok: true, creditsAfter, creditWarning, payout }        settled now
//   { ok: false, code: "no_parent" | "no_credits", ... }     blocked
//
// This function NEVER sends email — the caller owns delivery.
function round2(n) {
  return Math.round(n * 100) / 100;
}

function isUniqueViolation(err) {
  return err?.code === "23505" || /duplicate key/i.test(err?.message || "");
}

export async function settleSessionBilling(admin, { sessionId, reportId = null }) {
  const { data: session, error: sessionErr } = await admin
    .from("sessions")
    .select(
      "id, student_id, tutor_id, duration_minutes, parent_credit_deducted, tutor_payout_id"
    )
    .eq("id", sessionId)
    .maybeSingle();
  if (sessionErr) throw sessionErr;
  if (!session) return { ok: false, code: "session_not_found" };

  if (session.parent_credit_deducted) {
    return { ok: true, alreadyCompleted: true, payoutId: session.tutor_payout_id };
  }

  const [{ data: student }, { data: tutor }] = await Promise.all([
    admin
      .from("students")
      .select("id, parent_id")
      .eq("id", session.student_id)
      .maybeSingle(),
    admin
      .from("profiles")
      .select("id, hourly_rate")
      .eq("id", session.tutor_id)
      .maybeSingle(),
  ]);
  const parentId = student?.parent_id ?? null;
  if (!parentId) return { ok: false, code: "no_parent" };

  // Proportional billing: 1 credit = 1 hour, so a session costs credits in
  // proportion to its length (60m=1, 90m=1.5, 120m=2, 30m=0.5, 45m=0.75).
  const requiredCredits = round2((session.duration_minutes || 60) / 60);

  // Atomic claim: only one caller flips false→true and proceeds.
  const { data: claimed, error: claimErr } = await admin
    .from("sessions")
    .update({ parent_credit_deducted: true })
    .eq("id", sessionId)
    .eq("parent_credit_deducted", false)
    .select("id")
    .maybeSingle();
  if (claimErr) throw claimErr;
  if (!claimed) {
    return { ok: true, alreadyCompleted: true };
  }

  const releaseClaim = async () => {
    await admin
      .from("sessions")
      .update({ parent_credit_deducted: false })
      .eq("id", sessionId);
  };

  // Atomic proportional decrement (1 credit = 1 hour), hard-stop at zero.
  const { data: newRemaining, error: deductErr } = await admin.rpc(
    "deduct_credits",
    { p_parent_id: parentId, p_amount: requiredCredits }
  );
  if (deductErr) {
    await releaseClaim();
    throw deductErr;
  }
  if (newRemaining === null || newRemaining === undefined) {
    await releaseClaim();
    return { ok: false, code: "no_credits" };
  }
  const remaining = Number(newRemaining);

  // Ledger row (idempotent via the partial unique index on session_id).
  const { error: txErr } = await admin.from("credit_transactions").insert({
    parent_id: parentId,
    type: "deduction",
    credits: -requiredCredits,
    session_id: sessionId,
    notes: reportId ? `Session report ${reportId}` : `Session ${sessionId}`,
  });
  if (txErr && !isUniqueViolation(txErr)) {
    await admin.rpc("add_credits", {
      p_parent_id: parentId,
      p_amount: requiredCredits,
      p_pack_size: null,
    });
    await releaseClaim();
    throw txErr;
  }

  let creditWarning = null;
  if (remaining <= 0) creditWarning = "out_of_credits";
  else if (remaining < 2) creditWarning = "low_balance";

  // Tutor payout, idempotent via tutor_payouts(session_id) unique index.
  // Managed-marketplace model: the tutor is paid a base hourly WAGE (their
  // per-tutor rate, defaulting to $35), plus superannuation ON TOP that goes to
  // their super fund. Tuterly takes no commission from the tutor's rate — the
  // platform margin is the spread between what the parent pays and this cost.
  const hourlyRate = Number(tutor?.hourly_rate ?? tutorBaseRate());
  const hours = (session.duration_minutes || 60) / 60;
  const amount = round2(hourlyRate * hours); // tutor gross wage
  const superAmount = round2(amount * superRate()); // super on top → their fund
  const commission = 0; // no cut is taken from the tutor's rate

  let payout;
  const { data: insertedPayout, error: payoutErr } = await admin
    .from("tutor_payouts")
    .insert({
      tutor_id: session.tutor_id,
      session_id: sessionId,
      amount,
      commission,
      super_amount: superAmount,
      status: "pending",
    })
    .select("id, amount, commission, super_amount, status")
    .maybeSingle();
  if (payoutErr && isUniqueViolation(payoutErr)) {
    const { data: existingPayout } = await admin
      .from("tutor_payouts")
      .select("id, amount, commission, super_amount, status")
      .eq("session_id", sessionId)
      .maybeSingle();
    payout = existingPayout;
  } else if (payoutErr) {
    throw payoutErr;
  } else {
    payout = insertedPayout;
  }

  await admin
    .from("sessions")
    .update({ tutor_payout_id: payout?.id ?? null })
    .eq("id", sessionId);

  return {
    ok: true,
    creditsAfter: remaining,
    creditWarning,
    payout: payout ?? null,
  };
}

// Cheap read used to pre-check before delivering a report, so a tutor gets a
// clear "out of credits" message instead of a mid-flow failure. Returns the
// parent's current balance (0 if no row / no parent).
export async function parentCreditBalance(admin, parentId) {
  if (!parentId) return 0;
  const { data } = await admin
    .from("credits")
    .select("credits_remaining")
    .eq("parent_id", parentId)
    .maybeSingle();
  return Number(data?.credits_remaining ?? 0);
}

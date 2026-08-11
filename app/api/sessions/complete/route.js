import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendReportEmail } from "@/lib/email";
import { settleSessionBilling } from "@/lib/session-billing";

export const runtime = "nodejs";
export const maxDuration = 30;

// POST /api/sessions/complete
//   Body: { session_id: uuid }
//   Auth: must be the tutor who owns the session.
//
// Standalone endpoint that settles a session's billing (deduct one parent
// credit + queue the tutor payout) and notifies the parent. The actual money
// logic lives in lib/session-billing.js so it's shared with the report-send
// flow. Idempotent and atomic — see that module. The credit chain only does
// anything once BILLING_ENABLED is on; this route is mainly for testing the
// settlement in isolation.

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
    return NextResponse.json({ error: "session_id required" }, { status: 400 });
  }

  const admin = createAdminClient();

  // Authorise: the session must belong to the calling tutor.
  const { data: session, error: sessionErr } = await admin
    .from("sessions")
    .select("id, student_id, tutor_id")
    .eq("id", sessionId)
    .eq("tutor_id", user.id)
    .maybeSingle();
  if (sessionErr) throw sessionErr;
  if (!session) {
    return NextResponse.json({ error: "session not found" }, { status: 404 });
  }

  // Refuse to settle without a report on file.
  const { data: report } = await admin
    .from("reports")
    .select("id")
    .eq("session_id", sessionId)
    .maybeSingle();
  if (!report) {
    return NextResponse.json(
      {
        error:
          "Generate the session report before completing, no report on file for this session.",
      },
      { status: 400 }
    );
  }

  const result = await settleSessionBilling(admin, {
    sessionId,
    reportId: report.id,
  });

  if (!result.ok) {
    if (result.code === "no_parent") {
      return NextResponse.json(
        {
          error:
            "This student has no linked parent to bill. Link a parent before completing the session.",
          code: "no_parent",
        },
        { status: 409 }
      );
    }
    if (result.code === "no_credits") {
      return NextResponse.json(
        {
          error:
            "The parent has no session credits remaining. Ask them to top up before this session can be completed.",
          code: "no_credits",
        },
        { status: 402 }
      );
    }
    return NextResponse.json(
      { error: "Could not settle session.", code: result.code },
      { status: 400 }
    );
  }

  if (result.alreadyCompleted) {
    return NextResponse.json({
      already_completed: true,
      session_id: sessionId,
      tutor_payout_id: result.payoutId ?? null,
    });
  }

  // Mark the session as delivered and notify the parent (best-effort — the
  // billing is already settled; email failure shouldn't unwind it).
  await admin
    .from("sessions")
    .update({ status: "sent_to_parent" })
    .eq("id", sessionId);

  let emailSent = false;
  const { data: student } = await admin
    .from("students")
    .select("first_name, last_name, parent_id")
    .eq("id", session.student_id)
    .maybeSingle();
  if (student?.parent_id) {
    try {
      const { data: parentProfile } = await admin
        .from("profiles")
        .select("email, full_name")
        .eq("id", student.parent_id)
        .maybeSingle();
      if (parentProfile?.email) {
        const origin =
          process.env.NEXT_PUBLIC_APP_URL || "https://app.tuterly.com.au";
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
    credits_remaining: result.creditsAfter,
    credit_warning: result.creditWarning,
    tutor_payout: {
      id: result.payout?.id ?? null,
      amount: result.payout?.amount ?? null,
      commission: result.payout?.commission ?? null,
      status: result.payout?.status ?? null,
    },
    parent_notified: emailSent,
  });
}

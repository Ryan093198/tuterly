"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendReportEmail } from "@/lib/email";
import { renderReportPdf, pdfFilename } from "@/lib/report-pdf";
import { billingEnabled } from "@/lib/billing-config";
import {
  settleSessionBilling,
  parentCreditBalance,
} from "@/lib/session-billing";
import {
  ALLOWED_IMAGE_TYPES,
  compressImage,
  rewriteImageFilename,
} from "@/lib/image-utils";

const PHOTO_BUCKET = "session-photos";
// Photos are run through sharp before storage. The cap applies to the raw
// upload (a phone shot can be 8MB before compression); after compression
// the typical stored size is under 500KB.
const MAX_PHOTO_BYTES = 10 * 1024 * 1024; // 10MB

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

async function uploadPhotoForSession(sessionId, userId, file) {
  // sharp doesn't decode HEIC/HEIF without libheif, which Vercel's runtime
  // doesn't ship with. iPhones save photos as HEIC by default, so this
  // tells the tutor exactly what to do.
  if (file.type === "image/heic" || file.type === "image/heif") {
    throw new Error(
      `HEIC photos aren't supported yet. On iPhone: Settings, Camera, Formats, choose Most Compatible, then retake the photo. Or open the photo in Photos and use Share, Save as JPEG.`
    );
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error(`Unsupported image type: ${file.type || "unknown"}`);
  }
  if (file.size > MAX_PHOTO_BYTES) {
    throw new Error(
      `Photo "${file.name || "photo"}" is too large (${(
        file.size /
        1024 /
        1024
      ).toFixed(1)}MB). Maximum is 10MB per photo.`
    );
  }
  const admin = createAdminClient();
  const rawBuffer = Buffer.from(await file.arrayBuffer());

  // Resize to 1500px max edge + JPEG q80. ~5-10× smaller, no visible loss
  // for whiteboard / notes shots.
  let compressed;
  try {
    compressed = await compressImage(rawBuffer);
  } catch (e) {
    throw new Error(
      `Couldn't process this photo (${e?.message || "unknown error"}). Try a different file or save it as JPEG first.`
    );
  }
  const filename = rewriteImageFilename(file.name || "photo");
  const objectKey = `${sessionId}/${randomUUID()}-${sanitizeFilename(filename)}`;

  const { error: uploadError } = await admin.storage
    .from(PHOTO_BUCKET)
    .upload(objectKey, compressed.buffer, {
      contentType: compressed.contentType,
      upsert: false,
    });
  if (uploadError) throw uploadError;

  const { error: insertError } = await admin
    .from("session_photos")
    .insert({ session_id: sessionId, uploaded_by: userId, file_url: objectKey });
  if (insertError) {
    await admin.storage.from(PHOTO_BUCKET).remove([objectKey]);
    throw insertError;
  }
  return objectKey;
}

export async function createSession(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const studentId = formData.get("student_id");
  const rawNotes = formData.get("raw_notes")?.toString() ?? "";
  const date = formData.get("date") || undefined;
  const duration = parseInt(formData.get("duration_minutes") ?? "60", 10);
  // Tutors can override the duplicate-session guard from the UI if they
  // really do mean to log two sessions for the same student on the same
  // day (eg. a make-up plus the original). Default false.
  const forceDuplicate = formData.get("force_duplicate") === "1";

  // ─── PHASE 4B GUARDS ──────────────────────────────────────────────
  // Duration must be one of the allowed slot lengths so payouts are
  // predictable. Tutors who need an off-list duration contact admin.
  const ALLOWED_DURATIONS = new Set([30, 45, 60, 90, 120]);
  if (!ALLOWED_DURATIONS.has(duration)) {
    throw new Error(
      `Session duration must be one of 30, 45, 60, 90 or 120 minutes (got ${duration}).`
    );
  }

  // Date must be today or within the past 7 days. Cannot be in the
  // future; cannot be more than a week back (those need admin help).
  if (date) {
    const sessionDate = new Date(date + "T00:00:00");
    if (Number.isNaN(sessionDate.getTime())) {
      throw new Error("Session date is invalid.");
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    if (sessionDate > today) {
      throw new Error(
        "Session date cannot be in the future. Log sessions after they happen."
      );
    }
    if (sessionDate < sevenDaysAgo) {
      throw new Error(
        "Sessions more than 7 days old need admin approval. Contact admin@baysideacademics.com.au."
      );
    }
  }

  // Default the session's subject from the student's so the tutor doesn't
  // pick on the create form; if they teach the kid both subjects, they
  // change it from the report-generation UI on the session page.
  const { data: studentForSubject } = await supabase
    .from("students")
    .select("subject")
    .eq("id", studentId)
    .maybeSingle();
  const sessionSubject =
    studentForSubject?.subject === "english" ? "english" : "maths";

  // Duplicate-session guard: refuse to insert a second session for the
  // same student on the same date unless the caller explicitly overrode
  // it. Prevents the common "I clicked save twice" mistake.
  if (date && !forceDuplicate) {
    const { data: existing } = await supabase
      .from("sessions")
      .select("id")
      .eq("tutor_id", user.id)
      .eq("student_id", studentId)
      .eq("date", date)
      .limit(1)
      .maybeSingle();
    if (existing) {
      throw new Error(
        "You already have a session logged for this student on this date. Open the existing session to edit it, or re-submit with force=1 if you really mean to create a second."
      );
    }
  }

  const { data: session, error } = await supabase
    .from("sessions")
    .insert({
      student_id: studentId,
      tutor_id: user.id,
      date,
      duration_minutes: duration,
      raw_notes: rawNotes,
      subject: sessionSubject,
      status: rawNotes.trim() ? "notes_added" : "pending",
    })
    .select("id")
    .single();
  if (error) throw error;

  const photos = formData.getAll("photos").filter(
    (f) => f && typeof f === "object" && "arrayBuffer" in f && f.size > 0
  );
  for (const photo of photos) {
    await uploadPhotoForSession(session.id, user.id, photo);
  }

  revalidatePath(`/dashboard/tutor/students/${studentId}`);
  // ?fresh=1 tells the session page to auto-generate the report on this
  // visit. Subsequent visits to the same URL won't re-trigger generation.
  redirect(`/dashboard/tutor/session/${session.id}?fresh=1`);
}

export async function deleteSession(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const sessionId = formData.get("session_id");
  if (!sessionId) throw new Error("session_id required");

  const { data: session } = await supabase
    .from("sessions")
    .select("id, student_id, tutor_id")
    .eq("id", sessionId)
    .eq("tutor_id", user.id)
    .maybeSingle();
  if (!session) throw new Error("session not found");

  const admin = createAdminClient();

  // Clean up photo files in storage. DB rows cascade-delete with the session.
  const { data: photoRows } = await admin
    .from("session_photos")
    .select("file_url")
    .eq("session_id", sessionId);
  const paths = (photoRows ?? []).map((p) => p.file_url).filter(Boolean);
  if (paths.length) {
    await admin.storage.from(PHOTO_BUCKET).remove(paths);
  }

  // Use admin to skip needing a separate DELETE RLS policy; ownership is
  // already verified above. Cascades reports/ratings/session_photos rows.
  const { error } = await admin.from("sessions").delete().eq("id", sessionId);
  if (error) throw error;

  revalidatePath(`/dashboard/tutor/students/${session.student_id}`);
  revalidatePath("/dashboard/tutor");
  revalidatePath("/dashboard/tutor/activity");

  // Caller can override the post-delete destination — used by the activity
  // list, which wants the user to stay where they were after deleting one
  // row from a list of many. Only relative paths under /dashboard/tutor are
  // honoured so a malicious form can't bounce us off-site.
  const redirectTo = formData.get("redirect_to");
  if (
    typeof redirectTo === "string" &&
    redirectTo.startsWith("/dashboard/tutor")
  ) {
    redirect(redirectTo);
  }
  redirect(`/dashboard/tutor/students/${session.student_id}`);
}

export async function updateSessionNotes(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const sessionId = formData.get("session_id");
  if (!sessionId) throw new Error("session_id required");

  const notes = formData.get("raw_notes")?.toString() ?? "";

  const { error } = await supabase
    .from("sessions")
    .update({
      raw_notes: notes,
      status: notes.trim() ? "notes_added" : "pending",
    })
    .eq("id", sessionId)
    .eq("tutor_id", user.id);
  if (error) throw error;

  revalidatePath(`/dashboard/tutor/session/${sessionId}`);
}

export async function updateSessionSubject(sessionId, subject) {
  if (subject !== "maths" && subject !== "english") {
    throw new Error(`invalid subject: ${subject}`);
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const { error } = await supabase
    .from("sessions")
    .update({ subject })
    .eq("id", sessionId)
    .eq("tutor_id", user.id);
  if (error) throw error;

  revalidatePath(`/dashboard/tutor/session/${sessionId}`);
}

export async function addSessionPhoto(formData) {
  // Server actions that throw are surfaced to the client as a generic
  // "An unexpected response was received from the server" with no useful
  // detail. We return { error } instead so the tutor sees what actually
  // went wrong (HEIC, oversize, sharp failure, etc.).
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Not signed in." };

    const sessionId = formData.get("session_id");
    if (!sessionId) return { error: "Missing session id." };

    const { data: session } = await supabase
      .from("sessions")
      .select("id, student_id")
      .eq("id", sessionId)
      .eq("tutor_id", user.id)
      .maybeSingle();
    if (!session) return { error: "Session not found." };

    const photos = formData.getAll("photos").filter(
      (f) => f && typeof f === "object" && "arrayBuffer" in f && f.size > 0
    );
    if (photos.length === 0) return { error: "No photos provided." };

    for (const photo of photos) {
      await uploadPhotoForSession(sessionId, user.id, photo);
    }

    revalidatePath(`/dashboard/tutor/session/${sessionId}`);
    revalidatePath(`/dashboard/tutor/students/${session.student_id}`);
    return { ok: true };
  } catch (e) {
    console.error("[addSessionPhoto] failed:", e);
    return {
      error:
        e?.message ||
        "Couldn't upload the photo. Please try again or use a different image.",
    };
  }
}

export async function deleteSessionPhoto(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const photoId = formData.get("photo_id");
  if (!photoId) throw new Error("photo_id required");

  const { data: photo } = await supabase
    .from("session_photos")
    .select("id, session_id, file_url, sessions(tutor_id, student_id)")
    .eq("id", photoId)
    .maybeSingle();
  if (!photo) throw new Error("photo not found");
  if (photo.sessions?.tutor_id !== user.id) throw new Error("forbidden");

  const admin = createAdminClient();
  if (photo.file_url) {
    await admin.storage.from(PHOTO_BUCKET).remove([photo.file_url]);
  }
  const { error } = await admin
    .from("session_photos")
    .delete()
    .eq("id", photoId);
  if (error) throw error;

  revalidatePath(`/dashboard/tutor/session/${photo.session_id}`);
  if (photo.sessions?.student_id) {
    revalidatePath(`/dashboard/tutor/students/${photo.sessions.student_id}`);
  }
}

// NOTE: signed-URL generation moved to lib/storage-signing.js (signedUrlForPhoto).
// It must not live here — exporting it from a "use server" module turned it into
// a callable endpoint that signed arbitrary object paths with no auth (audit C2).

export async function updateReport(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const sessionId = formData.get("session_id");
  const content = formData.get("content")?.toString() ?? "";
  const markReady = formData.get("mark_ready") === "1";

  const { data: existing } = await supabase
    .from("reports")
    .select("id")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("reports")
      .update({ content, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("reports")
      .insert({ session_id: sessionId, content });
    if (error) throw error;
  }

  if (markReady) {
    await supabase
      .from("sessions")
      .update({ status: "report_generated" })
      .eq("id", sessionId);
  }

  revalidatePath(`/dashboard/tutor/session/${sessionId}`);
}

export async function saveRatings({ sessionId, overallTopic, ratings }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const { data: session } = await supabase
    .from("sessions")
    .select("student_id, tutor_id")
    .eq("id", sessionId)
    .eq("tutor_id", user.id)
    .single();
  if (!session) throw new Error("session not found");

  await supabase.from("ratings").delete().eq("session_id", sessionId);

  const rows = ratings
    .filter((r) => r.confidence > 0 && r.subtopic.trim())
    .map((r) => ({
      session_id: sessionId,
      student_id: session.student_id,
      topic: overallTopic.trim() || "General",
      subtopic: r.subtopic.trim(),
      confidence: r.confidence,
    }));

  if (rows.length > 0) {
    const { error } = await supabase.from("ratings").insert(rows);
    if (error) throw error;
  }

  revalidatePath(`/dashboard/tutor/session/${sessionId}`);
}

// Email the report to the parent or the student. The two flows are nearly
// identical — only the recipient lookup, the deep link, and the timestamp
// column differ — so they share one server action.
export async function sendReport(sessionId, role = "parent") {
  if (role !== "parent" && role !== "student") {
    throw new Error(`invalid recipient role: ${role}`);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const { data: session } = await supabase
    .from("sessions")
    .select(
      "id, date, student_id, students(first_name, last_name, parent_id, student_user_id)"
    )
    .eq("id", sessionId)
    .eq("tutor_id", user.id)
    .single();
  if (!session) throw new Error("session not found");

  const { data: report } = await supabase
    .from("reports")
    .select("id, content")
    .eq("session_id", sessionId)
    .single();
  if (!report) throw new Error("No report to send");

  // Resolve recipient: linked profile first, otherwise the most recent
  // pending invite for this role. This lets a tutor email a PDF before the
  // recipient has signed up — the parent flow auto-accepts a matching invite
  // on first visit (the student flow doesn't yet, but the PDF still arrives).
  const admin = createAdminClient();
  const linkedProfileId =
    role === "parent"
      ? session.students?.parent_id
      : session.students?.student_user_id;
  let recipientEmail = null;
  let recipientName = null;

  if (linkedProfileId) {
    const { data: profile } = await admin
      .from("profiles")
      .select("email, full_name")
      .eq("id", linkedProfileId)
      .single();
    recipientEmail = profile?.email ?? null;
    recipientName = profile?.full_name ?? null;
  }

  if (!recipientEmail) {
    const { data: invite } = await supabase
      .from("invites")
      .select("to_email")
      .eq("student_id", session.student_id)
      .eq("from_user_id", user.id)
      .eq("role", role)
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    recipientEmail = invite?.to_email ?? null;
  }

  if (!recipientEmail) {
    throw new Error(
      role === "parent"
        ? "No parent email on file. Invite a parent on the student page first."
        : "No student email on file. Invite the student on the student page first."
    );
  }

  // Billing pre-check (phased MVP). When billing is on, a parent-facing send
  // spends one session credit. Block delivery up front if the parent is out of
  // credits so the tutor gets a clear message instead of a silent under-charge.
  // Only applies when the parent's account is actually linked; an unlinked
  // (invite-only) recipient can't be billed yet and sends as before.
  const billingParentId =
    role === "parent" ? session.students?.parent_id ?? null : null;
  if (billingEnabled() && billingParentId) {
    const balance = await parentCreditBalance(admin, billingParentId);
    if (balance < 1) {
      throw new Error(
        "This parent has no session credits left. Ask them to buy a pack before you send this report."
      );
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const reportUrl = `${baseUrl}/dashboard/${role}/reports/${report.id}`;

  const studentFullName = `${session.students.first_name} ${session.students.last_name}`;

  // Render PDF for attachment. If this fails, we still send the email with the link.
  let attachments;
  try {
    const pdfBuffer = await renderReportPdf({
      content: report.content,
      studentName: studentFullName,
      sessionDate: session.date,
    });
    attachments = [
      {
        filename: pdfFilename({
          firstName: session.students.first_name,
          lastName: session.students.last_name,
          sessionDate: session.date,
        }),
        content: pdfBuffer,
      },
    ];
  } catch (e) {
    console.warn(`[sendReport/${role}] PDF render failed: ${e?.message || e}`);
  }

  // Audit C9: previously the send was marked successful even when the email
  // threw — the tutor saw "Emailed to parent" while the parent got nothing.
  // Now a send failure surfaces as an error and we do NOT stamp sent_at or
  // flip the session status, so the tutor can retry.
  try {
    await sendReportEmail({
      to: recipientEmail,
      recipientName,
      recipientRole: role,
      studentName: studentFullName,
      reportUrl,
      attachments,
    });
  } catch (e) {
    console.error(
      `[sendReport/${role}] email send failed (${e?.statusCode || "?"}): ${e?.message || e}. ` +
        `Report URL: ${reportUrl}`
    );
    throw new Error(
      `The report couldn't be emailed to ${recipientEmail} just now. Nothing was marked as sent — please try again in a moment.`
    );
  }

  const timestampColumn = role === "parent" ? "sent_at" : "student_sent_at";
  await supabase
    .from("reports")
    .update({ [timestampColumn]: new Date().toISOString() })
    .eq("id", report.id);

  // Only the parent send flips session status to "sent_to_parent" — that
  // status drives the parent-facing dashboards. A student-only send leaves
  // the session in its previous state (e.g. report_generated).
  if (role === "parent") {
    await supabase
      .from("sessions")
      .update({ status: "sent_to_parent" })
      .eq("id", sessionId);
  }

  // Settle billing AFTER successful delivery (phased MVP): deduct the credit
  // and queue the tutor payout. Doing it post-send means we never charge for a
  // report that didn't go out; settleSessionBilling is idempotent, so a resend
  // won't double-charge.
  if (billingEnabled() && billingParentId) {
    try {
      const settle = await settleSessionBilling(admin, {
        sessionId,
        reportId: report.id,
      });
      if (!settle.ok) {
        console.warn(
          `[sendReport] billing settle returned "${settle.code}" after delivery of session ${sessionId} — reconcile manually`
        );
      }
    } catch (e) {
      console.warn(
        "[sendReport] billing settle failed post-delivery:",
        e?.message || e
      );
    }
  }

  revalidatePath(`/dashboard/tutor/session/${sessionId}`);
}

// Back-compat thin wrapper. ReportWorkbench's auto-prompt after generation
// only offers the parent send, so this keeps that call site tidy.
export async function sendReportToParent(sessionId) {
  return sendReport(sessionId, "parent");
}

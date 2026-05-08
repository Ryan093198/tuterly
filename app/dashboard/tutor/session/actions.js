"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendReportEmail } from "@/lib/email";
import { renderReportPdf, pdfFilename } from "@/lib/report-pdf";
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
  const compressed = await compressImage(rawBuffer);
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

  const { data: session, error } = await supabase
    .from("sessions")
    .insert({
      student_id: studentId,
      tutor_id: user.id,
      date,
      duration_minutes: duration,
      raw_notes: rawNotes,
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

export async function addSessionPhoto(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const sessionId = formData.get("session_id");
  if (!sessionId) throw new Error("session_id required");

  // Verify the session belongs to this tutor.
  const { data: session } = await supabase
    .from("sessions")
    .select("id, student_id")
    .eq("id", sessionId)
    .eq("tutor_id", user.id)
    .maybeSingle();
  if (!session) throw new Error("session not found");

  const photos = formData.getAll("photos").filter(
    (f) => f && typeof f === "object" && "arrayBuffer" in f && f.size > 0
  );
  if (photos.length === 0) throw new Error("no photos provided");

  for (const photo of photos) {
    await uploadPhotoForSession(sessionId, user.id, photo);
  }

  revalidatePath(`/dashboard/tutor/session/${sessionId}`);
  revalidatePath(`/dashboard/tutor/students/${session.student_id}`);
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

export async function signedPhotoUrl(filePath) {
  if (!filePath) return null;
  const admin = createAdminClient();
  const { data } = await admin.storage
    .from(PHOTO_BUCKET)
    .createSignedUrl(filePath, 3600);
  return data?.signedUrl ?? null;
}

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

export async function sendReportToParent(sessionId) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const { data: session } = await supabase
    .from("sessions")
    .select("id, date, student_id, students(first_name, last_name, parent_id)")
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

  // Resolve recipient: linked parent profile first, otherwise the most recent
  // pending parent invite. This lets a tutor email a PDF to a parent who
  // hasn't signed up yet — the email link still works because the report
  // view auto-accepts a matching invite on first visit.
  const admin = createAdminClient();
  let recipientEmail = null;
  let recipientName = null;

  if (session.students?.parent_id) {
    const { data: parent } = await admin
      .from("profiles")
      .select("email, full_name")
      .eq("id", session.students.parent_id)
      .single();
    recipientEmail = parent?.email ?? null;
    recipientName = parent?.full_name ?? null;
  }

  if (!recipientEmail) {
    const { data: invite } = await supabase
      .from("invites")
      .select("to_email")
      .eq("student_id", session.student_id)
      .eq("from_user_id", user.id)
      .eq("role", "parent")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    recipientEmail = invite?.to_email ?? null;
  }

  if (!recipientEmail) {
    throw new Error(
      "No parent email on file. Invite a parent on the student page first."
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const reportUrl = `${baseUrl}/dashboard/parent/reports/${report.id}`;

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
    console.warn(`[sendReportToParent] PDF render failed: ${e?.message || e}`);
  }

  try {
    await sendReportEmail({
      to: recipientEmail,
      parentName: recipientName,
      studentName: studentFullName,
      reportUrl,
      attachments,
    });
  } catch (e) {
    console.warn(
      `[sendReportToParent] email send failed (${e?.statusCode || "?"}): ${e?.message || e}. ` +
        `Report URL: ${reportUrl}`
    );
  }

  await supabase
    .from("reports")
    .update({ sent_at: new Date().toISOString() })
    .eq("id", report.id);

  await supabase
    .from("sessions")
    .update({ status: "sent_to_parent" })
    .eq("id", sessionId);

  revalidatePath(`/dashboard/tutor/session/${sessionId}`);
}

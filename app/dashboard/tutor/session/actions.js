"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendReportEmail } from "@/lib/email";
import { renderReportPdf, pdfFilename } from "@/lib/report-pdf";

const PHOTO_BUCKET = "session-photos";
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

async function uploadPhotoForSession(sessionId, userId, file) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error(`Unsupported image type: ${file.type || "unknown"}`);
  }
  const admin = createAdminClient();
  const objectKey = `${sessionId}/${randomUUID()}-${sanitizeFilename(file.name || "photo")}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadError } = await admin.storage
    .from(PHOTO_BUCKET)
    .upload(objectKey, buffer, {
      contentType: file.type,
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
  redirect(`/dashboard/tutor/session/${session.id}`);
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

  const parentId = session.students?.parent_id;
  if (!parentId) {
    throw new Error("No parent linked to this student. Invite a parent first.");
  }

  const { data: report } = await supabase
    .from("reports")
    .select("id, content")
    .eq("session_id", sessionId)
    .single();
  if (!report) throw new Error("No report to send");

  // Look up parent email via admin client (RLS hides other profiles).
  const admin = createAdminClient();
  const { data: parent } = await admin
    .from("profiles")
    .select("email, full_name")
    .eq("id", parentId)
    .single();
  if (!parent?.email) throw new Error("Parent profile missing email");

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
      to: parent.email,
      parentName: parent.full_name,
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

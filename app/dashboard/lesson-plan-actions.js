"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import {
  renderLessonPlanPdf,
  lessonPlanPdfFilename,
} from "@/lib/lesson-plan-pdf";
import { sendLessonPlanEmail } from "@/lib/email";

// Email a previously-generated lesson plan to the linked parent. The lesson
// plan is already saved as a `lesson_plan` resource — this just renders a
// PDF copy and sends it. Mirrors the existing sendReportToParent flow:
//   - resolve recipient via linked parent first, then the most recent pending
//     parent invite (so the email works even before the parent signs up)
//   - PDF attachment is best-effort; the email goes out either way
export async function emailLessonPlanToParent(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const resourceId = formData.get("resource_id")?.toString();
  if (!resourceId) throw new Error("resource_id required");

  const { data: resource } = await supabase
    .from("resources")
    .select("id, name, content, category, student_id")
    .eq("id", resourceId)
    .single();
  if (!resource) throw new Error("resource not found");
  if (resource.category !== "lesson_plan") {
    throw new Error("Only lesson plans can be emailed.");
  }
  if (!resource.content) {
    throw new Error("This lesson plan has no content to send.");
  }

  // Authorization: must be the tutor linked to this student.
  const { data: link } = await supabase
    .from("tutor_students")
    .select("student_id")
    .eq("tutor_id", user.id)
    .eq("student_id", resource.student_id)
    .maybeSingle();
  if (!link) throw new Error("forbidden");

  const admin = createAdminClient();
  const { data: student } = await admin
    .from("students")
    .select("id, first_name, last_name, parent_id")
    .eq("id", resource.student_id)
    .single();
  if (!student) throw new Error("student not found");

  // Resolve parent email — linked profile first, fall back to a pending invite.
  let recipientEmail = null;
  let recipientName = null;
  if (student.parent_id) {
    const { data: parent } = await admin
      .from("profiles")
      .select("email, full_name")
      .eq("id", student.parent_id)
      .single();
    recipientEmail = parent?.email ?? null;
    recipientName = parent?.full_name ?? null;
  }
  if (!recipientEmail) {
    const { data: invite } = await supabase
      .from("invites")
      .select("to_email")
      .eq("student_id", student.id)
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

  const { data: tutor } = await admin
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  // Pull the week count out of the resource name (it's of the form
  // "Lesson plan — {Subject} — {N} weeks (date)"). Defaults to 10 if we
  // can't parse it.
  const weeksMatch = resource.name.match(/(\d+)\s+weeks?/i);
  const weeks = weeksMatch ? parseInt(weeksMatch[1], 10) : 10;

  const studentFullName = `${student.first_name} ${student.last_name}`;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  // Deep-link to the parent's child detail page with `?resource=<id>` so the
  // ResourceViewer auto-opens the plan.
  const planUrl = `${baseUrl}/dashboard/parent/students/${student.id}?resource=${resource.id}`;

  let attachments;
  try {
    const pdfBuffer = await renderLessonPlanPdf({
      content: resource.content,
      studentName: studentFullName,
      generatedDate: new Date().toISOString(),
    });
    attachments = [
      {
        filename: lessonPlanPdfFilename({
          firstName: student.first_name,
          lastName: student.last_name,
          weeks,
        }),
        content: pdfBuffer,
      },
    ];
  } catch (e) {
    console.warn(
      `[emailLessonPlanToParent] PDF render failed: ${e?.message || e}`
    );
  }

  try {
    await sendLessonPlanEmail({
      to: recipientEmail,
      parentName: recipientName,
      studentName: studentFullName,
      tutorName: tutor?.full_name ?? null,
      weeks,
      planUrl,
      attachments,
    });
  } catch (e) {
    console.warn(
      `[emailLessonPlanToParent] email send failed (${e?.statusCode || "?"}): ${e?.message || e}. ` +
        `Plan URL: ${planUrl}`
    );
    throw new Error("Could not send the email. Try again in a moment.");
  }

  return { ok: true, recipientEmail };
}

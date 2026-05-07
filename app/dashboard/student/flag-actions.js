"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function toggleFlag(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const reportId = formData.get("report_id")?.toString();
  const questionNumber = parseInt(formData.get("question_number"), 10);
  const topic = formData.get("topic")?.toString() || null;
  const on = formData.get("on") === "1";

  if (!reportId || !Number.isFinite(questionNumber)) {
    throw new Error("missing fields");
  }

  // Find the student associated with this report. Use admin to side-step any
  // RLS quirks on the join — we do an explicit auth check below.
  const admin = createAdminClient();
  const { data: report } = await admin
    .from("reports")
    .select(
      "id, sessions(student_id, students(id, parent_id, student_user_id))"
    )
    .eq("id", reportId)
    .maybeSingle();
  if (!report) throw new Error("report not found");

  const sessionData = Array.isArray(report.sessions)
    ? report.sessions[0]
    : report.sessions;
  const studentRecord = Array.isArray(sessionData?.students)
    ? sessionData.students[0]
    : sessionData?.students;
  const studentId = studentRecord?.id;
  if (!studentId) throw new Error("student not found for report");

  // Only the linked parent or the linked student can flag.
  if (
    user.id !== studentRecord.parent_id &&
    user.id !== studentRecord.student_user_id
  ) {
    throw new Error("forbidden");
  }

  if (on) {
    const { error } = await admin.from("flagged_questions").upsert(
      {
        student_id: studentId,
        report_id: reportId,
        question_number: questionNumber,
        topic,
      },
      { onConflict: "student_id,report_id,question_number" }
    );
    if (error) throw error;
  } else {
    const { error } = await admin
      .from("flagged_questions")
      .delete()
      .eq("student_id", studentId)
      .eq("report_id", reportId)
      .eq("question_number", questionNumber);
    if (error) throw error;
  }

  revalidatePath(`/dashboard/student/reports/${reportId}`);
  revalidatePath(`/dashboard/parent/reports/${reportId}`);
  revalidatePath("/dashboard/student");
}

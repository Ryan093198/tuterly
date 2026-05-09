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

  const reportId = formData.get("report_id")?.toString() || null;
  const resourceId = formData.get("resource_id")?.toString() || null;
  const questionNumber = parseInt(formData.get("question_number"), 10);
  const topic = formData.get("topic")?.toString() || null;
  const on = formData.get("on") === "1";

  if (!Number.isFinite(questionNumber)) {
    throw new Error("missing fields");
  }
  if ((reportId && resourceId) || (!reportId && !resourceId)) {
    throw new Error("provide exactly one of report_id / resource_id");
  }

  // Find the student associated with this flag source. Use admin to
  // side-step RLS quirks on the join — we do an explicit auth check below.
  const admin = createAdminClient();
  let studentRecord;
  if (reportId) {
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
    studentRecord = Array.isArray(sessionData?.students)
      ? sessionData.students[0]
      : sessionData?.students;
  } else {
    const { data: resource } = await admin
      .from("resources")
      .select("id, students(id, parent_id, student_user_id)")
      .eq("id", resourceId)
      .maybeSingle();
    if (!resource) throw new Error("resource not found");
    studentRecord = Array.isArray(resource.students)
      ? resource.students[0]
      : resource.students;
  }

  const studentId = studentRecord?.id;
  if (!studentId) throw new Error("student not found for flag source");

  // Only the linked parent or the linked student can flag.
  if (
    user.id !== studentRecord.parent_id &&
    user.id !== studentRecord.student_user_id
  ) {
    throw new Error("forbidden");
  }

  const sourceColumn = reportId ? "report_id" : "resource_id";
  const sourceId = reportId || resourceId;

  if (on) {
    const { error } = await admin.from("flagged_questions").upsert(
      {
        student_id: studentId,
        [sourceColumn]: sourceId,
        question_number: questionNumber,
        topic,
      },
      { onConflict: `student_id,${sourceColumn},question_number` }
    );
    if (error) throw error;
  } else {
    const { error } = await admin
      .from("flagged_questions")
      .delete()
      .eq("student_id", studentId)
      .eq(sourceColumn, sourceId)
      .eq("question_number", questionNumber);
    if (error) throw error;
  }

  if (reportId) {
    revalidatePath(`/dashboard/student/reports/${reportId}`);
    revalidatePath(`/dashboard/parent/reports/${reportId}`);
  }
  revalidatePath(`/dashboard/parent/students/${studentId}`);
  revalidatePath(`/dashboard/parent/students/${studentId}/flagged`);
  revalidatePath(`/dashboard/tutor/students/${studentId}`);
  revalidatePath(`/dashboard/tutor/students/${studentId}/flagged`);
  revalidatePath("/dashboard/student");
  revalidatePath("/dashboard/student/flagged");
}

// Toggle "understood" state on an existing flag. Tutor, parent, or student
// linked to the flag's student record can do this.
export async function setFlagUnderstood(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const flagId = formData.get("flag_id")?.toString();
  const understood = formData.get("understood") === "1";
  if (!flagId) throw new Error("flag_id required");

  const admin = createAdminClient();
  const { data: flag } = await admin
    .from("flagged_questions")
    .select(
      "id, student_id, students(parent_id, student_user_id)"
    )
    .eq("id", flagId)
    .maybeSingle();
  if (!flag) throw new Error("flag not found");

  if (!(await userCanManageFlag(admin, user.id, flag))) {
    throw new Error("forbidden");
  }

  const { error } = await admin
    .from("flagged_questions")
    .update({
      understood_at: understood ? new Date().toISOString() : null,
      understood_by: understood ? user.id : null,
    })
    .eq("id", flagId);
  if (error) throw error;

  revalidatePathsForFlag(flag);
}

export async function removeFlag(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const flagId = formData.get("flag_id")?.toString();
  if (!flagId) throw new Error("flag_id required");

  const admin = createAdminClient();
  const { data: flag } = await admin
    .from("flagged_questions")
    .select(
      "id, student_id, students(parent_id, student_user_id)"
    )
    .eq("id", flagId)
    .maybeSingle();
  if (!flag) throw new Error("flag not found");

  if (!(await userCanManageFlag(admin, user.id, flag))) {
    throw new Error("forbidden");
  }

  const { error } = await admin
    .from("flagged_questions")
    .delete()
    .eq("id", flagId);
  if (error) throw error;

  revalidatePathsForFlag(flag);
}

async function userCanManageFlag(admin, userId, flag) {
  const studentRecord = Array.isArray(flag.students)
    ? flag.students[0]
    : flag.students;
  if (studentRecord?.parent_id === userId) return true;
  if (studentRecord?.student_user_id === userId) return true;
  const { data: link } = await admin
    .from("tutor_students")
    .select("student_id")
    .eq("tutor_id", userId)
    .eq("student_id", flag.student_id)
    .maybeSingle();
  return !!link;
}

function revalidatePathsForFlag(flag) {
  revalidatePath("/dashboard/student");
  revalidatePath("/dashboard/student/flagged");
  revalidatePath(`/dashboard/parent/students/${flag.student_id}`);
  revalidatePath(`/dashboard/parent/students/${flag.student_id}/flagged`);
  revalidatePath(`/dashboard/tutor/students/${flag.student_id}`);
  revalidatePath(`/dashboard/tutor/students/${flag.student_id}/flagged`);
}

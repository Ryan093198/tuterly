"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";

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

  // Look up which student record this user is.
  const { data: student } = await supabase
    .from("students")
    .select("id")
    .eq("student_user_id", user.id)
    .maybeSingle();
  if (!student) throw new Error("no student record linked to this account");

  if (on) {
    const { error } = await supabase.from("flagged_questions").upsert(
      {
        student_id: student.id,
        report_id: reportId,
        question_number: questionNumber,
        topic,
      },
      { onConflict: "student_id,report_id,question_number" }
    );
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("flagged_questions")
      .delete()
      .eq("student_id", student.id)
      .eq("report_id", reportId)
      .eq("question_number", questionNumber);
    if (error) throw error;
  }

  revalidatePath(`/dashboard/student/reports/${reportId}`);
  revalidatePath(`/dashboard/student`);
}

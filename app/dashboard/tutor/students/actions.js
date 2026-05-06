"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";

export async function createStudent(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const subjects = (formData.get("subjects") || "")
    .toString()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Generate the ID client-side so we don't need .select() after insert —
  // the new row has parent_id=NULL and no tutor_students link yet, so the
  // SELECT-after-INSERT round-trip is blocked by RLS.
  const studentId = randomUUID();

  const { error } = await supabase.from("students").insert({
    id: studentId,
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    year_level: formData.get("year_level"),
    working_level: formData.get("working_level") || null,
    school: formData.get("school") || null,
    subjects,
    goals: formData.get("goals") || null,
    concerns: formData.get("concerns") || null,
  });
  if (error) throw error;

  const { error: linkError } = await supabase
    .from("tutor_students")
    .insert({ tutor_id: user.id, student_id: studentId });
  if (linkError) throw linkError;

  revalidatePath("/dashboard/tutor");
  redirect(`/dashboard/tutor/students/${studentId}`);
}

export async function updateStudent(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const studentId = formData.get("id");
  if (!studentId) throw new Error("id required");

  // RLS: "Tutors update linked students" allows update only when the link exists.
  const subjectsRaw = formData.get("subjects");
  const subjects =
    subjectsRaw === null
      ? undefined
      : subjectsRaw
          .toString()
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

  const patch = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    year_level: formData.get("year_level"),
    working_level: formData.get("working_level") || null,
    school: formData.get("school") || null,
    goals: formData.get("goals") || null,
    concerns: formData.get("concerns") || null,
    updated_at: new Date().toISOString(),
  };
  if (subjects !== undefined) patch.subjects = subjects;

  const { error } = await supabase.from("students").update(patch).eq("id", studentId);
  if (error) throw error;

  revalidatePath(`/dashboard/tutor/students/${studentId}`);
  revalidatePath(`/dashboard/parent/students/${studentId}`);
}

"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

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

  const subject = formData.get("subject") === "english" ? "english" : "maths";

  const { error } = await supabase.from("students").insert({
    id: studentId,
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    year_level: formData.get("year_level"),
    working_level: formData.get("working_level") || null,
    school: formData.get("school") || null,
    subject,
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

  const subjectRaw = formData.get("subject");
  const subject =
    subjectRaw === null
      ? undefined
      : subjectRaw === "english"
      ? "english"
      : "maths";

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
  if (subject !== undefined) patch.subject = subject;

  const { error } = await supabase.from("students").update(patch).eq("id", studentId);
  if (error) throw error;

  revalidatePath(`/dashboard/tutor/students/${studentId}`);
  revalidatePath(`/dashboard/parent/students/${studentId}`);
}

export async function deleteStudent(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const studentId = formData.get("student_id");
  if (!studentId) throw new Error("student_id required");

  // Ownership check via tutor_students.
  const { data: link } = await supabase
    .from("tutor_students")
    .select("student_id")
    .eq("tutor_id", user.id)
    .eq("student_id", studentId)
    .maybeSingle();
  if (!link) throw new Error("forbidden");

  const admin = createAdminClient();

  // Collect storage paths before deleting DB rows. Cascades clean up the rows;
  // we have to clean up the binary objects manually.
  const { data: sessions } = await admin
    .from("sessions")
    .select("id")
    .eq("student_id", studentId);
  const sessionIds = (sessions ?? []).map((s) => s.id);

  if (sessionIds.length > 0) {
    const { data: photos } = await admin
      .from("session_photos")
      .select("file_url")
      .in("session_id", sessionIds);
    const photoPaths = (photos ?? []).map((p) => p.file_url).filter(Boolean);
    if (photoPaths.length > 0) {
      await admin.storage.from("session-photos").remove(photoPaths);
    }
  }

  const { data: resources } = await admin
    .from("resources")
    .select("file_url")
    .eq("student_id", studentId);
  const resourcePaths = (resources ?? [])
    .map((r) => r.file_url)
    .filter(Boolean);
  if (resourcePaths.length > 0) {
    await admin.storage.from("resources").remove(resourcePaths);
  }

  // Cascade-deletes sessions -> reports/ratings/session_photos, plus
  // tutor_students, resources, invites for this student.
  const { error } = await admin.from("students").delete().eq("id", studentId);
  if (error) throw error;

  revalidatePath("/dashboard/tutor");
  redirect("/dashboard/tutor");
}

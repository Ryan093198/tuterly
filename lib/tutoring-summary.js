// Build the human label for "what tutoring is this" — used everywhere the
// dashboard needs to disambiguate the duplicate-student-row case (when two
// tutors invite the same parent/student, each tutor's record is independent).
//
// Output shapes:
//   - "Maths tutoring with Sarah Lee"
//   - "English tutoring with Sarah Lee and David Kim"
//   - "Maths tutoring (no tutor linked yet)"  ← parent-created student
//   - "Tutoring with Sarah Lee"               ← subject not set

import { createAdminClient } from "@/lib/supabase-admin";

const SUBJECT_LABEL = { maths: "Maths", english: "English" };

export function tutoringSummary(student, tutorNames) {
  const subjectKey = student?.subject;
  const subject = SUBJECT_LABEL[subjectKey] || null;
  const subjectLabel = subject ? `${subject} tutoring` : "Tutoring";
  if (!tutorNames || tutorNames.length === 0) {
    return `${subjectLabel} (no tutor linked yet)`;
  }
  return `${subjectLabel} with ${formatList(tutorNames)}`;
}

function formatList(names) {
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names.at(-1)}`;
}

/**
 * For a list of student-row ids, return a Map<student_id, string[]> of tutor
 * full_names. Uses the admin client because parents/students don't have
 * SELECT on tutor_students or other users' profiles.
 */
export async function fetchTutorsForStudents(studentIds) {
  const result = new Map();
  if (!studentIds?.length) return result;
  const admin = createAdminClient();
  const { data: links } = await admin
    .from("tutor_students")
    .select("student_id, tutor_id")
    .in("student_id", studentIds)
    .eq("status", "active");
  const tutorIds = [...new Set((links ?? []).map((l) => l.tutor_id))];
  if (!tutorIds.length) return result;
  const { data: profiles } = await admin
    .from("profiles")
    .select("id, full_name")
    .in("id", tutorIds);
  const nameById = new Map((profiles ?? []).map((p) => [p.id, p.full_name]));
  for (const l of links ?? []) {
    const name = nameById.get(l.tutor_id);
    if (!name) continue;
    if (!result.has(l.student_id)) result.set(l.student_id, []);
    result.get(l.student_id).push(name);
  }
  return result;
}

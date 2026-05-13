import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { enrichResources } from "@/lib/resource-helpers";
import { getTopicGroupsForLevel } from "@/lib/curriculum-topics";
import ParentResourcesIndex from "@/components/ParentResourcesIndex";

// Resources tab for students. Same shape as the parent view (grouped per
// student record, generators inline) — but the student is themselves, so
// each "kid" entry is one of their own linked student records (a student
// may have multiple records, e.g. maths and english as separate subjects).
//
// Reuses ParentResourcesIndex unchanged: the component doesn't know or
// care whether the viewer is a parent or the student themselves, it just
// renders the grouped resources and generator buttons.

export default async function StudentResourcesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const { data: students } = await supabase
    .from("students")
    .select(
      "id, first_name, last_name, year_level, working_level, subject, subjects"
    )
    .eq("student_user_id", user.id)
    .order("created_at", { ascending: true });

  const studentList = students ?? [];
  let kids = [];

  if (studentList.length > 0) {
    const studentIds = studentList.map((s) => s.id);
    const { data: rawResources } = await supabase
      .from("resources")
      .select(
        "id, name, category, notes, file_url, content, created_at, uploaded_by, student_id"
      )
      .in("student_id", studentIds)
      .order("created_at", { ascending: false });

    const enriched = await enrichResources(rawResources ?? []);

    const byStudent = new Map(studentIds.map((id) => [id, []]));
    for (const r of enriched) {
      if (byStudent.has(r.student_id)) byStudent.get(r.student_id).push(r);
    }

    kids = studentList.map((student) => {
      const level = student.working_level || student.year_level;
      const topicGroups = getTopicGroupsForLevel(
        level,
        student.subject || "maths",
        student.subjects && student.subjects.length ? student.subjects : [level]
      );
      return {
        student,
        resources: byStudent.get(student.id) ?? [],
        topicGroups,
        weakTopics: [],
      };
    });
  }

  return (
    <div className="px-4 sm:px-8 py-8 sm:py-10 max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Resources</h1>
        <p className="text-sm text-muted">
          Your lesson plans, practice worksheets and uploads. Generate new
          ones any time — no tutor required.
        </p>
      </header>

      <ParentResourcesIndex kids={kids} />
    </div>
  );
}

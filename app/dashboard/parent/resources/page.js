import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { enrichResources } from "@/lib/resource-helpers";
import { getTopicGroupsForLevel } from "@/lib/curriculum-topics";
import ParentResourcesIndex from "@/components/ParentResourcesIndex";

// Aggregated Resources tab for parents. Lists every resource on every
// child they own, grouped by child, with one-click access to the worksheet
// and lesson-plan generators (pre-filled with the chosen kid). The same
// data is also surfaced on each per-child page; this view is the "home
// base" for parents and lets them generate without drilling in first.

export default async function ParentResourcesPage() {
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
    .eq("parent_id", user.id)
    .order("first_name", { ascending: true });

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
      // Pre-compute curriculum groups for both subjects so the
      // PracticeModal can swap them when the parent toggles subject
      // inside the modal — without it, switching to English keeps
      // the maths topics visible.
      const subjects =
        student.subjects && student.subjects.length
          ? student.subjects
          : [level];
      const topicsBySubject = {
        maths: getTopicGroupsForLevel(level, "maths", subjects),
        english: getTopicGroupsForLevel(level, "english", subjects),
      };
      return {
        student,
        resources: byStudent.get(student.id) ?? [],
        topicsBySubject,
        // Aggregated weak-topic suggestions live on the per-student page;
        // the Resources tab uses the curriculum dropdown only. Keeps this
        // server fetch cheap.
        weakTopics: [],
      };
    });
  }

  return (
    <div className="px-4 sm:px-8 py-8 sm:py-10 max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Resources</h1>
        <p className="text-sm text-muted">
          Lesson plans, practice worksheets and uploads, organised by child.
          Generate new ones any time.
        </p>
      </header>

      <ParentResourcesIndex kids={kids} />
    </div>
  );
}

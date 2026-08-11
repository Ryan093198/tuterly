import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { enrichResources } from "@/lib/resource-helpers";
import TutorResourcesIndex from "@/components/TutorResourcesIndex";

export default async function TutorResourcesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  // All students linked to this tutor — used both as the SELECT scope for
  // resources and to populate the filter dropdowns (year level, school).
  const { data: links } = await supabase
    .from("tutor_students")
    .select("students(id, first_name, last_name, year_level, school)")
    .eq("tutor_id", user.id);

  const students = (links ?? [])
    .map((l) => l.students)
    .filter(Boolean)
    .sort((a, b) => {
      const an = `${a.first_name} ${a.last_name}`.toLowerCase();
      const bn = `${b.first_name} ${b.last_name}`.toLowerCase();
      return an.localeCompare(bn);
    });

  let enriched = [];
  if (students.length) {
    const studentIds = students.map((s) => s.id);
    const { data: rawResources } = await supabase
      .from("resources")
      .select("id, name, category, notes, file_url, content, created_at, uploaded_by, student_id")
      .in("student_id", studentIds)
      .order("created_at", { ascending: false });

    enriched = await enrichResources(rawResources ?? []);
    const byId = new Map(students.map((s) => [s.id, s]));
    enriched = enriched.map((r) => ({
      ...r,
      student: byId.get(r.student_id) ?? null,
    }));
  }

  return (
    <div className="px-4 sm:px-8 py-8 sm:py-10 max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Resources</h1>
        <p className="text-sm text-muted">
          Everything uploaded by you, your students, or their parents, across
          all your students.
        </p>
      </header>

      <TutorResourcesIndex
        resources={enriched}
        students={students}
        currentUserId={user.id}
      />
    </div>
  );
}

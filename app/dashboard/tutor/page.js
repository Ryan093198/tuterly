import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";

export default async function TutorDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: links } = await supabase
    .from("tutor_students")
    .select(
      "status, students(id, first_name, last_name, year_level, working_level, school, subjects)"
    )
    .eq("tutor_id", user.id)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  const students = (links ?? []).map((l) => l.students).filter(Boolean);

  return (
    <div className="px-6 sm:px-8 py-8 sm:py-10 max-w-6xl mx-auto animate-fade-in-up">
      <header className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Students</h1>
          <p className="text-sm text-muted mt-1">
            {students.length === 0
              ? "Add your first student to get started."
              : `${students.length} active student${students.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <Link href="/dashboard/tutor/students/new">
          <Button variant="primary" size="md">
            <span aria-hidden="true">+</span> Add student
          </Button>
        </Link>
      </header>

      {students.length === 0 ? (
        <EmptyState
          icon={
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="8" r="3.5" />
              <path d="M2.5 19c.7-3.3 3.4-5.5 6.5-5.5s5.8 2.2 6.5 5.5" />
            </svg>
          }
          title="No students yet"
          description="Add a student, log a session, and Claude will turn your dot-point notes into a parent-ready report in seconds."
          action={
            <Link href="/dashboard/tutor/students/new">
              <Button variant="primary">Add your first student</Button>
            </Link>
          }
        />
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {students.map((s) => (
            <li key={s.id}>
              <Link
                href={`/dashboard/tutor/students/${s.id}`}
                className="group block h-full"
              >
                <Card className="h-full p-5 transition group-hover:border-brand/40 group-hover:shadow-md">
                  <div className="flex items-start gap-3">
                    <Avatar name={`${s.first_name} ${s.last_name}`} />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold tracking-tight truncate">
                        {s.first_name} {s.last_name}
                      </div>
                      <div className="text-xs text-muted truncate mt-0.5">
                        {s.year_level}
                        {s.working_level && s.working_level !== s.year_level
                          ? ` · ${s.working_level}`
                          : ""}
                        {s.school ? ` · ${s.school}` : ""}
                      </div>
                    </div>
                  </div>
                  {s.subjects?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-4">
                      {s.subjects.map((subj) => (
                        <Badge key={subj} tone="brand">
                          {subj}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Avatar({ name }) {
  const initials = (name || "?")
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="h-10 w-10 shrink-0 rounded-full bg-brand-pale text-brand-foreground flex items-center justify-center text-sm font-semibold">
      {initials}
    </div>
  );
}

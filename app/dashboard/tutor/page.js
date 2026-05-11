import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import StudentSearchList from "@/components/StudentSearchList";

export default async function TutorDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: links } = await supabase
    .from("tutor_students")
    .select(
      "students(id, first_name, last_name, year_level, working_level, school, subjects)"
    )
    .eq("tutor_id", user.id)
    .eq("status", "active");

  // Sort alphabetically by first name (then last name) so the list is easy
  // to scan when a tutor has many students.
  const baseStudents = (links ?? [])
    .map((l) => l.students)
    .filter(Boolean)
    .sort((a, b) => {
      const f = (a.first_name || "").localeCompare(b.first_name || "", "en", {
        sensitivity: "base",
      });
      if (f !== 0) return f;
      return (a.last_name || "").localeCompare(b.last_name || "", "en", {
        sensitivity: "base",
      });
    });

  // Latest session per student so the roster card can show "Last session: X"
  // and a status badge — without that the roster gives no signal about
  // outstanding work (notes pending / report not emailed / etc.).
  const studentIds = baseStudents.map((s) => s.id);
  const latestByStudent = new Map();
  if (studentIds.length) {
    const { data: recent } = await supabase
      .from("sessions")
      .select("id, date, status, student_id")
      .eq("tutor_id", user.id)
      .in("student_id", studentIds)
      .order("date", { ascending: false });
    for (const s of recent ?? []) {
      if (!latestByStudent.has(s.student_id)) latestByStudent.set(s.student_id, s);
    }
  }
  const students = baseStudents.map((s) => ({
    ...s,
    latestSession: latestByStudent.get(s.id) ?? null,
  }));

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
        <div className="space-y-6">
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
            description="Add a student, log a session, and Tuterly will turn your dot-point notes into a parent-ready report in seconds."
            action={
              <Link href="/dashboard/tutor/students/new">
                <Button variant="primary">Add your first student</Button>
              </Link>
            }
          />
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card p-6">
            <h3 className="text-sm font-semibold tracking-tight">
              Getting started
            </h3>
            <ol className="mt-3 space-y-2.5">
              <Step
                n={1}
                title="Add a student"
                desc="Name, year level, school. Set their working level if they're ahead or behind."
              />
              <Step
                n={2}
                title="Log a session"
                desc="Date, duration, and notes. Snap photos of the working or upload an audio recording — Tuterly will read both."
              />
              <Step
                n={3}
                title="Generate the report"
                desc="One click. Review, edit if needed, then email a PDF to the parent."
              />
              <Step
                n={4}
                title="Invite the parent (and student)"
                desc="They'll get their own account to view reports, track progress, and flag tricky questions."
              />
            </ol>
          </div>
        </div>
      ) : (
        <StudentSearchList students={students} />
      )}
    </div>
  );
}

function Step({ n, title, desc }) {
  return (
    <li className="flex gap-3">
      <span className="shrink-0 h-6 w-6 rounded-full bg-brand-pale text-brand-foreground text-xs font-semibold flex items-center justify-center mt-0.5">
        {n}
      </span>
      <span className="text-sm">
        <span className="font-medium">{title}.</span>{" "}
        <span className="text-muted">{desc}</span>
      </span>
    </li>
  );
}

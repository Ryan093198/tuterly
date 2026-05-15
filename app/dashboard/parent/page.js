import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import EmptyState from "@/components/ui/EmptyState";
import AddChildButton from "@/components/AddChildButton";
import ParentActivityFeed from "@/components/ParentActivityFeed";
import {
  fetchTutorsForStudents,
  tutoringSummary,
} from "@/lib/tutoring-summary";
import { fetchParentActivity } from "@/lib/parent-activity";

// Parent dashboard. Two-zone layout:
//   1. Children strip up top — compact entry points; each card opens
//      that child's detail page where reports + practice + flags live.
//   2. Recent activity feed below — chronological stream of new
//      reports, flagged questions, and worksheets across every child.
//      This is the reason the parent comes back: "what's new since I
//      last looked?" — a single glance answers it without drilling.
//
// No payments / credits during internal testing.

export default async function ParentDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: students } = await supabase
    .from("students")
    .select(
      "id, first_name, last_name, year_level, working_level, school, subject"
    )
    .eq("parent_id", user.id)
    .order("first_name");

  const studentList = students ?? [];
  const studentIds = studentList.map((s) => s.id);

  const [tutorsByStudent, events] = studentIds.length
    ? await Promise.all([
        fetchTutorsForStudents(studentIds),
        fetchParentActivity(supabase, user.id, studentList),
      ])
    : [new Map(), []];

  return (
    <div className="px-4 sm:px-8 py-6 sm:py-10 max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight font-grotesk">
            Parent&apos;s Dashboard
          </h1>
          <p className="text-sm text-muted mt-1">
            {studentList.length === 0
              ? "Add your child to start generating worksheets and lesson plans straight away."
              : "What's new across your children's tutoring."}
          </p>
        </div>
        {studentList.length > 0 && <AddChildButton />}
      </header>

      {studentList.length === 0 ? (
        <EmptyState
          icon={<HeartIcon />}
          title="Add your child to get started"
          description="Once they're added, you can generate practice worksheets and lesson plans for them straight away. If a tutor invites you later, their sessions will plug into the same record."
          action={<AddChildButton variant="primary" label="Add your child" />}
        />
      ) : (
        <>
          {/* CHILDREN STRIP */}
          <section className="space-y-3">
            <h2 className="text-[11px] uppercase tracking-wider text-muted font-medium">
              Your children
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {studentList.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/dashboard/parent/students/${s.id}`}
                    className="flex items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card p-3 hover:border-brand/40 hover:shadow-sm transition"
                  >
                    <Avatar name={`${s.first_name} ${s.last_name}`} />
                    <div className="min-w-0">
                      <p className="font-medium truncate text-sm">
                        {s.first_name} {s.last_name}
                      </p>
                      <p className="text-[11px] text-muted truncate">
                        {tutoringSummary(s, tutorsByStudent.get(s.id))}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* ACTIVITY FEED */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight font-grotesk">
              Recent activity
            </h2>
            <ParentActivityFeed events={events} />
          </section>
        </>
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

function HeartIcon() {
  return (
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
      <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10z" />
    </svg>
  );
}

import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";
import AddChildButton from "@/components/AddChildButton";
// BuyCreditsPanel intentionally not imported while we're in internal
// testing — the product is free for now, so parents shouldn't see a
// "buy session credits" CTA. The component + the underlying
// /api/payments/purchase-pack route still exist; flip the import + the
// render below back on when paid mode is ready.
// import BuyCreditsPanel from "@/components/BuyCreditsPanel";
import {
  fetchTutorsForStudents,
  tutoringSummary,
} from "@/lib/tutoring-summary";
import { isReportUnreadByParent } from "@/lib/report-status";

export default async function ParentDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: students } = await supabase
    .from("students")
    .select("id, first_name, last_name, year_level, working_level, school, subject")
    .eq("parent_id", user.id)
    .order("first_name");

  const studentIds = (students ?? []).map((s) => s.id);

  // The latest-reports query and the tutors-per-student query don't
  // depend on each other, so fire them in parallel — saves a Supabase
  // round trip on every dashboard load.
  let latestByStudent = new Map();
  let tutorsByStudent = new Map();
  if (studentIds.length) {
    const [latestRes, tutorsRes] = await Promise.all([
      supabase
        .from("reports")
        .select(
          "id, sent_at, parent_viewed_at, updated_at, created_at, sessions(student_id, date)"
        )
        .in("sessions.student_id", studentIds)
        .order("created_at", { ascending: false }),
      fetchTutorsForStudents(studentIds),
    ]);
    for (const r of latestRes.data ?? []) {
      const sid = r.sessions?.student_id;
      if (sid && !latestByStudent.has(sid)) latestByStudent.set(sid, r);
    }
    tutorsByStudent = tutorsRes;
  }

  // Credit balance + pack catalogue used to live here for the
  // BuyCreditsPanel. Re-enable when the payment system goes live.

  return (
    <div className="px-6 sm:px-8 py-8 sm:py-10 max-w-5xl mx-auto animate-fade-in-up">
      <header className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Your children</h1>
          <p className="text-sm text-muted mt-1">
            {students?.length === 0
              ? "Add your child to start generating worksheets and lesson plans straight away."
              : "Open a child to see their reports and progress, or add another."}
          </p>
        </div>
        {students?.length > 0 && <AddChildButton />}
      </header>

      {/* BuyCreditsPanel hidden during internal testing — product is
          free for now. Restore the import + render when paid mode flips
          back on. */}

      {students?.length === 0 ? (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card p-8 sm:p-10 text-center space-y-4">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-brand-pale text-brand-dark flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10z" />
            </svg>
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-lg font-semibold tracking-tight">Add your child to get started</h2>
            <p className="text-sm text-muted leading-relaxed">
              Once they&apos;re added, you can generate practice worksheets and lesson plans for them straight away. If a tutor invites you later, their sessions will plug into the same record.
            </p>
          </div>
          <div className="flex justify-center">
            <AddChildButton variant="primary" label="Add your child" />
          </div>
        </div>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-4">
          {students.map((s) => {
            const latest = latestByStudent.get(s.id);
            return (
              <li key={s.id}>
                <Link
                  href={`/dashboard/parent/students/${s.id}`}
                  className="group block h-full"
                >
                  <Card className="h-full p-6 transition group-hover:border-brand/40 group-hover:shadow-md">
                    <div className="flex items-start gap-4">
                      <Avatar name={`${s.first_name} ${s.last_name}`} />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold tracking-tight text-lg">
                          {s.first_name} {s.last_name}
                        </div>
                        <div className="text-xs text-muted mt-0.5 truncate">
                          {tutoringSummary(s, tutorsByStudent.get(s.id))}
                        </div>
                        <div className="text-[11px] text-muted/70 mt-0.5 truncate">
                          {s.year_level}
                          {s.working_level && s.working_level !== s.year_level
                            ? ` · ${s.working_level}`
                            : ""}
                          {s.school ? ` · ${s.school}` : ""}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                      {latest ? (
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-xs">
                            <div className="text-muted">Latest report</div>
                            <div className="font-medium mt-0.5">
                              {new Date(latest.sessions.date).toLocaleDateString(
                                "en-AU",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </div>
                          </div>
                          {isReportUnreadByParent(latest) ? (
                            <Badge tone="brand">New</Badge>
                          ) : (
                            <Badge tone="neutral">Viewed</Badge>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-muted">
                          No reports yet — check back after the next session.
                        </p>
                      )}
                    </div>
                  </Card>
                </Link>
              </li>
            );
          })}
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
    <div className="h-12 w-12 shrink-0 rounded-full bg-brand-pale text-brand-foreground flex items-center justify-center text-base font-semibold">
      {initials}
    </div>
  );
}

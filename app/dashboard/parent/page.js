import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";

export default async function ParentDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: students } = await supabase
    .from("students")
    .select("id, first_name, last_name, year_level, working_level, school")
    .eq("parent_id", user.id)
    .order("first_name");

  // Fetch latest sent report per student (best-effort).
  const studentIds = (students ?? []).map((s) => s.id);
  let latestByStudent = new Map();
  if (studentIds.length) {
    const { data: latestReports } = await supabase
      .from("reports")
      .select(
        "id, sent_at, parent_viewed_at, sessions(student_id, date)"
      )
      .in(
        "sessions.student_id",
        studentIds
      )
      .not("sent_at", "is", null)
      .order("sent_at", { ascending: false });
    for (const r of latestReports ?? []) {
      const sid = r.sessions?.student_id;
      if (sid && !latestByStudent.has(sid)) latestByStudent.set(sid, r);
    }
  }

  return (
    <div className="px-6 sm:px-8 py-8 sm:py-10 max-w-5xl mx-auto animate-fade-in-up">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Your children</h1>
        <p className="text-sm text-muted mt-1">
          {students?.length === 0
            ? "Once your tutor links you, your child's reports will appear here."
            : "Open a child to see their reports and progress."}
        </p>
      </header>

      {students?.length === 0 ? (
        <EmptyState
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10z" />
            </svg>
          }
          title="Waiting on your tutor"
          description="Your tutor will send you an invite from Tuterly. Once you accept, your child's session reports will appear here."
        />
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
                          {!latest.parent_viewed_at ? (
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

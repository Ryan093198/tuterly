import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import ProgressTracker from "@/components/ProgressTracker";
import ResourcesPanel from "@/components/ResourcesPanel";
import { signedUrlFor } from "@/app/dashboard/resource-actions";
import EmptyState from "@/components/ui/EmptyState";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default async function ParentStudentDetail({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: student } = await supabase
    .from("students")
    .select(
      "id, first_name, last_name, year_level, working_level, school, subjects"
    )
    .eq("id", id)
    .eq("parent_id", user.id)
    .single();
  if (!student) notFound();

  const [
    { data: sessions },
    { data: ratingsRaw },
    { data: rawResources },
    { count: flaggedCount },
  ] = await Promise.all([
      supabase
        .from("sessions")
        .select(
          "id, date, duration_minutes, status, reports(id, sent_at, parent_viewed_at)"
        )
        .eq("student_id", id)
        .order("date", { ascending: false }),
      supabase
        .from("ratings")
        .select("topic, subtopic, confidence, sessions(date)")
        .eq("student_id", id),
      supabase
        .from("resources")
        .select("id, name, category, notes, file_url, created_at")
        .eq("student_id", id)
        .order("created_at", { ascending: false }),
      supabase
        .from("flagged_questions")
        .select("id", { count: "exact", head: true })
        .eq("student_id", id),
    ]);

  // sessions → reports is one-to-many, so Supabase returns reports as an
  // array. Normalise to the first (most recent) report and drop sessions with
  // no report at all.
  const reportSessions = (sessions ?? [])
    .map((s) => ({
      ...s,
      report: Array.isArray(s.reports)
        ? s.reports[0] ?? null
        : s.reports ?? null,
    }))
    .filter((s) => s.report);
  const ratings = (ratingsRaw ?? [])
    .filter((r) => r.sessions)
    .map((r) => ({
      topic: r.topic,
      subtopic: r.subtopic,
      confidence: r.confidence,
      session_date: r.sessions.date,
    }));
  const resources = await Promise.all(
    (rawResources ?? []).map(async (r) => ({
      ...r,
      signed_url: r.file_url ? await signedUrlFor(r.file_url) : null,
    }))
  );

  return (
    <div className="px-6 sm:px-8 py-8 sm:py-10 max-w-4xl mx-auto space-y-10 animate-fade-in-up">
      <header className="space-y-2">
        <Link
          href="/dashboard/parent"
          className="text-sm text-muted hover:text-foreground transition"
        >
          ← All children
        </Link>
        <div className="flex items-center gap-4">
          <Avatar name={`${student.first_name} ${student.last_name}`} />
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {student.first_name} {student.last_name}
            </h1>
            <p className="text-sm text-muted mt-0.5">
              {student.year_level}
              {student.working_level && student.working_level !== student.year_level
                ? ` · working at ${student.working_level}`
                : ""}
              {student.school ? ` · ${student.school}` : ""}
            </p>
          </div>
        </div>
      </header>

      <Section label="Reports">
        {reportSessions.length ? (
          <ul className="space-y-2">
            {reportSessions.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/dashboard/parent/reports/${s.report.id}`}
                  className="block group"
                >
                  <Card className="px-5 py-4 transition group-hover:border-brand/40 group-hover:shadow-md flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium">
                        {new Date(s.date).toLocaleDateString("en-AU", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <div className="text-xs text-muted mt-0.5">
                        {s.duration_minutes} min session
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {!s.report.parent_viewed_at && <Badge tone="brand">New</Badge>}
                      <span className="text-muted group-hover:text-brand transition">
                        →
                      </span>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No reports yet"
            description="Your tutor will send the first report after your next session."
          />
        )}
      </Section>

      <Section label="Progress">
        <ProgressTracker
          student={student}
          ratings={ratings}
          flaggedCount={flaggedCount ?? 0}
          flaggedHref={`/dashboard/parent/students/${student.id}/flagged`}
        />
      </Section>

      <Section label="Resources">
        <ResourcesPanel studentId={student.id} resources={resources} />
      </Section>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <section className="space-y-3">
      <h2 className="text-[11px] uppercase tracking-wider text-muted font-medium">
        {label}
      </h2>
      {children}
    </section>
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
    <div className="h-14 w-14 shrink-0 rounded-full bg-brand-pale text-brand-foreground flex items-center justify-center text-lg font-semibold">
      {initials}
    </div>
  );
}

import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import ProgressTracker from "@/components/ProgressTracker";
import ResourcesPanel from "@/components/ResourcesPanel";
import { enrichResources } from "@/lib/resource-helpers";
import EmptyState from "@/components/ui/EmptyState";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  fetchTutorsForStudents,
  tutoringSummary,
} from "@/lib/tutoring-summary";
import { isReportUnreadByStudent } from "@/lib/report-status";

export default async function StudentDashboard({ searchParams }) {
  const sp = searchParams ? await searchParams : {};
  const requestedRecord = typeof sp.student === "string" ? sp.student : null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // A student may legitimately have multiple `students` rows linked to them
  // — when two tutors each create their own record for the same kid, the
  // student accepts both invites and ends up with one record per tutor.
  // Fetch them all and let the user switch between them via ?student=<id>.
  const { data: studentRecords } = await supabase
    .from("students")
    .select(
      "id, first_name, last_name, year_level, working_level, school, subject, subjects"
    )
    .eq("student_user_id", user.id)
    .order("created_at", { ascending: true });

  if (!studentRecords?.length) {
    return (
      <div className="px-6 sm:px-8 py-10 max-w-4xl mx-auto animate-fade-in-up">
        <EmptyState
          title="No student record linked yet"
          description="Your tutor needs to link this account to your student profile in Tuterly. Ask them to send you a fresh invite from the student page."
        />
      </div>
    );
  }

  const tutorsByStudent = await fetchTutorsForStudents(
    studentRecords.map((r) => r.id)
  );

  // Pick the requested record if it belongs to the user, otherwise fall back
  // to the first one. Querystring stays canonical between renders.
  const student =
    studentRecords.find((r) => r.id === requestedRecord) || studentRecords[0];
  const isMulti = studentRecords.length > 1;

  const [
    { data: sessions },
    { data: ratingsRaw },
    { data: rawResources },
    { count: flaggedCount },
    { data: resourceFlags },
  ] = await Promise.all([
    supabase
      .from("sessions")
      .select(
        "id, date, duration_minutes, status, reports(id, sent_at, student_viewed_at, updated_at)"
      )
      .eq("student_id", student.id)
      .order("date", { ascending: false }),
    supabase
      .from("ratings")
      .select("topic, subtopic, confidence, sessions(date)")
      .eq("student_id", student.id),
    supabase
      .from("resources")
      .select(
        "id, name, category, notes, file_url, content, metadata, created_at, uploaded_by"
      )
      .eq("student_id", student.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("flagged_questions")
      .select("id", { count: "exact", head: true })
      .eq("student_id", student.id)
      .is("understood_at", null),
    supabase
      .from("flagged_questions")
      .select("resource_id, question_number")
      .eq("student_id", student.id)
      .not("resource_id", "is", null),
  ]);

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
  const resources = await enrichResources(rawResources ?? []);

  const flagsByResource = new Map();
  for (const f of resourceFlags ?? []) {
    if (!f.resource_id) continue;
    if (!flagsByResource.has(f.resource_id)) {
      flagsByResource.set(f.resource_id, []);
    }
    flagsByResource.get(f.resource_id).push(f.question_number);
  }
  for (const r of resources) {
    if (r.category === "practice_questions") {
      r.flaggedNumbers = flagsByResource.get(r.id) ?? [];
    }
  }

  return (
    <div className="px-6 sm:px-8 py-8 sm:py-10 max-w-4xl mx-auto space-y-10 animate-fade-in-up">
      <header className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar name={`${student.first_name} ${student.last_name}`} />
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Hi, {student.first_name}
            </h1>
            <p className="text-sm text-foreground/80 mt-0.5">
              {tutoringSummary(student, tutorsByStudent.get(student.id))}
            </p>
            <p className="text-xs text-muted mt-0.5">
              {student.year_level}
              {student.working_level && student.working_level !== student.year_level
                ? ` · working at ${student.working_level}`
                : ""}
              {student.school ? ` · ${student.school}` : ""}
            </p>
          </div>
        </div>
        {isMulti && (
          <div className="flex flex-wrap gap-2">
            {studentRecords.map((r) => {
              const active = r.id === student.id;
              const tutors = tutorsByStudent.get(r.id) ?? [];
              const label = tutors.length
                ? `with ${tutors.join(", ")}`
                : "no tutor linked";
              return (
                <Link
                  key={r.id}
                  href={`/dashboard/student?student=${r.id}`}
                  className={`text-xs px-3 py-1.5 rounded-full border transition ${
                    active
                      ? "border-brand bg-brand-pale text-brand-foreground"
                      : "border-zinc-200 dark:border-zinc-800 text-muted hover:border-brand/40 hover:text-foreground"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      <Section label="Reports">
        {reportSessions.length ? (
          <ul className="space-y-2">
            {reportSessions.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/dashboard/student/reports/${s.report.id}`}
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
                      {isReportUnreadByStudent(s.report) && (
                        <Badge tone="brand">New</Badge>
                      )}
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
            description="Your reports will appear here after your next tutoring session."
          />
        )}
      </Section>

      <Section label="Progress">
        <ProgressTracker
          student={student}
          ratings={ratings}
          flaggedCount={flaggedCount ?? 0}
          flaggedHref="/dashboard/student/flagged"
        />
      </Section>

      <Section label="Your resources">
        <ResourcesPanel
          studentId={student.id}
          resources={resources}
          currentUserId={user.id}
          practiceFlagEnabled
        />
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

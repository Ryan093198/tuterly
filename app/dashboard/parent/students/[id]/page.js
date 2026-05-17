import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import ProgressTracker from "@/components/ProgressTracker";
import ResourcesPanel from "@/components/ResourcesPanel";
import PracticePanel from "@/components/PracticePanel";
import { enrichResources } from "@/lib/resource-helpers";
import { deriveWeakTopics } from "@/lib/weak-topics";
import { getTopicGroupsForLevel } from "@/lib/curriculum-topics";
import {
  fetchTutorsForStudents,
  tutoringSummary,
} from "@/lib/tutoring-summary";
import EmptyState from "@/components/ui/EmptyState";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import SubmitButton from "@/components/ui/SubmitButton";
import { isReportUnreadByParent } from "@/lib/report-status";
import {
  inviteTutor,
  inviteStudent,
} from "@/app/dashboard/tutor/students/invite-actions";

export default async function ParentStudentDetail({ params, searchParams }) {
  const { id } = await params;
  const sp = searchParams ? await searchParams : {};
  const autoOpenResourceId = typeof sp.resource === "string" ? sp.resource : null;
  const autoOpenFlag = typeof sp.flag === "string" ? sp.flag : null;
  // Dashboard "suggested practice" chips link here with these params
  // so PracticePanel can auto-open the modal pre-filled with the topic.
  const initialPracticeTopic =
    typeof sp.practice_topic === "string"
      ? {
          topic: sp.practice_topic,
          subtopic:
            typeof sp.practice_subtopic === "string"
              ? sp.practice_subtopic
              : "",
        }
      : null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: student } = await supabase
    .from("students")
    .select(
      "id, first_name, last_name, year_level, working_level, school, subject, subjects, student_user_id"
    )
    .eq("id", id)
    .eq("parent_id", user.id)
    .single();
  if (!student) notFound();

  // Pull everything we need in one parallel wave. Profiles need the
  // admin client because RLS hides other users' rows from the parent;
  // invites are user-scoped (RLS exposes invites where from_user_id =
  // auth.uid()) so they can use the regular client.
  const admin = createAdminClient();
  const [
    { data: studentProfile },
    { data: pendingTutorInvite },
    { data: pendingStudentInvite },
    { data: sessions },
    { data: ratingsRaw },
    { data: rawResources },
    { count: flaggedCount },
    { data: openFlags },
    { data: resourceFlags },
    tutorsByStudent,
  ] = await Promise.all([
    student.student_user_id
      ? admin
          .from("profiles")
          .select("full_name, email")
          .eq("id", student.student_user_id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
    supabase
      .from("invites")
      .select("to_email, created_at")
      .eq("student_id", student.id)
      .eq("from_user_id", user.id)
      .eq("role", "tutor")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("invites")
      .select("to_email, created_at")
      .eq("student_id", student.id)
      .eq("from_user_id", user.id)
      .eq("role", "student")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("sessions")
      .select(
        "id, date, duration_minutes, status, reports(id, sent_at, parent_viewed_at, updated_at)"
      )
      .eq("student_id", id)
      .order("date", { ascending: false }),
    supabase
      .from("ratings")
      .select("topic, subtopic, confidence, sessions(date)")
      .eq("student_id", id),
    supabase
      .from("resources")
      .select(
        "id, name, category, notes, file_url, content, metadata, created_at, uploaded_by"
      )
      .eq("student_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("flagged_questions")
      .select("id", { count: "exact", head: true })
      .eq("student_id", id)
      .is("understood_at", null),
    // Topics of unresolved flags drive the second source for the practice
    // panel suggestions. Same student-scoped policy as the count query.
    supabase
      .from("flagged_questions")
      .select("topic")
      .eq("student_id", id)
      .is("understood_at", null),
    // Practice-worksheet flags, used to pre-populate the flag state on
    // each worksheet when the parent opens it.
    supabase
      .from("flagged_questions")
      .select("resource_id, question_number")
      .eq("student_id", id)
      .not("resource_id", "is", null),
    fetchTutorsForStudents([id]),
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
  const resources = await enrichResources(rawResources ?? []);

  // Attach flagged question numbers to practice worksheets so the viewer
  // can highlight already-flagged items without an extra round-trip.
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

  const weakTopics = deriveWeakTopics({
    ratings,
    flags: openFlags ?? [],
  });
  // Curriculum topic dropdown is anchored on the level the student is
  // currently working at (or year level if none set). The parent doesn't
  // pick a level — keeping the surface small means fewer ways to misuse it.
  const practiceLevel = student.working_level || student.year_level;
  // Pre-compute curriculum groups for both subjects so PracticeModal
  // can swap them when the parent toggles subject inside the modal —
  // otherwise switching to English keeps the maths topics visible.
  const topicsBySubject = {
    maths: getTopicGroupsForLevel(practiceLevel, "maths", student.subjects),
    english: getTopicGroupsForLevel(practiceLevel, "english", student.subjects),
  };

  // Tutor name for the subhead — disambiguates the duplicate-record case
  // when the parent's child appears under more than one tutor.
  const tutoringLine = tutoringSummary(student, tutorsByStudent.get(student.id));

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
            <p className="text-sm text-foreground/80 mt-0.5">{tutoringLine}</p>
            <p className="text-xs text-muted mt-0.5">
              {student.year_level}
              {student.working_level && student.working_level !== student.year_level
                ? ` · working at ${student.working_level}`
                : ""}
              {student.school ? ` · ${student.school}` : ""}
            </p>
          </div>
        </div>
      </header>

      <div className="grid sm:grid-cols-2 gap-4">
        <InviteSlot
          label="Tutor"
          studentId={student.id}
          inviteAction={inviteTutor}
          linkedTutors={tutorsByStudent.get(student.id) ?? []}
          pendingInvite={pendingTutorInvite}
          placeholder="tutor@example.com"
          inviteLabel="Invite tutor"
          unlinkedHelp="Invite the tutor your child is working with so their session reports land here."
        />
        <InviteSlot
          label="Student"
          studentId={student.id}
          inviteAction={inviteStudent}
          linkedProfile={studentProfile}
          pendingInvite={pendingStudentInvite}
          placeholder="student@example.com"
          inviteLabel="Invite student"
          unlinkedHelp="Give your child their own login so they can see their reports and flag tricky questions."
        />
      </div>

      <Section label="Reports">
        {reportSessions.length ? (
          <ul className="space-y-2 max-h-130 overflow-y-auto pr-1 -mr-1">
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
                      {isReportUnreadByParent(s.report) && <Badge tone="brand">New</Badge>}
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
            description="Reports appear here after each tutoring session."
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

      <Section label="Practice">
        <PracticePanel
          key={
            initialPracticeTopic
              ? `practice-${initialPracticeTopic.topic}|${initialPracticeTopic.subtopic ?? ""}`
              : "practice"
          }
          student={student}
          weakTopics={weakTopics}
          topicsBySubject={topicsBySubject}
          initialPracticeTopic={initialPracticeTopic}
        />
      </Section>

      <Section label="Resources">
        <ResourcesPanel
          studentId={student.id}
          resources={resources}
          currentUserId={user.id}
          autoOpenResourceId={autoOpenResourceId}
          autoOpenFlag={autoOpenFlag}
          practiceFlagEnabled
          practiceRegenerateEnabled
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

// Per-role invite slot for the parent's per-student page. Three states:
//   linked     — show name + Linked badge
//   pending    — show "invite sent" + the email it went to
//   empty      — show the invite form
//
// `linkedTutors` is an array because a student can have multiple
// tutors (eg. maths + english); we render the first as primary and a
// "+N more" note. `linkedProfile` is the singular student-account
// profile (a student record points at exactly one auth user).
function InviteSlot({
  label,
  studentId,
  inviteAction,
  linkedTutors,
  linkedProfile,
  pendingInvite,
  placeholder,
  inviteLabel,
  unlinkedHelp,
}) {
  const tutors = Array.isArray(linkedTutors) ? linkedTutors : [];
  const primary = linkedProfile || tutors[0] || null;
  const extraTutors = tutors.length > 1 ? tutors.length - 1 : 0;
  const initials = primary
    ? (primary.full_name || primary.email || "?")
        .split(/\s+/)
        .map((p) => p[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : null;

  return (
    <section className="space-y-2">
      <h2 className="text-[11px] uppercase tracking-wider text-muted font-medium">
        {label}
      </h2>
      {primary ? (
        <Card className="p-4 h-full">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-brand-pale text-brand-foreground flex items-center justify-center text-sm font-semibold shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium truncate">
                {primary.full_name || primary.email}
              </div>
              {primary.full_name && (
                <div className="text-sm text-muted truncate">
                  {primary.email}
                </div>
              )}
              {extraTutors > 0 && (
                <div className="text-xs text-muted mt-0.5">
                  +{extraTutors} other tutor{extraTutors === 1 ? "" : "s"}
                </div>
              )}
            </div>
            <Badge tone="success" className="ml-auto shrink-0">
              Linked
            </Badge>
          </div>
        </Card>
      ) : pendingInvite ? (
        <Card className="p-4 border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 space-y-2 h-full">
          <div className="flex items-center justify-between gap-2">
            <Badge tone="warning">Invite sent</Badge>
            <span className="text-[11px] text-muted">
              {new Date(pendingInvite.created_at).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
          <p className="text-sm text-foreground/80 truncate">
            Sent to <span className="font-medium">{pendingInvite.to_email}</span>
          </p>
          <p className="text-xs text-muted leading-snug">
            They&apos;ll appear here once they accept the email link.
          </p>
        </Card>
      ) : (
        <Card className="p-4 space-y-3 h-full">
          <p className="text-xs text-muted leading-snug">{unlinkedHelp}</p>
          <form
            action={inviteAction}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input type="hidden" name="student_id" value={studentId} />
            <input
              required
              type="email"
              name="email"
              placeholder={placeholder}
              className="flex-1 h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition min-w-0"
            />
            <SubmitButton variant="primary" size="sm" pendingLabel="Sending…">
              {inviteLabel}
            </SubmitButton>
          </form>
        </Card>
      )}
    </section>
  );
}

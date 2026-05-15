import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import TutorStudentList from "@/components/TutorStudentList";

// Tutor dashboard. Three-zone layout designed so a tutor checking on
// their phone Sunday night can answer two questions in five seconds:
//   1. How many reports do I still owe this week?
//   2. Which students don't have one yet?
//
// Top stats bar shows this-week / this-month / this-year totals.
// Per-student weekly status list takes up the bulk of the page. Quick
// actions are below the fold for the deliberate "log a new session"
// path. No payments, no scheduling, no performance metrics — those
// come in later phases.

export default async function TutorDashboard({ searchParams }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Roster — fetch first because if there are no students every other
  // query is moot and we render the new-tutor onboarding flow.
  const { data: links } = await supabase
    .from("tutor_students")
    .select(
      "students(id, first_name, last_name, year_level, working_level, subject, school)"
    )
    .eq("tutor_id", user.id)
    .eq("status", "active");
  const students = (links ?? [])
    .map((l) => l.students)
    .filter(Boolean)
    .sort((a, b) =>
      (a.first_name || "").localeCompare(b.first_name || "", "en", {
        sensitivity: "base",
      })
    );

  if (students.length === 0) {
    return <NewTutorOnboarding />;
  }

  // Resolve the week the page is showing. ?week=YYYY-MM-DD picks a
  // specific Monday so the prev/next arrows work via plain links;
  // missing or invalid → snap to the Monday of today.
  const sp = searchParams ? await searchParams : {};
  const weekStart = mondayOf(parseIsoDate(sp?.week) ?? new Date());
  const weekEnd = addDays(weekStart, 6);
  const isCurrentWeek = sameDay(weekStart, mondayOf(new Date()));

  // One sessions query covers everything: this-week per-student status,
  // month totals, year totals. Joined report row tells us if the
  // session has a report — used for "Report sent" vs "No report yet"
  // and for the headline "X reports submitted this week" stat.
  const yearStart = new Date(weekStart.getFullYear(), 0, 1);
  const { data: rawSessions } = await supabase
    .from("sessions")
    .select(
      "id, date, duration_minutes, student_id, status, reports(id, sent_at, created_at)"
    )
    .eq("tutor_id", user.id)
    .gte("date", toIso(yearStart))
    .order("date", { ascending: false });

  // Normalise: reports comes back as an array (sessions → reports is
  // one-to-many, even though we enforce uniqueness in practice).
  const sessions = (rawSessions ?? []).map((s) => ({
    id: s.id,
    date: s.date,
    duration_minutes: s.duration_minutes ?? 60,
    student_id: s.student_id,
    status: s.status,
    report: Array.isArray(s.reports) ? s.reports[0] ?? null : s.reports ?? null,
  }));

  // Buckets.
  const weekRange = (s) =>
    isoBetween(s.date, toIso(weekStart), toIso(weekEnd));
  const monthRange = (s) => {
    const d = new Date(s.date + "T00:00:00");
    const today = new Date();
    return (
      d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()
    );
  };

  const weekSessions = sessions.filter(weekRange);
  const weekReports = weekSessions.filter((s) => s.report);
  const monthSessions = sessions.filter(monthRange);
  const yearSessions = sessions;

  const sumHours = (arr) =>
    arr.reduce((acc, s) => acc + (s.duration_minutes ?? 60) / 60, 0);
  const weekHours = sumHours(weekReports);
  const monthHours = sumHours(monthSessions);
  const yearHours = sumHours(yearSessions);

  // Per-student status for the selected week. Latest report-bearing
  // session in the range wins (a kid might have two sessions in a
  // week, only one with a report — the report is what we care about).
  const reportByStudentThisWeek = new Map();
  for (const s of weekSessions) {
    if (s.report && !reportByStudentThisWeek.has(s.student_id)) {
      reportByStudentThisWeek.set(s.student_id, s);
    }
  }
  const reportsDoneThisWeek = reportByStudentThisWeek.size;
  const studentsWithoutReport = students.filter(
    (st) => !reportByStudentThisWeek.has(st.id)
  );

  const prevWeek = toIso(addDays(weekStart, -7));
  const nextWeek = toIso(addDays(weekStart, 7));

  // Open flagged-question count for the follow-up banner. One short
  // count query — the full list is fetched on /dashboard/tutor/flagged.
  const studentIds = students.map((s) => s.id);
  let openFlagCount = 0;
  if (studentIds.length > 0) {
    const { count } = await supabase
      .from("flagged_questions")
      .select("id", { count: "exact", head: true })
      .in("student_id", studentIds)
      .is("understood_at", null);
    openFlagCount = count ?? 0;
  }

  return (
    <div className="px-4 sm:px-8 py-6 sm:py-10 max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight font-grotesk">
          Tutor&apos;s Dashboard
        </h1>
      </header>

      {studentsWithoutReport.length > 0 && isCurrentWeek && (
        <div
          className="flex items-start gap-3 rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 px-4 py-3"
          role="status"
        >
          <span aria-hidden="true" className="text-lg leading-none">⚠️</span>
          <div className="text-sm">
            <span className="font-medium text-amber-900 dark:text-amber-200">
              {`${studentsWithoutReport.length} student${studentsWithoutReport.length === 1 ? "" : "s"} ${studentsWithoutReport.length === 1 ? "hasn't" : "haven't"} received a report this week`}
            </span>
            <span className="text-amber-800/80 dark:text-amber-200/70 ml-1">
              · scroll down to submit notes
            </span>
          </div>
        </div>
      )}

      {openFlagCount > 0 && (
        <Link
          href="/dashboard/tutor/flagged"
          className="flex items-start gap-3 rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 px-4 py-3 hover:border-rose-300 dark:hover:border-rose-800/60 transition"
        >
          <span aria-hidden="true" className="text-lg leading-none">🚩</span>
          <div className="text-sm flex-1">
            <span className="font-medium text-rose-900 dark:text-rose-200">
              {openFlagCount} question{openFlagCount === 1 ? "" : "s"} flagged
              for follow-up
            </span>
            <span className="text-rose-800/80 dark:text-rose-200/70 ml-1">
              · prep these before next session
            </span>
          </div>
          <span aria-hidden="true" className="text-rose-700 dark:text-rose-300">
            →
          </span>
        </Link>
      )}

      {/* TOP STATS BAR */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard
          label="This week"
          primary={`${weekReports.length} report${weekReports.length === 1 ? "" : "s"} submitted`}
          secondary={`${formatHours(weekHours)} of teaching`}
          href={`/dashboard/tutor/activity?range=week&week=${toIso(weekStart)}`}
          accent
        />
        <StatCard
          label="This month"
          primary={`${monthSessions.length} session${monthSessions.length === 1 ? "" : "s"} completed`}
          secondary={`${formatHours(monthHours)} of teaching`}
          href="/dashboard/tutor/activity?range=month"
        />
        <StatCard
          label="This year"
          primary={`${yearSessions.length} session${yearSessions.length === 1 ? "" : "s"} completed`}
          secondary={`${formatHours(yearHours)} of teaching`}
          href="/dashboard/tutor/activity?range=year"
        />
      </section>

      {/* MY STUDENTS */}
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-xl font-semibold tracking-tight font-grotesk">
              My students <span className="text-muted font-normal">({students.length})</span>
            </h2>
            <p className="text-sm text-muted mt-1">
              {reportsDoneThisWeek} of {students.length} report
              {students.length === 1 ? "" : "s"} done this week
            </p>
          </div>
          <Link href="/dashboard/tutor/students/new">
            <Button variant="primary" size="md">
              <span aria-hidden="true">+</span> Add student
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Link
            href={`/dashboard/tutor?week=${prevWeek}`}
            aria-label="Previous week"
            className="h-8 w-8 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-surface-soft transition"
          >
            ‹
          </Link>
          <span className="font-medium">
            This week ({formatShortDate(weekStart)} – {formatShortDate(weekEnd)})
          </span>
          <Link
            href={`/dashboard/tutor?week=${nextWeek}`}
            aria-label="Next week"
            className={`h-8 w-8 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center transition ${isCurrentWeek ? "opacity-40 pointer-events-none" : "hover:bg-surface-soft"}`}
            aria-disabled={isCurrentWeek}
          >
            ›
          </Link>
          {!isCurrentWeek && (
            <Link
              href="/dashboard/tutor"
              className="ml-2 text-xs text-brand font-medium hover:underline"
            >
              Jump to current week
            </Link>
          )}
        </div>

        <TutorStudentList
          rows={students.map((s) => {
            const reportSession = reportByStudentThisWeek.get(s.id);
            return {
              id: s.id,
              name: `${s.first_name ?? ""} ${s.last_name ?? ""}`.trim(),
              meta:
                [s.working_level || s.year_level, subjectLabel(s.subject)]
                  .filter(Boolean)
                  .join(" · ") || null,
              hasReport: !!reportSession,
              reportDateLabel: reportSession
                ? formatShortDate(reportSession.date)
                : null,
              detailHref: `/dashboard/tutor/students/${s.id}`,
              submitNotesHref: `/dashboard/tutor/session/new?student=${s.id}`,
            };
          })}
        />
      </section>

      {/* QUICK ACTIONS */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <QuickAction
          href="/dashboard/tutor/session/new"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
          }
          title="Submit notes for a student"
          desc="Log a new session and generate the report."
        />
        <QuickAction
          href="/dashboard/tutor/flagged"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 21V4M4 4h12l-2 4 2 4H4" /></svg>
          }
          title="Needs follow-up"
          desc={
            openFlagCount === 0
              ? "Nothing flagged right now."
              : `${openFlagCount} question${openFlagCount === 1 ? "" : "s"} to walk through.`
          }
        />
        <QuickAction
          href="/dashboard/tutor/resources"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
          }
          title="View past reports"
          desc="Browse every report you've generated."
        />
      </section>
    </div>
  );
}

function StatCard({ label, primary, secondary, href, accent = false }) {
  const base = `rounded-2xl border p-4 sm:p-5 transition ${
    accent
      ? "border-brand/30 bg-brand-pale/40"
      : "border-zinc-200 dark:border-zinc-800 bg-card"
  } ${href ? "hover:border-brand/40 hover:shadow-sm cursor-pointer" : ""}`;
  const body = (
    <>
      <p className="text-[10px] uppercase tracking-wider text-muted font-semibold">
        {label}
      </p>
      <p
        className={`mt-1 text-lg sm:text-xl font-semibold tracking-tight ${
          accent ? "text-brand-dark" : ""
        } font-grotesk`}
      >
        {primary}
      </p>
      <p className="text-xs text-muted mt-1">{secondary}</p>
    </>
  );
  return href ? (
    <Link href={href} className={`block ${base}`}>
      {body}
    </Link>
  ) : (
    <div className={base}>{body}</div>
  );
}

function QuickAction({ href, icon, title, desc }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card p-4 sm:p-5 hover:border-brand/40 hover:bg-brand-pale/20 transition"
    >
      <div className="h-10 w-10 rounded-xl bg-brand-pale text-brand-dark flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-medium truncate">{title}</p>
        <p className="text-xs text-muted mt-0.5 truncate">{desc}</p>
      </div>
    </Link>
  );
}

function NewTutorOnboarding() {
  return (
    <div className="px-6 sm:px-8 py-8 sm:py-10 max-w-5xl mx-auto animate-fade-in-up space-y-6">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight font-grotesk">
            Tutor&apos;s Dashboard
          </h1>
          <p className="text-sm text-muted mt-1">
            Add your first student to get started.
          </p>
        </div>
        <Link href="/dashboard/tutor/students/new">
          <Button variant="primary" size="md">
            <span aria-hidden="true">+</span> Add student
          </Button>
        </Link>
      </header>
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
          <Step n={1} title="Add a student" desc="Name, year level, school." />
          <Step
            n={2}
            title="Log a session"
            desc="Date, duration, and notes. Snap photos of the working too."
          />
          <Step
            n={3}
            title="Generate the report"
            desc="One click. Review, edit if needed, send to the parent."
          />
          <Step
            n={4}
            title="Invite the parent"
            desc="They'll get their own account to view reports + flag tricky questions."
          />
        </ol>
      </div>
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

// ── Date helpers ────────────────────────────────────────────────────
function parseIsoDate(value) {
  if (typeof value !== "string") return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const d = new Date(`${value}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}
function mondayOf(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0 (Sun) – 6 (Sat)
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}
function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}
function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function toIso(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
function isoBetween(value, startIso, endIso) {
  return typeof value === "string" && value >= startIso && value <= endIso;
}
function formatShortDate(date) {
  const d = typeof date === "string" ? new Date(date + "T00:00:00") : date;
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short" });
}
function formatHours(hours) {
  // 1 dp, drop trailing .0
  const rounded = Math.round(hours * 10) / 10;
  const str = rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1);
  return `${str} ${hours === 1 ? "hour" : "hours"}`;
}
function subjectLabel(raw) {
  if (raw === "english") return "English";
  if (raw === "maths") return "Maths";
  return raw ?? null;
}

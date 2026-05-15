import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import EmptyState from "@/components/ui/EmptyState";
import ActivityRowDelete from "@/components/ActivityRowDelete";

// A flat list of every session in a chosen range — reached by clicking
// a stat card on the tutor dashboard. The point of this page is fast
// triage when something looks wrong: see the rows, open one to edit,
// or hit delete to remove a duplicate.
//
// Range comes in via ?range=week|month|year. `week` also takes
// ?week=YYYY-MM-DD to pin a specific Monday (so the dashboard's "this
// week" card can drill into the same week the tutor was looking at).

export default async function TutorActivity({ searchParams }) {
  const sp = searchParams ? await searchParams : {};
  const range = ["week", "month", "year"].includes(sp?.range)
    ? sp.range
    : "week";
  const weekParam = parseIsoDate(sp?.week);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const today = new Date();
  let startDate;
  let endDate;
  let rangeLabel;
  if (range === "year") {
    startDate = new Date(today.getFullYear(), 0, 1);
    endDate = new Date(today.getFullYear(), 11, 31);
    rangeLabel = `${today.getFullYear()}`;
  } else if (range === "month") {
    startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    rangeLabel = today.toLocaleDateString("en-AU", {
      month: "long",
      year: "numeric",
    });
  } else {
    const monday = mondayOf(weekParam ?? today);
    startDate = monday;
    endDate = addDays(monday, 6);
    rangeLabel = `${formatShortDate(startDate)} – ${formatShortDate(endDate)}`;
  }

  const { data: rawSessions } = await supabase
    .from("sessions")
    .select(
      "id, date, duration_minutes, status, student_id, students(id, first_name, last_name, subject), reports(id, sent_at, created_at)"
    )
    .eq("tutor_id", user.id)
    .gte("date", toIso(startDate))
    .lte("date", toIso(endDate))
    .order("date", { ascending: false });

  const sessions = (rawSessions ?? []).map((s) => {
    const st = Array.isArray(s.students) ? s.students[0] : s.students;
    const r = Array.isArray(s.reports) ? s.reports[0] : s.reports;
    return {
      id: s.id,
      date: s.date,
      duration_minutes: s.duration_minutes ?? 60,
      status: s.status,
      studentId: st?.id ?? s.student_id,
      studentName: st
        ? `${st.first_name ?? ""} ${st.last_name ?? ""}`.trim() || "Student"
        : "Student",
      reportId: r?.id ?? null,
    };
  });

  const totalHours = sessions.reduce(
    (acc, s) => acc + (s.duration_minutes ?? 60) / 60,
    0
  );
  const reportsSubmitted = sessions.filter((s) => s.reportId).length;

  const returnHref =
    range === "week" && weekParam
      ? `/dashboard/tutor/activity?range=week&week=${toIso(weekParam)}`
      : `/dashboard/tutor/activity?range=${range}`;

  return (
    <div className="px-4 sm:px-8 py-6 sm:py-10 max-w-4xl mx-auto space-y-6 animate-fade-in-up">
      <div>
        <Link
          href="/dashboard/tutor"
          className="text-sm text-muted hover:text-foreground transition"
        >
          ← Dashboard
        </Link>
      </div>

      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight font-grotesk">
          {rangeTitle(range)}
        </h1>
        <p className="text-sm text-muted">
          {rangeLabel} · {sessions.length} session
          {sessions.length === 1 ? "" : "s"} · {reportsSubmitted} report
          {reportsSubmitted === 1 ? "" : "s"} · {formatHours(totalHours)}
        </p>
      </header>

      <RangeTabs current={range} weekParam={weekParam} />

      {sessions.length === 0 ? (
        <EmptyState
          title="Nothing logged yet"
          description="When you submit notes for a session in this range it'll appear here."
        />
      ) : (
        <ul className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card divide-y divide-zinc-100 dark:divide-zinc-900">
          {sessions.map((s) => (
            <li
              key={s.id}
              className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-5 sm:py-4"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{s.studentName}</p>
                <p className="text-xs text-muted mt-0.5">
                  {formatLongDate(s.date)} · {formatHours(s.duration_minutes / 60)}{" "}
                  ·{" "}
                  {s.reportId ? (
                    <span className="text-emerald-700 dark:text-emerald-400">
                      Report submitted
                    </span>
                  ) : (
                    <span className="text-amber-700 dark:text-amber-400">
                      No report yet
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href={`/dashboard/tutor/session/${s.id}`}
                  className="text-xs font-medium text-brand hover:underline whitespace-nowrap"
                >
                  Open / edit →
                </Link>
                <ActivityRowDelete
                  sessionId={s.id}
                  sessionDate={s.date}
                  studentName={s.studentName}
                  returnHref={returnHref}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function rangeTitle(range) {
  if (range === "year") return "This year";
  if (range === "month") return "This month";
  return "This week";
}

function RangeTabs({ current, weekParam }) {
  const weekHref =
    weekParam && current !== "week"
      ? `/dashboard/tutor/activity?range=week&week=${toIso(weekParam)}`
      : "/dashboard/tutor/activity?range=week";
  const tabs = [
    { key: "week", label: "Week", href: weekHref },
    { key: "month", label: "Month", href: "/dashboard/tutor/activity?range=month" },
    { key: "year", label: "Year", href: "/dashboard/tutor/activity?range=year" },
  ];
  return (
    <div className="inline-flex rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card p-1 text-sm">
      {tabs.map((t) => {
        const active = t.key === current;
        return (
          <Link
            key={t.key}
            href={t.href}
            className={`px-3 py-1.5 rounded-lg transition ${
              active
                ? "bg-brand-pale text-brand-dark font-medium"
                : "text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}

// ── Date helpers (mirrors the dashboard) ───────────────────────────
function parseIsoDate(value) {
  if (typeof value !== "string") return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const d = new Date(`${value}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}
function mondayOf(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}
function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}
function toIso(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
function formatShortDate(date) {
  const d = typeof date === "string" ? new Date(date + "T00:00:00") : date;
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short" });
}
function formatLongDate(date) {
  const d = typeof date === "string" ? new Date(date + "T00:00:00") : date;
  return d.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
function formatHours(hours) {
  const rounded = Math.round(hours * 10) / 10;
  const str = rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1);
  return `${str} ${hours === 1 ? "hour" : "hours"}`;
}

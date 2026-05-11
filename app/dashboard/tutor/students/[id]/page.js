import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import {
  inviteParent,
  inviteStudent,
  resendInvite,
  cancelInvite,
} from "../invite-actions";
import {
  updateInviteEmail,
  requestParentEmailChange,
} from "../parent-actions";
import { createAdminClient } from "@/lib/supabase-admin";
import { enrichResources } from "@/lib/resource-helpers";
import ProgressTracker from "@/components/ProgressTracker";
import ResourcesPanel from "@/components/ResourcesPanel";
import StudentEditor from "@/components/StudentEditor";
import DeleteStudentButton from "@/components/DeleteStudentButton";
import Card from "@/components/ui/Card";
import SubmitButton from "@/components/ui/SubmitButton";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";
import {
  SESSION_STATUS_LABEL,
  SESSION_STATUS_TONE,
} from "@/lib/session-status";

export default async function StudentDetail({ params, searchParams }) {
  const { id } = await params;
  const sp = searchParams ? await searchParams : {};
  const autoOpenResourceId = typeof sp.resource === "string" ? sp.resource : null;
  const autoOpenFlag = typeof sp.flag === "string" ? sp.flag : null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: student } = await supabase
    .from("students")
    .select(
      "id, first_name, last_name, year_level, working_level, school, subject, subjects, goals, concerns, parent_id, student_user_id"
    )
    .eq("id", id)
    .single();
  if (!student) notFound();

  // Use admin to look up linked profile rows (RLS hides other users' profiles).
  const admin = createAdminClient();

  const [
    { data: sessions },
    { data: parentProfile },
    { data: studentProfile },
    { data: pendingParentInvite },
    { data: pendingStudentInvite },
    { data: ratingsRaw },
    { data: rawResources },
  ] = await Promise.all([
    supabase
      .from("sessions")
      .select("id, date, duration_minutes, status, raw_notes")
      .eq("student_id", id)
      .eq("tutor_id", user.id)
      .order("date", { ascending: false }),
    student.parent_id
      ? admin
          .from("profiles")
          .select("full_name, email")
          .eq("id", student.parent_id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
    student.student_user_id
      ? admin
          .from("profiles")
          .select("full_name, email")
          .eq("id", student.student_user_id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
    supabase
      .from("invites")
      .select("to_email, token, created_at")
      .eq("student_id", id)
      .eq("from_user_id", user.id)
      .eq("role", "parent")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("invites")
      .select("to_email, token, created_at")
      .eq("student_id", id)
      .eq("from_user_id", user.id)
      .eq("role", "student")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("ratings")
      .select("topic, subtopic, confidence, sessions(date)")
      .eq("student_id", id),
    supabase
      .from("resources")
      .select("id, name, category, notes, file_url, content, created_at, uploaded_by")
      .eq("student_id", id)
      .order("created_at", { ascending: false }),
  ]);

  const { count: flaggedCount } = await supabase
    .from("flagged_questions")
    .select("id", { count: "exact", head: true })
    .eq("student_id", id)
    .is("understood_at", null);

  const ratings = (ratingsRaw ?? [])
    .filter((r) => r.sessions)
    .map((r) => ({
      topic: r.topic,
      subtopic: r.subtopic,
      confidence: r.confidence,
      session_date: r.sessions.date,
    }));

  const resources = await enrichResources(rawResources ?? []);

  return (
    <div className="px-4 sm:px-8 py-8 sm:py-10 max-w-4xl mx-auto space-y-10 animate-fade-in-up">
      <div className="space-y-4">
        <Link
          href="/dashboard/tutor"
          className="text-sm text-muted hover:text-foreground transition"
        >
          ← All students
        </Link>
        <StudentEditor
          student={student}
          newSessionHref={`/dashboard/tutor/session/new?student=${student.id}`}
        />
      </div>

      {(student.goals || student.concerns) && (
        <div className="grid sm:grid-cols-2 gap-3">
          {student.goals && <InfoCard title="Goals" body={student.goals} />}
          {student.concerns && (
            <InfoCard title="Concerns" body={student.concerns} />
          )}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <AccountSlot
          label="Parent"
          studentId={student.id}
          role="parent"
          inviteAction={inviteParent}
          profile={parentProfile}
          pendingInvite={pendingParentInvite}
          placeholder="parent@example.com"
          inviteLabel="Invite parent"
        />
        <AccountSlot
          label="Student"
          studentId={student.id}
          role="student"
          inviteAction={inviteStudent}
          profile={studentProfile}
          pendingInvite={pendingStudentInvite}
          placeholder="student@example.com"
          inviteLabel="Invite student"
        />
      </div>

      <Section label="Sessions">
        {sessions?.length ? (
          <ul className="space-y-2">
            {sessions.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/dashboard/tutor/session/${s.id}`}
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
                        {s.duration_minutes} min
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge tone={SESSION_STATUS_TONE[s.status] ?? "neutral"}>
                        {SESSION_STATUS_LABEL[s.status] ?? s.status}
                      </Badge>
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
            title="No sessions yet"
            description="Click ‘New session’ above to log your first session."
          />
        )}
      </Section>

      <Section label="Progress">
        <ProgressTracker
          student={student}
          ratings={ratings}
          flaggedCount={flaggedCount ?? 0}
          flaggedHref={`/dashboard/tutor/students/${student.id}/flagged`}
        />
      </Section>

      <Section label="Resources">
        <ResourcesPanel
          studentId={student.id}
          resources={resources}
          currentUserId={user.id}
          student={student}
          autoOpenResourceId={autoOpenResourceId}
          autoOpenFlag={autoOpenFlag}
        />
      </Section>

      <section className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <DeleteStudentButton
          studentId={student.id}
          studentName={`${student.first_name} ${student.last_name}`}
        />
      </section>
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

function InfoCard({ title, body }) {
  return (
    <Card className="p-4">
      <div className="text-[11px] uppercase tracking-wider text-muted font-medium">
        {title}
      </div>
      <div className="mt-2 text-sm whitespace-pre-wrap leading-relaxed">{body}</div>
    </Card>
  );
}

function AccountSlot({
  label,
  studentId,
  role,
  inviteAction,
  profile,
  pendingInvite,
  placeholder,
  inviteLabel,
}) {
  const initials = (profile?.full_name || profile?.email || "?")
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section className="space-y-2">
      <h2 className="text-[11px] uppercase tracking-wider text-muted font-medium">
        {label}
      </h2>
      {profile ? (
        <Card className="p-4 space-y-3 h-full">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-brand-pale text-brand-foreground flex items-center justify-center text-sm font-semibold shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium truncate">
                {profile.full_name || profile.email}
              </div>
              {profile.full_name && (
                <div className="text-sm text-muted truncate">{profile.email}</div>
              )}
            </div>
            <Badge tone="success" className="ml-auto shrink-0">
              Linked
            </Badge>
          </div>
          {role === "parent" && (
            <details className="group">
              <summary className="text-xs text-muted hover:text-foreground transition cursor-pointer list-none flex items-center gap-1.5 select-none">
                <span className="group-open:rotate-90 transition inline-block">›</span>
                Change email
              </summary>
              <form
                action={requestParentEmailChange}
                className="mt-2.5 flex flex-col sm:flex-row gap-2"
              >
                <input type="hidden" name="student_id" value={studentId} />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="new.email@example.com"
                  defaultValue=""
                  className="flex-1 h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition min-w-0"
                />
                <SubmitButton variant="primary" size="sm" pendingLabel="Sending…">
                  Send confirmation
                </SubmitButton>
              </form>
              <p className="text-[11px] text-muted mt-1.5 leading-snug">
                We'll email a confirmation link to the new address. The
                parent's sign-in won't change until they click it.
              </p>
            </details>
          )}
        </Card>
      ) : pendingInvite ? (
        <Card className="p-4 border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 space-y-2.5 h-full">
          <div className="flex items-center justify-between gap-2">
            <Badge tone="warning">Invite sent</Badge>
            <span className="text-xs text-muted">
              {timeAgo(pendingInvite.created_at)}
            </span>
          </div>
          <div className="text-sm truncate">{pendingInvite.to_email}</div>
          <div className="text-[10px] text-muted break-all leading-tight">
            <code className="px-1 py-0.5 rounded bg-white/60 dark:bg-black/30 font-mono">
              {(process.env.NEXT_PUBLIC_APP_URL || "https://app.tuterly.com.au") +
                "/invite/" +
                pendingInvite.token}
            </code>
          </div>
          <div className="flex gap-1.5 pt-1">
            <form action={resendInvite}>
              <input type="hidden" name="student_id" value={studentId} />
              <input type="hidden" name="role" value={role} />
              <SubmitButton variant="primary" size="sm" pendingLabel="Sending…">
                Resend
              </SubmitButton>
            </form>
            <form action={cancelInvite}>
              <input type="hidden" name="student_id" value={studentId} />
              <input type="hidden" name="role" value={role} />
              <SubmitButton variant="outline" size="sm" pendingLabel="Cancelling…">
                Cancel
              </SubmitButton>
            </form>
          </div>
          <details className="group pt-1">
            <summary className="text-xs text-muted hover:text-foreground transition cursor-pointer list-none flex items-center gap-1.5 select-none">
              <span className="group-open:rotate-90 transition inline-block">›</span>
              Wrong email? Send to a different address
            </summary>
            <form
              action={updateInviteEmail}
              className="mt-2.5 flex flex-col sm:flex-row gap-2"
            >
              <input type="hidden" name="student_id" value={studentId} />
              <input type="hidden" name="role" value={role} />
              <input
                required
                type="email"
                name="email"
                placeholder="new.email@example.com"
                className="flex-1 h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition min-w-0"
              />
              <SubmitButton variant="primary" size="sm" pendingLabel="Sending…">
                Re-invite
              </SubmitButton>
            </form>
          </details>
        </Card>
      ) : (
        <form
          action={inviteAction}
          className="flex flex-col sm:flex-row gap-2 p-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 h-full"
        >
          <input type="hidden" name="student_id" value={studentId} />
          <input
            required
            type="email"
            name="email"
            placeholder={placeholder}
            className="flex-1 h-10 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition min-w-0"
          />
          <SubmitButton
            variant="primary"
            size="md"
            pendingLabel="Sending…"
            className="shrink-0"
          >
            {inviteLabel}
          </SubmitButton>
        </form>
      )}
    </section>
  );
}

function timeAgo(iso) {
  if (!iso) return "";
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

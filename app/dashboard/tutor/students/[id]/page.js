import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { inviteParent, resendInvite, cancelInvite } from "../invite-actions";
import { signedUrlFor } from "@/app/dashboard/resource-actions";
import ProgressTracker from "@/components/ProgressTracker";
import ResourcesPanel from "@/components/ResourcesPanel";
import StudentEditor from "@/components/StudentEditor";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";

const STATUS_TONE = {
  pending: "neutral",
  notes_added: "neutral",
  report_generated: "warning",
  sent_to_parent: "success",
};

const STATUS_LABEL = {
  pending: "Notes pending",
  notes_added: "Notes added",
  report_generated: "Report ready",
  sent_to_parent: "Sent to parent",
};

export default async function StudentDetail({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: student } = await supabase
    .from("students")
    .select(
      "id, first_name, last_name, year_level, working_level, school, subjects, goals, concerns, parent_id"
    )
    .eq("id", id)
    .single();
  if (!student) notFound();

  const [
    { data: sessions },
    { data: parentProfile },
    { data: pendingInvite },
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
      ? supabase
          .from("profiles")
          .select("full_name, email")
          .eq("id", student.parent_id)
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
      .from("ratings")
      .select("topic, subtopic, confidence, sessions(date)")
      .eq("student_id", id),
    supabase
      .from("resources")
      .select("id, name, category, notes, file_url, created_at")
      .eq("student_id", id)
      .order("created_at", { ascending: false }),
  ]);

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

      <Section label="Parent">
        {parentProfile ? (
          <Card className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-brand-pale text-brand-foreground flex items-center justify-center text-sm font-semibold">
              {(parentProfile.full_name || "?")
                .split(/\s+/)
                .map((p) => p[0])
                .filter(Boolean)
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="font-medium truncate">
                {parentProfile.full_name}
              </div>
              <div className="text-sm text-muted truncate">
                {parentProfile.email}
              </div>
            </div>
            <Badge tone="success" className="ml-auto">
              Linked
            </Badge>
          </Card>
        ) : pendingInvite ? (
          <Card className="p-5 border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 space-y-3">
            <div className="text-sm">
              <span className="font-medium">Invite pending</span> — sent to{" "}
              <span className="font-medium">{pendingInvite.to_email}</span>
            </div>
            <div className="text-xs text-muted break-all">
              Link:{" "}
              <code className="px-1.5 py-0.5 rounded bg-white/60 dark:bg-black/30 font-mono">
                {(process.env.NEXT_PUBLIC_APP_URL ||
                  "http://localhost:3000") +
                  "/invite/" +
                  pendingInvite.token}
              </code>
            </div>
            <div className="flex gap-2">
              <form action={resendInvite}>
                <input type="hidden" name="student_id" value={student.id} />
                <button
                  type="submit"
                  className="h-8 px-3 rounded-full bg-brand text-white text-xs font-medium hover:bg-brand-dark transition shadow-sm shadow-brand/20"
                >
                  Resend email
                </button>
              </form>
              <form action={cancelInvite}>
                <input type="hidden" name="student_id" value={student.id} />
                <button
                  type="submit"
                  className="h-8 px-3 rounded-full border border-zinc-300 dark:border-zinc-700 text-xs font-medium hover:bg-white/40 dark:hover:bg-white/5 transition"
                >
                  Cancel
                </button>
              </form>
            </div>
          </Card>
        ) : (
          <form
            action={inviteParent}
            className="flex flex-col sm:flex-row gap-2 p-5 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700"
          >
            <input type="hidden" name="student_id" value={student.id} />
            <input
              required
              type="email"
              name="email"
              placeholder="parent@example.com"
              className="flex-1 h-10 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
            />
            <button
              type="submit"
              className="h-10 px-4 rounded-full bg-brand hover:bg-brand-dark text-white text-sm font-medium shadow-sm shadow-brand/20 transition"
            >
              Invite parent
            </button>
          </form>
        )}
      </Section>

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
                      <Badge tone={STATUS_TONE[s.status] ?? "neutral"}>
                        {STATUS_LABEL[s.status] ?? s.status}
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
        <ProgressTracker student={student} ratings={ratings} />
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

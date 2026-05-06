import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import ReportWorkbench from "@/components/ReportWorkbench";
import RatingPanel from "@/components/RatingPanel";
import SendToParentPanel from "@/components/SendToParentPanel";
import SessionPhotos from "@/components/SessionPhotos";
import NotesEditor from "@/components/NotesEditor";
import DeleteSessionButton from "@/components/DeleteSessionButton";
import { signedPhotoUrl } from "@/app/dashboard/tutor/session/actions";
import { createAdminClient } from "@/lib/supabase-admin";

export default async function SessionPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: session } = await supabase
    .from("sessions")
    .select(
      "id, date, duration_minutes, raw_notes, status, student_id, students(id, first_name, last_name, year_level, parent_id)"
    )
    .eq("id", id)
    .eq("tutor_id", user.id)
    .single();
  if (!session) notFound();

  const { data: report } = await supabase
    .from("reports")
    .select("content, sent_at")
    .eq("session_id", id)
    .maybeSingle();

  const { data: ratings } = await supabase
    .from("ratings")
    .select("topic, subtopic, confidence")
    .eq("session_id", id);

  const { data: photoRows } = await supabase
    .from("session_photos")
    .select("id, file_url, created_at")
    .eq("session_id", id)
    .order("created_at", { ascending: true });

  const photos = await Promise.all(
    (photoRows ?? []).map(async (p) => ({
      ...p,
      signed_url: await signedPhotoUrl(p.file_url),
    }))
  );

  const student = session.students;
  const hasReport = !!report?.content;
  const initialTopic = ratings?.[0]?.topic ?? "";

  let parentEmail = null;
  if (student.parent_id) {
    const admin = createAdminClient();
    const { data: parent } = await admin
      .from("profiles")
      .select("email")
      .eq("id", student.parent_id)
      .maybeSingle();
    parentEmail = parent?.email ?? null;
  }

  return (
    <div className="px-4 sm:px-8 py-8 sm:py-10 max-w-4xl mx-auto space-y-10 animate-fade-in-up">
      <header className="space-y-2">
        <Link
          href={`/dashboard/tutor/students/${student.id}`}
          className="text-sm text-muted hover:text-foreground transition"
        >
          ← {student.first_name} {student.last_name}
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">
          {new Date(session.date).toLocaleDateString("en-AU", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h1>
        <p className="text-sm text-muted">
          {session.duration_minutes} min with {student.first_name} · {student.year_level}
        </p>
      </header>

      <Section
        label="Your notes"
        hint="Brief Dotpoints are enough — Tuterly will expand on them."
      >
        <NotesEditor sessionId={session.id} initialNotes={session.raw_notes ?? ""} />
      </Section>

      <Section
        label="Photos of working"
        hint="Snap the whiteboard or any working out — Tuterly will summarise them for the report."
      >
        <SessionPhotos sessionId={session.id} photos={photos} canManage />
      </Section>

      <Section label="Report">
        <ReportWorkbench
          sessionId={session.id}
          initialContent={report?.content ?? ""}
          status={session.status}
          parentLinked={!!student.parent_id}
          parentEmail={parentEmail}
        />
      </Section>

      {hasReport && (
        <Section label="Confidence ratings">
          <RatingPanel
            sessionId={session.id}
            reportContent={report.content}
            initialRatings={ratings ?? []}
            initialTopic={initialTopic}
          />
        </Section>
      )}

      {hasReport && (
        <Section label="Email parent">
          <SendToParentPanel
            sessionId={session.id}
            studentId={student.id}
            parentLinked={!!student.parent_id}
            parentEmail={parentEmail}
            sentAt={report.sent_at}
          />
        </Section>
      )}

      <section className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <DeleteSessionButton
          sessionId={session.id}
          sessionDate={session.date}
        />
      </section>
    </div>
  );
}

function Section({ label, hint, children }) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-[11px] uppercase tracking-wider text-muted font-medium">
          {label}
        </h2>
        {hint && <p className="text-xs text-muted mt-0.5">{hint}</p>}
      </div>
      {children}
    </section>
  );
}

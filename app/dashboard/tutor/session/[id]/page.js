import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import ReportWorkbench from "@/components/ReportWorkbench";
import FlagScrollTarget from "@/components/FlagScrollTarget";
import RatingPanel from "@/components/RatingPanel";
import SendReportPanel from "@/components/SendReportPanel";
import SessionPhotos from "@/components/SessionPhotos";
import NotesEditor from "@/components/NotesEditor";
import DeleteSessionButton from "@/components/DeleteSessionButton";
import { signedPhotoUrl } from "@/app/dashboard/tutor/session/actions";
import { createAdminClient } from "@/lib/supabase-admin";

export default async function SessionPage({ params, searchParams }) {
  const { id } = await params;
  const sp = (await searchParams) ?? {};
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: session } = await supabase
    .from("sessions")
    .select(
      "id, date, duration_minutes, raw_notes, status, student_id, students(id, first_name, last_name, year_level, parent_id, student_user_id)"
    )
    .eq("id", id)
    .eq("tutor_id", user.id)
    .single();
  if (!session) notFound();

  const { data: report } = await supabase
    .from("reports")
    .select("content, sent_at, student_sent_at")
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

  // Resolve the address we'd email each report copy to. Linked profile if
  // one exists, otherwise the most recent pending invite for that role. The
  // send action uses the same fallback, so the panel and the actual send
  // always agree on which address would be used.
  const admin = createAdminClient();
  const parentRecipient = await resolveRecipient({
    supabase,
    admin,
    studentId: student.id,
    tutorId: user.id,
    role: "parent",
    linkedProfileId: student.parent_id,
  });
  const studentRecipient = await resolveRecipient({
    supabase,
    admin,
    studentId: student.id,
    tutorId: user.id,
    role: "student",
    linkedProfileId: student.student_user_id,
  });

  return (
    <div className="px-4 sm:px-8 py-8 sm:py-10 max-w-4xl mx-auto space-y-10 animate-fade-in-up">
      <FlagScrollTarget />
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
          parentLinked={!!parentRecipient.email}
          parentEmail={parentRecipient.email}
          autoGenerate={
            sp.fresh === "1" &&
            !report?.content &&
            (!!session.raw_notes?.trim() || photos.length > 0)
          }
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
        <Section label="Email report">
          <SendReportPanel
            sessionId={session.id}
            studentId={student.id}
            parent={{
              email: parentRecipient.email,
              linked: parentRecipient.linked,
              sentAt: report.sent_at,
            }}
            student={{
              email: studentRecipient.email,
              linked: studentRecipient.linked,
              sentAt: report.student_sent_at,
            }}
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

async function resolveRecipient({
  supabase,
  admin,
  studentId,
  tutorId,
  role,
  linkedProfileId,
}) {
  if (linkedProfileId) {
    const { data: profile } = await admin
      .from("profiles")
      .select("email")
      .eq("id", linkedProfileId)
      .maybeSingle();
    if (profile?.email) {
      return { email: profile.email, linked: true };
    }
  }
  const { data: invite } = await supabase
    .from("invites")
    .select("to_email")
    .eq("student_id", studentId)
    .eq("from_user_id", tutorId)
    .eq("role", role)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return { email: invite?.to_email ?? null, linked: false };
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

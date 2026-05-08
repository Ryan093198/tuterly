import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import MarkdownReport from "@/components/MarkdownReport";
import PrintButton from "@/components/PrintButton";
import SessionPhotos from "@/components/SessionPhotos";
import { signedPhotoUrl } from "@/app/dashboard/tutor/session/actions";
import Logo from "@/components/Logo";
import { detectOverallTopic } from "@/lib/rating";

export default async function ParentReportView({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: report, error: reportError } = await supabase
    .from("reports")
    .select(
      "id, content, sent_at, parent_viewed_at, sessions(id, date, student_id, students(id, first_name, last_name, parent_id))"
    )
    .eq("id", id)
    .single();

  if (reportError || !report) {
    console.warn("[parent report view] no report:", id, reportError?.message);
    notFound();
  }

  // Supabase can return nested relations as either a single object or an
  // array depending on FK resolution. Normalise.
  const sessionData = Array.isArray(report.sessions)
    ? report.sessions[0]
    : report.sessions;
  const studentData = Array.isArray(sessionData?.students)
    ? sessionData?.students[0]
    : sessionData?.students;

  if (!sessionData || !studentData) {
    console.warn(
      "[parent report view] missing joined data:",
      id,
      "session?",
      !!sessionData,
      "student?",
      !!studentData
    );
    notFound();
  }

  if (studentData.parent_id !== user.id) {
    // If this user has a pending parent invite for the report's student
    // (e.g. they got the PDF email, just signed up, and clicked the link),
    // auto-accept it inline so the deep link works on first visit.
    const accepted = await tryAutoAcceptParentInvite(
      user,
      studentData.id
    );
    if (!accepted) {
      console.warn(
        "[parent report view] parent_id mismatch:",
        id,
        "student.parent_id=",
        studentData.parent_id,
        "user.id=",
        user.id
      );
      notFound();
    }
  }

  if (!report.parent_viewed_at) {
    await supabase
      .from("reports")
      .update({ parent_viewed_at: new Date().toISOString() })
      .eq("id", id);
  }

  const student = studentData;
  const sessionDate = sessionData.date;

  const { data: photoRows } = await supabase
    .from("session_photos")
    .select("id, file_url, created_at")
    .eq("session_id", sessionData.id)
    .order("created_at", { ascending: true });

  const photos = await Promise.all(
    (photoRows ?? []).map(async (p) => ({
      ...p,
      signed_url: await signedPhotoUrl(p.file_url),
    }))
  );

  // Existing flags for this report — parents can flag too.
  const { data: flagRows } = await supabase
    .from("flagged_questions")
    .select("question_number")
    .eq("report_id", report.id)
    .eq("student_id", student.id);
  const flaggedSet = new Set((flagRows ?? []).map((r) => r.question_number));
  const overallTopic = detectOverallTopic(report.content) || null;

  const formattedDate = new Date(sessionDate).toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="px-4 sm:px-6 py-8 sm:py-10 max-w-3xl mx-auto animate-fade-in-up">
      <div className="mb-6 no-print">
        <Link
          href={`/dashboard/parent/students/${student.id}`}
          className="text-sm text-muted hover:text-foreground transition"
        >
          ← {student.first_name} {student.last_name}
        </Link>
      </div>

      {photos.length > 0 && (
        <section className="mb-6 space-y-2 no-print">
          <h2 className="text-[11px] uppercase tracking-wider text-muted font-medium">
            Photos from the session
          </h2>
          <SessionPhotos
            sessionId={sessionData.id}
            photos={photos}
            canManage={false}
          />
        </section>
      )}

      <article className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-lg shadow-black/5 overflow-hidden">
        <header className="px-6 sm:px-10 py-6 bg-gradient-to-r from-brand-pale via-brand-pale/40 to-transparent border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
          <Logo />
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wider text-muted font-medium">
              Session report
            </div>
            <div className="text-sm font-medium text-foreground mt-0.5">
              {formattedDate}
            </div>
          </div>
        </header>

        <div className="px-6 sm:px-10 py-8 sm:py-10">
          <MarkdownReport
            content={report.content}
            flagOptions={{
              reportId: report.id,
              topic: overallTopic,
              flaggedSet,
            }}
          />
        </div>
      </article>

      <div className="flex justify-center mt-6 no-print">
        <PrintButton />
      </div>
    </div>
  );
}

async function tryAutoAcceptParentInvite(user, studentId) {
  if (!user?.email) return false;
  const admin = createAdminClient();
  const { data: invite } = await admin
    .from("invites")
    .select("id")
    .eq("student_id", studentId)
    .eq("to_email", user.email.toLowerCase())
    .eq("role", "parent")
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!invite) return false;

  await admin
    .from("students")
    .update({ parent_id: user.id })
    .eq("id", studentId);
  await admin.from("profiles").update({ role: "parent" }).eq("id", user.id);
  await admin
    .from("invites")
    .update({ status: "accepted" })
    .eq("id", invite.id);
  return true;
}

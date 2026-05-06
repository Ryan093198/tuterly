import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import MarkdownReport from "@/components/MarkdownReport";
import PrintButton from "@/components/PrintButton";
import SessionPhotos from "@/components/SessionPhotos";
import { signedPhotoUrl } from "@/app/dashboard/tutor/session/actions";
import Logo from "@/components/Logo";

export default async function StudentReportView({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: report } = await supabase
    .from("reports")
    .select(
      "id, content, sent_at, sessions(id, date, student_id, students(id, first_name, last_name, student_user_id))"
    )
    .eq("id", id)
    .single();

  if (
    !report ||
    !report.sessions?.students ||
    report.sessions.students.student_user_id !== user.id
  ) {
    notFound();
  }

  const student = report.sessions.students;
  const sessionDate = report.sessions.date;

  const { data: photoRows } = await supabase
    .from("session_photos")
    .select("id, file_url, created_at")
    .eq("session_id", report.sessions.id)
    .order("created_at", { ascending: true });

  const photos = await Promise.all(
    (photoRows ?? []).map(async (p) => ({
      ...p,
      signed_url: await signedPhotoUrl(p.file_url),
    }))
  );

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
          href="/dashboard/student"
          className="text-sm text-muted hover:text-foreground transition"
        >
          ← Back to dashboard
        </Link>
      </div>

      {photos.length > 0 && (
        <section className="mb-6 space-y-2 no-print">
          <h2 className="text-[11px] uppercase tracking-wider text-muted font-medium">
            Photos from the session
          </h2>
          <SessionPhotos
            sessionId={report.sessions.id}
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
          <MarkdownReport content={report.content} />
        </div>
      </article>

      <div className="flex justify-center mt-6 no-print">
        <PrintButton />
      </div>
    </div>
  );
}

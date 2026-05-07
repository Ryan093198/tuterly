import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata = {
  title: "Privacy Policy · Tuterly",
};

const lastUpdated = "May 2026";

export default function PrivacyPolicy() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-12 bg-surface-soft">
      <div className="w-full max-w-2xl">
        <header className="flex items-center justify-between mb-10">
          <Link href="/">
            <Logo />
          </Link>
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition"
          >
            ← Back to login
          </Link>
        </header>

        <article className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card shadow-sm p-8 sm:p-10 space-y-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted mt-2">
              Last updated: {lastUpdated}
            </p>
          </div>

          <Section title="Who we are">
            <p>
              Tuterly is a tutoring report platform operated by{" "}
              <strong>Bayside Academics</strong> (Brighton, Victoria,
              Australia). This Privacy Policy explains what information we
              collect when you use the Tuterly app at{" "}
              <a
                href="https://app.tuterly.com.au"
                className="text-brand hover:text-brand-dark underline"
              >
                app.tuterly.com.au
              </a>
              , how we use it, and your rights over it.
            </p>
            <p>
              For privacy questions or to exercise the rights below, contact{" "}
              <a
                href="mailto:learning@baysideacademics.com.au"
                className="text-brand hover:text-brand-dark underline"
              >
                learning@baysideacademics.com.au
              </a>
              .
            </p>
          </Section>

          <Section title="What we collect">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Account info:</strong> name, email address, role
                (parent, tutor, student) and a hashed password (or Google
                identifier for OAuth signups).
              </li>
              <li>
                <strong>Student records:</strong> first/last name, year level,
                school, subjects, learning goals and concerns. Entered by the
                tutor or parent.
              </li>
              <li>
                <strong>Session content:</strong> tutor notes, uploaded
                photos of working, uploaded audio recordings, and uploaded
                resources (textbook contents, school reports, term outlines).
              </li>
              <li>
                <strong>Generated reports:</strong> AI-produced session
                summaries, confidence ratings, flagged practice questions.
              </li>
              <li>
                <strong>Usage telemetry:</strong> standard Vercel and Supabase
                logs (IP address, user agent, request paths) to operate and
                debug the service.
              </li>
            </ul>
          </Section>

          <Section title="Why we collect it">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To deliver tutoring reports to parents and students.</li>
              <li>
                To track per-student progress over time so tutors can pick up
                where they left off.
              </li>
              <li>
                To send transactional emails (invites, report notifications,
                password resets).
              </li>
              <li>
                To keep the service running reliably and to prevent abuse.
              </li>
            </ul>
          </Section>

          <Section title="AI processing">
            <p>
              Tutor notes, session photos, audio, and uploaded resources are
              sent to <strong>Anthropic Claude</strong> (for report generation
              and explanations) and <strong>OpenAI Whisper</strong> (for audio
              transcription) so reports can be produced. These providers process
              the data on our behalf and don't use it to train their models.
            </p>
          </Section>

          <Section title="Where data is stored">
            <p>
              Account, student, session, and report data is stored in{" "}
              <strong>Supabase</strong> (Singapore region). Files (photos,
              resources) are stored in private Supabase Storage buckets and
              accessed via short-lived signed URLs. Email is sent through{" "}
              <strong>Resend</strong>. The app itself runs on{" "}
              <strong>Vercel</strong>.
            </p>
          </Section>

          <Section title="Who can see what">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Tutors</strong> can see students they have been linked
                to, plus all sessions, reports, ratings and resources for those
                students.
              </li>
              <li>
                <strong>Parents</strong> can see their own children's reports,
                progress, and resources, plus the photos and PDF that go with
                each session.
              </li>
              <li>
                <strong>Students</strong> can see their own reports, progress,
                and resources, plus the practice questions they've flagged.
              </li>
              <li>
                Database-level Row Level Security enforces these boundaries.
              </li>
            </ul>
          </Section>

          <Section title="Your rights">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Access</strong> — see what we hold about you. Email us.
              </li>
              <li>
                <strong>Correction</strong> — most fields can be edited
                directly in the app; otherwise email us.
              </li>
              <li>
                <strong>Deletion</strong> — ask us to delete your account and
                associated data. Email us; we'll action within 14 days.
              </li>
              <li>
                <strong>Withdraw consent</strong> — stop using the service at
                any time.
              </li>
            </ul>
          </Section>

          <Section title="Retention">
            <p>
              We keep account and report data for the lifetime of the account.
              When an account is deleted, associated student rows, sessions,
              reports, ratings, resources, photos, and audio are removed. Vercel
              and Supabase operational logs are retained per their respective
              defaults.
            </p>
          </Section>

          <Section title="Children's data">
            <p>
              Tuterly is used to track tutoring sessions for school-age
              students. We rely on tutors and parents to confirm that they have
              authority to enter student information into the platform. If you
              believe a student's data has been entered without consent, contact
              us and we will investigate and remove it.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              We may update this policy as the service evolves. The "last
              updated" date at the top reflects the most recent revision.
              Material changes will be notified by email.
            </p>
          </Section>
        </article>

        <p className="text-xs text-center text-muted mt-6">
          <Link href="/terms" className="text-brand hover:text-brand-dark underline">
            Terms of Service
          </Link>
        </p>
      </div>
    </main>
  );
}

function Section({ title, children }) {
  return (
    <section className="space-y-2.5 text-[15px] leading-[1.65] text-zinc-700 dark:text-zinc-300">
      <h2 className="text-base font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

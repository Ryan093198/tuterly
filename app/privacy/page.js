import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { SITE_URL } from "@/lib/site";

const TITLE = "Privacy Policy | Tuterly";
const DESCRIPTION =
  "How Tuterly collects and uses your data: the Tuterly app for Years 7 to 10 maths, this website and the Tuterly tutoring platform.";
const URL = `${SITE_URL}/privacy`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"],
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website",
  },
};

const lastUpdated = "October 2026";

export default function PrivacyPolicy() {
  return (
    <>
    <MarketingNav />
    <main className="flex flex-1 flex-col items-center px-5 py-12 bg-background">
      <div className="w-full max-w-2xl">

        <article className="rounded-3xl border-2 border-border bg-card shadow-[0_4px_0_var(--edge)] p-6 sm:p-10 space-y-6">
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
              Tuterly is operated by <strong>Bayside Academics</strong> (Brighton,
              Victoria, Australia). This policy covers the <strong>Tuterly app</strong>{" "}
              (our app for iPhone and Android for Years 7 to 10 maths), this website, and the
              Tuterly tutoring platform at{" "}
              <a
                href="https://app.tuterly.com.au"
                className="text-brand hover:text-brand-dark underline"
              >
                app.tuterly.com.au
              </a>{" "}
              used by tutors and their families. It explains what we collect, how
              we use it, who can see it, and your rights over it.
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

          <Section title="The Tuterly app: what we collect">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Account details:</strong> first name, email address (or
                your Sign in with Apple identifier), whether you’re a student,
                parent or tutor, and for students their year level, their age and,
                optionally, their school.
              </li>
              <li>
                <strong>What students add:</strong> photos of maths questions,
                and whole tests or practice papers uploaded as photos, PDFs or
                Word documents.
              </li>
              <li>
                <strong>What linked parents and tutors add:</strong> marked
                tests, practice tests and papers, and term planners or course
                outlines uploaded for a student.
              </li>
              <li>
                <strong>Learning activity:</strong> the questions in a
                student’s bank, their answers, test scores, stars, XP, streaks
                and goals, and which questions are to fix, learning or
                mastered.
              </li>
              <li>
                <strong>Links:</strong> which parents and tutors a student has
                linked, using their 6-character code.
              </li>
              <li>
                <strong>Diagnostics:</strong> crash reports and basic technical
                logs, used to keep the app working.
              </li>
            </ul>
          </Section>

          <Section title="The Tuterly app: how we use it">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                To read each question, solve it with a worked solution, file it
                under the right topic, and write similar questions to practise.
              </li>
              <li>
                To check answers, track progress towards mastered, and set
                topic tests (including tests focused on the topics in an
                uploaded term planner).
              </li>
              <li>
                To show linked parents a weekly summary and test scores, and
                linked tutors the student’s bank before a session.
              </li>
              <li>
                To send notifications and emails about the app (for example,
                sign-in codes and a test a tutor has set).
              </li>
            </ul>
            <p>
              Photos, questions and uploads are never reused for anyone else.
              We don’t show ads, we don’t sell personal information, and we
              don’t track you across other apps or websites for advertising.
            </p>
          </Section>

          <Section title="The Tuterly app: who can see what">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Students</strong> see everything in their own account.
              </li>
              <li>
                <strong>Linked tutors</strong> see the student’s bank, including
                the photos of their questions, so they can prepare for a
                session.
              </li>
              <li>
                <strong>Linked parents</strong> see a weekly summary, topics and
                test scores, plus anything they upload themselves. They don’t
                see the photos the student takes of their work.
              </li>
              <li>
                A student can remove a parent or tutor link at any time.
              </li>
            </ul>
          </Section>

          <Section title="The Tuterly app: children and parents">
            <p>
              The app is built for students in Years 7 to 10, so most users are
              children. We collect only what the app needs to work,
              and a parent can ask us at any time what we hold about their child
              or ask for it to be deleted, by emailing{" "}
              <a
                href="mailto:learning@baysideacademics.com.au"
                className="text-brand hover:text-brand-dark underline"
              >
                learning@baysideacademics.com.au
              </a>
              .
            </p>
            <p>
              Students tell us their age when they sign up. If they&apos;re under
              16, we ask them for a parent or guardian&apos;s email and send that
              parent a link explaining the app. The parent says yes on our
              website, and we record their name, the time and their IP address
              as a record of the consent. We use the parent&apos;s email only for
              this, and to reply if they contact us.
            </p>
          </Section>

          <Section title="The Tuterly app: payments">
            <p>
              Subscriptions are bought and managed through Apple’s App Store or Google Play. Apple or Google handles payment, so we never see your card details. You can
              cancel in your phone’s subscription settings at any time.
            </p>
          </Section>

          <Section title="AI processing">
            <p>
              In the Tuterly app, question photos and uploaded documents are
              sent to <strong>Anthropic Claude</strong> to read the questions,
              write worked solutions and similar questions, and explain steps.
              On the tutoring platform, tutor notes, session photos, audio and
              uploaded resources are sent to <strong>Anthropic Claude</strong>{" "}
              (for report generation and explanations) and{" "}
              <strong>OpenAI Whisper</strong> (for audio transcription). These
              providers process the data on our behalf and don’t use it to
              train their models.
            </p>
            <p>
              The “Try it” demo on our home page works the same way: the photo
              or text you add is sent to <strong>Anthropic Claude</strong> to
              read the question and write a fresh version. We email the result
              to the address you entered, and we don’t save the photo, the
              question or the result. To limit misuse we keep a record of your IP
              address and the time, and delete it after a few days.
            </p>
          </Section>

          <Section title="Where data is stored">
            <p>
              Data is stored with <strong>Supabase</strong>. Photos and files
              are kept in private storage and opened only through short-lived
              signed links. The tutoring platform’s data is in Supabase’s
              Singapore region. Email is sent through <strong>Resend</strong>,
              this website and the tutoring platform run on{" "}
              <strong>Vercel</strong>, and crash reports go to{" "}
              <strong>Sentry</strong>.
            </p>
          </Section>

          <Section title="Tuterly app waitlist">
            <p>
              If you join the waitlist for the Tuterly app, we keep your email,
              whether you’re a parent, student or tutor, the year level if you
              give one, and which page you signed up on. We use it to send one
              confirmation email and to tell you when the app is available. We
              don’t sell it or share it, apart from the service providers that
              store it and send our emails. Reply to any of these emails, or
              email{" "}
              <a
                href="mailto:learning@baysideacademics.com.au"
                className="text-brand hover:text-brand-dark underline"
              >
                learning@baysideacademics.com.au
              </a>
              , to be removed.
            </p>
          </Section>

          <Section title="The tutoring platform (app.tuterly.com.au)">
            <p>Tutors and their families use this platform for session reports. It holds:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Account info:</strong> name, email address, role
                (parent, tutor, student) and a hashed password (or Google
                identifier for Google sign-ups).
              </li>
              <li>
                <strong>Student records:</strong> first and last name, year
                level, school, subjects, learning goals and concerns, entered by
                the tutor or parent.
              </li>
              <li>
                <strong>Session content:</strong> tutor notes, uploaded photos
                of working, audio recordings, and uploaded resources (textbook
                contents, school reports, term outlines).
              </li>
              <li>
                <strong>Generated reports:</strong> AI-produced session
                summaries, confidence ratings and flagged practice questions.
              </li>
              <li>
                <strong>Usage logs:</strong> standard Vercel and Supabase logs
                (IP address, user agent, request paths) to operate and debug the
                service.
              </li>
            </ul>
            <p>
              We use it to deliver session reports, track each student’s
              progress over time, send transactional emails (invites, report
              notifications, password resets) and keep the service reliable.
              Tutors see the students they’re linked to and those students’
              sessions, reports and resources. Parents see their own
              children’s reports, progress, resources and session photos.
              Students see their own. Database-level security enforces these
              boundaries. We rely on tutors and parents to confirm they have
              authority to enter a student’s information.
            </p>
          </Section>

          <Section title="If you asked us to find a tutor">
            <p>
              This service is currently paused. If you used it, we shared the
              details you gave us (your name, mobile, email, your child’s first
              name and year level, subjects, suburb and the times that suited)
              with up to 3 tutoring centres near you, so they could contact you
              about tutoring. We didn’t share them with anyone else. We only
              send learning tips and offers to people who asked for them, and
              every email has an unsubscribe link. To have your details
              deleted, email{" "}
              <a
                href="mailto:learning@baysideacademics.com.au"
                className="text-brand hover:text-brand-dark underline"
              >
                learning@baysideacademics.com.au
              </a>
              .
            </p>
          </Section>

          <Section title="Your rights">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Access:</strong> ask what we hold about you or your
                child. Email us.
              </li>
              <li>
                <strong>Correction:</strong> most details can be edited in the
                app; otherwise email us.
              </li>
              <li>
                <strong>Deletion:</strong> in the Tuterly app you can delete a
                question, or your whole account, yourself. Or email us and
                we’ll action it within 14 days.
              </li>
              <li>
                <strong>Withdraw consent:</strong> stop using the service at any
                time.
              </li>
              <li>
                <strong>Complaints:</strong> if you’re not happy with how we
                handled a privacy concern, you can contact the Office of the
                Australian Information Commissioner at{" "}
                <a
                  href="https://www.oaic.gov.au"
                  className="text-brand hover:text-brand-dark underline"
                >
                  oaic.gov.au
                </a>
                .
              </li>
            </ul>
          </Section>

          <Section title="Retention">
            <p>
              We keep data for as long as the account exists. When a Tuterly
              app account is deleted, its questions, photos, uploads and
              progress are removed. When a tutoring platform account is
              deleted, its student records, sessions, reports, ratings,
              resources, photos and audio are removed. Service providers’
              operational logs are kept according to their own defaults.
            </p>
          </Section>

          <Section title="Credits">
            <p>
              Suburb locations: GeoNames (
              <a
                href="https://www.geonames.org"
                className="text-brand hover:text-brand-dark underline"
              >
                geonames.org
              </a>
              ), CC BY 4.0.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              We may update this policy as the service evolves. The “last
              updated” date at the top reflects the most recent revision.
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
    <MarketingFooter />
    </>
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

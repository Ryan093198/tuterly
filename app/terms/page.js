import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { SITE_URL } from "@/lib/site";

const TITLE = "Terms of Service | Tuterly";
const DESCRIPTION =
  "Terms of service for Tuterly users - parents, tutors, students, and tutoring centres, including the Tuterly Study app.";
const URL = `${SITE_URL}/terms`;

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

export default function TermsOfService() {
  return (
    <>
    <MarketingNav />
    <main className="flex flex-1 flex-col items-center px-5 py-12 bg-background">
      <div className="w-full max-w-2xl">

        <article className="rounded-3xl border-2 border-border bg-card shadow-[0_4px_0_var(--edge)] p-6 sm:p-10 space-y-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Terms of Service
            </h1>
            <p className="text-sm text-muted mt-2">
              Last updated: {lastUpdated}
            </p>
          </div>

          <Section title="The service">
            <p>
              Tuterly is a software platform operated by{" "}
              <strong>Bayside Academics</strong> (Brighton, Victoria, Australia)
              that helps tutors generate session reports and gives parents and
              students access to those reports and progress data. By creating
              an account or using the service you agree to these Terms.
            </p>
          </Section>

          <Section title="Accounts">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                You must provide accurate information during signup, and keep
                your login credentials confidential.
              </li>
              <li>
                You're responsible for activity that happens under your account.
              </li>
              <li>
                You may close your account at any time by contacting us at{" "}
                <a
                  href="mailto:learning@baysideacademics.com.au"
                  className="text-brand hover:text-brand-dark underline"
                >
                  learning@baysideacademics.com.au
                </a>
                .
              </li>
            </ul>
          </Section>

          <Section title="Acceptable use">
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                Upload data about a child without the consent of a parent or
                guardian.
              </li>
              <li>
                Use the AI features to generate content that is misleading,
                discriminatory, or harmful.
              </li>
              <li>
                Attempt to scrape, reverse-engineer, or overload the service.
              </li>
              <li>
                Share your account, or use Tuterly to provide a competing
                tutoring-report service to third parties.
              </li>
            </ul>
          </Section>

          <Section title="Content you submit">
            <p>
              You retain ownership of session notes, photos, audio, resources,
              and edited reports you submit. You grant Tuterly a limited
              licence to store and process them for the purpose of operating
              the service (including sending the data to AI providers as
              described in our{" "}
              <Link href="/privacy" className="text-brand hover:text-brand-dark underline">
                Privacy Policy
              </Link>
              ).
            </p>
          </Section>

          <Section title="AI-generated content">
            <p>
              Reports, drill-down explanations, and structured notes are
              produced by large language models. They can be inaccurate.
              Tutors are expected to review every generated report before
              sending it to a parent. Parents and students should treat the
              practice questions and recommended resources as a starting
              point, not a substitute for direct instruction.
            </p>
          </Section>

          <Section title="Service availability">
            <p>
              We aim to keep Tuterly available but we don't guarantee
              uninterrupted access. We may perform maintenance, change
              features, or pause the service if needed. Your data remains
              accessible during planned changes.
            </p>
          </Section>

          <Section title="The Tuterly Study app">
            <p>
              Tuterly Study is our app for iPhone and Android that helps
              students in Years 7 to 10 fix the maths questions they got wrong.
              Students under 16 need a parent or guardian&apos;s OK to use it;
              we ask for it by email when they sign up.
            </p>
            <p>
              Practice questions, solutions, marking and study notes are
              written with AI and checked automatically, but they can still be
              wrong. Treat them as practice, not as a replacement for your
              teacher.
            </p>
          </Section>

          <Section title="Pricing and billing">
            <p>
              The tutoring platform is free during the pilot period. We will
              give clear notice before introducing any paid plans, and will not
              automatically charge accounts created during the pilot without
              opt-in.
            </p>
            <p>
              Tuterly Study has a free plan and a paid plan, Tuterly Study
              Plus, sold as a weekly or monthly subscription through the App
              Store or Google Play. The price is shown before you buy.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                Payment is charged to your Apple or Google account when you
                confirm the purchase, or at the end of a free trial.
              </li>
              <li>
                Subscriptions renew automatically at the same price for the
                same period unless cancelled at least 24 hours before the end
                of the current period.
              </li>
              <li>
                You can manage or cancel your subscription in your Apple
                Account or Google Play settings. Cancelling stops the next
                renewal; Plus stays on until the end of the period you&apos;ve
                paid for.
              </li>
              <li>
                Refunds are handled by Apple or Google under their policies.
              </li>
              <li>
                If a free trial is offered, any unused part of it ends when you
                buy a subscription.
              </li>
            </ul>
          </Section>

          <Section title="Liability">
            <p>
              The service is provided "as is". To the fullest extent permitted
              by law, Bayside Academics' total liability arising out of or in
              connection with these Terms is limited to the amount you have
              paid us in the 12 months preceding the claim, or A$100, whichever
              is greater. We are not liable for indirect or consequential loss.
            </p>
            <p>
              Nothing in these Terms excludes, restricts or modifies any right
              or remedy you have under the Australian Consumer Law that cannot
              lawfully be excluded.
            </p>
          </Section>

          <Section title="Termination">
            <p>
              We may suspend or terminate accounts that breach these Terms or
              put other users at risk. You may close your account at any time;
              see the Privacy Policy for what happens to your data.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              We may update these Terms over time. We'll post the new version
              here with an updated date and email account holders if the
              changes are material.
            </p>
          </Section>

          <Section title="Governing law">
            <p>
              These Terms are governed by the laws of Victoria, Australia.
              Disputes will be heard by the courts of Victoria, Australia.
            </p>
          </Section>
        </article>

        <p className="text-xs text-center text-muted mt-6">
          <Link href="/privacy" className="text-brand hover:text-brand-dark underline">
            Privacy Policy
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

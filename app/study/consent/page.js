import Link from "next/link";
import Logo from "@/components/Logo";
import ConsentForm from "./ConsentForm";

// Parent consent for the Tuterly Study app (students under 16). The link in
// the parent's email lands here with ?t=<token>; the form records the yes
// through the app's parent-consent-page Edge Function.
export const metadata = {
  title: "Say yes to Tuterly Study",
  description: "A parent or guardian's OK for a student under 16 to use Tuterly Study.",
  robots: { index: false, follow: false },
};

export default async function StudyConsent({ searchParams }) {
  const { t } = await searchParams;
  const token = typeof t === "string" ? t : "";
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-12 bg-surface-soft">
      <div className="w-full max-w-xl">
        <header className="flex items-center justify-between mb-10">
          <Link href="/">
            <Logo />
          </Link>
        </header>

        <article className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card shadow-sm p-8 sm:p-10 space-y-6">
          <ConsentForm token={token} />

          <section className="space-y-3 text-[15px] leading-relaxed">
            <h2 className="text-lg font-semibold">What Tuterly Study does</h2>
            <p>
              Students in Years 7 to 10 snap photos of maths questions they got wrong. Quinn, the
              app&apos;s study buddy, writes a worked solution and makes similar questions until
              they&apos;ve mastered it, with tests and study notes on the topics they&apos;re doing at school.
            </p>
            <h2 className="text-lg font-semibold">What we collect</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Their first name, email, year level and age.</li>
              <li>The photos of maths questions they add, and their answers and progress.</li>
              <li>
                Photos and questions are sent to our AI provider (Anthropic) to read and solve them.
                They aren&apos;t used to train AI models, and they&apos;re never shown to anyone else.
              </li>
            </ul>
            <h2 className="text-lg font-semibold">What we don&apos;t do</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>No ads, no chat with other users, and we don&apos;t sell personal information.</li>
              <li>
                Paid features (Tuterly Study Plus) are bought through the App Store or Google Play,
                and can be turned off with Screen Time or Family Sharing.
              </li>
            </ul>
            <p>
              You can ask what we hold about your child, or have their account deleted, at any time by
              emailing{" "}
              <a className="underline" href="mailto:learning@baysideacademics.com.au">
                learning@baysideacademics.com.au
              </a>
              . Full details are in our{" "}
              <Link className="underline" href="/privacy">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link className="underline" href="/terms">
                Terms
              </Link>
              .
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}

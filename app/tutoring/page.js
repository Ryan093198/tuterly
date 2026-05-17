import Link from "next/link";
import Logo from "@/components/Logo";
import { SEO_SUBURBS, isPublishable } from "@/lib/seo-suburbs";
import { SITE_URL, APP_URL } from "@/lib/site";

export const metadata = {
  title: "Online & In-Person Tutoring across Melbourne | Tuterly",
  description:
    "Online or in-person maths and English tutoring for Melbourne students. Find a tutor for your child's suburb and school.",
  alternates: { canonical: `${SITE_URL}/tutoring` },
  openGraph: {
    title: "Online & In-Person Tutoring across Melbourne | Tuterly",
    description:
      "Online or in-person maths and English tutoring for Melbourne students. Find a tutor for your child's suburb and school.",
    url: `${SITE_URL}/tutoring`,
    type: "website",
  },
};

export default function TutoringDirectory() {
  return (
    <main className="max-w-3xl mx-auto px-6 sm:px-8 py-12 sm:py-16 space-y-10">
      <header className="space-y-4">
        <Logo size="sm" />
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight font-grotesk">
          Online and in-person tutoring across Melbourne
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          Tuterly tutors run one-on-one maths and English sessions either
          online or in-person across Melbourne&apos;s east — your family
          picks what works. Online means your child can practise from home
          with no driving on a weeknight; in-person means a tutor comes to
          your home for sessions at the kitchen table.
        </p>
        <div className="pt-2">
          <a
            href={APP_URL}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition"
          >
            Find a tutor — free to start
          </a>
        </div>
      </header>

      <section className="space-y-3 rounded-3xl bg-brand-pale dark:bg-brand-pale/30 p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight font-grotesk">
          What every Tuterly tutor offers
        </h2>
        <ul className="space-y-2 text-foreground/90">
          <li>
            <strong>One-on-one sessions</strong> in maths or English,
            aligned with your child&apos;s school curriculum, VCE study
            design, or IB programme.
          </li>
          <li>
            <strong>A detailed report after every session</strong> so you
            know exactly what was covered and where your child is up to —
            no more guessing what happened in last week&apos;s lesson.
          </li>
          <li>
            <strong>Practice worksheets between sessions</strong>,
            generated on the topics your child is actually working on, so
            the learning continues during the week.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight font-grotesk">
          Eastern suburbs
        </h2>
        {(() => {
          const live = SEO_SUBURBS.filter(isPublishable);
          if (live.length === 0) {
            return (
              <p className="text-muted">
                More suburb-specific pages are on the way. In the meantime,
                any Melbourne family can{" "}
                <a
                  href={APP_URL}
                  className="underline underline-offset-2 hover:text-brand"
                >
                  sign up
                </a>{" "}
                — our tutors run sessions online.
              </p>
            );
          }
          return (
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {live.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/tutoring/${s.slug}`}
                    className="block px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-brand/40 hover:shadow-sm transition"
                  >
                    <span className="font-medium">{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          );
        })()}
      </section>
    </main>
  );
}

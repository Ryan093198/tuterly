import Link from "next/link";
import Logo from "@/components/Logo";
import { SEO_SUBURBS, isPublishable } from "@/lib/seo-suburbs";
import { SITE_URL } from "@/lib/site";

const DIRECTORY_HREF = "/directory";

export const metadata = {
  title: "Tutoring across Melbourne | Tuterly",
  description:
    "Tutoring across Melbourne — Tuterly connects families with experienced tutors who know the local curriculum. Online or in-person, with detailed reports after every session.",
  alternates: { canonical: `${SITE_URL}/tutoring` },
  openGraph: {
    title: "Tutoring across Melbourne | Tuterly",
    description:
      "Tutoring across Melbourne — Tuterly connects families with experienced tutors who know the local curriculum. Online or in-person, with detailed reports after every session.",
    url: `${SITE_URL}/tutoring`,
    type: "website",
  },
};

export default function TutoringDirectory() {
  const live = SEO_SUBURBS.filter(isPublishable);
  return (
    <main className="max-w-3xl mx-auto px-6 sm:px-8 py-12 sm:py-16 space-y-12">
      <header className="space-y-5">
        <Logo size="sm" />
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight font-grotesk">
          Tutoring across Melbourne
        </h1>
        <p className="text-lg text-foreground/90 leading-relaxed">
          Finding the right tutor in Melbourne shouldn&apos;t be hard.
          Tuterly connects families with experienced tutors who know their
          child&apos;s curriculum and deliver results you can actually see
          — sessions can be online or in-person, depending on what works
          for your family.
        </p>
        <p className="pt-1">
          <Link
            href={DIRECTORY_HREF}
            className="text-brand-dark hover:text-brand font-medium"
          >
            Find a tutor →
          </Link>
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight font-grotesk">
          Suburbs we serve
        </h2>
        {live.length === 0 ? (
          <p className="text-muted">
            More suburb-specific pages are on the way. In the meantime,
            any Melbourne family can{" "}
            <Link
              href={DIRECTORY_HREF}
              className="underline underline-offset-2 hover:text-brand"
            >
              find a tutor in our directory
            </Link>
            .
          </p>
        ) : (
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
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight font-grotesk">
          How it works
        </h2>
        <p className="text-foreground/90 leading-relaxed">
          Every session is one-on-one, either online or face-to-face at
          your home — whichever suits your family. After each session,
          your tutor submits their notes and Tuterly generates a detailed
          report covering what was taught, how your child went, and what
          to focus on next. You also get practice questions tailored to
          the exact topics they covered, so learning continues between
          sessions.
        </p>
        <p className="text-foreground/90 leading-relaxed">
          No lock-in contracts. No agency markups. Your tutor sets their
          own rate and you pay directly.
        </p>
        <div className="pt-2">
          <Link
            href={DIRECTORY_HREF}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition"
          >
            Get started — free to sign up
          </Link>
        </div>
      </section>
    </main>
  );
}

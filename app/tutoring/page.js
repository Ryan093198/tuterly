import Link from "next/link";
import Logo from "@/components/Logo";
import { SEO_SUBURBS, isPublishable } from "@/lib/seo-suburbs";
import { SITE_URL, APP_URL } from "@/lib/site";

export const metadata = {
  title: "Tutoring across Melbourne | Tuterly",
  description:
    "Online maths and English tutoring for Melbourne students. Find a tutor for your child's suburb and school.",
  alternates: { canonical: `${SITE_URL}/tutoring` },
  openGraph: {
    title: "Tutoring across Melbourne | Tuterly",
    description:
      "Online maths and English tutoring for Melbourne students. Find a tutor for your child's suburb and school.",
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
          Online tutoring across Melbourne
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          Our tutors run sessions online, so a tutor doesn&apos;t need to
          live near your child to know their school. Find your suburb below
          to see how Tuterly works for families in your area.
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

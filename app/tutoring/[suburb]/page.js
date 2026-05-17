import Link from "next/link";
import { notFound } from "next/navigation";
import Logo from "@/components/Logo";
import {
  SEO_SUBURBS,
  getSeoSuburb,
  isPublishable,
} from "@/lib/seo-suburbs";
import { SITE_URL } from "@/lib/site";

// One statically-generated page per entry in SEO_SUBURBS. The page
// renders the template even when a suburb has no schools/blurb yet so
// content can be filled in incrementally — but the sitemap only lists
// publishable entries (see isPublishable in lib/seo-suburbs.js).

const DIRECTORY_HREF = "/directory";

export function generateStaticParams() {
  return SEO_SUBURBS.map((s) => ({ suburb: s.slug }));
}

export async function generateMetadata({ params }) {
  const { suburb: slug } = await params;
  const data = getSeoSuburb(slug);
  if (!data) return {};
  const title = `Tutoring in ${data.name} | Tuterly`;
  const description =
    data.blurb ||
    `Tutoring in ${data.name} — Tuterly connects families with experienced tutors who know the local curriculum. Online or in-person, with detailed reports after every session.`;
  const url = `${SITE_URL}/tutoring/${slug}`;
  // Draft suburbs are noindexed so they don't get into Google before
  // they have real content. The route stays live for previewing /
  // sharing the link internally.
  const robots = isPublishable(data)
    ? undefined
    : { index: false, follow: false };
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    ...(robots ? { robots } : {}),
  };
}

export default async function SuburbPage({ params }) {
  const { suburb: slug } = await params;
  const data = getSeoSuburb(slug);
  if (!data) notFound();

  const neighbours = (data.neighbouring ?? [])
    .map(getSeoSuburb)
    .filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Tutoring in ${data.name}`,
    provider: {
      "@type": "Organization",
      name: "Tuterly",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Place",
      name: `${data.name}, Victoria, Australia`,
    },
    serviceType: "Online and in-person maths and English tutoring",
    url: `${SITE_URL}/tutoring/${slug}`,
  };

  return (
    <main className="max-w-3xl mx-auto px-6 sm:px-8 py-12 sm:py-16 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="space-y-5">
        <Link href="/tutoring" className="inline-block">
          <Logo size="sm" />
        </Link>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight font-grotesk">
          Tutoring in {data.name}
        </h1>
        <p className="text-lg text-foreground/90 leading-relaxed">
          {data.blurb ||
            `Finding the right tutor in ${data.name} shouldn't be hard. Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.`}
        </p>
        <p className="pt-1">
          <Link
            href={DIRECTORY_HREF}
            className="text-brand-dark hover:text-brand font-medium"
          >
            Find a tutor in {data.name} →
          </Link>
        </p>
      </header>

      {data.schools?.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight font-grotesk">
            Schools in the area
          </h2>
          <p className="text-foreground/90 leading-relaxed">
            We work with students from schools across {data.name} and
            surrounds, including:
          </p>
          <ul className="space-y-1.5 text-foreground/90">
            {data.schools.map((s) => (
              <li key={s.name}>
                <span className="font-medium">{s.name}</span>
                {s.note ? (
                  <span className="text-muted"> – {s.note}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.parentNeeds && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight font-grotesk">
            What parents in {data.name} typically need help with
          </h2>
          <p className="text-foreground/90 leading-relaxed">
            {data.parentNeeds}
          </p>
        </section>
      )}

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

      {neighbours.length > 0 && (
        <section className="space-y-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold tracking-tight font-grotesk">
            Also serving nearby suburbs
          </h2>
          <ul className="flex flex-wrap gap-2">
            {neighbours.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/tutoring/${n.slug}`}
                  className="inline-block text-sm px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-brand/40 transition"
                >
                  {n.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import Logo from "@/components/Logo";
import {
  SEO_SUBURBS,
  getSeoSuburb,
  isPublishable,
} from "@/lib/seo-suburbs";
import { SITE_URL, APP_URL } from "@/lib/site";

// One statically-generated page per entry in SEO_SUBURBS. The page
// renders the template even when a suburb has no schools/blurb yet so
// content can be filled in incrementally — but the sitemap only lists
// publishable entries (see isPublishable in lib/seo-suburbs.js).

export function generateStaticParams() {
  return SEO_SUBURBS.map((s) => ({ suburb: s.slug }));
}

export async function generateMetadata({ params }) {
  const { suburb: slug } = await params;
  const data = getSeoSuburb(slug);
  if (!data) return {};
  const title = `Online Tutoring in ${data.name} | Tuterly`;
  const description =
    data.blurb ||
    `Online maths and English tutors for ${data.name} students. Session reports after every lesson and practice worksheets between them.`;
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
    name: `Online Tutoring in ${data.name}`,
    provider: {
      "@type": "Organization",
      name: "Tuterly",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Place",
      name: `${data.name}, Victoria, Australia`,
    },
    serviceType: "Online maths and English tutoring",
    url: `${SITE_URL}/tutoring/${slug}`,
  };

  return (
    <main className="max-w-3xl mx-auto px-6 sm:px-8 py-12 sm:py-16 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="space-y-4">
        <Link href="/tutoring" className="inline-block">
          <Logo size="sm" />
        </Link>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight font-grotesk">
          Online Tutoring in {data.name}
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          {data.blurb ||
            `Online maths and English tutors who know the ${data.name} school curriculum. One-on-one sessions with a detailed report after each lesson and practice worksheets your child can do between them.`}
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

      {data.schools?.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight font-grotesk">
            Schools we support in {data.name}
          </h2>
          <ul className="space-y-2">
            {data.schools.map((s) => (
              <li
                key={s.name}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card p-4"
              >
                <p className="font-medium">{s.name}</p>
                {s.note && (
                  <p className="text-sm text-muted mt-0.5">{s.note}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.highlights?.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight font-grotesk">
            What {data.name} parents ask us about
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-foreground/90">
            {data.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="space-y-3 rounded-3xl bg-brand-pale dark:bg-brand-pale/30 p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight font-grotesk">
          Why Tuterly works for {data.name} families
        </h2>
        <ul className="space-y-2 text-foreground/90">
          <li>
            Online sessions — your child can practise from home, no driving
            on a weeknight.
          </li>
          <li>
            A detailed report after every session so you know what was
            covered and where they&apos;re up to.
          </li>
          <li>
            Practice worksheets generated on the topics they&apos;re working
            on, so the work doesn&apos;t stop when the session ends.
          </li>
        </ul>
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

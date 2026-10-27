import Link from "next/link";
import AppCtaBand from "@/components/study/AppCtaBand";
import { notFound } from "next/navigation";
import {
  SEO_SUBURBS,
  getSeoSuburb,
  isPublishable,
} from "@/lib/seo-suburbs";
import { SITE_URL } from "@/lib/site";
import {
  c,
  MARKETING_FONTS_IMPORT,
} from "@/components/marketing/theme";
import SampleReport from "@/components/marketing/SampleReport";
import SavingsCalculator from "@/components/marketing/SavingsCalculator";
import ComparisonTable from "@/components/marketing/ComparisonTable";
import TuterlyMethod from "@/components/marketing/TuterlyMethod";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import Testimonials from "@/components/marketing/Testimonials";
import { AppHeroBlock } from "@/components/study/TutoringPageApp";

// /tutoring/[suburb] - programmatic SEO landing pages. Match the
// visual language of /parents (inline styles, marketing palette) so
// the SampleReport / SavingsCalculator / ComparisonTable showcase
// components blend in. Static content per suburb comes from
// lib/seo-suburbs.js.


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
    `Tutoring in ${data.name} - Tuterly connects families with experienced tutors who know the local curriculum. Online or in-person, with detailed reports after every session.`;
  const url = `${SITE_URL}/tutoring/${slug}`;
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
    provider: { "@type": "Organization", name: "Tuterly", url: SITE_URL },
    areaServed: { "@type": "Place", name: `${data.name}, Victoria, Australia` },
    serviceType: "Online and in-person maths and English tutoring",
    url: `${SITE_URL}/tutoring/${slug}`,
  };

  return (
    <main style={{ background: c.white, fontFamily: "var(--font-display)", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <MarketingNav />

      {/* HERO */}
      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Tutoring in {data.name}</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Tutoring in {data.name}
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              {data.blurb ||
                `Finding the right tutor in ${data.name} shouldn't be hard. Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.`}
            </p>
            <AppHeroBlock placement="suburb_hero" />
          </Fade>
        </div>
      </section>

      {/* SCHOOLS */}
      {data.schools?.length > 0 && (
        <section style={{ padding: "56px 24px", background: c.offWhite }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <Fade>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Schools in the area</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
                We work with students across {data.name} and surrounds.
              </h2>
              <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
                {data.schools.map((s) => (
                  <li key={s.name} style={{ background: c.white, borderRadius: 12, border: `1px solid ${c.border}`, padding: "14px 18px" }}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: c.navy, marginBottom: s.note ? 2 : 0 }}>{s.name}</p>
                    {s.note && <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.5 }}>{s.note}</p>}
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
        </section>
      )}

      {/* WHAT PARENTS NEED HELP WITH */}
      {data.parentNeeds && (
        <section style={{ padding: "56px 24px", background: c.white }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <Fade>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>What parents ask us about</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
                What parents in {data.name} typically need help with.
              </h2>
              <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7 }}>{data.parentNeeds}</p>
            </Fade>
          </div>
        </section>
      )}

      {/* FREE PRACTICE WORKSHEETS */}

      {/* THE TUTERLY METHOD */}
      <TuterlyMethod background={c.offWhite} padding="80px 24px" />

      {/* SAMPLE REPORT */}
      <SampleReport background={c.white} padding="80px 24px" />

      {/* TESTIMONIALS - real consented quotes only (lib/testimonials.js).
          Prefers quotes from this suburb, falls back to the general pool so
          the section is never empty on a suburb with no quote yet. */}
      <Testimonials
        variant="grid"
        tags={["suburb", "parents"]}
        suburb={data.name}
        limit={3}
        background={c.offWhite}
        padding="80px 24px"
        kicker="From our families"
        heading={`What parents in and around ${data.name} tell us.`}
      />

      {/* PRICING - SAVINGS + COMPARISON */}
      <section style={{ padding: "80px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>Simple pricing</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 12, lineHeight: 1.25 }}>
              Structured tutoring without the agency markup.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, textAlign: "center", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 32px" }}>
              You get the structure of a top tutoring company - session reports, practice worksheets, progress tracking - without paying the company markup, because your tutor sets their own rate and you pay them directly.
            </p>
          </Fade>
          <div style={{ display: "grid", gap: 20 }}>
            <SavingsCalculator />
            <ComparisonTable />
          </div>
        </div>
      </section>



      {/* NEARBY SUBURBS - INTERNAL LINKS */}
      {neighbours.length > 0 && (
        <section style={{ padding: "48px 24px 72px", background: c.offWhite }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Also serving nearby suburbs</p>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
              {neighbours.map((n) => (
                <li key={n.slug}>
                  <Link href={`/tutoring/${n.slug}`} style={{ display: "inline-block", padding: "8px 14px", borderRadius: 999, border: `1px solid ${c.border}`, background: c.white, color: c.text, fontSize: 14, textDecoration: "none" }}>
                    {n.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <AppCtaBand placement="suburb_final" />
      <MarketingFooter />
    </main>
  );
}

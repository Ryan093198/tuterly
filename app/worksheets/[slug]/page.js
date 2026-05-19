import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import Fade from "@/components/marketing/Fade";
import WorksheetGenerator from "@/components/WorksheetGenerator";
import { getTopicGroupsForLevel } from "@/lib/curriculum-topics";
import {
  WORKSHEET_LANDING_PAGES,
  getLandingPageBySlug,
  getLandingPagesForYear,
} from "@/lib/worksheet-landing-pages";

const YEAR_LEVELS = [
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
];

export function generateStaticParams() {
  return WORKSHEET_LANDING_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getLandingPageBySlug(slug);
  if (!page) return {};
  const url = `${SITE_URL}/worksheets/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function WorksheetTopicLandingPage({ params }) {
  const { slug } = await params;
  const page = getLandingPageBySlug(slug);
  if (!page) notFound();

  const topicsByYear = Object.fromEntries(
    YEAR_LEVELS.map((y) => [y, getTopicGroupsForLevel(y, "maths", [y])])
  );

  const related = getLandingPagesForYear(page.yearLevel).filter(
    (p) => p.slug !== page.slug
  );

  return (
    <main style={{ background: c.offWhite, fontFamily: "'DM Sans', sans-serif", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      <section style={{ padding: "60px 24px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>
              {page.yearLevel} - {page.topic} - Free practice
            </p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, color: c.navy, lineHeight: 1.15, marginBottom: 16 }}>
              {page.h1}
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
              {page.subtitle}
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "24px 24px 60px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <WorksheetGenerator
            topicsByYear={topicsByYear}
            initialYearLevel={page.yearLevel}
            initialTopicId={page.topicId}
          />
        </div>
      </section>

      <section style={{ padding: "60px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>
              About this worksheet
            </p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 14, lineHeight: 1.25 }}>
              Why we built it
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              {page.intro}
            </p>
          </Fade>

          <Fade>
            <div style={{ marginTop: 40 }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>
                What&apos;s covered
              </p>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: c.navy, marginBottom: 14, lineHeight: 1.3 }}>
                Sub-skills your student will practise
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                {page.whatsCovered.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "14px 18px",
                      background: c.white,
                      border: `1px solid ${c.border}`,
                      borderRadius: 12,
                      fontSize: 15,
                      color: c.text,
                      lineHeight: 1.55,
                    }}
                  >
                    <span style={{ color: c.teal, fontWeight: 700, marginTop: 1 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Fade>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ padding: "60px 24px", background: c.white }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <Fade>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>
                More {page.yearLevel} topics
              </p>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: c.navy, marginBottom: 18, lineHeight: 1.3 }}>
                Other free {page.yearLevel} worksheet generators
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/worksheets/${r.slug}`}
                    style={{
                      display: "block",
                      padding: "14px 16px",
                      background: c.offWhite,
                      border: `1px solid ${c.border}`,
                      borderRadius: 12,
                      textDecoration: "none",
                    }}
                  >
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>
                      {r.yearLevel}
                    </p>
                    <p style={{ fontSize: 15, fontWeight: 600, color: c.navy }}>
                      {r.topic}
                    </p>
                  </Link>
                ))}
              </div>
              <p style={{ marginTop: 18, fontSize: 14, color: c.textLight }}>
                Or generate any topic from the{" "}
                <Link href="/worksheets" style={{ color: c.tealDark, fontWeight: 600 }}>
                  full worksheet builder
                </Link>
                .
              </p>
            </Fade>
          </div>
        </section>
      )}

      <section style={{ padding: "60px 24px 80px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 12, lineHeight: 1.25 }}>
              Want a real plan for the term?
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, maxWidth: 540, margin: "0 auto 22px" }}>
              Worksheets are great for repetition. A Tuterly tutor can spot the specific moves your student keeps getting wrong and fix them in one or two sessions.
            </p>
            <Link
              href="/directory"
              style={{
                display: "inline-block",
                padding: "14px 28px",
                borderRadius: 10,
                background: c.teal,
                color: c.white,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Find a {page.yearLevel} maths tutor →
            </Link>
          </Fade>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}

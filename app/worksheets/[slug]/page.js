import Link from "next/link";
import AppCtaBand from "@/components/study/AppCtaBand";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import Fade from "@/components/marketing/Fade";
import AppPracticeBlock from "@/components/study/AppPracticeBlock";
import { practiceFaqs, withoutBuilderSentences, topicPageCopy } from "@/lib/practice-copy";
import {
  WORKSHEET_LANDING_PAGES,
  getLandingPageBySlug,
  getLandingPagesForYear,
} from "@/lib/worksheet-landing-pages";
import { getFaqsForSlug } from "@/lib/worksheet-faqs";


export function generateStaticParams() {
  return WORKSHEET_LANDING_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getLandingPageBySlug(slug);
  if (!page) return {};
  const url = `${SITE_URL}/worksheets/${page.slug}`;
  const { metaTitle, metaDescription } = topicPageCopy(page);
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: url },
    openGraph: { images: ["/og-tuterly.png"],
      title: metaTitle,
      description: metaDescription,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
    },
  };
}

export default async function WorksheetTopicLandingPage({ params }) {
  const { slug } = await params;
  const page = getLandingPageBySlug(slug);
  if (!page) notFound();

  const copy = topicPageCopy(page);
  const intro = withoutBuilderSentences(page.intro);

  const related = getLandingPagesForYear(page.yearLevel).filter(
    (p) => p.slug !== page.slug
  );

  const pageUrl = `${SITE_URL}/worksheets/${page.slug}`;
  const faqs = practiceFaqs(getFaqsForSlug(page.slug));

  // Schema.org markup. BreadcrumbList matches the visible breadcrumb
  // below the nav. LearningResource is Google's official type for
  // educational practice material - eligibility for the education
  // rich-snippets carousel and the practice-problems result type.
  // FAQPage matches the visible <details> block at the bottom of the
  // page - Google requires the QA pairs to appear on-page, otherwise
  // it penalises the schema.
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Maths by topic", item: `${SITE_URL}/worksheets` },
      { "@type": "ListItem", position: 3, name: page.yearLevel, item: `${SITE_URL}/worksheets#year-${page.yearLevel.split(" ")[1]}` },
      { "@type": "ListItem", position: 4, name: page.topic, item: pageUrl },
    ],
  };

  const faqSchema = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;


  return (
    <main style={{ background: c.offWhite, fontFamily: "var(--font-display)", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <MarketingNav />

      {/* BREADCRUMB - paired with BreadcrumbList JSON-LD above */}
      <nav
        aria-label="Breadcrumb"
        style={{ background: c.white, borderBottom: `1px solid ${c.border}`, padding: "12px 24px" }}
      >
        <ol
          style={{
            maxWidth: 760,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            listStyle: "none",
            padding: 0,
            fontSize: 13,
            color: c.textLight,
          }}
        >
          <li>
            <Link href="/" style={{ color: c.textLight, textDecoration: "none" }}>
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/worksheets" style={{ color: c.textLight, textDecoration: "none" }}>
              Maths by topic
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/worksheets#year-${page.yearLevel.split(" ")[1]}`}
              style={{ color: c.textLight, textDecoration: "none" }}
            >
              {page.yearLevel}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li style={{ color: c.navy, fontWeight: 600 }}>{page.topic}</li>
        </ol>
      </nav>

      <section style={{ padding: "60px 24px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>
              {page.yearLevel} - {page.topic}
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 42, color: c.navy, lineHeight: 1.15, marginBottom: 16 }}>
              {copy.h1}
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
              {copy.subtitle}
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "24px 24px 60px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <AppPracticeBlock topic={`${page.yearLevel} ${page.topic.toLowerCase()}`} placement="worksheet_page_practice" />
        </div>
      </section>

      <section style={{ padding: "60px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>
              About this topic
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 14, lineHeight: 1.25 }}>
              {`${page.topic} in ${page.yearLevel}`}
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              {intro}
            </p>
          </Fade>

          <Fade>
            <div style={{ marginTop: 40 }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>
                What&apos;s covered
              </p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, color: c.navy, marginBottom: 14, lineHeight: 1.3 }}>
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
              <p style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>
                More {page.yearLevel} topics
              </p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, color: c.navy, marginBottom: 18, lineHeight: 1.3 }}>
                Other {page.yearLevel} maths topics
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
                    <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>
                      {r.yearLevel}
                    </p>
                    <p style={{ fontSize: 15, fontWeight: 600, color: c.navy }}>
                      {r.topic}
                    </p>
                  </Link>
                ))}
              </div>
            </Fade>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section style={{ padding: "48px 24px 56px", background: c.white }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <Fade>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>
                Frequently asked
              </p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: c.navy, marginBottom: 18, lineHeight: 1.3 }}>
                Questions parents ask about {page.topic.toLowerCase()}
              </h2>
              <div style={{ display: "grid", gap: 6 }}>
                {faqs.map((f, i) => (
                  <details
                    key={i}
                    style={{
                      background: c.offWhite,
                      border: `1px solid ${c.border}`,
                      borderRadius: 10,
                      padding: "12px 16px",
                    }}
                  >
                    <summary
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 14,
                        fontWeight: 600,
                        color: c.navy,
                        cursor: "pointer",
                        listStyle: "none",
                      }}
                    >
                      {f.q}
                    </summary>
                    <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65, marginTop: 10 }}>
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </Fade>
          </div>
        </section>
      )}


      <AppCtaBand placement="worksheet_page_final" />
      <MarketingFooter />
    </main>
  );
}

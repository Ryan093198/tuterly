import Link from "next/link";
import { c, MARKETING_FONTS_IMPORT } from "./theme";
import { SITE_URL } from "@/lib/site";
import { getSeoTutorSubject } from "@/lib/seo-tutor-subjects";
import SampleReport from "./SampleReport";
import Fade from "./Fade";
import MarketingNav from "./MarketingNav";
import MarketingFooter from "./MarketingFooter";
import TutorRateComparison from "./TutorRateComparison";
import WhyTutorsJoinTuterly from "./WhyTutorsJoinTuterly";

// Subject-flavoured /tutor-jobs page (e.g., /tutor-jobs/vce-methods).
// Structurally mirrors the suburb tutor page but the per-page
// content varies by subject rather than by geography.

const APPLY_HREF = "/tutors#apply";

export default function TutorJobsSubjectPage({ subject: data }) {
  const related = (data.relatedSubjects ?? [])
    .map(getSeoTutorSubject)
    .filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: data.pageTitle,
    description: `${data.pageTitle} in Melbourne. Set your own rate, work online or in-person, and use Tuterly's professional tools.`,
    hiringOrganization: { "@type": "Organization", name: "Tuterly", sameAs: SITE_URL },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Melbourne",
        addressRegion: "VIC",
        addressCountry: "AU",
      },
    },
    employmentType: "CONTRACTOR",
    applicantLocationRequirements: { "@type": "Country", name: "Australia" },
    jobLocationType: "TELECOMMUTE",
    url: `${SITE_URL}/tutor-jobs/${data.slug}`,
  };

  return (
    <main style={{ background: c.white, fontFamily: "'DM Sans', sans-serif", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <MarketingNav />

      {/* HERO */}
      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>{data.level} · {data.yearRange}</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              {data.pageTitle}.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>{data.blurb}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href={APPLY_HREF} style={{ padding: "14px 28px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Start your application →
              </Link>
              <a href="#sample-report" style={{ padding: "14px 28px", borderRadius: 10, border: `2px solid ${c.border}`, color: c.text, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                See the tools you&apos;ll get
              </a>
            </div>
          </Fade>
        </div>
      </section>

      {/* DEMAND FOR THIS SUBJECT */}
      {data.demand && (
        <section style={{ padding: "56px 24px", background: c.offWhite }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <Fade>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>What students are asking for</p>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
                {`The kind of ${data.name.toLowerCase()} work that's in demand.`}
              </h2>
              <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7 }}>{data.demand}</p>
            </Fade>
          </div>
        </section>
      )}

      <TutorRateComparison />

      <WhyTutorsJoinTuterly background={c.offWhite} padding="80px 24px" />

      <SampleReport
        background={c.white}
        padding="80px 24px"
        heading="Your sessions look this professional from day one."
        sub="Every tutor on Tuterly submits a structured report after each session. Parents get a clear picture of what was covered and where their child is up to - and you look like a senior agency tutor without having to learn a new admin system. The sample below is what every parent receives in their inbox."
      />

      {/* GET STARTED CTA */}
      <section style={{ padding: "72px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              {`Ready to start tutoring ${data.name}?`}
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 28 }}>
              Apply now. We&apos;ll review your subjects and year levels, and get back to you within one day.
            </p>
            <Link href={APPLY_HREF} style={{ display: "inline-block", padding: "14px 32px", borderRadius: 10, background: c.teal, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Start your application →
            </Link>
          </Fade>
        </div>
      </section>

      {/* RELATED SUBJECTS */}
      {related.length > 0 && (
        <section style={{ padding: "48px 24px 72px", background: c.white }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Related tutor roles</p>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/tutor-jobs/${r.slug}`} style={{ display: "inline-block", padding: "8px 14px", borderRadius: 999, border: `1px solid ${c.border}`, background: c.white, color: c.text, fontSize: 14, textDecoration: "none" }}>
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <MarketingFooter />
    </main>
  );
}

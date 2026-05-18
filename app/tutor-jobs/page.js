import Link from "next/link";
import { SEO_SUBURBS, isPublishable } from "@/lib/seo-suburbs";
import { SEO_TUTOR_SUBJECTS } from "@/lib/seo-tutor-subjects";
import { SITE_URL } from "@/lib/site";
import {
  c,
  MARKETING_FONTS_IMPORT,
} from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import WhyTutorsJoinTuterly from "@/components/marketing/WhyTutorsJoinTuterly";

const APPLY_HREF = "/tutors#apply";

const METADATA_TITLE = "Become a Tuterly Tutor | Tuterly";
const METADATA_DESCRIPTION =
  "We'll train you, give you the tools, and connect you with families — then let you run your own practice without an agency taking a cut.";

export const metadata = {
  title: METADATA_TITLE,
  description: METADATA_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/tutor-jobs` },
  openGraph: {
    title: METADATA_TITLE,
    description: METADATA_DESCRIPTION,
    url: `${SITE_URL}/tutor-jobs`,
    type: "website",
  },
};

export default function TutorJobsDirectory() {
  const live = SEO_SUBURBS.filter(isPublishable);

  return (
    <main style={{ background: c.white, fontFamily: "'DM Sans', sans-serif", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      {/* HERO */}
      <section style={{ padding: "72px 24px 40px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>For tutors</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 48, color: c.navy, lineHeight: 1.1, marginBottom: 20 }}>
              Become a Tuterly tutor.
            </h1>
            <p style={{ fontSize: 18, color: c.text, lineHeight: 1.65, marginBottom: 24, fontWeight: 500 }}>
              We&apos;ll train you, give you the tools, and connect you with families — then let you run your own practice without an agency taking a cut.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href={APPLY_HREF} style={{ padding: "14px 28px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Start your application →
              </Link>
            </div>
          </Fade>
        </div>
      </section>

      {/* BODY INTRO */}
      <section style={{ padding: "32px 24px 64px", background: c.white }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Fade delay={0.1}>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              Tuterly isn&apos;t a job board. It&apos;s a platform for tutors who want to be great at what they do — with the training, tools, and students to make it happen. You go through our onboarding, get access to systems that make you look and operate like a premium tutoring company, and then you set your own rate, choose your own hours, and keep everything you earn.
            </p>
          </Fade>
        </div>
      </section>

      {/* HIRING BY SUBJECT */}
      <section style={{ padding: "56px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>By subject</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 24, lineHeight: 1.25 }}>
              The subjects we&apos;re actively recruiting for.
            </h2>
            <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, listStyle: "none", padding: 0, margin: 0 }}>
              {SEO_TUTOR_SUBJECTS.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/tutor-jobs/${s.slug}`}
                    style={{ display: "block", padding: "18px 20px", borderRadius: 14, background: c.white, border: `1px solid ${c.border}`, textDecoration: "none" }}
                  >
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>{s.level} · {s.yearRange}</p>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: c.navy }}>{s.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
      </section>

      {/* HIRING BY SUBURB */}
      <section style={{ padding: "56px 24px", background: c.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>By suburb</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 24, lineHeight: 1.25 }}>
              Suburbs we&apos;re actively building tutor supply in.
            </h2>
            {live.length === 0 ? (
              <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7 }}>
                More suburb-specific pages are on the way. In the meantime, any Melbourne tutor can{" "}
                <Link href={APPLY_HREF} style={{ color: c.teal, fontWeight: 600 }}>apply to tutor with Tuterly</Link>.
              </p>
            ) : (
              <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
                {live.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/tutor-jobs/${s.slug}`}
                      style={{ display: "block", padding: "14px 18px", borderRadius: 12, background: c.offWhite, border: `1px solid ${c.border}`, textDecoration: "none", color: c.navy, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15 }}
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Fade>
        </div>
      </section>

      <WhyTutorsJoinTuterly background={c.offWhite} padding="80px 24px" />

      {/* GET STARTED CTA */}
      <section style={{ padding: "72px 24px", background: c.white }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Ready to start tutoring through Tuterly?
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

      <MarketingFooter />
    </main>
  );
}

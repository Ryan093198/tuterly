import Link from "next/link";
import AppCtaBand from "@/components/study/AppCtaBand";
import { AppHeroBlock } from "@/components/study/TutoringPageApp";
import { SEO_SUBURBS, isPublishable } from "@/lib/seo-suburbs";
import { SITE_URL } from "@/lib/site";
import { STUDY_APP, STUDY_APP_FACTS } from "@/lib/study-app";
import { PRICING } from "@/lib/pricing";
import {
  c,
  MARKETING_FONTS_IMPORT,
} from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const DESCRIPTION =
  "Tutoring across Melbourne: a private tutor usually costs $80 to $100 an hour. For Years 7 to 10 maths, Tuterly lets your child practise the exact questions they get wrong.";

export const metadata = {
  title: { absolute: "Tutoring across Melbourne | Tuterly" },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/tutoring` },
  openGraph: {
    title: "Tutoring across Melbourne | Tuterly",
    description: DESCRIPTION,
    url: `${SITE_URL}/tutoring`,
    type: "website",
  },
};

export default function TutoringDirectory() {
  const live = SEO_SUBURBS.filter(isPublishable);

  return (
    <main style={{ background: c.white, fontFamily: "var(--font-display)", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      {/* HERO */}
      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Tutoring across Melbourne</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Tutoring across Melbourne.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Across Melbourne, help with maths usually comes down to two options: a private tutor, usually ${PRICING.tutorCompareLow} to ${PRICING.tutorCompareHigh} an hour, or regular practice on the exact questions your child gets wrong. For Years 7 to 10, {STUDY_APP.name} is an iPhone app that does the practice part, with a 1-week free trial, then ${STUDY_APP.priceWeek} a week.
            </p>
            <AppHeroBlock placement="tutoring_hero" />
          </Fade>
        </div>
      </section>

      {/* SUBURB LIST */}
      <section style={{ padding: "56px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Suburb guides</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 24, lineHeight: 1.25 }}>
              Tutoring in your suburb.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 20 }}>
              Each guide covers the local schools, what families in that suburb usually look for, and where {STUDY_APP.name} fits.
            </p>
            {live.length === 0 ? (
              <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7 }}>
                More suburb-specific pages are on the way. For Years 7 to 10 maths, any family can start with{" "}
                <Link href="/" style={{ color: c.teal, fontWeight: 600 }}>Tuterly</Link>.
              </p>
            ) : (
              <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
                {live.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/tutoring/${s.slug}`}
                      style={{ display: "block", padding: "14px 18px", borderRadius: 12, background: c.white, border: `1px solid ${c.border}`, textDecoration: "none", color: c.navy, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, transition: "border-color 0.2s" }}
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

      {/* TUTOR OR APP */}
      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Where {STUDY_APP.name} fits</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              A tutor and the app do different jobs.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 16 }}>
              A private tutor can explain a topic face to face and help with any subject or year level, including English, primary and VCE. {STUDY_APP.name} covers Years 7 to 10 maths only, and does one thing well: your child snaps a question they got wrong, sees the full worked solution, then practises fresh versions on the same idea until it’s mastered.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7 }}>
              It’s designed by Australian educators at Bayside Academics in Brighton, with topics from the {STUDY_APP_FACTS.curriculum}. Parents link with a 6-character code and see Week in review, not their child’s photos. {STUDY_APP.priceVsTutor}
            </p>
          </Fade>
        </div>
      </section>


      <AppCtaBand placement="tutoring_index_final" />
      <MarketingFooter />
    </main>
  );
}

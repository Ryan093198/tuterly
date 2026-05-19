import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import SampleReport from "@/components/marketing/SampleReport";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "VCE Tutoring Melbourne - Methods, English, Sciences | Tuterly";
const DESCRIPTION =
  "VCE tutoring in Melbourne for Methods, English, Specialist Maths, Chemistry, Physics. Detailed session reports aligned to VCE study designs.";
const URL = `${SITE_URL}/vce-tutoring`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const SUBJECTS = [
  {
    name: "VCE Mathematical Methods",
    body: "Functions and graphs, calculus, probability. The single highest-demand VCE subject for tutoring - and the one with the biggest gap between school pace and what's actually needed for a 35+ study score. Tutors who got 40+ in Methods themselves are the typical fit.",
  },
  {
    name: "VCE English (and English Language / Literature)",
    body: "Analytical essay, comparative essay, language analysis - the three pieces that decide the score. Tutoring is mostly structural: students often have the ideas but need help organising them into the essay forms VCAA actually rewards.",
  },
  {
    name: "VCE Specialist Mathematics",
    body: "Vectors, complex numbers, mechanics, differential equations. The hardest VCE subject and the rarest specialist tutoring market. Usually paired with Methods, with tutoring focused on bridging Methods-style problem solving to the more abstract Specialist proof style.",
  },
  {
    name: "VCE Chemistry",
    body: "Units 3-4 organic chemistry, equilibrium, redox. Tutoring tends to be drilling past papers and developing the multi-step problem-solving instincts that the SACs and exams test.",
  },
  {
    name: "VCE Physics",
    body: "Motion, electricity, light and matter, fields. The interplay between conceptual understanding and quantitative calculation is where tutoring adds the most - particularly the longer-response questions that show up in the end-of-year exam.",
  },
  {
    name: "VCE Biology",
    body: "Nucleic acids, photosynthesis, immunity, evolution. Less calculation than Chemistry / Physics, more about the structured-response writing technique that the VCAA exam rewards.",
  },
];

const TIMING = [
  {
    when: "Year 10",
    body: "Pre-VCE preparation. Algebra, indices, and structured essay writing are the three biggest predictors of Methods and English readiness. Worth bringing a tutor in for foundations work if there's any uncertainty - it pays off in Year 11.",
  },
  {
    when: "Year 11",
    body: "Units 1-2. The year most families underestimate. The Unit 1-2 grades don't count toward ATAR but the content is the foundation for Units 3-4 - falling behind here is hard to recover from.",
  },
  {
    when: "Year 12",
    body: "Units 3-4. The year that matters. Tutoring intensifies in Term 2 (heading into SACs), Term 3 (more SACs + writing past papers), and Term 4 (exam preparation). Most Year 12 students who tutor weekly start in February, not September.",
  },
];

export default function VceTutoringPage() {
  return (
    <main style={{ background: c.white, fontFamily: "'DM Sans', sans-serif", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>VCE tutoring</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              VCE tutoring built around the study design.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Methods, English, Specialist, Chemistry, Physics, Biology - tutored by people who&apos;ve sat the exam themselves and know what a 40+ study score actually requires. Every session generates a structured report mapped to the VCAA study design, so you can see which areas of content are improving and which still need work.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/directory" style={{ padding: "14px 28px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Find a VCE tutor →
              </Link>
              <Link href="/sample-report" style={{ padding: "14px 28px", borderRadius: 10, border: `2px solid ${c.border}`, color: c.text, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                See a sample report
              </Link>
            </div>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>What changes in VCE tutoring</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              It&apos;s a different game from Year 7-10.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              VCE is run by VCAA and assessed through SACs (School Assessed Coursework) plus end-of-year exams. The study scores get scaled into your ATAR, and the difference between a 35 and a 40 in Methods is the difference between a mid-90s and a high-90s ATAR for most cohorts.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              That means VCE tutoring isn&apos;t about catching up. It&apos;s about pacing through the study design at a level above your school&apos;s teaching, building exam technique on actual VCAA past papers, and identifying the specific content areas where you&apos;re losing marks. A tutor who&apos;s done that themselves is genuinely different from a tutor who&apos;s just confident at the maths.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Subjects we cover</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 36, lineHeight: 1.25 }}>
              The six subjects most families tutor.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {SUBJECTS.map((s, i) => (
              <Fade key={s.name} delay={0.04 + i * 0.03}>
                <div style={{ background: c.offWhite, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{s.name}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}>{s.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <SampleReport
        background={c.offWhite}
        padding="80px 24px"
        heading="Reports map straight to the VCE study design."
        sub="Every session report tracks topic confidence on a 1-5 scale across the specific content areas in the VCAA study design. Watch how an area of weakness becomes an area of strength session by session - or the opposite, when something needs intervention."
      />

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>When to start</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              The honest timing answer.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {TIMING.map((t, i) => (
              <Fade key={t.when} delay={0.04 + i * 0.04}>
                <div style={{ background: c.offWhite, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px", display: "grid", gridTemplateColumns: "1fr 4fr", gap: 18 }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.teal }}>{t.when}</p>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}>{t.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "72px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Find a VCE tutor in our directory.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 28 }}>
              Browse tutors by subject and year level. Every Tuterly tutor uses the platform - so every session gets a structured report mapped to the VCAA study design.
            </p>
            <Link href="/directory" style={{ display: "inline-block", padding: "14px 32px", borderRadius: 10, background: c.teal, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Find a VCE tutor →
            </Link>
          </Fade>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}

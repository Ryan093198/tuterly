import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import SampleReport from "@/components/marketing/SampleReport";
import EducourseCallout from "@/components/marketing/EducourseCallout";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "Scholarship Test Prep Melbourne - ACER, EduTest | Tuterly";
const DESCRIPTION =
  "ACER and EduTest scholarship preparation tutoring in Melbourne. When to start, what to practise, and how to combine 1-on-1 with daily drills.";
const URL = `${SITE_URL}/scholarship-test-prep`;

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

const TESTS = [
  {
    name: "ACER Scholarship Tests",
    body: "Three papers - written expression, humanities (comprehension and interpretation), and mathematics. Used by Scotch College, Trinity Grammar, Genazzano, Loreto Mandeville Hall, Xavier, Haileybury and many others. Generally considered the harder of the two tests, particularly the humanities paper.",
  },
  {
    name: "EduTest",
    body: "Five sections - reading comprehension, mathematics, written expression, verbal reasoning, numerical reasoning - all under tight time limits. Used by Camberwell Grammar, Carey Baptist, Wesley, Caulfield Grammar, MLC and many others. Time pressure is the section most students underestimate.",
  },
  {
    name: "Individual school entry exams",
    body: "Some schools run their own admission process alongside ACER or EduTest, with school-specific essay prompts and maths problem sets. Worth practising for specifically if you&apos;ve shortlisted a school - the question style varies meaningfully between schools.",
  },
];

const TIMING = [
  {
    when: "Year 4",
    body: "Foundations year if you&apos;re aiming at Year 7 entry. Strong reading comprehension, mental arithmetic speed, and writing structure - all developed through normal schoolwork plus light supplementary practice. Specific test prep usually isn&apos;t needed yet.",
  },
  {
    when: "Year 5",
    body: "Begin specific test-style practice 12-18 months out from the exam. Once a week is plenty. Focus on building familiarity with the question types (reasoning sections in particular) before drilling speed.",
  },
  {
    when: "Year 6",
    body: "The intensive year. Most families step up to weekly tutoring plus daily practice from January through to the test date (usually February-May depending on the school). The combination of 1-on-1 work on weak areas + daily structured drilling is what moves scores most.",
  },
];

const WHAT_WORKS = [
  {
    title: "Past papers under timed conditions",
    body: "Most students lose marks not because they don&apos;t know the material, but because they panic at the time pressure. Sitting practice papers with a real timer running is the single most useful prep activity in the last 8 weeks.",
  },
  {
    title: "Written expression feedback",
    body: "The section schools weight most heavily - and the one that&apos;s hardest to self-improve. Children need their writing read by someone who can articulate why it works or doesn&apos;t. This is where a tutor adds more value than any self-study platform.",
  },
  {
    title: "Daily question drills, not weekly cramming",
    body: "Verbal and numerical reasoning improve through pattern recognition built up over months of consistent exposure. Twenty-five minutes a day for three months beats two hours a week.",
  },
  {
    title: "Mock interviews (for scholarship rounds)",
    body: "Most scholarship offers include an interview with the school. The kids who do well are the ones who&apos;ve practised - articulating interests, recovering from a curveball question, looking the interviewer in the eye. A handful of practice runs makes a real difference.",
  },
];

export default function ScholarshipTestPrepPage() {
  return (
    <main style={{ background: c.white, fontFamily: "'DM Sans', sans-serif", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Scholarship test prep</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              ACER and EduTest scholarship preparation.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Year 7 and Year 9 scholarship exams open doors to Melbourne&apos;s top private schools - and a meaningful fee reduction for the next six years. Tuterly connects families with tutors who&apos;ve prepared students for both major test formats and the school-specific entry exams that often sit alongside them. We pair 1-on-1 tutoring with structured daily practice through Educourse, our sister platform built specifically for this niche.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/directory" style={{ padding: "14px 28px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Find a scholarship tutor →
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
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>The tests</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              Two main formats - which one your child sits depends on the school.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {TESTS.map((t, i) => (
              <Fade key={t.name} delay={0.04 + i * 0.04}>
                <div style={{ background: c.white, borderRadius: 14, border: `1px solid ${c.border}`, padding: "22px 22px" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{t.name}</h3>
                  <p
                    style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}
                    dangerouslySetInnerHTML={{ __html: t.body }}
                  />
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>When to start</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              Year-by-year timeline.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {TIMING.map((t, i) => (
              <Fade key={t.when} delay={0.04 + i * 0.04}>
                <div style={{ background: c.offWhite, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px", display: "grid", gridTemplateColumns: "1fr 4fr", gap: 18 }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.teal }}>{t.when}</p>
                  <p
                    style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}
                    dangerouslySetInnerHTML={{ __html: t.body }}
                  />
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>What works</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              Four things that move scholarship scores most.
            </h2>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {WHAT_WORKS.map((item, i) => (
              <Fade key={item.title} delay={0.04 + i * 0.04}>
                <div style={{ background: c.white, borderRadius: 16, border: `1px solid ${c.border}`, padding: "22px 20px", height: "100%" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}>{item.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <SampleReport
        background={c.white}
        padding="80px 24px"
        preset="selective-numerical"
        heading="A sample scholarship session report."
        sub="What a Year 6 scholarship-prep parent receives after every session. Topic confidence on the four exam sections, areas to focus on for the week ahead, and practice questions at three difficulty tiers."
      />

      <EducourseCallout />

      <section style={{ padding: "72px 24px", background: c.white }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Start scholarship preparation.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 28 }}>
              Browse Tuterly tutors who&apos;ve prepared students for ACER, EduTest, and individual-school entry exams. Pair with Educourse for daily structured practice.
            </p>
            <Link href="/directory" style={{ display: "inline-block", padding: "14px 32px", borderRadius: 10, background: c.teal, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Find a tutor →
            </Link>
          </Fade>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}

import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import SampleReport from "@/components/marketing/SampleReport";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "Sample Session Report | What Tuterly Parents Receive";
const DESCRIPTION =
  "An interactive example of the session report sent to parents after every Tuterly tutoring session. Includes topic confidence, areas to focus, and practice.";
const URL = `${SITE_URL}/sample-report`;

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

const REPORT_INCLUDES = [
  {
    title: "What was covered",
    body: "A clear summary of the topics worked through in the session - which textbook chapter, which exam-style questions, which study-design dot points.",
  },
  {
    title: "How your child went",
    body: "An honest assessment from the tutor: where they're confident, where they hesitated, what concepts they need a second pass on.",
  },
  {
    title: "Topic confidence ratings",
    body: "Each topic gets a 1-5 confidence score that's tracked over time, so you can see which areas are improving and which still need work.",
  },
  {
    title: "Areas to focus on",
    body: "Specific, actionable next steps - which textbook exercises to attempt, which past papers to try, what to revisit before the next session.",
  },
  {
    title: "Practice questions",
    body: "Worksheets generated on the exact topics covered, with worked solutions. Your child can attempt them between sessions and bring anything they got stuck on to the next lesson.",
  },
  {
    title: "Automatic, every session",
    body: "Reports arrive in your inbox the same evening as the session. No chasing the tutor for an update, no \"how did it go this week?\" guesswork.",
  },
];

export default function SampleReportPage() {
  return (
    <main style={{ background: c.white, fontFamily: "'DM Sans', sans-serif", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      <section style={{ padding: "72px 24px 40px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Sample report</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              See what every Tuterly parent receives.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              An interactive example of the report your tutor sends after every session. Click through the practice questions, expand the solutions, and see exactly how detailed the feedback is. This isn&apos;t a marketing mock-up - it&apos;s the same template every Tuterly parent sees in their inbox.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/directory" style={{ padding: "14px 28px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Find a tutor →
              </Link>
              <Link href="/parents" style={{ padding: "14px 28px", borderRadius: 10, border: `2px solid ${c.border}`, color: c.text, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                How Tuterly works
              </Link>
            </div>
          </Fade>
        </div>
      </section>

      <SampleReport
        background={c.offWhite}
        padding="64px 24px"
        heading="The report in full."
        sub="Have a click through. The questions regenerate, the solutions toggle open, and the topic confidence reflects real per-session ratings tutors enter on the platform."
      />

      <section style={{ padding: "80px 24px", background: c.white }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>What goes into every report</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 12, lineHeight: 1.25 }}>
              Six things, every single time.
            </h2>
            <p style={{ fontSize: 15, color: c.textLight, textAlign: "center", maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.7 }}>
              Tutors don&apos;t write reports from scratch - they fill in a structured template the platform turns into the layout above. Means consistency across tutors, and no &quot;the report this week was a bit short&quot; surprises.
            </p>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {REPORT_INCLUDES.map((item, i) => (
              <Fade key={item.title} delay={0.05 + i * 0.04}>
                <div style={{ background: c.offWhite, borderRadius: 16, border: `1px solid ${c.border}`, padding: "22px 20px", height: "100%" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 8, lineHeight: 1.3 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6 }}>{item.body}</p>
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
              Want reports like this for your child?
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 28 }}>
              Browse experienced tutors in our directory. Every Tuterly tutor uses the platform - so every session gets a structured report just like the one above.
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

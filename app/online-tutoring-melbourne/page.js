import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "Online Tutoring Melbourne - How It Actually Works | Tuterly";
const DESCRIPTION =
  "Online tutoring for Melbourne students. Why it works, how Tuterly handles sessions, and when in-person is still the better choice.";
const URL = `${SITE_URL}/online-tutoring-melbourne`;

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

const BENEFITS = [
  {
    title: "Access to better tutors",
    body: "Your local catchment might have five maths tutors. Online, you can pick from every qualified Methods tutor in Melbourne. For specialist subjects (Specialist Maths, VCE Languages, Year 9 selective entry prep) the depth of pool matters enormously.",
  },
  {
    title: "No commute, either way",
    body: "Forty minutes of driving on a Tuesday evening is real. So is your child being tired from a day at school plus a car trip. Online sessions start the moment your kid sits down.",
  },
  {
    title: "Sessions can run anywhere",
    body: "Holidays, family travel, sick days where they still want to study - online means the session happens regardless. The bar for skipping is suddenly much higher.",
  },
  {
    title: "Recordings (if your tutor offers them)",
    body: "Some tutors let students re-watch the session if they want to. Particularly useful for VCE students working through complex Methods or Specialist concepts they want to review later.",
  },
];

const CONCERNS = [
  {
    title: "&quot;My kid can&apos;t focus on Zoom for an hour.&quot;",
    body: "Fair concern. The realistic answer: an experienced tutor running a 1-on-1 online session is very different from sitting through a school lesson on Zoom. With one student and one tutor, attention drift gets caught and addressed in seconds, not minutes. That said - some kids genuinely do work better in person. Worth a trial session before committing.",
  },
  {
    title: "&quot;How does paper / writing work online?&quot;",
    body: "Two ways. Either the student writes on paper and shows it to the camera (works fine for younger years), or they use a basic graphics tablet that displays on a shared screen - $40-80 one-off purchase. For VCE Methods specifically, the shared digital workspace makes annotation back-and-forth significantly faster than passing paper across a kitchen table.",
  },
  {
    title: "&quot;What about practicals - science labs, English texts?&quot;",
    body: "Practicals aren't replicable online and the school handles those. For everything else - writing analytical essays, working through chem equations, debugging a problem set - online is no different to in-person. Sometimes better, because the tutor can pull up reference material faster.",
  },
];

const HOW_IT_WORKS = [
  {
    title: "Pick a tutor from the directory",
    body: "Filter by subject, year level, and online vs in-person availability. Most Tuterly tutors offer both - you choose which one suits.",
  },
  {
    title: "Book directly with the tutor",
    body: "No agency middleman scheduling. You message the tutor, agree on a time, and they send a calendar invite with the video link.",
  },
  {
    title: "Session runs over your tutor&apos;s preferred platform",
    body: "Most use Zoom or Google Meet. The tutor handles the tech - you just click the link.",
  },
  {
    title: "Structured report after every session",
    body: "Same template every Tuterly parent receives. Topic confidence, areas to focus on, practice questions - in your inbox the same evening.",
  },
];

export default function OnlineTutoringPage() {
  return (
    <main style={{ background: c.white, fontFamily: "'DM Sans', sans-serif", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Online tutoring</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Online tutoring across Melbourne.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Online tutoring used to be a fallback option. It isn&apos;t any more. For most subjects from Year 7 up, an online 1-on-1 session is as effective as in-person - and the access to a wider tutor pool often makes it better. Here&apos;s the honest version of how it works, when it&apos;s great, and when in-person is still the right call.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/directory" style={{ padding: "14px 28px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Find an online tutor →
              </Link>
              <Link href="/sample-report" style={{ padding: "14px 28px", borderRadius: 10, border: `2px solid ${c.border}`, color: c.text, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                See a sample report
              </Link>
            </div>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Why it works</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              What online tutoring is actually good at.
            </h2>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {BENEFITS.map((b, i) => (
              <Fade key={b.title} delay={0.04 + i * 0.04}>
                <div style={{ background: c.white, borderRadius: 16, border: `1px solid ${c.border}`, padding: "22px 22px", height: "100%" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{b.title}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}>{b.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Common concerns</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              The questions every parent asks.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {CONCERNS.map((q, i) => (
              <Fade key={q.title} delay={0.04 + i * 0.04}>
                <div style={{ background: c.offWhite, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px" }}>
                  <h3
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 8 }}
                    dangerouslySetInnerHTML={{ __html: q.title }}
                  />
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}>{q.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>When in-person is still better</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Honest cases where online isn&apos;t the right call.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              Primary-aged students (especially Years 3-5) often work much better with a tutor sitting next to them - attention spans on a screen are real. Students with significant focus or learning differences usually do better in-person. And if your child specifically hates screens after a school day, that&apos;s a signal worth respecting. Most Tuterly tutors offer both, so you can switch if online isn&apos;t working out.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>How it works on Tuterly</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              Four steps from finding a tutor to first session.
            </h2>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {HOW_IT_WORKS.map((step, i) => (
              <Fade key={step.title} delay={0.04 + i * 0.04}>
                <div style={{ background: c.offWhite, borderRadius: 16, border: `1px solid ${c.border}`, padding: "22px 20px", height: "100%" }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Step {i + 1}</p>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6 }}>{step.body}</p>
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
              Find an online tutor.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 28 }}>
              Browse experienced Tuterly tutors who offer online sessions across every subject and year level.
            </p>
            <Link href="/directory" style={{ display: "inline-block", padding: "14px 32px", borderRadius: 10, background: c.teal, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Browse the directory →
            </Link>
          </Fade>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}

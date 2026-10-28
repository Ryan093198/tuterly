import AppCtaBand from "@/components/study/AppCtaBand";
import { AppHeroBlock } from "@/components/study/TutoringPageApp";
import { SITE_URL } from "@/lib/site";
import { STUDY_APP } from "@/lib/study-app";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "Online Tutoring Melbourne: How It Actually Works";
const DESCRIPTION =
  "Online tutoring for Melbourne students: why it works, the questions parents ask, when in-person is still better, and where Tuterly, a Years 7 to 10 maths practice app, fits.";
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
    body: "Your local catchment might have five maths tutors. Online, you can pick from every qualified Methods tutor in Melbourne. For specialist subjects (Specialist Maths, VCE Languages, selective entry prep) the depth of pool matters enormously.",
  },
  {
    title: "No commute, either way",
    body: "Forty minutes of driving on a Tuesday evening is real. So is your child being tired from a day at school plus a car trip. Online sessions start the moment your kid sits down.",
  },
  {
    title: "Sessions can run anywhere",
    body: "Holidays, family travel, sick days where they still want to study: online means the session happens regardless. The bar for skipping is suddenly much higher.",
  },
  {
    title: "Recordings (if your tutor offers them)",
    body: "Some tutors let students re-watch the session if they want to. Particularly useful for VCE students working through complex Methods or Specialist concepts they want to review later.",
  },
];

const CONCERNS = [
  {
    title: "“My kid can’t focus on Zoom for an hour.”",
    body: "Fair concern. The realistic answer: an experienced tutor running a 1-on-1 online session is very different from sitting through a school lesson on Zoom. With one student and one tutor, attention drift gets caught and addressed in seconds, not minutes. That said, some kids genuinely do work better in person. Worth a trial session before committing.",
  },
  {
    title: "“How does paper and writing work online?”",
    body: "Two ways. Either the student writes on paper and shows it to the camera (works fine for younger years), or they use a basic graphics tablet that displays on a shared screen, a one-off purchase of around $40 to $80. For VCE Methods specifically, the shared digital workspace makes annotation back-and-forth significantly faster than passing paper across a kitchen table.",
  },
  {
    title: "“What about practicals, like science labs?”",
    body: "Practicals aren’t replicable online and the school handles those. For everything else, like writing analytical essays, working through chem equations or debugging a problem set, online works much the same as in-person. Sometimes better, because the tutor can pull up reference material faster.",
  },
  {
    title: "“What do they do between sessions?”",
    body: "This is the part most families overlook. An hour a week is a small slice of the school week. For Years 7 to 10 maths, Tuterly covers the in-between: your child snaps the questions they got wrong and practises similar ones until each is mastered.",
  },
];

// Where the app fits around online tutoring. Facts only from
// TUTERLY-STUDY-FEATURES.md.
const HOW_THE_APP_FITS = [
  {
    title: "Snap a question",
    body: "Your child takes a photo of a maths question they got wrong, or uploads a whole marked test. The ones marked wrong are stored automatically.",
  },
  {
    title: "See the worked solution",
    body: "The full solution stays hidden until they want it, so they can try again first. Explain this shows the step that went wrong.",
  },
  {
    title: "Practise until it’s mastered",
    body: "Straight away, a similar question on the same idea, genuinely different. Three stars and it’s mastered, then they can try a harder one.",
  },
  {
    title: "Parents and tutors stay in the loop",
    body: "Parents see Week in review: what was added and mastered, test scores and the trickiest topic. A linked tutor can see the bank before a session and set snap goals.",
  },
];

export default function OnlineTutoringPage() {
  return (
    <main style={{ background: c.white, fontFamily: "var(--font-display)", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Online tutoring</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Online tutoring across Melbourne.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Online tutoring used to be a fallback option. It isn’t any more. For most subjects from Year 7 up, an online 1-on-1 session works well, and access to a wider tutor pool is a real advantage. Here’s the honest version of how it works, when it’s great, when in-person is still the right call, and where our maths practice app, Tuterly, fits in.
            </p>
            <AppHeroBlock placement="online_tutoring_melbourne_hero" />
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Why it works</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              What online tutoring is actually good at.
            </h2>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {BENEFITS.map((b, i) => (
              <Fade key={b.title} delay={0.04 + i * 0.04}>
                <div style={{ background: c.white, borderRadius: 16, border: `1px solid ${c.border}`, padding: "22px 22px", height: "100%" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{b.title}</h3>
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
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Common concerns</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              The questions every parent asks.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {CONCERNS.map((q, i) => (
              <Fade key={q.title} delay={0.04 + i * 0.04}>
                <div style={{ background: c.offWhite, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{q.title}</h3>
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
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>When in-person is still better</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Honest cases where online isn’t the right call.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              Primary-aged students (especially Years 3 to 5) often work much better with a tutor sitting next to them, because attention spans on a screen are real. Students with significant focus or learning differences usually do better in-person. And if your child specifically hates screens after a school day, that’s a signal worth respecting. Many tutors offer both, so ask whether you can switch if online isn’t working out.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Where Tuterly fits</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Not a tutor. The practice in between.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 28 }}>
              {STUDY_APP.name} is an iPhone app for Years 7 to 10 maths, designed by Australian educators at Bayside Academics in Brighton, Melbourne, with topics from the Victorian Curriculum 2.0. It doesn’t run sessions or teach new topics live. It works alongside online tutoring, or on its own when practice is mostly what your child needs. A 1-week free trial, then $7.99 a week: a whole week costs less than 10 minutes with a private tutor.
            </p>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {HOW_THE_APP_FITS.map((step, i) => (
              <Fade key={step.title} delay={0.04 + i * 0.04}>
                <div style={{ background: c.offWhite, borderRadius: 16, border: `1px solid ${c.border}`, padding: "22px 20px", height: "100%" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Step {i + 1}</p>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6 }}>{step.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <AppCtaBand placement="online_tutoring_melbourne_final" />
      <MarketingFooter />
    </main>
  );
}

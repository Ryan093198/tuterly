import AppCtaBand from "@/components/study/AppCtaBand";
import { AppHeroBlock } from "@/components/study/TutoringPageApp";
import { SITE_URL } from "@/lib/site";
import { STUDY_APP } from "@/lib/study-app";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "Best Online Tutoring in Melbourne: 2026 Guide";
const DESCRIPTION =
  "An honest guide to the best online tutoring in Melbourne: how the main types compare, what separates the good ones, and where a Years 7 to 10 maths practice app fits.";
const URL = `${SITE_URL}/best-online-tutoring-melbourne`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const TYPES = [
  {
    name: "National online tutoring companies",
    examples: "Cluey Learning, and similar large online-first providers",
    goodFor:
      "Families who want a fully managed, hands-off experience: the company matches the tutor, handles scheduling and payment, and runs sessions on its own platform.",
    tradeoffs:
      "The most expensive option, typically $90 to $150 an hour. You are assigned a tutor rather than choosing one.",
  },
  {
    name: "Online tutoring platforms",
    examples: "Marketplace-style platforms listing many tutors",
    goodFor:
      "Families who want to choose their own tutor from a wider pool (no travel radius to worry about), with hourly rates you can see.",
    tradeoffs:
      "Less hand-holding than a fully managed agency. You pick the tutor and deal with them directly, rather than having someone assign one for you.",
  },
  {
    name: "Independent online tutors",
    examples: "Uni students and teachers tutoring privately over video",
    goodFor:
      "Usually the cheapest tutoring, often $30 to $50 an hour, and some are genuinely excellent, especially high-ATAR uni students tutoring the subjects they just aced.",
    tradeoffs:
      "No vetting, no reviews and no extra tools. Quality is unpredictable and you carry all the admin. Worth extra reference-checking before committing to weekly sessions.",
  },
  {
    name: "Tutoring centres that moved online",
    examples: "Franchise centres offering online group classes",
    goodFor:
      "Reinforcing fundamentals through repetition, usually at a lower per-hour cost. Fine for primary maths and reading drills.",
    tradeoffs:
      "Usually group-based rather than one-on-one, so it suits targeted help on specific weak topics, or VCE-level work, less well.",
  },
];

const LOOK_FOR = [
  {
    title: "Will you know what happened in each session?",
    body: "The best online tutoring keeps you in the loop: what was covered, how your child went, and what to practise next. Most tutoring is still a black box until the next school report, so ask how and how often you’ll hear.",
  },
  {
    title: "Is there progress tracking across topics over time?",
    body: "A provider that can show you which topics are improving and which still need work, week by week, is genuinely different. It matters most for VCE and selective-entry prep, where the topic list is fixed and progress is measurable.",
  },
  {
    title: "How strong are the tutors, really?",
    body: "Online removes the travel radius, so you should expect access to a wider, stronger pool: tutors who know the exact subject your child is sitting. Ask about ATAR, subject specialisation and vetting (including a Working With Children Check).",
  },
  {
    title: "Are the rates upfront, or hidden behind an enquiry form?",
    body: "Rate transparency is rare in this industry. If a company will not tell you its hourly rate until you fill in a form, that is usually a sign the rate is higher than the market.",
  },
  {
    title: "What happens between sessions?",
    body: "A shared whiteboard is table stakes. Ask what your child does in the other six days of the week, and whether that practice is built on the questions they actually get wrong.",
  },
];

const FAQS = [
  {
    q: "Is online tutoring as effective as in-person?",
    a: "For many students it works well. Good online sessions use a shared whiteboard and screen sharing, and the big advantage is access: you can work with a specialist tutor in the exact subject your child is sitting, rather than whoever happens to be nearby. The quality of the tutor and the structure around the session matter far more than whether it is online or in person.",
  },
  {
    q: "How much does online tutoring cost in Melbourne?",
    a: "It ranges widely. A private tutor in Melbourne usually costs $80 to $100 an hour, national online agencies typically charge $90 to $150 an hour, and independent uni-student tutors are often $30 to $50. If what your child mainly needs is Years 7 to 10 maths practice rather than lessons, Tuterly is a 1-week free trial, then $7.99 a week.",
  },
  {
    q: "What is the best online tutoring company in Melbourne?",
    a: "There is no single best for everyone. If you want a fully managed, hands-off service and do not mind paying a premium, a national agency suits you. If you would rather choose your own tutor and see the rate upfront, look at platforms and independent tutors. Match the type to your family rather than the loudest brand.",
  },
  {
    q: "Is Tuterly online tutoring?",
    a: "No. Tuterly is an app for iPhone and Android for Years 7 to 10 maths, not a tutor. Your child snaps the questions they got wrong, sees the worked solution, and practises similar questions until each one is mastered. It works on its own or alongside any tutor, and it is coming soon to the App Store and Google Play.",
  },
  {
    q: "What year levels and subjects can be tutored online?",
    a: "Everything from primary through to VCE. Online is especially popular for VCE Maths Methods, English and the sciences, and for selective-entry and scholarship exam prep, where a specialist tutor matters more than proximity.",
  },
  {
    q: "Do you need special equipment for online tutoring?",
    a: "No. A laptop or tablet with a webcam and a stable internet connection is enough. A cheap stylus or a phone camera pointed at paper helps for handwritten maths working, but nothing specialised is required.",
  },
];

export default function BestOnlineTutoringMelbournePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main style={{ background: c.white, fontFamily: "var(--font-display)", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <MarketingNav />

      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>2026 guide</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Best online tutoring in Melbourne.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              An honest look at online tutoring for Melbourne families. Most “best online tutoring” articles are written by companies recommending themselves. This one walks through the real options fairly, what separates the good ones, and how to pick the right fit for your child. We make Tuterly, a maths practice app, and we’ll be clear about where it fits and where a tutor is the better choice.
            </p>
            <AppHeroBlock placement="best_online_tutoring_melbourne_hero" />
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>The options</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Online tutoring companies in Melbourne fall into four types.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              Working out which type fits your situation matters more than picking a brand. A primary student needing reading help wants something different from a Year 12 student chasing a 99 ATAR. Here is what each does well and where each falls short.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "32px 24px 64px", background: c.offWhite }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: 16 }}>
            {TYPES.map((t, i) => (
              <Fade key={t.name} delay={0.04 + i * 0.04}>
                <div style={{ background: c.white, borderRadius: 16, border: `1px solid ${c.border}`, padding: "24px 24px" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: c.navy, marginBottom: 4 }}>{t.name}</h3>
                  <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 14 }}>Examples: {t.examples}</p>
                  <div style={{ display: "grid", gap: 10 }}>
                    <div>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, color: c.success, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>Good for</p>
                      <p style={{ fontSize: 14, color: c.text, lineHeight: 1.6 }}>{t.goodFor}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, color: c.amber, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>Tradeoffs</p>
                      <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6 }}>{t.tradeoffs}</p>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>What separates the best</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              Five questions worth asking any online provider.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {LOOK_FOR.map((q, i) => (
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
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Where Tuterly fits</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Not tutoring: practice for Years 7 to 10 maths.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              {STUDY_APP.name} is an app for iPhone and Android designed by Australian educators at Bayside Academics, one of the leading tutoring companies in Melbourne. It does a different job from a tutor: your child snaps the maths questions they got wrong (or uploads a whole marked test), sees the full worked solution when they’re ready, and straight away practises a similar question on the same idea, until each one is mastered. Topics follow the Victorian Curriculum 2.0.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              It also has Test any topic, Fix my mistakes and Study notes, and parents see a Week in review of what was added and mastered, test scores and the trickiest topic. It’s a 1-week free trial, then $7.99 a week, cancel any time. A whole week costs less than 10 minutes with a private tutor.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              It is not for everyone. If your child needs someone to teach a topic live, needs help with VCE, English or primary work, or does better with a person keeping them on track, an online tutor is the better call. Many families use both: the tutor teaches, the app handles the practice in between.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Common questions</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              Online tutoring in Melbourne, answered.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {FAQS.map((f, i) => (
              <Fade key={f.q} delay={0.03 + i * 0.03}>
                <div style={{ background: c.offWhite, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{f.q}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}>{f.a}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>


      <AppCtaBand placement="best_online_tutoring_melbourne_final" />
      <MarketingFooter />
    </main>
  );
}

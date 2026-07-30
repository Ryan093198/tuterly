import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "Best Online Tutoring in Melbourne - 2026 Guide | Tuterly";
const DESCRIPTION =
  "An honest guide to the best online tutoring in Melbourne. How the main online tutoring companies compare, what separates the good ones, and how to choose the right fit for your child.";
const URL = `${SITE_URL}/best-online-tutoring-melbourne`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const TYPES = [
  {
    name: "National online tutoring companies",
    examples: "Cluey Learning, and similar large online-first providers",
    goodFor:
      "Families who want a fully managed, hands-off experience - the company matches the tutor, handles scheduling and payment, and runs sessions on its own platform.",
    tradeoffs:
      "The most expensive option, typically $90-150 per hour. You are assigned a tutor rather than choosing one, and because the tutor keeps a smaller share, the strongest tutors often move on over time.",
  },
  {
    name: "Online tutoring platforms",
    examples: "Tuterly and other marketplace-style platforms",
    goodFor:
      "Families who want to choose their own tutor from a wider pool (no travel radius to worry about), transparent hourly rates, and built-in tools like session reports and progress tracking.",
    tradeoffs:
      "Less hand-holding than a fully managed agency - you pick the tutor and message them directly, rather than having someone assign one for you.",
  },
  {
    name: "Independent online tutors",
    examples: "Uni students and teachers tutoring privately over video",
    goodFor:
      "The cheapest option, often $30-50 per hour, and some are genuinely excellent - especially high-ATAR uni students tutoring the subjects they just aced.",
    tradeoffs:
      "No vetting, no reviews and no tooling. Quality is unpredictable and you carry all the admin. Worth extra reference-checking before committing to weekly sessions.",
  },
  {
    name: "Tutoring centres that moved online",
    examples: "Franchise centres offering online group classes",
    goodFor:
      "Reinforcing fundamentals through repetition, usually at a lower per-hour cost. Fine for primary maths and reading drills.",
    tradeoffs:
      "Usually group-based rather than one-on-one, so it is less effective for targeted help on specific weak topics or for VCE-level work where individual attention is what moves marks.",
  },
];

const LOOK_FOR = [
  {
    title: "Do you actually get a report after each session?",
    body: "The best online tutoring gives you a clear write-up after every lesson - what was covered, how your child went, and what to practise next. Most tutoring is still a black box until the next school report. Reports are the single biggest difference between good and average.",
  },
  {
    title: "Is there progress tracking across topics over time?",
    body: "A provider that can show you which topics are improving and which still need work, week by week, is genuinely different. It matters most for VCE and selective-entry prep, where the topic list is fixed and progress is measurable.",
  },
  {
    title: "How strong are the tutors, really?",
    body: "Online removes the travel radius, so you should expect access to a wider, stronger pool - high-ATAR tutors in the exact subject your child is sitting. Ask about ATAR, subject specialisation and vetting (including a Working With Children Check).",
  },
  {
    title: "Are the rates upfront, or hidden behind an enquiry form?",
    body: "Rate transparency is rare in this industry. If a company will not tell you its hourly rate until you fill in a form, that is usually a sign the rate is higher than the market.",
  },
  {
    title: "Does the technology actually help, or just host the call?",
    body: "A shared whiteboard is table stakes. The platforms worth paying for add real value around the session - practice questions, printable worksheets, and a parent dashboard - not just a video window.",
  },
];

const FAQS = [
  {
    q: "Is online tutoring as effective as in-person?",
    a: "For most students, yes. Well-run online sessions use a shared whiteboard and screen sharing, and the big advantage is access - you can work with a specialist high-ATAR tutor in the exact subject your child is sitting, rather than whoever happens to be nearby. The quality of the tutor and the structure around the session matter far more than whether it is online or in person.",
  },
  {
    q: "How much does online tutoring cost in Melbourne?",
    a: "It ranges widely. National online agencies typically charge $90-150 per hour, platforms and independent tutors are usually more affordable, and Tuterly sessions start from $75 per hour, all-inclusive. See our Melbourne tutoring prices guide for a full breakdown.",
  },
  {
    q: "What is the best online tutoring company in Melbourne?",
    a: "There is no single best for everyone. If you want a fully managed, hands-off service and do not mind paying a premium, a national agency suits you. If you want to choose your own vetted tutor, see the rate upfront, and get a report after every session, a platform like Tuterly is a better fit. Match the type to your family rather than the loudest brand.",
  },
  {
    q: "What year levels and subjects can be tutored online?",
    a: "Everything from primary through to VCE. Online is especially strong for VCE Maths Methods, English, and the sciences, and for selective-entry and scholarship exam prep, where a specialist tutor matters more than proximity.",
  },
  {
    q: "Do you need special equipment for online tutoring?",
    a: "No - a laptop or tablet with a webcam and a stable internet connection is enough. A cheap stylus or a phone camera pointed at paper helps for handwritten maths working, but nothing specialised is required.",
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
    <main style={{ background: c.white, fontFamily: "'DM Sans', sans-serif", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <MarketingNav />

      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>2026 guide</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Best online tutoring in Melbourne.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              An honest look at online tutoring for Melbourne families. Most &quot;best online tutoring&quot; articles are written by companies recommending themselves - this one walks through the real options fairly, what separates the good ones, and how to pick the right fit for your child.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/directory" style={{ padding: "14px 28px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Browse Tuterly tutors →
              </Link>
              <Link href="/online-tutoring-melbourne" style={{ padding: "14px 28px", borderRadius: 10, border: `2px solid ${c.border}`, color: c.text, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                How online tutoring works
              </Link>
            </div>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>The options</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
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
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.navy, marginBottom: 4 }}>{t.name}</h3>
                  <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 14 }}>Examples: {t.examples}</p>
                  <div style={{ display: "grid", gap: 10 }}>
                    <div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.success, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>Good for</p>
                      <p style={{ fontSize: 14, color: c.text, lineHeight: 1.6 }}>{t.goodFor}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.amber, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>Tradeoffs</p>
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
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>What separates the best</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              Five questions worth asking any online provider.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {LOOK_FOR.map((q, i) => (
              <Fade key={q.title} delay={0.04 + i * 0.04}>
                <div style={{ background: c.offWhite, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{q.title}</h3>
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
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Where Tuterly fits</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              The modern online option.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              Tuterly is an online tutoring platform built by the team behind Bayside Academics, a Melbourne tutoring centre. You choose your own vetted, high-achieving tutor and pay them directly - sessions start from $75 per hour, all-inclusive, with no lock-in contracts.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              The difference is what wraps around each session: after every lesson you get a structured report on what was covered and what to practise, plus practice worksheets and a progress dashboard. It is the tooling agencies charge a premium for, available to any tutor on the platform.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              It is not for everyone. If you want a fully managed service where someone else picks the tutor and runs every detail, a national agency is the better call. But if you would rather see the rate up front, choose a tutor who actually fits your child, and know what happens every session, that is what we built.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Common questions</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              Online tutoring in Melbourne, answered.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {FAQS.map((f, i) => (
              <Fade key={f.q} delay={0.03 + i * 0.03}>
                <div style={{ background: c.offWhite, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{f.q}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}>{f.a}</p>
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
              See real tutors before you commit.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 28 }}>
              Browse Tuterly tutors with their actual hourly rates - no signup, no enquiry form. Or if you are outside the city, see our guide to the best online tutoring across Victoria.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/directory" style={{ display: "inline-block", padding: "14px 32px", borderRadius: 10, background: c.teal, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
                Browse the directory →
              </Link>
              <Link href="/best-online-tutoring-victoria" style={{ display: "inline-block", padding: "14px 32px", borderRadius: 10, border: `2px solid ${c.border}`, color: c.text, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
                Online tutoring in Victoria
              </Link>
            </div>
          </Fade>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}

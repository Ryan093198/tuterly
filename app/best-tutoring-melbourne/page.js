import AppCtaBand from "@/components/study/AppCtaBand";
import { AppHeroBlock } from "@/components/study/TutoringPageApp";
import { SITE_URL } from "@/lib/site";
import { STUDY_APP } from "@/lib/study-app";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "Best Tutoring Services in Melbourne: 2026 Honest Guide";
const DESCRIPTION =
  "An honest guide to tutoring in Melbourne: agencies, local tutoring services, online tutoring, centres, independent tutors and practice apps. What each is good for and how to pick.";
const URL = `${SITE_URL}/best-tutoring-melbourne`;

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

const CATEGORIES = [
  {
    name: "National tutoring agencies",
    examples: "Cluey Learning, Tutor Doctor, EzyMaths, KIP McGrath",
    goodFor:
      "Families who want a fully hands-off experience. The agency handles tutor matching, payment, and scheduling. Some have proprietary curriculum platforms.",
    tradeoffs:
      "Highest prices, typically $90 to $150 an hour. You’re usually assigned a tutor rather than choosing one, and the tutor is a contractor on a smaller share of what you pay.",
  },
  {
    name: "Local agencies and boutique services",
    examples: "Small Melbourne-based tutoring outfits, often run by ex-teachers",
    goodFor:
      "Families wanting a more personal touch than a national chain. Better local school knowledge: the owner often personally knows the schools and exams you’re aiming at.",
    tradeoffs:
      "Variable quality and scale. The best ones are excellent; the weakest are just a website between you and a contracted tutor. Look for reviews from families you can actually speak to.",
  },
  {
    name: "Online tutoring",
    examples: "Cluey (online-focused), other online providers, and tutors who teach over video",
    goodFor:
      "Families wanting wider tutor choice with no travel, which matters most for specialist subjects. Many providers add tools like progress tracking and reports.",
    tradeoffs:
      "A screen after a full school day doesn’t suit every child, especially younger ones. How much hand-holding you get varies a lot between providers.",
  },
  {
    name: "Tutoring centres and group classes",
    examples: "Kumon, NumberWorksnWords, Begin Bright, MathStar",
    goodFor:
      "Reinforcing fundamentals through consistent repetition. Cheaper per hour, around $25 to $50. Works well for primary maths and reading skills.",
    tradeoffs:
      "Not 1-on-1: usually 6 to 12 kids per teacher. Less suited to targeted help on specific weak areas or to VCE-level work, where 1-on-1 attention matters most.",
  },
  {
    name: "Independent tutors (direct listings)",
    examples: "Gumtree, Facebook groups, uni noticeboards, word of mouth",
    goodFor:
      "Usually the cheapest tutoring, and some genuinely excellent tutors run informal practices this way. Particularly common at uni-student rates, around $30 to $50 an hour.",
    tradeoffs:
      "No vetting, no review system, no extra tools. Quality is unpredictable. Worth doing extra reference-checking before committing to weekly sessions.",
  },
  {
    name: "Practice apps (not tutoring)",
    examples: "Tuterly Study, for Years 7 to 10 maths",
    goodFor:
      "The practice between lessons, or instead of them when that’s mostly what your child needs. In Tuterly Study they snap the maths questions they got wrong and practise similar ones until each is mastered. A 1-week free trial, then $7.99 a week.",
    tradeoffs:
      "An app doesn’t replace a person. There’s no live teacher to explain a brand-new topic, notice when your child is stuck or keep them motivated. Tuterly Study covers Years 7 to 10 maths only, on iPhone.",
  },
];

const WHAT_TO_LOOK_FOR = [
  {
    title: "What will your child do between sessions?",
    body: "An hour a week with a tutor is a small slice of a school week. Ask what practice happens in between, and whether it’s based on the questions your child actually gets wrong or on a generic worksheet.",
  },
  {
    title: "Will you know what’s happening?",
    body: "Most tutoring still operates as a black box: you pay, your child sits through an hour, and you don’t know what happened until the next school report. Ask how the provider keeps you in the loop, and how often.",
  },
  {
    title: "Are the hourly rates upfront, or hidden behind enquiry forms?",
    body: "Rate transparency is rare in this industry. If the provider won’t tell you their hourly rate without you filling out a form first, that’s usually a sign their rate is higher than the market.",
  },
  {
    title: "Can you choose your own tutor, or are you assigned one?",
    body: "Agencies typically assign. Independent tutors you choose yourself. The right answer depends on whether you trust your own judgement more than the agency’s, and whether you want to be able to switch tutors easily if it’s not working out.",
  },
];

export default function BestTutoringMelbournePage() {
  return (
    <main style={{ background: c.white, fontFamily: "var(--font-display)", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>2026 guide</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Best tutoring services in Melbourne.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              An honest look at your options. Most “best tutoring” articles online are written by tutoring companies recommending themselves. This one walks through every category fairly, what each is genuinely good at, and where each falls short. We make an app, Tuterly Study, and we’ll say plainly where it fits and where a tutor is the better call. Pick what fits your family, not what fits a marketing budget.
            </p>
            <AppHeroBlock placement="best_tutoring_melbourne_hero" />
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>The six options</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Help with schoolwork in Melbourne falls into six buckets.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              Knowing which bucket fits your situation matters more than picking a specific provider. A primary student needing reading help wants something different from a Year 12 student aiming high in VCE, and a Year 8 student who keeps losing marks on the same maths may not need a tutor at all. Here’s what each option does well and where each falls short.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "32px 24px 64px", background: c.offWhite }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: 16 }}>
            {CATEGORIES.map((cat, i) => (
              <Fade key={cat.name} delay={0.04 + i * 0.04}>
                <div style={{ background: c.white, borderRadius: 16, border: `1px solid ${c.border}`, padding: "24px 24px" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: c.navy, marginBottom: 4 }}>{cat.name}</h3>
                  <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 14 }}>Examples: {cat.examples}</p>
                  <div style={{ display: "grid", gap: 10 }}>
                    <div>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, color: c.success, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>Good for</p>
                      <p style={{ fontSize: 14, color: c.text, lineHeight: 1.6 }}>{cat.goodFor}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, color: c.amber, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>Tradeoffs</p>
                      <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6 }}>{cat.tradeoffs}</p>
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
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>What to actually look for</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              Four questions worth asking any provider.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {WHAT_TO_LOOK_FOR.map((q, i) => (
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
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Where Tuterly Study fits</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              The app option for Years 7 to 10 maths.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              {STUDY_APP.name} is an iPhone app, not a tutoring service. It was designed by Australian educators at Bayside Academics, one of the leading tutoring companies in Melbourne, for one job: practising the exact maths questions your child gets wrong. They snap a question (or upload a whole marked test), see the full worked solution when they’re ready, and straight away get a similar question on the same idea that’s genuinely different. Three stars and it’s mastered. Topics follow the Victorian Curriculum 2.0.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              There’s also Test any topic for a short test on any topic in their year, and Study notes for a revision sheet. Parents link with a 6-character code and see Week in review: what was added and mastered, test scores and the trickiest topic. It’s a 1-week free trial, then $7.99 a week. A private tutor in Melbourne usually costs $80 to $100 an hour, so a whole week costs less than 10 minutes with a private tutor.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              It’s not the right fit for every family. If your child needs someone to teach them a topic from scratch, needs help with VCE, English or primary school work, or simply works better with a person beside them, choose a tutor from the categories above. Plenty of families use both: the tutor teaches, and the app keeps the questions they got wrong coming back until they’re mastered.
            </p>
          </Fade>
        </div>
      </section>

      <AppCtaBand placement="best_tutoring_melbourne_final" />
      <MarketingFooter />
    </main>
  );
}

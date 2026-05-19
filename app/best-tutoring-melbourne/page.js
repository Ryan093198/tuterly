import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "Best Tutoring Services in Melbourne - 2026 Honest Guide";
const DESCRIPTION =
  "Honest guide to tutoring options in Melbourne - agencies, platforms, independent tutors, and tutoring centres. How to pick what's right for your family.";
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
      "Highest prices ($90-150/hr typically). The tutor is a contractor on a smaller share, which means the strongest tutors often eventually move to platform or independent work.",
  },
  {
    name: "Local agencies and boutique services",
    examples: "Small Melbourne-based tutoring outfits, often run by ex-teachers",
    goodFor:
      "Families wanting a more personal touch than a national chain. Better local school knowledge - the owner often personally knows the schools and exams you&apos;re aiming at.",
    tradeoffs:
      "Variable quality and scale. The best ones are excellent; the weakest are just a website between you and a contracted tutor. Look for reviews from families you can actually speak to.",
  },
  {
    name: "Online platforms",
    examples: "Tuterly, Cluey (also online-focused), some learning apps",
    goodFor:
      "Families wanting wider tutor choice (no geographic constraint), built-in tooling like progress tracking and reports, and transparent pricing.",
    tradeoffs:
      "Less hand-holding than a managed agency - you choose your own tutor and message them directly. Most platforms now offer both online and in-person; some are online-only.",
  },
  {
    name: "Tutoring centres / group classes",
    examples: "Kumon, NumberWorksnWords, Begin Bright, MathStar",
    goodFor:
      "Reinforcing fundamentals through consistent repetition. Cheaper per hour ($25-50). Works well for primary maths and reading skills.",
    tradeoffs:
      "Not 1-on-1 - usually 6-12 kids per teacher. Less effective for targeted help on specific weak areas or for VCE-level work, where 1-on-1 attention is what moves scores.",
  },
  {
    name: "Independent tutors (direct listings)",
    examples: "Gumtree, Facebook groups, uni noticeboards, word of mouth",
    goodFor:
      "Cheapest option - and some genuinely excellent tutors run informal practices this way. Particularly common at uni-student rates ($30-50/hr).",
    tradeoffs:
      "No vetting, no review system, no platform tooling. Quality is unpredictable. Worth doing extra reference-checking before committing to weekly sessions.",
  },
];

const WHAT_TO_LOOK_FOR = [
  {
    title: "Does the tutor send a structured report after every session?",
    body: "Most tutoring still operates as a black box - you pay, your child sits through an hour, and you don&apos;t know what happened until the next school report. Reports change the whole dynamic.",
  },
  {
    title: "Is there any progress tracking across topics over time?",
    body: "A tutor who can show you which topics are improving and which still need work, week by week, is genuinely different from one who can&apos;t. Particularly matters for VCE and selective entry prep where the topic list is fixed and progress is measurable.",
  },
  {
    title: "Are the hourly rates upfront, or hidden behind enquiry forms?",
    body: "Rate transparency is rare in this industry. If the provider won&apos;t tell you their hourly rate without you filling out a form first, that&apos;s usually a sign their rate is higher than the market.",
  },
  {
    title: "Can you choose your own tutor, or are you assigned one?",
    body: "Agencies typically assign. Platforms let you choose. The right answer depends on whether you trust your own judgment more than the agency&apos;s - and whether you want to be able to switch tutors easily if it&apos;s not working out.",
  },
];

export default function BestTutoringMelbournePage() {
  return (
    <main style={{ background: c.white, fontFamily: "'DM Sans', sans-serif", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>2026 guide</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Best tutoring services in Melbourne.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              An honest look at your options. Most &quot;best tutoring&quot; articles online are written by tutoring companies recommending themselves - this one walks through every category fairly, what each is genuinely good at, and where each falls short. Pick what fits your family, not what fits a marketing budget.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/directory" style={{ padding: "14px 28px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Browse Tuterly tutors →
              </Link>
              <Link href="/tutoring-prices-melbourne" style={{ padding: "14px 28px", borderRadius: 10, border: `2px solid ${c.border}`, color: c.text, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                See pricing guide
              </Link>
            </div>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>The five categories</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Tutoring in Melbourne falls into five buckets.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              Knowing which bucket fits your situation matters more than picking a specific provider. A primary student needing reading help wants something different from a Year 12 student aiming for a 99 ATAR. Here&apos;s what each category does well and where each falls short.
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
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.navy, marginBottom: 4 }}>{cat.name}</h3>
                  <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 14 }}>Examples: {cat.examples}</p>
                  <div style={{ display: "grid", gap: 10 }}>
                    <div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.success, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>Good for</p>
                      <p
                        style={{ fontSize: 14, color: c.text, lineHeight: 1.6 }}
                        dangerouslySetInnerHTML={{ __html: cat.goodFor }}
                      />
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.amber, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>Tradeoffs</p>
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
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>What to actually look for</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              Four questions worth asking any provider.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {WHAT_TO_LOOK_FOR.map((q, i) => (
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
              The modern platform option.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              Tuterly is in the &quot;online platform&quot; category. We&apos;re built around three observations: (1) the strongest tutors eventually leave agencies because of the commission, (2) most parents pay agency rates for what feels like a black-box service, and (3) the structured reporting and progress-tracking tools agencies use are easy to build into a platform that any independent tutor can use.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              So we built that. Independent tutors set their own rates, parents pay them directly, and the platform handles the session reports, the practice worksheets, and the progress dashboards. The result is agency-quality tooling at independent-tutor prices, with the tutor seeing more of what you pay.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              It&apos;s not the right fit for every family. If you want a fully managed experience where someone else picks the tutor and handles every detail, a national agency is the better call. But if you&apos;d rather see your tutor&apos;s rate up front, pick someone who actually fits your child, and know what&apos;s happening every session - this is what we built.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "72px 24px", background: c.white }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Have a browse before you commit.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 28 }}>
              You can see real tutors with their actual hourly rates in our directory - no signup, no enquiry form. Compare what&apos;s actually available before deciding which category suits your family.
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

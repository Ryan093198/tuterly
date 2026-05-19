import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import SavingsCalculator from "@/components/marketing/SavingsCalculator";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "Tutoring Prices in Melbourne 2026 - What You Should Pay";
const DESCRIPTION =
  "Real Melbourne tutoring prices by year level, subject, and provider type. What's reasonable, what's overpriced, and how to find better value.";
const URL = `${SITE_URL}/tutoring-prices-melbourne`;

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

const BY_YEAR_LEVEL = [
  {
    level: "Primary (Years 3-6)",
    range: "$40 - $65 / hour",
    body: "The widest band - because a uni student tutor and a primary teacher both work in this segment. For basic homework support, $45-50 from a strong uni student is reasonable. For reading specialists or scholarship-track prep, $65-75 is typical.",
  },
  {
    level: "Secondary (Years 7-10)",
    range: "$50 - $80 / hour",
    body: "Foundations work in algebra, geometry, English essay structure. The middle of this range is where most experienced tutors sit. Year 9 maths in particular pulls demand because of its role in deciding VCE pathways.",
  },
  {
    level: "VCE (Years 11-12)",
    range: "$70 - $110 / hour",
    body: "Where the rate jumps. Tutors who scored 40+ in the subject can charge $90-110. Tutors who teach at school level can charge $80-100. There&apos;s also a long tail of $60-70 uni-student tutors who can be excellent for foundational topics but vary widely in exam-technique experience.",
  },
  {
    level: "VCE Specialist Maths",
    range: "$80 - $130 / hour",
    body: "The highest tutoring rates in Melbourne. The pool of competent Specialist tutors is small and demand from ATAR-90+ aspirants is high. Worth the premium if you&apos;re targeting a study score above 35.",
  },
  {
    level: "Selective entry / scholarship prep",
    range: "$60 - $100 / hour",
    body: "Year 5-8 families preparing for John Monash Science, Nossal, MacRobertson, Suzanne Cory, or private school scholarships. Specialist niche - and tutors who&apos;ve actually gotten students into selective programs charge accordingly.",
  },
];

const BY_PROVIDER = [
  {
    type: "Large national agencies (eg Cluey, Tutor Doctor)",
    range: "$80 - $150 / hour",
    body: "What the parent pays. Agencies typically take 50-65% of that as commission, so the tutor sees $30-50 per hour. The premium covers tutor vetting, matching service, and the agency&apos;s own platform tooling. Worth it if you want a fully hands-off experience.",
  },
  {
    type: "Local agencies and boutique services",
    range: "$70 - $130 / hour",
    body: "Generally cheaper than national agencies and often run by educators who actually know the local schools. Variable quality - the strongest local agencies are excellent, the weakest are just middlemen with a website.",
  },
  {
    type: "Independent platform tutors (eg Tuterly)",
    range: "$50 - $100 / hour",
    body: "Same calibre of tutor as agencies (most platform tutors are educators or strong recent VCE graduates) but priced directly because there&apos;s no agency commission taken. You pay the tutor, the platform takes a small subscription instead.",
  },
  {
    type: "Independent listings (Gumtree, FB groups)",
    range: "$30 - $80 / hour",
    body: "The cheapest option and the most uneven. Some excellent tutors run informal practices this way; some chancers also do. No vetting, no review system, no platform tooling - just a hourly rate and a phone number.",
  },
  {
    type: "Tutoring centres (group classes)",
    range: "$25 - $50 / hour",
    body: "Not 1-on-1 - usually 6-12 students per teacher. Works well for reinforcing fundamentals through repetition; works poorly for targeted help on specific weak areas. Worth knowing the price for comparison.",
  },
];

const FAIR_PRICE = [
  "If you&apos;re paying $120+ per hour and not getting structured session reports, you&apos;re overpaying.",
  "If your tutor is charging $50-70 from Year 7 through to VCE Methods, they probably know the curriculum but may not have done the exam themselves recently.",
  "If you&apos;re paying agency prices ($100+) for tutoring you already have to chase the tutor for an update on, switch providers.",
  "The difference between a $60 tutor and a $100 tutor is rarely the lesson - it&apos;s the bits around it (reports, practice questions, progress tracking).",
];

export default function TutoringPricesPage() {
  return (
    <main style={{ background: c.white, fontFamily: "'DM Sans', sans-serif", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Pricing guide</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Tutoring prices in Melbourne (real numbers, no fluff).
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Tutoring pricing in Melbourne is wildly inconsistent. Two tutors with identical backgrounds can charge $40 and $90 for the same hour. Below is what we actually see across the market - by year level, by provider type, and what a fair price looks like in 2026.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/directory" style={{ padding: "14px 28px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                See Tuterly tutor rates →
              </Link>
              <Link href="/parents" style={{ padding: "14px 28px", borderRadius: 10, border: `2px solid ${c.border}`, color: c.text, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                How Tuterly works
              </Link>
            </div>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>By year level</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              What you should expect to pay.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {BY_YEAR_LEVEL.map((row, i) => (
              <Fade key={row.level} delay={0.04 + i * 0.03}>
                <div style={{ background: c.white, borderRadius: 14, border: `1px solid ${c.border}`, padding: "22px 22px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: c.navy }}>{row.level}</h3>
                    <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: c.teal }}>{row.range}</p>
                  </div>
                  <p
                    style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}
                    dangerouslySetInnerHTML={{ __html: row.body }}
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
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>By provider type</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              Five different ways to hire a tutor.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {BY_PROVIDER.map((row, i) => (
              <Fade key={row.type} delay={0.04 + i * 0.03}>
                <div style={{ background: c.offWhite, borderRadius: 14, border: `1px solid ${c.border}`, padding: "22px 22px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: c.navy }}>{row.type}</h3>
                    <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: c.teal }}>{row.range}</p>
                  </div>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}>{row.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>What you&apos;d save</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: c.navy, textAlign: "center", marginBottom: 12, lineHeight: 1.25 }}>
              Tuterly vs a typical agency.
            </h2>
            <p style={{ fontSize: 15, color: c.textLight, textAlign: "center", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.7 }}>
              Drag the slider to see what tutoring costs over different windows. Assumes the typical-agency rate of $100/hr vs an average Tuterly tutor rate of $60/hr, four lessons a month.
            </p>
          </Fade>
          <SavingsCalculator />
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Fair-price guide</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 20, lineHeight: 1.25 }}>
              Four things worth knowing about pricing.
            </h2>
            <ul style={{ display: "grid", gap: 14, listStyle: "none", padding: 0, margin: 0 }}>
              {FAIR_PRICE.map((line, i) => (
                <li key={i} style={{ display: "flex", gap: 12, alignItems: "start", padding: "16px 18px", background: c.offWhite, borderRadius: 12, border: `1px solid ${c.border}` }}>
                  <span style={{ color: c.teal, fontWeight: 700, fontSize: 18, marginTop: -1 }}>{i + 1}</span>
                  <p
                    style={{ fontSize: 15, color: c.text, lineHeight: 1.6 }}
                    dangerouslySetInnerHTML={{ __html: line }}
                  />
                </li>
              ))}
            </ul>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "72px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              See real rates in the directory.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 28 }}>
              Browse Tuterly tutors with their actual hourly rates visible up front. No agency markup, no enquiry-form pricing games.
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

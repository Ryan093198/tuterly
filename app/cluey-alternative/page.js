import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import ComparisonTable from "@/components/marketing/ComparisonTable";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "Cluey Alternative: Tuterly - Same Tools, No Agency Markup";
const DESCRIPTION =
  "Comparing Cluey Learning vs Tuterly: pricing, tutor pay, session reports, and flexibility. Honest breakdown of both options for Melbourne families.";
const URL = `${SITE_URL}/cluey-alternative`;

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

const COMPARISON_ROWS = [
  { label: "Online tutoring across Australia", tuterly: true, competitor: true },
  { label: "Detailed structured reports after every session", tuterly: true, competitor: true },
  { label: "Practice worksheets generated per session", tuterly: true, competitor: true },
  { label: "In-person tutoring available", tuterly: true, competitor: false },
  { label: "Tutor sets their own rate", tuterly: true, competitor: false },
  { label: "Browse and choose your own tutor", tuterly: true, competitor: false },
  { label: "Pay the tutor directly, no agency commission", tuterly: true, competitor: false },
  { label: "No long-term lock-in contracts", tuterly: true, competitor: false },
];

export default function ClueyAlternativePage() {
  return (
    <main style={{ background: c.white, fontFamily: "'DM Sans', sans-serif", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Cluey alternative</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Considering Cluey? Here&apos;s how Tuterly compares.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Cluey is one of the more established online tutoring brands in Australia, and for a lot of families it&apos;s a perfectly good fit. This page is a factual comparison of the two approaches - so you can pick the right one rather than the louder one. We&apos;ll be honest about where Cluey is the better choice and where Tuterly is.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/directory" style={{ padding: "14px 28px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Browse Tuterly tutors →
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
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>What Cluey does well</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              The honest version.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              Cluey is a well-built product. Their online classroom is purpose-designed for tutoring (rather than a generic Zoom call), they vet their tutors before letting them work, and they handle scheduling and payment so the parent never has to coordinate with the tutor directly. For families who want a fully managed &quot;agency handles everything&quot; experience, that&apos;s a real benefit.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              They also have proprietary lesson content - structured curriculum that tutors deliver - which can be a plus if you specifically want a more standardised teaching approach across tutors.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Where Tuterly is different</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              A platform, not an agency.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              Tuterly is structured differently. The tutors aren&apos;t contractors paid a fraction of the parent rate - they&apos;re independent operators who set their own price and keep what they earn. The platform provides the tooling (session reports, practice worksheets, progress dashboards, parent messaging) that&apos;s typically only available through an agency.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              What that means in practice:
            </p>
            <ul style={{ display: "grid", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
              {[
                ["Lower headline price", "Because no agency commission is taken out of the tutor&apos;s hourly rate. Average Tuterly rate is around $60/hr versus typical agency rates of $90-130/hr."],
                ["You choose your tutor", "Rather than being assigned one. You can browse their profile, see their rate, read their background, and pick the one that fits."],
                ["Online or in-person", "Cluey is online-only. Tuterly supports both, so you can switch if online isn&apos;t working out for your child."],
                ["You keep your tutor", "If a tutor leaves the platform, you can keep working with them directly - the relationship is yours, not the platform&apos;s."],
              ].map(([title, body]) => (
                <li key={title} style={{ background: c.offWhite, borderRadius: 12, border: `1px solid ${c.border}`, padding: "16px 18px" }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: c.navy, marginBottom: 4 }}>{title}</p>
                  <p
                    style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6 }}
                    dangerouslySetInnerHTML={{ __html: body }}
                  />
                </li>
              ))}
            </ul>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>Feature comparison</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, textAlign: "center", marginBottom: 32, lineHeight: 1.25 }}>
              The side-by-side.
            </h2>
          </Fade>
          <ComparisonTable
            eyebrow="Tuterly vs Cluey"
            heading="Same agency-tier tooling. Without the agency price."
            competitorName="Cluey"
            rows={COMPARISON_ROWS}
          />
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18 }}>
            <Fade>
              <div style={{ background: c.offWhite, borderRadius: 16, border: `1px solid ${c.border}`, padding: "24px 24px", height: "100%" }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.amber, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Stay with Cluey if</p>
                <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "You want a fully hands-off experience with no tutor coordination",
                    "You prefer standardised curriculum delivered consistently across tutors",
                    "You don&apos;t want to evaluate tutor profiles yourself",
                    "Online-only is what you want anyway",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{ fontSize: 14, color: c.text, lineHeight: 1.55, paddingLeft: 16, position: "relative" }}
                      dangerouslySetInnerHTML={{
                        __html: `<span style="position:absolute;left:0;color:${c.amber}">•</span> ${item}`,
                      }}
                    />
                  ))}
                </ul>
              </div>
            </Fade>
            <Fade delay={0.1}>
              <div style={{ background: c.tealPale, borderRadius: 16, border: `2px solid ${c.teal}`, padding: "24px 24px", height: "100%" }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Try Tuterly if</p>
                <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "You&apos;d rather see hourly rates upfront and pick your own tutor",
                    "You want the same agency-tier reporting tools at a lower price",
                    "You want both online and in-person as options",
                    "You already trust a specific tutor and want better tools for them",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{ fontSize: 14, color: c.text, lineHeight: 1.55, paddingLeft: 16, position: "relative" }}
                      dangerouslySetInnerHTML={{
                        __html: `<span style="position:absolute;left:0;color:${c.teal}">•</span> ${item}`,
                      }}
                    />
                  ))}
                </ul>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      <section style={{ padding: "72px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              See real tutors before you decide.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 28 }}>
              Browse Tuterly tutors in your area, see their rates upfront, and message them directly. No signup needed to look.
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

import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import ComparisonTable from "@/components/marketing/ComparisonTable";
import Testimonials from "@/components/marketing/Testimonials";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "Tutor Doctor Alternative: Tuterly | Platform vs Franchise";
const DESCRIPTION =
  "Comparing Tutor Doctor's franchise model with Tuterly's platform approach. Pricing, tutor pay, in-home vs online, flexibility.";
const URL = `${SITE_URL}/tutor-doctor-alternative`;

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
  { label: "Vetted tutors", tuterly: true, competitor: true },
  { label: "In-home / in-person tutoring", tuterly: true, competitor: true },
  { label: "Online tutoring", tuterly: true, competitor: true },
  { label: "Browse and choose your own tutor", tuterly: true, competitor: false },
  { label: "Hourly rates visible upfront", tuterly: true, competitor: false },
  { label: "Detailed structured session reports", tuterly: true, competitor: false },
  { label: "Practice worksheets generated per session", tuterly: true, competitor: false },
  { label: "Progress tracking across topics", tuterly: true, competitor: false },
  { label: "Tutor sets their own rate", tuterly: true, competitor: false },
  { label: "Pay tutor directly, no franchise margin", tuterly: true, competitor: false },
];

export default function TutorDoctorAlternativePage() {
  return (
    <main style={{ background: c.white, fontFamily: "'DM Sans', sans-serif", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Tutor Doctor alternative</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Considering Tutor Doctor? Here&apos;s how Tuterly compares.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Tutor Doctor and Tuterly are built around two different ideas. Tutor Doctor is a global franchise: local franchisees run the matching, employ the tutors as contractors, and handle scheduling. Tuterly is a platform: independent tutors run their own practices and we provide the tooling. Both have their place - this page is an honest comparison.
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
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>The franchise model</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              How Tutor Doctor works.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              Tutor Doctor runs as a franchise - each metropolitan area has a local franchisee who buys the brand, recruits tutors locally, and handles all the customer-facing operations. When you enquire, you&apos;re really enquiring with your area&apos;s franchise owner, who then matches a tutor from their roster to your child.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              The model&apos;s strength is the hands-off matching experience: you fill out a form, someone calls you back, a tutor turns up. Pricing is set by the franchisee and typically ranges $80-130 per hour depending on year level and subject. The tutor is paid a share of that - usually $30-50/hr.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>The platform model</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              How Tuterly works.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              Tuterly is structured around independent tutors running their own practices, supported by platform tooling. Tutors set their own hourly rate (typical range $50-90 per hour), parents pay them directly, and the platform handles the bits the agency model usually charges for: structured session reports, practice worksheet generators, progress dashboards, and parent communication.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              The trade-off is you do the choosing yourself. The directory shows real tutors with their hourly rates, year levels, and subjects visible upfront - you browse, you pick, you message the tutor directly. No enquiry form, no waiting for a callback, no surprise pricing.
            </p>
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
            eyebrow="Tuterly vs Tutor Doctor"
            heading="Platform tooling without the franchise margin."
            competitorName="Tutor Doctor"
            rows={COMPARISON_ROWS}
          />
        </div>
      </section>

      {/* TESTIMONIALS - real consented quotes only (lib/testimonials.js). */}
      <Testimonials
        variant="grid"
        tags={["compare", "parents", "value"]}
        limit={3}
        background={c.offWhite}
        padding="72px 24px"
        kicker="From our families"
        heading="Why families moved across."
      />

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18 }}>
            <Fade>
              <div style={{ background: c.offWhite, borderRadius: 16, border: `1px solid ${c.border}`, padding: "24px 24px", height: "100%" }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.amber, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Tutor Doctor might be better if</p>
                <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "You specifically want someone else to handle every detail of matching and onboarding",
                    "You only want in-home tutoring and want a brand that&apos;s been doing it for decades",
                    "You don&apos;t want to evaluate tutor profiles yourself",
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
                    "You want hourly rates visible upfront, no enquiry forms",
                    "You want structured session reports after every lesson",
                    "You want both online and in-person as options",
                    "You&apos;d like to pick a tutor based on their profile, not be assigned one",
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
              Have a browse before you commit.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 28 }}>
              See real Tuterly tutors with their rates, subjects, and year levels in our directory. No enquiry form, no callback queue.
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

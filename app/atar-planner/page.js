import { SITE_URL } from "@/lib/site";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import StudyAppCTA from "@/components/StudyAppCTA";
import { STUDY_APP } from "@/lib/study-app";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import Fade from "@/components/marketing/Fade";
import ATARPlanner from "@/components/atar/ATARPlanner";

const TITLE = "ATAR Course Planner - Check VCE Subjects Against Uni Requirements | Tuterly";
const DESCRIPTION =
  "Free ATAR calculator with course planning. See if your VCE subjects and scores meet the prerequisites for your dream uni course. Updated for 2026.";
const URL = `${SITE_URL}/atar-planner`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"],
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

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is ATAR calculated in Victoria?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VCAA scales each VCE Unit 3/4 study score. VTAC then takes your English score (or EAL / English Language / Literature) plus your three highest other scaled scores - that's your Primary 4 at 100% weight - and adds 10% of your 5th and 6th scaled scores as increments. The total is your aggregate, which converts to your ATAR via a published curve. The maximum possible aggregate is around 210, which converts to an ATAR of 99.95.",
      },
    },
    {
      "@type": "Question",
      name: "Are guaranteed ATARs the same as the actual cut-off?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The guaranteed ATAR is the score at which you're guaranteed an offer if you meet the prerequisites. The lowest selection rank is the lowest ATAR (with bonuses) that received an offer last year - it can be a few points lower than the guarantee for popular courses. We list both where universities publish them.",
      },
    },
    {
      "@type": "Question",
      name: "What if I don't take English?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every Victorian student must complete a Unit 3/4 English to receive an ATAR. The four options are English, EAL (for eligible students), English Language, and Literature. Any one of these counts as your Primary 4 English score in the ATAR aggregate. The calculator picks whichever English subject you scored highest in.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my estimated ATAR different from my real one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Real ATARs use scaled scores. VCAA scales each subject up or down based on how the cohort performed - Specialist Maths usually scales up, Health and Human Development usually scales down. This calculator treats raw scores as scaled for simplicity. The estimate is usually within a few ATAR points of the real number but can be more for subjects with large scaling adjustments.",
      },
    },
  ],
};

export default function ATARPlannerPage() {
  return (
    <main style={{ background: c.offWhite, fontFamily: "var(--font-display)", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <MarketingNav />

      <section style={{ padding: "60px 24px 32px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>
              ATAR Course Planner
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 16 }}>
              Plan your VCE subjects against the courses you want.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
              Pick a course, enter your raw study scores, and see your estimated ATAR plus which prerequisites you&apos;ve met. Free, no signup needed for the headline result.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "0 24px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto", background: c.tealPale, border: `1px solid ${c.teal}`, borderRadius: 12, padding: "14px 18px" }}>
          <p style={{ fontSize: 14, color: c.text, lineHeight: 1.6 }}>
            <strong style={{ color: c.tealDark }}>Course ATARs use the official 2025 VTAC December round.</strong>{" "}
            Numbers shown are the lowest selection ranks published by VTAC on 23 December 2025. The January round can shift some courses slightly, so verify on{" "}
            <a href="https://vtac.edu.au" target="_blank" rel="noopener" style={{ color: c.tealDark, fontWeight: 600 }}>vtac.edu.au</a>{" "}
            or the university&apos;s own course page before relying on it for an enrolment decision.
          </p>
        </div>
      </section>

      <section style={{ padding: "16px 0 80px", background: c.offWhite }}>
        <ATARPlanner />
      </section>

      <section style={{ padding: "40px 24px 80px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {/* Soft card only: the planner is a senior-years tool and the app
              covers Years 7 to 10. */}
          <StudyAppCTA
            variant="card"
            placement="atar_planner"
            heading="Still in Years 7 to 10?"
            sub={`Maths in Years 9 and 10 sets up VCE General Maths, Methods and Specialist. ${STUDY_APP.name} turns the questions your child gets wrong now into practice until they're mastered.`}
            style={{ margin: "0 0 40px" }}
          />
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>
              Disclaimer
            </p>
            <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.65 }}>
              This calculator uses the official 2025 VTAC Scaling Report (published 11 December 2025) for both the per-subject scaled-score curves and the aggregate-to-ATAR conversion table. Each subject has seven anchor points (raw 20, 25, 30, 35, 40, 45, 50) with the actual VTAC scaled values; we piecewise-linearly interpolate between them to scale any raw study score you enter. The aggregate is then mapped against VTAC&apos;s published minimum-aggregate-for-ATAR table. Results should be very close to the official ATAR for a given set of raw study scores. Course ATARs are 2025-entry estimates and can change year to year. Always verify entry requirements at{" "}
              <a href="https://vtac.edu.au" target="_blank" rel="noopener" style={{ color: c.tealDark, fontWeight: 600 }}>
                vtac.edu.au
              </a>{" "}
              or directly on the university&apos;s course page before relying on these numbers for an enrolment decision.
            </p>
          </Fade>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}

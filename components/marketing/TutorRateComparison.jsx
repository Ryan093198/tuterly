import Fade from "./Fade";
import { c } from "./theme";
import { TUTERLY_TUTOR_HOURLY, AGENCY_TUTOR_HOURLY } from "@/lib/site";

// Side-by-side take-home pay comparison shown on tutor-recruitment
// pages. Numbers come from lib/site.js so the two sides stay in sync
// across every tutor landing page.
export default function TutorRateComparison({
  background = c.white,
  padding = "72px 24px",
}) {
  const uplift = Math.round(
    ((TUTERLY_TUTOR_HOURLY - AGENCY_TUTOR_HOURLY) / AGENCY_TUTOR_HOURLY) * 100
  );

  return (
    <section style={{ padding, background }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Fade>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>What you take home</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: c.navy, textAlign: "center", marginBottom: 12, lineHeight: 1.25 }}>
            Set your rate around ${TUTERLY_TUTOR_HOURLY}/hour. Keep all of it.
          </h2>
          <p style={{ fontSize: 15, color: c.textLight, textAlign: "center", maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.7 }}>
            Tutors on Tuterly typically charge around ${TUTERLY_TUTOR_HOURLY}/hour and keep the full amount — about {uplift}% more take-home than the ~${AGENCY_TUTOR_HOURLY}/hour tutors usually earn working through an agency.
          </p>
        </Fade>
        <Fade delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            <div style={{ background: c.offWhite, borderRadius: 14, padding: "22px 22px", border: `1px solid ${c.border}` }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.textMuted, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Working through an agency</p>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, color: c.navy, lineHeight: 1.05, marginBottom: 8 }}>
                ${AGENCY_TUTOR_HOURLY}<span style={{ fontSize: 16, color: c.textMuted, fontWeight: 400 }}>/hr</span>
              </p>
              <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.55 }}>
                Typical take-home after the agency keeps its cut of what the parent pays.
              </p>
            </div>
            <div style={{ background: c.tealPale, borderRadius: 14, padding: "22px 22px", border: `2px solid ${c.teal}` }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Working through Tuterly</p>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, color: c.navy, lineHeight: 1.05, marginBottom: 8 }}>
                ${TUTERLY_TUTOR_HOURLY}<span style={{ fontSize: 16, color: c.textMuted, fontWeight: 400 }}>/hr</span>
              </p>
              <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.55 }}>
                What you&apos;d typically charge parents directly — and you keep every dollar of it.
              </p>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

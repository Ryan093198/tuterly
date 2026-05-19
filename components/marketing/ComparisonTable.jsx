import Fade from "./Fade";
import { c } from "./theme";

// Feature comparison table. Defaults to a generic Tuterly vs
// "typical tutoring company" framing for use on the parent / pricing
// pages, but accepts props so competitor-specific landing pages (eg
// /cluey-alternative, /tutor-doctor-alternative) can swap in their
// own competitor name + rows without code duplication.

const DEFAULT_ROWS = [
  { label: "Trained, vetted tutors", tuterly: true, competitor: true },
  { label: "Detailed post-session reports", tuterly: true, competitor: false },
  { label: "Progress tracking across topics", tuterly: true, competitor: false },
  { label: "VCAA-aligned practice worksheets", tuterly: true, competitor: false },
  { label: "Custom lesson plans on demand", tuterly: true, competitor: false },
  { label: "Transparent ratings + reviews on tutors", tuterly: true, competitor: false },
  { label: "No long-term contracts or lock-ins", tuterly: true, competitor: false },
];

export default function ComparisonTable({
  eyebrow = "Tuterly vs a typical tutoring company",
  heading = "Everything they offer, none of the inflated price.",
  competitorName = "Tutoring company",
  rows = DEFAULT_ROWS,
}) {
  return (
    <Fade delay={0.1}>
      <div style={{ background: c.white, borderRadius: 20, padding: "32px 28px", border: `1px solid ${c.border}`, textAlign: "left" }}>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>{eyebrow}</p>
        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: c.navy, lineHeight: 1.3, marginBottom: 20 }}>
          {heading}
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.7fr 0.7fr", borderTop: `1px solid ${c.border}` }}>
          <div style={{ padding: "12px 6px", fontSize: 12, color: c.textMuted, textTransform: "uppercase", letterSpacing: 1, borderBottom: `1px solid ${c.border}` }} />
          <div style={{ padding: "12px 6px", fontSize: 12, fontWeight: 700, color: c.teal, textAlign: "center", textTransform: "uppercase", letterSpacing: 1, borderBottom: `1px solid ${c.border}` }}>Tuterly</div>
          <div style={{ padding: "12px 6px", fontSize: 12, fontWeight: 700, color: c.textMuted, textAlign: "center", textTransform: "uppercase", letterSpacing: 1, borderBottom: `1px solid ${c.border}` }}>{competitorName}</div>
          {rows.map((row, i) => (
            <div key={i} style={{ display: "contents" }}>
              <div style={{ padding: "12px 6px", fontSize: 14, color: c.text, borderBottom: `1px solid ${c.border}` }}>{row.label}</div>
              <div style={{ padding: "12px 6px", fontSize: 18, textAlign: "center", borderBottom: `1px solid ${c.border}`, color: row.tuterly ? c.teal : "#cbd5e1" }}>{row.tuterly ? "✓" : "✕"}</div>
              <div style={{ padding: "12px 6px", fontSize: 18, textAlign: "center", borderBottom: `1px solid ${c.border}`, color: row.competitor ? c.teal : "#cbd5e1" }}>{row.competitor ? "✓" : "✕"}</div>
            </div>
          ))}
        </div>
      </div>
    </Fade>
  );
}

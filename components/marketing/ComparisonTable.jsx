import Fade from "./Fade";
import { c } from "./theme";

// Static feature comparison between Tuterly and a typical tutoring
// company. Pure visual — no interactivity, no state.
const ROWS = [
  { label: "Trained, vetted tutors", tuterly: true, company: true },
  { label: "Detailed post-session reports", tuterly: true, company: false },
  { label: "Progress tracking across topics", tuterly: true, company: false },
  { label: "VCAA-aligned practice worksheets", tuterly: true, company: false },
  { label: "Custom lesson plans on demand", tuterly: true, company: false },
  { label: "Transparent ratings + reviews on tutors", tuterly: true, company: false },
  { label: "No long-term contracts or lock-ins", tuterly: true, company: false },
];

export default function ComparisonTable() {
  return (
    <Fade delay={0.1}>
      <div style={{ background: c.white, borderRadius: 20, padding: "32px 28px", border: `1px solid ${c.border}`, textAlign: "left" }}>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>Tuterly vs a typical tutoring company</p>
        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: c.navy, lineHeight: 1.3, marginBottom: 20 }}>
          Everything they offer, none of the inflated price.
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.7fr 0.7fr", borderTop: `1px solid ${c.border}` }}>
          <div style={{ padding: "12px 6px", fontSize: 12, color: c.textMuted, textTransform: "uppercase", letterSpacing: 1, borderBottom: `1px solid ${c.border}` }} />
          <div style={{ padding: "12px 6px", fontSize: 12, fontWeight: 700, color: c.teal, textAlign: "center", textTransform: "uppercase", letterSpacing: 1, borderBottom: `1px solid ${c.border}` }}>Tuterly</div>
          <div style={{ padding: "12px 6px", fontSize: 12, fontWeight: 700, color: c.textMuted, textAlign: "center", textTransform: "uppercase", letterSpacing: 1, borderBottom: `1px solid ${c.border}` }}>Tutoring company</div>
          {ROWS.map((row, i) => (
            <div key={i} style={{ display: "contents" }}>
              <div style={{ padding: "12px 6px", fontSize: 14, color: c.text, borderBottom: `1px solid ${c.border}` }}>{row.label}</div>
              <div style={{ padding: "12px 6px", fontSize: 18, textAlign: "center", borderBottom: `1px solid ${c.border}`, color: row.tuterly ? c.teal : "#cbd5e1" }}>{row.tuterly ? "✓" : "✕"}</div>
              <div style={{ padding: "12px 6px", fontSize: 18, textAlign: "center", borderBottom: `1px solid ${c.border}`, color: row.company ? c.teal : "#cbd5e1" }}>{row.company ? "✓" : "✕"}</div>
            </div>
          ))}
        </div>
      </div>
    </Fade>
  );
}

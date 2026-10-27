import { c } from "@/components/marketing/theme";

// Illustration of the parent's weekly summary in Tuterly Study. Example
// numbers only (taken from the app spec), and labelled as such.
export default function WeeklySummaryCard() {
  return (
    <div style={{ background: c.navy, color: c.white, borderRadius: 20, padding: 28, boxShadow: "0 24px 60px rgba(15,23,42,0.18)" }}>
      <p style={{ fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase", color: c.tealLight, fontWeight: 700, margin: "0 0 14px" }}>Example weekly summary</p>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", margin: "0 0 6px" }}>This week</p>
      <p style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", margin: "0 0 22px" }}>7 snapped · 4 fixed · 11 to go</p>
      <div style={{ display: "grid", gap: 12 }}>
        {[
          ["Algebra · Linear equations", "6 to fix · 9 fixed", 0.6],
          ["Number · Fractions", "3 to fix · 4 fixed", 0.57],
          ["Measurement · Area", "2 to fix · 1 fixed", 0.33],
        ].map(([t, s, pct]) => (
          <div key={t} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 14 }}>
              <span>{t}</span>
              <span style={{ color: "rgba(255,255,255,0.7)", whiteSpace: "nowrap" }}>{s}</span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.12)", borderRadius: 3, marginTop: 8 }}>
              <div style={{ width: `${pct * 100}%`, height: "100%", background: c.tealLight, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: "16px 0 0" }}>Illustration with example numbers.</p>
    </div>
  );
}

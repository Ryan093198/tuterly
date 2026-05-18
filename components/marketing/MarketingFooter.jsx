import Link from "next/link";
import { c } from "./theme";

// Shared footer for the /tutoring marketing pages. Carries the
// "Areas we serve" internal link so Google has one more crawl path
// to the suburb pages and the directory.
export default function MarketingFooter() {
  return (
    <footer style={{ background: c.navy, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg, ${c.teal}, ${c.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: c.white }}>T</div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>tuterly</span>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <Link href="/tutoring" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Areas we serve</Link>
          <Link href="/learn" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Learn</Link>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2026 Tuterly by Bayside Academics</p>
      </div>
    </footer>
  );
}

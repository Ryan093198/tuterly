import Link from "next/link";
import { c } from "./theme";
import { APP_URL } from "@/lib/site";
import { STUDY_APP } from "@/lib/study-app";
import StudyAppCTA from "@/components/StudyAppCTA";

// Sticky top nav shared across the marketing pages. The primary button is
// the Tuterly Study app CTA. "Find a Tutor" and "Apply as a Tutor" live in
// the footer's Tutoring group (components/marketing/MarketingFooter.jsx).
// On phones the text links fold into a Menu (no JS: <details>).
const LINKS = [
  { href: "/", label: STUDY_APP.name },
  { href: "/worksheets", label: "Free worksheets" },
  { href: "/practice-maths-tests-secondary", label: "Practice tests" },
  { href: "/atar-planner", label: "ATAR planner" },
  { href: "/learn", label: "Learn" },
];

const linkStyle = { padding: "8px 12px", borderRadius: 8, fontSize: 13.5, fontWeight: 600, color: c.textLight, textDecoration: "none", whiteSpace: "nowrap" };

export default function MarketingNav() {
  return (
    <nav aria-label="Main" style={{ background: c.white, borderBottom: `1px solid ${c.border}`, padding: "14px 20px", position: "sticky", top: 0, zIndex: 20 }}>
      <style>{`
        .mn-menu { display: none; position: relative; }
        .mn-menu > summary { list-style: none; cursor: pointer; }
        .mn-menu > summary::-webkit-details-marker { display: none; }
        @media (max-width: 860px) {
          .mn-links { display: none !important; }
          .mn-menu { display: block; }
        }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg, ${c.teal}, ${c.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: c.white }}>T</div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.navy }}>tuterly</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div className="mn-links" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} style={linkStyle}>{l.label}</Link>
            ))}
            <a href={APP_URL} style={linkStyle}>Log in</a>
          </div>
          <details className="mn-menu">
            <summary aria-label="Menu" style={{ ...linkStyle, color: c.navy, border: `1px solid ${c.border}` }}>Menu</summary>
            <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: c.white, border: `1px solid ${c.border}`, borderRadius: 12, padding: 8, display: "grid", minWidth: 200, boxShadow: "0 16px 40px rgba(15,23,42,0.12)" }}>
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} style={{ ...linkStyle, padding: "10px 12px" }}>{l.label}</Link>
              ))}
              <a href={APP_URL} style={{ ...linkStyle, padding: "10px 12px" }}>Log in</a>
            </div>
          </details>
          <StudyAppCTA variant="nav" placement="nav" />
        </div>
      </div>
    </nav>
  );
}

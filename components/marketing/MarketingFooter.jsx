import Link from "next/link";
import { c } from "./theme";
import { APP_URL } from "@/lib/site";
import { STUDY_APP } from "@/lib/study-app";

// Shared footer for the marketing pages. Every link the footer and nav
// used to carry is still here: the tutoring links (directory, find a local
// tutor, areas we serve, apply as a tutor, ...) sit in the Tutoring group
// so Google keeps a crawl path to the suburb pages and the directory.
const GROUPS = [
  {
    title: STUDY_APP.name,
    links: [
      { href: "/", label: `About ${STUDY_APP.name}` },
      { href: "/parents", label: "For parents" },
      { href: "/worksheets", label: "Free worksheets" },
      { href: "/practice-maths-tests-secondary", label: "Secondary practice tests" },
      { href: "/practice-maths-tests-primary", label: "Primary practice tests" },
      { href: "/atar-planner", label: "ATAR planner" },
      { href: "/learn", label: "Learn" },
    ],
  },
  {
    title: "Tutoring",
    links: [
      { href: "/directory", label: "Find a Tutor" },
      { href: "/find-a-tutor", label: "Find a local tutor" },
      { href: "/tutoring", label: "Areas we serve" },
      { href: "/best-online-tutoring-melbourne", label: "Online tutoring" },
      { href: "/vce-tutoring", label: "VCE tutoring" },
      { href: "/tutoring-prices-melbourne", label: "Tutoring prices" },
      { href: "/tutors", label: "Apply as a Tutor" },
      { href: "/tutors/blog", label: "Tutor Blog" },
      { href: "https://baysideacademics.com.au", label: "Bayside Academics", external: true },
    ],
  },
  {
    title: "Tuterly",
    links: [
      { href: APP_URL, label: "Log in", external: true },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

const linkStyle = { fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none", lineHeight: 1.4 };

export default function MarketingFooter() {
  return (
    <footer style={{ background: c.navy, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "44px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between" }}>
          <div style={{ minWidth: 180 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg, ${c.teal}, ${c.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: c.white }}>T</div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>tuterly</span>
            </div>
          </div>
          {GROUPS.map((g) => (
            <div key={g.title} style={{ minWidth: 160 }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: "rgba(255,255,255,0.8)", margin: "0 0 12px" }}>{g.title}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 9 }}>
                {g.links.map((l) => (
                  <li key={l.href + l.label}>
                    {l.external ? (
                      <a href={l.href} style={linkStyle}>{l.label}</a>
                    ) : (
                      <Link href={l.href} style={linkStyle}>{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: "32px 0 0" }}>© 2026 Tuterly by Bayside Academics</p>
      </div>
    </footer>
  );
}

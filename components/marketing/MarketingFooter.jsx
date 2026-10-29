import Link from "next/link";
import { STUDY_APP } from "@/lib/study-app";
import { Logo } from "./MarketingNav";
import "@/components/brand/brand.css";

// Shared footer. Since Oct 2026 the site's only call to action is the
// Tuterly app, so the footer carries no tutor sign-up, directory or
// tutor-job links (those pages redirect home, see proxy.js). The tutoring
// guides stay linked so Google keeps a crawl path to them.
const GROUPS = [
  {
    title: "The app",
    links: [
      { href: "/", label: `About ${STUDY_APP.name}` },
      { href: "/try", label: "Try it free" },
      { href: "/features", label: "Features" },
      { href: "/parents", label: "For parents" },
      { href: "/students", label: "For students" },
      { href: "/maths-exam-preparation", label: "Exam preparation" },
      { href: "/practice-maths-tests-secondary", label: "Practice test generator" },
      { href: "/worksheets", label: "Free worksheet generator" },
      { href: "/learn", label: "Learn" },
      { href: "/atar-planner", label: "ATAR planner" },
    ],
  },
  {
    title: "Guides",
    links: [
      { href: "/tutoring", label: "Tutoring in Melbourne" },
      { href: "/best-online-tutoring-melbourne", label: "Online tutoring" },
      { href: "/vce-tutoring", label: "VCE tutoring" },
      { href: "/cluey-alternative", label: "Cluey alternative" },
    ],
  },
  {
    title: "Tuterly",
    links: [
      { href: "/guarantee", label: "Results guarantee" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export default function MarketingFooter() {
  return (
    <footer className="tb-footer">
      <div className="tb-wrap">
        <div className="tb-footer__grid">
          <div>
            <Logo />
          </div>
          {GROUPS.map((g) => (
            <div key={g.title}>
              <p className="tb-footer__title">{g.title}</p>
              <ul className="tb-footer__list">
                {g.links.map((l) => (
                  <li key={l.href + l.label}>
                    {l.external ? <a href={l.href}>{l.label}</a> : <Link href={l.href}>{l.label}</Link>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="tb-footer__legal">© 2026 Tuterly by Bayside Academics</p>
      </div>
    </footer>
  );
}

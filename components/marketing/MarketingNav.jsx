import Link from "next/link";
import { Menu } from "lucide-react";
import { APP_URL } from "@/lib/site";
import { STUDY_APP } from "@/lib/study-app";
import StudyAppCTA from "@/components/StudyAppCTA";
import "@/components/brand/brand.css";

// Sticky top nav for the marketing site, in the app's style. The primary
// button is the Tuterly Study app CTA. "Find a Tutor" and "Apply as a
// Tutor" live in the footer's Tutoring group. On phones: logo, the app
// button and a Menu (a <details>, so no JavaScript).
const LINKS = [
  { href: "/", label: STUDY_APP.name },
  { href: "/worksheets", label: "Free worksheets" },
  { href: "/practice-maths-tests-secondary", label: "Practice tests" },
  { href: "/atar-planner", label: "ATAR planner" },
  { href: "/learn", label: "Learn" },
];

export function Logo() {
  return (
    <Link href="/" className="tb-logo" aria-label="Tuterly home">
      <span className="tb-logo__mark" aria-hidden="true">t</span>
      <span className="tb-logo__word">tuterly</span>
    </Link>
  );
}

export default function MarketingNav() {
  return (
    <nav aria-label="Main" className="tb-nav">
      <div className="tb-nav__in">
        <Logo />
        <div className="tb-nav__right">
          <div className="tb-nav__links">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="tb-nav__link">{l.label}</Link>
            ))}
            <a href={APP_URL} className="tb-nav__link">Log in</a>
          </div>
          <StudyAppCTA variant="nav" placement="nav" />
          <details className="tb-nav__menu">
            <summary aria-label="Menu">
              <Menu size={20} strokeWidth={2.5} aria-hidden="true" />
            </summary>
            <div className="tb-nav__panel">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="tb-nav__link">{l.label}</Link>
              ))}
              <a href={APP_URL} className="tb-nav__link">Log in</a>
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}

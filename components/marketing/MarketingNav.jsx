import Link from "next/link";
import { Menu } from "lucide-react";
import StudyAppCTA from "@/components/StudyAppCTA";
import TuterlyMark from "@/components/brand/TuterlyMark";
import "@/components/brand/brand.css";

// Sticky top nav for the marketing site, in the app's style. The primary
// button is the Tuterly app CTA. "Find a Tutor" and "Apply as a
// Tutor" live in the footer's Tutoring group. On phones: logo, the app
// button and a Menu (a <details>, so no JavaScript).
const LINKS = [
  { href: "/try", label: "Try it free" },
  { href: "/features", label: "Features" },
  { href: "/parents", label: "For parents" },
  { href: "/students", label: "For students" },
  { href: "/worksheets", label: "Free worksheets" },
  { href: "/learn", label: "Learn" },
];

export function Logo() {
  return (
    <Link href="/" className="tb-logo" aria-label="Tuterly home">
      <TuterlyMark height={30} />
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
              <Link key={l.href} href={l.href} className={`tb-nav__link${l.href === "/try" ? " tb-nav__link--try" : ""}`}>{l.label}</Link>
            ))}
          </div>
          <StudyAppCTA variant="nav" placement="nav" />
          <details className="tb-nav__menu">
            <summary aria-label="Menu">
              <Menu size={20} strokeWidth={2.5} aria-hidden="true" />
            </summary>
            <div className="tb-nav__panel">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={`tb-nav__link${l.href === "/try" ? " tb-nav__link--try" : ""}`}>{l.label}</Link>
              ))}
              </div>
          </details>
        </div>
      </div>
    </nav>
  );
}

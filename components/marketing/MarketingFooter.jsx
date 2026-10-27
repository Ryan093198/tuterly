import Link from "next/link";
import { APP_URL } from "@/lib/site";
import { STUDY_APP } from "@/lib/study-app";
import { Logo } from "./MarketingNav";
import "@/components/brand/brand.css";

// Shared footer. Every link the footer and old nav carried is still here:
// the tutoring links (directory, find a local tutor, areas we serve, apply
// as a tutor, ...) sit in the Tutoring group so Google keeps a crawl path
// to the suburb pages and the directory.
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

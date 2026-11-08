import Link from "next/link";
import { STUDY_APP } from "@/lib/study-app";
import { Logo } from "./MarketingNav";
import "@/components/brand/brand.css";

// Shared footer. Since Oct 2026 the site's only call to action is the
// Tuterly app, so the footer carries no tutor sign-up, directory or
// tutor-job links (those pages redirect home, see proxy.js). The tutoring
// guides stay linked so Google keeps a crawl path to them.
// Grouped 6 Nov 2026 (Ryan): "The app" is only about the app; free tools,
// guides and comparisons each get their own column.
const GROUPS = [
  {
    title: "The app",
    links: [
      { href: "/", label: `About ${STUDY_APP.name}` },
      { href: "/try", label: "Try it free" },
      { href: "/features", label: "Features" },
      { href: "/parents", label: "For parents" },
      { href: "/students", label: "For students" },
      { href: "/teachers", label: "For teachers" },
    ],
  },
  {
    title: "Free resources",
    links: [
      { href: "/worksheets", label: "Worksheet generator" },
      { href: "/practice-maths-tests-secondary", label: "Practice test generator" },
      { href: "/exam-generator", label: "Practice exam generator" },
      { href: "/maths-tests", label: "Practice tests by topic" },
      { href: "/end-of-year-maths-exams", label: "End-of-year exam practice" },
      { href: "/naplan", label: "NAPLAN practice tests" },
      { href: "/formula-sheets", label: "Formula sheets" },
      { href: "/mind-maps", label: "Revision mind maps" },
      { href: "/years", label: "Maths by year (7 to 10)" },
      { href: "/calculators/pythagoras", label: "Pythagoras calculator" },
      { href: "/calculators/trigonometry", label: "Trigonometry calculator" },
      { href: "/atar-planner", label: "ATAR planner" },
    ],
  },
  {
    title: "Study guides",
    links: [
      { href: "/maths", label: "Maths explained" },
      { href: "/maths/pythagoras-theorem", label: "Pythagoras' theorem" },
      { href: "/maths/sohcahtoa", label: "SOH CAH TOA" },
      { href: "/maths/index-laws", label: "Index laws" },
      { href: "/maths-exam-preparation", label: "Exam preparation" },
      { href: "/scholarship", label: "Scholarship guides" },
      { href: "/scholarship-practice", label: "Scholarship practice" },
      { href: "/learn", label: "Learn (all articles)" },
    ],
  },
  {
    title: "Parent guides",
    links: [
      { href: "/parents/help-with-secondary-maths-homework", label: "Helping with maths homework" },
      { href: "/parents/maths-app-vs-tutoring", label: "Maths app or tutor?" },
      { href: "/parents/end-of-year-maths-report", label: "The end-of-year report" },
      { href: "/parents/preparing-for-maths-topic-tests", label: "Preparing for topic tests" },
      { href: "/parents/studied-but-failed-maths-test", label: "Studied but still failed" },
      { href: "/parents/dyscalculia", label: "Dyscalculia" },
    ],
  },
  {
    title: "Compare",
    links: [
      { href: "/best-maths-apps-australia", label: "Best maths apps in Australia" },
      { href: "/parents/cluey-learning-review", label: "Cluey Learning review" },
      { href: "/cluey-alternative", label: "Cluey alternative" },
      { href: "/parents/kumon-cost-australia", label: "Kumon cost" },
      { href: "/mathspace-alternative", label: "Mathspace alternative" },
      { href: "/photomath-alternative", label: "Photomath alternative" },
      { href: "/quizlet-maths-australia", label: "Quizlet for maths" },
    ],
  },
  {
    title: "Tutoring",
    links: [
      { href: "/tutoring", label: "Tutoring in Melbourne" },
      { href: "/best-online-tutoring-melbourne", label: "Online tutoring" },
      { href: "/vce-tutoring", label: "VCE tutoring" },
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
        <div className="tb-footer__logo">
          <Logo />
        </div>
        <div className="tb-footer__grid">
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

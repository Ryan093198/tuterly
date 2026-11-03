import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import WorksheetGenerator from "@/components/WorksheetGenerator";
import WorksheetUpgrade from "@/components/study/WorksheetUpgrade";
import { getTopicGroupsForLevel } from "@/lib/curriculum-topics";
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { strandOf, HUB_YEARS } from "@/lib/year-hubs";
import { SITE_URL } from "@/lib/site";
import "@/components/state/state-hub.css";

// Algebra hub: every algebra topic page, Years 7 to 10A. Built 4 Nov 2026
// for "algebra worksheets" (about 590 a month in Australia, Keyword
// Planner), which had no page. State-neutral copy, no em dashes.

const YEARS = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 10A"];
const URL = `${SITE_URL}/worksheets/algebra`;
const TITLE = "Free Algebra Worksheets with Answers, Years 7 to 10 (Australian Curriculum) | Tuterly";
const DESCRIPTION =
  "Free algebra worksheets for Years 7 to 10 and 10A: substitution, expanding and factorising, linear equations, quadratics, simultaneous equations and more. New questions every time, with worked solutions.";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const PATH = [
  { y: "Year 7", t: "Letters stand for numbers. Students substitute into formulas, collect like terms, use the distributive law and solve simple equations." },
  { y: "Year 8", t: "Manipulating expressions: expanding brackets (including negatives), factorising by the highest common factor, and solving and graphing linear equations." },
  { y: "Year 9", t: "Expanding binomial products and factorising, the first quadratics, index laws, and linear graphs with gradient, midpoint and distance." },
  { y: "Year 10", t: "Simultaneous equations, solving and factorising quadratics, algebraic fractions, inequalities, rearranging formulas and exponential equations." },
  { y: "Year 10A", t: "The extension topics for the harder senior maths subjects: non-monic quadratics, polynomials and the factor theorem, logarithms and function notation." },
];

const FAQS = [
  {
    q: "Are these algebra worksheets free?",
    a: "Yes. Enter your email the first time and you can make one free worksheet a day, on any algebra topic from Year 7 to Year 10A. Every topic page also has free worked examples you can read straight away.",
  },
  {
    q: "Do the algebra worksheets have answers?",
    a: "Every question comes with a fully worked solution, step by step, so students can check their own work and see exactly where a mistake happened.",
  },
  {
    q: "Which algebra topic should my child start with?",
    a: "Start with the topic their class is on now. If they're struggling with it, go back a year: most algebra trouble in Years 9 and 10 starts with expanding, factorising or negative numbers from Years 7 and 8.",
  },
];

export default function AlgebraHub() {
  const topicsByYear = Object.fromEntries(YEARS.map((y) => [y, getTopicGroupsForLevel(y, "maths", [y])]));
  const groups = YEARS.map((y) => ({
    year: y,
    items: WORKSHEET_LANDING_PAGES.filter((p) => p.yearLevel === y && strandOf(p.topicId) === "A"),
  })).filter((g) => g.items.length);
  const all = groups.flatMap((g) => g.items);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Free Worksheets", item: `${SITE_URL}/worksheets` },
        { "@type": "ListItem", position: 3, name: "Algebra worksheets", item: URL },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Algebra worksheets, Years 7 to 10",
      itemListElement: all.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: `${p.yearLevel} ${p.topic} worksheet`, url: `${SITE_URL}/worksheets/${p.slug}` })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <div className="sh">
      {schema.map((x, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />
      ))}
      <MarketingNav />

      <nav aria-label="Breadcrumb" className="sh-crumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/worksheets">Free Worksheets</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">Algebra</li>
        </ol>
      </nav>

      <header className="sh-hero">
        <p className="sh-eyebrow">Years 7 to 10 · Australian Curriculum</p>
        <h1>Free algebra worksheets, Years 7 to 10</h1>
        <p className="sh-lead">
          Every algebra topic from Year 7 to Year 10A, from substitution and like terms to quadratics and simultaneous equations.
          Pick a topic and get six new questions, from Foundation to Extension, each with a fully worked solution.
        </p>
        <dl className="sh-facts">
          <div><dt>Topics</dt><dd>{all.length} algebra topics</dd></div>
          <div><dt>Each worksheet</dt><dd>6 new questions, Foundation to Extension</dd></div>
          <div><dt>Answers</dt><dd>Fully worked solutions</dd></div>
          <div><dt>Years</dt><dd>7, 8, 9, 10 and 10A</dd></div>
        </dl>
      </header>

      <main className="sh-gen">
        <WorksheetGenerator topicsByYear={topicsByYear} initialYearLevel="Year 7" yearLevels={YEARS} studyAppUnderGenerator={false} />
      </main>

      <div className="sh-upgrade">
        <WorksheetUpgrade topic="algebra" placement="algebra_hub_upgrade" />
      </div>

      <section className="sh-sec sh-sec--paper" aria-labelledby="al-topics">
        <div className="sh-wrap">
          <h2 id="al-topics">Algebra topics by year</h2>
          <p className="sh-sub">Tap a topic for worked examples, a question to try and a worksheet set up for that topic.</p>
          {groups.map((g) => (
            <div key={g.year} className="sh-group">
              <div className="sh-group__head">
                <h3>{g.year} algebra</h3>
                <span>{g.items.length} {g.items.length === 1 ? "topic" : "topics"}</span>
              </div>
              <div className="sh-grid">
                {g.items.map((p) => (
                  <Link key={p.slug} href={`/worksheets/${p.slug}`} className="sh-card">
                    <span className="sh-card__kicker">{p.yearLevel} worksheet</span>
                    <span className="sh-card__name">{p.topic}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sh-sec" aria-labelledby="al-path">
        <div className="sh-wrap sh-narrow">
          <h2 id="al-path">How algebra builds from Year 7 to Year 10</h2>
          <p className="sh-p">Each year&rsquo;s algebra leans on the year before, so a gap in Year 7 or 8 usually shows up later as trouble with quadratics or equations.</p>
          <div className="sh-faqs">
            {PATH.map((x) => (
              <div key={x.y} className="sh-box">
                <h3 className="sh-h3">{x.y}</h3>
                <p className="sh-p">{x.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sh-sec sh-sec--paper" aria-labelledby="al-faq">
        <div className="sh-wrap sh-narrow">
          <h2 id="al-faq">Algebra worksheet questions</h2>
          <div className="sh-faqs">
            {FAQS.map((f) => (
              <div key={f.q} className="sh-box">
                <h3 className="sh-h3">{f.q}</h3>
                <p className="sh-p">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav className="sh-switch" aria-label="Worksheets by year level">
        <p className="sh-switch__title">All topics for one year</p>
        <ul>
          {HUB_YEARS.map((y) => (
            <li key={y}><Link href={`/worksheets/year-${y}`}>Year {y}</Link></li>
          ))}
        </ul>
      </nav>
      <AppCtaBand placement="algebra_hub_final" />
      <MarketingFooter />
    </div>
  );
}

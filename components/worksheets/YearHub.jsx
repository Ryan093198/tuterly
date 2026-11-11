import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import WorksheetGenerator from "@/components/WorksheetGenerator";
import WorksheetUpgrade from "@/components/study/WorksheetUpgrade";
import { getTopicGroupsForLevel } from "@/lib/curriculum-topics";
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { YEAR_HUBS, HUB_YEARS, STRANDS, strandOf } from "@/lib/year-hubs";
import { SITE_URL } from "@/lib/site";
import "@/components/state/state-hub.css";
import { fitTitle } from "@/lib/seo-title";

export function yearHubMetadata(n) {
  const h = YEAR_HUBS[n];
  const url = `${SITE_URL}/worksheets/year-${n}`;
  return {
    title: { absolute: fitTitle(h.title) },
    description: h.description,
    alternates: { canonical: url },
    openGraph: { images: ["/og-tuterly.png"], title: h.title, description: h.description, url, type: "website" },
    twitter: { card: "summary_large_image", title: h.title, description: h.description },
  };
}

// Strand groups for one year level: [{ label, items }]
function groupsFor(yearLevel, labelPrefix = "") {
  const pages = WORKSHEET_LANDING_PAGES.filter((p) => p.yearLevel === yearLevel);
  return STRANDS.map((s) => ({
    label: `${labelPrefix}${s.name}`,
    items: pages.filter((p) => strandOf(p.topicId) === s.code),
  })).filter((g) => g.items.length);
}

export default function YearHub({ n }) {
  const h = YEAR_HUBS[n];
  const year = `Year ${n}`;
  const url = `${SITE_URL}/worksheets/year-${n}`;
  const genYears = [year, ...(h.extraYears || [])];
  const topicsByYear = Object.fromEntries(genYears.map((y) => [y, getTopicGroupsForLevel(y, "maths", [y])]));

  const groups = groupsFor(year);
  const extGroups = (h.extraYears || []).flatMap((y) => groupsFor(y, `${y}: `));
  const allPages = [...groups, ...extGroups].flatMap((g) => g.items);

  const facts = [
    { k: "Topics", v: `${allPages.length} ${year}${h.extraYears ? " and 10A" : ""} topics` },
    { k: "Each worksheet", v: "6 new questions, Foundation to Extension" },
    { k: "Answers", v: "Fully worked solutions" },
    { k: "Curriculum", v: "Australian Curriculum v9" },
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Free Worksheets", item: `${SITE_URL}/worksheets` },
        { "@type": "ListItem", position: 3, name: `${year} maths worksheets`, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${year} maths worksheets`,
      itemListElement: allPages.map((p, i) => ({
        "@type": "ListItem", position: i + 1, name: `${p.yearLevel} ${p.topic} worksheet`, url: `${SITE_URL}/worksheets/${p.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: h.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  const TopicGroup = ({ g }) => (
    <div className="sh-group">
      <div className="sh-group__head">
        <h3>{g.label}</h3>
        <span>{g.items.length} {g.items.length === 1 ? "topic" : "topics"}</span>
        {g.label.endsWith("Algebra") && <Link href="/worksheets/algebra" className="yh-all">Algebra for every year →</Link>}
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
  );

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
          <li aria-current="page">{year}</li>
        </ol>
      </nav>

      <header className="sh-hero">
        <p className="sh-eyebrow">{year} maths · Australian Curriculum</p>
        <h1>{h.h1}</h1>
        <p className="sh-lead">{h.lead}</p>
        <dl className="sh-facts">
          {facts.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <main className="sh-gen">
        <WorksheetGenerator topicsByYear={topicsByYear} initialYearLevel={year} yearLevels={genYears} studyAppUnderGenerator={false} />
      </main>

      <div className="sh-upgrade">
        <WorksheetUpgrade placement={`year_${n}_hub_upgrade`} />
      </div>

      <section className="sh-sec sh-sec--paper" aria-labelledby="yh-topics">
        <div className="sh-wrap">
          <h2 id="yh-topics">Every {year} topic</h2>
          <p className="sh-sub">Tap a topic for worked examples, a question to try and a worksheet set up for that topic.</p>
          {groups.map((g) => <TopicGroup key={g.label} g={g} />)}
          {extGroups.length > 0 && (
            <>
              <h2 className="yh-ext">Year 10A extension topics</h2>
              <p className="sh-sub">For students heading to the harder senior maths subjects.</p>
              {extGroups.map((g) => <TopicGroup key={g.label} g={g} />)}
            </>
          )}
        </div>
      </section>

      <section className="sh-sec" aria-labelledby="yh-about">
        <div className="sh-wrap sh-cols">
          <div>
            <h2 id="yh-about">What {year} maths covers</h2>
            {h.about.map((t, i) => <p key={i} className="sh-p">{t}</p>)}
          </div>
          <div className="sh-side">
            <div className="sh-box">
              <h3 className="sh-h3">Test before the real test</h3>
              <p className="sh-p">Pick the topics on your child&rsquo;s next test and get a printable {year} practice test, with marks and worked solutions.</p>
              <p className="sh-p"><Link href={`/year-${n}-maths-test`} className="sh-link">Try a free {year} maths test →</Link></p>
            </div>
            {h.naplan && (
              <div className="sh-box">
                <h3 className="sh-h3">NAPLAN</h3>
                <p className="sh-p">Try a free NAPLAN-style numeracy test, marked instantly.</p>
                <p className="sh-p"><Link href="/naplan" className="sh-link">Free NAPLAN-style practice →</Link></p>
              </div>
            )}
            <div className="sh-box">
              <h3 className="sh-h3">For {year} students</h3>
              <p className="sh-p"><Link href={`/year-${n}-maths`} className="sh-link">What {year} maths covers, topic by topic →</Link></p>
              <p className="sh-p"><Link href={`/students/year-${n}`} className="sh-link">How to get better marks in {year} maths →</Link></p>
            </div>
          </div>
        </div>
      </section>

      <section className="sh-sec sh-sec--paper" aria-labelledby="yh-faq">
        <div className="sh-wrap sh-narrow">
          <h2 id="yh-faq">{year} maths worksheet questions</h2>
          <div className="sh-faqs">
            {h.faqs.map((f) => (
              <div key={f.q} className="sh-box">
                <h3 className="sh-h3">{f.q}</h3>
                <p className="sh-p">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <YearSwitcher current={String(n)} />
      <AppCtaBand placement={`year_${n}_hub_final`} />
      <MarketingFooter />
    </div>
  );
}

export function YearSwitcher({ current, title = "Another year level?" }) {
  return (
    <nav className="sh-switch" aria-label="Worksheets by year level">
      <p className="sh-switch__title">{title}</p>
      <ul>
        {HUB_YEARS.map((y) => (
          <li key={y}>
            <Link href={`/worksheets/year-${y}`} aria-current={y === current ? "page" : undefined} className={y === current ? "is-current" : ""}>
              Year {y}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

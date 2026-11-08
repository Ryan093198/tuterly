import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import WorksheetGenerator from "@/components/WorksheetGenerator";
import WorksheetUpgrade from "@/components/study/WorksheetUpgrade";
import { getTopicGroupsForLevel } from "@/lib/curriculum-topics";
import { TOPIC_HUBS, TOPIC_HUB_SLUGS, HUB_YEARS_ALL, hubTopics } from "@/lib/topic-hubs";
import { getSkillPage } from "@/lib/skill-pages";
import SkillYearPicker from "@/components/worksheets/SkillYearPicker";
import { HUB_YEARS } from "@/lib/year-hubs";
import { SITE_URL } from "@/lib/site";
import "@/components/state/state-hub.css";

const SHARED_FAQS = (name) => [
  {
    q: `Are these ${name.toLowerCase()} worksheets free?`,
    a: "Yes. Enter your email the first time and you can make one free worksheet a day, on any topic from Year 7 to Year 10A. Every topic page also has free worked examples you can read straight away.",
  },
  {
    q: "Do the worksheets have answers?",
    a: "Every question comes with a fully worked solution, step by step, so students can check their own work and see exactly where a mistake happened.",
  },
];

export function topicHubMetadata(slug) {
  const h = TOPIC_HUBS[slug];
  const url = `${SITE_URL}/worksheets/${slug}`;
  return {
    title: { absolute: h.title },
    description: h.description,
    alternates: { canonical: url },
    openGraph: { images: ["/og-tuterly.png"], title: h.title, description: h.description, url, type: "website" },
    twitter: { card: "summary_large_image", title: h.title, description: h.description },
  };
}

export default function TopicHub({ slug }) {
  const h = TOPIC_HUBS[slug];
  const url = `${SITE_URL}/worksheets/${slug}`;
  const groups = hubTopics(h);
  const all = groups.flatMap((g) => g.items);
  const years = HUB_YEARS_ALL.filter((y) => groups.some((g) => g.year === y));
  const topicsByYear = Object.fromEntries(years.map((y) => [y, getTopicGroupsForLevel(y, "maths", [y])]));
  const skills = (h.skills || []).map(getSkillPage).filter(Boolean);
  const faqs = [...SHARED_FAQS(h.name), ...h.faqs];
  const otherHubs = TOPIC_HUB_SLUGS.filter((s) => s !== slug);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Free Worksheets", item: `${SITE_URL}/worksheets` },
        { "@type": "ListItem", position: 3, name: `${h.name} worksheets`, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${h.name} worksheets`,
      itemListElement: all.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: `${p.yearLevel} ${p.topic} worksheet`, url: `${SITE_URL}/worksheets/${p.slug}` })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
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
          <li aria-current="page">{h.name}</li>
        </ol>
      </nav>

      <header className="sh-hero">
        <p className="sh-eyebrow">{years.length > 1 ? `${years[0]} to ${years[years.length - 1]}` : years[0]} · Australian Curriculum</p>
        <h1>{h.h1}</h1>
        <p className="sh-lead">{h.lead}</p>
        <dl className="sh-facts">
          <div><dt>Topics</dt><dd>{all.length} {h.name.toLowerCase()} topics</dd></div>
          <div><dt>Each worksheet</dt><dd>6 new questions, Foundation to Extension</dd></div>
          <div><dt>Answers</dt><dd>Fully worked solutions</dd></div>
          <div><dt>Years</dt><dd>{years.map((y) => y.replace("Year ", "")).join(", ").replace(/, ([^,]*)$/, " and $1")}</dd></div>
        </dl>
      </header>

      <SkillYearPicker slug={slug} />

      <main className="sh-gen">
        <WorksheetGenerator topicsByYear={topicsByYear} initialYearLevel={years[0]} initialTopicId={groups[0]?.items[0]?.topicId} yearLevels={years} studyAppUnderGenerator={false} />
      </main>

      <div className="sh-upgrade">
        <WorksheetUpgrade topic={h.name.toLowerCase()} placement={`hub_${slug}_upgrade`} />
      </div>

      <section className="sh-sec sh-sec--paper" aria-labelledby="th-topics">
        <div className="sh-wrap">
          <h2 id="th-topics">{h.name} topics by year</h2>
          <p className="sh-sub">Tap a topic for worked examples, a question to try and a worksheet set up for that topic.</p>
          {groups.map((g) => (
            <div key={g.year} className="sh-group">
              <div className="sh-group__head">
                <h3>{g.year}</h3>
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
          {skills.length > 0 && (
            <div className="sh-group">
              <div className="sh-group__head"><h3>One skill at a time</h3></div>
              <div className="sh-grid">
                {skills.map((s) => (
                  <Link key={s.slug} href={`/worksheets/${s.slug}`} className="sh-card">
                    <span className="sh-card__kicker">Skill worksheet</span>
                    <span className="sh-card__name">{s.h1.replace(/ worksheets with answers$/i, "")}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="sh-sec" aria-labelledby="th-path">
        <div className="sh-wrap sh-narrow">
          <h2 id="th-path">How {h.name.toLowerCase()} builds, year by year</h2>
          <p className="sh-p">{h.pathIntro}</p>
          <div className="sh-faqs">
            {h.path.map((x) => (
              <div key={x.y} className="sh-box">
                <h3 className="sh-h3">{x.y}</h3>
                <p className="sh-p">{x.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sh-sec sh-sec--paper" aria-labelledby="th-faq">
        <div className="sh-wrap sh-narrow">
          <h2 id="th-faq">{h.name} worksheet questions</h2>
          <div className="sh-faqs">
            {faqs.map((f) => (
              <div key={f.q} className="sh-box">
                <h3 className="sh-h3">{f.q}</h3>
                <p className="sh-p">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav className="sh-switch" aria-label="Worksheets by topic and year">
        <p className="sh-switch__title">More topics, or all topics for one year</p>
        <ul>
          {otherHubs.map((s) => (
            <li key={s}><Link href={`/worksheets/${s}`}>{TOPIC_HUBS[s].name}</Link></li>
          ))}
          {HUB_YEARS.map((y) => (
            <li key={y}><Link href={`/worksheets/year-${y}`}>Year {y}</Link></li>
          ))}
        </ul>
      </nav>
      <AppCtaBand placement={`hub_${slug}_final`} />
      <MarketingFooter />
    </div>
  );
}

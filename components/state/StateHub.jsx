import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import WorksheetGenerator from "@/components/WorksheetGenerator";
import WorksheetUpgrade from "@/components/study/WorksheetUpgrade";
import { getTopicGroupsForLevel } from "@/lib/curriculum-topics";
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { STATES, STATE_CODES, NAPLAN_2027 } from "@/lib/state-curriculum";
import { SITE_URL } from "@/lib/site";
import { DIAG_PATH, DIAG_YEARS } from "@/lib/diagnostic";
import "./state-hub.css";
import "@/components/diagnostic/diagnostic.css";

const GEN_YEARS = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 10A"];

export function stateMetadata(code) {
  const s = STATES[code];
  const url = `${SITE_URL}/worksheets/${code}`;
  return {
    title: { absolute: s.title },
    description: s.description,
    alternates: { canonical: url },
    openGraph: { images: ["/og-tuterly.png"], title: s.title, description: s.description, url, type: "website" },
    twitter: { card: "summary_large_image", title: s.title, description: s.description },
  };
}

// State hub: /worksheets/nsw, /worksheets/qld, ... One per state and
// territory. Shared topic pages, grouped in the state's own terms.
export default function StateHub({ code }) {
  const s = STATES[code];
  const url = `${SITE_URL}/worksheets/${code}`;
  const topicsByYear = Object.fromEntries(GEN_YEARS.map((y) => [y, getTopicGroupsForLevel(y, "maths", [y])]));

  const groups = GEN_YEARS.map((year) => {
    const items = WORKSHEET_LANDING_PAGES.filter((p) => p.yearLevel === year && !s.hide?.has(p.slug));
    return { year, ...s.group(year), items };
  }).filter((g) => g.items.length);

  const nextTest = s.tests[0];
  const facts = [
    { k: "Curriculum", v: s.curriculum },
    { k: s.terms.rows[0][0], v: s.terms.rows[0][1] },
    nextTest ? { k: "Next selective test", v: `${nextTest.name.replace(/ test$/i, "")}: ${nextTest.when}` } : { k: "Term 1 2027", v: s.terms.rows[1][1] },
    { k: "NAPLAN 2027", v: NAPLAN_2027 },
  ];

  // Same free diagnostic test for every state; the state page adds its own note.
  const diagFaq = {
    q: `Is there a free test to see where my child is at in ${s.abbr}?`,
    a: `Yes. The free Tuterly diagnostic test covers Years 7, 8 and 9: 20 questions, two from each chapter of the year, marked straight away. Parents can get a free emailed report on what to work on before next year. ${s.diag}`,
  };
  const faqs = [...s.faqs, diagFaq];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Free Worksheets", item: `${SITE_URL}/worksheets` },
        { "@type": "ListItem", position: 3, name: s.name, item: url },
      ],
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
          <li aria-current="page">{s.name}</li>
        </ol>
      </nav>

      <header className="sh-hero">
        <p className="sh-eyebrow">{s.name}</p>
        <h1>{s.h1}</h1>
        <p className="sh-lead">{s.lead}</p>
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
        <WorksheetGenerator topicsByYear={topicsByYear} initialYearLevel="Year 7" studyAppUnderGenerator={false} />
      </main>

      <div className="sh-upgrade">
        <WorksheetUpgrade placement={`state_${code}_upgrade`} />
      </div>

      <section className="sh-sec sh-diag" id="diagnostic-test" aria-labelledby="sh-diag">
        <div className="sh-wrap">
          <p className="sh-eyebrow sh-diag__eyebrow">Free · About 35 minutes · Marked straight away</p>
          <h2 id="sh-diag">Free maths diagnostic test for {s.abbr} students in Years 7 to 9</h2>
          <p className="sh-sub">
            Twenty questions, two from every chapter of the year. Students see which topics are strong and which need work,
            and parents can get a free report on what to fix before next year.
          </p>
          <p className="sh-diag__note">{s.diag}</p>
          <p className="sh-diag__pick">Pick the year you&rsquo;re in <strong>now</strong>, not next year.</p>
          <div className="dg-pick">
            {DIAG_YEARS.map((y) => {
              const label = s.group(y.year).label;
              return (
                <Link key={y.slug} href={`${DIAG_PATH}/${y.slug}`} className="dg-year">
                  <span className="dg-year__k">I&rsquo;m in</span>
                  <span className="dg-year__n">{y.year}</span>
                  <span className="dg-year__x">Checks {label === y.year ? `${y.year} maths` : label}. Gets you ready for {y.next}.</span>
                  <span className="dg-year__go">Start the test →</span>
                </Link>
              );
            })}
          </div>
          <p className="sh-small">The same test is used in every state. The questions are written to the Australian Curriculum, which covers the same maths as {s.curriculumShort}.</p>
        </div>
      </section>

      <section className="sh-sec sh-sec--paper" aria-labelledby="sh-topics">
        <div className="sh-wrap">
          <h2 id="sh-topics">Topics, laid out for {s.abbr}</h2>
          <p className="sh-sub">Tap a topic for worked examples, a question to try and a generator set up for that topic.</p>
          {groups.map((g) => (
            <div key={g.year} className="sh-group" id={`${code}-${g.year.replace(/\s+/g, "-").toLowerCase()}`}>
              <div className="sh-group__head">
                <h3>{g.label}</h3>
                <span>{g.items.length} topics</span>
              </div>
              {g.note && <p className="sh-group__note">{g.note}</p>}
              <div className="sh-grid">
                {g.items.map((p) => {
                  const tag = s.tag?.(p.slug);
                  return (
                    <Link key={p.slug} href={`/worksheets/${p.slug}`} className="sh-card">
                      <span className="sh-card__kicker">{tag || "Worksheet"}</span>
                      <span className="sh-card__name">{p.topic}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sh-sec" aria-labelledby="sh-about">
        <div className="sh-wrap sh-cols">
          <div>
            <h2 id="sh-about">Maths in {s.abbr} schools</h2>
            {s.about.map((t, i) => <p key={i} className="sh-p">{t}</p>)}
            <h3 className="sh-h3">Senior maths ({s.senior.cert})</h3>
            <p className="sh-p">
              {s.senior.lead || "Senior maths courses are"} {s.senior.courses.join(", ").replace(/, ([^,]*)$/, " and $1")}.
              {s.senior.note ? ` ${s.senior.note}` : ""}
            </p>
          </div>
          <div className="sh-side">
            <div className="sh-box">
              <h3 className="sh-h3">School terms</h3>
              <table className="sh-terms">
                <tbody>
                  {s.terms.rows.map(([t, d]) => (
                    <tr key={t}><th scope="row">{t}</th><td>{d}</td></tr>
                  ))}
                </tbody>
              </table>
              {s.terms.note && <p className="sh-small">{s.terms.note}</p>}
            </div>
            <div className="sh-box">
              <h3 className="sh-h3">NAPLAN 2027</h3>
              <p className="sh-p">Years 3, 5, 7 and 9 sit NAPLAN from {NAPLAN_2027}.</p>
              <p className="sh-p"><Link href="/naplan" className="sh-link">Try a free NAPLAN-style numeracy test →</Link></p>
            </div>
          </div>
        </div>
      </section>

      {s.tests.length > 0 && (
        <section className="sh-sec sh-sec--paper" aria-labelledby="sh-tests">
          <div className="sh-wrap">
            <h2 id="sh-tests">Selective and gifted entry tests</h2>
            <div className="sh-tests">
              {s.tests.map((t) => (
                <div key={t.name} className="sh-box">
                  <h3 className="sh-h3">{t.name}</h3>
                  <p className="sh-when">{t.when}</p>
                  <p className="sh-p">{t.body}</p>
                </div>
              ))}
            </div>
            <p className="sh-small">Dates are from the official pages linked below. Check them with the school or department before you plan around them.</p>
          </div>
        </section>
      )}

      <section className="sh-sec" aria-labelledby="sh-faq">
        <div className="sh-wrap sh-narrow">
          <h2 id="sh-faq">Questions from {s.abbr} parents</h2>
          <div className="sh-faqs">
            {faqs.map((f) => (
              <div key={f.q} className="sh-box">
                <h3 className="sh-h3">{f.q}</h3>
                <p className="sh-p">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="sh-sources">
            <p className="sh-small"><strong>Sources</strong> (checked 30 October 2026)</p>
            <ul>
              {s.sources.map((x) => (
                <li key={x.url}><a href={x.url} rel="noopener" target="_blank">{x.label}</a></li>
              ))}
            </ul>
            <p className="sh-small">Tuterly isn&rsquo;t affiliated with or endorsed by any state education authority.</p>
          </div>
        </div>
      </section>

      <StateSwitcher current={code} />
      <AppCtaBand placement={`state_${code}_final`} />
      <MarketingFooter />
    </div>
  );
}

export function StateSwitcher({ current, title = "Another state or territory?", hash = "" }) {
  return (
    <nav className="sh-switch" aria-label="Worksheets by state">
      <p className="sh-switch__title">{title}</p>
      <ul>
        {STATE_CODES.map((k) => (
          <li key={k}>
            <Link href={`/worksheets/${k}${hash}`} aria-current={k === current ? "page" : undefined} className={k === current ? "is-current" : ""}>
              {STATES[k].abbr}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

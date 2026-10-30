import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import StudyAppCTA from "@/components/StudyAppCTA";
import { Eyebrow } from "@/components/brand";
import { HUBS, hubJsonLd } from "@/lib/years-maths-hubs";
import "@/components/brand/brand.css";
import "@/components/study/study-landing.css";
import "./hubs.css";

// Page frame for the /years/year-N-maths hubs: site nav, visible
// breadcrumb matching the BreadcrumbList JSON-LD, hero with the study app
// CTA, a strand-by-strand topic map, where marks go, how parents can help,
// how the app fits, any year-specific sections (children), FAQ, links to
// the other hubs and resources, end CTA, footer.
//
// StudyAppCTA is always slim here so the pre-launch form never shows a
// price: pricing is managed separately in lib/study-app.js.

const SECTIONS = [
  ["topics", "What is covered"],
  ["mistakes", "Where marks go"],
  ["parents", "How to help"],
  ["app", "How Tuterly helps"],
  ["faq", "FAQ"],
];

export default function HubShell({
  path,
  title,
  description,
  year,
  h1,
  lead,
  facts,
  topicsIntro,
  strands,
  mistakesIntro,
  mistakes,
  parentTips,
  appIntro,
  appSteps,
  learnLinks,
  moreLinks,
  faqs,
  children,
}) {
  const name = `Year ${year} maths`;
  const crumbs = [{ name, path }];
  const others = HUBS.filter((h) => h.href !== path);
  return (
    <div className="tb sl ym">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubJsonLd({ title, description, path, crumbs, faqs })) }}
      />
      <MarketingNav />

      <header className="ym-hero">
        <div className="tb-wrap">
          <nav aria-label="Breadcrumb" className="ym-crumbs">
            <ol>
              <li><Link href="/">Home</Link></li>
              {crumbs.map((c, i) => (
                <li key={c.path}>
                  {i === crumbs.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}
                </li>
              ))}
            </ol>
          </nav>
          <div className="ym-hero__grid">
            <div>
              <Eyebrow>{`Year ${year} · Australian Curriculum maths`}</Eyebrow>
              <h1 className="tb-h1 ym-h1">{h1}</h1>
              <p className="tb-lead ym-lead">{lead}</p>
              {facts && (
                <dl className="ym-facts">
                  {facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                </dl>
              )}
              <ul className="ym-toc" aria-label="On this page">
                {SECTIONS.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}
              </ul>
            </div>
            <div className="ym-herocta">
              <p className="ym-herocta__t">{`Turn Year ${year} mistakes into marks`}</p>
              <p className="ym-herocta__x">
                Snap the maths questions your child gets wrong. Tuterly saves each one with a worked solution, then gives fresh questions on the same skill until it sticks.
              </p>
              <StudyAppCTA variant="hero" placement={`year_${year}_maths_hub_hero`} slim />
            </div>
          </div>
        </div>
      </header>

      <main className="ym-main">
        <section id="topics" className="tb-section" aria-labelledby="h-topics">
          <div className="tb-wrap">
            <h2 id="h-topics" className="tb-h2 ym-h2">{`What Year ${year} maths covers`}</h2>
            {topicsIntro && <p className="ym-intro">{topicsIntro}</p>}
            <div className="ym-strands">
              {strands.map((s) => (
                <div key={s.name} className="ym-box">
                  <h3>{s.name}</h3>
                  {s.summary && <p className="ym-box__sum">{s.summary}</p>}
                  <ul>
                    {s.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                  {s.links?.length > 0 && (
                    <p className="ym-box__links">
                      {s.links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <p className="ym-small">
              Topic map based on the Australian Curriculum v9 Mathematics strands (Number, Algebra, Measurement, Space, Statistics, Probability). The Victorian Curriculum 2.0 closely follows it, grouped as Number and Algebra, Measurement and Geometry, and Statistics and Probability. NSW, WA and some schools order topics differently, so check your child&rsquo;s school course outline for the exact sequence.
            </p>
          </div>
        </section>

        <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
          <div className="tb-wrap">
            <h2 id="h-mistakes" className="tb-h2 ym-h2">{`Where Year ${year} students lose marks`}</h2>
            {mistakesIntro && <p className="ym-intro">{mistakesIntro}</p>}
            <ul className="ym-mistakes">
              {mistakes.map((m) => (
                <li key={m.title}>
                  <strong>{m.title}</strong>
                  {m.text}
                  {m.eg && <span className="ym-eg">{m.eg}</span>}
                  {m.link && <span className="ym-eg">Practise it: <Link href={m.link.href}>{m.link.label}</Link></span>}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="parents" className="tb-section" aria-labelledby="h-parents">
          <div className="tb-wrap">
            <h2 id="h-parents" className="tb-h2 ym-h2">How parents can help at home</h2>
            <p className="ym-intro">You do not need to remember how to do the maths yourself. Most of what helps is routine, the right questions, and what happens after a mistake.</p>
            <ul className="ym-checklist">
              {parentTips.map((t) => (
                <li key={t.title}><strong>{t.title}</strong> {t.text}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="app" className="tb-section" aria-labelledby="h-app">
          <div className="tb-wrap">
            <h2 id="h-app" className="tb-h2 ym-h2">{`How Tuterly helps with Year ${year} maths`}</h2>
            {appIntro && <p className="ym-intro">{appIntro}</p>}
            <ol className="ym-steps">
              {appSteps.map((s) => (
                <li key={s.title}><strong>{s.title}</strong>{s.text}</li>
              ))}
            </ol>
            <p className="ym-small">
              Tuterly is designed by Australian educators at Bayside Academics and covers the same Years 7 to 10 maths as the Australian Curriculum (and the Victorian Curriculum 2.0). See how it works on <Link href="/features/snap-a-question">snap a question</Link> and <Link href="/features/test-any-topic">test any topic</Link>.
            </p>
          </div>
        </section>

        {children}
      </main>

      {faqs?.length > 0 && (
        <section id="faq" className="tb-section tb-section--card" aria-labelledby="h-faq">
          <div className="tb-wrap ym-narrow">
            <h2 id="h-faq" className="tb-h2 ym-h2">{`Year ${year} maths: questions parents ask`}</h2>
            <div className="sl-faq">
              {faqs.map((f) => (
                <details key={f.q} className="sl-faq__item">
                  <summary><span>{f.q}</span><span className="sl-faq__plus" aria-hidden="true">+</span></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="tb-section" aria-labelledby="h-more">
        <div className="tb-wrap">
          <h2 id="h-more" className="tb-h2 ym-h2">Other year levels and free resources</h2>
          <div className="ym-cards">
            {others.map((h) => (
              <Link key={h.href} href={h.href} className="ym-card">
                <span className="ym-card__k">{`Year ${h.year}`}</span>
                <span className="ym-card__t">{h.title}</span>
                <span className="ym-card__x">{h.text}</span>
              </Link>
            ))}
          </div>
          <ul className="ym-links">
            {[...(learnLinks || []), ...(moreLinks || [])].map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
                {l.note && <span>{` ${l.note}`}</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tb-section tb-section--soft" aria-labelledby="h-cta">
        <div className="tb-wrap ym-narrow">
          <Eyebrow>Tuterly · Years 7 to 10 maths</Eyebrow>
          <h2 id="h-cta" className="tb-h2 ym-h2">{`Make every Year ${year} mistake count`}</h2>
          <p className="ym-intro">
            Each wrong question your child snaps becomes a worked solution, fresh practice on the same skill and, before a test, a practice test built from their own mistakes.
          </p>
          <StudyAppCTA variant="hero" placement={`year_${year}_maths_hub_final`} position="final" slim />
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

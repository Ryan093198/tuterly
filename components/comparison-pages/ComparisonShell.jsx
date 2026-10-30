import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import StudyAppCTA from "@/components/StudyAppCTA";
import { Eyebrow } from "@/components/brand";
import { YEAR_HUBS, PARENT_GUIDES } from "@/lib/parent-guides";
import { COMPARISONS, HOW_IT_WORKS, PAGES, RESOURCE_LINKS, comparisonJsonLd } from "@/lib/comparison-pages";
import "@/components/brand/brand.css";
import "@/components/study/study-landing.css";
import "@/components/parent-guides/guides.css";
import "./comparisons.css";

// Page frame for the Years 7 to 10 maths comparison pages, modelled on
// GuideShell: site nav, visible breadcrumb matching the BreadcrumbList
// JSON-LD, hero with the study app CTA, page body (children, each a
// tb-section), how Tuterly works, honest limits, FAQ, links to the year
// hubs, parent guides and the other comparisons, end CTA, footer.
//
// StudyAppCTA is always slim here so the pre-launch form never shows a
// price: pricing is managed separately in lib/study-app.js.

export default function ComparisonShell({ page, children }) {
  const p = PAGES[page];
  const crumbs = [{ name: p.crumb, path: p.path }];
  const others = COMPARISONS.filter((c) => c.href !== p.path);
  return (
    <div className="tb sl pg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            comparisonJsonLd({ title: p.title, description: p.description, path: p.path, crumbs, faqs: p.faqs, tool: p.tool })
          ),
        }}
      />
      <MarketingNav />

      <header className="pg-hero">
        <div className="tb-wrap">
          <nav aria-label="Breadcrumb" className="pg-crumbs">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><span aria-current="page">{p.crumb}</span></li>
            </ol>
          </nav>
          <div className="pg-hero__grid">
            <div>
              <Eyebrow>{p.eyebrow}</Eyebrow>
              <h1 className="tb-h1 pg-h1">{p.h1}</h1>
              <p className="tb-lead pg-lead">{p.lead}</p>
              <ul className="pg-toc" aria-label="On this page">
                {p.toc.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}
              </ul>
            </div>
            <div className="pg-herocta">
              <p className="pg-herocta__t">{p.ctaTitle}</p>
              <p className="pg-herocta__x">{p.ctaText}</p>
              <StudyAppCTA variant="hero" placement={`${p.placement}_hero`} slim />
            </div>
          </div>
        </div>
      </header>

      <main className="pg-main">
        {children}

        <section id="how" className="tb-section" aria-labelledby="h-how">
          <div className="tb-wrap">
            <h2 id="h-how" className="tb-h2 pg-h2">How Tuterly works</h2>
            <p className="pg-intro">
              Tuterly is a Years 7 to 10 maths study app designed by Australian educators at Bayside Academics, a Melbourne tutoring company. It is built around one idea: the questions your child gets wrong are the most useful practice they have.
            </p>
            <ol className="pg-steps">
              {HOW_IT_WORKS.map((s) => (
                <li key={s.t}><strong>{s.t}</strong>{s.x}</li>
              ))}
            </ol>
            <div className="pg-prose cp-limits">
              <h3 className="pg-h3">What Tuterly is not</h3>
              <ul>
                <li><strong>Not a live tutor.</strong> It cannot watch your child work or re-teach a topic from scratch the way a person can.</li>
                <li><strong>Not a school platform.</strong> Teachers do not set or mark work in it, and it does not replace anything your school uses.</li>
                <li><strong>Best when your child is near year level</strong> and will genuinely attempt a question before looking at the solution.</li>
              </ul>
              <p>
                See <Link href={RESOURCE_LINKS.features.href}>each feature in detail</Link>, including <Link href="/features/snap-a-question">snap a question</Link>, <Link href="/features/upload-a-test">upload a test</Link> and <Link href="/features/test-any-topic">test any topic</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <section id="faq" className="tb-section tb-section--card" aria-labelledby="h-faq">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-faq" className="tb-h2 pg-h2">{`${p.tool} and Tuterly: questions parents ask`}</h2>
          <div className="sl-faq">
            {p.faqs.map((f) => (
              <details key={f.q} className="sl-faq__item">
                <summary><span>{f.q}</span><span className="sl-faq__plus" aria-hidden="true">+</span></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-more">
        <div className="tb-wrap">
          <h2 id="h-more" className="tb-h2 pg-h2">More for parents of Years 7 to 10</h2>
          <div className="pg-cards">
            {YEAR_HUBS.map((h) => (
              <Link key={h.href} href={h.href} className="pg-card">
                <span className="pg-card__k">{`Year ${h.year}`}</span>
                <span className="pg-card__t">{`${h.title} guide`}</span>
              </Link>
            ))}
            <Link href="/years" className="pg-card">
              <span className="pg-card__k">All years</span>
              <span className="pg-card__t">Years 7 to 10 maths guides</span>
            </Link>
          </div>
          <div className="pg-cards" style={{ marginTop: 14 }}>
            {PARENT_GUIDES.map((g) => (
              <Link key={g.href} href={g.href} className="pg-card">
                <span className="pg-card__k">Parent guide</span>
                <span className="pg-card__t">{g.title}</span>
                <span className="pg-card__x">{g.text}</span>
              </Link>
            ))}
          </div>
          <div className="pg-cards" style={{ marginTop: 14 }}>
            {others.map((c) => (
              <Link key={c.href} href={c.href} className="pg-card">
                <span className="pg-card__k">{`Compare: ${c.name}`}</span>
                <span className="pg-card__t">{c.title}</span>
                <span className="pg-card__x">{c.text}</span>
              </Link>
            ))}
          </div>
          <ul className="pg-links">
            {p.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
                {l.note && <span>{` ${l.note}`}</span>}
              </li>
            ))}
          </ul>
          <p className="cp-disclaimer">
            {`${p.tool} is a trademark of its owner. Tuterly is not affiliated with ${p.tool}. Descriptions here are general and based on publicly available information; product features and plans change, so check the official ${p.tool} website for current details.`}
          </p>
        </div>
      </section>

      <section className="tb-section tb-section--soft" aria-labelledby="h-cta">
        <div className="tb-wrap pg-narrow">
          <Eyebrow>Tuterly · Years 7 to 10 maths</Eyebrow>
          <h2 id="h-cta" className="tb-h2 pg-h2">{p.finalTitle}</h2>
          <p className="pg-intro">{p.finalText}</p>
          <StudyAppCTA variant="hero" placement={`${p.placement}_final`} position="final" slim />
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

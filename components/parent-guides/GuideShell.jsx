import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import StudyAppCTA from "@/components/StudyAppCTA";
import { Eyebrow } from "@/components/brand";
import { PARENT_GUIDES, YEAR_HUBS, guideJsonLd } from "@/lib/parent-guides";
import "@/components/brand/brand.css";
import "@/components/study/study-landing.css";
import "./guides.css";

// Page frame for the /years index and the /parents/* decision guides:
// site nav, visible breadcrumb matching the BreadcrumbList JSON-LD, hero
// with the study app CTA, page body (children, each a tb-section), FAQ,
// links to the year hubs and other guides, end CTA, footer.
//
// StudyAppCTA is always slim here so the pre-launch form never shows a
// price: pricing is managed separately in lib/study-app.js.

export default function GuideShell({
  path,
  title,
  description,
  crumbs,
  eyebrow,
  h1,
  lead,
  toc,
  ctaTitle,
  ctaText,
  placement,
  faqs,
  faqTitle = "Questions parents ask",
  pageType = "Article",
  parts,
  showYearHubs = true,
  links,
  finalTitle,
  finalText,
  children,
}) {
  const otherGuides = PARENT_GUIDES.filter((g) => g.href !== path);
  return (
    <div className="tb sl pg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(guideJsonLd({ title, description, path, crumbs, faqs, pageType, parts })),
        }}
      />
      <MarketingNav />

      <header className="pg-hero">
        <div className="tb-wrap">
          <nav aria-label="Breadcrumb" className="pg-crumbs">
            <ol>
              <li><Link href="/">Home</Link></li>
              {crumbs.map((c, i) => (
                <li key={c.path}>
                  {i === crumbs.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}
                </li>
              ))}
            </ol>
          </nav>
          <div className="pg-hero__grid">
            <div>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h1 className="tb-h1 pg-h1">{h1}</h1>
              <p className="tb-lead pg-lead">{lead}</p>
              {toc?.length > 0 && (
                <ul className="pg-toc" aria-label="On this page">
                  {toc.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}
                </ul>
              )}
            </div>
            <div className="pg-herocta">
              <p className="pg-herocta__t">{ctaTitle}</p>
              <p className="pg-herocta__x">{ctaText}</p>
              <StudyAppCTA variant="hero" placement={`${placement}_hero`} slim />
            </div>
          </div>
        </div>
      </header>

      <main className="pg-main">{children}</main>

      {faqs?.length > 0 && (
        <section id="faq" className="tb-section tb-section--card" aria-labelledby="h-faq">
          <div className="tb-wrap pg-narrow">
            <h2 id="h-faq" className="tb-h2 pg-h2">{faqTitle}</h2>
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
          <h2 id="h-more" className="tb-h2 pg-h2">More for parents of Years 7 to 10</h2>
          {showYearHubs && (
            <div className="pg-cards">
              {YEAR_HUBS.map((h) => (
                <Link key={h.href} href={h.href} className="pg-card">
                  <span className="pg-card__k">{`Year ${h.year}`}</span>
                  <span className="pg-card__t">{`${h.title} guide`}</span>
                </Link>
              ))}
            </div>
          )}
          {otherGuides.length > 0 && (
            <div className="pg-cards" style={{ marginTop: 14 }}>
              {otherGuides.map((g) => (
                <Link key={g.href} href={g.href} className="pg-card">
                  <span className="pg-card__k">Parent guide</span>
                  <span className="pg-card__t">{g.title}</span>
                  <span className="pg-card__x">{g.text}</span>
                </Link>
              ))}
            </div>
          )}
          {links?.length > 0 && (
            <ul className="pg-links">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                  {l.note && <span>{` ${l.note}`}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="tb-section tb-section--soft" aria-labelledby="h-cta">
        <div className="tb-wrap pg-narrow">
          <Eyebrow>Tuterly · Years 7 to 10 maths</Eyebrow>
          <h2 id="h-cta" className="tb-h2 pg-h2">{finalTitle}</h2>
          <p className="pg-intro">{finalText}</p>
          <StudyAppCTA variant="hero" placement={`${placement}_final`} position="final" slim />
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

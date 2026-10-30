import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { Eyebrow } from "@/components/brand";
import ScholarshipCTA from "@/components/scholarship-guides/ScholarshipCTA";
import { GUIDES, PRACTICE_LINKS, SOURCES, guideJsonLd } from "@/lib/scholarship-guides";
import "@/components/brand/brand.css";
import "@/components/study/study-landing.css";
import "./guides.css";

// Page frame for the /scholarship guides: a scholarship-only nav (its
// button goes to the Scholarship waitlist, not the study app), visible
// breadcrumb matching the BreadcrumbList JSON-LD, hero with the compact
// waitlist form, the page body, FAQ, related guides, end CTA, footer.
const NAV = [
  { href: "/scholarship", label: "Scholarship hub" },
  { href: "/scholarship/acer-vs-edutest-vs-aas", label: "Compare tests" },
  { href: "/scholarship/year-7-entry-guide", label: "Year 7 entry" },
  { href: "/scholarship/year-5-and-year-6-prep", label: "Year 5 and 6" },
  { href: "/scholarship-practice", label: "Free practice" },
];

function ScholarshipNav() {
  return (
    <nav aria-label="Scholarship" className="tb-nav">
      <div className="tb-nav__in">
        <Logo />
        <div className="tb-nav__right">
          <div className="tb-nav__links">
            {NAV.map((l) => <Link key={l.href} href={l.href} className="tb-nav__link">{l.label}</Link>)}
          </div>
          <a href="#sch-cta" className="tb-btn tb-btn--primary tb-btn--sm">Join the list</a>
          <details className="tb-nav__menu">
            <summary aria-label="Menu"><Menu size={20} strokeWidth={2.5} aria-hidden="true" /></summary>
            <div className="tb-nav__panel">
              {NAV.map((l) => <Link key={l.href} href={l.href} className="tb-nav__link">{l.label}</Link>)}
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}

export default function GuideShell({ path, title, description, crumbs, eyebrow, h1, lead, facts, faqs, defaultEntry, defaultTest, children }) {
  const others = GUIDES.filter((g) => g.href !== path);
  return (
    <div className="tb sl sg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd({ title, description, path, crumbs, faqs })) }}
      />
      <ScholarshipNav />

      <header className="sg-hero">
        <div className="tb-wrap">
          <nav aria-label="Breadcrumb" className="sg-crumbs">
            <ol>
              <li><Link href="/">Home</Link></li>
              {crumbs.map((c, i) => (
                <li key={c.path}>
                  {i === crumbs.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}
                </li>
              ))}
            </ol>
          </nav>
          <div className="sg-hero__grid">
            <div>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h1 className="tb-h1 sg-h1">{h1}</h1>
              <p className="tb-lead sg-lead">{lead}</p>
              {facts && (
                <dl className="sg-facts">
                  {facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                </dl>
              )}
            </div>
            <ScholarshipCTA variant="hero" id="sch-cta-top" sourcePage={path} defaultEntry={defaultEntry} defaultTest={defaultTest} />
          </div>
        </div>
      </header>

      <main className="sg-main">{children}</main>

      {faqs?.length > 0 && (
        <section className="tb-section tb-section--card" aria-labelledby="sg-faq">
          <div className="tb-wrap sg-narrow">
            <h2 id="sg-faq" className="tb-h2 sg-h2">Questions parents ask</h2>
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

      <section className="tb-section" aria-labelledby="sg-more">
        <div className="tb-wrap">
          <h2 id="sg-more" className="tb-h2 sg-h2">More scholarship guides and free practice</h2>
          <div className="sg-cards">
            {others.map((g) => (
              <Link key={g.href} href={g.href} className="sg-card">
                <span className="sg-card__k">{g.short}</span>
                <span className="sg-card__t">{g.title}</span>
                <span className="sg-card__x">{g.text}</span>
              </Link>
            ))}
          </div>
          <ul className="sg-practice">
            {PRACTICE_LINKS.map((p) => <li key={p.href}><Link href={p.href}>{p.label}</Link></li>)}
          </ul>
        </div>
      </section>

      <section className="tb-section tb-section--soft" aria-label="Join the Tuterly Scholarship list">
        <div className="tb-wrap sg-narrow">
          <ScholarshipCTA sourcePage={path} defaultEntry={defaultEntry} defaultTest={defaultTest} />
          <p className="sg-sources">
            Provider information is a general summary, checked October 2026 against public provider pages:{" "}
            {SOURCES.map((s, i) => <span key={s.url}>{i ? "; " : ""}<a href={s.url} rel="noopener">{s.label}</a></span>)}.
            Tests, sections, dates and fees are set by each provider and school and can change, so always confirm on your target school&rsquo;s own scholarship page.
            Tuterly&rsquo;s questions are its own, written in scholarship style. ACER, Edutest and AAS do not endorse Tuterly.
          </p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

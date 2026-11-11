import { Md } from "@/lib/md-html";
import Link from "next/link";
import "katex/dist/katex.min.css";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import WeeklySignup from "@/components/study/WeeklySignup";
import { cleanMathText } from "@/lib/math-text-fixes";
import { mathToReadable } from "@/lib/try-email";
import { YEAR_MATHS, YEAR_MATHS_YEARS, yearTopicsByStrand, yearQuickCheck } from "@/lib/year-maths";
import { SITE_URL } from "@/lib/site";
import "@/components/state/state-hub.css";
import "@/components/study/topic-guide.css";

export function yearMathsMetadata(n) {
  const y = YEAR_MATHS[n];
  const url = `${SITE_URL}/year-${n}-maths`;
  return {
    title: { absolute: y.title },
    description: y.description,
    alternates: { canonical: url },
    openGraph: { images: ["/og-tuterly.png"], title: y.title, description: y.description, url, type: "article" },
    twitter: { card: "summary_large_image", title: y.title, description: y.description },
  };
}

const M = ({ md }) => (
  <Md className="tg-md" md={cleanMathText(md)} />
);

export default function YearMaths({ n }) {
  const y = YEAR_MATHS[n];
  const year = `Year ${n}`;
  const url = `${SITE_URL}/year-${n}-maths`;
  const strands = yearTopicsByStrand(String(n));
  const quiz = yearQuickCheck(n);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: `${year} maths`, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: y.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    quiz.length && {
      "@context": "https://schema.org",
      "@type": "Quiz",
      name: `${year} maths quick check`,
      educationalLevel: year,
      hasPart: quiz.map((q) => ({ "@type": "Question", text: mathToReadable(q.q), acceptedAnswer: { "@type": "Answer", text: mathToReadable(q.a) } })),
    },
  ].filter(Boolean);

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
          <li aria-current="page">{year} maths</li>
        </ol>
      </nav>

      <header className="sh-hero">
        <p className="sh-eyebrow">{year} · Australian Curriculum</p>
        <h1>{y.h1}</h1>
        <p className="sh-lead">{y.lead}</p>
        <p style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href={`/worksheets/year-${n}`} className="ym-pill">{year} worksheets</Link>
          <Link href={`/year-${n}-maths-test`} className="ym-pill">{year} maths test</Link>
          <a href="#topics" className="ym-pill">Every topic ↓</a>
        </p>
      </header>

      <section className="sh-sec" aria-labelledby="ym-new">
        <div className="sh-wrap sh-cols">
          <div>
            <h2 id="ym-new">What&rsquo;s new in {year}</h2>
            <ul className="ym-list">{y.changes.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div>
            <h2>Where students get stuck</h2>
            <ul className="ym-list">
              {y.stuck.map((s) => (
                <li key={s.slug}>{s.t} <Link href={`/worksheets/${s.slug}`} className="sh-link">Practise it →</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="topics" className="sh-sec sh-sec--paper" aria-labelledby="ym-topics" style={{ scrollMarginTop: 90 }}>
        <div className="sh-wrap">
          <h2 id="ym-topics">Every {year} maths topic</h2>
          <p className="sh-sub">Grouped by strand, as in the Australian Curriculum. Each topic has worked examples, a question to try and a free worksheet.</p>
          {strands.map((g) => (
            <div key={g.strand} className="sh-group">
              <div className="sh-group__head"><h3>{g.strand}</h3><span>{g.items.length} {g.items.length === 1 ? "topic" : "topics"}</span></div>
              <ul className="ym-topics">
                {g.items.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/worksheets/${t.slug}`} className="ym-topic">{t.topic}{t.ext ? " (10A)" : ""}</Link>
                    {t.desc && <span className="ym-desc">{t.desc}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {quiz.length > 0 && (
        <section className="tg" aria-labelledby="ym-quiz">
          <div className="tg-wrap">
            <p className="tg-eyebrow">Quick check</p>
            <h2 id="ym-quiz" className="tg-title">{quiz.length} {year} questions</h2>
            <p className="tg-lead">One from each of these topics. Try each one, then open the answer.</p>
            <ol className="tg-qlist">
              {quiz.map((q, i) => (
                <li key={i} className="tg-q">
                  <p style={{ margin: "0 0 4px", fontSize: 12.5, fontWeight: 700, color: "var(--brand-text)", textTransform: "uppercase", letterSpacing: ".4px" }}>
                    <Link href={`/worksheets/${q.slug}`} style={{ color: "inherit", textDecoration: "none" }}>{q.topic}</Link>
                  </p>
                  <M md={q.q} />
                  <details><summary>Answer</summary><M md={q.a} /></details>
                </li>
              ))}
            </ol>
            <p style={{ marginTop: 18 }}><Link href={`/year-${n}-maths-test`} className="sh-link">Try the full {year} sample test →</Link></p>
          </div>
        </section>
      )}

      <section className="sh-sec" aria-labelledby="ym-help">
        <div className="sh-wrap sh-narrow">
          <h2 id="ym-help">How to help with {year} maths at home</h2>
          <ul className="ym-list">{y.help.map((t) => <li key={t}>{t}</li>)}</ul>
          <div style={{ marginTop: 26 }}>
            <WeeklySignup yearLevel={year} placement={`year_${n}_maths`} />
          </div>
        </div>
      </section>

      <section className="sh-sec sh-sec--paper" aria-labelledby="ym-faq">
        <div className="sh-wrap sh-narrow">
          <h2 id="ym-faq">{year} maths questions</h2>
          <div className="sh-faqs">
            {y.faqs.map((f) => (
              <div key={f.q} className="sh-box">
                <h3 className="sh-h3">{f.q}</h3>
                <p className="sh-p">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav className="sh-switch" aria-label="Maths by year level">
        <p className="sh-switch__title">Another year level?</p>
        <ul>
          {YEAR_MATHS_YEARS.map((v) => (
            <li key={v}>
              <Link href={`/year-${v}-maths`} aria-current={v === String(n) ? "page" : undefined} className={v === String(n) ? "is-current" : ""}>Year {v}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <AppCtaBand placement={`year_${n}_maths_final`} />
      <MarketingFooter />
    </div>
  );
}

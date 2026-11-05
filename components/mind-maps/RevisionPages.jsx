import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import StudyAppCTA from "@/components/StudyAppCTA";
import { Eyebrow } from "@/components/brand";
import MindMapSheet from "@/components/mind-maps/MindMapSheet";
import {
  PRACTISE, mindMapFiles, mindMapPath, mindMapsForYear, revisionBooklet, revisionYearPath, rich,
} from "@/lib/mind-maps";
import { SITE_URL } from "@/lib/site";
import "@/components/study/study-landing.css";
import "./mind-maps.css";

const yearFaqs = (y, maps) => [
  {
    q: `What topics are in Year ${y} maths?`,
    a: `These ${maps.length} revision mind maps follow the chapter order of popular Year ${y} maths textbooks used in Victoria: ${maps.map((m) => m.short).join(", ")}. Together they cover the same maths as the Year ${y} Australian Curriculum.`,
  },
  {
    q: "Are the mind maps free?",
    a: "Yes. View them here, print them, or download the PDFs, free for personal and classroom use.",
  },
  {
    q: "Can I use one as a cheat sheet in a test?",
    a: "Only if your teacher allows notes in the test. They're made for revising beforehand: read the map, then try each worked example yourself without looking.",
  },
  {
    q: `What's the best way to revise Year ${y} maths?`,
    a: "Short sessions on one topic at a time. Read the topic's mind map, cover the worked examples and redo them, then practise fresh questions on anything you got wrong until you can do it without help.",
  },
];

function FaqJsonLd({ faqs }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function revisionYearMetadata(y) {
  const title = `Year ${y} Maths Revision: Mind Maps for Every Topic (Free PDF) | Tuterly`;
  const description = `Free Year ${y} maths revision notes as one-page mind maps: a summary of every chapter with rules, worked examples and common mistakes. Download the full revision booklet PDF.`;
  const url = `${SITE_URL}${revisionYearPath(y)}`;
  return { title: { absolute: title }, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website", images: [mindMapFiles(mindMapsForYear(y)[0]).png] } };
}

export function RevisionYearPage({ year: y }) {
  const maps = mindMapsForYear(y);
  const faqs = yearFaqs(y, maps);
  return (
    <div className="tb sl">
      <MarketingNav />
      <FaqJsonLd faqs={faqs} />
      <section className="tb-section">
        <div className="tb-wrap">
          <nav aria-label="Breadcrumb" style={{ fontSize: 14, marginBottom: 10 }}>
            <Link href="/mind-maps" className="tb-link">Revision mind maps</Link> / Year {y}
          </nav>
          <Eyebrow>{`Year ${y} maths revision`}</Eyebrow>
          <h1 className="tb-h1">Year {y} maths revision: <span className="sl-accent">every topic on one page</span>.</h1>
          <p className="tb-lead" style={{ maxWidth: 720 }}>
            Free revision mind maps for every Year {y} maths chapter. Each one is a one-page summary with a plain-English rule, worked examples and the mistakes to watch out for. Print them, stick them on the wall, or save them as PDFs.
          </p>
          <div className="mm-actions" style={{ marginTop: 18 }}>
            <a href={revisionBooklet(y)} className="tb-btn tb-btn--primary" download>Download the revision booklet (PDF)</a>
            <span className="tb-muted" style={{ alignSelf: "center", fontSize: 14 }}>All {maps.length} topics, one A4 page each</span>
          </div>
        </div>
      </section>

      <section className="tb-section tb-section--card" aria-labelledby="rv-chapters">
        <div className="tb-wrap">
          <h2 id="rv-chapters" className="tb-h2" style={{ marginBottom: 16 }}>Pick a topic</h2>
          <div className="mm-chapters">
            {maps.map((m) => (
              <Link key={m.slug} href={mindMapPath(m)} className="mm-chapter">
                <img src={mindMapFiles(m).png} alt={`Year ${y} ${m.short} revision mind map`} loading="lazy" width="1680" height="1188" />
                <span className="mm-chapter__k">Chapter {m.chapter}</span>
                <span className="mm-chapter__t">{m.short}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="rv-how">
        <div className="tb-wrap" style={{ maxWidth: 820 }}>
          <h2 id="rv-how" className="tb-h2">How to revise with them</h2>
          <ol className="mm-steps">
            <li><strong>Read the map</strong> for the topic on your next test. Say each rule in your own words.</li>
            <li><strong>Cover the worked examples</strong> and redo them. If you get stuck, that's what to practise.</li>
            <li><strong>Practise fresh questions</strong> on anything you got wrong, with a free <Link href="/worksheets" className="tb-link">worksheet</Link> for the topic, until you can do it without looking.</li>
          </ol>
        </div>
      </section>

      <section className="tb-section tb-section--card" aria-labelledby="rv-faq">
        <div className="tb-wrap" style={{ maxWidth: 820 }}>
          <h2 id="rv-faq" className="tb-h2" style={{ marginBottom: 12 }}>Questions</h2>
          {faqs.map((f) => (
            <details key={f.q} className="mm-faq">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="tb-section">
        <div className="tb-wrap" style={{ maxWidth: 720 }}>
          <StudyAppCTA variant="inline" placement={`revision_y${y}`} heading="Got some of these wrong in a test?" />
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}

export function revisionChapterMetadata(m) {
  const title = `Year ${m.year} ${m.short} Revision: Mind Map and Summary (Free PDF) | Tuterly`;
  const description = `Year ${m.year} ${m.short.toLowerCase()} on one page: ${m.summary} Free printable summary sheet and PDF.`;
  const url = `${SITE_URL}${mindMapPath(m)}`;
  return { title: { absolute: title }, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "article", images: [mindMapFiles(m).png] } };
}

export function RevisionChapterPage({ map: m }) {
  const all = mindMapsForYear(m.year);
  const i = all.indexOf(m);
  const prev = all[i - 1], next = all[i + 1];
  const files = mindMapFiles(m);
  const practise = PRACTISE[m.appKey] || [];
  return (
    <div className="tb sl">
      <MarketingNav />
      <main className="mm-page">
        <div className="tb-wrap">
          <nav aria-label="Breadcrumb" style={{ fontSize: 14, marginBottom: 10 }}>
            <Link href="/mind-maps" className="tb-link">Revision mind maps</Link> / <Link href={revisionYearPath(m.year)} className="tb-link">Year {m.year} maths revision</Link> / Chapter {m.chapter}
          </nav>
          <div className="mm-head">
            <div>
              <Eyebrow>{`Year ${m.year} maths · Chapter ${m.chapter}`}</Eyebrow>
              <h1 className="tb-h1" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>Year {m.year} {m.short}: revision mind map</h1>
              <p className="tb-lead" style={{ maxWidth: 720, marginTop: 6 }}>{m.summary} Everything on one page, free to print or save as a PDF.</p>
            </div>
            <div className="mm-actions">
              <a href={files.pdf} className="tb-btn tb-btn--primary" download>Download the A4 PDF</a>
              <a href={files.png} className="tb-btn tb-btn--secondary" download>Save as an image</a>
            </div>
          </div>
          <MindMapSheet map={m} />

          <div className="mm-below">
            <section aria-labelledby="rv-in">
              <h2 id="rv-in" className="tb-h3">In this chapter</h2>
              <ul className="mm-sections">
                {m.cards.map((c, k) => (
                  <li key={k}><span className="mm-sections__k">{c.sections.join(", ")}</span> <span dangerouslySetInnerHTML={{ __html: rich(c.title) }} /></li>
                ))}
              </ul>
            </section>
            {practise.length > 0 && (
              <section aria-labelledby="rv-practise">
                <h2 id="rv-practise" className="tb-h3">Practise it</h2>
                <p className="tb-muted" style={{ margin: "4px 0 10px" }}>Free worksheets with worked solutions:</p>
                <ul className="mm-practise">
                  {practise.map(([slug, label]) => (
                    <li key={slug}><Link href={`/worksheets/${slug}`} className="tb-link">Year {m.year} {label} worksheet →</Link></li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="mm-head" style={{ marginTop: 24 }}>
            {prev ? <Link href={mindMapPath(prev)} className="tb-link">← Chapter {prev.chapter}: {prev.short}</Link> : <span />}
            {next ? <Link href={mindMapPath(next)} className="tb-link">Chapter {next.chapter}: {next.short} →</Link> : <span />}
          </div>
        </div>
      </main>
      <section className="tb-section tb-section--card">
        <div className="tb-wrap" style={{ maxWidth: 720 }}>
          <StudyAppCTA variant="inline" placement="revision_chapter" heading="Got some of these wrong in a test?" />
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import StudyAppCTA from "@/components/StudyAppCTA";
import { Eyebrow, Reveal, SectionHead } from "@/components/brand";
import NaplanTest from "@/components/naplan/NaplanTest";
import { NAPLAN_FACTS, NAPLAN_SOURCES, NAPLAN_YEARS, OFFICIAL_DEMO, calculatorLine, getNaplanTest, naplanFaqs, naplanSlug } from "@/lib/naplan";
import "@/components/study/study-landing.css";
import "@/components/study/worked-examples.css";
import "./naplan.css";

// The app covers Years 7 to 10, so only those NAPLAN years get the app pitch.
const APP_YEARS = [7, 9];

const M = ({ md, inline = false }) => (
  <div className={inline ? "wx-md nt-inline" : "wx-md"}>
    <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}
      components={{ table: ({ node, ...p }) => <div className="wx-table"><table {...p} /></div> }}>
      {md}
    </ReactMarkdown>
  </div>
);

// One NAPLAN numeracy practice page (Years 3, 5, 7 or 9): facts, a marked
// 20-question test, FAQ, and the right next step for the year level.
export default function NaplanPage({ year }) {
  const qs = getNaplanTest(year) || [];
  const faqs = naplanFaqs(year);
  const isApp = APP_YEARS.includes(year);
  const mins = NAPLAN_FACTS.minutes[year];
  const questions = qs.map((q) => ({
    n: q.n, strand: q.strand, skill: q.skill, format: q.format, calculator: q.calculator,
    answerIndex: q.answerIndex, accept: q.accept,
    q: <M md={q.question} />,
    opts: q.options ? q.options.map((o, j) => <M key={j} md={o} inline />) : null,
    sol: <M md={q.solution} />,
  }));

  return (
    <div className="tb sl np">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        }}
      />
      <MarketingNav />

      <section className="np-hero" aria-labelledby="np-title">
        <div className="tb-wrap">
          <Eyebrow><Link href="/naplan" className="tb-link">NAPLAN practice</Link> · Year {year} numeracy</Eyebrow>
          <h1 id="np-title" className="tb-h1 np-h1">
            Year {year} NAPLAN numeracy <span className="sl-accent">practice test</span>
          </h1>
          <p className="tb-lead np-lead">
            20 free NAPLAN-style questions across every strand, marked as soon as you finish, with a worked solution for every question. The official demonstration tests don’t show answers. This one does.
          </p>
          <div className="np-facts">
            <div><span className="np-facts__k">NAPLAN 2027</span><span className="np-facts__v">{NAPLAN_FACTS.window}</span></div>
            <div><span className="np-facts__k">Numeracy test</span><span className="np-facts__v">{mins} minutes, online</span></div>
            <div><span className="np-facts__k">Calculator</span><span className="np-facts__v">{year >= 7 ? "After a short non-calculator section" : "Not allowed"}</span></div>
            <div><span className="np-facts__k">This practice test</span><span className="np-facts__v">20 questions, about {year >= 7 ? 30 : 25} minutes</span></div>
          </div>
          <a href="#naplan-test" className="tb-btn tb-btn--primary np-start">Start the practice test</a>
        </div>
      </section>

      <section className="tb-section tb-section--card" id="naplan-test" aria-label={`Year ${year} NAPLAN numeracy practice test`}>
        <div className="tb-wrap np-testwrap">
          <p className="np-note">
            Answer as many as you can, then press <strong>Mark my test</strong> at the bottom.{year >= 7 ? " Do questions 1 to 5 without a calculator, as in the real test." : " Use paper for working, no calculator."}
          </p>
          <NaplanTest year={year} questions={questions} appYears={APP_YEARS} />
          <p className="np-disclaimer">
            These are Tuterly’s own NAPLAN-style questions, not official NAPLAN questions. NAPLAN is run by ACARA. For the official practice tests, see the <a href={OFFICIAL_DEMO} rel="noopener">NAPLAN public demonstration site</a>.
          </p>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="np-about">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="np-about" eyebrow="About the test" title={`What the Year ${year} numeracy test looks like.`} />
          </Reveal>
          <ul className="np-about">
            <li><strong>When:</strong> NAPLAN 2027 runs from {NAPLAN_FACTS.window}. {NAPLAN_FACTS.windowNote}</li>
            <li><strong>How long:</strong> the Year {year} numeracy test is {mins} minutes. {calculatorLine(year)}</li>
            <li><strong>What’s tested:</strong> maths from the Australian Curriculum across {NAPLAN_FACTS.strands}.</li>
            <li><strong>Question types:</strong> multiple choice, typed answers, and on-screen tasks such as drag and drop.</li>
            <li><strong>It adapts:</strong> everyone starts with the same set of questions, then later sets get easier or harder depending on how they go.</li>
            <li><strong>Results:</strong> reported against four proficiency levels ({NAPLAN_FACTS.levels.join(", ")}), in a student report later in the year.</li>
          </ul>
          <p className="np-sources">
            Sources: {NAPLAN_SOURCES.map((s, i) => (
              <span key={s.url}>{i ? ", " : ""}<a href={s.url} rel="noopener">{s.label}</a></span>
            ))}. Checked October 2026.
          </p>
        </div>
      </section>

      <section className="tb-section tb-section--card" aria-labelledby="np-tips">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="np-tips" eyebrow="Getting ready" title="How to use this practice test." />
          </Reveal>
          <ol className="np-tips">
            <li><strong>Do it in one sitting,</strong> without help, so the result shows where they really are.</li>
            <li><strong>Read every worked solution for the ones marked ✗,</strong> then try a similar question a few days later.</li>
            <li><strong>Practise by strand.</strong> The result breaks down by number, algebra, measurement, space, and statistics and probability, so you know where to spend time.</li>
            {year >= 7 ? (
              <li><strong>Practise without a calculator too.</strong> The first section of the real test is non-calculator, so keep mental and written methods sharp.</li>
            ) : (
              <li><strong>Little and often beats cramming.</strong> Ten minutes a day in the weeks before March helps more than one long session.</li>
            )}
          </ol>
          {isApp ? (
            <div className="np-cta">
              <p className="np-cta__title">Turn their NAPLAN mistakes into practice.</p>
              <p className="np-cta__text">
                The Tuterly app is built for Years 7 to 10. Snap any question they got wrong, here or in a school test, and they get the worked solution and fresh questions on the same idea until it’s mastered. Test any topic covers every part of a topic before the real thing.
              </p>
              <div className="np-cta__form"><StudyAppCTA variant="hero" placement={`naplan_year_${year}`} position="inline" slim /></div>
            </div>
          ) : (
            <div className="np-cta">
              <p className="np-cta__title">Practise any Year {year} topic for free.</p>
              <p className="np-cta__text">
                Our free worksheet generator makes six new questions on any Year {year} maths topic, with fully worked solutions, as many times as you like.
              </p>
              <Link href="/worksheets" className="tb-btn tb-btn--primary">Make a free Year {year} worksheet</Link>
            </div>
          )}
        </div>
      </section>

      <section className="tb-section" aria-labelledby="np-faq">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="np-faq" eyebrow="Questions" title={`Year ${year} NAPLAN numeracy: questions parents ask`} />
          </Reveal>
          <div className="sl-faq np-faq">
            {faqs.map((f) => (
              <details key={f.q} className="sl-faq__item">
                <summary><span>{f.q}</span><span className="sl-faq__plus" aria-hidden="true">+</span></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <p className="np-other">
            Other years: {NAPLAN_YEARS.filter((y) => y !== year).map((y, i) => (
              <span key={y}>{i ? " · " : ""}<Link href={`/naplan/${naplanSlug(y)}`}>Year {y} numeracy</Link></span>
            ))}
          </p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

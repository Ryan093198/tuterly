import { Md } from "@/lib/md-html";
import Link from "next/link";
import "katex/dist/katex.min.css";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import StudyAppCTA from "@/components/StudyAppCTA";
import AppCtaBand from "@/components/study/AppCtaBand";
import { Eyebrow, Reveal, SectionHead } from "@/components/brand";
import NaplanTest from "@/components/naplan/NaplanTest";
import { NAPLAN_FACTS, NAPLAN_SOURCES, NAPLAN_YEARS, OFFICIAL_DEMO, calculatorLine, getNaplanTest, naplanFaqs, naplanSlug, naplanPdfPath, STRAND_PRACTICE, NAPLAN_READING } from "@/lib/naplan";
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { writtenTopicTest } from "@/lib/topic-test-files";
import { getPostBySlug } from "@/lib/learn";
import "@/components/study/study-landing.css";
import "@/components/study/worked-examples.css";
import "./naplan.css";

// The app covers Years 7 to 10, so only those NAPLAN years get the app pitch.
const APP_YEARS = [7, 9];

const M = ({ md, inline = false }) => (
  <Md className={inline ? "wx-md nt-inline" : "wx-md"} tableClass="wx-table" md={md} />
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
            20 free NAPLAN-style questions across every strand, marked as soon as you finish, with a worked solution for every question. Do it online, or print the PDF.
          </p>
          <div className="np-facts">
            <div><span className="np-facts__k">NAPLAN 2027</span><span className="np-facts__v">{NAPLAN_FACTS.window}</span></div>
            <div><span className="np-facts__k">Numeracy test</span><span className="np-facts__v">{mins} minutes, online</span></div>
            <div><span className="np-facts__k">Calculator</span><span className="np-facts__v">{year >= 7 ? "After a short non-calculator section" : "Not allowed"}</span></div>
            <div><span className="np-facts__k">This practice test</span><span className="np-facts__v">20 questions, about {year >= 7 ? 30 : 25} minutes</span></div>
          </div>
          <div className="np-btns">
            <a href="#naplan-test" className="tb-btn tb-btn--primary">Start the practice test</a>
            <a href={naplanPdfPath(year)} className="tb-btn tb-btn--secondary">Download the PDF</a>
          </div>
          {isApp && (
            <div className="np-appbox">
              <p className="np-appbox__title">Get ready for NAPLAN with the Tuterly app.</p>
              <p className="np-appbox__text">Snap any question they get wrong. Quinn shows the worked solution, then gives fresh questions on the same skill until it sticks.</p>
              <div className="np-appbox__form"><StudyAppCTA variant="hero" placement={`naplan_year_${year}_hero`} position="hero" slim /></div>
            </div>
          )}
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
                The Tuterly app is built for Years 7 to 10. Snap any question they got wrong, here or in a school test, and they get the worked solution and fresh questions on the same idea until it’s mastered. Topic check covers every part of a topic before the real thing.
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

      {STRAND_PRACTICE[year] && (
        <section className="tb-section" aria-labelledby="np-strands">
          <div className="tb-wrap">
            <Reveal>
              <SectionHead id="np-strands" eyebrow="Practise by strand" title={`Year ${year} NAPLAN numeracy practice by strand.`} />
            </Reveal>
            <p className="np-intro">
              After marking, practise the strand they found hardest. Each topic below has free worksheets with worked solutions, and most have a free 10-question PDF with answers. They follow the Australian Curriculum{year === 9 ? ", and include some Year 8 topics, since Year 9 NAPLAN tests everything up to Year 9" : ""}.
            </p>
            <div className="np-strands">
              {STRAND_PRACTICE[year].map((st) => (
                <div key={st.strand} className="np-strand">
                  <p className="np-strand__t">{st.strand}</p>
                  <ul>
                    {st.slugs.map((slug) => {
                      const p = WORKSHEET_LANDING_PAGES.find((w) => w.slug === slug);
                      if (!p) return null;
                      const pdf = writtenTopicTest(p.yearLevel, p.topicId);
                      return (
                        <li key={slug}>
                          <Link href={`/worksheets/${slug}`}>{p.yearLevel === `Year ${year}` ? p.topic : `${p.topic} (${p.yearLevel})`}</Link>
                          {pdf && <a className="np-strand__pdf" href={`/worksheets/${slug}/practice-questions.pdf`} aria-label={`${p.topic} free PDF with answers`}>PDF</a>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
          {(NAPLAN_READING[year] || []).length > 0 && (
            <div className="np-reading">
              <p className="np-reading__t">Reading for parents</p>
              <ul>
                {NAPLAN_READING[year].map((slug) => {
                  const p = getPostBySlug(slug);
                  return p ? <li key={slug}><Link href={`/learn/${slug}`}>{p.title}</Link></li> : null;
                })}
                <li><Link href="/naplan/past-papers">NAPLAN past papers: where to find them, with answers</Link></li>
              </ul>
            </div>
          )}
          <p className="np-other">
            Other years: {NAPLAN_YEARS.filter((y) => y !== year).map((y, i) => (
              <span key={y}>{i ? " · " : ""}<Link href={`/naplan/${naplanSlug(y)}`}>Year {y} numeracy</Link></span>
            ))}
          </p>
        </div>
      </section>

      {isApp && (
        <AppCtaBand
          placement={`naplan_year_${year}_final`}
          title={`Walk into Year ${year} NAPLAN ready.`}
          lead={`The Tuterly app is built for Years 7 to 10. Every wrong answer becomes a worked solution and new practice on that exact skill, so the weak spots from this test get fixed before the real one.`}
        />
      )}
      {isApp && <StudyAppCTA variant="banner" placement={`naplan_year_${year}_banner`} />}
      <MarketingFooter />
    </div>
  );
}

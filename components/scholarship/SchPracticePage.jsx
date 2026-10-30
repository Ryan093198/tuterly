import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { Eyebrow, Reveal, SectionHead } from "@/components/brand";
import SchPractice, { WaitlistBox } from "@/components/scholarship/SchPractice";
import { LEVELS, PROVIDERS, PROVIDER_SLUGS, WHY_APP, getPractice, scholarshipFaqs } from "@/lib/scholarship-practice";
import "@/components/study/study-landing.css";
import "@/components/study/worked-examples.css";
import "@/components/naplan/naplan.css";
import "./sch.css";

const M = ({ md, inline = false }) => (
  <div className={inline ? "wx-md nt-inline" : "wx-md"}>
    <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}
      components={{ table: ({ node, ...p }) => <div className="wx-table"><table {...p} /></div> }}>
      {md}
    </ReactMarkdown>
  </div>
);

// /scholarship-practice (provider = null) and /scholarship-practice/[provider].
export default function SchPracticePage({ provider = null }) {
  const p = provider ? PROVIDERS[provider] : null;
  const path = provider ? `/scholarship-practice/${provider}` : "/scholarship-practice";
  const sets = {};
  for (const l of LEVELS) {
    const d = getPractice(l.entry);
    if (!d) continue;
    sets[l.entry] = {
      questions: d.questions.map((q) => ({
        n: q.n, topic: q.topic, skill: q.skill, home: q.home, answer: q.answer, stim_id: q.stimulus_id,
        stim: q.stimulus_id ? (
          <div>
            <p className="sch-stim__title">{d.stimuli[q.stimulus_id].title}</p>
            <M md={d.stimuli[q.stimulus_id].body_md} />
          </div>
        ) : null,
        q: <M md={q.prompt_md} />,
        opts: q.options.map((o) => ({ key: o.key, el: <M md={o.md} inline /> })),
        sol: <M md={q.solution_md} />,
      })),
    };
  }
  const faqs = scholarshipFaqs(provider);
  const others = PROVIDER_SLUGS.filter((s) => s !== provider);

  return (
    <div className="tb sl np sch-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />
      <MarketingNav />

      <section className="np-hero" aria-labelledby="sch-title">
        <div className="tb-wrap">
          <Eyebrow>
            <Link href="/scholarship-practice" className="tb-link">Scholarship practice</Link>{p ? ` · ${p.name}` : " · Numerical reasoning"}
          </Eyebrow>
          <h1 id="sch-title" className="tb-h1 np-h1">
            {p ? p.h1 : <>Free scholarship <span className="sl-accent">numerical reasoning</span> practice</>}
          </h1>
          <p className="tb-lead np-lead">
            {p ? p.lead : "Ten numerical reasoning questions in the style of ACER, Edutest and AAS scholarship tests, for Years 4, 5 and 6. Get a mark and a worked solution for every question."}
          </p>
          <div className="np-facts">
            <div><span className="np-facts__k">Questions</span><span className="np-facts__v">10, multiple choice (A to E)</span></div>
            <div><span className="np-facts__k">Time</span><span className="np-facts__v">About 10 to 15 minutes</span></div>
            <div><span className="np-facts__k">Calculator</span><span className="np-facts__v">No, use paper for working</span></div>
            <div><span className="np-facts__k">Levels</span><span className="np-facts__v">Year 4, 5 or 6 (for Year 5, 6 or 7 entry)</span></div>
          </div>
          <a href="#sch-test" className="tb-btn tb-btn--primary np-start">Start the practice questions</a>
        </div>
      </section>

      <section className="tb-section tb-section--card" id="sch-test" aria-label="Scholarship numerical reasoning practice">
        <div className="tb-wrap np-testwrap">
          <p className="np-note">Choose your child&rsquo;s year, answer the questions, then press <strong>Mark my answers</strong> at the bottom.</p>
          <SchPractice levels={LEVELS} sets={sets} provider={provider} sourcePage={path} />
          <p className="np-disclaimer">
            These are Tuterly&rsquo;s own questions in scholarship style, not questions from {p ? p.name : "any test provider"}. {p ? `${p.name} doesn't endorse Tuterly.` : "No test provider endorses Tuterly."}
          </p>
        </div>
      </section>

      {p && (
        <section className="tb-section" aria-labelledby="sch-about">
          <div className="tb-wrap">
            <Reveal><SectionHead id="sch-about" eyebrow={`About ${p.name}`} title={`What the ${p.full} cover.`} /></Reveal>
            <div className="sch-about">
              <div>{p.about.map((t, i) => <p key={i}>{t}</p>)}</div>
              <dl className="sch-facts">
                {p.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>
            </div>
            <p className="np-sources">
              Source: {p.sources.map((s, i) => <span key={s.url}>{i ? ", " : ""}<a href={s.url} rel="noopener">{s.label}</a></span>)}. Checked October 2026. Always check your school&rsquo;s own scholarship page for its dates and parts.
            </p>
          </div>
        </section>
      )}

      <section className="tb-section tb-section--card" aria-labelledby="sch-why">
        <div className="tb-wrap">
          <Reveal><SectionHead id="sch-why" eyebrow="Tuterly Scholarship" title="Why we're building it as an app." lead="Practice papers tell you a score. The marks come from fixing what went wrong." /></Reveal>
          <div className="sch-why">
            {WHY_APP.map((w) => (
              <div key={w.t} className="sch-why__item">
                <h3>{w.t}</h3>
                <p>{w.b}</p>
              </div>
            ))}
          </div>
          <div className="sch-why__steps">
            <span><strong>1.</strong> Full diagnostic</span>
            <span aria-hidden="true">→</span>
            <span><strong>2.</strong> Wrong answers into their bank</span>
            <span aria-hidden="true">→</span>
            <span><strong>3.</strong> Drill until mastered</span>
            <span aria-hidden="true">→</span>
            <span><strong>4.</strong> Parents see progress</span>
          </div>
          <WaitlistBox entry={null} year={null} provider={provider} score={null} sourcePage={path} />
        </div>
      </section>

      <section className="tb-section" aria-labelledby="sch-faq">
        <div className="tb-wrap">
          <Reveal><SectionHead id="sch-faq" eyebrow="Questions" title="Questions parents ask" /></Reveal>
          <div className="sl-faq np-faq">
            {faqs.map((f) => (
              <details key={f.q} className="sl-faq__item">
                <summary><span>{f.q}</span><span className="sl-faq__plus" aria-hidden="true">+</span></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <p className="np-other">
            Practice for other tests: {others.map((s, i) => (
              <span key={s}>{i ? " · " : ""}<Link href={`/scholarship-practice/${s}`}>{PROVIDERS[s].name}</Link></span>
            ))}{provider ? <> · <Link href="/scholarship-practice">All scholarship practice</Link></> : null}
          </p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

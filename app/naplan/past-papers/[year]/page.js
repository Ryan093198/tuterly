import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import { NAPLAN_FACTS, NAPLAN_YEARS, OFFICIAL_DEMO, PAST_PAPERS, STRAND_PRACTICE, naplanSlug, naplanPdfPath } from "@/lib/naplan";
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import "@/components/naplan/naplan.css";

// One NAPLAN past papers page per year level (Ryan, 17 Nov 2026), like the
// per-year pages that rank for "naplan year 7 past papers" (about 1,000
// searches a month). Every paper links straight to ACARA's own PDF. The
// links were read from ACARA's two test paper pages on 17 Nov 2026
// (content/naplan/past-papers.json), not typed by hand.

const DATA = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content", "naplan", "past-papers.json"), "utf8"));

const yearOf = (slug) => {
  const m = /^year-(\d)$/.exec(slug || "");
  const y = m ? Number(m[1]) : null;
  return NAPLAN_YEARS.includes(y) ? y : null;
};
const pathFor = (y) => `/naplan/past-papers/year-${y}`;

export function generateStaticParams() {
  return NAPLAN_YEARS.map((y) => ({ year: `year-${y}` }));
}
export const dynamicParams = false;

const titleOf = (y) => `Year ${y} NAPLAN Past Papers with Answers (2008 to 2016)`;
const descOf = (y) =>
  `Every official Year ${y} NAPLAN past paper from 2008 to 2016, with answers: ${y >= 7 ? "numeracy (calculator and non-calculator)" : "numeracy"}, reading, language conventions and writing, linked straight to ACARA's PDFs. Plus a free online Year ${y} numeracy practice test.`;

export async function generateMetadata({ params }) {
  const y = yearOf((await params).year);
  if (!y) return {};
  return pageMetadata({ title: `${titleOf(y)} | Tuterly`, description: descOf(y), path: pathFor(y) });
}

const LABEL = {
  numeracy: "Numeracy",
  "numeracy (non-calculator)": "Numeracy, non-calculator",
  "numeracy (calculator)": "Numeracy, calculator",
  answers: "Answers",
  reading: "Reading",
  "reading magazine": "Reading magazine",
  "language conventions": "Language conventions",
  writing: "Writing",
  "writing prompt": "Writing prompt",
};
const NUMERACY = ["numeracy", "numeracy (non-calculator)", "numeracy (calculator)", "answers"];

function faqsFor(y) {
  const mins = NAPLAN_FACTS.minutes[y];
  return [
    { q: `Where can I find Year ${y} NAPLAN past papers?`, a: `On ACARA's website, free. This page links every Year ${y} paper from 2008 to 2016 straight to ACARA's PDF, with the answers for each year.` },
    { q: `Do the Year ${y} NAPLAN past papers have answers?`, a: "Yes. Each year has one answers PDF covering all the tests. It gives the correct answer only, not the working." },
    { q: `Are there Year ${y} NAPLAN papers after 2016?`, a: "No. ACARA doesn't release tests after 2016, and NAPLAN has been online since 2023, so there are no newer papers to download. Anything labelled a recent NAPLAN paper is someone's practice test." },
    y >= 7
      ? { q: `Is a calculator allowed in Year ${y} NAPLAN numeracy?`, a: `In the past papers there are two numeracy papers each year, one with a calculator and one without. Today's online test starts with a short non-calculator section, then an on-screen calculator is allowed. The numeracy test takes ${mins} minutes.` }
      : { q: `How long is the Year ${y} NAPLAN numeracy test?`, a: `${mins} minutes, online, with no calculator. The past papers are one numeracy paper per year.` },
    { q: "Which past paper should we start with?", a: "2016. It's the closest to today's content. Do it in one sitting, mark it with the answers PDF, then work on the skills behind the questions they got wrong." },
  ];
}

export default async function Page({ params }) {
  const y = yearOf((await params).year);
  if (!y) notFound();
  const years = DATA.years[String(y)] || [];
  const strands = STRAND_PRACTICE[y] || [];
  const pageBySlug = Object.fromEntries(WORKSHEET_LANDING_PAGES.map((p) => [p.slug, p]));
  const P = pathFor(y);

  return (
    <GuideShell
      path={P}
      title={titleOf(y)}
      description={descOf(y)}
      crumbs={[{ name: "NAPLAN practice tests", path: "/naplan" }, { name: "Past papers", path: "/naplan/past-papers" }, { name: `Year ${y}`, path: P }]}
      eyebrow={`NAPLAN · Year ${y}`}
      h1={`Year ${y} NAPLAN past papers, with answers`}
      lead={`Every official Year ${y} NAPLAN paper from 2008 to 2016, linked straight to ACARA's free PDFs, with the answers for each year. Numeracy first, then reading, language conventions and writing.`}
      quickAnswer={`ACARA publishes the Year ${y} NAPLAN paper tests from 2008 to 2016 for free, with an answers PDF for each year. ${y >= 7 ? "Numeracy has two papers each year, calculator and non-calculator." : "Numeracy has one paper each year."} There are no official papers after 2016, and NAPLAN is now online, so use the old papers for practice and timing.`}
      toc={[
        ["papers", `Year ${y} papers, 2008 to 2016`],
        ["use", "How to use them"],
        ["practice", "Practice for today's test"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Got questions wrong on a past paper?"
      ctaText="Snap it. Tuterly shows the worked solution, then gives fresh questions on the same skill until they can do it on their own. Years 7 to 10."
      placement={`naplan_past_papers_y${y}`}
      faqs={faqsFor(y)}
      faqTitle={`Year ${y} NAPLAN past papers: common questions`}
      links={[
        { href: `/naplan/${naplanSlug(y)}`, label: `Free Year ${y} NAPLAN numeracy practice test` },
        { href: "/naplan/past-papers", label: "All NAPLAN past papers" },
        { href: "/naplan", label: "NAPLAN practice tests, all years" },
      ]}
      finalTitle="Turn past paper mistakes into progress"
      finalText="Answer keys tell you what's wrong, not why. Tuterly shows every step of the working, then gives fresh questions on the same skill until it's mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="papers" className="tb-section" aria-labelledby="h-papers">
        <div className="tb-wrap">
          <h2 id="h-papers" className="tb-h2 pg-h2">Year {y} NAPLAN papers, 2008 to 2016</h2>
          <p className="pg-intro">
            Each link opens ACARA&rsquo;s PDF. {y >= 7 ? "Numeracy has a non-calculator and a calculator paper each year." : "Numeracy has one paper each year."} The answers PDF covers every test for that year.
          </p>
          <div className="pg-table pp-table">
            <table>
              <thead>
                <tr><th scope="col">Year</th><th scope="col">Numeracy and answers</th><th scope="col">Reading, conventions and writing</th></tr>
              </thead>
              <tbody>
                {years.map((row) => (
                  <tr key={row.year}>
                    <th scope="row">{row.year}</th>
                    <td>
                      {row.papers.filter((p) => NUMERACY.includes(p.kind)).map((p, i) => (
                        <span key={p.kind}>{i > 0 && " · "}<a href={p.url} rel="noopener">{LABEL[p.kind]}</a></span>
                      ))}
                    </td>
                    <td>
                      {row.papers.filter((p) => !NUMERACY.includes(p.kind)).map((p, i) => (
                        <span key={p.kind}>{i > 0 && " · "}<a href={p.url} rel="noopener">{LABEL[p.kind]}</a></span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pg-small">
            From ACARA&rsquo;s <a href={PAST_PAPERS["2012-2016"]} rel="noopener">2012 to 2016</a> and <a href={PAST_PAPERS["2008-2011"]} rel="noopener">2008 to 2011</a> test paper pages, checked 17 November 2026. Writing prompts from 2008 to 2011 were shared across year levels.
          </p>
        </div>
      </section>

      <section id="use" className="tb-section tb-section--card" aria-labelledby="h-use">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-use" className="tb-h2 pg-h2">How to use the Year {y} past papers</h2>
          <ol className="pg-steps np-steps2">
            <li><strong>Start with 2016.</strong>{" "}It&rsquo;s the closest to today&rsquo;s content. One paper is enough to start.</li>
            <li><strong>Time it.</strong>{" "}The numeracy test now takes {NAPLAN_FACTS.minutes[y]} minutes.{y >= 7 ? " Do the non-calculator paper without a calculator, as in the real test." : " No calculator, as in the real test."}</li>
            <li><strong>Mark it with the answers PDF.</strong>{" "}Sort the wrong ones by strand: number, algebra, measurement, space, or statistics and probability.</li>
            <li><strong>Learn the method, not the answer.</strong>{" "}The key only gives answers. For each wrong one, find a worked example of the same skill and try a fresh question.</li>
          </ol>
          <p className="pg-small">
            Today&rsquo;s NAPLAN is online and tailored, with question types like drag and drop, and NAPLAN 2027 runs {NAPLAN_FACTS.window}. ACARA&rsquo;s <a href={OFFICIAL_DEMO} rel="noopener">public demonstration site</a> shows how the online tests look.
          </p>
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice for today&rsquo;s Year {y} numeracy test</h2>
          <p className="pg-intro">
            A free 20-question Year {y} NAPLAN-style numeracy test that works like NAPLAN Online, marked instantly with a worked solution for every question.
          </p>
          <div className="nph-grid">
            <div className="nph-card nph-card--static">
              <p className="nph-card__title">Year {y} NAPLAN numeracy practice test</p>
              <p className="nph-card__links">
                <Link href={`/naplan/${naplanSlug(y)}`}>Take the test online →</Link>
                <a href={naplanPdfPath(y)}>Printable PDF with answers</a>
              </p>
            </div>
          </div>
          {strands.length > 0 && (
            <>
              <h3 className="tb-h3">Practise by strand</h3>
              <ul className="pg-checklist">
                {strands.map((s) => (
                  <li key={s.strand}>
                    <strong>{s.strand}:</strong>{" "}
                    {s.slugs.filter((sl) => pageBySlug[sl]).map((sl, i) => (
                      <span key={sl}>{i > 0 && ", "}<Link href={`/worksheets/${sl}`}>{pageBySlug[sl].topic}</Link></span>
                    ))}
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="pg-small">
            Past papers for other years:{" "}
            {NAPLAN_YEARS.filter((o) => o !== y).map((o, i) => (
              <span key={o}>{i > 0 && " · "}<Link href={pathFor(o)}>Year {o}</Link></span>
            ))}
          </p>
          <p className="np-disclaimer">
            The past papers are ACARA&rsquo;s. Our practice tests are Tuterly&rsquo;s own NAPLAN-style questions, not official NAPLAN questions. Tuterly isn&rsquo;t affiliated with ACARA.
          </p>
        </div>
      </section>
    </GuideShell>
  );
}

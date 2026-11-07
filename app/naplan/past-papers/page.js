import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import { NAPLAN_FACTS, NAPLAN_YEARS, OFFICIAL_DEMO, PAST_PAPERS, naplanSlug, naplanPdfPath } from "@/lib/naplan";
import "@/components/naplan/naplan.css";

// "naplan past papers" ~12,100 searches a month in Australia (49,500 in
// March); "naplan year 7 past papers" 1,000; "naplan year 9 past papers" 480.
// Facts checked 7 Nov 2026 against ACARA's test paper pages (PAST_PAPERS).

const PATH = "/naplan/past-papers";
const TITLE = "NAPLAN Past Papers with Answers (2008 to 2016): Where to Find Them | Tuterly";
const DESCRIPTION =
  "Where to find the official NAPLAN past papers and answers for Years 3, 5, 7 and 9, why there are none after 2016, how they differ from today’s online test, and free NAPLAN-style practice tests with worked solutions.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const FAQS = [
  { q: "Where can I download NAPLAN past papers?", a: "From ACARA’s website, free. There are two pages: the 2008 to 2011 tests and the 2012 to 2016 tests, each with answers, for Years 3, 5, 7 and 9." },
  { q: "Why are there no NAPLAN past papers after 2016?", a: "ACARA says it doesn’t provide access to tests after 2016 because those tests are used for other projects to keep improving the National Assessment Program." },
  { q: "Do the NAPLAN past papers have answers?", a: "Yes. Each year level has an answers PDF. They give the correct answer, not the working, so a child who gets one wrong may still not know why." },
  { q: "Are old NAPLAN papers still useful?", a: "Yes, for practice on the kind of maths and reading NAPLAN tests, and for timing. But today’s test is online and tailored, with question types like drag and drop, and the Australian Curriculum has been revised since, so treat them as practice rather than a preview." },
  { q: "Which past papers are there for Year 7 and Year 9 numeracy?", a: "For each year from 2008 to 2016 there are two numeracy papers: a calculator paper and a non-calculator paper. Years 3 and 5 have one numeracy paper each year." },
  { q: "Is there a NAPLAN 2027 practice test?", a: `There’s no official 2027 test to practise from. ACARA’s public demonstration site has example tests in the online format. Our free NAPLAN-style numeracy tests for Years 3, 5, 7 and 9 are written for the current test, with worked solutions. NAPLAN 2027 runs ${NAPLAN_FACTS.window}.` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "NAPLAN practice tests", path: "/naplan" }, { name: "Past papers", path: PATH }]}
      eyebrow="NAPLAN · Years 3, 5, 7 and 9"
      h1="NAPLAN past papers, with answers: where to find them"
      lead="The official NAPLAN past papers are free, but only up to 2016, and they look quite different from the online test your child will sit. Here’s where to find them, how to use them well, and free practice tests written for today’s NAPLAN."
      quickAnswer="ACARA publishes the NAPLAN paper tests from 2008 to 2016 for Years 3, 5, 7 and 9, with answers, free on its website. It doesn’t release tests after 2016. Since NAPLAN is now online and tailored, use the old papers for practice and timing, and use a current-style practice test to check where your child is now."
      toc={[
        ["where", "Where to find them"],
        ["why", "Why none after 2016"],
        ["different", "How today’s test differs"],
        ["use", "How to use them"],
        ["practice", "Practice tests for 2027"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Got questions wrong on a past paper?"
      ctaText="Snap it. Tuterly shows the worked solution, then gives fresh questions on the same skill until they can do it on their own. Years 7 to 10."
      placement="naplan_past_papers"
      faqs={FAQS}
      faqTitle="NAPLAN past papers: common questions"
      links={[
        { href: "/naplan", label: "Free NAPLAN practice tests" },
        { href: "/learn/how-to-read-naplan-results-victorian-parents", label: "How to read NAPLAN results" },
        { href: "/worksheets", label: "Free maths worksheets" },
      ]}
      finalTitle="Turn past paper mistakes into progress"
      finalText="Answer keys tell you what’s wrong, not why. Tuterly shows every step of the working, then gives fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="where" className="tb-section" aria-labelledby="h-where">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-where" className="tb-h2 pg-h2">Where to find the official NAPLAN past papers</h2>
          <p className="pg-intro">ACARA, the body that runs NAPLAN, keeps the old paper tests on its website. They’re free to download as PDFs.</p>
          <div className="pg-table">
            <table>
              <thead><tr><th scope="col">Years</th><th scope="col">What’s there</th><th scope="col">Link</th></tr></thead>
              <tbody>
                <tr>
                  <th scope="row">2012 to 2016</th>
                  <td>Reading, writing, language conventions and numeracy for Years 3, 5, 7 and 9, with an answers PDF for each year level</td>
                  <td><a href={PAST_PAPERS["2012-2016"]} rel="noopener">ACARA: 2012 to 2016 papers</a></td>
                </tr>
                <tr>
                  <th scope="row">2008 to 2011</th>
                  <td>The same four tests for each year level, with answers</td>
                  <td><a href={PAST_PAPERS["2008-2011"]} rel="noopener">ACARA: 2008 to 2011 papers</a></td>
                </tr>
                <tr>
                  <th scope="row">Online format</th>
                  <td>Example tests that show how the online test works, with answer keys</td>
                  <td><a href={OFFICIAL_DEMO} rel="noopener">NAPLAN public demonstration site</a></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="pg-small">Numeracy: Years 3 and 5 have one paper per year. Years 7 and 9 have two, a calculator paper and a non-calculator paper. Checked November 2026.</p>
        </div>
      </section>

      <section id="why" className="tb-section tb-section--card" aria-labelledby="h-why">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-why" className="tb-h2 pg-h2">Why there are no NAPLAN past papers after 2016</h2>
          <p className="pg-intro">ACARA doesn’t release tests after 2016. It says those tests are used for other projects to keep improving the National Assessment Program. So any “2023 NAPLAN paper” or “2025 NAPLAN paper” you see online isn’t an official test. At best it’s someone’s practice test in the NAPLAN style.</p>
        </div>
      </section>

      <section id="different" className="tb-section" aria-labelledby="h-diff">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-diff" className="tb-h2 pg-h2">How today’s NAPLAN differs from the old papers</h2>
          <div className="pg-table">
            <table>
              <thead><tr><th scope="col"></th><th scope="col">Past papers (2008 to 2016)</th><th scope="col">NAPLAN now</th></tr></thead>
              <tbody>
                <tr><th scope="row">Format</th><td>Paper, pencil, bubbles to fill in</td><td>Online, on a computer or tablet</td></tr>
                <tr><th scope="row">Questions</th><td>The same questions for everyone</td><td>Tailored: later sets get easier or harder depending on how they go</td></tr>
                <tr><th scope="row">Question types</th><td>Multiple choice and written answers</td><td>Also drag and drop and other on-screen tasks</td></tr>
                <tr><th scope="row">When</th><td>May</td><td>March ({NAPLAN_FACTS.window} in 2027)</td></tr>
                <tr><th scope="row">Results</th><td>Bands 1 to 10</td><td>Four proficiency levels: {NAPLAN_FACTS.levels.join(", ")}</td></tr>
              </tbody>
            </table>
          </div>
          <p className="pg-small">The Australian Curriculum has also been revised since the old papers were written, so a few questions may cover maths that’s now taught in a different year.</p>
        </div>
      </section>

      <section id="use" className="tb-section tb-section--card" aria-labelledby="h-use">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-use" className="tb-h2 pg-h2">How to use NAPLAN past papers well</h2>
          <ol className="pg-steps np-steps2">
            <li><strong>Start with one recent paper.</strong>{" "}2016 is the closest to today’s content. Don’t print all nine years.</li>
            <li><strong>Time it.</strong>{" "}Sit it in one go. In Years 7 and 9, do the non-calculator paper without a calculator, as in the real test.</li>
            <li><strong>Mark it together.</strong>{" "}Use the answers PDF, then sort the wrong ones by strand: number, algebra, measurement, space, or statistics and probability.</li>
            <li><strong>Learn the method, not the answer.</strong>{" "}The answer key only gives the answer. For each wrong one, find a worked example of the same skill and try a fresh question.</li>
          </ol>
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap">
          <h2 id="h-practice" className="tb-h2 pg-h2">Free NAPLAN practice tests for 2027, with worked solutions</h2>
          <p className="pg-intro">Our NAPLAN-style numeracy tests are written for today’s test: 20 questions across every strand, marked instantly online, with a worked solution for every question. Or print the PDF.</p>
          <div className="nph-grid">
            {NAPLAN_YEARS.map((y) => (
              <div key={y} className="nph-card nph-card--static">
                <p className="nph-card__title">Year {y} NAPLAN numeracy</p>
                <p className="nph-card__links">
                  <Link href={`/naplan/${naplanSlug(y)}`}>Take the test online →</Link>
                  <a href={naplanPdfPath(y)}>Printable PDF with answers</a>
                </p>
              </div>
            ))}
          </div>
          <p className="np-disclaimer">
            These are Tuterly’s own NAPLAN-style questions, not official NAPLAN questions. NAPLAN is run by ACARA, and Tuterly isn’t affiliated with ACARA.
          </p>
        </div>
      </section>
    </GuideShell>
  );
}

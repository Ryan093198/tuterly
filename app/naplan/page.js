import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import { getPostBySlug } from "@/lib/learn";
import { NAPLAN_FACTS, NAPLAN_YEARS, OFFICIAL_DEMO, PAST_PAPERS, naplanSlug, naplanPdfPath } from "@/lib/naplan";
import "@/components/naplan/naplan.css";

// NAPLAN hub: the free practice tests (online and PDF) for Years 3, 5, 7 and
// 9, the 2027 dates and format, past papers, a plan to March, and results.
// Searches (AU, monthly average): "naplan practice tests" 8,100 (49,500 in
// March), "naplan past papers" 12,100, "naplan results" 5,400 (Nov 2026).

const PATH = "/naplan";
const TITLE = "Free NAPLAN Practice Tests with Answers (2027): Years 3, 5, 7 and 9 | Tuterly";
const DESCRIPTION = `Free NAPLAN-style numeracy practice tests for Years 3, 5, 7 and 9, marked instantly with worked solutions, plus printable PDFs and where to find past papers. NAPLAN 2027 runs ${NAPLAN_FACTS.window}.`;

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, type: "website" });

const READING = [
  "how-to-read-naplan-results-victorian-parents",
  "how-to-improve-naplan-results-before-next-year",
  "naplan-results-lower-than-expected-what-to-do",
  "naplan-below-national-average-how-to-close-the-gap",
  "year-9-naplan-preparation-guide-victorian-parents",
  "year-5-naplan-what-to-expect",
  "year-3-naplan-preparation-guide-victorian-parents",
  "naplan-maths-practice-what-actually-helps",
];

const FAQS = [
  { q: "When is NAPLAN in 2027?", a: `NAPLAN 2027 runs from ${NAPLAN_FACTS.window}. ${NAPLAN_FACTS.windowNote} Ask your child’s school for their timetable.` },
  { q: "Which year levels sit NAPLAN?", a: "Years 3, 5, 7 and 9. Each sits four tests: reading, writing, conventions of language (spelling, grammar and punctuation) and numeracy." },
  { q: "How long is the NAPLAN numeracy test?", a: `${NAPLAN_FACTS.minutes[3]} minutes in Year 3, ${NAPLAN_FACTS.minutes[5]} minutes in Year 5 and ${NAPLAN_FACTS.minutes[7]} minutes in Years 7 and 9. Years 7 and 9 start with a short non-calculator section, then an online calculator is available.` },
  { q: "Are there NAPLAN past papers?", a: "Yes. ACARA publishes the paper tests from 2008 to 2016, with answers, free on its website. It doesn’t release tests after 2016. Our past papers guide links to them." },
  { q: "Is NAPLAN online?", a: "Yes. Most schools sit NAPLAN online, and the numeracy test is tailored: everyone starts with the same set of questions, and how a student goes decides whether the next sets are easier or harder." },
  { q: "How are NAPLAN results reported?", a: `Against four proficiency levels: ${NAPLAN_FACTS.levels.join(", ")}. Schools give families an individual student report later in the year.` },
  { q: "Does NAPLAN count towards school grades?", a: "No. NAPLAN isn’t a pass or fail test and it isn’t part of school reports. It shows where a student is against national expectations at that point, which makes it a useful check on gaps." },
  { q: "Are these official NAPLAN tests?", a: "No. They’re Tuterly’s own NAPLAN-style questions, written to match the style and content of the numeracy test, with a worked solution for every question. NAPLAN is run by ACARA. Tuterly isn’t affiliated with ACARA." },
];

export default function NaplanHub() {
  const reading = READING.map((s) => getPostBySlug(s)).filter(Boolean);
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "NAPLAN practice tests", path: PATH }]}
      eyebrow="NAPLAN 2027 · Years 3, 5, 7 and 9"
      h1="Free NAPLAN practice tests, with answers"
      lead="A NAPLAN-style numeracy test for each year level: 20 questions across every strand, marked as soon as you finish, with a worked solution for every question. Do it online or print the PDF. Plus where to find the official past papers, and a plan from now to March."
      quickAnswer={`NAPLAN 2027 runs ${NAPLAN_FACTS.window}. For free practice: take our NAPLAN-style numeracy test for your child’s year online (it marks itself and shows worked solutions) or print the PDF. ACARA’s official past papers from 2008 to 2016 are free too, with answers.`}
      toc={[
        ["tests", "Practice tests by year"],
        ["format", "NAPLAN 2027 dates and format"],
        ["past-papers", "Past papers"],
        ["plan", "A plan from now to March"],
        ["results", "NAPLAN results explained"],
        ["reading", "More for parents"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Years 7 and 9: turn NAPLAN mistakes into practice"
      ctaText="Snap any question they got wrong. Tuterly shows the worked solution, then gives fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum, Years 7 to 10."
      placement="naplan_hub"
      faqs={FAQS}
      faqTitle="NAPLAN: questions parents ask"
      pageType="CollectionPage"
      finalTitle="Practise the strand they find hardest"
      finalText="After the practice test, Tuterly gives Years 7 to 10 fresh questions on exactly what they got wrong, with a worked solution every time. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="tests" className="tb-section" aria-labelledby="h-tests">
        <div className="tb-wrap">
          <h2 id="h-tests" className="tb-h2 pg-h2">Free NAPLAN practice tests by year</h2>
          <p className="pg-intro">Each test has 20 questions across number, algebra, measurement, space, and statistics and probability. Online, it marks itself and breaks the result down by strand. The PDF has the answers and worked solutions at the back.</p>
          <div className="nph-grid">
            {NAPLAN_YEARS.map((y) => (
              <div key={y} className="nph-card nph-card--static">
                <p className="nph-card__title">Year {y} NAPLAN numeracy</p>
                <p className="nph-card__text">
                  20 questions · real test is {NAPLAN_FACTS.minutes[y]} minutes · {y >= 7 ? "non-calculator section, then calculator" : "no calculator"}
                </p>
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

      <section id="format" className="tb-section tb-section--card" aria-labelledby="h-format">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-format" className="tb-h2 pg-h2">NAPLAN 2027 dates and format</h2>
          <p className="pg-intro">NAPLAN 2027 runs from <strong>{NAPLAN_FACTS.window}</strong>.{" "}{NAPLAN_FACTS.windowNote} Students sit four tests: reading, writing, conventions of language and numeracy.</p>
          <div className="pg-table">
            <table>
              <thead>
                <tr><th scope="col">Year</th><th scope="col">Numeracy test</th><th scope="col">Calculator</th></tr>
              </thead>
              <tbody>
                {NAPLAN_YEARS.map((y) => (
                  <tr key={y}>
                    <th scope="row">Year {y}</th>
                    <td>{NAPLAN_FACTS.minutes[y]} minutes, online</td>
                    <td>{y >= 7 ? "Short non-calculator section first, then an online calculator" : "Not allowed"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pg-small">The numeracy test is tailored: everyone starts with the same questions, then later sets get easier or harder depending on how they go. Question types include multiple choice, typed answers and drag and drop.</p>
        </div>
      </section>

      <section id="past-papers" className="tb-section" aria-labelledby="h-past">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-past" className="tb-h2 pg-h2">NAPLAN past papers</h2>
          <p className="pg-intro">ACARA, which runs NAPLAN, publishes the old paper tests from 2008 to 2016 for Years 3, 5, 7 and 9, with answers. It doesn’t release tests after 2016.</p>
          <ul className="pg-checklist">
            <li><a href={PAST_PAPERS["2012-2016"]} rel="noopener">NAPLAN 2012 to 2016 test papers and answers</a>{" "}(ACARA)</li>
            <li><a href={PAST_PAPERS["2008-2011"]} rel="noopener">NAPLAN 2008 to 2011 test papers and answers</a>{" "}(ACARA)</li>
            <li><a href={OFFICIAL_DEMO} rel="noopener">NAPLAN public demonstration site</a>{" "}for the online format (example tests with answer keys)</li>
          </ul>
          <p className="pg-prose">The answer keys give the answer letter or number, not the working. <Link href="/naplan/past-papers">Our past papers guide</Link>{" "}explains how the old papers differ from today’s online test and how to use them well.</p>
        </div>
      </section>

      <section id="plan" className="tb-section tb-section--card" aria-labelledby="h-plan">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-plan" className="tb-h2 pg-h2">A NAPLAN practice plan from now to March</h2>
          <p className="pg-intro">Short and regular beats cramming. About 20 minutes, two or three times a week, is plenty.</p>
          <ol className="pg-steps np-steps2">
            <li><strong>November to December: find the gaps.</strong>{" "}Take the practice test for their year in one sitting, without help. The result shows which strand needs the most work.</li>
            <li><strong>January holidays: fix one strand at a time.</strong>{" "}Use the free worksheets for the weakest strand. Read the worked solution for every one they get wrong, then try a similar question a few days later.</li>
            <li><strong>February: practise under test conditions.</strong>{" "}Do one official past paper numeracy test, timed. For Years 7 and 9, do the non-calculator part without a calculator.</li>
            <li><strong>March: keep it light.</strong>{" "}Retake our practice test a week or two before NAPLAN, go over anything still shaky, and keep the week of the test calm. A good night’s sleep matters more than one more worksheet.</li>
          </ol>
        </div>
      </section>

      <section id="results" className="tb-section" aria-labelledby="h-results">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-results" className="tb-h2 pg-h2">NAPLAN results explained</h2>
          <p className="pg-intro">Since 2023, NAPLAN results are reported against four proficiency levels instead of bands.</p>
          <div className="pg-table">
            <table>
              <thead><tr><th scope="col">Level</th><th scope="col">What it means</th></tr></thead>
              <tbody>
                <tr><th scope="row">Exceeding</th><td>Their result is above what’s expected at this stage.</td></tr>
                <tr><th scope="row">Strong</th><td>They meet challenging but reasonable expectations for this stage.</td></tr>
                <tr><th scope="row">Developing</th><td>They’re working towards those expectations.</td></tr>
                <tr><th scope="row">Needs additional support</th><td>They’re not yet achieving what’s expected and are likely to need extra help.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="pg-prose">More in our guide: <Link href="/learn/how-to-read-naplan-results-victorian-parents">How to read your child’s NAPLAN results</Link>.</p>
        </div>
      </section>

      <section id="reading" className="tb-section tb-section--card" aria-labelledby="h-reading">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-reading" className="tb-h2 pg-h2">More free NAPLAN help for parents</h2>
          <ul className="pg-checklist">
            {reading.map((p) => (
              <li key={p.slug}><Link href={`/learn/${p.slug}`}>{p.title}</Link></li>
            ))}
            <li><Link href="/worksheets">Free maths worksheets for every topic, with worked solutions</Link></li>
            <li><Link href="/exam-generator">Free practice exam builder</Link></li>
          </ul>
        </div>
      </section>
    </GuideShell>
  );
}

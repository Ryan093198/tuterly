import Link from "next/link";
import GuideShell from "@/components/scholarship-guides/GuideShell";
import { pageMetadata } from "@/lib/scholarship-guides";

const PATH = "/scholarship/year-7-entry-guide";
const TITLE = "Year 7 Scholarship Entry Guide for Parents: Timeline, Skills and Prep | Tuterly";
const DESCRIPTION =
  "A parent guide to Year 7 entry scholarship tests in Australia: when to start, what ACER, Edutest and AAS test, writing and maths tips, applying to several schools, and where a free diagnostic fits.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const FAQS = [
  {
    q: "When does my child sit the test for Year 7 entry?",
    a: "Usually during Year 6, the year before they would start. Each school sets its own date, so check every school on your list. Some schools test earlier in the year than others.",
  },
  {
    q: "When should we start preparing for Year 7 entry?",
    a: "Many families begin light, regular practice in Year 5, then build up through Year 6 as the test approaches. Starting months ahead lets you spread practice out and avoid cramming. If you are starting later, a diagnostic helps you spend the time you have on the biggest gaps.",
  },
  {
    q: "What score does my child need for a scholarship?",
    a: "Schools do not publish cut-off scores, and results are compared against the other students who sat the test. Many schools also consider interviews and school reports. Focus on steady improvement in the skills tested rather than a target number.",
  },
  {
    q: "How much practice per week is reasonable?",
    a: "Short and regular beats long and occasional. A few focused sessions a week, plus one longer timed practice closer to the test, suits most Year 6 children. Watch for signs of fatigue and adjust.",
  },
  {
    q: "Can we apply to more than one school?",
    a: "Yes, and many families do. Each school has its own registration, fee and date, even when two schools use the same provider. Track each one separately so nothing is missed.",
  },
  {
    q: "Where does Tuterly Scholarship fit for Year 7 entry?",
    a: "Start with the 10 free diagnostic questions for Year 7 entry to see the style and an early picture of strengths. Scholarship Pass (launch special A$99 one-off per entry level, usual A$198) unlocks the full diagnostic, worked solutions and follow-up practice on everything your child misses.",
  },
];

const CRUMBS = [
  { name: "Scholarship", path: "/scholarship" },
  { name: "Year 7 entry guide", path: PATH },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={CRUMBS}
      faqs={FAQS}
      defaultEntry={7}
      eyebrow="Year 7 entry"
      h1="Year 7 entry scholarship guide for parents"
      lead="Year 7 is the most common entry point for independent school academic scholarships. This guide covers when to start, what is tested, how to choose practice, and how to manage applications to several schools without burning your child out."
      facts={[
        ["Usually sat in", "Year 6"],
        ["Prep often starts", "Year 5"],
        ["Tests to check", "ACER secondary, Edutest, AAS"],
        ["Free to start", "First 10 diagnostic questions"],
      ]}
    >
      <section className="tb-section" aria-labelledby="h-time">
        <div className="tb-wrap">
          <h2 id="h-time" className="tb-h2 sg-h2">A timeline mindset, not a crash course</h2>
          <div className="sg-prose" style={{ marginBottom: 18 }}>
            <p>
              Scholarship tests reward skills that build slowly: reading stamina, reasoning, problem solving and writing under time. A sensible plan spreads practice across many months. The exact timing depends on your school&rsquo;s test date, so work back from the earliest one on your list.
            </p>
          </div>
          <ol className="sg-timeline">
            <li><strong>Year 5</strong><span>Shortlist schools and check which provider each uses. Build foundations: wide reading, quick mental arithmetic, regular writing. Introduce reasoning question types in small doses.</span></li>
            <li><strong>Start of Year 6</strong><span>Confirm this year&rsquo;s test dates, registration deadlines and fees on each school&rsquo;s page. Take a diagnostic to find gaps. Set a weekly routine you can keep.</span></li>
            <li><strong>Middle months</strong><span>Target the gaps the diagnostic found. Add timed writing with feedback. Practise in the format of the provider your child will sit.</span></li>
            <li><strong>Final weeks</strong><span>A few full practice runs under real timing. Review mistakes rather than piling on new papers. Rehearse test-day logistics.</span></li>
            <li><strong>Test week</strong><span>Light review only, plenty of sleep, and a calm morning. Confidence matters more than one last paper.</span></li>
          </ol>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-skills">
        <div className="tb-wrap">
          <h2 id="h-skills" className="tb-h2 sg-h2">What is tested across the providers</h2>
          <div className="sg-table">
            <table>
              <caption>Skills commonly tested for Year 7 entry (check each school&rsquo;s exact sections)</caption>
              <thead>
                <tr><th scope="col">Skill area</th><th scope="col">Where it appears</th><th scope="col">What it looks like</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row">Reading and interpretation</th><td>ACER Humanities, Edutest Reading Comprehension, AAS reading</td><td>Fiction, non-fiction, poetry and visual texts, with questions on meaning, inference and author intent</td></tr>
                <tr><th scope="row">Mathematics</th><td>All three</td><td>Year-level number, measurement, geometry and data, often in multi-step problems, usually without a calculator</td></tr>
                <tr><th scope="row">Numerical reasoning</th><td>Edutest, often AAS</td><td>Number series, matrices, arithmetic puzzles and deduction</td></tr>
                <tr><th scope="row">Verbal or abstract reasoning</th><td>Edutest Verbal Reasoning, AAS abstract reasoning</td><td>Analogies, word relationships, codes, shape patterns and logic</td></tr>
                <tr><th scope="row">Writing</th><td>All three</td><td>A timed piece, often creative or persuasive, sometimes from a picture or quotation prompt</td></tr>
              </tbody>
            </table>
          </div>
          <p className="sg-sources">
            Not sure which provider applies? Read <Link href="/scholarship/acer-vs-edutest-vs-aas">ACER vs Edutest vs AAS</Link> for the full comparison.
          </p>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-choose">
        <div className="tb-wrap">
          <h2 id="h-choose" className="tb-h2 sg-h2">How to choose practice that actually helps</h2>
          <div className="sg-prose">
            <ul>
              <li><strong>Match the provider.</strong> Practice in the format your child will sit beats a generic workbook.</li>
              <li><strong>Diagnose before you drill.</strong> A short diagnostic shows which skills are secure, so you do not spend weeks on what your child can already do.</li>
              <li><strong>Prefer worked solutions over answer keys.</strong> A letter at the back of the book tells you a question was wrong, not why. Children improve when they understand the method and then try a similar question.</li>
              <li><strong>Revisit mistakes.</strong> The same kind of question coming back a week later is how a weakness becomes a strength.</li>
              <li><strong>Save full papers for later.</strong> Early on, short focused sets build skill. Full timed papers matter most in the final weeks.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-write">
        <div className="tb-wrap">
          <h2 id="h-write" className="tb-h2 sg-h2">Writing and maths tips, without the guesswork</h2>
          <div className="sg-grid">
            <div className="sg-box">
              <h3>Writing under time</h3>
              <ul>
                <li>Spend the first few minutes planning: a clear idea, a beginning, middle and end.</li>
                <li>Practise both narrative and persuasive pieces, as prompts vary.</li>
                <li>Aim for a strong opening and a deliberate ending rather than maximum length.</li>
                <li>Leave a minute or two to reread for missing words and punctuation.</li>
                <li>Get feedback from a teacher, tutor or confident adult, since writing is hard to improve alone.</li>
              </ul>
            </div>
            <div className="sg-box">
              <h3>Maths without a calculator</h3>
              <ul>
                <li>Keep times tables and mental strategies quick and automatic.</li>
                <li>Practise reading a problem twice and underlining what is actually asked.</li>
                <li>Use estimation to rule out options in multiple choice.</li>
                <li>Show working on scrap paper, even when the answer is multiple choice.</li>
                <li>If stuck, mark it, move on and come back. Every question is usually worth the same.</li>
              </ul>
            </div>
          </div>
          <p className="sg-sources">
            For school-level maths revision that overlaps with the Mathematics sections, the <Link href="/worksheets">free maths worksheets</Link> are a useful extra.
          </p>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-multi">
        <div className="tb-wrap">
          <h2 id="h-multi" className="tb-h2 sg-h2">Applying to several schools</h2>
          <div className="sg-prose">
            <p>Most families applying for Year 7 scholarships apply to more than one school. A simple tracker saves a lot of stress:</p>
          </div>
          <ul className="sg-checklist" style={{ marginTop: 14 }}>
            <li>One row per school: provider, test date, registration deadline, fee, format and location.</li>
            <li>Whether the school needs anything else: interview, school reports, NAPLAN results, references or a portfolio.</li>
            <li>Whether a single sitting can be shared across schools, or each needs its own registration. Check with each school.</li>
            <li>Clashes between test dates, and travel time if sittings are on campus.</li>
            <li>When and how results and offers are communicated.</li>
          </ul>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-tuterly">
        <div className="tb-wrap">
          <h2 id="h-tuterly" className="tb-h2 sg-h2">Where the free diagnostic and Scholarship Pass fit</h2>
          <div className="sg-prose">
            <p>
              <strong>At the start of Year 6 (or late Year 5):</strong> use the 10 free Year 7 entry diagnostic questions for an early picture of strengths and gaps, and to show your child what the questions look like.
            </p>
            <p>
              <strong>When you are ready to plan properly:</strong> Scholarship Pass, a launch special of A$99 one-off for the Year 7 entry level (usual A$198), unlocks the full diagnostic, worked solutions for every question and follow-up practice on everything missed. It is designed to complement provider-specific papers and writing feedback, not replace them.
            </p>
            <p>
              Today you can already try the <Link href="/scholarship-practice">free scholarship numerical reasoning practice</Link> (choose Year 6 for Year 7 entry). Younger child? See <Link href="/scholarship/year-5-and-year-6-prep">Year 5 and Year 6 prep</Link>, or go back to the <Link href="/scholarship">scholarship hub</Link>.
            </p>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}

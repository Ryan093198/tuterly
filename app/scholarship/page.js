import Link from "next/link";
import GuideShell from "@/components/scholarship-guides/GuideShell";
import { pageMetadata } from "@/lib/scholarship-guides";

const PATH = "/scholarship";
const TITLE = "Scholarship Test Prep for ACER, Edutest and AAS: A Parent Guide | Tuterly";
const DESCRIPTION =
  "A plain-English parent guide to private school scholarship tests in Australia for Year 5, 6 and 7 entry: ACER, Edutest and AAS in brief, how scholarships differ from government selective entry, a planning checklist, and a Numerical Reasoning diagnostic you can start free.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const FAQS = [
  {
    q: "Is a scholarship test the same as a selective school test?",
    a: "No. Academic scholarships are offered by independent (private) and some Catholic schools, usually through a test run by ACER, Edutest or AAS on a date the school sets. Selective entry is a government pathway, such as the Victorian Year 9 selective entry high schools or NSW selective high school placement, with its own application process run by the state education department. Some skills overlap, but the tests, timelines and applications are separate.",
  },
  {
    q: "How do I know which test my child will sit?",
    a: "Each school names its provider on its own scholarship or admissions page, along with the date and how to register. Check that page for every school on your list. Providers can change from one year to the next, so check again each year rather than relying on what a friend's family sat.",
  },
  {
    q: "Which entry years does Tuterly Scholarship cover?",
    a: "Year 5, Year 6 and Year 7 entry. Year 7 entry is the most common scholarship year, so most families start with that. Children usually sit the test in the year before they would start at the new school.",
  },
  {
    q: "What does Tuterly Scholarship include, and what does it cost?",
    a: "It starts with a 40-question Numerical Reasoning diagnostic in the Tuterly app on iPhone, with a separate version for Year 5, 6 and 7 entry. It covers numerical reasoning only, not reading, writing or humanities. The first 10 questions are free, with results for those 10. A one-off Scholarship Pass per entry level, not a subscription, unlocks the rest of the diagnostic, worked solutions and follow-up practice on every question your child misses. Pricing has not been announced yet, and families on the Scholarship list will get a launch discount.",
  },
  {
    q: "Can Tuterly tell me my child's chances of a scholarship?",
    a: "No, and you should be wary of anyone who claims to. Schools do not publish cut-off scores, results are compared against the other students who sat the test, and many schools also weigh interviews, school reports and other criteria. A diagnostic can show which skills to work on. It cannot predict an offer.",
  },
  {
    q: "Do we need to sit a different test for every school?",
    a: "Sometimes. If two schools use the same provider, the arrangements vary: some families sit one test and nominate several schools, others register and sit separately for each school. Read each school's registration instructions carefully and confirm with the school if it is unclear.",
  },
];

const CRUMBS = [{ name: "Scholarship", path: PATH }];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={CRUMBS}
      faqs={FAQS}
      eyebrow="Scholarship test prep"
      h1="Scholarship test prep: ACER, Edutest and AAS"
      lead="Which test does each of your target schools use, what is in it, and how do you prepare without wasting months on the wrong practice? This parent guide to Year 5, 6 and 7 entry scholarship tests answers those questions first, then shows where Tuterly Scholarship fits."
      facts={[
        ["Entry years covered", "Year 5, Year 6 and Year 7 entry"],
        ["Main providers", "ACER, Edutest, AAS"],
        ["Free to start", "First 10 of 40 Numerical Reasoning diagnostic questions, with results"],
      ]}
    >
      <section className="tb-section" aria-labelledby="h-vs">
        <div className="tb-wrap">
          <h2 id="h-vs" className="tb-h2 sg-h2">Academic scholarships vs government selective entry</h2>
          <div className="sg-prose">
            <p>
              Parents often hear &ldquo;scholarship test&rdquo; and &ldquo;selective test&rdquo; used as if they were the same thing. They are two different pathways, and mixing them up is one of the most common planning mistakes.
            </p>
          </div>
          <div className="sg-table" style={{ marginTop: 18 }}>
            <table>
              <caption>Scholarships and selective entry compared</caption>
              <thead>
                <tr><th scope="col">&nbsp;</th><th scope="col">Academic scholarship</th><th scope="col">Government selective entry</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row">Who offers it</th><td>Independent and some Catholic schools</td><td>State government (for example, Victorian selective entry high schools, NSW selective high schools)</td></tr>
                <tr><th scope="row">What you get</th><td>A place plus a fee reduction, from partial to (rarely) full</td><td>A place at a government selective school</td></tr>
                <tr><th scope="row">Who runs the test</th><td>Usually ACER, Edutest or AAS, booked by each school</td><td>Run for the state education department through its own process (in Victoria, by ACER)</td></tr>
                <tr><th scope="row">Common entry years</th><td>Year 7 most common, also Years 5, 6, 9 and others</td><td>Varies by state, for example Year 9 in Victoria and Year 7 in NSW</td></tr>
                <tr><th scope="row">How you apply</th><td>Register with each school, usually with a test fee</td><td>One application through the state system, by its deadline</td></tr>
              </tbody>
            </table>
          </div>
          <div className="sg-prose" style={{ marginTop: 18 }}>
            <p>
              Some families do both. The reasoning, reading, writing and maths skills overlap, but the dates, applications and question styles do not, so plan each pathway on its own. This hub and its guides focus on <strong>private school academic scholarships</strong> for Year 5, 6 and 7 entry. Victoria&rsquo;s four selective entry high schools are different: they take students into Year 9, through their own exam sat in Year 8 (see{" "}
              <Link href="/learn/selective-school-entry-test-preparation-victoria-year-5-6">Victorian selective entry: what Year 5 and 6 parents need to know</Link>). Always check the current rules on your state education department&rsquo;s website.
            </p>
          </div>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-providers">
        <div className="tb-wrap">
          <h2 id="h-providers" className="tb-h2 sg-h2">The three common scholarship test providers at a glance</h2>
          <div className="sg-prose">
            <p>
              Many schools use one of three providers. Each tests a different mix of skills, so the first job is matching your practice to the provider named on each school&rsquo;s page.
            </p>
            <ul>
              <li><strong>ACER:</strong> Reading, Mathematics and Writing at primary level (Level P), and Written Expression, Humanities and Mathematics at secondary level.</li>
              <li><strong>Edutest:</strong> reasoning and achievement sections, commonly five, in short timed blocks.</li>
              <li><strong>AAS (Academic Assessment Services):</strong> writing, reading, maths and reasoning, in the parts each school chooses.</li>
            </ul>
            <p>
              For sections, timing, calculator rules and delivery side by side, read{" "}
              <Link href="/scholarship/acer-vs-edutest-vs-aas">ACER vs Edutest vs AAS: which scholarship test is your child sitting?</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 sg-h2">Which entry years Tuterly Scholarship covers</h2>
          <div className="sg-grid">
            <div className="sg-box">
              <h3>Year 7 entry</h3>
              <p>The most common scholarship intake. Children usually sit the test during Year 6, so preparation often starts in Year 5. <Link href="/scholarship/year-7-entry-guide">Read the Year 7 entry guide</Link>.</p>
            </div>
            <div className="sg-box">
              <h3>Year 6 entry</h3>
              <p>Offered by fewer schools. Tests are sat in Year 5, often at a primary level such as ACER Level P. <Link href="/scholarship/year-5-and-year-6-prep">Read the Year 5 and 6 prep guide</Link>.</p>
            </div>
            <div className="sg-box">
              <h3>Year 5 entry</h3>
              <p>Earlier entry, usually sat in Year 4. Practice should stay light and age-appropriate. <Link href="/scholarship/year-5-and-year-6-prep">Read the Year 5 and 6 prep guide</Link>.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-how">
        <div className="tb-wrap">
          <h2 id="h-how" className="tb-h2 sg-h2">Where Tuterly Scholarship fits</h2>
          <div className="sg-prose">
            <p>
              Tuterly Scholarship is designed by Australian educators at Bayside Academics, a Melbourne tutoring business that helps students prepare for scholarship tests. It covers Numerical Reasoning only, so it sits alongside, not instead of, provider-specific practice papers and feedback on your child&rsquo;s writing. If you want to see the question style today, the{" "}
              <Link href="/scholarship-practice">free scholarship numerical reasoning practice</Link> has 10 questions per level, marked instantly with worked solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-check">
        <div className="tb-wrap">
          <h2 id="h-check" className="tb-h2 sg-h2">Parent checklist: before you start preparing</h2>
          <ul className="sg-checklist">
            <li><strong>List your target schools</strong> and open each one&rsquo;s scholarship or admissions page.</li>
            <li><strong>Write down the provider</strong> (ACER, Edutest, AAS or a school-run test) for each school, for this year&rsquo;s intake. Do not assume it is the same as last year.</li>
            <li><strong>Note the test date, registration deadline and fee</strong> exactly as the school publishes them. Fees and dates vary by school and provider.</li>
            <li><strong>Check the format</strong>: which sections, paper or online, at the school or at home, and whether calculators are allowed.</li>
            <li><strong>Check what else counts</strong>: interviews, school reports, portfolios or co-curricular criteria.</li>
            <li><strong>Work back from the earliest test date</strong> to set a realistic weekly practice plan, starting months ahead rather than weeks.</li>
            <li><strong>Get a baseline</strong> with a short diagnostic so practice targets real gaps, not skills your child already has.</li>
            <li><strong>Plan writing practice with feedback</strong>, because writing is the section children find hardest to improve alone.</li>
          </ul>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-reading">
        <div className="tb-wrap">
          <h2 id="h-reading" className="tb-h2 sg-h2">Further reading</h2>
          <div className="sg-prose">
            <ul>
              <li><Link href="/learn/edutest-vs-acer-scholarship-exams">Edutest vs ACER: which scholarship exam does your child need to sit?</Link></li>
              <li><Link href="/learn/private-school-scholarship-exam-preparation-victoria-year-4-6">How to help your child prepare for private school scholarship exams (Years 4 to 6)</Link></li>
              <li><Link href="/scholarship-test-prep">Scholarship test prep in Melbourne: ACER and Edutest</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}

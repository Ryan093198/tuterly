import Link from "next/link";
import GuideShell from "@/components/scholarship-guides/GuideShell";
import { pageMetadata } from "@/lib/scholarship-guides";

const PATH = "/scholarship";
const TITLE = "Scholarship and Selective Entry Exam Prep in Australia: A Parent Guide | Tuterly";
const DESCRIPTION =
  "A plain-English parent guide to private school scholarship tests in Australia: ACER, Edutest and AAS at a glance, how they differ from government selective entry, a planning checklist, and a free diagnostic for Year 5, 6 and 7 entry.";

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
    q: "What does the free diagnostic include?",
    a: "The first 10 diagnostic questions are free. They show the question style and give an early read on which skills are secure and which need work. Scholarship Pass unlocks the full diagnostic with worked solutions and follow-up practice on every question your child misses.",
  },
  {
    q: "How much is Scholarship Pass?",
    a: "Scholarship Pass is a launch special of A$99, one-off, per entry level (usual A$198). It is not a subscription. Join the Scholarship list to hear when it opens.",
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
      eyebrow="Scholarship and selective entry"
      h1="Scholarship and selective entry exam prep in Australia: a parent guide"
      lead="Which test does each of your target schools use, what is in it, and how do you prepare without wasting months on the wrong practice? This guide, written by Australian educators, answers those questions first, then shows where Tuterly's free scholarship diagnostic fits."
      facts={[
        ["Entry years covered", "Year 5, Year 6 and Year 7 entry"],
        ["Main providers", "ACER, Edutest, AAS"],
        ["Free to start", "First 10 diagnostic questions"],
        ["Scholarship Pass", "A$99 launch special per entry level (usual A$198)"],
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
                <tr><th scope="row">Who runs the test</th><td>Usually ACER, Edutest or AAS, booked by each school</td><td>Set by the state education department through its own process</td></tr>
                <tr><th scope="row">Common entry years</th><td>Year 7 most common, also Years 5, 6, 9 and others</td><td>Varies by state, for example Year 9 in Victoria and Year 7 in NSW</td></tr>
                <tr><th scope="row">How you apply</th><td>Register with each school, usually with a test fee</td><td>One application through the state system, by its deadline</td></tr>
              </tbody>
            </table>
          </div>
          <div className="sg-prose" style={{ marginTop: 18 }}>
            <p>
              Some families do both. The reasoning, reading, writing and maths skills overlap, but the dates, applications and question styles do not, so plan each pathway on its own. This hub and its guides focus on <strong>private school academic scholarships</strong>. For a Victorian selective overview, see our article on{" "}
              <Link href="/learn/selective-school-entry-test-preparation-victoria-year-5-6">preparing for Melbourne&rsquo;s selective school entry tests</Link>, and always check the current rules on your state education department&rsquo;s website.
            </p>
          </div>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-providers">
        <div className="tb-wrap">
          <h2 id="h-providers" className="tb-h2 sg-h2">The three common scholarship test providers at a glance</h2>
          <div className="sg-prose" style={{ marginBottom: 18 }}>
            <p>
              Most Australian independent schools use one of three providers. Each tests a different mix of skills, so the first job is matching your practice to the provider named on each school&rsquo;s page.
            </p>
          </div>
          <div className="sg-grid">
            <div className="sg-box">
              <h3>ACER Scholarship Tests</h3>
              <ul>
                <li><strong>Primary (Level P)</strong>, for entry into Years 4 to 6: Reading and Viewing, Mathematics, Writing. Typically on paper.</li>
                <li><strong>Secondary (Levels 1 to 3)</strong>, for entry into Years 7 to 12: Written Expression, Humanities, Mathematics. Online or paper.</li>
                <li>Leans towards reasoning and interpretation within each subject.</li>
              </ul>
            </div>
            <div className="sg-box">
              <h3>Edutest</h3>
              <ul>
                <li>Commonly five sections: Verbal Reasoning, Numerical Reasoning, Reading Comprehension, Mathematics, Written Expression.</li>
                <li>Mixes ability tests (reasoning) with achievement tests (school-type skills).</li>
                <li>Short, timed sections, often about 30 minutes each with a shorter writing task.</li>
              </ul>
            </div>
            <div className="sg-box">
              <h3>AAS (Academic Assessment Services)</h3>
              <ul>
                <li>Scholarship batteries drawing on writing, reading comprehension, mathematics and reasoning.</li>
                <li>The exact parts, length and delivery depend on what each school chooses.</li>
                <li>Read the school&rsquo;s own information pack closely.</li>
              </ul>
            </div>
          </div>
          <p className="sg-prose" style={{ marginTop: 18 }}>
            <span>
              See the full side-by-side tables in{" "}
              <Link href="/scholarship/acer-vs-edutest-vs-aas">ACER vs Edutest vs AAS: which scholarship test is your child sitting?</Link>
            </span>
          </p>
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
          <h2 id="h-how" className="tb-h2 sg-h2">How the free diagnostic and Scholarship Pass work</h2>
          <ol className="sg-steps">
            <li><strong>Pick the entry level</strong>Choose Year 5, 6 or 7 entry. The questions are pitched at the year your child is in now.</li>
            <li><strong>Try 10 questions free</strong>The first 10 diagnostic questions are free, so you see the style and an early picture of strengths and gaps.</li>
            <li><strong>Unlock Scholarship Pass</strong>Launch special A$99, one-off per entry level (usual A$198). Full diagnostic with worked solutions for every question.</li>
            <li><strong>Practise what was missed</strong>Each missed question becomes follow-up practice on the same skill, so time goes where it counts.</li>
          </ol>
          <div className="sg-prose" style={{ marginTop: 18 }}>
            <p>
              Tuterly Scholarship is built by the educators at Bayside Academics, who prepare students for scholarship and selective-entry tests each year. It is designed to sit alongside, not replace, provider-specific practice papers and feedback on your child&rsquo;s writing. If you want to see the question style today, the{" "}
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

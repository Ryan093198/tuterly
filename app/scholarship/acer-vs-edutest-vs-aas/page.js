import Link from "next/link";
import GuideShell from "@/components/scholarship-guides/GuideShell";
import { pageMetadata } from "@/lib/scholarship-guides";

const PATH = "/scholarship/acer-vs-edutest-vs-aas";
const TITLE = "ACER vs Edutest vs AAS Scholarship Tests: A Parent Comparison | Tuterly";
const DESCRIPTION =
  "ACER, Edutest and AAS scholarship tests compared for Australian parents: sections, skills, timing, primary and secondary levels, delivery and who sets the dates, plus how to prepare for the test each school names.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const FAQS = [
  {
    q: "Which is harder, ACER, Edutest or AAS?",
    a: "None is simply harder. They reward different things. ACER secondary tests lean on interpretation and extended thinking in humanities, writing and maths. Edutest leans on speed across short reasoning and achievement sections. AAS depends on the parts each school chooses. A child can find one style much easier than another, which is why practising the right one matters.",
  },
  {
    q: "Can one lot of preparation cover all three?",
    a: "Partly. Strong reading, mental arithmetic, problem solving and clear writing help everywhere. But question style, timing and section mix differ enough that you should finish with practice in the format of the test your child will actually sit.",
  },
  {
    q: "Are calculators allowed?",
    a: "Edutest does not allow calculators. For ACER and AAS, follow the instructions for your child's level and school. Practising without a calculator is the safe default for all three.",
  },
  {
    q: "Is the test online or on paper?",
    a: "It depends. ACER's primary test is typically paper based, and its secondary tests may be online or on paper. Edutest and AAS arrangements depend on the school, and some AAS tests are sat online at home. The school's registration information will say.",
  },
  {
    q: "Who sets the test date?",
    a: "The school. Each school books its sitting with the provider, so two schools using the same provider can have different dates and registration deadlines.",
  },
  {
    q: "Are the Tuterly questions official ACER, Edutest or AAS questions?",
    a: "No. Tuterly writes its own questions in scholarship style. ACER, Edutest and AAS do not publish their live tests and do not endorse Tuterly.",
  },
];

const CRUMBS = [
  { name: "Scholarship", path: "/scholarship" },
  { name: "ACER vs Edutest vs AAS", path: PATH },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={CRUMBS}
      faqs={FAQS}
      eyebrow="Compare the tests"
      h1="ACER vs Edutest vs AAS: which scholarship test is your child sitting?"
      lead="The three providers test different mixes of skills, in different formats, on dates each school chooses. Here is an honest side-by-side so you can prepare for the test named on each school's page, not a generic one."
      facts={[
        ["Golden rule", "Prepare for the provider each school names"],
        ["Check every year", "Schools can change provider"],
        ["Calculator", "Practise without one"],
        ["Free to start", "First 10 diagnostic questions"],
      ]}
    >
      <section className="tb-section" aria-labelledby="h-first">
        <div className="tb-wrap">
          <h2 id="h-first" className="tb-h2 sg-h2">Start with the school page, not the provider</h2>
          <div className="sg-prose">
            <p>
              You do not choose the test. Each school chooses its provider, books its own sitting and publishes the details on its scholarship or admissions page. If your list has three schools, you may be dealing with two or even three providers.
            </p>
            <div className="sg-note">
              <strong>Before you buy any practice pack:</strong> open each target school&rsquo;s scholarship page and write down the provider, the level, the date, the registration deadline and the format. Then use the tables below to see what that test involves.
            </div>
          </div>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-table">
        <div className="tb-wrap">
          <h2 id="h-table" className="tb-h2 sg-h2">Side-by-side comparison</h2>
          <div className="sg-table">
            <table>
              <caption>ACER, Edutest and AAS scholarship tests at a glance (general summary, confirm with each school)</caption>
              <thead>
                <tr><th scope="col">&nbsp;</th><th scope="col">ACER</th><th scope="col">Edutest</th><th scope="col">AAS</th></tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Sections</th>
                  <td>Primary (Level P): Reading and Viewing, Mathematics, Writing. Secondary (Levels 1 to 3): Written Expression, Humanities, Mathematics.</td>
                  <td>Commonly five: Verbal Reasoning, Numerical Reasoning, Reading Comprehension, Mathematics, Written Expression.</td>
                  <td>A battery drawing on writing, reading comprehension, mathematics and reasoning. Parts vary by school.</td>
                </tr>
                <tr>
                  <th scope="row">Main focus</th>
                  <td>Interpretation and reasoning within subjects. Secondary Humanities tests comprehension and interpretation of texts and visuals.</td>
                  <td>A mix of ability (reasoning) and achievement (school-type skills), under tight timing.</td>
                  <td>Depends on the school&rsquo;s selection. Often includes abstract or problem-solving reasoning as well as maths and literacy.</td>
                </tr>
                <tr>
                  <th scope="row">Typical timing</th>
                  <td>Several separate papers, each with its own time limit. Check the school&rsquo;s schedule for the total.</td>
                  <td>Often about 30 minutes per section, with Written Expression shorter (around 15 minutes).</td>
                  <td>Set by the school&rsquo;s chosen pack. Check the information sent after registration.</td>
                </tr>
                <tr>
                  <th scope="row">Primary vs secondary</th>
                  <td>Level P for entry into Years 4 to 6. Levels 1 to 3 for entry into Years 7 to 12.</td>
                  <td>Pitched to the child&rsquo;s current year level, with results compared to others in the same year.</td>
                  <td>Pitched to the entry year chosen by the school.</td>
                </tr>
                <tr>
                  <th scope="row">Delivery</th>
                  <td>Level P typically on paper. Secondary online or on paper.</td>
                  <td>As arranged by the school.</td>
                  <td>As arranged by the school. Some schools use online sittings at home.</td>
                </tr>
                <tr>
                  <th scope="row">Who sets the date</th>
                  <td>Each school, with ACER. Parents register and pay per school.</td>
                  <td>Each school, with Edutest.</td>
                  <td>Each school, with AAS.</td>
                </tr>
                <tr>
                  <th scope="row">Calculator</th>
                  <td>Follow the instructions for the level and school.</td>
                  <td>Not allowed.</td>
                  <td>Follow the school&rsquo;s instructions.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="sg-sources">
            Summary drawn from public provider and school information, checked October 2026. Details change, so treat the school&rsquo;s own page as the final word.
          </p>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-skills">
        <div className="tb-wrap">
          <h2 id="h-skills" className="tb-h2 sg-h2">Ability vs achievement: what that means for practice</h2>
          <div className="sg-prose">
            <p>
              <strong>Achievement</strong> sections (Mathematics, Reading Comprehension, Written Expression) test what children have learnt and can apply. Regular schoolwork helps, and practice sharpens accuracy and speed.
            </p>
            <p>
              <strong>Ability</strong> sections (Verbal Reasoning, Numerical Reasoning, abstract reasoning) use unfamiliar question types: number series, matrices, analogies, codes and logic puzzles. Children who have never seen these formats lose time working out what is being asked. Short, regular exposure over months makes a real difference to familiarity.
            </p>
            <p>
              ACER secondary tests sit somewhere in between. The Humanities paper asks children to interpret poems, extracts, cartoons and diagrams, and the Mathematics paper often rewards working out what a problem is really asking more than recalling a method.
            </p>
          </div>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-prep">
        <div className="tb-wrap">
          <h2 id="h-prep" className="tb-h2 sg-h2">How to prepare for each one</h2>
          <div className="sg-grid">
            <div className="sg-box">
              <h3>If a school uses ACER</h3>
              <ul>
                <li>Read widely, including poetry, opinion pieces and visual texts, and talk about meaning and intent.</li>
                <li>Practise multi-step maths problems without a calculator, explaining the reasoning.</li>
                <li>Practise both creative and persuasive writing to a time limit.</li>
                <li>Try our <Link href="/scholarship-practice/acer">free ACER-style maths questions</Link>.</li>
              </ul>
            </div>
            <div className="sg-box">
              <h3>If a school uses Edutest</h3>
              <ul>
                <li>Get familiar with verbal and numerical reasoning question types early.</li>
                <li>Practise in short, timed blocks that match the section lengths.</li>
                <li>Learn to move on from a hard question and come back to it.</li>
                <li>Try our <Link href="/scholarship-practice/edutest">free Edutest-style numerical reasoning</Link>.</li>
              </ul>
            </div>
            <div className="sg-box">
              <h3>If a school uses AAS</h3>
              <ul>
                <li>Find the exact parts in the school&rsquo;s information pack first.</li>
                <li>Cover abstract reasoning and problem solving as well as maths and reading.</li>
                <li>If the test is online at home, rehearse the set-up and timing.</li>
                <li>Try our <Link href="/scholarship-practice/aas">free AAS-style maths reasoning questions</Link>.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-mixed">
        <div className="tb-wrap">
          <h2 id="h-mixed" className="tb-h2 sg-h2">If your schools use different providers</h2>
          <div className="sg-prose">
            <ol>
              <li><strong>Build shared foundations first.</strong> Reading stamina, mental arithmetic, problem solving and structured writing help with every test.</li>
              <li><strong>Prioritise the earliest test date</strong>, then switch focus to the next format once that sitting is done.</li>
              <li><strong>Do at least a few full practice runs in each format</strong> so nothing about the timing or question style is a surprise.</li>
              <li><strong>Use a diagnostic to find the gaps</strong>, so you are not spending weeks on skills your child already has.</li>
            </ol>
            <p>
              Planning for Year 7 entry? The <Link href="/scholarship/year-7-entry-guide">Year 7 entry guide</Link> covers timelines and multi-school logistics. For earlier entry, see <Link href="/scholarship/year-5-and-year-6-prep">Year 5 and Year 6 prep</Link>. For the bigger picture, go back to the <Link href="/scholarship">scholarship hub</Link>.
            </p>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}

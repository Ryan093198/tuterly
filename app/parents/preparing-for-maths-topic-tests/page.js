import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";

const PATH = "/parents/preparing-for-maths-topic-tests";
const TITLE = "How to Prepare for Maths Topic Tests and Exams, Years 7 to 10 | Tuterly";
const DESCRIPTION =
  "A parent's guide to secondary maths topic tests, chapter tests and end-of-term exams: start from past mistakes, space the practice, use formula sheets well, plus week-before and night-before checklists.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const FAQS = [
  {
    q: "How far ahead should my child start preparing for a maths topic test?",
    a: "About a week is a good default for a topic test, with short sessions on several days rather than one long one. For end-of-term or end-of-year exams covering several topics, two to three weeks lets them revisit each topic more than once.",
  },
  {
    q: "Is re-reading notes a good way to revise for maths?",
    a: "On its own, not really. Re-reading feels productive because the material looks familiar, but maths tests ask students to produce working from memory. Attempting questions, especially ones they previously got wrong, is a much better use of the time.",
  },
  {
    q: "How many practice questions should my child do?",
    a: "Quality matters more than quantity. A smaller set of questions on the skills they actually got wrong, attempted without looking at the answer and then checked, is worth more than pages of questions on things they can already do.",
  },
  {
    q: "Should my child study the night before a maths test?",
    a: "A short, light review is fine: a few questions on their weakest skill and a look over the formula sheet. Learning new material late at night rarely helps, and sleep matters more than an extra hour of study.",
  },
  {
    q: "What should we do after the test comes back?",
    a: "Go through it together, calmly. For each lost mark, work out whether it was a careless slip, a forgotten step or a topic that never made sense. Slips need checking habits; forgotten steps need practice; gaps in understanding are worth raising with the teacher.",
  },
  {
    q: "How does Tuterly help with test preparation?",
    a: "Through the term, your child snaps the questions they get wrong and practises similar ones. Before a topic test, Tuterly builds a practice test from those saved mistakes, so revision starts from what they actually found hard. It covers Years 7 to 10 maths and is designed by Australian educators.",
  },
];

const LINKS = [
  { href: "/maths-exam-preparation", label: "Maths exam preparation, Years 7 to 10", note: "(by year level)" },
  { href: "/formula-sheets", label: "Maths formula sheets by year level" },
  { href: "/worksheets", label: "Free maths worksheets, Years 7 to 10", note: "(printable, with answers)" },
  { href: "/learn/why-practice-tests-beat-re-reading-notes", label: "Why practice tests beat re-reading notes" },
  { href: "/learn/how-many-practice-maths-tests-should-my-child-do", label: "How many practice maths tests should my child do?" },
  { href: "/learn/how-to-mark-a-practice-maths-test-with-your-child", label: "How to mark a practice maths test with your child" },
];

const YEARS = [
  { year: 7, formula: "/formula-sheets/year-7-maths", prep: "/maths-exam-preparation/year-7" },
  { year: 8, formula: "/formula-sheets/year-8-maths", prep: "/maths-exam-preparation/year-8" },
  { year: 9, formula: "/formula-sheets/year-9-maths", prep: "/maths-exam-preparation/year-9" },
  { year: 10, formula: "/formula-sheets/year-10-maths", prep: "/maths-exam-preparation/year-10" },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[
        { name: "Parents", path: "/parents" },
        { name: "Preparing for maths tests", path: PATH },
      ]}
      eyebrow="Parent guide · Years 7 to 10 maths"
      h1="How to prepare for maths topic tests and exams in Years 7 to 10"
      lead="Most secondary maths marks come from topic tests and end-of-term exams. The students who prepare well are not always the ones who study longest. They start from what they got wrong, practise it more than once, and arrive rested. Here is how to help your child do that."
      toc={[
        ["mistakes", "Start from mistakes"],
        ["method", "How to practise"],
        ["formula", "Formula sheets"],
        ["plan", "A one-week plan"],
        ["checklists", "Parent checklists"],
        ["after", "After the test"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="A practice test built from their mistakes"
      ctaText="Your child snaps the questions they get wrong through the term. Before a test, Tuterly turns those mistakes into a practice test on exactly what they found hard."
      placement="parents_topic_tests_guide"
      faqs={FAQS}
      faqTitle="Maths tests: questions parents ask"
      links={LINKS}
      finalTitle="Revise from the questions that cost marks"
      finalText="Save every wrong question with a worked solution, practise fresh versions until each skill sticks, and build a practice test from them before the next assessment."
    >
      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Start from what they got wrong, not from the notes</h2>
          <div className="pg-prose">
            <p>
              The most common revision plan is to read back through the textbook chapter and class notes. It feels thorough, but it mostly revises the parts your child already understands, because those are the parts that look familiar.
            </p>
            <p>
              A better starting point is a list of what actually went wrong during the topic. Good sources are:
            </p>
            <ul>
              <li>Homework questions they could not do, or got wrong</li>
              <li>Marked worksheets, quizzes and class checks</li>
              <li>The end-of-chapter review in the textbook, attempted cold</li>
              <li>Earlier tests that touched the same skills</li>
            </ul>
            <p>
              Sort the list into three groups: <strong>slips</strong> (knew it, made an error), <strong>forgotten steps</strong> (knew it once, could not recall it) and <strong>never understood</strong>. Slips need a checking habit. Forgotten steps need spaced practice. Anything never understood needs a worked example, a question to the teacher, or both, and should be dealt with first.
            </p>
          </div>
        </div>
      </section>

      <section id="method" className="tb-section" aria-labelledby="h-method">
        <div className="tb-wrap">
          <h2 id="h-method" className="tb-h2 pg-h2">How to practise so it sticks</h2>
          <p className="pg-intro">
            Two well-established ideas from learning research do most of the work: retrieving from memory, and spacing it out over time.
          </p>
          <ol className="pg-steps">
            <li><strong>Study one worked example</strong>Read through a worked solution for the skill, step by step, until each step makes sense.</li>
            <li><strong>Cover it and try a similar one</strong>Attempt a different question on the same skill without looking. This retrieval is where the learning happens.</li>
            <li><strong>Check, then fix</strong>Compare with the solution. If it went wrong, find the exact step, and try another similar question.</li>
            <li><strong>Come back in a few days</strong>Return to the same skill later in the week. If it is still right, it is ready for the test.</li>
          </ol>
          <div className="pg-prose" style={{ marginTop: 18 }}>
            <p>
              Mixing topics also helps closer to the test. Real tests do not label which method to use, so a set of mixed questions trains your child to recognise the type of problem as well as solve it. Our article on <Link href="/learn/why-practice-tests-beat-re-reading-notes">why practice tests beat re-reading notes</Link> explains the reasoning in more detail.
            </p>
          </div>
        </div>
      </section>

      <section id="formula" className="tb-section" aria-labelledby="h-formula">
        <div className="tb-wrap">
          <h2 id="h-formula" className="tb-h2 pg-h2">Formula sheet habits</h2>
          <div className="pg-prose">
            <p>
              Some schools allow a formula sheet or a page of notes in tests; others expect formulas to be memorised. Check the rules for each test, because they often change between topics and year levels.
            </p>
            <ul>
              <li><strong>If a sheet is allowed,</strong> your child should make it themselves during revision. Writing it is revision. Include a short worked example next to each formula, not just the formula.</li>
              <li><strong>If it is not allowed,</strong> practise writing the key formulas from memory at the start of each session, then check.</li>
              <li><strong>Either way,</strong> know when to use each formula. Most errors come from picking the wrong formula, not forgetting it.</li>
            </ul>
          </div>
          <div className="pg-cards" style={{ marginTop: 18 }}>
            {YEARS.map((y) => (
              <Link key={y.year} href={y.formula} className="pg-card">
                <span className="pg-card__k">{`Year ${y.year}`}</span>
                <span className="pg-card__t">{`Year ${y.year} maths formula sheet`}</span>
              </Link>
            ))}
          </div>
          <p className="pg-small">
            There is also a <Link href="/formula-sheets/year-10a-maths">Year 10A formula sheet</Link> for students in an advanced class.
          </p>
        </div>
      </section>

      <section id="plan" className="tb-section" aria-labelledby="h-plan">
        <div className="tb-wrap">
          <h2 id="h-plan" className="tb-h2 pg-h2">A simple one-week plan for a topic test</h2>
          <p className="pg-intro">
            Short sessions of around 20 to 40 minutes, depending on year level, on most days work better than one long session. Adjust around sport, work and other subjects.
          </p>
          <div className="pg-table">
            <table>
              <caption>One-week revision plan for a Years 7 to 10 maths topic test</caption>
              <thead>
                <tr>
                  <th scope="col">When</th>
                  <th scope="col">Focus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">7 days out</th>
                  <td>Gather mistakes from the topic and sort them into slips, forgotten steps and never understood. Ask the teacher about anything in the last group.</td>
                </tr>
                <tr>
                  <th scope="row">6 and 5 days out</th>
                  <td>Worked example, then similar questions, on the forgotten steps. Start the formula sheet if one is allowed.</td>
                </tr>
                <tr>
                  <th scope="row">4 days out</th>
                  <td>Return to the first skills from day 6. Anything still wrong goes back on the list.</td>
                </tr>
                <tr>
                  <th scope="row">3 and 2 days out</th>
                  <td>A practice test under realistic conditions: timed, calculator as allowed, no notes unless the test allows them. Mark it together.</td>
                </tr>
                <tr>
                  <th scope="row">Day before</th>
                  <td>Light review only: a few questions on the weakest skill, a look over the formula sheet, equipment packed. Early night.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="pg-small">
            For end-of-term or end-of-year exams, stretch the same pattern over two to three weeks so each topic is revisited at least twice. Year-specific exam topics are on the <Link href="/maths-exam-preparation">maths exam preparation</Link> pages.
          </p>
        </div>
      </section>

      <section id="checklists" className="tb-section" aria-labelledby="h-checklists">
        <div className="tb-wrap">
          <h2 id="h-checklists" className="tb-h2 pg-h2">Parent checklists</h2>
          <div className="pg-grid">
            <div className="pg-box">
              <h3>The week before</h3>
              <ul>
                <li>Know the test date, the topic and what is allowed (calculator, formula sheet, notes).</li>
                <li>Ask your child to show you their list of mistakes, not their notes.</li>
                <li>Protect a short slot most days, and keep it phone-free.</li>
                <li>Check the calculator works and is the type the school requires.</li>
                <li>Encourage a question to the teacher about anything never understood.</li>
              </ul>
            </div>
            <div className="pg-box">
              <h3>The night before</h3>
              <ul>
                <li>Light review only. No new topics.</li>
                <li>Pack the calculator (in degree mode for trigonometry), pens, pencil, ruler and formula sheet if allowed.</li>
                <li>Screens off at a sensible time, and a normal bedtime. Sleep helps memory.</li>
                <li>Keep the conversation calm. &ldquo;You have practised this&rdquo; helps more than &ldquo;this one really matters&rdquo;.</li>
              </ul>
            </div>
            <div className="pg-box">
              <h3>The morning of</h3>
              <ul>
                <li>A proper breakfast and enough time to get to school without rushing.</li>
                <li>A reminder to read each question twice and show working, because method marks count.</li>
                <li>A reminder to check answers if there is time left, starting with the ones they were least sure of.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="after" className="tb-section" aria-labelledby="h-after">
        <div className="tb-wrap">
          <h2 id="h-after" className="tb-h2 pg-h2">After the test: where next term&rsquo;s marks come from</h2>
          <div className="pg-prose">
            <p>
              The marked test is the most useful revision resource your child will get all term, and it is usually glanced at and put away. Spend 15 minutes on it together, calmly, regardless of the mark.
            </p>
            <ul>
              <li>For each lost mark, decide: slip, forgotten step or never understood.</li>
              <li>Redo the wrong questions without looking at the corrections.</li>
              <li>Keep the wrong ones somewhere they will be seen again before the end-of-term exam.</li>
            </ul>
            <p>
              Topics build on each other, so a gap left now often shows up again later. Each year guide lists the skills that tend to carry forward: <Link href="/years/year-7-maths">Year 7</Link>, <Link href="/years/year-8-maths">Year 8</Link>, <Link href="/years/year-9-maths">Year 9</Link> and <Link href="/years/year-10-maths">Year 10</Link>.
            </p>
            <h3 className="pg-h3">How Tuterly fits</h3>
            <p>
              Tuterly is designed around this loop. Through the term your child snaps the questions they get wrong; each one is saved with a worked solution and comes back as fresh, similar questions until it is mastered. Before a topic test, Tuterly builds a practice test from those saved mistakes, so revision starts from the right place without a parent having to assemble it. It covers Years 7 to 10 maths, follows the Australian Curriculum, and is designed by Australian educators at Bayside Academics. See <Link href="/features/test-any-topic">test any topic</Link>.
            </p>
            <p>
              If test results show a whole topic has not made sense, more practice alone may not fix it. Our guide to <Link href="/parents/maths-app-vs-tutoring">choosing between a maths app and a tutor</Link> covers when a person needs to step in.
            </p>
          </div>
          <div className="pg-cards" style={{ marginTop: 18 }}>
            {YEARS.map((y) => (
              <Link key={y.year} href={y.prep} className="pg-card">
                <span className="pg-card__k">{`Year ${y.year}`}</span>
                <span className="pg-card__t">{`Year ${y.year} maths exam preparation`}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </GuideShell>
  );
}

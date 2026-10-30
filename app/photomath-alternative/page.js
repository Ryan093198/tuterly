import Link from "next/link";
import ComparisonShell from "@/components/comparison-pages/ComparisonShell";
import { PAGES, pageMetadata } from "@/lib/comparison-pages";

const P = PAGES.photomath;

export const metadata = pageMetadata({ title: P.title, description: P.description, path: P.path });

const ROWS = [
  ["Main job", "Solve the question in front of you and show the steps", "Turn questions your child got wrong into practice until the skill sticks"],
  ["Starts from your child’s own wrong questions", "It solves whatever is photographed, right or wrong, homework or not", "Yes, the app is built around saving and revisiting mistakes"],
  ["Step-by-step solutions", "Yes, its core strength", "Yes, a worked solution for each saved question"],
  ["New questions on the same skill", "Not its main focus", "Yes, fresh questions generated on the same concept until mastered"],
  ["Australian Years 7 to 10 topic map", "General solver, not organised around Australian year levels", "Every question filed under an Australian Curriculum topic for Years 7 to 10"],
  ["Practice tests from past mistakes", "Not its main focus", "Yes, built from your child’s saved mistakes before a topic test"],
  ["Parent visibility", "Not its main focus", "A parent summary of practice and progress by topic"],
  ["Homework integrity habits", "Depends on how it is used; easy to copy without attempting", "Same risk with any solution; designed to be used after an attempt, then practised again"],
];

export default function Page() {
  return (
    <ComparisonShell page="photomath">
      <section id="who" className="tb-section" aria-labelledby="h-who">
        <div className="tb-wrap">
          <h2 id="h-who" className="tb-h2 pg-h2">Who this page is for</h2>
          <div className="pg-prose">
            <p>
              This guide is for parents of Year 7 to 10 students in Australia whose child uses Photomath, or wants to, and who are wondering whether it is helping. Maybe homework comes back complete but topic test marks do not match. Maybe you are simply unsure whether a solver app is a study tool or a shortcut.
            </p>
            <p>
              We make Tuterly, which also shows worked solutions, so we have a stake in this. We have tried to be fair about what Photomath does well and honest that the integrity questions apply to Tuterly too. Product features change, so check the official Photomath website for current details.
            </p>
          </div>
        </div>
      </section>

      <section id="does-well" className="tb-section" aria-labelledby="h-does-well">
        <div className="tb-wrap">
          <h2 id="h-does-well" className="tb-h2 pg-h2">What Photomath does well</h2>
          <p className="pg-intro">
            Photomath is a camera-based maths solver. Your child photographs a question, printed or handwritten, and the app shows a solution broken into steps.
          </p>
          <div className="pg-grid">
            <div className="pg-box">
              <h3>Fast and reactive</h3>
              <p>Stuck at 9pm on question 14? A solver gives an immediate worked method, when no teacher or parent is available to help.</p>
            </div>
            <div className="pg-box">
              <h3>Shows the steps</h3>
              <p>Good step-by-step explanations can genuinely teach. Seeing where a method goes next is useful, especially after a student has tried and got stuck.</p>
            </div>
            <div className="pg-box">
              <h3>Checks working</h3>
              <p>Used after an attempt, a solver lets a student compare their own lines against a correct method and find exactly where they went wrong.</p>
            </div>
            <div className="pg-box">
              <h3>Covers a wide range</h3>
              <p>From arithmetic to algebra and beyond, it handles many question types, which is handy across the whole of Years 7 to 10.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="gaps" className="tb-section" aria-labelledby="h-gaps">
        <div className="tb-wrap">
          <h2 id="h-gaps" className="tb-h2 pg-h2">Where a solver falls short for school tests</h2>
          <div className="pg-prose">
            <p>
              A solver answers the question in front of it. A school topic test asks something different: can your child do a <em>similar</em> question, from memory, with no phone, under time pressure, a few weeks later? Getting from one to the other takes practice, and that is the part a solver is not designed to organise.
            </p>
            <ul>
              <li><strong>Reading a method is not the same as doing it.</strong> Following steps on a screen can feel like understanding. The real test is a fresh question with no help, which a solver does not set.</li>
              <li><strong>Nothing comes back.</strong> Once the question is solved, it is gone. There is no list of what your child found hard, and no reminder to try that skill again next week.</li>
              <li><strong>It is not organised by year and topic.</strong> A general solver does not know your child is in Year 8 studying linear equations this term, or which topics are on the next test.</li>
              <li><strong>Homework stops telling the truth.</strong> If answers are copied, homework looks fine while the gaps stay hidden, and the first sign of trouble is a test mark.</li>
            </ul>
            <p>
              Tuterly is built for the step after the solution: saving the question, generating new ones on the same skill, and bringing them back until your child can do them without help.
            </p>
          </div>
        </div>
      </section>

      <section id="integrity" className="tb-section" aria-labelledby="h-integrity">
        <div className="tb-wrap">
          <h2 id="h-integrity" className="tb-h2 pg-h2">Copying vs learning: a gentle approach</h2>
          <div className="pg-prose">
            <p>
              Most students who copy from a solver are not trying to cheat. They are tired, stuck, and want homework finished. The fix is a clear family rule rather than a ban, and it applies to any app that shows solutions, Tuterly included.
            </p>
            <ol>
              <li><strong>Attempt first, in writing.</strong> Every question gets a genuine go on paper before any app is opened.</li>
              <li><strong>Check, then close.</strong> Use the solution to find the step that went wrong, then close the app and redo the question unaided.</li>
              <li><strong>Mark it for later.</strong> Anything that needed help gets saved so it can be practised again in a few days. This is the step most students skip.</li>
              <li><strong>Ask about school expectations.</strong> Teachers have different views on solver apps, and some homework is set specifically to see what your child can do alone.</li>
            </ol>
            <p>
              This matters more in <strong>Years 7 and 8</strong>. Younger secondary students are still building the habit of sitting with a hard question for a few minutes, and that habit is worth protecting. Our <Link href="/parents/help-with-secondary-maths-homework">guide to helping with maths homework</Link> has a simple support ladder that keeps the pencil in your child&rsquo;s hand.
            </p>
          </div>
        </div>
      </section>

      <section id="compare" className="tb-section" aria-labelledby="h-compare">
        <div className="tb-wrap">
          <h2 id="h-compare" className="tb-h2 pg-h2">Photomath and Tuterly, side by side</h2>
          <p className="pg-intro">
            This compares the jobs each tool is built for. It is not a ranking, and features vary by plan and change over time.
          </p>
          <div className="pg-table cp-table">
            <table>
              <caption>How Photomath and Tuterly typically compare for a Year 7 to 10 student</caption>
              <thead>
                <tr>
                  <th scope="col">Job to be done</th>
                  <th scope="col">Photomath</th>
                  <th scope="col">Tuterly</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([job, a, b]) => (
                  <tr key={job}>
                    <th scope="row">{job}</th>
                    <td>{a}</td>
                    <td>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="choose" className="tb-section" aria-labelledby="h-choose">
        <div className="tb-wrap">
          <h2 id="h-choose" className="tb-h2 pg-h2">Which should you choose?</h2>
          <div className="cp-choose">
            <div className="pg-box">
              <h3>Photomath may suit if</h3>
              <ul>
                <li>Your child is a confident, honest worker who wants to check a step quickly.</li>
                <li>You mainly need an answer checker for occasional homework questions.</li>
                <li>Questions cover a wide range beyond the current school topic.</li>
              </ul>
            </div>
            <div className="pg-box">
              <h3>Tuterly may suit if</h3>
              <ul>
                <li>Homework looks fine but topic test marks do not match.</li>
                <li>Your child makes the same kinds of mistakes again and again.</li>
                <li>You want practice organised by Australian Years 7 to 10 topics, with a test built from their mistakes.</li>
              </ul>
            </div>
            <div className="pg-box">
              <h3><span className="cp-tag">Both</span> Use both if</h3>
              <ul>
                <li>A solver is used only to check a single step after a real attempt.</li>
                <li>Every question that needed help is snapped into Tuterly to practise again.</li>
                <li>Test preparation starts from those saved mistakes, not from re-reading.</li>
              </ul>
            </div>
          </div>
          <div className="pg-prose" style={{ marginTop: 22 }}>
            <p>
              If your child is far behind and cannot start most questions, neither app will close that gap alone; see <Link href="/parents/maths-app-vs-tutoring">maths app or tutor</Link>. Before the next assessment, try the plan in <Link href="/parents/preparing-for-maths-topic-tests">preparing for maths topic tests</Link>, and check what is taught each year on the <Link href="/years">Years 7 to 10 guides</Link>.
            </p>
          </div>
        </div>
      </section>
    </ComparisonShell>
  );
}

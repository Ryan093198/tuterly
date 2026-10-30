import Link from "next/link";
import ComparisonShell from "@/components/comparison-pages/ComparisonShell";
import { PAGES, pageMetadata } from "@/lib/comparison-pages";

const P = PAGES.mathspace;

export const metadata = pageMetadata({ title: P.title, description: P.description, path: P.path });

const ROWS = [
  ["Where practice comes from", "The platform’s question bank and tasks set by the teacher", "Questions your child actually got wrong, from homework, worksheets or marked tests"],
  ["Australian Years 7 to 10 topics", "Yes, built around Australian curricula and widely used in Australian schools", "Yes, every question filed under an Australian Curriculum topic for Years 7 to 10"],
  ["Step-by-step solutions", "Yes, with feedback on each line of working as the student enters it", "Yes, a worked solution for each saved question"],
  ["New questions on the same skill", "Yes, adaptive practice within the platform’s topics", "Yes, fresh questions generated from each of your child’s mistakes until mastered"],
  ["Practice tests from past mistakes", "Not its main focus; tests are usually set by the teacher", "Yes, built from your child’s own saved mistakes before a topic test"],
  ["Who sets the work", "Usually the teacher, through a school account", "Your child, from what went wrong this week"],
  ["Parent visibility", "Depends on the school or home account set-up", "A parent summary of practice and progress by topic"],
  ["Live human teaching", "No, it is a practice platform", "No, it is a study app"],
];

export default function Page() {
  return (
    <ComparisonShell page="mathspace">
      <section id="who" className="tb-section" aria-labelledby="h-who">
        <div className="tb-wrap">
          <h2 id="h-who" className="tb-h2 pg-h2">Who this page is for</h2>
          <div className="pg-prose">
            <p>
              This guide is for parents of Year 7 to 10 students in Australia who have come across Mathspace, often because their child&rsquo;s school uses it, and want to know what to do at home. Perhaps your child logs in for homework but marks are not moving. Perhaps you are deciding whether a home subscription is worth it, or whether a different kind of practice would help more.
            </p>
            <p>
              We make Tuterly, so we have an obvious interest. We have tried to describe Mathspace fairly, based on what it publicly sets out to do, and to be clear about where each tool fits. Product details change, so check the official Mathspace website for anything specific, especially plans and home options.
            </p>
          </div>
        </div>
      </section>

      <section id="does-well" className="tb-section" aria-labelledby="h-does-well">
        <div className="tb-wrap">
          <h2 id="h-does-well" className="tb-h2 pg-h2">What Mathspace does well</h2>
          <p className="pg-intro">
            Mathspace is an Australian-founded adaptive maths platform with a strong presence in Australian schools. Teachers use it to set tasks, and students work through them online.
          </p>
          <div className="pg-grid">
            <div className="pg-box">
              <h3>Step-by-step working</h3>
              <p>Students enter each line of their working and get feedback along the way, rather than only at the final answer. That is close to how a teacher marks maths, and it rewards showing method.</p>
            </div>
            <div className="pg-box">
              <h3>Hints when stuck</h3>
              <p>When a student cannot see the next step, hints nudge them forward. For a child who freezes on a blank page, that structure can keep them going.</p>
            </div>
            <div className="pg-box">
              <h3>Built for the classroom</h3>
              <p>Teachers can set work that matches the current unit, see who has completed it and spot common errors across a class. That is a genuine strength a home app does not try to replicate.</p>
            </div>
            <div className="pg-box">
              <h3>Australian context</h3>
              <p>Topics and terminology are designed around Australian curricula, so the language your child sees online usually matches the language in class.</p>
            </div>
          </div>
          <p className="pg-small">
            If your child&rsquo;s school uses Mathspace, keep using it as the teacher asks. It is part of how their learning is set and checked, and nothing on this page suggests otherwise.
          </p>
        </div>
      </section>

      <section id="gaps" className="tb-section" aria-labelledby="h-gaps">
        <div className="tb-wrap">
          <h2 id="h-gaps" className="tb-h2 pg-h2">Where home needs are different</h2>
          <div className="pg-prose">
            <p>
              A school licence and a home decision answer different questions. The school is asking, &ldquo;How do we set and check practice for a whole class?&rdquo; At home, you are usually asking something narrower: &ldquo;Why did my child lose marks on the last topic test, and how do we stop it happening on the next one?&rdquo;
            </p>
            <p>
              That second question is about your child&rsquo;s specific mistakes. In our experience as tutors at Bayside Academics, marks in Years 7 to 10 are rarely lost evenly across a topic. They cluster around a few recurring errors: a sign slip when expanding brackets, the wrong trig ratio, forgetting to divide every term, misreading what a percentage is &ldquo;of&rdquo;. Those errors show up in homework, textbook exercises and marked tests, not only in one platform.
            </p>
            <h3 className="pg-h3">Three common gaps at home</h3>
            <ul>
              <li><strong>Mistakes from outside the platform get lost.</strong> A wrong question on a paper test or in the textbook usually goes in the bag and is forgotten. Nothing brings it back a week later.</li>
              <li><strong>Practice is set by someone else.</strong> Teacher-set tasks follow the class, which is right for school, but they may not target the two or three skills your child personally keeps getting wrong.</li>
              <li><strong>Test preparation is general.</strong> Before a topic test, many students revise the whole unit evenly instead of starting from what they have already shown they cannot yet do.</li>
            </ul>
            <p>
              None of these is a flaw in Mathspace. They are simply jobs a classroom platform is not mainly designed for, and they are the jobs Tuterly is built around.
            </p>
          </div>
        </div>
      </section>

      <section id="compare" className="tb-section" aria-labelledby="h-compare">
        <div className="tb-wrap">
          <h2 id="h-compare" className="tb-h2 pg-h2">Mathspace and Tuterly, side by side</h2>
          <p className="pg-intro">
            This compares jobs each tool is built to do, not which is &ldquo;better&rdquo;. Features vary by plan and change over time.
          </p>
          <div className="pg-table cp-table">
            <table>
              <caption>How Mathspace and Tuterly typically compare for a Year 7 to 10 student at home</caption>
              <thead>
                <tr>
                  <th scope="col">Job to be done</th>
                  <th scope="col">Mathspace</th>
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
              <h3>Mathspace may suit if</h3>
              <ul>
                <li>Your child&rsquo;s school already uses it and you want more of the same structure at home.</li>
                <li>Your child benefits from line-by-line feedback and hints while they work.</li>
                <li>You want a broad, sequenced practice bank rather than practice on specific mistakes.</li>
              </ul>
            </div>
            <div className="pg-box">
              <h3>Tuterly may suit if</h3>
              <ul>
                <li>Your child does the school work but keeps losing marks on the same kinds of questions.</li>
                <li>Mistakes from paper tests, textbooks and worksheets currently disappear.</li>
                <li>You want to see progress by topic without re-teaching maths every night.</li>
              </ul>
            </div>
            <div className="pg-box">
              <h3><span className="cp-tag">Both</span> Use both if</h3>
              <ul>
                <li>Mathspace is set by the school and stays the main homework tool.</li>
                <li>Anything your child gets wrong, in Mathspace or on paper, gets snapped into Tuterly.</li>
                <li>The week before a topic test, they use a Tuterly practice test built from those mistakes.</li>
              </ul>
            </div>
          </div>
          <div className="pg-prose" style={{ marginTop: 22 }}>
            <p>
              If your child cannot start most questions in a topic, more practice from either tool is unlikely to fix it. Talk to the teacher first, and read our guide on <Link href="/parents/maths-app-vs-tutoring">choosing between a maths app and a tutor</Link>. For the weeks before an assessment, our <Link href="/parents/preparing-for-maths-topic-tests">topic test preparation guide</Link> has a simple plan, and the <Link href="/years">Years 7 to 10 guides</Link> list what is taught in each year.
            </p>
          </div>
        </div>
      </section>
    </ComparisonShell>
  );
}

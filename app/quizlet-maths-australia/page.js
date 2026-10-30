import Link from "next/link";
import ComparisonShell from "@/components/comparison-pages/ComparisonShell";
import { PAGES, pageMetadata } from "@/lib/comparison-pages";

const P = PAGES.quizlet;

export const metadata = pageMetadata({ title: P.title, description: P.description, path: P.path });

const ROWS = [
  ["Main job", "Memorise and recall short facts with flashcards and quizzes", "Practise full maths questions your child got wrong until the skill sticks"],
  ["Starts from your child’s own wrong questions", "Only if your child writes those cards themselves", "Yes, from homework, worksheets and marked tests"],
  ["Australian Years 7 to 10 topic map", "Depends on who made the set; quality and coverage vary", "Every question filed under an Australian Curriculum topic for Years 7 to 10"],
  ["Multi-step working", "Limited; a card usually checks one answer, not the method", "Yes, a step-by-step worked solution for each question"],
  ["New questions on the same skill", "Not its main focus; cards repeat the same item", "Yes, fresh questions on the same concept, so the method is practised, not one answer"],
  ["Practice tests from past mistakes", "Can quiz on a set of cards", "Yes, a practice test built from your child’s saved mistakes before a topic test"],
  ["Good for formulas and vocabulary", "Yes, a real strength", "Formulas appear in context within questions; flashcards are quicker for pure recall"],
  ["Parent visibility", "Not its main focus for families", "A parent summary of practice and progress by topic"],
];

export default function Page() {
  return (
    <ComparisonShell page="quizlet">
      <section id="who" className="tb-section" aria-labelledby="h-who">
        <div className="tb-wrap">
          <h2 id="h-who" className="tb-h2 pg-h2">Who this page is for</h2>
          <div className="pg-prose">
            <p>
              This guide is for parents of Year 7 to 10 students in Australia whose child studies with Quizlet, or who are looking for a Quizlet alternative for maths. Flashcards may work well for your child in languages, science or history, and you are wondering whether the same approach will lift maths marks.
            </p>
            <p>
              We make Tuterly, so we are not neutral. We have tried to be fair: flashcards and Tuterly do different jobs, and many students benefit from both. Quizlet&rsquo;s features change over time, so check its official website for current details.
            </p>
          </div>
        </div>
      </section>

      <section id="does-well" className="tb-section" aria-labelledby="h-does-well">
        <div className="tb-wrap">
          <h2 id="h-does-well" className="tb-h2 pg-h2">What Quizlet does well</h2>
          <p className="pg-intro">
            Quizlet is a flashcard and quiz tool. Students make their own sets, or use sets made by teachers and other students, then review them in several study modes.
          </p>
          <div className="pg-grid">
            <div className="pg-box">
              <h3>Active recall</h3>
              <p>Trying to remember an answer before flipping the card is retrieval practice, one of the best-supported study habits there is. It beats re-reading notes.</p>
            </div>
            <div className="pg-box">
              <h3>Quick, short sessions</h3>
              <p>Five minutes on the bus is enough to review a set. That makes regular, spaced review realistic for busy teenagers.</p>
            </div>
            <div className="pg-box">
              <h3>Easy to make your own</h3>
              <p>Writing cards in your own words is itself a useful study step, and sets are easy to share with classmates.</p>
            </div>
            <div className="pg-box">
              <h3>Strong for facts</h3>
              <p>Vocabulary, definitions and short rules suit the flashcard format well, in maths as in any subject.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="gaps" className="tb-section" aria-labelledby="h-gaps">
        <div className="tb-wrap">
          <h2 id="h-gaps" className="tb-h2 pg-h2">The limits of flashcards for secondary maths</h2>
          <div className="pg-prose">
            <p>
              Maths in Years 7 to 10 is mostly <strong>procedural</strong>. A typical topic test question is not &ldquo;What is the formula for the area of a trapezium?&rdquo; but &ldquo;Find the area of this composite shape&rdquo;, which needs the formula, the right measurements, several steps and a final answer with units. Knowing the fact is necessary, but it is not enough.
            </p>
            <ul>
              <li><strong>A card checks an answer, not a method.</strong> Most marks in a maths test come from correct working. A flashcard cannot see where in a multi-step solution your child went wrong.</li>
              <li><strong>Repeating the same card can become memorising.</strong> If the card says &ldquo;Solve 3x + 5 = 20&rdquo;, your child may soon remember &ldquo;x = 5&rdquo; without being able to solve 4x &minus; 7 = 21. Maths needs new numbers each time.</li>
              <li><strong>Shared sets vary.</strong> Sets made by others may use non-Australian terms, a different topic order or simply contain errors. Your child&rsquo;s class notes and textbook are a safer source.</li>
              <li><strong>Transfer to the test is the hard part.</strong> Recognising a fact on a card is easier than choosing and using it inside an unfamiliar question.</li>
            </ul>
            <p>
              That is why Tuterly works from full questions your child got wrong, and writes new ones on the same skill, so the practice looks like the test.
            </p>
          </div>
        </div>
      </section>

      <section id="compare" className="tb-section" aria-labelledby="h-compare">
        <div className="tb-wrap">
          <h2 id="h-compare" className="tb-h2 pg-h2">Quizlet and Tuterly, side by side</h2>
          <p className="pg-intro">
            This compares the jobs each tool is built for in Years 7 to 10 maths. It is not a ranking, and features change over time.
          </p>
          <div className="pg-table cp-table">
            <table>
              <caption>How Quizlet and Tuterly typically compare for Year 7 to 10 maths</caption>
              <thead>
                <tr>
                  <th scope="col">Job to be done</th>
                  <th scope="col">Quizlet</th>
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
              <h3>Quizlet may suit if</h3>
              <ul>
                <li>Your child needs to lock in formulas, rules and vocabulary.</li>
                <li>They already use flashcards well in other subjects.</li>
                <li>You want a quick daily recall habit.</li>
              </ul>
            </div>
            <div className="pg-box">
              <h3>Tuterly may suit if</h3>
              <ul>
                <li>Your child knows the formulas but loses marks on working.</li>
                <li>The same kinds of mistakes keep appearing in topic tests.</li>
                <li>You want practice organised by Australian Years 7 to 10 topics.</li>
              </ul>
            </div>
            <div className="pg-box">
              <h3><span className="cp-tag">Both</span> Use both if</h3>
              <ul>
                <li>A short flashcard warm-up covers the facts for this topic.</li>
                <li>Then your child practises the questions they got wrong in Tuterly.</li>
                <li>Before the test, they use a practice test built from those mistakes.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="sets" className="tb-section" aria-labelledby="h-sets">
        <div className="tb-wrap">
          <h2 id="h-sets" className="tb-h2 pg-h2">Making maths flashcards work alongside mistake practice</h2>
          <div className="pg-prose">
            <p>If your child likes flashcards, these habits make them more useful for maths:</p>
            <ol>
              <li><strong>One fact per card.</strong> For example, &ldquo;Pythagoras&rsquo; theorem&rdquo; on one side and &ldquo;a&sup2; + b&sup2; = c&sup2;, c is the hypotenuse&rdquo; on the other. Our <Link href="/formula-sheets">Years 7 to 10 formula sheets</Link> are a good source.</li>
              <li><strong>Write cards from class notes.</strong> That keeps terms and methods in line with what the teacher uses.</li>
              <li><strong>Say it, then use it.</strong> After recalling a formula, do one real question that needs it. That small step is where facts turn into marks.</li>
              <li><strong>Turn mistakes into practice, not cards.</strong> When a full question goes wrong, a card will not fix it. Snap it into Tuterly, check the worked solution, and practise new versions until it sticks.</li>
            </ol>
            <h3 className="pg-h3">What about other maths apps?</h3>
            <p>
              Parents often ask about Mathletics, Education Perfect and Khan Academy too. Mathletics and Education Perfect are mostly used through schools for set practice; Khan Academy offers free videos and exercises. If your child&rsquo;s school uses one, follow the teacher&rsquo;s lead. We also compare <Link href="/mathspace-alternative">Mathspace</Link> and <Link href="/photomath-alternative">Photomath</Link>, and our <Link href="/learn/best-maths-apps-years-7-10-australia">round-up of maths apps for Years 7 to 10</Link> covers more. If you are weighing an app against a person, read <Link href="/parents/maths-app-vs-tutoring">maths app or tutor</Link>, and for assessment weeks, <Link href="/parents/preparing-for-maths-topic-tests">preparing for maths topic tests</Link>.
            </p>
          </div>
        </div>
      </section>
    </ComparisonShell>
  );
}

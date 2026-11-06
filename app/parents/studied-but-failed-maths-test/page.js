import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";

// Parent guide for "they studied but still failed the maths test". From the
// Nov 2026 parent research: parents describe children who revise hard and
// still lose marks ("This was not a lack of revision"). The fix is the kind
// of study (retrieval and spacing on their own mistakes), which is exactly
// what Tuterly does. Also a landing page for exam-season ads.

const PATH = "/parents/studied-but-failed-maths-test";
const TITLE = "They Studied but Still Failed the Maths Test? Here's Why (Years 7 to 10) | Tuterly";
const DESCRIPTION =
  "Your child studied for hours and still got a low maths mark. Why re-reading notes doesn't show up in tests, how to work out where the marks went, and a one-week plan before the next test. For parents of Years 7 to 10.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const FAQS = [
  {
    q: "Why does my child understand maths in class but do badly in tests?",
    a: "In class, the method was just shown, the questions are all on one skill, and help is close by. In a test, they have to remember which method to use and produce it from memory, with mixed questions and a time limit. Practising fresh questions without notes, spread over several days, closes most of that gap.",
  },
  {
    q: "Is re-reading notes a good way to study for a maths test?",
    a: "On its own, not really. Re-reading makes the material feel familiar, which feels like learning, but a maths test asks for working produced from memory. Attempting questions and then checking them against worked solutions is a much better use of the same time.",
  },
  {
    q: "How long before a maths test should my child start studying?",
    a: "About a week for a topic test, or two to three weeks for an end-of-term or end-of-year exam. Short sessions on most days beat one long session the night before, because coming back to a skill after a gap is what makes it stick.",
  },
  {
    q: "My child makes lots of careless mistakes. How do we fix that?",
    a: "Treat them as habits to practise, not bad luck. Look through the last test for the pattern (signs, rounding, units, misreading the question), pick one, and have your child check for that one thing at the end of every question for a few weeks. Writing every step down also makes slips easier to catch.",
  },
  {
    q: "What if they know it at home but go blank in the test?",
    a: "Practising under test-like conditions helps: timed, no notes, mixed questions. If your child is very worried before tests, or the blanking keeps happening, talk to the maths teacher or the school's wellbeing staff. They can often help with both the maths and the nerves.",
  },
  {
    q: "Where can we get maths practice tests?",
    a: "Every Year 7 to 10 topic on Tuterly has a free 20-question test with an answer key, and a free 10-question practice sheet you can print straight away. You can also build a practice exam across several topics, with worked solutions.",
  },
];

const LINKS = [
  { href: "/end-of-year-maths-exams", label: "Free practice exams and topic tests, Years 7 to 10" },
  { href: "/parents/preparing-for-maths-topic-tests", label: "How to prepare for maths topic tests and exams" },
  { href: "/learn/why-practice-tests-beat-re-reading-notes", label: "Why practice tests beat re-reading notes" },
  { href: "/parents/end-of-year-maths-report", label: "Got the maths report? Close the gaps before next year" },
];

const REASONS = [
  {
    t: "Recognising isn't the same as remembering",
    x: "Re-reading notes and worked examples makes everything look familiar, so it feels learnt. But the test asks your child to produce the working from a blank page, and that's a different skill.",
  },
  {
    t: "They practised what they could already do",
    x: "It's natural to redo the questions that feel good. The marks are usually in the ones they got wrong in class or homework, and those are the ones that get skipped.",
  },
  {
    t: "It was crammed into one night",
    x: "A long session the night before feels productive, but much of it fades within days. The same time spread over a week sticks far better.",
  },
  {
    t: "The test was mixed, the practice wasn't",
    x: "Homework is usually one skill at a time. A test mixes them, so part of the job is knowing which method to use, and that only comes from practising mixed questions.",
  },
  {
    t: "Small slips, not the big idea",
    x: "A dropped negative sign, rounding too early, a missing unit or answering a different question. These can cost more marks than not understanding the topic.",
  },
  {
    t: "Time pressure",
    x: "Practising slowly with notes nearby doesn't prepare them for working quickly without them. At least one timed practice before the test helps a lot.",
  },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[
        { name: "Parents", path: "/parents" },
        { name: "Studied but still failed the maths test", path: PATH },
      ]}
      eyebrow="Parent guide · Years 7 to 10 maths"
      h1="They studied. They still failed the maths test. Here’s why."
      lead="Hours at the desk, notes re-read, and the mark still came back low. It’s one of the most frustrating things for a student, and for the parent watching. Usually the problem isn’t effort. It’s the kind of studying."
      quickAnswer="Re-reading notes makes maths feel familiar, but a test asks your child to produce the working from memory, with mixed questions and a time limit. The fix is practising fresh questions without notes, starting with the ones they got wrong, spread over several days before the test."
      toc={[
        ["why", "Why it didn’t show up"],
        ["where", "Where the marks went"],
        ["plan", "A one-week plan"],
        ["habits", "Habits that save marks"],
        ["tuterly", "Where Tuterly fits"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Study that shows up in the mark"
      ctaText="Tuterly turns every maths question your child gets wrong into a detailed worked solution and fresh practice, until they can do it on their own. Years 7 to 10."
      placement="parents_studied_failed"
      faqs={FAQS}
      faqTitle="Studying for maths tests: questions parents ask"
      links={LINKS}
      finalTitle="Make the next test different"
      finalText="Tuterly saves every question your child gets wrong, explains it step by step, and brings fresh versions back until it’s mastered. Before a test, they can test themselves on the topic. Each week you see what they mastered."
    >
      <section id="why" className="tb-section" aria-labelledby="h-why">
        <div className="tb-wrap">
          <h2 id="h-why" className="tb-h2 pg-h2">Why the studying didn’t show up in the mark</h2>
          <p className="pg-intro">
            When a hard-working student gets a low maths mark, it&rsquo;s usually one or more of these. None of them are about being &ldquo;bad at maths&rdquo;.
          </p>
          <div className="pg-grid">
            {REASONS.map((r) => (
              <div key={r.t} className="pg-box">
                <h3>{r.t}</h3>
                <p>{r.x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="where" className="tb-section" aria-labelledby="h-where">
        <div className="tb-wrap">
          <h2 id="h-where" className="tb-h2 pg-h2">Work out where the marks actually went</h2>
          <p className="pg-intro">
            Sit down with the marked test together, calmly, and sort every lost mark into one of three groups. Each needs a different fix.
          </p>
          <div className="pg-table">
            <table>
              <caption>Three kinds of lost marks in a maths test, and what fixes each</caption>
              <thead>
                <tr>
                  <th scope="col">Lost mark</th>
                  <th scope="col">What it looks like</th>
                  <th scope="col">The fix</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">A slip</th>
                  <td>They can do it when they look again: a sign, a rounding error, a misread question</td>
                  <td>A checking habit: one thing to check at the end of every question</td>
                </tr>
                <tr>
                  <th scope="row">A forgotten step</th>
                  <td>They knew it in class but couldn&rsquo;t remember how to start, or stopped halfway</td>
                  <td>Fresh questions on that skill without notes, over several days</td>
                </tr>
                <tr>
                  <th scope="row">Never understood</th>
                  <td>Even with the worked solution, the method doesn&rsquo;t make sense</td>
                  <td>Ask the teacher to re-explain it, then practise</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="pg-small">
            Slips and forgotten steps are both fixed with practice. If most lost marks are &ldquo;never understood&rdquo;, raise it with the teacher, and see our guide on <Link href="/parents/maths-app-vs-tutoring">when a tutor is worth it</Link>.
          </p>
        </div>
      </section>

      <section id="plan" className="tb-section" aria-labelledby="h-plan">
        <div className="tb-wrap">
          <h2 id="h-plan" className="tb-h2 pg-h2">A one-week plan before the next test</h2>
          <p className="pg-intro">
            Twenty to forty minutes a day. The same total time as a big cram, but spread out, and spent on questions rather than notes.
          </p>
          <ol className="pg-steps">
            <li><strong>Day 1: make the list</strong>Collect every question they got wrong on this topic: homework, class work, quizzes, the last test. That list is the study plan.</li>
            <li><strong>Days 2 and 3: try, then check</strong>Attempt fresh questions on each item without looking at notes. Check against the worked solution, and mark anything still wrong.</li>
            <li><strong>Day 4: mix it up</strong>A short mixed set across the whole topic, timed, no notes. This is the closest thing to the real test.</li>
            <li><strong>Day 5: fix what&rsquo;s left</strong>Redo only what went wrong on days 2 to 4, without looking at the working first.</li>
            <li><strong>Night before: keep it light</strong>A few questions on their weakest skill, a look at the formula sheet, then sleep. Sleep does more than an extra hour of study.</li>
          </ol>
          <p className="pg-small">
            Free practice for every Year 7 to 10 topic: a printable 10-question sheet and a full 20-question test on each <Link href="/worksheets">topic page</Link>, or a mixed <Link href="/end-of-year-maths-exams">practice exam</Link>{" "}with worked solutions.
          </p>
        </div>
      </section>

      <section id="habits" className="tb-section" aria-labelledby="h-habits">
        <div className="tb-wrap">
          <h2 id="h-habits" className="tb-h2 pg-h2">Test habits that save marks</h2>
          <ul className="pg-checklist">
            <li><strong>Read the question twice.</strong>{" "}Underline what it&rsquo;s asking for, including units and how to round.</li>
            <li><strong>Write every step.</strong>{" "}Working that&rsquo;s written down earns method marks even when the final answer is wrong, and makes slips easier to spot.</li>
            <li><strong>Skip and come back.</strong>{" "}If a question isn&rsquo;t moving after a minute or two, move on and return at the end.</li>
            <li><strong>Check one thing every time.</strong>{" "}Their most common slip from the last test: signs, rounding or units.</li>
            <li><strong>Check answers that can be checked.</strong>{" "}Substitute a solution back into the equation, or ask &ldquo;does this size of answer make sense?&rdquo;.</li>
          </ul>
        </div>
      </section>

      <section id="tuterly" className="tb-section" aria-labelledby="h-tuterly">
        <div className="tb-wrap">
          <h2 id="h-tuterly" className="tb-h2 pg-h2">Where Tuterly fits</h2>
          <div className="pg-prose">
            <p>
              Tuterly is a maths study app for Years 7 to 10, built by Bayside Academics, a Melbourne tutoring business. It does the kind of studying that shows up in the mark, every day, without you having to organise it:
            </p>
            <ul>
              <li><strong>Every wrong question gets saved.</strong>{" "}Your child snaps it from homework or a marked test, so the &ldquo;list&rdquo; builds itself.</li>
              <li><strong>Detailed worked solutions,</strong>{" "}with every step explained, so they see why it works, not just the answer.</li>
              <li><strong>Fresh questions on the same skill,</strong>{" "}tried without looking, until they get them right on their own.</li>
              <li><strong>Mistakes come back until they&rsquo;re mastered,</strong>{" "}so a skill fixed this week is still there on test day.</li>
              <li><strong>A test on any topic in their year</strong>{" "}before a school assessment, with anything they get wrong going straight into their practice.</li>
              <li><strong>A weekly summary for you</strong>{" "}of the questions they added and mastered, plus their test scores.</li>
            </ul>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}

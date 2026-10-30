import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";

const PATH = "/parents/maths-app-vs-tutoring";
const TITLE = "Maths App or Tutor? An Honest Guide for Years 7 to 10 Parents | Tuterly";
const DESCRIPTION =
  "Should your secondary student use a maths app, a private tutor, or both? A practical framework for Australian parents: what each is good at, the trade-offs, and signs your child needs a person.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const FAQS = [
  {
    q: "Is a maths app enough on its own for a Year 7 to 10 student?",
    a: "It can be, if your child is roughly keeping up in class and mainly needs more practice on the topics they are learning. It is usually not enough on its own if they are well behind, cannot start most questions in a topic, or are anxious enough that they avoid maths altogether. In those cases a person is better placed to diagnose and re-teach.",
  },
  {
    q: "How do I know if my child needs a tutor?",
    a: "Common signs are: marks dropping across several topics rather than one, being unable to start homework questions even with a worked example, gaps from earlier years showing up repeatedly, or worry about maths affecting school life. Talk to the teacher first. They can often tell you whether it is a practice issue or an understanding issue.",
  },
  {
    q: "Can my child use an app and see a tutor at the same time?",
    a: "Yes, and the two often work well together. The tutor re-teaches and diagnoses; the app gives your child structured practice between sessions on the questions they got wrong. Sharing the mistakes from the app with the tutor can help them decide what to work on.",
  },
  {
    q: "Does it matter if an app follows the Australian Curriculum?",
    a: "It helps. Topics, terminology and the order they are taught vary between countries. Practice that matches what your child is doing in class this term is easier to fit around homework and more likely to show up in school tests.",
  },
  {
    q: "Online or in-person tutoring: which is better?",
    a: "Both can work. Online tutoring removes travel and widens your choice of tutor; in-person can suit younger or easily distracted students. The tutor's ability to explain clearly and check understanding matters more than the format.",
  },
  {
    q: "What does Tuterly do, and what does it not do?",
    a: "Tuterly is a study app for Years 7 to 10 maths. Your child snaps questions they get wrong; it saves each with a worked solution, generates similar questions until the skill is mastered, and builds practice tests from their mistakes. It does not replace a teacher or a tutor who can watch your child work and re-teach a topic from scratch.",
  },
];

const LINKS = [
  { href: "/learn/when-does-your-child-need-a-tutor", label: "When does your child actually need a tutor?" },
  { href: "/learn/online-vs-in-person-tutoring", label: "Online vs in-person tutoring" },
  { href: "/learn/best-maths-apps-years-7-10-australia", label: "Maths apps for Years 7 to 10 in Australia" },
  { href: "/learn/maths-anxiety-help-children-victoria", label: "How to help your child with maths anxiety" },
  { href: "/worksheets", label: "Free maths worksheets, Years 7 to 10", note: "(a quick way to check a skill at home)" },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[
        { name: "Parents", path: "/parents" },
        { name: "Maths app or tutor?", path: PATH },
      ]}
      eyebrow="Parent guide · Years 7 to 10 maths"
      h1="Maths app or tutor? An honest guide for parents of Years 7 to 10"
      lead="When maths marks start to slip, most parents weigh up the same options: a study app, a private tutor, or both. They solve different problems. This guide helps you work out which problem your child actually has, so you can choose the right kind of help, or a mix."
      toc={[
        ["problem", "Start with the problem"],
        ["compare", "Side-by-side comparison"],
        ["app-fits", "When an app fits"],
        ["tutor-fits", "When a person is needed"],
        ["both", "Combining them"],
        ["checklist", "Questions to ask"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Practice built from your child’s mistakes"
      ctaText="Tuterly turns each maths question your child gets wrong into a worked solution and fresh practice on the same skill, aligned to the Australian Curriculum."
      placement="parents_app_vs_tutor"
      faqs={FAQS}
      faqTitle="App or tutor: questions parents ask"
      links={LINKS}
      finalTitle="Start with the questions they got wrong"
      finalText="Whether or not your child also sees a tutor, Tuterly gives them a place to save every wrong question, practise it until it sticks, and test themselves before assessments."
    >
      <section id="problem" className="tb-section" aria-labelledby="h-problem">
        <div className="tb-wrap">
          <h2 id="h-problem" className="tb-h2 pg-h2">Start with the problem, not the product</h2>
          <p className="pg-intro">
            &ldquo;Struggling with maths&rdquo; can mean very different things. Before choosing any kind of help, it is worth working out which of these is closest to your child&rsquo;s situation.
          </p>
          <div className="pg-grid">
            <div className="pg-box">
              <h3>They understand it in class, then forget</h3>
              <p>Homework goes fine on the night, but the same skills are shaky a few weeks later in a topic test. This is mostly a <strong>practice and retrieval</strong> gap.</p>
            </div>
            <div className="pg-box">
              <h3>They make the same mistakes repeatedly</h3>
              <p>Sign errors, a missed middle term when expanding, the wrong trig ratio. The method is mostly there, but specific steps keep breaking. This is a <strong>targeted practice</strong> gap.</p>
            </div>
            <div className="pg-box">
              <h3>They cannot start most questions</h3>
              <p>Even with a worked example, a whole topic does not make sense, or earlier skills (fractions, negative numbers, basic algebra) are missing. This is an <strong>understanding</strong> gap.</p>
            </div>
            <div className="pg-box">
              <h3>They avoid maths altogether</h3>
              <p>Homework does not get started, tests bring tears, or your child says they &ldquo;just can&rsquo;t do maths&rdquo;. This is often a <strong>confidence or accountability</strong> gap, sometimes alongside the others.</p>
            </div>
          </div>
          <p className="pg-small">
            Your child&rsquo;s teacher is the best first source here. A short conversation about recent tests usually tells you which of these is going on. Our <Link href="/parents/help-with-secondary-maths-homework">maths homework guide</Link> covers how to raise it.
          </p>
        </div>
      </section>

      <section id="compare" className="tb-section" aria-labelledby="h-compare">
        <div className="tb-wrap">
          <h2 id="h-compare" className="tb-h2 pg-h2">App and tutor, side by side</h2>
          <p className="pg-intro">
            This is a general comparison. Individual tutors and apps vary a lot, so treat it as a starting point rather than a verdict.
          </p>
          <div className="pg-table">
            <table>
              <caption>How a study app and a human tutor typically compare for Years 7 to 10 maths</caption>
              <thead>
                <tr>
                  <th scope="col">Consideration</th>
                  <th scope="col">Study app</th>
                  <th scope="col">Tutor (online or in person)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Best at</th>
                  <td>Frequent practice, spaced review of past mistakes, quick worked solutions</td>
                  <td>Diagnosing why a student is stuck, re-teaching a topic, adapting explanations in the moment</td>
                </tr>
                <tr>
                  <th scope="row">When it is available</th>
                  <td>Any time, in short sessions, including the night before a test</td>
                  <td>At booked session times, usually weekly</td>
                </tr>
                <tr>
                  <th scope="row">Accountability</th>
                  <td>Depends on your child&rsquo;s habits and your routine at home</td>
                  <td>Built in: someone is expecting them each week</td>
                </tr>
                <tr>
                  <th scope="row">Seeing the working</th>
                  <td>Checks answers and shows methods, but cannot watch your child think</td>
                  <td>Can watch the process and spot exactly where it goes wrong</td>
                </tr>
                <tr>
                  <th scope="row">Cost and time</th>
                  <td>Generally a lower ongoing cost, no travel</td>
                  <td>Generally a higher cost per week, plus travel for in-person sessions</td>
                </tr>
                <tr>
                  <th scope="row">Match to school</th>
                  <td>Varies; check it follows the Australian Curriculum and Australian terminology</td>
                  <td>Varies; ask whether they know your child&rsquo;s year level and state curriculum</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="app-fits" className="tb-section" aria-labelledby="h-app-fits">
        <div className="tb-wrap">
          <h2 id="h-app-fits" className="tb-h2 pg-h2">When an app is the right tool</h2>
          <div className="pg-prose">
            <p>
              An app is a good fit when your child is roughly on track and the bottleneck is practice. Most marks in Years 7 to 10 are lost on skills a student has been taught but has not practised enough to recall under test conditions. Two well-established learning habits help most here:
            </p>
            <ul>
              <li><strong>Retrieval practice:</strong> trying a question from memory, rather than re-reading notes, strengthens recall.</li>
              <li><strong>Spacing:</strong> coming back to a skill over days and weeks works better than doing a lot in one night.</li>
            </ul>
            <p>
              Both are hard to organise by hand. Most students do not keep a list of what they got wrong, and fewer still come back to it a week later. That is the gap a study app can fill.
            </p>
            <h3 className="pg-h3">What to look for in a maths app</h3>
            <ul>
              <li><strong>Australian Curriculum alignment</strong> so practice matches what is being taught this term, in the same order and language.</li>
              <li><strong>Practice on your child&rsquo;s actual mistakes</strong>, not just generic question sets.</li>
              <li><strong>Worked solutions that show steps</strong>, so your child sees the method, not only the answer.</li>
              <li><strong>Similar questions, not the same one</strong>, so they practise the skill rather than memorising an answer.</li>
              <li><strong>Some visibility for parents</strong>, so you can see whether it is being used and what is improving.</li>
            </ul>
            <h3 className="pg-h3">How Tuterly approaches it</h3>
            <p>
              Tuterly is built around the questions your child gets wrong. They snap a photo of a wrong question from homework or a marked test; it is saved with a worked solution; Tuterly generates fresh questions on the same skill; questions return until they are mastered; and before a topic test, it builds a practice test from their own mistakes. It covers Years 7 to 10 maths and is designed by Australian educators at Bayside Academics. See <Link href="/features/snap-a-question">snap a question</Link> and <Link href="/features/test-any-topic">test any topic</Link>.
            </p>
          </div>
        </div>
      </section>

      <section id="tutor-fits" className="tb-section" aria-labelledby="h-tutor-fits">
        <div className="tb-wrap">
          <h2 id="h-tutor-fits" className="tb-h2 pg-h2">When your child needs a person</h2>
          <p className="pg-intro">
            Some problems need someone who can watch your child work, ask questions back, and change the explanation on the spot. Consider a tutor, or extra support through the school, when:
          </p>
          <ul className="pg-checklist">
            <li><strong>They are significantly behind.</strong> If earlier skills are missing, more practice on current topics will not stick until the foundations are rebuilt.</li>
            <li><strong>The process needs diagnosing.</strong> Answers keep coming out wrong and nobody can quite see why. A person watching the working can usually spot it.</li>
            <li><strong>Anxiety is getting in the way.</strong> A patient adult can rebuild confidence in a way practice alone cannot. If worry is affecting school life, talk to the school too.</li>
            <li><strong>Accountability is the missing piece.</strong> Some students simply work better when someone is expecting them at a set time.</li>
            <li><strong>A high-stakes step is coming.</strong> Class placement for Year 10 or senior maths choices can make targeted help worth it for a term.</li>
          </ul>
          <div className="pg-prose" style={{ marginTop: 18 }}>
            <p>
              Before paying for tutoring, ask the school what support already exists. Many secondary schools run homework clubs or maths help sessions, and teachers can often point you to the specific skills that need work.
            </p>
          </div>
        </div>
      </section>

      <section id="both" className="tb-section" aria-labelledby="h-both">
        <div className="tb-wrap">
          <h2 id="h-both" className="tb-h2 pg-h2">Using an app and a tutor together</h2>
          <div className="pg-prose">
            <p>
              The choice is not always one or the other. A hybrid often works well, because each covers what the other cannot:
            </p>
            <ul>
              <li>The <strong>tutor</strong> uses session time for re-teaching and diagnosis, not for drilling questions your child could practise alone.</li>
              <li>The <strong>app</strong> handles practice between sessions, on the specific questions your child got wrong that week.</li>
              <li>Your child brings their saved mistakes to the session, so the tutor starts from real evidence rather than guessing.</li>
            </ul>
            <p>
              A common pattern is to use a tutor for a term while a big gap is closed, then step back to app-based practice once your child is keeping up again. The school stays in the loop throughout.
            </p>
          </div>
        </div>
      </section>

      <section id="checklist" className="tb-section" aria-labelledby="h-checklist">
        <div className="tb-wrap">
          <h2 id="h-checklist" className="tb-h2 pg-h2">Questions to ask before you decide</h2>
          <div className="pg-grid">
            <div className="pg-box">
              <h3>Ask your child</h3>
              <ul>
                <li>Which topic feels hardest right now?</li>
                <li>When you get a question wrong, do you know why?</li>
                <li>Would you rather practise on your own or with someone?</li>
              </ul>
            </div>
            <div className="pg-box">
              <h3>Ask the teacher</h3>
              <ul>
                <li>Is this a practice issue or an understanding issue?</li>
                <li>Are there gaps from earlier years?</li>
                <li>What support does the school already offer?</li>
              </ul>
            </div>
            <div className="pg-box">
              <h3>Ask any app or tutor</h3>
              <ul>
                <li>Does it follow the Australian Curriculum for my child&rsquo;s year?</li>
                <li>How will I know if it is helping?</li>
                <li>Can it work from my child&rsquo;s actual mistakes?</li>
              </ul>
            </div>
          </div>
          <p className="pg-small">
            Whichever you choose, check the topics your child is studying on the <Link href="/years">Years 7 to 10 guides</Link>, and give it a fair trial of several weeks before judging it.
          </p>
        </div>
      </section>
    </GuideShell>
  );
}

import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";

const PATH = "/parents/help-with-secondary-maths-homework";
const TITLE = "How to Help With Years 7 to 10 Maths Homework (Without Doing It) | Tuterly";
const DESCRIPTION =
  "A practical guide for Australian parents: a nightly maths homework routine, a support ladder that keeps your child doing the thinking, when to write to the teacher, and how to help even if maths was never your subject.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const FAQS = [
  {
    q: "Should I help my child with maths homework if I do not understand it?",
    a: "Yes, but your job is not to know the maths. Ask your child to explain the question and what they tried, point them to a worked example in their book or notes, and keep the routine steady. If they are still stuck after that, a short note to the teacher is more useful than you working out the method together.",
  },
  {
    q: "How long should Year 7 to 10 maths homework take?",
    a: "It varies by school and by year, so check the school homework policy. As a rough guide, a set time with a clear stopping point works better than open-ended sessions. If maths homework regularly runs well past what the school expects, that is worth mentioning to the teacher.",
  },
  {
    q: "What if my child's school teaches a different method from the one I learnt?",
    a: "Go with the school's method. Showing a different way can confuse students, and teachers often mark the working, not just the answer. If you want to help, ask your child to teach you their method. Explaining it is good practice for them.",
  },
  {
    q: "Is it cheating to look at the worked solutions?",
    a: "Not if it is used well. Reading a worked solution after a genuine attempt, then trying a similar question without looking, is one of the most effective ways to learn a method. Copying the solution and moving on is where it stops helping.",
  },
  {
    q: "My child gets upset and says they are bad at maths. What should I say?",
    a: "Avoid agreeing, even kindly, and avoid saying you were never good at maths either. Point to something specific they can now do that they could not do earlier in the year, and treat the mistake as information about what to practise next. If worry about maths is affecting sleep, school attendance or tests, talk to the school.",
  },
  {
    q: "How does Tuterly help with homework?",
    a: "When your child gets a homework question wrong, they snap a photo of it. Tuterly saves it with a step-by-step worked solution and then gives fresh questions on the same skill, so the stuck moment becomes practice instead of a fight. It covers Years 7 to 10 maths and is designed by Australian educators.",
  },
];

const LINKS = [
  { href: "/worksheets", label: "Free maths worksheets, Years 7 to 10", note: "(printable, with answers)" },
  { href: "/formula-sheets", label: "Maths formula sheets by year level" },
  { href: "/learn/maths-anxiety-help-children-victoria", label: "How to help your child with maths anxiety" },
  { href: "/learn/how-to-prepare-for-parent-teacher-interview-victorian-parents", label: "Preparing for a parent-teacher interview" },
  { href: "/learn/how-to-help-child-with-homework-victorian-parents-years-3-9", label: "Homework help across all subjects, Years 3 to 9" },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[
        { name: "Parents", path: "/parents" },
        { name: "Help with maths homework", path: PATH },
      ]}
      eyebrow="Parent guide · Years 7 to 10 maths"
      h1="How to help with Years 7 to 10 maths homework, without doing it for them"
      lead="You do not need to remember how to factorise a quadratic to help with maths homework. What helps most is a predictable routine, asking the right questions in the right order, and knowing when to stop and let the teacher step in. This guide sets out how to do that, night by night."
      toc={[
        ["roles", "Who does what"],
        ["routine", "A nightly routine"],
        ["ladder", "The support ladder"],
        ["teacher", "When to contact the teacher"],
        ["years", "What to expect by year"],
        ["app", "Where Tuterly fits"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Turn the stuck moment into practice"
      ctaText="When a homework question goes wrong, your child snaps it. Tuterly saves it with a worked solution, then gives fresh questions on the same skill until it sticks."
      placement="parents_homework_guide"
      faqs={FAQS}
      faqTitle="Maths homework: questions parents ask"
      links={LINKS}
      finalTitle="Fewer homework arguments, more practice that counts"
      finalText="Your child snaps the questions they get wrong. Tuterly turns each one into a worked solution and fresh practice, so you can stay in the encouraging role."
    >
      <section id="roles" className="tb-section" aria-labelledby="h-roles">
        <div className="tb-wrap">
          <h2 id="h-roles" className="tb-h2 pg-h2">Who does what: parent, student and teacher</h2>
          <p className="pg-intro">
            Most homework conflict comes from blurred roles. A parent starts by checking in, ends up explaining, and before long is holding the pencil. Being clear about who owns what makes the evening calmer and the learning better.
          </p>
          <div className="pg-grid">
            <div className="pg-box">
              <h3>Your child owns the thinking</h3>
              <p>They read the question, attempt it, show their working and decide when to ask for help. In secondary school the working is often marked, so the method needs to be theirs.</p>
            </div>
            <div className="pg-box">
              <h3>You own the conditions</h3>
              <p>A time, a place, a phone that is somewhere else, and an agreed stopping point. You also own encouragement, and noticing when the same problem keeps coming back.</p>
            </div>
            <div className="pg-box">
              <h3>The teacher owns the teaching</h3>
              <p>If a whole method has not landed, re-teaching it is the teacher&rsquo;s job, and they need to know. Homework that is quietly fixed at home hides the gap from the person best placed to close it.</p>
            </div>
          </div>
          <p className="pg-small">
            None of this means stepping back completely. Students whose parents show steady interest in their schoolwork tend to take it more seriously. The point is to show interest without taking over.
          </p>
        </div>
      </section>

      <section id="routine" className="tb-section" aria-labelledby="h-routine">
        <div className="tb-wrap">
          <h2 id="h-routine" className="tb-h2 pg-h2">A nightly maths homework routine that holds up</h2>
          <p className="pg-intro">
            Routines beat willpower, for teenagers and for parents. A short, predictable session most nights is easier to keep than a long one that depends on mood.
          </p>
          <ol className="pg-steps">
            <li><strong>Same time, same place</strong>Pick a time that fits your household, ideally not straight after a long day of sport or right before bed. A table works better than a bed or couch.</li>
            <li><strong>Agree the finish line</strong>Decide before starting what &ldquo;done&rdquo; means: a set of questions, or a set time. Open-ended homework drags, and a clear end makes it easier to start.</li>
            <li><strong>Two-minute check-in</strong>Ask what the homework is and which part looks hardest. You are not checking answers yet, just helping them plan.</li>
            <li><strong>Work, then wrap up</strong>Your child works on their own. At the end, ask them to show you one question they found hard and how they solved it, or where they got stuck.</li>
          </ol>
          <div className="pg-prose" style={{ marginTop: 18 }}>
            <p>
              Keep the phone out of the room during the work block, not just face down. If your child uses a device for homework, agree which apps are part of the work. Short breaks are fine. A break that turns into an hour of scrolling is usually the real reason homework runs late.
            </p>
            <p>
              Keep the time bound even on bad nights. If the agreed time is up and a question is still unsolved, it goes on the &ldquo;ask the teacher&rdquo; list rather than becoming a late-night battle. That one rule removes a lot of the conflict.
            </p>
          </div>
        </div>
      </section>

      <section id="ladder" className="tb-section" aria-labelledby="h-ladder">
        <div className="tb-wrap">
          <h2 id="h-ladder" className="tb-h2 pg-h2">The support ladder: what to do when they are stuck</h2>
          <p className="pg-intro">
            When your child says &ldquo;I don&rsquo;t get it&rdquo;, work up these rungs in order and stop as soon as they can carry on alone. The pencil stays in their hand the whole way.
          </p>
          <ol className="pg-steps">
            <li><strong>Explain the question to me</strong>Ask them to read it aloud and say what it is asking in their own words. A surprising number of &ldquo;stuck&rdquo; moments end here, because the issue was reading, not maths.</li>
            <li><strong>Show me what you tried</strong>Look at the working, not just the answer. Where did it stop making sense? Even a wrong start tells you something.</li>
            <li><strong>One prompt or one resource</strong>Offer a single nudge: &ldquo;Is there a similar example in your book?&rdquo;, &ldquo;What did you do in the last question?&rdquo; or a worked solution to a similar question. Then step back.</li>
            <li><strong>Park it and flag it</strong>Still stuck? Mark the question, move on, and add it to a short note for the teacher. Stuck is information, not failure.</li>
          </ol>
          <div className="pg-prose" style={{ marginTop: 18 }}>
            <h3 className="pg-h3">Questions that help (and ones that do not)</h3>
            <ul>
              <li><strong>Helpful:</strong> &ldquo;What is the question asking you to find?&rdquo;, &ldquo;What do you already know?&rdquo;, &ldquo;Can you check that answer another way?&rdquo;, &ldquo;Can you teach me how you did that one?&rdquo;</li>
              <li><strong>Less helpful:</strong> &ldquo;It&rsquo;s easy, just&hellip;&rdquo;, &ldquo;That&rsquo;s not how I learnt it&rdquo;, or taking the pencil to show them.</li>
            </ul>
            <p>
              Asking your child to teach you a method is one of the most useful things you can do, especially if you have forgotten the maths. Explaining a step out loud is a strong way to learn it, and it puts them in the expert role.
            </p>
            <h3 className="pg-h3">Watch what you say about maths</h3>
            <p>
              &ldquo;I was never good at maths either&rdquo; is meant kindly, but it tells a teenager that maths ability is fixed and that struggling is normal for your family. Try instead: &ldquo;This is hard right now, and it will get easier with practice.&rdquo; Praise the effort and the strategy (&ldquo;you checked your answer, that&rsquo;s why you caught the sign error&rdquo;) rather than being &ldquo;smart&rdquo;.
            </p>
          </div>
        </div>
      </section>

      <section id="teacher" className="tb-section" aria-labelledby="h-teacher">
        <div className="tb-wrap">
          <h2 id="h-teacher" className="tb-h2 pg-h2">When to stop and write to the teacher</h2>
          <p className="pg-intro">
            One hard night is normal. A pattern is worth a short message. Contact the teacher when you notice any of these:
          </p>
          <ul className="pg-checklist">
            <li><strong>The same topic is stuck on several nights.</strong> If the support ladder runs out on the same kind of question more than once, the method has not landed and needs re-teaching.</li>
            <li><strong>Homework is regularly taking far longer than intended.</strong> The teacher may not know, and may adjust the load or the support.</li>
            <li><strong>Your child cannot start the homework at all.</strong> Not knowing where to begin often means an earlier skill is missing.</li>
            <li><strong>Marks have dropped on a topic test.</strong> Ask which skills cost the marks and what to focus on next.</li>
            <li><strong>Worry about maths is getting bigger.</strong> Tears, avoidance or not wanting to go to maths class are worth raising early.</li>
          </ul>
          <div className="pg-note" style={{ marginTop: 18 }}>
            <strong>Keep the note short and specific.</strong> For example: &ldquo;Sam spent 40 minutes on questions 5 to 8 (solving equations with brackets) and could not get started. Could you go over this in class or suggest an example to look at?&rdquo; Older students can write it themselves, which is a useful skill in its own right.
          </div>
        </div>
      </section>

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">What maths homework looks like from Year 7 to Year 10</h2>
          <p className="pg-intro">
            Knowing what topic your child is on makes it easier to ask good questions and find the right practice. Each year guide has a full topic map and free worksheets.
          </p>
          <div className="pg-grid">
            <div className="pg-box">
              <h3><Link href="/years/year-7-maths">Year 7</Link></h3>
              <p>Negative numbers, fraction and percentage calculations, and the first algebra. Homework is often about setting out working clearly, a habit worth building now.</p>
              <ul>
                <li><Link href="/worksheets/year-7-integers">Integers worksheet</Link></li>
                <li><Link href="/worksheets/year-7-fraction-operations">Fraction operations worksheet</Link></li>
              </ul>
            </div>
            <div className="pg-box">
              <h3><Link href="/years/year-8-maths">Year 8</Link></h3>
              <p>Expanding brackets, equations with several steps, and often Pythagoras. Algebra slips start to cost marks across topics.</p>
              <ul>
                <li><Link href="/worksheets/year-8-algebra">Algebra worksheet</Link></li>
                <li><Link href="/worksheets/year-8-linear-equations">Linear equations worksheet</Link></li>
              </ul>
            </div>
            <div className="pg-box">
              <h3><Link href="/years/year-9-maths">Year 9</Link></h3>
              <p>Index laws, quadratics and right-angled trigonometry. Many students need a reminder to use a calculator in degree mode.</p>
              <ul>
                <li><Link href="/worksheets/year-9-exponent-laws">Exponent laws worksheet</Link></li>
                <li><Link href="/worksheets/year-9-trigonometry">Trigonometry worksheet</Link></li>
              </ul>
            </div>
            <div className="pg-box">
              <h3><Link href="/years/year-10-maths">Year 10</Link></h3>
              <p>Quadratics, simultaneous equations and, for 10A students, surds and logarithms. Homework loads are heavier and earlier gaps show up quickly.</p>
              <ul>
                <li><Link href="/worksheets/year-10-simultaneous-equations">Simultaneous equations worksheet</Link></li>
                <li><Link href="/worksheets/year-10-quadratic-factorising">Factorising quadratics worksheet</Link></li>
              </ul>
            </div>
          </div>
          <p className="pg-small">
            Topic order follows the Australian Curriculum v9 and the Victorian Curriculum 2.0. NSW and individual schools sequence topics differently, so check your child&rsquo;s course outline. Year 7 and Year 9 students also sit <Link href="/naplan/year-7-numeracy">NAPLAN Numeracy</Link>.
          </p>
        </div>
      </section>

      <section id="app" className="tb-section" aria-labelledby="h-app">
        <div className="tb-wrap">
          <h2 id="h-app" className="tb-h2 pg-h2">Where Tuterly fits in the homework routine</h2>
          <p className="pg-intro">
            The hardest moment in homework is the wrong answer: your child is frustrated, you are not sure how to help, and the question usually gets abandoned. Tuterly is built for that moment.
          </p>
          <ol className="pg-steps">
            <li><strong>Snap it</strong>Your child photographs the question they got wrong or could not finish.</li>
            <li><strong>See the method</strong>It is saved with a step-by-step worked solution, so the &ldquo;one resource&rdquo; rung of the ladder is already there.</li>
            <li><strong>Try a fresh one</strong>Tuterly gives a new question on the same skill to try without looking, which is where the learning happens.</li>
            <li><strong>Bring it back before the test</strong>Saved questions return until they are mastered, and can be built into a practice test before assessments.</li>
          </ol>
          <div className="pg-prose" style={{ marginTop: 18 }}>
            <p>
              An app does not replace the routine, the encouragement, or the note to the teacher. It works best when your child is roughly keeping up and needs more practice on specific skills. If a whole topic has not made sense, the teacher, or sometimes a tutor, needs to re-teach it first. Our guide to <Link href="/parents/maths-app-vs-tutoring">choosing between a maths app and a tutor</Link> covers how to tell the difference.
            </p>
            <p>
              Tuterly covers Years 7 to 10 maths, is aligned to the Australian Curriculum, and is designed by Australian educators at Bayside Academics. See how <Link href="/features/snap-a-question">snap a question</Link> works.
            </p>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}

import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import { PLUS_PRICES, FULL_PRICE_FROM } from "@/lib/study-launch";

// Parent landing page for tutoring cost searches ("maths tutor", "tutor near
// me", "kumon cost", "is tutoring worth it"). Rewritten 6 Nov 2026 from the
// parent research: tutoring feels compulsory but costly, and parents resent
// it. Leads with an honest, sourced cost comparison, says plainly when a
// tutor is the right call, then shows what an app does between lessons.
//
// Prices: the table shows Tuterly's current weekly and monthly price only
// (Ryan, 6 Nov 2026); the FAQ follows lib/study-launch.js (launch price
// and the price from 1 April 2027, no "50% off" or end date here). Tutor
// and Kumon figures are what providers and parents published, with links.

const PATH = "/parents/maths-app-vs-tutoring";
const TITLE = "Maths Help Without the $100-an-Hour Tutor (2026 Cost Guide) | Tuterly";
const DESCRIPTION =
  "A good maths tutor often costs $100 an hour, about $430 a month for one lesson a week. An honest guide for parents of Years 7 to 10: what maths help costs in Australia, when a tutor is worth it, and when practice at home is the real gap.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const NOW = PLUS_PRICES.month.now;
const FULL = PLUS_PRICES.month.full;
const WEEK = PLUS_PRICES.week.now;
const WEEK_FULL = PLUS_PRICES.week.full;

const FAQS = [
  {
    q: "How much does a maths tutor cost in Australia?",
    a: "It varies a lot. Online tutoring companies advertise from about $65 to $70 an hour, while an experienced or registered teacher tutoring privately often charges $100 to $120 an hour. One lesson a week at $100 an hour is about $430 a month. Prices here are what providers and parents published in late 2026, so check current rates.",
  },
  {
    q: "Is maths tutoring worth it?",
    a: "It can be, when your child needs something a person does best: re-teaching a topic from scratch, working out why they're stuck, or rebuilding confidence after a bad year. It's often less worth it when your child mostly understands the work and the real problem is not enough practice on the questions they get wrong. In that case most of the improvement happens between lessons, not in them.",
  },
  {
    q: "Tutor or Kumon?",
    a: "They do different things. Kumon is a daily worksheet program that works through its own sequence of skills, done mostly at home with a weekly class; it costs $160 a month per subject plus a $100 enrolment fee. A tutor works on your child's school topics and can re-teach them. For a Year 7 to 10 student struggling with this term's topics, practice that matches what's being taught at school usually helps more.",
  },
  {
    q: "Is a maths app enough on its own?",
    a: "It can be, if your child is roughly keeping up and mainly needs more practice on the topics they're learning. It usually isn't enough on its own if they're well behind, can't start most questions in a topic, or avoid maths altogether. In those cases a person is better placed to diagnose and re-teach.",
  },
  {
    q: "My teenager refuses to see a tutor. What else can we do?",
    a: "This is common. Some teenagers don't want an adult watching them get things wrong, or don't want another booked hour in the week. Practice they can do privately, on their own phone, at a time that suits them, often goes down better. Start small: the questions they got wrong on this week's homework.",
  },
  {
    q: "Can my child use an app and see a tutor at the same time?",
    a: "Yes, and the two often work well together. The tutor re-teaches and diagnoses; the app gives your child practice between lessons on the questions they got wrong. Bringing those saved mistakes to the lesson means the tutor starts from real evidence.",
  },
  {
    q: "How much does Tuterly cost?",
    a: `At launch, ${WEEK} a week or ${NOW} a month. From ${FULL_PRICE_FROM}, ${WEEK_FULL} a week or ${FULL} a month. The monthly plan starts with 7 days free, and you can cancel any time.`,
  },
  {
    q: "Is Tuterly just an answer app?",
    a: "No. Your child sees a step-by-step worked solution, then has to get fresh questions on the same skill right on their own. Each question keeps coming back until it's mastered, so the point is being able to do it, not having the answer.",
  },
  {
    q: "What does Tuterly not do?",
    a: "It doesn't replace a teacher or a tutor who can sit beside your child, watch them work and re-teach a topic from scratch. If your child is far behind or very anxious about maths, talk to the school and consider a person.",
  },
];

const LINKS = [
  { href: "/parents/end-of-year-maths-report", label: "Got the maths report? Close the gaps before next year" },
  { href: "/learn/when-does-your-child-need-a-tutor", label: "When does your child actually need a tutor?" },
  { href: "/learn/online-vs-in-person-tutoring", label: "Online vs in-person tutoring" },
  { href: "/parents/kumon-cost-australia", label: "Kumon cost in Australia, and is it worth it?" },
  { href: "/best-maths-apps-australia", label: "Maths apps for Years 7 to 10 in Australia" },
  { href: "/end-of-year-maths-exams", label: "Free practice exams and topic tests", note: "(a quick way to see where the gaps are)" },
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
      h1={<>Maths help without the <span style={{ whiteSpace: "nowrap" }}>$100-an-hour</span> tutor</>}
      lead="A good private maths tutor can easily cost $100 an hour: about $430 a month for one lesson a week. Sometimes that’s exactly what your child needs. But often the real problem isn’t the hour with the tutor. It’s the practice that doesn’t happen in the other six days."
      toc={[
        ["cost", "What maths help costs"],
        ["problem", "Which problem is it?"],
        ["between", "The other six days"],
        ["tutor-fits", "When a tutor is worth it"],
        ["both", "Using both"],
        ["checklist", "Questions to ask"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Practice every night, not once a week"
      ctaText="Tuterly turns every maths question your child gets wrong into a worked solution and fresh practice until it sticks. Years 7 to 10, Australian Curriculum. Join the early list."
      placement="parents_app_vs_tutor"
      quickAnswer="A private maths tutor in Australia typically costs $65 to $120 an hour, so one lesson a week is about $280 to $520 a month. A tutor is worth it when your child needs a topic re-taught or is well behind. If they mostly understand the work but keep losing marks, the gap is usually practice on their own mistakes, and that costs far less."
      faqs={FAQS}
      faqTitle="Tutoring and maths apps: questions parents ask"
      links={LINKS}
      finalTitle="Start with the questions they got wrong"
      finalText="Whether or not your child also sees a tutor, Tuterly gives them a place to save every wrong question, practise it until it sticks, and test themselves before assessments. You see what they mastered each week."
    >
      <section id="cost" className="tb-section" aria-labelledby="h-cost">
        <div className="tb-wrap">
          <h2 id="h-cost" className="tb-h2 pg-h2">What maths help actually costs</h2>
          <p className="pg-intro">
            Prices vary a lot by city, tutor and year level, so treat these as a guide and check current rates before you decide. One $100 lesson a week adds up to about $430 a month. Tuterly isn&rsquo;t affiliated with Kumon.
          </p>
          <div className="pg-table">
            <table>
              <caption>Typical cost of maths help for a Year 7 to 10 student in Australia, late 2026</caption>
              <thead>
                <tr>
                  <th scope="col">Option</th>
                  <th scope="col">Typical price</th>
                  <th scope="col">What you get</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Private tutor (experienced or registered teacher)</th>
                  <td>$100 to $120 an hour</td>
                  <td>One hour a week with a person who can re-teach and diagnose</td>
                </tr>
                <tr>
                  <th scope="row">Online tutoring company</th>
                  <td>From $65 to $70 an hour</td>
                  <td>One hour a week online, often with a university-student tutor</td>
                </tr>
                <tr>
                  <th scope="row">Kumon</th>
                  <td>$160 a month per subject, plus $100 to enrol</td>
                  <td>Daily worksheets in Kumon&rsquo;s own sequence, with a weekly class</td>
                </tr>
                <tr className="pg-row-hl">
                  <th scope="row">Tuterly</th>
                  <td>{WEEK} a week or {NOW} a month</td>
                  <td>Detailed, step-by-step worked solutions to your child&rsquo;s own wrong questions, fresh practice until they&rsquo;re mastered, topic tests and a weekly summary for you</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="problem" className="tb-section" aria-labelledby="h-problem">
        <div className="tb-wrap">
          <h2 id="h-problem" className="tb-h2 pg-h2">First, which problem does your child have?</h2>
          <p className="pg-intro">
            &ldquo;Struggling with maths&rdquo; can mean very different things, and they need different kinds of help. Which of these sounds most like your child?
          </p>
          <div className="pg-grid">
            <div className="pg-box">
              <h3>They get it in class, then forget</h3>
              <p>Homework goes fine on the night, but the same skills are shaky a few weeks later in the topic test. This is a <strong>practice</strong>{" "}gap. An app is usually enough.</p>
            </div>
            <div className="pg-box">
              <h3>They make the same mistakes again and again</h3>
              <p>Sign errors, a missed middle term when expanding, the wrong trig ratio. The method is mostly there, but specific steps keep breaking. This is a <strong>targeted practice</strong>{" "}gap. An app is usually enough.</p>
            </div>
            <div className="pg-box">
              <h3>They can&rsquo;t start most questions</h3>
              <p>Even with a worked example, a whole topic doesn&rsquo;t make sense, or earlier skills (fractions, negatives, basic algebra) are missing. This is an <strong>understanding</strong>{" "}gap. A person usually helps most.</p>
            </div>
            <div className="pg-box">
              <h3>They avoid maths altogether</h3>
              <p>Homework doesn&rsquo;t get started, tests bring tears, or your child says they &ldquo;just can&rsquo;t do maths&rdquo;. This is often a <strong>confidence</strong>{" "}gap. A patient person, and the school, can help.</p>
            </div>
          </div>
          <p className="pg-small">
            Not sure? A free <Link href="/end-of-year-maths-exams">practice exam or topic test</Link>{" "}shows where marks are being lost, and your child&rsquo;s teacher can usually tell you whether it&rsquo;s a practice issue or an understanding issue.
          </p>
        </div>
      </section>

      <section id="between" className="tb-section" aria-labelledby="h-between">
        <div className="tb-wrap">
          <h2 id="h-between" className="tb-h2 pg-h2">The hour with the tutor isn&rsquo;t where most marks are won</h2>
          <div className="pg-prose">
            <p>
              Most marks in Years 7 to 10 are lost on skills a student has been taught but hasn&rsquo;t practised enough to remember under test conditions. Two well-established habits fix that: <strong>trying questions from memory</strong>{" "}rather than re-reading notes, and <strong>coming back to a skill over days and weeks</strong>{" "}rather than cramming. Both happen between lessons, and both are hard to organise by hand.
            </p>
            <p>That&rsquo;s the part Tuterly does, every day, for a fraction of one tutoring hour:</p>
          </div>
          <ol className="pg-steps" style={{ marginTop: 16 }}>
            <li><strong>Snap the question they got wrong</strong>From homework or a marked test. It&rsquo;s saved with a step-by-step worked solution.</li>
            <li><strong>Practise fresh versions</strong>New questions on the same skill, so they learn the idea rather than memorising one answer.</li>
            <li><strong>Keep it until it&rsquo;s mastered</strong>Wrong questions keep coming back until your child gets them right on their own. A weekly review tests the week&rsquo;s trickiest.</li>
            <li><strong>Test before the test</strong>A test on any topic in their year before a school assessment. Anything they get wrong goes straight into their practice.</li>
          </ol>
          <div className="pg-grid" style={{ marginTop: 18 }}>
            <div className="pg-box">
              <h3>Detailed worked solutions</h3>
              <p>Every step written out and explained, so your child sees why it works, not just the answer. No waiting for next week&rsquo;s lesson.</p>
            </div>
            <div className="pg-box">
              <h3>Ready at 9pm the night before</h3>
              <p>No lessons to book or reschedule, and nobody to cancel on you. It&rsquo;s there whenever homework is.</p>
            </div>
            <div className="pg-box">
              <h3>For teenagers who won&rsquo;t have a tutor</h3>
              <p>Private, on their own phone, with no adult watching them get it wrong.</p>
            </div>
            <div className="pg-box">
              <h3>You can see it working</h3>
              <p>A weekly summary of the questions they added and mastered, plus their test scores. Never their photos.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tutor-fits" className="tb-section" aria-labelledby="h-tutor-fits">
        <div className="tb-wrap">
          <h2 id="h-tutor-fits" className="tb-h2 pg-h2">When a tutor is worth the money</h2>
          <p className="pg-intro">
            Tuterly is built by Bayside Academics, a Melbourne tutoring business, so we&rsquo;ll say it plainly: some problems need a person who can watch your child work, ask questions back and change the explanation on the spot. A tutor, or extra help through the school, is worth it when:
          </p>
          <ul className="pg-checklist">
            <li><strong>They&rsquo;re well behind.</strong>{" "}If earlier skills are missing, practice on this term&rsquo;s topics won&rsquo;t stick until the foundations are rebuilt.</li>
            <li><strong>Nobody can see why it&rsquo;s going wrong.</strong>{" "}A person watching the working can usually spot it.</li>
            <li><strong>Worry is getting in the way.</strong>{" "}A patient adult can rebuild confidence in a way practice alone can&rsquo;t. If it&rsquo;s affecting school life, talk to the school too.</li>
            <li><strong>They need someone expecting them.</strong>{" "}Some students simply work better with a set time and a person waiting.</li>
            <li><strong>A big step is coming.</strong>{" "}Year 10 class placement or senior maths choices can make a term of targeted help worth it.</li>
          </ul>
          <div className="pg-prose" style={{ marginTop: 18 }}>
            <p>
              Before paying for tutoring, ask the school what support already exists. Many secondary schools run homework clubs or maths help sessions, and teachers can often point you to the exact skills that need work.
            </p>
          </div>
        </div>
      </section>

      <section id="both" className="tb-section" aria-labelledby="h-both">
        <div className="tb-wrap">
          <h2 id="h-both" className="tb-h2 pg-h2">Using a tutor and an app together</h2>
          <div className="pg-prose">
            <p>It doesn&rsquo;t have to be one or the other. Each covers what the other can&rsquo;t:</p>
            <ul>
              <li>The <strong>tutor</strong>{" "}spends the hour re-teaching and diagnosing, not drilling questions your child could practise alone.</li>
              <li>The <strong>app</strong>{" "}handles practice on the other six days, on the exact questions they got wrong that week.</li>
              <li>Your child brings their saved mistakes to the lesson, so the tutor starts from real evidence rather than guessing.</li>
            </ul>
            <p>
              A common pattern is a tutor for a term while a big gap is closed, then stepping back to practice at home once your child is keeping up again. That can save a lot over a year of weekly lessons.
            </p>
          </div>
        </div>
      </section>

      <section id="checklist" className="tb-section" aria-labelledby="h-checklist">
        <div className="tb-wrap">
          <h2 id="h-checklist" className="tb-h2 pg-h2">Questions to ask before you spend anything</h2>
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
              <h3>Ask any tutor or app</h3>
              <ul>
                <li>Does it follow the Australian Curriculum for my child&rsquo;s year?</li>
                <li>How will I know if it&rsquo;s helping?</li>
                <li>What happens if we want to stop? Is there a lock-in?</li>
              </ul>
            </div>
          </div>
          <p className="pg-small">
            Whichever you choose, give it a fair trial of several weeks before judging it. The <Link href="/years">Years 7 to 10 guides</Link>{" "}show what your child is studying this year.
          </p>
        </div>
      </section>
    </GuideShell>
  );
}

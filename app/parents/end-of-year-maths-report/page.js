import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import ExamGenerator from "@/components/exam/ExamGenerator";
import { getExamCatalogue } from "@/lib/exam-bank";
import { pageMetadata } from "@/lib/parent-guides";

// Parent landing page for end-of-year school reports (Dec to Jan): what the
// maths grade means, then find the gaps with a free practice exam, and a
// four-week holiday plan. Built from the Nov 2026 parent research (a bad
// report is the most common trigger for getting help). Also the landing
// page for report-season ads and emails. State-neutral.

const PATH = "/parents/end-of-year-maths-report";
const TITLE = "Got the Maths Report? Close the Gaps Before Next Year (Years 7 to 10) | Tuterly";
const DESCRIPTION =
  "What your child's maths grade actually means, how to find the exact topics that cost marks with a free practice exam, and a four-week holiday plan so they start next year caught up. For parents of Years 7 to 10.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const GRADES = [
  ["A", "Outstanding or excellent achievement of the standard", "Keep it ticking over. A preview of next year's first topic is a good holiday goal."],
  ["B", "High or good achievement of the standard", "Usually one or two topics are holding them back from an A. Find those."],
  ["C", "Achieved the standard for the year", "Not a fail. Your child met the standard. Check the comments for topics that were shaky."],
  ["D", "Partial achievement of the standard", "Some of the year's skills aren't secure yet. These gaps tend to show up again next year."],
  ["E", "Limited or minimal achievement of the standard", "Several gaps, often including skills from earlier years. Worth a talk with the teacher early next term."],
];

const FAQS = [
  {
    q: "My child got a C in maths. Should I be worried?",
    a: "Not on its own. On the A to E scale most schools use, a C means your child achieved the standard for their year level. It's worth reading the comments and asking which topics were weakest, because a C can hide one or two shaky topics that will matter next year. The holidays are a good time to fix those.",
  },
  {
    q: "Is a D in maths bad?",
    a: "A D means partial achievement of the standard: some of the year's skills aren't secure yet. It's a reason to act, not to panic. Because maths builds on itself, the skills behind a D usually come up again next year, so finding and fixing them over the holidays makes Term 1 much easier. Talk to the teacher early next term too.",
  },
  {
    q: "The report doesn't say what they struggled with. How do I find out?",
    a: "Email the maths teacher before the end of term and ask which two topics cost the most marks. You can also have your child sit a free practice exam on this page: mark it with the worked solutions, and the topics where marks were lost are the ones to work on.",
  },
  {
    q: "How much maths should my child do over the summer holidays?",
    a: "A little, regularly. Twenty to thirty minutes on four or five days a week is plenty, and it's fine to take Christmas week off. Short sessions spread over several weeks work better than a big catch-up the week before school goes back.",
  },
  {
    q: "Should we get a tutor over the holidays?",
    a: "If your child is well behind or can't start most questions even with a worked example, a person who can re-teach the topic may be worth it. If the problem is a handful of topics they mostly understand but keep getting wrong, regular practice on those exact topics is often enough. Our guide to maths apps and tutoring covers how to tell the difference.",
  },
  {
    q: "Is the practice exam free?",
    a: "Yes. Enter your email to make a practice exam (one a day), with marks, a suggested time and worked solutions. Every topic also has a free 20-question test with an answer key, emailed to you.",
  },
];

const LINKS = [
  { href: "/end-of-year-maths-exams", label: "Free practice exams and topic tests, Years 7 to 10" },
  { href: "/parents/maths-app-vs-tutoring", label: "Maths help without the $100-an-hour tutor" },
  { href: "/parents/help-with-secondary-maths-homework", label: "How to help with maths homework" },
  { href: "/worksheets", label: "Free maths worksheets, Years 7 to 10" },
];

export default function Page() {
  const catalogue = getExamCatalogue();
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[
        { name: "Parents", path: "/parents" },
        { name: "The end-of-year maths report", path: PATH },
      ]}
      eyebrow="Parent guide · Years 7 to 10 maths"
      h1="Got the maths report? Here’s how to close the gaps before next year"
      lead="A C, a D or a comment like “needs to consolidate” tells you something isn’t right, but not what. Here’s how to find the exact topics that cost marks, fix them over the holidays in short sessions, and help your child start next year caught up."
      toc={[
        ["grades", "What the grade means"],
        ["gaps", "Step 1: find the gaps"],
        ["plan", "Step 2: a four-week plan"],
        ["calm", "Keeping it calm"],
        ["tuterly", "Where Tuterly fits"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Start next year caught up"
      ctaText="Tuterly turns every maths question your child gets wrong into a worked solution and fresh practice until it sticks. Join the early list for Years 7 to 10."
      placement="parents_eoy_report"
      faqs={FAQS}
      faqTitle="Maths report questions parents ask"
      links={LINKS}
      finalTitle="Fix this year’s gaps before they become next year’s"
      finalText="Tuterly saves every question your child gets wrong, shows the method step by step, and gives them fresh questions on the same skill until they can do it on their own. Each week you see what they mastered."
    >
      <section id="grades" className="tb-section" aria-labelledby="h-grades">
        <div className="tb-wrap">
          <h2 id="h-grades" className="tb-h2 pg-h2">What the maths grade actually means</h2>
          <p className="pg-intro">
            Most schools grade Years 7 to 10 maths on an A to E scale, measured against the Australian Curriculum standard for the year. The exact wording varies between states and schools, but the meaning is close to this:
          </p>
          <div className="pg-table">
            <table>
              <caption>A to E grades for Years 7 to 10 maths, and what to do next</caption>
              <thead>
                <tr>
                  <th scope="col">Grade</th>
                  <th scope="col">What it means</th>
                  <th scope="col">What to do over the holidays</th>
                </tr>
              </thead>
              <tbody>
                {GRADES.map(([g, means, next]) => (
                  <tr key={g}>
                    <th scope="row">{g}</th>
                    <td>{means}</td>
                    <td>{next}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pg-prose" style={{ marginTop: 18 }}>
            <p>
              <strong>The comments matter more than the letter.</strong> Look for the topics named in the teacher&rsquo;s comment and in any assessment breakdown. Phrases like &ldquo;needs to consolidate&rdquo;, &ldquo;developing&rdquo; or &ldquo;would benefit from further practice&rdquo; usually point to specific skills, not to your child&rsquo;s ability in maths overall.
            </p>
            <p>
              <strong>Why it&rsquo;s worth acting now.</strong> Maths builds on itself. Year 8 algebra leans on Year 7 negative numbers and fractions; Year 9 quadratics lean on Year 8 expanding. A gap left over the holidays tends to come back in the first topic of next year, when there&rsquo;s less time to fix it.
            </p>
          </div>
          <p className="pg-small">
            Grade descriptions are based on the A to E scales published by the <a href="https://www.education.act.gov.au/public-school-life/assessment_and_reporting/act-student-reporting">ACT Education Directorate</a> and the <a href="https://www.education.sa.gov.au/department/media-centre/our-news/what-does-my-childs-report-mean">SA Department for Education</a>. Some schools use words or a different scale; your child&rsquo;s school can tell you how theirs works.
          </p>
        </div>
      </section>

      <section id="gaps" className="tb-section" aria-labelledby="h-gaps">
        <div className="tb-wrap">
          <h2 id="h-gaps" className="tb-h2 pg-h2">Step 1: find the exact gaps</h2>
          <p className="pg-intro">
            Pick the year your child has just finished and tick all the topics (or the ones the report mentions). They sit it timed, with no notes, then mark it with the worked solutions. Every topic where marks were lost goes on a list. That list is the holiday plan.
          </p>
          <ExamGenerator catalogue={catalogue} initialYear="Year 8" placement="parents_eoy_report_exam" />
          <div className="pg-grid" style={{ marginTop: 22 }}>
            <div className="pg-box">
              <h3>Ask the teacher (before term ends)</h3>
              <ul>
                <li>Which two topics cost the most marks this year?</li>
                <li>Are there gaps from earlier years?</li>
                <li>What&rsquo;s the first maths topic next year?</li>
              </ul>
            </div>
            <div className="pg-box">
              <h3>Ask your child</h3>
              <ul>
                <li>Which topic felt hardest?</li>
                <li>Was there a test where you knew it but still lost marks?</li>
                <li>What would make maths feel easier next year?</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="plan" className="tb-section" aria-labelledby="h-plan">
        <div className="tb-wrap">
          <h2 id="h-plan" className="tb-h2 pg-h2">Step 2: a four-week holiday plan</h2>
          <p className="pg-intro">
            Twenty to thirty minutes, four or five days a week. Short, regular sessions spread over several weeks beat a big cram before school goes back, and it&rsquo;s fine to take Christmas week off.
          </p>
          <ol className="pg-steps">
            <li>
              <strong>Week 1: find the gaps</strong>
              Sit the practice exam above and list the topics where marks were lost. Pick the two or three that matter most (the ones named on the report, or the ones the teacher mentioned).
            </li>
            <li>
              <strong>Week 2: fix the biggest gap</strong>
              Do the free topic test on that topic. Read the worked solution for every wrong answer, then try a fresh question on the same idea the next day, without looking at the working first.
            </li>
            <li>
              <strong>Week 3: fix the next gap</strong>
              Same again for the second topic. Start each session by redoing two or three questions from last week, so the first fix doesn&rsquo;t fade.
            </li>
            <li>
              <strong>Week 4 (late January): get ahead</strong>
              Redo every question that was wrong over the holidays, mixed together. Then preview the first topic of next year, so day one isn&rsquo;t brand new.
            </li>
          </ol>
          <p className="pg-small">
            Topic tests for every year: <Link href="/end-of-year-maths-exams#year-7">Year 7</Link> · <Link href="/end-of-year-maths-exams#year-8">Year 8</Link> · <Link href="/end-of-year-maths-exams#year-9">Year 9</Link> · <Link href="/end-of-year-maths-exams#year-10">Year 10</Link>. What&rsquo;s coming next year: the <Link href="/years">Years 7 to 10 guides</Link>.
          </p>
        </div>
      </section>

      <section id="calm" className="tb-section" aria-labelledby="h-calm">
        <div className="tb-wrap">
          <h2 id="h-calm" className="tb-h2 pg-h2">Keeping it calm (and out of the holiday arguments)</h2>
          <p className="pg-intro">
            A disappointing report can knock a teenager&rsquo;s confidence, and holiday maths is an easy thing to fight about. A few things help:
          </p>
          <ul className="pg-checklist">
            <li><strong>Start with a quick win.</strong> Pick a topic they nearly have first. Getting questions right early makes the harder topics easier to face.</li>
            <li><strong>Let them mark their own work.</strong> Checking against the worked solutions keeps them in charge and keeps you out of the &ldquo;that&rsquo;s not how we do it&rdquo; argument.</li>
            <li><strong>Praise the fixes, not the score.</strong> &ldquo;You couldn&rsquo;t do these last week&rdquo; lands better than a percentage.</li>
            <li><strong>Agree on the time, not the amount.</strong> Twenty minutes after breakfast is easier to stick to than &ldquo;do some maths today&rdquo;.</li>
            <li><strong>Don&rsquo;t redo the whole year.</strong> Two or three topics, properly fixed, are worth more than a skim of everything.</li>
          </ul>
          <p className="pg-small">
            If you&rsquo;re not confident with the maths yourself, that&rsquo;s fine. Our <Link href="/parents/help-with-secondary-maths-homework">homework guide</Link> covers how to help without having to teach it.
          </p>
        </div>
      </section>

      <section id="tuterly" className="tb-section" aria-labelledby="h-tuterly">
        <div className="tb-wrap">
          <h2 id="h-tuterly" className="tb-h2 pg-h2">Where Tuterly fits</h2>
          <div className="pg-prose">
            <p>
              Tuterly is a maths study app for Years 7 to 10, built by Bayside Academics, a Melbourne tutoring business. It does the fixing part of this plan for your child, every day:
            </p>
            <ul>
              <li><strong>Snap the questions they lost marks on,</strong> from a marked test or homework. Each one is saved with a step-by-step worked solution.</li>
              <li><strong>Fresh questions on the same skill,</strong> so they practise the idea, not memorise one answer.</li>
              <li><strong>Mistakes come back until they&rsquo;re mastered,</strong> so a fix from week one is still there in week four.</li>
              <li><strong>A test on any topic in their year</strong> before school assessments, with anything they get wrong going straight into their practice.</li>
              <li><strong>A weekly summary for you</strong> showing the questions they added and mastered, plus their test scores.</li>
            </ul>
            <p>
              It isn&rsquo;t an answer app. Seeing the solution is the start: your child then has to get fresh questions right on their own.
            </p>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}

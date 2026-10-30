import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { PARENT_GUIDES, YEAR_HUBS, pageMetadata } from "@/lib/parent-guides";

const PATH = "/years";
const TITLE = "Years 7 to 10 Maths: Parent Guides by Year Level | Tuterly";
const DESCRIPTION =
  "Parent guides to Year 7, 8, 9 and 10 maths in Australia: what each year covers under the Australian Curriculum, where students lose marks, how to help at home, and free worksheets.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, type: "website" });

const FAQS = [
  {
    q: "Do all Australian schools teach the same maths topics in each year?",
    a: "Most states base their maths courses on the Australian Curriculum, and the Victorian Curriculum 2.0 follows it closely. NSW has its own syllabus, and individual schools choose the order of topics within a year. The broad content for each year is similar, but your child's school course outline is the best guide to what comes when.",
  },
  {
    q: "Which year guide should I read if my child is behind?",
    a: "Start with the guide for the year your child is in, then look at the year below. Many Year 9 difficulties, for example, trace back to Year 8 algebra or Year 7 fractions and negative numbers. The common mistakes section on each guide helps you spot which earlier skill is missing.",
  },
  {
    q: "Is 10A the same as Year 10 maths?",
    a: "10A is extra content offered alongside Year 10 in the Australian Curriculum and the Victorian Curriculum, including surds, logarithms and harder algebra. Not every student takes it, and schools run it differently. The Year 10 guide covers both.",
  },
  {
    q: "Are the worksheets on these pages free?",
    a: "Yes. Each year guide links to free printable worksheets on the topics for that year, with answers. They suit a quick check of one skill or extra practice before a test.",
  },
];

const LINKS = [
  { href: "/worksheets", label: "Free maths worksheets, Years 7 to 10", note: "(printable, with answers)" },
  { href: "/formula-sheets", label: "Maths formula sheets by year level" },
  { href: "/maths-exam-preparation", label: "Maths exam preparation, Years 7 to 10" },
  { href: "/naplan/year-7-numeracy", label: "Year 7 NAPLAN Numeracy practice" },
  { href: "/naplan/year-9-numeracy", label: "Year 9 NAPLAN Numeracy practice" },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Years", path: PATH }]}
      eyebrow="Years 7 to 10 · Australian Curriculum maths"
      h1="Years 7 to 10 maths: parent guides by year level"
      lead="Secondary maths changes a lot between Year 7 and Year 10. These guides explain, year by year, what your child is learning, where marks usually go, and what actually helps at home, whether or not you remember the maths yourself."
      toc={[
        ["year-guides", "Year guides"],
        ["inside", "What each guide covers"],
        ["decisions", "Parent decision guides"],
        ["app", "How Tuterly fits"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Turn maths mistakes into marks"
      ctaText="Your child snaps the maths questions they get wrong. Tuterly saves each one with a worked solution, then gives fresh questions on the same skill until it sticks."
      placement="years_index"
      faqs={FAQS}
      faqTitle="Years 7 to 10 maths: questions parents ask"
      pageType="CollectionPage"
      parts={[...YEAR_HUBS, ...PARENT_GUIDES]}
      showYearHubs={false}
      links={LINKS}
      finalTitle="Make every maths mistake count"
      finalText="Each wrong question your child snaps becomes a worked solution, fresh practice on the same skill and, before a test, a practice test built from their own mistakes."
    >
      <section id="year-guides" className="tb-section" aria-labelledby="h-year-guides">
        <div className="tb-wrap">
          <h2 id="h-year-guides" className="tb-h2 pg-h2">Choose a year level</h2>
          <p className="pg-intro">Each guide is written for parents of students in that year. Pick your child&rsquo;s current year, or the year below if they are finding things hard.</p>
          <div className="pg-cards">
            {YEAR_HUBS.map((h) => (
              <Link key={h.href} href={h.href} className="pg-card">
                <span className="pg-card__k">{`Year ${h.year}`}</span>
                <span className="pg-card__t">{`${h.title}: a guide for parents`}</span>
                <span className="pg-card__x">{h.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="inside" className="tb-section" aria-labelledby="h-inside">
        <div className="tb-wrap">
          <h2 id="h-inside" className="tb-h2 pg-h2">What each year guide covers</h2>
          <div className="pg-grid">
            <div className="pg-box">
              <h3>A topic map for the year</h3>
              <p>The year&rsquo;s maths grouped by Australian Curriculum strand: number, algebra, measurement, space, statistics and probability, with links to free worksheets for each topic.</p>
            </div>
            <div className="pg-box">
              <h3>Where students lose marks</h3>
              <p>The errors teachers see again and again at that year level, such as sign slips with negative numbers or a missing middle term when expanding, with an example of each.</p>
            </div>
            <div className="pg-box">
              <h3>How parents can help</h3>
              <p>Practical things to do at home that do not depend on remembering the maths: routines, the right questions to ask, and what to do with a marked test.</p>
            </div>
            <div className="pg-box">
              <h3>How the app fits</h3>
              <p>How snapping a wrong question turns it into a worked solution and fresh practice, and where an app is not the right tool on its own.</p>
            </div>
          </div>
          <p className="pg-small">
            The topic maps follow the Australian Curriculum v9 Mathematics. The Victorian Curriculum 2.0 follows it closely; NSW and some other states and schools order topics differently. For example, Pythagoras is usually a Year 8 or Year 9 topic and right-angled trigonometry usually starts in Year 9, but your child&rsquo;s school may teach them a little earlier or later.
          </p>
        </div>
      </section>

      <section id="decisions" className="tb-section" aria-labelledby="h-decisions">
        <div className="tb-wrap">
          <h2 id="h-decisions" className="tb-h2 pg-h2">Guides for the decisions parents make</h2>
          <p className="pg-intro">Beyond what is taught each year, most parents face the same three questions: how much to help with homework, whether to use an app or a tutor, and how to prepare for tests.</p>
          <div className="pg-cards">
            {PARENT_GUIDES.map((g) => (
              <Link key={g.href} href={g.href} className="pg-card">
                <span className="pg-card__k">Parent guide</span>
                <span className="pg-card__t">{g.title}</span>
                <span className="pg-card__x">{g.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="app" className="tb-section" aria-labelledby="h-app">
        <div className="tb-wrap">
          <h2 id="h-app" className="tb-h2 pg-h2">How Tuterly fits alongside school maths</h2>
          <div className="pg-prose">
            <p>
              Tuterly is a study app for Years 7 to 10 maths, designed by Australian educators at Bayside Academics. It covers the same maths as the Australian Curriculum. It does not replace your child&rsquo;s teacher or textbook. It works on the part of learning that is easiest to skip: going back to the questions they got wrong.
            </p>
          </div>
          <ol className="pg-steps" style={{ marginTop: 18 }}>
            <li><strong>Snap the wrong question</strong>From homework, a worksheet or a marked test. It is saved with a step-by-step worked solution.</li>
            <li><strong>Practise a fresh version</strong>New questions on the same skill, so your child practises the step that went wrong rather than memorising one answer.</li>
            <li><strong>Master it</strong>Questions come back until they are right, so an early-term mistake does not reappear in the exam.</li>
            <li><strong>Test from mistakes</strong>Before a topic test, Tuterly builds a practice test from your child&rsquo;s own mistakes.</li>
          </ol>
          <p className="pg-small">
            See how it works on <Link href="/features/snap-a-question">snap a question</Link> and <Link href="/features/test-any-topic">test any topic</Link>.
          </p>
        </div>
      </section>
    </GuideShell>
  );
}

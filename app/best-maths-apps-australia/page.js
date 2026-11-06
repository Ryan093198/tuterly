import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import { PLUS_PRICES } from "@/lib/study-launch";

// "Best maths apps" for Years 7 to 10 in Australia ("maths app" 590 a
// month, "mathematics app" 590, "free maths apps" 90, "best maths apps" 50;
// Google's results are weak and dated, Nov 2026). Replaces the blog post
// /learn/best-maths-apps-years-7-10-australia (redirected here).
//
// Ryan's message (6 Nov 2026): Tuterly is different because it gives the
// worked solution AND more questions on the ones the student doesn't
// understand, all tied to the Australian Curriculum with tests and notes.
// Other apps here also follow the curriculum, so the claim is the
// combination, never "no other app does this". Competitor facts are what
// their own sites said when checked (Oct to Nov 2026); no absolutes.

const PATH = "/best-maths-apps-australia";
const TITLE = "Best Maths Apps in Australia (2026): Years 7 to 10, Compared | Tuterly";
const DESCRIPTION =
  "An honest comparison of maths apps for Australian Years 7 to 10 students: what each one does, what it costs, which curriculum it follows, and which suits your child. Includes Mathspace, Atomi, Edrolo, Photomath, Khan Academy and Tuterly.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const WEEK = PLUS_PRICES.week.now;
const MONTH = PLUS_PRICES.month.now;

const APPS = [
  ["Mathspace", "Free step-by-step practice", "Free learner account", "iPad app and web"],
  ["Atomi", "Video lessons for every high school topic", "$59.99 a month or $470 a year", "Web app"],
  ["Edrolo", "A full Victorian Curriculum course", "$150 per year level, or $400 for Years 7 to 10", "Browser"],
  ["StudyPug", "Short video lessons with practice", "Varies by plan", "iPhone, Android, web"],
  ["Mathletics", "Younger secondary students who like games", "Not published", "iPhone, Android, web"],
  ["IXL", "Lots of skills practice by year level", "From $15.95", "iPhone, web"],
  ["Maths Pathway Homeschool", "Homeschooling families", "$29 a month or $299 a year", "Web"],
  ["Tuterly", "Fixing the questions your child gets wrong", `${WEEK} a week or ${MONTH} a month`, "iPhone, Android coming soon"],
  ["Photomath", "Checking working on one problem", "Free, Plus from $14.99", "iPhone, Android"],
  ["Khan Academy", "Free videos and practice (US curriculum)", "Free", "iPhone, Android, web"],
];

const REVIEWS = [
  {
    name: "Mathspace",
    text: "An adaptive practice platform with step-by-step feedback: students write each line of working and get help at the step where they go wrong. Families can sign up for a free learner account. Mathspace says its content is mapped to the Australian Curriculum and to state curricula for Years 3 to 12, and it publishes Year 7 to 10 textbooks for the Victorian Curriculum 2.0.",
    note: "It runs in a web browser and has an iPad app. We couldn't find an Android app.",
  },
  {
    name: "Atomi",
    text: "Built around short videos, interactive lessons and quizzes, mostly for high school, with separate Years 7 to 10 maths courses for each state, including Victoria. There's a free trial with no time limit, with some lessons locked.",
    note: "At $59.99 a month or $470 a year per student, it's the most expensive self-study option here, and yearly plans can only be cancelled at the end of the year. The \"app\" is a web app you install from your browser.",
  },
  {
    name: "Edrolo",
    text: "Best known for VCE, Edrolo also sells Years 7 to 10 maths courses: video lessons, worked examples and practice questions, with versions for the Victorian Curriculum, Australian Curriculum 9.0 and NSW. It costs $150 per year level, or $400 for the Years 7 to 10 bundle, for 12 months' access.",
    note: "It runs in a browser, with a laptop and Chrome recommended. We didn't find a phone app.",
  },
  {
    name: "StudyPug",
    text: "Short video lessons, practice problems and a photo search, from Foundation to university, and it says it's aligned to the Australian Curriculum. A family plan covers up to five children.",
    note: "The prices on its website and in the App Store didn't match when we checked, so look at the price at checkout.",
  },
  {
    name: "Mathletics",
    text: "A gamified practice platform for ages 5 to 16, with home subscriptions billed monthly or yearly. It says it's aligned with the Australian and state curricula.",
    note: "Home prices aren't on a public page, and the 14-day trial needs a credit card. It suits younger secondary students more than Years 9 and 10.",
  },
  {
    name: "IXL",
    text: "A very large bank of skills practice questions from preschool to Year 12, with its alignment to the Australian Curriculum version 9.0 listed by year level. Family memberships start from $15.95.",
    note: "It's mainly practice questions rather than teaching.",
  },
  {
    name: "Maths Pathway Homeschool",
    text: "Starts with a diagnostic test and builds a personalised path through video and worksheet modules for Years 1 to 10. It costs $29 a month or $299 a year per child, with a two-week free trial.",
    note: "It's marketed to homeschooling families. Schools buy Maths Pathway separately.",
  },
  {
    name: "Photomath",
    text: "Now owned by Google, Photomath solves a problem your child photographs and shows the steps, from primary maths to calculus. The step-by-step explanations are in the free version.",
    note: "It explains one problem at a time and doesn't follow a year-level course or curriculum. It's easy to use it to get answers rather than learn the method, so it works best for checking working after an honest attempt.",
  },
  {
    name: "Khan Academy",
    text: "Free, from a non-profit, with videos and practice questions across all of school maths.",
    note: "Its courses follow the US curriculum. We didn't find alignment to the Australian or Victorian Curriculum, so topics and order won't always match your child's class.",
  },
];

const FAQS = [
  {
    q: "What is the best maths app in Australia?",
    a: "It depends on what your child needs. For free step-by-step practice, Mathspace. For video lessons on every high school topic, Atomi or Edrolo. For fixing the questions your child keeps getting wrong, with worked solutions and fresh practice tied to the Australian Curriculum, Tuterly (our app). If a whole topic needs re-teaching by a person, a tutor.",
  },
  {
    q: "Is there a free maths app that follows the Australian Curriculum?",
    a: "Mathspace has a free learner account and says its content is mapped to the Australian Curriculum. Khan Academy is free but follows the US curriculum. Tuterly's website also has free topic tests, practice exams and worksheets for every Year 7 to 10 topic.",
  },
  {
    q: "Which maths apps follow the Victorian Curriculum?",
    a: "Mathspace publishes Victorian Curriculum 2.0 textbooks for Years 7 to 10, Atomi and Edrolo have Victorian versions of their courses, and Tuterly follows the Victorian Curriculum 2.0 and Australian Curriculum v9 for Years 7 to 10, including 10A.",
  },
  {
    q: "Is Photomath cheating?",
    a: "It can be, if it's used to copy answers. Photomath is most useful for checking working after an honest attempt. Tuterly takes a different approach: the worked solution is hidden until your child has tried again, and then they have to get fresh questions on the same skill right on their own.",
  },
  {
    q: "What makes Tuterly different from other maths apps?",
    a: "It starts from the questions your child actually got wrong, at school or in its own topic tests. Each one gets a detailed worked solution, then new questions on the same skill (different questions, not just new numbers) until it's mastered. It's built around the Australian Curriculum for Years 7 to 10, with topic tests and study notes, by Bayside Academics, a Melbourne tutoring business.",
  },
];

const LINKS = [
  { href: "/photomath-alternative", label: "Photomath alternative" },
  { href: "/mathspace-alternative", label: "Mathspace alternative" },
  { href: "/parents/maths-app-vs-tutoring", label: "Maths app or tutor?" },
  { href: "/end-of-year-maths-exams", label: "Free practice exams and topic tests" },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[
        { name: "Parents", path: "/parents" },
        { name: "Best maths apps in Australia", path: PATH },
      ]}
      eyebrow="Compared · Years 7 to 10 maths · Australia"
      h1="The best maths apps for Years 7 to 10 in Australia (2026)"
      lead="Most maths apps say they’re “aligned to the curriculum”. For a parent of a Year 7 to 10 student, a few questions matter more than the marketing: does it follow what your child’s class is doing, does it make them do the work, what does it cost, and what does your child actually do in it each day?"
      quickAnswer="For free step-by-step practice, Mathspace. For video lessons on every high school topic, Atomi or Edrolo. For checking working on one problem, Photomath. For fixing the questions your child keeps getting wrong, with detailed worked solutions, fresh questions on the same skill, and Australian Curriculum topic tests and notes, Tuterly. If a whole topic needs re-teaching by a person, a tutor."
      toc={[
        ["compare", "The short version"],
        ["matters", "What actually helps"],
        ["tuterly", "How Tuterly is different"],
        ["apps", "Each app reviewed"],
        ["choose", "How to choose"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="The maths app that fixes their mistakes"
      ctaText="Snap the question they got wrong. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until it’s mastered. Australian Curriculum, Years 7 to 10."
      placement="best_maths_apps"
      faqs={FAQS}
      faqTitle="Maths apps: questions parents ask"
      links={LINKS}
      finalTitle="Worked solutions, then the practice that fixes it"
      finalText="Tuterly starts from the questions your child gets wrong, explains each one step by step, and keeps giving fresh questions on that skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="compare" className="tb-section" aria-labelledby="h-compare">
        <div className="tb-wrap">
          <h2 id="h-compare" className="tb-h2 pg-h2">The short version</h2>
          <div className="pg-table">
            <table>
              <caption>Maths apps for Australian Years 7 to 10 students, prices in AUD (checked October to November 2026)</caption>
              <thead>
                <tr>
                  <th scope="col">App</th>
                  <th scope="col">Best for</th>
                  <th scope="col">Price</th>
                  <th scope="col">Devices</th>
                </tr>
              </thead>
              <tbody>
                {APPS.map(([name, best, price, devices]) => (
                  <tr key={name} className={name === "Tuterly" ? "pg-row-hl" : undefined}>
                    <th scope="row">{name}</th>
                    <td>{best}</td>
                    <td>{price}</td>
                    <td>{devices}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pg-small">
            We checked each app on its own website or app store listing. Prices change, so confirm at checkout. Tuterly is our app: we&rsquo;ve said plainly what it does and doesn&rsquo;t do, and tried to be as fair to the others as we&rsquo;d want them to be to us.
          </p>
        </div>
      </section>

      <section id="matters" className="tb-section" aria-labelledby="h-matters">
        <div className="tb-wrap">
          <h2 id="h-matters" className="tb-h2 pg-h2">What actually makes a maths app help</h2>
          <div className="pg-grid">
            <div className="pg-box">
              <h3>It matches their class</h3>
              <p>Year-level topics from the Australian Curriculum, so practice lines up with this term&rsquo;s tests. A US-curriculum app often won&rsquo;t.</p>
            </div>
            <div className="pg-box">
              <h3>It makes them do the work</h3>
              <p>An answer on its own doesn&rsquo;t stick. The method needs explaining, and then your child needs to do fresh questions without help.</p>
            </div>
            <div className="pg-box">
              <h3>It works on what they get wrong</h3>
              <p>Most marks are lost on a handful of skills. Practice that keeps coming back to those beats working through a whole course.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tuterly" className="tb-section" aria-labelledby="h-tuterly">
        <div className="tb-wrap">
          <h2 id="h-tuterly" className="tb-h2 pg-h2">How Tuterly is different</h2>
          <p className="pg-intro">
            Tuterly is our app, made by the educators at Bayside Academics, a Melbourne tutoring business, for Years 7 to 10 maths. Several apps here follow the Australian Curriculum. What&rsquo;s different is where Tuterly starts: with the questions your child got wrong.
          </p>
          <ol className="pg-steps">
            <li><strong>Snap the question they got wrong</strong>From homework or a marked school test, or upload the whole test and the questions marked wrong are picked out.</li>
            <li><strong>A detailed worked solution</strong>Every step written out and explained, hidden at first so they can try again before looking.</li>
            <li><strong>More questions on what they don&rsquo;t understand</strong>Fresh questions on the same skill, genuinely different, not just new numbers, each one checked a second time before your child sees it.</li>
            <li><strong>Until it&rsquo;s mastered</strong>Questions keep coming back until they get them right on their own. &ldquo;Fix my mistakes&rdquo; drills the ones still to fix.</li>
          </ol>
          <div className="pg-grid" style={{ marginTop: 18 }}>
            <div className="pg-box">
              <h3>Built around the Australian Curriculum</h3>
              <p>Every topic for Years 7 to 10, including 10A, following the Victorian Curriculum 2.0 and Australian Curriculum v9.</p>
            </div>
            <div className="pg-box">
              <h3>Topic tests and study notes</h3>
              <p>A test on any topic in their year before a school assessment, and study notes on a whole topic or just the parts they find hard.</p>
            </div>
            <div className="pg-box">
              <h3>Free practice exams too</h3>
              <p>On this website: a <Link href="/end-of-year-maths-exams">practice exam</Link>{" "}builder and a free test on every topic, with answers.</p>
            </div>
          </div>
          <p className="pg-small">
            Good to know: Tuterly covers Years 7 to 10 maths only, not primary, VCE or other subjects. It&rsquo;s coming soon on iPhone, with Android soon after. {WEEK} a week or {MONTH} a month, with a 7-day free trial on the monthly plan.
          </p>
        </div>
      </section>

      <section id="apps" className="tb-section" aria-labelledby="h-apps">
        <div className="tb-wrap">
          <h2 id="h-apps" className="tb-h2 pg-h2">Each app, reviewed</h2>
          <div className="pg-prose">
            {REVIEWS.map((r) => (
              <div key={r.name} style={{ marginBottom: 22 }}>
                <h3 className="pg-h3">{r.name}</h3>
                <p>{r.text}</p>
                <p><strong>Good to know:</strong>{" "}{r.note}</p>
              </div>
            ))}
            <h3 className="pg-h3">Two that didn&rsquo;t make the list</h3>
            <p>
              <strong>Education Perfect</strong>{" "}is widely used in Victorian schools, but families can no longer buy it: its home subscription ended in April 2024. If your child&rsquo;s school uses it, ask the school for a login.{" "}
              <strong>MathDingo</strong>{" "}is a low-cost Australian practice app ($49.99 a year), but it goes up to Year 9 only.
            </p>
            <p>
              Want a person rather than an app? See our <Link href="/parents/cluey-learning-review">Cluey Learning review</Link>{" "}and our guide to <Link href="/parents/maths-app-vs-tutoring">tutoring costs</Link>.
            </p>
          </div>
        </div>
      </section>

      <section id="choose" className="tb-section" aria-labelledby="h-choose">
        <div className="tb-wrap">
          <h2 id="h-choose" className="tb-h2 pg-h2">How to choose</h2>
          <ul className="pg-checklist">
            <li><strong>If your child needs the topic taught again,</strong>{" "}a video course like Atomi or Edrolo fills that gap.</li>
            <li><strong>If they understand it in class but lose marks in tests,</strong>{" "}more lessons usually won&rsquo;t fix it. Practice on the questions they got wrong will. That&rsquo;s what Tuterly is built for, and Mathspace&rsquo;s free step-by-step practice helps too.</li>
            <li><strong>If budget is tight,</strong>{" "}Mathspace and Khan Academy are free, and our <Link href="/worksheets">worksheets</Link>{" "}and <Link href="/teachers">topic tests</Link>{" "}are free for every Year 7 to 10 topic.</li>
            <li><strong>If they&rsquo;re stuck and losing confidence,</strong>{" "}a tutor, online or in person, may be worth more than any app.</li>
          </ul>
          <p className="pg-small">
            Whatever you choose, check it covers your child&rsquo;s year level and state, and use the free trial for a real week of homework before you pay.
          </p>
          <p className="pg-small">
            Tuterly isn&rsquo;t affiliated with Mathspace, Atomi, Edrolo, StudyPug, Mathletics, IXL, Maths Pathway, Photomath, Google, Khan Academy, Education Perfect, MathDingo or Cluey Learning. All names are trademarks of their owners.
          </p>
        </div>
      </section>
    </GuideShell>
  );
}

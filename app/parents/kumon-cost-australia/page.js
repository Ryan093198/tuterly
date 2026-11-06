import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import { PLUS_PRICES } from "@/lib/study-launch";

// Kumon cost and "is it worth it" for Years 7 to 10 ("kumon cost" ~390 a
// month, "kumon reviews" 140, "kumon fees australia" 70, "is kumon worth
// it" 70; peaks in January). Fees from Kumon Australia's own fee page and
// brochure (checked 6 Nov 2026). Fair to Kumon: says plainly who it suits.
// Tuterly's price: current weekly and monthly only (Ryan, 6 Nov 2026).

const PATH = "/parents/kumon-cost-australia";
const TITLE = "Kumon Cost in Australia (2026): Fees, and Is It Worth It for High School? | Tuterly";
const DESCRIPTION =
  "Kumon costs $160 a month per subject in Australia, plus a $100 enrolment fee. What you get, who it suits, and how it compares with a tutor or a maths app for Years 7 to 10.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const KUMON_FEES = "https://au.kumonglobal.com/monthly-fee/";
const KUMON_BROCHURE = "https://au.kumonglobal.com/wp-content/uploads/2025/01/Kumon-brochure.pdf";
const WEEK = PLUS_PRICES.week.now;
const MONTH = PLUS_PRICES.month.now;

const FAQS = [
  {
    q: "How much does Kumon cost per month in Australia?",
    a: "$160 a month per subject, including GST, so $320 a month for maths and English. There's also a one-off $100 enrolment fee. The diagnostic test before enrolling is free.",
  },
  {
    q: "How much does a year of Kumon maths cost?",
    a: "$1,920 a year in tuition for one subject ($160 × 12), plus the $100 enrolment fee in the first year, so $2,020 in total. Fees are charged monthly.",
  },
  {
    q: "Does Kumon follow the Australian Curriculum?",
    a: "No. Kumon follows its own sequence of worksheets, from counting through to calculus, and students move through it at their own pace rather than by school year. That's a strength for building fluency, but it means the worksheets often won't match what your child is doing in class this term.",
  },
  {
    q: "Is Kumon worth it for a high school student?",
    a: "It can be, for a student who needs to build calculation speed and accuracy and will stick with a daily routine. It's often a weaker fit for a Year 7 to 10 student who is struggling with this term's topics, such as algebra or trigonometry, because the worksheets follow Kumon's sequence rather than the school's.",
  },
  {
    q: "Are Kumon fees refundable?",
    a: "Kumon Australia says enrolment and tuition fees are non-refundable unless it agrees otherwise. A re-enrolment fee applies if a child is away for more than three months. Check with your local centre before enrolling.",
  },
  {
    q: "Can my child do Kumon and use Tuterly as well?",
    a: "Yes. They do different jobs: Kumon builds calculation fluency through its own worksheets, and Tuterly gives practice on the school topics your child is getting wrong right now, with detailed worked solutions.",
  },
];

const LINKS = [
  { href: KUMON_FEES, label: "Kumon Australia: monthly fee" },
  { href: "/parents/maths-app-vs-tutoring", label: "Maths help without the $100-an-hour tutor" },
  { href: "/cluey-alternative", label: "Cluey alternative" },
  { href: "/end-of-year-maths-exams", label: "Free topic tests, Years 7 to 10" },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[
        { name: "Parents", path: "/parents" },
        { name: "Kumon cost in Australia", path: PATH },
      ]}
      eyebrow="Parent guide · Years 7 to 10 maths"
      h1="Kumon cost in Australia, and is it worth it for high school?"
      lead="Kumon is one of the best-known maths programs in Australia, and a regular topic on parent forums. Here’s exactly what it costs, how it works, who it suits, and how it compares with a tutor or a maths app for a Year 7 to 10 student."
      quickAnswer="Kumon costs $160 a month per subject in Australia, plus a one-off $100 enrolment fee (GST included): $1,920 a year for maths alone. It suits students who need daily practice to build calculation speed and will stick to a routine. For a Year 7 to 10 student struggling with this term’s school topics, it’s often not the best fit, because Kumon follows its own sequence of worksheets rather than the school curriculum."
      toc={[
        ["fees", "Kumon fees"],
        ["how", "How Kumon works"],
        ["suits", "Who it suits"],
        ["compare", "Kumon vs tutor vs app"],
        ["tuterly", "Where Tuterly fits"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Practice on the topics they have at school"
      ctaText="Tuterly turns the maths questions your child gets wrong at school into detailed worked solutions and fresh practice until it sticks. Years 7 to 10."
      placement="parents_kumon"
      faqs={FAQS}
      faqTitle="Kumon: questions parents ask"
      links={LINKS}
      finalTitle="Practice that follows their school maths"
      finalText="Tuterly works from the questions your child actually gets wrong in class, homework and tests, explains each one step by step, and gives fresh practice until it’s mastered."
    >
      <section id="fees" className="tb-section" aria-labelledby="h-fees">
        <div className="tb-wrap">
          <h2 id="h-fees" className="tb-h2 pg-h2">Kumon fees in Australia (2026)</h2>
          <div className="pg-table">
            <table>
              <caption>Kumon Australia fees, including GST</caption>
              <thead>
                <tr>
                  <th scope="col">Fee</th>
                  <th scope="col">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr><th scope="row">Enrolment (one-off)</th><td>$100</td></tr>
                <tr><th scope="row">Tuition, one subject</th><td>$160 a month</td></tr>
                <tr><th scope="row">Tuition, maths and English</th><td>$320 a month</td></tr>
                <tr><th scope="row">One year of maths</th><td>$1,920, or $2,020 in the first year with enrolment</td></tr>
                <tr><th scope="row">Diagnostic test</th><td>Free</td></tr>
              </tbody>
            </table>
          </div>
          <p className="pg-small">
            Fees from <a href={KUMON_FEES}>Kumon Australia&rsquo;s fee page</a>, November 2026. Kumon says fees are non-refundable unless it agrees otherwise, and a re-enrolment fee applies after more than three months away. Check with your local centre for current fees.
          </p>
        </div>
      </section>

      <section id="how" className="tb-section" aria-labelledby="h-how">
        <div className="tb-wrap">
          <h2 id="h-how" className="tb-h2 pg-h2">How Kumon works</h2>
          <div className="pg-grid">
            <div className="pg-box">
              <h3>Daily worksheets</h3>
              <p>Students do worksheets every day, ideally no more than 30 minutes per subject, mostly at home.</p>
            </div>
            <div className="pg-box">
              <h3>A weekly class</h3>
              <p>Once a week, in a centre or online, students hand in homework, do worksheets with the instructor and correct their mistakes.</p>
            </div>
            <div className="pg-box">
              <h3>Its own sequence</h3>
              <p>Kumon&rsquo;s maths runs from counting to calculus. Students start at an easy level to build speed and confidence, and move on at their own pace, not by school year.</p>
            </div>
          </div>
          <p className="pg-small">
            From the <a href={KUMON_BROCHURE}>Kumon Australia brochure</a>.
          </p>
        </div>
      </section>

      <section id="suits" className="tb-section" aria-labelledby="h-suits">
        <div className="tb-wrap">
          <h2 id="h-suits" className="tb-h2 pg-h2">Is Kumon worth it? Who it suits</h2>
          <div className="pg-grid">
            <div className="pg-box">
              <h3>Kumon tends to suit students who&hellip;</h3>
              <ul>
                <li>Need faster, more accurate calculation</li>
                <li>Will do a little every day without a fight</li>
                <li>Like working through levels on their own</li>
                <li>Want to work ahead of their school year</li>
              </ul>
            </div>
            <div className="pg-box">
              <h3>It&rsquo;s often a weaker fit for students who&hellip;</h3>
              <ul>
                <li>Are struggling with this term&rsquo;s topics, like algebra or trigonometry</li>
                <li>Need a new idea explained, not just more practice</li>
                <li>Find repetition frustrating (a common theme in <a href="https://www.productreview.com.au/listings/kumon">parent reviews</a>)</li>
                <li>Already have a heavy load of homework and sport</li>
              </ul>
            </div>
          </div>
          <div className="pg-note" style={{ marginTop: 18 }}>
            <strong>The key question for high school:</strong>{" "}is your child&rsquo;s problem speed and fluency with numbers, or the topics they&rsquo;re doing at school right now? Kumon is built for the first. For the second, help that follows the school&rsquo;s topics usually works better.
          </div>
        </div>
      </section>

      <section id="compare" className="tb-section" aria-labelledby="h-compare">
        <div className="tb-wrap">
          <h2 id="h-compare" className="tb-h2 pg-h2">Kumon vs a tutor vs a maths app</h2>
          <div className="pg-table">
            <table>
              <caption>Kumon, tutoring and Tuterly for a Year 7 to 10 student</caption>
              <thead>
                <tr>
                  <th scope="col">Option</th>
                  <th scope="col">Cost</th>
                  <th scope="col">Follows school topics?</th>
                  <th scope="col">How new ideas are explained</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Kumon</th>
                  <td>$160 a month per subject, plus $100 to enrol</td>
                  <td>No, its own sequence</td>
                  <td>Worksheets, with an instructor once a week</td>
                </tr>
                <tr>
                  <th scope="row">Private tutor</th>
                  <td>$100 to $120 an hour</td>
                  <td>Yes</td>
                  <td>A person, once a week</td>
                </tr>
                <tr>
                  <th scope="row">Online tutoring company</th>
                  <td>From $65 to $70 an hour</td>
                  <td>Yes</td>
                  <td>A person online, once a week</td>
                </tr>
                <tr className="pg-row-hl">
                  <th scope="row">Tuterly</th>
                  <td>{WEEK} a week or {MONTH} a month</td>
                  <td>Yes, from the questions they get wrong at school</td>
                  <td>Detailed, step-by-step worked solutions, any time</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="pg-small">
            Tutoring prices are typical published rates in late 2026; see our guide to <Link href="/parents/maths-app-vs-tutoring">tutoring costs</Link>.
          </p>
        </div>
      </section>

      <section id="tuterly" className="tb-section" aria-labelledby="h-tuterly">
        <div className="tb-wrap">
          <h2 id="h-tuterly" className="tb-h2 pg-h2">Where Tuterly fits</h2>
          <div className="pg-prose">
            <p>
              Tuterly is a maths study app for Years 7 to 10, built by Bayside Academics, a Melbourne tutoring business. Instead of a fixed sequence of worksheets, it starts from your child&rsquo;s own school maths:
            </p>
            <ul>
              <li><strong>Snap the question they got wrong,</strong>{" "}from homework, class work or a marked test.</li>
              <li><strong>Detailed worked solutions,</strong>{" "}with every step explained.</li>
              <li><strong>Fresh questions on the same skill</strong>{" "}until they get them right on their own, with mistakes coming back until they&rsquo;re mastered.</li>
              <li><strong>A test on any topic in their year</strong>{" "}before a school assessment.</li>
              <li><strong>A weekly summary for you</strong>{" "}of what they added and mastered.</li>
            </ul>
            <p>
              If you&rsquo;re weighing up Kumon for a high schooler, try a free <Link href="/end-of-year-maths-exams">topic test</Link>{" "}first. It shows whether the marks are going on basic calculation, which Kumon targets, or on this year&rsquo;s topics.
            </p>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}

import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import { PLUS_PRICES } from "@/lib/study-launch";

// An honest Cluey Learning review for parents still deciding ("cluey
// learning reviews" ~480 a month, 880 in Feb). Facts from Cluey's own
// pages and ProductReview.com.au (checked 6 Nov 2026). Fair to Cluey: the
// tutors get good scores; the complaints are mostly billing, cancellations
// and service. Paraphrase reviews; no long quotes. The /cluey-alternative
// page is for people already looking to switch.

const PATH = "/parents/cluey-learning-review";
const TITLE = "Cluey Learning Review (2026): Cost, Parent Reviews and Who It Suits | Tuterly";
const DESCRIPTION =
  "An honest Cluey Learning review for parents: how Cluey works, what it costs, what parents say in 933 reviews (3.6 out of 5), the questions to ask before you sign up, and the alternatives for Years 7 to 10 maths.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const PR = "https://www.productreview.com.au/listings/cluey-learning";
const WEEK = PLUS_PRICES.week.now;
const MONTH = PLUS_PRICES.month.now;

const FAQS = [
  {
    q: "Is Cluey Learning any good?",
    a: "Parents rate Cluey's tutors well: on ProductReview.com.au, teaching staff score 4.4 out of 5 and learning material 4.3. The overall rating is lower, 3.6 out of 5 from 933 reviews, mainly because of complaints about billing, cancelled sessions and customer service rather than the teaching itself.",
  },
  {
    q: "How much does Cluey cost?",
    a: "Cluey doesn't publish one standard price. It depends on your child's year level and the package you choose, and Cluey often discounts the first sessions. Reviews on Cluey's own promotional pages mention around $80 a session for Years 7 to 12. Ask for a written quote, including how packages are billed.",
  },
  {
    q: "Who are Cluey's tutors?",
    a: "Cluey describes its tutors as teachers, people training to be teachers and high ATAR achievers, all with Working with Children Checks. Tutors are matched to students after a call with a learning advisor.",
  },
  {
    q: "Can you cancel Cluey?",
    a: "Read the terms before you sign up. The most common complaints in parent reviews are about billing: charges continuing, prepaid packages and difficulty stopping payments. Ask how to cancel, how much notice is needed, and what happens to unused sessions.",
  },
  {
    q: "What's the difference between Cluey and Tuterly?",
    a: "Cluey is live online tutoring with a person, usually once a week. Tuterly is a maths study app for Years 7 to 10: students snap questions they got wrong and get detailed worked solutions and fresh practice, whenever they need it. Some families use both.",
  },
];

const LINKS = [
  { href: PR, label: "Cluey Learning reviews on ProductReview.com.au" },
  { href: "/cluey-alternative", label: "Cluey alternative: Cluey vs the Tuterly app" },
  { href: "/parents/maths-app-vs-tutoring", label: "Maths help without the $100-an-hour tutor" },
  { href: "/parents/kumon-cost-australia", label: "Kumon cost in Australia, and is it worth it?" },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[
        { name: "Parents", path: "/parents" },
        { name: "Cluey Learning review", path: PATH },
      ]}
      eyebrow="Parent guide · Comparing maths help"
      h1="Cluey Learning review: what parents actually say"
      lead="Cluey is one of Australia’s biggest online tutoring companies, and one parents ask about a lot. Here’s how it works, what it costs, what nearly a thousand parent reviews say, and the questions worth asking before you sign up."
      quickAnswer="Cluey is live, one-to-one online tutoring for Years 2 to 12, mainly maths and English. Parents rate the tutors well (4.4 out of 5 for teaching staff on ProductReview.com.au), but the overall rating is 3.6 out of 5 from 933 reviews, pulled down by complaints about billing, last-minute cancellations, changing tutors and customer service. It can suit families who want a person teaching their child each week, provided you’re clear on the billing terms first."
      toc={[
        ["how", "How Cluey works"],
        ["cost", "What it costs"],
        ["reviews", "What parents say"],
        ["ask", "Questions to ask"],
        ["compare", "Cluey vs alternatives"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Practice between lessons, or instead of them"
      ctaText="Tuterly turns the maths questions your child gets wrong into detailed worked solutions and fresh practice until it sticks. Years 7 to 10, no sessions to book."
      placement="parents_cluey_review"
      faqs={FAQS}
      faqTitle="Cluey Learning: questions parents ask"
      links={LINKS}
      finalTitle="No sessions to book or cancel"
      finalText="Tuterly is there whenever homework is: your child snaps the question they got wrong, sees the method step by step, and practises until it’s mastered. You see what they mastered each week."
    >
      <section id="how" className="tb-section" aria-labelledby="h-how">
        <div className="tb-wrap">
          <h2 id="h-how" className="tb-h2 pg-h2">How Cluey works</h2>
          <div className="pg-grid">
            <div className="pg-box">
              <h3>Live online sessions</h3>
              <p>One-to-one (or a small group) by video, with a shared whiteboard. Sessions are recorded so students can watch them back.</p>
            </div>
            <div className="pg-box">
              <h3>Tutors</h3>
              <p>Teachers, people training to be teachers and high ATAR achievers, matched to your child after a call with a learning advisor.</p>
            </div>
            <div className="pg-box">
              <h3>Subjects</h3>
              <p>Mainly maths and English from Years 2 to 12, plus NAPLAN preparation and some senior science, following the Australian Curriculum.</p>
            </div>
            <div className="pg-box">
              <h3>Reports</h3>
              <p>Parents get feedback after sessions and progress reports through Cluey&rsquo;s online portal.</p>
            </div>
          </div>
          <p className="pg-small">
            From Cluey Learning&rsquo;s own website, November 2026. Check the details with Cluey, as offers and formats change.
          </p>
        </div>
      </section>

      <section id="cost" className="tb-section" aria-labelledby="h-cost">
        <div className="tb-wrap">
          <h2 id="h-cost" className="tb-h2 pg-h2">What Cluey costs</h2>
          <div className="pg-prose">
            <p>
              Cluey doesn&rsquo;t publish one standard price: it depends on year level, one-to-one or group sessions, and the package. Reviews on Cluey&rsquo;s own promotional pages mention around $80 a session for Years 7 to 12, and Cluey often offers a discount on the first sessions.
            </p>
            <p>
              At around $80 a week, a year of weekly sessions during school terms (about 40 weeks) comes to roughly $3,200. Ask for a written quote, and ask how packages are billed before you commit.
            </p>
          </div>
        </div>
      </section>

      <section id="reviews" className="tb-section" aria-labelledby="h-reviews">
        <div className="tb-wrap">
          <h2 id="h-reviews" className="tb-h2 pg-h2">What parents say in their reviews</h2>
          <div className="pg-table">
            <table>
              <caption>Cluey Learning on ProductReview.com.au, November 2026</caption>
              <thead>
                <tr>
                  <th scope="col">Rating</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                <tr><th scope="row">Overall (933 reviews)</th><td>3.6 out of 5</td></tr>
                <tr><th scope="row">Teaching staff</th><td>4.4 out of 5</td></tr>
                <tr><th scope="row">Learning material</th><td>4.3 out of 5</td></tr>
                <tr><th scope="row">Customer service</th><td>4.0 out of 5</td></tr>
              </tbody>
            </table>
          </div>
          <div className="pg-grid" style={{ marginTop: 18 }}>
            <div className="pg-box">
              <h3>What parents like</h3>
              <ul>
                <li>Individual tutors who get to know their child and build rapport</li>
                <li>Better grades and renewed confidence in maths and English</li>
                <li>Session recordings and reports to see what was covered</li>
              </ul>
            </div>
            <div className="pg-box">
              <h3>What parents complain about</h3>
              <ul>
                <li><strong>Billing:</strong>{" "}unexpected or ongoing charges, prepaid packages and difficulty stopping payments (the most common complaint)</li>
                <li><strong>Cancellations:</strong>{" "}sessions cancelled at short notice, sometimes without a replacement</li>
                <li><strong>Changing tutors:</strong>{" "}several different tutors, making continuity hard</li>
                <li><strong>Support:</strong>{" "}long waits and rigid policies when something goes wrong</li>
              </ul>
            </div>
          </div>
          <p className="pg-small">
            Summarised from <a href={PR}>Cluey Learning reviews on ProductReview.com.au</a>, where Cluey replies publicly to many reviews. Ratings change over time.
          </p>
        </div>
      </section>

      <section id="ask" className="tb-section" aria-labelledby="h-ask">
        <div className="tb-wrap">
          <h2 id="h-ask" className="tb-h2 pg-h2">Questions to ask before you sign up</h2>
          <p className="pg-intro">
            Most of the problems in parent reviews are about terms, not teaching. These questions are worth asking any tutoring company, Cluey included:
          </p>
          <ul className="pg-checklist">
            <li><strong>How is it billed?</strong>{" "}Per session, monthly, or a prepaid package? Will charges continue over school holidays?</li>
            <li><strong>How do we stop?</strong>{" "}How much notice, and what happens to sessions we&rsquo;ve paid for and not used?</li>
            <li><strong>What if a tutor cancels?</strong>{" "}Do we get a replacement session, a credit or a refund?</li>
            <li><strong>Will we keep the same tutor?</strong>{" "}Continuity matters, especially for a student who is anxious about maths.</li>
            <li><strong>Who is the tutor?</strong>{" "}A qualified teacher, a trainee teacher or a recent school leaver? All can be good, but you should know.</li>
            <li><strong>How will I see progress?</strong>{" "}What will the reports show, and how often?</li>
          </ul>
        </div>
      </section>

      <section id="compare" className="tb-section" aria-labelledby="h-compare">
        <div className="tb-wrap">
          <h2 id="h-compare" className="tb-h2 pg-h2">Cluey vs the alternatives for Years 7 to 10 maths</h2>
          <div className="pg-table">
            <table>
              <caption>Cluey, a private tutor and Tuterly compared</caption>
              <thead>
                <tr>
                  <th scope="col">Option</th>
                  <th scope="col">Cost</th>
                  <th scope="col">What you get</th>
                  <th scope="col">Good to know</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Cluey Learning</th>
                  <td>Around $80 a session (quoted, not published)</td>
                  <td>A live online tutor, usually once a week, with recordings and reports</td>
                  <td>Check billing and cancellation terms first</td>
                </tr>
                <tr>
                  <th scope="row">Private tutor</th>
                  <td>$100 to $120 an hour</td>
                  <td>The same person each week, online or in person</td>
                  <td>Quality varies; ask about experience</td>
                </tr>
                <tr className="pg-row-hl">
                  <th scope="row">Tuterly</th>
                  <td>{WEEK} a week or {MONTH} a month</td>
                  <td>Detailed worked solutions and fresh practice on the questions your child gets wrong, any time</td>
                  <td>An app, not a tutor: no sessions to book or cancel</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pg-prose" style={{ marginTop: 18 }}>
            <p>
              <strong>When a live tutor is the better choice:</strong>{" "}if your child is well behind, needs a topic re-taught from scratch, or works best with a person expecting them each week. See our guide to <Link href="/parents/maths-app-vs-tutoring">when a tutor is worth it</Link>.
            </p>
            <p>
              <strong>When practice is the real gap:</strong>{" "}if your child mostly understands the work but keeps losing marks on the same kinds of questions, daily practice on their own mistakes often helps more than one hour a week. That&rsquo;s what Tuterly is built for. Tuterly is made by Bayside Academics, a Melbourne tutoring business, so we&rsquo;re not neutral, but we&rsquo;ve tried to be fair.
            </p>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}

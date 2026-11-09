import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import { PLUS_PRICES } from "@/lib/study-launch";
import { PRICING } from "@/lib/pricing";
import { BAYSIDE } from "@/lib/bayside";
import BaysideBuilt from "@/components/parent-guides/BaysideBuilt";

// "How much does maths tutoring cost in Australia?" compared company by
// company (Ryan, 9 Nov 2026). Brand searches (AU, Keyword Planner Nov 2026):
// Tutero 3,600, Mathnasium 3,600, Success Tutoring 2,900, Ezymath 1,900,
// Kip McGrath 880, Cluey reviews 480. Every price is from the company's own
// website, checked 9 Nov 2026; where a company doesn't publish prices, the
// page says so. Fair to each: describe, don't disparage.

const PATH = "/parents/maths-tutoring-cost-australia";
const TITLE = "How Much Does Maths Tutoring Cost in Australia? Every Option Compared (2026) | Tuterly";
const DESCRIPTION =
  "Maths tutoring prices in Australia compared: Tutero, Cluey, Kip McGrath, Kumon, Mathnasium, Success Tutoring, Ezymath and private tutors, from each company's own website, plus the cost of a year.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const WEEK = PLUS_PRICES.week.now;
const MONTH = PLUS_PRICES.month.now;
const LOW = PRICING.tutorCompareLow;
const HIGH = PRICING.tutorCompareHigh;

const SRC = {
  tutero: "https://www.tutero.com/au/tutoringlp/1-on-1-online-tutoring",
  cluey: "https://clueylearning.com.au/service-fees/",
  kip: "https://www.kipmcgrath.com.au/",
  kumon: "https://au.kumonglobal.com/monthly-fee/",
  mathnasium: "https://www.mathnasium.com/au/how-it-works",
  success: "https://successtutoring.com.au/success-tutoring-membership",
  ezymath: "https://www.ezymathtutoring.com.au/",
};

// A school year of weekly sessions: about 40 weeks.
const ROWS = [
  { name: "Private tutor", cost: `$${LOW} to $${HIGH} an hour (Melbourne, typical)`, year: `$${(LOW * 40).toLocaleString()} to $${(HIGH * 40).toLocaleString()}`, how: "One-on-one, at home or online, the same person each week", note: "Varies a lot with experience" },
  { name: "Tutero", href: "/parents/tutero-review", cost: "From $65 an hour", year: "From $2,600", how: "Live one-on-one online lessons with a matched tutor", note: "No contract; pay after each lesson", src: SRC.tutero },
  { name: "Kip McGrath", href: "/parents/kip-mcgrath-review", cost: "RRP $78 a session, varies by centre", year: "About $3,120", how: "In a centre or live online, usually once a week, ages 6 to 16", note: "Free assessment first", src: SRC.kip },
  { name: "Cluey Learning", href: "/parents/cluey-learning-review", cost: "$86 to $99 a 1-hour session", year: "$3,440 to $3,960", how: "Live one-on-one online sessions", note: "2 to 4 sessions paid in advance, depending on the plan", src: SRC.cluey },
  { name: "Kumon", href: "/parents/kumon-cost-australia", cost: "$160 a month per subject, plus $100 to enrol", year: "$1,920, plus $100 in the first year", how: "Daily worksheets at home and a weekly class, in its own sequence", note: "Doesn't follow the school curriculum", src: SRC.kumon },
  { name: "Mathnasium", href: "/parents/mathnasium-review", cost: "Not published; varies by centre, plus an enrolment fee", year: "Not published (about $3,200 at the Melbourne average of $80 an hour)", how: "In a centre or online, 2 to 3 sessions a week recommended, Years K to 10", note: "Centres in NSW, the ACT and Queensland; Victoria opening soon", src: SRC.mathnasium },
  { name: "Success Tutoring", href: "/parents/success-tutoring-review", cost: "Not published; weekly membership", year: "Not published (about $3,200 at the Melbourne average of $80 an hour)", how: "Membership at a local centre, sessions any day of the week", note: "No lock-in; 2 weeks' notice to cancel", src: SRC.success },
  { name: "Ezy Math Tutoring", href: "/parents/ezymath-review", cost: "Not published; quote after a trial lesson", year: "Not published (about $3,200 at the Melbourne average of $80 an hour)", how: "A tutor who comes to your home, Years 3 to 12", note: "First lesson as a trial", src: SRC.ezymath },
];

const FAQS = [
  { q: "How much does a maths tutor cost in Australia?", a: `A private maths tutor in Melbourne usually costs $${LOW} to $${HIGH} an hour. Online tutoring companies publish rates from $65 an hour (Tutero) to $86 to $99 an hour (Cluey), and Kip McGrath lists an RRP of $78 a session. A year of weekly sessions during school terms (about 40 weeks) comes to roughly $2,600 to $4,000.` },
  { q: "What's the cheapest way to get maths help?", a: `Free school help (homework clubs, asking the teacher) costs nothing, and free worksheets and practice tests help with practice. For structured help on the topics your child is getting wrong, an app like Tuterly is ${WEEK} a week or ${MONTH} a month at the launch price (50% off until 31 March 2027), a fraction of an hour with a tutor.` },
  { q: "Is a tutor worth it?", a: "A good tutor is worth it when your child needs someone to explain things face to face, keep them accountable each week, or cover several subjects. If the problem is mainly practice on the topics they keep getting wrong, regular practice between sessions (or instead of them for some students) often matters more than the extra hour." },
  { q: "Why don't some tutoring companies publish prices?", a: "Some, such as Mathnasium, Success Tutoring and Ezy Math Tutoring, set prices by centre, program or after an assessment, so they quote each family. Ask for the full cost, how many sessions you pay in advance, and the notice needed to cancel, in writing." },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Parents", path: "/parents" }, { name: "Maths tutoring cost in Australia", path: PATH }]}
      eyebrow="Parent guide · Years 7 to 10 maths"
      h1="How much does maths tutoring cost in Australia? Every option compared."
      lead="Tutoring companies price very differently: per hour, per session, per month, or only after an assessment. Here is what each one publishes on its own website, what a school year of weekly sessions adds up to, and where a maths app fits."
      quickAnswer={`A private maths tutor in Melbourne usually costs $${LOW} to $${HIGH} an hour. Published company rates run from $65 an hour (Tutero) and $78 a session (Kip McGrath RRP) to $86 to $99 an hour (Cluey), or $160 a month for Kumon. A school year of weekly sessions comes to roughly $2,600 to $4,000. Tuterly, built by the team behind Bayside Academics, is ${WEEK} a week or ${MONTH} a month at the launch price.`}
      toc={[["prices", "Prices compared"], ["year", "The cost of a year"], ["ask", "What to ask before you sign up"], ["tuterly", "Where Tuterly fits"], ["faq", "FAQ"]]}
      ctaTitle="The tutoring method, at a fraction of the price"
      ctaText="Tuterly turns the questions your child gets wrong into worked solutions and fresh practice until it's mastered, and practice exams in their school's style. Years 7 to 10 maths."
      placement="parents_tutoring_cost"
      faqs={FAQS}
      faqTitle="Tutoring costs: questions parents ask"
      links={[
        { href: "/parents/tutero-review", label: "Tutero review: cost and how it works" },
        { href: "/parents/cluey-learning-review", label: "Cluey Learning review" },
        { href: "/parents/kumon-cost-australia", label: "Kumon cost in Australia" },
        { href: "/parents/maths-app-vs-tutoring", label: "Maths help without the $100-an-hour tutor" },
      ]}
      finalTitle="What works in tutoring, in an app"
      finalText={`Built by the team behind ${BAYSIDE.line}. Find every mistake, fix it, master it, then predict the test.`}
    >
      <section id="prices" className="tb-section" aria-labelledby="h-prices">
        <div className="tb-wrap">
          <h2 id="h-prices" className="tb-h2 pg-h2">Maths tutoring prices in Australia (2026)</h2>
          <div className="pg-table">
            <table>
              <caption>What each option publishes, checked 9 November 2026</caption>
              <thead>
                <tr><th scope="col">Option</th><th scope="col">Price</th><th scope="col">How it works</th><th scope="col">Good to know</th></tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.name}>
                    <th scope="row">{r.href ? <Link href={r.href}>{r.name}</Link> : r.name}</th>
                    <td>{r.cost}</td>
                    <td>{r.how}</td>
                    <td>{r.note}</td>
                  </tr>
                ))}
                <tr className="pg-row-hl">
                  <th scope="row">Tuterly (app)</th>
                  <td>{WEEK} a week or {MONTH} a month, launch price (50% off until 31 March 2027)</td>
                  <td>Practice on the questions your child gets wrong, and practice exams in their school&rsquo;s style, any day</td>
                  <td>An app, not a tutor: Years 7 to 10 maths only</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="pg-small">
            Prices from each company&rsquo;s own website on 9 November 2026:{" "}
            <a href={SRC.tutero}>Tutero</a>, <a href={SRC.kip}>Kip McGrath</a>, <a href={SRC.cluey}>Cluey</a>, <a href={SRC.kumon}>Kumon</a>, <a href={SRC.mathnasium}>Mathnasium</a>, <a href={SRC.success}>Success Tutoring</a>, <a href={SRC.ezymath}>Ezy Math Tutoring</a>. The private tutor range is typical for Melbourne; where a company doesn&rsquo;t publish prices, the year estimate uses the Melbourne average of about $80 an hour and isn&rsquo;t that company&rsquo;s price. Prices change and vary by location, so check with the provider before you sign up. Tuterly isn&rsquo;t affiliated with any of these companies.
          </p>
        </div>
      </section>

      <section id="year" className="tb-section" aria-labelledby="h-year">
        <div className="tb-wrap">
          <h2 id="h-year" className="tb-h2 pg-h2">What a school year of weekly sessions costs</h2>
          <p className="pg-intro">One session a week for about 40 school weeks, at the published prices.</p>
          <div className="pg-table">
            <table>
              <caption>A school year of weekly maths help</caption>
              <thead><tr><th scope="col">Option</th><th scope="col">About a year</th></tr></thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.name}><th scope="row">{r.name}</th><td>{r.year}</td></tr>
                ))}
                <tr className="pg-row-hl"><th scope="row">Tuterly (monthly plan)</th><td>$360 for 12 months at the launch price ($29.99 a month until 31 March 2027, then $59.99)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="pg-small">Kumon is charged monthly, so its figure is 12 months. Tuterly&rsquo;s figure is 12 months at the launch price; from 1 April 2027 the monthly plan is $59.99.</p>
        </div>
      </section>

      <section id="ask" className="tb-section" aria-labelledby="h-ask">
        <div className="tb-wrap">
          <h2 id="h-ask" className="tb-h2 pg-h2">What to ask before you sign up</h2>
          <div className="pg-grid">
            <div className="pg-box"><h3>The full cost</h3><p>Per session or per month, any enrolment or assessment fee, and whether prices change by year level.</p></div>
            <div className="pg-box"><h3>Paying in advance</h3><p>How many sessions you pay up front, and how much notice you need to give to stop.</p></div>
            <div className="pg-box"><h3>Does it follow school?</h3><p>Will they work on what your child is doing in class this term, from their own homework and tests?</p></div>
            <div className="pg-box"><h3>Between sessions</h3><p>What does your child do in the six days between sessions? That&rsquo;s usually where the practice happens, or doesn&rsquo;t.</p></div>
          </div>
        </div>
      </section>

      <BaysideBuilt id="tuterly" />
    </GuideShell>
  );
}

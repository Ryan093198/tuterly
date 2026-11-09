import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import { PLUS_PRICES } from "@/lib/study-launch";
import { BAYSIDE } from "@/lib/bayside";
import BaysideBuilt from "@/components/parent-guides/BaysideBuilt";

// Tutero review (Ryan, 9 Nov 2026): "tutero" 3,600 a month in Australia,
// "tutero reviews" 260 (Keyword Planner, Nov 2026). Facts only from Tutero's
// own website, checked 9 Nov 2026. Fair: says plainly who Tutero suits.

const PATH = "/parents/tutero-review";
const TITLE = "Tutero Review (2026): Cost, How It Works, and Alternatives for Maths | Tuterly";
const DESCRIPTION =
  "Tutero review for parents: online one-on-one tutoring from $65 an hour, how tutors are matched, who it suits, what a year costs, and the alternatives for Years 7 to 10 maths.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const SRC = "https://www.tutero.com/au/tutoringlp/1-on-1-online-tutoring";
const WEEK = PLUS_PRICES.week.now;
const MONTH = PLUS_PRICES.month.now;

const FAQS = [
  { q: "How much does Tutero cost?", a: "Tutero says its online one-on-one tutoring is from $65 an hour, at the same rate for every year level, with no contract or sign-up fee. You pay after each lesson and can cancel any time. A school year of weekly one-hour lessons (about 40 weeks) comes to about $2,600." },
  { q: "How does Tutero work?", a: "You start with a short call, then Tutero matches a tutor on subject, level and personality. Lessons are live and online on a shared whiteboard, with the same tutor at the same time each week, working from your child's own homework and tests, with a written report after each lesson." },
  { q: "Is Tutero good for maths?", a: "It suits families who want a real person each week, online, who can work through school homework and tests and cover other subjects too. As with any tutoring service, the tutor you're matched with matters most, so use the first few lessons to judge the fit." },
  { q: "What's a cheaper alternative to Tutero for maths?", a: `For Years 7 to 10 maths, Tuterly is an app built by the team behind Bayside Academics: ${WEEK} a week or ${MONTH} a month at the launch price (50% off until 31 March 2027). It isn't a live tutor, but it gives worked solutions and fresh practice on the questions your child gets wrong, and practice exams in their school's style.` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Parents", path: "/parents" }, { name: "Tutero review", path: PATH }]}
      eyebrow="Parent guide · Years 7 to 10 maths"
      h1="Tutero review: what it costs, how it works, and the alternatives"
      lead="Tutero is an Australian online tutoring company offering live one-on-one lessons. Here's what it costs, how it works, who it suits, and how it compares with a private tutor or a maths app for a Year 7 to 10 student."
      quickAnswer={`Tutero offers live one-on-one online tutoring from $65 an hour, the same rate for every year level, with no contract: you pay after each lesson. A year of weekly lessons comes to about $2,600. It suits families who want a person each week. For Years 7 to 10 maths practice between (or instead of) lessons, Tuterly is ${WEEK} a week at the launch price.`}
      toc={[["cost", "Tutero cost"], ["how", "How Tutero works"], ["suits", "Who it suits"], ["compare", "Tutero vs alternatives"], ["tuterly", "Where Tuterly fits"], ["faq", "FAQ"]]}
      ctaTitle="Maths practice between lessons, or instead of them"
      ctaText="Tuterly turns the questions your child gets wrong into worked solutions and fresh practice until it's mastered. Years 7 to 10 maths."
      placement="parents_tutero"
      faqs={FAQS}
      faqTitle="Tutero: questions parents ask"
      links={[
        { href: SRC, label: "Tutero: one-on-one online tutoring" },
        { href: "/parents/maths-tutoring-cost-australia", label: "Maths tutoring costs in Australia, compared" },
        { href: "/parents/cluey-learning-review", label: "Cluey Learning review" },
        { href: "/parents/kumon-cost-australia", label: "Kumon cost in Australia" },
      ]}
      finalTitle="What works in tutoring, in an app"
      finalText={`Built by the team behind ${BAYSIDE.line}. Find every mistake, fix it, master it, then predict the test.`}
    >
      <section id="cost" className="tb-section" aria-labelledby="h-cost">
        <div className="tb-wrap">
          <h2 id="h-cost" className="tb-h2 pg-h2">How much Tutero costs</h2>
          <div className="pg-table">
            <table>
              <caption>Tutero pricing, from its website</caption>
              <thead><tr><th scope="col">Item</th><th scope="col">Cost</th></tr></thead>
              <tbody>
                <tr><th scope="row">One-on-one online lesson</th><td>From $65 an hour, every year level</td></tr>
                <tr><th scope="row">Contract or sign-up fee</th><td>None; pay after each lesson, cancel any time</td></tr>
                <tr><th scope="row">A school year of weekly lessons (about 40)</th><td>About $2,600 at $65 an hour</td></tr>
              </tbody>
            </table>
          </div>
          <p className="pg-small">From <a href={SRC}>Tutero&rsquo;s website</a>, 9 November 2026. &ldquo;From&rdquo; means some lessons may cost more; check your quote. Tuterly isn&rsquo;t affiliated with Tutero.</p>
        </div>
      </section>

      <section id="how" className="tb-section" aria-labelledby="h-how">
        <div className="tb-wrap">
          <h2 id="h-how" className="tb-h2 pg-h2">How Tutero works</h2>
          <div className="pg-grid">
            <div className="pg-box"><h3>A call, then a match</h3><p>A short call about your child and their school, then a tutor matched on subject, level and personality.</p></div>
            <div className="pg-box"><h3>Live online lessons</h3><p>One-on-one on a shared online whiteboard, with the same tutor at the same time each week.</p></div>
            <div className="pg-box"><h3>Their own schoolwork</h3><p>Lessons work from your child&rsquo;s homework and tests, with a written report after each one.</p></div>
            <div className="pg-box"><h3>Most subjects</h3><p>Prep to Year 12: maths, English, the sciences and more, plus NAPLAN preparation.</p></div>
          </div>
          <p className="pg-small">From <a href={SRC}>Tutero&rsquo;s website</a>, which also cites a 4.9 Google rating from 250 reviews.</p>
        </div>
      </section>

      <section id="suits" className="tb-section" aria-labelledby="h-suits">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-suits" className="tb-h2 pg-h2">Who Tutero suits</h2>
          <ul className="pg-checklist">
            <li>Students who learn best with a real person explaining things live, each week.</li>
            <li>Families who want help across several subjects, or in the VCE years.</li>
            <li>Families happy with online lessons rather than a tutor at home or a centre.</li>
          </ul>
          <p>It&rsquo;s a weaker fit if the cost of weekly lessons is the sticking point, or if what your child mainly needs is more practice on the topics they keep getting wrong, in the six days between lessons.</p>
        </div>
      </section>

      <section id="compare" className="tb-section" aria-labelledby="h-compare">
        <div className="tb-wrap">
          <h2 id="h-compare" className="tb-h2 pg-h2">Tutero, a private tutor and Tuterly compared</h2>
          <div className="pg-table">
            <table>
              <caption>For Years 7 to 10 maths</caption>
              <thead><tr><th scope="col">Option</th><th scope="col">Cost</th><th scope="col">What you get</th></tr></thead>
              <tbody>
                <tr><th scope="row">Tutero</th><td>From $65 an hour</td><td>A live online tutor, usually once a week, with reports</td></tr>
                <tr><th scope="row">Private tutor</th><td>$80 to $100 an hour (Melbourne, typical)</td><td>The same person each week, at home or online</td></tr>
                <tr className="pg-row-hl"><th scope="row">Tuterly</th><td>{WEEK} a week or {MONTH} a month, launch price (50% off until 31 March 2027)</td><td>Worked solutions and fresh practice on the questions your child gets wrong, and practice exams in their school&rsquo;s style, any day</td></tr>
              </tbody>
            </table>
          </div>
          <p className="pg-small">See every company side by side: <Link href="/parents/maths-tutoring-cost-australia">maths tutoring costs in Australia, compared</Link>.</p>
        </div>
      </section>

      <BaysideBuilt id="tuterly" />
    </GuideShell>
  );
}

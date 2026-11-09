import Link from "next/link";
import { notFound } from "next/navigation";
import GuideShell from "@/components/parent-guides/GuideShell";
import BaysideBuilt from "@/components/parent-guides/BaysideBuilt";
import { pageMetadata } from "@/lib/parent-guides";
import { PLUS_PRICES } from "@/lib/study-launch";
import { BRANDS, getBrand, TUTOR_AVG } from "@/lib/tutoring-brands";

// Tutoring company reviews: Mathnasium, Success Tutoring, Ezy Math
// Tutoring, Kip McGrath (lib/tutoring-brands.js). Same honest format as
// /parents/tutero-review: what it is, what it costs, who it suits, and
// where Tuterly fits, with "designed by Bayside Academics educators".
export const dynamicParams = false;
export function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.slug }));
}

const WEEK = PLUS_PRICES.week.now;
const MONTH = PLUS_PRICES.month.now;

function meta(b) {
  return {
    title: `${b.name} Review (2026): Cost, How It Works, and Alternatives | Tuterly`,
    description: `${b.name} review for parents: how it works, what it costs, who it suits, and a cheaper alternative for Years 7 to 10 maths, designed by the educators at Bayside Academics.`,
    path: `/parents/${b.slug}`,
  };
}

export async function generateMetadata({ params }) {
  const { brand } = await params;
  const b = getBrand(brand);
  return b ? pageMetadata(meta(b)) : {};
}

export default async function BrandPage({ params }) {
  const { brand } = await params;
  const b = getBrand(brand);
  if (!b) notFound();
  const { title, description, path } = meta(b);
  const costCell = b.priceKnown ? `RRP $${b.price} a session (varies by centre)` : "Not published; ask for a quote";
  const yearCell = b.priceKnown ? `About $${(b.price * 40).toLocaleString()} for 40 weekly sessions` : `About $${(TUTOR_AVG * 40).toLocaleString()} a school year at the Melbourne average of $${TUTOR_AVG} an hour (an estimate, not ${b.name}'s price)`;
  const quick = b.priceKnown
    ? `${b.name}: ${b.format.toLowerCase()}. ${b.priceLine} A school year of weekly sessions comes to about $${(b.price * 40).toLocaleString()}. For Years 7 to 10 maths, Tuterly is ${WEEK} a week at the launch price.`
    : `${b.name}: ${b.format.toLowerCase()}. ${b.priceLine} For comparison, a private tutor in Melbourne averages about $${TUTOR_AVG} an hour. For Years 7 to 10 maths, Tuterly is ${WEEK} a week at the launch price.`;
  const faqs = [
    { q: `How much does ${b.name} cost?`, a: b.priceKnown ? `${b.priceLine} A school year of weekly sessions (about 40) comes to about $${(b.price * 40).toLocaleString()}. Ask your local centre for its fees and any assessment or enrolment costs.` : `${b.priceLine} Ask for the full cost in writing, including any enrolment fee and the notice needed to stop. For comparison, a private tutor in Melbourne averages about $${TUTOR_AVG} an hour, about $${(TUTOR_AVG * 40).toLocaleString()} for a school year of weekly lessons.` },
    { q: `How does ${b.name} work?`, a: b.how.map(([t, x]) => `${t}: ${x}`).join(" ") },
    { q: `Is there a cheaper alternative to ${b.name} for maths?`, a: `For Years 7 to 10 maths, Tuterly is an app designed by the educators at Bayside Academics: ${WEEK} a week or ${MONTH} a month at the launch price (50% off until 31 March 2027). It isn't a tutor, but it gives worked solutions and fresh practice on the questions your child gets wrong, and practice exams in their school's style.` },
  ];

  return (
    <GuideShell
      path={path}
      title={title}
      description={description}
      crumbs={[{ name: "Parents", path: "/parents" }, { name: `${b.name} review`, path }]}
      eyebrow="Parent guide · Years 7 to 10 maths"
      h1={`${b.name} review: what it costs, how it works, and the alternatives`}
      lead={`What ${b.name} offers, what it costs, who it suits, and how it compares with a private tutor or a maths app for a Year 7 to 10 student.`}
      quickAnswer={quick}
      toc={[["cost", `${b.name} cost`], ["how", `How ${b.name} works`], ["suits", "Who it suits"], ["compare", "Compared"], ["bayside", "Where Tuterly fits"], ["faq", "FAQ"]]}
      ctaTitle="Better marks on their next maths test"
      ctaText="Tuterly turns the questions your child gets wrong into worked solutions and fresh practice until it's mastered, and writes practice exams in their school's style. Years 7 to 10 maths."
      placement={`parents_${b.slug.replace(/-/g, "_")}`}
      faqs={faqs}
      faqTitle={`${b.name}: questions parents ask`}
      links={[
        { href: b.site, label: `${b.name} website` },
        { href: "/parents/maths-tutoring-cost-australia", label: "Maths tutoring costs in Australia, compared" },
        { href: "/parents/tutero-review", label: "Tutero review" },
        { href: "/parents/kumon-cost-australia", label: "Kumon cost in Australia" },
      ]}
      finalTitle="What works in tutoring, in an app"
      finalText="Designed by the educators at Bayside Academics. Find every mistake, fix it, master it, then predict the test."
    >
      <section id="cost" className="tb-section" aria-labelledby="h-cost">
        <div className="tb-wrap">
          <h2 id="h-cost" className="tb-h2 pg-h2">How much {b.name} costs</h2>
          <div className="pg-table">
            <table>
              <caption>{b.name}, from its website</caption>
              <thead><tr><th scope="col">Item</th><th scope="col">Details</th></tr></thead>
              <tbody>
                <tr><th scope="row">Price</th><td>{costCell}</td></tr>
                <tr><th scope="row">A school year</th><td>{yearCell}</td></tr>
                <tr><th scope="row">What it is</th><td>{b.format}</td></tr>
                <tr><th scope="row">How often</th><td>{b.sessions}</td></tr>
                <tr><th scope="row">Where</th><td>{b.where}</td></tr>
              </tbody>
            </table>
          </div>
          <p className="pg-small">
            From <a href={b.site}>{b.name}&rsquo;s website</a>, 9 November 2026. {b.priceKnown ? "" : `The $${TUTOR_AVG}-an-hour figure is the average for a private tutor in Melbourne, for comparison only. `}Check current prices with your local provider. Tuterly isn&rsquo;t affiliated with {b.name}.
          </p>
        </div>
      </section>

      <section id="how" className="tb-section" aria-labelledby="h-how">
        <div className="tb-wrap">
          <h2 id="h-how" className="tb-h2 pg-h2">How {b.name} works</h2>
          <div className="pg-grid">
            {b.how.map(([t, x]) => (
              <div key={t} className="pg-box"><h3>{t}</h3><p>{x}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="suits" className="tb-section" aria-labelledby="h-suits">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-suits" className="tb-h2 pg-h2">Who {b.name} suits</h2>
          <ul className="pg-checklist">
            {b.suits.map((x) => <li key={x}>{x}</li>)}
          </ul>
          <p>{b.weaker}</p>
        </div>
      </section>

      <section id="compare" className="tb-section" aria-labelledby="h-compare">
        <div className="tb-wrap">
          <h2 id="h-compare" className="tb-h2 pg-h2">{b.name}, a private tutor and Tuterly compared</h2>
          <div className="pg-table">
            <table>
              <caption>For Years 7 to 10 maths</caption>
              <thead><tr><th scope="col">Option</th><th scope="col">Cost</th><th scope="col">What you get</th></tr></thead>
              <tbody>
                <tr><th scope="row">{b.name}</th><td>{b.priceKnown ? `RRP $${b.price} a session` : "Not published"}</td><td>{b.format}</td></tr>
                <tr><th scope="row">Private tutor</th><td>About ${TUTOR_AVG} an hour (Melbourne average)</td><td>The same person each week, at home or online</td></tr>
                <tr className="pg-row-hl"><th scope="row">Tuterly</th><td>{WEEK} a week or {MONTH} a month, launch price (50% off until 31 March 2027)</td><td>Worked solutions and fresh practice on the questions your child gets wrong, and practice exams in their school&rsquo;s style, any day</td></tr>
              </tbody>
            </table>
          </div>
          <p className="pg-small">Every option side by side: <Link href="/parents/maths-tutoring-cost-australia">maths tutoring costs in Australia, compared</Link>.</p>
        </div>
      </section>

      <BaysideBuilt id="bayside" />
    </GuideShell>
  );
}

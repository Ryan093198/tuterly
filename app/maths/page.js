import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";

// Hub for the maths concept pages and calculators (Nov 2026).
const PATH = "/maths";
const TITLE = "Maths Explained: Key Topics and Free Calculators for Years 7 to 10 | Tuterly";
const DESCRIPTION =
  "Plain-English explanations of the maths topics students search for most, with worked examples, practice questions with answers and free calculators that show the working. Australian Curriculum, Years 7 to 10.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const TOPICS = [
  { href: "/maths/pythagoras-theorem", k: "Years 8 to 10", t: "Pythagoras’ theorem", x: "The formula, finding any side, word problems and practice." },
  { href: "/maths/sohcahtoa", k: "Years 9 and 10", t: "SOH CAH TOA (trigonometry)", x: "Labelling sides, choosing sin, cos or tan, finding sides and angles." },
  { href: "/maths/index-laws", k: "Years 8 to 10", t: "Index laws", x: "All 7 laws of indices with examples, plus fractional indices." },
  { href: "/maths/surds", k: "Years 9 to 10A", t: "Surds", x: "Simplifying, adding, multiplying and rationalising surds." },
  { href: "/maths/simultaneous-equations", k: "Year 10", t: "Simultaneous equations", x: "Substitution, elimination and graphing, with a solver." },
  { href: "/maths/gradient", k: "Years 8 to 10", t: "Gradient", x: "From two points, a graph or an equation, with a calculator." },
  { href: "/maths/3d-pythagoras", k: "Year 10A", t: "3D Pythagoras", x: "Space diagonals, pyramids and cones." },
];
const CALCULATORS = [
  { href: "/calculators/pythagoras", k: "Calculator", t: "Pythagoras calculator", x: "Find the hypotenuse or a missing side, with the working." },
  { href: "/calculators/trigonometry", k: "Calculator", t: "Trigonometry calculator", x: "Find a missing side or angle with SOH CAH TOA, with the working." },
  { href: "/calculators/quadratic-formula", k: "Calculator", t: "Quadratic formula calculator", x: "Exact answers in surd form, plus decimals, with the working." },
  { href: "/calculators/standard-deviation", k: "Calculator", t: "Standard deviation calculator", x: "Mean, population and sample standard deviation, with the working." },
  { href: "/maths/simultaneous-equations#solver", k: "Calculator", t: "Simultaneous equations solver", x: "Two linear equations, solved by elimination, with exact fractions." },
  { href: "/maths/gradient#calculator", k: "Calculator", t: "Gradient calculator", x: "Gradient, equation of the line, midpoint and distance from two points." },
];

const Cards = ({ items }) => (
  <div className="pg-cards">
    {items.map((i) => (
      <Link key={i.href} href={i.href} className="pg-card">
        <span className="pg-card__k">{i.k}</span>
        <span className="pg-card__t">{i.t}</span>
        <span className="pg-card__x">{i.x}</span>
      </Link>
    ))}
  </div>
);

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: PATH }]}
      eyebrow="Maths explained · Years 7 to 10"
      h1="Maths explained, with calculators that show the working"
      lead="The topics students look up most, explained in plain English with worked examples and practice questions. Each one links to free worksheets and tests for your year level."
      ctaTitle="Stuck on a homework question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own."
      placement="maths_hub"
      pageType="CollectionPage"
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      links={[{ href: "/worksheets", label: "Free worksheets for every Year 7 to 10 topic" }, { href: "/formula-sheets", label: "Formula sheets" }]}
      finalTitle="Explanations here. Practice in the app."
      finalText="Tuterly saves the questions you get wrong, shows every step, and gives fresh questions on the same skill until it’s mastered. Australian Curriculum, Years 7 to 10."
    >
      <section className="tb-section" aria-labelledby="h-topics">
        <div className="tb-wrap">
          <h2 id="h-topics" className="tb-h2 pg-h2">Topics explained</h2>
          <Cards items={TOPICS} />
          <h2 className="tb-h2 pg-h2" style={{ marginTop: 32 }}>Calculators with working out</h2>
          <Cards items={CALCULATORS} />
        </div>
      </section>
    </GuideShell>
  );
}

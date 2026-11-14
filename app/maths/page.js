import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";

// Hub for the maths concept pages and calculators (Nov 2026).
const PATH = "/maths";
const TITLE = "Maths Explained and Free Calculators, Years 7 to 10 | Tuterly";
const DESCRIPTION =
  "Plain-English explanations of the maths topics students search for most, with worked examples, practice questions with answers and free calculators that show the working. Australian Curriculum, Years 7 to 10.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const TOPICS = [
  { href: "/maths/percentages", k: "Years 7 to 10", t: "Percentages", x: "Percentage of a number, increase and decrease, percentage change, with a calculator." },
  { href: "/maths/area-of-a-circle", k: "Years 7 to 10", t: "Area of a circle", x: "From the radius or diameter, semicircles and sectors, with a calculator." },
  { href: "/maths/circumference-of-a-circle", k: "Years 7 to 10", t: "Circumference of a circle", x: "From the radius or diameter, semicircles and arc length, with a calculator." },
  { href: "/maths/simplifying-fractions", k: "Years 7 to 10", t: "Simplifying fractions", x: "The HCF method, mixed numbers, ratios and algebraic fractions." },
  { href: "/maths/mean-median-mode", k: "Years 7 to 10", t: "Mean, median, mode and range", x: "Plus quartiles and the interquartile range, with a calculator." },
  { href: "/maths/expanding-brackets", k: "Years 8 to 10", t: "Expanding brackets", x: "The distributive law, FOIL, perfect squares and difference of squares." },
  { href: "/maths/factorising", k: "Years 8 to 10", t: "Factorising", x: "Common factors, quadratics, difference of squares and grouping, with a calculator." },
  { href: "/maths/solving-linear-equations", k: "Years 7 to 10", t: "Solving linear equations", x: "One-step, two-step, brackets, fractions and word problems." },
  { href: "/maths/pythagoras-theorem", k: "Years 8 to 10", t: "Pythagoras’ theorem", x: "The formula, finding any side, word problems and practice." },
  { href: "/maths/sohcahtoa", k: "Years 9 and 10", t: "SOH CAH TOA (trigonometry)", x: "Labelling sides, choosing sin, cos or tan, finding sides and angles." },
  { href: "/maths/index-laws", k: "Years 8 to 10", t: "Index laws", x: "All 7 laws of indices with examples, plus fractional indices." },
  { href: "/maths/surds", k: "Years 9 to 10A", t: "Surds", x: "Simplifying, adding, multiplying and rationalising surds." },
  { href: "/maths/simultaneous-equations", k: "Year 10", t: "Simultaneous equations", x: "Substitution, elimination and graphing, with a solver." },
  { href: "/maths/gradient", k: "Years 8 to 10", t: "Gradient", x: "From two points, a graph or an equation, with a calculator." },
  { href: "/maths/3d-pythagoras", k: "Year 10A", t: "3D Pythagoras", x: "Space diagonals, pyramids and cones." },
  { href: "/maths/volume-of-a-cylinder", k: "Years 8 to 10", t: "Volume of a cylinder", x: "V = πr²h from the radius or diameter, litres, and finding the height, with a calculator." },
  { href: "/maths/order-of-operations", k: "Years 7 to 10", t: "Order of operations (BODMAS)", x: "Brackets, powers, left to right, and negatives, with a step-by-step checker." },
  { href: "/maths/distance-between-two-points", k: "Years 9 and 10", t: "Distance between two points", x: "The distance formula, negative coordinates, exact surd answers and missing coordinates, with a calculator." },
  { href: "/maths/compound-interest", k: "Year 10", t: "Compound interest", x: "A = P(1 + r)^n, monthly and quarterly compounding, finding the principal and depreciation." },
];
const CALCULATORS = [
  { href: "/maths/percentages#calculator", k: "Calculator", t: "Percentage calculator", x: "Percentage of a number, percentage change, increase and decrease, with the working." },
  { href: "/maths/area-of-a-circle#calculator", k: "Calculator", t: "Circle calculator", x: "Area, circumference, radius and diameter from any one of them, with the working." },
  { href: "/maths/simplifying-fractions#calculator", k: "Calculator", t: "Fraction simplifier", x: "Simplify any fraction, with the HCF and the working." },
  { href: "/maths/mean-median-mode#calculator", k: "Calculator", t: "Mean, median and mode calculator", x: "Mean, median, mode, range, quartiles and IQR from a list, with the working." },
  { href: "/maths/factorising#calculator", k: "Calculator", t: "Factorising calculator", x: "Factorise a quadratic, with every step shown." },
  { href: "/calculators/pythagoras", k: "Calculator", t: "Pythagoras calculator", x: "Find the hypotenuse or a missing side, with the working." },
  { href: "/calculators/trigonometry", k: "Calculator", t: "Trigonometry calculator", x: "Find a missing side or angle with SOH CAH TOA, with the working." },
  { href: "/calculators/quadratic-formula", k: "Calculator", t: "Quadratic formula calculator", x: "Exact answers in surd form, plus decimals, with the working." },
  { href: "/calculators/standard-deviation", k: "Calculator", t: "Standard deviation calculator", x: "Mean, population and sample standard deviation, with the working." },
  { href: "/maths/simultaneous-equations#solver", k: "Calculator", t: "Simultaneous equations solver", x: "Two linear equations, solved by elimination, with exact fractions." },
  { href: "/maths/gradient#calculator", k: "Calculator", t: "Gradient calculator", x: "Gradient, equation of the line, midpoint and distance from two points." },
  { href: "/maths/volume-of-a-cylinder#calculator", k: "Calculator", t: "Volume of a cylinder calculator", x: "Volume from the radius or diameter, or the missing height or radius, with the working." },
  { href: "/maths/order-of-operations#checker", k: "Checker", t: "Order of operations checker", x: "Type any calculation and see it worked out one BODMAS step at a time." },
  { href: "/maths/distance-between-two-points#calculator", k: "Calculator", t: "Distance between two points calculator", x: "Exact and rounded distance between any two points, with the working and a sketch." },
  { href: "/maths/compound-interest#calculator", k: "Calculator", t: "Compound interest calculator", x: "Final amount and interest for any compounding period, with a year-by-year table." },
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

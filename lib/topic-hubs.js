import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { strandOf } from "@/lib/year-hubs";

// Topic hubs: one page per topic across Years 7 to 10A, e.g.
// /worksheets/trigonometry. For searches without a year ("trigonometry
// worksheet", 320 a month in Australia, Keyword Planner Nov 2026) where we
// only had year-specific pages. Copy: state-neutral, no em dashes.

export const HUB_YEARS_ALL = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 10A"];

const pick = (slugs) => (p) => slugs.includes(p.slug);

export const TOPIC_HUBS = {
  algebra: {
    name: "Algebra",
    keyword: "algebra worksheets",
    title: "Free Algebra Worksheets with Answers, Years 7 to 10 (Australian Curriculum) | Tuterly",
    description:
      "Free algebra worksheets for Years 7 to 10 and 10A: substitution, expanding and factorising, linear equations, quadratics, simultaneous equations and more. New questions every time, with worked solutions.",
    h1: "Free algebra worksheets, Years 7 to 10",
    lead: "Every algebra topic from Year 7 to Year 10A, from substitution and like terms to quadratics and simultaneous equations. Pick a topic and get six new questions, from Foundation to Extension, each with a fully worked solution.",
    match: (p) => strandOf(p.topicId) === "A",
    skills: ["substitution", "collecting-like-terms", "expanding-brackets", "two-step-equations", "completing-the-square"],
    pathIntro: "Each year's algebra leans on the year before, so a gap in Year 7 or 8 usually shows up later as trouble with quadratics or equations.",
    path: [
      { y: "Year 7", t: "Letters stand for numbers. Students substitute into formulas, collect like terms, use the distributive law and solve simple equations." },
      { y: "Year 8", t: "Manipulating expressions: expanding brackets (including negatives), factorising by the highest common factor, and solving and graphing linear equations." },
      { y: "Year 9", t: "Expanding binomial products and factorising, the first quadratics, index laws, and linear graphs with gradient, midpoint and distance." },
      { y: "Year 10", t: "Simultaneous equations, solving and factorising quadratics, algebraic fractions, inequalities, rearranging formulas and exponential equations." },
      { y: "Year 10A", t: "The extension topics for the harder senior maths subjects: non-monic quadratics, polynomials and the factor theorem, logarithms and function notation." },
    ],
    faqs: [
      { q: "Which algebra topic should my child start with?", a: "Start with the topic their class is on now. If they're struggling with it, go back a year: most algebra trouble in Years 9 and 10 starts with expanding, factorising or negative numbers from Years 7 and 8." },
    ],
  },

  "area-and-perimeter": {
    name: "Area and perimeter",
    keyword: "area and perimeter worksheet",
    title: "Area and Perimeter Worksheets with Answers, Years 7 to 10 (Free) | Tuterly",
    description:
      "Free area and perimeter worksheets for Years 7 to 10: rectangles, triangles, parallelograms, composite shapes, circles, surface area and volume. New questions every time, with worked solutions.",
    h1: "Free area and perimeter worksheets, Years 7 to 10",
    lead: "Area and perimeter from Year 7 to Year 10: rectangles, triangles and parallelograms, composite shapes, circles, then surface area and volume. Pick a topic and get six new questions with fully worked solutions.",
    match: pick(["year-7-area-perimeter", "year-7-circles", "year-7-volume", "year-8-area-perimeter", "year-8-circles", "year-8-volume", "year-9-surface-area-volume", "year-10-surface-area-volume", "year-10a-pyramids-cones-spheres"]),
    skills: ["area-of-a-triangle", "area-of-composite-shapes"],
    pathIntro: "Area builds from simple shapes to composite shapes and circles, then into 3D with surface area and volume.",
    path: [
      { y: "Year 7", t: "Area and perimeter of rectangles, triangles and parallelograms, the first work with circles, and the volume of rectangular prisms." },
      { y: "Year 8", t: "Composite and irregular shapes, the area and circumference of circles, and the volume of prisms." },
      { y: "Year 9", t: "Surface area and volume of prisms, cylinders and composite solids." },
      { y: "Year 10", t: "Surface area and volume in real-world problems, including capacity and composite objects." },
      { y: "Year 10A", t: "Surface area and volume of pyramids, cones and spheres." },
    ],
    faqs: [
      { q: "What's the difference between area and perimeter?", a: "Perimeter is the distance around the outside of a shape, measured in units like metres. Area is the space inside it, measured in square units like square metres. A common mistake is adding the sides when the question asks for area." },
    ],
  },

  "index-laws": {
    name: "Index laws",
    keyword: "index laws worksheet",
    title: "Index Laws Worksheets with Answers, Years 7 to 10 (Free) | Tuterly",
    description:
      "Free index laws worksheets for Years 7 to 10: powers and square roots, the index laws, negative and zero indices, scientific notation, surds and fractional indices. New questions every time, with worked solutions.",
    h1: "Free index laws worksheets, Years 7 to 10",
    lead: "Indices from Year 7 to Year 10A: squares and square roots, prime factors in index form, the index laws with numbers and pronumerals, scientific notation, then surds and fractional indices. Each topic has six new questions with worked solutions.",
    match: pick(["year-7-square-roots", "year-7-prime-factors", "year-8-exponents", "year-9-exponent-laws", "year-9-scientific-notation", "year-10-index-laws", "year-10-exponential-equations", "year-10a-surds"]),
    skills: [],
    pathIntro: "Index laws are learned in Year 8 and then used everywhere: in scientific notation, algebra, exponential equations and senior maths.",
    path: [
      { y: "Year 7", t: "Squares, square roots and powers, and writing numbers as products of prime factors in index form." },
      { y: "Year 8", t: "The index laws for multiplying, dividing and raising a power to a power, with numbers." },
      { y: "Year 9", t: "Index laws with pronumerals and integer indices, and scientific notation for very large and very small numbers." },
      { y: "Year 10", t: "Index laws in longer algebraic expressions, and solving exponential equations with the same base." },
      { y: "Year 10A", t: "Surds and fractional indices, the link to roots, and the groundwork for logarithms." },
    ],
    faqs: [
      { q: "What are the index laws?", a: "When multiplying powers of the same base, add the indices. When dividing, subtract them. For a power of a power, multiply them. Anything (except zero) to the power of zero is 1, and a negative index means the reciprocal." },
    ],
  },

  trigonometry: {
    name: "Trigonometry",
    keyword: "trigonometry worksheet",
    title: "Trigonometry Worksheets with Answers, Years 9 and 10 (Free) | Tuterly",
    description:
      "Free trigonometry worksheets for Years 9 and 10 and 10A: SOH CAH TOA, finding sides and angles, angles of elevation and depression, bearings, the sine and cosine rules and 3D problems. New questions every time, with worked solutions.",
    h1: "Free trigonometry worksheets, Years 9 and 10",
    lead: "Trigonometry from its start in Year 9 to the Year 10A extension topics: SOH CAH TOA, finding sides and angles, elevation, depression and bearings, then the sine and cosine rules. Each topic has six new questions with worked solutions.",
    match: pick(["year-8-pythagoras", "year-9-pythagoras", "year-9-trigonometry", "year-10-trigonometry", "year-10a-sine-cosine-rule", "year-10a-3d-trigonometry", "year-10a-trigonometric-equations"]),
    skills: [],
    pathIntro: "Trigonometry starts in Year 9 and builds on Pythagoras' theorem from Year 8, so that's the place to go back to if right-angled triangles are shaky.",
    path: [
      { y: "Year 8", t: "Pythagoras' theorem: finding a missing side of a right-angled triangle. The groundwork for trigonometry." },
      { y: "Year 9", t: "Sine, cosine and tangent (SOH CAH TOA) to find missing sides and angles in right-angled triangles." },
      { y: "Year 10", t: "Trigonometry in applied problems: angles of elevation and depression, bearings, and combining it with Pythagoras." },
      { y: "Year 10A", t: "Non-right-angled triangles with the sine and cosine rules, 3D problems and trigonometric equations." },
    ],
    faqs: [
      { q: "What does SOH CAH TOA mean?", a: "It's a way to remember the three ratios in a right-angled triangle: sine is opposite over hypotenuse, cosine is adjacent over hypotenuse, and tangent is opposite over adjacent. Label the sides from the angle you're working with first." },
    ],
  },

  probability: {
    name: "Probability",
    keyword: "probability worksheet",
    title: "Probability Worksheets with Answers, Years 7 to 10 (Free) | Tuterly",
    description:
      "Free probability worksheets for Years 7 to 10: sample spaces, complementary events, Venn diagrams, two-way tables, tree diagrams, conditional probability and counting. New questions every time, with worked solutions.",
    h1: "Free probability worksheets, Years 7 to 10",
    lead: "Probability from Year 7 to Year 10A: sample spaces and single events, complementary events, Venn diagrams and two-way tables, tree diagrams, then conditional probability and counting. Each topic has six new questions with worked solutions.",
    match: pick(["year-7-probability", "year-8-probability", "year-8-complementary-events", "year-9-probability", "year-9-venn-diagrams-probability", "year-10-probability", "year-10-tree-diagrams", "year-10-two-way-tables", "year-10a-permutations-combinations"]),
    skills: [],
    pathIntro: "Each year adds a new way to organise outcomes, from lists in Year 7 to tree diagrams and conditional probability in Year 10.",
    path: [
      { y: "Year 7", t: "Sample spaces, the probability of single events, and relative frequency from experiments." },
      { y: "Year 8", t: "Complementary events, and organising outcomes with Venn diagrams and two-way tables." },
      { y: "Year 9", t: "Two-step experiments with and without replacement, and using Venn diagrams and two-way tables of real data for 'and', 'or' and 'not'." },
      { y: "Year 10", t: "Multi-step experiments with tree diagrams, conditional probability and independence." },
      { y: "Year 10A", t: "Counting principles, permutations and combinations." },
    ],
    faqs: [
      { q: "How do you work out a probability?", a: "Count the outcomes you want and divide by the total number of equally likely outcomes. For example, the probability of rolling an even number on a die is 3 out of 6, or one half. Probabilities are always between 0 and 1." },
    ],
  },
};

export const TOPIC_HUB_SLUGS = Object.keys(TOPIC_HUBS);

export function hubTopics(hub) {
  return HUB_YEARS_ALL.map((y) => ({
    year: y,
    items: WORKSHEET_LANDING_PAGES.filter((p) => p.yearLevel === y && hub.match(p)),
  })).filter((g) => g.items.length);
}

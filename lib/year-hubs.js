import { NAPLAN_2027 } from "@/lib/state-curriculum";

// Year-level worksheet hubs: /worksheets/year-7 ... /worksheets/year-10.
// Built 3 Nov 2026 for searches like "year 7 maths worksheets" (about 1,000
// a month in Australia, Keyword Planner), which had no page of their own.
// Topics come from WORKSHEET_LANDING_PAGES; strands from the curriculum code.
// Copy rules: Australian Curriculum v9 wording, state-neutral, no em dashes.

export const HUB_YEARS = ["7", "8", "9", "10"];

export const STRANDS = [
  { code: "N", name: "Number" },
  { code: "A", name: "Algebra" },
  { code: "M", name: "Measurement" },
  { code: "SP", name: "Space" },
  { code: "ST", name: "Statistics" },
  { code: "P", name: "Probability" },
];

// VC2M7A01 -> "A", VC2M10SP02 -> "SP", VC2M10AA03 -> "A" (10A)
export function strandOf(topicId) {
  return (topicId.match(/^VC2M(\d+A?)([A-Z]+)\d/) || [])[2] || "N";
}

const shared = (n) => [
  {
    q: `Are these Year ${n} maths worksheets free?`,
    a: "Yes. Enter your email the first time and you can make one free worksheet a day. There's nothing to pay and no card needed.",
  },
  {
    q: "Do the worksheets come with answers?",
    a: "Every question comes with a fully worked solution, step by step, so your child can check their own work and see where a mistake crept in.",
  },
  {
    q: "Will they match what my child is doing at school?",
    a: `The topics follow the Australian Curriculum for Year ${n}. Schools teach them in different orders, and NSW and WA have their own syllabuses, but the maths is the same. Pick the topic your child's class is on this week.`,
  },
];

export const YEAR_HUBS = {
  7: {
    title: "Free Year 7 Maths Worksheets with Answers | Tuterly",
    description:
      "Free Year 7 maths worksheets for every topic: algebra, fractions, integers, ratios, angles, area, volume and probability. New questions every time, with fully worked solutions.",
    h1: "Free Year 7 maths worksheets",
    lead: "Every Year 7 maths topic, from algebra and fractions to angles and probability. Pick a topic and get six new questions, from Foundation to Extension, each with a fully worked solution.",
    about: [
      "Year 7 is the first year of secondary maths, and the biggest change is algebra: using letters for numbers, writing expressions and solving simple equations. Students also extend their work with fractions, decimals, percentages and ratios, and start calculating with negative numbers.",
      "In measurement and space, Year 7 brings angle rules, the area of triangles and parallelograms, the volume of prisms and the first work with circles. Statistics and probability cover data displays like dot plots and stem-and-leaf plots, and the chance of simple events.",
      `Year 7 students also sit NAPLAN, from ${NAPLAN_2027}. The numeracy test draws on everything up to Year 7, so mixed practice across these topics in Term 1 is worth it.`,
    ],
    naplan: true,
    faqs: [
      {
        q: "What maths do Year 7 students learn?",
        a: "Algebra (variables, expressions and simple equations), number (fractions, decimals, percentages, ratios, integers, powers and square roots), measurement (angles, area, volume and circles), space (transformations), statistics (data displays) and probability.",
      },
      ...shared(7),
    ],
  },
  8: {
    title: "Free Year 8 Maths Worksheets with Answers | Tuterly",
    description:
      "Free Year 8 maths worksheets for every topic: algebra, linear equations, Pythagoras, percentages, rates, time zones, congruence and probability. New questions every time, with worked solutions.",
    h1: "Free Year 8 maths worksheets",
    lead: "Every Year 8 maths topic, from linear equations and Pythagoras to percentages, rates and time zones. Pick a topic and get six new questions, from Foundation to Extension, each with a fully worked solution.",
    about: [
      "Year 8 builds on the algebra from Year 7. Students expand and simplify expressions, solve linear equations, and graph straight lines from real situations. In number, they work with percentages, profit and discounts, index notation and the four operations with integers.",
      "Measurement is a big part of Year 8: Pythagoras' theorem, the area of more shapes, volume, circles, rates, and time, including time zones and speed, distance and time. Space covers congruence and the properties of quadrilaterals, and probability adds complementary events.",
    ],
    naplan: false,
    faqs: [
      {
        q: "What maths do Year 8 students learn?",
        a: "Algebra (expanding, simplifying and linear equations and graphs), number (percentages, index notation, integers, profit and loss), measurement (Pythagoras, area, volume, circles, rates, time zones, speed), space (congruence and quadrilaterals), statistics and probability.",
      },
      ...shared(8),
    ],
  },
  9: {
    title: "Free Year 9 Maths Worksheets with Answers | Tuterly",
    description:
      "Free Year 9 maths worksheets for every topic: quadratics, linear equations, coordinate geometry, index laws, trigonometry, surface area and probability. New questions every time, with worked solutions.",
    h1: "Free Year 9 maths worksheets",
    lead: "Every Year 9 maths topic, from quadratics and coordinate geometry to trigonometry and surface area. Pick a topic and get six new questions, from Foundation to Extension, each with a fully worked solution.",
    about: [
      "Year 9 is where algebra gets serious. Students expand binomial products, start factorising, meet quadratic expressions, use index laws, and work with linear graphs and coordinate geometry: gradient, midpoint and distance.",
      "Trigonometry starts in Year 9, along with scale factors and enlargements. Measurement covers Pythagoras in context, surface area and volume, scientific notation and measurement error. Statistics compares data sets, and probability uses Venn diagrams and two-way tables.",
      `Year 9 students also sit NAPLAN, from ${NAPLAN_2027}, and Year 9 results matter for the maths choices that come next, so gaps are worth fixing early.`,
    ],
    naplan: true,
    faqs: [
      {
        q: "What maths do Year 9 students learn?",
        a: "Algebra (binomial products, factorising, quadratics, index laws, linear graphs and coordinate geometry, simple interest), measurement (Pythagoras, surface area and volume, scientific notation, measurement error), space (trigonometry and enlargements), statistics and probability.",
      },
      ...shared(9),
    ],
  },
  10: {
    title: "Free Year 10 and 10A Maths Worksheets with Answers | Tuterly",
    description:
      "Free Year 10 and 10A maths worksheets: simultaneous equations, quadratics, trigonometry, surds, logarithms, polynomials, probability and more. New questions every time, with worked solutions.",
    h1: "Free Year 10 maths worksheets",
    lead: "Every Year 10 maths topic, plus the Year 10A extension topics, from simultaneous equations and quadratics to surds, logarithms and trigonometry. Pick a topic and get six new questions, each with a fully worked solution.",
    about: [
      "Year 10 completes the core algebra of secondary school: simultaneous equations, solving and factorising quadratics, algebraic fractions, inequalities, exponential equations and graphs of parabolas, circles and hyperbolas. Measurement and space cover trigonometry, surface area and volume, proportion and geometric proof.",
      "Year 10A is the extension course for students planning to take the harder senior maths subjects. It adds surds, logarithms, polynomials, non-monic quadratics, circle theorems, the sine and cosine rules and standard deviation.",
      "Year 10 results usually decide which senior maths a student can take, so this is the year to close any gaps from Years 8 and 9.",
    ],
    naplan: false,
    extraYears: ["Year 10A"],
    faqs: [
      {
        q: "What maths do Year 10 students learn?",
        a: "Algebra (simultaneous equations, quadratics, algebraic fractions, inequalities, exponential equations and graphs), measurement (trigonometry, surface area and volume, proportion), space (geometric reasoning and networks), statistics (scatterplots and two-way tables) and probability (tree diagrams).",
      },
      {
        q: "What is Year 10A maths?",
        a: "Year 10A is the optional extension content in the Australian Curriculum, for students heading to the harder senior maths courses. It includes surds, logarithms, polynomials, circle theorems, the sine and cosine rules and standard deviation. The 10A topics are listed separately on this page.",
      },
      ...shared(10),
    ],
  },
};

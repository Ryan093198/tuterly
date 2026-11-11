import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { getTopicGuide } from "@/lib/topic-guides";
import { STRANDS, strandOf } from "@/lib/year-hubs";
import { NAPLAN_2027 } from "@/lib/state-curriculum";

// "Year X maths" guide pages: /year-7-maths ... /year-10-maths. For the
// broad searches "year 7 maths" (1,600 a month in Australia), "year 8
// maths" (1,000), "year 9 maths" and "year 10 maths" (880 each), Keyword
// Planner Nov 2026. People searching these want to know what the year
// covers and how to help; the page answers that and links to the worksheet
// hub, the test page and the topic pages. Copy: state-neutral, no em dashes.

export const YEAR_MATHS_YEARS = ["7", "8", "9", "10"];

// Topic list by strand, with each topic page's one-line description
// (worksheet boilerplate trimmed).
export function yearTopicsByStrand(n) {
  const years = n === "10" || n === 10 ? ["Year 10", "Year 10A"] : [`Year ${n}`];
  const clean = (s) =>
    String(s || "")
      .split(/(?<=\.)\s+/)
      .filter((x) => !/worked solutions|free\.?$/i.test(x))
      .join(" ")
      .replace(/,?\s*(with (clear|full) working,?\s*)?free worksheets included\.?/i, ".")
      .replace(/,?\s*with (full )?worked solutions every time[^.]*\.?/i, ".")
      .replace(/\s+-\s+/g, ": ")
      .replace(/\.\.$/, ".")
      .trim();
  return STRANDS.map((st) => ({
    strand: st.name,
    items: WORKSHEET_LANDING_PAGES.filter((p) => years.includes(p.yearLevel) && strandOf(p.topicId) === st.code).map((p) => ({
      slug: p.slug,
      topic: p.topic,
      ext: p.yearLevel === "Year 10A",
      desc: clean(p.subtitle) || p.whatsCovered?.[0] || "",
    })),
  })).filter((g) => g.items.length);
}

// Quick check: the first quick-check question from each topic guide in this
// year (all checked in code when the guides were written), up to eight.
export function yearQuickCheck(n) {
  const year = `Year ${n}`;
  const out = [];
  for (const p of WORKSHEET_LANDING_PAGES.filter((x) => x.yearLevel === year)) {
    const g = getTopicGuide(p.slug);
    if (g?.quiz?.length) out.push({ ...g.quiz[0], topic: p.topic, slug: p.slug });
    if (out.length >= 8) break;
  }
  return out;
}

export const YEAR_MATHS = {
  7: {
    title: "Year 7 Maths: What's Covered, Worksheets and Tests | Tuterly",
    description:
      "What Year 7 maths covers in Australia, topic by topic: algebra, fractions, integers, ratios, angles, area and probability. Where students get stuck, how to help at home, and free worksheets and tests.",
    h1: "Year 7 maths: what's covered and how to help",
    lead: "Year 7 is the first year of secondary maths. Here's every topic in the Australian Curriculum for Year 7, where students most often get stuck, and free worksheets and tests for each one.",
    changes: [
      "Algebra arrives properly: letters stand for numbers, and students write expressions, substitute into formulas and solve simple equations.",
      "Negative numbers become part of everyday calculation, including adding and subtracting them.",
      "Fractions, decimals, percentages and ratios are used together in problems, not practised one at a time.",
      "Geometry gets formal: angle rules on parallel lines, and area formulas for triangles and parallelograms.",
    ],
    stuck: [
      { t: "Negative numbers, especially subtracting a negative.", slug: "year-7-integers" },
      { t: "Turning words into algebra, like \"seven less than a number\".", slug: "year-7-algebra" },
      { t: "Dividing fractions and working with mixed numbers.", slug: "year-7-fraction-operations" },
      { t: "Choosing the right angle rule on parallel lines.", slug: "year-7-angles" },
    ],
    help: [
      "Ask what topic their class is on this week, and do one worksheet on it, not a random mix.",
      "When they get one wrong, have them redo that exact question a couple of days later. Getting it right the second time is what sticks.",
      `Year 7s sit NAPLAN numeracy from ${NAPLAN_2027}, so a little mixed practice in Term 1 is worth it.`,
      "Keep sessions short: 15 to 20 minutes a few times a week beats a long session the night before a test.",
    ],
    faqs: [
      { q: "What maths do Year 7 students learn in Australia?", a: "Algebra (variables, substitution and simple equations), number (fractions, decimals, percentages, ratios, integers, powers and square roots), measurement (angles, area, volume and circles), space (transformations), statistics and probability. The topics follow the Australian Curriculum, though schools teach them in different orders." },
      { q: "Is Year 7 maths hard?", a: "The step up is mostly algebra and negative numbers, which are new ways of thinking rather than harder arithmetic. Students who get comfortable with those two early usually find the rest of Year 7 straightforward." },
      { q: "Do Year 7 students do NAPLAN?", a: `Yes. Year 7 students sit the NAPLAN numeracy test, from ${NAPLAN_2027}. It draws on everything up to Year 7.` },
    ],
  },
  8: {
    title: "Year 8 Maths: What's Covered, Worksheets and Tests | Tuterly",
    description:
      "What Year 8 maths covers in Australia, topic by topic: algebra, linear equations, Pythagoras, percentages, rates, time zones and probability. Where students get stuck, how to help, and free worksheets and tests.",
    h1: "Year 8 maths: what's covered and how to help",
    lead: "Year 8 maths builds on Year 7 and adds Pythagoras, rates and more algebra. Here's every topic in the Australian Curriculum for Year 8, where students get stuck, and free worksheets and tests for each one.",
    changes: [
      "Algebra moves from writing expressions to manipulating them: expanding brackets, factorising and solving linear equations.",
      "Pythagoras' theorem appears, the first big formula students use across lots of problem types.",
      "Percentages get applied to money: profit, loss, discounts and mark-ups.",
      "Measurement widens to circles, rates, time zones and speed, distance and time.",
    ],
    stuck: [
      { t: "Expanding brackets with a negative in front.", slug: "year-8-algebra" },
      { t: "Knowing which side is the hypotenuse in Pythagoras.", slug: "year-8-pythagoras" },
      { t: "Percentage increase and decrease in money problems.", slug: "year-8-profit-and-loss" },
      { t: "Area of composite shapes, and which measurements to use.", slug: "year-8-area-perimeter" },
    ],
    help: [
      "Ask what topic their class is on this week, and do one worksheet on it.",
      "Have them check algebra by expanding their answer again. It catches most sign mistakes.",
      "For word problems, ask them to say what the question wants before they start calculating.",
      "Redo wrong questions a few days later. Mistakes fixed once tend to come back; fixed twice, they usually stick.",
    ],
    faqs: [
      { q: "What maths do Year 8 students learn in Australia?", a: "Algebra (expanding, factorising and linear equations and graphs), number (percentages, index notation, integers, profit and loss), measurement (Pythagoras, area, volume, circles, rates, time zones and speed), space (congruence and quadrilaterals), statistics and probability." },
      { q: "Why does Year 8 maths matter?", a: "Year 8 algebra and Pythagoras are used constantly in Years 9 and 10, in quadratics, trigonometry and graphing. Gaps that start here usually show up later as trouble with harder topics." },
      { q: "How can I help my child with Year 8 maths if I don't remember it?", a: "You don't need to teach it. Use worksheets with full worked solutions, have your child mark their own work, and ask them to explain one wrong answer to you. Explaining it is often where it clicks." },
    ],
  },
  9: {
    title: "Year 9 Maths: What's Covered, Worksheets and Tests | Tuterly",
    description:
      "What Year 9 maths covers in Australia, topic by topic: quadratics, linear graphs, index laws, trigonometry, surface area and probability. Where students get stuck, how to help, and free worksheets and tests.",
    h1: "Year 9 maths: what's covered and how to help",
    lead: "Year 9 is where algebra gets serious and trigonometry begins. Here's every topic in the Australian Curriculum for Year 9, where students get stuck, and free worksheets and tests for each one.",
    changes: [
      "Algebra steps up: expanding binomial products, factorising and the first quadratics.",
      "Trigonometry starts, building on Pythagoras from Year 8.",
      "Linear graphs become coordinate geometry: gradient, midpoint and distance.",
      "Index laws extend to pronumerals, and scientific notation is used for very large and very small numbers.",
    ],
    stuck: [
      { t: "Index laws with pronumerals and negative numbers.", slug: "year-9-exponent-laws" },
      { t: "Setting up the right trigonometric ratio.", slug: "year-9-trigonometry" },
      { t: "Finding the equation of a line from two points.", slug: "year-9-linear-equations" },
      { t: "Multi-step Pythagoras problems in context.", slug: "year-9-pythagoras" },
    ],
    help: [
      "Year 9 results shape the maths choices that come next, so fix gaps now rather than in Year 10.",
      `Year 9s sit NAPLAN numeracy from ${NAPLAN_2027}, which covers everything up to Year 9.`,
      "Before a topic test, have them do a practice test under time, then redo every question they got wrong.",
      "If algebra is shaky, go back to Year 8 expanding and factorising before pushing on with quadratics.",
    ],
    faqs: [
      { q: "What maths do Year 9 students learn in Australia?", a: "Algebra (binomial products, factorising, quadratics, index laws, linear graphs and coordinate geometry, simple interest), measurement (Pythagoras, surface area and volume, scientific notation, measurement error), space (trigonometry and enlargements), statistics and probability." },
      { q: "Does Year 9 maths affect senior subject choices?", a: "Often, yes. Schools usually use Year 9 and 10 results to place students into the harder senior maths courses, which assume Year 9 algebra and trigonometry are automatic." },
      { q: "Do Year 9 students do NAPLAN?", a: `Yes. Year 9 students sit the NAPLAN numeracy test, from ${NAPLAN_2027}.` },
    ],
  },
  10: {
    title: "Year 10 Maths: What's Covered, Worksheets and Tests | Tuterly",
    description:
      "What Year 10 and 10A maths covers in Australia: simultaneous equations, quadratics, trigonometry, statistics, surds and logarithms. Where students get stuck, how to help before senior maths, and free worksheets and tests.",
    h1: "Year 10 maths: what's covered and how to help",
    lead: "Year 10 finishes the core algebra of secondary school and sets up senior maths. Here's every Year 10 and 10A topic in the Australian Curriculum, where students get stuck, and free worksheets and tests for each one.",
    changes: [
      "Algebra comes together: simultaneous equations, solving and factorising quadratics, algebraic fractions and inequalities.",
      "Trigonometry is applied to elevation, depression and bearings.",
      "Statistics adds quartiles, box plots, scatterplots and two-way tables.",
      "Year 10A adds the extension topics for the harder senior maths subjects: surds, logarithms, polynomials and the sine and cosine rules.",
    ],
    stuck: [
      { t: "Factorising quadratics, especially with a negative constant.", slug: "year-10-quadratic-factorising" },
      { t: "Choosing between elimination and substitution for simultaneous equations.", slug: "year-10-simultaneous-equations" },
      { t: "Flipping the inequality sign when dividing by a negative.", slug: "year-10-linear-inequalities" },
      { t: "Algebraic fractions with different denominators.", slug: "year-10-algebraic-fractions" },
    ],
    help: [
      "Year 10 results usually decide which senior maths a student can take, so close gaps from Years 8 and 9 early in the year.",
      "If they're heading for the harder senior maths, make sure the Year 10A topics get proper practice, not just the core ones.",
      "Before each test, do a timed practice exam and redo every question they got wrong.",
      "Algebra is the foundation for everything in senior maths, so a little regular algebra practice pays off most.",
    ],
    faqs: [
      { q: "What maths do Year 10 students learn in Australia?", a: "Algebra (simultaneous equations, quadratics, algebraic fractions, inequalities, exponential equations and graphs), measurement (trigonometry, surface area and volume, proportion), space (geometric reasoning and networks), statistics (box plots, scatterplots and two-way tables) and probability (tree diagrams)." },
      { q: "What is Year 10A maths?", a: "Year 10A is optional extension content in the Australian Curriculum, for students heading to the harder senior maths courses. It includes surds, logarithms, polynomials, circle theorems, the sine and cosine rules and standard deviation." },
      { q: "How should my child prepare for senior maths?", a: "Make sure Year 10 algebra is automatic: expanding, factorising, solving equations and working with indices. Those skills are assumed from the first week of the harder senior courses." },
    ],
  },
};

import { buildExam } from "@/lib/exam-bank";
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { NAPLAN_2027 } from "@/lib/state-curriculum";

// Year-level maths test pages: /year-7-maths-test ... /year-10-maths-test.
// Built 3 Nov 2026 for searches like "year 7 maths test" and "year 7 maths
// questions" (about 2,000 a month across Years 7 to 10, Keyword Planner).
// The sample test is built from the exam bank (checked topic-page questions)
// with a fixed seed, so it's the same on every visit and Google sees stable
// content. Copy: state-neutral, no em dashes.

export const TEST_YEARS = ["7", "8", "9", "10"];
const SAMPLE_SIZE = 10;
const SEED = 20261103;

// Ten short-answer questions spread across the year's topics.
export function sampleTest(n) {
  const year = `Year ${n}`;
  const slugs = WORKSHEET_LANDING_PAGES.filter((p) => p.yearLevel === year).map((p) => p.slug);
  const exam = buildExam({ year, slugs, seed: SEED });
  if (!exam) return [];
  const short = exam.sections.find((s) => /short/i.test(s.title))?.questions || [];
  const seen = new Set();
  const out = [];
  for (const q of short) {
    if (out.length >= SAMPLE_SIZE) break;
    if (seen.has(q.topic)) continue;
    seen.add(q.topic);
    out.push(q);
  }
  return out.map((q, i) => ({ ...q, n: i + 1 }));
}

const shared = (n) => [
  {
    q: `Is this Year ${n} maths test free?`,
    a: "Yes. The sample test on this page is free with no sign-up. To make your own test on the topics your child is studying, enter your email and you can make one free practice test a day.",
  },
  {
    q: "Do the questions come with answers?",
    a: "Every question has the answer and a fully worked solution, step by step, so your child can mark their own work and see exactly where a mistake happened.",
  },
  {
    q: "What should my child do with the questions they get wrong?",
    a: "Read the worked solution, then try a fresh question on the same idea a day or two later. That's what the Tuterly app does: snap a wrong answer and it writes new questions on the same idea until it's mastered.",
  },
];

export const YEAR_TESTS = {
  7: {
    title: "Year 7 Maths Test: Free Practice Questions with Answers | Tuterly",
    description:
      "A free Year 7 maths test with 10 practice questions across algebra, fractions, integers, percentages, angles and more, each with a fully worked solution. Make your own Year 7 practice test too.",
    h1: "Year 7 maths test: free practice questions with answers",
    lead: "Ten Year 7 maths questions across the year's topics, each with a worked solution. Try them now, then make a full practice test on the topics your child's next test covers.",
    whatsOn: [
      "Year 7 maths tests are usually topic tests set by the school: one on algebra, one on fractions and percentages, one on angles, and so on, often with a bigger exam at the end of the semester or year.",
      "The skills that come up most are working with variables and simple equations, fraction, decimal and percentage calculations, negative numbers, angle rules, area and volume, and reading data displays.",
      `Year 7 students also sit NAPLAN numeracy, from ${NAPLAN_2027}, which draws on everything up to Year 7.`,
    ],
    naplan: true,
    faqs: [
      {
        q: "What is on a Year 7 maths test?",
        a: "It depends on the topic your child's class has just finished. Common Year 7 tests cover algebra (variables, substitution and simple equations), number (fractions, decimals, percentages, ratios and integers), measurement (angles, area, volume) and statistics. End-of-year exams mix all of them.",
      },
      ...shared(7),
    ],
  },
  8: {
    title: "Year 8 Maths Test: Free Practice Questions with Answers | Tuterly",
    description:
      "A free Year 8 maths test with 10 practice questions across algebra, linear equations, Pythagoras, percentages, rates, time zones and probability, each with a worked solution. Make your own Year 8 test too.",
    h1: "Year 8 maths test: free practice questions with answers",
    lead: "Ten Year 8 maths questions across the year's topics, each with a worked solution. Try them now, then make a full practice test on the topics your child's next test covers.",
    whatsOn: [
      "Year 8 maths tests are usually topic tests set by the school, with a bigger exam at the end of the semester or year.",
      "Common topics are expanding and simplifying algebra, solving linear equations, Pythagoras' theorem, percentages, profit and discounts, rates, time and time zones, area and volume, congruence, and probability.",
    ],
    naplan: false,
    faqs: [
      {
        q: "What is on a Year 8 maths test?",
        a: "Common Year 8 tests cover algebra and linear equations, Pythagoras' theorem, percentages and rates, measurement (area, volume, circles and time), congruence and probability. End-of-year exams mix all of them.",
      },
      ...shared(8),
    ],
  },
  9: {
    title: "Year 9 Maths Test: Free Practice Questions with Answers | Tuterly",
    description:
      "A free Year 9 maths test with 10 practice questions across quadratics, linear graphs, index laws, trigonometry, surface area and probability, each with a worked solution. Make your own Year 9 exam too.",
    h1: "Year 9 maths test: free practice questions with answers",
    lead: "Ten Year 9 maths questions across the year's topics, each with a worked solution. Try them now, then make a full practice test or exam on the topics your child's next test covers.",
    whatsOn: [
      "Year 9 maths tests are usually topic tests set by the school, and many schools add a semester or end-of-year exam.",
      "Common topics are expanding and factorising, quadratics, linear graphs and coordinate geometry, index laws, trigonometry, Pythagoras, surface area and volume, scientific notation and probability.",
      `Year 9 students also sit NAPLAN numeracy, from ${NAPLAN_2027}.`,
    ],
    naplan: true,
    faqs: [
      {
        q: "What is on a Year 9 maths test or exam?",
        a: "Common Year 9 tests cover algebra (expanding, factorising and quadratics), linear graphs and coordinate geometry, index laws, trigonometry and Pythagoras, surface area and volume, statistics and probability. Semester and end-of-year exams mix the topics covered so far.",
      },
      ...shared(9),
    ],
  },
  10: {
    title: "Year 10 Maths Test: Free Practice Questions with Answers | Tuterly",
    description:
      "A free Year 10 maths test with 10 practice questions across simultaneous equations, quadratics, trigonometry, algebraic fractions, statistics and probability, each with a worked solution. Make your own Year 10 exam too.",
    h1: "Year 10 maths test: free practice questions with answers",
    lead: "Ten Year 10 maths questions across the year's topics, each with a worked solution. Try them now, then make a full practice exam on the topics your child's next test covers, including Year 10A.",
    whatsOn: [
      "Year 10 maths is usually assessed with topic tests and end-of-semester exams, and the results often decide which senior maths subjects a student can take.",
      "Common topics are simultaneous equations, solving and factorising quadratics, algebraic fractions, inequalities, exponential equations, trigonometry, surface area and volume, statistics and probability. Year 10A adds surds, logarithms, polynomials and the sine and cosine rules.",
    ],
    naplan: false,
    faqs: [
      {
        q: "What is on a Year 10 maths exam?",
        a: "Common Year 10 exams cover algebra (simultaneous equations, quadratics, algebraic fractions and inequalities), graphs, trigonometry, surface area and volume, statistics and probability. Students in Year 10A also see surds, logarithms and polynomials.",
      },
      {
        q: "Why does Year 10 maths matter so much?",
        a: "Year 10 results usually decide which senior maths subjects a student can take, and the harder senior courses assume Year 10 algebra is automatic. A practice exam a fortnight before the real one shows which topics still need work while there's time to fix them.",
      },
      ...shared(10),
    ],
  },
};

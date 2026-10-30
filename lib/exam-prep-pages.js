// Maths exam preparation pages: /maths-exam-preparation (hub) and
// /maths-exam-preparation/year-7 to year-10. Written to parents, aimed at
// "maths exam preparation app" and "Year N maths exam preparation"
// searches. Product facts from TUTERLY-STUDY-FEATURES.md; no marks promises.
// Topic links come from the worksheet topic pages so they always exist.
import { topicsForYear } from "@/lib/student-pages";

export const EXAM_YEARS = [
  {
    slug: "year-7",
    year: "Year 7",
    intro:
      "The first secondary school maths exam is often the first time your child has sat a long test covering a whole semester. The maths isn’t the only new thing: so is revising several topics at once.",
    slips: [
      { title: "Negative numbers", text: "Subtracting a negative and multiplying two negatives. The rules feel obvious in class and get mixed up under time pressure." },
      { title: "Order of operations", text: "Working left to right instead of brackets, powers, then multiplication and division. One early slip carries through the whole answer." },
      { title: "Writing algebra from words", text: "Turning “three less than twice a number” into 2n − 3. The algebra is easy once it’s written; reading it is the hard part." },
      { title: "Fractions, decimals and percentages", text: "Converting between them and comparing sizes, especially with mixed numbers and percentages over 100." },
    ],
  },
  {
    slug: "year-8",
    year: "Year 8",
    intro:
      "Year 8 exams lean on algebra more than Year 7 did: equations with brackets and pronumerals on both sides, linear graphs and Pythagoras all tend to appear, often as worded problems.",
    slips: [
      { title: "Equations with brackets", text: "Expanding brackets with a negative in front, or doing different things to each side. Checking the answer by substituting it back catches most of these." },
      { title: "Gradient of a line", text: "Rise over run with the wrong sign, or reading the scale on the axes wrong when the grid doesn’t go up in ones." },
      { title: "Pythagoras", text: "Adding when they should subtract: finding a shorter side means c² − a², not a² + b². Labelling the hypotenuse first fixes it." },
      { title: "Percentage change", text: "Increasing by 15% and then decreasing by 15% doesn’t get back to the start. Multipliers like 1.15 and 0.85 make these easier." },
    ],
  },
  {
    slug: "year-9",
    year: "Year 9",
    intro:
      "Year 9 is where the maths senior courses (VCE, HSC, QCE and the rest) build on really starts: expanding and factorising, trigonometry, linear relations and financial maths. Exam marks this year are a good early read on gaps worth fixing.",
    slips: [
      { title: "Expanding and factorising", text: "Sign errors when expanding (x − 3)(x + 5), and not taking out the highest common factor. Expanding the factorised answer back out is a quick check." },
      { title: "Choosing sin, cos or tan", text: "Picking the wrong ratio, or a calculator left in radians. Labelling opposite, adjacent and hypotenuse before choosing saves most marks." },
      { title: "Distance, midpoint and gradient", text: "Mixing up which coordinates to subtract, or subtracting them in a different order on the top and bottom." },
      { title: "Simple interest", text: "Using a percentage instead of a decimal in I = PRT, or months instead of years for T." },
    ],
  },
  {
    slug: "year-10",
    year: "Year 10",
    intro:
      "The Year 10 maths exam is the last one before senior maths, and many schools look at it when students choose their Year 11 maths subject (for example General, Methods or Specialist in Victoria, or Standard or Advanced in NSW). It’s worth preparing for properly.",
    slips: [
      { title: "Factorising quadratics", text: "Finding two numbers that multiply to c and add to b, then getting a sign wrong. Non-monic quadratics trip up even confident students." },
      { title: "Simultaneous equations", text: "Choosing between substitution and elimination, then making an arithmetic slip halfway. Substituting both answers back in is the check." },
      { title: "Index laws", text: "Multiplying the powers instead of adding them, and negative and zero indices. Small slips that cost marks across several topics." },
      { title: "Statistics and probability", text: "Reading two-way tables for conditional probability, and working out the interquartile range and outliers for a box plot." },
    ],
  },
];

export function getExamYear(slug) {
  return EXAM_YEARS.find((y) => y.slug === slug) || null;
}

export function examTopics(year) {
  return topicsForYear(year);
}

// The three-week plan, shared by the hub and year pages. Screens are real
// app screenshots (public/app-screens/README.md).
const S = "/app-screens";
export const EXAM_PLAN = [
  {
    src: `${S}/flow-practice/02-test-any-topic-list.png`,
    alt: "Test any topic: a list of textbook topics, with two tests ready to start",
    title: "Three weeks out: test each topic",
    text: "List the topics in the exam from the course outline. Take a short practice test on each one. The wrong answers show where to spend the time.",
  },
  {
    src: `${S}/flow-practice/05-test-results.png`,
    alt: "Practice test results: 6 out of 8, with the 2 wrong answers saved to the bank",
    title: "Two weeks out: fix what went wrong",
    text: "Every wrong answer is saved to their bank. Fix my mistakes works through them one after another, with fresh questions on the same idea.",
  },
  {
    src: `${S}/flow-notes/03-notes-sheet.png`,
    alt: "A Tuterly revision sheet with a summary and the key ideas for a topic",
    title: "The last week: revision notes",
    text: "Make study notes on the whole topic, or just on the parts they find hard, and re-test the topics that scored lowest.",
  },
  {
    src: `${S}/flow-practice/04-test-score.png`,
    alt: "A practice test score screen: Great work! 6 out of 8",
    title: "The day before: one last check",
    text: "A short test on their weakest topic, then stop. Sleep does more for exam marks than a late night of new questions.",
  },
];

export function examFaqs(name, year = null) {
  const y = year ? year.year : "Years 7 to 10";
  return [
    {
      q: `When are ${year ? `${year.year} ` : ""}maths exams?`,
      a: "Most secondary schools hold maths exams or end-of-semester tests near the end of Term 2 and Term 4 (or in mid-year and end-of-year exam weeks), but every school sets its own dates. Check the term planner or course outline, and start about three weeks before.",
    },
    {
      q: "Can it cover the exact topics in my child’s exam?",
      a: `Yes. Your child picks any ${y} topic in the Australian Curriculum and ${name} writes a practice test on it. From a linked parent account you can also upload the term planner or course outline, and ${name} focuses topic tests on what’s coming up this term.`,
    },
    {
      q: "Isn’t a past paper enough?",
      a: "A past paper is good for timing, once. After that your child has seen the questions. A practice test generator writes a new test every time, and the questions they get wrong turn into practice on exactly those ideas.",
    },
    {
      q: "How much does it cost?",
      a: `${name} is free to download with a 1-week free trial. After that it’s $15.99 a week, or $7.99 a week for life if you sign up before launch. You can cancel any time.`,
    },
    {
      q: "Is there a free option?",
      a: "Our free worksheet generator makes a six-question sheet with fully worked solutions on any Year 3 to 10 topic, one a day, free with your email.",
    },
  ];
}

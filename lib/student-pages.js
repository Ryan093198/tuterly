// Student landing pages: /students and /students/year-7 to /students/year-10.
// Written to the student ("you"). Topics come from the topic pages so the
// links always exist.
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";

export const STUDENT_YEARS = [
  {
    slug: "year-7",
    year: "Year 7",
    h1: "Year 7 maths: get the marks back.",
    intro: "Year 7 brings algebra, integers, ratios and a lot of new topics at once. When a test comes back with marks you could have had, that’s where Tuterly starts.",
  },
  {
    slug: "year-8",
    year: "Year 8",
    h1: "Year 8 maths: get the marks back.",
    intro: "Year 8 moves into linear equations and graphs, Pythagoras, rates and exponents. Snap the ones you got wrong and practise them until they’re easy.",
  },
  {
    slug: "year-9",
    year: "Year 9",
    h1: "Year 9 maths: get the marks back.",
    intro: "Year 9 adds quadratics and trigonometry, and it’s the maths VCE builds on. Fix the gaps now, while there’s time.",
  },
  {
    slug: "year-10",
    year: "Year 10",
    h1: "Year 10 maths: get the marks back.",
    intro: "Year 10 is the last year before VCE maths: quadratics, simultaneous equations, trigonometry and more. Every question you master now is one less gap in Year 11.",
  },
];

export function getStudentYear(slug) {
  return STUDENT_YEARS.find((y) => y.slug === slug) || null;
}

export function topicsForYear(year) {
  return WORKSHEET_LANDING_PAGES.filter((p) => p.yearLevel === year).map((p) => ({ slug: p.slug, topic: p.topic }));
}

export function studentFaqs(name) {
  return [
    {
      q: "Isn’t this just getting the answers?",
      a: `No. The worked solution stays hidden until you tap Show solution, so you can have another go first. Then ${name} gives you a fresh question on the same idea, reworded with different numbers, and you only master it when you get those right yourself.`,
    },
    {
      q: "Can I use it for homework?",
      a: "Yes. Snap any question from homework, your textbook, a class quiz or a test. It’s saved with a full worked solution and filed under the right topic.",
    },
    {
      q: "Will my parents see my photos?",
      a: "No. If a parent links to your account, they see a weekly summary, your topics and test scores, not the photos you take. You can remove a link any time.",
    },
    {
      q: "How much does it cost?",
      a: "It’s free to download with a 1-week free trial. After that it’s $15.99 a week, or $7.99 a week for life if your family signs up before launch. Ask a parent before you subscribe.",
    },
    {
      q: "Which years and subjects does it cover?",
      a: "Years 7 to 10 maths, following the Victorian Curriculum 2.0. It’s coming soon on iPhone and Android.",
    },
  ];
}

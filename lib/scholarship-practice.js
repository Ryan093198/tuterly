import fs from "node:fs";
import path from "node:path";

// Free numerical reasoning practice for scholarship and selective-entry
// tests (/scholarship-practice and /scholarship-practice/[provider]).
//
// Questions: 10 per entry level, taken from Tuterly Scholarship's own
// diagnostics (tuterly-study/Scholarship/*.json, questions 11 to 40, so
// none of the app's free first 10). All original, every answer checked in
// code and by a blind second solve. Copied into content/scholarship/
// practice-y{5,6,7}.json on 30 Oct 2026.
//
// Provider facts checked 30 Oct 2026 against the sources listed per
// provider. No provider endorses Tuterly; copy says "practice for", never
// "official".

export const LEVELS = [
  { entry: 5, year: 4, label: "Year 4", sub: "for Year 5 entry" },
  { entry: 6, year: 5, label: "Year 5", sub: "for Year 6 entry" },
  { entry: 7, year: 6, label: "Year 6", sub: "for Year 7 entry" },
];

const DIR = path.join(process.cwd(), "content", "scholarship");
export function getPractice(entry) {
  const f = path.join(DIR, `practice-y${entry}.json`);
  if (!fs.existsSync(f)) return null;
  return JSON.parse(fs.readFileSync(f, "utf8"));
}

export const PROVIDERS = {
  acer: {
    slug: "acer",
    name: "ACER",
    full: "ACER Scholarship Tests",
    title: "Free ACER Scholarship Test Practice: Maths and Reasoning Questions | Tuterly",
    description:
      "Free ACER scholarship test practice: 10 maths reasoning questions for Years 4, 5 and 6, marked instantly with worked solutions. What the ACER tests cover and how to prepare.",
    h1: "Free ACER scholarship test practice",
    lead: "Ten maths reasoning questions in scholarship style, for Years 4, 5 and 6. Get a mark and a worked solution for every question.",
    about: [
      "ACER runs scholarship tests for many independent schools. The Primary test (Level P) is for entry into Years 4 to 6 and has Reading and Viewing, Mathematics and Writing, on paper. The Secondary tests (Levels 1 to 3) are for entry into Years 7 to 12 and have Written Expression, Humanities and Mathematics, online or on paper.",
      "Each school sets its own test date with ACER, and parents register and pay for each school they apply to.",
      "The Mathematics test rewards working out what a question is really asking, not just recalling a method. That's the skill these questions practise: reading tables, working backwards, patterns, ratios and logic, with no calculator.",
    ],
    facts: [
      ["Primary (Level P)", "Entry into Years 4 to 6: Reading and Viewing, Mathematics, Writing"],
      ["Secondary (Levels 1 to 3)", "Entry into Years 7 to 12: Written Expression, Humanities, Mathematics"],
      ["Registering", "Through each school's ACER registration page, per school"],
    ],
    sources: [{ label: "ACER: Scholarship tests", url: "https://www.acer.org/scholarship" }],
  },
  edutest: {
    slug: "edutest",
    name: "Edutest",
    full: "Edutest scholarship and entrance tests",
    title: "Free Edutest Numerical Reasoning Practice Test, Years 4 to 6 | Tuterly",
    description:
      "Free Edutest-style numerical reasoning practice: 10 questions for Years 4, 5 and 6, marked instantly with worked solutions. What each Edutest section covers and how long it takes.",
    h1: "Free Edutest numerical reasoning practice",
    lead: "Ten numerical reasoning questions in the style of Edutest's scholarship tests, for Years 4, 5 and 6. Get a mark and a worked solution for every question.",
    about: [
      "Edutest tests come in two parts. The ability tests are Verbal Reasoning and Numerical Reasoning. The achievement tests are Reading Comprehension, Mathematics and Written Expression.",
      "Numerical Reasoning is a 30-minute multiple choice test covering series, matrices, arithmetical reasoning and deduction. Mathematics is a separate 30-minute multiple choice test on year-level content. Calculators aren't allowed.",
      "Results compare students with others in the same year level across Australia, and Edutest doesn't offer retests, so going in familiar with the question style matters.",
    ],
    facts: [
      ["Numerical Reasoning", "30 minutes, multiple choice: series, matrices, arithmetical reasoning, deduction"],
      ["Mathematics", "30 minutes, multiple choice: number, measurement, algebra, space, data"],
      ["Also tested", "Verbal Reasoning, Reading Comprehension, Written Expression (15 minutes)"],
      ["Calculator", "Not allowed"],
    ],
    sources: [{ label: "Edutest: scholarship and entrance testing", url: "https://www.edutest.com.au/tests_parents.html" }],
  },
  aas: {
    slug: "aas",
    name: "AAS",
    full: "Academic Assessment Services (AAS) scholarship tests",
    title: "Free AAS Scholarship Test Practice: Maths Reasoning Questions | Tuterly",
    description:
      "Free practice for AAS (Academic Assessment Services) scholarship tests: 10 maths reasoning questions for Years 4, 5 and 6, marked instantly with worked solutions.",
    h1: "Free AAS scholarship test practice",
    lead: "Ten maths reasoning and problem-solving questions for AAS scholarship tests, for Years 4, 5 and 6. Get a mark and a worked solution for every question.",
    about: [
      "Academic Assessment Services (AAS) runs scholarship and entrance tests for many independent schools. Each school chooses its own parts and date.",
      "For example, St Margaret's Berwick Grammar lists four parts for its AAS scholarship test, sat online at home: Abstract Reasoning and Problem Solving, Mathematics Achievement and Reasoning, Reading Comprehension, and Written Expression.",
      "Check your school's scholarship page for its exact parts and date. The questions here practise the maths reasoning and problem solving side.",
    ],
    facts: [
      ["Who sets it", "Each school chooses the parts and the date with AAS"],
      ["Example (St Margaret's Berwick)", "Abstract Reasoning and Problem Solving, Mathematics Achievement and Reasoning, Reading Comprehension, Written Expression"],
    ],
    sources: [{ label: "St Margaret's Berwick Grammar: academic scholarships", url: "https://stmargarets.vic.edu.au/academic-scholarships" }],
  },
};

export const PROVIDER_SLUGS = Object.keys(PROVIDERS);

export const WHY_APP = [
  {
    t: "Practising what they get wrong works best",
    b: "Students improve fastest on the questions they can't do yet, not the ones they already can. So Tuterly Scholarship starts with a full 40-question diagnostic, then turns every question they got wrong into practice.",
  },
  {
    t: "Drills on their own mistakes",
    b: "Each wrong answer gets a worked solution, then fresh versions of the same idea until it's mastered. That's far easier to do in an app than with a stack of practice papers.",
  },
  {
    t: "Built by Victorian educators",
    b: "Designed by the tutors at Bayside Academics in Melbourne, who prepare students for scholarship and selective-entry tests every year.",
  },
  {
    t: "Rewarding for students, clear for parents",
    b: "Students earn stars and streaks as questions move to mastered. Parents can see their progress and which skills still need work.",
  },
];

export function scholarshipFaqs(provider) {
  const p = provider ? PROVIDERS[provider] : null;
  const name = p ? p.name : "scholarship";
  return [
    {
      q: `Are these real ${p ? p.name + " " : ""}test questions?`,
      a: `No. They're Tuterly's own questions, written in the style of scholarship numerical reasoning and maths tests and checked twice. ${p ? `${p.name} doesn't publish its tests, and it doesn't endorse Tuterly.` : "No test provider endorses Tuterly."}`,
    },
    {
      q: "Which year should my child pick?",
      a: "Pick the year they're in now. Year 4 students practise for Year 5 entry, Year 5 for Year 6 entry and Year 6 for Year 7 entry, the most common scholarship year.",
    },
    {
      q: "Can they use a calculator?",
      a: "No. These questions are meant to be done without a calculator, with paper for working. Edutest doesn't allow calculators; for other tests, check the school's instructions.",
    },
    {
      q: "What is Tuterly Scholarship?",
      a: "An app that starts with a full 40-question numerical reasoning diagnostic, then has your child practise the exact questions they got wrong, with worked solutions and fresh versions until each one is mastered. Parents can follow their progress. Sign up on this page to hear when it's ready and get the launch discount.",
    },
  ];
}

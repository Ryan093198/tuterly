import { SITE_URL } from "@/lib/site";

// Shared data for the Years 7 to 10 maths comparison pages
// (/mathspace-alternative, /photomath-alternative, /quizlet-maths-australia).
// Like the /years hubs and /parents/* guides, these use the main Tuterly
// study app CTA only (StudyAppCTA, slim, so no prices show), never the
// Scholarship waitlist. Competitor descriptions stay at the level of public
// product roles; no prices, ratings or claims we cannot check.

export const UPDATED = "2026-10-30";

export const COMPARISONS = [
  {
    href: "/mathspace-alternative",
    name: "Mathspace",
    title: "Mathspace alternative for home practice",
    text: "A school platform for set work and step-by-step feedback, compared with a home loop built from your child's own mistakes.",
  },
  {
    href: "/photomath-alternative",
    name: "Photomath",
    title: "Photomath alternative for Years 7 to 10",
    text: "A camera solver for checking working, compared with practice that turns wrong questions into new ones until they stick.",
  },
  {
    href: "/quizlet-maths-australia",
    name: "Quizlet",
    title: "Quizlet for Years 7 to 10 maths",
    text: "Flashcards for facts and vocabulary, compared with multi-step practice for school topic tests.",
  },
];

// Shared "how Tuterly works" steps, shown on every comparison page.
export const HOW_IT_WORKS = [
  {
    t: "Snap the question they got wrong",
    x: "From homework, a worksheet or a marked topic test. Whole tests can be uploaded too. Each question is filed under its Years 7 to 10 topic.",
  },
  {
    t: "Attempt, then check the worked solution",
    x: "Your child sees a step-by-step method for that exact question, best used after they have had a genuine go themselves.",
  },
  {
    t: "Practise new questions on the same skill",
    x: "Tuterly writes fresh questions on the same concept, so your child practises the method rather than memorising one answer. Questions come back until they are mastered.",
  },
  {
    t: "Test themselves before the real thing",
    x: "Before a topic test, Tuterly builds a practice test from their own mistakes, and you can see progress by topic without re-teaching every night.",
  },
];

export const RESOURCE_LINKS = {
  formulaSheets: { href: "/formula-sheets", label: "Years 7 to 10 maths formula sheets" },
  examPrep: { href: "/maths-exam-preparation", label: "Maths exam preparation by year level" },
  worksheets: { href: "/worksheets", label: "Free maths worksheets, Years 7 to 10" },
  features: { href: "/features", label: "How Tuterly works, feature by feature" },
};

export function pageMetadata({ title, description, path }) {
  const url = `${SITE_URL}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      images: ["/og-tuterly.png"],
      title,
      description,
      url,
      type: "article",
      locale: "en_AU",
      siteName: "Tuterly",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

// BreadcrumbList + Article (about the compared tool) + FAQPage.
// crumbs: [{ name, path }] below Home, ending at the current page.
export function comparisonJsonLd({ title, description, path, crumbs, faqs, tool }) {
  const url = `${SITE_URL}${path}`;
  const org = { "@type": "Organization", name: "Tuterly", url: SITE_URL };
  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [{ name: "Home", path: "" }, ...crumbs].map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: `${SITE_URL}${c.path}`,
      })),
    },
    {
      "@type": "Article",
      "@id": `${url}#page`,
      headline: title,
      description,
      url,
      mainEntityOfPage: url,
      inLanguage: "en-AU",
      datePublished: UPDATED,
      dateModified: UPDATED,
      author: org,
      publisher: org,
      audience: { "@type": "Audience", audienceType: "Parents of Year 7 to 10 students in Australia" },
      about: [
        { "@type": "Thing", name: tool },
        { "@type": "Thing", name: "Secondary school mathematics in Australia" },
      ],
    },
  ];
  if (faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

// Per-page copy that the shell renders (hero, CTA panel, FAQ, links).
// Body sections live in each page.js.
export const PAGES = {
  mathspace: {
    path: "/mathspace-alternative",
    tool: "Mathspace",
    crumb: "Mathspace alternative",
    title: "Mathspace Alternative for Home Maths Practice, Years 7 to 10 | Tuterly",
    description:
      "Looking at Mathspace or an alternative for your Year 7 to 10 child at home? A fair comparison for Australian parents: what Mathspace does well, where a mistake-based home app fits, and when to use both.",
    eyebrow: "Compare · Years 7 to 10 maths",
    h1: "Mathspace alternative: home maths practice for Years 7 to 10",
    lead:
      "Many Australian students already use Mathspace at school. If you are wondering whether to pay for it at home, or whether something different would help more, this guide sets out what each tool is built for, honestly, so you can choose for your child.",
    toc: [
      ["who", "Who this is for"],
      ["does-well", "What Mathspace does well"],
      ["gaps", "Where home needs differ"],
      ["compare", "Side by side"],
      ["choose", "Which to choose"],
      ["how", "How Tuterly works"],
      ["faq", "FAQ"],
    ],
    ctaTitle: "Practice built from your child’s own mistakes",
    ctaText:
      "Tuterly turns each maths question your child gets wrong into a worked solution and fresh practice on the same skill. It covers the same Years 7 to 10 maths as the Australian Curriculum.",
    placement: "compare_mathspace",
    finalTitle: "Keep the school platform. Add a home mistake loop.",
    finalText:
      "Tuterly sits alongside whatever your child uses in class. They snap what they got wrong, practise it until it sticks, and test themselves before the next topic test.",
    faqs: [
      {
        q: "Is Tuterly a replacement for Mathspace at school?",
        a: "No. If your child's school sets work in Mathspace, your child should keep doing it, because that is how their teacher sets and checks tasks. Tuterly is a home study app that works from the questions your child gets wrong, wherever those questions come from, including Mathspace tasks, textbook exercises and marked tests.",
      },
      {
        q: "Should I buy a home Mathspace subscription if my child already uses it at school?",
        a: "It depends on what you want to change. If the goal is more of the same structured, teacher-style practice, extending the platform they already know can make sense, so check Mathspace's own website for current home options. If the goal is fixing the specific questions your child keeps getting wrong before topic tests, a mistake-based app may be the better fit.",
      },
      {
        q: "Does Tuterly follow the Australian Curriculum?",
        a: "Yes. Tuterly is built for Years 7 to 10 maths in Australia and files every question under an Australian Curriculum topic for your child's year level. The Victorian Curriculum follows the same broad content for these years, and topic names match what students see in class.",
      },
      {
        q: "Can my child use Mathspace and Tuterly together?",
        a: "Yes, and this is a common pattern. Mathspace handles the work the teacher sets. When your child gets a question wrong there, or in a test, they snap it into Tuterly, which saves it with a worked solution and generates similar questions until the skill is mastered.",
      },
      {
        q: "Will I be able to see how my child is going?",
        a: "Tuterly gives parents a summary of practice and progress by topic, so you can see what is being worked on without sitting beside your child every night. It does not show you the school's Mathspace data; that stays with the school.",
      },
      {
        q: "Is either app a substitute for a tutor or teacher?",
        a: "No. Both are practice tools. If your child cannot start most questions in a topic, or is well behind year level, talk to their teacher first, and consider a person who can watch them work and re-teach. Our guide to choosing between a maths app and a tutor covers the signs.",
      },
    ],
    links: [
      { href: "/worksheets/year-8-linear-equations", label: "Year 8 linear equations worksheets" },
      { href: "/worksheets/year-9-trigonometry", label: "Year 9 trigonometry worksheets" },
      { href: "/worksheets/year-10-quadratic-equations", label: "Year 10 quadratic equations worksheets" },
      RESOURCE_LINKS.examPrep,
      RESOURCE_LINKS.formulaSheets,
      { href: "/learn/best-maths-apps-years-7-10-australia", label: "Maths apps for Years 7 to 10 in Australia", note: "(our wider round-up)" },
    ],
  },

  photomath: {
    path: "/photomath-alternative",
    tool: "Photomath",
    crumb: "Photomath alternative",
    title: "Photomath Alternative for Years 7 to 10 Maths: A Parent’s Guide | Tuterly",
    description:
      "Photomath shows steps for almost any maths question you photograph. Here is where it helps a Year 7 to 10 student, where copying becomes a risk, and how a mistake-based app builds the skill for school tests.",
    eyebrow: "Compare · Years 7 to 10 maths",
    h1: "Photomath alternative for Years 7 to 10: from checking answers to building the skill",
    lead:
      "Photomath is a genuinely useful solver. Point a camera at a question and it shows steps. The question for parents is what happens next: does your child understand the method well enough to do a similar question in a test, without the phone? This guide compares the two approaches fairly.",
    toc: [
      ["who", "Who this is for"],
      ["does-well", "What Photomath does well"],
      ["gaps", "Where it falls short"],
      ["integrity", "Copying vs learning"],
      ["compare", "Side by side"],
      ["choose", "Which to choose"],
      ["how", "How Tuterly works"],
      ["faq", "FAQ"],
    ],
    ctaTitle: "Turn wrong answers into the next right ones",
    ctaText:
      "Tuterly saves each question your child gets wrong with a worked solution, then writes new questions on the same skill until it sticks. Australian Curriculum, Years 7 to 10.",
    placement: "compare_photomath",
    finalTitle: "Solutions are the start, not the finish",
    finalText:
      "Tuterly keeps every wrong question, brings it back as fresh practice, and builds a test from your child’s own mistakes before the real one.",
    faqs: [
      {
        q: "Is using Photomath cheating?",
        a: "Not in itself. Checking a method after a genuine attempt is a reasonable way to learn. It becomes a problem when answers are copied into homework without an attempt, because the homework then hides what your child cannot yet do. Ask your child's teacher what the school expects, as policies differ.",
      },
      {
        q: "Tuterly also shows worked solutions. How is that different?",
        a: "It is a fair question. Tuterly does show a step-by-step solution, so the same advice applies: attempt first, then check. The difference is what happens after. Tuterly saves the question under its topic, generates new questions on the same skill, brings them back until they are mastered, and builds practice tests from those mistakes.",
      },
      {
        q: "My Year 7 child wants Photomath. Is that a good idea?",
        a: "Younger secondary students are still building the habit of sitting with a hard question. If they use a solver, agree on a rule together, such as writing their own attempt first and only checking afterwards, and look over homework now and then. Our maths homework guide has a simple routine.",
      },
      {
        q: "Does Tuterly follow the Australian Curriculum?",
        a: "Yes. Tuterly is designed by Australian educators at Bayside Academics for Years 7 to 10 maths. Each question is filed under an Australian Curriculum topic for your child's year level, so practice lines up with what is taught in class.",
      },
      {
        q: "Can my child use both Photomath and Tuterly?",
        a: "Yes. Some families use a solver to check a single step during homework and Tuterly to keep and practise the questions that went wrong. The important habit is the same either way: an honest attempt before looking at any solution.",
      },
      {
        q: "Will an app fix it if my child is well behind?",
        a: "Usually not on its own. If your child cannot start most questions in a topic, talk to the teacher and consider a tutor who can watch them work and re-teach. Apps work best when a student is near year level and practising consistently.",
      },
    ],
    links: [
      { href: "/worksheets/year-7-integers", label: "Year 7 integers worksheets" },
      { href: "/worksheets/year-8-algebra", label: "Year 8 algebra worksheets" },
      { href: "/worksheets/year-9-quadratics", label: "Year 9 quadratics worksheets" },
      { href: "/worksheets/year-10-simultaneous-equations", label: "Year 10 simultaneous equations worksheets" },
      RESOURCE_LINKS.formulaSheets,
      { href: "/learn/why-practice-tests-beat-re-reading-notes", label: "Why practice tests beat re-reading notes" },
    ],
  },

  quizlet: {
    path: "/quizlet-maths-australia",
    tool: "Quizlet",
    crumb: "Quizlet for maths",
    title: "Quizlet for Year 7 to 10 Maths in Australia: A Parent’s Guide | Tuterly",
    description:
      "Is Quizlet good for secondary maths? A fair guide for Australian parents: how flashcards help with formulas and vocabulary, why multi-step maths needs more, and how to combine both for Year 7 to 10 topic tests.",
    eyebrow: "Compare · Years 7 to 10 maths",
    h1: "Quizlet for Year 7 to 10 maths in Australia: where it helps and where it doesn’t",
    lead:
      "Quizlet is a popular flashcard tool, and recall practice is one of the most useful study habits there is. Maths topic tests, though, mostly ask students to carry out multi-step methods. This guide explains where flashcards fit for Years 7 to 10, where they fall short, and how to combine them with practice that starts from your child’s mistakes.",
    toc: [
      ["who", "Who this is for"],
      ["does-well", "What Quizlet does well"],
      ["gaps", "Limits for maths"],
      ["compare", "Side by side"],
      ["choose", "Which to choose"],
      ["sets", "Using sets well"],
      ["how", "How Tuterly works"],
      ["faq", "FAQ"],
    ],
    ctaTitle: "Practice that matches how maths is tested",
    ctaText:
      "Tuterly turns each maths question your child gets wrong into a worked solution and new questions on the same skill, so they practise full methods, not just facts.",
    placement: "compare_quizlet",
    finalTitle: "Flashcards for facts. Mistakes for methods.",
    finalText:
      "Keep the flashcards for formulas and vocabulary. Use Tuterly for the multi-step questions that actually decide topic test marks in Years 7 to 10.",
    faqs: [
      {
        q: "Is Quizlet good for high school maths?",
        a: "It is good for the parts of maths that are about recall: formulas, definitions, vocabulary, exact values and rules such as index laws. It is less suited to the multi-step working that most Year 7 to 10 test questions require, because a flashcard usually checks a single answer rather than the method.",
      },
      {
        q: "What should my child put on maths flashcards?",
        a: "Short, recallable items: area and volume formulas, Pythagoras' theorem, trigonometric ratios, index laws, angle facts and key terms like 'gradient' or 'median'. One fact per card, in your child's own words, works better than copying a whole worked example onto a card.",
      },
      {
        q: "How is Tuterly different from a flashcard app?",
        a: "Tuterly starts from full questions your child got wrong, saves each with a step-by-step solution, and generates new questions on the same concept so they practise the whole method. Before a topic test it builds a practice test from those mistakes.",
      },
      {
        q: "Does Tuterly follow the Australian Curriculum?",
        a: "Yes. Tuterly covers Years 7 to 10 maths and files every question under an Australian Curriculum topic for your child's year level, including the Year 10A extension content many schools teach.",
      },
      {
        q: "What about Mathletics, Education Perfect or Khan Academy?",
        a: "These are different again. Mathletics and Education Perfect are mostly used through schools for set practice, and Khan Academy offers free videos and practice exercises, so check how its courses map to your child's year level. Each can help. If your child's school uses one, ask the teacher how it fits with homework. Product details change, so check each official site.",
      },
      {
        q: "Can flashcards and Tuterly work together?",
        a: "Yes. A short flashcard review of formulas and terms, followed by practice on the questions your child got wrong, is a sensible study session. The flashcards make sure the facts are there; the mistake practice makes sure your child can use them.",
      },
    ],
    links: [
      { href: "/worksheets/year-7-algebra", label: "Year 7 algebra worksheets" },
      { href: "/worksheets/year-9-exponent-laws", label: "Year 9 exponent laws worksheets" },
      { href: "/worksheets/year-10-trigonometry", label: "Year 10 trigonometry worksheets" },
      RESOURCE_LINKS.formulaSheets,
      RESOURCE_LINKS.examPrep,
      { href: "/learn/why-practice-tests-beat-re-reading-notes", label: "Why practice tests beat re-reading notes" },
    ],
  },
};

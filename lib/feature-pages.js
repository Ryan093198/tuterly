// Feature marketing pages: /features and /features/[slug]. Short and easy
// to read, each point backed by a real app screen (public/app-screens).
// Facts from MARKETING-FEATURES.md (29 Oct 2026, checked against the app's
// code). Uses the app's own labels: Snap a question, Test any topic, Fix my
// mistakes (as on the Home screen), Study notes, Mastered.
// Left out until it ships: the term planner upload.
const S = "/app-screens";

export const FEATURES = [
  {
    slug: "snap-a-question",
    name: "Snap a question",
    icon: "snap",
    short: "Photograph a question they got wrong. Get the full worked solution, then fresh questions on the same idea until it’s mastered.",
    title: "Snap a Maths Question, Get the Worked Solution and Practice",
    h1: ["Snap a question.", "Master the idea behind it."],
    lead: "Got one wrong in homework or a test? Take a photo. Tuterly shows the full worked solution, then gives a fresh question on the same idea, so the next one is right.",
    hero: { src: `${S}/flow-snap/05-similar-question-correct.png`, alt: "Tuterly marking a similar question right: Too easy! with a star and +5 XP" },
    steps: [
      { src: `${S}/flow-snap/02-snap-menu.png`, alt: "The Snap a question sheet: take a photo, choose from photos, or upload a whole test", title: "Snap it", text: "Take a photo, pick a screenshot, or upload a whole test." },
      { src: `${S}/flow-snap/03-question-solution-hidden.png`, alt: "A question the student got wrong, with the solution hidden and a similar question to master", title: "Try it again first", text: "The solution stays hidden, so they have another go before looking." },
      { src: `${S}/flow-snap/04-solution-shown.png`, alt: "The worked solution: the key idea, three steps and the answer", title: "See every step", text: "The key idea, each step, and a check at the end." },
      { src: `${S}/flow-snap/05-similar-question-correct.png`, alt: "The similar question marked right, with a star and +5 XP", title: "Master it", text: "Fresh questions on the same idea. Three right and it’s mastered." },
    ],
    points: [
      { title: "Hints, not answers", text: "Stuck? A hint shows the method, then the first step. Never the answer." },
      { title: "Explain this", text: "Got it wrong? It points to the exact step that went wrong." },
      { title: "Reads handwriting", text: "If a photo is unclear it asks “Is this what you wrote?”, or they can type it." },
    ],
    faqs: [
      { q: "Isn’t this just a way to get answers?", a: "No. The solution is hidden until they choose to see it, hints never give the answer away, and a question is only mastered when they get fresh versions right themselves." },
      { q: "What if there are several questions in one photo?", a: "Tuterly splits them into a checklist, so they can choose which ones to add." },
    ],
  },
  {
    slug: "test-any-topic",
    name: "Test any topic",
    icon: "test",
    short: "A short practice test on any topic in their year, even before they’ve snapped anything. Every wrong answer becomes practice.",
    title: "Test Any Topic: Maths Practice Tests for Years 7 to 10",
    h1: ["Test any topic.", "Then fix what went wrong."],
    lead: "A short practice test on any topic in their year, one question from each part of it, with a worked solution for every question. The ones they miss go straight into Fix my mistakes.",
    hero: { src: `${S}/flow-practice/03-test-question.png`, alt: "A Tuterly practice test: question 1 of 8, a Pythagoras ladder problem" },
    steps: [
      { src: `${S}/flow-practice/02-test-any-topic-list.png`, alt: "Test any topic: a list of textbook topics, two tests ready", title: "Pick a topic", text: "Any topic in their year, from the Victorian Curriculum. No snaps needed." },
      { src: `${S}/flow-practice/03-test-question.png`, alt: "Question 1 of 8 with an answer typed in and maths keys", title: "Take the test", text: "One question from each part of the topic, with maths keys to type answers." },
      { src: `${S}/flow-practice/04-test-score.png`, alt: "Test result: Great work! 6 out of 8", title: "See the score", text: "Marked straight away, with XP for finishing." },
      { src: `${S}/flow-practice/05-test-results.png`, alt: "Test results: the 2 wrong answers are saved to the bank", title: "Fix my mistakes", text: "Wrong answers are saved, ready to drill one after another." },
    ],
    points: [
      { title: "A new test every time", text: "Questions are written fresh, so a retest is a real test, not a memory test." },
      { title: "Every question double-checked", text: "Each question is solved a second time, independently, before a student sees it." },
      { title: "Fair marking", text: "Equivalent answers count: surds, fractions and different notation." },
    ],
    faqs: [
      { q: "Which topics can they test?", a: "Every Years 7 to 10 maths topic in the Victorian Curriculum 2.0. Each test covers a whole topic, one question from each part of it." },
      { q: "What happens to the questions they get wrong?", a: "They go into their bank with a worked solution. Fix my mistakes works through them one after another, with fresh questions on the same idea." },
    ],
  },
  {
    slug: "study-notes",
    name: "Study notes",
    icon: "notes",
    short: "A revision sheet on a whole topic, or just the parts they find hard, with worked examples. Download or share as a PDF.",
    title: "Maths Study Notes and Revision Sheets, Years 7 to 10",
    h1: ["Study notes,", "made for their next test."],
    lead: "Pick the topics the test covers. Tuterly writes a revision sheet with the key ideas, worked examples, what to watch out for and a quick check.",
    hero: { src: `${S}/flow-notes/03-notes-sheet.png`, alt: "A Tuterly revision sheet with a summary and the key ideas" },
    steps: [
      { src: `${S}/flow-notes/01-pick-topics.png`, alt: "Generate notes: pick up to 4 topics", title: "Pick the topics", text: "Up to four topics their next test covers." },
      { src: `${S}/flow-notes/02-generate-notes-choice.png`, alt: "What should the notes cover? The whole topic, or just what I find hard", title: "Whole topic or hard parts", text: "Everything in the topic, or only what they’ve been getting wrong." },
      { src: `${S}/flow-notes/03-notes-sheet.png`, alt: "The finished revision sheet: summary and key ideas", title: "Revise from it", text: "Key ideas and worked examples. Download or share as a PDF." },
    ],
    points: [
      { title: "Built from their mistakes", text: "“Just what I find hard” uses the questions they got wrong, not a generic summary." },
      { title: "Worked examples", text: "Each key idea comes with an example worked through step by step." },
      { title: "Ready for the night before", text: "Save it, print it, or share it as a PDF." },
    ],
    faqs: [
      { q: "How long are the notes?", a: "As long as the topic needs. A whole-topic sheet covers every part of it; a “just what I find hard” sheet is shorter and focused." },
      { q: "Can they use the notes offline?", a: "Yes. Download the sheet as a PDF to print or keep on their phone." },
    ],
  },
  {
    slug: "upload-a-test",
    name: "Upload a whole test",
    icon: "upload",
    short: "Upload a marked school test. The questions marked wrong are found automatically and turned into new practice.",
    title: "Upload a Marked Maths Test and Practise the Questions You Got Wrong",
    h1: ["Upload a whole test.", "Practise what it got wrong."],
    lead: "When a marked test comes home, photograph every page or upload the PDF or Word file. Tuterly finds the questions marked wrong and turns each one into new practice.",
    hero: { src: `${S}/flow-snap/03-question-solution-hidden.png`, alt: "A question from an uploaded test, marked wrong, with a similar question to master" },
    steps: [
      { src: `${S}/flow-snap/02-snap-menu.png`, alt: "Snap a question: Upload a whole test, with photos, a PDF or a Word document", title: "Upload it", text: "Photos of each page, a PDF or a Word document." },
      { src: `${S}/flow-snap/03-question-solution-hidden.png`, alt: "Question 4 from an uploaded test, marked wrong, with a similar question underneath", title: "Wrong ones saved", text: "Questions marked wrong are ticked for them, each with a worked solution." },
      { src: `${S}/flow-snap/05-similar-question-correct.png`, alt: "A similar question marked right with a star", title: "Master each one", text: "Fresh questions on each idea until it’s mastered." },
    ],
    points: [
      { title: "No typing", text: "Every question on the test is read for them." },
      { title: "Their real school work", text: "Practice comes from the test their teacher set, so it matches their class." },
      { title: "Parents can upload too", text: "From a linked parent account, upload tests and practice papers from your own phone." },
    ],
    faqs: [
      { q: "What file types work?", a: "Photos of each page, a PDF or a Word document." },
      { q: "What if a question isn’t marked wrong but they didn’t understand it?", a: "Every question on the test is listed, and the wrong ones are just pre-ticked. They can tick any others they want to practise." },
    ],
  },
];

export function getFeature(slug) {
  return FEATURES.find((f) => f.slug === slug) || null;
}

// "Learning that sticks" and "for parents" points for the hub, no screens.
export const STICKS = [
  { title: "Solution hidden first", text: "They try again before they look." },
  { title: "Comes back to check", text: "Questions they got right return after 3, 7 and 21 days, so they stay learned." },
  { title: "Test countdown", text: "Tell it a test is coming and it counts down and focuses on those topics." },
  { title: "Rewards that build a habit", text: "XP, stars, a weekly streak, and double XP for fixing a question within 48 hours." },
];

// Feature marketing pages: /features and /features/[slug]. Short and easy
// to read, each point backed by a real app screen (public/app-screens).
// Facts from MARKETING-FEATURES.md (29 Oct 2026, checked against the app's
// code). Uses the app's own labels: Snap a question, Topic check, Fix my
// mistakes (as on the Home screen), Study notes, Mastered.
// Term planner upload: confirmed built by Ryan (29 Oct 2026), although
// MARKETING-FEATURES.md still lists it as in progress.
const S = "/app-screens";

export const FEATURES = [
  {
    // Exam Zone (8 Nov 2026). Screens and video from Ryan's demo run: a demo
    // student, Mia, Year 9, with made-up test materials (marketing/
    // exam-zone-demo). Facts from the student features doc (7 Nov 2026).
    slug: "exam-zone",
    name: "Exam Zone",
    icon: "test",
    short: "Upload the test outline, past papers and teacher’s notes. Tuterly writes a practice exam in the style of the real one, marks it by topic and turns every miss into practice.",
    title: "Exam Zone: Maths Practice Exams Written From Your Child’s Own Test Outline",
    h1: ["Their next maths test,", "practised before they sit it."],
    lead: "Add the test outline, a past paper and the teacher’s notes. Tuterly works out what’s on the test and how the school writes its questions, then writes a brand new practice exam in the same style. It marks it by topic and turns every question they miss into practice. Years 7 to 10, Australian Curriculum.",
    video: {
      src: "/videos/tuterly-exam-zone-demo.mp4",
      poster: "/videos/tuterly-exam-zone-demo-poster.jpg",
      label: "Tuterly Exam Zone demo: add the test outline, a past paper and the teacher's notes, Tuterly writes a practice exam in the school's style, then marks it by topic so your child can fix what they missed.",
    },
    hero: { src: `${S}/flow-exam-zone/05-marked-by-topic.png`, alt: "A practice exam marked 14 out of 20, with marks for each topic on the test" },
    steps: [
      { src: `${S}/flow-exam-zone/02-great-match.png`, alt: "Exam Zone with the test outline and a past paper read, and the match meter at Great match", title: "Add the test material", text: "The outline, past papers and teacher’s notes, as photos, a PDF or a Word file." },
      { src: `${S}/flow-exam-zone/03-exam-set-up.png`, alt: "The exam set up: Term 4 topic test on Thu 19 Nov, the two topics on it, and the style of the school’s paper", title: "It reads the test", text: "It finds the topics and the test date, and how the school writes its questions." },
      { src: `${S}/flow-exam-zone/04-exam-ready.png`, alt: "Your practice exam is ready: 20 questions, 30 minutes, with Start, Print and Share PDF", title: "A new practice exam", text: "Sit it in the app, or print it and sit it on paper." },
      { src: `${S}/flow-exam-zone/05-marked-by-topic.png`, alt: "The practice exam marked 14 out of 20, with marks for each topic", title: "Marked by topic", text: "See exactly which topics cost marks, with a worked solution for every question." },
      { src: `${S}/flow-exam-zone/07-fix-what-you-missed.png`, alt: "Fix what you missed: each wrong question with Try again and Similar one", title: "Fix what they missed", text: "Redo each one, or try a similar question, until it sticks." },
    ],
    points: [
      { title: "Their school’s style", text: "New questions on the topics in the outline, set out the way the school sets out its tests. It never copies the school’s questions." },
      { title: "A match meter", text: "From “Based on your topics” to “Great match”, it shows how close the practice exam can get and what to add next." },
      { title: "Works on paper too", text: "Print the exam on A4 to make it feel like the real thing, then photograph the written answers to have them marked." },
      { title: "Every mark explained", text: "Each wrong answer shows why it was wrong and a worked solution, then goes into their question bank for later practice." },
      { title: "Re-sit with new questions", text: "Sit the same exam again with new numbers and wording, so they practise the method, not the answer." },
      { title: "Ready for test day", text: "Set the test date for a countdown and choose the length. The timer is optional." },
    ],
    faqs: [
      { q: "Will these be the exact questions on the real test?", a: "Nobody can promise that, and Tuterly never copies the school’s questions. It writes new questions on the topics in the outline, in the style of the past papers, so the real test feels familiar. The more you add, the closer the match, and the match meter shows how close it can get." },
      { q: "What do we need to upload?", a: "Whatever you have: a test or term outline, past papers, and the teacher’s notes or revision sheets. Photos, a PDF or a Word file all work. With nothing to upload, pick up to 6 topics and it writes from those." },
      { q: "Can my child sit it on paper?", a: "Yes. The exam prints as an A4 PDF. Afterwards they photograph their written answers, check what was read, and it’s marked." },
      { q: "What happens to the questions they get wrong?", a: "Each one is listed under Fix what you missed with its worked solution. They can redo it or try a similar question, and it’s saved to their question bank so it comes back in later practice." },
      { q: "Is it just giving them answers?", a: "No. It’s a practice exam they sit themselves. Worked solutions come after marking, and every miss turns into fresh practice they have to get right on their own." },
    ],
  },
  {
    slug: "snap-a-question",
    name: "Snap a question",
    icon: "snap",
    short: "Photograph a question they got wrong. Get the full worked solution, then fresh questions on the same idea until it’s mastered.",
    // Retargeted 6 Nov 2026 at "maths scanner / photo solver" searches (math
    // solver scanner 260 a month, plus many "take a picture of a math problem"
    // variants): a scanner that teaches, not just solves.
    title: "Maths Scanner App That Teaches: Snap a Question, See Every Step, Then Practise",
    h1: ["Snap a question.", "Master the idea behind it."],
    lead: "Got one wrong in homework or a test? Take a photo. Tuterly shows a detailed worked solution, then gives fresh questions on the same idea until your child can do it on their own. A maths scanner built for Australian Years 7 to 10, not just an answer app.",
    hero: { src: `${S}/flow-snap/03-question-solution-hidden.png`, alt: "A question the student got wrong, from their uploaded test, with a fresh question on the same idea to master" },
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
      { title: "More than a solver", text: "Every snapped question is saved, then comes back with fresh versions until it’s mastered." },
      { title: "Australian Curriculum", text: "Years 7 to 10, including 10A, filed under the right topic for their year." },
    ],
    faqs: [
      { q: "Is Tuterly a maths solver app?", a: "It solves the question you snap, with a detailed worked solution, but that’s the start, not the end. It then gives fresh questions on the same idea, genuinely different, not just new numbers, and keeps bringing them back until your child can do them on their own." },
      { q: "How is it different from Photomath and other maths scanner apps?", a: "A scanner app explains one problem at a time. Tuterly saves every question your child got wrong, hides the solution until they’ve tried again, gives fresh practice on the same skill, and adds topic tests and study notes for the Australian Curriculum, Years 7 to 10. (Tuterly isn’t affiliated with Photomath.)" },
      { q: "Can I take a picture of a whole test?", a: "Yes. Upload photos of each page, a PDF or a Word document. The questions marked wrong are picked out for you." },
      { q: "Isn’t this just a way to get answers?", a: "No. The solution is hidden until they choose to see it, hints never give the answer away, and a question is only mastered when they get fresh versions right themselves." },
      { q: "What if there are several questions in one photo?", a: "Tuterly splits them into a checklist, so they can choose which ones to add." },
    ],
  },
  {
    slug: "topic-check",
    name: "Topic check",
    icon: "test",
    short: "A short practice test on any topic in their year, even before they’ve snapped anything. It covers every sub-topic a school test is likely to include, and any question they get wrong goes into their question bank to try again later.",
    title: "Topic Check: Maths Topic Tests for Years 7 to 10",
    h1: ["Topic check.", "Then fix what went wrong."],
    lead: "A short practice test on any topic in their year, even before they’ve snapped anything. It covers every sub-topic a school test is likely to include, with a worked solution for every question. Any question they get wrong goes into their question bank, so they can try more like it later.",
    hero: { src: `${S}/flow-practice/03-test-question.png`, alt: "A Tuterly practice test: question 1 of 8, a Pythagoras ladder problem" },
    steps: [
      { src: `${S}/flow-practice/02-test-any-topic-list.png`, alt: "Test any topic: a list of textbook topics, two tests ready", title: "Pick a topic", text: "Any topic in their year, from the Australian Curriculum. No snaps needed." },
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
      { q: "Which topics can they test?", a: "Every Years 7 to 10 maths topic in the Australian Curriculum. Each test covers a whole topic, one question from each part of it." },
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
      { title: "Parents can upload too", text: "From a linked parent account, upload tests, practice papers and the term planner. Topic tests then focus on what’s coming up this term." },
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
  { title: "Test countdown", text: "Tell it a test is coming, or upload the term planner, and it focuses on what’s next." },
  { title: "Rewards that build a habit", text: "XP, stars, a weekly streak, and double XP for fixing a question within 48 hours." },
];

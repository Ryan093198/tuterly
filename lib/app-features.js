// Every feature of the Tuterly app, as short tiles. Shared by the students
// page ("All the features") and /features, so both always match. Facts from
// TUTERLY-STUDY-FEATURES.md: no marks promises.
const T = {
  snap: { icon: "snap", title: "Snap a question", text: "Any wrong question from homework or a test, solved step by step and filed under the right topic." },
  upload: { icon: "upload", title: "Upload a whole test", text: "It finds every question, picks out the ones that look wrong, and you choose which to practise." },
  similar: { icon: "practice", tone: "violet", title: "Similar and harder questions", text: "A new question on the same idea, then a harder one, so you can’t just remember the answer." },
  hints: { icon: "explain", tone: "streak", title: "Hints, then solutions", text: "Try first, get a nudge, then see the full method. After a wrong answer, it explains the step that went wrong." },
  mastery: { icon: "star", tone: "xp", title: "Mastery you can see", text: "Every question moves from To fix to Learning to Mastered, with stars along the way." },
  drills: { icon: "drill", tone: "success", title: "Drills", text: "Run through your mistakes, one topic or several together." },
  spaced: { icon: "book", tone: "violet", title: "Spaced review", text: "Questions you got right come back after 3 days, a week and three weeks, so you don’t forget them." },
  check: { icon: "test", tone: "violet", title: "Topic check", text: "A short test on any topic, one question from each part of it. No snapping needed." },
  tests: { icon: "checked", tone: "success", title: "Topic tests and weekly review", text: "Prove you’ve mastered a topic, and a quick check on this week’s questions." },
  notes: { icon: "notes", title: "Study notes", text: "A one-page revision sheet on a topic, or only the bits you find hard. Save it or share it as a PDF." },
  maps: { icon: "bank", title: "Mind maps", text: "40 one-page maps across Years 7 to 10, with rules, examples and diagrams. Free." },
  widget: { icon: "goal", title: "Quick questions widget", text: "Practice on your home screen. Answer without opening the app." },
  quinn: { icon: "streak", tone: "streak", title: "Goals, streaks and Quinn", text: "Weekly goals, XP and stars. Master a topic to unlock a new accessory for Quinn the quokka." },
  examStyle: { icon: "school", tone: "violet", title: "Exam Zone practice exams", text: "New questions on your topics, set out the way your school sets out its tests. It never copies your school’s questions." },
  match: { icon: "goal", title: "Match meter", text: "From “Based on your topics” to “Great match”. It tells you what to add next to get closer." },
  examDay: { icon: "flag", tone: "streak", title: "Exam day set-up", text: "Name the exam, set the date for a countdown and choose the length. The timer is optional." },
  byTopic: { icon: "checked", tone: "success", title: "Marks by topic", text: "See exactly which topics cost you marks, with a worked solution for every question." },
  resit: { icon: "practice", tone: "violet", title: "Same exam, new numbers", text: "Re-sit it with new figures and slightly different wording, so you learn the method, not the answer." },
  paper: { icon: "notes", title: "Print it, sit it on paper", text: "An A4 PDF that feels like the real thing. Photograph your written answers and it marks them." },
  termPlan: { icon: "book", tone: "streak", title: "Term plan", text: "Upload your class’s term plan for this week’s topic and a countdown to every test." },
  parents: { icon: "star", tone: "xp", title: "Weekly view for parents", text: "Link with a 6-character code. Parents see what was added, fixed and mastered, test scores and the trickiest topic. Never the photos." },
};

// The students page's "All the features" grid.
export const STUDENT_FEATURES = [T.snap, T.similar, T.hints, T.mastery, T.drills, T.spaced, T.check, T.tests, T.notes, T.maps, T.widget, T.quinn];

// /features: every feature, in groups.
export const FEATURE_GROUPS = [
  { title: "Snap and fix", items: [T.snap, T.upload, T.similar, T.hints, T.mastery] },
  { title: "Practise and revise", items: [T.drills, T.spaced, T.check, T.tests, T.notes, T.maps, T.widget] },
  { title: "Exam Zone", items: [T.examStyle, T.match, T.examDay, T.byTopic, T.resit, T.paper, T.termPlan] },
  { title: "Keep it going", items: [T.quinn, T.parents] },
];

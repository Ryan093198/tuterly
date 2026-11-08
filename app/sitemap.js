import { getChapterPages } from "@/lib/chapter-pages";
import { STATE_CODES } from "@/lib/state-curriculum";
import { SEO_SUBURBS, isPublishable } from "@/lib/seo-suburbs";
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { SKILL_PAGES } from "@/lib/skill-pages";
import { SITE_URL } from "@/lib/site";
import { writtenTopicTest } from "@/lib/topic-test-files";
import { getAllPosts } from "@/lib/learn";
import { teacherChapterPath } from "@/lib/teacher-resources";
import { LIVE_YEARS, mindMapPath, mindMapsForYear, revisionYearPath } from "@/lib/mind-maps";

// Public marketing pages Google should be aware of. Anything under
// /dashboard, /auth, /onboarding, /api, /invite is excluded — those
// are app routes (auth-gated and/or not useful in search results) and
// app/robots.js disallows them too.
// Paused pages (the tutor marketplace, tutor jobs, the primary practice
// tests) redirect home in proxy.js and are left out here.
const STATIC_PAGES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/parents", priority: 0.8, changeFrequency: "monthly" },
  { path: "/students", priority: 0.8, changeFrequency: "monthly" },
  { path: "/students/year-7", priority: 0.7, changeFrequency: "monthly" },
  { path: "/students/year-8", priority: 0.7, changeFrequency: "monthly" },
  { path: "/students/year-9", priority: 0.7, changeFrequency: "monthly" },
  { path: "/students/year-10", priority: 0.7, changeFrequency: "monthly" },
  { path: "/try", priority: 0.9, changeFrequency: "monthly" },
  { path: "/guarantee", priority: 0.5, changeFrequency: "monthly" },
  { path: "/naplan", priority: 0.8, changeFrequency: "monthly" },
  { path: "/formula-sheets", priority: 0.7, changeFrequency: "monthly" },
  { path: "/exam-generator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/results", priority: 0.6, changeFrequency: "monthly" },
  { path: "/scholarship-practice", priority: 0.8, changeFrequency: "monthly" },
  { path: "/scholarship-practice/acer", priority: 0.8, changeFrequency: "monthly" },
  { path: "/scholarship-practice/edutest", priority: 0.8, changeFrequency: "monthly" },
  { path: "/scholarship-practice/aas", priority: 0.8, changeFrequency: "monthly" },
  { path: "/scholarship", priority: 0.8, changeFrequency: "monthly" },
  { path: "/scholarship/acer-vs-edutest-vs-aas", priority: 0.8, changeFrequency: "monthly" },
  { path: "/scholarship/year-7-entry-guide", priority: 0.8, changeFrequency: "monthly" },
  { path: "/scholarship/year-5-and-year-6-prep", priority: 0.7, changeFrequency: "monthly" },
  { path: "/formula-sheets/year-7-maths", priority: 0.7, changeFrequency: "monthly" },
  { path: "/formula-sheets/year-8-maths", priority: 0.7, changeFrequency: "monthly" },
  { path: "/formula-sheets/year-9-maths", priority: 0.7, changeFrequency: "monthly" },
  { path: "/formula-sheets/year-10-maths", priority: 0.7, changeFrequency: "monthly" },
  { path: "/formula-sheets/year-10a-maths", priority: 0.7, changeFrequency: "monthly" },
  { path: "/naplan/year-3-numeracy", priority: 0.8, changeFrequency: "monthly" },
  { path: "/naplan/year-5-numeracy", priority: 0.8, changeFrequency: "monthly" },
  { path: "/naplan/year-7-numeracy", priority: 0.8, changeFrequency: "monthly" },
  { path: "/naplan/year-9-numeracy", priority: 0.8, changeFrequency: "monthly" },
  { path: "/naplan/past-papers", priority: 0.8, changeFrequency: "monthly" },
  { path: "/naplan/year-3-numeracy/practice-test.pdf", priority: 0.6, changeFrequency: "monthly" },
  { path: "/naplan/year-5-numeracy/practice-test.pdf", priority: 0.6, changeFrequency: "monthly" },
  { path: "/naplan/year-7-numeracy/practice-test.pdf", priority: 0.6, changeFrequency: "monthly" },
  { path: "/naplan/year-9-numeracy/practice-test.pdf", priority: 0.6, changeFrequency: "monthly" },
  { path: "/features", priority: 0.8, changeFrequency: "monthly" },
  { path: "/features/exam-zone", priority: 0.8, changeFrequency: "monthly" },
  { path: "/features/snap-a-question", priority: 0.7, changeFrequency: "monthly" },
  { path: "/features/topic-check", priority: 0.7, changeFrequency: "monthly" },
  { path: "/features/study-notes", priority: 0.7, changeFrequency: "monthly" },
  { path: "/features/upload-a-test", priority: 0.7, changeFrequency: "monthly" },
  { path: "/maths-exam-preparation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/maths-exam-preparation/year-7", priority: 0.7, changeFrequency: "monthly" },
  { path: "/maths-exam-preparation/year-8", priority: 0.7, changeFrequency: "monthly" },
  { path: "/maths-exam-preparation/year-9", priority: 0.7, changeFrequency: "monthly" },
  { path: "/maths-exam-preparation/year-10", priority: 0.7, changeFrequency: "monthly" },
  { path: "/worksheets", priority: 0.7, changeFrequency: "monthly" },
  { path: "/worksheets/year-7", priority: 0.8, changeFrequency: "monthly" },
  { path: "/worksheets/year-8", priority: 0.8, changeFrequency: "monthly" },
  { path: "/worksheets/year-9", priority: 0.8, changeFrequency: "monthly" },
  { path: "/worksheets/year-10", priority: 0.8, changeFrequency: "monthly" },
  { path: "/worksheets/algebra", priority: 0.8, changeFrequency: "monthly" },
  { path: "/worksheets/area-and-perimeter", priority: 0.8, changeFrequency: "monthly" },
  { path: "/worksheets/index-laws", priority: 0.8, changeFrequency: "monthly" },
  { path: "/worksheets/trigonometry", priority: 0.8, changeFrequency: "monthly" },
  { path: "/worksheets/probability", priority: 0.8, changeFrequency: "monthly" },
  { path: "/year-7-maths-test", priority: 0.8, changeFrequency: "monthly" },
  { path: "/year-8-maths-test", priority: 0.8, changeFrequency: "monthly" },
  { path: "/year-9-maths-test", priority: 0.8, changeFrequency: "monthly" },
  { path: "/year-10-maths-test", priority: 0.8, changeFrequency: "monthly" },
  { path: "/year-7-maths", priority: 0.8, changeFrequency: "monthly" },
  { path: "/year-8-maths", priority: 0.8, changeFrequency: "monthly" },
  { path: "/year-9-maths", priority: 0.8, changeFrequency: "monthly" },
  { path: "/year-10-maths", priority: 0.8, changeFrequency: "monthly" },
  { path: "/years/year-7-maths", priority: 0.8, changeFrequency: "monthly" },
  { path: "/years/year-8-maths", priority: 0.8, changeFrequency: "monthly" },
  { path: "/years/year-9-maths", priority: 0.8, changeFrequency: "monthly" },
  { path: "/years/year-10-maths", priority: 0.8, changeFrequency: "monthly" },
  { path: "/years", priority: 0.8, changeFrequency: "monthly" },
  { path: "/parents/help-with-secondary-maths-homework", priority: 0.8, changeFrequency: "monthly" },
  { path: "/parents/maths-app-vs-tutoring", priority: 0.8, changeFrequency: "monthly" },
  { path: "/parents/end-of-year-maths-report", priority: 0.8, changeFrequency: "monthly" },
  { path: "/parents/studied-but-failed-maths-test", priority: 0.8, changeFrequency: "monthly" },
  { path: "/parents/dyscalculia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/teachers", priority: 0.9, changeFrequency: "monthly" },
  { path: "/best-maths-apps-australia", priority: 0.9, changeFrequency: "monthly" },
  { path: "/maths", priority: 0.8, changeFrequency: "monthly" },
  { path: "/maths/pythagoras-theorem", priority: 0.9, changeFrequency: "monthly" },
  { path: "/maths/sohcahtoa", priority: 0.9, changeFrequency: "monthly" },
  { path: "/maths/index-laws", priority: 0.9, changeFrequency: "monthly" },
  { path: "/calculators/pythagoras", priority: 0.9, changeFrequency: "monthly" },
  { path: "/calculators/trigonometry", priority: 0.9, changeFrequency: "monthly" },
  { path: "/maths/surds", priority: 0.9, changeFrequency: "monthly" },
  { path: "/maths/simultaneous-equations", priority: 0.9, changeFrequency: "monthly" },
  { path: "/maths/gradient", priority: 0.9, changeFrequency: "monthly" },
  { path: "/maths/3d-pythagoras", priority: 0.8, changeFrequency: "monthly" },
  { path: "/calculators/standard-deviation", priority: 0.9, changeFrequency: "monthly" },
  { path: "/calculators/quadratic-formula", priority: 0.9, changeFrequency: "monthly" },
  { path: "/parents/kumon-cost-australia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/parents/cluey-learning-review", priority: 0.8, changeFrequency: "monthly" },
  { path: "/parents/preparing-for-maths-topic-tests", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tutoring", priority: 0.7, changeFrequency: "weekly" },
  // High-intent exam-prep landing pages. Listed alongside the suburb
  // pages because they target the strongest parent search intents on
  // the tutoring side (selective entry + scholarship).
  { path: "/tutoring/selective-entry-exam-prep", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tutoring/scholarship-exam-prep", priority: 0.8, changeFrequency: "monthly" },
  // Bottom-of-funnel SEO landing pages - comparison, pricing,
  // topic-focused, and showcase. These target high-intent decision
  // queries so they get a high sitemap priority.
  { path: "/cluey-alternative", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tutor-doctor-alternative", priority: 0.8, changeFrequency: "monthly" },
  { path: "/mathspace-alternative", priority: 0.8, changeFrequency: "monthly" },
  { path: "/photomath-alternative", priority: 0.8, changeFrequency: "monthly" },
  { path: "/quizlet-maths-australia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/best-tutoring-melbourne", priority: 0.8, changeFrequency: "monthly" },
  { path: "/vce-tutoring", priority: 0.8, changeFrequency: "monthly" },
  { path: "/online-tutoring-melbourne", priority: 0.8, changeFrequency: "monthly" },
  { path: "/best-online-tutoring-melbourne", priority: 0.9, changeFrequency: "monthly" },
  { path: "/best-online-tutoring-victoria", priority: 0.9, changeFrequency: "monthly" },
  { path: "/practice-maths-tests-secondary", priority: 0.9, changeFrequency: "monthly" },
  { path: "/end-of-year-maths-exams", priority: 0.9, changeFrequency: "monthly" },
  { path: "/scholarship-test-prep", priority: 0.8, changeFrequency: "monthly" },
  { path: "/atar-planner", priority: 0.9, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap() {
  const now = new Date();

  const statics = STATIC_PAGES.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // Only publishable suburb pages enter the sitemap — entries without
  // a blurb or school list are treated as drafts and held back so
  // Google doesn't index thin content under our domain. 
  const publishable = SEO_SUBURBS.filter(isPublishable);
  const parentSuburbs = publishable.map((s) => ({
    url: `${SITE_URL}/tutoring/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: s.tier === 1 ? 0.7 : s.tier === 2 ? 0.6 : 0.5,
  }));


  // Topic-specific worksheet landing pages (e.g. /worksheets/year-7-geometry)
  const worksheetTopics = WORKSHEET_LANDING_PAGES.map((p) => ({
    url: `${SITE_URL}/worksheets/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  for (const code of STATE_CODES) {
    worksheetTopics.push({ url: `${SITE_URL}/worksheets/${code}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }
  for (const s of SKILL_PAGES) {
    worksheetTopics.push({ url: `${SITE_URL}/worksheets/${s.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }
  // The free practice sheet PDF on each topic page that has a written test.
  for (const p of WORKSHEET_LANDING_PAGES) {
    if (writtenTopicTest(p.yearLevel, p.topicId)) {
      worksheetTopics.push({ url: `${SITE_URL}/worksheets/${p.slug}/practice-questions.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });
    }
  }

  // The Learn hub and every published article (content/learn/*.md).
  const learn = [
    { url: `${SITE_URL}/learn`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...getAllPosts().map((p) => {
      const d = p.date ? new Date(p.date) : null;
      return {
        url: `${SITE_URL}/learn/${p.slug}`,
        lastModified: d && !Number.isNaN(d.getTime()) ? d : now,
        changeFrequency: "monthly",
        priority: 0.6,
      };
    }),
  ];

  // Mind maps: the hub and one page per chapter.
  const mindMaps = [
    { url: `${SITE_URL}/mind-maps`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...LIVE_YEARS.map((y) => ({ url: `${SITE_URL}${revisionYearPath(y)}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 })),
    ...LIVE_YEARS.flatMap((y) => mindMapsForYear(y).map((m) => ({ url: `${SITE_URL}${mindMapPath(m)}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 }))),
  ];

  const chapterTests = [
    { url: `${SITE_URL}/maths-tests`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...getChapterPages().map((c) => ({ url: `${SITE_URL}${c.path}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 })),
    // Teacher pages (8 Nov 2026)
    { url: `${SITE_URL}/teachers/resources`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/teachers/printable-exam`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...getChapterPages().map((c) => ({ url: `${SITE_URL}${teacherChapterPath(c)}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 })),
  ];
  return [
    ...statics,
    ...chapterTests,
    ...parentSuburbs,
    ...worksheetTopics,
    ...learn,
    ...mindMaps,
  ];
}

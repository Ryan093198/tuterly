import { SEO_SUBURBS, isPublishable } from "@/lib/seo-suburbs";
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/learn";

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
  { path: "/maths-exam-preparation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/maths-exam-preparation/year-7", priority: 0.7, changeFrequency: "monthly" },
  { path: "/maths-exam-preparation/year-8", priority: 0.7, changeFrequency: "monthly" },
  { path: "/maths-exam-preparation/year-9", priority: 0.7, changeFrequency: "monthly" },
  { path: "/maths-exam-preparation/year-10", priority: 0.7, changeFrequency: "monthly" },
  { path: "/worksheets", priority: 0.7, changeFrequency: "monthly" },
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
  { path: "/best-tutoring-melbourne", priority: 0.8, changeFrequency: "monthly" },
  { path: "/vce-tutoring", priority: 0.8, changeFrequency: "monthly" },
  { path: "/online-tutoring-melbourne", priority: 0.8, changeFrequency: "monthly" },
  { path: "/best-online-tutoring-melbourne", priority: 0.9, changeFrequency: "monthly" },
  { path: "/best-online-tutoring-victoria", priority: 0.9, changeFrequency: "monthly" },
  { path: "/practice-maths-tests-secondary", priority: 0.9, changeFrequency: "monthly" },
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

  return [
    ...statics,
    ...parentSuburbs,
    ...worksheetTopics,
    ...learn,
  ];
}

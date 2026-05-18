import { SEO_SUBURBS, isPublishable } from "@/lib/seo-suburbs";
import { SITE_URL } from "@/lib/site";

// Public marketing pages Google should be aware of. Anything under
// /dashboard, /auth, /onboarding, /api, /invite is excluded — those
// are app routes (auth-gated and/or not useful in search results) and
// app/robots.js disallows them too.
const STATIC_PAGES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/parents", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tutors", priority: 0.8, changeFrequency: "monthly" },
  { path: "/centres", priority: 0.7, changeFrequency: "monthly" },
  { path: "/worksheets", priority: 0.7, changeFrequency: "monthly" },
  { path: "/directory", priority: 0.6, changeFrequency: "weekly" },
  { path: "/tutoring", priority: 0.7, changeFrequency: "weekly" },
  // High-intent exam-prep landing pages. Listed alongside the suburb
  // pages because they target the strongest parent search intents on
  // the tutoring side (selective entry + scholarship).
  { path: "/tutoring/selective-entry-exam-prep", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tutoring/scholarship-exam-prep", priority: 0.8, changeFrequency: "monthly" },
  // Tutor-acquisition directory + per-suburb tutor-jobs pages.
  { path: "/tutor-jobs", priority: 0.7, changeFrequency: "weekly" },
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
  // Google doesn't index thin content under our domain. Each
  // publishable suburb produces two URLs: a parent-facing page
  // (/tutoring/[slug]) and a tutor-facing page (/tutor-jobs/[slug]).
  const publishable = SEO_SUBURBS.filter(isPublishable);
  const parentSuburbs = publishable.map((s) => ({
    url: `${SITE_URL}/tutoring/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: s.tier === 1 ? 0.7 : s.tier === 2 ? 0.6 : 0.5,
  }));
  const tutorSuburbs = publishable.map((s) => ({
    url: `${SITE_URL}/tutor-jobs/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: s.tier === 1 ? 0.6 : s.tier === 2 ? 0.5 : 0.4,
  }));

  return [...statics, ...parentSuburbs, ...tutorSuburbs];
}

import { SKILL_PAGES_A } from "@/lib/skill-pages-a";
import { SKILL_PAGES_B } from "@/lib/skill-pages-b";
import { SKILL_PAGES_C } from "@/lib/skill-pages-c";
import { SKILL_PAGES_D } from "@/lib/skill-pages-d";
import { getLandingPageBySlug } from "@/lib/worksheet-landing-pages";

// Skill pages: /worksheets/<skill>, e.g. /worksheets/adding-fractions.
// Built 4 Nov 2026 for skill-level searches with no page of their own
// (Keyword Planner, Australia: grok-pm/knowledge/keyword-planner-2026-11.csv).
// Each page teaches one skill (guide + quick check, every answer checked
// in code) and presets the worksheet generator to the topic that covers it.
// Content lives in skill-pages-a.js to -d.js (c and d added 8 Nov 2026).
// Each page also has a "Choose your year" section (lib/skill-years.js).

export const SKILL_PAGES = [...SKILL_PAGES_A, ...SKILL_PAGES_B, ...SKILL_PAGES_C, ...SKILL_PAGES_D].sort((a, b) => b.monthlySearches - a.monthlySearches);

const BY_SLUG = Object.fromEntries(SKILL_PAGES.map((s) => [s.slug, s]));

export function getSkillPage(slug) {
  return BY_SLUG[slug] || null;
}

// Skill pages whose generator topic is this topic page (for "Practise one skill" links).
export function skillPagesForTopic(topicSlug) {
  return SKILL_PAGES.filter((s) => s.topicSlug === topicSlug || s.relatedSlugs?.includes(topicSlug));
}

export function skillTopic(skill) {
  return getLandingPageBySlug(skill.topicSlug);
}

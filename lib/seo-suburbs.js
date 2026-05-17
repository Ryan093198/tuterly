// Source of truth for the /tutoring/[suburb] SEO landing pages.
//
// Different concern from lib/suburbs.js — that module powers the
// in-app directory's location search across inner-southeast Melbourne.
// This one is the curated set we want Google to rank us for, organised
// as one entry per landing page.
//
// Each entry produces one statically-generated page. Fields:
//   - slug         (required): URL segment, kebab-case
//   - name         (required): display name
//   - tier         (optional): 1 / 2 / 3 — used for sitemap priority
//   - neighbouring (optional): slugs of nearby suburbs, surfaced as a
//                  "Also serving" link list for internal linking
//   - blurb        (optional): 1–2 sentence intro shown in the hero.
//                  Falls back to a generic template if missing.
//   - schools      (optional): [{ name, note }] rendered as a card list.
//                  Note is a short line about programs / streams / ATAR.
//   - highlights   (optional): bullet list of suburb-specific things
//                  parents typically ask about (selective entry,
//                  scholarship pathways, VCE vs IB, etc.).
//
// IMPORTANT: thin/duplicate content gets penalised by Google. Don't
// publish a suburb page with empty `schools` AND empty `blurb` — the
// template will render either way, but a 20-page site of near-identical
// content will hurt the whole domain. `isPublishable` filters the
// sitemap so unfinished entries don't get submitted to Google.

export const SEO_SUBURBS = [
  // Tier 1 — highest tutoring demand
  {
    slug: "glen-waverley",
    name: "Glen Waverley",
    tier: 1,
    neighbouring: ["mount-waverley", "wheelers-hill", "burwood"],
  },
  {
    slug: "mount-waverley",
    name: "Mount Waverley",
    tier: 1,
    neighbouring: ["glen-waverley", "wheelers-hill", "burwood"],
  },
  {
    slug: "balwyn",
    name: "Balwyn",
    tier: 1,
    neighbouring: ["surrey-hills", "kew", "canterbury"],
  },
  {
    slug: "box-hill",
    name: "Box Hill",
    tier: 1,
    neighbouring: ["blackburn", "surrey-hills", "doncaster"],
  },
  {
    slug: "camberwell",
    name: "Camberwell",
    tier: 1,
    neighbouring: ["hawthorn", "canterbury", "kew"],
  },
  {
    slug: "kew",
    name: "Kew",
    tier: 1,
    neighbouring: ["hawthorn", "balwyn", "camberwell"],
  },
  {
    slug: "doncaster",
    name: "Doncaster",
    tier: 1,
    neighbouring: ["doncaster-east", "templestowe", "box-hill"],
  },

  // Tier 2 — strong catchments
  {
    slug: "hawthorn",
    name: "Hawthorn",
    tier: 2,
    neighbouring: ["kew", "camberwell"],
  },
  {
    slug: "doncaster-east",
    name: "Doncaster East",
    tier: 2,
    neighbouring: ["doncaster", "templestowe", "blackburn"],
  },
  {
    slug: "surrey-hills",
    name: "Surrey Hills",
    tier: 2,
    neighbouring: ["box-hill", "canterbury", "balwyn"],
  },
  {
    slug: "canterbury",
    name: "Canterbury",
    tier: 2,
    neighbouring: ["camberwell", "balwyn", "surrey-hills"],
  },
  {
    slug: "templestowe",
    name: "Templestowe",
    tier: 2,
    neighbouring: ["doncaster", "doncaster-east", "bulleen"],
  },
  {
    slug: "bulleen",
    name: "Bulleen",
    tier: 2,
    neighbouring: ["templestowe", "doncaster"],
  },
  {
    slug: "wheelers-hill",
    name: "Wheelers Hill",
    tier: 2,
    neighbouring: ["glen-waverley", "mount-waverley"],
  },

  // Tier 3 — good demand, less SEO competition
  {
    slug: "burwood",
    name: "Burwood",
    tier: 3,
    neighbouring: ["mount-waverley", "box-hill", "blackburn"],
  },
  {
    slug: "vermont",
    name: "Vermont",
    tier: 3,
    neighbouring: ["mitcham", "forest-hill", "ringwood"],
  },
  {
    slug: "blackburn",
    name: "Blackburn",
    tier: 3,
    neighbouring: ["box-hill", "forest-hill", "mitcham"],
  },
  {
    slug: "mitcham",
    name: "Mitcham",
    tier: 3,
    neighbouring: ["blackburn", "vermont", "ringwood"],
  },
  {
    slug: "ringwood",
    name: "Ringwood",
    tier: 3,
    neighbouring: ["mitcham", "vermont"],
  },
  {
    slug: "forest-hill",
    name: "Forest Hill",
    tier: 3,
    neighbouring: ["blackburn", "vermont", "box-hill"],
  },
];

const BY_SLUG = new Map(SEO_SUBURBS.map((s) => [s.slug, s]));

export function getSeoSuburb(slug) {
  return BY_SLUG.get(slug) ?? null;
}

// A suburb is "publishable" once it has at least a blurb or a school
// list — pages with neither are still routable but get excluded from
// the sitemap so they don't dilute the domain's quality signals.
export function isPublishable(suburb) {
  if (!suburb) return false;
  if (typeof suburb.blurb === "string" && suburb.blurb.trim().length > 0)
    return true;
  if (Array.isArray(suburb.schools) && suburb.schools.length > 0) return true;
  return false;
}

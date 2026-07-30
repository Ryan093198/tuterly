// Single source of truth for the headline pricing shown across the marketing
// site (home, /parents, /tutoring/[suburb], competitor pages). Update here,
// never in individual pages/components, so prices can't drift apart again.
// The current model: session packs, all-inclusive (Tuterly software included),
// no lock-in. Plus a software-only monthly plan.

export const PRICING = {
  // Term pack (10 sessions) per-session rate — the headline "from" number.
  sessionFrom: 75,
  // Packs
  starterPack: { sessions: 5, total: 400, perSession: 80 },
  termPack: { sessions: 10, total: 750, perSession: 75 },
  // Software-only plan
  monthlySoftware: 29,
  // Typical agency comparison (used by the savings calculator + copy).
  agencyPerSession: 100,
  agencyRangeLow: 90,
  agencyRangeHigh: 110,
  // Calculator assumption
  lessonsPerMonthAssumed: 4,
};

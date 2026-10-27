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
  // Typical private tutor rate for Years 7 to 10 in Melbourne, as published
  // on /tutoring-prices-melbourne ("Secondary (Years 7-10)"). Used by the
  // Tuterly Study comparison on the home page. Keep the two in step.
  secondaryHourlyLow: 50,
  secondaryHourlyHigh: 80,
  // Private tutor rate used in the Tuterly Study comparison (home page).
  // Ryan, 27 Oct 2026: "$80-$100 per hour, that's usually the average".
  // NOTE: /tutoring-prices-melbourne still says $50-$80 for Years 7-10.
  tutorCompareLow: 80,
  tutorCompareHigh: 100,
};

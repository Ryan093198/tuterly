// Single source of truth for parent testimonials.
//
// RULES (these are not style preferences, they are legal ones):
//   - Every entry must be a real quote from a real family. Australian
//     Consumer Law s29(1)(e)-(f) makes fabricated or materially altered
//     testimonials a civil penalty offence, and the ACCC enforces it.
//   - `consent: true` means the family has agreed IN WRITING to the quote
//     appearing publicly in this exact form, under this exact attribution.
//     Anything with consent !== true is filtered out and never renders.
//   - Light editing for typos and length is fine. Changing the meaning,
//     inventing a result, or upgrading "good" to "amazing" is not.
//   - Keep the raw source (screenshot / email) filed against `sourceRef`
//     so any claim can be substantiated on request.
//
// TEMPLATE - copy this block for each new testimonial:
//
//   {
//     id: "sarah-m-brighton",        // stable slug, used as React key
//     quote: "...",                  // their words, verbatim where possible
//     author: "Sarah M.",            // first name + surname initial
//     role: "Parent",                // "Parent" | "Student" | "Tutor"
//     suburb: "Brighton",            // used to target /tutoring/[suburb]
//     yearLevel: "Year 9",           // optional, adds specificity
//     subject: "Maths",              // optional
//     result: "Moved from a C to a B+ over a term",  // optional chip
//     source: "email",               // email | google | sms | form | call
//     sourceRef: "gmail 2026-07-14", // where the original lives
//     collectedAt: "2026-07-14",     // ISO date
//     consent: true,                 // written permission on file
//     featured: false,               // renders large in the feature variant
//     tags: ["home", "parents"],     // see PLACEMENT_TAGS below
//   },
//
// PLACEMENT TAGS:
//   home     - marketing root (rewrites to /parents)
//   parents  - /parents
//   suburb   - /tutoring/[suburb] (also needs a `suburb` value)
//   compare  - /cluey-alternative, /tutor-doctor-alternative, /best-tutoring-*
//   pricing  - near the packages / subscription CTAs
//   reports  - specifically praises the session reports
//   practice - specifically praises the worksheets / drill questions
//   value    - specifically about price vs an agency

// PROVENANCE (11 Aug 2026): Ryan confirmed he has permission from each of
// these families to publish their words with the attribution shown. The
// wording was written up by Ryan from feedback given in person, then approved
// by the families. `sourceRef` records that attestation rather than a filed
// email thread, so keep a written record of each permission somewhere you can
// retrieve it if a claim is ever queried.
//
// No star ratings: there is no review system behind these, so showing a score
// would imply an aggregate that does not exist.
export const TESTIMONIALS = [
  {
    id: "joanne-p-reports",
    quote:
      "The reports are what I appreciate most. I'm not a maths person, so being able to see plainly what Ruby has covered, what she's mastered and what still needs work means I can actually support her instead of guessing.",
    author: "Joanne P.",
    role: "Parent",
    yearLevel: "Year 7",
    subject: "Maths",
    source: "call",
    sourceRef: "permission confirmed by Ryan, 11 Aug 2026",
    collectedAt: "2026-08-11",
    consent: true,
    featured: true,
    tags: ["home", "parents", "reports"],
  },
  {
    id: "rebecca-m-practice",
    quote:
      "Tuterly has been exactly what we needed since Tom started secondary school. Once the topic tests began, he was struggling to keep up. Now he has unlimited practice, all matched to what his class is actually covering, and his Maths results have improved noticeably.",
    author: "Rebecca M.",
    role: "Parent",
    yearLevel: "Year 8",
    subject: "Maths",
    source: "call",
    sourceRef: "permission confirmed by Ryan, 11 Aug 2026",
    collectedAt: "2026-08-11",
    consent: true,
    featured: false,
    tags: ["home", "parents", "practice"],
  },
  {
    id: "daniel-w-alignment",
    quote:
      "We'd tried two other tutoring services before Tuterly. The difference is the curriculum alignment. Everything Jack works on connects directly back to what his teacher is covering that week, so nothing feels like extra homework for the sake of it.",
    author: "Daniel W.",
    role: "Parent",
    yearLevel: "Year 7",
    subject: "Maths",
    source: "call",
    sourceRef: "permission confirmed by Ryan, 11 Aug 2026",
    collectedAt: "2026-08-11",
    consent: true,
    featured: false,
    tags: ["home", "parents", "compare"],
  },
  {
    id: "priya-s-revision",
    quote:
      "My daughter used to leave revision until the night before. Having a platform she can dip into for fifteen minutes after dinner has completely changed that. She's calmer going into assessments, and honestly, so am I.",
    author: "Priya S.",
    role: "Parent",
    yearLevel: "Year 9",
    subject: "Maths",
    source: "call",
    sourceRef: "permission confirmed by Ryan, 11 Aug 2026",
    collectedAt: "2026-08-11",
    consent: true,
    featured: false,
    tags: ["home", "parents", "practice"],
  },
  {
    id: "ella-y10-student",
    quote:
      "I like that I can just keep doing questions until it clicks. If I get something wrong, it shows me why, and then gives me another one like it.",
    author: "Ella",
    role: "Student",
    yearLevel: "Year 10",
    subject: "Maths",
    source: "call",
    sourceRef: "permission confirmed by Ryan, 11 Aug 2026",
    collectedAt: "2026-08-11",
    consent: true,
    featured: false,
    tags: ["practice", "parents"],
  },
  {
    id: "anna-t-flexibility",
    quote:
      "As a working parent, the flexibility is what sold me. No driving across town for a 5pm session. Sophie logs on when it suits her, and I still get a clear picture of what she's covered and where she's improving.",
    author: "Anna T.",
    role: "Parent",
    yearLevel: "Year 8",
    subject: "Maths",
    source: "call",
    sourceRef: "permission confirmed by Ryan, 11 Aug 2026",
    collectedAt: "2026-08-11",
    consent: true,
    featured: false,
    tags: ["parents", "value", "pricing", "reports"],
  },
  {
    id: "kate-l-confidence",
    quote:
      "Marcus was quietly falling behind in Maths and hiding it well. Tuterly picked up the gaps quickly and gave him a way to close them without feeling singled out. His confidence in class has come back before his grades have, which matters more to us.",
    author: "Kate L.",
    role: "Parent",
    yearLevel: "Year 9",
    subject: "Maths",
    source: "call",
    sourceRef: "permission confirmed by Ryan, 11 Aug 2026",
    collectedAt: "2026-08-11",
    consent: true,
    featured: false,
    tags: ["home", "parents"],
  },
];

const CONSENTED = () => TESTIMONIALS.filter((t) => t.consent === true);

/**
 * Fetch testimonials for a placement.
 *
 * @param {object}   opts
 * @param {string[]} opts.tags        Match any of these placement tags.
 * @param {string}   opts.suburb      Prefer quotes from this suburb.
 * @param {boolean}  opts.suburbOnly  Drop the fallback; suburb matches only.
 * @param {number}   opts.limit       Max to return.
 * @returns {object[]}
 */
export function getTestimonials({ tags, suburb, suburbOnly = false, limit } = {}) {
  let pool = CONSENTED();

  if (tags?.length) {
    pool = pool.filter((t) => t.tags?.some((tag) => tags.includes(tag)));
  }

  const localMatch = (t) =>
    !!suburb && t.suburb?.toLowerCase() === suburb.toLowerCase();

  if (suburb && suburbOnly) {
    pool = pool.filter(localMatch);
  }

  // Rank by position in the caller's `tags` array, so a page can express a
  // preference: tags ["practice", "parents"] leads with quotes about the
  // worksheets and only falls back to general ones to fill the row.
  const tagRank = (t) => {
    if (!tags?.length) return 0;
    const i = tags.findIndex((tag) => t.tags?.includes(tag));
    return i === -1 ? tags.length : i;
  };

  // One composite sort. Doing the suburb promotion by array order and then
  // sorting would throw the promotion away, which is what an earlier version
  // of this did.
  pool = [...pool].sort((a, b) => {
    // 1. Quotes from the requested suburb first.
    const la = localMatch(a) ? 0 : 1;
    const lb = localMatch(b) ? 0 : 1;
    if (la !== lb) return la - lb;
    // 2. Then by how well the quote matches what this page is about.
    const ra = tagRank(a);
    const rb = tagRank(b);
    if (ra !== rb) return ra - rb;
    // 3. Then featured.
    if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
    // 4. Then most recent.
    return (b.collectedAt || "").localeCompare(a.collectedAt || "");
  });

  return typeof limit === "number" ? pool.slice(0, limit) : pool;
}

/** True when a placement has enough material to be worth rendering. */
export function hasTestimonials(opts) {
  return getTestimonials(opts).length > 0;
}

/** Total count of consented testimonials - safe to quote publicly. */
export function testimonialCount() {
  return CONSENTED().length;
}

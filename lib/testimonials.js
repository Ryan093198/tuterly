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

export const TESTIMONIALS = [
  // Nothing here yet. The components below render null on an empty list,
  // so the site stays clean until real quotes are added.
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

  if (suburb) {
    const local = pool.filter(
      (t) => t.suburb?.toLowerCase() === suburb.toLowerCase()
    );
    // Suburb pages should never render an empty section just because that
    // particular suburb has no quote yet - fall back to the general pool,
    // with any local quotes promoted to the front.
    if (suburbOnly) {
      pool = local;
    } else {
      const rest = pool.filter((t) => !local.includes(t));
      pool = [...local, ...rest];
    }
  }

  // Featured first, then most recent.
  pool = [...pool].sort((a, b) => {
    if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
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

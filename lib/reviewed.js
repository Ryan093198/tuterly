import { SITE_URL } from "@/lib/site";

// Who checks Tuterly's maths content (Ryan, 11 Nov 2026: "I've read all of
// them carefully"). Every page shows "Checked by Ryan" EXCEPT paths listed
// in UNREVIEWED_PATHS: pages added since by the daily page-building task,
// which Ryan hasn't read yet. Those say what's true instead: built by the
// team, every answer checked step by step. When Ryan has read one, remove
// its path from the list.

export const REVIEWER = {
  name: "Ryan",
  role: "founder of Bayside Academics and Tuterly",
  href: "/about#ryan",
  jobTitle: "Founder, Bayside Academics and Tuterly",
};

export const UNREVIEWED_PATHS = new Set([
  // Added by the daily task. Example: "/maths/volume-of-a-cylinder",
  "/maths/volume-of-a-cylinder",
  "/worksheets/year-8-factorising",
  "/maths/order-of-operations",
  "/worksheets/year-9-similar-triangles",
  "/maths/compound-interest",
  "/worksheets/year-10-quadratic-formula",
  "/maths/distance-between-two-points",
  "/worksheets/year-7-order-of-operations",
]);

export const isReviewed = (path) => !UNREVIEWED_PATHS.has(path);

/** schema.org Person for reviewedBy / author. */
export const reviewerPerson = () => ({
  "@type": "Person",
  name: REVIEWER.name,
  jobTitle: REVIEWER.jobTitle,
  url: `${SITE_URL}${REVIEWER.href}`,
  worksFor: { "@type": "Organization", name: "Bayside Academics", url: "https://baysideacademics.com.au" },
});

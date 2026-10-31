import { SITE_URL } from "@/lib/site";

// Shared bits for the /scholarship guide pages (hub plus three guides).
// Scholarship pages use the Tuterly Scholarship waitlist CTA only, never
// the Years 7 to 10 study app CTA or its pricing.
//
// Provider facts mirror lib/scholarship-practice.js (checked 31 Oct 2026
// against acer.org, edutest.com.au and academicassessment.com.au). Keep them high level:
// providers and school arrangements change every year.

// Product facts for the guide copy. The diagnostic is Numerical Reasoning
// only (40 questions), in the Tuterly app on iPhone. No Scholarship price is
// published yet: Pass is one-off per entry level, with a launch discount for
// people on the Scholarship list (amount undecided).
export const PASS = {
  name: "Scholarship Pass",
  freeQuestions: 10,
  diagnosticQuestions: 40,
  diagnostic: "a 40-question Numerical Reasoning diagnostic in the Tuterly app on iPhone",
  line: "A one-off Scholarship Pass per entry level, not a subscription, with a launch discount for families on the Scholarship list.",
};

export const GUIDES = [
  {
    href: "/scholarship",
    title: "Scholarship test prep: the parent hub",
    short: "Start here",
    text: "ACER, Edutest and AAS in brief, how scholarships differ from selective entry, and how to plan.",
  },
  {
    href: "/scholarship/acer-vs-edutest-vs-aas",
    title: "ACER vs Edutest vs AAS",
    short: "Compare the tests",
    text: "Sections, timing, levels and delivery side by side, and how to tell which one your school uses.",
  },
  {
    href: "/scholarship/year-7-entry-guide",
    title: "Year 7 entry scholarship guide",
    short: "Year 7 entry",
    text: "The most common scholarship year: timeline, skills, writing, maths and multi-school logistics.",
  },
  {
    href: "/scholarship/year-5-and-year-6-prep",
    title: "Year 5 and Year 6 entry prep",
    short: "Year 5 and 6 entry",
    text: "Primary-level tests, age-appropriate practice and avoiding burnout.",
  },
];

export const PRACTICE_LINKS = [
  { href: "/scholarship-practice", label: "Free scholarship numerical reasoning practice (Years 4 to 6)" },
  { href: "/scholarship-practice/acer", label: "Free ACER-style practice questions" },
  { href: "/scholarship-practice/edutest", label: "Free Edutest-style numerical reasoning practice" },
  { href: "/scholarship-practice/aas", label: "Free AAS-style practice questions" },
];

export const SOURCES = [
  { label: "ACER: Scholarship tests", url: "https://www.acer.org/au/scholarships" },
  { label: "Edutest: information for parents", url: "https://www.edutest.com.au/tests_parents.html" },
  { label: "AAS: scholarship testing guide for parents", url: "https://www.academicassessment.com.au/scholarship-testing-guide-for-parents/" },
];

const OG_IMAGE = "/og-tuterly.png";

export function pageMetadata({ title, description, path }) {
  const url = `${SITE_URL}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { images: [OG_IMAGE], title, description, url, type: "article", locale: "en_AU", siteName: "Tuterly" },
    twitter: { card: "summary_large_image", title, description },
  };
}

// crumbs: [{ name, path }] from the hub down to the current page.
export function guideJsonLd({ title, description, path, crumbs, faqs }) {
  const url = `${SITE_URL}${path}`;
  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [{ name: "Home", path: "" }, ...crumbs].map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: `${SITE_URL}${c.path}`,
      })),
    },
    {
      "@type": path === "/scholarship" ? "WebPage" : "Article",
      "@id": `${url}#page`,
      ...(path === "/scholarship" ? { name: title } : { headline: title }),
      description,
      url,
      inLanguage: "en-AU",
      dateModified: "2026-10-31",
      image: `${SITE_URL}${OG_IMAGE}`,
      publisher: { "@type": "Organization", name: "Tuterly", url: SITE_URL },
      ...(path === "/scholarship" ? {} : { author: { "@type": "Organization", name: "Tuterly", url: SITE_URL }, datePublished: "2026-10-30" }),
    },
  ];
  if (faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

import { SITE_URL } from "@/lib/site";

// Shared bits for the /scholarship guide pages (hub plus three guides).
// Scholarship pages use the Tuterly Scholarship waitlist CTA only, never
// the Years 7 to 10 study app CTA or its pricing.
//
// Provider facts mirror lib/scholarship-practice.js (checked 30 Oct 2026
// against acer.org/scholarship and edutest.com.au). Keep them high level:
// providers and school arrangements change every year.

export const PASS = {
  name: "Scholarship Pass",
  price: "A$99",
  usual: "A$198",
  freeQuestions: 10,
  line: "Launch special A$99 one-off per entry level (usual A$198).",
};

export const GUIDES = [
  {
    href: "/scholarship",
    title: "Scholarship and selective entry prep: the parent hub",
    short: "Start here",
    text: "Scholarships vs selective entry, the three main providers, and how to plan.",
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
  { label: "St Margaret's Berwick Grammar: academic scholarships (an AAS school example)", url: "https://stmargarets.vic.edu.au/academic-scholarships" },
];

export function pageMetadata({ title, description, path }) {
  const url = `${SITE_URL}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { images: ["/og-tuterly.png"], title, description, url, type: "article", locale: "en_AU", siteName: "Tuterly" },
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
      dateModified: "2026-10-30",
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

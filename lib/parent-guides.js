import { SITE_URL } from "@/lib/site";

// Shared bits for the /years index and the /parents/* decision guides
// (Years 7 to 10 maths). These pages use the main Tuterly study app CTA
// only (StudyAppCTA, slim, so no dollar amounts show), never the
// Scholarship waitlist.

export const UPDATED = "2026-10-30";

export const YEAR_HUBS = [
  {
    year: 7,
    href: "/years/year-7-maths",
    title: "Year 7 maths",
    text: "The move to secondary maths: integers, fractions and percentages, first algebra, solving simple equations, angles and area. Habits set in Year 7 carry through to Year 10.",
  },
  {
    year: 8,
    href: "/years/year-8-maths",
    title: "Year 8 maths",
    text: "The algebra year for many students: expanding and simplifying, equations with brackets, Pythagoras, circles and rates. Gaps here tend to show up again in Year 9.",
  },
  {
    year: 9,
    href: "/years/year-9-maths",
    title: "Year 9 maths",
    text: "Index laws, quadratics, right-angled trigonometry and coordinate geometry, plus NAPLAN Numeracy. Results often help decide Year 10 class placement.",
  },
  {
    year: 10,
    href: "/years/year-10-maths",
    title: "Year 10 maths and 10A",
    text: "Quadratics, simultaneous equations, exponentials and, for 10A, surds and logarithms. The year that prepares students for senior maths choices.",
  },
];

export const PARENT_GUIDES = [
  {
    href: "/parents/help-with-secondary-maths-homework",
    title: "How to help with Years 7 to 10 maths homework",
    short: "Help with maths homework",
    text: "A nightly routine and a simple support ladder that keeps the pencil in your child's hand, even if maths was never your subject.",
  },
  {
    href: "/parents/maths-app-vs-tutoring",
    title: "Maths app or tutor? An honest guide for parents",
    short: "Maths app or tutor?",
    text: "When regular practice is the gap and an app fits, when your child needs a person to re-teach, and when to combine the two.",
  },
  {
    href: "/parents/preparing-for-maths-topic-tests",
    title: "Preparing for maths topic tests and exams",
    short: "Preparing for maths tests",
    text: "Start from what they got wrong, space the practice out, and use a week-before and night-before checklist.",
  },
];

export function pageMetadata({ title, description, path, type = "article" }) {
  const url = `${SITE_URL}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { images: ["/og-tuterly.png"], title, description, url, type, locale: "en_AU", siteName: "Tuterly" },
    twitter: { card: "summary_large_image", title, description },
  };
}

// crumbs: [{ name, path }] below Home, ending at the current page.
// pageType: "Article" for the parent guides, "CollectionPage" for /years.
export function guideJsonLd({ title, description, path, crumbs, faqs, pageType = "Article", parts }) {
  const url = `${SITE_URL}${path}`;
  const org = { "@type": "Organization", name: "Tuterly", url: SITE_URL };
  const page =
    pageType === "Article"
      ? {
          "@type": "Article",
          "@id": `${url}#page`,
          headline: title,
          description,
          url,
          inLanguage: "en-AU",
          datePublished: UPDATED,
          dateModified: UPDATED,
          author: org,
          publisher: org,
          audience: { "@type": "Audience", audienceType: "Parents of Year 7 to 10 students" },
          about: { "@type": "Thing", name: "Secondary school mathematics in Australia" },
        }
      : {
          "@type": pageType,
          "@id": `${url}#page`,
          name: title,
          description,
          url,
          inLanguage: "en-AU",
          dateModified: UPDATED,
          publisher: org,
          ...(parts?.length
            ? {
                hasPart: parts.map((p) => ({ "@type": "WebPage", name: p.title, url: `${SITE_URL}${p.href}` })),
              }
            : {}),
        };
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
    page,
  ];
  if (faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

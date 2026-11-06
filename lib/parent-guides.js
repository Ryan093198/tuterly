import { SITE_URL } from "@/lib/site";

// Shared bits for the /years index and the /parents/* decision guides
// (Years 7 to 10 maths). These pages use the main Tuterly study app CTA
// only (StudyAppCTA, slim, so no dollar amounts show), never the
// Scholarship waitlist.

export const PUBLISHED = "2026-10-30";
export const UPDATED = "2026-11-06";
// The byline on the parent guides (Ryan, 6 Nov 2026).
export const AUTHOR = {
  name: "Ryan",
  role: "founder of Bayside Academics, 15 years in private tutoring",
  jobTitle: "Founder, Bayside Academics",
};
const OG_IMAGE = `${SITE_URL}/og-tuterly.png`;

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
    text: "Index laws, quadratics, right-angled trigonometry and coordinate geometry, plus NAPLAN Numeracy. Year 9 results often help decide Year 10 class placement.",
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
    title: "You don't need to remember Year 9 maths to help with homework",
    short: "Help with maths homework",
    text: "Why methods have changed, what to say instead of \"let me show you how I did it\", and a routine that ends the homework fights.",
  },
  {
    href: "/parents/maths-app-vs-tutoring",
    title: "Maths help without the $100-an-hour tutor",
    short: "Tutor costs vs a maths app",
    text: "What maths help really costs, when a tutor is worth it, and when practice between lessons is the real gap.",
  },
  {
    href: "/parents/end-of-year-maths-report",
    title: "Got the maths report? Close the gaps before next year",
    short: "The end-of-year maths report",
    text: "What the A to E grade means, how to find the exact topics that cost marks, and a four-week holiday plan.",
  },
  {
    href: "/parents/preparing-for-maths-topic-tests",
    title: "Preparing for maths topic tests and exams",
    short: "Preparing for maths tests",
    text: "Start from what they got wrong, space the practice out, and use a week-before and night-before checklist.",
  },
  {
    href: "/parents/kumon-cost-australia",
    title: "Kumon cost in Australia, and is it worth it for high school?",
    short: "Kumon cost",
    text: "Kumon's fees, how it works, who it suits, and how it compares with a tutor or a maths app.",
  },
  {
    href: "/parents/dyscalculia",
    title: "Is it dyscalculia, or maths gaps that can be fixed?",
    short: "Dyscalculia",
    text: "Signs in high school, how assessment works in Australia, and finding a tutor who specialises in dyscalculia.",
  },
  {
    href: "/parents/studied-but-failed-maths-test",
    title: "They studied but still failed the maths test",
    short: "Studied but still failed",
    text: "Why re-reading notes doesn't show up in the mark, how to find where the marks went, and a one-week plan.",
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
export function guideJsonLd({ title, description, path, crumbs, faqs, pageType = "Article", parts, updated = UPDATED }) {
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
          image: OG_IMAGE,
          inLanguage: "en-AU",
          datePublished: PUBLISHED,
          dateModified: updated,
          author: { "@type": "Person", name: AUTHOR.name, jobTitle: AUTHOR.jobTitle, worksFor: { "@type": "Organization", name: "Bayside Academics" } },
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
          dateModified: updated,
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

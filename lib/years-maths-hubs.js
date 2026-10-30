import { SITE_URL } from "@/lib/site";

// Shared bits for the /years/year-N-maths hub pages (Years 7 to 10).
// These hubs use the main Tuterly study app CTA only (StudyAppCTA, slim,
// so no dollar amounts show), never the Scholarship waitlist.

export const UPDATED = "2026-10-30";

export const HUBS = [
  { year: 7, href: "/years/year-7-maths", title: "Year 7 maths", text: "Starting secondary maths: integers, fractions, first algebra and equations." },
  { year: 8, href: "/years/year-8-maths", title: "Year 8 maths", text: "The algebra year: expanding, equations with brackets, Pythagoras and circles." },
  { year: 9, href: "/years/year-9-maths", title: "Year 9 maths", text: "Index laws, quadratics, trigonometry and coordinate geometry." },
  { year: 10, href: "/years/year-10-maths", title: "Year 10 maths and 10A", text: "Quadratics, simultaneous equations, exponentials and pathway preparation." },
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

// crumbs: [{ name, path }] below Home, ending at the current page.
export function hubJsonLd({ title, description, path, crumbs, faqs }) {
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
      "@type": "Article",
      "@id": `${url}#page`,
      headline: title,
      description,
      url,
      inLanguage: "en-AU",
      datePublished: UPDATED,
      dateModified: UPDATED,
      author: { "@type": "Organization", name: "Tuterly", url: SITE_URL },
      publisher: { "@type": "Organization", name: "Tuterly", url: SITE_URL },
      about: { "@type": "Thing", name: "Australian Curriculum Mathematics" },
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

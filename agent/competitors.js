// Competitors monitored by the weekly competitor-intel agent. Each
// entry must include a sitemap URL - the script falls back to
// /sitemap.xml if no path is given. Slugs are used as snapshot file
// names, so keep them stable and filesystem-safe.
//
// Adding or removing a competitor is the only file you should ever
// need to edit in this directory; the script discovers the rest.

export const COMPETITORS = [
  {
    slug: "cluey",
    name: "Cluey Learning",
    sitemap: "https://clueylearning.com.au/sitemap.xml",
    homepage: "https://clueylearning.com.au",
  },
  {
    slug: "tutor-doctor",
    name: "Tutor Doctor Australia",
    sitemap: "https://tutordoctor.com.au/sitemap.xml",
    homepage: "https://tutordoctor.com.au",
  },
  {
    slug: "ezymaths",
    name: "EzyMaths Tutoring",
    sitemap: "https://www.ezymathtutoring.com.au/sitemap.xml",
    homepage: "https://www.ezymathtutoring.com.au",
  },
  {
    slug: "kip-mcgrath",
    name: "Kip McGrath Education",
    sitemap: "https://www.kipmcgrath.com.au/sitemap.xml",
    homepage: "https://www.kipmcgrath.com.au",
  },
  {
    slug: "begin-bright",
    name: "Begin Bright",
    sitemap: "https://www.beginbright.com.au/sitemap.xml",
    homepage: "https://www.beginbright.com.au",
  },
];

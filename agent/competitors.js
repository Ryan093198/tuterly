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
    sitemap: "https://www.tutordoctor.com.au/sitemap.xml",
    homepage: "https://www.tutordoctor.com.au",
  },
  {
    slug: "ezymaths",
    name: "EzyMaths Tutoring",
    sitemap: "https://www.ezymaths.com.au/sitemap.xml",
    homepage: "https://www.ezymaths.com.au",
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
    sitemap: "https://beginbright.com.au/sitemap.xml",
    homepage: "https://beginbright.com.au",
  },
];

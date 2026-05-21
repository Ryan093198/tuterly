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
  {
    slug: "learnmate",
    name: "Learnmate",
    sitemap: "https://learnmate.com.au/sitemap.xml",
    homepage: "https://learnmate.com.au",
  },
  {
    slug: "apex-tuition",
    name: "Apex Tuition Australia",
    sitemap: "https://www.apextuitionaustralia.com/sitemap.xml",
    homepage: "https://www.apextuitionaustralia.com",
  },
  {
    slug: "alchemy-tuition",
    name: "Alchemy Tuition",
    sitemap: "https://alchemytuition.com.au/sitemap.xml",
    homepage: "https://alchemytuition.com.au",
  },
  {
    slug: "success-tutoring",
    name: "Success Tutoring",
    sitemap: "https://successtutoring.com.au/sitemap.xml",
    homepage: "https://successtutoring.com.au",
  },
  {
    slug: "north-shore",
    name: "North Shore Coaching College",
    sitemap: "https://www.north-shore.com.au/sitemap.xml",
    homepage: "https://www.north-shore.com.au",
  },
  {
    slug: "tutoring-for-excellence",
    name: "Tutoring for Excellence",
    sitemap: "https://www.tutoringforexcellence.com.au/sitemap.xml",
    homepage: "https://www.tutoringforexcellence.com.au",
  },
  {
    slug: "math-minds",
    name: "Math Minds",
    sitemap: "https://mathminds.com.au/sitemap.xml",
    homepage: "https://mathminds.com.au",
  },
];

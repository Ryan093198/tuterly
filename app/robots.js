import { SITE_URL } from "@/lib/site";

// Marketing site is crawlable; app routes (auth-gated or noisy) are
// blocked so the public index stays focused on /parents, /tutors,
// /tutoring/* etc.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/",
        "/auth/",
        "/onboarding/",
        "/api/",
        "/invite/",
        "/maindirectory",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

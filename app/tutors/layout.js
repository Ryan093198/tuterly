import { SITE_URL } from "@/lib/site";

// /tutors is a client component (interactive earnings calculator,
// application form) so it can't export metadata directly. This
// layout sits alongside it and provides the route-segment metadata.

const TITLE = "Join Tuterly - Set Your Own Rates with Professional Tools";
const DESCRIPTION =
  "Tutor through Tuterly: set your own rate, keep what you earn, and use professional tools - session reports, practice generators, progress tracking - from day one.";
const URL = `${SITE_URL}/tutors`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function TutorsLayout({ children }) {
  return children;
}

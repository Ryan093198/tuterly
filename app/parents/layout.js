import { SITE_URL } from "@/lib/site";

// /parents is a client component (interactive nav, tutor gallery,
// savings slider) so it can't export metadata directly. This layout
// sits alongside it and provides the route-segment metadata.

const TITLE = "Tuterly - Find a Tutor & Track Every Session | Melbourne";
const DESCRIPTION =
  "Find an experienced tutor through Tuterly. Detailed session reports, practice worksheets, and progress tracking after every lesson.";
const URL = `${SITE_URL}/parents`;

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

export default function ParentsLayout({ children }) {
  return children;
}

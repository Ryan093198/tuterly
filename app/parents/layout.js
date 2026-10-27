import { SITE_URL } from "@/lib/site";

// Route-segment metadata for /parents (the parent page for the Tuterly
// Study app since Oct 2026; it used to be the tutor marketplace page).

const TITLE = "Tuterly Study for Parents: Years 7 to 10 Maths App";
const DESCRIPTION =
  "See the maths questions your child gets wrong, and watch them get mastered. A weekly summary, topic test scores, not their photos. Designed by Australian educators.";
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

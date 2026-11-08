import { SITE_URL } from "@/lib/site";

// Route-segment metadata for /parents (the parent page for the Tuterly
// Study app since Oct 2026; it used to be the tutor marketplace page).

const TITLE = "Better Maths Test Marks for Years 7 to 10: Practice Built From Their School | Tuterly for Parents";
const DESCRIPTION =
  "Upload the test outline, past papers or term planner and Tuterly builds practice tests and drills on exactly what your child is doing at school, then fixes every mistake. Built by the team behind Bayside Academics.";
const URL = `${SITE_URL}/parents`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"],
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

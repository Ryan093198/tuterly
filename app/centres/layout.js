import { SITE_URL } from "@/lib/site";

// /centres is a client component (interactive feature grid). This
// layout sits alongside it and provides the route-segment metadata.

const TITLE = "Tuterly for Tutoring Centres - Reports & Progress Tracking";
const DESCRIPTION =
  "Tutoring centre owners: Tuterly gives your tutors session reports, practice worksheets, and progress dashboards. Look as professional as a top agency.";
const URL = `${SITE_URL}/centres`;

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

export default function CentresLayout({ children }) {
  return children;
}

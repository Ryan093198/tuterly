import FeaturesHub from "@/components/study/FeaturesHub";
import { SITE_URL } from "@/lib/site";

const TITLE = "Tuterly Features: Snap a Question, Test Any Topic, Study Notes | Tuterly";
const DESCRIPTION =
  "What the Tuterly maths app does for Years 7 to 10: snap the questions they got wrong, practice tests on any topic, study notes built from their mistakes, and a weekly view for parents.";
const URL = `${SITE_URL}/features`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function FeaturesPage() {
  return <FeaturesHub />;
}

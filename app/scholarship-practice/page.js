import SchPracticePage from "@/components/scholarship/SchPracticePage";
import { SITE_URL } from "@/lib/site";

const TITLE = "Free Scholarship Numerical Reasoning Practice, Years 4 to 6 | Tuterly";
const DESCRIPTION =
  "Free numerical reasoning practice for scholarship and selective-entry tests (ACER, Edutest, AAS). 10 questions for Years 4, 5 and 6, marked instantly with worked solutions.";
const URL = `${SITE_URL}/scholarship-practice`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function Page() {
  return <SchPracticePage />;
}

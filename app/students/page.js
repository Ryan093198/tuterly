import StudentLanding from "@/components/study/StudentLanding";
import { SITE_URL } from "@/lib/site";

const TITLE = "Maths Exam Practice for Students, Years 7 to 10";
const DESCRIPTION =
  "Upload your test outline and past papers, and Tuterly writes a practice exam in your school’s style before the real one. Then fix every question you miss, with worked solutions. Years 7 to 10 maths, coming soon on iPhone.";
const URL = `${SITE_URL}/students`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
};

export default function StudentsPage() {
  return <StudentLanding />;
}

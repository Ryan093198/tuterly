import ExamPrepLanding from "@/components/study/ExamPrepLanding";
import { SITE_URL } from "@/lib/site";

const TITLE = "Maths Exam Preparation, Years 7 to 10 | Tuterly";
const DESCRIPTION =
  "A maths exam preparation app for Years 7 to 10: practice tests on every topic, the questions your child got wrong turned into fresh practice, and revision notes. Australian Curriculum. On iPhone, Android coming soon.";
const URL = `${SITE_URL}/maths-exam-preparation`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function MathsExamPreparationPage() {
  return <ExamPrepLanding />;
}

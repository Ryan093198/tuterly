import { notFound } from "next/navigation";
import ExamPrepLanding from "@/components/study/ExamPrepLanding";
import { EXAM_YEARS, getExamYear } from "@/lib/exam-prep-pages";
import { SITE_URL } from "@/lib/site";
import { readyMadeExam } from "@/lib/exam-bank";

export function generateStaticParams() {
  return EXAM_YEARS.map((y) => ({ year: y.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { year } = await params;
  const y = getExamYear(year);
  if (!y) return {};
  // Exam season (Ryan, 9 Nov 2026): lead with the free practice exam.
  const title = `${y.year} Maths Exam Practice: Free Practice Exam with Answers | Tuterly`;
  const description = `A free ${y.year} maths practice exam with answers and worked solutions, plus the topics a ${y.year} exam can cover, where students lose marks and a three-week revision plan.`;
  const url = `${SITE_URL}/maths-exam-preparation/${y.slug}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { images: ["/og-tuterly.png"], title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ExamPrepYearPage({ params }) {
  const { year } = await params;
  const y = getExamYear(year);
  if (!y) notFound();
  return <ExamPrepLanding year={y} exam={readyMadeExam(y.year)} />;
}

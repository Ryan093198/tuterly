import { notFound } from "next/navigation";
import ExamPrepLanding from "@/components/study/ExamPrepLanding";
import { EXAM_YEARS, getExamYear } from "@/lib/exam-prep-pages";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return EXAM_YEARS.map((y) => ({ year: y.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { year } = await params;
  const y = getExamYear(year);
  if (!y) return {};
  const title = `${y.year} Maths Exam Preparation: Practice Tests and a 3-Week Plan | Tuterly`;
  const description = `How to prepare for a ${y.year} maths exam: the topics it can cover, where students usually lose marks, and a three-week plan with practice tests on every topic. Victorian Curriculum.`;
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
  return <ExamPrepLanding year={y} />;
}

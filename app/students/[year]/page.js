import { notFound } from "next/navigation";
import StudentLanding from "@/components/study/StudentLanding";
import { STUDENT_YEARS, getStudentYear } from "@/lib/student-pages";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return STUDENT_YEARS.map((y) => ({ year: y.slug }));
}

export async function generateMetadata({ params }) {
  const { year } = await params;
  const y = getStudentYear(year);
  if (!y) return {};
  const title = `${y.year} Maths Help for Students: Get Better Marks`;
  const description = `${y.year} maths help for students: snap the questions you got wrong, see the worked solution, and practise fresh versions until you’ve mastered them. Victorian Curriculum.`;
  const url = `${SITE_URL}/students/${y.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { images: ["/og-tuterly.png"], title, description, url, type: "website" },
  };
}

export const dynamicParams = false;

export default async function StudentYearPage({ params }) {
  const { year } = await params;
  const y = getStudentYear(year);
  if (!y) notFound();
  return <StudentLanding year={y} />;
}

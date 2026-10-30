import { notFound } from "next/navigation";
import FormulaSheet from "@/components/formula/FormulaSheet";
import { FORMULA_YEARS, formulaSlug, yearFromFormulaSlug, yearLabel } from "@/lib/formula-sheets";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return FORMULA_YEARS.map((y) => ({ slug: formulaSlug(y) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const y = yearFromFormulaSlug(slug);
  if (!y) return {};
  const label = yearLabel(y);
  const title = `${label} Maths Formula Sheet (Free, Printable PDF) | Tuterly`;
  const description = `Every key ${label} maths formula on one printable page: number, algebra, measurement, geometry, statistics and probability. Australian Curriculum, free to print or save as a PDF.`;
  const url = `${SITE_URL}/formula-sheets/${slug}`;
  return { title: { absolute: title }, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website", images: ["/og-tuterly.png"] } };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const y = yearFromFormulaSlug(slug);
  if (!y) notFound();
  return <FormulaSheet year={y} />;
}

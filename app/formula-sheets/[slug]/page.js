import { notFound } from "next/navigation";
import FormulaSheet from "@/components/formula/FormulaSheet";
import { FORMULA_SHEETS, FORMULA_YEARS, formulaSlug, yearFromFormulaSlug, yearLabel } from "@/lib/formula-sheets";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return FORMULA_YEARS.map((y) => ({ slug: formulaSlug(y) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const y = yearFromFormulaSlug(slug);
  if (!y) return {};
  const label = yearLabel(y);
  // Ranks about 3 but few clicks (Search Console, Nov 2026): say how many
  // formulas and name some, so the result shows what's on the page.
  const strands = FORMULA_SHEETS[y] || [];
  const n = strands.reduce((t, s) => t + (s.items?.length || 0), 0);
  const named = strands.map((s) => (s.items || []).find((i) => i.name.includes(" "))?.name).filter(Boolean).slice(0, 4).map((x) => x.charAt(0).toLowerCase() + x.slice(1));
  const title = `${label} Maths Formula Sheet: All ${n} Formulas, 1 Page, Free PDF`;
  const description = `All ${n} ${label} maths formulas on one printable page, including ${named.slice(0, -1).join(", ")} and ${named[named.length - 1]}. Each links to free practice. Australian Curriculum, free to print or save as a PDF.`;
  const url = `${SITE_URL}/formula-sheets/${slug}`;
  return { title: { absolute: title }, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website", images: ["/og-tuterly.png"] } };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const y = yearFromFormulaSlug(slug);
  if (!y) notFound();
  return <FormulaSheet year={y} />;
}

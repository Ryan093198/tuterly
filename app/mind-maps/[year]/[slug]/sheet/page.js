import { notFound } from "next/navigation";
import MindMapSheet from "@/components/mind-maps/MindMapSheet";
import { LIVE_YEARS, getMindMap, mindMapsForYear, yearFromSlug, yearSlug } from "@/lib/mind-maps";

// The bare sheet, used by scripts/render-mind-maps.mjs to make the PNG and
// PDF (?pdf=1 zooms it to one A4 landscape page). Not for search engines.
export const metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return LIVE_YEARS.flatMap((y) => mindMapsForYear(y).map((m) => ({ year: yearSlug(y), slug: m.slug })));
}

export default async function MindMapSheetPage({ params }) {
  const { year, slug } = await params;
  const m = getMindMap(yearFromSlug(year), slug);
  if (!m) notFound();
  return <MindMapSheet map={m} mode="export" />;
}

import { notFound } from "next/navigation";
import { RevisionChapterPage, revisionChapterMetadata } from "@/components/mind-maps/RevisionPages";
import { getMindMap, mindMapsForYear } from "@/lib/mind-maps";

export function generateStaticParams() {
  return mindMapsForYear(9).map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const m = getMindMap(9, slug);
  return m ? revisionChapterMetadata(m) : {};
}

export default async function Page({ params }) {
  const { slug } = await params;
  const m = getMindMap(9, slug);
  if (!m) notFound();
  return <RevisionChapterPage map={m} />;
}

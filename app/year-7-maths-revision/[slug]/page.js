import { notFound } from "next/navigation";
import { RevisionChapterPage, revisionChapterMetadata } from "@/components/mind-maps/RevisionPages";
import { getMindMap, mindMapsForYear } from "@/lib/mind-maps";

export function generateStaticParams() {
  return mindMapsForYear(7).map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const m = getMindMap(7, slug);
  return m ? revisionChapterMetadata(m) : {};
}

export default async function Page({ params }) {
  const { slug } = await params;
  const m = getMindMap(7, slug);
  if (!m) notFound();
  return <RevisionChapterPage map={m} />;
}

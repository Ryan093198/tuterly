import { notFound } from "next/navigation";
import FeaturePage from "@/components/study/FeaturePage";
import { FEATURES, getFeature } from "@/lib/feature-pages";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const f = getFeature(slug);
  if (!f) return {};
  const title = `${f.title} | Tuterly`;
  const description = f.lead;
  const url = `${SITE_URL}/features/${f.slug}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { images: ["/og-tuterly.png"], title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function FeatureSlugPage({ params }) {
  const { slug } = await params;
  const f = getFeature(slug);
  if (!f) notFound();
  return <FeaturePage feature={f} />;
}

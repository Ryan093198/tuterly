import { notFound } from "next/navigation";
import SchPracticePage from "@/components/scholarship/SchPracticePage";
import { PROVIDERS, PROVIDER_SLUGS } from "@/lib/scholarship-practice";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return PROVIDER_SLUGS.map((provider) => ({ provider }));
}

export async function generateMetadata({ params }) {
  const { provider } = await params;
  const p = PROVIDERS[provider];
  if (!p) return {};
  const url = `${SITE_URL}/scholarship-practice/${provider}`;
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: { canonical: url },
    openGraph: { images: ["/og-tuterly.png"], title: p.title, description: p.description, url, type: "website" },
    twitter: { card: "summary_large_image", title: p.title, description: p.description },
  };
}

export default async function Page({ params }) {
  const { provider } = await params;
  if (!PROVIDERS[provider]) notFound();
  return <SchPracticePage provider={provider} />;
}

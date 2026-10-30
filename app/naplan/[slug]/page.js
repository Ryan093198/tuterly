import { notFound } from "next/navigation";
import NaplanPage from "@/components/naplan/NaplanPage";
import { NAPLAN_FACTS, NAPLAN_YEARS, naplanSlug, yearFromSlug } from "@/lib/naplan";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return NAPLAN_YEARS.map((y) => ({ slug: naplanSlug(y) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const y = yearFromSlug(slug);
  if (!y) return {};
  const title = `Year ${y} NAPLAN Numeracy Practice Test (Free, with Answers) | Tuterly`;
  const description = `A free Year ${y} NAPLAN-style numeracy practice test: 20 questions across every strand, marked instantly, with a worked solution for each. NAPLAN 2027 runs ${NAPLAN_FACTS.window}.`;
  const url = `${SITE_URL}/naplan/${slug}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", images: ["/og-tuterly.png"] },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const y = yearFromSlug(slug);
  if (!y) notFound();
  return <NaplanPage year={y} />;
}

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
  // Search wants online practice (Keyword Planner, Nov 2026: "naplan
  // practice tests online" and "naplan online practice"), so lead with it.
  // 17 Nov 2026: "Numeracy" and the year in the title. Searchers want the
  // whole test, and this page is numeracy only, so say so up front.
  const title = `Year ${y} NAPLAN Numeracy Practice Test 2027: Free Online`;
  const description = y >= 7
    ? `A free Year ${y} NAPLAN-style numeracy test that works like NAPLAN Online: 20 questions, non-calculator section first, on-screen calculator, marked instantly with worked solutions. NAPLAN 2027 runs ${NAPLAN_FACTS.window}.`
    : `A free Year ${y} NAPLAN-style numeracy practice test: 20 questions across every strand, marked instantly, with a worked solution for each. Printable PDF too. NAPLAN 2027 runs ${NAPLAN_FACTS.window}.`;
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

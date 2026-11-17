import Link from "next/link";
import { notFound } from "next/navigation";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import DiagnosticClient from "@/components/diagnostic/DiagnosticClient";
import { DIAG_PATH, DIAG_YEARS, buildDiagnostic, studentDiagnostic } from "@/lib/diagnostic";
import { SITE_URL } from "@/lib/site";
import "@/components/state/state-hub.css";
import "@/components/exam/exam.css";
import "@/components/paper/paper.css";

// One year's diagnostic test (lib/diagnostic.js).
export function generateStaticParams() {
  return DIAG_YEARS.map((y) => ({ year: y.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { year } = await params;
  const d = buildDiagnostic(year);
  if (!d) return {};
  const title = `Free ${d.year} Maths Assessment Test: Ready for ${d.next}? | Tuterly`;
  const description = `A free online ${d.year} maths assessment test (diagnostic test): 20 questions from every chapter, marked straight away, showing the gaps to fix before ${d.next}, with a free report for parents.`;
  const url = `${SITE_URL}${DIAG_PATH}/${d.slug}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { images: ["/og-tuterly.png"], title, description, url, type: "website" },
  };
}

export default async function DiagnosticYearPage({ params }) {
  const { year } = await params;
  const d = buildDiagnostic(year);
  if (!d) notFound();
  return (
    <div className="sh">
      <MarketingNav />
      <nav aria-label="Breadcrumb" className="sh-crumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={DIAG_PATH}>Diagnostic test</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{d.year}</li>
        </ol>
      </nav>
      <DiagnosticClient paper={studentDiagnostic(d)} yearSlug={d.slug} next={d.next} />
      <p className="dg-wrong-year">Not in {d.year} now? <Link href={DIAG_PATH}>Pick a different year</Link></p>
      <MarketingFooter />
    </div>
  );
}

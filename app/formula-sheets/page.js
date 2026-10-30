import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { Eyebrow, Reveal, SectionHead } from "@/components/brand";
import { FORMULA_YEARS, formulaSlug, yearLabel } from "@/lib/formula-sheets";
import { SITE_URL } from "@/lib/site";
import "@/components/study/study-landing.css";
import "@/components/formula/formula.css";

const TITLE = "Free Maths Formula Sheets, Years 7 to 10A (Printable) | Tuterly";
const DESCRIPTION = "Free printable maths formula sheets for Years 7, 8, 9, 10 and 10A, following the Victorian Curriculum 2.0. Every key formula on one page, linked to worked examples.";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/formula-sheets` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/formula-sheets`, type: "website", images: ["/og-tuterly.png"] },
};

export default function FormulaHub() {
  return (
    <div className="tb sl fs">
      <MarketingNav />
      <section className="fs-hero" aria-labelledby="fsh-title">
        <div className="tb-wrap">
          <Eyebrow>Formula sheets</Eyebrow>
          <h1 id="fsh-title" className="tb-h1 fs-h1">Free maths <span className="sl-accent">formula sheets</span></h1>
          <p className="tb-lead fs-lead">Every key formula and rule for each year level on one printable page, following the Victorian Curriculum 2.0. Print it, stick it on the wall, or save it as a PDF.</p>
        </div>
      </section>
      <section className="tb-section tb-section--card" aria-labelledby="fsh-years">
        <div className="tb-wrap">
          <Reveal><SectionHead id="fsh-years" eyebrow="Choose a year" title="Pick their year level." /></Reveal>
          <div className="fsh-grid">
            {FORMULA_YEARS.map((y) => (
              <Link key={y} href={`/formula-sheets/${formulaSlug(y)}`} className="fsh-card">
                <p className="fsh-card__title">{yearLabel(y)}</p>
                <span className="fsh-card__go">Open the formula sheet →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}

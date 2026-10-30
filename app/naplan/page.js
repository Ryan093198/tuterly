import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { Eyebrow, Reveal, SectionHead } from "@/components/brand";
import { NAPLAN_FACTS, NAPLAN_YEARS, OFFICIAL_DEMO, naplanSlug } from "@/lib/naplan";
import { SITE_URL } from "@/lib/site";
import "@/components/study/study-landing.css";
import "@/components/naplan/naplan.css";

const TITLE = "Free NAPLAN Numeracy Practice Tests, Years 3, 5, 7 and 9 | Tuterly";
const DESCRIPTION = `Free NAPLAN-style numeracy practice tests for Years 3, 5, 7 and 9: 20 questions each, marked instantly, with worked solutions. NAPLAN 2027 runs ${NAPLAN_FACTS.window}.`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/naplan` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/naplan`, type: "website", images: ["/og-tuterly.png"] },
};

export default function NaplanHub() {
  return (
    <div className="tb sl np">
      <MarketingNav />
      <section className="np-hero" aria-labelledby="nph-title">
        <div className="tb-wrap">
          <Eyebrow>NAPLAN practice</Eyebrow>
          <h1 id="nph-title" className="tb-h1 np-h1">Free NAPLAN numeracy <span className="sl-accent">practice tests</span></h1>
          <p className="tb-lead np-lead">
            A NAPLAN-style numeracy test for each year level, 20 questions across every strand, marked as soon as you finish, with a worked solution for every question. NAPLAN 2027 runs from {NAPLAN_FACTS.window}.
          </p>
        </div>
      </section>
      <section className="tb-section tb-section--card" aria-labelledby="nph-years">
        <div className="tb-wrap">
          <Reveal><SectionHead id="nph-years" eyebrow="Choose a year" title="Pick their year level." /></Reveal>
          <div className="nph-grid">
            {NAPLAN_YEARS.map((y) => (
              <Link key={y} href={`/naplan/${naplanSlug(y)}`} className="nph-card">
                <p className="nph-card__title">Year {y} numeracy</p>
                <p className="nph-card__text">
                  20 questions · {NAPLAN_FACTS.minutes[y]}-minute real test · {y >= 7 ? "non-calculator section, then calculator" : "no calculator"}
                </p>
                <span className="nph-card__go">Start the Year {y} test →</span>
              </Link>
            ))}
          </div>
          <p className="np-disclaimer">
            These are Tuterly’s own NAPLAN-style questions, not official NAPLAN questions. NAPLAN is run by ACARA. For the official practice tests, see the <a href={OFFICIAL_DEMO} rel="noopener">NAPLAN public demonstration site</a>.
          </p>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}

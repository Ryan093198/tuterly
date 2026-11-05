import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import StudyAppCTA from "@/components/StudyAppCTA";
import { Eyebrow } from "@/components/brand";
import { LIVE_YEARS, MIND_MAP_YEARS, mindMapFiles, mindMapPath, mindMapsForYear } from "@/lib/mind-maps";
import { SITE_URL } from "@/lib/site";
import "@/components/study/study-landing.css";
import "@/components/mind-maps/mind-maps.css";

const TITLE = "Free Maths Mind Maps, Year 9 (Printable A4) | Tuterly";
const DESCRIPTION = "Free printable maths mind maps for every Year 9 chapter: each idea on one A4 page with a plain-English rule and a worked example. Years 7, 8 and 10 coming soon.";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/mind-maps` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/mind-maps`, type: "website", images: ["/og-tuterly.png"] },
};

export default function MindMapsHub() {
  return (
    <div className="tb sl">
      <MarketingNav />
      <section className="tb-section">
        <div className="tb-wrap">
          <Eyebrow>Free maths mind maps</Eyebrow>
          <h1 className="tb-h1">Every chapter on <span className="sl-accent">one page</span>.</h1>
          <p className="tb-lead" style={{ maxWidth: 680 }}>
            A mind map for each chapter: every idea with a plain-English rule, a worked example and the mistake to watch out for. Free to view, print or save as an A4 PDF.
          </p>
        </div>
      </section>
      {LIVE_YEARS.map((y) => (
        <section key={y} className="tb-section tb-section--card" aria-labelledby={`mm-y${y}`}>
          <div className="tb-wrap">
            <h2 id={`mm-y${y}`} className="tb-h2" style={{ marginBottom: 16 }}>Year {y}</h2>
            <div className="mm-chapters">
              {mindMapsForYear(y).map((m) => (
                <Link key={m.slug} href={mindMapPath(m)} className="mm-chapter">
                  <img src={mindMapFiles(m).png} alt={`Year ${y} ${m.title} mind map`} loading="lazy" width="1680" height="1188" />
                  <span className="mm-chapter__k">Chapter {m.chapter}</span>
                  <span className="mm-chapter__t">{m.title}</span>
                </Link>
              ))}
            </div>
            <p className="mm-soon" style={{ marginTop: 20 }}>
              {`Years ${MIND_MAP_YEARS.filter((x) => !LIVE_YEARS.includes(x)).join(", ").replace(/, (\d+)$/, " and $1")} mind maps are coming soon.`}
            </p>
          </div>
        </section>
      ))}
      <section className="tb-section">
        <div className="tb-wrap" style={{ maxWidth: 720 }}>
          <StudyAppCTA variant="inline" placement="mind_maps_hub" heading="Got some of these wrong in a test?" />
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}

import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import StudyAppCTA from "@/components/StudyAppCTA";
import { LIVE_YEARS, MIND_MAP_YEARS, mindMapFiles, mindMapPath, mindMapsForYear, revisionBooklet, revisionYearPath } from "@/lib/mind-maps";
import { SITE_URL } from "@/lib/site";
import "@/components/study/study-landing.css";
import "@/components/mind-maps/mind-maps.css";
import { DownloadPanel, GatedDownload } from "@/components/mind-maps/MindMapGate";
import RevisionHero from "@/components/mind-maps/RevisionHero";

const TITLE = "Free Maths Revision Mind Maps and Summary Sheets, Years 7 to 10 | Tuterly";
const DESCRIPTION = "Free printable maths revision mind maps: every chapter summarised on one A4 page with rules, worked examples and common mistakes. Year 9 is out now; Years 7, 8 and 10 are coming soon.";

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
      <RevisionHero
        eyebrow="Free maths revision mind maps"
        title={<>Every chapter on <span className="sl-accent">one page</span>.</>}
        lead="A free one-page mind map for every maths chapter: the rules in plain English, worked examples and the mistakes to watch out for. Year 9 is out now; Years 7, 8 and 10 are coming soon."
        panel={
          <DownloadPanel
            downloads={[{ href: revisionBooklet(LIVE_YEARS[0]), label: `Download the Year ${LIVE_YEARS[0]} revision booklet (PDF)` }]}
            placement="mind_maps_hub" year={LIVE_YEARS[0]}
            title={`Get the free Year ${LIVE_YEARS[0]} revision booklet`} cta="Get the booklet"
            text={`All ${mindMapsForYear(LIVE_YEARS[0]).length} Year ${LIVE_YEARS[0]} topics, one A4 page each. Free with your email.`}
          />
        }
        previews={mindMapsForYear(LIVE_YEARS[0]).slice(3, 6).map((m) => mindMapFiles(m).preview)}
        previewAlt="Maths revision mind maps"
      />
      {LIVE_YEARS.map((y) => (
        <section key={y} className="tb-section tb-section--card" aria-labelledby={`mm-y${y}`}>
          <div className="tb-wrap">
            <h2 id={`mm-y${y}`} className="tb-h2" style={{ marginBottom: 8 }}><Link href={revisionYearPath(y)}>Year {y} maths revision</Link></h2>
            <p style={{ margin: "0 0 16px" }}><GatedDownload href={revisionBooklet(y)} className="tb-link" placement="mind_maps_hub_booklet" year={y}>Download all {mindMapsForYear(y).length} as one revision booklet (PDF)</GatedDownload></p>
            <div className="mm-chapters">
              {mindMapsForYear(y).map((m) => (
                <Link key={m.slug} href={mindMapPath(m)} className="mm-chapter">
                  <img src={mindMapFiles(m).preview} alt={`Year ${y} ${m.title} mind map`} loading="lazy" width="1680" height="1188" />
                  <span className="mm-chapter__k">Chapter {m.chapter}</span>
                  <span className="mm-chapter__t">{m.short}</span>
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

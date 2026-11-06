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
// "Years 9 and 10" / "Year 9".
const yearsText = (ys) => (ys.length === 1 ? `Year ${ys[0]}` : `Years ${ys.slice(0, -1).join(", ")} and ${ys[ys.length - 1]}`);
const COMING = MIND_MAP_YEARS.filter((x) => !LIVE_YEARS.includes(x));
const DESCRIPTION = `Free printable maths revision mind maps: every chapter summarised on one A4 page with rules, worked examples and common mistakes. Every chapter for ${yearsText(LIVE_YEARS)}.`;

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
        lead={`A free one-page mind map for every maths chapter: the rules in plain English, worked examples and the mistakes to watch out for. ${COMING.length ? `${yearsText(LIVE_YEARS)} ${LIVE_YEARS.length > 1 ? "are" : "is"} out now; ${yearsText(COMING)} coming soon.` : `All of ${yearsText(LIVE_YEARS)}, free.`}`}
        panel={
          <DownloadPanel
            downloads={LIVE_YEARS.map((y) => ({ href: revisionBooklet(y), label: `Download the Year ${y} booklet (PDF)` }))}
            placement="mind_maps_hub"
            title="Get the free revision booklets" cta="Get the booklets"
            text={`Every topic for ${yearsText(LIVE_YEARS)}, one A4 page each. Free with your email.`}
          />
        }
        previews={LIVE_YEARS.slice(-3).map((y) => mindMapFiles(mindMapsForYear(y)[2]).preview)}
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
            {COMING.length > 0 && y === LIVE_YEARS[LIVE_YEARS.length - 1] && (
              <p className="mm-soon" style={{ marginTop: 20 }}>{`${yearsText(COMING)} mind maps coming soon.`}</p>
            )}
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

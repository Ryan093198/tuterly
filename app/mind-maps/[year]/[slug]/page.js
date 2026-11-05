import Link from "next/link";
import { notFound } from "next/navigation";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import StudyAppCTA from "@/components/StudyAppCTA";
import { Eyebrow } from "@/components/brand";
import MindMapSheet from "@/components/mind-maps/MindMapSheet";
import { LIVE_YEARS, getMindMap, mindMapFiles, mindMapPath, mindMapsForYear, yearFromSlug, yearSlug } from "@/lib/mind-maps";
import { SITE_URL } from "@/lib/site";
import "@/components/study/study-landing.css";

export function generateStaticParams() {
  return LIVE_YEARS.flatMap((y) => mindMapsForYear(y).map((m) => ({ year: yearSlug(y), slug: m.slug })));
}

export async function generateMetadata({ params }) {
  const { year, slug } = await params;
  const m = getMindMap(yearFromSlug(year), slug);
  if (!m) return {};
  const title = `Year ${m.year} ${m.title}: Mind Map (Free A4 PDF) | Tuterly`;
  const description = `${m.summary} Free printable Year ${m.year} maths mind map.`;
  const url = `${SITE_URL}${mindMapPath(m)}`;
  return { title: { absolute: title }, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "article", images: [mindMapFiles(m).png] } };
}

export default async function MindMapPage({ params }) {
  const { year, slug } = await params;
  const y = yearFromSlug(year);
  const m = getMindMap(y, slug);
  if (!m) notFound();
  const all = mindMapsForYear(y);
  const i = all.indexOf(m);
  const prev = all[i - 1], next = all[i + 1];
  const files = mindMapFiles(m);
  return (
    <div className="tb sl">
      <MarketingNav />
      <main className="mm-page">
        <div className="tb-wrap">
          <nav aria-label="Breadcrumb" style={{ fontSize: 14, marginBottom: 10 }}>
            <Link href="/mind-maps" className="tb-link">Mind maps</Link> / Year {y}
          </nav>
          <div className="mm-head">
            <div>
              <Eyebrow>{`Year ${y} · Chapter ${m.chapter}`}</Eyebrow>
              <h1 className="tb-h1" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>{m.title}</h1>
              <p className="tb-lead" style={{ maxWidth: 720, marginTop: 6 }}>{m.summary}</p>
            </div>
            <div className="mm-actions">
              <a href={files.pdf} className="tb-btn tb-btn--primary" download>Download the A4 PDF</a>
              <a href={files.png} className="tb-btn tb-btn--secondary" download>Save as an image</a>
            </div>
          </div>
          <MindMapSheet map={m} />
          <div className="mm-head" style={{ marginTop: 24 }}>
            {prev ? <Link href={mindMapPath(prev)} className="tb-link">← Chapter {prev.chapter}: {prev.title}</Link> : <span />}
            {next ? <Link href={mindMapPath(next)} className="tb-link">Chapter {next.chapter}: {next.title} →</Link> : <span />}
          </div>
        </div>
      </main>
      <section className="tb-section tb-section--card">
        <div className="tb-wrap" style={{ maxWidth: 720 }}>
          <StudyAppCTA variant="inline" placement="mind_map" heading="Got some of these wrong in a test?" />
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}

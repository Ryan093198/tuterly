import { QuinnFigure } from "@/components/brand/QuinnArt";
import Link from "next/link";
import { appCta } from "@/lib/study-app";

// Top of the revision pages: words and the email box on the left, a picture
// of the actual mind map (or a fanned stack for a year) on the right, with a
// small card pointing to the app underneath.
export default function RevisionHero({ crumbs, eyebrow, title, lead, panel, previews = [], previewAlt = "" }) {
  const app = appCta();
  return (
    <section className="rv-hero">
      <div className="tb-wrap rv-hero__grid">
        <div className="rv-hero__copy">
          {crumbs && <nav aria-label="Breadcrumb" className="rv-crumbs">{crumbs}</nav>}
          <p className="tb-eyebrow">{eyebrow}</p>
          <h1 className="tb-h1 rv-hero__title">{title}</h1>
          <p className="tb-lead rv-hero__lead">{lead}</p>
          <div className="rv-hero__panel">{panel}</div>
        </div>
        <div className="rv-hero__side">
          <div className={`rv-stack rv-stack--${Math.min(previews.length, 3)}`} aria-hidden={previews.length > 1 ? "true" : undefined}>
            {previews.slice(0, 3).map((src, i) => (
              <img key={src} src={src} alt={i === 0 ? previewAlt : ""} className="rv-stack__img" width="720" height="509" loading={i ? "lazy" : "eager"} />
            ))}
            <span className="rv-stack__badge">Free A4 PDF</span>
          </div>
          <Link href={app.href} className="rv-app">
            <QuinnFigure mood="happy" bag glasses size={52} />
            <span>
              <strong>Got questions wrong in a test?</strong>
              <span className="rv-app__x">The Tuterly app turns each one into practice until it&apos;s mastered.</span>
              <span className="rv-app__go">{app.label} →</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

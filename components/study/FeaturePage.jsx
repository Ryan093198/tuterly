import Link from "next/link";
import StudyAppCTA from "@/components/StudyAppCTA";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import FlowSteps from "@/components/brand/FlowSteps";
import { Card, CtaBand, Eyebrow, Icon, PhoneFrame, Reveal, SectionHead } from "@/components/brand";
import { FEATURES } from "@/lib/feature-pages";
import "./study-landing.css";
import "./features.css";

// One feature, kept short: hero with a real screen, how it works as a
// row of screens, three points, two questions, the other features, CTA.
export default function FeaturePage({ feature }) {
  const f = feature;
  const placement = `feature_${f.slug.replace(/-/g, "_")}`;
  return (
    <div className="tb sl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: f.faqs.map((q) => ({ "@type": "Question", name: q.q, acceptedAnswer: { "@type": "Answer", text: q.a } })),
          }),
        }}
      />
      <MarketingNav />

      <section className="sl-hero" aria-labelledby="ft-title">
        <div className="tb-wrap sl-hero__grid">
          <div className="sl-hero__copy">
            <Eyebrow><Link href="/features" className="tb-link">Features</Link> · {f.name}</Eyebrow>
            <h1 id="ft-title" className="tb-h1">
              {f.h1[0]} <span className="sl-accent">{f.h1[1]}</span>
            </h1>
            <p className="tb-lead sl-hero__lead">{f.lead}</p>
            <div id="get-app" className="sl-hero__cta">
              <StudyAppCTA variant="hero" placement={`${placement}_hero`} slim />
            </div>
          </div>
          <div className="sl-hero__visual">
            <div className="sl-hero__blob" aria-hidden="true" />
            <PhoneFrame src={f.hero.src} alt={f.hero.alt} width={290} priority sizes="(max-width: 899px) 60vw, 290px" className="sl-hero__phone" />
          </div>
        </div>
      </section>

      <section className="tb-section tb-section--card" aria-labelledby="ft-how">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="ft-how" eyebrow="How it works" title={`${f.name}, step by step.`} />
          </Reveal>
          <FlowSteps steps={f.steps} label={`${f.name}, how it works`} />
        </div>
      </section>

      <section className="tb-section" aria-labelledby="ft-why">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="ft-why" eyebrow="Why it helps" title="Small details that make it stick." />
          </Reveal>
          <div className="ft-points">
            {f.points.map((p) => (
              <Card key={p.title}>
                <h3 className="tb-h3">{p.title}</h3>
                <p className="tb-muted ft-point__text">{p.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="tb-section tb-section--card" aria-labelledby="ft-faq">
        <div className="tb-wrap tb-wrap--narrow">
          <Reveal>
            <SectionHead id="ft-faq" eyebrow="Questions" title="Good to know." />
          </Reveal>
          <div className="sl-faq">
            {f.faqs.map((q) => (
              <details key={q.q} className="sl-faq__item">
                <summary>
                  <span>{q.q}</span>
                  <span className="sl-faq__plus" aria-hidden="true">+</span>
                </summary>
                <p>{q.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="ft-more">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="ft-more" eyebrow="More features" title="What else Tuterly does." />
          </Reveal>
          <ul className="ft-more">
            {FEATURES.filter((x) => x.slug !== f.slug).map((x) => (
              <li key={x.slug}>
                <Link href={`/features/${x.slug}`} className="tb-card">
                  <span className="ft-row__icon" aria-hidden="true"><Icon name={x.icon} /></span>
                  {x.name} →
                </Link>
              </li>
            ))}
            <li>
              <Link href="/parents" className="tb-card">
                <span className="ft-row__icon" aria-hidden="true"><Icon name="star" /></span>
                For parents →
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <CtaBand
        id={`${placement}-final-title`}
        title="Better maths marks start with the next wrong answer."
        lead="Tuterly turns every missed maths question into practice tailored towards the student, not just a generic worksheet."
      >
        <StudyAppCTA variant="hero" placement={`${placement}_final`} position="final" />
      </CtaBand>
      <MarketingFooter />
    </div>
  );
}

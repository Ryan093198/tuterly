import Link from "next/link";
import StudyAppCTA from "@/components/StudyAppCTA";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { Card, CtaBand, Eyebrow, Icon, PhoneFrame, Reveal, SectionHead } from "@/components/brand";
import { FEATURES, STICKS } from "@/lib/feature-pages";
import "./study-landing.css";
import "./features.css";

// /features: each headline feature as a short row with a real screen,
// then the small things that make learning stick, then the parent view.
export default function FeaturesHub() {
  return (
    <div className="tb sl">
      <MarketingNav />

      <section className="sl-hero" aria-labelledby="fh-title">
        <div className="tb-wrap sl-hero__grid">
          <div className="sl-hero__copy">
            <Eyebrow>Features · Years 7 to 10 maths</Eyebrow>
            <h1 id="fh-title" className="tb-h1">
              Everything Tuterly does starts with a <span className="sl-accent">wrong answer</span>.
            </h1>
            <p className="tb-lead sl-hero__lead">
              Snap the questions they got wrong, test any topic, and revise from notes built around their mistakes. Here’s what each part does.
            </p>
            <div id="get-app" className="sl-hero__cta">
              <StudyAppCTA variant="hero" placement="features_hero" slim />
            </div>
          </div>
          <div className="sl-hero__visual">
            <div className="sl-hero__blob" aria-hidden="true" />
            <PhoneFrame src="/app-screens/home.png" alt="The Tuterly home screen: Snap a question, Fix my mistakes and this week’s goals" width={290} priority sizes="(max-width: 899px) 60vw, 290px" className="sl-hero__phone" />
          </div>
        </div>
      </section>

      <section className="tb-section tb-section--card" aria-label="Features">
        <div className="tb-wrap ft-rows">
          {FEATURES.map((f) => (
            <div key={f.slug} className="ft-row">
              <div className="ft-row__copy">
                <span className="ft-row__icon" aria-hidden="true"><Icon name={f.icon} /></span>
                <h2 className="tb-h2 ft-row__title">{f.name}</h2>
                <p className="ft-row__text">{f.short}</p>
                <Link href={`/features/${f.slug}#how-it-works`} className="tb-link">See how {f.name.toLowerCase()} works →</Link>
              </div>
              <div className="ft-row__phone">
                <PhoneFrame src={f.hero.src} alt={f.hero.alt} width={250} sizes="(max-width: 899px) 60vw, 250px" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="tb-section" aria-labelledby="fh-sticks">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="fh-sticks" eyebrow="Learning that sticks" title="Built so it stays learned." />
          </Reveal>
          <div className="ft-points ft-points--4">
            {STICKS.map((p) => (
              <Card key={p.title}>
                <h3 className="tb-h3">{p.title}</h3>
                <p className="tb-muted ft-point__text">{p.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="tb-section tb-section--card" aria-labelledby="fh-parents">
        <div className="tb-wrap">
          <div className="ft-row">
            <div className="ft-row__copy">
              <span className="ft-row__icon" aria-hidden="true"><Icon name="star" /></span>
              <h2 id="fh-parents" className="tb-h2 ft-row__title">For parents and tutors</h2>
              <p className="ft-row__text">
                Link with a 6-character code. Each week you see what they added, fixed and mastered, their test scores and their trickiest topic. You see progress, not their photos.
              </p>
              <Link href="/parents" className="tb-link">See the parent view →</Link>
            </div>
            <div className="ft-row__phone">
              <PhoneFrame src="/app-screens/flow-parent/01-week-in-review.png" alt="Week in review: questions added and mastered, similar ones right, XP and streak" width={250} sizes="(max-width: 899px) 60vw, 250px" />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        id="features-final-title"
        title="Better maths marks start with the next wrong answer."
        lead="Tuterly turns every missed maths question into practice tailored towards the student, not just a generic worksheet."
      >
        <StudyAppCTA variant="hero" placement="features_final" position="final" />
      </CtaBand>
      <MarketingFooter />
    </div>
  );
}

import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import Testimonials from "@/components/marketing/Testimonials";
import ContactCTA from "@/components/marketing/ContactCTA";
import FindTutorButton from "@/components/FindTutorButton";
import StudyAppCTA from "@/components/StudyAppCTA";
import FlowSteps from "@/components/brand/FlowSteps";
import MadeByEducators from "@/components/study/MadeByEducators";
import { Button, Card, CtaBand, Eyebrow, Icon, PhoneFrame, Reveal, SectionHead } from "@/components/brand";
import { STUDY_APP, isStudyAppLive } from "@/lib/study-app";
import { getStudyFaqs } from "@/lib/study-faqs";
import { PRICING } from "@/lib/pricing";
import "./parents.css";

// /parents: the parent's view of Tuterly Study, parent-first order:
// the app in one screen, what you'll see each week, safety and privacy,
// linking, price, then the CTA. Tutoring and the extras sit below the CTA.
// Metadata lives in ./layout.js (unchanged). Product facts come from
// TUTERLY-STUDY-FEATURES.md; screens from public/app-screens.

const S = "/app-screens";

const WEEK_FLOW = [
  {
    src: `${S}/flow-parent/01-week-in-review.png`,
    alt: "Week in review: 35 questions added, 2 mastered, 11 similar ones right, 855 XP and a 1 week streak",
    title: "Week in review",
    text: "Your child’s weekly recap. You see the same numbers.",
  },
  {
    src: `${S}/flow-parent/02-bank-by-topic.png`,
    alt: "The bank by topic, with a mastery ring and star count for each topic",
    title: "The bank by topic",
    text: "Every question, with a progress ring for each topic.",
  },
];

export default function ParentsPage() {
  const name = STUDY_APP.name;
  const live = isStudyAppLive();
  const priceAnswer = getStudyFaqs().find((f) => f.q === "How much does it cost?")?.a;

  return (
    <div className="tb pp">
      <MarketingNav />

      {/* 1. THE APP IN ONE SCREEN */}
      <section className="pp-hero" aria-labelledby="pp-title">
        <div className="tb-wrap pp-hero__grid">
          <div>
            <Eyebrow>For parents · Years 7 to 10 maths</Eyebrow>
            <h1 id="pp-title" className="tb-h1">Know what your child gets wrong in maths, and see it get fixed.</h1>
            <p className="tb-lead pp-hero__lead">
              {`With ${name}, your child snaps the maths questions they get wrong and practises fresh versions until each one is mastered. Each week you see what they added, fixed and mastered, plus their test scores.`}
            </p>
            <div className="pp-hero__cta">
              <StudyAppCTA variant="hero" placement="parents_hero" slim />
            </div>
          </div>
          <div className="pp-hero__visual">
            <div className="pp-hero__blob" aria-hidden="true" />
            <PhoneFrame
              src={`${S}/home.png`}
              alt="The Tuterly Study home screen: the Snap a question button, Fix my mistakes and this week’s goals"
              width={290}
              priority
              sizes="(max-width: 899px) 60vw, 290px"
              className="pp-hero__phone"
            />
          </div>
        </div>
      </section>

      {/* 1b. MADE BY AUSTRALIAN EDUCATORS */}
      <MadeByEducators id="educators" />

      {/* 2. WHAT YOU'LL SEE EACH WEEK */}
      <section className="tb-section tb-section--card" aria-labelledby="see">
        <div className="tb-wrap pp-split">
          <div>
            <Reveal>
              <SectionHead
                id="see"
                eyebrow="The parent view"
                title="What you see each week."
                lead="Your child owns the account. You get enough to know how they’re going and what to ask about, without reading over their shoulder."
              />
            </Reveal>
            <ul className="pp-list">
              <Item icon="star">Week in review: the questions they added, fixed and mastered this week.</Item>
              <Item icon="test">Their test scores, and their trickiest topic.</Item>
              <Item icon="flag">You can set a test on any topic for your child.</Item>
            </ul>
          </div>
          <FlowSteps steps={WEEK_FLOW} label="What a parent sees" />
        </div>
      </section>

      {/* 3. SAFETY AND PRIVACY */}
      <section className="tb-section" aria-labelledby="privacy">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="privacy" eyebrow="Safety and privacy" title="Progress, not photos." />
          </Reveal>
          <div className="pp-two">
            <Card>
              <h3 className="tb-h3 pp-card-title"><Icon name="privacy" /> What you don’t see</h3>
              <ul className="pp-list pp-list--plain">
                <li>The photos of their work. Those stay private to your child and any tutor they link (our AI service reads them to solve the question).</li>
                <li>Every individual question. You see topics and scores instead.</li>
              </ul>
            </Card>
            <Card>
              <h3 className="tb-h3 pp-card-title"><Icon name="book" /> Their data stays theirs</h3>
              <p className="tb-muted pp-card-text">
                Photos and questions are never reused for anyone else. Your child can remove your link, delete a question, or delete their account at any time.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. LINKING */}
      <section className="tb-section tb-section--card" aria-labelledby="link">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="link" eyebrow="Getting set up" title="Linking takes a code, not a password." />
          </Reveal>
          <ol className="pp-steps">
            <Step n="1" title="Your child signs up">They create their own account on their iPhone and pick their year level (7 to 10).</Step>
            <Step n="2" title="They share a code">In Settings they find a 6-character code, or invite you by email.</Step>
            <Step n="3" title="You see the summary">Install the app on your own iPhone, sign in, and enter the code. You’ll then see their weekly summary and topic scores.</Step>
          </ol>
          <p className="pp-note">
            {live
              ? `${name} is on the App Store for iPhone.`
              : `${name} is in a small pilot with Bayside Academics students right now, and every student's parent gives written consent before they're added. It isn't on the App Store yet.`}
          </p>
        </div>
      </section>

      {/* 5. PRICE */}
      <section className="tb-section" aria-labelledby="price">
        <div className="tb-wrap tb-wrap--narrow">
          <Card className="pp-price">
            <Eyebrow>Price</Eyebrow>
            <h2 id="price" className="tb-h2">{STUDY_APP.priceLine}</h2>
            {priceAnswer && <p className="tb-lead" style={{ marginTop: 12 }}>{priceAnswer}</p>}
          </Card>
        </div>
      </section>

      {/* 6. CTA */}
      <CtaBand
        id="pp-final"
        title="Start with the next maths question they get wrong."
        lead={`${name} is for Years 7 to 10 maths on iPhone. ${STUDY_APP.priceLine}.`}
      >
        <StudyAppCTA variant="hero" placement="parents_final" position="final" />
      </CtaBand>

      {/* Below the CTA: dinner questions, free practice, tutoring. */}
      <section className="tb-section tb-section--card" aria-labelledby="home-qs">
        <div className="tb-wrap tb-wrap--narrow">
          <Reveal>
            <SectionHead id="home-qs" eyebrow="Using the summary" title="Three questions worth asking at dinner." />
          </Reveal>
          <ul className="pp-list">
            <Item icon="bank">“Which topic has the most to fix?” It’s usually the one to take a test in next.</Item>
            <Item icon="snap">“Did you snap the ones from the test you got back?” A marked school test is the best source of questions to fix.</Item>
            <Item icon="explain">“What did Explain this say?” Explaining a step out loud is a good check that it has stuck.</Item>
          </ul>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="free">
        <div className="tb-wrap tb-wrap--narrow pp-free">
          <h2 id="free" className="tb-h2" style={{ fontSize: "clamp(26px, 2vw + 18px, 34px)" }}>Free maths practice, no app needed</h2>
          <p className="tb-lead" style={{ margin: "10px auto 22px" }}>Anything they get wrong on these is exactly what to snap.</p>
          <div className="pp-free__links">
            <Button href="/worksheets" variant="secondary">Free worksheets</Button>
            <Button href="/practice-maths-tests-secondary" variant="secondary">Practice tests, Years 7 to 10</Button>
            <Button href="/practice-maths-tests-primary" variant="secondary">Practice tests, Years 3 to 6</Button>
          </div>
        </div>
      </section>

      <section className="tb-section tb-section--card" aria-labelledby="tutor">
        <div className="tb-wrap pp-split pp-split--top">
          <div>
            <SectionHead
              id="tutor"
              eyebrow="Prefer a real tutor?"
              title="Bayside Academics can help."
              lead={`Some children need a person: someone to explain it a different way, plan what comes next, or cover a subject the app doesn’t. Our tutors cover primary through VCE, with a written report after every session. Sessions from $${PRICING.sessionFrom} an hour, all-inclusive, no lock-in.`}
            />
            <p className="tb-muted pp-card-text" style={{ marginTop: -12, marginBottom: 20 }}>
              {`Tutors can link to ${name} too, look through your child’s mistakes before a session and set snap goals.`}
            </p>
            <div className="pp-tutor-actions">
              <FindTutorButton source="parents_page" className="tb-btn tb-btn--secondary">Find a local tutor</FindTutorButton>
              <Link href="/directory" className="tb-textlink">Browse tutors →</Link>
              <Link href="/sample-report" className="tb-textlink">See a sample report →</Link>
            </div>
          </div>
          <ContactCTA variant="card" headline="Not sure which is right for your child?" subhead="Tell us a bit about them and we'll give you a straight answer, app or tutor." context="parents page" />
        </div>
      </section>

      {/* Real, consented tutoring testimonials only (lib/testimonials.js).
          Renders nothing if none match. None are about the app yet. */}
      <Testimonials
        variant="feature"
        tags={["home", "parents"]}
        limit={4}
        background="var(--background)"
        headingFont="var(--font-display)"
        bodyFont="var(--font-display)"
        kicker="From our tutoring families"
        heading="What parents say about our tutors."
      />

      <MarketingFooter />
    </div>
  );
}

function Item({ icon, children }) {
  return (
    <li className="pp-item">
      <span className="tb-tile__icon" aria-hidden="true"><Icon name={icon} /></span>
      <span>{children}</span>
    </li>
  );
}

function Step({ n, title, children }) {
  return (
    <li className="tb-card pp-step">
      <span className="tb-flow__num" aria-hidden="true" style={{ margin: 0 }}>{n}</span>
      <h3 className="tb-h3">{title}</h3>
      <p className="tb-muted pp-card-text" style={{ marginTop: 0 }}>{children}</p>
    </li>
  );
}

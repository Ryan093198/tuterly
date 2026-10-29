import Link from "next/link";
import StudyAppCTA from "@/components/StudyAppCTA";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import {
  CtaBand, Icon, OptionTile, PhoneFrame, Reveal, SectionHead,
} from "@/components/brand";
import { STUDY_APP } from "@/lib/study-app";
import { getStudyFaqs } from "@/lib/study-faqs";
import MadeByEducators from "@/components/study/MadeByEducators";
import PriceTrial from "@/components/study/PriceTrial";
import ResultsProof, { LaunchPill } from "@/components/study/ResultsProof";
import TryQuestion from "@/components/study/TryQuestion";
import TryHeroLink from "@/components/study/TryHeroLink";
import QuestionCounter from "@/components/study/QuestionCounter";
import TopicGrid from "@/components/study/TopicGrid";
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import "./topic-grid.css";
import "./study-landing.css";

// Home page for tuterly.com.au: the landing page for the Tuterly app, in
// the app's own look (components/brand). Server component.
//
// Simplified 29 Oct 2026 to nine sections, alternating page and white
// backgrounds, every heading left-aligned:
//   1 hero, 2 how it works, 3 try it, 4 does it just give answers,
//   5 what's in the app, 6 for parents, 7 made by educators,
//   8 maths explained, 9 price, FAQ and the final sign-up.
// Detail lives on other pages: the feature pages (/features/...), the
// "different questions" example (/features/snap-a-question) and the
// tutor comparison (/parents).
//
// Copy rules: no invented numbers, ratings, results or testimonials; no
// claim that the app beats tutoring. Product facts come from the features
// file in the Project. Screens are real, from public/app-screens.

const S = "/app-screens";

// "Maths, explained": the topic pages grouped by year (in the order of lib/worksheet-landing-pages.js).
const TOPIC_YEARS = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 10A"].map((year) => ({
  year,
  topics: WORKSHEET_LANDING_PAGES.filter((p) => p.yearLevel === year).map((p) => ({ slug: p.slug, topic: p.topic })),
}));

// How it works, in three steps. Each step opens its feature page.
const THREE_STEPS = [
  {
    title: "Snap it.",
    text: "A photo of any question they got wrong, or a whole school test.",
    src: `${S}/flow-snap/02-snap-menu.png`,
    alt: "Tuterly's Snap a question menu: take a photo, choose from photos, or upload a whole test",
    href: "/features/snap-a-question",
  },
  {
    title: "Practise it.",
    text: "Fresh questions on the same idea, until it clicks.",
    src: `${S}/flow-practice/03-test-question.png`,
    alt: "A Tuterly practice question: find the length of a ladder leaning against a wall, with the answer typed in",
    href: "/features/snap-a-question",
  },
  {
    title: "Nail the test.",
    text: "A practice test on any topic before the real one.",
    src: `${S}/flow-practice/04-test-score.png`,
    alt: "A Tuterly practice test result: 6 out of 8",
    href: "/features/test-any-topic",
  },
];

export default function StudyLanding() {
  const faqs = getStudyFaqs({ home: true });
  const name = STUDY_APP.name;

  return (
    <div className="tb sl">
      <MarketingNav />

      {/* 1. HERO */}
      <section className="sl-hero" aria-labelledby="hero-title">
        <div className="tb-wrap sl-hero__grid">
          <div className="sl-hero__copy">
            <LaunchPill />
            <h1 id="hero-title" className="tb-h1">
              Boost your child’s <span className="sl-accent">maths marks</span>.
            </h1>
            <p className="tb-lead sl-hero__lead">
              {`The self-learning maths app for Years 7 to 10. Snap a question they got wrong, or upload a whole school test, and ${name} writes fresh questions on the same idea until it’s mastered.`}
            </p>
            <div id="get-app" className="sl-hero__cta">
              <StudyAppCTA variant="hero" placement="home_hero" slim />
            </div>
            <TryHeroLink variant="text" />
            <ResultsProof compact className="sl-hero__proof" />
          </div>
          <div className="sl-hero__visual">
            <div className="sl-hero__blob" aria-hidden="true" />
            <PhoneFrame
              src={`${S}/flow-snap/03-question-solution-hidden.png`}
              alt="Tuterly showing a question the student got wrong, with a similar question to master"
              width={300}
              priority
              sizes="(max-width: 899px) 62vw, 300px"
              className="sl-hero__phone"
            />
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="tb-section tb-section--card sl-how" aria-labelledby="how" id="how-section">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="how" eyebrow="How it works" title="From a wrong answer to a better mark." />
          </Reveal>
          <ol className="sl-steps__list">
            {THREE_STEPS.map((s, i) => (
              <li key={s.title} className="sl-steps__item">
                <Link href={s.href} className="sl-steps__link">
                  <PhoneFrame src={s.src} alt={s.alt} width={180} sizes="(max-width: 759px) 76px, 150px" className="sl-steps__phone" />
                  <span className="sl-steps__cap">
                    <span className="sl-steps__num" aria-hidden="true">{i + 1}</span>
                    <span className="sl-steps__title">{s.title}</span>
                    <span className="sl-steps__text">{s.text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <QuestionCounter />
        </div>
      </section>

      {/* 3. TRY IT */}
      <section className="tb-section" aria-labelledby="try-title" id="try-it">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead
              id="try-title"
              eyebrow="Try it free"
              title="Got a question wrong? Snap it and see."
              lead={`Upload one maths question your child got wrong. ${name} shows the worked solution, then writes a fresh question on the same idea to try. Free with your email, 2 questions a day.`}
            />
          </Reveal>
          <TryQuestion />
        </div>
      </section>

      {/* 4. DOES IT JUST GIVE ANSWERS? */}
      <section className="tb-section tb-section--card" aria-labelledby="answers">
        <div className="tb-wrap sl-split">
          <div>
            <Reveal>
              <SectionHead
                id="answers"
                eyebrow="A fair question"
                title="Does it just give them the answers?"
                lead={`No. Seeing how a question is solved is only step one. The marks come from your child doing the next one on their own, and that’s what ${name} is built around.`}
              />
            </Reveal>
            <ul className="sl-points">
              <Point icon="explain" title="The solution stays hidden until they ask">
                Every question has a full worked solution, hidden at first so they can have another go before they look.
              </Point>
              <Point icon="drill" title="Then they solve a different one themselves">
                Same idea, but a new context, structure or numbers, never just the numbers swapped. They type the answer and the app checks it.
              </Point>
              <Point icon="star" title="Mastered means right more than once">
                Each similar question they get right earns a star. Three stars and it’s mastered, then they can try a harder one.
              </Point>
            </ul>
            <p className="sl-more">
              <Link href="/features/snap-a-question#different-questions" className="tb-textlink">See an example of how questions change →</Link>
            </p>
          </div>
          <div className="sl-split__phone sl-split__phone--desktop">
            <PhoneFrame
              src={`${S}/flow-snap/03-question-solution-hidden.png`}
              alt="A question the student got wrong, with its solution hidden, and a similar question to answer themselves"
              width={270}
              sizes="(max-width: 899px) 62vw, 270px"
            />
          </div>
        </div>
      </section>

      {/* 5. WHAT'S IN THE APP */}
      <section className="tb-section" aria-labelledby="features">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="features" eyebrow="In the app" title="Everything they need before a test." />
          </Reveal>
          <div className="tb-tiles">
            <OptionTile href="/features/upload-a-test" icon="upload" title="Upload a whole test" text="Photos, a PDF or a Word document. The questions marked wrong are saved automatically." />
            <OptionTile href="/features/test-any-topic" icon="test" tone="violet" title="Test any topic" text="A short practice test on any topic in their year, even before they’ve snapped anything." />
            <OptionTile href="/features/study-notes" icon="notes" tone="violet" title="Study notes" text="A revision sheet on a whole topic, or just the parts they find hard." />
            <OptionTile href="/features" icon="drill" tone="success" title="Fix my mistakes" text="The questions they got wrong, one after another, until each one is mastered." />
          </div>
          <p className="sl-more">
            <Link href="/features" className="tb-textlink">See all features →</Link>
          </p>
        </div>
      </section>

      {/* 6. FOR PARENTS */}
      <section className="tb-section tb-section--card" aria-labelledby="parents">
        <div className="tb-wrap sl-split">
          <div>
            <Reveal>
              <SectionHead id="parents" eyebrow="For parents" title="See the progress without reading over their shoulder." />
            </Reveal>
            <ul className="sl-points">
              <Point icon="star" title="Week in review">
                What they added and mastered this week, how many similar questions they got right, their test scores and their trickiest topic.
              </Point>
              <Point icon="upload" title="Upload what comes home">
                Marked tests, practice papers and the term planner, from your own phone. {name} turns them into practice.
              </Point>
              <Point icon="privacy" title="Progress, not photos">
                You see topics and scores. The photos of their work stay private to your child and any tutor they link.
              </Point>
            </ul>
            <p className="sl-more">
              <Link href="/parents" className="tb-textlink">More for parents, including how it compares with tutoring →</Link>
            </p>
          </div>
          <div className="sl-split__phone">
            <PhoneFrame
              src={`${S}/flow-parent/01-week-in-review.png`}
              alt="Week in review: questions added, questions mastered, similar ones right, XP earned and the weekly streak"
              width={270}
              sizes="(max-width: 899px) 56vw, 270px"
              className="sl-split__parentphone"
            />
          </div>
        </div>
      </section>

      {/* 7. MADE BY AUSTRALIAN EDUCATORS */}
      <MadeByEducators />

      {/* 8. MATHS, EXPLAINED: every topic page */}
      <section className="tb-section tb-section--card" aria-labelledby="explained" id="topics">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead
              id="explained"
              eyebrow="Every topic, Years 7 to 10A"
              title="Maths, explained."
              lead="Worked examples, the common mistakes to watch for, and a question to try, for every topic in the Victorian Curriculum. Free, no sign-up."
            />
          </Reveal>
          <TopicGrid years={TOPIC_YEARS} />
          <p className="sl-more">
            Need more practice? <Link href="/worksheets" className="tb-textlink">Make a free worksheet on any topic</Link>.
          </p>
        </div>
      </section>

      {/* 9. PRICE, FAQ AND FINAL SIGN-UP */}
      <section className="tb-section" aria-labelledby="price">
        <div className="tb-wrap">
          <PriceTrial id="price">
            <div style={{ width: "100%", maxWidth: 460 }}>
              <StudyAppCTA variant="hero" placement="home_price" position="inline" slim />
            </div>
          </PriceTrial>
        </div>
      </section>

      <section className="tb-section tb-section--card" aria-labelledby="faq">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="faq" eyebrow="Questions" title="Frequently asked questions" />
          </Reveal>
          <div className="sl-faq">
            {faqs.map((f) => (
              <details key={f.q} className="sl-faq__item">
                <summary>
                  <span>{f.q}</span>
                  <span className="sl-faq__plus" aria-hidden="true">+</span>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        id="final-cta"
        quinn
        title="Better maths marks start with the next wrong answer."
        lead={`${name} turns every missed maths question into practice made for your child, not a generic worksheet.`}
      >
        <StudyAppCTA variant="hero" placement="home_final" position="final" />
      </CtaBand>

      <MarketingFooter />
    </div>
  );
}

function Point({ icon, title, children }) {
  return (
    <li className="sl-point">
      <span className="tb-tile__icon" aria-hidden="true"><Icon name={icon} /></span>
      <div>
        <p className="sl-point__title">{title}</p>
        <p className="sl-point__text">{children}</p>
      </div>
    </li>
  );
}

import Link from "next/link";
import DemoVideo from "@/components/study/DemoVideo";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import StudyAppCTA from "@/components/StudyAppCTA";
import FlowSteps from "@/components/brand/FlowSteps";
import MadeByEducators, { MadeInAustralia } from "@/components/study/MadeByEducators";
import PriceTrial from "@/components/study/PriceTrial";
import ResultsProof, { LaunchPill } from "@/components/study/ResultsProof";
import { Card, CtaBand, Eyebrow, Icon, PhoneFrame, Reveal, SectionHead } from "@/components/brand";
import { STUDY_APP, isStudyAppLive } from "@/lib/study-app";
import TryCta from "@/components/study/TryCta";
import TutorCompare from "@/components/study/TutorCompare";
import "./parents.css";

// /parents: the parent's view of Tuterly, parent-first order:
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

  return (
    <div className="tb pp">
      <MarketingNav />

      {/* 1. THE APP IN ONE SCREEN */}
      <section className="pp-hero" aria-labelledby="pp-title">
        <div className="tb-wrap pp-hero__grid">
          <div>
            <LaunchPill />
            <Eyebrow>For parents · Years 7 to 10 maths</Eyebrow>
            <h1 id="pp-title" className="tb-h1">Boost maths marks, and see the progress each week.</h1>
            <p className="tb-lead pp-hero__lead">
              {`With ${name}, your child snaps the maths questions they get wrong and practises fresh versions until each one is mastered. Each week you see what they added and mastered, plus their test scores.`}
            </p>
            <MadeInAustralia />
            <ResultsProof />
            <div className="pp-hero__cta">
              <StudyAppCTA variant="hero" placement="parents_hero" slim />
            </div>
          </div>
          <div className="pp-hero__visual">
            <div className="pp-hero__blob" aria-hidden="true" />
            <DemoVideo width={320} placement="parents_hero" priority />
          </div>
        </div>
      </section>

      <section className="sl-try-band" aria-label="Try it free">
        <div className="tb-wrap">
          <TryCta />
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
              <Item icon="star">Week in review: the questions they added and mastered this week.</Item>
              <Item icon="test">Their test scores, and their trickiest topic.</Item>
              <Item icon="flag">You can set a test on any topic for your child.</Item>
            </ul>
          </div>
          <FlowSteps steps={WEEK_FLOW} label="What a parent sees" />
        </div>
      </section>

      {/* 2b. PARENTS CAN UPLOAD TOO */}
      <section className="tb-section" aria-labelledby="upload">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead
              id="upload"
              eyebrow="You can add to it too"
              title="Upload their tests and term planner from your own phone."
              lead={`You don’t have to wait for your child to do it. From your linked account, upload what comes home from school and ${name} turns it into practice.`}
            />
          </Reveal>
          <div className="pp-three">
            <Card>
              <h3 className="tb-h3 pp-card-title"><Icon name="test" /> Marked school tests</h3>
              <p className="tb-muted pp-card-text">
                Photos of each page, a PDF or a Word document. The questions go into your child’s bank, and the ones marked wrong are stored automatically, each with a worked solution and a fresh question to master.
              </p>
            </Card>
            <Card>
              <h3 className="tb-h3 pp-card-title"><Icon name="upload" /> Practice tests and papers</h3>
              <p className="tb-muted pp-card-text">
                A practice paper from school, a past test, a worksheet their teacher handed out. Upload it and they practise exactly what their class is doing.
              </p>
            </Card>
            <Card>
              <h3 className="tb-h3 pp-card-title"><Icon name="notes" /> The term planner</h3>
              <p className="tb-muted pp-card-text">
                Upload the term planner or course outline from school, and {name} focuses their topic tests on what’s coming up this term.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 2c. TOPIC CHECK: find the gaps in each new topic. Facts from
          lib/feature-pages.js (topic-check). */}
      <section className="tb-section tb-section--card" aria-labelledby="topic-check">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead
              id="topic-check"
              eyebrow="Every new topic"
              title="Find the gaps before the test, not after the mark."
              lead={`Not every child brings home their wrong answers. A Topic check is a short test on the topic they’re learning, one question from each part of it. It works best a week or two into each new topic, and again before the test.`}
            />
          </Reveal>
          <div className="pp-three">
            <Card>
              <h3 className="tb-h3 pp-card-title"><Icon name="test" /> 1. Check the topic</h3>
              <p className="tb-muted pp-card-text">
                A fresh test on the topic, covering every part a school test is likely to include. It&rsquo;s written new each time, so a retest is a real test.
              </p>
            </Card>
            <Card>
              <h3 className="tb-h3 pp-card-title"><Icon name="bank" /> 2. Gaps go into the bank</h3>
              <p className="tb-muted pp-card-text">
                It&rsquo;s marked straight away. Every question they got wrong is saved to their bank with a worked solution, so nothing slips through.
              </p>
            </Card>
            <Card>
              <h3 className="tb-h3 pp-card-title"><Icon name="drill" /> 3. Drill until mastered</h3>
              <p className="tb-muted pp-card-text">
                Fix my mistakes works through them with fresh questions on the same idea. Their Week in review shows you what&rsquo;s fixed and what&rsquo;s still to go.
              </p>
            </Card>
          </div>
          <p style={{ marginTop: 18, textAlign: "center" }}>
            <Link href="/features/topic-check" className="tb-link">How Topic check works</Link>
          </p>
        </div>
      </section>

      {/* 3. SAFETY AND PRIVACY */}
      <section className="tb-section tb-section--card" aria-labelledby="privacy">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="privacy" eyebrow="Safety and privacy" title="Progress, not photos." />
          </Reveal>
          <div className="pp-two">
            <Card>
              <h3 className="tb-h3 pp-card-title"><Icon name="privacy" /> What you don’t see</h3>
              <ul className="pp-list pp-list--plain">
                <li>The photos your child takes of their work. Those stay private to your child and any tutor they link (our AI service reads them to solve the question).</li>
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


      {/* 4. COMPARED WITH TUTORING (moved from the home page) */}
      <TutorCompare />

      {/* 5. PRICE */}
      <section className="tb-section" aria-labelledby="price">
        <div className="tb-wrap tb-wrap--narrow">
          <PriceTrial id="price" />
        </div>
      </section>

      {/* 6. CTA */}
      <CtaBand
        id="pp-final"
        title="Better maths marks start with the next wrong answer."
        lead={`${name} turns every missed maths question into practice tailored towards the student, not just a generic worksheet.`}
      >
        <StudyAppCTA variant="hero" placement="parents_final" position="final" />
      </CtaBand>



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

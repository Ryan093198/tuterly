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
import { BAYSIDE } from "@/lib/bayside";
import TryCta from "@/components/study/TryCta";
import TutorCompare from "@/components/study/TutorCompare";
import "./parents.css";
import MethodStrip from "@/components/method/MethodStrip";

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
            <h1 id="pp-title" className="tb-h1">Better marks on their next maths test.</h1>
            <p className="tb-lead pp-hero__lead">
              {`Upload the test outline, past papers or term planner from school, and ${name} builds practice tests and drills on exactly what your child will be doing, in their school's style. Every question they get wrong becomes a worked solution and fresh practice until it's mastered, and you see the progress each week.`}
            </p>
            <MadeInAustralia />
            <ResultsProof />
            <div className="pp-hero__cta">
              <StudyAppCTA variant="hero" placement="parents_hero" slim />
              <p className="pp-hero__more"><Link href="/features/exam-zone">See how the practice exams work →</Link></p>
            </div>
          </div>
          <figure className="pp-hero__visual">
            <div className="pp-hero__blob" aria-hidden="true" />
            <DemoVideo width={320} placement="parents_hero" priority />
            <figcaption className="pp-hero__cap">
              <strong>Practice exams written from their own school&rsquo;s tests.</strong> Upload the outline, past papers and teacher&rsquo;s notes; {name} writes a practice exam in the same style, then marks it by topic.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 1a. PAIN POINTS (parent research, Nov 2026): the goal is better
          test and exam marks; these are what stands in the way. */}
      <section className="tb-section pp-pains" aria-labelledby="pp-pains-h">
        <div className="tb-wrap">
          <SectionHead id="pp-pains-h" eyebrow="Sound familiar?" title="What gets in the way of better marks." />
          <div className="pp-pains__grid">
            {[
              ["“They studied, but the mark didn’t show it.”", "Re-reading notes isn’t practice. Tuterly tests them on the exact topics in their school’s test, and drills every question they get wrong until it’s mastered."],
              ["“I don’t know what’s on the test.”", "Upload the test outline or term planner. Tuterly works out what’s coming and builds practice on exactly that, in their school’s style."],
              ["“It’s taught differently from when I was at school.”", "You don’t have to remember Year 9 maths. Every question gets a step-by-step worked solution, set out the way Australian maths is taught today."],
              ["“A tutor is $80 to $100 an hour.”", `${name} is ${STUDY_APP.offerShort}, 50% off until 31 March 2027, and they can practise any day, not just once a week.`],
            ].map(([t, x]) => (
              <Card key={t}>
                <h3 className="tb-h3 pp-pain__t">{t}</h3>
                <p className="tb-muted pp-pain__x">{x}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 1b. FROM OUR TUTORING CENTRE TO AN APP (Ryan, 9 Nov 2026). Every
          feature named here is in TUTERLY_FEATURES.md: onboarding (year,
          goal, test date and topics, weekly target), the To do list, the
          test countdown, term planner upload, Exam Zone, weekly review,
          stars, XP and the weekly streak. */}
      <section className="tb-section tb-section--card pp-method" aria-labelledby="pp-method-h">
        <div className="tb-wrap">
          <SectionHead
            id="pp-method-h"
            eyebrow="From our tutoring centre to their phone"
            title="Everything a good tutor does between sessions, built into an app."
            lead={`${name} is built by the team behind ${BAYSIDE.line}. A decade of one-on-one sessions showed us what actually moves a maths mark: knowing exactly what's on the next test, working from the student's own mistakes, and practising the right thing every week, not just more worksheets. We've put that into an app your child will actually open.`}
          />
          <div className="pp-method__ms">
            <MethodStrip
              variant="inline"
              lead="We boiled it down to three steps, so revision never feels daunting: don't study more, study your mistakes. Everything below is built around them."
            />
          </div>
          <ol className="pp-method__steps">
            {[
              ["It starts with their school", "When they sign up, they tell the app their year, their goal, their next test date and its topics. Upload the term planner, test outline or past papers, and everything that follows is built around what their school is teaching, not a generic syllabus."],
              ["It tells them what to practise next", "A To do list on the home screen shows the next step each day: the questions to fix, the topic test to sit, the drill to finish. A countdown keeps the next test in view, so practice is planned around it."],
              ["It works from their mistakes", "Every question they get wrong, in homework, a topic test or a real school test, becomes a worked solution and fresh practice on the same idea, until it's mastered. That's how a tutor spends a session, and it's where the marks are."],
              ["It predicts the test", "Exam Zone writes practice exams in their school's style from the outline and past papers, then marks them by topic and shows what to fix before the real one."],
              ["It keeps them coming back", "Stars for every question mastered, XP and levels, a weekly streak and weekly goals. Short sessions that feel like progress, not homework."],
              ["It keeps you in the loop", "Week in review shows what they practised and mastered, their test scores and their trickiest topic, like a tutor's note after each session."],
            ].map(([t, x], i) => (
              <li key={t} className="pp-method__step">
                <span className="pp-method__n" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3 className="tb-h3 pp-method__t">{t}</h3>
                  <p className="tb-muted pp-method__x">{x}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="pp-method__foot">The result: your child always knows what to practise next, and it&rsquo;s focused on what&rsquo;s coming up in their next test.</p>
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
      <p className="tb-wrap tb-muted" style={{ marginTop: -8, marginBottom: 24, fontWeight: 700 }}>
        Comparing apps as well? Read our guide to the <Link href="/best-maths-apps-australia">best maths apps for Years 7 to 10 in Australia</Link>.
      </p>

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

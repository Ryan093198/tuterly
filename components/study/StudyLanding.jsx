import Link from "next/link";
import katex from "katex";
import StudyAppCTA from "@/components/StudyAppCTA";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import FlowSteps from "@/components/brand/FlowSteps";
import {
  Card, CtaBand, Eyebrow, Icon, OptionTile, PhoneFrame, Reveal, SectionHead,
} from "@/components/brand";
import { STUDY_APP, isStudyAppLive } from "@/lib/study-app";
import { PRICING } from "@/lib/pricing";
import { getStudyFaqs } from "@/lib/study-faqs";
import "./study-landing.css";

// Home page for tuterly.com.au: the landing page for the Tuterly Study app,
// in the app's own look (components/brand). Server component; the only
// client pieces are StudyAppCTA and the flow carousels.
//
// Copy rules (TUTERLY-STUDY-FUNNEL-PROMPT.md, TUTERLY-WEBSITE-REDESIGN-PROMPT.md):
// no invented numbers, ratings, results or testimonials; no claim that the
// app beats tutoring or lifts marks. Product facts come from
// TUTERLY-STUDY-FEATURES.md (build 11). Screens are real, from
// public/app-screens (see its README).

function TeX({ children, display = false }) {
  // Native MathML (no KaTeX stylesheet or fonts to download): keeps the
  // home page light enough for a fast first paint on phones.
  const html = katex.renderToString(children, { displayMode: display, throwOnError: false, output: "mathml" });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

const S = "/app-screens";

const SNAP_FLOW = [
  {
    src: `${S}/flow-snap/02-snap-menu.png`,
    alt: "The Snap a question sheet in Tuterly Study: take a photo, choose from photos, or upload a whole test",
    title: "Snap the question",
    text: "Take a photo of the question. The app reads it and saves it with a full worked solution, hidden behind Show solution so they can have another go first.",
  },
  {
    src: `${S}/flow-snap/03-question-solution-hidden.png`,
    alt: "A question the student got wrong, Solve the inequality 4 − 2x > 10, with a similar question to master underneath",
    title: "Try a fresh version",
    text: "Straight away it writes a similar question on the same concept that is genuinely different, not the same question with the numbers changed. Every generated question is solved a second time by an independent check before your child sees it.",
  },
  {
    src: `${S}/flow-snap/04-solution-shown.png`,
    alt: "The worked solution open: the key idea, three steps and the answer x < −3",
    title: "See the worked solution",
    text: "The key idea, then each step, when they want it.",
  },
  {
    src: `${S}/flow-snap/05-similar-question-correct.png`,
    alt: "The similar question marked right, with a star and +5 XP",
    title: "Master it",
    text: "Getting a similar one right earns a star. Three stars, or tapping I’ve got it, and the question is mastered. Then they can try a harder one.",
  },
];

const PARENT_FLOW = [
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

const PRACTICE_FLOW = [
  {
    src: `${S}/flow-practice/02-test-any-topic-list.png`,
    alt: "Test any topic: a list of textbook topics to test",
    title: "Test any topic",
    text: "Pick a topic from their year.",
  },
  {
    src: `${S}/flow-practice/03-test-question.png`,
    alt: "Question 1 of 8, a Pythagoras ladder problem, with an answer typed using the maths keys",
    title: "Answer each question",
    text: "With maths keys for the answer.",
  },
  {
    src: `${S}/flow-practice/04-test-score.png`,
    alt: "The test score: 6 out of 8",
    title: "See the score",
    text: "The ones they got wrong go into their bank.",
  },
];

const NOTES_FLOW = [
  {
    src: `${S}/flow-notes/01-pick-topics.png`,
    alt: "Generate notes: pick up to four topics",
    title: "Pick the topics",
    text: "The whole topic, or just what they find hard.",
  },
  {
    src: `${S}/flow-notes/03-notes-sheet.png`,
    alt: "A one-page revision sheet with a summary and the key ideas",
    title: "Get a revision sheet",
    text: "One page, to download or share as a PDF.",
  },
];

export default function StudyLanding() {
  const live = isStudyAppLive();
  const faqs = getStudyFaqs();
  const name = STUDY_APP.name;

  return (
    <div className="tb sl">
      <MarketingNav />

      {/* 1. HERO */}
      <section className="sl-hero" aria-labelledby="hero-title">
        <div className="tb-wrap sl-hero__grid">
          <div className="sl-hero__copy">
            <Eyebrow>{name} · Years 7 to 10 maths · iPhone</Eyebrow>
            <h1 id="hero-title" className="tb-h1">
              Fix the maths questions your child gets <span className="sl-accent">wrong</span>.
            </h1>
            <p className="tb-lead sl-hero__lead">
              {`Snap a photo of a question they missed. ${name} saves it with a full worked solution, then writes a fresh question on the same idea to practise until it’s mastered.`}
            </p>
            <p className="sl-hero__pitch">It drills the questions your child actually gets wrong, not generic worksheets.</p>
            <div id="get-app" className="sl-hero__cta">
              <StudyAppCTA variant="hero" placement="home_hero" slim />
            </div>
            <a href="#how" className="tb-textlink">See how it works →</a>
          </div>
          <div className="sl-hero__visual">
            <div className="sl-hero__blob" aria-hidden="true" />
            <PhoneFrame
              src={`${S}/flow-snap/03-question-solution-hidden.png`}
              alt="Tuterly Study showing a question the student got wrong, with a similar question to master"
              width={300}
              priority
              sizes="(max-width: 899px) 62vw, 300px"
              className="sl-hero__phone"
            />
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="tb-section tb-section--card" aria-labelledby="how" id="how-section">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead
              id="how"
              eyebrow="How it works"
              title="Snap it. Try a fresh one. Practise until it’s mastered."
              lead="Homework, a textbook, a school test or a practice paper: any question they got wrong, or didn’t know how to start, goes into their own bank."
            />
          </Reveal>
          <FlowSteps steps={SNAP_FLOW} label="How it works" />
          <Reveal>
            <p className="sl-note">
              Got one wrong in a test? <strong>Explain this</strong> gives a short explanation of the one step that went wrong. Questions are sorted into topics like “Expressions and linear equations”, each with a progress ring.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. NOT THE SAME QUESTION WITH THE NUMBERS CHANGED */}
      <section className="tb-section" aria-labelledby="different">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead
              id="different"
              eyebrow="The part that matters"
              title="Not the same question with the numbers changed."
              lead={`A question with only the numbers swapped can be answered by copying the steps from the last one. ${name} keeps the same concepts and changes at least two other things: the context, the structure, the layout, the type of numbers, or how it’s shown. Here is the example from the rules its question writer follows.`}
            />
          </Reveal>
          <div className="sl-math">
            <div className="tb-stack">
              <MathCard label="The question they got wrong" tone="ink">
                <p>Solve for <TeX>x</TeX>:</p>
                <p className="sl-math__display"><TeX display>{"\\frac{x+2}{3} = \\frac{2x-1}{5}"}</TeX></p>
                <Solution>
                  <p>Multiply both sides by 15 (the lowest common denominator):</p>
                  <TeX display>{"5(x+2) = 3(2x-1)"}</TeX>
                  <TeX display>{"5x + 10 = 6x - 3 \\quad\\Rightarrow\\quad x = 13"}</TeX>
                  <p>Check: <TeX>{"\\tfrac{15}{3} = 5"}</TeX> and <TeX>{"\\tfrac{25}{5} = 5"}</TeX>.</p>
                </Solution>
              </MathCard>
              <MathCard label="Not this: only the numbers changed" tone="danger">
                <p>Solve for <TeX>x</TeX>: <TeX>{"\\frac{x+4}{3} = \\frac{2x-3}{5}"}</TeX></p>
              </MathCard>
            </div>
            <div className="tb-stack">
              <MathCard label="This: new context and layout, same concepts" tone="success">
                <p>
                  Mia’s phone plan costs a third of <TeX>{"(c + 6)"}</TeX> dollars a week. Leo’s costs a quarter of <TeX>{"(3c - 2)"}</TeX> dollars. For what value of <TeX>c</TeX> do they pay the same?
                </p>
                <Solution>
                  <TeX display>{"\\frac{c+6}{3} = \\frac{3c-2}{4}"}</TeX>
                  <p>Multiply both sides by 12:</p>
                  <TeX display>{"4(c+6) = 3(3c-2) \\quad\\Rightarrow\\quad 4c + 24 = 9c - 6 \\quad\\Rightarrow\\quad c = 6"}</TeX>
                  <p>Both pay $4 a week.</p>
                </Solution>
              </MathCard>
              <MathCard label="Or this: new structure, same concepts" tone="success">
                <p>
                  Sam solved <TeX>{"\\frac{x+1}{2} = \\frac{x-3}{4}"}</TeX> and got <TeX>{"x = 1"}</TeX>. Find his mistake and give the correct answer.
                </p>
                <Solution>
                  <p>Multiply both sides by 4:</p>
                  <TeX display>{"2(x+1) = x - 3 \\quad\\Rightarrow\\quad 2x + 2 = x - 3 \\quad\\Rightarrow\\quad x = -5"}</TeX>
                  <p>Sam’s <TeX>{"x = 1"}</TeX> comes from writing <TeX>{"x + 3"}</TeX> instead of <TeX>{"x - 3"}</TeX> on the right.</p>
                </Solution>
              </MathCard>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOR PARENTS */}
      <section className="tb-section tb-section--card" aria-labelledby="parents">
        <div className="tb-wrap sl-parents">
          <div>
            <Reveal>
              <SectionHead id="parents" eyebrow="For parents" title="See the progress without reading over their shoulder." />
            </Reveal>
            <ul className="sl-points">
              <Point icon="star" title="Week in review">
                The questions they added, fixed and mastered this week, their test scores and their trickiest topic.
              </Point>
              <Point icon="link" title="Link with a code">
                Your child gives you a 6-character code from their settings. They can remove the link at any time.
              </Point>
              <Point icon="privacy" title="Progress, not photos">
                You see topics and scores, not every photo of their work. The photos stay private to your child and any tutor they link (our AI service reads them to solve the question).
              </Point>
            </ul>
            <p style={{ marginTop: 20 }}>
              <Link href="/parents" className="tb-textlink">More for parents →</Link>
            </p>
          </div>
          <FlowSteps steps={PARENT_FLOW} label="What a parent sees" />
        </div>
      </section>

      {/* 4b. PRACTICE AND NOTES */}
      <section className="tb-section" aria-labelledby="practice">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead
              id="practice"
              eyebrow="Practice and study notes"
              title="Test any topic. Make study notes."
              lead="A short test on any topic in their year, even with nothing snapped yet. The ones they get wrong go into their bank."
            />
          </Reveal>
          <FlowSteps steps={PRACTICE_FLOW} label="Test any topic" />
          <div className="sl-notes">
            <div className="sl-notes__band">
              <Reveal>
                <Eyebrow>Study notes</Eyebrow>
                <h3 className="tb-h3" style={{ fontSize: 26, fontWeight: 900 }}>A one-page revision sheet on any topic.</h3>
                <p className="tb-lead" style={{ marginTop: 10 }}>On a whole topic, or on just the questions they find hard.</p>
              </Reveal>
            </div>
            <FlowSteps steps={NOTES_FLOW} label="Study notes" />
          </div>
        </div>
      </section>

      {/* 5. FEATURES */}
      <section className="tb-section tb-section--card" aria-labelledby="features">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="features" eyebrow="In the app" title="Everything they need to fix their mistakes." />
          </Reveal>
          <div className="tb-tiles tb-tiles--3">
            <OptionTile icon="bank" title="The bank" text="Every question they’ve snapped, by topic, with a progress ring for each." />
            <OptionTile icon="test" tone="violet" title="Test any topic" text="A short test on any topic in their year, even with nothing snapped." />
            <OptionTile icon="notes" tone="violet" title="Study notes" text="A one-page revision sheet, to download or share as a PDF." />
            <OptionTile icon="drill" tone="success" title="Fix my mistakes" text="The questions they got wrong, one after another." />
            <OptionTile icon="streak" tone="streak" title="Streaks and goals" text="A weekly streak and this week’s goals, with XP and stars." />
            <OptionTile icon="upload" title="Upload a whole test" text="Photos of each page, a PDF or a Word document. The wrong ones come pre-ticked." />
          </div>
        </div>
      </section>

      {/* 6. COMPARED WITH TUTORING */}
      <section className="tb-section" aria-labelledby="compare">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead
              id="compare"
              eyebrow="Compared with tutoring"
              title="A different job from a tutor, at a different price."
              lead={`We run a tutoring business too, so this isn’t a case against tutors. Some families will use ${name} alongside a tutor, some instead of one. Here’s the plain difference.`}
            />
          </Reveal>
          <Card className="sl-compare">
            <div className="sl-compare__head" aria-hidden="true">
              <span />
              <span>Private tutor</span>
              <span className="sl-compare__app">{name}</span>
            </div>
            <dl className="sl-compare__rows">
              <CompareRow label="Cost" tutor={<>About ${PRICING.secondaryHourlyLow} to ${PRICING.secondaryHourlyHigh} an hour for Years 7 to 10 in Melbourne (<Link href="/tutoring-prices-melbourne" className="tb-link">see our price guide</Link>).</>} app={live ? STUDY_APP.priceLine : "Free during the pilot. Pricing will be set after the pilot."} />
              <CompareRow label="When" tutor="Usually an hour a week, at a set time." app="Any day they snap a question or take a topic test." />
              <CompareRow label="What it works on" tutor="What the tutor plans, plus whatever your child brings to the session." app="Only the questions your child got wrong, until each one is mastered." />
              <CompareRow label="Explanations" tutor="A person who can explain it several ways and read how your child is going." app={<>A full worked solution for every question, and <strong>Explain this</strong> for the step that went wrong.</>} />
              <CompareRow label="Covers" tutor="Any year level and subject the tutor teaches." app="Years 7 to 10 maths only, on iPhone." />
            </dl>
          </Card>
          <div className="sl-two">
            <Card>
              <h3 className="tb-h3">Why practising your own mistakes</h3>
              <p className="tb-muted sl-card-text">
                {`Working a fresh version of a question you got wrong makes you pull the method out of memory rather than reread it. That’s called retrieval practice. Coming back to it on a different day, after a gap, is spaced practice. ${name} is built around both: a new similar question each time, and a weekly review of the week’s questions.`}
              </p>
            </Card>
            <Card>
              <h3 className="tb-h3">Already have a tutor?</h3>
              <p className="tb-muted sl-card-text">
                Tutors can link to your child’s account with a code, look through their bank of mistakes before a session, and set snap goals like “5 questions by Thursday”.
              </p>
              <p className="sl-card-text">
                Prefer a real tutor? <Link href="/find-a-tutor" className="tb-link">Bayside Academics can help</Link>.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 7. FREE RESOURCES */}
      <section className="tb-section tb-section--card" aria-labelledby="free">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="free" eyebrow="Free, no app needed" title="Free maths resources" lead="Practise now. Anything they get wrong is exactly what to snap later." />
          </Reveal>
          <div className="sl-resources">
            <Resource href="/worksheets" icon="notes" title="Free worksheets" body="Curriculum-matched maths worksheets for Years 3 to 10, with worked solutions." />
            <Resource href="/practice-maths-tests-secondary" icon="test" title="Practice tests" body="Secondary maths practice tests, plus a primary set." />
            <Resource href="/atar-planner" icon="flag" title="ATAR planner" body="Plan VCE subjects and see what scores a course needs." />
            <Resource href="/learn" icon="book" title="Learn" body="Guides for parents on Victorian maths, NAPLAN and study habits." />
          </div>
        </div>
      </section>

      {/* 8. FAQ (no app testimonials exist yet, so there's no testimonials section) */}
      <section className="tb-section" aria-labelledby="faq">
        <div className="tb-wrap tb-wrap--narrow">
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

      {/* 9. FINAL CTA */}
      <CtaBand
        id="final-cta"
        quinn
        title="Start with the next question they get wrong."
        lead={`${name} turns every missed maths question into practice that’s about your child, not a generic worksheet.`}
      >
        <StudyAppCTA variant="hero" placement="home_final" position="final" />
      </CtaBand>

      <MarketingFooter />
    </div>
  );
}

function MathCard({ label, tone, children }) {
  return (
    <div className="tb-card sl-mathcard" data-tone={tone}>
      <p className="sl-mathcard__label">{label}</p>
      <div className="sl-mathcard__body">{children}</div>
    </div>
  );
}

function Solution({ children }) {
  return (
    <details className="sl-solution">
      <summary>Show solution</summary>
      <div className="sl-solution__body">{children}</div>
    </details>
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

function CompareRow({ label, tutor, app }) {
  return (
    <div className="sl-compare__row">
      <dt>{label}</dt>
      <dd><span className="sl-compare__who">Private tutor</span>{tutor}</dd>
      <dd className="sl-compare__app"><span className="sl-compare__who">{STUDY_APP.name}</span>{app}</dd>
    </div>
  );
}

function Resource({ href, icon, title, body }) {
  return (
    <Link href={href} className="tb-card sl-resource">
      <span className="tb-tile__icon" aria-hidden="true"><Icon name={icon} /></span>
      <span className="sl-resource__title">{title} →</span>
      <span className="sl-resource__body">{body}</span>
    </Link>
  );
}

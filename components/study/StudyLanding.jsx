import Link from "next/link";
import katex from "katex";
import StudyAppCTA from "@/components/StudyAppCTA";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import FlowSteps from "@/components/brand/FlowSteps";
import {
  Card, CtaBand, Eyebrow, Icon, OptionTile, PhoneFrame, Reveal, SectionHead,
} from "@/components/brand";
import { STUDY_APP, STUDY_APP_FACTS } from "@/lib/study-app";
import { PRICING } from "@/lib/pricing";
import { getStudyFaqs } from "@/lib/study-faqs";
import MadeByEducators from "@/components/study/MadeByEducators";
import PriceTrial from "@/components/study/PriceTrial";
import ResultsProof, { LaunchPill } from "@/components/study/ResultsProof";
import TryQuestion from "@/components/study/TryQuestion";
import "./study-landing.css";

// Home page for tuterly.com.au: the landing page for the Tuterly app,
// in the app's own look (components/brand). Server component; the only
// client pieces are StudyAppCTA and the flow carousels.
//
// Copy rules (TUTERLY-STUDY-FUNNEL-PROMPT.md, TUTERLY-WEBSITE-REDESIGN-PROMPT.md):
// no invented numbers, ratings, results or testimonials; no claim that the
// app beats tutoring. Better marks is the goal we lead with ("help your
// child improve their maths marks"), never a promise: no "guaranteed", no
// "the best way", no figures, until there's evidence. Product facts come from
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
    src: `${S}/flow-snap/01-home.png`,
    alt: "The Tuterly home screen with the big Snap a question button",
    title: "Snap the question",
    text: "Take a photo of the question. The app reads it and saves it with a full worked solution, hidden behind Show solution so they can have another go first.",
  },
  {
    src: `${S}/flow-snap/03-question-solution-hidden.png`,
    alt: "A question the student got wrong, Solve the inequality 4 − 2x > 10, with a similar question to master underneath",
    title: "Try a fresh version",
    text: "Tuterly writes similar questions based on the same concepts. Questions are reworded and numbers are changed, so that students learn from their previous errors.",
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
    text: "Getting a similar one right earns a star. Three stars and the concept is mastered. Students can also move on to more challenging ones.",
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
    title: "Pick any topic",
    text: "Any topic in their year, any time.",
  },
  {
    src: `${S}/flow-practice/03-test-question.png`,
    alt: "Question 1 of 8, a Pythagoras ladder problem, with an answer typed using the maths keys",
    title: "Take the test",
    text: "One question from each part of the topic, with maths keys for the answers.",
  },
  {
    src: `${S}/flow-practice/04-test-score.png`,
    alt: "The test score: 6 out of 8",
    title: "See the score",
    text: "The ones they got wrong go straight into their bank to fix.",
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
    alt: "A revision sheet with a summary and the key ideas",
    title: "Get a revision sheet",
    text: "A revision sheet, to download or share as a PDF.",
  },
];

export default function StudyLanding() {
  const faqs = getStudyFaqs();
  const name = STUDY_APP.name;

  return (
    <div className="tb sl">
      <MarketingNav />

      {/* 1. HERO */}
      <section className="sl-hero" aria-labelledby="hero-title">
        <div className="tb-wrap sl-hero__grid">
          <div className="sl-hero__copy">
            <LaunchPill />
            <Eyebrow>{name} · Years 7 to 10 maths · iPhone and Android</Eyebrow>
            <h1 id="hero-title" className="tb-h1">
              Boost your child’s <span className="sl-accent">maths marks</span>.
            </h1>
            <p className="tb-lead sl-hero__lead">
              {`The self-learning maths app built based on your child’s level and understanding. Snap a question not fully understood, or upload a whole school test. ${name} saves each one with a full worked solution, then writes fresh questions on the same idea to practise until they’re mastered.`}
            </p>
            <a href="#try-it" className="tb-btn tb-btn--secondary sl-hero__try"><Icon name="snap" size={20} /> Try it free on a question</a>
            <ResultsProof />
            <ul className="sl-hero__trust" aria-label="About the app">
              <li><Icon name="educator" size={18} /> Designed by Australian educators</li>
              <li><Icon name="school" size={18} /> {STUDY_APP_FACTS.curriculum}</li>
            </ul>
            <div id="get-app" className="sl-hero__cta">
              <StudyAppCTA variant="hero" placement="home_hero" slim />
            </div>
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

      {/* 1b. TRY IT */}
      <section className="tb-section" aria-labelledby="try-title" id="try-it" style={{ scrollMarginTop: 66 }}>
        <div className="tb-wrap">
          <SectionHead
            id="try-title"
            eyebrow="Try it now"
            title="Got a question wrong? Snap it and see."
            lead={`Upload one maths question your child got wrong. ${name} shows the worked solution, then writes a fresh question on the same idea to try. Free with your email, 2 questions a day.`}
            align="center"
          />
          <TryQuestion />
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="tb-section tb-section--card" aria-labelledby="how" id="how-section">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead
              id="how"
              eyebrow="How it works"
              title="From a wrong answer to a mastered one, in four steps."
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

      {/* 2b. MADE BY AUSTRALIAN EDUCATORS */}
      <MadeByEducators />

      {/* 3. THEIR OWN SCHOOL TESTS */}
      <section className="tb-section tb-section--card" aria-labelledby="school">
        <div className="tb-wrap sl-parents">
          <div>
            <Reveal>
              <SectionHead
                id="school"
                eyebrow="Straight from school"
                title="Upload a real test. Win back the marks they lost."
                lead={`Take a photo of each page of a school test or practice paper, or upload the PDF or Word document. ${name} finds every question, automatically stores the ones marked wrong, and writes a fresh question on each one. So their practice is about exactly what they’re doing at school.`}
              />
            </Reveal>
            <ul className="sl-points">
              <Point icon="upload" title="Photos, a PDF or a Word document">
                A whole test at once. A photo with several questions is split into a checklist.
              </Point>
              <Point icon="test" title="The wrong ones are automatically included">
                For a marked test, the questions marked wrong get automatically stored in the app.
              </Point>
              <Point icon="snap" title="New questions on the same ideas">
                Each one gets a worked solution and a similar question to master, then a harder one.
              </Point>
            </ul>
          </div>
          <div className="sl-school__phone">
            <PhoneFrame
              src={`${S}/flow-snap/02-snap-menu.png`}
              alt="The Snap a question sheet: take a photo, choose from photos, or upload a whole test as photos, a PDF or a Word document"
              width={270}
              sizes="(max-width: 899px) 62vw, 270px"
            />
          </div>
        </div>
      </section>

      {/* 4. PRACTICE TESTS ON ANY TOPIC + NOTES */}
      <section className="tb-section" aria-labelledby="practice">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead
              id="practice"
              eyebrow="Practice tests on any topic"
              title="A practice test on any topic, whenever they want."
              lead="Test any topic writes a short practice test on any topic in their year, one question from each part of the topic, even if they haven’t snapped anything yet. Every question they get wrong goes straight into their bank to fix."
            />
          </Reveal>
          <FlowSteps steps={PRACTICE_FLOW} label="Test any topic" />
          <div className="sl-notes">
            <div className="sl-notes__band">
              <Reveal>
                <Eyebrow>Study notes</Eyebrow>
                <h3 className="tb-h3" style={{ fontSize: 26, fontWeight: 900 }}>A revision sheet on any topic.</h3>
                <p className="tb-lead" style={{ marginTop: 10 }}>On a whole topic, or on just the questions they find hard.</p>
              </Reveal>
            </div>
            <FlowSteps steps={NOTES_FLOW} label="Study notes" />
          </div>
        </div>
      </section>

      {/* 3. NOT THE SAME QUESTION WITH THE NUMBERS CHANGED */}
      <section className="tb-section" aria-labelledby="different">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead
              id="different"
              eyebrow="The part that matters"
              title="Different questions every time."
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
                <p>Solve for <TeX>x</TeX>:</p>
                <p className="sl-math__display"><TeX display>{"\\frac{x+4}{3} = \\frac{2x-3}{5}"}</TeX></p>
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
                  <TeX display>{"4(c+6) = 3(3c-2)"}</TeX>
                  <TeX display>{"4c + 24 = 9c - 6 \\quad\\Rightarrow\\quad c = 6"}</TeX>
                  <p>Both pay $4 a week.</p>
                </Solution>
              </MathCard>
              <MathCard label="Or this: new structure, same concepts" tone="success">
                <p>
                  Sam solved this equation and got <TeX>{"x = 1"}</TeX>.
                </p>
                <p className="sl-math__display"><TeX display>{"\\frac{x+1}{2} = \\frac{x-3}{4}"}</TeX></p>
                <p>Find his mistake and give the correct answer.</p>
                <Solution>
                  <p>Multiply both sides by 4:</p>
                  <TeX display>{"2(x+1) = x - 3"}</TeX>
                  <TeX display>{"2x + 2 = x - 3 \\quad\\Rightarrow\\quad x = -5"}</TeX>
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
              <Point icon="upload" title="Upload what comes home">
                Upload their marked tests, practice papers and the term planner from your own phone. {name} turns them into practice.
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

      {/* 5. FEATURES */}
      <section className="tb-section tb-section--card" aria-labelledby="features">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="features" eyebrow="In the app" title="Everything they need to turn mistakes into marks." />
          </Reveal>
          <div className="tb-tiles tb-tiles--3">
            <OptionTile icon="bank" title="The bank" text="Every question they’ve snapped, by topic, with a progress ring for each." />
            <OptionTile icon="test" tone="violet" title="Test any topic" text="A short test on any topic in their year, even with nothing snapped." />
            <OptionTile icon="notes" tone="violet" title="Study notes" text="A revision sheet, to download or share as a PDF." />
            <OptionTile icon="drill" tone="success" title="Fix my mistakes" text="The questions they got wrong, one after another." />
            <OptionTile icon="streak" tone="streak" title="Streaks and goals" text="A weekly streak and this week’s goals, with XP and stars." />
            <OptionTile icon="upload" title="Upload a whole test" text="Photos of each page, a PDF or a Word document. The wrong ones are stored automatically." />
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
              <CompareRow label="Cost" tutor={`Usually $${PRICING.tutorCompareLow} to $${PRICING.tutorCompareHigh} an hour in Melbourne.`} app={`A 1-week free trial, then $7.99 a week if you sign up before launch (usually $15.99). ${STUDY_APP.priceVsTutor}`} />
              <CompareRow label="When" tutor="Usually an hour a week, at a set time." app="Any day they snap a question or take a topic test." />
              <CompareRow label="What it works on" tutor="What the tutor plans, plus whatever your child brings to the session." app="The difficult questions, and the ones your child hasn’t fully understood, until each one is fully mastered." />
              <CompareRow label="Explanations" tutor="A person who can explain it several ways and read how your child is going." app={<>A full worked solution for every question, and <strong>Explain this</strong> for the step that went wrong.</>} />
              <CompareRow label="Covers" tutor="Any year level and subject the tutor teaches." app="Years 7 to 10 maths only, on iPhone and Android." />
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
            </Card>
          </div>
        </div>
      </section>

      {/* 6b. PRICE AND FREE TRIAL */}
      <section className="tb-section" aria-labelledby="price" style={{ paddingTop: 0 }}>
        <div className="tb-wrap">
          <PriceTrial id="price">
            <div style={{ width: "100%", maxWidth: 460 }}>
              <StudyAppCTA variant="hero" placement="home_price" position="inline" slim />
            </div>
          </PriceTrial>
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
        title="Better maths marks start with the next wrong answer."
        lead={`${name} turns every missed maths question into practice tailored towards the student, not just a generic worksheet.`}
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


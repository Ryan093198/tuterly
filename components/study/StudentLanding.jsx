import Link from "next/link";
import StudyAppCTA from "@/components/StudyAppCTA";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import FlowSteps from "@/components/brand/FlowSteps";
import { CtaBand, Eyebrow, OptionTile, PhoneFrame, Reveal, SectionHead } from "@/components/brand";
import ShareWithParent from "@/components/study/ShareWithParent";
import { LaunchPill } from "@/components/study/ResultsProof";
import { STUDY_APP, STUDY_APP_FACTS } from "@/lib/study-app";
import { STUDENT_YEARS, studentFaqs, topicsForYear } from "@/lib/student-pages";
import "./study-landing.css";
import "./student-landing.css";

// Landing page written to Years 7 to 10 students themselves ("you").
// /students (year = null) and /students/year-7 to year-10. Product facts
// from TUTERLY-STUDY-FEATURES.md; no marks promises.
const S = "/app-screens";

const STEPS = [
  {
    src: `${S}/flow-snap/01-home.png`,
    alt: "The Tuterly home screen with the big Snap a question button",
    title: "Snap what you got wrong",
    text: "A question from homework, a quiz or a test. Or upload the whole test: the ones marked wrong are saved automatically.",
  },
  {
    src: `${S}/flow-snap/03-question-solution-hidden.png`,
    alt: "A question the student got wrong, with a similar question to master underneath",
    title: "Try a fresh version",
    text: "A similar question on the same idea, reworded with different numbers, so you learn from the mistake instead of copying the steps.",
  },
  {
    src: `${S}/flow-snap/04-solution-shown.png`,
    alt: "The worked solution open: the key idea, three steps and the answer",
    title: "Stuck? See every step",
    text: "The worked solution stays hidden until you want it. Explain this shows the exact step that went wrong.",
  },
  {
    src: `${S}/flow-snap/05-similar-question-correct.png`,
    alt: "The similar question marked right, with a star and +5 XP",
    title: "Master it",
    text: "Each one you get right earns a star. Three stars and it’s mastered. Then try a harder one.",
  },
];

export default function StudentLanding({ year = null }) {
  const name = STUDY_APP.name;
  const faqs = studentFaqs(name);
  const topics = year ? topicsForYear(year.year) : [];
  const placement = year ? `students_${year.slug.replace("-", "_")}` : "students";

  return (
    <div className="tb sl stl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        }}
      />
      <MarketingNav />

      {/* HERO */}
      <section className="sl-hero" aria-labelledby="stl-title">
        <div className="tb-wrap sl-hero__grid">
          <div className="sl-hero__copy">
            <LaunchPill />
            <Eyebrow>For students · {year ? `${year.year} maths` : "Years 7 to 10 maths"}</Eyebrow>
            <h1 id="stl-title" className="tb-h1">
              {year ? (
                year.h1
              ) : (
                <>Better maths marks, starting with the ones you <span className="sl-accent">lost</span>.</>
              )}
            </h1>
            <p className="tb-lead sl-hero__lead">
              {year
                ? year.intro
                : `Got a test back with marks you could have had? Snap the questions you got wrong, or upload the whole test. ${name} shows you the full worked solution, then gives you fresh questions on the same idea until you’ve mastered it.`}
            </p>
            <div id="get-app" className="sl-hero__cta">
              <StudyAppCTA variant="hero" placement={`${placement}_hero`} audience="student" slim />
            </div>
            <ShareWithParent />
          </div>
          <div className="sl-hero__visual">
            <div className="sl-hero__blob" aria-hidden="true" />
            <PhoneFrame
              src={`${S}/flow-snap/05-similar-question-correct.png`}
              alt="Tuterly showing Too easy! after a similar question is marked right, with a star and +5 XP"
              width={300}
              priority
              sizes="(max-width: 899px) 62vw, 300px"
              className="sl-hero__phone"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="tb-section tb-section--card" aria-labelledby="stl-how">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead
              id="stl-how"
              eyebrow="How it works"
              title="Every wrong answer is a mark you can win back."
              lead="Re-reading your notes feels like studying. Getting a fresh version of the question right is what actually sticks."
            />
          </Reveal>
          <FlowSteps steps={STEPS} label="How it works" />
        </div>
      </section>

      {/* BEFORE A TEST */}
      <section className="tb-section" aria-labelledby="stl-test">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="stl-test" eyebrow="Test coming up?" title="Walk in knowing you’ve done the work." />
          </Reveal>
          <div className="tb-tiles tb-tiles--3">
            <OptionTile icon="test" tone="violet" title="Test any topic" text="A short test on any topic in your year, one question from each part of it." />
            <OptionTile icon="drill" tone="success" title="Fix my mistakes" text="Every question you got wrong on a topic, one after another." />
            <OptionTile icon="notes" tone="violet" title="Study notes" text="A revision sheet on a whole topic, or just the bits you find hard." />
            <OptionTile icon="goal" title="Test countdown" text="Tell it when your test is and it shows what to do next on your To do list." />
            <OptionTile icon="upload" title="Upload a whole test" text="Photos, a PDF or a Word document. The wrong ones are saved automatically." />
            <OptionTile icon="explain" tone="streak" title="Explain this" text="Got it wrong? A short explanation of the one step that went wrong." />
          </div>
        </div>
      </section>

      {/* HABIT */}
      <section className="tb-section tb-section--card" aria-labelledby="stl-habit">
        <div className="tb-wrap sl-parents">
          <div>
            <Reveal>
              <SectionHead
                id="stl-habit"
                eyebrow="Keep it going"
                title="A few minutes a day, and it adds up."
                lead="XP and stars for every question, a weekly streak, this week’s goals with bonus XP, and new accessories for Quinn the quokka as you level up."
              />
            </Reveal>
            <ul className="stl-points">
              <li><strong>Weekly streak:</strong> add 3 questions, or finish a drill or test, and the week counts.</li>
              <li><strong>Your bank:</strong> every question, by topic, with a ring that fills as you master them.</li>
              <li><strong>Your call:</strong> parents only see a weekly summary and scores, never your photos.</li>
            </ul>
          </div>
          <div className="sl-school__phone">
            <PhoneFrame
              src={`${S}/home.png`}
              alt="The Tuterly home screen: Snap a question, Fix my mistakes and this week’s goals with XP"
              width={270}
              sizes="(max-width: 899px) 62vw, 270px"
            />
          </div>
        </div>
      </section>

      {/* TOPICS FOR THE YEAR, or YEAR PICKER */}
      <section className="tb-section" aria-labelledby="stl-years">
        <div className="tb-wrap">
          {year ? (
            <>
              <Reveal>
                <SectionHead
                  id="stl-years"
                  eyebrow={`${year.year} topics`}
                  title={`What ${year.year} maths covers.`}
                  lead={`Topics follow the ${STUDY_APP_FACTS.curriculum}. Tap one to see what’s in it and where students usually slip.`}
                />
              </Reveal>
              <ul className="stl-topics">
                {topics.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/worksheets/${t.slug}`} className="tb-card stl-topic">{t.topic} →</Link>
                  </li>
                ))}
              </ul>
              <p className="stl-other">
                Other years:{" "}
                {STUDENT_YEARS.filter((y) => y.slug !== year.slug).map((y, i, a) => (
                  <span key={y.slug}>
                    <Link href={`/students/${y.slug}`} className="tb-link">{y.year}</Link>
                    {i < a.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </>
          ) : (
            <>
              <Reveal>
                <SectionHead id="stl-years" eyebrow="Pick your year" title="Maths help for your year level." />
              </Reveal>
              <ul className="stl-topics stl-topics--years">
                {STUDENT_YEARS.map((y) => (
                  <li key={y.slug}>
                    <Link href={`/students/${y.slug}`} className="tb-card stl-topic">{y.year} maths →</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="tb-section tb-section--card" aria-labelledby="stl-faq">
        <div className="tb-wrap tb-wrap--narrow">
          <Reveal>
            <SectionHead id="stl-faq" eyebrow="Questions" title="Questions students ask." />
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
        id={`${placement}-final-title`}
        title="Your next test starts with the last one."
        lead={`Sign up early and ${name} is 50% off for life.`}
      >
        <StudyAppCTA variant="hero" placement={`${placement}_final`} position="final" audience="student" />
        <ShareWithParent />
      </CtaBand>

      <MarketingFooter />
    </div>
  );
}

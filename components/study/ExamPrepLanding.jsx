import Link from "next/link";
import StudyAppCTA from "@/components/StudyAppCTA";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import FlowSteps from "@/components/brand/FlowSteps";
import { Card, CtaBand, Eyebrow, PhoneFrame, Reveal, SectionHead } from "@/components/brand";
import { STUDY_APP, STUDY_APP_FACTS } from "@/lib/study-app";
import { EXAM_PLAN, EXAM_YEARS, examFaqs, examTopics } from "@/lib/exam-prep-pages";
import TryCta from "@/components/study/TryCta";
import "./study-landing.css";
import "./student-landing.css";

// Maths exam preparation: the hub (year = null) and a page for each of
// Years 7 to 10. Written to parents. Content in lib/exam-prep-pages.js.
export default function ExamPrepLanding({ year = null }) {
  const name = STUDY_APP.name;
  const faqs = examFaqs(name, year);
  const topics = year ? examTopics(year.year) : [];
  const placement = year ? `exam_prep_${year.slug.replace("-", "_")}` : "exam_prep";

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
      <section className="sl-hero" aria-labelledby="ep-title">
        <div className="tb-wrap sl-hero__grid">
          <div className="sl-hero__copy">
            <Eyebrow>Maths exam preparation · {year ? year.year : "Years 7 to 10"}</Eyebrow>
            <h1 id="ep-title" className="tb-h1">
              {year ? (
                <>{year.year} maths exam <span className="sl-accent">preparation</span>.</>
              ) : (
                <>Maths exam preparation that starts with their <span className="sl-accent">mistakes</span>.</>
              )}
            </h1>
            <p className="tb-lead sl-hero__lead">
              {year
                ? year.intro
                : `${name} is a maths exam preparation app for Years 7 to 10. Your child takes practice tests on every topic in the exam, then practises fresh versions of the questions they got wrong until each one is mastered.`}
            </p>
            <p className="sl-hero__pitch">
              {year
                ? `${name} writes a new practice test on any ${year.year} topic, with a worked solution for every question.`
                : `Following the ${STUDY_APP_FACTS.curriculum}, with a worked solution for every question.`}
            </p>
            <div id="get-app" className="sl-hero__cta">
              <StudyAppCTA variant="hero" placement={`${placement}_hero`} slim />
            </div>
          </div>
          <div className="sl-hero__visual">
            <div className="sl-hero__blob" aria-hidden="true" />
            <PhoneFrame
              src="/app-screens/flow-practice/03-test-question.png"
              alt="A Tuterly practice test: question 1 of 8, a Pythagoras ladder problem, with an answer typed in"
              width={290}
              priority
              sizes="(max-width: 899px) 60vw, 290px"
              className="sl-hero__phone"
            />
          </div>
        </div>
      </section>

      <section className="sl-try-band" aria-label="Try it free">
        <div className="tb-wrap">
          <TryCta />
        </div>
      </section>

      {/* WHAT'S IN THE EXAM (year pages) */}
      {year && (
        <section className="tb-section tb-section--card" aria-labelledby="ep-topics">
          <div className="tb-wrap">
            <Reveal>
              <SectionHead
                id="ep-topics"
                eyebrow={`${year.year} topics`}
                title={`What a ${year.year} maths exam can cover.`}
                lead={`Each school’s exam covers what the class has done that semester, so check the course outline. These are the ${year.year} topics in the ${STUDY_APP_FACTS.curriculum}, each with a free worksheet.`}
              />
            </Reveal>
            <ul className="stl-topics">
              {topics.map((t) => (
                <li key={t.slug}>
                  <Link href={`/worksheets/${t.slug}`} className="tb-card stl-topic">{t.topic} →</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* WHERE MARKS GO (year pages) */}
      {year && (
        <section className="tb-section" aria-labelledby="ep-slips">
          <div className="tb-wrap">
            <Reveal>
              <SectionHead id="ep-slips" eyebrow="Where marks go" title={`Where ${year.year} students usually lose marks.`} />
            </Reveal>
            <div className="ep-slips">
              {year.slips.map((s) => (
                <Card key={s.title}>
                  <h3 className="tb-h3">{s.title}</h3>
                  <p className="tb-muted ep-slip__text">{s.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* THE PLAN */}
      <section className="tb-section tb-section--card" aria-labelledby="ep-plan">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead
              id="ep-plan"
              eyebrow="A three-week plan"
              title="How to prepare for a maths exam, week by week."
              lead="Short, spaced practice beats one long night before. Here’s the plan, with the part of the app for each step."
            />
          </Reveal>
          <FlowSteps steps={EXAM_PLAN} label="Exam preparation plan" />
        </div>
      </section>

      {/* WHY TESTS, NOT RE-READING (hub) */}
      {!year && (
        <section className="tb-section" aria-labelledby="ep-why">
          <div className="tb-wrap">
            <Reveal>
              <SectionHead
                id="ep-why"
                eyebrow="What tutoring has taught us"
                title="Practice tests, then drill what they got wrong."
                lead={`Years of tutoring at Bayside Academics have taught us that the most reliable way to lift test marks is to sit practice tests, find the questions a student can’t fully do yet, and drill exactly those. Re-reading notes feels productive, but the marks are in the questions they skip. ${name} is built to give students that extra practice, and the confidence that comes with it, before every test and exam.`}
              />
            </Reveal>
            <div className="ep-slips">
              <Card>
                <h3 className="tb-h3">It finds the gaps</h3>
                <p className="tb-muted ep-slip__text">A short test on each topic shows exactly which questions your child can’t do yet, so revision time goes where the marks are.</p>
              </Card>
              <Card>
                <h3 className="tb-h3">It’s new every time</h3>
                <p className="tb-muted ep-slip__text">A past paper only works once. {name} writes a new test each time, so a second attempt is a real retest, not a memory test.</p>
              </Card>
              <Card>
                <h3 className="tb-h3">Mistakes become practice</h3>
                <p className="tb-muted ep-slip__text">Wrong answers go into their bank with a worked solution, then fresh questions on the same idea until each one is mastered.</p>
              </Card>
              <Card>
                <h3 className="tb-h3">It matches their class</h3>
                <p className="tb-muted ep-slip__text">Every topic follows the {STUDY_APP_FACTS.curriculum}. Your child can also upload their own school tests and practice papers.</p>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* YEARS */}
      <section className="tb-section" aria-labelledby="ep-years">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="ep-years" eyebrow="By year level" title={year ? "Exam preparation for other years." : "Maths exam preparation by year."} />
          </Reveal>
          <ul className="stl-topics stl-topics--years">
            {EXAM_YEARS.filter((y) => !year || y.slug !== year.slug).map((y) => (
              <li key={y.slug}>
                <Link href={`/maths-exam-preparation/${y.slug}`} className="tb-card stl-topic">{y.year} maths exam preparation →</Link>
              </li>
            ))}
          </ul>
          <p className="stl-other">
            Also useful: the <Link href="/practice-maths-tests-secondary" className="tb-link">maths practice test generator</Link>, the <Link href="/worksheets" className="tb-link">free maths worksheet generator</Link>, and our <Link href="/learn/best-maths-apps-years-7-10-australia" className="tb-link">comparison of maths apps for Years 7 to 10</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="tb-section tb-section--card" aria-labelledby="ep-faq">
        <div className="tb-wrap tb-wrap--narrow">
          <Reveal>
            <SectionHead id="ep-faq" eyebrow="Questions" title="Maths exam preparation, answered." />
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
        title="Better maths marks start with the next wrong answer."
        lead={`${name} turns every missed maths question into practice tailored towards the student, not just a generic worksheet.`}
      >
        <StudyAppCTA variant="hero" placement={`${placement}_final`} position="final" />
      </CtaBand>

      <MarketingFooter />
    </div>
  );
}

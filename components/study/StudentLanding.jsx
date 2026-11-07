import DemoVideo from "@/components/study/DemoVideo";
import Link from "next/link";
import StudyAppCTA from "@/components/StudyAppCTA";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import FlowSteps from "@/components/brand/FlowSteps";
import { CtaBand, Eyebrow, OptionTile, PhoneFrame, Reveal, SectionHead } from "@/components/brand";
import ShareWithParent from "@/components/study/ShareWithParent";
import { MadeInAustralia } from "@/components/study/MadeByEducators";
import ResultsProof, { LaunchPill } from "@/components/study/ResultsProof";
import TryCta from "@/components/study/TryCta";
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

// Exam Zone: practice exams written from the student's own test materials.
// Facts from the features doc (7 Nov 2026). Headline wording is Ryan's call
// (7 Nov 2026); the FAQ says plainly it can't promise the exact questions.
const EXAM_STEPS = [
  { n: "1", title: "Add what you’ve got", text: "Your test outline, past papers and your teacher’s notes. Photos, a PDF or a Word file. Nothing yet? Pick up to 6 topics." },
  { n: "2", title: "Tuterly analyses your test", text: "It works out what’s on your test and how your school writes its questions, and the match meter shows how close it can get." },
  { n: "3", title: "Sit your exam before the exam", text: "Tuterly creates a brand new practice exam in your school’s style. Marked by topic, with a worked solution for every question." },
];

const EXAM_FEATURES = [
  { icon: "school", tone: "violet", title: "Written in your school’s style", text: "New questions on your topics, set out the way your school sets out its tests. It never copies your school’s questions." },
  { icon: "goal", title: "Match meter", text: "From “Based on your topics” to “Great match”. It tells you what to add next to get closer." },
  { icon: "flag", tone: "streak", title: "Exam day set-up", text: "Name the exam, set the date for a countdown and choose the length. The timer is optional." },
  { icon: "checked", tone: "success", title: "Marks by topic", text: "See exactly which topics cost you marks, with a worked solution for every question." },
  { icon: "drill", tone: "success", title: "Fix what you missed", text: "Every question you got wrong in one place. Redo it, or try a similar one." },
  { icon: "practice", tone: "violet", title: "Same exam, new numbers", text: "Re-sit it with new figures and slightly different wording, so you learn the method, not the answer." },
  { icon: "notes", title: "Print it, sit it on paper", text: "An A4 PDF that feels like the real thing. Photograph your written answers and it marks them." },
  { icon: "upload", title: "Upload your test when it’s back", text: "It finds every question, picks out the ones that look wrong, and you choose which to practise." },
  { icon: "book", tone: "streak", title: "Term plan", text: "Upload your class’s term plan for this week’s topic and a countdown to every test." },
];

const MORE_FEATURES = [
  { icon: "snap", title: "Snap a question", text: "Any wrong question from homework or a test, solved step by step and filed under the right topic." },
  { icon: "practice", tone: "violet", title: "Similar and harder questions", text: "A new question on the same idea, then a harder one, so you can’t just remember the answer." },
  { icon: "explain", tone: "streak", title: "Hints, then solutions", text: "Try first, get a nudge, then see the full method. After a wrong answer, it explains the step that went wrong." },
  { icon: "star", tone: "xp", title: "Mastery you can see", text: "Every question moves from To fix to Learning to Mastered, with stars along the way." },
  { icon: "drill", tone: "success", title: "Drills", text: "Run through your mistakes, one topic or several together." },
  { icon: "book", tone: "violet", title: "Spaced review", text: "Questions you got right come back after 3 days, a week and three weeks, so you don’t forget them." },
  { icon: "test", tone: "violet", title: "Test any topic", text: "A short test on any topic, one question from each part of it. No snapping needed." },
  { icon: "checked", tone: "success", title: "Topic tests and weekly review", text: "Prove you’ve mastered a topic, and a quick check on this week’s questions." },
  { icon: "notes", title: "Study notes", text: "A one-page revision sheet on a topic, or only the bits you find hard. Save it or share it as a PDF." },
  { icon: "bank", title: "Mind maps", text: "40 one-page maps across Years 7 to 10, with rules, examples and diagrams. Free." },
  { icon: "goal", title: "Quick questions widget", text: "Practice on your home screen. Answer without opening the app." },
  { icon: "streak", tone: "streak", title: "Goals, streaks and Quinn", text: "Weekly goals, XP and stars. Master a topic to unlock a new accessory for Quinn the quokka." },
];

function ExamCard() {
  return (
    <div className="ezc" aria-label="Example: an Exam Zone practice exam built from a test outline and a past paper">
      <p className="ezc__k">Exam Zone</p>
      <p className="ezc__t">Year 9 maths test: Linear relationships</p>
      <ul className="ezc__files">
        <li><span aria-hidden="true">✓</span> Test outline</li>
        <li><span aria-hidden="true">✓</span> Past paper</li>
        <li><span aria-hidden="true">✓</span> Teacher’s notes</li>
      </ul>
      <p className="ezc__m">Match meter <strong>Great match</strong></p>
      <div className="ezc__bar" aria-hidden="true"><span /></div>
      <div className="ezc__ready">
        <span className="ezc__badge">Practice exam ready</span>
        <span>20 questions · your test is in 6 days</span>
      </div>
    </div>
  );
}

function ExamZoneSection({ placement }) {
  return (
    <section id="exam-zone" className="tb-section tb-section--card" aria-labelledby="stl-exam">
      <div className="tb-wrap">
        <Reveal>
          <SectionHead
            id="stl-exam"
            eyebrow="Exam Zone"
            title="How Tuterly predicts your maths exam."
            lead="Your teacher has already told you most of what’s coming: it’s in the outline, the past papers and the notes. Tuterly analyses all of it and creates practice exams you can sit first."
          />
        </Reveal>
        <ol className="ezs">
          {EXAM_STEPS.map((st) => (
            <li key={st.n} className="ezs__step">
              <span className="ezs__n" aria-hidden="true">{st.n}</span>
              <p className="ezs__t">{st.title}</p>
              <p className="ezs__x">{st.text}</p>
            </li>
          ))}
        </ol>
        <div className="tb-tiles tb-tiles--3 ezs__tiles">
          {EXAM_FEATURES.map((t) => (
            <OptionTile key={t.title} icon={t.icon} tone={t.tone} title={t.title} text={t.text} />
          ))}
        </div>
        <p className="ezs__note">
          Is it cheating? No. It’s the practice exam your teacher never gave you. You still have to do the maths, and the answers stay hidden until you’ve had a go.
        </p>
      </div>
    </section>
  );
}

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
                <>Predict the questions on your <span className="sl-accent">maths exam</span>.</>
              )}
            </h1>
            <p className="tb-lead sl-hero__lead">
              {year
                ? year.intro
                : `Upload your test outline, past papers and your teacher’s notes. ${name} works out what’s on your test and how your school writes it, then writes you practice exams in the same style, before the real one.`}
            </p>
            <ResultsProof compact className="sl-hero__proof" />
            <MadeInAustralia />
            <div id="get-app" className="sl-hero__cta">
              <StudyAppCTA variant="hero" placement={`${placement}_hero`} audience="student" slim />
            </div>
            <ShareWithParent />
          </div>
          <div className="sl-hero__visual">
            <div className="sl-hero__blob" aria-hidden="true" />
            {year ? <DemoVideo width={330} placement="students_hero" priority /> : <ExamCard />}
          </div>
        </div>
      </section>

      <section className="sl-try-band" aria-label="Try it free">
        <div className="tb-wrap">
          <TryCta />
        </div>
      </section>

      <ExamZoneSection placement={placement} />

      {/* HOW IT WORKS */}
      <section className="tb-section" aria-labelledby="stl-how">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead
              id="stl-how"
              eyebrow="Everything else in the app"
              title="Every wrong answer is a mark you can win back."
              lead="Re-reading your notes feels like studying. Getting a fresh version of the question right is what actually sticks."
            />
          </Reveal>
          <FlowSteps steps={STEPS} label="How it works" />
        </div>
      </section>

      {/* ALL FEATURES */}
      <section className="tb-section tb-section--card" aria-labelledby="stl-test">
        <div className="tb-wrap">
          <Reveal>
            <SectionHead id="stl-test" eyebrow="All the features" title="Everything you need between now and the test." />
          </Reveal>
          <div className="tb-tiles tb-tiles--3">
            {MORE_FEATURES.map((t) => (
              <OptionTile key={t.title} icon={t.icon} tone={t.tone} title={t.title} text={t.text} />
            ))}
          </div>
        </div>
      </section>

      {/* HABIT */}
      <section className="tb-section" aria-labelledby="stl-habit">
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
                Exam coming up? Here’s the{" "}
                <Link href={`/maths-exam-preparation/${year.slug}`} className="tb-link">{year.year} maths exam preparation plan</Link>.
              </p>
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
        title={year ? "Your next test starts with the last one." : "Sit your exam before your exam."}
        lead={`${name} is ${STUDY_APP.offerShort}.`}
      >
        <StudyAppCTA variant="hero" placement={`${placement}_final`} position="final" audience="student" />
        <ShareWithParent />
      </CtaBand>

      <MarketingFooter />
    </div>
  );
}

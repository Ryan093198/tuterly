import { Card, Reveal, SectionHead } from "@/components/brand";
import { STUDY_APP } from "@/lib/study-app";
import { PRICING } from "@/lib/pricing";
import "./study-landing.css";

// "Compared with tutoring": the plain side-by-side, plus why practising
// your own mistakes works and how it fits with a tutor. Moved from the
// home page to /parents (29 Oct 2026).
export default function TutorCompare({ id = "compare", className = "" }) {
  const name = STUDY_APP.name;
  return (
    <section className={`tb-section ${className}`} aria-labelledby={id}>
      <div className="tb-wrap">
        <Reveal>
          <SectionHead
            id={id}
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
            <Row label="Cost" tutor={`Usually $${PRICING.tutorCompareLow} to $${PRICING.tutorCompareHigh} an hour in Melbourne.`} app={`A 1-week free trial, then $7.99 a week if you sign up before launch (usually $15.99). ${STUDY_APP.priceVsTutor}`} />
            <Row label="When" tutor="Usually an hour a week, at a set time." app="Any day they snap a question or take a topic test." />
            <Row label="What it works on" tutor="What the tutor plans, plus whatever your child brings to the session." app="The difficult questions, and the ones your child hasn’t fully understood, until each one is fully mastered." />
            <Row label="Explanations" tutor="A person who can explain it several ways and read how your child is going." app={<>A full worked solution for every question, and <strong>Explain this</strong> for the step that went wrong.</>} />
            <Row label="Covers" tutor="Any year level and subject the tutor teaches." app="Years 7 to 10 maths only, on iPhone and Android." />
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
  );
}

function Row({ label, tutor, app }) {
  return (
    <div className="sl-compare__row">
      <dt>{label}</dt>
      <dd><span className="sl-compare__who">Private tutor</span>{tutor}</dd>
      <dd className="sl-compare__app"><span className="sl-compare__who">{STUDY_APP.name}</span>{app}</dd>
    </div>
  );
}

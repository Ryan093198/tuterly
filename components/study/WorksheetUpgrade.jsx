import Link from "next/link";
import StudyAppCTA from "@/components/StudyAppCTA";
import { Icon, PhoneFrame } from "@/components/brand";
import ResultsProof from "@/components/study/ResultsProof";
import { STUDY_APP } from "@/lib/study-app";
import "./worksheet-upgrade.css";

// The main call to action on the free worksheet pages (most of the site's
// traffic), straight after the generator (Ryan, 30 Oct 2026): what the
// app does beyond a worksheet, side by side, then the sign-up.
//
// Facts from the Project's features file and the app's own code:
// Plus has no per-student cap on snaps, drills or the bank, but the server
// has fair-use limits (80 snaps and 120 new questions a day), so the copy
// says "as many as they need" with that footnote, never a bare "unlimited".
const ROWS = [
  {
    label: "The questions",
    sheet: "The same questions for every student on this topic.",
    app: "Written from the questions they got wrong in homework and school tests, at their level.",
  },
  {
    label: "How many",
    sheet: "One sheet at a time.",
    app: "As many fresh questions as they need, each one different, never just the numbers swapped.*",
  },
  {
    label: "Before a test",
    sheet: "Pick a topic and hope it’s the right one.",
    app: "A practice test covering every part of the topic. Upload the term planner and it focuses on what’s coming up.",
  },
  {
    label: "Marking",
    sheet: "Check the answer key yourself.",
    app: "Marked as they go, with the exact step that went wrong explained.",
  },
  {
    label: "Progress",
    sheet: "Nothing is saved.",
    app: "Every question tracked until it’s mastered, and a weekly review for parents.",
  },
];

export default function WorksheetUpgrade({ topic, placement }) {
  const name = STUDY_APP.name;
  return (
    <section className="wu tb" aria-labelledby={`wu-${placement}`}>
      <div className="wu__in">
        <div className="wu__head">
          <div>
            <p className="tb-eyebrow">Want more than a worksheet?</p>
            <h2 id={`wu-${placement}`} className="tb-h2 wu__title">
              Practice built from their own mistakes.
            </h2>
            <p className="wu__lead">
              {`A worksheet${topic ? ` on ${topic}` : ""} is a good start. ${name} goes further: it turns the questions your child actually gets wrong into fresh practice, at their level, on what’s likely to be in their next test or exam.`}
            </p>
            <ResultsProof className="wu__proof" />
          </div>
          <div className="wu__phone" aria-hidden="false">
            <PhoneFrame
              src="/app-screens/flow-snap/03-question-solution-hidden.png"
              alt="Tuterly: a question the student got wrong, with the solution hidden and a similar question to answer themselves"
              width={250}
              sizes="(max-width: 899px) 56vw, 250px"
            />
          </div>
        </div>

        <div className="wu__table" role="table" aria-label={`A free worksheet compared with ${name}`}>
          <div className="wu__row wu__row--head" role="row">
            <span role="columnheader" className="wu__label" />
            <span role="columnheader">Free worksheet</span>
            <span role="columnheader" className="wu__app"><Icon name="snap" size={18} /> {name}</span>
          </div>
          {ROWS.map((r) => (
            <div key={r.label} className="wu__row" role="row">
              <span role="rowheader" className="wu__label">{r.label}</span>
              <span role="cell" className="wu__sheet"><span className="wu__who">Free worksheet</span>{r.sheet}</span>
              <span role="cell" className="wu__app"><span className="wu__who">{name}</span>{r.app}</span>
            </div>
          ))}
        </div>

        <div className="wu__cta">
          <div className="wu__cta-copy">
            <p className="wu__cta-title">Sign up early for 50% off.</p>
            <p className="wu__cta-text">
              {`For Years 7 to 10. A 1-week free trial, then $${STUDY_APP.earlyPriceWeek} a week for life when you sign up before launch.`}{" "}
              <Link href="/guarantee">Better marks in 6 months, or your money back</Link>.
            </p>
            <p className="wu__cta-try">
              <Link href="/try">Or try it free now on one of their questions →</Link>
            </p>
          </div>
          <div className="wu__cta-form">
            <StudyAppCTA variant="hero" placement={placement} position="inline" slim />
          </div>
        </div>

        <p className="wu__foot">
          * With a subscription. Fair use applies: up to 80 snapped questions and 120 new practice questions a day per student.
        </p>
      </div>
    </section>
  );
}

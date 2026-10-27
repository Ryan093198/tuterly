import { Icon, Reveal, SectionHead } from "@/components/brand";
import { STUDY_APP, STUDY_APP_FACTS } from "@/lib/study-app";
import "./made-by-educators.css";

// "Not just an AI app": who designed it and which curriculum it follows.
// Used on the home page and /parents. Curriculum wording checked against
// VCAA: the Victorian Curriculum F–10 "incorporates and reflects much of
// the Australian Curriculum". Don't claim more than that (e.g. NSW syllabus).
export const MADE_BY_POINTS = [
  {
    icon: "educator",
    title: "Designed by Australian educators",
    text: "How it explains each step, what makes a good practice question, and when a question counts as mastered were set by Australian educators, not left to the AI.",
  },
  {
    icon: "school",
    title: "Built on the curriculum",
    text: `Topics follow the ${STUDY_APP_FACTS.curriculum} for Years 7 to 10 maths, which incorporates much of the Australian Curriculum. Every question is filed under a topic from their year level.`,
  },
  {
    icon: "upload",
    title: "Aligned with their school",
    text: "Upload their real tests and practice papers, and their practice comes from what their teacher actually set.",
  },
  {
    icon: "checked",
    title: "Rules first, then a second check",
    text: "Every new question follows the educators’ rules: the same concepts, at least two things changed, never just the numbers. Then an independent check solves it again before your child sees it.",
  },
];

export default function MadeByEducators({ id = "educators", className = "" }) {
  return (
    <section className={`tb-section ${className}`} aria-labelledby={id}>
      <div className="tb-wrap">
        <Reveal>
          <SectionHead
            id={id}
            eyebrow="Made in Australia"
            title="Designed by Australian educators. Not just an AI app."
            lead={`${STUDY_APP.name} is designed by Australian educators at Bayside Academics, a tutoring business in Brighton, Melbourne. The AI reads the photos and writes the questions. Educators decided what it teaches and how.`}
          />
        </Reveal>
        <ul className="mbe">
          {MADE_BY_POINTS.map((p) => (
            <li key={p.title} className="tb-card mbe__card">
              <span className="tb-tile__icon" aria-hidden="true"><Icon name={p.icon} /></span>
              <h3 className="mbe__title">{p.title}</h3>
              <p className="mbe__text">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

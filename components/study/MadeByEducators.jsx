import { Icon, Reveal, SectionHead } from "@/components/brand";
import { STUDY_APP, STUDY_APP_FACTS } from "@/lib/study-app";
import "./made-by-educators.css";

// Who designed it and which curriculum it follows.
// Used on the home page and /parents. Curriculum wording checked against
// VCAA: the Victorian Curriculum F–10 "incorporates and reflects much of
// the Australian Curriculum". Don't claim more than that (e.g. NSW syllabus).
export const MADE_BY_POINTS = [
  {
    icon: "educator",
    title: "Built by experienced Australian educators",
    text: "Made specifically for Australian students. How it explains each step, what makes a good practice question, and when a question counts as mastered were all set by Australian educators.",
  },
  {
    icon: "school",
    title: "Follows the Australian Curriculum",
    text: `Topics follow the ${STUDY_APP_FACTS.curriculum}, for Years 7 to 10 maths. Every question is filed under a topic from their year level.`,
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
            title="Built by Australian educators, for Australian students."
            lead={`Tuterly has been built by a team of experienced educators at Bayside Academics, a Melbourne tutoring centre that has taught over 1,000 students in 10 years, with a 5.0 rating on Google. It’s made specifically for Australian students: every topic follows the Australian Curriculum for Years 7 to 10, using the same terms their teachers use. It’s already used by tutoring centres and teachers in Victoria, and now it’s opening to the public.`}
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

// Two-line trust strip for the hero of the home, parents and students pages.
export function MadeInAustralia({ className = "" }) {
  return (
    <ul className={`mia ${className}`} aria-label="About Tuterly">
      <li><Check />Built in Australia by experienced educators</li>
      <li><Check />Follows the Australian Curriculum, Years 7 to 10</li>
    </ul>
  );
}

function Check() {
  return (
    <svg className="mia__tick" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" />
      <path d="M5.5 10.4l3 3 6-6.4" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

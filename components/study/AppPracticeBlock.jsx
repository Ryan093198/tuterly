import StudyAppCTA from "@/components/StudyAppCTA";
import { Icon, PhoneFrame } from "@/components/brand";
import { STUDY_APP, STUDY_APP_FACTS } from "@/lib/study-app";
import "./app-practice-block.css";

// Replaces the old worksheet / practice-test builder on SEO pages: the
// practice now happens in the app ("Test any topic", "Snap a question").
// Facts only from TUTERLY-STUDY-FEATURES.md.
export default function AppPracticeBlock({ topic, placement, heading }) {
  const what = topic ? topic : "any topic in their year";
  return (
    <section className="apb tb" aria-labelledby={`apb-${placement}`}>
      <div className="apb__in">
        <div className="apb__copy">
          <p className="tb-eyebrow">Practise it in {STUDY_APP.name}</p>
          <h2 id={`apb-${placement}`} className="tb-h2 apb__title">
            {heading || `A practice test on ${what}, whenever they want.`}
          </h2>
          <ul className="apb__list">
            <li><Icon name="test" size={20} /><span><strong>Test any topic</strong> writes a short test on {what}, one question from each part of the topic.</span></li>
            <li><Icon name="snap" size={20} /><span>Got one wrong at school? <strong>Snap it</strong>, or upload the whole test, for a worked solution and a fresh question to master.</span></li>
            <li><Icon name="school" size={20} /><span>Designed by Australian educators. Topics follow the {STUDY_APP_FACTS.curriculum}.</span></li>
          </ul>
          <StudyAppCTA variant="hero" placement={placement} position="inline" slim />
        </div>
        <div className="apb__phone">
          <PhoneFrame
            src="/app-screens/flow-practice/03-test-question.png"
            alt="A Tuterly topic test: question 1 of 8, a Pythagoras ladder problem, answered with the maths keys"
            width={240}
            sizes="(max-width: 899px) 60vw, 240px"
          />
        </div>
      </div>
    </section>
  );
}

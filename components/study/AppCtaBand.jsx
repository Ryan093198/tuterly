import StudyAppCTA from "@/components/StudyAppCTA";
import { CtaBand } from "@/components/brand";
import { STUDY_APP } from "@/lib/study-app";

// The final call-to-action band used across the marketing site, with the
// home page's closing words. No Quinn here (the mascot is home-page only).
export default function AppCtaBand({ placement, title, lead }) {
  return (
    <CtaBand
      id={`${placement}-title`}
      title={title || "Better maths marks start with the next question they get wrong."}
      lead={lead || `${STUDY_APP.name} turns every missed maths question into practice that’s about your child, not a generic worksheet.`}
    >
      <StudyAppCTA variant="hero" placement={placement} position="final" />
    </CtaBand>
  );
}

import Link from "next/link";
import DemoVideo, { EXAM_ZONE_VIDEO } from "@/components/study/DemoVideo";
import { AppHeroBlock } from "@/components/study/TutoringPageApp";
import { c } from "@/components/marketing/theme";

// Hero for the /tutoring pages (9 Nov 2026): copy and sign-up on the left,
// the Exam Zone demo on the right. On phones: headline, then the video,
// then the sign-up.
export default function SuburbHero({ kicker, h1, lead, placement }) {
  return (
    <section className="sbh" style={{ padding: "64px 24px 56px", background: c.white }}>
      <style>{`
        .sbh__grid { max-width: 1060px; margin: 0 auto; display: grid; gap: 24px; grid-template-areas: "copy" "video" "app"; }
        .sbh__copy { grid-area: copy; }
        .sbh__app { grid-area: app; }
        .sbh__video { grid-area: video; margin: 0; display: grid; justify-items: center; gap: 10px; }
        .sbh__video figcaption { max-width: 300px; font-size: 14px; line-height: 1.5; color: ${c.textLight}; text-align: center; }
        .sbh__video figcaption strong { color: ${c.navy}; }
        .sbh__video a { color: ${c.teal}; font-weight: 700; }
        @media (min-width: 920px) {
          .sbh__grid { grid-template-columns: minmax(0, 1fr) 300px; grid-template-areas: "copy video" "app video"; column-gap: 48px; row-gap: 20px; align-items: start; }
          .sbh__video { position: sticky; top: 90px; }
        }
      `}</style>
      <div className="sbh__grid">
        <div className="sbh__copy">
          <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>{kicker}</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 44px)", color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>{h1}</h1>
          <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, margin: 0 }}>{lead}</p>
        </div>
        <figure className="sbh__video">
          <DemoVideo width={260} placement={`${placement}_video`} priority video={EXAM_ZONE_VIDEO} />
          <figcaption>
            <strong>Predict the questions on their maths exam.</strong> Exam Zone writes practice exams from your child&rsquo;s own test outline, past papers and teacher&rsquo;s notes, in their school&rsquo;s style.{" "}
            <Link href="/features/exam-zone">See how it works</Link>
          </figcaption>
        </figure>
        <div className="sbh__app">
          <AppHeroBlock placement={placement} />
        </div>
      </div>
    </section>
  );
}

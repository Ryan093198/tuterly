import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import TryQuestion from "@/components/study/TryQuestion";
import StudyAppCTA from "@/components/StudyAppCTA";
import { CtaBand, Eyebrow } from "@/components/brand";
import { SITE_URL } from "@/lib/site";
import "@/components/study/study-landing.css";

const TITLE = "Try Tuterly Free: Upload a Maths Question, Get a Fresh One to Practise | Tuterly";
const DESCRIPTION =
  "Upload a photo of a maths question your child got wrong. Tuterly shows the worked solution and writes a fresh question on the same idea to practise. Free, Years 7 to 10.";
const URL = `${SITE_URL}/try`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function TryPage() {
  return (
    <div className="tb sl">
      <MarketingNav />
      <section className="tb-section" aria-labelledby="try-title" style={{ paddingTop: 36 }}>
        <div className="tb-wrap">
          <div className="tb-head tb-head--center">
            <Eyebrow>Try it free · Years 7 to 10 maths</Eyebrow>
            <h1 id="try-title" className="tb-h1">
              Got a question wrong? <span className="sl-accent">Try Tuterly on it.</span>
            </h1>
            <p className="tb-lead">
              Upload a photo of one maths question. Tuterly shows the worked solution, then writes a fresh question on the same idea to practise, checked twice before you see it.
            </p>
          </div>
          <TryQuestion />
        </div>
      </section>
      <CtaBand
        id="try-final-title"
        title="In the app, every wrong answer works like this."
        lead="Snap the questions they get wrong all term, and Tuterly keeps writing fresh ones until each idea is mastered."
      >
        <div id="get-app" style={{ scrollMarginTop: 80 }}>
          <StudyAppCTA variant="hero" placement="try_final" position="final" />
        </div>
      </CtaBand>
      <MarketingFooter />
    </div>
  );
}

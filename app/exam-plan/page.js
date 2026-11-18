import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import ExamPlanFlow from "@/components/exam-plan/ExamPlanFlow";
import { SITE_URL } from "@/lib/site";
import { appCta } from "@/lib/study-app";
import "katex/dist/katex.min.css";
import "@/components/state/state-hub.css";
import "@/components/exam-plan/exam-plan.css";

// The free exam plan, Years 7 to 10 (Ryan, 18 Nov 2026): where the UGC ads
// point. Upload a marked test, get a study plan to the exam date and a custom
// test on the questions you got wrong, free (one upload a day). It's a real
// Tuterly app account, so everything is waiting in the app.
const TITLE = "Free Maths Exam Study Plan from Your Marked Tests (Years 7 to 10) | Tuterly";
const DESCRIPTION =
  "Upload a marked maths test and get a free study plan to your exam date, plus a custom test on exactly the questions you got wrong, with worked solutions. For Years 7 to 10.";
const URL = `${SITE_URL}/exam-plan`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const FAQS = [
  { q: "Is it really free?", a: "Yes. Your study plan and your custom test are free, with one upload a day. The Tuterly app is the paid version, with unlimited questions, notes and practice tests." },
  { q: "What can I upload?", a: "Any maths test you've done with the marking on it: a class test, a topic test, a practice exam or a past test. Photos of each page (up to 10) or one PDF." },
  { q: "What if my test isn't marked?", a: "Upload it anyway. You'll see every question we found, and you tick the ones you got wrong or weren't sure about." },
  { q: "Where do the test questions come from?", a: "From Tuterly's own bank of checked questions, written for the Victorian and Australian Curriculum and matched to the topics you got wrong. Your school's questions are never copied." },
  { q: "Who sees my test?", a: "Only you. The photos stay private to your account. We use them to find your weak spots and save the questions you got wrong to your Tuterly account." },
  { q: "Do I need the app?", a: "No. Everything works here in your browser. If you get the app later, sign in with the same email and your exam and mistakes are already there." },
];

export default function ExamPlanPage() {
  const cta = appCta();
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <div className="sh">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <MarketingNav />
      <header className="sh-hero ep-hero">
        <p className="sh-eyebrow">Free · Years 7 to 10</p>
        <h1>Upload your marked tests. Get a plan for your exam.</h1>
        <p className="sh-lead">
          We find exactly what you got wrong, plan your days to the exam, and make you a custom test on your weak spots, with worked solutions. Free.
        </p>
      </header>

      <section className="sh-sec ep-sec" aria-label="Make your exam plan">
        <div className="sh-wrap ep-wrap">
          <ExamPlanFlow cta={{ href: cta.href, label: cta.live ? "Get Tuterly" : "Get early access to the app" }} />
        </div>
      </section>

      <section className="sh-sec sh-sec--paper" aria-labelledby="ep-how">
        <div className="sh-wrap">
          <h2 id="ep-how">How it works</h2>
          <ol className="ep-how">
            <li><strong>Upload a marked test.</strong> A class test, practice exam or past test, with the marking on it.</li>
            <li><strong>Check what we found.</strong> We read every question and the marking, and tick the ones you got wrong.</li>
            <li><strong>Get your plan and test.</strong> A day-by-day plan to your exam date, and up to 10 questions on exactly your weak spots, with worked solutions. We email you the plan too.</li>
          </ol>
        </div>
      </section>

      <section className="sh-sec" aria-labelledby="ep-faq">
        <div className="sh-wrap">
          <h2 id="ep-faq">Questions</h2>
          <div className="ep-faq">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}

import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import { DIAG_PATH, DIAG_YEARS, buildDiagnostic } from "@/lib/diagnostic";
import { SITE_URL } from "@/lib/site";
import { StateSwitcher } from "@/components/state/StateHub";
import "@/components/state/state-hub.css";
import "@/components/diagnostic/diagnostic.css";

// Free maths diagnostic test, Years 7 to 9 (Ryan, 17 Nov 2026): a lead
// magnet for parents. lib/diagnostic.js builds and marks it.
const TITLE = "Free Maths Assessment Test, Years 7 to 9 (Diagnostic) | Tuterly";
const DESCRIPTION =
  "A free online maths assessment and diagnostic test for Years 7, 8 and 9. Two questions from every chapter of the year, marked straight away, with a free report for parents on what to work on before next year.";
const URL = `${SITE_URL}${DIAG_PATH}`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const FAQS = [
  { q: "Is it really free?", a: "Yes. The test, the marking and the parent report are all free, and you don’t need an account." },
  { q: "Which year should my child pick?", a: "The year they’re in now. If it’s the summer holidays, pick the year they’ve just finished. The test checks that year’s maths and shows what each topic leads to next year." },
  { q: "How long does it take?", a: "About 35 minutes. There are 20 questions, two from each chapter of the year. It can be done in one sitting or saved and finished later on the same device." },
  { q: "Can they use a calculator?", a: "Yes. Have a pen, paper and a calculator ready, and work each question out on paper before typing the answer." },
  { q: "What’s in the parent report?", a: "The score, a result for every chapter (Strong, Needs work or Not yet), and for each weak chapter, what it leads to next year. It’s emailed from learn@tuterly.com.au." },
  { q: "Is it a full assessment?", a: "No. Two questions per chapter gives a quick picture of where the gaps are, so you know where to start. It isn’t a school report or a prediction of marks." },
  { q: "Does it work for my state?", a: "Yes. The questions are written to the Australian Curriculum, which covers the same maths taught in every state. Pick your state below for a short note on how the years line up there, such as Stage 4 and 5 in NSW." },
  { q: "What about Year 10?", a: "Students choose different maths pathways for Year 11, so the diagnostic covers Years 7, 8 and 9 for now." },
  { q: "Do you keep my child’s answers?", a: "No. The test is marked and the answers are not stored. If you ask for the report, we use your email to send it, and only email you again if you tick the box to hear when the app launches." },
];

export default function DiagnosticLanding() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];
  return (
    <div className="sh">
      {schema.map((x, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />
      ))}
      <MarketingNav />
      <header className="sh-hero">
        <p className="sh-eyebrow">Free · Years 7, 8 and 9 · About 35 minutes</p>
        <h1>Free maths assessment test. Find the gaps before next year.</h1>
        <p className="sh-lead">
          A quick diagnostic test with two questions from every chapter of this year&rsquo;s maths, marked straight away. Parents get a free report on what to work on before next year.
        </p>
      </header>

      <section className="sh-sec dg-pick-sec" aria-labelledby="dg-pick">
        <div className="sh-wrap">
          <h2 id="dg-pick" className="dg-pick__h">Which year are you in now?</h2>
          <p className="dg-pick__note">Pick the year you&rsquo;re in <strong>now</strong>, not next year. If it&rsquo;s the summer holidays, pick the year you&rsquo;ve just finished.</p>
          <div className="dg-pick">
            {DIAG_YEARS.map((y) => {
              const d = buildDiagnostic(y.slug);
              return (
                <Link key={y.slug} href={`${DIAG_PATH}/${y.slug}`} className="dg-year">
                  <span className="dg-year__k">I&rsquo;m in</span>
                  <span className="dg-year__n">{y.year}</span>
                  <span className="dg-year__x">Checks {y.year} maths. Gets you ready for {y.next}.</span>
                  <span className="dg-year__meta">{d?.questions.length || 20} questions · {d?.chapters.length || 10} chapters</span>
                  <span className="dg-year__go">Start the test →</span>
                </Link>
              );
            })}
          </div>
          <p className="dg-pick__y10">Year 10? Students choose different maths pathways for Year 11, so this covers Years 7 to 9 for now.</p>
        </div>
      </section>

      <section className="sh-sec sh-sec--paper" aria-labelledby="dg-how">
        <div className="sh-wrap">
          <h2 id="dg-how">How it works</h2>
          <ol className="dg-steps">
            <li><strong>Sit the test.</strong> 20 questions on this year&rsquo;s topics. Leave a question blank if it hasn&rsquo;t been taught yet.</li>
            <li><strong>Get the results straight away.</strong> A mark, a worked solution for every question and a result for every chapter.</li>
            <li><strong>Get the parent report.</strong> Emailed free: each weak chapter, and what it leads to next year.</li>
          </ol>
        </div>
      </section>

      <section className="sh-sec" aria-labelledby="dg-faq">
        <div className="sh-wrap sh-narrow">
          <h2 id="dg-faq">Questions from parents</h2>
          <div className="sh-faqs">
            {FAQS.map((f) => (
              <details key={f.q} className="sh-box tz-faq">
                <summary><h3 className="sh-h3">{f.q}</h3></summary>
                <p className="sh-p">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <StateSwitcher title="Notes for your state or territory" hash="#diagnostic-test" />
      <AppCtaBand placement="diagnostic_landing" title="Then practise exactly what they missed." lead="The Tuterly app gives fresh questions on every topic your child got wrong, with a worked solution for each one, written to the Australian Curriculum." />
      <MarketingFooter />
    </div>
  );
}

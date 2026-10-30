import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import ExamGenerator from "@/components/exam/ExamGenerator";
import { getExamCatalogue } from "@/lib/exam-bank";
import { SITE_URL } from "@/lib/site";
import "@/components/state/state-hub.css";

const TITLE = "Free Maths Practice Exam Generator, Years 7 to 10 | Tuterly";
const DESCRIPTION =
  "Make a free maths practice exam for Years 7 to 10A. Pick the year and topics and get a printable exam with marks, a suggested time and fully worked solutions. Australian Curriculum.";
const URL = `${SITE_URL}/exam-generator`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const HOW = [
  { t: "Pick the year and topics", b: "Tick a main topic, like Algebra, to include all of it, or pick the subtopics their next test covers." },
  { t: "Get an exam in exam format", b: "Up to 20 questions in short answer and extended response sections, with marks for each question and a suggested time." },
  { t: "Sit it, then mark it", b: "Print it or save it as a PDF, with or without answers. Every question has a fully worked solution." },
];

const FAQS = [
  { q: "Is the practice exam generator free?", a: "Yes. Enter your email to unlock it and you can make one free practice exam a day. It uses the same email as the free worksheet generator." },
  { q: "Where do the questions come from?", a: "From Tuterly's topic pages for Years 7 to 10A. Every question was written for its topic and checked by an independent second solve, and each one comes with a fully worked solution." },
  { q: "Which year levels and topics does it cover?", a: "Years 7, 8, 9 and 10, plus Year 10A extension topics, across number, algebra, measurement, space, statistics and probability, following the Australian Curriculum." },
  { q: "How long is each exam?", a: "Up to 20 questions. Pick one topic for a short topic test, or several for a mixed exam like an end-of-term or end-of-year test. Each exam shows its total marks and a suggested time." },
  { q: "What should my child do with the questions they get wrong?", a: "Read the worked solution, then practise that idea again. In the Tuterly app they can snap the question and get fresh questions on the same idea until it's mastered." },
];

export default function ExamGeneratorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <div className="sh">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MarketingNav />
      <header className="sh-hero">
        <p className="sh-eyebrow">Free practice exam generator</p>
        <h1>Make a free maths practice exam, Years 7 to 10</h1>
        <p className="sh-lead">Pick the year and the topics their next test covers. Get an exam with marks, a suggested time and a worked solution for every question.</p>
      </header>
      <main className="sh-gen" style={{ maxWidth: 1000 }}>
        <ExamGenerator catalogue={getExamCatalogue()} placement="exam_generator" />
      </main>

      <section className="sh-sec sh-sec--paper" aria-labelledby="eg-how">
        <div className="sh-wrap">
          <h2 id="eg-how">How it works</h2>
          <div className="sh-tests">
            {HOW.map((h, i) => (
              <div key={h.t} className="sh-box">
                <p className="sh-when">Step {i + 1}</p>
                <h3 className="sh-h3">{h.t}</h3>
                <p className="sh-p">{h.b}</p>
              </div>
            ))}
          </div>
          <p className="sh-small">
            Want a worksheet on one topic instead? Use the <Link href="/worksheets" className="sh-link">free worksheet generator</Link>.
            Primary years? Try a <Link href="/naplan" className="sh-link">NAPLAN-style numeracy test</Link>.
          </p>
        </div>
      </section>

      <section className="sh-sec" aria-labelledby="eg-faq">
        <div className="sh-wrap sh-narrow">
          <h2 id="eg-faq">Practice exam questions</h2>
          <div className="sh-faqs">
            {FAQS.map((f) => (
              <div key={f.q} className="sh-box">
                <h3 className="sh-h3">{f.q}</h3>
                <p className="sh-p">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AppCtaBand placement="exam_generator_final" />
      <MarketingFooter />
    </div>
  );
}

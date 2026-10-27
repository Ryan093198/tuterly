import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import AppPracticeBlock from "@/components/study/AppPracticeBlock";
import { SITE_URL } from "@/lib/site";

// Transactional landing page for "primary maths practice tests" style
// searches. The test builder was removed (Oct 2026): the tests now come
// from the Tuterly Study app ("Test any topic"), so the app is the CTA.

const TITLE = "Maths Practice Tests, Years 7-10 | Tuterly Study";
const DESCRIPTION =
  "Maths practice tests on any Years 7 to 10 topic, aligned to the Victorian Curriculum, with a worked solution for every question. In the Tuterly Study iPhone app.";
const URL = `${SITE_URL}/practice-maths-tests-secondary`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};


const c = {
  teal: "var(--brand-text)", tealDeep: "var(--brand-text)", tealBright: "var(--brand)", tealPale: "var(--brand-soft)",
  ink: "var(--foreground)", navy: "var(--foreground)", text: "var(--foreground)", textLight: "var(--muted)",
  textMuted: "var(--muted)", white: "var(--card)", paper: "var(--background)", border: "var(--border)",
  amber: "var(--xp)",
};
const sans = "var(--font-display)";

const WHY = [
  {
    title: "Textbook exercises tell them the method",
    body: "An exercise headed Quadratic Equations tells your child to use the quadratic formula before they have read a word. A test does not. Working out what kind of problem it is comes first, and that is the step textbook practice skips.",
  },
  {
    title: "Timing changes everything",
    body: "A student who can solve a problem in ten unhurried minutes cannot always solve it in three. Sitting a test under a clock is the only way to build that speed, and it is the difference between knowing the maths and scoring the mark.",
  },
  {
    title: "Years 9 and 10 set up VCE",
    body: "Algebra, indices and trigonometry in Years 9 and 10 are what Methods and Specialist assume are automatic. Gaps here quietly close off subject choices later, and a practice test surfaces them while there is still time.",
  },
];

const FAQS = [
  {
    q: "What year levels are these maths practice tests for?",
    a: "Years 7 through 10, aligned to the Victorian Curriculum (VCAA). In Tuterly Study, Test any topic writes a short test on any topic in their year, one question from each part of the topic, with a worked solution for every question.",
  },
  {
    q: "How much does it cost?",
    a: "Tuterly Study is free to download, with a 1-week free trial. After that it's $7.99 a week, and you can cancel any time.",
  },
  {
    q: "Do these match what my child is doing at school?",
    a: "Topics follow the Victorian Curriculum 2.0, so your child can pick the exact topic their class is on. They can also upload their actual school tests and practice papers, and the app writes fresh questions on the ones they got wrong.",
  },
  {
    q: "How many practice tests should a student do before a maths test?",
    a: "Two or three spread across the fortnight before beats a single session the night before. Spacing the practice out is what makes it stick, and marking each one properly matters more than doing more of them.",
  },
  {
    q: "Will this help with VCE maths preparation?",
    a: "Indirectly, and importantly. Years 9 and 10 build the algebra, indices and trigonometry that VCE Methods and Specialist assume are second nature, so closing gaps now is the highest-value VCE preparation a Year 9 or 10 student can do.",
  },
];

export default function SecondaryPracticeTestsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div style={{ fontFamily: sans, color: c.text, background: c.white, overflowX: "hidden" }}>
      <style>{`
        ::selection { background: ${c.tealPale}; color: ${c.ink}; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @media(max-width:768px) {
          .pt-hero { padding: 120px 20px 40px !important; }
          .pt-hero h1 { font-size: 36px !important; }
          .pt-section { padding-left: 20px !important; padding-right: 20px !important; }
          .pt-nav { padding: 0 16px !important; }
          .pt-nav-links a:not(.pt-nav-cta) { display: none; }
        }
      `}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <MarketingNav />

      <section className="pt-hero" style={{ padding: "56px 40px 44px", background: "linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 100%)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", animation: "fadeUp 0.8s ease" }}>
          <p style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", color: c.tealDeep, marginBottom: 16 }}>
            Practice tests
          </p>
          <h1 style={{ fontWeight: 800, fontSize: 50, color: c.ink, lineHeight: 1.1, letterSpacing: "-1.4px", marginBottom: 20 }}>
            Maths practice tests,{" "}
            <span style={{ color: c.teal }}>Years 7 to 10</span>.
          </h1>
          <p style={{ fontSize: 17.5, color: c.textLight, lineHeight: 1.7, maxWidth: 580, margin: "0 auto 14px" }}>
            Textbook questions come sorted by topic, so your child knows the method before they read the question. Actual tests mix topics, run to a clock, and lean on worded problems. That is why a student who follows everything in class can still come home with a mark that does not reflect what they know.
          </p>
          <p style={{ fontSize: 17.5, color: c.ink, fontWeight: 600, lineHeight: 1.7, maxWidth: 580, margin: "0 auto" }}>
            Tuterly Study writes a practice test on any topic in their year, with a worked solution for every question.
          </p>
        </div>
      </section>

      <main className="pt-section" style={{ maxWidth: 1028, margin: "0 auto", padding: "8px 24px 56px" }}>
        <AppPracticeBlock placement="practice_tests_secondary" />
      </main>

      <section className="pt-section" style={{ background: c.paper, borderTop: `1px solid ${c.border}`, padding: "64px 40px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", color: c.tealDeep, marginBottom: 14 }}>
            Why practice tests work
          </p>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: c.ink, letterSpacing: "-0.8px", lineHeight: 1.2, margin: "0 0 28px" }}>
            Three reasons a test beats another textbook exercise.
          </h2>
          <div style={{ display: "grid", gap: 14 }}>
            {WHY.map((w) => (
              <div key={w.title} style={{ background: c.white, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px" }}>
                <h3 style={{ fontSize: 16.5, fontWeight: 700, color: c.ink, marginBottom: 8 }}>{w.title}</h3>
                <p style={{ fontSize: 14.5, color: c.textLight, lineHeight: 1.65 }}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-section" style={{ background: c.white, padding: "64px 40px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", color: c.tealDeep, marginBottom: 14 }}>
            Common questions
          </p>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: c.ink, letterSpacing: "-0.8px", lineHeight: 1.2, margin: "0 0 28px" }}>
            Maths practice tests, answered.
          </h2>
          <div style={{ display: "grid", gap: 14 }}>
            {FAQS.map((f) => (
              <div key={f.q} style={{ background: c.paper, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: c.ink, marginBottom: 8 }}>{f.q}</h3>
                <p style={{ fontSize: 14.5, color: c.textLight, lineHeight: 1.65 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <AppCtaBand placement="practice_tests_secondary_final" />
      <MarketingFooter />
    </div>
  );
}

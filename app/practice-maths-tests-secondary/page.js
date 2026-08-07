import Link from "next/link";
import { getTopicGroupsForLevel } from "@/lib/curriculum-topics";
import WorksheetGenerator from "@/components/WorksheetGenerator";
import { SITE_URL } from "@/lib/site";

// Transactional landing page for "primary maths practice tests" style
// searches. The generator is the payload (the searcher wants the tests, not
// an essay), with problem-first copy around it and the trial CTA below.

const TITLE = "Maths Practice Tests, Years 7-10 | Free | Tuterly";
const DESCRIPTION =
  "Free printable maths practice tests for Years 7 to 10, aligned to the Victorian Curriculum. Mixed-topic questions with full worked solutions, ready to print.";
const URL = `${SITE_URL}/practice-maths-tests-secondary`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const YEAR_LEVELS = ["Year 7", "Year 8", "Year 9", "Year 10"];

const c = {
  teal: "#0D9488", tealDeep: "#0F766E", tealBright: "#14B8A6", tealPale: "#ECFDFB",
  ink: "#0F172A", navy: "#0B1220", text: "#334155", textLight: "#64748B",
  textMuted: "#94A3B8", white: "#FFFFFF", paper: "#F7F9FC", border: "#E6EAF0",
  amber: "#F59E0B",
};
const sans = "'Inter', 'Helvetica Neue', Arial, sans-serif";

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
    a: "Years 7 through 10, aligned to the Victorian Curriculum (VCAA). Pick the year level and topic and the generator builds a fresh test with full worked solutions.",
  },
  {
    q: "Are the practice tests free?",
    a: "Yes. The generator on this page is free to use and every test comes with worked solutions you can print. A Tuterly subscription adds full 25-question topic tests with a separate answer key for marking.",
  },
  {
    q: "Do these match what my child is doing at school?",
    a: "Topics come from the VCAA Foundation to Year 10 curriculum, which is what Victorian schools teach, so you can pick the exact topic their class is on.",
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
  const topicsByYear = Object.fromEntries(
    YEAR_LEVELS.map((y) => [y, getTopicGroupsForLevel(y, "maths", [y])])
  );

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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
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

      <nav className="pt-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${c.border}`, padding: "0 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 66 }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: c.navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: c.tealBright }}>t</div>
            <span style={{ fontSize: 21, fontWeight: 800, color: c.ink, letterSpacing: "-0.8px" }}>tuterly</span>
          </Link>
          <div className="pt-nav-links" style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <Link href="/parents" style={{ padding: "9px 14px", borderRadius: 8, fontSize: 14.5, fontWeight: 500, color: c.textLight, textDecoration: "none" }}>For parents</Link>
            <Link href="/worksheets" style={{ padding: "9px 14px", borderRadius: 8, fontSize: 14.5, fontWeight: 500, color: c.textLight, textDecoration: "none" }}>Free worksheets</Link>
            <Link href="/directory" style={{ padding: "9px 14px", borderRadius: 8, fontSize: 14.5, fontWeight: 500, color: c.textLight, textDecoration: "none" }}>Find a tutor</Link>
            <a href="https://app.tuterly.com.au" style={{ padding: "9px 14px", borderRadius: 8, fontSize: 14.5, fontWeight: 500, color: c.textLight, textDecoration: "none" }}>Log in</a>
            <Link className="pt-nav-cta" href="/get-started" style={{ padding: "10px 20px", borderRadius: 10, fontSize: 14.5, fontWeight: 600, background: c.ink, color: c.white, textDecoration: "none", marginLeft: 6 }}>Get started</Link>
          </div>
        </div>
      </nav>

      <section className="pt-hero" style={{ padding: "150px 40px 44px", background: "linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 100%)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", animation: "fadeUp 0.8s ease" }}>
          <p style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", color: c.tealDeep, marginBottom: 16 }}>
            Free practice tests
          </p>
          <h1 style={{ fontWeight: 800, fontSize: 50, color: c.ink, lineHeight: 1.1, letterSpacing: "-1.4px", marginBottom: 20 }}>
            Maths practice tests,{" "}
            <span style={{ color: c.teal }}>Years 7 to 10</span>.
          </h1>
          <p style={{ fontSize: 17.5, color: c.textLight, lineHeight: 1.7, maxWidth: 580, margin: "0 auto 14px" }}>
            Textbook questions come sorted by topic, so your child knows the method before they read the question. Actual tests mix topics, run to a clock, and lean on worded problems. That is why a student who follows everything in class can still come home with a mark that does not reflect what they know.
          </p>
          <p style={{ fontSize: 17.5, color: c.ink, fontWeight: 600, lineHeight: 1.7, maxWidth: 580, margin: "0 auto" }}>
            Build a practice test below. Free, printable, with full worked solutions.
          </p>
        </div>
      </section>

      <main className="pt-section" style={{ maxWidth: 760, margin: "0 auto", padding: "8px 24px 56px" }}>
        <WorksheetGenerator
          topicsByYear={topicsByYear}
          yearLevels={YEAR_LEVELS}
          initialYearLevel="Year 8"
        />
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

      <section className="pt-section" style={{ background: c.tealPale, borderTop: `1px solid ${c.border}`, padding: "64px 40px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: c.ink, letterSpacing: "-0.7px", lineHeight: 1.2, margin: "0 0 14px" }}>
            Want full 25-question topic tests?
          </h2>
          <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, margin: "0 auto 24px", maxWidth: 520 }}>
            Tuterly builds a complete practice test across a whole topic, mixed difficulty and VCAA aligned, with a separate answer key for marking. Any topic, any time, for every child on your account.
          </p>
          <Link href="/get-started" style={{ display: "inline-block", padding: "15px 32px", borderRadius: 12, background: c.ink, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 14px rgba(15,27,45,0.18)" }}>
            Build their first test free &rarr;
          </Link>
          <p style={{ fontSize: 13, color: c.textLight, marginTop: 12 }}>Free for 7 days, then $29/month. Cancel anytime.</p>
          <p style={{ fontSize: 14, color: c.textLight, marginTop: 20 }}>
            Younger student?{" "}
            <Link href="/practice-maths-tests-primary" style={{ color: c.tealDeep, fontWeight: 600, textDecoration: "none" }}>
              Practice tests for Years 3 to 6 &rarr;
            </Link>
          </p>
        </div>
      </section>

      <footer style={{ background: c.ink, padding: "32px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 7, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: c.tealBright }}>t</div>
            <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.45)" }}>tuterly</span>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <Link href="/worksheets" style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Free worksheets</Link>
            <Link href="/parents" style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>For parents</Link>
            <Link href="/privacy" style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Privacy</Link>
            <a href="https://baysideacademics.com.au" style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Bayside Academics</a>
          </div>
          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.25)" }}>© 2026 Tuterly by Bayside Academics</p>
        </div>
      </footer>
    </div>
  );
}

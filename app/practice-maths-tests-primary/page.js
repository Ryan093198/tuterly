import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { getTopicGroupsForLevel } from "@/lib/curriculum-topics";
import WorksheetGenerator from "@/components/WorksheetGenerator";
import { SITE_URL } from "@/lib/site";

// Transactional landing page for "primary maths practice tests" style
// searches. The generator is the payload (the searcher wants the tests, not
// an essay), with problem-first copy around it and the trial CTA below.

const TITLE = "Primary Maths Practice Tests, Years 3-6 | Free | Tuterly";
const DESCRIPTION =
  "Free printable maths practice tests for Years 3 to 6, following the Australian Curriculum. Fresh questions every time, with full worked solutions.";
const URL = `${SITE_URL}/practice-maths-tests-primary`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const YEAR_LEVELS = ["Year 3", "Year 4", "Year 5", "Year 6"];

const c = {
  teal: "var(--brand-text)", tealDeep: "var(--brand-text)", tealBright: "var(--brand)", tealPale: "var(--brand-soft)",
  ink: "var(--foreground)", navy: "var(--foreground)", text: "var(--foreground)", textLight: "var(--muted)",
  textMuted: "var(--muted)", white: "var(--card)", paper: "var(--background)", border: "var(--border)",
  amber: "var(--xp)",
};
const sans = "var(--font-display)";

const WHY = [
  {
    title: "Recall beats re-reading",
    body: "Looking back over notes feels productive, but it is recognition, not recall. Answering a question from a blank page is the thing that actually strengthens memory, and it is what a test asks for.",
  },
  {
    title: "Mixed topics stop pattern-matching",
    body: "A worksheet on fractions tells your child the answer involves fractions. A test does not. Mixing topics forces them to work out what kind of problem they are looking at first, which is where most marks are lost.",
  },
  {
    title: "It shows you the gaps early",
    body: "A practice test is the cheapest way to find out what has not stuck, while there is still time to fix it, rather than finding out from a school report in December.",
  },
];

const FAQS = [
  {
    q: "What year levels are these primary maths practice tests for?",
    a: "Years 3 through 6, following the Australian Curriculum (built on the Victorian Curriculum 2.0). Choose the year level and topic and the generator builds a fresh test with full worked solutions.",
  },
  {
    q: "Are the practice tests free?",
    a: "Yes. The worksheet generator on this page is free to use, and every test comes with worked solutions you can print. A Tuterly subscription adds full 25-question topic tests with a separate answer key.",
  },
  {
    q: "Do these help with NAPLAN preparation?",
    a: "They help with the underlying skills. NAPLAN in Years 3 and 5 mixes topics and leans on worded problems, so practising across a whole topic rather than one narrow skill is good preparation. These are not official NAPLAN papers.",
  },
  {
    q: "How often should a primary student do a practice test?",
    a: "For most primary students, one short test a week per subject area is plenty. Consistency matters far more than volume, and a stressed child learns less, so keep it light and mark it together.",
  },
  {
    q: "Are the questions aligned to the curriculum?",
    a: "Yes. Topics come from the Victorian Curriculum 2.0, Victoria's version of the Australian Curriculum, so what your child practises matches what schools teach across Australia. NSW and WA have their own syllabuses that cover much the same maths.",
  },
];

export default function PrimaryPracticeTestsPage() {
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
            Free practice tests
          </p>
          <h1 style={{ fontWeight: 800, fontSize: 50, color: c.ink, lineHeight: 1.1, letterSpacing: "-1.4px", marginBottom: 20 }}>
            Primary maths practice tests,{" "}
            <span style={{ color: c.teal }}>Years 3 to 6</span>.
          </h1>
          <p style={{ fontSize: 17.5, color: c.textLight, lineHeight: 1.7, maxWidth: 580, margin: "0 auto 14px" }}>
            Most primary homework is a page of near-identical questions, so children get good at spotting the pattern rather than solving the problem. Then a test arrives with mixed topics and worded questions, and a confident child freezes.
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
          initialYearLevel="Year 5"
        />
      </main>

      <section className="pt-section" style={{ background: c.paper, borderTop: `1px solid ${c.border}`, padding: "64px 40px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", color: c.tealDeep, marginBottom: 14 }}>
            Why practice tests work
          </p>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: c.ink, letterSpacing: "-0.8px", lineHeight: 1.2, margin: "0 0 28px" }}>
            Three reasons a test beats another worksheet.
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
            Primary maths practice tests, answered.
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
            Tuterly builds a complete practice test across a whole topic, mixed difficulty and curriculum aligned, with a separate answer key for marking. Any topic, any time, for every child on your account.
          </p>
          <Link href="/get-started" style={{ display: "inline-block", padding: "15px 32px", borderRadius: 12, background: c.ink, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 14px rgba(15,27,45,0.18)" }}>
            Build their first test free &rarr;
          </Link>
          <p style={{ fontSize: 13, color: c.textLight, marginTop: 12 }}>Free for 7 days, then $29/month. Cancel anytime.</p>
          <p style={{ fontSize: 14, color: c.textLight, marginTop: 20 }}>
            Older student?{" "}
            <Link href="/practice-maths-tests-secondary" style={{ color: c.tealDeep, fontWeight: 600, textDecoration: "none" }}>
              Practice tests for Years 7 to 10 &rarr;
            </Link>
          </p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

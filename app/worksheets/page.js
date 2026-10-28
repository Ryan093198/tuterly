import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import { STUDY_APP } from "@/lib/study-app";
import AppPracticeBlock from "@/components/study/AppPracticeBlock";
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { SITE_URL } from "@/lib/site";

// Hub for the Years 7 to 10 maths topic pages. The free worksheet
// builder that used to live here was removed (Oct 2026): practice now
// happens in the Tuterly app, so every call to action is the app.

const TITLE = "Maths by Topic, Years 7 to 10 (Victorian Curriculum)";
const DESCRIPTION =
  "Every major Years 7 to 10 maths topic in the Victorian Curriculum: what's covered, common mistakes, and practice tests with worked solutions in the Tuterly app.";
const URL = `${SITE_URL}/worksheets`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};


// Marketing palette, matched to app/parents/page.js.
const c = {
  teal: "var(--brand-text)",
  tealDeep: "var(--brand-text)",
  tealBright: "var(--brand)",
  tealPale: "var(--brand-soft)",
  ink: "var(--foreground)",
  navy: "var(--foreground)",
  text: "var(--foreground)",
  textLight: "var(--muted)",
  textMuted: "var(--muted)",
  white: "var(--card)",
  paper: "var(--background)",
  sand: "var(--surface-soft)",
  border: "var(--border)",
  amber: "var(--xp)",
};

const sans = "var(--font-display)";

// Year-level groups for the topic grid below the generator.
const GRID_YEARS = ["Year 7", "Year 8", "Year 9", "Year 10"];

export default function WorksheetsPage() {
  return (
    <div style={{ fontFamily: sans, color: c.text, background: c.white, overflowX: "hidden" }}>
      <style>{`
        ::selection { background: ${c.tealPale}; color: ${c.ink}; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @media(max-width:768px) {
          .ws-hero { padding: 120px 20px 44px !important; }
          .ws-hero h1 { font-size: 38px !important; }
          .ws-section { padding-left: 20px !important; padding-right: 20px !important; }
          .ws-nav { padding: 0 16px !important; }
          .ws-nav-links a:not(.ws-nav-cta) { display: none; }
        }
      `}</style>

      {/* NAV */}
      <MarketingNav />

      {/* HERO */}
      <section className="ws-hero" style={{ padding: "56px 40px 60px", background: "linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 100%)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", animation: "fadeUp 0.8s ease" }}>
          <p style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", color: c.tealDeep, marginBottom: 16 }}>
            Years 7 to 10 maths
          </p>
          <h1 style={{ fontWeight: 800, fontSize: 52, color: c.ink, lineHeight: 1.1, letterSpacing: "-1.4px", marginBottom: 20 }}>
            Maths by topic,{" "}
            <span style={{ color: c.teal }}>Years 7 to 10</span>.
          </h1>
          <p style={{ fontSize: 17.5, color: c.textLight, lineHeight: 1.7, maxWidth: 540, margin: "0 auto 22px" }}>
            Every major topic in the Victorian Curriculum, with what it covers and
            where students usually slip. Practise any of them in {STUDY_APP.name}.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <p style={{ fontSize: 13, color: c.textLight, fontWeight: 500 }}>
              Designed by Australian educators at Bayside Academics
            </p>
          </div>
        </div>
      </section>

      <div className="ws-section" style={{ padding: "8px 24px 56px" }}>
        <AppPracticeBlock placement="worksheets_index_practice" />
      </div>


      {/* TOPIC GRID */}
      <section className="ws-section" style={{ background: c.paper, borderTop: `1px solid ${c.border}`, padding: "72px 40px 88px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", color: c.tealDeep, marginBottom: 14 }}>
              Browse by topic
            </p>
            <h2 style={{ fontSize: 34, fontWeight: 800, color: c.ink, letterSpacing: "-0.8px", lineHeight: 1.18, margin: "0 0 14px" }}>
              Pick a topic
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, maxWidth: 540, margin: "0 auto" }}>
              What each topic covers, the mistakes students usually make, and the
              questions parents ask.
            </p>
          </div>

          <div style={{ display: "grid", gap: 32 }}>
            {GRID_YEARS.map((year) => {
              const items = WORKSHEET_LANDING_PAGES.filter(
                (p) => p.yearLevel === year
              );
              if (items.length === 0) return null;
              const anchorId = `year-${year.split(" ")[1]}`;
              return (
                <div key={year} id={anchorId} style={{ scrollMarginTop: 100 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: c.ink, letterSpacing: "-0.4px", margin: 0 }}>
                      {year}
                    </h3>
                    <span style={{ fontSize: 12.5, color: c.textMuted }}>
                      {items.length} topics
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                    {items.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/worksheets/${p.slug}`}
                        style={{ display: "block", padding: "18px 20px", background: c.white, border: `1px solid ${c.border}`, borderRadius: 14, textDecoration: "none", boxShadow: "0 1px 2px rgba(15,23,42,0.03)" }}
                      >
                        <p style={{ fontSize: 11, fontWeight: 700, color: c.tealDeep, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 6 }}>
                          {year}
                        </p>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: c.ink, lineHeight: 1.35, margin: 0 }}>
                          {p.topic}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <AppCtaBand placement="worksheets_index_final" />
      <MarketingFooter />
    </div>
  );
}

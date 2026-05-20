import Link from "next/link";
import { getTopicGroupsForLevel } from "@/lib/curriculum-topics";
import WorksheetGenerator from "@/components/WorksheetGenerator";
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { SITE_URL } from "@/lib/site";

// Public landing page for the free maths worksheet generator. Pre-computes
// the VCAA F-10 topic list for every Year 3-10 level so the client-side
// dropdown is instant.

const TITLE = "Free Maths Worksheets - Year 3 to Year 10 | Tuterly";
const DESCRIPTION =
  "Generate a free, VCAA-aligned maths worksheet for Year 3 through Year 10. 10 questions with worked solutions, downloadable as PDF.";
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

const YEAR_LEVELS = [
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
];

const c = {
  teal: "#0ABAB5",
  tealLight: "#2DD4BF",
  tealDark: "#0D9488",
  tealPale: "#F0FDFA",
  navy: "#0F172A",
  text: "#1E293B",
  textLight: "#64748B",
  textMuted: "#94A3B8",
  white: "#FFFFFF",
  offWhite: "#F8FAFC",
  border: "#E2E8F0",
};

// Year-level groups for the topic grid below the generator. Each year
// pulls from WORKSHEET_LANDING_PAGES so the section automatically
// grows as new landing pages are added.
const GRID_YEARS = ["Year 7", "Year 8", "Year 9", "Year 10"];

export default function WorksheetsPage() {
  // Build { "Year 3": [{ strand, topics }], ... } server-side. The trimmed
  // short labels come from lib/curriculum-topics.js so the dropdown is
  // already tidy.
  const topicsByYear = Object.fromEntries(
    YEAR_LEVELS.map((y) => [y, getTopicGroupsForLevel(y, "maths", [y])])
  );

  return (
    <div
      style={{
        background: c.white,
        color: c.text,
        minHeight: "100vh",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <Nav />

      <section
        style={{
          padding: "120px 24px 60px",
          background: `linear-gradient(180deg, ${c.white} 0%, ${c.tealPale} 100%)`,
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: c.teal,
              textTransform: "uppercase",
              letterSpacing: 2,
              marginBottom: 12,
            }}
          >
            Free practice
          </p>
          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 44,
              color: c.navy,
              lineHeight: 1.15,
              margin: "0 0 16px",
            }}
          >
            Free maths worksheets, Year 3 to Year 10
          </h1>
          <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.6, margin: 0 }}>
            10 questions, fully worked solutions, aligned to the Victorian
            Curriculum. Generate one now - no signup required, free for
            everyone.
          </p>
        </div>
      </section>

      <main
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "20px 24px 40px",
        }}
      >
        <WorksheetGenerator topicsByYear={topicsByYear} />
      </main>

      <section
        style={{
          background: c.offWhite,
          borderTop: `1px solid ${c.border}`,
          padding: "60px 24px 80px",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: c.teal,
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 10,
              }}
            >
              Browse by topic
            </p>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 32,
                color: c.navy,
                lineHeight: 1.2,
                margin: "0 0 12px",
              }}
            >
              Topic-specific worksheet pages
            </h2>
            <p
              style={{
                fontSize: 15,
                color: c.textLight,
                lineHeight: 1.6,
                maxWidth: 540,
                margin: "0 auto",
              }}
            >
              Pre-configured worksheet generators for every major Year 7-10 maths topic. Tap a topic to land on a page with the generator already set up.
            </p>
          </div>

          <div style={{ display: "grid", gap: 28 }}>
            {GRID_YEARS.map((year) => {
              const items = WORKSHEET_LANDING_PAGES.filter(
                (p) => p.yearLevel === year
              );
              if (items.length === 0) return null;
              const anchorId = `year-${year.split(" ")[1]}`;
              return (
                <div key={year} id={anchorId} style={{ scrollMarginTop: 100 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 10,
                      marginBottom: 14,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 16,
                        fontWeight: 700,
                        color: c.navy,
                        margin: 0,
                      }}
                    >
                      {year}
                    </h3>
                    <span
                      style={{
                        fontSize: 12,
                        color: c.textMuted,
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {items.length} topics
                    </span>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                      gap: 10,
                    }}
                  >
                    {items.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/worksheets/${p.slug}`}
                        style={{
                          display: "block",
                          padding: "14px 16px",
                          background: c.white,
                          border: `1px solid ${c.border}`,
                          borderRadius: 12,
                          textDecoration: "none",
                          transition: "border-color 120ms ease, transform 120ms ease",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 11,
                            fontWeight: 600,
                            color: c.tealDark,
                            textTransform: "uppercase",
                            letterSpacing: 1.5,
                            marginBottom: 4,
                          }}
                        >
                          Worksheet
                        </p>
                        <p
                          style={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: c.navy,
                            lineHeight: 1.35,
                            margin: 0,
                          }}
                        >
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

      <footer
        style={{
          borderTop: `1px solid ${c.border}`,
          padding: "32px 24px",
          textAlign: "center",
          color: c.textLight,
          fontSize: 13,
        }}
      >
        Built by Tuterly · <a href="/privacy" style={{ color: c.textLight }}>Privacy</a> · <a href="/terms" style={{ color: c.textLight }}>Terms</a>
      </footer>
    </div>
  );
}

function Nav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${c.border}`,
        padding: "0 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 64,
        }}
      >
        <a
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${c.teal}, ${c.tealLight})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 700,
              color: c.white,
            }}
          >
            T
          </div>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: c.navy,
            }}
          >
            tuterly
          </span>
        </a>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a
            href="/parents"
            style={{
              padding: "9px 16px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              color: c.textLight,
              textDecoration: "none",
            }}
          >
            For Parents
          </a>
          <a
            href="/worksheets"
            style={{
              padding: "9px 16px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              color: c.teal,
              textDecoration: "none",
            }}
          >
            Free Worksheets
          </a>
          <a
            href="/directory"
            style={{
              padding: "9px 16px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              color: c.textLight,
              textDecoration: "none",
            }}
          >
            Find a Tutor
          </a>
          <a
            href="/tutors"
            style={{
              padding: "9px 16px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              color: c.textLight,
              textDecoration: "none",
            }}
          >
            Apply as a Tutor
          </a>
          <a
            href="https://app.tuterly.com.au"
            style={{
              padding: "9px 16px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              color: c.textLight,
              textDecoration: "none",
            }}
          >
            Log in
          </a>
          <a
            href="https://app.tuterly.com.au"
            style={{
              padding: "9px 20px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              background: c.navy,
              color: c.white,
              textDecoration: "none",
            }}
          >
            Sign up free
          </a>
        </div>
      </div>
    </nav>
  );
}

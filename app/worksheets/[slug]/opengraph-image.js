import { ImageResponse } from "next/og";
import { getLandingPageBySlug } from "@/lib/worksheet-landing-pages";

// Per-topic OG image, generated at build time. Lifts shared-link CTR
// in iMessage / Slack / Twitter / Pinterest by replacing the generic
// site logo with a teal/navy card showing the topic name + year
// level. The page's own opengraph metadata.url stays in sync because
// the route handler emits the correct og:image tag automatically.

export const runtime = "edge";
export const alt = "Free Tuterly maths worksheet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLOURS = {
  navy: "#0F172A",
  teal: "#0ABAB5",
  tealDark: "#0D9488",
  tealPale: "#F0FDFA",
  white: "#FFFFFF",
  cream: "#FFFBF5",
  textLight: "#64748B",
  border: "#E2E8F0",
};

export default async function OpengraphImage({ params }) {
  const { slug } = await params;
  const page = getLandingPageBySlug(slug);
  const yearLevel = page?.yearLevel ?? "Year 7-10";
  const topic = page?.topic ?? "Maths practice";
  const h1 = page?.h1 ?? "Free maths worksheets";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${COLOURS.cream} 0%, ${COLOURS.tealPale} 100%)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* TOP ROW: brand + year-level chip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${COLOURS.teal}, #2DD4BF)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: COLOURS.white,
                fontSize: 30,
                fontWeight: 800,
              }}
            >
              T
            </div>
            <p
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: COLOURS.navy,
                letterSpacing: -0.5,
                margin: 0,
              }}
            >
              tuterly
            </p>
          </div>
          <div
            style={{
              padding: "12px 22px",
              borderRadius: 999,
              background: COLOURS.navy,
              color: COLOURS.white,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
            }}
          >
            {yearLevel}
          </div>
        </div>

        {/* MIDDLE: topic + h1 */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: COLOURS.tealDark,
              textTransform: "uppercase",
              letterSpacing: 3,
              margin: 0,
              marginBottom: 18,
            }}
          >
            Free practice
          </p>
          <p
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: COLOURS.navy,
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {topic}
          </p>
          <p
            style={{
              fontSize: 30,
              color: COLOURS.textLight,
              marginTop: 22,
              maxWidth: 980,
              lineHeight: 1.35,
            }}
          >
            Worksheets &amp; practice tests, Victorian Curriculum aligned.
          </p>
        </div>

        {/* BOTTOM: trust strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 26,
            borderTop: `2px solid ${COLOURS.border}`,
          }}
        >
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <p style={{ fontSize: 22, color: COLOURS.navy, fontWeight: 600 }}>
              10 questions
            </p>
            <p style={{ fontSize: 22, color: COLOURS.border }}>•</p>
            <p style={{ fontSize: 22, color: COLOURS.navy, fontWeight: 600 }}>
              Fully worked solutions
            </p>
            <p style={{ fontSize: 22, color: COLOURS.border }}>•</p>
            <p style={{ fontSize: 22, color: COLOURS.navy, fontWeight: 600 }}>
              Free
            </p>
          </div>
          <p style={{ fontSize: 22, color: COLOURS.textLight }}>
            tuterly.com.au
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}

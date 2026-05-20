import { ImageResponse } from "next/og";

// OG image for the ATAR planner. Shared link previews in iMessage,
// Twitter, Facebook etc. show this card instead of the generic site
// logo, which materially lifts CTR for Year 11/12 student shares.

export const runtime = "edge";
export const alt = "Tuterly free ATAR course planner";
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

export default function OpengraphImage() {
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
            2025 VTAC data
          </div>
        </div>

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
            Free ATAR course planner
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
            See your ATAR. Check your prereqs.
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
            Plan VCE subjects against the courses you want, with the official
            VTAC scaling.
          </p>
        </div>

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
              123 courses
            </p>
            <p style={{ fontSize: 22, color: COLOURS.border }}>•</p>
            <p style={{ fontSize: 22, color: COLOURS.navy, fontWeight: 600 }}>
              Compare up to 5
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

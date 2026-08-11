import Fade from "./Fade";
import { c as defaultPalette } from "./theme";
import { getTestimonials } from "@/lib/testimonials";

// Parent testimonial sections for the marketing surface.
//
// Three variants, all fed from lib/testimonials.js:
//   "feature" - one large pull-quote plus supporting cards. Use high on
//               /parents and the marketing root, where the job is to stop
//               the scroll.
//   "grid"    - even cards. Use on suburb and comparison pages.
//   "strip"   - compact row of short quotes. Use immediately above a
//               pricing or enquiry CTA as a last-look reassurance.
//
// Renders null when there is nothing consented to show, so pages degrade
// cleanly rather than shipping an empty heading.

// The /parents page carries its own local palette with different token
// names (ink/paper/sand) to the shared theme.js one (navy/offWhite).
// Resolve defensively so either can be passed straight in.
function resolve(p = {}) {
  return {
    teal: p.tealDeep || p.teal || defaultPalette.teal,
    tealBright: p.tealBright || p.tealLight || defaultPalette.tealLight,
    tealPale: p.tealPale || defaultPalette.tealPale,
    ink: p.ink || p.navy || defaultPalette.navy,
    text: p.text || defaultPalette.text,
    textLight: p.textLight || defaultPalette.textLight,
    textMuted: p.textMuted || defaultPalette.textMuted,
    white: p.white || defaultPalette.white,
    soft: p.paper || p.offWhite || defaultPalette.offWhite,
    border: p.border || p.borderWarm || defaultPalette.border,
    amber: p.amber || defaultPalette.amber,
  };
}

function initials(name = "") {
  return name.trim().charAt(0).toUpperCase() || "?";
}

// Builds the "Year 9 Maths, Brighton" context line under the name. Only
// includes the fields that are actually present.
function contextLine(t) {
  return [t.yearLevel, t.subject, t.suburb].filter(Boolean).join(" · ");
}

function Stars({ rating, color }) {
  if (!rating) return null;
  return (
    <div style={{ display: "flex", gap: 2, marginBottom: 10 }} aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill={i < rating ? color : "none"} stroke={color} strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ t, k }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 40,
        height: 40,
        flexShrink: 0,
        borderRadius: "50%",
        background: k.tealPale,
        border: `1px solid ${k.border}`,
        color: k.teal,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 15,
      }}
    >
      {initials(t.author)}
    </div>
  );
}

function Attribution({ t, k, light = false }) {
  const ctx = contextLine(t);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11, marginTop: 18 }}>
      <Avatar t={t} k={k} />
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: light ? k.white : k.ink, lineHeight: 1.35 }}>
          {t.author}
          {t.role && t.role !== "Parent" ? `, ${t.role.toLowerCase()}` : ""}
        </p>
        {ctx && (
          <p style={{ fontSize: 12.5, color: light ? "rgba(255,255,255,0.6)" : k.textLight, lineHeight: 1.4 }}>
            {ctx}
          </p>
        )}
      </div>
    </div>
  );
}

// Small "we can prove this" marker. Only shown when we know where the
// quote came from, so it never overstates what has been verified.
function VerifiedTag({ t, k }) {
  if (!t.source) return null;
  const label = t.source === "google" ? "Google review" : "Verified parent";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11.5,
        fontWeight: 600,
        color: k.teal,
        background: k.tealPale,
        border: `1px solid ${k.border}`,
        borderRadius: 999,
        padding: "3px 9px",
      }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={k.teal} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m5 12.5 4.5 4.5L19 7.5" />
      </svg>
      {label}
    </span>
  );
}

function ResultChip({ t, k }) {
  if (!t.result) return null;
  return (
    <p
      style={{
        display: "inline-block",
        fontSize: 12.5,
        fontWeight: 600,
        color: k.ink,
        background: k.soft,
        border: `1px solid ${k.border}`,
        borderRadius: 8,
        padding: "5px 10px",
        marginTop: 14,
      }}
    >
      {t.result}
    </p>
  );
}

function Card({ t, k, fonts, delay }) {
  return (
    <Fade delay={delay}>
      <figure
        style={{
          background: k.white,
          border: `1px solid ${k.border}`,
          borderRadius: 18,
          padding: "26px 24px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          margin: 0,
        }}
      >
        <Stars rating={t.rating} color={k.amber} />
        <blockquote
          style={{
            fontFamily: fonts.body,
            fontSize: 15.5,
            color: k.text,
            lineHeight: 1.7,
            margin: 0,
            flex: 1,
          }}
        >
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <ResultChip t={t} k={k} />
        <figcaption>
          <Attribution t={t} k={k} />
        </figcaption>
      </figure>
    </Fade>
  );
}

function FeatureCard({ t, k, fonts }) {
  return (
    <Fade>
      <figure
        style={{
          background: k.ink,
          borderRadius: 22,
          padding: "40px 38px",
          margin: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -30,
            right: 18,
            fontFamily: fonts.heading,
            fontSize: 170,
            lineHeight: 1,
            color: "rgba(255,255,255,0.06)",
            pointerEvents: "none",
          }}
        >
          &rdquo;
        </div>
        <Stars rating={t.rating} color={k.amber} />
        <blockquote
          style={{
            fontFamily: fonts.heading,
            fontSize: 25,
            fontWeight: 600,
            color: k.white,
            lineHeight: 1.45,
            letterSpacing: "-0.4px",
            margin: 0,
            maxWidth: 640,
            position: "relative",
          }}
        >
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        {t.result && (
          <p style={{ fontSize: 13.5, fontWeight: 600, color: k.tealBright, marginTop: 18 }}>
            {t.result}
          </p>
        )}
        <figcaption>
          <Attribution t={t} k={k} light />
        </figcaption>
      </figure>
    </Fade>
  );
}

export default function Testimonials({
  variant = "grid",
  tags,
  suburb,
  suburbOnly = false,
  limit,
  kicker = "What parents say",
  heading = "Parents who stopped wondering what happens in the session.",
  sub,
  palette,
  background,
  padding = "88px 40px",
  headingFont,
  bodyFont,
  maxWidth = 1040,
}) {
  const k = resolve(palette);
  const fonts = {
    heading: headingFont || "'DM Serif Display', serif",
    body: bodyFont || "'DM Sans', sans-serif",
  };

  const defaultLimit = variant === "feature" ? 3 : variant === "strip" ? 3 : 3;
  const items = getTestimonials({ tags, suburb, suburbOnly, limit: limit ?? defaultLimit });
  if (!items.length) return null;

  if (variant === "strip") {
    return (
      <section style={{ padding: "0 40px", background: background || "transparent" }}>
        <div style={{ maxWidth, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(auto-fit, minmax(240px, 1fr))`,
              gap: 14,
            }}
          >
            {items.map((t, i) => (
              <Fade key={t.id} delay={0.04 * i}>
                <figure
                  style={{
                    background: k.soft,
                    border: `1px solid ${k.border}`,
                    borderRadius: 14,
                    padding: "16px 18px",
                    margin: 0,
                    height: "100%",
                  }}
                >
                  <blockquote style={{ fontFamily: fonts.body, fontSize: 14, color: k.text, lineHeight: 1.6, margin: 0 }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption style={{ fontSize: 12.5, fontWeight: 600, color: k.textLight, marginTop: 10 }}>
                    {t.author}
                    {contextLine(t) ? ` · ${contextLine(t)}` : ""}
                  </figcaption>
                </figure>
              </Fade>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const [lead, ...rest] = items;

  return (
    <section style={{ padding, background: background || k.white }}>
      <div style={{ maxWidth, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            {kicker && (
              <p
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: "0.7px",
                  textTransform: "uppercase",
                  color: k.teal,
                  marginBottom: 14,
                }}
              >
                {kicker}
              </p>
            )}
            <h2
              style={{
                fontFamily: fonts.heading,
                fontSize: 36,
                fontWeight: 700,
                color: k.ink,
                lineHeight: 1.2,
                letterSpacing: "-0.8px",
                maxWidth: 660,
                margin: "0 auto",
              }}
            >
              {heading}
            </h2>
            {sub && (
              <p style={{ fontFamily: fonts.body, fontSize: 15.5, color: k.textLight, lineHeight: 1.75, maxWidth: 560, margin: "14px auto 0" }}>
                {sub}
              </p>
            )}
          </div>
        </Fade>

        {variant === "feature" ? (
          <>
            <FeatureCard t={lead} k={k} fonts={fonts} />
            {rest.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 16,
                  marginTop: 16,
                }}
              >
                {rest.map((t, i) => (
                  <Card key={t.id} t={t} k={k} fonts={fonts} delay={0.05 + i * 0.05} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {items.map((t, i) => (
              <Card key={t.id} t={t} k={k} fonts={fonts} delay={0.05 + i * 0.05} />
            ))}
          </div>
        )}

        <Fade delay={0.15}>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
            <VerifiedTag t={items[0]} k={k} />
          </div>
        </Fade>
      </div>
    </section>
  );
}

import Fade from "./Fade";
import { c } from "./theme";
import { EDUCOURSE_URL } from "@/lib/site";

// Sister-platform callout on the prep landing pages. Positioned as a
// Tuterly-customer perk rather than a separate product, so this
// section reinforces signing up with Tuterly instead of pulling
// visitors away to Educourse.
export default function EducourseCallout({
  background = c.tealPale,
  padding = "72px 24px",
}) {
  return (
    <section style={{ padding, background }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Fade>
          <div style={{ background: c.white, borderRadius: 20, padding: "32px 28px", border: `2px solid ${c.teal}`, boxShadow: "0 12px 36px rgba(10,186,181,0.08)" }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>Included with Tuterly</p>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: c.navy, marginBottom: 14, lineHeight: 1.3 }}>
              Discounted Educourse - Australia&apos;s #1 selective entry &amp; scholarship platform.
            </h3>
            <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, marginBottom: 20 }}>
              Every Tuterly customer gets discounted access to Educourse, the leading Australian platform for scholarship and selective entry preparation - from the same team behind Tuterly. Pair daily Educourse practice with a Tuterly tutor and your child has structured drilling all week plus 1-on-1 guidance to debrief what&apos;s still confusing.
            </p>
            <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, marginBottom: 24 }}>
              {[
                "Full mock exams under timed conditions",
                "Daily question drills sorted by topic and difficulty",
                "Worked solutions so your child can self-mark and identify weak areas",
              ].map((line) => (
                <li key={line} style={{ display: "flex", gap: 10, alignItems: "start" }}>
                  <span style={{ color: c.teal, fontWeight: 700, fontSize: 14, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 14, color: c.text }}>{line}</span>
                </li>
              ))}
            </ul>
            <a
              href={EDUCOURSE_URL}
              style={{ display: "inline-block", padding: "12px 24px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 14, fontWeight: 600, textDecoration: "none" }}
            >
              See Educourse →
            </a>
          </div>
        </Fade>
      </div>
    </section>
  );
}

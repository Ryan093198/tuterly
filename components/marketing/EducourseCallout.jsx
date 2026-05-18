import Fade from "./Fade";
import { c } from "./theme";
import { EDUCOURSE_URL } from "@/lib/site";

// Sister-platform callout. Used on the selective-entry and
// scholarship prep pages to point families at Educourse for daily
// self-serve practice between Tuterly sessions.
export default function EducourseCallout({
  background = c.tealPale,
  padding = "72px 24px",
}) {
  return (
    <section style={{ padding, background }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Fade>
          <div style={{ background: c.white, borderRadius: 20, padding: "32px 28px", border: `2px solid ${c.teal}`, boxShadow: "0 12px 36px rgba(10,186,181,0.08)" }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>From our sister platform</p>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: c.navy, marginBottom: 14, lineHeight: 1.3 }}>
              Self-paced practice between sessions.
            </h3>
            <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, marginBottom: 20 }}>
              Educourse is our self-serve selective entry and scholarship preparation platform — daily question drills, mock exams, and structured content from the same team behind Tuterly. Pair it with a Tuterly tutor and your child has 1-on-1 support plus structured practice every day.
            </p>
            <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, marginBottom: 24 }}>
              {[
                "Past papers and mock exams in test conditions",
                "Daily practice questions sorted by topic and difficulty",
                "Worked solutions so your child can self-mark",
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
              Visit Educourse →
            </a>
          </div>
        </Fade>
      </div>
    </section>
  );
}

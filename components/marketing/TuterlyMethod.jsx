import Fade from "./Fade";
import { c } from "./theme";

// Four-pillar "how Tuterly is different from a regular tutoring
// service" section. Drop into any marketing page above the savings
// calculator to set up the conversion story.
const PILLARS = [
  {
    icon: "📝",
    title: "A report after every session",
    body: "Most agencies hand parents a generic invoice and a vague \"went well\". Tuterly tutors submit structured notes and the platform turns them into a session report covering what was taught, how your child went, and what to focus on next — every single lesson.",
  },
  {
    icon: "📈",
    title: "Progress you can actually see",
    body: "Each topic your child works on is rated for confidence and tracked over time. After a few sessions you can see, on a single page, which areas have moved and which still need work — instead of guessing whether the tutoring is doing anything.",
  },
  {
    icon: "🧠",
    title: "Practice questions, automatically",
    body: "Tuterly generates worksheets on the exact topics your tutor covered, so the learning doesn't stop when the session ends. Worked solutions included — your child can attempt the questions, check answers, and bring anything they got stuck on to the next session.",
  },
];

export default function TuterlyMethod({ background = c.white, padding = "80px 40px" }) {
  return (
    <section style={{ padding, background }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Fade>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>The Tuterly method</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 12, lineHeight: 1.25 }}>
            How Tuterly is different from a regular tutoring service.
          </h2>
          <p style={{ fontSize: 15, color: c.textLight, textAlign: "center", maxWidth: 640, margin: "0 auto 48px", lineHeight: 1.7 }}>
            Most tutoring services take a fee, book you a tutor, and leave you in the dark about everything else. Tuterly is built around the four things parents actually want from tutoring — visibility, progress, follow-through, and a fair price.
          </p>
        </Fade>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {PILLARS.map((p, i) => (
            <Fade key={p.title} delay={0.05 + i * 0.05}>
              <div style={{ background: c.offWhite, borderRadius: 18, border: `1px solid ${c.border}`, padding: "24px 22px", height: "100%" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: c.navy, marginBottom: 8, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}>{p.body}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

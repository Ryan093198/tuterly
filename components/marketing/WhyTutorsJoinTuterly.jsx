import Fade from "./Fade";
import { c } from "./theme";

// Shared "Why tutors join Tuterly" section, dropped onto every
// tutor-facing page so the pitch stays consistent. Four pillars:
// training, tools, demand, autonomy - in that order, because that's
// the order the value lands for a new tutor (we train you → equip
// you → bring you students → you keep everything).
const PILLARS = [
  {
    icon: "🎓",
    title: "We help you become a great tutor.",
    body: "Structured onboarding, practical training, and ongoing support so you're not just winging it - you're delivering real results for your students.",
  },
  {
    icon: "🛠️",
    title: "Professional tools, built in.",
    body: "Session reports, practice-worksheet generators, progress dashboards, and parent messaging - the kind of systems only top tutoring companies use. You get them from day one.",
  },
  {
    icon: "📥",
    title: "Parents find you.",
    body: "Our parent-facing directory drives sign-ups straight to your profile. No chasing referrals, no spending on ads.",
  },
  {
    icon: "💵",
    title: "Your rate. Your schedule.",
    body: "Set your own price, keep everything you earn. Online or in-person, whatever hours work for you.",
  },
];

export default function WhyTutorsJoinTuterly({
  background = c.offWhite,
  padding = "80px 24px",
}) {
  return (
    <section style={{ padding, background }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Fade>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>Why tutors join Tuterly</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 48, lineHeight: 1.25 }}>
            Free training and onboarding. Full independence.
          </h2>
        </Fade>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {PILLARS.map((p, i) => (
            <Fade key={p.title} delay={0.05 + i * 0.05}>
              <div style={{ background: c.white, borderRadius: 18, border: `1px solid ${c.border}`, padding: "24px 22px", height: "100%" }}>
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

import AppCtaBand from "@/components/study/AppCtaBand";
import { AppHeroBlock, AppLowerCostSection } from "@/components/study/TutoringPageApp";
import { SITE_URL } from "@/lib/site";
import { STUDY_APP } from "@/lib/study-app";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "Tutor Doctor Alternative: In-Home Tutoring vs the Tuterly Study App";
const DESCRIPTION =
  "Comparing Tutor Doctor’s in-home tutoring franchise with Tuterly Study, an iPhone app for Years 7 to 10 maths practice. What each does, what each costs, and when Tutor Doctor is the better fit.";
const URL = `${SITE_URL}/tutor-doctor-alternative`;

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

// Every cell must stay true. Tutor Doctor facts are limited to what this
// page already said about Tutor Doctor; nothing new is claimed about them.
const COMPARISON_ROWS = [
  { label: "What it is", app: "An iPhone app for maths practice", competitor: "A tutoring franchise with local franchisees" },
  { label: "Live sessions with a tutor", app: "No", competitor: "Yes" },
  { label: "In-home tutoring", app: "No", competitor: "Yes" },
  { label: "Who explains a new topic", app: "No live teacher. Worked solutions, Explain this and Study notes", competitor: "Your matched tutor" },
  { label: "Getting started", app: "Open the app and snap a question. Nothing to book", competitor: "Fill in a form, the local franchisee calls back and matches a tutor" },
  { label: "Practice on the exact questions your child got wrong", app: "Yes: snap it, then similar questions until it’s mastered", competitor: "You can bring them to a session" },
  { label: "When it happens", app: "Any day, a few minutes at a time, on their iPhone", competitor: "At booked session times" },
  { label: "What parents see", app: "Week in review: questions added and mastered, test scores, trickiest topic", competitor: "Ask your local franchisee" },
  { label: "Covers", app: "Years 7 to 10 maths only", competitor: "Check with your local franchisee" },
  { label: "Cost", app: "1-week free trial, then $7.99 a week", competitor: "Set by the franchisee, typically $80 to $130 an hour" },
];

function SideBySide({ rows, competitorName }) {
  return (
    <Fade delay={0.1}>
      <div style={{ background: c.white, borderRadius: 20, padding: "28px 22px", border: `1px solid ${c.border}`, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: 520 }}>
          <caption style={{ captionSide: "top", textAlign: "left", fontSize: 13, color: c.textMuted, paddingBottom: 14 }}>
            {`${STUDY_APP.name} and ${competitorName} do different jobs. This is what each one does.`}
          </caption>
          <thead>
            <tr>
              <th scope="col" style={{ padding: "10px 8px", borderBottom: `1px solid ${c.border}`, width: "30%" }} />
              <th scope="col" style={{ padding: "10px 8px", fontSize: 12, fontWeight: 700, color: c.teal, textTransform: "uppercase", letterSpacing: 1, borderBottom: `1px solid ${c.border}` }}>{STUDY_APP.name}</th>
              <th scope="col" style={{ padding: "10px 8px", fontSize: 12, fontWeight: 700, color: c.textMuted, textTransform: "uppercase", letterSpacing: 1, borderBottom: `1px solid ${c.border}` }}>{competitorName}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" style={{ padding: "12px 8px", fontSize: 14, fontWeight: 600, color: c.navy, borderBottom: `1px solid ${c.border}`, verticalAlign: "top" }}>{row.label}</th>
                <td style={{ padding: "12px 8px", fontSize: 14, color: c.text, lineHeight: 1.5, borderBottom: `1px solid ${c.border}`, verticalAlign: "top" }}>{row.app}</td>
                <td style={{ padding: "12px 8px", fontSize: 14, color: c.textLight, lineHeight: 1.5, borderBottom: `1px solid ${c.border}`, verticalAlign: "top" }}>{row.competitor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fade>
  );
}

function BulletList({ items, color }) {
  return (
    <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item) => (
        <li key={item} style={{ fontSize: 14, color: c.text, lineHeight: 1.55, paddingLeft: 16, position: "relative" }}>
          <span aria-hidden="true" style={{ position: "absolute", left: 0, color }}>•</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function TutorDoctorAlternativePage() {
  return (
    <main style={{ background: c.white, fontFamily: "var(--font-display)", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Tutor Doctor alternative</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Considering Tutor Doctor? Here’s how it compares with Tuterly Study.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Tutor Doctor and {STUDY_APP.name} do two different jobs. Tutor Doctor is a global tutoring franchise: a local franchisee matches a tutor to your child, often for in-home lessons. {STUDY_APP.name} is an iPhone app for Years 7 to 10 maths, where your child practises the exact questions they get wrong. Both have their place. This page is an honest comparison.
            </p>
            <AppHeroBlock placement="tutor_doctor_alternative_hero" />
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>The franchise model</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              How Tutor Doctor works.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              Tutor Doctor runs as a franchise. Each metropolitan area has a local franchisee who buys the brand, recruits tutors locally, and handles all the customer-facing operations. When you enquire, you’re really enquiring with your area’s franchise owner, who then matches a tutor from their roster to your child.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              The model’s strength is the hands-off matching experience: you fill out a form, someone calls you back, a tutor turns up. Pricing is set by the franchisee and typically ranges from $80 to $130 an hour depending on year level and subject.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>The app</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              How Tuterly Study works.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              {STUDY_APP.name} isn’t a tutor and doesn’t send one to your home. It’s for the practice that happens between lessons, or instead of them when that’s what your child mostly needs. They snap a maths question they got wrong (or upload a whole marked test), see the full worked solution when they’re ready, and straight away get a similar question on the same idea. Each one they get right earns a star, and three stars means it’s mastered.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              They can also use Test any topic for a short test on any topic in their year, Fix my mistakes to work through the questions they got wrong, and Study notes for a revision sheet before a test. Parents link with a 6-character code and see Week in review: what was added and mastered, test scores and the trickiest topic, not their child’s photos.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              It was designed by Australian educators at Bayside Academics, one of the leading tutoring companies in Melbourne, with topics from the Victorian Curriculum 2.0. It’s a 1-week free trial, then $7.99 a week, cancel any time. Coming soon to the App Store.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>Side by side</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, textAlign: "center", marginBottom: 32, lineHeight: 1.25 }}>
              Tuterly Study vs Tutor Doctor.
            </h2>
          </Fade>
          <SideBySide rows={COMPARISON_ROWS} competitorName="Tutor Doctor" />
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
            <Fade>
              <div style={{ background: c.offWhite, borderRadius: 16, border: `1px solid ${c.border}`, padding: "24px 24px", height: "100%" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, color: c.amber, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Tutor Doctor is the better fit if</p>
                <BulletList
                  color={c.amber}
                  items={[
                    "Your child needs a person to teach them, sitting beside them",
                    "You want someone else to handle every detail of matching and onboarding",
                    "You want in-home tutoring from a brand that’s been doing it for decades",
                    "They need help outside Years 7 to 10 maths",
                  ]}
                />
              </div>
            </Fade>
            <Fade delay={0.1}>
              <div style={{ background: c.tealPale, borderRadius: 16, border: `2px solid ${c.teal}`, padding: "24px 24px", height: "100%" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Try Tuterly Study if</p>
                <BulletList
                  color={c.teal}
                  items={[
                    "Your child is in Years 7 to 10 and keeps getting the same kinds of maths questions wrong",
                    "What they mostly need is practice on their own mistakes, not another lesson",
                    "You want something they can do any day, without booking a time",
                    "You’d like a weekly view of what was added and mastered",
                  ]}
                />
              </div>
            </Fade>
          </div>
          <Fade delay={0.15}>
            <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, textAlign: "center", maxWidth: 680, margin: "24px auto 0" }}>
              Or use both. A tutor teaches the topic, and {STUDY_APP.name} keeps the questions your child got wrong coming back until they’re mastered. Tutors can link to the app, see the bank before a session and set snap goals.
            </p>
          </Fade>
        </div>
      </section>

      <AppLowerCostSection competitor="Tutor Doctor" placement="tutor_doctor_alternative_lower_cost" />

      <AppCtaBand placement="tutor_doctor_alternative_final" />
      <MarketingFooter />
    </main>
  );
}

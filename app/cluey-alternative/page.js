import AppCtaBand from "@/components/study/AppCtaBand";
import { AppHeroBlock, AppLowerCostSection } from "@/components/study/TutoringPageApp";
import { SITE_URL } from "@/lib/site";
import { STUDY_APP } from "@/lib/study-app";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "Cluey Alternative: Cluey Tutoring vs the Tuterly App";
const DESCRIPTION =
  "Comparing Cluey Learning with Tuterly, an iPhone app for Years 7 to 10 maths. What each one does, what each costs, and when Cluey is the better choice.";
const URL = `${SITE_URL}/cluey-alternative`;

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

// Every cell must stay true. Cluey facts are limited to what this page
// already said about Cluey; nothing new is claimed about them.
const COMPARISON_ROWS = [
  { label: "What it is", app: "An iPhone app for maths practice", competitor: "Online tutoring with a tutor" },
  { label: "Live sessions with a tutor", app: "No", competitor: "Yes" },
  { label: "Who explains a new topic", app: "No live teacher. Worked solutions, Explain this and Study notes", competitor: "A tutor, live, in Cluey’s online classroom" },
  { label: "Lesson content", app: "Your child’s own wrong answers, with topics from the Victorian Curriculum 2.0", competitor: "Cluey’s own structured lesson content" },
  { label: "Practice on the exact questions your child got wrong", app: "Yes: snap it, then similar questions until it’s mastered", competitor: "You can bring them to a session" },
  { label: "When it happens", app: "Any day, a few minutes at a time, on their iPhone", competitor: "At booked session times" },
  { label: "Scheduling and payment", app: "Nothing to schedule. A weekly subscription, cancel any time", competitor: "Handled by Cluey" },
  { label: "What parents see", app: "Week in review: questions added and mastered, test scores, trickiest topic", competitor: "Reports after sessions" },
  { label: "Covers", app: "Years 7 to 10 maths only", competitor: "Check with Cluey for subjects and year levels" },
  { label: "Cost", app: "1-week free trial, then $7.99 a week", competitor: "Per session. Check Cluey for current prices" },
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

export default function ClueyAlternativePage() {
  return (
    <main style={{ background: c.white, fontFamily: "var(--font-display)", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Cluey alternative</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Considering Cluey? Here’s how it compares with Tuterly.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Cluey is one of the more established online tutoring brands in Australia, and for a lot of families it’s a perfectly good fit. {STUDY_APP.name} isn’t a cheaper Cluey. It’s an iPhone app for Years 7 to 10 maths that does a different job: your child practises the exact questions they get wrong, a few minutes a day. This page is an honest look at both, including when Cluey is the better choice.
            </p>
            <AppHeroBlock placement="cluey_alternative_hero" />
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>What Cluey does well</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              The honest version.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              Cluey is a well-built product. Their online classroom is purpose-designed for tutoring (rather than a generic Zoom call), they vet their tutors before letting them work, and they handle scheduling and payment so the parent never has to coordinate with the tutor directly. For families who want a fully managed “agency handles everything” experience, that’s a real benefit.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              They also have proprietary lesson content, structured curriculum that tutors deliver, which can be a plus if you specifically want a more standardised teaching approach across tutors.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Where Tuterly is different</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              An app for practice, not a tutor.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              A tutor teaches. {STUDY_APP.name} is for the part that happens between lessons: working on the maths questions your child actually got wrong, until each one is mastered. It was designed by Australian educators at Bayside Academics, a tutoring business in Brighton, Melbourne, and its topics follow the Victorian Curriculum 2.0.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              What that looks like in practice:
            </p>
            <ul style={{ display: "grid", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
              {[
                ["Snap a question", "Your child takes a photo of a question they got wrong, or uploads a whole marked test. The ones marked wrong are stored automatically."],
                ["A worked solution, then a fresh question", "The full solution stays hidden until they want it, so they can try again first. Straight away there’s a similar question on the same idea, genuinely different, not just new numbers."],
                ["Practised until it’s mastered", "Each similar question they get right earns a star. Three stars and it’s mastered, then they can try a harder one. Explain this shows the step that went wrong."],
                ["Test any topic", "A short test on any topic in their year, one question from each part of the topic. Questions they miss go into their bank."],
                ["Parents see the week, not the photos", "Link with a 6-character code to see Week in review: questions added and mastered, test scores and the trickiest topic. You can set a test on any topic too."],
              ].map(([title, body]) => (
                <li key={title} style={{ background: c.offWhite, borderRadius: 12, border: `1px solid ${c.border}`, padding: "16px 18px" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: c.navy, marginBottom: 4 }}>{title}</p>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6 }}>{body}</p>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginTop: 18 }}>
              It’s a 1-week free trial, then $7.99 a week, cancel any time. A private tutor in Melbourne usually costs $80 to $100 an hour, so a whole week costs less than 10 minutes with a private tutor. {STUDY_APP.name} is coming soon to the App Store.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>Side by side</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, textAlign: "center", marginBottom: 32, lineHeight: 1.25 }}>
              Tuterly vs Cluey.
            </h2>
          </Fade>
          <SideBySide rows={COMPARISON_ROWS} competitorName="Cluey" />
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
            <Fade>
              <div style={{ background: c.offWhite, borderRadius: 16, border: `1px solid ${c.border}`, padding: "24px 24px", height: "100%" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, color: c.amber, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Choose Cluey if</p>
                <BulletList
                  color={c.amber}
                  items={[
                    "Your child needs someone to teach them a topic, live, and answer their questions",
                    "You want a fully hands-off, managed tutoring experience",
                    "You prefer standardised lesson content delivered consistently across tutors",
                    "They need help outside Years 7 to 10 maths",
                  ]}
                />
              </div>
            </Fade>
            <Fade delay={0.1}>
              <div style={{ background: c.tealPale, borderRadius: 16, border: `2px solid ${c.teal}`, padding: "24px 24px", height: "100%" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Try Tuterly if</p>
                <BulletList
                  color={c.teal}
                  items={[
                    "Your child is in Years 7 to 10 and keeps losing marks on the same kinds of maths questions",
                    "What they mostly need is practice on their own mistakes, not another lesson",
                    "You want something they can do any day, between sessions or instead of them",
                    "You’d like to see what was added and mastered each week",
                  ]}
                />
              </div>
            </Fade>
          </div>
          <Fade delay={0.15}>
            <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, textAlign: "center", maxWidth: 680, margin: "24px auto 0" }}>
              Or use both. A tutor teaches the topic, and {STUDY_APP.name} keeps the questions your child got wrong coming back until they’re mastered. Tutors can link to the app too, see the bank before a session and set snap goals.
            </p>
          </Fade>
        </div>
      </section>

      <AppLowerCostSection competitor="Cluey" placement="cluey_alternative_lower_cost" />

      <AppCtaBand placement="cluey_alternative_final" />
      <MarketingFooter />
    </main>
  );
}

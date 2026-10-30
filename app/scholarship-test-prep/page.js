import AppCtaBand from "@/components/study/AppCtaBand";
import { AppHeroBlock } from "@/components/study/TutoringPageApp";
import { SITE_URL } from "@/lib/site";
import { STUDY_APP } from "@/lib/study-app";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "Scholarship Test Prep Melbourne: ACER, EduTest | Tuterly";
const DESCRIPTION =
  "ACER and EduTest scholarship test prep in Melbourne: what each test covers, when to start, what helps most, and where a Years 7 to 10 maths app fits in.";
const URL = `${SITE_URL}/scholarship-test-prep`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"],
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

const TESTS = [
  {
    name: "ACER Scholarship Tests",
    body: "Three papers: written expression, humanities (comprehension and interpretation), and mathematics. Used by many Melbourne independent schools for scholarships and entry.",
  },
  {
    name: "EduTest",
    body: "Five sections: reading comprehension, mathematics, written expression, verbal reasoning and numerical reasoning, all under tight time limits. Time pressure is the part many students underestimate.",
  },
  {
    name: "Individual school entry exams",
    body: "Some schools run their own admission process alongside ACER or EduTest, with school-specific essay prompts and maths problem sets. Worth practising for specifically if you’ve shortlisted a school, because the question style varies between schools.",
  },
];

const TIMING = [
  {
    when: "Year 4",
    body: "Foundations year if you’re aiming at Year 7 entry. Strong reading comprehension, quick mental arithmetic and clear writing structure, all built through normal schoolwork plus some light extra practice. Specific test prep usually isn’t needed yet.",
  },
  {
    when: "Year 5",
    body: "Start test-style practice 12 to 18 months out from the exam. Once a week is plenty. Focus on getting familiar with the question types (the reasoning sections in particular) before working on speed.",
  },
  {
    when: "Year 6",
    body: "The busiest year for Year 7 entry. Many families add weekly tutoring and regular practice from January through to the test date, which depends on the school. Check each school’s dates early.",
  },
];

const WHAT_WORKS = [
  {
    title: "Past papers under timed conditions",
    body: "Plenty of students lose marks not because they don’t know the material, but because the time pressure throws them. Sitting practice papers with a real timer running is one of the most useful things to do in the last couple of months.",
  },
  {
    title: "Written expression feedback",
    body: "Written expression is hard to improve alone. Children need their writing read by someone who can explain why it works or doesn’t. This is where a tutor or teacher is hard to replace, and an app can’t do it.",
  },
  {
    title: "Regular practice, not weekly cramming",
    body: "Verbal and numerical reasoning come from recognising patterns, built up over months of steady exposure. Short, regular practice suits that better than one long session a week.",
  },
  {
    title: "Mock interviews (for scholarship rounds)",
    body: "Many scholarship rounds include an interview with the school. Practising helps: talking about their interests, handling an unexpected question, looking the interviewer in the eye. A few practice runs with a parent or tutor are worth doing.",
  },
];

const APP_DOES = [
  "Years 7 to 10 school maths, with topics from the Victorian Curriculum 2.0",
  "Snap a maths question they got wrong, see the worked solution, then master fresh versions of it",
  "Test any topic: a short test on any maths topic in their year",
  "Study notes: a revision sheet on a topic, as a PDF",
];

const APP_DOESNT = [
  "Verbal or numerical reasoning, reading comprehension, humanities or written expression",
  "Timed scholarship papers or exam technique. It isn’t a test-prep course",
  "Primary school maths, so it isn’t built for Year 5 and 6 students sitting Year 7 entry tests",
];

const sectionLabel = { fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 };

function Bullets({ items, color }) {
  return (
    <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((t) => (
        <li key={t} style={{ fontSize: 14, color: c.text, lineHeight: 1.55, paddingLeft: 16, position: "relative" }}>
          <span aria-hidden="true" style={{ position: "absolute", left: 0, color }}>•</span>
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function ScholarshipTestPrepPage() {
  const name = STUDY_APP.name;
  return (
    <main style={{ background: c.white, fontFamily: "var(--font-display)", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>Scholarship test prep</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              ACER and EduTest scholarship preparation.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Year 7 and Year 9 scholarship tests can open the door to a Melbourne private school, and to a fee reduction for the years that follow. This guide covers the two main test formats, when to start, and what helps most. It also explains where {name}, our Years 7 to 10 maths app, fits in: the school maths side of things, for students already in secondary school.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 24px", padding: "14px 18px", background: c.offWhite, borderRadius: 14, border: `1px solid ${c.border}` }}>
              <strong>Free practice:</strong> try 10 scholarship-style numerical reasoning questions for Years 4, 5 and 6, marked with worked solutions.{" "}
              <a href="/scholarship-practice" style={{ color: c.teal, fontWeight: 700 }}>Start the practice questions →</a>
            </p>
            <AppHeroBlock
              placement="scholarship_test_prep_hero"
              heading="Aiming for a Year 9 scholarship? Keep their school maths solid."
              sub={`${name} is an app for iPhone and Android for Years 7 to 10 maths, designed by Australian educators. Your child snaps the questions they got wrong, sees the worked solution, and practises fresh versions until each one is mastered. It covers school maths, not the reasoning or writing sections of the test.`}
            />
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>The tests</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Two main formats. Which one your child sits depends on the school.
            </h2>
            <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Schools choose their own test and their own dates, and both can change from year to year, so check with each school you’ve shortlisted.
            </p>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {TESTS.map((t, i) => (
              <Fade key={t.name} delay={0.04 + i * 0.04}>
                <div style={{ background: c.white, borderRadius: 14, border: `1px solid ${c.border}`, padding: "22px 22px" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{t.name}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}>{t.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>When to start</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              Year-by-year timeline.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {TIMING.map((t, i) => (
              <Fade key={t.when} delay={0.04 + i * 0.04}>
                <div style={{ background: c.offWhite, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px", display: "grid", gridTemplateColumns: "1fr 4fr", gap: 18 }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: c.teal }}>{t.when}</p>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}>{t.body}</p>
                </div>
              </Fade>
            ))}
          </div>
          <Fade delay={0.16}>
            <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, marginTop: 20 }}>
              Aiming for Year 9 entry instead? The same pattern applies two years later, so the test-style practice falls in Years 7 and 8. That’s also when strong school maths matters, and where {name} can help.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>What works</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              Four things worth doing.
            </h2>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {WHAT_WORKS.map((item, i) => (
              <Fade key={item.title} delay={0.04 + i * 0.04}>
                <div style={{ background: c.white, borderRadius: 16, border: `1px solid ${c.border}`, padding: "22px 20px", height: "100%" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}>{item.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>Where {name} fits</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 14, lineHeight: 1.25 }}>
              The maths part, honestly.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 28, maxWidth: 760 }}>
              Every scholarship test has a maths section, and it builds on school maths. For a student in Years 7 or 8 heading towards a Year 9 scholarship test, {name} keeps the maths they learn in class solid, one wrong question at a time. It doesn’t replace test-style practice, and it doesn’t touch the other sections.
            </p>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            <Fade>
              <div style={{ background: c.tealPale, borderRadius: 16, border: `2px solid ${c.teal}`, padding: "24px 24px", height: "100%" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>What it covers</p>
                <Bullets items={APP_DOES} color={c.teal} />
              </div>
            </Fade>
            <Fade delay={0.1}>
              <div style={{ background: c.offWhite, borderRadius: 16, border: `1px solid ${c.border}`, padding: "24px 24px", height: "100%" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, color: c.amber, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>What it doesn’t</p>
                <Bullets items={APP_DOESNT} color={c.amber} />
              </div>
            </Fade>
          </div>
          <Fade delay={0.14}>
            <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, marginTop: 24, maxWidth: 760 }}>
              Cost: a private tutor in Melbourne usually costs $80 to $100 an hour. {name} comes with a {STUDY_APP.priceLine}, cancel any time. It’s coming soon to the App Store and Google Play, on iPhone and Android.
            </p>
          </Fade>
        </div>
      </section>

      <AppCtaBand
        placement="scholarship_test_prep_final"
        title="Keep their school maths solid, one question at a time."
      />
      <MarketingFooter />
    </main>
  );
}

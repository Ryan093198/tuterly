import AppCtaBand from "@/components/study/AppCtaBand";
import { AppHeroBlock } from "@/components/study/TutoringPageApp";
import { SITE_URL } from "@/lib/site";
import { STUDY_APP } from "@/lib/study-app";
import {
  c,
  MARKETING_FONTS_IMPORT,
} from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "Private School Scholarship Exam Tutoring: Melbourne Guide | Tuterly";
const DESCRIPTION =
  "Year 7 and Year 9 private school scholarship exams in Melbourne: EduTest, ACER and school entry exams, what tutoring helps with, and where a Years 7 to 10 maths app fits.";
const URL = `${SITE_URL}/tutoring/scholarship-exam-prep`;

const TEST_FORMATS = [
  {
    title: "EduTest",
    body: "Five sections: reading, mathematics, written expression, verbal reasoning and numerical reasoning.",
  },
  {
    title: "ACER Scholarship Tests",
    body: "Three papers: written expression, humanities (comprehension and interpretation), and mathematics.",
  },
  {
    title: "Individual school entry exams",
    body: "Several schools run their own entry process in addition to the standard tests, with their own essay prompts and maths problem sets. Worth practising for specifically if you’ve shortlisted a school.",
  },
];

const SCHOOLS = [
  { name: "Camberwell Grammar School" },
  { name: "Methodist Ladies' College (MLC)" },
  { name: "Presbyterian Ladies' College (PLC)" },
  { name: "Trinity Grammar School" },
  { name: "Carey Baptist Grammar School" },
  { name: "Scotch College" },
  { name: "Xavier College" },
  { name: "Genazzano FCJ College" },
  { name: "Ruyton Girls' School" },
  { name: "Strathcona Girls Grammar" },
  { name: "Wesley College" },
  { name: "Haileybury" },
];

const TUTOR_HELPS = [
  "Reading and marking practice writing, and explaining what would make it stronger",
  "Teaching the reasoning question types and working on speed",
  "Running timed practice papers and going through them afterwards",
  "Practising for the school interview, if there is one",
];

const APP_HELPS = [
  "Years 7 to 10 school maths, with topics from the Victorian Curriculum 2.0",
  "Snap a question they got wrong in class or a school test, see the worked solution, then master fresh versions",
  "Test any topic and Fix my mistakes to keep their maths topics solid",
  "Study notes: a revision sheet on a topic, as a PDF",
];

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website",
  },
};

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

export default function ScholarshipPrepPage() {
  const name = STUDY_APP.name;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Private School Scholarship Exam Tutoring: Melbourne Guide",
    description: DESCRIPTION,
    url: URL,
    publisher: { "@type": "Organization", name: "Tuterly", url: SITE_URL },
  };

  return (
    <main style={{ background: c.white, fontFamily: "var(--font-display)", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <MarketingNav />

      {/* HERO */}
      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>Scholarship exam prep</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Private school scholarship exams: a guide for Melbourne parents.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Year 7 and Year 9 scholarship exams can open the door to a Melbourne private school, and to a fee reduction for the years that follow. Here’s what the EduTest, the ACER scholarship tests and individual school exams involve, what a tutor helps with, and where {name}, our Years 7 to 10 maths app, fits in.
            </p>
            <AppHeroBlock
              placement="scholarship_exam_prep_hero"
              heading="In Year 7 or 8? Keep their school maths solid."
              sub={`${name} is an iPhone app for Years 7 to 10 maths, designed by Australian educators. Your child snaps the questions they got wrong, sees the worked solution, and practises fresh versions until each one is mastered. It isn’t a scholarship test-prep course.`}
            />
          </Fade>
        </div>
      </section>

      {/* TEST FORMATS */}
      <section style={{ padding: "56px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>The test formats</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 24, lineHeight: 1.25 }}>
              EduTest, ACER, and individual school exams.
            </h2>
            <div style={{ display: "grid", gap: 12 }}>
              {TEST_FORMATS.map((t) => (
                <div key={t.title} style={{ background: c.white, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: c.navy, marginBottom: 6 }}>{t.title}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6 }}>{t.body}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, marginTop: 20 }}>
              Tests are usually sat the year before entry: in primary school for Year 7 entry, and in Year 8 for Year 9 entry. Dates vary by school, so check each one.
            </p>
          </Fade>
        </div>
      </section>

      {/* SCHOOLS */}
      <section style={{ padding: "56px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>Schools families ask us about</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Melbourne private schools families ask about.
            </h2>
            <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, marginBottom: 20 }}>
              Most Melbourne independent schools use either EduTest or ACER results, sometimes both, for scholarships and entry. Which test a school uses, and whether it runs its own essay or interview round, can change from year to year, so check the school’s website before you plan.
            </p>
            <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
              {SCHOOLS.map((s) => (
                <li key={s.name} style={{ background: c.offWhite, borderRadius: 10, padding: "10px 14px", fontSize: 14, color: c.text, fontWeight: 500 }}>
                  {s.name}
                </li>
              ))}
            </ul>
          </Fade>
        </div>
      </section>

      {/* TUTOR vs APP */}
      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>Tutoring and the app</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 14, lineHeight: 1.25 }}>
              Different jobs, and it helps to be clear which is which.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 28, maxWidth: 760 }}>
              Scholarship tests reward reasoning, reading, writing and speed, as well as maths. A tutor can cover all of that. {name} covers one thing: the school maths a student in Years 7 to 10 is learning now, which the maths section of a Year 9 scholarship test builds on.
            </p>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            <Fade>
              <div style={{ background: c.white, borderRadius: 16, border: `1px solid ${c.border}`, padding: "24px 24px", height: "100%" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, color: c.amber, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>What a tutor helps with</p>
                <Bullets items={TUTOR_HELPS} color={c.amber} />
              </div>
            </Fade>
            <Fade delay={0.1}>
              <div style={{ background: c.tealPale, borderRadius: 16, border: `2px solid ${c.teal}`, padding: "24px 24px", height: "100%" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>What {name} covers</p>
                <Bullets items={APP_HELPS} color={c.teal} />
              </div>
            </Fade>
          </div>
          <Fade delay={0.14}>
            <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, marginTop: 24, maxWidth: 760 }}>
              {name} doesn’t cover the reasoning, reading or writing sections, doesn’t run timed scholarship papers, and isn’t built for primary school students sitting Year 7 entry tests.
            </p>
          </Fade>
        </div>
      </section>

      {/* COST */}
      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>What it costs</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Tutoring by the hour, the app by the week.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              A private tutor in Melbourne usually costs $80 to $100 an hour, and scholarship preparation often runs for months. That’s worth it for the writing and reasoning sections, where feedback from a person matters most.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              For keeping Years 7 to 10 maths solid between sessions, or on its own, {name} comes with a {STUDY_APP.priceLine}, cancel any time. {STUDY_APP.priceVsTutor} It’s coming soon to the App Store, on iPhone.
            </p>
          </Fade>
        </div>
      </section>

      <AppCtaBand
        placement="scholarship_exam_prep_final"
        title="Keep their school maths solid, one question at a time."
      />
      <MarketingFooter />
    </main>
  );
}

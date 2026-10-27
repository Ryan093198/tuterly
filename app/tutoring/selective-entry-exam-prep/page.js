import AppCtaBand from "@/components/study/AppCtaBand";
import AppPracticeBlock from "@/components/study/AppPracticeBlock";
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

const TITLE = "Selective Entry Exam Tutoring (Victoria): Parent Guide | Tuterly";
const DESCRIPTION =
  "The Victorian selective entry exam for Melbourne High, MacRobertson Girls’, Nossal and Suzanne Cory: what it covers, when it’s sat, and where a Years 7 to 10 maths app fits.";
const URL = `${SITE_URL}/tutoring/selective-entry-exam-prep`;

const SCHOOLS = [
  {
    name: "Melbourne High School",
    note: "Boys’ selective entry school, South Yarra. Entry at Year 9.",
  },
  {
    name: "The Mac.Robertson Girls’ High School",
    note: "Girls’ selective entry school, Melbourne. Entry at Year 9.",
  },
  {
    name: "Nossal High School",
    note: "Co-educational selective entry school, Berwick. Entry at Year 9.",
  },
  {
    name: "Suzanne Cory High School",
    note: "Co-educational selective entry school, Werribee. Entry at Year 9.",
  },
];

const ALSO_ASKED = [
  {
    name: "John Monash Science School",
    note: "A specialist science and maths school for Years 10 to 12, at Monash University. It has its own application process, separate from the selective entry exam.",
  },
  {
    name: "SEAL programs (such as Box Hill High School)",
    note: "Select Entry Accelerated Learning programs run inside some government schools, usually from Year 7, with the school’s own entry testing.",
  },
];

const EXAM_AREAS = [
  {
    title: "Verbal reasoning and reading",
    body: "Vocabulary, analogies and reading comprehension under tight time limits. Many students find this needs dedicated practice.",
  },
  {
    title: "Numerical reasoning",
    body: "Quick mental arithmetic, problem solving and number patterns. Speed matters as much as accuracy.",
  },
  {
    title: "Written expression",
    body: "Short writing tasks, such as a creative or persuasive piece. It’s hard to improve from a textbook: feedback from a teacher or tutor is what helps.",
  },
  {
    title: "Mathematics",
    body: "Problem solving built on Year 8 school maths, including geometry, algebra and word problems, with some questions that stretch past the usual Year 8 level.",
  },
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

export default function SelectiveEntryPrepPage() {
  const name = STUDY_APP.name;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Selective Entry Exam Tutoring (Victoria): Parent Guide",
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
            <p style={sectionLabel}>Selective entry exam prep</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              The Victorian selective entry exam: a guide for parents.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Victoria’s four selective entry high schools take students from Year 9, and the entrance exam is sat in Year 8. It covers verbal reasoning, numerical reasoning, reading, writing and mathematics. Here’s what each part involves, what tutoring helps with, and where {name}, our Years 7 to 10 maths app, fits: the Year 7 and 8 school maths the maths section builds on.
            </p>
            <AppHeroBlock
              placement="selective_entry_hero"
              heading="In Year 7 or 8? Get their school maths solid first."
              sub={`${name} is an iPhone app for Years 7 to 10 maths, designed by Australian educators. Your child snaps the questions they got wrong, sees the worked solution, and practises fresh versions until each one is mastered. It covers school maths, not the reasoning or writing sections.`}
            />
          </Fade>
        </div>
      </section>

      {/* SCHOOLS */}
      <section style={{ padding: "56px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>The schools</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              The four selective entry high schools.
            </h2>
            <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, marginBottom: 20 }}>
              One exam covers all four. Students apply in Year 8, sit the exam mid-year, and start at their new school in Year 9. Check the Department of Education’s selective entry pages for this year’s dates.
            </p>
            <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, margin: "0 0 28px" }}>
              {SCHOOLS.map((s) => (
                <li key={s.name} style={{ background: c.white, borderRadius: 12, border: `1px solid ${c.border}`, padding: "14px 18px" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: c.navy, marginBottom: 2 }}>{s.name}</p>
                  <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.5 }}>{s.note}</p>
                </li>
              ))}
            </ul>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: c.navy, marginBottom: 12 }}>
              Also often asked about
            </h3>
            <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
              {ALSO_ASKED.map((s) => (
                <li key={s.name} style={{ background: c.white, borderRadius: 12, border: `1px solid ${c.border}`, padding: "14px 18px" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: c.navy, marginBottom: 2 }}>{s.name}</p>
                  <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.5 }}>{s.note}</p>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
      </section>

      {/* EXAM AREAS */}
      <section style={{ padding: "56px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>What the exam covers</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 24, lineHeight: 1.25 }}>
              The parts of the exam, and who helps with what.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
              {EXAM_AREAS.map((a) => (
                <div key={a.title} style={{ background: c.offWhite, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 18px" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: c.navy, marginBottom: 6 }}>{a.title}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6 }}>{a.body}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, marginTop: 20 }}>
              Reasoning, reading and writing are where a tutor, timed practice papers and feedback on writing help most. {name} doesn’t cover those sections, and it isn’t a test-prep course.
            </p>
          </Fade>
        </div>
      </section>

      {/* WHERE THE APP FITS */}
      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>Where {name} fits</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              The maths section starts with the maths they’re learning now.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              The exam’s maths questions build on Years 7 and 8 school maths. Gaps there, like fractions, negative numbers or rearranging equations, show up in harder problems too. {name} works on exactly those gaps, from the questions your child gets wrong in class, homework and school tests.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              They snap a question they got wrong and see the full worked solution. Straight away they get a similar question on the same idea, genuinely different rather than just new numbers, and each question moves from To fix to Learning to Mastered. <strong>Test any topic</strong> gives a short test on any topic in their year, and <strong>Study notes</strong> makes a one-page revision sheet.
            </p>
          </Fade>
        </div>
      </section>

      <AppPracticeBlock
        topic="any Year 7 or 8 maths topic"
        placement="selective_entry_practice"
        heading="Check their Year 7 and 8 maths, topic by topic."
      />

      {/* COST */}
      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>What it costs</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Tutoring by the hour, the app by the week.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              A private tutor in Melbourne usually costs $80 to $100 an hour. For the reasoning and writing sections, a tutor’s feedback is hard to replace.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              For school maths in Years 7 and 8, between sessions or on its own, {name} comes with a {STUDY_APP.priceLine}, cancel any time. {STUDY_APP.priceVsTutor} It’s coming soon to the App Store, on iPhone.
            </p>
          </Fade>
        </div>
      </section>

      <AppCtaBand
        placement="selective_entry_final"
        title="Get their Year 7 and 8 maths solid, one question at a time."
      />
      <MarketingFooter />
    </main>
  );
}

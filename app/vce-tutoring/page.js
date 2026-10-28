import AppCtaBand from "@/components/study/AppCtaBand";
import AppPracticeBlock from "@/components/study/AppPracticeBlock";
import { AppHeroBlock } from "@/components/study/TutoringPageApp";
import { SITE_URL } from "@/lib/site";
import { STUDY_APP } from "@/lib/study-app";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "VCE Tutoring Melbourne: Maths, English, Sciences | Tuterly";
const DESCRIPTION =
  "VCE tutoring in Melbourne: what changes in VCE, the subjects families tutor most, when to start, and why Years 9 and 10 maths matters for General Maths, Methods and Specialist.";
const URL = `${SITE_URL}/vce-tutoring`;

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
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const SUBJECTS = [
  {
    name: "VCE General Mathematics",
    body: "Data analysis, recursion and financial modelling, matrices, and networks and decision maths. Taken on its own or alongside Methods. It leans on Years 9 and 10 statistics, linear relations, percentages and rates, and on reading long worded problems carefully. Good tutoring builds the habit of setting out working the way the exam rewards.",
  },
  {
    name: "VCE Mathematical Methods",
    body: "Functions and graphs, calculus, probability. One of the most tutored VCE subjects, because it moves quickly and leans hard on the algebra students learnt in Years 9 and 10. Good Methods tutoring keeps pace with the study design and builds exam technique on VCAA past papers.",
  },
  {
    name: "VCE English (and English Language / Literature)",
    body: "Analytical, comparative and language analysis writing. Tutoring here is mostly structural: students often have the ideas but need help organising them into the essay forms the VCAA assessment asks for.",
  },
  {
    name: "VCE Specialist Mathematics",
    body: "Vectors, complex numbers, mechanics, differential equations. Usually taken alongside Methods, and widely seen as the most demanding VCE maths subject. Tutoring tends to focus on moving from Methods-style problem solving to Specialist’s more abstract, proof-based style.",
  },
  {
    name: "VCE Chemistry",
    body: "Units 3 and 4 cover organic chemistry, equilibrium and redox. Tutoring tends to mean working through past papers and building the multi-step problem-solving habits that the SACs and exams test.",
  },
  {
    name: "VCE Physics",
    body: "Motion, electricity, light and matter, fields. The mix of conceptual understanding and calculation is where tutoring helps most, particularly with the longer-response questions in the end-of-year exam.",
  },
  {
    name: "VCE Biology",
    body: "Nucleic acids, photosynthesis, immunity, evolution. Less calculation than Chemistry or Physics, more about the structured written responses the VCAA exam asks for.",
  },
];

const TIMING = [
  {
    when: "Year 10",
    body: "Pre-VCE preparation. Algebra, indices and structured essay writing are the foundations Methods and English lean on most. If there’s any uncertainty in the maths, Year 10 is the time to sort it out, before Units 1 and 2 start.",
  },
  {
    when: "Year 11",
    body: "Units 1 and 2. The year many families underestimate. Unit 1 and 2 results don’t count directly towards the ATAR, but the content is the foundation for Units 3 and 4, and falling behind here is hard to recover from.",
  },
  {
    when: "Year 12",
    body: "Units 3 and 4. Tutoring usually picks up in Term 2 (heading into SACs), Term 3 (more SACs and past papers) and Term 4 (exam preparation). If weekly tutoring is the plan, starting early in the year leaves time to build up before the first SACs, rather than starting in September.",
  },
];

const PRE_VCE_MATHS = [
  "Algebra: expanding, factorising and rearranging without slips",
  "Indices and surds",
  "Linear and quadratic functions and their graphs",
  "Trigonometry",
  "Probability",
  "Statistics and data displays",
  "Percentages, rates and financial maths",
];

const sectionLabel = { fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 };

export default function VceTutoringPage() {
  const name = STUDY_APP.name;
  return (
    <main style={{ background: c.white, fontFamily: "var(--font-display)", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>VCE tutoring</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              VCE tutoring in Melbourne: what it’s for, and when to start.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              General Maths, Methods, Specialist, English, Chemistry, Physics, Biology. Here’s what changes when your child starts VCE, what good tutoring looks like in each subject, and when it’s worth starting. And if your child is still in Year 9 or 10, why getting their maths solid now matters for VCE General Maths, Methods and Specialist.
            </p>
            <AppHeroBlock
              placement="vce_tutoring_hero"
              heading="In Year 9 or 10? Fix the maths gaps before VCE."
              sub={`${name} is an iPhone app for Years 7 to 10 maths, designed by Australian educators. Your child snaps the questions they got wrong, sees the worked solution, and practises fresh versions until each one is mastered. It doesn’t cover VCE subjects.`}
            />
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>What changes in VCE</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              It’s a different game from Years 7 to 10.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              VCE is run by the VCAA and assessed through SACs (School-assessed Coursework) plus end-of-year exams. Study scores are scaled and combined into the ATAR.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              That means VCE tutoring usually isn’t about catching up. It’s about working through the study design with someone who knows it well, building exam technique on VCAA past papers, and finding the specific content areas where marks are being lost.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>VCE subjects</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 36, lineHeight: 1.25 }}>
              The six subjects most families tutor.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {SUBJECTS.map((s, i) => (
              <Fade key={s.name} delay={0.04 + i * 0.03}>
                <div style={{ background: c.offWhite, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{s.name}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}>{s.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>Before VCE</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              General Maths, Methods and Specialist all build on Years 9 and 10 maths.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              VCE maths builds straight on what students learn in Years 9 and 10. When a Year 11 student struggles in General Maths or Methods, the trouble is often an older gap showing up in new work, like a slip in factorising or a shaky grip on indices. Those gaps are much easier to fix before VCE starts. The Years 9 and 10 topics VCE maths leans on include:
            </p>
            <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, margin: "0 0 18px" }}>
              {PRE_VCE_MATHS.map((t) => (
                <li key={t} style={{ fontSize: 15, color: c.text, lineHeight: 1.55, paddingLeft: 18, position: "relative" }}>
                  <span aria-hidden="true" style={{ position: "absolute", left: 0, color: c.teal }}>•</span>
                  {t}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              That’s what {name} is for. In Years 9 and 10, your child snaps the maths questions they get wrong in class, homework or tests. They see the full worked solution, then straight away get a similar question on the same idea, genuinely different rather than just new numbers. Each question moves from To fix to Learning to Mastered. <strong>Explain this</strong> shows the step that went wrong, and <strong>Test any topic</strong> gives a short test on any topic in their year.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              If your child is already in Year 11 or 12, {name} isn’t the tool for their VCE subjects: it covers Years 7 to 10 maths only, not Units 1 to 4. For VCE itself, their teacher, VCAA past papers and a good tutor are the right help.
            </p>
          </Fade>
        </div>
      </section>

      <AppPracticeBlock
        topic="any Year 9 or 10 maths topic"
        placement="vce_tutoring_practice"
        heading="Check the Years 9 and 10 maths VCE builds on."
      />

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>When to start</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              The honest timing answer.
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
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={sectionLabel}>What it costs</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Tutoring and the app do different jobs.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              A private tutor in Melbourne usually costs $80 to $100 an hour. For VCE, a tutor who knows the study design can explain new content, read your child’s writing and work through past papers with them. An app can’t do that.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              For Years 7 to 10 maths, {name} comes with a {STUDY_APP.priceLine}, cancel any time. {STUDY_APP.priceVsTutor} It’s coming soon to the App Store, on iPhone.
            </p>
          </Fade>
        </div>
      </section>

      <AppCtaBand
        placement="vce_tutoring_final"
        title="Get Years 9 and 10 maths solid before VCE."
        lead={`${name} turns every maths question they get wrong in Years 7 to 10 into practice that’s about your child, not a generic worksheet.`}
      />
      <MarketingFooter />
    </main>
  );
}

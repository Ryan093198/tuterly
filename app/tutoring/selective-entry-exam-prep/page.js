import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import {
  c,
  MARKETING_FONTS_IMPORT,
} from "@/components/marketing/theme";
import SampleReport from "@/components/marketing/SampleReport";
import SavingsCalculator from "@/components/marketing/SavingsCalculator";
import ComparisonTable from "@/components/marketing/ComparisonTable";
import TuterlyMethod from "@/components/marketing/TuterlyMethod";
import EducourseCallout from "@/components/marketing/EducourseCallout";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const DIRECTORY_HREF = "/directory";
const TITLE = "Selective Entry Exam Tutoring (Victoria) | Tuterly";
const DESCRIPTION =
  "Online and in-person tutors for the Victorian selective entry exams - John Monash Science School, Nossal High, MacRobertson Girls', Suzanne Cory, and the Box Hill High SEAL program.";

const SCHOOLS = [
  {
    name: "John Monash Science School",
    note: "Year 10-12 selective school based at Monash University, science and maths focus.",
  },
  {
    name: "Nossal High School",
    note: "Year 9-12 selective entry, Berwick, with a strong all-rounder cohort.",
  },
  {
    name: "MacRobertson Girls' High School",
    note: "Year 9-12 selective entry, Melbourne, one of Australia's strongest academic results.",
  },
  {
    name: "Suzanne Cory High School",
    note: "Year 9-12 selective entry, Werribee, growing reputation across STEM.",
  },
  {
    name: "Box Hill High School - SEAL program",
    note: "Year 7-12 Select Entry Accelerated Learning program for high-ability students.",
  },
];

const EXAM_AREAS = [
  {
    title: "Verbal reasoning",
    body: "Vocabulary, analogies, and reading comprehension under tight time limits - the section most students lose marks on without dedicated practice.",
  },
  {
    title: "Numerical reasoning",
    body: "Quick mental arithmetic, problem solving, and number patterns. Speed matters as much as accuracy.",
  },
  {
    title: "Written expression",
    body: "Two short writing tasks (creative + persuasive). The skill that's hardest to self-improve from a textbook - direct tutor feedback is what moves it.",
  },
  {
    title: "Mathematics",
    body: "Curriculum-aligned problem solving extending beyond the Year 8-9 standard, including geometry, algebra, and word problems.",
  },
];

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/tutoring/selective-entry-exam-prep` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/tutoring/selective-entry-exam-prep`,
    type: "website",
  },
};

export default function SelectiveEntryPrepPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Selective Entry Exam Tutoring",
    provider: { "@type": "Organization", name: "Tuterly", url: SITE_URL },
    areaServed: { "@type": "Place", name: "Victoria, Australia" },
    serviceType:
      "Selective entry exam preparation tutoring - John Monash, Nossal, MacRob, Suzanne Cory, SEAL",
    url: `${SITE_URL}/tutoring/selective-entry-exam-prep`,
  };

  return (
    <main style={{ background: c.white, fontFamily: "'DM Sans', sans-serif", color: c.text }}>
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
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Selective entry exam prep</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Tutoring for the Victorian selective entry exams.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              The four Victorian selective entry schools - and the Box Hill High SEAL program - are the toughest tests in the state system. Tuterly connects families with tutors who&apos;ve prepared students through the verbal reasoning, numerical reasoning, written expression, and mathematics sections, and who know the difference between Year 8 maths and what actually appears on the exam.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href={DIRECTORY_HREF} style={{ padding: "14px 28px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Find a selective entry tutor →
              </Link>
              <a href="#sample-report" style={{ padding: "14px 28px", borderRadius: 10, border: `2px solid ${c.border}`, color: c.text, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                See a sample report
              </a>
            </div>
          </Fade>
        </div>
      </section>

      {/* SCHOOLS */}
      <section style={{ padding: "56px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Schools we prepare students for</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              The four selective entry schools + SEAL.
            </h2>
            <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
              {SCHOOLS.map((s) => (
                <li key={s.name} style={{ background: c.white, borderRadius: 12, border: `1px solid ${c.border}`, padding: "14px 18px" }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: c.navy, marginBottom: 2 }}>{s.name}</p>
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
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>What we cover</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 24, lineHeight: 1.25 }}>
              Tutoring shaped around the four exam sections.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
              {EXAM_AREAS.map((a) => (
                <div key={a.title} style={{ background: c.offWhite, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 18px" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: c.navy, marginBottom: 6 }}>{a.title}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6 }}>{a.body}</p>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      <TuterlyMethod background={c.offWhite} padding="80px 24px" />

      <SampleReport
        background={c.white}
        padding="80px 24px"
        preset="selective-numerical"
        heading="A sample selective-entry session report."
        sub="A real example of what you'll receive after every prep session. Tutors are trained to use the platform so progress, weak spots, and what to practise next are visible after every lesson - not just at the end of term."
      />

      <EducourseCallout />

      {/* PRICING */}
      <section style={{ padding: "80px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>Simple pricing</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 12, lineHeight: 1.25 }}>
              Selective entry prep without the agency markup.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, textAlign: "center", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 32px" }}>
              The same structure a top tutoring agency offers - session reports, practice worksheets, progress tracking - at a directly-paid hourly rate instead of an agency margin.
            </p>
          </Fade>
          <div style={{ display: "grid", gap: 20 }}>
            <SavingsCalculator />
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* GET STARTED CTA */}
      <section style={{ padding: "72px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Ready to start selective entry prep?
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 28 }}>
              No lock-in contracts. No agency markups. Browse tutors who&apos;ve prepared students for selective entry, message them directly, and start whenever you&apos;re ready.
            </p>
            <Link href={DIRECTORY_HREF} style={{ display: "inline-block", padding: "14px 32px", borderRadius: 10, background: c.teal, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Get started - free to sign up
            </Link>
          </Fade>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}

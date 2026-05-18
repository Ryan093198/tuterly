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
const TITLE = "Private School Scholarship Exam Tutoring | Tuterly";
const DESCRIPTION =
  "Online and in-person tutors for Year 7 and Year 9 private school scholarship exams - EduTest, ACER, and individual-school entry exams used by Melbourne's leading independent schools.";

const TEST_FORMATS = [
  {
    title: "EduTest",
    body: "Used by Camberwell Grammar, Carey Baptist, Wesley, Caulfield Grammar, MLC, and many others. Five sections: reading, mathematics, written expression, verbal reasoning, numerical reasoning.",
  },
  {
    title: "ACER Scholarship Tests",
    body: "Used by Scotch College, Trinity Grammar, Genazzano, Loreto Mandeville Hall, Xavier, and Haileybury. Three papers: written expression, humanities (comprehension and interpretation), mathematics.",
  },
  {
    title: "Individual school entry exams",
    body: "Several schools run their own entry process in addition to the standard tests, with their own essay prompts and maths problem sets. Worth specifically practising for if you've shortlisted a school.",
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

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/tutoring/scholarship-exam-prep` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/tutoring/scholarship-exam-prep`,
    type: "website",
  },
};

export default function ScholarshipPrepPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Private School Scholarship Exam Tutoring",
    provider: { "@type": "Organization", name: "Tuterly", url: SITE_URL },
    areaServed: { "@type": "Place", name: "Victoria, Australia" },
    serviceType:
      "Private school scholarship exam preparation tutoring - EduTest, ACER, individual-school entry exams",
    url: `${SITE_URL}/tutoring/scholarship-exam-prep`,
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
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Scholarship exam prep</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Tutoring for private school scholarship exams.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Year 7 and Year 9 scholarship exams open doors to Melbourne&apos;s top private schools - and a meaningful fee reduction for the next six years. Tuterly connects families with tutors who&apos;ve prepared students for the EduTest, the ACER scholarship tests, and the individual-school entry exams that many schools run alongside.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href={DIRECTORY_HREF} style={{ padding: "14px 28px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Find a scholarship tutor →
              </Link>
              <a href="#sample-report" style={{ padding: "14px 28px", borderRadius: 10, border: `2px solid ${c.border}`, color: c.text, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                See a sample report
              </a>
            </div>
          </Fade>
        </div>
      </section>

      {/* TEST FORMATS */}
      <section style={{ padding: "56px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Test formats we prepare for</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 24, lineHeight: 1.25 }}>
              EduTest, ACER, and individual-school exams.
            </h2>
            <div style={{ display: "grid", gap: 12 }}>
              {TEST_FORMATS.map((t) => (
                <div key={t.title} style={{ background: c.white, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: c.navy, marginBottom: 6 }}>{t.title}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6 }}>{t.body}</p>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* SCHOOLS WE PREPARE STUDENTS FOR */}
      <section style={{ padding: "56px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Schools families ask us about</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Melbourne private schools we prepare students for.
            </h2>
            <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, marginBottom: 20 }}>
              Most Melbourne independent schools accept either EduTest or ACER results - sometimes both - for scholarships and entry. The tutoring approach is shaped by which test the school uses and by the school&apos;s own essay or interview round, if it runs one.
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

      <TuterlyMethod background={c.offWhite} padding="80px 24px" />

      <SampleReport
        background={c.white}
        padding="80px 24px"
        preset="selective-numerical"
        heading="A sample scholarship session report."
        sub="A real example of what you'll receive after every prep session. Tutors are trained to use the platform so progress, weak spots, and what to practise next are visible after every lesson - not just at the end of term."
      />

      <EducourseCallout />

      {/* PRICING */}
      <section style={{ padding: "80px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>Simple pricing</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 12, lineHeight: 1.25 }}>
              Scholarship prep without the agency markup.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, textAlign: "center", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 32px" }}>
              Session reports, practice worksheets, and progress tracking on every topic - at a directly-paid hourly rate instead of an agency margin.
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
              Ready to start scholarship prep?
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 28 }}>
              No lock-in contracts. No agency markups. Browse tutors who&apos;ve prepared students for Melbourne&apos;s top private schools, message them directly, and start whenever you&apos;re ready.
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

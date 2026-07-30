import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "Best Online Tutoring in Victoria - 2026 Guide | Tuterly";
const DESCRIPTION =
  "The best online tutoring in Victoria, from Melbourne to the regions. Why online levels the playing field for families outside the city, what to look for, and how to choose.";
const URL = `${SITE_URL}/best-online-tutoring-victoria`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const REGIONS = [
  "Geelong and the Surf Coast",
  "Ballarat and the Goldfields",
  "Bendigo and central Victoria",
  "the Latrobe Valley and Gippsland",
  "Shepparton and the Goulburn Valley",
  "Mildura and the north-west",
  "the Mornington Peninsula",
  "Greater Melbourne",
];

const WHY_ONLINE = [
  {
    title: "Access to specialist tutors, wherever you live",
    body: "In a regional town the pool of local tutors is small, and a high-ATAR VCE Specialist Maths tutor may simply not exist within an hour&apos;s drive. Online removes the radius entirely - your child can work with a subject specialist based anywhere in the state.",
  },
  {
    title: "No travel, which matters more outside the city",
    body: "For families in the regions, in-person tutoring can mean a long round trip for a one-hour lesson. Online gives back that time and makes a consistent weekly session realistic during a busy school term.",
  },
  {
    title: "The same VCE curriculum, statewide",
    body: "Every Victorian student sits the same VCAA curriculum and the same VCE exams. A strong online tutor who knows Methods, English or Chemistry is just as relevant in Warrnambool as in Camberwell.",
  },
];

const LOOK_FOR = [
  {
    title: "A report after every session",
    body: "The best online tutoring gives you a clear write-up after each lesson - what was covered, how your child went, what to practise next. When you cannot be in the room, that visibility matters even more.",
  },
  {
    title: "Progress tracking across topics",
    body: "A provider that shows which topics are improving and which still need work, week by week, is genuinely different. It matters most for VCE and selective-entry prep, where progress is measurable against a fixed topic list.",
  },
  {
    title: "Vetted, high-achieving tutors",
    body: "Ask about ATAR, subject specialisation, and vetting including a Working With Children Check. Online should mean a stronger pool than you could find locally, not a weaker one.",
  },
  {
    title: "Transparent, upfront pricing",
    body: "If a company will not tell you its hourly rate until you fill in a form, that is usually a sign the rate is above the market. Look for rates you can see before you enquire.",
  },
];

const FAQS = [
  {
    q: "Is online tutoring good for regional Victorian students?",
    a: "It is often the single best option. In smaller towns the local pool of specialist tutors is thin, so online is what gives a regional student access to the same high-ATAR VCE and selective-entry tutors a Melbourne family can reach. No travel, and a genuinely wider choice of tutor.",
  },
  {
    q: "What is the best online tutoring company in Victoria?",
    a: "There is no single best for everyone. Fully managed national agencies suit families who want a hands-off service and do not mind paying a premium. If you would rather choose your own vetted tutor, see the rate upfront, and get a report after every session, a platform like Tuterly is a better fit. Match the type to your family.",
  },
  {
    q: "How much does online tutoring cost in Victoria?",
    a: "National online agencies typically charge $90-150 per hour. Independent tutors and platforms are usually more affordable - Tuterly sessions start from $75 per hour, all-inclusive, with no lock-in contracts.",
  },
  {
    q: "Can online tutoring cover VCE across all of Victoria?",
    a: "Yes. Every Victorian student sits the same VCAA curriculum and VCE exams, so a specialist online tutor in Methods, English, Biology, Chemistry or Physics is relevant statewide, from Melbourne to the regions.",
  },
  {
    q: "What do you need to get started online?",
    a: "A laptop or tablet with a webcam and a reliable internet connection. A cheap stylus or a phone camera pointed at paper helps for handwritten maths working - nothing specialised is required.",
  },
];

export default function BestOnlineTutoringVictoriaPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main style={{ background: c.white, fontFamily: "'DM Sans', sans-serif", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <MarketingNav />

      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>2026 guide</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Best online tutoring in Victoria.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Wherever you are in the state - Melbourne, Geelong, Ballarat, Bendigo or a regional town - online tutoring gives your child access to the same specialist, high-achieving tutors. Here is how the options compare and what separates the good ones.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/directory" style={{ padding: "14px 28px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Browse Tuterly tutors →
              </Link>
              <Link href="/best-online-tutoring-melbourne" style={{ padding: "14px 28px", borderRadius: 10, border: `2px solid ${c.border}`, color: c.text, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Melbourne guide
              </Link>
            </div>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Why it matters here</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Online levels the playing field across the state.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              The biggest gap in tutoring is not price - it is access. A family in inner Melbourne can find a 99-ATAR Specialist Maths tutor down the road; a family in the regions often cannot. Online closes that gap.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "32px 24px 64px", background: c.offWhite }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: 14 }}>
            {WHY_ONLINE.map((w, i) => (
              <Fade key={w.title} delay={0.04 + i * 0.04}>
                <div style={{ background: c.white, borderRadius: 16, border: `1px solid ${c.border}`, padding: "22px 24px" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{w.title}</h3>
                  <p style={{ fontSize: 14.5, color: c.textLight, lineHeight: 1.65 }} dangerouslySetInnerHTML={{ __html: w.body }} />
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Across Victoria</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 18, lineHeight: 1.25 }}>
              Tutoring for families right across the state.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 20 }}>
              Because sessions run online, a Tuterly tutor can work with students in:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {REGIONS.map((r) => (
                <span key={r} style={{ fontSize: 14, color: c.navy, background: c.offWhite, border: `1px solid ${c.border}`, borderRadius: 999, padding: "8px 16px" }}>{r}</span>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>What to look for</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              Four things that separate the best.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {LOOK_FOR.map((q, i) => (
              <Fade key={q.title} delay={0.04 + i * 0.04}>
                <div style={{ background: c.white, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{q.title}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}>{q.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Where Tuterly fits</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Specialist tutors, statewide.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              Tuterly is an online tutoring platform built by the team behind Bayside Academics in Melbourne. You choose your own vetted, high-achieving tutor and pay them directly, from $75 per hour, all-inclusive, with no lock-in contracts - and it works the same whether you are in the city or the country.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              After every session you get a structured report on what was covered and what to practise next, plus practice worksheets and a progress dashboard - so even from a distance you always know how your child is going.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Common questions</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              Online tutoring in Victoria, answered.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {FAQS.map((f, i) => (
              <Fade key={f.q} delay={0.03 + i * 0.03}>
                <div style={{ background: c.white, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{f.q}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}>{f.a}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "72px 24px", background: c.white }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              See real tutors before you commit.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 28 }}>
              Browse Tuterly tutors with their actual hourly rates - no signup, no enquiry form - and get matched with a specialist for your child, wherever you are in Victoria.
            </p>
            <Link href="/directory" style={{ display: "inline-block", padding: "14px 32px", borderRadius: 10, background: c.teal, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Browse the directory →
            </Link>
          </Fade>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}

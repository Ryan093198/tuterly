import AppCtaBand from "@/components/study/AppCtaBand";
import { AppHeroBlock } from "@/components/study/TutoringPageApp";
import { SITE_URL } from "@/lib/site";
import { STUDY_APP } from "@/lib/study-app";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const TITLE = "Best Online Tutoring in Victoria: 2026 Guide";
const DESCRIPTION =
  "The best online tutoring in Victoria, from Melbourne to the regions. Why online levels the playing field outside the city, what to look for, and where a Years 7 to 10 maths practice app fits.";
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
    body: "In a regional town the pool of local tutors is small, and a high-ATAR VCE Specialist Maths tutor may simply not exist within an hour’s drive. Online removes the radius entirely: your child can work with a subject specialist based anywhere in the state.",
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
    title: "A clear picture of each session",
    body: "The best online tutoring keeps you in the loop: what was covered, how your child went, what to practise next. When you cannot be in the room, that visibility matters even more.",
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
    a: "There is no single best for everyone. Fully managed national agencies suit families who want a hands-off service and do not mind paying a premium. If you would rather choose your own tutor and see the rate upfront, look at platforms and independent tutors. Match the type to your family.",
  },
  {
    q: "How much does online tutoring cost in Victoria?",
    a: "National online agencies typically charge $90 to $150 an hour, and a private tutor usually costs $80 to $100 an hour. Independent tutors are often cheaper. If what your child mainly needs is Years 7 to 10 maths practice rather than lessons, Tuterly is a 1-week free trial, then $7.99 a week, and works the same anywhere in Victoria.",
  },
  {
    q: "Can online tutoring cover VCE across all of Victoria?",
    a: "Yes. Every Victorian student sits the same VCAA curriculum and VCE exams, so a specialist online tutor in Methods, English, Biology, Chemistry or Physics is relevant statewide, from Melbourne to the regions.",
  },
  {
    q: "What do you need to get started online?",
    a: "A laptop or tablet with a webcam and a reliable internet connection. A cheap stylus or a phone camera pointed at paper helps for handwritten maths working. Nothing specialised is required.",
  },
  {
    q: "Is Tuterly online tutoring?",
    a: "No. Tuterly is an iPhone app for Years 7 to 10 maths, not a tutor. Your child snaps the questions they got wrong, sees the worked solution, and practises similar questions until each one is mastered. Topics follow the Victorian Curriculum 2.0, so it fits the same course wherever you live in the state. It is coming soon to the App Store.",
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
    <main style={{ background: c.white, fontFamily: "var(--font-display)", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <MarketingNav />

      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>2026 guide</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Best online tutoring in Victoria.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Wherever you are in the state, from Melbourne to Geelong, Ballarat, Bendigo or a small regional town, online tutoring gives your child access to the same specialist tutors. Here is how the options compare, what separates the good ones, and where our Years 7 to 10 maths app, Tuterly, fits.
            </p>
            <AppHeroBlock placement="best_online_tutoring_victoria_hero" />
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Why it matters here</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Online levels the playing field across the state.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              The biggest gap in tutoring is not price. It is access. A family in inner Melbourne can find a 99-ATAR Specialist Maths tutor down the road; a family in the regions often cannot. Online closes that gap.
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
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{w.title}</h3>
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
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Across Victoria</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 18, lineHeight: 1.25 }}>
              Help for families right across the state.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 20 }}>
              Because sessions run online, a good online tutor can work with students anywhere in the state, and {STUDY_APP.name} works the same on an iPhone in any of these places:
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
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>What to look for</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              Four things that separate the best.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {LOOK_FOR.map((q, i) => (
              <Fade key={q.title} delay={0.04 + i * 0.04}>
                <div style={{ background: c.white, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{q.title}</h3>
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
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Where Tuterly fits</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Years 7 to 10 maths practice, statewide.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              {STUDY_APP.name} is an iPhone app, not a tutoring service. It was designed by Australian educators at Bayside Academics in Brighton, Melbourne, and its topics follow the Victorian Curriculum 2.0, the same course whether your child is at school in the city or the country. Your child snaps the maths questions they got wrong (or uploads a whole marked test), sees the worked solution when they’re ready, and practises similar questions on the same idea until each one is mastered.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 14 }}>
              There’s no travel and nothing to book, which matters most where tutors are hard to find. Parents link with a 6-character code and see Week in review: what was added and mastered, test scores and the trickiest topic. It’s a 1-week free trial, then $7.99 a week, cancel any time.
            </p>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75 }}>
              It doesn’t replace a tutor. For VCE, English, or a child who needs someone to teach a topic live, an online tutor is the better choice. The app is for the practice in between, or instead, when practice is mostly what your child needs.
            </p>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Common questions</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 28, lineHeight: 1.25 }}>
              Online tutoring in Victoria, answered.
            </h2>
          </Fade>
          <div style={{ display: "grid", gap: 14 }}>
            {FAQS.map((f, i) => (
              <Fade key={f.q} delay={0.03 + i * 0.03}>
                <div style={{ background: c.white, borderRadius: 14, border: `1px solid ${c.border}`, padding: "20px 22px" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{f.q}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}>{f.a}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>


      <AppCtaBand placement="best_online_tutoring_victoria_final" />
      <MarketingFooter />
    </main>
  );
}

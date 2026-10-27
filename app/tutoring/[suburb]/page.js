import Link from "next/link";
import AppCtaBand from "@/components/study/AppCtaBand";
import { notFound } from "next/navigation";
import {
  SEO_SUBURBS,
  getSeoSuburb,
  isPublishable,
} from "@/lib/seo-suburbs";
import { SITE_URL } from "@/lib/site";
import { STUDY_APP, STUDY_APP_FACTS } from "@/lib/study-app";
import { PRICING } from "@/lib/pricing";
import {
  c,
  MARKETING_FONTS_IMPORT,
} from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { AppHeroBlock } from "@/components/study/TutoringPageApp";
import AppPracticeBlock from "@/components/study/AppPracticeBlock";
import MadeByEducators from "@/components/study/MadeByEducators";
import PriceTrial from "@/components/study/PriceTrial";

// /tutoring/[suburb] - programmatic SEO landing pages. Each page still
// answers "tutoring in <suburb>" for Melbourne parents, but since Oct 2026
// the tutor marketplace is paused and the only call to action is the
// Tuterly Study app (Years 7 to 10 maths). Static content per suburb comes
// from lib/seo-suburbs.js. App facts only from TUTERLY-STUDY-FEATURES.md.

const kicker = { fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 };
const h2 = { fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 };
const body = { fontSize: 16, color: c.textLight, lineHeight: 1.7 };

const APP_STEPS = [
  { title: "Snap a question", text: "Take a photo of a maths question they got wrong, or upload a whole test as photos, a PDF or a Word document. The ones marked wrong are stored automatically." },
  { title: "See the worked solution", text: "A full worked solution, hidden behind Show solution so they can have another go first. Explain this shows the step that went wrong." },
  { title: "Practise a fresh version", text: "Straight away, a similar question on the same idea that’s genuinely different, not just new numbers. Every one is solved a second time by an independent check." },
  { title: "Until it’s mastered", text: "Each question moves from To fix to Learning to Mastered (three stars, or “I’ve got it”), then they can try a harder one." },
  { title: "Before a test", text: "Test any topic writes a short test on any topic in their year. Fix my mistakes drills the ones they got wrong, and Study notes makes a one-page revision sheet." },
  { title: "Parents see the week", text: "Link with a 6-character code to see Week in review: what was added and mastered, test scores and the trickiest topic. Not their photos." },
];

export function generateStaticParams() {
  return SEO_SUBURBS.map((s) => ({ suburb: s.slug }));
}

export async function generateMetadata({ params }) {
  const { suburb: slug } = await params;
  const data = getSeoSuburb(slug);
  if (!data) return {};
  const title = `Tutoring in ${data.name} | Tuterly`;
  const description = `Tutoring in ${data.name}: a private tutor usually costs $${PRICING.tutorCompareLow} to $${PRICING.tutorCompareHigh} an hour. For Years 7 to 10 maths, ${STUDY_APP.name} lets your child practise the exact questions they get wrong.`;
  const url = `${SITE_URL}/tutoring/${slug}`;
  const robots = isPublishable(data)
    ? undefined
    : { index: false, follow: false };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    ...(robots ? { robots } : {}),
  };
}

export default async function SuburbPage({ params }) {
  const { suburb: slug } = await params;
  const data = getSeoSuburb(slug);
  if (!data) notFound();

  const neighbours = (data.neighbouring ?? [])
    .map(getSeoSuburb)
    .filter(Boolean);

  const name = STUDY_APP.name;
  const low = PRICING.tutorCompareLow;
  const high = PRICING.tutorCompareHigh;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Tutoring in ${data.name}`,
    url: `${SITE_URL}/tutoring/${slug}`,
    contentLocation: { "@type": "Place", name: `${data.name}, Victoria, Australia` },
    about: {
      "@type": "MobileApplication",
      name,
      operatingSystem: "iOS",
      applicationCategory: "EducationalApplication",
      description: `An iPhone app for ${STUDY_APP_FACTS.years} ${STUDY_APP_FACTS.subject}: students snap the questions they get wrong and practise fresh versions until each one is mastered.`,
      publisher: { "@type": "Organization", name: "Tuterly", url: SITE_URL },
    },
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
            <p style={kicker}>Tutoring in {data.name}</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Tutoring in {data.name}
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              {data.blurb ||
                `Looking for tutoring in ${data.name}? Help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, ${name} is an iPhone app that does the practice part.`}
            </p>
            <AppHeroBlock placement="suburb_hero" />
          </Fade>
        </div>
      </section>

      {/* TUTOR OR APP */}
      <section style={{ padding: "56px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={kicker}>What families are choosing between</p>
            <h2 style={h2}>A private tutor, or practising the questions they get wrong.</h2>
            <p style={{ ...body, marginBottom: 24 }}>
              They do different jobs, and some families use both. Here’s how they compare for Years 7 to 10 maths.
            </p>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            <div style={{ background: c.white, borderRadius: 18, border: `1px solid ${c.border}`, padding: "24px 22px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: c.navy, marginBottom: 6 }}>A private tutor</h3>
              <p style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 10 }}>Usually ${low} to ${high} an hour in Melbourne</p>
              <p style={{ fontSize: 14.5, color: c.textLight, lineHeight: 1.65 }}>
                A person who can explain a topic face to face, keep your child accountable each week, and help with any subject or year level, including English, primary and VCE.
              </p>
            </div>
            <div style={{ background: c.white, borderRadius: 18, border: `2px solid ${c.teal}`, padding: "24px 22px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: c.navy, marginBottom: 6 }}>{name}</h3>
              <p style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 10 }}>1-week free trial, then ${STUDY_APP.priceWeek} a week</p>
              <p style={{ fontSize: 14.5, color: c.textLight, lineHeight: 1.65 }}>
                An iPhone app for Years 7 to 10 maths. Your child snaps the questions they got wrong and practises fresh versions until each one is mastered, any day of the week. {STUDY_APP.priceVsTutor}
              </p>
            </div>
          </div>
          <p style={{ ...body, fontSize: 15, marginTop: 20 }}>
            Already have a tutor? They can link to {name} too, see the questions your child has been getting wrong before a session, and set snap goals for the week.
          </p>
        </div>
      </section>

      {/* WHAT THE APP DOES */}
      <section style={{ padding: "64px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={kicker}>How {name} works</p>
            <h2 style={h2}>What the app does for Years 7 to 10 maths.</h2>
          </Fade>
          <ol style={{ display: "grid", gap: 12, listStyle: "none", padding: 0, margin: 0 }}>
            {APP_STEPS.map((s, i) => (
              <li key={s.title} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: c.offWhite, borderRadius: 14, border: `1px solid ${c.border}`, padding: "16px 18px" }}>
                <span aria-hidden="true" style={{ flex: "0 0 28px", height: 28, borderRadius: 999, background: c.teal, color: c.white, fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 4 }}>{s.title}</p>
                  <p style={{ fontSize: 14.5, color: c.textLight, lineHeight: 1.6 }}>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SCHOOLS */}
      {data.schools?.length > 0 && (
        <section style={{ padding: "56px 24px", background: c.offWhite }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <Fade>
              <p style={kicker}>Schools in the area</p>
              <h2 style={h2}>
                Schools in and around {data.name}.
              </h2>
              <p style={{ ...body, marginBottom: 20 }}>
                {name} topics follow the {STUDY_APP_FACTS.curriculum} for Years 7 to 10 maths. Whichever school your child attends, they can upload their real tests, so their practice comes from what their own teacher set.
              </p>
              <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
                {data.schools.map((s) => (
                  <li key={s.name} style={{ background: c.white, borderRadius: 12, border: `1px solid ${c.border}`, padding: "14px 18px" }}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: c.navy, marginBottom: s.note ? 2 : 0 }}>{s.name}</p>
                    {s.note && <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.5 }}>{s.note}</p>}
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
        </section>
      )}

      {/* WHAT PARENTS NEED HELP WITH */}
      {data.parentNeeds && (
        <section style={{ padding: "56px 24px", background: c.white }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <Fade>
              <p style={kicker}>What local families look for</p>
              <h2 style={h2}>
                What parents in {data.name} typically need help with.
              </h2>
              <p style={body}>{data.parentNeeds}</p>
            </Fade>
          </div>
        </section>
      )}

      {/* PRACTICE TEST */}
      <AppPracticeBlock placement="suburb_practice" heading="A practice maths test before their next one." />

      {/* DESIGNED BY EDUCATORS + PRICE */}
      <div className="tb">
        <MadeByEducators id="suburb-educators" />
        <section className="tb-section">
          <div className="tb-wrap tb-wrap--narrow">
            <PriceTrial id="suburb-price" />
          </div>
        </section>
      </div>

      {/* NEARBY SUBURBS - INTERNAL LINKS */}
      {neighbours.length > 0 && (
        <section style={{ padding: "48px 24px 72px", background: c.offWhite }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={kicker}>Tutoring in nearby suburbs</p>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
              {neighbours.map((n) => (
                <li key={n.slug}>
                  <Link href={`/tutoring/${n.slug}`} style={{ display: "inline-block", padding: "8px 14px", borderRadius: 999, border: `1px solid ${c.border}`, background: c.white, color: c.text, fontSize: 14, textDecoration: "none" }}>
                    {n.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/tutoring" style={{ display: "inline-block", padding: "8px 14px", borderRadius: 999, border: `1px solid ${c.border}`, background: c.white, color: c.teal, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                  All Melbourne suburbs
                </Link>
              </li>
            </ul>
          </div>
        </section>
      )}

      <AppCtaBand placement="suburb_final" />
      <MarketingFooter />
    </main>
  );
}

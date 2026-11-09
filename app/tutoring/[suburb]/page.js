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
import SuburbHero from "@/components/study/SuburbHero";
import NotYetTutor from "@/components/study/NotYetTutor";
import AppPracticeBlock from "@/components/study/AppPracticeBlock";
import MadeByEducators from "@/components/study/MadeByEducators";
import PriceTrial from "@/components/study/PriceTrial";
import LaunchPrice from "@/components/study/LaunchPrice";

// /tutoring/[suburb] - suburb landing pages.
// 9 Nov 2026 (Ryan): reframed around Tuterly itself: it follows each
// child's own school (their tests, past papers and class notes, via Exam
// Zone), and it's built from what the Bayside Academics tutors know works.
// Local content (schools, what families look for) comes from
// lib/seo-suburbs.js, so each page is genuinely about that suburb.
//
// Previously: Each page still
// answers "tutoring in <suburb>" for Melbourne parents, but since Oct 2026
// the tutor marketplace is paused and the only call to action is the
// Tuterly app (Years 7 to 10 maths). Static content per suburb comes
// from lib/seo-suburbs.js. App facts only from TUTERLY-STUDY-FEATURES.md.

const kicker = { fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 };
const h2 = { fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 };
const body = { fontSize: 16, color: c.textLight, lineHeight: 1.7 };

const APP_STEPS = [
  { title: "Snap a question", text: "Take a photo of a maths question they got wrong, or upload a whole test as photos, a PDF or a Word document. The ones marked wrong are stored automatically." },
  { title: "See the worked solution", text: "A full worked solution, hidden behind Show solution so they can have another go first. Explain this shows the step that went wrong." },
  { title: "Practise a fresh version", text: "Straight away, a similar question on the same idea that’s genuinely different, not just new numbers. Every one is solved a second time by an independent check." },
  { title: "Until it’s mastered", text: "Each question moves from To fix to Learning to Mastered (three stars, or “I’ve got it”), then they can try a harder one." },
  { title: "Before a test", text: "Topic check writes a short test on any topic in their year. Fix my mistakes drills the ones they got wrong, and Study notes makes a revision sheet." },
  { title: "Parents see the week", text: "Link with a 6-character code to see Week in review: what was added and mastered, test scores and the trickiest topic. Not their photos." },
];

export function generateStaticParams() {
  return SEO_SUBURBS.map((s) => ({ suburb: s.slug }));
}

export async function generateMetadata({ params }) {
  const { suburb: slug } = await params;
  const data = getSeoSuburb(slug);
  if (!data) return {};
  const title = `Maths Tutoring in ${data.name}, Years 7 to 10, in an App | Tuterly`;
  const first = data.schools?.[0]?.name;
  const description = `Maths help for ${data.name} students in Years 7 to 10${first ? `, including ${first}` : ""}. Built by Melbourne tutors, Tuterly follows your child's own school: their tests, past papers and class notes. Launch price: 50% off until 31 March 2027.`;
  const url = `${SITE_URL}/tutoring/${slug}`;
  const robots = isPublishable(data)
    ? undefined
    : { index: false, follow: false };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { images: ["/og-tuterly.png"], title, description, url, type: "website" },
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
  const schoolNames = (data.schools || []).map((x) => x.name).slice(0, 3);
  const schoolList = schoolNames.length > 1 ? `${schoolNames.slice(0, -1).join(", ")} or ${schoolNames[schoolNames.length - 1]}` : schoolNames[0] || "";
  const faqs = [
    {
      q: `Is ${name} a tutoring service in ${data.name}?`,
      a: `${name} is an app, not a tutor who comes to your home. It's built by the team behind Bayside Academics, a tutoring centre in Brighton, and turns what works in their sessions into daily practice: find the exact mistake, explain it, practise a fresh version until it sticks, and prepare for the way your school writes its tests. If you'd like a tutor in person, Bayside Academics tutors in Melbourne's bayside suburbs.`,
    },
    {
      q: `Does it follow what ${schoolNames[0] || `my child's school in ${data.name}`} teaches?`,
      a: `Yes. Topics follow the Victorian Curriculum for Years 7 to 10 maths, and Exam Zone works from your child's own school: upload the test outline, past papers and class notes, and ${name} writes practice exams in the same style before the real one. Every school sets its tests a little differently, so it follows theirs.`,
    },
    {
      q: `How much does it cost compared with a tutor in ${data.name}?`,
      a: `A private maths tutor in Melbourne usually costs $${low} to $${high} an hour. ${name} is ${STUDY_APP.priceLine}, and your child can use it any day of the week. Some families use both.`,
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Maths tutoring in ${data.name}, Years 7 to 10`,
    url: `${SITE_URL}/tutoring/${slug}`,
    contentLocation: { "@type": "Place", name: `${data.name}, Victoria, Australia` },
    about: {
      "@type": "MobileApplication",
      name,
      operatingSystem: "iOS",
      applicationCategory: "EducationalApplication",
      description: `An iPhone app for ${STUDY_APP_FACTS.years} ${STUDY_APP_FACTS.subject} (Android coming soon): students snap the questions they get wrong and practise fresh versions until each one is mastered.`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }}
      />

      <MarketingNav />

      {/* HERO */}
      <SuburbHero
        kicker={`Maths tutoring in ${data.name} · Years 7 to 10`}
        h1={`Looking for a maths tutor in ${data.name}? You might not need one just yet.`}
        lead={`${schoolList
          ? `Whether your child is at ${schoolList}, ${name} works from their own school: upload their test outline, past papers and class notes, and it works out what's on their next test and how their school writes its questions.`
          : `${name} works from your child's own school: upload their test outline, past papers and class notes, and it works out what's on their next test and how their school writes its questions.`} It's built by the team behind Bayside Academics, a Melbourne tutoring centre, and puts what works in tutoring into an iPhone app (Android coming soon).`}
        placement="suburb_hero"
      />

      {/* NOT YET A TUTOR (9 Nov 2026): the founder angle, straight under the hero */}
      <NotYetTutor suburbName={data.name} region={data.region} />

      {/* BUILT BY TUTORS */}
      <section style={{ padding: "56px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={kicker}>From Melbourne tutors</p>
            <h2 style={h2}>What works in a tutoring session, rebuilt as an app.</h2>
            <p style={{ ...body, marginBottom: 16 }}>
              {name} comes from the team behind Bayside Academics, a tutoring centre in Brighton. Years of one-on-one sessions showed us what actually moves a maths mark, and it&rsquo;s rarely another worksheet:
            </p>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {[
              ["Start with their mistakes", "A good tutor looks at what your child got wrong first. In the app, they snap it and see exactly where it went wrong."],
              ["Practise until it sticks", "Then a fresh question on the same idea, and another, until it's mastered, not just explained once."],
              ["Prepare for their school's test", "Tutors use the school's own outline and past papers. Exam Zone does the same, and writes practice exams in that style."],
              ["Keep parents in the loop", "A weekly summary of what was practised and mastered, like a tutor's note after each session."],
            ].map(([t, x]) => (
              <div key={t} style={{ background: c.white, borderRadius: 16, border: `1px solid ${c.border}`, padding: "18px 18px" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 6 }}>{t}</p>
                <p style={{ fontSize: 14.5, color: c.textLight, lineHeight: 1.6 }}>{x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TUTOR OR APP */}
      <section style={{ padding: "56px 24px", background: c.white }}>
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
              <p style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 10 }}><LaunchPrice /></p>
              <p style={{ fontSize: 14.5, color: c.textLight, lineHeight: 1.65 }}>
                An iPhone app for Years 7 to 10 maths, with Android coming soon. Your child snaps the questions they got wrong and practises fresh versions until each one is mastered, any day of the week. {STUDY_APP.priceVsTutor}
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
              <p style={kicker}>Follows your child&rsquo;s school</p>
              <h2 style={h2}>
                Every school in {data.name} tests maths a little differently.
              </h2>
              <p style={{ ...body, marginBottom: 20 }}>
                The topics follow the {STUDY_APP_FACTS.curriculum}, but each school chooses its own order, its own question style and its own tests. Upload your child&rsquo;s test outline, past papers and teacher&rsquo;s notes, and Exam Zone works out what&rsquo;s on their next test and writes practice exams in their school&rsquo;s style, before the real one. Schools in and around {data.name}:
              </p>
              <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
                {data.schools.map((s) => (
                  <li key={s.name} style={{ background: c.white, borderRadius: 12, border: `1px solid ${c.border}`, padding: "14px 18px" }}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: c.navy, marginBottom: s.note ? 2 : 0 }}>{s.name}</p>
                    {s.note && <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.5 }}>{s.note}</p>}
                  </li>
                ))}
              </ul>
              <p style={{ ...body, fontSize: 15, marginTop: 16 }}>
                <Link href="/features/exam-zone" style={{ color: c.teal, fontWeight: 700 }}>See how Exam Zone works →</Link>
              </p>
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

      {/* FAQ */}
      <section style={{ padding: "56px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={kicker}>Questions from {data.name} parents</p>
          <div style={{ display: "grid", gap: 12 }}>
            {faqs.map((f) => (
              <div key={f.q} style={{ background: c.offWhite, borderRadius: 14, border: `1px solid ${c.border}`, padding: "18px 20px" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: c.navy, marginBottom: 6 }}>{f.q}</h3>
                <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.65 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEARBY SUBURBS - INTERNAL LINKS */}
      {neighbours.length > 0 && (
        <section style={{ padding: "48px 24px 72px", background: c.offWhite }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={kicker}>Maths help in nearby suburbs</p>
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

import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import Testimonials from "@/components/marketing/Testimonials";
import ContactCTA from "@/components/marketing/ContactCTA";
import FindTutorButton from "@/components/FindTutorButton";
import StudyAppCTA from "@/components/StudyAppCTA";
import WeeklySummaryCard from "@/components/study/WeeklySummaryCard";
import { c } from "@/components/marketing/theme";
import { STUDY_APP, isStudyAppLive } from "@/lib/study-app";
import { PRICING } from "@/lib/pricing";

// /parents: the parent's view of Tuterly Study, with tutoring kept as the
// second option further down. Metadata lives in ./layout.js (unchanged).
//
// The previous tutoring-first version of this page is in git history
// (commit before "Phase 3"). Product facts come from TUTERLY-STUDY-SPEC.md
// sections 5, 7.6 and 14; testimonials only render from lib/testimonials.js
// and the ones that exist are about tutoring, so they sit in the tutoring
// section.

const font = "var(--font-inter), 'Helvetica Neue', Arial, sans-serif";
const wrap = { maxWidth: 1120, margin: "0 auto" };
const eyebrow = { fontSize: 12.5, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", color: c.tealDark, margin: "0 0 12px" };
const h2 = { fontSize: 34, lineHeight: 1.15, letterSpacing: "-0.8px", fontWeight: 800, color: c.navy, margin: "0 0 14px" };
const lead = { fontSize: 17, lineHeight: 1.7, color: c.textLight, margin: 0, maxWidth: 660 };
const card = { background: c.white, border: `1px solid ${c.border}`, borderRadius: 18, padding: 26 };

export default function ParentsPage() {
  const name = STUDY_APP.name;
  const live = isStudyAppLive();

  return (
    <div className="pp" style={{ fontFamily: font, color: c.text, background: c.white }}>
      <style>{`
        .pp * { box-sizing: border-box; }
        .pp h1, .pp h2, .pp h3, .pp p { margin-top: 0; }
        .pp-2 { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: center; }
        .pp-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .pp-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .pp details > summary { cursor: pointer; list-style: none; }
        .pp details > summary::-webkit-details-marker { display: none; }
        @media (max-width: 900px) {
          .pp-2, .pp-cols { grid-template-columns: 1fr; gap: 32px; }
          .pp-3 { grid-template-columns: 1fr; }
          .pp-h1 { font-size: 36px !important; letter-spacing: -1px !important; }
          .pp-h2 { font-size: 28px !important; }
          .pp-section { padding: 60px 16px !important; }
        }
      `}</style>

      <MarketingNav />

      {/* HERO */}
      <section className="pp-section" style={{ padding: "72px 24px 88px", background: "linear-gradient(180deg, #FFFFFF 0%, #F0FDFA 100%)" }}>
        <div className="pp-2" style={wrap}>
          <div>
            <p style={eyebrow}>For parents · Years 7 to 10 maths</p>
            <h1 className="pp-h1" style={{ fontSize: 50, lineHeight: 1.08, letterSpacing: "-1.4px", fontWeight: 800, color: c.navy, margin: "0 0 20px" }}>
              Know what your child gets wrong in maths, and see it get fixed.
            </h1>
            <p style={{ ...lead, fontSize: 18, marginBottom: 28 }}>
              With {`${name}, `}your child snaps the maths questions they get wrong and practises fresh versions until each one is fixed. You get a weekly summary of what they snapped, what they fixed and what’s left, plus their test score in each topic.
            </p>
            <StudyAppCTA variant="hero" placement="parents_hero" />
          </div>
          <WeeklySummaryCard />
        </div>
      </section>

      {/* WHAT YOU SEE */}
      <section className="pp-section" style={{ padding: "88px 24px" }} aria-labelledby="see">
        <div style={wrap}>
          <p style={eyebrow}>The parent view</p>
          <h2 id="see" className="pp-h2" style={h2}>What you see, and what you don’t.</h2>
          <p style={{ ...lead, marginBottom: 32 }}>
            Your child owns the account. You get enough to know how they’re going and what to ask about, without reading over their shoulder.
          </p>
          <div className="pp-cols">
            <div style={card}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: c.navy, margin: "0 0 14px" }}>You see</h3>
              <List items={[
                "A weekly summary: how many questions they snapped, how many they fixed, and how many are left.",
                "Their latest test score in each topic, like “Algebra · Linear equations”.",
                "Progress on any snap goal their tutor has set.",
              ]} />
            </div>
            <div style={card}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: c.navy, margin: "0 0 14px" }}>You don’t see</h3>
              <List muted items={[
                "The photos of their work. Those stay private to your child and any tutor they link.",
                "Every individual question. You see topics and scores instead.",
              ]} />
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: c.textLight, margin: "16px 0 0" }}>
                Photos and questions are never reused for anyone else. Your child can remove your link, delete a question, or delete their account at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW LINKING WORKS */}
      <section className="pp-section" style={{ padding: "88px 24px", background: c.offWhite }} aria-labelledby="link">
        <div style={wrap}>
          <p style={eyebrow}>Getting set up</p>
          <h2 id="link" className="pp-h2" style={h2}>Linking takes a code, not a password.</h2>
          <div className="pp-3" style={{ marginTop: 28 }}>
            <Step n="1" title="Your child signs up">They create their own account on their iPhone and pick their year level (7 to 10).</Step>
            <Step n="2" title="They share a code">In Settings they find a 6-character code, or invite you by email.</Step>
            <Step n="3" title="You see the summary">Enter the code in the app and you’ll see their weekly summary and topic scores.</Step>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: c.textLight, margin: "24px 0 0", maxWidth: 760 }}>
            {live
              ? `${name} is on the App Store for iPhone.`
              : `${name} is in a small pilot with Bayside Academics students right now, and every student's parent gives written consent before they're added. It isn't on the App Store yet.`}
          </p>
        </div>
      </section>

      {/* AT HOME */}
      <section className="pp-section" style={{ padding: "88px 24px" }} aria-labelledby="home">
        <div style={{ ...wrap, maxWidth: 860 }}>
          <p style={eyebrow}>Using the summary</p>
          <h2 id="home" className="pp-h2" style={h2}>Three questions worth asking at dinner.</h2>
          <List items={[
            "“Which topic has the most to fix?” It’s usually the one to take a test in next.",
            "“Did you snap the ones from the test you got back?” A marked school test is the best source of questions to fix.",
            "“What did Explain this say?” Explaining a step out loud is a good check that it has stuck.",
          ]} />
        </div>
      </section>

      {/* FREE RESOURCES */}
      <section className="pp-section" style={{ padding: "72px 24px", background: c.offWhite }}>
        <div style={{ ...wrap, maxWidth: 860, textAlign: "center" }}>
          <h2 className="pp-h2" style={{ ...h2, fontSize: 28 }}>Free maths practice, no app needed</h2>
          <p style={{ ...lead, margin: "0 auto 22px" }}>Anything they get wrong on these is exactly what to snap.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/worksheets" style={pill}>Free worksheets</Link>
            <Link href="/practice-maths-tests-secondary" style={pill}>Practice tests, Years 7 to 10</Link>
            <Link href="/practice-maths-tests-primary" style={pill}>Practice tests, Years 3 to 6</Link>
          </div>
        </div>
      </section>

      {/* TUTORING, SECOND OPTION */}
      <section className="pp-section" style={{ padding: "88px 24px" }} aria-labelledby="tutor">
        <div className="pp-cols" style={{ ...wrap, alignItems: "start" }}>
          <div>
            <p style={eyebrow}>Prefer a real tutor?</p>
            <h2 id="tutor" className="pp-h2" style={h2}>Bayside Academics can help.</h2>
            <p style={{ ...lead, marginBottom: 18 }}>
              Some children need a person: someone to explain it a different way, plan what comes next, or cover a subject the app doesn’t. Our tutors cover primary through VCE, with a written report after every session. Sessions from ${PRICING.sessionFrom} an hour, all-inclusive, no lock-in.
            </p>
            <p style={{ ...lead, fontSize: 15.5, marginBottom: 24 }}>
              Tutors can link to {name} too, look through your child’s mistakes before a session and set snap goals.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <FindTutorButton source="parents_page" style={{ padding: "12px 20px", borderRadius: 12, border: `1.5px solid ${c.navy}`, background: c.white, color: c.navy, fontSize: 14.5, fontWeight: 600 }}>
                Find a local tutor
              </FindTutorButton>
              <Link href="/directory" style={{ padding: "12px 20px", borderRadius: 12, border: `1.5px solid ${c.border}`, color: c.navy, fontSize: 14.5, fontWeight: 600, textDecoration: "none" }}>Browse tutors</Link>
              <Link href="/sample-report" style={{ padding: "12px 20px", borderRadius: 12, color: c.tealDark, fontSize: 14.5, fontWeight: 600, textDecoration: "none" }}>See a sample report →</Link>
            </div>
          </div>
          <ContactCTA variant="card" headline="Not sure which is right for your child?" subhead="Tell us a bit about them and we'll give you a straight answer, app or tutor." context="parents page" />
        </div>
      </section>

      {/* Real, consented tutoring testimonials only (lib/testimonials.js).
          Renders nothing if none match. None are about the app yet. */}
      <Testimonials
        variant="feature"
        tags={["home", "parents"]}
        limit={4}
        palette={c}
        background={c.offWhite}
        headingFont={font}
        bodyFont={font}
        kicker="From our tutoring families"
        heading="What parents say about our tutors."
      />

      {/* FINAL CTA */}
      <section className="pp-section" style={{ padding: "88px 24px", background: c.navy }}>
        <div style={{ ...wrap, maxWidth: 760 }}>
          <h2 className="pp-h2" style={{ ...h2, color: c.white }}>Start with the next maths question they get wrong.</h2>
          <p style={{ ...lead, color: "rgba(255,255,255,0.72)", marginBottom: 28 }}>
            {name} is for Years 7 to 10 maths on iPhone. {STUDY_APP.priceLine}.
          </p>
          <StudyAppCTA variant="hero" placement="parents_final" tone="dark" />
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

const pill = { padding: "11px 18px", borderRadius: 999, border: `1px solid ${c.border}`, background: c.white, color: c.navy, fontSize: 14.5, fontWeight: 600, textDecoration: "none" };

function List({ items, muted }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
      {items.map((t) => (
        <li key={t} style={{ display: "flex", gap: 12, fontSize: 15.5, lineHeight: 1.6, color: c.text }}>
          <span aria-hidden="true" style={{ flex: "none", width: 22, height: 22, borderRadius: "50%", background: muted ? c.offWhite : c.tealPale, color: muted ? c.textMuted : c.tealDark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, marginTop: 1 }}>{muted ? "–" : "✓"}</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Step({ n, title, children }) {
  return (
    <div style={card}>
      <div aria-hidden="true" style={{ width: 34, height: 34, borderRadius: 10, background: c.tealPale, color: c.tealDark, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>{n}</div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: c.navy, margin: "0 0 8px" }}>{title}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.65, color: c.textLight, margin: 0 }}>{children}</p>
    </div>
  );
}

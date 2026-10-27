import Link from "next/link";
import katex from "katex";
import "katex/dist/katex.min.css";
import StudyAppCTA from "@/components/StudyAppCTA";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { c } from "@/components/marketing/theme";
import { STUDY_APP, isStudyAppLive } from "@/lib/study-app";
import { PRICING } from "@/lib/pricing";
import { getStudyFaqs } from "@/lib/study-faqs";
import WeeklySummaryCard from "@/components/study/WeeklySummaryCard";

// Home page for tuterly.com.au: the landing page for the Tuterly Study app.
// Server component. The only client pieces are StudyAppCTA and the nav.
//
// Copy rules (see TUTERLY-STUDY-FUNNEL-PROMPT.md): no invented numbers,
// ratings, results or testimonials; no claim that the app beats tutoring
// or lifts marks. Every product fact here comes from TUTERLY-STUDY-SPEC.md.

const font = "var(--font-inter), 'Helvetica Neue', Arial, sans-serif";
const serif = "'DM Serif Display', Georgia, serif";

function TeX({ children, display = false }) {
  const html = katex.renderToString(children, { displayMode: display, throwOnError: false, output: "html" });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

const eyebrow = {
  fontSize: 12.5,
  fontWeight: 700,
  letterSpacing: 1.4,
  textTransform: "uppercase",
  color: c.tealDark,
  margin: "0 0 12px",
};
const h2 = {
  fontSize: 36,
  lineHeight: 1.15,
  letterSpacing: "-0.8px",
  fontWeight: 800,
  color: c.navy,
  margin: "0 0 14px",
};
const lead = { fontSize: 17, lineHeight: 1.7, color: c.textLight, margin: 0, maxWidth: 640 };
const section = (bg = c.white) => ({ background: bg, padding: "88px 24px" });
const wrap = { maxWidth: 1120, margin: "0 auto" };

export default function StudyLanding() {
  const live = isStudyAppLive();
  const faqs = getStudyFaqs();
  const name = STUDY_APP.name;

  return (
    <div className="sl" style={{ fontFamily: font, color: c.text, background: c.white }}>
      <style>{`
        .sl * { box-sizing: border-box; }
        .sl h1, .sl h2, .sl h3, .sl p { margin-top: 0; }
        .sl a:focus-visible, .sl button:focus-visible, .sl summary:focus-visible { outline: 3px solid ${c.teal}; outline-offset: 2px; }
        .sl-hero { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 56px; align-items: center; }
        .sl-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .sl-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .sl-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .sl-table { width: 100%; border-collapse: collapse; font-size: 15px; }
        .sl-table th, .sl-table td { text-align: left; padding: 14px 16px; border-bottom: 1px solid ${c.border}; vertical-align: top; line-height: 1.55; }
        .sl-table thead th { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: ${c.textLight}; }
        .sl-table tbody th { color: ${c.navy}; font-weight: 600; width: 22%; }
        .sl details > summary { cursor: pointer; list-style: none; }
        .sl details > summary::-webkit-details-marker { display: none; }
        .sl .katex { font-size: 1.08em; }
        @media (max-width: 900px) {
          .sl-hero, .sl-2 { grid-template-columns: 1fr; gap: 36px; }
          .sl-3 { grid-template-columns: 1fr; }
          .sl-4 { grid-template-columns: 1fr 1fr; }
          .sl-h1 { font-size: 38px !important; letter-spacing: -1px !important; }
          .sl-h2 { font-size: 29px !important; }
          .sl-section { padding: 64px 16px !important; }
          .sl-table-wrap { overflow-x: auto; }
        }
        @media (max-width: 520px) {
          .sl-4 { grid-template-columns: 1fr; }
        }
      `}</style>

      <MarketingNav />

      {/* 1. HERO */}
      <section className="sl-section" style={{ ...section("linear-gradient(180deg, #FFFFFF 0%, #F0FDFA 100%)"), padding: "72px 24px 88px" }}>
        <div className="sl-hero" style={wrap}>
          <div>
            <p style={eyebrow}>{name} · Years 7 to 10 maths · iPhone</p>
            <h1 className="sl-h1" style={{ fontSize: 54, lineHeight: 1.06, letterSpacing: "-1.6px", fontWeight: 800, color: c.navy, margin: "0 0 20px" }}>
              Fix the maths questions your child gets <span style={{ color: c.tealDark }}>wrong</span>.
            </h1>
            <p style={{ ...lead, fontSize: 18.5, marginBottom: 14 }}>
              Snap a photo of a question they missed. {name} saves it with a full worked solution, then writes a fresh question on the same idea to practise until it’s fixed.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: c.navy, fontWeight: 600, margin: "0 0 28px" }}>
              It drills the questions your child actually gets wrong, not generic worksheets.
            </p>
            <div id="get-app" style={{ scrollMarginTop: 96 }}>
              <StudyAppCTA variant="hero" placement="home_hero" />
            </div>
          </div>
          <PhoneMockup />
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="sl-section" style={section()} aria-labelledby="how">
        <div style={wrap}>
          <p style={eyebrow}>How it works</p>
          <h2 id="how" className="sl-h2" style={h2}>Snap it. Try a fresh one. Test until it’s fixed.</h2>
          <p style={{ ...lead, marginBottom: 40 }}>
            Homework, a textbook, a school test or a practice paper: any question they got wrong, or didn’t know how to start, goes into their own bank.
          </p>
          <div className="sl-3">
            <Step n="1" title="Snap the question">
              Take a photo of the question. The app reads it and saves it with a full worked solution, hidden behind <strong>Show solution</strong> so they can have another go first.
            </Step>
            <Step n="2" title="Try a fresh version">
              Straight away it writes a similar question on the same concept that is genuinely different, not the same question with the numbers changed. Every generated question is solved a second time by an independent check before your child sees it.
            </Step>
            <Step n="3" title="Test until it's fixed">
              Topic practice tests are built fresh from their own unfixed mistakes each time. A question counts as <strong>fixed</strong> when they get a new version right in two tests on different days. Fixed questions drop out, so tests get shorter as they improve.
            </Step>
          </div>
          <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.65, margin: "28px 0 0", maxWidth: 760 }}>
            Got one wrong in a test? <strong style={{ color: c.navy }}>Explain this</strong> gives a short explanation of the one step that went wrong. Questions are sorted into topics like “Algebra · Linear equations”, each with a progress ring such as “6 to fix · 9 fixed”.
          </p>
        </div>
      </section>

      {/* 3. NOT THE SAME QUESTION WITH THE NUMBERS CHANGED */}
      <section className="sl-section" style={section(c.offWhite)} aria-labelledby="different">
        <div style={wrap}>
          <p style={eyebrow}>The part that matters</p>
          <h2 id="different" className="sl-h2" style={h2}>Not the same question with the numbers changed.</h2>
          <p style={{ ...lead, marginBottom: 36 }}>
            A question with only the numbers swapped can be answered by copying the steps from the last one. {name} keeps the same concepts and changes at least two other things: the context, the structure, the layout, the type of numbers, or how it’s shown. Here is the example from the rules its question writer follows.
          </p>
          <div className="sl-2">
            <div>
              <MathCard label="The question they got wrong" tone="navy">
                <p style={{ margin: 0 }}>Solve for <TeX>x</TeX>:</p>
                <p style={{ margin: "10px 0 0" }}><TeX display>{"\\frac{x+2}{3} = \\frac{2x-1}{5}"}</TeX></p>
                <Solution>
                  <p style={{ margin: "0 0 6px" }}>Multiply both sides by 15 (the lowest common denominator):</p>
                  <TeX display>{"5(x+2) = 3(2x-1)"}</TeX>
                  <TeX display>{"5x + 10 = 6x - 3 \\quad\\Rightarrow\\quad x = 13"}</TeX>
                  <p style={{ margin: "6px 0 0" }}>Check: <TeX>{"\\tfrac{15}{3} = 5"}</TeX> and <TeX>{"\\tfrac{25}{5} = 5"}</TeX>.</p>
                </Solution>
              </MathCard>
              <MathCard label="Not this: only the numbers changed" tone="rose">
                <p style={{ margin: 0 }}>Solve for <TeX>x</TeX>: <TeX>{"\\frac{x+4}{3} = \\frac{2x-3}{5}"}</TeX></p>
              </MathCard>
            </div>
            <div>
              <MathCard label="This: new context and layout, same concepts" tone="teal">
                <p style={{ margin: 0, lineHeight: 1.7 }}>
                  Mia’s phone plan costs a third of <TeX>{"(c + 6)"}</TeX> dollars a week. Leo’s costs a quarter of <TeX>{"(3c - 2)"}</TeX> dollars. For what value of <TeX>c</TeX> do they pay the same?
                </p>
                <Solution>
                  <TeX display>{"\\frac{c+6}{3} = \\frac{3c-2}{4}"}</TeX>
                  <p style={{ margin: "0 0 6px" }}>Multiply both sides by 12:</p>
                  <TeX display>{"4(c+6) = 3(3c-2) \\quad\\Rightarrow\\quad 4c + 24 = 9c - 6 \\quad\\Rightarrow\\quad c = 6"}</TeX>
                  <p style={{ margin: "6px 0 0" }}>Both pay $4 a week.</p>
                </Solution>
              </MathCard>
              <MathCard label="Or this: new structure, same concepts" tone="teal">
                <p style={{ margin: 0, lineHeight: 1.7 }}>
                  Sam solved <TeX>{"\\frac{x+1}{2} = \\frac{x-3}{4}"}</TeX> and got <TeX>{"x = 1"}</TeX>. Find his mistake and give the correct answer.
                </p>
                <Solution>
                  <p style={{ margin: "0 0 6px" }}>Multiply both sides by 4:</p>
                  <TeX display>{"2(x+1) = x - 3 \\quad\\Rightarrow\\quad 2x + 2 = x - 3 \\quad\\Rightarrow\\quad x = -5"}</TeX>
                  <p style={{ margin: "6px 0 0" }}>Sam’s <TeX>{"x = 1"}</TeX> comes from writing <TeX>{"x + 3"}</TeX> instead of <TeX>{"x - 3"}</TeX> on the right.</p>
                </Solution>
              </MathCard>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOR PARENTS */}
      <section className="sl-section" style={section()} aria-labelledby="parents">
        <div className="sl-2" style={{ ...wrap, alignItems: "center" }}>
          <div>
            <p style={eyebrow}>For parents</p>
            <h2 id="parents" className="sl-h2" style={h2}>See the progress without reading over their shoulder.</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0", display: "grid", gap: 18 }}>
              <Point title="A weekly summary">
                How many questions they snapped, how many they fixed, and how many are left, plus their latest test score in each topic.
              </Point>
              <Point title="Link with a code">
                Your child gives you a 6-character code from their settings. They can remove the link at any time.
              </Point>
              <Point title="Progress, not photos">
                You see topics and scores, not every photo of their work. The photos stay private to your child and any tutor they link.
              </Point>
            </ul>
          </div>
          <WeeklySummaryCard />
        </div>
      </section>

      {/* 5. COMPARED WITH TUTORING */}
      <section className="sl-section" style={section(c.offWhite)} aria-labelledby="compare">
        <div style={wrap}>
          <p style={eyebrow}>Compared with tutoring</p>
          <h2 id="compare" className="sl-h2" style={h2}>A different job from a tutor, at a different price.</h2>
          <p style={{ ...lead, marginBottom: 32 }}>
            We run a tutoring business too, so this isn’t a case against tutors. Some families will use {name} alongside a tutor, some instead of one. Here’s the plain difference.
          </p>
          <div className="sl-table-wrap" style={{ background: c.white, border: `1px solid ${c.border}`, borderRadius: 16 }}>
            <table className="sl-table">
              <thead>
                <tr>
                  <th scope="col"><span style={{ position: "absolute", left: -10000 }}>Compare</span></th>
                  <th scope="col">Private tutor</th>
                  <th scope="col">{name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Cost</th>
                  <td>
                    About ${PRICING.secondaryHourlyLow} to ${PRICING.secondaryHourlyHigh} an hour for Years 7 to 10 in Melbourne (<Link href="/tutoring-prices-melbourne" style={{ color: c.tealDark }}>see our price guide</Link>).
                  </td>
                  <td>
                    {live ? STUDY_APP.priceLine : "Free during the pilot. Pricing is set after the pilot, and we're aiming for a small fraction of the cost of one session a month."}
                  </td>
                </tr>
                <tr>
                  <th scope="row">When</th>
                  <td>Usually an hour a week, at a set time.</td>
                  <td>Any day they snap a question or take a topic test.</td>
                </tr>
                <tr>
                  <th scope="row">What it works on</th>
                  <td>What the tutor plans, plus whatever your child brings to the session.</td>
                  <td>Only the questions your child got wrong, until each one is fixed.</td>
                </tr>
                <tr>
                  <th scope="row">Explanations</th>
                  <td>A person who can explain it several ways and read how your child is going.</td>
                  <td>A full worked solution for every question, and <strong>Explain this</strong> for the step that went wrong.</td>
                </tr>
                <tr>
                  <th scope="row">Covers</th>
                  <td>Any year level and subject the tutor teaches.</td>
                  <td>Years 7 to 10 maths only, on iPhone.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="sl-2" style={{ marginTop: 28 }}>
            <div style={{ background: c.white, border: `1px solid ${c.border}`, borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: c.navy, margin: "0 0 8px" }}>Why practising your own mistakes</h3>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: c.textLight, margin: 0 }}>
                Working a fresh version of a question you got wrong makes you pull the method out of memory rather than reread it. That’s called retrieval practice. Coming back to it on a different day, after a gap, is spaced practice. {name} is built around both: new versions every test, and two right answers on different days before a question counts as fixed.
              </p>
            </div>
            <div style={{ background: c.white, border: `1px solid ${c.border}`, borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: c.navy, margin: "0 0 8px" }}>Already have a tutor?</h3>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: c.textLight, margin: "0 0 12px" }}>
                Tutors can link to your child’s account with a code, look through their bank of mistakes before a session, and set snap goals like “5 questions by Thursday”.
              </p>
              <p style={{ fontSize: 14.5, margin: 0 }}>
                Prefer a real tutor? <Link href="/find-a-tutor" style={{ color: c.tealDark, fontWeight: 600 }}>Bayside Academics can help</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FREE RESOURCES */}
      <section className="sl-section" style={section()} aria-labelledby="free">
        <div style={wrap}>
          <p style={eyebrow}>Free, no app needed</p>
          <h2 id="free" className="sl-h2" style={h2}>Free maths resources</h2>
          <p style={{ ...lead, marginBottom: 32 }}>Practise now. Anything they get wrong is exactly what to snap later.</p>
          <div className="sl-4">
            <Resource href="/worksheets" title="Free worksheets" body="Curriculum-matched maths worksheets for Years 3 to 10, with worked solutions." />
            <Resource href="/practice-maths-tests-secondary" title="Practice tests" body="Secondary maths practice tests, plus a primary set." />
            <Resource href="/atar-planner" title="ATAR planner" body="Plan VCE subjects and see what scores a course needs." />
            <Resource href="/learn" title="Learn" body="Guides for parents on Victorian maths, NAPLAN and study habits." />
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="sl-section" style={section(c.offWhite)} aria-labelledby="faq">
        <div style={{ ...wrap, maxWidth: 820 }}>
          <p style={eyebrow}>Questions</p>
          <h2 id="faq" className="sl-h2" style={h2}>Frequently asked questions</h2>
          <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
            {faqs.map((f) => (
              <details key={f.q} style={{ background: c.white, border: `1px solid ${c.border}`, borderRadius: 14, padding: "18px 22px" }}>
                <summary style={{ fontSize: 16.5, fontWeight: 650, color: c.navy, display: "flex", justifyContent: "space-between", gap: 16 }}>
                  <span>{f.q}</span>
                  <span aria-hidden="true" style={{ color: c.tealDark }}>+</span>
                </summary>
                <p style={{ fontSize: 15.5, lineHeight: 1.7, color: c.textLight, margin: "12px 0 0" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="sl-section" style={{ ...section(c.navy), textAlign: "left" }}>
        <div style={{ ...wrap, maxWidth: 760 }}>
          <h2 className="sl-h2" style={{ ...h2, color: c.white }}>Start with the next question they get wrong.</h2>
          <p style={{ ...lead, color: "rgba(255,255,255,0.72)", marginBottom: 28 }}>
            {name} turns every missed maths question into practice that’s about your child, not a generic worksheet.
          </p>
          <StudyAppCTA variant="hero" placement="home_final" tone="dark" />
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

function Step({ n, title, children }) {
  return (
    <div style={{ border: `1px solid ${c.border}`, borderRadius: 18, padding: 26, background: c.white }}>
      <div aria-hidden="true" style={{ width: 36, height: 36, borderRadius: 10, background: c.tealPale, color: c.tealDark, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{n}</div>
      <h3 style={{ fontSize: 19, fontWeight: 700, color: c.navy, margin: "0 0 10px" }}>{title}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.65, color: c.textLight, margin: 0 }}>{children}</p>
    </div>
  );
}

function MathCard({ label, tone, children }) {
  const color = tone === "rose" ? "#BE123C" : tone === "teal" ? c.tealDark : c.navy;
  return (
    <div style={{ background: c.white, border: `1px solid ${c.border}`, borderLeft: `4px solid ${color}`, borderRadius: 14, padding: "18px 20px", marginBottom: 16, fontSize: 16, color: c.text }}>
      <p style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color, margin: "0 0 10px" }}>{label}</p>
      {children}
    </div>
  );
}

function Solution({ children }) {
  return (
    <details style={{ marginTop: 12 }}>
      <summary style={{ display: "inline-block", fontSize: 14, fontWeight: 600, color: c.tealDark, border: `1px solid ${c.border}`, borderRadius: 999, padding: "6px 14px" }}>Show solution</summary>
      <div style={{ marginTop: 12, fontSize: 15, color: c.text, overflowX: "auto" }}>{children}</div>
    </details>
  );
}

function Point({ title, children }) {
  return (
    <li style={{ display: "flex", gap: 14 }}>
      <span aria-hidden="true" style={{ flex: "none", width: 24, height: 24, borderRadius: "50%", background: c.tealPale, color: c.tealDark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, marginTop: 2 }}>✓</span>
      <div>
        <p style={{ fontSize: 16.5, fontWeight: 700, color: c.navy, margin: "0 0 4px" }}>{title}</p>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: c.textLight, margin: 0 }}>{children}</p>
      </div>
    </li>
  );
}

function Resource({ href, title, body }) {
  return (
    <Link href={href} style={{ display: "block", textDecoration: "none", border: `1px solid ${c.border}`, borderRadius: 16, padding: 22, background: c.white, color: c.text }}>
      <p style={{ fontSize: 17, fontWeight: 700, color: c.navy, margin: "0 0 8px" }}>{title} →</p>
      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: c.textLight, margin: 0 }}>{body}</p>
    </Link>
  );
}

// Drawn in HTML rather than a screenshot until real pilot screenshots are
// chosen. Labelled as an illustration so it isn't mistaken for one.
function PhoneMockup() {
  return (
    <figure style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        role="img"
        aria-label={`Illustration of the ${STUDY_APP.name} app: a saved question in Algebra, Linear equations, with Show solution and Try a similar one buttons`}
        style={{ width: 290, maxWidth: "100%", borderRadius: 42, background: c.navy, padding: 12, boxShadow: "0 30px 70px rgba(15,23,42,0.25)" }}
      >
        <div style={{ borderRadius: 32, background: c.white, padding: "22px 18px 24px", minHeight: 520 }}>
          <div style={{ width: 90, height: 22, borderRadius: 12, background: c.navy, margin: "-10px auto 18px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <Ring pct={0.6} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: c.navy, margin: 0 }}>Algebra · Linear equations</p>
              <p style={{ fontSize: 12, color: c.textLight, margin: "2px 0 0" }}>6 to fix · 9 fixed</p>
            </div>
          </div>
          <div style={{ border: `1px solid ${c.border}`, borderRadius: 16, padding: 14, marginBottom: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: "uppercase", letterSpacing: 0.8, margin: "0 0 8px" }}>Your question</p>
            <div style={{ fontSize: 14, color: c.text }}>
              Solve for <TeX>x</TeX>: <TeX>{"\\frac{x+2}{3} = \\frac{2x-1}{5}"}</TeX>
            </div>
            <div style={{ marginTop: 12, background: c.offWhite, borderRadius: 10, padding: "10px 12px", fontSize: 13, fontWeight: 600, color: c.tealDark, textAlign: "center" }}>Show solution</div>
          </div>
          <div style={{ border: `1px solid rgba(10,186,181,0.35)`, background: c.tealPale, borderRadius: 16, padding: 14 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: c.tealDark, textTransform: "uppercase", letterSpacing: 0.8, margin: "0 0 8px" }}>Try a similar one</p>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: c.text, margin: 0 }}>
              Mia’s phone plan costs a third of <TeX>{"(c+6)"}</TeX> dollars a week. Leo’s costs a quarter of <TeX>{"(3c-2)"}</TeX>. When do they pay the same?
            </p>
            <div style={{ marginTop: 12, background: c.navy, borderRadius: 10, padding: "10px 12px", fontSize: 13, fontWeight: 600, color: c.white, textAlign: "center" }}>Answer it</div>
          </div>
          <div style={{ marginTop: 18, background: c.navy, color: c.white, borderRadius: 999, padding: "12px 14px", fontSize: 14, fontWeight: 700, textAlign: "center" }}>Snap a question</div>
        </div>
      </div>
      <figcaption style={{ fontSize: 12, color: c.textMuted, marginTop: 12 }}>Illustration of the app</figcaption>
    </figure>
  );
}

function Ring({ pct }) {
  const r = 16;
  const circ = 2 * Math.PI * r;
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true">
      <circle cx="21" cy="21" r={r} fill="none" stroke={c.border} strokeWidth="5" />
      <circle cx="21" cy="21" r={r} fill="none" stroke={c.teal} strokeWidth="5" strokeDasharray={`${circ * pct} ${circ}`} strokeLinecap="round" transform="rotate(-90 21 21)" />
    </svg>
  );
}

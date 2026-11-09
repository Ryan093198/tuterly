import TryCta from "@/components/study/TryCta";
import { c } from "@/components/marketing/theme";

// "You might not need a tutor just yet" (9 Nov 2026, Ryan).
// Sits straight under the hero on the /tutoring/[suburb] pages. The angle
// comes from Ryan's paid-ads work (grok-pm/research/ads-scout/ideas-bank-ryan.md,
// DS-01 / CS-01): a tutoring company founder explains why the hour a week
// isn't where marks slip, then asks parents to try the app for a week first.
// The <style> uses dangerouslySetInnerHTML so the quotes in `content: ""`
// aren't HTML-escaped (which silently drops the strike-through line).
// Rules: never say the app replaces a tutor (a tutor keeps the hard bits);
// app features only as FACTS.md describes them; no rates or "lower end"
// claims until the local rate research is in.

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TUTOR_DAY = 2; // Wednesday

export default function NotYetTutor({ suburbName, region }) {
  const nearBayside = region === "bayside";
  return (
    <section className="nyt" style={{ padding: "56px 24px", background: c.offWhite }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .nyt__week { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 6px; margin: 22px 0 8px; }
        .nyt__day { position: relative; border-radius: 12px; border: 1px solid ${c.border}; background: ${c.white}; padding: 10px 4px 12px; text-align: center; min-height: 74px; overflow: hidden; }
        .nyt__day b { display: block; font-size: 13px; color: ${c.navy}; margin-bottom: 6px; }
        .nyt__day span { font-size: 11.5px; line-height: 1.3; color: ${c.textLight}; }
        .nyt__day--tutor { border: 2px solid ${c.teal}; background: ${c.tealPale}; }
        .nyt__day--tutor span { color: ${c.teal}; font-weight: 700; }
        .nyt__day--gap::after { content: ""; position: absolute; left: -10%; top: 50%; width: 120%; height: 2px; background: ${c.rose}; transform: rotate(-28deg); opacity: .75; }
        .nyt__legend { font-size: 13.5px; color: ${c.rose}; font-weight: 700; text-align: center; margin: 0 0 26px; }
        .nyt__steps { counter-reset: nyt; list-style: none; padding: 0; margin: 0 0 20px; display: grid; gap: 10px; }
        .nyt__steps li { counter-increment: nyt; position: relative; padding: 14px 16px 14px 52px; background: ${c.white}; border: 1px solid ${c.border}; border-radius: 14px; font-size: 15.5px; line-height: 1.6; color: ${c.text}; }
        .nyt__steps li::before { content: counter(nyt); position: absolute; left: 14px; top: 13px; width: 26px; height: 26px; border-radius: 50%; background: ${c.teal}; color: #fff; font-weight: 700; font-size: 14px; display: grid; place-items: center; }
        @media (max-width: 480px) { .nyt__day span { font-size: 10.5px; } .nyt__day { padding: 8px 2px 10px; } }
      ` }} />
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>
          From a tutoring company founder
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
          Have you tried this first?
        </h2>
        <p style={{ fontSize: 16.5, color: c.textLight, lineHeight: 1.7, marginBottom: 14 }}>
          I&rsquo;m Ryan, and I run Bayside Academics, a tutoring centre in Brighton. So this might sound strange coming from me: your child might not need a tutor just yet.
        </p>
        <p style={{ fontSize: 16.5, color: c.textLight, lineHeight: 1.7, margin: 0 }}>
          Tutoring usually means one hour a week. That hour fills up fast, often with practice that doesn&rsquo;t need an expert. And the slipping happens in the six days in between.
        </p>

        <div className="nyt__week" role="img" aria-label="A week with one tutoring hour on Wednesday and six days without help">
          {DAYS.map((d, i) => (
            <div key={d} className={`nyt__day ${i === TUTOR_DAY ? "nyt__day--tutor" : "nyt__day--gap"}`}>
              <b>{d}</b>
              <span>{i === TUTOR_DAY ? "Tutor, 1 hour" : "On their own"}</span>
            </div>
          ))}
        </div>
        <p className="nyt__legend">One hour with a tutor. Six days without.</p>

        <p style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: c.navy, marginBottom: 12 }}>
          Before you book, try this for one week:
        </p>
        <ol className="nyt__steps">
          <li>Each night, your child snaps the maths questions they got wrong.</li>
          <li>They read the worked solution, then answer a new question on the same idea, not just the same question with new numbers.</li>
          <li>At the end of the week, the weekly review tests them on up to 8 of that week&rsquo;s trickiest questions.</li>
        </ol>
        <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 22 }}>
          Still stuck after that? Then a tutor&rsquo;s hour is well spent on the hard bits.
          {nearBayside
            ? ` If you're in ${suburbName}, that tutor can be one of ours at Bayside Academics.`
            : " That's what a good tutor is for."}
        </p>

        <TryCta title="See it on one of tonight's questions" label="Try it free" />

        <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6, marginTop: 18 }}>
          <strong style={{ color: c.navy }}>Ryan, founder of Bayside Academics</strong>, 15 years in private tutoring. Bayside Academics has taught over 1,000 students in 10 years and has a 5.0 Google rating.
        </p>
      </div>
    </section>
  );
}

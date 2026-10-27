import Link from "next/link";
import StudyAppCTA from "@/components/StudyAppCTA";
import { c } from "@/components/marketing/theme";
import { STUDY_APP } from "@/lib/study-app";

// Tuterly Study blocks for the tutoring / SEO pages (suburbs, best-of,
// online, prices, competitor comparisons). These pages keep their URLs,
// titles and tutoring content; the app becomes the primary call to action
// and the tutor options sit underneath as the second choice.

// Goes in the hero, above the (now secondary) tutor buttons.
export function AppHeroBlock({ placement, heading, sub }) {
  return (
    <>
      <StudyAppCTA
        variant="inline"
        placement={placement}
        heading={heading || "Years 7 to 10 maths? Start with the questions they get wrong."}
        sub={
          sub ||
          `${STUDY_APP.name} is an iPhone app: your child snaps the maths questions they got wrong, sees the worked solution, and practises fresh versions until each one is mastered.`
        }
        style={{ margin: "0 0 22px" }}
      />
      <p style={{ fontSize: 14.5, fontWeight: 600, color: c.navy, margin: "0 0 12px" }}>
        Prefer a real tutor? Bayside Academics can help.
      </p>
    </>
  );
}

// For the competitor comparison pages. Plain facts only: no price for the
// app until there is one, no effectiveness claims.
export function AppLowerCostSection({ competitor, placement }) {
  const name = STUDY_APP.name;
  return (
    <section style={{ padding: "64px 24px", background: c.white }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>
          A lower-cost option
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: c.navy, marginBottom: 14, lineHeight: 1.25 }}>
          For Years 7 to 10 maths, there’s also {name}.
        </h2>
        <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 18 }}>
          {`If what your child mostly needs is practice on the maths they keep getting wrong, ${name} can do that on its own, or alongside ${competitor} or any other tutor. It isn't a tutor. It's an iPhone app where your child snaps a question they got wrong, sees the worked solution, then practises fresh versions until it's mastered.`}
        </p>
        <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, margin: "0 0 8px" }}>
          {[
            `Cost: a free trial, then $49 a month (${STUDY_APP.priceWeekly}).`,
            "Covers: Years 7 to 10 maths only, on iPhone. No Android yet.",
            "Parents see a weekly summary and topic test scores, not their child's photos.",
          ].map((t) => (
            <li key={t} style={{ fontSize: 15, color: c.text, lineHeight: 1.55, paddingLeft: 18, position: "relative" }}>
              <span aria-hidden="true" style={{ position: "absolute", left: 0, color: c.teal }}>•</span>
              {t}
            </li>
          ))}
        </ul>
        <StudyAppCTA variant="inline" placement={placement} heading={`Try ${name}`} sub="Snap the questions they get wrong and practise fresh versions until they're mastered." />
      </div>
    </section>
  );
}

// VCE pages stay tutoring-first: one quiet line for younger students.
export function AppSoftLine() {
  return (
    <p style={{ fontSize: 14.5, color: c.textLight, margin: "18px 0 0" }}>
      For Years 7 to 10, try{" "}
      <Link href="/" style={{ color: c.tealDark, fontWeight: 600 }}>
        {STUDY_APP.name}
      </Link>
      , our app for practising the maths questions they get wrong.
    </p>
  );
}

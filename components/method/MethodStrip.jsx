import Link from "next/link";
import "./method-strip.css";

// The Tuterly Method (Snap. Fix. Ace.) in one compact block, for pages other
// than /method (Ryan, 11 Nov 2026: "talk about the Tuterly Method more on
// all the pages... it simplifies a daunting experience"). Keep the wording
// in step with app/method/page.js.
//
// band: its own full-width section. inline: just the block, inside a section
// that already has a wrapper.

const STEPS = [
  { word: "Snap.", x: "Snap every question you get wrong, from tests, homework and class work." },
  { word: "Fix.", x: "See the worked solution, then fresh questions on that skill. Even just one each day." },
  { word: "Ace.", x: "A full practice test, with questions you've got wrong mixed in." },
];

export default function MethodStrip({ variant = "band", lead = "Don't study more. Study your mistakes." }) {
  const block = (
    <div className="ms">
      <div className="ms__head">
        <p className="ms__name">The Tuterly Method</p>
        <p className="ms__words"><span>Snap.</span> <span>Fix.</span> <span>Ace.</span></p>
        <p className="ms__lead">{lead}</p>
      </div>
      <ol className="ms__steps">
        {STEPS.map((s, i) => (
          <li key={s.word} className={`ms__step ms__step--${i + 1}`}>
            <p className="ms__w">{s.word}</p>
            <p className="ms__x">{s.x}</p>
          </li>
        ))}
      </ol>
      <Link href="/method" className="ms__link">How the Tuterly Method works →</Link>
    </div>
  );
  if (variant === "inline") return block;
  return (
    <section className="ms-band" aria-label="The Tuterly Method">
      <div className="tb-wrap">{block}</div>
    </section>
  );
}

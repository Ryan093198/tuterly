import katex from "katex";
import { Reveal, SectionHead } from "@/components/brand";
import { STUDY_APP } from "@/lib/study-app";
import "./study-landing.css";

// "Different questions every time": the worked example from the question
// writer's rules (an original, a numbers-only swap, and two good rewrites).
// Moved from the home page to the Snap a question feature page (29 Oct 2026).

function TeX({ children, display = false }) {
  // Native MathML: no KaTeX stylesheet or fonts to download.
  const html = katex.renderToString(children, { displayMode: display, throwOnError: false, output: "mathml" });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function DifferentQuestions({ id = "different", className = "" }) {
  const name = STUDY_APP.name;
  return (
    <section className={`tb-section ${className}`} aria-labelledby={id} id="different-questions">
      <div className="tb-wrap">
        <Reveal>
          <SectionHead
            id={id}
            eyebrow="The part that matters"
            title="Different questions every time."
            lead={`A question with only the numbers swapped can be answered by copying the steps from the last one. ${name} keeps the same concepts and changes at least two other things: the context, the structure, the layout, the type of numbers, or how it’s shown. Here is the example from the rules its question writer follows.`}
          />
        </Reveal>
        <div className="sl-math">
          <div className="tb-stack">
            <MathCard label="The question they got wrong" tone="ink">
              <p>Solve for <TeX>x</TeX>:</p>
              <p className="sl-math__display"><TeX display>{"\\frac{x+2}{3} = \\frac{2x-1}{5}"}</TeX></p>
              <Solution>
                <p>Multiply both sides by 15 (the lowest common denominator):</p>
                <TeX display>{"5(x+2) = 3(2x-1)"}</TeX>
                <TeX display>{"5x + 10 = 6x - 3 \\quad\\Rightarrow\\quad x = 13"}</TeX>
                <p>Check: <TeX>{"\\tfrac{15}{3} = 5"}</TeX> and <TeX>{"\\tfrac{25}{5} = 5"}</TeX>.</p>
              </Solution>
            </MathCard>
            <MathCard label="Not this: only the numbers changed" tone="danger">
              <p>Solve for <TeX>x</TeX>:</p>
              <p className="sl-math__display"><TeX display>{"\\frac{x+4}{3} = \\frac{2x-3}{5}"}</TeX></p>
            </MathCard>
          </div>
          <div className="tb-stack">
            <MathCard label="This: new context and layout, same concepts" tone="success">
              <p>
                Mia’s phone plan costs a third of <TeX>{"(c + 6)"}</TeX> dollars a week. Leo’s costs a quarter of <TeX>{"(3c - 2)"}</TeX> dollars. For what value of <TeX>c</TeX> do they pay the same?
              </p>
              <Solution>
                <TeX display>{"\\frac{c+6}{3} = \\frac{3c-2}{4}"}</TeX>
                <p>Multiply both sides by 12:</p>
                <TeX display>{"4(c+6) = 3(3c-2)"}</TeX>
                <TeX display>{"4c + 24 = 9c - 6 \\quad\\Rightarrow\\quad c = 6"}</TeX>
                <p>Both pay $4 a week.</p>
              </Solution>
            </MathCard>
            <MathCard label="Or this: new structure, same concepts" tone="success">
              <p>
                Sam solved this equation and got <TeX>{"x = 1"}</TeX>.
              </p>
              <p className="sl-math__display"><TeX display>{"\\frac{x+1}{2} = \\frac{x-3}{4}"}</TeX></p>
              <p>Find his mistake and give the correct answer.</p>
              <Solution>
                <p>Multiply both sides by 4:</p>
                <TeX display>{"2(x+1) = x - 3"}</TeX>
                <TeX display>{"2x + 2 = x - 3 \\quad\\Rightarrow\\quad x = -5"}</TeX>
                <p>Sam’s <TeX>{"x = 1"}</TeX> comes from writing <TeX>{"x + 3"}</TeX> instead of <TeX>{"x - 3"}</TeX> on the right.</p>
              </Solution>
            </MathCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function MathCard({ label, tone, children }) {
  return (
    <div className="tb-card sl-mathcard" data-tone={tone}>
      <p className="sl-mathcard__label">{label}</p>
      <div className="sl-mathcard__body">{children}</div>
    </div>
  );
}

function Solution({ children }) {
  return (
    <details className="sl-solution">
      <summary>Show solution</summary>
      <div className="sl-solution__body">{children}</div>
    </details>
  );
}

"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { stepHtml } from "./calc-utils";
import { solveSteps, sameAnswer } from "./order-ops-engine";
import { trackEvent } from "@/lib/analytics";

// Order of operations checker. Type a calculation (and, if you like, your
// own answer) and it works through it one operation at a time in BODMAS
// order, saying which rule each step uses. Exact fractions throughout, so
// there are no rounding surprises. Logic lives in order-ops-engine.js.

const START = "3 + 4 × 2 − (6 − 1)";
const EXAMPLES = ["20 − 12 ÷ 4 × 2", "(5 + 3)² ÷ 4", "−3² + 10", "2[18 − 3(4 + 1)]"];

export default function OrderOpsCalc({ placement = "order_ops_calc" }) {
  const [expr, setExpr] = useState(START);
  const [mine, setMine] = useState("");
  const [res, setRes] = useState(() => solveSteps(START));
  const [verdict, setVerdict] = useState(null);

  function run(text, myAnswer) {
    const r = solveSteps(text);
    setRes(r);
    if (r.error || !String(myAnswer).trim()) setVerdict(null);
    else setVerdict(sameAnswer(myAnswer, r.value));
    if (!r.error) trackEvent?.("calculator_use", { calculator: "order_of_operations", placement });
  }
  function go(e) {
    e?.preventDefault();
    run(expr, mine);
  }
  function tryExample(x) {
    setExpr(x);
    setMine("");
    run(x, "");
  }

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Order of operations checker">
      <div className="mx-calc__row">
        <label style={{ gridColumn: "1 / -1" }}>
          Calculation
          <input value={expr} onChange={(e) => setExpr(e.target.value)} autoComplete="off" spellCheck={false} />
        </label>
        <label>
          Your answer (optional)
          <input inputMode="decimal" value={mine} onChange={(e) => setMine(e.target.value)} placeholder="e.g. 6 or 3/4" />
        </label>
      </div>
      <div className="mx-calc__btns">
        <button type="submit" className="mx-calc__go">Show each step</button>
      </div>
      <div className="mx-calc__tabs" role="group" aria-label="Try an example" style={{ marginTop: 14, marginBottom: 0 }}>
        {EXAMPLES.map((x) => (
          <button key={x} type="button" className="mx-calc__tab" onClick={() => tryExample(x)}>{x}</button>
        ))}
      </div>
      {res?.error && <p className="mx-calc__err" role="alert">{res.error}</p>}
      {res && !res.error && (
        <div className="mx-calc__out" aria-live="polite">
          <p className="mx-calc__eq" dangerouslySetInnerHTML={{ __html: stepHtml(`$${res.start}$`) }} />
          {res.implied && (
            <p className="mx-calc__hint" style={{ marginTop: 0 }}>A number written next to a bracket means multiply, so the × has been written in.</p>
          )}
          {res.steps.length > 0 ? (
            <ol className="mx-calc__steps">
              {res.steps.map((s, i) => (
                <li key={i}>
                  <span dangerouslySetInnerHTML={{ __html: stepHtml(`${s.why}: $${s.calc}$`) }} />
                  <br />
                  <span dangerouslySetInnerHTML={{ __html: stepHtml(`$= ${s.expr}$`) }} />
                </li>
              ))}
            </ol>
          ) : (
            <p className="mx-calc__hint" style={{ marginTop: 0 }}>There’s only one number here, so there’s nothing left to work out.</p>
          )}
          <p className="mx-calc__ans" style={{ marginTop: 12 }}>Answer: {res.answerPlain}</p>
          {verdict === true && <p className="mx-calc__exact" style={{ color: "var(--brand-text)", fontWeight: 700 }}>Your answer is right.</p>}
          {verdict === false && (
            <p className="mx-calc__exact" style={{ color: "#b42318", fontWeight: 700 }}>
              Not quite: you wrote {mine.trim()}. Go through the steps above and find the first one that’s different from your working.
            </p>
          )}
        </div>
      )}
      <p className="mx-calc__hint">Use + − × ÷ (or * and /), ^ for powers (2^3), and round or square brackets. Answers that don’t divide evenly are shown as fractions.</p>
    </form>
  );
}

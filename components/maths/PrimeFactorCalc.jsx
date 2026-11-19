"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { stepHtml } from "./calc-utils";
import { solve } from "./prime-factor-engine";
import { trackEvent } from "@/lib/analytics";

// Prime factorisation calculator with working: repeated division by the
// smallest prime, the answer in index notation, and whether the number is
// prime or a perfect square. Logic lives in prime-factor-engine.js.

const START = "630";

export default function PrimeFactorCalc({ placement = "prime_factor_calc" }) {
  const [val, setVal] = useState(START);
  const [res, setRes] = useState(() => solve(START));

  function go(e) {
    e?.preventDefault();
    const r = solve(val);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: "prime_factorisation", placement });
  }

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Prime factorisation calculator">
      <div className="mx-calc__row">
        <label>
          Whole number (2 to 1 000 000 000)
          <input inputMode="numeric" value={val} onChange={(e) => setVal(e.target.value)} />
        </label>
      </div>
      <div className="mx-calc__btns"><button type="submit" className="mx-calc__go">Show the working</button></div>
      {res?.error && <p className="mx-calc__err" role="alert">{res.error}</p>}
      {res && !res.error && (
        <div className="mx-calc__out" aria-live="polite">
          <p className="mx-calc__ans">{res.answer}</p>
          <ol className="mx-calc__steps">
            {res.steps.map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: stepHtml(s) }} />)}
          </ol>
        </div>
      )}
      <p className="mx-calc__hint">Always divide by the smallest prime that goes in exactly: 2 first, then 3, 5, 7, 11 and so on.</p>
    </form>
  );
}

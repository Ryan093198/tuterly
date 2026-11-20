"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { stepHtml } from "./calc-utils";
import { solve } from "./hcf-lcm-engine";
import { trackEvent } from "@/lib/analytics";

// HCF and LCM calculator with working: prime factors of each number, then
// lowest shared powers for the HCF and highest powers for the LCM. Logic
// lives in hcf-lcm-engine.js.

const START = "84, 120";

export default function HcfLcmCalc({ placement = "hcf_lcm_calc" }) {
  const [val, setVal] = useState(START);
  const [res, setRes] = useState(() => solve(START));

  function go(e) {
    e?.preventDefault();
    const r = solve(val);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: "hcf_lcm", placement });
  }

  return (
    <form className="mx-calc" onSubmit={go} aria-label="HCF and LCM calculator">
      <div className="mx-calc__row">
        <label>
          Two or three whole numbers, separated by commas
          <input inputMode="numeric" value={val} onChange={(e) => setVal(e.target.value)} />
        </label>
      </div>
      <div className="mx-calc__btns"><button type="submit" className="mx-calc__go">Find the HCF and LCM</button></div>
      {res?.error && <p className="mx-calc__err" role="alert">{res.error}</p>}
      {res && !res.error && (
        <div className="mx-calc__out" aria-live="polite">
          <p className="mx-calc__ans">HCF = {res.hcf}, LCM = {res.lcm}</p>
          <ol className="mx-calc__steps">
            {res.steps.map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: stepHtml(s) }} />)}
          </ol>
        </div>
      )}
      <p className="mx-calc__hint">HCF: primes in every number, lowest power. LCM: every prime, highest power.</p>
    </form>
  );
}

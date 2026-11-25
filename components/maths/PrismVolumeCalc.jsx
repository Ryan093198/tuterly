"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { stepHtml } from "./calc-utils";
import { solve, MODES } from "./prism-volume-engine";
import { trackEvent } from "@/lib/analytics";

// Volume of a prism calculator with working: rectangular, triangular and
// trapezoidal prisms, any prism from its cross-section area, and the length
// from the volume. Logic lives in prism-volume-engine.js.

export default function PrismVolumeCalc({ placement = "prism_volume_calc" }) {
  const [mode, setMode] = useState("rect");
  const [vals, setVals] = useState(MODES.rect.start);
  const [unit, setUnit] = useState("cm");
  const [res, setRes] = useState(() => solve("rect", MODES.rect.start, "cm"));
  const m = MODES[mode];

  function pick(k) {
    setMode(k);
    setVals(MODES[k].start);
    setUnit(k === "tri" || k === "trap" ? "m" : "cm");
    setRes(null);
  }
  function go(e) {
    e?.preventDefault();
    const r = solve(mode, vals, unit);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: `prism_volume_${mode}`, placement });
  }
  const set = (i) => (e) => setVals((old) => old.map((v, j) => (j === i ? e.target.value : v)));

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Volume of a prism calculator">
      <svg className="mx-tri" viewBox="0 0 240 170" role="img" aria-label="A triangular prism with its triangular cross-section A shaded at the front and its length l running back">
        <polygon points="30,150 110,150 70,70" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <line x1="70" y1="70" x2="170" y2="30" stroke="currentColor" strokeWidth="3" />
        <line x1="110" y1="150" x2="210" y2="110" stroke="currentColor" strokeWidth="3" />
        <line x1="170" y1="30" x2="210" y2="110" stroke="currentColor" strokeWidth="3" />
        <line x1="30" y1="150" x2="130" y2="110" stroke="currentColor" strokeWidth="2" strokeDasharray="6 5" />
        <line x1="130" y1="110" x2="210" y2="110" stroke="currentColor" strokeWidth="2" strokeDasharray="6 5" />
        <line x1="130" y1="110" x2="170" y2="30" stroke="currentColor" strokeWidth="2" strokeDasharray="6 5" />
        <text x="63" y="126">A</text>
        <text x="166" y="148">l</text>
      </svg>
      <div className="mx-calc__tabs" role="group" aria-label="What kind of prism?">
        {Object.entries(MODES).map(([k, v]) => (
          <button key={k} type="button" className="mx-calc__tab" aria-pressed={mode === k} onClick={() => pick(k)}>{v.tab}</button>
        ))}
      </div>
      <div className="mx-calc__row">
        {m.labels.map((lab, i) => (
          <label key={`${mode}-${i}`}>{lab}<input inputMode="decimal" value={vals[i] ?? ""} onChange={set(i)} /></label>
        ))}
        <label>Units (optional)<input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="cm, m…" /></label>
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
      <p className="mx-calc__hint">Use the same units for every length. Type mm, cm or m in the units box to get the capacity in mL or L too.</p>
    </form>
  );
}

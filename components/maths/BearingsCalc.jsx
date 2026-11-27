"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { stepHtml } from "./calc-utils";
import { solve, MODES } from "./bearings-engine";
import { trackEvent } from "@/lib/analytics";

// Bearings calculator with working: back bearings, compass to true bearings
// (and back), east/north distances from a distance and bearing, and the
// distance and bearing from east/north movements. Logic lives in
// bearings-engine.js.

export default function BearingsCalc({ placement = "bearings_calc" }) {
  const [mode, setMode] = useState("back");
  const [vals, setVals] = useState(MODES.back.start);
  const [res, setRes] = useState(() => solve("back", MODES.back.start));
  const m = MODES[mode];

  function pick(k) {
    setMode(k);
    setVals(MODES[k].start);
    setRes(null);
  }
  function go(e) {
    e?.preventDefault();
    const r = solve(mode, vals);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: `bearings_${mode}`, placement });
  }
  const set = (i) => (e) => setVals((old) => old.map((v, j) => (j === i ? e.target.value : v)));

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Bearings calculator">
      <svg className="mx-tri" viewBox="0 0 200 200" role="img" aria-label="A compass with north at the top. A bearing is the angle turned clockwise from north, shown here as 060 degrees.">
        <circle cx="100" cy="104" r="70" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
        <line x1="100" y1="104" x2="100" y2="24" stroke="currentColor" strokeWidth="3" />
        <polygon points="100,16 94,30 106,30" fill="currentColor" />
        <line x1="100" y1="104" x2="161" y2="69" stroke="currentColor" strokeWidth="3" />
        <path d="M100 74 A30 30 0 0 1 126 89" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
        <text x="95" y="12">N</text>
        <text x="113" y="66">60°</text>
        <text x="150" y="60">P</text>
        <text x="40" y="190">bearing of P = 060°</text>
      </svg>
      <div className="mx-calc__tabs" role="group" aria-label="What do you want to find?">
        {Object.entries(MODES).map(([k, v]) => (
          <button key={k} type="button" className="mx-calc__tab" aria-pressed={mode === k} onClick={() => pick(k)}>{v.tab}</button>
        ))}
      </div>
      <div className="mx-calc__row">
        {m.labels.map((lab, i) => (
          <label key={`${mode}-${i}`}>{lab}<input inputMode={mode === "convert" ? "text" : "decimal"} value={vals[i] ?? ""} onChange={set(i)} /></label>
        ))}
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
      <p className="mx-calc__hint">True bearings are measured clockwise from north and written with three figures, like 065°. Answers are rounded to 2 decimal places.</p>
    </form>
  );
}

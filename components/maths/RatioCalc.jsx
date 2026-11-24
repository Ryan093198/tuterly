"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { stepHtml } from "./calc-utils";
import { solve, MODES } from "./ratio-engine";
import { trackEvent } from "@/lib/analytics";

// Ratio calculator with working: simplify a ratio, divide an amount in a
// ratio, or find the other shares from one known share. The bar model
// redraws to show the parts. Logic lives in ratio-engine.js.

function BarModel({ ints }) {
  const parts = ints && ints.length && ints.reduce((a, b) => a + b, 0) <= 40 ? ints : null;
  if (!parts) return null;
  const total = parts.reduce((a, b) => a + b, 0);
  const W = 300, H = 26, gap = 10;
  const unit = W / total;
  return (
    <svg className="mx-ratio-bars" viewBox={`0 0 ${W + 70} ${parts.length * (H + gap)}`} role="img" aria-label={`Bar model of the ratio ${parts.join(" to ")}`}>
      {parts.map((k, r) => (
        <g key={r} transform={`translate(0 ${r * (H + gap)})`}>
          {Array.from({ length: k }, (_, i) => (
            <rect key={i} x={i * unit + 1} y="1" width={unit - 2} height={H - 2} rx="4" fill="currentColor" fillOpacity={r % 2 ? 0.12 : 0.24} stroke="currentColor" strokeWidth="1.2" />
          ))}
          <text x={k * unit + 8} y={H / 2 + 5} fontSize="13">{`${k} part${k === 1 ? "" : "s"}`}</text>
        </g>
      ))}
    </svg>
  );
}

export default function RatioCalc({ placement = "ratio_calc" }) {
  const [mode, setMode] = useState("simplify");
  const [vals, setVals] = useState(MODES.simplify.start);
  const [res, setRes] = useState(() => solve("simplify", MODES.simplify.start));
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
    if (!r.error) trackEvent?.("calculator_use", { calculator: `ratio_${mode}`, placement });
  }
  const set = (i) => (e) => setVals((old) => old.map((v, j) => (j === i ? e.target.value : v)));

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Ratio calculator">
      <div className="mx-calc__tabs" role="group" aria-label="What do you want to work out?">
        {Object.entries(MODES).map(([k, v]) => (
          <button key={k} type="button" className="mx-calc__tab" aria-pressed={mode === k} onClick={() => pick(k)}>{v.tab}</button>
        ))}
      </div>
      <div className="mx-calc__row">
        {m.labels.map((lab, i) => (
          <label key={`${mode}-${i}`}>{lab}<input inputMode={lab.startsWith("Ratio") || lab.startsWith("In the") ? "text" : "decimal"} value={vals[i]} onChange={set(i)} /></label>
        ))}
      </div>
      <div className="mx-calc__btns"><button type="submit" className="mx-calc__go">Show the working</button></div>
      {res?.error && <p className="mx-calc__err" role="alert">{res.error}</p>}
      {res && !res.error && (
        <div className="mx-calc__out" aria-live="polite">
          <p className="mx-calc__ans">{res.answer}</p>
          <BarModel ints={res.ints} />
          <ol className="mx-calc__steps">
            {res.steps.map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: stepHtml(s) }} />)}
          </ol>
        </div>
      )}
      <p className="mx-calc__hint">Separate parts with a colon. Parts can be whole numbers, decimals like 0.5 or fractions like 3/4. Leave out units, but make sure every part is in the same unit first.</p>
    </form>
  );
}

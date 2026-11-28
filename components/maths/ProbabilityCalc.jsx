"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { stepHtml } from "./calc-utils";
import { solve, MODES } from "./probability-engine";
import { trackEvent } from "@/lib/analytics";

// Probability calculator with working: one event from counts of outcomes,
// two independent events, and the expected number in a set of trials. The
// scale redraws to show where the answer sits between impossible and
// certain. Logic lives in probability-engine.js.

function Scale({ p }) {
  if (!p) return null;
  const v = p.n / p.d;
  const x = 45 + v * 230;
  return (
    <svg className="mx-tri" viewBox="0 0 320 70" role="img" aria-label={`Probability scale from 0 (impossible) to 1 (certain), with the answer marked at ${v.toFixed(2)}`}>
      <line x1="45" y1="30" x2="275" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {[0, 0.5, 1].map((t) => (
        <g key={t}>
          <line x1={45 + t * 230} y1="22" x2={45 + t * 230} y2="38" stroke="currentColor" strokeWidth="2" />
          <text x={45 + t * 230} y="56" fontSize="12" textAnchor="middle">{t === 0 ? "0 impossible" : t === 1 ? "1 certain" : "½ even"}</text>
        </g>
      ))}
      <circle cx={x} cy="30" r="8" fill="currentColor" fillOpacity="0.85" />
    </svg>
  );
}

export default function ProbabilityCalc({ placement = "probability_calc" }) {
  const [mode, setMode] = useState("single");
  const [vals, setVals] = useState(MODES.single.start);
  const [res, setRes] = useState(() => solve("single", MODES.single.start));
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
    if (!r.error) trackEvent?.("calculator_use", { calculator: `probability_${mode}`, placement });
  }
  const set = (i) => (e) => setVals((old) => old.map((v, j) => (j === i ? e.target.value : v)));
  const shown = res && !res.error ? (mode === "single" ? res.p : mode === "both" ? res.ab : null) : null;

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Probability calculator">
      <div className="mx-calc__tabs" role="group" aria-label="What do you want to find?">
        {Object.entries(MODES).map(([k, v]) => (
          <button key={k} type="button" className="mx-calc__tab" aria-pressed={mode === k} onClick={() => pick(k)}>{v.tab}</button>
        ))}
      </div>
      <div className="mx-calc__row">
        {m.labels.map((lab, i) => (
          <label key={`${mode}-${i}`}>{lab}<input inputMode={mode === "single" || (mode === "expected" && i === 1) ? "numeric" : "text"} value={vals[i] ?? ""} onChange={set(i)} /></label>
        ))}
      </div>
      <div className="mx-calc__btns"><button type="submit" className="mx-calc__go">Show the working</button></div>
      {res?.error && <p className="mx-calc__err" role="alert">{res.error}</p>}
      {res && !res.error && (
        <div className="mx-calc__out" aria-live="polite">
          <p className="mx-calc__ans">{res.answer}</p>
          <Scale p={shown} />
          <ol className="mx-calc__steps">
            {res.steps.map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: stepHtml(s) }} />)}
          </ol>
        </div>
      )}
      <p className="mx-calc__hint">Probabilities can be typed as fractions (3/8), decimals (0.375) or percentages (37.5%). Counting outcomes only gives the right answer when every outcome is equally likely.</p>
    </form>
  );
}

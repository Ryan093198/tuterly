"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { stepHtml } from "./calc-utils";
import { solve, MODES } from "./trapezium-area-engine";
import { trackEvent } from "@/lib/analytics";

// Area of a trapezium calculator with working: the area, the missing height,
// the missing parallel side, and an isosceles trapezium from its sloping
// sides. Logic lives in trapezium-area-engine.js.

const START_UNIT = { area: "cm", height: "m", side: "cm", iso: "cm" };

export default function TrapeziumAreaCalc({ placement = "trapezium_area_calc" }) {
  const [mode, setMode] = useState("area");
  const [vals, setVals] = useState(MODES.area.start);
  const [unit, setUnit] = useState("cm");
  const [res, setRes] = useState(() => solve("area", MODES.area.start, "cm"));
  const m = MODES[mode];

  function pick(k) {
    setMode(k);
    setVals(MODES[k].start);
    setUnit(START_UNIT[k]);
    setRes(null);
  }
  function go(e) {
    e?.preventDefault();
    const r = solve(mode, vals, unit);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: `trapezium_area_${mode}`, placement });
  }
  const set = (i) => (e) => setVals((old) => old.map((v, j) => (j === i ? e.target.value : v)));

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Area of a trapezium calculator">
      <svg className="mx-tri" viewBox="0 0 240 160" role="img" aria-label="A trapezium with the top parallel side a, the bottom parallel side b, and the perpendicular height h drawn as a dashed line between them">
        <polygon points="70,30 170,30 220,130 20,130" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <line x1="120" y1="30" x2="120" y2="130" stroke="currentColor" strokeWidth="2" strokeDasharray="6 5" />
        <polyline points="120,118 132,118 132,130" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="114" y="22">a</text>
        <text x="114" y="152">b</text>
        <text x="100" y="86">h</text>
      </svg>
      <div className="mx-calc__tabs" role="group" aria-label="What do you want to find?">
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
      <p className="mx-calc__hint">Use the same units for every length. The height is the perpendicular distance between the parallel sides, not a sloping side.</p>
    </form>
  );
}

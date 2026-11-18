"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { stepHtml } from "./calc-utils";
import { solve, MODES } from "./cylinder-sa-engine";
import { trackEvent } from "@/lib/analytics";

// Surface area of a cylinder calculator with working: total surface area
// from the radius or diameter, curved surface only, one open end, or the
// height from the total surface area. Logic lives in cylinder-sa-engine.js.

export default function CylinderSACalc({ placement = "cylinder_sa_calc" }) {
  const [mode, setMode] = useState("totalR");
  const [vals, setVals] = useState(MODES.totalR.start);
  const [unit, setUnit] = useState("cm");
  const [res, setRes] = useState(() => solve("totalR", MODES.totalR.start, "cm"));
  const m = MODES[mode];

  function pick(k) {
    setMode(k);
    setVals(MODES[k].start);
    setUnit(k === "open" ? "m" : "cm");
    setRes(null);
  }
  function go(e) {
    e?.preventDefault();
    const r = solve(mode, vals, unit);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: `cylinder_sa_${mode}`, placement });
  }
  const set = (i) => (e) => setVals((old) => old.map((v, j) => (j === i ? e.target.value : v)));

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Surface area of a cylinder calculator">
      <svg className="mx-tri" viewBox="0 0 220 190" role="img" aria-label="A cylinder with its radius r across the top circle and its height h down the side, with the curved side shaded">
        <path d="M40 40 L40 150 A70 20 0 0 0 180 150 L180 40 A70 20 0 0 1 40 40 Z" fill="currentColor" opacity="0.08" />
        <ellipse cx="110" cy="40" rx="70" ry="20" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="3" />
        <line x1="40" y1="40" x2="40" y2="150" stroke="currentColor" strokeWidth="3" />
        <line x1="180" y1="40" x2="180" y2="150" stroke="currentColor" strokeWidth="3" />
        <path d="M40 150 A70 20 0 0 0 180 150" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M40 150 A70 20 0 0 1 180 150" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 5" />
        <line x1="110" y1="40" x2="180" y2="40" stroke="currentColor" strokeWidth="2" />
        <circle cx="110" cy="40" r="3.5" fill="currentColor" />
        <text x="138" y="34">r</text>
        <line x1="196" y1="40" x2="196" y2="150" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <text x="202" y="100">h</text>
      </svg>
      <div className="mx-calc__tabs" role="group" aria-label="What do you want to work out?">
        {Object.entries(MODES).map(([k, v]) => (
          <button key={k} type="button" className="mx-calc__tab" aria-pressed={mode === k} onClick={() => pick(k)}>{v.tab}</button>
        ))}
      </div>
      <div className="mx-calc__row">
        <label>{m.labels[0]}<input inputMode="decimal" value={vals[0]} onChange={set(0)} /></label>
        <label>{m.labels[1]}<input inputMode="decimal" value={vals[1]} onChange={set(1)} /></label>
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
      <p className="mx-calc__hint">Use the same units for every length. Area units are squared (cm²), lengths are not.</p>
    </form>
  );
}

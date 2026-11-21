"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { stepHtml } from "./calc-utils";
import { solveSDT, MODES, DIST_UNITS, TIME_UNITS, SPEED_UNITS } from "./speed-engine";
import { trackEvent } from "@/lib/analytics";

// Speed, distance and time calculator: find any one from the other two,
// in mixed units, with the conversions and working shown.
// Logic (and the tests' entry point) lives in speed-engine.js.

const START = { mode: "s", d: "245", dUnit: "km", t: "3.5", tUnit: "h", s: "", sUnit: "km/h", out: "km/h" };
const NEEDS = { s: ["d", "t"], d: ["s", "t"], t: ["d", "s"] };
const FIELD = {
  d: { label: "Distance", unitKey: "dUnit", units: DIST_UNITS },
  t: { label: "Time", unitKey: "tUnit", units: TIME_UNITS },
  s: { label: "Speed", unitKey: "sUnit", units: SPEED_UNITS },
};
const OUT_UNITS = { s: SPEED_UNITS, d: DIST_UNITS, t: TIME_UNITS };
const DEFAULT_OUT = { s: "km/h", d: "km", t: "h" };

export default function SpeedCalc({ placement = "speed_calc" }) {
  const [v, setV] = useState(START);
  const [res, setRes] = useState(() => solveSDT(START.mode, START));
  const set = (k) => (e) => setV((old) => ({ ...old, [k]: e.target.value }));

  function go(e) {
    e?.preventDefault();
    const r = solveSDT(v.mode, v);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: "speed_distance_time", placement, mode: v.mode });
  }

  function changeMode(e) {
    const mode = e.target.value;
    setV((old) => ({ ...old, mode, out: DEFAULT_OUT[mode] }));
    setRes(null);
  }

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Speed, distance and time calculator">
      <div className="mx-calc__row mx-calc__row--pair">
        <label>
          Find
          <select value={v.mode} onChange={changeMode}>
            {Object.entries(MODES).map(([k, name]) => (
              <option key={k} value={k}>{name}</option>
            ))}
          </select>
        </label>
        <label>
          Answer in
          <select value={v.out} onChange={set("out")}>
            {OUT_UNITS[v.mode].map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </label>
      </div>
      {NEEDS[v.mode].map((k) => {
        const f = FIELD[k];
        return (
          <div key={k} className="mx-calc__row mx-calc__row--pair">
            <label>
              {f.label}
              <input inputMode="decimal" value={v[k]} onChange={set(k)} />
            </label>
            <label>
              Unit
              <select value={v[f.unitKey]} onChange={set(f.unitKey)} aria-label={`${f.label} unit`}>
                {f.units.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </label>
          </div>
        );
      })}
      <div className="mx-calc__btns"><button type="submit" className="mx-calc__go">Show the working</button></div>
      {res?.error && <p className="mx-calc__err" role="alert">{res.error}</p>}
      {res && !res.error && (
        <div className="mx-calc__out" aria-live="polite">
          <p className="mx-calc__ans">{res.answer}</p>
          <ol className="mx-calc__steps">
            {res.steps.map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: stepHtml(s) }} />)}
          </ol>
          {res.extra.map((x, i) => <p key={i} className="mx-calc__hint">{x}</p>)}
        </div>
      )}
      <p className="mx-calc__hint">Units are converted for you so they match: kilometres with hours for km/h, metres with seconds for m/s. Answers are rounded to 4 decimal places for display only.</p>
    </form>
  );
}

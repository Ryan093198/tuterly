"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { stepHtml } from "./calc-utils";
import { solveSimple, MODES, UNITS } from "./simple-interest-engine";
import { money } from "./compound-engine";
import { trackEvent } from "@/lib/analytics";

// Simple interest calculator: find I, P, r or t from the other three, with
// the working and (for whole years) a year-by-year table.
// Logic (and the tests' entry point) lives in simple-interest-engine.js.

const START = { mode: "I", unit: "years", P: "4500", r: "3.2", t: "5", I: "" };
const FIELDS = {
  P: "Principal ($)",
  r: "Interest rate (% p.a.)",
  t: "Time",
  I: "Interest ($)",
};
const NEEDS = { I: ["P", "r", "t"], P: ["I", "r", "t"], r: ["I", "P", "t"], t: ["I", "P", "r"] };

export default function SimpleInterestCalc({ placement = "simple_interest_calc" }) {
  const [v, setV] = useState(START);
  const [res, setRes] = useState(() => solveSimple(START.mode, START, START.unit));
  const set = (k) => (e) => setV((old) => ({ ...old, [k]: e.target.value }));

  function go(e) {
    e?.preventDefault();
    const r = solveSimple(v.mode, v, v.unit);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: "simple_interest", placement, mode: v.mode });
  }

  function changeMode(e) {
    const mode = e.target.value;
    setV((old) => ({ ...old, mode }));
    setRes(null);
  }

  const timeLabel = v.mode === "t" ? "Give the time in" : "Time is in";

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Simple interest calculator">
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
          {timeLabel}
          <select value={v.unit} onChange={set("unit")}>
            {Object.keys(UNITS).map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="mx-calc__row">
        {NEEDS[v.mode].map((k) => (
          <label key={k}>
            {k === "t" ? `Time (${v.unit})` : FIELDS[k]}
            <input inputMode="decimal" value={v[k]} onChange={set(k)} />
          </label>
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
          {res.rows.length > 0 && (
            <div className="mx-table mx-table--tight">
              <table>
                <caption className="mx-calc__hint" style={{ captionSide: "top", textAlign: "left", margin: "0 0 6px" }}>Balance at the end of each year</caption>
                <thead>
                  <tr><th scope="col">Year</th><th scope="col">Start</th><th scope="col">Interest</th><th scope="col">End</th></tr>
                </thead>
                <tbody>
                  {res.rows.map((row) => (
                    <tr key={row.label}>
                      <td>{row.label}</td>
                      <td>{money(row.start)}</td>
                      <td>{money(row.interest)}</td>
                      <td>{money(row.end)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      <p className="mx-calc__hint">With simple interest the interest is the same every year, because it&apos;s always worked out on the original amount. Amounts are rounded to the nearest cent for display only.</p>
    </form>
  );
}

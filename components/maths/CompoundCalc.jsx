"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { stepHtml } from "./calc-utils";
import { solveCompound, money, FREQS } from "./compound-engine";
import { trackEvent } from "@/lib/analytics";

// Compound interest calculator with working and a year-by-year table.
// Logic (and the tests' entry point) lives in compound-engine.js.

const START = { p: "5000", r: "4", t: "3", n: "1" };

export default function CompoundCalc({ placement = "compound_calc" }) {
  const [v, setV] = useState(START);
  const [res, setRes] = useState(() => solveCompound(START.p, START.r, START.t, START.n));
  const set = (k) => (e) => setV((old) => ({ ...old, [k]: e.target.value }));

  function go(e) {
    e?.preventDefault();
    const r = solveCompound(v.p, v.r, v.t, v.n);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: "compound_interest", placement });
  }

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Compound interest calculator">
      <div className="mx-calc__row">
        <label>Amount invested or borrowed ($)<input inputMode="decimal" value={v.p} onChange={set("p")} /></label>
        <label>Interest rate (% p.a.)<input inputMode="decimal" value={v.r} onChange={set("r")} /></label>
        <label>Time (years)<input inputMode="decimal" value={v.t} onChange={set("t")} /></label>
        <label>
          Compounded
          <select value={v.n} onChange={set("n")}>
            {Object.entries(FREQS).map(([k, name]) => (
              <option key={k} value={k}>{name}</option>
            ))}
          </select>
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
        </div>
      )}
      <p className="mx-calc__hint">Each row&apos;s interest is bigger than the last because interest is earned on the interest already added. Amounts are rounded to the nearest cent for display only.</p>
    </form>
  );
}

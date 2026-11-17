"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { stepHtml } from "./calc-utils";
import { solveSci, MODES } from "./scientific-engine";
import { trackEvent } from "@/lib/analytics";

// Scientific notation converter: an ordinary number to a × 10^n (with
// optional rounding to significant figures), or back again, with the
// working. Logic (and the tests' entry point) lives in scientific-engine.js.

const START = { mode: "toSci", x: "0.000 072", sf: "", a: "3.07", n: "5" };

export default function SciNotationCalc({ placement = "scientific_notation_calc" }) {
  const [mode, setMode] = useState(START.mode);
  const [v, setV] = useState({ x: START.x, sf: START.sf, a: START.a, n: START.n });
  const [res, setRes] = useState(() => solveSci(START.mode, START));
  const set = (k) => (e) => setV((old) => ({ ...old, [k]: e.target.value }));

  function go(e) {
    e?.preventDefault();
    const r = solveSci(mode, v);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: "scientific_notation", placement, mode });
  }

  function changeMode(e) {
    setMode(e.target.value);
    setRes(null);
  }

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Scientific notation converter">
      <div className="mx-calc__row">
        <label>
          Convert
          <select value={mode} onChange={changeMode}>
            {Object.entries(MODES).map(([k, name]) => (
              <option key={k} value={k}>{name}</option>
            ))}
          </select>
        </label>
      </div>
      {mode === "toSci" ? (
        <div className="mx-calc__row mx-calc__row--pair">
          <label>Number<input inputMode="decimal" value={v.x} onChange={set("x")} placeholder="45 600 000" /></label>
          <label>Sig figs (optional)<input inputMode="numeric" value={v.sf} onChange={set("sf")} placeholder="blank = exact" /></label>
        </div>
      ) : (
        <div className="mx-calc__row mx-calc__row--pair">
          <label>Coefficient, a<input inputMode="decimal" value={v.a} onChange={set("a")} placeholder="3.07" /></label>
          <label>Power of 10, n<input inputMode="numeric" value={v.n} onChange={set("n")} placeholder="5 or -4" /></label>
        </div>
      )}
      <div className="mx-calc__btns"><button type="submit" className="mx-calc__go">Show the working</button></div>
      {res?.error && <p className="mx-calc__err" role="alert">{res.error}</p>}
      {res && !res.error && (
        <div className="mx-calc__out" aria-live="polite">
          <p className="mx-calc__ans" aria-label={res.answer} dangerouslySetInnerHTML={{ __html: stepHtml(`$${res.answerTex}$`) }} />
          <ol className="mx-calc__steps">
            {res.steps.map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: stepHtml(s) }} />)}
          </ol>
        </div>
      )}
    </form>
  );
}

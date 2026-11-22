"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { stepHtml } from "./calc-utils";
import { FORMULAS, getFormula, checkAnswer } from "./rearrange-engine";
import { trackEvent } from "@/lib/analytics";

// Rearranging formulas: pick a formula and a letter, try it yourself, check
// your answer by substitution, then reveal the worked steps.
// Logic (and the tests' entry point) lives in rearrange-engine.js.

export default function RearrangeCalc({ placement = "rearrange_calc" }) {
  const [id, setId] = useState("suvat");
  const [subject, setSubject] = useState("t");
  const [attempt, setAttempt] = useState("");
  const [check, setCheck] = useState(null);
  const [showSteps, setShowSteps] = useState(false);
  const f = getFormula(id);
  const sub = f.subjects[subject];

  function pickFormula(e) {
    const nf = getFormula(e.target.value);
    setId(nf.id);
    setSubject(Object.keys(nf.subjects)[0]);
    setAttempt("");
    setCheck(null);
    setShowSteps(false);
  }

  function pickSubject(s) {
    setSubject(s);
    setAttempt("");
    setCheck(null);
    setShowSteps(false);
  }

  function go(e) {
    e?.preventDefault();
    const r = checkAnswer(id, subject, attempt);
    setCheck(r);
    trackEvent?.("calculator_use", { calculator: "rearranging_formulas", placement, formula: id, subject, ok: !!r.ok });
  }

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Rearranging formulas checker">
      <div className="mx-calc__row">
        <label>
          Formula
          <select value={id} onChange={pickFormula}>
            {FORMULAS.map((x) => (
              <option key={x.id} value={x.id}>{x.label} ({x.context})</option>
            ))}
          </select>
        </label>
      </div>
      <div className="mx-formula" dangerouslySetInnerHTML={{ __html: stepHtml(`$${f.tex}$`) }} />
      <p className="mx-calc__label">Make this letter the subject</p>
      <div className="mx-calc__tabs" role="group" aria-label="Letter to make the subject">
        {Object.keys(f.subjects).map((s) => (
          <button key={s} type="button" className="mx-calc__tab" aria-pressed={s === subject} onClick={() => pickSubject(s)}>
            {s}
          </button>
        ))}
      </div>
      <div className="mx-calc__row">
        <label>
          Your answer: {subject} =
          <input
            value={attempt}
            onChange={(e) => setAttempt(e.target.value)}
            placeholder="e.g. (v - u)/a"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </label>
      </div>
      <div className="mx-calc__btns">
        <button type="submit" className="mx-calc__go">Check my answer</button>
        <button type="button" className="mx-calc__clear" onClick={() => setShowSteps((s) => !s)} aria-expanded={showSteps}>
          {showSteps ? "Hide the steps" : "Show the steps"}
        </button>
      </div>
      {check?.error && <p className="mx-calc__err" role="alert">{check.error}</p>}
      {check && !check.error && (
        <p className={check.ok ? "mx-calc__ans" : "mx-calc__err"} aria-live="polite" dangerouslySetInnerHTML={{ __html: stepHtml(check.message) }} />
      )}
      {showSteps && (
        <div className="mx-calc__out" aria-live="polite">
          <p className="mx-calc__ans" dangerouslySetInnerHTML={{ __html: stepHtml(`$${sub.answer}$`) }} />
          <ol className="mx-calc__steps">
            {sub.steps.map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: stepHtml(s) }} />)}
          </ol>
        </div>
      )}
      <p className="mx-calc__hint">Type * for times (or just write letters side by side), / for divide, ^ for powers and sqrt( ) for a square root. Use brackets around a whole numerator or denominator, like (v - u)/a. Letters are case sensitive. Your answer is checked by substituting random numbers, so any correct form is accepted.</p>
    </form>
  );
}

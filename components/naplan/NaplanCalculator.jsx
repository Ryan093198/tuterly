"use client";

import { useState } from "react";

// A simple on-screen calculator for the calculator section of the Year 7
// and 9 practice test (NAPLAN Online gives students one too). Evaluated
// with mathjs, loaded on first use.
const KEYS = [
  ["C", "(", ")", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "⌫", "="],
];
const EXTRA = ["x²", "√", "π", "%"];

export default function NaplanCalculator({ onClose }) {
  const [expr, setExpr] = useState("");
  const [out, setOut] = useState("");

  async function equals() {
    if (!expr.trim()) return;
    try {
      const { evaluate, format } = await import("mathjs");
      const src = expr
        .replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-")
        .replace(/π/g, "pi").replace(/√\(/g, "sqrt(").replace(/%/g, "/100");
      const v = evaluate(src);
      const s = typeof v === "number" ? format(v, { precision: 12 }) : String(v);
      setOut(s);
      setExpr(s);
    } catch {
      setOut("Error");
    }
  }

  function press(k) {
    if (k === "C") { setExpr(""); setOut(""); return; }
    if (k === "⌫") { setExpr((e) => e.slice(0, -1)); return; }
    if (k === "=") { equals(); return; }
    if (k === "x²") { setExpr((e) => `${e}^2`); return; }
    if (k === "√") { setExpr((e) => `${e}√(`); return; }
    setOut("");
    setExpr((e) => e + k);
  }

  return (
    <div className="nx-calc" role="dialog" aria-label="Calculator">
      <div className="nx-calc__head">
        <span>Calculator</span>
        <button type="button" onClick={onClose} aria-label="Close calculator">×</button>
      </div>
      <input
        className="nx-calc__screen"
        value={expr}
        onChange={(e) => { setExpr(e.target.value); setOut(""); }}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); equals(); } }}
        aria-label="Calculation"
        inputMode="decimal"
      />
      <p className="nx-calc__out" aria-live="polite">{out === "Error" ? "Check the calculation" : out ? `= ${out}` : " "}</p>
      <div className="nx-calc__extra">
        {EXTRA.map((k) => <button key={k} type="button" onClick={() => press(k)}>{k}</button>)}
      </div>
      <div className="nx-calc__keys">
        {KEYS.flat().map((k) => (
          <button key={k} type="button" className={/[÷×−+=]/.test(k) ? "is-op" : k === "C" ? "is-clear" : ""} onClick={() => press(k)}>{k}</button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { parseNum, fmt, fixed, stepHtml } from "./calc-utils";
import { trackEvent } from "@/lib/analytics";

// Percentage calculator with working: X% of Y, X as a percentage of Y,
// percentage change from A to B, and increasing or decreasing Y by X%.
// Plain arithmetic (no AI). Answers that don't come out exactly are
// rounded to 2 decimal places, and the working says so.

// A number for the working: exact if it has at most 4 decimal places,
// otherwise rounded to 4 (only used for in-between steps).
const n = (x) => fmt(x, 4);
const isExact2 = (x) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-7;
// A final answer: exact (up to 2 dp) or rounded to 2 dp with ≈.
function final(x) {
  return isExact2(x) ? { eq: "=", s: fmt(x, 2), note: "" } : { eq: "\\approx", s: fixed(x, 2), note: " (rounded to 2 decimal places)" };
}
const plain = (eq) => (eq === "=" ? "=" : "≈");

function check(vals) {
  const nums = vals.map(parseNum);
  if (nums.some((v) => v === null)) return { error: "Fill in both numbers." };
  if (nums.some((v) => Number.isNaN(v))) return { error: "Enter numbers only, like 15, 80 or 12.5 (no % or $ signs)." };
  if (nums.some((v) => Math.abs(v) > 1e12)) return { error: "That number is too big for this calculator." };
  return { nums };
}

const MODES = {
  of: {
    tab: "X% of Y",
    labels: ["Percentage (X)", "Of the amount (Y)"],
    start: ["15", "80"],
    hint: "Example: 15% of 80. Enter the percentage without the % sign.",
    solve([x, y]) {
      const dec = x / 100;
      const ans = dec * y;
      const f = final(ans);
      return {
        answer: `${n(x)}% of ${n(y)} ${plain(f.eq)} ${f.s}`,
        steps: [
          "\"Of\" means multiply, and a percentage is out of 100.",
          `Write the percentage as a decimal: $${n(x)}\\% = \\dfrac{${n(x)}}{100} = ${n(dec)}$`,
          `Multiply: $${n(dec)} \\times ${n(y)} ${f.eq} ${f.s}$${f.note}`,
          `Check: 10% of ${n(y)} is ${n(y / 10)}, and ${n(x)}% is ${n(x / 10)} times that.`,
        ],
      };
    },
  },
  as: {
    tab: "X as a % of Y",
    labels: ["The part (X)", "The whole (Y)"],
    start: ["18", "24"],
    hint: "Example: 18 out of 24 as a percentage. X is the part, Y is the whole.",
    solve([x, y]) {
      if (y === 0) return { error: "The whole (Y) can't be 0, because you can't divide by 0." };
      const ans = (x / y) * 100;
      const f = final(ans);
      return {
        answer: `${n(x)} is ${f.eq === "=" ? "" : "about "}${f.s}% of ${n(y)}`,
        steps: [
          "Write the part over the whole as a fraction, then multiply by 100.",
          `$\\dfrac{\\text{part}}{\\text{whole}} \\times 100 = \\dfrac{${n(x)}}{${n(y)}} \\times 100$`,
          `Divide: $${n(x)} \\div ${n(y)} ${isExact2(x / y * 100) ? "=" : "\\approx"} ${n(x / y)}$`,
          `Multiply by 100: $${n(x / y)} \\times 100 ${f.eq} ${f.s}\\%$${f.note}`,
        ],
      };
    },
  },
  change: {
    tab: "% change",
    labels: ["Original value (A)", "New value (B)"],
    start: ["40", "50"],
    hint: "Example: a price goes from 40 to 50. Always divide by the original (starting) value.",
    solve([a, b]) {
      if (a === 0) return { error: "The original value can't be 0, because you can't divide by 0." };
      const diff = b - a;
      const pct = (diff / a) * 100;
      const f = final(Math.abs(pct));
      const kind = diff > 0 ? "increase" : diff < 0 ? "decrease" : "change";
      const steps = [
        "Percentage change $= \\dfrac{\\text{new} - \\text{original}}{\\text{original}} \\times 100$",
        `Find the change: $${n(b)} - ${a < 0 ? `(${n(a)})` : n(a)} = ${n(diff)}$`,
        `Divide by the original and multiply by 100: $\\dfrac{${n(diff)}}{${n(a)}} \\times 100 ${f.eq} ${pct < 0 ? "-" : ""}${f.s}\\%$${f.note}`,
      ];
      if (diff === 0) {
        steps.push("The value didn't change, so the percentage change is 0%.");
        return { answer: "0% change", steps };
      }
      if (a < 0) steps.push("Careful: the original value is negative, so a positive answer here doesn't always mean the number got bigger. Most school questions use positive values.");
      steps.push(pct > 0 ? "The answer is positive, so it's a percentage increase." : "The answer is negative, so it's a percentage decrease.");
      return { answer: `${f.eq === "=" ? "" : "About "}${f.s}% ${kind}`, steps };
    },
  },
  incdec: {
    tab: "Increase / decrease",
    labels: ["Amount (Y)", "By this percentage (X)"],
    start: ["120", "25"],
    hint: "Example: increase 120 by 25%, or take 25% off 120 for a discount.",
    solve([y, x], dir) {
      const up = dir === "increase";
      const mult = up ? 1 + x / 100 : 1 - x / 100;
      const part = (x / 100) * y;
      const ans = up ? y + part : y - part;
      const f = final(ans);
      const steps = [
        `Find ${n(x)}% of ${n(y)}: $${n(x / 100)} \\times ${n(y)} = ${n(part)}$`,
        up
          ? `Add it on: $${n(y)} + ${n(part)} ${f.eq} ${f.s}$${f.note}`
          : `Take it off: $${n(y)} - ${n(part)} ${f.eq} ${f.s}$${f.note}`,
        `Or in one step with a multiplier: $${n(y)} \\times ${up ? `(1 + ${n(x / 100)})` : `(1 - ${n(x / 100)})`} = ${n(y)} \\times ${n(mult)} ${f.eq} ${f.s}$`,
      ];
      if (!up && x > 100) steps.push("Taking off more than 100% gives a negative answer. Check the question.");
      return { answer: `${n(y)} ${up ? "increased" : "decreased"} by ${n(x)}% ${plain(f.eq)} ${f.s}`, steps };
    },
  },
};

export default function PercentCalc({ placement = "percent_calc", initialMode = "of" }) {
  const [mode, setMode] = useState(initialMode);
  const [vals, setVals] = useState(MODES[initialMode].start);
  const [dir, setDir] = useState("increase");
  const [res, setRes] = useState(() => MODES[initialMode].solve(MODES[initialMode].start.map(Number), "increase"));
  const m = MODES[mode];

  function pick(k) {
    setMode(k);
    setVals(MODES[k].start);
    setRes(null);
  }
  function go(e) {
    e?.preventDefault();
    const c = check(vals);
    const r = c.error ? c : m.solve(c.nums, dir);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: `percent_${mode}`, placement });
  }
  const set = (i) => (e) => setVals((old) => old.map((v, j) => (j === i ? e.target.value : v)));

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Percentage calculator">
      <div className="mx-calc__tabs" role="group" aria-label="What do you want to work out?">
        {Object.entries(MODES).map(([k, v]) => (
          <button key={k} type="button" className="mx-calc__tab" aria-pressed={mode === k} onClick={() => pick(k)}>{v.tab}</button>
        ))}
      </div>
      <div className="mx-calc__row">
        {mode === "incdec" && (
          <label>Increase or decrease?
            <select value={dir} onChange={(e) => setDir(e.target.value)}>
              <option value="increase">Increase</option>
              <option value="decrease">Decrease (discount)</option>
            </select>
          </label>
        )}
        <label>{m.labels[0]}<input inputMode="decimal" value={vals[0]} onChange={set(0)} /></label>
        <label>{m.labels[1]}<input inputMode="decimal" value={vals[1]} onChange={set(1)} /></label>
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
      <p className="mx-calc__hint">{m.hint}</p>
    </form>
  );
}

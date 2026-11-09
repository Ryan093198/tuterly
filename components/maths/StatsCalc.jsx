"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { fmt, stepHtml } from "./calc-utils";
import { trackEvent } from "@/lib/analytics";

// Mean, median, mode, range, quartiles and IQR with working. Quartiles use
// the method common in Australian textbooks: split the ordered data into a
// lower and upper half, leaving out the median when the count is odd, and
// take the median of each half. Plain arithmetic (no AI).
export function parseList(raw) {
  const parts = String(raw || "").split(/[\s,;]+/).filter(Boolean);
  const nums = parts.map((p) => Number(p.replace(/[−–]/g, "-")));
  return nums.some((n) => !Number.isFinite(n)) ? null : nums;
}

function medianOf(sorted) {
  const n = sorted.length;
  const mid = Math.floor(n / 2);
  return n % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

const neg = (x) => (x < 0 ? `(${fmt(x)})` : fmt(x));
const show = (xs) => xs.map((x) => fmt(x)).join(", ");

// How the median of a sorted list was found, as a plain-language step.
function medianStep(label, sorted) {
  const n = sorted.length;
  if (n === 1) return `${label}: there's only one value, ${fmt(sorted[0])}`;
  if (n % 2) {
    const pos = (n + 1) / 2;
    return `${label}: ${n} values (odd), so it's the middle one, value number ${pos}: ${fmt(sorted[pos - 1])}`;
  }
  const a = sorted[n / 2 - 1], b = sorted[n / 2];
  return `${label}: ${n} values (even), so average the middle two, values ${n / 2} and ${n / 2 + 1}: $\\dfrac{${fmt(a)} + ${neg(b)}}{2} = ${fmt((a + b) / 2)}$`;
}

export function solveStats(raw) {
  const xs = parseList(raw);
  if (!xs) return { error: "Enter numbers only, separated by commas or spaces, like 4, 8, 2, 9." };
  if (xs.length < 2) return { error: "Enter at least two values." };
  if (xs.length > 500) return { error: "Enter up to 500 values." };
  const n = xs.length;
  const s = [...xs].sort((a, b) => a - b);
  const sum = xs.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const median = medianOf(s);

  // Mode(s)
  const counts = new Map();
  for (const x of s) counts.set(x, (counts.get(x) || 0) + 1);
  const top = Math.max(...counts.values());
  const modes = top > 1 ? [...counts.keys()].filter((k) => counts.get(k) === top) : [];
  const range = s[n - 1] - s[0];

  // Quartiles: halves exclude the median when n is odd.
  const half = Math.floor(n / 2);
  const lower = s.slice(0, half);
  const upper = s.slice(n % 2 ? half + 1 : half);
  const q1 = medianOf(lower), q3 = medianOf(upper);
  const iqr = q3 - q1;

  const sumText = n <= 15 ? `${xs.map((x, i) => (i ? neg(x) : fmt(x))).join(" + ")} = ${fmt(sum)}` : `the ${n} values add to ${fmt(sum)}`;
  let modeText;
  if (!modes.length) modeText = "Mode: every value appears once, so there is no mode";
  else if (modes.length === counts.size) modeText = `Mode: every value appears ${top} times, so most textbooks say there is no mode`;
  else if (modes.length === 1) modeText = `Mode: ${fmt(modes[0])} appears most often (${top} times)`;
  else modeText = `Modes: ${show(modes)} each appear ${top} times, so there are ${modes.length} modes`;

  const steps = [
    `Put the data in order: ${show(s)}`,
    `Count the values: $n = ${n}$`,
    `Mean: add them up, ${sumText}. Then divide by ${n}: $\\bar{x} = \\dfrac{${fmt(sum)}}{${n}} = ${fmt(mean)}$`,
    medianStep("Median", s),
    modeText,
    `Range: highest − lowest $= ${fmt(s[n - 1])} - ${neg(s[0])} = ${fmt(range)}$`,
    `Lower half${n % 2 ? " (leave out the median)" : ""}: ${show(lower)}`,
    medianStep("Q1 is the median of the lower half", lower),
    `Upper half${n % 2 ? " (leave out the median)" : ""}: ${show(upper)}`,
    medianStep("Q3 is the median of the upper half", upper),
    `Interquartile range: $\\text{IQR} = Q_3 - Q_1 = ${fmt(q3)} - ${neg(q1)} = ${fmt(iqr)}$`,
  ];
  const modeAns = modes.length && modes.length < counts.size ? show(modes) : "none";
  const answer = [
    `Mean ${fmt(mean, 2)}`,
    `Median ${fmt(median)}`,
    `Mode ${modeAns}`,
    `Range ${fmt(range)}`,
    `Q1 ${fmt(q1)}`,
    `Q3 ${fmt(q3)}`,
    `IQR ${fmt(iqr)}`,
  ];
  return { answer, steps, mean, median, modes: modes.length < counts.size ? modes : [], range, q1, q3, iqr, sorted: s };
}

export default function StatsCalc({ placement = "stats_calc" }) {
  const sample = "4, 8, 2, 9, 5, 8, 6";
  const [raw, setRaw] = useState(sample);
  const [res, setRes] = useState(() => solveStats(sample));
  function go(e) {
    e?.preventDefault();
    const r = solveStats(raw);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: "mean_median_mode", placement });
  }
  return (
    <form className="mx-calc" onSubmit={go} aria-label="Mean, median, mode and range calculator">
      <label>Your data (separate with commas or spaces)
        <textarea rows={3} value={raw} onChange={(e) => setRaw(e.target.value)} />
      </label>
      <div className="mx-calc__btns" style={{ marginTop: 12 }}>
        <button type="submit" className="mx-calc__go">Show the working</button>
        <button type="button" className="mx-calc__clear" onClick={() => { setRaw(""); setRes(null); }}>Clear</button>
      </div>
      {res?.error && <p className="mx-calc__err" role="alert">{res.error}</p>}
      {res && !res.error && (
        <div className="mx-calc__out" aria-live="polite">
          <p className="mx-calc__ans" style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px" }}>
            {res.answer.map((a) => <span key={a}>{a}</span>)}
          </p>
          <ol className="mx-calc__steps">
            {res.steps.map((s, i) => (
              <li key={i} style={{ minWidth: 0, overflowWrap: "anywhere" }} dangerouslySetInnerHTML={{ __html: stepHtml(s) }} />
            ))}
          </ol>
        </div>
      )}
      <p className="mx-calc__hint">Quartiles here use the usual Australian textbook method: split the ordered data into halves (leaving out the median if there’s an odd number of values) and find the median of each half. Some calculators use a slightly different method, so check which one your teacher wants.</p>
    </form>
  );
}

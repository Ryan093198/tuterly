"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { fmt, fixed, stepHtml } from "./calc-utils";
import { trackEvent } from "@/lib/analytics";

// Standard deviation with working. Shows both the population value (σ,
// divide by n) and the sample value (s, divide by n − 1), because schools
// and calculators use both. Plain arithmetic (no AI).
function parseList(raw) {
  const parts = String(raw || "").split(/[\s,;]+/).filter(Boolean);
  const nums = parts.map(Number);
  return nums.some((n) => !Number.isFinite(n)) ? null : nums;
}

function solve(raw) {
  const xs = parseList(raw);
  if (!xs) return { error: "Enter numbers only, separated by commas or spaces." };
  if (xs.length < 2) return { error: "Enter at least two values." };
  if (xs.length > 200) return { error: "Enter up to 200 values." };
  const n = xs.length;
  const sum = xs.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const dev2 = xs.map((x) => (x - mean) ** 2);
  const ss = dev2.reduce((a, b) => a + b, 0);
  const popVar = ss / n, sampVar = ss / (n - 1);
  const pop = Math.sqrt(popVar), samp = Math.sqrt(sampVar);
  const rows = xs.slice(0, 12).map((x, i) => `$${fmt(x)}$: $(${fmt(x)} - ${fmt(mean)})^2 = ${fmt(dev2[i])}$`);
  const steps = [
    `Count the values: $n = ${n}$`,
    `Find the mean: $\\bar{x} = \\dfrac{${fmt(sum)}}{${n}} = ${fmt(mean)}$`,
    `Square each value's distance from the mean:`,
    ...rows,
    ...(n > 12 ? [`…and ${n - 12} more.`] : []),
    `Add them up: $\\sum (x - \\bar{x})^2 = ${fmt(ss)}$`,
    `Population (divide by $n$): $\\sigma = \\sqrt{\\dfrac{${fmt(ss)}}{${n}}} = \\sqrt{${fmt(popVar)}} \\approx ${fixed(pop, 2)}$`,
    `Sample (divide by $n - 1$): $s = \\sqrt{\\dfrac{${fmt(ss)}}{${n - 1}}} = \\sqrt{${fmt(sampVar)}} \\approx ${fixed(samp, 2)}$`,
  ];
  return { answer: `Mean ${fmt(mean, 2)} · σ ≈ ${fixed(pop, 2)} (population) · s ≈ ${fixed(samp, 2)} (sample)`, steps };
}

export default function StdDevCalc({ placement = "stddev_calc" }) {
  const sample = "2, 4, 4, 4, 5, 5, 7, 9";
  const [raw, setRaw] = useState(sample);
  const [res, setRes] = useState(() => solve(sample));
  function go(e) {
    e?.preventDefault();
    const r = solve(raw);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: "standard_deviation", placement });
  }
  return (
    <form className="mx-calc" onSubmit={go} aria-label="Standard deviation calculator">
      <label>Your data (separate with commas or spaces)
        <textarea rows={3} value={raw} onChange={(e) => setRaw(e.target.value)} />
      </label>
      <div className="mx-calc__btns" style={{ marginTop: 12 }}><button type="submit" className="mx-calc__go">Show the working</button></div>
      {res?.error && <p className="mx-calc__err" role="alert">{res.error}</p>}
      {res && !res.error && (
        <div className="mx-calc__out" aria-live="polite">
          <p className="mx-calc__ans">{res.answer}</p>
          <ol className="mx-calc__steps">
            {res.steps.map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: stepHtml(s) }} />)}
          </ol>
        </div>
      )}
      <p className="mx-calc__hint">Not sure which to use? If the data is the whole group you care about, use the population value σ. If it’s a sample from a bigger group, use s. Your teacher or calculator will say which.</p>
    </form>
  );
}

"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { parseNum, fmt, fixed, stepHtml } from "./calc-utils";
import { trackEvent } from "@/lib/analytics";

// Volume of a cylinder calculator with working. Finds the volume from the
// radius (or diameter) and height, or works backwards to the height or the
// radius from the volume. Exact answers in terms of π where they're tidy,
// decimals rounded to 2 decimal places, and the capacity in litres when the
// units are cm, mm or m. Uses the calculator value of π. Plain arithmetic.

const PI = Math.PI;
const isExact = (x, dp) => Math.abs(x * 10 ** dp - Math.round(x * 10 ** dp)) < 1e-7;
const dec = (x) => (isExact(x, 2) ? `= ${fmt(x, 2)}` : `\\approx ${fixed(x, 2)}`);
const decPlain = (x) => (isExact(x, 2) ? `= ${fmt(x, 2)}` : `≈ ${fixed(x, 2)}`);
const piTex = (k) => (isExact(k, 4) ? (fmt(k, 4) === "1" ? "\\pi" : `${fmt(k, 4)}\\pi`) : null);
const piPlain = (k) => (isExact(k, 4) ? (fmt(k, 4) === "1" ? "π" : `${fmt(k, 4)}π`) : null);

// Litres in one cubic unit.
const LITRES = { mm: 0.000001, cm: 0.001, m: 1000 };

export const MODES = {
  volR: { tab: "Volume (radius)", labels: ["Radius (r)", "Height (h)"], start: ["4", "10"] },
  volD: { tab: "Volume (diameter)", labels: ["Diameter (d)", "Height (h)"], start: ["8", "10"] },
  height: { tab: "Find the height", labels: ["Volume (V)", "Radius (r)"], start: ["1000", "5"] },
  radius: { tab: "Find the radius", labels: ["Volume (V)", "Height (h)"], start: ["500", "12"] },
};

export function solve(mode, raws, unitRaw) {
  const nums = raws.map(parseNum);
  if (nums.some((v) => v === null)) return { error: "Fill in both numbers." };
  if (nums.some((v) => Number.isNaN(v))) return { error: "Enter numbers only, like 5 or 7.5 (put the units in the units box)." };
  if (nums.some((v) => v <= 0)) return { error: "Lengths and volumes have to be greater than 0." };
  if (nums.some((v) => v > 1e9)) return { error: "That number is too big for this calculator." };
  const unit = unitRaw.trim().slice(0, 6);
  const u = unit ? `\\text{ ${unit}}` : "";
  const u3 = unit ? `\\text{ ${unit}}^3` : "";
  const uP = unit ? ` ${unit}` : "";
  const u3P = unit ? ` ${unit}³` : "";
  const steps = [];
  let r, h, V, answer;

  if (mode === "volR" || mode === "volD") {
    [r, h] = nums;
    steps.push("Volume of a cylinder: $V = \\pi r^2 h$ (area of the circle times the height)");
    if (mode === "volD") {
      const d = nums[0];
      r = d / 2;
      steps.push(`Halve the diameter to get the radius: $r = \\dfrac{${fmt(d, 4)}}{2} = ${fmt(r, 4)}${u}$`);
    }
    const base = r * r;
    V = PI * base * h;
    const exB = piTex(base);
    const exV = piTex(base * h);
    steps.push(`Area of the circular base: $\\pi r^2 = \\pi \\times ${fmt(r, 4)}^2 = ${exB || `${fmt(base, 4)}\\pi`} ${dec(PI * base)}${unit ? `\\text{ ${unit}}^2` : ""}$`);
    steps.push(`Multiply by the height: $V = ${exB || `${fmt(base, 4)}\\pi`} \\times ${fmt(h, 4)}${exV ? ` = ${exV}` : ""} ${dec(V)}${u3}$`);
    answer = `V ${exV ? `= ${piPlain(base * h)} ` : ""}${decPlain(V)}${u3P}`;
  } else if (mode === "height") {
    [V, r] = nums;
    const base = PI * r * r;
    h = V / base;
    steps.push("Start from $V = \\pi r^2 h$ and divide both sides by $\\pi r^2$: $h = \\dfrac{V}{\\pi r^2}$");
    steps.push(`Area of the base: $\\pi \\times ${fmt(r, 4)}^2 = ${piTex(r * r) || `${fmt(r * r, 4)}\\pi`} \\approx ${fmt(base, 4)}$ (keep the full value in your calculator)`);
    steps.push(`Divide: $h = \\dfrac{${fmt(V, 4)}}{${piTex(r * r) || `${fmt(r * r, 4)}\\pi`}} ${dec(h)}${u}$`);
    steps.push(`Check: $\\pi \\times ${fmt(r, 4)}^2 \\times ${fixed(h, 2)} \\approx ${fixed(base * Number(fixed(h, 2)), 2)}$, close to $${fmt(V, 4)}$ (the small difference is rounding).`);
    answer = `h ${decPlain(h)}${uP}`;
  } else {
    [V, h] = nums;
    const r2 = V / (PI * h);
    r = Math.sqrt(r2);
    steps.push("Start from $V = \\pi r^2 h$. Divide both sides by $\\pi h$: $r^2 = \\dfrac{V}{\\pi h}$");
    steps.push(`Substitute: $r^2 = \\dfrac{${fmt(V, 4)}}{\\pi \\times ${fmt(h, 4)}} \\approx ${fmt(r2, 4)}$`);
    steps.push(`Take the square root: $r \\approx \\sqrt{${fmt(r2, 4)}} ${dec(r)}${u}$`);
    steps.push(`The diameter is twice the radius: $d = 2r ${dec(2 * r)}${u}$`);
    answer = `r ${decPlain(r)}${uP}`;
  }

  const lit = LITRES[unit.toLowerCase()];
  if (V !== undefined && lit && (mode === "volR" || mode === "volD")) {
    const L = V * lit;
    const lTxt = L >= 0.01 ? `${isExact(L, 2) ? "=" : "≈"} ${isExact(L, 2) ? fmt(L, 2) : fixed(L, 2)} L` : `≈ ${fmt(L * 1000, 4)} mL`;
    steps.push(
      unit.toLowerCase() === "m"
        ? `Capacity: $1 \\text{ m}^3 = 1000$ L, so the cylinder holds ${lTxt}`
        : unit.toLowerCase() === "cm"
          ? `Capacity: $1000 \\text{ cm}^3 = 1$ L, so the cylinder holds ${lTxt}`
          : `Capacity: $1\\,000\\,000 \\text{ mm}^3 = 1$ L, so the cylinder holds ${lTxt}`
    );
  }
  steps.push("Decimals are rounded to 2 decimal places using the π button. If your teacher says to use 3.14, your answer may be slightly different.");
  return { answer, steps, r, h, V };
}

export default function CylinderCalc({ placement = "cylinder_calc" }) {
  const [mode, setMode] = useState("volR");
  const [vals, setVals] = useState(MODES.volR.start);
  const [unit, setUnit] = useState("cm");
  const [res, setRes] = useState(() => solve("volR", MODES.volR.start, "cm"));
  const m = MODES[mode];

  function pick(k) {
    setMode(k);
    setVals(MODES[k].start);
    setRes(null);
  }
  function go(e) {
    e?.preventDefault();
    const r = solve(mode, vals, unit);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: `cylinder_${mode}`, placement });
  }
  const set = (i) => (e) => setVals((old) => old.map((v, j) => (j === i ? e.target.value : v)));

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Volume of a cylinder calculator">
      <svg className="mx-tri" viewBox="0 0 220 190" role="img" aria-label="A cylinder with its radius r across the top circle and its height h down the side">
        <ellipse cx="110" cy="40" rx="70" ry="20" fill="none" stroke="currentColor" strokeWidth="3" />
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
      <p className="mx-calc__hint">Use the same units for every length. Volume units are cubed (cm³), lengths are not.</p>
    </form>
  );
}

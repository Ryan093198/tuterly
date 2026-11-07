"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { parseNum, fixed, stepHtml, toFrac, frac, fSub, fDiv, fMul, fAdd, fTex, fTexB, fIsZero, fVal, simplifySurd, surdTex } from "./calc-utils";
import { trackEvent } from "@/lib/analytics";

// Gradient, equation of the line, midpoint and distance from two points,
// with working. Exact fractions and surds. Plain arithmetic (no AI).
function lineEq(m, c) {
  const mx = fIsZero(m) ? "" : m.n === m.d ? "x" : m.n === -m.d ? "-x" : `${fTex(m)}x`;
  if (!mx) return `y = ${fTex(c)}`;
  if (fIsZero(c)) return `y = ${mx}`;
  return `y = ${mx} ${c.n < 0 ? "-" : "+"} ${fTex(frac(Math.abs(c.n), c.d))}`;
}

function solve(v) {
  const nums = v.map(parseNum);
  if (nums.some((x) => x === null)) return { error: "Enter both points." };
  if (nums.some((x) => Number.isNaN(x))) return { error: "Enter numbers only, like 3, -2 or 1.5." };
  const [x1, y1, x2, y2] = nums.map(toFrac);
  if (fIsZero(fSub(x1, x2)) && fIsZero(fSub(y1, y2))) return { error: "The two points are the same. Enter two different points." };
  const rise = fSub(y2, y1), run = fSub(x2, x1);
  const steps = [
    "Gradient formula: $m = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{y_2 - y_1}{x_2 - x_1}$",
    `Substitute: $m = \\dfrac{${fTex(y2)} - ${fTexB(y1)}}{${fTex(x2)} - ${fTexB(x1)}} = \\dfrac{${fTex(rise)}}{${fTex(run)}}$`,
  ];
  let answer, m = null;
  if (fIsZero(run)) {
    steps.push(`The run is 0, so the line is vertical and the gradient is undefined. Its equation is $x = ${fTex(x1)}$.`);
    answer = `Gradient undefined (vertical line x = ${fTex(x1).replace(/\\frac\{(\d+)\}\{(\d+)\}/, "$1/$2")})`;
  } else {
    m = fDiv(rise, run);
    steps.push(`Simplify: $m = ${fTex(m)}$${fIsZero(m) ? " (a horizontal line)" : ""}`);
    const c = fSub(y1, fMul(m, x1));
    steps.push(`Find the y-intercept: $y = mx + c$, so $${fTex(y1)} = ${fTex(m)} \\times ${fTexB(x1)} + c$, giving $c = ${fTex(c)}$`);
    steps.push(`Equation of the line: $${lineEq(m, c)}$`);
    const show = (f) => (f.d === 1 ? String(f.n) : `${f.n}/${f.d}`);
    answer = `Gradient m = ${show(m)} · ${lineEq(m, c).replace(/\\frac\{(\d+)\}\{(\d+)\}x/g, "($1/$2)x").replace(/\\frac\{(\d+)\}\{(\d+)\}/g, "$1/$2")}`;
  }
  const mx = fDiv(fAdd(x1, x2), frac(2)), my = fDiv(fAdd(y1, y2), frac(2));
  steps.push(`Midpoint: $\\left(\\dfrac{x_1 + x_2}{2}, \\dfrac{y_1 + y_2}{2}\\right) = \\left(${fTex(mx)}, ${fTex(my)}\\right)$`);
  const d2 = fAdd(fMul(run, run), fMul(rise, rise));
  let dist = `\\sqrt{${fTex(d2)}}`;
  if (d2.d === 1) {
    const s = simplifySurd(d2.n);
    dist = s.r === 1 ? String(s.k) : `${surdTex(s)} \\approx ${fixed(Math.sqrt(fVal(d2)), 2)}`;
  } else dist += ` \\approx ${fixed(Math.sqrt(fVal(d2)), 2)}`;
  steps.push(`Distance: $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} = \\sqrt{${fTexB(run)}^2 + ${fTexB(rise)}^2} = ${dist}$`);
  return { answer, steps };
}

export default function GradientCalc({ placement = "gradient_calc" }) {
  const [v, setV] = useState(["1", "2", "4", "8"]);
  const [res, setRes] = useState(() => solve(["1", "2", "4", "8"]));
  const set = (i) => (e) => setV((old) => old.map((x, j) => (j === i ? e.target.value : x)));
  function go(e) {
    e?.preventDefault();
    const r = solve(v);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: "gradient", placement });
  }
  return (
    <form className="mx-calc" onSubmit={go} aria-label="Gradient calculator">
      <div className="mx-calc__row">
        <label>x₁<input inputMode="decimal" value={v[0]} onChange={set(0)} /></label>
        <label>y₁<input inputMode="decimal" value={v[1]} onChange={set(1)} /></label>
        <label>x₂<input inputMode="decimal" value={v[2]} onChange={set(2)} /></label>
        <label>y₂<input inputMode="decimal" value={v[3]} onChange={set(3)} /></label>
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
      <p className="mx-calc__hint">Enter two points the line passes through, like (1, 2) and (4, 8).</p>
    </form>
  );
}

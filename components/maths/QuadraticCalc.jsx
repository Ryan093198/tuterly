"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { parseNum, fmt, fixed, stepHtml, isWhole, gcd, simplifySurd, surdTex, toFrac, fTex, fDiv, frac } from "./calc-utils";
import { trackEvent } from "@/lib/analytics";

// Quadratic formula with working: ax² + bx + c = 0. Exact answers when
// a, b and c are whole numbers (fractions and simplified surds), plus
// decimals to 2 places. Plain arithmetic (no AI).
const br = (n) => (n < 0 ? `(${fmt(n)})` : fmt(n));

function eqTex(a, b, c) {
  const term = (coef, v, first) => {
    if (coef === 0) return "";
    const sign = coef < 0 ? "-" : first ? "" : "+";
    const abs = Math.abs(coef);
    const num = v && abs === 1 ? "" : fmt(abs);
    return `${first ? sign : ` ${sign} `}${num}${v}`;
  };
  const s = `${term(a, "x^2", true)}${term(b, "x", false)}${term(c, "", false)}`;
  return `${s.trim()} = 0`;
}

function solve(aRaw, bRaw, cRaw) {
  const a = parseNum(aRaw), b = parseNum(bRaw), c = parseNum(cRaw);
  if ([a, b, c].some((v) => v === null)) return { error: "Enter a, b and c (use 0 if a term is missing)." };
  if ([a, b, c].some((v) => Number.isNaN(v))) return { error: "Enter numbers only, like 2, -3 or 0.5." };
  if (a === 0) return { error: "a can't be 0, or it isn't a quadratic. Solve bx + c = 0 instead." };
  const D = b * b - 4 * a * c;
  const steps = [
    `Write it as $ax^2 + bx + c = 0$: $${eqTex(a, b, c)}$, so $a = ${fmt(a)}$, $b = ${fmt(b)}$, $c = ${fmt(c)}$.`,
    "The quadratic formula: $x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$",
    `Find the discriminant: $\\Delta = b^2 - 4ac = ${br(b)}^2 - 4 \\times ${br(a)} \\times ${br(c)} = ${fmt(b * b)} - ${br(4 * a * c)} = ${fmt(D)}$`,
  ];
  if (D < -1e-12) {
    steps.push(`$\\Delta < 0$, so there are no real solutions (the parabola doesn't cross the x-axis).`);
    return { answer: "No real solutions", steps };
  }
  const ints = [a, b, c].every(isWhole);
  if (Math.abs(D) < 1e-12) {
    const x = -b / (2 * a);
    const exact = ints ? fTex(fDiv(frac(-b), frac(2 * a))) : fmt(x);
    steps.push(`$\\Delta = 0$, so there is one solution: $x = \\dfrac{-b}{2a} = \\dfrac{${fmt(-b)}}{${fmt(2 * a)}} = ${exact}$${isWhole(x) ? "" : ` $\\approx ${fixed(x, 2)}$`}`);
    return { answer: `x = ${isWhole(x) ? fmt(x) : fixed(x, 2)}`, steps };
  }
  steps.push(`$\\Delta > 0$, so there are two solutions.`);
  steps.push(`Substitute: $x = \\dfrac{${fmt(-b)} \\pm \\sqrt{${fmt(D)}}}{${fmt(2 * a)}}$`);
  const x1 = (-b + Math.sqrt(D)) / (2 * a), x2 = (-b - Math.sqrt(D)) / (2 * a);
  if (ints) {
    const { k, r } = simplifySurd(Math.round(D));
    if (r === 1) {
      const p = fTex(fDiv(frac(-b + k), frac(2 * a)));
      const m = fTex(fDiv(frac(-b - k), frac(2 * a)));
      steps.push(`$\\sqrt{${fmt(D)}} = ${k}$, so $x = \\dfrac{${fmt(-b)} + ${k}}{${fmt(2 * a)}} = ${p}$ or $x = \\dfrac{${fmt(-b)} - ${k}}{${fmt(2 * a)}} = ${m}$`);
      return { answer: `x = ${isWhole(x1) ? fmt(x1) : p.replace(/\\frac\{(\d+)\}\{(\d+)\}/, "$1/$2")} or x = ${isWhole(x2) ? fmt(x2) : m.replace(/\\frac\{(\d+)\}\{(\d+)\}/, "$1/$2")}`, steps: steps.map((s) => s) };
    }
    // Simplify (−b ± k√r) / 2a by the common factor of −b, k and 2a.
    let g = gcd(gcd(Math.round(-b), k), Math.round(2 * a));
    let top = Math.round(-b) / g, kk = k / g, bottom = Math.round(2 * a) / g;
    if (bottom < 0) { top = -top; bottom = -bottom; }
    if (k !== 1) steps.push(`Simplify the surd: $\\sqrt{${fmt(D)}} = ${surdTex({ k, r })}$`);
    const surd = surdTex({ k: kk, r });
    const exact = bottom === 1 ? `${top === 0 ? "" : top} \\pm ${surd}` : `\\dfrac{${top === 0 ? "" : top} \\pm ${surd}}{${bottom}}`;
    if (g !== 1 || bottom !== Math.round(2 * a)) steps.push(`Divide through by the common factor: $x = ${exact}$`);
    else steps.push(`$x = ${exact}$`);
    steps.push(`As decimals: $x \\approx ${fixed(x1, 2)}$ or $x \\approx ${fixed(x2, 2)}$ (2 decimal places)`);
    return { answer: `x ≈ ${fixed(x1, 2)} or x ≈ ${fixed(x2, 2)}`, exactTex: `x = ${exact}`, steps };
  }
  steps.push(`$x \\approx ${fixed(x1, 2)}$ or $x \\approx ${fixed(x2, 2)}$ (2 decimal places)`);
  return { answer: `x ≈ ${fixed(x1, 2)} or x ≈ ${fixed(x2, 2)}`, steps };
}

export default function QuadraticCalc({ placement = "quadratic_calc" }) {
  const [a, setA] = useState("2");
  const [b, setB] = useState("-4");
  const [c, setC] = useState("-3");
  const [res, setRes] = useState(() => solve("2", "-4", "-3"));
  function go(e) {
    e?.preventDefault();
    const r = solve(a, b, c);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: "quadratic", placement });
  }
  return (
    <form className="mx-calc" onSubmit={go} aria-label="Quadratic formula calculator">
      <p className="mx-calc__eq" dangerouslySetInnerHTML={{ __html: stepHtml("Solve $ax^2 + bx + c = 0$") }} />
      <div className="mx-calc__row">
        <label>a<input inputMode="decimal" value={a} onChange={(e) => setA(e.target.value)} /></label>
        <label>b<input inputMode="decimal" value={b} onChange={(e) => setB(e.target.value)} /></label>
        <label>c<input inputMode="decimal" value={c} onChange={(e) => setC(e.target.value)} /></label>
      </div>
      <div className="mx-calc__btns"><button type="submit" className="mx-calc__go">Show the working</button></div>
      {res?.error && <p className="mx-calc__err" role="alert">{res.error}</p>}
      {res && !res.error && (
        <div className="mx-calc__out" aria-live="polite">
          <p className="mx-calc__ans">{res.answer}</p>
          {res.exactTex && <p className="mx-calc__exact" dangerouslySetInnerHTML={{ __html: stepHtml(`Exact: $${res.exactTex}$`) }} />}
          <ol className="mx-calc__steps">
            {res.steps.map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: stepHtml(s) }} />)}
          </ol>
        </div>
      )}
      <p className="mx-calc__hint">Rearrange to equal 0 first. If a term is missing, enter 0 (for x² − 9 = 0, b is 0).</p>
    </form>
  );
}

"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { parseNum, stepHtml, toFrac, frac, fMul, fSub, fDiv, fAdd, fTex, fTexB, fIsZero } from "./calc-utils";
import { trackEvent } from "@/lib/analytics";

// Two linear simultaneous equations, solved by elimination with every
// step: ax + by = c and dx + ey = f. Exact fractions throughout.
// Plain arithmetic (no AI).

function lineTex(a, b, c) {
  const t = (k, v, first) => {
    if (fIsZero(k)) return "";
    const neg = k.n < 0;
    const abs = frac(Math.abs(k.n), k.d);
    const num = abs.n === 1 && abs.d === 1 ? "" : fTex(abs);
    return `${first ? (neg ? "-" : "") : neg ? " - " : " + "}${num}${v}`;
  };
  let s = `${t(a, "x", true)}${t(b, "y", fIsZero(a))}`;
  return `${s || "0"} = ${fTex(c)}`;
}
const scale = (k, a, b, c) => [fMul(k, a), fMul(k, b), fMul(k, c)];

function solve(vals) {
  const nums = vals.map(parseNum);
  if (nums.some((v) => v === null)) return { error: "Fill in all six numbers (use 0 if a letter is missing)." };
  if (nums.some((v) => Number.isNaN(v))) return { error: "Enter numbers only, like 3, -2 or 1.5." };
  const [a, b, c, d, e, f] = nums.map(toFrac);
  const det = fSub(fMul(a, e), fMul(b, d));
  const steps = [
    `Label the equations: (1) $${lineTex(a, b, c)}$ and (2) $${lineTex(d, e, f)}$.`,
  ];
  if (fIsZero(det)) {
    const consistent = fIsZero(fSub(fMul(a, f), fMul(c, d))) && fIsZero(fSub(fMul(b, f), fMul(c, e)));
    steps.push(consistent
      ? "The two equations describe the same line, so there are infinitely many solutions."
      : "The lines are parallel (same gradient, different intercepts), so there is no solution.");
    return { answer: consistent ? "Infinitely many solutions" : "No solution", steps };
  }
  // Eliminate y: make the y-coefficients equal, then subtract.
  let eq1 = [a, b, c], eq2 = [d, e, f];
  if (fIsZero(b)) {
    steps.push("Equation (1) has no y, so solve it for x straight away.");
  } else if (fIsZero(e)) {
    steps.push("Equation (2) has no y, so solve it for x straight away.");
  } else if (!(b.n === e.n && b.d === e.d) && !(b.n === -e.n && b.d === e.d)) {
    // Multiply (1) by |e| and (2) by |b| so the y terms match in size.
    const m1 = frac(Math.abs(e.n), e.d), m2 = frac(Math.abs(b.n), b.d);
    eq1 = scale(m1, a, b, c); eq2 = scale(m2, d, e, f);
    steps.push(`Make the $y$ terms match: multiply (1) by $${fTex(m1)}$ and (2) by $${fTex(m2)}$.`);
    steps.push(`(1) becomes $${lineTex(...eq1)}$ and (2) becomes $${lineTex(...eq2)}$.`);
  }
  let x;
  if (fIsZero(b)) {
    x = fDiv(c, a);
    steps.push(`From (1): $x = \\dfrac{${fTex(c)}}{${fTex(a)}} = ${fTex(x)}$`);
  } else if (fIsZero(e)) {
    x = fDiv(f, d);
    steps.push(`From (2): $x = \\dfrac{${fTex(f)}}{${fTex(d)}} = ${fTex(x)}$`);
  } else {
    const same = eq1[1].n === eq2[1].n && eq1[1].d === eq2[1].d;
    const [A, , C] = same ? eq1.map((v, i) => fSub(v, eq2[i])) : eq1.map((v, i) => fAdd(v, eq2[i]));
    steps.push(same
      ? `The $y$ terms are the same, so subtract (2) from (1): $${lineTex(A, frac(0), C)}$`
      : `The $y$ terms are opposites, so add the equations: $${lineTex(A, frac(0), C)}$`);
    x = fDiv(C, A);
    steps.push(`Solve for $x$: $x = \\dfrac{${fTex(C)}}{${fTex(A)}} = ${fTex(x)}$`);
  }
  // Back-substitute into whichever original equation has a y term.
  const useFirst = !fIsZero(b);
  const [p, q, r] = useFirst ? [a, b, c] : [d, e, f];
  const y = fDiv(fSub(r, fMul(p, x)), q);
  steps.push(`Substitute $x = ${fTex(x)}$ into (${useFirst ? 1 : 2}): $${fTex(p)} \\times ${fTexB(x)} + ${fTexB(q)}y = ${fTex(r)}$`);
  steps.push(`Solve for $y$: $y = \\dfrac{${fTex(r)} - ${fTexB(fMul(p, x))}}{${fTex(q)}} = ${fTex(y)}$`);
  // Check in the other equation.
  const [s, t] = useFirst ? [d, e] : [a, b];
  const lhs = fAdd(fMul(s, x), fMul(t, y));
  steps.push(`Check in (${useFirst ? 2 : 1}): $${fTex(s)} \\times ${fTexB(x)} + ${fTexB(t)} \\times ${fTexB(y)} = ${fTex(lhs)}$ ✓`);
  const show = (v) => (v.d === 1 ? String(v.n) : `${v.n}/${v.d}`);
  return { answer: `x = ${show(x)}, y = ${show(y)}`, steps };
}

const LABELS = [["a", "x"], ["b", "y"], ["c", "="], ["d", "x"], ["e", "y"], ["f", "="]];

export default function SimEqCalc({ placement = "simeq_calc" }) {
  const [v, setV] = useState(["2", "3", "13", "4", "-1", "5"]);
  const [res, setRes] = useState(() => solve(["2", "3", "13", "4", "-1", "5"]));
  const set = (i) => (e) => setV((old) => old.map((x, j) => (j === i ? e.target.value : x)));
  function go(e) {
    e?.preventDefault();
    const r = solve(v);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: "simultaneous", placement });
  }
  return (
    <form className="mx-calc" onSubmit={go} aria-label="Simultaneous equations solver">
      <p className="mx-calc__eq" dangerouslySetInnerHTML={{ __html: stepHtml("Solve $ax + by = c$ and $dx + ey = f$") }} />
      {[0, 3].map((o) => (
        <div key={o} className="mx-calc__row">
          {[0, 1, 2].map((k) => (
            <label key={k}>{`${LABELS[o + k][0]} (${LABELS[o + k][1] === "=" ? "right side" : `${LABELS[o + k][1]} coefficient`})`}
              <input inputMode="decimal" value={v[o + k]} onChange={set(o + k)} />
            </label>
          ))}
        </div>
      ))}
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
      <p className="mx-calc__hint">Write both equations in the form ax + by = c first. If a letter is missing, enter 0.</p>
    </form>
  );
}

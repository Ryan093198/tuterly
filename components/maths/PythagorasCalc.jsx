"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { parseNum, fmt, fixed, isWhole, stepHtml } from "./calc-utils";
import { trackEvent } from "@/lib/analytics";

// Pythagoras calculator with working out. Fill in any two sides; it finds
// the third and writes every step the way a teacher would mark it.
// Plain arithmetic in the browser (no AI), so it's always right.
function solve(aRaw, bRaw, cRaw, unit) {
  const a = parseNum(aRaw), b = parseNum(bRaw), c = parseNum(cRaw);
  const vals = [a, b, c];
  if (vals.some((v) => Number.isNaN(v))) return { error: "Enter numbers only, like 6 or 7.5." };
  if (vals.some((v) => v !== null && v <= 0)) return { error: "Side lengths must be greater than 0." };
  const filled = vals.filter((v) => v !== null).length;
  if (filled !== 2) return { error: "Fill in exactly two sides and leave the one you want to find blank." };
  const u = unit ? ` \\text{ ${unit}}` : "";
  const sq = (n) => fmt(n * n);
  const root = (n2, name) => {
    const r = Math.sqrt(n2);
    if (isWhole(r)) return { value: r, lines: [`$${name} = \\sqrt{${fmt(n2)}} = ${fmt(r)}${u}$`], answer: `${name} = ${fmt(r)}${unit ? " " + unit : ""}` };
    return {
      value: r,
      lines: [`$${name} = \\sqrt{${fmt(n2)}}$`, `$${name} \\approx ${fixed(r, 2)}${u}$ (rounded to 2 decimal places)`],
      answer: `${name} ≈ ${fixed(r, 2)}${unit ? " " + unit : ""}`,
    };
  };
  if (c === null) {
    const c2 = a * a + b * b;
    const r = root(c2, "c");
    return {
      answer: `The hypotenuse is ${r.answer.replace("c = ", "").replace("c ≈ ", "about ")}`,
      steps: [
        "You're finding the hypotenuse $c$, the longest side, opposite the right angle.",
        "Write Pythagoras' theorem: $a^2 + b^2 = c^2$",
        `Substitute the two shorter sides: $${fmt(a)}^2 + ${fmt(b)}^2 = c^2$`,
        `Square each side length: $${sq(a)} + ${sq(b)} = c^2$`,
        `Add: $c^2 = ${fmt(c2)}$`,
        "Take the square root of both sides:",
        ...r.lines,
      ],
    };
  }
  const known = a === null ? b : a;
  const name = a === null ? "a" : "b";
  if (c <= known) return { error: "The hypotenuse (c) must be the longest side. Check which side is opposite the right angle." };
  const x2 = c * c - known * known;
  const r = root(x2, name);
  return {
    answer: `The missing side is ${r.answer.replace(`${name} = `, "").replace(`${name} ≈ `, "about ")}`,
    steps: [
      `You're finding a shorter side $${name}$. The hypotenuse is $c = ${fmt(c)}$.`,
      "Write Pythagoras' theorem: $a^2 + b^2 = c^2$",
      name === "a"
        ? `Substitute: $a^2 + ${fmt(known)}^2 = ${fmt(c)}^2$`
        : `Substitute: $${fmt(known)}^2 + b^2 = ${fmt(c)}^2$`,
      name === "a" ? `Square: $a^2 + ${sq(known)} = ${sq(c)}$` : `Square: $${sq(known)} + b^2 = ${sq(c)}$`,
      `Subtract to get $${name}^2$ on its own: $${name}^2 = ${sq(c)} - ${sq(known)} = ${fmt(x2)}$`,
      "Take the square root of both sides:",
      ...r.lines,
    ],
  };
}

export default function PythagorasCalc({ placement = "pythagoras_calc" }) {
  const [a, setA] = useState("6");
  const [b, setB] = useState("8");
  const [c, setC] = useState("");
  const [unit, setUnit] = useState("cm");
  const [res, setRes] = useState(() => solve("6", "8", "", "cm"));

  function go(e) {
    e?.preventDefault();
    const r = solve(a, b, c, unit.trim().slice(0, 6));
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: "pythagoras", placement });
  }

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Pythagoras calculator">
      <svg className="mx-tri" viewBox="0 0 260 170" role="img" aria-label="A right-angled triangle with shorter sides a and b and hypotenuse c">
        <polygon points="30,145 230,145 30,25" fill="none" stroke="currentColor" strokeWidth="3" />
        <polyline points="30,127 48,127 48,145" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="10" y="90">a</text>
        <text x="125" y="165">b</text>
        <text x="138" y="78">c</text>
      </svg>
      <div className="mx-calc__row">
        <label>Side a<input inputMode="decimal" value={a} onChange={(e) => setA(e.target.value)} placeholder="blank to find" /></label>
        <label>Side b<input inputMode="decimal" value={b} onChange={(e) => setB(e.target.value)} placeholder="blank to find" /></label>
        <label>Hypotenuse c<input inputMode="decimal" value={c} onChange={(e) => setC(e.target.value)} placeholder="blank to find" /></label>
        <label>Units (optional)<input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="cm, m…" /></label>
      </div>
      <div className="mx-calc__btns">
        <button type="submit" className="mx-calc__go">Show the working</button>
        <button type="button" className="mx-calc__clear" onClick={() => { setA(""); setB(""); setC(""); setRes(null); }}>Clear</button>
      </div>
      {res?.error && <p className="mx-calc__err" role="alert">{res.error}</p>}
      {res && !res.error && (
        <div className="mx-calc__out" aria-live="polite">
          <p className="mx-calc__ans">{res.answer}</p>
          <ol className="mx-calc__steps">
            {res.steps.map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: stepHtml(s) }} />)}
          </ol>
        </div>
      )}
      <p className="mx-calc__hint">Fill in any two sides and leave the one you want blank. The hypotenuse is the side opposite the right angle.</p>
    </form>
  );
}

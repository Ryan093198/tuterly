"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { parseNum, fmt, fixed, stepHtml } from "./calc-utils";
import { trackEvent } from "@/lib/analytics";

// Circle calculator with working. Enter the radius, diameter,
// circumference or area and it finds the other three, with exact answers
// in terms of π where they're tidy, and decimals rounded to 2 decimal
// places. Uses the calculator value of π. Plain arithmetic (no AI).

const PI = Math.PI;
const isExact = (x, dp) => Math.abs(x * 10 ** dp - Math.round(x * 10 ** dp)) < 1e-7;
// Decimal answer: "= 12" if exact to 2 dp, otherwise "≈ 12.57".
const dec = (x) => (isExact(x, 2) ? `= ${fmt(x, 2)}` : `\\approx ${fixed(x, 2)}`);
const decPlain = (x) => (isExact(x, 2) ? `= ${fmt(x, 2)}` : `≈ ${fixed(x, 2)}`);
// Coefficient of π, only when it's exact to 4 decimal places.
const piTex = (k) => (isExact(k, 4) ? (fmt(k, 4) === "1" ? "\\pi" : `${fmt(k, 4)}\\pi`) : null);
const piPlain = (k) => (isExact(k, 4) ? (fmt(k, 4) === "1" ? "π" : `${fmt(k, 4)}π`) : null);

const KNOWN = [
  ["r", "Radius"],
  ["d", "Diameter"],
  ["C", "Circumference"],
  ["A", "Area"],
];

function solve(known, raw, unitRaw, focus) {
  const v = parseNum(raw);
  if (v === null) return { error: "Enter a measurement." };
  if (Number.isNaN(v)) return { error: "Enter a number only, like 5 or 7.5 (leave the units in the units box)." };
  if (v <= 0) return { error: "A length or area has to be greater than 0." };
  if (v > 1e9) return { error: "That number is too big for this calculator." };
  const unit = unitRaw.trim().slice(0, 6);
  const u = unit ? `\\text{ ${unit}}` : "";
  const u2 = unit ? `\\text{ ${unit}}^2` : "";
  const uP = unit ? ` ${unit}` : "";
  const u2P = unit ? ` ${unit}²` : "";

  const steps = [];
  let r;
  if (known === "r") {
    r = v;
    steps.push(`Radius: $r = ${fmt(r, 4)}${u}$`);
  } else if (known === "d") {
    r = v / 2;
    steps.push(`The radius is half the diameter: $r = \\dfrac{d}{2} = \\dfrac{${fmt(v, 4)}}{2} = ${fmt(r, 4)}${u}$`);
  } else if (known === "C") {
    r = v / (2 * PI);
    steps.push(`Start from $C = 2\\pi r$ and divide both sides by $2\\pi$: $r = \\dfrac{C}{2\\pi} = \\dfrac{${fmt(v, 4)}}{2\\pi} \\approx ${fmt(r, 4)}${u}$ (keep the full value in your calculator)`);
  } else {
    r = Math.sqrt(v / PI);
    steps.push(`Start from $A = \\pi r^2$. Divide by $\\pi$: $r^2 = \\dfrac{${fmt(v, 4)}}{\\pi} \\approx ${fmt(v / PI, 4)}$`);
    steps.push(`Take the square root: $r = \\sqrt{\\dfrac{${fmt(v, 4)}}{\\pi}} \\approx ${fmt(r, 4)}${u}$ (keep the full value in your calculator)`);
  }

  const d = 2 * r, C = 2 * PI * r, A = PI * r * r;
  // Exact π forms only when we started from r or d.
  const exact = known === "r" || known === "d";
  if (known !== "d") steps.push(`Diameter: $d = 2r = 2 \\times ${fmt(r, 4)} ${dec(d)}${u}$`);
  if (known !== "C") {
    const ex = exact && piTex(d);
    steps.push(`Circumference: $C = 2\\pi r = \\pi d = \\pi \\times ${fmt(d, 4)}${ex ? ` = ${ex}` : ""} ${dec(C)}${u}$`);
  }
  if (known !== "A") {
    const ex = exact && piTex(r * r);
    steps.push(`Area: $A = \\pi r^2 = \\pi \\times ${fmt(r, 4)}^2${ex ? ` = ${ex}` : ""} ${dec(A)}${u2}$`);
  }
  steps.push("Decimal answers are rounded to 2 decimal places using the π button. If your teacher says to use 3.14, your answer may be slightly different.");

  const line = (name, val, k, sq) => {
    const ex = exact && k !== null ? piPlain(k) : null;
    return `${name} ${ex ? `= ${ex} ` : ""}${decPlain(val)}${sq ? u2P : uP}`;
  };
  const all = [
    `Radius ${decPlain(r)}${uP}`,
    `Diameter ${decPlain(d)}${uP}`,
    line("Circumference", C, d, false),
    line("Area", A, r * r, true),
  ];
  // Lead with what the page is about (area or circumference), unless
  // that's what was entered, in which case lead with the other one.
  const wantC = focus === "circumference" ? known !== "C" : known === "A";
  const answer = wantC ? all[2] : all[3];
  return { answer, all, steps };
}

export default function CircleCalc({ placement = "circle_calc", focus = "area" }) {
  const [known, setKnown] = useState("r");
  const [val, setVal] = useState("5");
  const [unit, setUnit] = useState("cm");
  const [res, setRes] = useState(() => solve("r", "5", "cm", focus));

  function go(e) {
    e?.preventDefault();
    const r = solve(known, val, unit, focus);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: `circle_${known}`, placement });
  }

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Circle calculator">
      <svg className="mx-tri" viewBox="0 0 220 170" role="img" aria-label="A circle with its centre, a radius r and a diameter d marked">
        <circle cx="110" cy="85" r="70" fill="none" stroke="currentColor" strokeWidth="3" />
        <line x1="40" y1="85" x2="180" y2="85" stroke="currentColor" strokeWidth="2" strokeDasharray="6 5" />
        <line x1="110" y1="85" x2="160" y2="35" stroke="currentColor" strokeWidth="2" />
        <circle cx="110" cy="85" r="3.5" fill="currentColor" />
        <text x="140" y="70">r</text>
        <text x="70" y="104">d</text>
      </svg>
      <div className="mx-calc__row">
        <label>I know the
          <select value={known} onChange={(e) => setKnown(e.target.value)}>
            {KNOWN.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        </label>
        <label>Value<input inputMode="decimal" value={val} onChange={(e) => setVal(e.target.value)} /></label>
        <label>Units (optional)<input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="cm, m…" /></label>
      </div>
      <div className="mx-calc__btns"><button type="submit" className="mx-calc__go">Show the working</button></div>
      {res?.error && <p className="mx-calc__err" role="alert">{res.error}</p>}
      {res && !res.error && (
        <div className="mx-calc__out" aria-live="polite">
          <p className="mx-calc__ans">{res.answer}</p>
          <ul className="mx-calc__exact" style={{ listStyle: "disc", paddingLeft: 22, margin: "0 0 12px" }}>
            {res.all.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <ol className="mx-calc__steps">
            {res.steps.map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: stepHtml(s) }} />)}
          </ol>
        </div>
      )}
      <p className="mx-calc__hint">Pick what you know and enter it. Area units are squared (cm²), lengths are not.</p>
    </form>
  );
}

"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { parseNum, fmt, fixed, stepHtml } from "./calc-utils";
import { trackEvent } from "@/lib/analytics";

// Right-angled triangle trigonometry (SOH CAH TOA) with working out:
// find a side from an angle and a side, or find an angle from two sides.
// Degrees; sides to 2 decimal places, angles to 1, as most Australian
// schools ask. Plain arithmetic (no AI).
const NAMES = { O: "opposite", A: "adjacent", H: "hypotenuse" };
const RATIO = {
  "O,H": { fn: "sin", top: "O", bottom: "H", word: "SOH", f: Math.sin, inv: Math.asin },
  "A,H": { fn: "cos", top: "A", bottom: "H", word: "CAH", f: Math.cos, inv: Math.acos },
  "O,A": { fn: "tan", top: "O", bottom: "A", word: "TOA", f: Math.tan, inv: Math.atan },
};
const pairKey = (x, y) => (["O,H", "A,H", "O,A"].find((k) => k === `${x},${y}` || k === `${y},${x}`));
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;

function solveSide(thetaRaw, knownSide, knownRaw, findSide, unit) {
  const t = parseNum(thetaRaw), k = parseNum(knownRaw);
  if (t === null || k === null) return { error: "Enter the angle and the side you know." };
  if (Number.isNaN(t) || Number.isNaN(k)) return { error: "Enter numbers only, like 35 or 12.5." };
  if (t <= 0 || t >= 90) return { error: "In a right-angled triangle, the angle must be between 0° and 90°." };
  if (k <= 0) return { error: "Side lengths must be greater than 0." };
  if (knownSide === findSide) return { error: "Choose a different side to find." };
  const r = RATIO[pairKey(knownSide, findSide)];
  const u = unit ? ` \\text{ ${unit}}` : "";
  const val = r.f(rad(t));
  const x = findSide === r.top ? k * val : k / val;
  const eqTop = findSide === r.top ? "x" : fmt(k);
  const eqBottom = findSide === r.top ? fmt(k) : "x";
  const rearr = findSide === r.top
    ? `Multiply both sides by $${fmt(k)}$: $x = ${fmt(k)} \\times \\${r.fn} ${fmt(t)}^\\circ$`
    : `Rearrange (swap $x$ and $\\${r.fn} ${fmt(t)}^\\circ$): $x = \\dfrac{${fmt(k)}}{\\${r.fn} ${fmt(t)}^\\circ}$`;
  return {
    answer: `The ${NAMES[findSide]} is about ${fixed(x, 2)}${unit ? " " + unit : ""}`,
    steps: [
      `Label the sides from the angle $${fmt(t)}^\\circ$: you know the ${NAMES[knownSide]} and want the ${NAMES[findSide]}.`,
      `The ${NAMES[r.top]} and the ${NAMES[r.bottom]} go together in ${r.word}: $\\${r.fn}\\theta = \\dfrac{\\text{${NAMES[r.top]}}}{\\text{${NAMES[r.bottom]}}}$`,
      `Substitute: $\\${r.fn} ${fmt(t)}^\\circ = \\dfrac{${eqTop}}{${eqBottom}}$`,
      rearr,
      `Use a calculator (in degrees mode): $\\${r.fn} ${fmt(t)}^\\circ \\approx ${fmt(val, 4)}$`,
      `$x \\approx ${fixed(x, 2)}${u}$ (rounded to 2 decimal places)`,
    ],
  };
}

function solveAngle(s1, v1Raw, s2, v2Raw) {
  const v1 = parseNum(v1Raw), v2 = parseNum(v2Raw);
  if (v1 === null || v2 === null) return { error: "Enter both side lengths." };
  if (Number.isNaN(v1) || Number.isNaN(v2)) return { error: "Enter numbers only, like 7 or 10.5." };
  if (v1 <= 0 || v2 <= 0) return { error: "Side lengths must be greater than 0." };
  if (s1 === s2) return { error: "Choose two different sides." };
  const key = pairKey(s1, s2);
  const r = RATIO[key];
  const top = s1 === r.top ? v1 : v2;
  const bottom = s1 === r.top ? v2 : v1;
  if (r.bottom === "H" && top >= bottom) return { error: "The hypotenuse must be the longest side. Check which side is opposite the right angle." };
  const q = top / bottom;
  const th = deg(r.inv(q));
  return {
    answer: `The angle is about ${fixed(th, 1)}°`,
    steps: [
      `You know the ${NAMES[r.top]} ($${fmt(top)}$) and the ${NAMES[r.bottom]} ($${fmt(bottom)}$), so use ${r.word}.`,
      `$\\${r.fn}\\theta = \\dfrac{\\text{${NAMES[r.top]}}}{\\text{${NAMES[r.bottom]}}} = \\dfrac{${fmt(top)}}{${fmt(bottom)}}$`,
      `Undo $\\${r.fn}$ with the inverse ($\\${r.fn}^{-1}$ on the calculator): $\\theta = \\${r.fn}^{-1}\\left(\\dfrac{${fmt(top)}}{${fmt(bottom)}}\\right)$`,
      `$\\theta \\approx ${fixed(th, 1)}^\\circ$ (rounded to 1 decimal place, calculator in degrees mode)`,
    ],
  };
}

const SideSelect = ({ value, onChange, label }) => (
  <label>{label}
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="O">Opposite</option>
      <option value="A">Adjacent</option>
      <option value="H">Hypotenuse</option>
    </select>
  </label>
);

export default function TrigCalc({ placement = "trig_calc" }) {
  const [mode, setMode] = useState("side");
  const [theta, setTheta] = useState("35");
  const [known, setKnown] = useState("H");
  const [knownVal, setKnownVal] = useState("12");
  const [find, setFind] = useState("O");
  const [unit, setUnit] = useState("cm");
  const [s1, setS1] = useState("O");
  const [v1, setV1] = useState("7");
  const [s2, setS2] = useState("A");
  const [v2, setV2] = useState("10");
  const [res, setRes] = useState(() => solveSide("35", "H", "12", "O", "cm"));

  function go(e) {
    e?.preventDefault();
    const r = mode === "side" ? solveSide(theta, known, knownVal, find, unit.trim().slice(0, 6)) : solveAngle(s1, v1, s2, v2);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: `trig_${mode}`, placement });
  }

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Trigonometry calculator">
      <div className="mx-calc__tabs" role="group" aria-label="What do you want to find?">
        <button type="button" className="mx-calc__tab" aria-pressed={mode === "side"} onClick={() => { setMode("side"); setRes(null); }}>Find a side</button>
        <button type="button" className="mx-calc__tab" aria-pressed={mode === "angle"} onClick={() => { setMode("angle"); setRes(null); }}>Find an angle</button>
      </div>
      <svg className="mx-tri" viewBox="0 0 280 170" role="img" aria-label="A right-angled triangle labelled from the angle theta: opposite, adjacent and hypotenuse">
        <polygon points="20,145 200,145 200,25" fill="none" stroke="currentColor" strokeWidth="3" />
        <polyline points="182,145 182,127 200,127" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="52" y="138">θ</text>
        <text x="206" y="90" style={{ fontSize: 13 }}>Opposite</text>
        <text x="80" y="164" style={{ fontSize: 13 }}>Adjacent</text>
        <text x="44" y="74" style={{ fontSize: 13 }}>Hypotenuse</text>
      </svg>
      {mode === "side" ? (
        <div className="mx-calc__row">
          <label>Angle θ (degrees)<input inputMode="decimal" value={theta} onChange={(e) => setTheta(e.target.value)} /></label>
          <SideSelect label="Side you know" value={known} onChange={setKnown} />
          <label>Its length<input inputMode="decimal" value={knownVal} onChange={(e) => setKnownVal(e.target.value)} /></label>
          <SideSelect label="Side to find" value={find} onChange={setFind} />
          <label>Units (optional)<input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="cm, m…" /></label>
        </div>
      ) : (
        <div className="mx-calc__row">
          <SideSelect label="First side" value={s1} onChange={setS1} />
          <label>Its length<input inputMode="decimal" value={v1} onChange={(e) => setV1(e.target.value)} /></label>
          <SideSelect label="Second side" value={s2} onChange={setS2} />
          <label>Its length<input inputMode="decimal" value={v2} onChange={(e) => setV2(e.target.value)} /></label>
        </div>
      )}
      <div className="mx-calc__btns">
        <button type="submit" className="mx-calc__go">Show the working</button>
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
      <p className="mx-calc__hint">Sides are labelled from the angle θ: the opposite is across from it, the adjacent is next to it, and the hypotenuse is the longest side, opposite the right angle.</p>
    </form>
  );
}

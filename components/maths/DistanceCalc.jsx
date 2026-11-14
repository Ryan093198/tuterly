"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { stepHtml } from "./calc-utils";
import { solveDistance } from "./distance-engine";
import { trackEvent } from "@/lib/analytics";

// Distance between two points calculator with working and a small plot of
// the two points and the right-angled triangle between them. Logic (and the
// tests' entry point) lives in distance-engine.js.

const START = ["-2", "1", "4", "9"];

// Equal-scale plot so the triangle keeps its true shape.
function Plot({ pts }) {
  const { x1, y1, x2, y2, run, rise } = pts;
  const W = 300, H = 220, PAD = 34;
  let minX = Math.min(x1, x2, 0), maxX = Math.max(x1, x2, 0);
  let minY = Math.min(y1, y2, 0), maxY = Math.max(y1, y2, 0);
  // Leave the origin out if it would squash the points into a corner.
  const spanPts = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1), 1);
  if (maxX - minX > 4 * spanPts) { minX = Math.min(x1, x2); maxX = Math.max(x1, x2); }
  if (maxY - minY > 4 * spanPts) { minY = Math.min(y1, y2); maxY = Math.max(y1, y2); }
  const spanX = Math.max(maxX - minX, 1e-9), spanY = Math.max(maxY - minY, 1e-9);
  const k = Math.min((W - 2 * PAD) / spanX, (H - 2 * PAD) / spanY);
  const offX = (W - k * spanX) / 2, offY = (H - k * spanY) / 2;
  const sx = (x) => offX + (x - minX) * k;
  const sy = (y) => H - offY - (y - minY) * k;
  const A = [sx(x1), sy(y1)], B = [sx(x2), sy(y2)], C = [sx(x2), sy(y1)];
  const showXAxis = minY <= 0 && maxY >= 0, showYAxis = minX <= 0 && maxX >= 0;
  const flat = Math.abs(y2 - y1) < 1e-12, tall = Math.abs(x2 - x1) < 1e-12;
  const label = (x, y) => `(${+x.toFixed(3)}, ${+y.toFixed(3)})`;
  const ax = A[0] <= B[0] ? "end" : "start";
  const bx = A[0] <= B[0] ? "start" : "end";
  return (
    <svg className="mx-plot" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`The points ${label(x1, y1)} and ${label(x2, y2)} joined by a line, with the run of ${run} and rise of ${rise} drawn as a right-angled triangle`}>
      {showXAxis && <line x1="6" y1={sy(0)} x2={W - 6} y2={sy(0)} className="mx-plot__axis" />}
      {showYAxis && <line x1={sx(0)} y1="6" x2={sx(0)} y2={H - 6} className="mx-plot__axis" />}
      {!flat && !tall && (
        <>
          <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} className="mx-plot__leg" />
          <line x1={C[0]} y1={C[1]} x2={B[0]} y2={B[1]} className="mx-plot__leg" />
          <text x={(A[0] + C[0]) / 2} y={C[1] + (B[1] < C[1] ? 16 : -8)} textAnchor="middle" className="mx-plot__small">run {run}</text>
          <text x={C[0] + (A[0] < C[0] ? 6 : -6)} y={(C[1] + B[1]) / 2 + 4} textAnchor={A[0] < C[0] ? "start" : "end"} className="mx-plot__small">rise {rise}</text>
        </>
      )}
      <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} className="mx-plot__d" />
      <circle cx={A[0]} cy={A[1]} r="4.5" className="mx-plot__pt" />
      <circle cx={B[0]} cy={B[1]} r="4.5" className="mx-plot__pt" />
      <text x={A[0] + (ax === "end" ? -8 : 8)} y={A[1] + (A[1] > B[1] ? 16 : -8)} textAnchor={ax}>{label(x1, y1)}</text>
      <text x={B[0] + (bx === "end" ? -8 : 8)} y={B[1] + (B[1] >= A[1] ? 16 : -8)} textAnchor={bx}>{label(x2, y2)}</text>
    </svg>
  );
}

export default function DistanceCalc({ placement = "distance_calc" }) {
  const [v, setV] = useState(START);
  const [unit, setUnit] = useState("");
  const [res, setRes] = useState(() => solveDistance(START, ""));
  const set = (i) => (e) => setV((old) => old.map((x, j) => (j === i ? e.target.value : x)));

  function go(e) {
    e?.preventDefault();
    const r = solveDistance(v, unit);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: "distance_two_points", placement });
  }

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Distance between two points calculator">
      <p className="mx-calc__label">First point</p>
      <div className="mx-calc__row mx-calc__row--pair">
        <label>x₁<input inputMode="decimal" value={v[0]} onChange={set(0)} /></label>
        <label>y₁<input inputMode="decimal" value={v[1]} onChange={set(1)} /></label>
      </div>
      <p className="mx-calc__label">Second point</p>
      <div className="mx-calc__row mx-calc__row--pair">
        <label>x₂<input inputMode="decimal" value={v[2]} onChange={set(2)} /></label>
        <label>y₂<input inputMode="decimal" value={v[3]} onChange={set(3)} /></label>
      </div>
      <div className="mx-calc__row mx-calc__row--pair">
        <label>Units (optional)<input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="cm, km…" /></label>
      </div>
      <div className="mx-calc__btns"><button type="submit" className="mx-calc__go">Show the working</button></div>
      {res?.error && <p className="mx-calc__err" role="alert">{res.error}</p>}
      {res && !res.error && (
        <div className="mx-calc__out" aria-live="polite">
          <p className="mx-calc__ans">{res.answer}</p>
          <Plot pts={res.pts} />
          <ol className="mx-calc__steps">
            {res.steps.map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: stepHtml(s) }} />)}
          </ol>
        </div>
      )}
    </form>
  );
}

"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { stepHtml } from "./calc-utils";
import { solveMidpoint, MODES } from "./midpoint-engine";
import { trackEvent } from "@/lib/analytics";

// Midpoint calculator: the midpoint of two points, or the missing endpoint
// from one endpoint and the midpoint, with the working and a small plot.
// Logic (and the tests' entry point) lives in midpoint-engine.js.

const START = { mode: "mid", v: ["-3", "5", "7", "-1"] };
const LABELS = {
  mid: [["First point", "x₁", "y₁"], ["Second point", "x₂", "y₂"]],
  end: [["Endpoint A", "x₁", "y₁"], ["Midpoint M", "x", "y"]],
};

// Equal-scale plot so the segment keeps its true shape.
function Plot({ pts }) {
  const { x1, y1, x2, y2, mx, my, find } = pts;
  const W = 300, H = 220, PAD = 36;
  let minX = Math.min(x1, x2, 0), maxX = Math.max(x1, x2, 0);
  let minY = Math.min(y1, y2, 0), maxY = Math.max(y1, y2, 0);
  const spanPts = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1), 1);
  if (maxX - minX > 4 * spanPts) { minX = Math.min(x1, x2); maxX = Math.max(x1, x2); }
  if (maxY - minY > 4 * spanPts) { minY = Math.min(y1, y2); maxY = Math.max(y1, y2); }
  const spanX = Math.max(maxX - minX, 1e-9), spanY = Math.max(maxY - minY, 1e-9);
  const k = Math.min((W - 2 * PAD) / spanX, (H - 2 * PAD) / spanY);
  const offX = (W - k * spanX) / 2, offY = (H - k * spanY) / 2;
  const sx = (x) => offX + (x - minX) * k;
  const sy = (y) => H - offY - (y - minY) * k;
  const A = [sx(x1), sy(y1)], B = [sx(x2), sy(y2)], M = [sx(mx), sy(my)];
  const showXAxis = minY <= 0 && maxY >= 0, showYAxis = minX <= 0 && maxX >= 0;
  const label = (x, y) => `(${+x.toFixed(3)}, ${+y.toFixed(3)})`;
  // Unit normal to AB, used to push the midpoint label off the line and to draw tick marks.
  const dx = B[0] - A[0], dy = B[1] - A[1], len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len, ny = dx / len;
  const tick = (p, q) => {
    const cx = (p[0] + q[0]) / 2, cy = (p[1] + q[1]) / 2;
    return <line x1={cx - 6 * nx} y1={cy - 6 * ny} x2={cx + 6 * nx} y2={cy + 6 * ny} className="mx-plot__tick" />;
  };
  // Put the midpoint label on the side of the line facing up (smaller y on screen).
  const side = ny <= 0 ? 1 : -1;
  const ml = [M[0] + side * nx * 16, M[1] + side * ny * 16];
  const anchorFor = (p, other) => (p[0] < other[0] - 1 ? "end" : p[0] > other[0] + 1 ? "start" : "middle");
  const aAnchor = anchorFor(A, B), bAnchor = anchorFor(B, A);
  const offFor = (a) => (a === "end" ? -8 : a === "start" ? 8 : 0);
  return (
    <svg className="mx-plot" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`The points ${label(x1, y1)} and ${label(x2, y2)} joined by a line, with the midpoint ${label(mx, my)} marked halfway along`}>
      {showXAxis && <line x1="6" y1={sy(0)} x2={W - 6} y2={sy(0)} className="mx-plot__axis" />}
      {showYAxis && <line x1={sx(0)} y1="6" x2={sx(0)} y2={H - 6} className="mx-plot__axis" />}
      <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} className="mx-plot__d" />
      {tick(A, M)}
      {tick(M, B)}
      <circle cx={A[0]} cy={A[1]} r="4.5" className="mx-plot__pt" />
      <circle cx={B[0]} cy={B[1]} r="4.5" className={find === "B" ? "mx-plot__mid" : "mx-plot__pt"} />
      <circle cx={M[0]} cy={M[1]} r="5" className={find === "M" ? "mx-plot__mid" : "mx-plot__pt"} />
      <text x={A[0] + offFor(aAnchor)} y={A[1] + (A[1] >= B[1] ? 18 : -9)} textAnchor={aAnchor}>A {label(x1, y1)}</text>
      <text x={B[0] + offFor(bAnchor)} y={B[1] + (B[1] > A[1] ? 18 : -9)} textAnchor={bAnchor}>B {label(x2, y2)}</text>
      <text x={ml[0]} y={ml[1] + 4} textAnchor={nx * side > 0.3 ? "start" : nx * side < -0.3 ? "end" : "middle"} className="mx-plot__mlabel">M {label(mx, my)}</text>
    </svg>
  );
}

export default function MidpointCalc({ placement = "midpoint_calc" }) {
  const [mode, setMode] = useState(START.mode);
  const [v, setV] = useState(START.v);
  const [res, setRes] = useState(() => solveMidpoint(START.mode, START.v));
  const set = (i) => (e) => setV((old) => old.map((x, j) => (j === i ? e.target.value : x)));

  function go(e) {
    e?.preventDefault();
    const r = solveMidpoint(mode, v);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: "midpoint", placement, mode });
  }

  function changeMode(e) {
    setMode(e.target.value);
    setRes(null);
  }

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Midpoint calculator">
      <div className="mx-calc__row">
        <label>
          Find
          <select value={mode} onChange={changeMode}>
            {Object.entries(MODES).map(([k, name]) => (
              <option key={k} value={k}>{name}</option>
            ))}
          </select>
        </label>
      </div>
      {LABELS[mode].map(([title, a, b], row) => (
        <div key={title}>
          <p className="mx-calc__label">{title}</p>
          <div className="mx-calc__row mx-calc__row--pair">
            <label>{a}<input inputMode="decimal" value={v[row * 2]} onChange={set(row * 2)} /></label>
            <label>{b}<input inputMode="decimal" value={v[row * 2 + 1]} onChange={set(row * 2 + 1)} /></label>
          </div>
        </div>
      ))}
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

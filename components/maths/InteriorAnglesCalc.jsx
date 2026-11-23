"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { stepHtml } from "./calc-utils";
import { solve, MODES, aName } from "./interior-angles-engine";
import { trackEvent } from "@/lib/analytics";

// Interior angles of polygons calculator with working: angle sum, regular
// polygon angles, sides from an angle sum or one angle, and a missing angle.
// The sketch redraws the polygon split into triangles from one vertex.
// Logic lives in interior-angles-engine.js.

function PolygonSketch({ n }) {
  const k = n >= 3 && n <= 16 ? n : 6;
  const cx = 110, cy = 100, R = 78;
  const pts = Array.from({ length: k }, (_, i) => {
    const t = -Math.PI / 2 + (2 * Math.PI * i) / k + (k % 2 === 0 ? Math.PI / k : 0);
    return [cx + R * Math.cos(t), cy + R * Math.sin(t)];
  });
  const poly = pts.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" ");
  return (
    <svg className="mx-tri" viewBox="0 0 220 200" role="img" aria-label={`${aName(k, true)} split into ${k - 2} triangles by diagonals from one vertex`}>
      {pts.slice(1, -1).map((p, i) => (
        <polygon key={i} points={[pts[0], p, pts[i + 2]].map((q) => q.map((v) => v.toFixed(1)).join(",")).join(" ")} fill="currentColor" fillOpacity={i % 2 ? 0.06 : 0.14} />
      ))}
      {pts.slice(2, -1).map((p, i) => (
        <line key={i} x1={pts[0][0]} y1={pts[0][1]} x2={p[0]} y2={p[1]} stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" />
      ))}
      <polygon points={poly} fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <circle cx={pts[0][0]} cy={pts[0][1]} r="4" fill="currentColor" />
      <text x="110" y="195" textAnchor="middle" fontSize="13">{`${k} sides, ${k - 2} triangles, ${(k - 2) * 180}°`}</text>
    </svg>
  );
}

export default function InteriorAnglesCalc({ placement = "interior_angles_calc" }) {
  const [mode, setMode] = useState("sum");
  const [vals, setVals] = useState(MODES.sum.start);
  const [res, setRes] = useState(() => solve("sum", MODES.sum.start));
  const m = MODES[mode];

  function pick(k) {
    setMode(k);
    setVals(MODES[k].start);
    setRes(null);
  }
  function go(e) {
    e?.preventDefault();
    const r = solve(mode, vals);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: `interior_angles_${mode}`, placement });
  }
  const set = (i) => (e) => setVals((old) => old.map((v, j) => (j === i ? e.target.value : v)));
  const sketchN = res && !res.error && res.n ? res.n : (mode === "sum" || mode === "regular" || mode === "missing") ? Number(vals[0]) : 6;

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Interior angles of polygons calculator">
      <PolygonSketch n={Number.isFinite(sketchN) ? Math.round(sketchN) : 6} />
      <div className="mx-calc__tabs" role="group" aria-label="What do you want to work out?">
        {Object.entries(MODES).map(([k, v]) => (
          <button key={k} type="button" className="mx-calc__tab" aria-pressed={mode === k} onClick={() => pick(k)}>{v.tab}</button>
        ))}
      </div>
      <div className="mx-calc__row">
        {m.labels.map((lab, i) => (
          <label key={`${mode}-${i}`}>{lab}<input inputMode={i === 1 ? "text" : "decimal"} value={vals[i]} onChange={set(i)} /></label>
        ))}
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
      <p className="mx-calc__hint">Angles in degrees. The sketch shows polygons up to 16 sides.</p>
    </form>
  );
}

"use client";

import { useEffect, useState } from "react";
import { QuinnFigure } from "./QuinnArt";
import "./quinn-working.css";
import "@/components/study/quinn-solving.css";

// Quinn writing in his notebook (the app's current Quinn, QuinnArt.jsx):
// the loading state for anything that takes a while to generate. Quinn
// hops and scribbles; maths symbols float up. A status line steps through what's
// happening and a bar eases towards (never reaches) full. Respects
// prefers-reduced-motion (the CSS turns the movement off).
//
// steps: status lines shown in turn across `seconds`.
export default function QuinnWorking({
  title = "Tuterly is preparing your worksheet",
  note = "This usually takes 30 to 40 seconds. Please don't close the tab.",
  steps = [],
  seconds = 35,
}) {
  const [t, setT] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setT((Date.now() - start) / 1000), 250);
    return () => clearInterval(id);
  }, []);
  const step = steps.length ? steps[Math.min(steps.length - 1, Math.floor((t / seconds) * steps.length))] : null;
  // Eases to about 92% at `seconds`, then creeps on slowly.
  const pct = Math.min(97, 92 * (1 - Math.exp((-2.5 * t) / seconds)) + Math.max(0, t - seconds) * 0.15);

  return (
    <div className="qw" role="status" aria-live="polite">
      <div className="qs-stage qs-stage--sm" style={{ flex: "none" }}>
        <span className="qs-syms" aria-hidden="true">
          {["+", "×", "√", "π", "½"].map((c, i) => <i key={c} style={{ "--i": i }}>{c}</i>)}
        </span>
        <QuinnFigure mood="writing" className="qs-quinn" animated />
      </div>

      <div className="qw-text">
        <p className="qw-title">{title}<span className="qw-dots" aria-hidden="true"><i>.</i><i>.</i><i>.</i></span></p>
        {step && <p className="qw-step">{step}</p>}
        <div className="qw-bar" aria-hidden="true"><i style={{ width: `${pct}%` }} /></div>
        <p className="qw-note">{note}</p>
      </div>
    </div>
  );
}

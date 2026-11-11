"use client";

import { useEffect, useState } from "react";
import "./quinn-solving.css";

// The "Try it" loading state (Ryan, 11 Nov 2026: "replicate how it is on
// the app, with the updated Quinn"). Quinn is ported from the app
// (tuterly-study src/components/Quinn.tsx, the 9 Nov chunky amber redraw:
// one blob, teal ribbon rosette, flat feet, capsule arms). He hops like the
// app's QuinnHop, blinks, and changes pose with each stage: thinking (paw to
// chin) while reading and solving, then holding his notebook while he writes
// the fresh question. Maths symbols float up; a checklist ticks through the
// stages. prefers-reduced-motion turns the movement off (CSS).

import { QuinnFigure } from "@/components/brand/QuinnArt";

export const SOLVE_STAGES = [
  { label: "Reading your question", pose: "thinking" },
  { label: "Working out the solution", pose: "thinking" },
  { label: "Writing a fresh question", pose: "writing" },
  { label: "Checking it twice", pose: "happy" },
];

export default function QuinnSolving({ stage = 0 }) {
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    let t1, t2;
    const loop = () => {
      t1 = setTimeout(() => {
        setBlink(true);
        t2 = setTimeout(() => { setBlink(false); loop(); }, 140);
      }, 2200 + Math.random() * 2400);
    };
    loop();
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  const s = Math.min(stage, SOLVE_STAGES.length - 1);
  const pose = SOLVE_STAGES[s].pose;
  return (
    <div className="qs" role="status" aria-live="polite">
      <div className="qs-stage">
        <span className="qs-syms" aria-hidden="true">
          {["+", "×", "√", "π", "x²", "÷", "="].map((c, i) => <i key={i} style={{ "--i": i }}>{c}</i>)}
        </span>
        <QuinnFigure mood={pose} blink={blink} className="qs-quinn" animated />
      </div>
      <div className="qs-side">
        <p className="qs-title">
          {pose === "writing" ? "Quinn is writing a fresh one" : pose === "happy" ? "Nearly there" : "Quinn is on it"}
          <span className="qs-dots" aria-hidden="true"><i /><i /><i /></span>
        </p>
        <ol className="qs-steps">
          {SOLVE_STAGES.map((st, i) => (
            <li key={st.label} className={i < s ? "is-done" : i === s ? "is-now" : ""}>
              <span className="qs-tick" aria-hidden="true">
                {i < s ? (
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
                ) : null}
              </span>
              {st.label}
            </li>
          ))}
        </ol>
        <div className="qs-skel" aria-hidden="true"><i /><i /></div>
        <p className="qs-note">Usually 15 to 30 seconds.</p>
      </div>
    </div>
  );
}

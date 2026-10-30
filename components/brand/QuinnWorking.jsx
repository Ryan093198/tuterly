"use client";

import { useEffect, useState } from "react";
import "./quinn-working.css";

// Quinn writing on a worksheet: the loading state for anything that takes
// a while to generate. Quinn bobs, blinks and scribbles; lines appear on
// the sheet; maths symbols float up. A status line steps through what's
// happening and a bar eases towards (never reaches) full. Respects
// prefers-reduced-motion (the CSS turns the movement off).
//
// steps: status lines shown in turn across `seconds`.
export default function QuinnWorking({
  title = "Quinn is writing your worksheet",
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
      <svg className="qw-art" viewBox="-4 -14 150 116" aria-hidden="true" focusable="false">
        <g className="qw-symbols" fontFamily="Georgia, serif" fontWeight="700" fill="#14A9C8">
          <text className="qw-sym qw-sym--1" x="100" y="40">+</text>
          <text className="qw-sym qw-sym--2" x="116" y="44">×</text>
          <text className="qw-sym qw-sym--3" x="128" y="38">π</text>
          <text className="qw-sym qw-sym--4" x="108" y="42">½</text>
          <text className="qw-sym qw-sym--5" x="122" y="46">√</text>
        </g>
        <ellipse cx="50" cy="96.5" rx="24" ry="3.5" fill="#000" opacity="0.14" />
        <g className="qw-bob">
          <g transform="translate(1.5 0) scale(0.97)">
            <path d="M32 88 C24 90 17 93 11 95 C15 91 22 86 30 83 Z" fill="#735A44" />
            <g className="qw-ear qw-ear--l"><g transform="rotate(-18 27 16)"><ellipse cx="27" cy="16" rx="7.5" ry="10" fill="#AE8E70" /><ellipse cx="27" cy="17" rx="4" ry="6.2" fill="#F4AE96" /></g></g>
            <g className="qw-ear qw-ear--r"><g transform="rotate(18 73 16)"><ellipse cx="73" cy="16" rx="7.5" ry="10" fill="#AE8E70" /><ellipse cx="73" cy="17" rx="4" ry="6.2" fill="#F4AE96" /></g></g>
            <path d="M50 60 C63 60 70 68 73 78 C76 88 70 95 50 95 C30 95 24 88 27 78 C30 68 37 60 50 60 Z" fill="#AE8E70" />
            <ellipse cx="50" cy="84" rx="13" ry="9.5" fill="#F3E6D4" />
            <ellipse cx="36" cy="95.5" rx="13" ry="3.6" fill="#735A44" />
            <ellipse cx="64" cy="95.5" rx="13" ry="3.6" fill="#735A44" />
            <path d="M50 17 C72 17 85 29 85 44 C85 55 77 62 66 66 C60 68 56 72 50 72 C44 72 40 68 34 66 C23 62 15 55 15 44 C15 29 28 17 50 17 Z" fill="#AE8E70" />
            <path d="M50 52 C57 52 61 56 61 61 C61 67 56 71 50 71 C44 71 39 67 39 61 C39 56 43 52 50 52 Z" fill="#CDB69E" />
            <path d="M31 71 C41 76 59 76 69 71 L70 76 C59 82 41 82 30 76 Z" fill="#14A9C8" />
            <path d="M59 77 L65 88 L59 86.5 L56 78 Z" fill="#0E87A1" />
            <ellipse cx="27" cy="57" rx="4.5" ry="2.6" fill="#F49A86" opacity="0.25" />
            <ellipse cx="73" cy="57" rx="4.5" ry="2.6" fill="#F49A86" opacity="0.25" />
            <g className="qw-eyes">
              <g className="qw-eye" style={{ transformOrigin: "38px 49px" }}><ellipse cx="38" cy="49" rx="6" ry="6.8" fill="#2A1B12" /><circle cx="40" cy="46.6" r="2" fill="#fff" /></g>
              <g className="qw-eye" style={{ transformOrigin: "66px 49px" }}><ellipse cx="66" cy="49" rx="6" ry="6.8" fill="#2A1B12" /><circle cx="68" cy="46.6" r="2" fill="#fff" /></g>
            </g>
            <path d="M32 37 Q37 35 42 37" stroke="#735A44" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d="M60 37 Q65 35 70 37" stroke="#735A44" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d="M46.5 56.5 Q50 55 53.5 56.5 Q53 59.2 50 60.2 Q47 59.2 46.5 56.5 Z" fill="#2A1B12" />
            <path d="M46 62 Q50 65 54 62" stroke="#2A1B12" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </g>
          <g transform="rotate(-35 37 75.5)"><g transform="translate(32 74) scale(0.5)"><rect x="4" y="0" width="12" height="27" rx="6" fill="#AE8E70" /><ellipse cx="10" cy="25" rx="6" ry="4.6" fill="#735A44" /></g></g>
        </g>

        {/* The sheet */}
        <g transform="rotate(4 116 78)">
          <rect x="90" y="54" width="50" height="44" rx="3" fill="#fff" stroke="#CBD5E1" strokeWidth="1.2" />
          <line x1="96" y1="63" x2="122" y2="63" stroke="#0E87A1" strokeWidth="2" strokeLinecap="round" />
          <line className="qw-line qw-line--1" x1="96" y1="71" x2="134" y2="71" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />
          <line className="qw-line qw-line--2" x1="96" y1="78" x2="130" y2="78" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />
          <line className="qw-line qw-line--3" x1="96" y1="85" x2="134" y2="85" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />
          <line className="qw-line qw-line--4" x1="96" y1="92" x2="120" y2="92" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />
        </g>

        {/* Writing arm and pencil */}
        <g className="qw-arm">
          <g transform="rotate(-62 63 75.5)">
            <g transform="translate(58 74) scale(0.5)"><rect x="4" y="0" width="12" height="44" rx="6" fill="#AE8E70" /><ellipse cx="10" cy="42" rx="6.5" ry="5" fill="#735A44" /></g>
          </g>
          <g transform="translate(79 83) rotate(-35)">
            <rect x="0" y="-2" width="20" height="4" rx="1" fill="#F5B83D" />
            <rect x="-3" y="-2" width="3.5" height="4" rx="1" fill="#F49A86" />
            <path d="M20 -2 L25 0 L20 2 Z" fill="#F3E6D4" />
            <path d="M23.4 -0.7 L25 0 L23.4 0.7 Z" fill="#2A1B12" />
          </g>
        </g>
      </svg>

      <div className="qw-text">
        <p className="qw-title">{title}<span className="qw-dots" aria-hidden="true"><i>.</i><i>.</i><i>.</i></span></p>
        {step && <p className="qw-step">{step}</p>}
        <div className="qw-bar" aria-hidden="true"><i style={{ width: `${pct}%` }} /></div>
        <p className="qw-note">{note}</p>
      </div>
    </div>
  );
}

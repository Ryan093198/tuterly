"use client";

import { useEffect, useState } from "react";

// The /method hero visual: a student's "to fix" list that gets shorter.
// One orchestrated moment on load: three questions are fixed, one at a
// time, and the count drops from 5 to 2. Reduced motion shows the end
// state straight away.

const ITEMS = [
  { q: "Solve 3(x − 2) = 2x + 5", from: "Topic test, week 4" },
  { q: "Expand (2x + 3)(x − 4)", from: "Homework" },
  { q: "A $240 jacket is 15% off. Find the sale price.", from: "Class quiz" },
  { q: "Find the gradient between (1, 3) and (4, 9)", from: "Topic test, week 4" },
  { q: "A right-angled triangle has hypotenuse 13 and one side 5. Find the other side.", from: "Homework" },
];
const FIX_ORDER = [1, 2, 0];

export default function MethodList() {
  const [fixed, setFixed] = useState([]);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setFixed(FIX_ORDER);
      return;
    }
    const timers = FIX_ORDER.map((i, k) => setTimeout(() => setFixed((f) => [...f, i]), 1100 + k * 1100));
    return () => timers.forEach(clearTimeout);
  }, []);

  const left = ITEMS.length - fixed.length;

  return (
    <figure className="mt-list" aria-label={`A list of questions to fix. ${left} left.`}>
      <div className="mt-list__head">
        <p className="mt-list__t">Your list</p>
        <p className="mt-list__n" aria-live="polite">
          <span key={left} className="mt-list__num">{left}</span> to fix
        </p>
      </div>
      <ul className="mt-list__items">
        {ITEMS.map((it, i) => (
          <li key={it.q} className={`mt-item ${fixed.includes(i) ? "is-fixed" : ""}`}>
            <div className="mt-item__in">
              <span className="mt-item__cam" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></svg>
              </span>
              <span className="mt-item__q">{it.q}</span>
              <span className="mt-item__from">{it.from}</span>
              <span className="mt-item__stamp" aria-hidden={!fixed.includes(i)}>Fixed</span>
            </div>
          </li>
        ))}
      </ul>
      <figcaption className="mt-list__cap">The list only ever has your mistakes on it, and it only gets shorter.</figcaption>
    </figure>
  );
}

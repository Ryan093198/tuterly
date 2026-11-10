"use client";

import { useEffect, useState } from "react";

// The /method hero visual: a student's "to fix" list that gets shorter.
// One orchestrated moment on load: the three snapped questions are fixed
// one at a time, the count drops from 3 to 0, then a "Mastered" reward.
// Reduced motion shows the finished state straight away.

const ITEMS = [
  { q: "Solve 3(x − 2) = 2x + 5", from: "Topic test, week 4" },
  { q: "Expand (2x + 3)(x − 4)", from: "Homework" },
  { q: "Find the gradient between (1, 3) and (4, 9)", from: "Class quiz" },
];
const FIX_ORDER = [0, 1, 2];
const START = 1600;
const STEP = 1200;
const MASTERED_AT = START + STEP * (FIX_ORDER.length - 1) + 1250;

export default function MethodList() {
  const [fixed, setFixed] = useState([]);
  const [mastered, setMastered] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setFixed(FIX_ORDER);
      setMastered(true);
      return;
    }
    const timers = FIX_ORDER.map((i, k) => setTimeout(() => setFixed((f) => [...f, i]), START + k * STEP));
    timers.push(setTimeout(() => setMastered(true), MASTERED_AT));
    return () => timers.forEach(clearTimeout);
  }, []);

  const left = ITEMS.length - fixed.length;

  return (
    <figure className={`mt-list ${mastered ? "is-mastered" : ""}`} aria-label={mastered ? "All three mistakes fixed. Mastered." : `A list of questions to fix. ${left} left.`}>
      <div className="mt-list__head">
        <p className="mt-list__t">Your list</p>
        <p className="mt-list__n" aria-live="polite">
          {mastered ? (
            <span className="mt-list__all">All fixed</span>
          ) : (
            <>
              <span key={left} className="mt-list__num">{left}</span> to fix
            </>
          )}
        </p>
      </div>
      <div className="mt-list__body">
        <ul className="mt-list__items">
          {ITEMS.map((it, i) => (
            <li key={it.q} className={`mt-item ${fixed.includes(i) ? "is-fixed" : ""}`}>
              <div className="mt-item__in">
                <span className="mt-item__cam" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></svg>
                </span>
                <span className="mt-item__q">{it.q}</span>
                <span className="mt-item__from">{it.from}</span>
                <span className="mt-item__stamp" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
                  Fixed
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-done" aria-hidden={!mastered}>
          <span className="mt-done__burst" aria-hidden="true">
            {Array.from({ length: 12 }, (_, k) => <i key={k} style={{ "--a": `${k * 30}deg`, "--d": `${(k % 3) * 60}ms` }} />)}
          </span>
          <span className="mt-done__badge">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
          </span>
          <p className="mt-done__t">Mastered</p>
          <p className="mt-done__x">3 mistakes fixed. Ready to ace the test.</p>
        </div>
      </div>
      <figcaption className="mt-list__cap">The list only ever has your mistakes on it, and it only gets shorter.</figcaption>
    </figure>
  );
}

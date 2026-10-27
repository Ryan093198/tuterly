"use client";

import { useRef, useState } from "react";
import { PhoneFrame } from "@/components/brand";

// A flow of real app screens as numbered steps. On phones it's a swipe
// carousel (CSS scroll snap) with dots; from 900px it's a row of phones.
// The only JavaScript is keeping the dots in step with the swipe.
//
// steps: [{ src, alt, title, text }]
export default function FlowSteps({ steps, label, phoneWidth = 236 }) {
  const listRef = useRef(null);
  const [active, setActive] = useState(0);

  function onScroll() {
    const el = listRef.current;
    if (!el || !el.firstElementChild) return;
    const w = el.firstElementChild.getBoundingClientRect().width + 18;
    const i = Math.round(el.scrollLeft / w);
    if (i !== active) setActive(Math.max(0, Math.min(steps.length - 1, i)));
  }

  function go(i) {
    const item = listRef.current?.children?.[i];
    if (!item) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    item.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest", inline: "center" });
  }

  return (
    <div style={{ minWidth: 0 }}>
      <ol
        ref={listRef}
        className="tb-flow"
        style={{ "--n": steps.length }}
        aria-label={label}
        onScroll={onScroll}
      >
        {steps.map((s, i) => (
          <li key={s.src || i} className="tb-flow__item" aria-label={`Step ${i + 1} of ${steps.length}`}>
            <PhoneFrame
              src={s.src}
              alt={s.alt}
              width={phoneWidth}
              sizes={`(max-width: 899px) 70vw, ${phoneWidth}px`}
              placeholder={s.placeholder}
            />
            <div className="tb-flow__cap">
              <span className="tb-flow__num" aria-hidden="true">{i + 1}</span>
              <h3 className="tb-flow__title">{s.title}</h3>
              {s.text && <p className="tb-flow__text">{s.text}</p>}
            </div>
          </li>
        ))}
      </ol>
      <div className="tb-flow__dots" role="group" aria-label={`${label}: choose a step`}>
        {steps.map((s, i) => (
          <button
            key={i}
            type="button"
            className="tb-flow__dot"
            aria-label={`Show step ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
            onClick={() => go(i)}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}

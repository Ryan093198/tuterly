"use client";

import { Children, useEffect, useId, useState } from "react";
import "./marketing-ux.css";

// Tabs for long lists on the marketing pages (Ryan, 18 Nov 2026), e.g.
// worksheet topics by year. Every panel is in the page HTML (search engines
// and links still see all of it); only the chosen one shows. A link to an
// id inside a panel (#year-9) opens that panel.
export default function Tabs({ tabs, label, children }) {
  const panels = Children.toArray(children);
  const base = useId();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const i = tabs.findIndex((t) => t.id === id || document.getElementById(id)?.closest(`[data-tab-panel="${base}-${tabs.indexOf(t)}"]`));
      if (i >= 0) {
        setActive(i);
        // The target was hidden when the browser tried to jump to it.
        requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, [tabs, base]);

  function onKey(e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActive(next);
    document.getElementById(`${base}-tab-${next}`)?.focus();
  }

  return (
    <div className="mx-tabs">
      <div className="mx-tabs__list" role="tablist" aria-label={label} onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            id={`${base}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            className="mx-tabs__tab"
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {panels.map((p, i) => (
        <div
          key={tabs[i]?.id || i}
          id={`${base}-panel-${i}`}
          data-tab-panel={`${base}-${i}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${i}`}
          hidden={i !== active}
          className="mx-tabs__panel"
        >
          {p}
        </div>
      ))}
    </div>
  );
}

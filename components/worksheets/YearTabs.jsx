"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

// Year chips that switch between server-rendered panels (children, one per
// year, in the same order as `years`). Every panel stays in the HTML for
// search engines; only the chosen one is shown. ?year=Year%208 preselects.
export default function YearTabs({ years, initial, placement, children }) {
  const panels = Array.isArray(children) ? children : [children];
  const [i, setI] = useState(Math.max(0, years.indexOf(initial)));
  useEffect(() => {
    const y = new URLSearchParams(window.location.search).get("year");
    const k = y ? years.indexOf(y) : -1;
    if (k >= 0) setI(k);
  }, [years]);
  return (
    <>
      <div className="sy-years" role="tablist" aria-label="Year level">
        {years.map((y, k) => (
          <button
            key={y}
            type="button"
            role="tab"
            aria-selected={k === i}
            className={`sy-year ${k === i ? "is-on" : ""}`}
            onClick={() => { setI(k); trackEvent("skill_year_pick", { placement, year: y }); }}
          >
            {y}
          </button>
        ))}
      </div>
      {panels.map((p, k) => (
        <div key={years[k]} role="tabpanel" hidden={k !== i}>
          {p}
        </div>
      ))}
    </>
  );
}

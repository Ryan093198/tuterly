"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

// "Maths, explained" on the home page: every /worksheets/[slug] topic page,
// in year tabs. All the years are in the HTML (inactive ones `hidden`), so
// Google sees every link; visitors see one year at a time.
// years: [{ year: "Year 7", topics: [{ slug, topic }] }]
export default function TopicGrid({ years }) {
  const [active, setActive] = useState(0);
  return (
    <div className="tg">
      <div className="tg__tabs" role="tablist" aria-label="Year level">
        {years.map((y, i) => (
          <button
            key={y.year}
            type="button"
            role="tab"
            id={`tg-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`tg-panel-${i}`}
            className={`tg__tab ${i === active ? "is-on" : ""}`}
            onClick={() => {
              setActive(i);
              trackEvent("topic_grid_year", { year: y.year });
            }}
          >
            {y.year}
          </button>
        ))}
      </div>
      {years.map((y, i) => (
        <div key={y.year} role="tabpanel" id={`tg-panel-${i}`} aria-labelledby={`tg-tab-${i}`} hidden={i !== active}>
          <ul className="tg__list">
            {y.topics.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/worksheets/${t.slug}`}
                  className="tg__topic"
                  onClick={() => trackEvent("topic_grid_click", { slug: t.slug })}
                >
                  {t.topic}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

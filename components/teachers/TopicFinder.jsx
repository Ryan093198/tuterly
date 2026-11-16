"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import "./topic-finder.css";

// Top of /teachers/resources (Ryan, 16 Nov 2026: "too many clicks to get
// there"). Pick a year, then a chapter, and the chapter's resources open
// right here: auto-marked test, printable exam, practice sheets, mind map.
// Or search any topic across all years. The full chapter list stays below
// the finder for Google. Data is built on the server (see the page).

const norm = (s) => s.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim();

export default function TopicFinder({ years, chapters }) {
  const [year, setYear] = useState(years[0].slug);
  const [open, setOpen] = useState(null); // chapter key
  const [q, setQ] = useState("");

  const inYear = chapters.filter((c) => c.yearSlug === year);
  const current = chapters.find((c) => c.key === open) || null;

  const results = useMemo(() => {
    const t = norm(q);
    if (t.length < 2) return [];
    const out = [];
    for (const c of chapters) {
      const inName = norm(c.name).includes(t);
      const topics = c.topics.filter((x) => norm(x).includes(t));
      if (inName || topics.length) out.push({ c, topics: inName ? [] : topics.slice(0, 2) });
    }
    return out.slice(0, 8);
  }, [q, chapters]);

  const pick = (c) => {
    setYear(c.yearSlug);
    setOpen(c.key);
    setQ("");
    requestAnimationFrame(() => document.getElementById("tf-detail")?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  };

  return (
    <div className="tf" id="find">
      <div className="tf-head">
        <h2 className="tf-title">Find a topic</h2>
        <div className="tf-search">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search, e.g. Pythagoras, surds, ratios"
            aria-label="Search topics in every year"
          />
        </div>
      </div>

      {q.trim().length >= 2 ? (
        <div className="tf-results" aria-live="polite">
          {results.length === 0 ? (
            <p className="tf-empty">No topic matches &ldquo;{q.trim()}&rdquo;. Try a shorter word, or pick a year below.</p>
          ) : (
            <ul>
              {results.map(({ c, topics }) => (
                <li key={c.key}>
                  <button type="button" onClick={() => pick(c)}>
                    <span className="tf-res__y">{c.yearLabel}</span>
                    <span className="tf-res__n">{c.name}</span>
                    {topics.length > 0 && <span className="tf-res__t">{topics.join(" · ")}</span>}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          <div className="tf-years" role="tablist" aria-label="Year level">
            {years.map((y) => (
              <button
                key={y.slug}
                type="button"
                role="tab"
                aria-selected={year === y.slug}
                className={year === y.slug ? "is-on" : ""}
                onClick={() => { setYear(y.slug); setOpen(null); }}
              >
                {y.label}
              </button>
            ))}
          </div>

          <ul className="tf-chapters" role="tabpanel" aria-label={`${years.find((y) => y.slug === year)?.label} chapters`}>
            {inYear.map((c) => (
              <li key={c.key}>
                <button
                  type="button"
                  aria-expanded={open === c.key}
                  className={open === c.key ? "is-on" : ""}
                  onClick={() => setOpen(open === c.key ? null : c.key)}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {current && q.trim().length < 2 && (
        <div className="tf-detail" id="tf-detail">
          <div className="tf-detail__head">
            <p className="tf-detail__t">{current.yearLabel} {current.name}</p>
            <Link href={current.path} className="tf-detail__all">Full chapter page</Link>
          </div>

          <div className="tf-acts">
            {current.zone.map((z) => (
              <Link key={z.href} href={z.href} className="tf-act tf-act--main">
                <span className="tf-act__t">{z.label}</span>
                <span className="tf-act__x">Shared by link, marked automatically</span>
              </Link>
            ))}
            {current.exam.map((z) => (
              <Link key={z.href} href={z.href} className="tf-act">
                <span className="tf-act__t">{z.label}</span>
                <span className="tf-act__x">PDF with marks and answers</span>
              </Link>
            ))}
            {current.map && (
              <a href={current.map} className="tf-act">
                <span className="tf-act__t">Revision mind map</span>
                <span className="tf-act__x">The whole chapter on one page</span>
              </a>
            )}
          </div>

          {current.sheets.length > 0 && (
            <>
              <p className="tf-sub">Practice sheets by topic</p>
              <ul className="tf-sheets">
                {current.sheets.map((s) => (
                  <li key={s.pdf}>
                    <span>{s.label}</span>
                    <a href={s.pdf}>PDF</a>
                    <Link href={s.test}>Full test</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

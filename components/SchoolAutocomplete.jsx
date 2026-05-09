"use client";

import { useEffect, useRef, useState } from "react";

// Debounced typeahead over /api/schools. Submits the school NAME as the form
// value (matches the existing text column on students.school). Free-text entry
// is allowed — if a tutor's school isn't in the ACARA list they can still
// submit whatever they typed.
export default function SchoolAutocomplete({
  name = "school",
  label = "School",
  defaultValue = "",
  placeholder = "Start typing a school name…",
  inputHeight = "h-11",
}) {
  const [value, setValue] = useState(defaultValue);
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const reqIdRef = useRef(0);

  // Click-away to close the popover.
  useEffect(() => {
    function onDocClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Debounced search. The popover is gated on input length >= 2 in render, so
  // we don't need to clear `results` synchronously when the input shortens —
  // stale results from a previous query stay in state but aren't visible.
  useEffect(() => {
    const q = value.trim();
    if (q.length < 2) return;

    let cancelled = false;
    const myId = ++reqIdRef.current;

    const t = setTimeout(async () => {
      if (cancelled) return;
      setLoading(true);
      try {
        const r = await fetch(`/api/schools?q=${encodeURIComponent(q)}`);
        if (cancelled || myId !== reqIdRef.current) return;
        const data = await r.json();
        setResults(data.results || []);
        setHighlight(-1);
      } catch {
        if (!cancelled && myId === reqIdRef.current) setResults([]);
      } finally {
        if (!cancelled && myId === reqIdRef.current) setLoading(false);
      }
    }, 180);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [value]);

  function pick(school) {
    setValue(school.name);
    setOpen(false);
    inputRef.current?.focus();
  }

  function onKeyDown(e) {
    if (!open || results.length === 0) {
      if (e.key === "ArrowDown" && value.trim().length >= 2) setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, -1));
    } else if (e.key === "Enter") {
      if (highlight >= 0) {
        e.preventDefault();
        pick(results[highlight]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <label className="block space-y-1.5" ref={wrapRef}>
      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          name={name}
          value={value}
          autoComplete="off"
          placeholder={placeholder}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (value.trim().length >= 2) setOpen(true);
          }}
          onKeyDown={onKeyDown}
          className={`w-full ${inputHeight} px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition`}
        />
        {open && value.trim().length >= 2 && (results.length > 0 || loading) && (
          <div className="absolute left-0 right-0 top-full mt-1 z-20 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card shadow-lg overflow-hidden max-h-72 overflow-y-auto">
            {loading && results.length === 0 ? (
              <div className="px-3 py-2 text-xs text-muted">Searching…</div>
            ) : (
              <ul role="listbox">
                {results.map((s, i) => (
                  <li
                    key={s.id}
                    role="option"
                    aria-selected={i === highlight}
                    onMouseDown={(e) => {
                      // Use mousedown so we beat the input's blur and the
                      // click-away listener.
                      e.preventDefault();
                      pick(s);
                    }}
                    onMouseEnter={() => setHighlight(i)}
                    className={`px-3 py-2 cursor-pointer text-sm flex items-baseline justify-between gap-2 ${
                      i === highlight
                        ? "bg-brand-pale/60 text-foreground"
                        : "hover:bg-surface-soft"
                    }`}
                  >
                    <span className="truncate">{s.name}</span>
                    <span className="text-xs text-muted shrink-0">
                      {[s.suburb, s.state].filter(Boolean).join(", ")}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <span className="block text-[11px] text-muted">
        Suggestions from the Australian Schools List. Type freely if your
        school isn&apos;t listed.
      </span>
    </label>
  );
}

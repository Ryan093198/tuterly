"use client";

import { useEffect, useRef, useState } from "react";
import { searchSuburbs } from "@/lib/suburbs";

const c = {
  text: "#1E293B",
  textMuted: "#94A3B8",
  white: "#FFFFFF",
  border: "#E2E8F0",
  teal: "#0ABAB5",
  tealPale: "#F0FDFA",
};

// Search input + dropdown for the directory's location filter. As the
// parent types, suggestions narrow to matching suburbs from
// lib/suburbs.js. Selecting a suggestion (or hitting Enter on a
// highlighted one) commits the value via onChange. Clearing the input
// passes an empty string up so the parent can wipe the filter.
export default function SuburbAutocomplete({
  value,
  onChange,
  placeholder = "Suburb",
  width = 200,
}) {
  const [draft, setDraft] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef(null);

  // Keep the visible draft in sync if the value is changed externally
  // (eg. Clear filters button).
  useEffect(() => {
    setDraft(value || "");
  }, [value]);

  // Close the dropdown when the user clicks outside.
  useEffect(() => {
    function onDocClick(e) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const suggestions = open ? searchSuburbs(draft) : [];

  function commit(name) {
    setDraft(name);
    setOpen(false);
    onChange(name);
  }

  function onKeyDown(e) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      commit(suggestions[highlight] ?? draft);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapRef} style={{ position: "relative", width }}>
      <input
        type="text"
        value={draft}
        placeholder={placeholder}
        onChange={(e) => {
          setDraft(e.target.value);
          setOpen(true);
          setHighlight(0);
          // Wipe the committed filter the moment the input is empty so
          // the result list expands again without an extra click.
          if (!e.target.value.trim()) onChange("");
        }}
        onFocus={() => {
          if (draft) setOpen(true);
        }}
        onKeyDown={onKeyDown}
        style={{
          padding: "10px 14px",
          borderRadius: 8,
          border: `1px solid ${c.border}`,
          fontSize: 14,
          color: c.text,
          background: c.white,
          width: "100%",
          outline: "none",
          fontFamily: "inherit",
        }}
      />
      {open && suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 10,
            background: c.white,
            border: `1px solid ${c.border}`,
            borderRadius: 8,
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
            listStyle: "none",
            margin: 0,
            padding: 4,
            maxHeight: 240,
            overflowY: "auto",
          }}
        >
          {suggestions.map((name, i) => (
            <li key={name}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  commit(name);
                }}
                onMouseEnter={() => setHighlight(i)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 10px",
                  borderRadius: 6,
                  background: i === highlight ? c.tealPale : "transparent",
                  border: "none",
                  fontSize: 14,
                  color: c.text,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

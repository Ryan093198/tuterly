"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { c } from "@/components/marketing/theme";
import { VCE_SUBJECTS, SUBJECT_GROUPS } from "@/lib/vce-subjects";

// Combobox-style subject picker - users can type to filter or open
// the dropdown to browse all Unit 3/4 subjects. Grouped by category.
// Keyboard support: Up / Down / Enter / Escape / Tab.
//
// Inputs:
//   value       currently-selected subject name (or "")
//   onChange    called with the new subject name
//   placeholder text shown when the field is empty
export default function SubjectPicker({ value, onChange, placeholder = "Search or pick a subject..." }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(0);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const listboxId = useId();

  // What the input shows: query while typing, otherwise the selected
  // value. Lets the user replace a selection just by typing.
  const inputValue = isOpen ? query : value;

  // Filter subjects against the query. Empty query shows everything,
  // grouped by category. Non-empty matches on subject name or group.
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return VCE_SUBJECTS;
    return VCE_SUBJECTS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.group.toLowerCase().includes(q)
    );
  }, [query]);

  // Bucket the filtered matches by group for the dropdown
  const grouped = useMemo(() => {
    const map = new Map();
    for (const s of matches) {
      if (!map.has(s.group)) map.set(s.group, []);
      map.get(s.group).push(s);
    }
    // Order groups by the canonical SUBJECT_GROUPS order
    return SUBJECT_GROUPS.filter((g) => map.has(g)).map((g) => ({
      group: g,
      subjects: map.get(g),
    }));
  }, [matches]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  // Derive the in-bounds highlight rather than clamping in an effect
  const safeHighlightIdx = matches.length === 0
    ? -1
    : Math.min(highlightIdx, matches.length - 1);

  function select(subjectName) {
    onChange(subjectName);
    setIsOpen(false);
    setQuery("");
    inputRef.current?.blur();
  }

  function onKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) setIsOpen(true);
      setHighlightIdx((i) => Math.min(matches.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      if (isOpen && matches[safeHighlightIdx]) {
        e.preventDefault();
        select(matches[safeHighlightIdx].name);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
      inputRef.current?.blur();
    }
  }

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onFocus={() => {
          setIsOpen(true);
          setQuery("");
          setHighlightIdx(0);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
          setHighlightIdx(0);
        }}
        onKeyDown={onKeyDown}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 10,
          border: `1px solid ${isOpen ? c.teal : c.border}`,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          background: c.white,
          color: c.text,
          outline: "none",
        }}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        autoComplete="off"
      />
      {isOpen && (
        <div
          ref={listRef}
          id={listboxId}
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            maxHeight: 280,
            overflowY: "auto",
            background: c.white,
            border: `1px solid ${c.border}`,
            borderRadius: 10,
            boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
            zIndex: 30,
          }}
          role="listbox"
        >
          {grouped.length === 0 ? (
            <p style={{ padding: "12px 14px", fontSize: 13, color: c.textMuted }}>
              No subjects match &quot;{query}&quot;.
            </p>
          ) : (
            grouped.map(({ group, subjects }) => (
              <div key={group}>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: c.tealDark,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    padding: "8px 14px 4px",
                    background: c.offWhite,
                    position: "sticky",
                    top: 0,
                  }}
                >
                  {group}
                </p>
                {subjects.map((s) => {
                  const flatIdx = matches.indexOf(s);
                  const isHighlighted = flatIdx === safeHighlightIdx;
                  const isSelected = s.name === value;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => select(s.name)}
                      onMouseEnter={() => setHighlightIdx(flatIdx)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        padding: "8px 14px",
                        background: isHighlighted ? c.tealPale : c.white,
                        border: "none",
                        textAlign: "left",
                        fontSize: 14,
                        cursor: "pointer",
                        color: isSelected ? c.tealDark : c.text,
                        fontWeight: isSelected ? 600 : 400,
                      }}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span>{s.name}</span>
                      {s.scaling && (
                        <span style={{ fontSize: 11, color: c.textMuted, fontFamily: "'Space Grotesk', sans-serif" }}>
                          @30: {s.scaling[2]}
                          {s.scaling[2] > 30 && (
                            <span style={{ color: c.success, marginLeft: 4 }}>(+{s.scaling[2] - 30})</span>
                          )}
                          {s.scaling[2] < 30 && (
                            <span style={{ color: c.amber, marginLeft: 4 }}>({s.scaling[2] - 30})</span>
                          )}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useSyncExternalStore } from "react";

// Three-state segmented control. "system" defers to the OS preference (and
// keeps following it as the OS toggles light/dark); "light" / "dark" pin
// the theme regardless. Persisted in localStorage and read by the anti-flash
// script in app/layout.js so the first paint is correct on next load.
const OPTIONS = [
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
  { value: "dark", label: "Dark" },
];

// Custom event so same-tab updates re-trigger useSyncExternalStore. The
// browser's "storage" event only fires for other tabs, so without this the
// active tab wouldn't notice its own setItem.
const THEME_EVENT = "tuterly:theme-change";

function subscribeTheme(callback) {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
function readTheme() {
  const v = localStorage.getItem("theme");
  return v === "light" || v === "dark" ? v : "system";
}
function readThemeServer() {
  return "system";
}

function applyTheme(value) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = value === "dark" || (value === "system" && prefersDark);
  document.documentElement.classList.toggle("dark", isDark);
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    readTheme,
    readThemeServer
  );

  // When the user picks "system", keep tracking the OS preference live so
  // toggling the OS theme updates the app without a refresh.
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  function choose(value) {
    if (value === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", value);
    applyTheme(value);
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className="inline-flex rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card p-1"
    >
      {OPTIONS.map((opt) => {
        const active = theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => choose(opt.value)}
            className={`px-3 h-8 text-xs font-medium rounded-lg transition flex items-center gap-1.5 ${
              active
                ? "bg-brand-pale text-brand-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            <Icon value={opt.value} />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function Icon({ value }) {
  if (value === "light") {
    return (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    );
  }
  if (value === "dark") {
    return (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    );
  }
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

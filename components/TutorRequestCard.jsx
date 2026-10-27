"use client";

import { useState, useSyncExternalStore } from "react";
import TutorRequestModal from "@/components/TutorRequestModal";
import { DISMISSED_KEY, DISMISS_DAYS, SENT_KEY } from "@/lib/tutor-request";

const c = {
  teal: "var(--brand-text)",
  tealPale: "var(--brand-soft)",
  tealBorder: "var(--border)",
  navy: "var(--foreground)",
  textLight: "var(--muted)",
  white: "var(--card)",
};

// "Want help from a local tutor?" card. Shown on the worksheet success
// state and, for returning worksheet users, at the top of /worksheets.
// Hidden for 30 days after "No thanks", and for good once a request is sent.
export default function TutorRequestCard({ source = "worksheet", initialYear, style }) {
  // Server render + first client render: hidden (no localStorage on the
  // server). After hydration, read the dismissed / sent flags.
  const eligible = useSyncExternalStore(subscribe, shouldShowTutorRequestCard, () => false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const visible = eligible && !hidden;

  function dismiss() {
    try {
      window.localStorage.setItem(DISMISSED_KEY, new Date().toISOString());
    } catch {}
    setHidden(true);
  }

  if (!visible && !open) return null;

  return (
    <>
      {visible && !sent && (
        <div
          style={{
            background: c.tealPale,
            border: `1px solid ${c.tealBorder}`,
            borderRadius: 14,
            padding: "18px 20px",
            display: "flex",
            gap: 16,
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            ...style,
          }}
        >
          <div style={{ flex: "1 1 280px", minWidth: 0 }}>
            <p style={{ fontSize: 16, fontWeight: 800, color: c.navy, margin: "0 0 4px" }}>
              Want help from a local tutor?
            </p>
            <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.55, margin: 0 }}>
              Tell us what your child needs and up to 3 tutoring centres near you
              can get in touch. It&apos;s free.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              type="button"
              onClick={dismiss}
              style={{
                background: "transparent",
                border: "none",
                color: c.textLight,
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
                padding: "10px 6px",
                fontFamily: "inherit",
              }}
            >
              No thanks
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              style={{
                padding: "11px 20px",
                borderRadius: 10,
                background: c.teal,
                color: c.white,
                fontSize: 14.5,
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Find me a tutor
            </button>
          </div>
        </div>
      )}
      {open && (
        <TutorRequestModal
          source={source}
          initialYear={initialYear}
          onSent={() => setSent(true)}
          onClose={() => {
            setOpen(false);
            if (sent) setHidden(true);
          }}
        />
      )}
    </>
  );
}

// Re-check when another tab changes localStorage.
function subscribe(cb) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

export function shouldShowTutorRequestCard() {
  try {
    if (window.localStorage.getItem(SENT_KEY)) return false;
    const dismissed = window.localStorage.getItem(DISMISSED_KEY);
    if (dismissed) {
      const t = Date.parse(dismissed);
      if (Number.isFinite(t) && Date.now() - t < DISMISS_DAYS * 24 * 60 * 60 * 1000) return false;
    }
    return true;
  } catch {
    return true;
  }
}

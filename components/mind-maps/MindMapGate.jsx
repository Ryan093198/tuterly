"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { trackEvent } from "@/lib/analytics";

// Mind maps are free with an email. Until then the map is blurred and the
// download buttons open the email pop-up. One unlock covers every map on
// this device (cookie set by /api/mind-maps/unlock). Someone who already
// gave an email for a worksheet here is unlocked without asking again.
const EVT = "mm-unlocked";
const WORKSHEET_EMAIL_KEY = "tuterly:worksheet_email";

const readUnlocked = () => /(?:^|;\s*)mm_ok=1/.test(document.cookie);
const subscribe = (cb) => { window.addEventListener(EVT, cb); return () => window.removeEventListener(EVT, cb); };
// null on the server and during hydration: render locked (SEO and no flash
// of downloads), then the real state.
export function useUnlocked() {
  return useSyncExternalStore(subscribe, readUnlocked, () => false);
}

async function unlock(body) {
  const res = await fetch("/api/mind-maps/unlock", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || "Something went wrong. Try again.");
  window.dispatchEvent(new Event(EVT));
}

// Quietly unlock for people who already gave an email on the worksheets.
function useAutoUnlock() {
  useEffect(() => {
    if (readUnlocked()) return;
    let email = null;
    try { email = window.localStorage.getItem(WORKSHEET_EMAIL_KEY); } catch {}
    if (email) unlock({ email }).catch(() => {});
  }, []);
}

function UnlockModal({ onClose, placement, year }) {
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [trap, setTrap] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await unlock({ email, marketing_opt_in: optIn, year_level: year ? `Year ${year}` : undefined, company_website: trap });
      try { window.localStorage.setItem(WORKSHEET_EMAIL_KEY, email.trim().toLowerCase()); } catch {}
      trackEvent("generate_lead", { lead_type: "mind_map", source: placement });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return createPortal(
    <div className="mm-modal" role="dialog" aria-modal="true" aria-labelledby="mm-modal-title" onClick={onClose}>
      <form className="mm-modal__card" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <button type="button" className="mm-modal__x" onClick={onClose} aria-label="Close">×</button>
        <img src="/quinn/quinn-happy-bag-glasses.png" alt="" width="72" height="72" />
        <h2 id="mm-modal-title" className="mm-modal__title">Get the free mind maps</h2>
        <p className="mm-modal__text">Enter your email to unlock every revision mind map, with the A4 PDFs and the full revision booklet.</p>
        <input
          type="email" required autoFocus autoComplete="email" placeholder="Your email" className="tb-input"
          value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Your email" disabled={busy}
        />
        <div aria-hidden="true" style={{ position: "absolute", left: -10000, width: 1, height: 1, overflow: "hidden" }}>
          <input tabIndex={-1} autoComplete="off" name="company_website" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </div>
        <label className="mm-modal__tick">
          <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} disabled={busy} />
          <span>Send me maths revision tips and offers from Tuterly. Unsubscribe any time.</span>
        </label>
        {error && <p className="mm-modal__error" role="alert">{error}</p>}
        <button type="submit" className="tb-btn tb-btn--primary mm-modal__go" disabled={busy}>{busy ? "Unlocking…" : "Unlock the mind maps"}</button>
        <p className="mm-modal__small">Free. We&apos;ll unlock every map on this device. See our <a href="/privacy">privacy policy</a>.</p>
      </form>
    </div>,
    document.body
  );
}

// The map itself: blurred with an unlock button until there's an email.
export function GatedSheet({ children, placement, year }) {
  useAutoUnlock();
  const unlocked = useUnlocked();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!unlocked && new URLSearchParams(window.location.search).has("unlock")) setOpen(true);
  }, [unlocked]);
  return (
    <div className={`mm-gate ${unlocked ? "" : "mm-gate--locked"}`}>
      <div className="mm-gated">{children}</div>
      {!unlocked && (
        <div className="mm-gate__cover">
          <div className="mm-gate__card">
            <p className="mm-gate__title">See the full mind map</p>
            <p className="mm-gate__text">Free with your email, plus the A4 PDF to print.</p>
            <button type="button" className="tb-btn tb-btn--primary" onClick={() => { setOpen(true); trackEvent("mind_map_gate_open", { from: "sheet", placement }); }}>
              Unlock it free
            </button>
          </div>
        </div>
      )}
      {open && <UnlockModal onClose={() => setOpen(false)} placement={placement} year={year} />}
    </div>
  );
}

// A download link that asks for the email first.
export function GatedDownload({ href, className, children, placement, year }) {
  useAutoUnlock();
  const unlocked = useUnlocked();
  const [open, setOpen] = useState(false);
  const url = `${href}${href.includes("?") ? "&" : "?"}download=1`;
  return (
    <>
      <a
        href={url}
        className={className}
        onClick={(e) => {
          if (!unlocked) { e.preventDefault(); setOpen(true); trackEvent("mind_map_gate_open", { from: "download", placement }); return; }
          trackEvent("mind_map_download", { placement });
        }}
      >
        {children}
      </a>
      {open && <UnlockModal onClose={() => setOpen(false)} placement={placement} year={year} />}
    </>
  );
}

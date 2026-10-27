"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { STUDY_APP, isStudyAppLive } from "@/lib/study-app";
import { trackEvent } from "@/lib/analytics";
import { c } from "@/components/marketing/theme";

// The one app button used across the marketing site. Everything it says
// and where it points comes from lib/study-app.js:
//
//   stage "live"   App Store button (plus a QR code on desktop). Android
//                  visitors get an "Android is coming" email form instead,
//                  since they can't install an iPhone app.
//   stage "pilot"  iPhone: "Join the free pilot" (TestFlight link if one is
//                  set, otherwise opens the waitlist form).
//                  Everyone else: "Get notified when it launches" form.
//
// Platform detection is client-side only (user agent after mount). The
// server render and first paint use the non-iPhone version.
//
// Variants: hero (big, no heading of its own), inline (inside articles and
// worksheets), card (sidebar / grid card), banner (slim sticky bottom bar).
// Every primary click fires one `study_app_cta_click` event with
// { placement, stage, page, action }.

const BANNER_DISMISS_KEY = "tuterly:study_banner_dismissed";
// Same hidden field name the server checks (lib/public-form-guard.js).
const HONEYPOT_FIELD = "company_website";

function noopSubscribe() {
  return () => {};
}

function readBannerDismissed() {
  try {
    return window.localStorage.getItem(BANNER_DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function detectPlatform() {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent || "";
  if (/iPhone|iPod/i.test(ua)) return "iphone";
  if (/Android/i.test(ua)) return "android";
  if (/Mobi|iPad|Tablet/i.test(ua)) return "other-mobile";
  return "desktop";
}

export default function StudyAppCTA({
  variant = "inline",
  placement,
  heading,
  sub,
  tone = "light", // "light" | "dark" (for navy sections)
  style,
}) {
  const pathname = usePathname() || "/";
  // null on the server and during hydration, then the real platform.
  const platform = useSyncExternalStore(noopSubscribe, detectPlatform, () => null);
  const storedDismiss = useSyncExternalStore(noopSubscribe, readBannerDismissed, () => true);
  const [formOpen, setFormOpen] = useState(false);
  const [dismissedNow, setDismissedNow] = useState(false);
  const bannerHidden = variant !== "banner" || storedDismiss || dismissedNow;
  const live = isStudyAppLive();
  const stage = live ? "live" : "pilot";

  // Lift the floating Enquire button above the banner while it shows.
  useEffect(() => {
    if (variant !== "banner") return;
    const root = document.documentElement;
    if (!bannerHidden) root.style.setProperty("--study-banner-h", "64px");
    else root.style.removeProperty("--study-banner-h");
    return () => root.style.removeProperty("--study-banner-h");
  }, [variant, bannerHidden]);

  const track = (action) =>
    trackEvent("study_app_cta_click", {
      placement: placement || variant,
      stage,
      page: pathname,
      action,
    });

  const dark = tone === "dark";
  const fg = dark ? c.white : c.navy;
  const muted = dark ? "rgba(255,255,255,0.7)" : c.textLight;

  // ── What the action area shows ────────────────────────────────────
  let mode;
  if (live) mode = platform === "android" ? "android-form" : "store";
  else if (platform === "iphone") mode = STUDY_APP.testflightUrl ? "testflight" : "pilot-button";
  else mode = "launch-form";
  // Compact variants keep the form behind a button so they stay slim.
  const compact = variant === "banner";
  if (compact && mode === "launch-form") mode = "launch-button";
  if (compact && mode === "android-form") mode = "android-button";
  if (formOpen) {
    if (mode === "pilot-button") mode = "pilot-form";
    else if (mode === "launch-button") mode = "launch-form";
    else if (mode === "android-button") mode = "android-form";
  }

  const big = variant === "hero";
  const btn = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: big ? "16px 28px" : compact ? "10px 16px" : "12px 20px",
    borderRadius: 12,
    border: "none",
    background: compact || dark ? c.teal : c.navy,
    color: c.white,
    fontFamily: "inherit",
    fontSize: big ? 16 : 14.5,
    fontWeight: 600,
    textDecoration: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

  let action;
  if (mode === "store") {
    action = (
      <StoreButton
        btn={{ ...btn, background: "#000" }}
        showQr={platform === "desktop" && variant !== "banner"}
        muted={muted}
        onClick={() => track("app_store")}
      />
    );
  } else if (mode === "testflight") {
    action = (
      <a href={STUDY_APP.testflightUrl} style={btn} onClick={() => track("testflight")} rel="noopener">
        Join the free pilot
      </a>
    );
  } else if (mode === "pilot-button" || mode === "launch-button" || mode === "android-button") {
    const label =
      mode === "pilot-button"
        ? "Join the free pilot"
        : mode === "android-button"
          ? "Get notified for Android"
          : "Get notified when it launches";
    action = (
      <button
        type="button"
        style={btn}
        onClick={() => {
          track(mode === "pilot-button" ? "open_pilot_form" : "open_waitlist_form");
          setFormOpen(true);
        }}
      >
        {label}
      </button>
    );
  } else {
    const kind = mode === "pilot-form" ? "pilot" : mode === "android-form" ? "android" : "launch";
    action = (
      <WaitlistForm
        kind={kind}
        big={big}
        dark={dark}
        btn={btn}
        placement={placement || variant}
        pathname={pathname}
        onSubmitClick={() => track("waitlist_submit")}
      />
    );
  }

  const meta = (
    <p style={{ fontSize: 13, color: muted, margin: "10px 0 0", lineHeight: 1.5 }}>
      {live ? `${STUDY_APP.name} · iPhone · Years 7 to 10 maths` : `${STUDY_APP.priceLine} · Years 7 to 10 maths · iPhone`}
    </p>
  );

  // ── Variants ──────────────────────────────────────────────────────
  if (variant === "banner") {
    if (bannerHidden) return null;
    return (
      <div
        role="region"
        aria-label={`${STUDY_APP.name} app`}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 8999,
          background: c.navy,
          color: c.white,
          padding: "10px 16px calc(10px + env(safe-area-inset-bottom))",
          boxShadow: "0 -8px 24px rgba(15,23,42,0.18)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "space-between" }}>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.4, flex: "1 1 220px" }}>
            <strong>{heading || STUDY_APP.name}</strong>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>
              {" "}
              {sub || "Snap the maths questions you get wrong. Practise fresh versions until they're fixed."}
            </span>
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {mode.endsWith("form") ? (
              <WaitlistForm
                kind={mode === "pilot-form" ? "pilot" : mode === "android-form" ? "android" : "launch"}
                dark
                compact
                btn={btn}
                placement={placement || "banner"}
                pathname={pathname}
                onSubmitClick={() => track("waitlist_submit")}
              />
            ) : (
              action
            )}
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => {
                try {
                  window.localStorage.setItem(BANNER_DISMISS_KEY, "1");
                } catch {}
                setDismissedNow(true);
              }}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 20, cursor: "pointer", padding: "4px 8px", lineHeight: 1 }}
            >
              ×
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div style={style} data-study-cta={placement || "hero"}>
        {action}
        {meta}
      </div>
    );
  }

  const isCard = variant === "card";
  return (
    <aside
      data-study-cta={placement || variant}
      style={{
        background: dark ? c.navyMid : isCard ? c.white : c.tealPale,
        border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : isCard ? c.border : "rgba(10,186,181,0.25)"}`,
        borderRadius: 16,
        padding: isCard ? "22px 22px" : "24px 26px",
        margin: "28px 0",
        ...style,
      }}
    >
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 1.4, textTransform: "uppercase", color: dark ? c.tealLight : c.tealDark, margin: "0 0 8px" }}>
        {STUDY_APP.name} · Years 7 to 10 maths
      </p>
      <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: isCard ? 21 : 24, lineHeight: 1.25, color: fg, margin: "0 0 8px" }}>
        {heading || "Got some of these wrong?"}
      </p>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: muted, margin: "0 0 16px" }}>
        {sub || `Snap them in ${STUDY_APP.name} and get a fresh version to practise until they're fixed.`}
      </p>
      {action}
      {meta}
    </aside>
  );
}

function StoreButton({ btn, showQr, muted, onClick }) {
  const [qrSvg, setQrSvg] = useState(null);
  useEffect(() => {
    if (!showQr || !STUDY_APP.appStoreUrl) return;
    let cancelled = false;
    import("qrcode-generator").then((mod) => {
      const qrcode = mod.default || mod;
      const qr = qrcode(0, "M");
      qr.addData(STUDY_APP.appStoreUrl);
      qr.make();
      if (!cancelled) setQrSvg(qr.createSvgTag({ cellSize: 3, margin: 2, scalable: true }));
    });
    return () => {
      cancelled = true;
    };
  }, [showQr]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
      <a href={STUDY_APP.appStoreUrl} style={btn} onClick={onClick} rel="noopener">
        Download free on the App Store
      </a>
      {showQr && qrSvg && (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            aria-label="QR code that opens the App Store on your phone"
            role="img"
            style={{ width: 84, height: 84, background: "#fff", borderRadius: 8, padding: 2 }}
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />
          <span style={{ fontSize: 12.5, color: muted, maxWidth: 120, lineHeight: 1.4 }}>Scan with your iPhone camera</span>
        </div>
      )}
    </div>
  );
}

const ROLES = [
  { value: "parent", label: "I'm a parent" },
  { value: "student", label: "I'm a student" },
  { value: "tutor", label: "I'm a tutor" },
];

function WaitlistForm({ kind, big, dark, compact, btn, placement, pathname, onSubmitClick }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("parent");
  const [year, setYear] = useState("");
  const [trap, setTrap] = useState("");
  const [state, setState] = useState("idle"); // idle | pending | done | already | error
  const [error, setError] = useState("");

  const label =
    kind === "pilot" ? "Join the free pilot" : kind === "android" ? "Notify me" : "Get notified";
  const intro =
    kind === "pilot"
      ? "Pilot spots are limited. Leave your email and we'll be in touch if one opens, and when the app launches."
      : kind === "android"
        ? "It's iPhone only for now. We'll email you once when Android is ready."
        : "Get notified when it launches. We'll email you once, when it's on the App Store.";

  async function submit(e) {
    e.preventDefault();
    if (state === "pending") return;
    onSubmitClick?.();
    setState("pending");
    setError("");
    try {
      const res = await fetch("/api/study-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          role,
          year_level: year || null,
          source_page: pathname,
          placement,
          interest: kind,
          [HONEYPOT_FIELD]: trap,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong. Please try again.");
      setState(data?.already ? "already" : "done");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setState("error");
    }
  }

  const textColor = dark ? c.white : c.navy;
  const muted = dark ? "rgba(255,255,255,0.7)" : c.textLight;

  if (state === "done" || state === "already") {
    return (
      <p role="status" style={{ margin: 0, fontSize: compact ? 14 : 15, color: textColor, lineHeight: 1.5 }}>
        {state === "already"
          ? "You're already on the list. We'll be in touch."
          : "Thanks, you're on the list. Check your inbox for a confirmation."}
      </p>
    );
  }

  const field = {
    padding: big ? "14px 14px" : "11px 12px",
    borderRadius: 10,
    border: `1px solid ${dark ? "rgba(255,255,255,0.2)" : c.border}`,
    background: dark ? "rgba(255,255,255,0.06)" : c.white,
    color: textColor,
    fontFamily: "inherit",
    fontSize: big ? 15.5 : 14.5,
    minWidth: 0,
  };

  return (
    <form onSubmit={submit} style={{ margin: 0 }} aria-label={label}>
      {!compact && (
        <p style={{ fontSize: 14, color: muted, margin: "0 0 10px", lineHeight: 1.5 }}>{intro}</p>
      )}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "stretch" }}>
        <label htmlFor={`${id}-email`} style={srOnly}>Email address</label>
        <input
          id={`${id}-email`}
          type="email"
          required
          autoComplete="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ ...field, flex: compact ? "1 1 180px" : "1 1 220px" }}
        />
        {!compact && (
          <>
            <label htmlFor={`${id}-role`} style={srOnly}>I am a</label>
            <select id={`${id}-role`} value={role} onChange={(e) => setRole(e.target.value)} style={{ ...field, flex: "0 1 auto" }}>
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            {role !== "tutor" && (
              <>
                <label htmlFor={`${id}-year`} style={srOnly}>Year level (optional)</label>
                <select id={`${id}-year`} value={year} onChange={(e) => setYear(e.target.value)} style={{ ...field, flex: "0 1 auto" }}>
                  <option value="">Year (optional)</option>
                  {[7, 8, 9, 10].map((y) => (
                    <option key={y} value={y}>Year {y}</option>
                  ))}
                </select>
              </>
            )}
          </>
        )}
        {/* Honeypot: hidden from people, filled by bots. */}
        <div aria-hidden="true" style={{ position: "absolute", left: -10000, width: 1, height: 1, overflow: "hidden" }}>
          <label>
            Company website
            <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} name={HONEYPOT_FIELD} />
          </label>
        </div>
        <button type="submit" disabled={state === "pending"} style={{ ...btn, opacity: state === "pending" ? 0.7 : 1 }}>
          {state === "pending" ? "Saving…" : label}
        </button>
      </div>
      {role === "student" && !compact && (
        <p style={{ fontSize: 12.5, color: muted, margin: "8px 0 0", lineHeight: 1.5 }}>
          Under 16? Ask a parent to sign up for you.
        </p>
      )}
      {error && (
        <p role="alert" style={{ fontSize: 13, color: c.rose, margin: "8px 0 0" }}>{error}</p>
      )}
      {!compact && (
        <p style={{ fontSize: 12, color: muted, margin: "8px 0 0", lineHeight: 1.5 }}>
          We only use your email for {STUDY_APP.name} updates. See our <a href="/privacy" style={{ color: "inherit" }}>privacy policy</a>.
        </p>
      )}
    </form>
  );
}

const srOnly = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

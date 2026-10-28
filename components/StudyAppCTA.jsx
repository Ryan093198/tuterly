"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { STUDY_APP, isStudyAppLive } from "@/lib/study-app";
import { trackEvent } from "@/lib/analytics";
import "@/components/brand/brand.css";

// The one app button used across the marketing site. Everything it says
// and where it points comes from lib/study-app.js:
//
//   stage "live"   App Store and/or Google Play buttons for whichever
//                  store URLs are set (iPhone sees App Store, Android sees
//                  Google Play, desktop sees both, with a QR code). An
//                  Android visitor before the Play listing exists gets an
//                  email form instead,
//                  since they can't install an app for iPhone and Android.
//   stage "pilot"  Not on the App Store or Google Play yet: a "Coming soon to the App
//                  Store" label and a "Get notified" email form, for
//                  everyone (no pilot sign-up on the site).
//
// Platform detection is client-side only (user agent after mount). The
// server render and first paint use the non-iPhone version.
//
// Variants: hero (big, no heading of its own), inline (inside articles and
// worksheets), card (sidebar / grid card), banner (slim sticky bottom bar).
// Every primary click fires one `study_app_cta_click` GA4 event with
// { placement, position, stage, page, action }. position is where on the
// page it sits (nav, hero, inline, final, banner) so placements can be
// compared; it comes from the variant unless passed.
//
// Styling: tb- classes in components/brand/brand.css (the app's ledged
// buttons and rounded fields).

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
  position,
  slim = false, // hero: email + button only, so the button stays above the fold on phones
  audience = "parent", // "student" on the student pages: the sign-up is saved as a student
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

  const pos =
    position ||
    (variant === "nav" ? "nav" : variant === "banner" ? "banner" : variant === "hero" ? (/final/.test(placement || "") ? "final" : "hero") : "inline");
  const track = (action) =>
    trackEvent("study_app_cta_click", {
      placement: placement || variant,
      position: pos,
      stage,
      page: pathname,
      action,
    });

  // Nav button: a single small link. The full form lives on the home page
  // hero (#get-app), so the nav never grows a form.
  if (variant === "nav") {
    let href = "/#get-app";
    let label = "Free to download";
    const storeUrl = platform === "android" ? STUDY_APP.playStoreUrl : STUDY_APP.appStoreUrl || STUDY_APP.playStoreUrl;
    if (live && storeUrl) {
      href = storeUrl;
      label = "Free to download";
    }
    return (
      <a
        href={href}
        className="tb-btn tb-btn--primary tb-btn--sm"
        onClick={() => track(href.startsWith("/#") ? "nav_to_form" : "app_store")}
        style={{ marginBottom: 4, whiteSpace: "nowrap", ...style }}
      >
        {label}
      </a>
    );
  }

  // ── What the action area shows ────────────────────────────────────
  let mode;
  if (live) {
    if (platform === "android") mode = STUDY_APP.playStoreUrl ? "store" : "android-form";
    else if (platform === "iphone") mode = STUDY_APP.appStoreUrl ? "store" : "launch-form";
    else mode = "store";
  }
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
  const btnClass = `tb-btn tb-btn--primary ${compact ? "tb-btn--sm" : "tb-btn--fluid"}`;

  let action;
  if (mode === "store") {
    action = (
      <StoreButton
        platform={platform}
        btnClass={btnClass}
        showQr={platform === "desktop" && variant !== "banner"}
        onClick={() => track("app_store")}
      />
    );
  } else if (mode === "testflight") {
    action = (
      <a href={STUDY_APP.testflightUrl} className={btnClass} onClick={() => track("testflight")} rel="noopener">
        Join the free pilot
      </a>
    );
  } else if (mode === "pilot-button" || mode === "launch-button" || mode === "android-button") {
    const label =
      mode === "pilot-button"
        ? "Join the free pilot"
        : mode === "android-button"
          ? "Get notified for Android"
          : "Sign up early for 50% off";
    action = (
      <button
        type="button"
        className={btnClass}
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
        wide={big}
        slim={slim}
        audience={audience}
        btnClass={btnClass}
        placement={placement || variant}
        pathname={pathname}
        onSubmitClick={() => track("waitlist_submit")}
      />
    );
  }

  const meta = (
    <p className="tb-appcta__meta">
      {live
        ? `Free to download · 1-week free trial · Years 7 to 10 maths · iPhone and Android`
        : `Free to download · 1-week free trial · Years 7 to 10 maths · iPhone and Android`}
    </p>
  );
  // Until launch, say plainly where it will be.
  const soon = !live && (
    <p className="tb-appcta__soon">
      <AppStoreGlyph /> Coming soon on iPhone and Android
    </p>
  );

  // ── Variants ──────────────────────────────────────────────────────
  if (variant === "banner") {
    if (bannerHidden) return null;
    return (
      <div role="region" aria-label={`${STUDY_APP.name} app`} className="tb-appbar">
        <div className="tb-appbar__in">
          <p className="tb-appbar__text">
            <strong>{heading || STUDY_APP.name}</strong>{" "}
            {sub || "Snap the maths questions you get wrong. Practise fresh versions until they're mastered."}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            {mode.endsWith("form") ? (
              <WaitlistForm
                kind={mode === "pilot-form" ? "pilot" : mode === "android-form" ? "android" : "launch"}
                compact
                btnClass={btnClass}
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
              className="tb-appbar__close"
              onClick={() => {
                try {
                  window.localStorage.setItem(BANNER_DISMISS_KEY, "1");
                } catch {}
                setDismissedNow(true);
              }}
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
      <div className="tb-appcta" style={style} data-study-cta={placement || "hero"}>
        {soon}
        {action}
        {meta}
      </div>
    );
  }

  const isCard = variant === "card";
  return (
    <aside
      data-study-cta={placement || variant}
      className={`tb-appcta ${isCard ? "tb-appcta--card" : "tb-appcta--box"}`}
      style={style}
    >
      <p className="tb-eyebrow" style={{ marginBottom: 8 }}>{STUDY_APP.name} · Years 7 to 10 maths</p>
      <p className="tb-appcta__title">{heading || "Got some of these wrong?"}</p>
      <p className="tb-appcta__sub">
        {sub || `Snap them in ${STUDY_APP.name} and get a fresh version to practise until they're mastered.`}
      </p>
      {soon}
      {action}
      {meta}
    </aside>
  );
}

// A plain "A" mark in a rounded square (not Apple's logo or badge, which
// can't be altered to say "coming soon").
function AppStoreGlyph() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <path d="M9 16.5l3-9 3 9M10 13.5h4" />
    </svg>
  );
}

function StoreButton({ platform, btnClass, showQr, onClick }) {
  const [qrSvg, setQrSvg] = useState(null);
  const apple = platform !== "android" && STUDY_APP.appStoreUrl;
  const google = platform !== "iphone" && STUDY_APP.playStoreUrl;
  // The QR code opens tuterly.com.au, which sends each phone to its store.
  const qrTarget = "https://www.tuterly.com.au/#get-app";
  useEffect(() => {
    if (!showQr) return;
    let cancelled = false;
    import("qrcode-generator").then((mod) => {
      const qrcode = mod.default || mod;
      const qr = qrcode(0, "M");
      qr.addData(qrTarget);
      qr.make();
      if (!cancelled) setQrSvg(qr.createSvgTag({ cellSize: 3, margin: 2, scalable: true }));
    });
    return () => {
      cancelled = true;
    };
  }, [showQr]);

  // TODO when live: swap the text button for Apple's official badge
  // (public/app-store-badge.svg from Apple's marketing site).
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
      {apple && (
        <a href={STUDY_APP.appStoreUrl} className={btnClass} onClick={onClick} rel="noopener">
          Download free on the App Store
        </a>
      )}
      {google && (
        <a href={STUDY_APP.playStoreUrl} className={btnClass} onClick={onClick} rel="noopener">
          Get it free on Google Play
        </a>
      )}
      {showQr && qrSvg && (
        <div className="tb-appcta__qr">
          <div
            aria-label="QR code that opens Tuterly on your phone"
            role="img"
            className="tb-appcta__qr-code"
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />
          <span className="tb-small tb-muted" style={{ maxWidth: 130 }}>Scan with your phone camera</span>
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

function WaitlistForm({ kind, wide, slim, compact, audience = "parent", btnClass, placement, pathname, onSubmitClick }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(audience === "student" ? "student" : "parent");
  const [year, setYear] = useState("");
  const [trap, setTrap] = useState("");
  const [state, setState] = useState("idle"); // idle | pending | done | already | error
  const [error, setError] = useState("");

  const label =
    kind === "pilot" ? "Join the free pilot" : kind === "android" ? "Notify me" : "Sign up early for 50% off";
  const intro =
    kind === "pilot"
      ? "The pilot is with Bayside Academics students right now. Leave your email and we'll let you know if more spots open, and when the app launches."
      : kind === "android"
        ? "It's coming to Android soon. We'll email you once when it's ready."
        : `Sign up before launch and get ${STUDY_APP.name} for $${STUDY_APP.earlyPriceWeek} a week for life, 50% off the $${STUDY_APP.priceWeek} public price. We'll email you when it's ready.`;

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

  if (state === "done" || state === "already") {
    return (
      <p role="status" className="tb-appcta__status">
        {state === "already"
          ? "You're already on the list. We'll be in touch."
          : "Thanks, you're on the list. Check your inbox for a confirmation."}
      </p>
    );
  }

  return (
    <form onSubmit={submit} style={{ margin: 0 }} aria-label={label}>
      {!compact && (!slim || kind === "pilot") && <p className="tb-appcta__sub" style={{ fontSize: 15, marginBottom: 12 }}>{intro}</p>}
      <div
        className={compact ? undefined : `tb-appcta__form ${slim ? "tb-appcta__form--slim" : wide ? "tb-appcta__form--wide" : ""}`}
        style={compact ? { display: "flex", gap: 8, flexWrap: "wrap" } : undefined}
      >
        <label htmlFor={`${id}-email`} style={srOnly}>Email address</label>
        <input
          id={`${id}-email`}
          type="email"
          required
          autoComplete="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="tb-input tb-input--email"
          style={compact ? { minHeight: 44, flex: "1 1 180px" } : undefined}
        />
        {!compact && !slim && (
          <>
            <label htmlFor={`${id}-role`} style={srOnly}>I am a</label>
            <select id={`${id}-role`} value={role} onChange={(e) => setRole(e.target.value)} className="tb-input">
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            <label htmlFor={`${id}-year`} style={srOnly}>Year level (optional)</label>
            <select
              id={`${id}-year`}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="tb-input"
              disabled={role === "tutor"}
            >
              <option value="">Year (optional)</option>
              {[7, 8, 9, 10].map((y) => (
                <option key={y} value={y}>Year {y}</option>
              ))}
            </select>
          </>
        )}
        {/* Honeypot: hidden from people, filled by bots. */}
        <div aria-hidden="true" style={{ position: "absolute", left: -10000, width: 1, height: 1, overflow: "hidden" }}>
          <label>
            Company website
            <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} name={HONEYPOT_FIELD} />
          </label>
        </div>
        <button type="submit" disabled={state === "pending"} className={btnClass}>
          {state === "pending" ? "Saving…" : label}
        </button>
      </div>
      {error && (
        <p role="alert" className="tb-appcta__error">{error}</p>
      )}
      {!compact && (
        <p className="tb-appcta__note">
          We only use your email for {STUDY_APP.name} updates. See our <a href="/privacy">privacy policy</a>.
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

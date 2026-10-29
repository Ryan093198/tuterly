"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { activeBanner } from "@/lib/season-banner";
import { trackEvent } from "@/lib/analytics";

// Slim seasonal bar above the nav (lib/season-banner.js). The date check
// runs in the browser, so it switches on and off without a redeploy.
// Closing it is remembered per campaign.
const KEY = "tuterly:banner_closed";
const listeners = new Set();
const read = () => {
  try { return localStorage.getItem(KEY) || ""; } catch { return ""; }
};
const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };
// Before hydration (and on the server) we don't know the date or what was
// closed, so render nothing then.
const clientReady = () => true;
const serverReady = () => false;

export default function SeasonBanner() {
  const pathname = usePathname() || "/";
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const closed = useSyncExternalStore(subscribe, read, () => "");
  if (!ready) return null;
  const b = activeBanner();
  if (!b || closed === b.id || pathname === b.href) return null;

  function close() {
    try { localStorage.setItem(KEY, b.id); } catch {}
    listeners.forEach((l) => l());
    trackEvent("season_banner_close", { banner: b.id, page: pathname });
  }

  return (
    <div className="tb-season" role="region" aria-label="News">
      <Link href={b.href} className="tb-season__link" onClick={() => trackEvent("season_banner_click", { banner: b.id, page: pathname })}>
        <span className="tb-season__long">{b.text}</span>
        <span className="tb-season__short">{b.short}</span>
        <span className="tb-season__cta">{b.cta} →</span>
      </Link>
      <button type="button" className="tb-season__close" onClick={close} aria-label="Close">
        <X size={18} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </div>
  );
}

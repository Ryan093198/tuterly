"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { appCta, STUDY_APP } from "@/lib/study-app";
import { trackEvent } from "@/lib/analytics";
import "./marketing-ux.css";

// Slim app button that sticks to the bottom of the screen on phones (Ryan,
// 18 Nov 2026). It shows once the visitor has scrolled past the first
// screen, and hides again whenever one of the page's own app sign-ups
// ([data-study-cta]) is on screen, so it never doubles up. Before launch it
// scrolls to this page's sign-up form (#get-app), or the home page's.
// Phones only: hidden from 768px wide (marketing-ux.css).
const DISMISS_KEY = "tuterly:sticky_bar_dismissed";

export default function StickyAppBar({ placement = "sticky_bar", text }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const cta = appCta();

  useEffect(() => {
    const hidden = () => {
      try { return !!window.sessionStorage.getItem(DISMISS_KEY); } catch { return false; }
    };
    const visible = new Set();
    const update = () => setShow(!hidden() && window.scrollY > window.innerHeight * 0.8 && visible.size === 0);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      update();
    });
    document.querySelectorAll("[data-study-cta]").forEach((el) => io.observe(el));
    window.addEventListener("scroll", update, { passive: true });
    const first = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(first);
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  if (dismissed) return null;

  function go(e) {
    trackEvent("study_app_cta_click", { placement, position: "sticky_bar", stage: STUDY_APP.stage, page: pathname, action: cta.live ? "checkout" : "to_form" });
    if (cta.live) return;
    const form = document.getElementById("get-app");
    if (form) {
      e.preventDefault();
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <div className={`mx-sticky${show ? " is-shown" : ""}`} aria-hidden={!show}>
      <p className="mx-sticky__text">
        <strong>{STUDY_APP.name}</strong> {text || "Maths app, Years 7 to 10"}
      </p>
      <a href={cta.href} className="tb-btn tb-btn--primary tb-btn--sm mx-sticky__btn" onClick={go} tabIndex={show ? 0 : -1}>
        {cta.label}
      </a>
      <button
        type="button"
        className="mx-sticky__close"
        aria-label="Hide this bar"
        tabIndex={show ? 0 : -1}
        onClick={() => {
          try { window.sessionStorage.setItem(DISMISS_KEY, "1"); } catch {}
          setDismissed(true);
        }}
      >
        ×
      </button>
    </div>
  );
}

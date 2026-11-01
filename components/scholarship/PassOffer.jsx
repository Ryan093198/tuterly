"use client";

import Link from "next/link";
import { STUDY_APP, STUDY_CHECKOUT } from "@/lib/study-app";
import { trackEvent } from "@/lib/analytics";

// Shown instead of the Scholarship waitlist once the app is live
// (STUDY_APP.stage "live"): the Scholarship Pass at checkout, or the app
// with its first 10 diagnostic questions free. No price here: it's shown
// on the checkout page, which reads it from Stripe.
export default function PassOffer({ source, className = "sch-wl", titleClass = "sch-wl__title", textClass = "sch-wl__text" }) {
  return (
    <div className={className}>
      <p className={titleClass}>Get the full 40-question diagnostic, and practice on every question they miss.</p>
      <p className={textClass}>
        Tuterly Scholarship starts with a Numerical Reasoning diagnostic in the {STUDY_APP.name} app on iPhone. The first 10 questions are free. A one-off Scholarship Pass per entry level (not a subscription) unlocks the rest, with worked solutions and practice on every question they get wrong.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
        <Link
          href={STUDY_CHECKOUT.scholarship}
          className="nt-btn"
          onClick={() => trackEvent("begin_checkout", { item_id: "sch_pass", source })}
        >
          Get the Scholarship Pass
        </Link>
        {STUDY_APP.appStoreUrl && (
          <a href={STUDY_APP.appStoreUrl} rel="noopener" onClick={() => trackEvent("study_app_cta_click", { action: "app_store", placement: source })}>
            Or try the first 10 questions free in the app →
          </a>
        )}
      </div>
    </div>
  );
}

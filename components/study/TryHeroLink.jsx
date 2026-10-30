"use client";

import { Icon } from "@/components/brand";
import { trackEvent } from "@/lib/analytics";

// The home hero's "Try it free" button (jumps to the demo below).
export default function TryHeroLink({ variant = "button" }) {
  if (variant === "text") {
    return (
      <a href="#try-it" className="tb-textlink sl-hero__trytext" onClick={() => trackEvent("try_cta_click", { page: "/", where: "hero" })}>
        Or try it free on one of their questions first →
      </a>
    );
  }
  return (
    <a href="#try-it" className="tb-btn tb-btn--secondary sl-hero__try" onClick={() => trackEvent("try_cta_click", { page: "/", where: "hero" })}>
      <Icon name="snap" size={20} /> Try it free on a question
    </a>
  );
}

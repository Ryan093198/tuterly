"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ContactModal } from "./ContactCTA";
import { c } from "./theme";

// Routes where the floating Enquire button should NOT appear. These are
// the signed-in app surfaces and transactional flows where a marketing
// CTA would be noise (or worse, confusing).
const FLOATING_HIDE_PREFIXES = [
  "/dashboard",
  "/auth",
  "/onboarding",
  "/invite",
  "/sample-report",
];

// Sticky bottom-right "Enquire" button mounted in the root layout so
// it's available across every marketing page automatically. Hidden on
// app/auth/onboarding routes where it would be out of place.
export function FloatingEnquireButton() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  const hidden = FLOATING_HIDE_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (hidden) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Enquire about tutoring"
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          zIndex: 9000,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 20px",
          borderRadius: 999,
          background: c.navy,
          color: c.white,
          border: "none",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 12px 32px rgba(15, 23, 42, 0.28)",
        }}
      >
        <span aria-hidden="true">💬</span>
        <span>Enquire</span>
      </button>
      {open && (
        <ContactModal
          context={`floating-cta ${pathname}`}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

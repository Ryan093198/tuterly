"use client";

import { trackEvent } from "@/lib/analytics";

export default function PrintButton({ year }) {
  return (
    <button
      type="button"
      className="tb-btn tb-btn--primary fs-print"
      onClick={() => { trackEvent("formula_print", { year }); window.print(); }}
    >
      Print or save as PDF
    </button>
  );
}

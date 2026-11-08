"use client";

export default function PrintButton({ label = "Print or save as PDF" }) {
  return <button type="button" className="tb-btn tb-btn--secondary" onClick={() => window.print()}>{label}</button>;
}

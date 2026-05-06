"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="text-xs text-zinc-500 hover:text-foreground"
    >
      Print / Save as PDF
    </button>
  );
}

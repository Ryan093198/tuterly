"use client";

import { useEffect } from "react";

// Reads ?flag=<question_number> on mount and scrolls the matching
// MarkdownReport question into view, opening the <details> block so the
// reader lands on the question and worked solution. Used on every page that
// renders MarkdownReport so flagged-question links land on the question they
// reference (rather than just the top of the report).
export default function FlagScrollTarget() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const flag = new URL(window.location.href).searchParams.get("flag");
    if (!flag) return;
    const el = document.getElementById(`question-${flag}`);
    if (!el) return;
    if (el.tagName === "DETAILS") el.open = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  return null;
}

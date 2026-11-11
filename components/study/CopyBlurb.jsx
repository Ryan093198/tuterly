"use client";

import { useState } from "react";

// A block of text with a Copy button, for schools pasting the exam kit
// blurb into a newsletter (/end-of-year-maths-exams).
export default function CopyBlurb({ text }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 2500);
    } catch {}
  }
  return (
    <div className="ek-blurb">
      <p className="ek-blurb__x">{text}</p>
      <button type="button" className="tb-btn tb-btn--primary ek-blurb__btn" onClick={copy}>
        {done ? "Copied" : "Copy the blurb"}
      </button>
    </div>
  );
}

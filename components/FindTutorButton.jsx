"use client";

import { useState } from "react";
import TutorRequestModal from "@/components/TutorRequestModal";

// Opens the "Find a local tutor" form from anywhere (suburb pages,
// /parents, footers). Renders as a button styled by the caller.
export default function FindTutorButton({
  children = "Find a tutor near you",
  source = "suburb_page",
  initialSuburb,
  initialYear,
  style,
  className,
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        style={{ cursor: "pointer", fontFamily: "inherit", ...style }}
      >
        {children}
      </button>
      {open && (
        <TutorRequestModal
          source={source}
          initialSuburb={initialSuburb}
          initialYear={initialYear}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

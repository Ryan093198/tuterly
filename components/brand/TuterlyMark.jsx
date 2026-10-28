// The Tuterly tʸ mark, the same as the app icon. Files in public/brand/
// are traced from the app's own icon: use them as they are (no redrawing,
// recolouring or outlines). Light mark by default, the dark-mode mark
// under `.dark`, and the white mark on teal or photo backgrounds.
// Decorative: the link or wordmark next to it carries the name.
export default function TuterlyMark({ height = 30, onTeal = false, className = "" }) {
  // viewBox is 528 × 568, so width = height × 0.93.
  const width = Math.round((height * 528) / 568);
  const common = { width, height, alt: "", "aria-hidden": true, draggable: false, decoding: "async" };
  if (onTeal) {
    return <img src="/brand/tuterly-mark-white.svg" {...common} className={`shrink-0 ${className}`} />;
  }
  return (
    <>
      <img src="/brand/tuterly-mark.svg" {...common} className={`shrink-0 dark:hidden ${className}`} />
      <img src="/brand/tuterly-mark-dark-mode.svg" {...common} className={`shrink-0 hidden dark:block ${className}`} />
    </>
  );
}

// Google title and snippet for the Year and topic worksheet pages (Ryan,
// 9 Nov 2026). Search Console shows these pages at positions 5 to 8 with
// few clicks, so the snippet leads with what searchers type ("Year 9
// probability worksheets with answers"), stays short enough not to be cut
// off, and says what's on the page.

// The page subtitle, minus the stock "worked solutions, free" endings
// (the snippet says that already).
function focusLine(subtitle) {
  let s = String(subtitle || "")
    .replace(/\s+-\s+/g, ", ")
    .replace(/,?\s*(and\s+)?(with\s+)?(full\s+)?(worked solutions|full working shown)[^.]*\.?$/i, ".")
    .replace(/\s*Worked solutions every time, free\.?$/i, "")
    .replace(/,?\s*free worksheets included\.?$/i, ".")
    .trim();
  if (!s) return "";
  s = s.replace(/\.+$/, "") + ".";
  return s;
}

const SMALL = new Set(["and", "or", "of", "in", "on", "by", "with", "the", "a", "to"]);
const titleCase = (t) =>
  t.split(" ").map((w, i) => (i > 0 && SMALL.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1))).join(" ");

export function worksheetMeta(page, { hasPdf }) {
  const title = `${page.yearLevel} ${titleCase(page.topic)} Worksheets with Answers (Free${hasPdf ? " PDF" : ""}) | Tuterly`;
  const focus = focusLine(page.subtitle);
  const what = hasPdf ? "Printable PDF, no sign-up, with step-by-step solutions." : "Step-by-step worked solutions to every question.";
  const topic = page.topic.toLowerCase().replace(/pythagoras/, "Pythagoras").replace(/venn/, "Venn").replace(/cartesian/, "Cartesian").replace(/\b3d\b/, "3D");
  const head = `Free ${page.yearLevel} ${topic} worksheets with answers.`;
  // Google cuts snippets at about 160 characters: keep the focus line only
  // when it fits.
  const withFocus = `${head} ${focus ? focus + " " : ""}${what}`;
  const description = withFocus.length <= 170 ? withFocus : `${head} ${what}`;
  return { title, description };
}

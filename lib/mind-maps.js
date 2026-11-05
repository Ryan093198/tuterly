import katex from "katex";
import y9c1 from "@/content/mind-maps/year-9/01-number-and-financial-maths.json";
import y9c2 from "@/content/mind-maps/year-9/02-expressions-and-linear-equations.json";
import y9c3 from "@/content/mind-maps/year-9/03-pythagoras-and-trigonometry.json";
import y9c4 from "@/content/mind-maps/year-9/04-linear-relationships.json";
import y9c5 from "@/content/mind-maps/year-9/05-measurement.json";
import y9c6 from "@/content/mind-maps/year-9/06-indices-and-surds.json";
import y9c7 from "@/content/mind-maps/year-9/07-geometry.json";
import y9c8 from "@/content/mind-maps/year-9/08-algebraic-techniques.json";
import y9c9 from "@/content/mind-maps/year-9/09-probability-and-statistics.json";
import y9c10 from "@/content/mind-maps/year-9/10-quadratic-equations-and-graphs.json";
import y10c1 from "@/content/mind-maps/year-10/01-algebra-equations-and-linear-relationships.json";
import y10c2 from "@/content/mind-maps/year-10/02-geometry-and-networks.json";
import y10c3 from "@/content/mind-maps/year-10/03-indices-exponentials-and-logarithms.json";
import y10c4 from "@/content/mind-maps/year-10/04-measurement-and-surds.json";
import y10c5 from "@/content/mind-maps/year-10/05-quadratic-expressions-and-equations.json";
import y10c6 from "@/content/mind-maps/year-10/06-trigonometry.json";
import y10c7 from "@/content/mind-maps/year-10/07-parabolas-and-rates-of-change.json";
import y10c8 from "@/content/mind-maps/year-10/08-probability-and-counting.json";
import y10c9 from "@/content/mind-maps/year-10/09-statistics.json";
import y10c10 from "@/content/mind-maps/year-10/10-polynomials-functions-and-graphs.json";

// Topic mind maps (Nov 2026). One JSON file per textbook chapter, one card
// per section (closely related sections can share a card), our own worked
// examples. Chapter titles and order match the Tuterly Study app's chapters
// (cambridge-vic.json in ~/tuterly-study), via appKey, so the app's future
// "Mind Maps" section (Practice > Study notes) can use the same maps.
// PNG and PDF copies live in public/mind-maps/ (scripts/render-mind-maps.mjs).
const MAPS = {
  9: [y9c1, y9c2, y9c3, y9c4, y9c5, y9c6, y9c7, y9c8, y9c9, y9c10],
  10: [y10c1, y10c2, y10c3, y10c4, y10c5, y10c6, y10c7, y10c8, y10c9, y10c10],
};

export const MIND_MAP_YEARS = [7, 8, 9, 10];
export const LIVE_YEARS = Object.keys(MAPS).map(Number);
export const yearSlug = (y) => `year-${y}`;
export const yearFromSlug = (s) => (/^year-(\d+)$/.exec(s || "") || [])[1] * 1 || null;

export function mindMapsForYear(year) {
  return MAPS[year] || [];
}

export function getMindMap(year, slug) {
  return mindMapsForYear(year).find((m) => m.slug === slug) || null;
}

// Pages are named for what people search ("year 9 maths revision",
// "year 9 financial maths"); "mind map" is the format, not the keyword.
export const revisionYearPath = (y) => `/year-${y}-maths-revision`;
export const mindMapPath = (m) => `${revisionYearPath(m.year)}/${m.slug}`;
// The bare sheet the renderer prints (noindex).
export const mindMapSheetPath = (m) => `/mind-maps/${yearSlug(m.year)}/${m.slug}/sheet`;
// The PNG and PDF are served by /api/mind-maps/file only after an email
// unlock (files in mind-maps-files/). The small preview is public.
export const mindMapFiles = (m) => ({
  png: `/api/mind-maps/file/${yearSlug(m.year)}/${m.slug}.png`,
  pdf: `/api/mind-maps/file/${yearSlug(m.year)}/${m.slug}.pdf`,
  preview: `/mind-maps/${yearSlug(m.year)}/${m.slug}-preview.jpg`,
});
// Every chapter of a year in one PDF ("year 9 maths revision booklet pdf").
export const revisionBooklet = (y) => `/api/mind-maps/file/${yearSlug(y)}/year-${y}-maths-revision-booklet.pdf`;

// Card colours, in order around the map.
export const PALETTE = ["#0e9fbf", "#7f77dd", "#e8a317", "#1e8e4e", "#e2556b", "#0a7088"];

// Text with inline maths: \( ... \) is KaTeX, **...** is bold, the rest is
// plain text (escaped). Returns HTML.
const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
export function rich(text) {
  if (!text) return "";
  const out = [];
  const re = /\\\((.+?)\\\)/g;
  let last = 0, m;
  const plain = (s) => out.push(esc(s).replace(/&amp;nbsp;/g, "&nbsp;").replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"));
  while ((m = re.exec(text))) {
    plain(text.slice(last, m.index));
    out.push(katex.renderToString(m[1], { throwOnError: false }));
    last = re.lastIndex;
  }
  plain(text.slice(last));
  return out.join("");
}

// Where each card sits on the A4 sheet: a 4-column, 12-row grid with the
// title strip in the middle. Side columns hold L cards each; the centre
// holds T cards above the title and B below (a single centre card spans
// both middle columns).
export function layoutFor(n) {
  const plans = { 12: [4, 2, 2], 11: [4, 2, 1], 10: [3, 2, 2], 9: [3, 2, 1], 8: [3, 1, 1] };
  const [L, T, B] = plans[n] || plans[12];
  const side = 12 / L;
  const spots = [];
  for (let i = 0; i < L; i++) spots.push({ col: "1", row: `${i * side + 1} / ${(i + 1) * side + 1}` });
  const top = (k, of) => ({ col: of === 1 ? "2 / 4" : String(2 + k), row: "1 / 6" });
  const bottom = (k, of) => ({ col: of === 1 ? "2 / 4" : String(2 + k), row: "8 / 13" });
  for (let k = 0; k < T; k++) spots.push(top(k, T));
  for (let i = 0; i < L; i++) spots.push({ col: "4", row: `${i * side + 1} / ${(i + 1) * side + 1}` });
  for (let k = 0; k < B; k++) spots.push(bottom(k, B));
  // Reading order: left column top to bottom, centre top, right column top
  // to bottom, then centre bottom.
  return spots.slice(0, n);
}

// Free worksheet topic pages to practise each chapter (lib/worksheet-landing-pages.js).

// Free worksheet topic pages to practise each chapter, keyed by the app's
// chapter key (lib/worksheet-landing-pages.js slugs).
export const PRACTISE = {
  "y9-ch1": [["year-9-simple-interest", "Simple interest"], ["year-9-direct-proportion", "Rates, ratio and proportion"]],
  "y9-ch2": [["year-9-linear-equations", "Linear equations"], ["year-9-algebra", "Algebra"]],
  "y9-ch3": [["year-9-pythagoras", "Pythagoras"], ["year-9-trigonometry", "Trigonometry"]],
  "y9-ch4": [["year-9-coordinate-geometry", "Gradient, midpoint and distance"], ["year-9-linear-equations", "Linear graphs and equations"]],
  "y9-ch5": [["year-9-surface-area-volume", "Surface area and volume"], ["year-9-measurement-error", "Measurement error"]],
  "y9-ch6": [["year-9-exponent-laws", "Index laws"], ["year-9-scientific-notation", "Scientific notation"]],
  "y9-ch7": [["year-9-enlargements", "Enlargements and similarity"]],
  "y9-ch8": [["year-9-algebra", "Expanding and factorising"]],
  "y9-ch9": [["year-9-probability", "Probability"], ["year-9-venn-diagrams-probability", "Venn diagrams"], ["year-9-statistics", "Statistics"]],
  "y9-ch10": [["year-9-quadratics", "Quadratics"]],
  // Year 10 (the app's chapter 1 key really is "Y10-ch1").
  "Y10-ch1": [["year-10-linear-equations", "Linear equations"], ["year-10-linear-inequalities", "Linear inequalities"], ["year-10-simultaneous-equations", "Simultaneous equations"], ["year-10-coordinate-geometry", "Coordinate geometry"]],
  "y10-ch2": [["year-10-geometric-reasoning", "Geometric reasoning"], ["year-10a-circle-theorems", "Circle theorems (10A)"], ["year-10-networks", "Networks"]],
  "y10-ch3": [["year-10-index-laws", "Index laws"], ["year-10-exponential-equations", "Exponential equations"], ["year-10-compound-interest", "Compound interest"], ["year-10a-logarithms", "Logarithms (10A)"]],
  "y10-ch4": [["year-10a-surds", "Surds (10A)"], ["year-10-surface-area-volume", "Surface area and volume"], ["year-10a-pyramids-cones-spheres", "Pyramids, cones and spheres (10A)"]],
  "y10-ch5": [["year-10-quadratic-factorising", "Factorising quadratics"], ["year-10-quadratic-equations", "Quadratic equations"], ["year-10a-non-monic-quadratics", "Non-monic quadratics (10A)"]],
  "y10-ch6": [["year-10-trigonometry", "Trigonometry"], ["year-10a-sine-cosine-rule", "Sine and cosine rules (10A)"], ["year-10a-trigonometric-equations", "Trig equations (10A)"]],
  "y10-ch7": [["year-10-parabolas-circles-exponentials", "Parabolas, circles and exponentials"], ["year-10-inverse-proportion", "Inverse proportion"]],
  "y10-ch8": [["year-10-probability", "Probability"], ["year-10-tree-diagrams", "Tree diagrams"], ["year-10a-permutations-combinations", "Permutations and combinations (10A)"]],
  "y10-ch9": [["year-10-statistics", "Statistics"], ["year-10-scatterplots", "Scatter plots"], ["year-10-two-way-tables", "Two-way tables"], ["year-10a-standard-deviation", "Standard deviation (10A)"]],
  "y10-ch10": [["year-10a-polynomials", "Polynomials (10A)"], ["year-10a-function-notation", "Function notation (10A)"]],
};

// The chapter map that covers a worksheet topic page (for links back).
export function mindMapForWorksheet(slug) {
  for (const y of LIVE_YEARS) {
    for (const m of mindMapsForYear(y)) {
      if ((PRACTISE[m.appKey] || []).some(([s]) => s === slug)) return m;
    }
  }
  return null;
}

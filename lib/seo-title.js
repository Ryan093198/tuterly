// Page titles that fit in Google's results (Ryan, 11 Nov 2026). Google shows
// roughly the first 60 characters; past that the end is cut off, which used
// to cut the keywords on 260 pages. Give titles longest-first: fitTitle
// returns the first that fits, or the shortest if none do. A trailing
// " | Tuterly" is dropped when the title is already long, since the
// address shows the brand anyway.

export const TITLE_MAX = 62;
const SUFFIX = " | Tuterly";

export function fitTitle(...candidates) {
  const list = candidates.flat().filter(Boolean);
  const expanded = [];
  for (const t of list) {
    expanded.push(t);
    if (t.endsWith(SUFFIX)) expanded.push(t.slice(0, -SUFFIX.length));
  }
  return expanded.find((t) => t.length <= TITLE_MAX) || expanded.reduce((a, b) => (b.length < a.length ? b : a));
}

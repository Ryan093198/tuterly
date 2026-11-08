import { getSectionMap, sectionQuestions } from "@/lib/exam-sections";

// "Choose your year" on skill worksheet pages and topic hubs (Ryan, 8 Nov
// 2026: skill pages target the search, then the visitor picks a year level
// to get something useful). Each skill maps to the textbook sections that
// teach it, per year (section codes from content/exam-sections, which follow
// Cambridge Essential Mathematics for the Victorian Curriculum).
//
// Year 10A = the Year 10 sections plus the 10A extension sections (the 10A
// file holds both, with the same codes).

export const PICKER_YEARS = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 10A"];

const S = (y7, y8, y9, y10, y10a) => ({ "Year 7": y7, "Year 8": y8, "Year 9": y9, "Year 10": y10, "Year 10A": y10a });
const range = (ch, from, to) => {
  const out = [];
  for (let c = from.charCodeAt(0); c <= to.charCodeAt(0); c++) out.push(`${ch}${String.fromCharCode(c)}`);
  return out;
};

// slug -> { name (for headings), sections per year }
export const SKILL_SECTIONS = {
  // Existing skill pages (lib/skill-pages-a.js, -b.js)
  fractions: { name: "Fractions", s: S(range(3, "A", "H"), ["3A", "3B", "3C"], ["1D"]) },
  "area-of-composite-shapes": { name: "Area of composite shapes", s: S(["10H"], ["4F"], ["5E"]) },
  "area-of-a-triangle": { name: "Area of a triangle", s: S(["10G"], ["4C"], ["5D"], [], ["6H"]) },
  "adding-fractions": { name: "Adding and subtracting fractions", s: S(["3E", "3F"], ["3B", "3C"], ["1D"]) },
  "dividing-fractions": { name: "Dividing fractions", s: S(["3H"], ["3B"], ["1D"]) },
  "expanding-brackets": { name: "Expanding brackets", s: S(["4F"], ["5G"], ["2C", "8A", "8B"], ["5A"]) },
  "two-step-equations": { name: "Two-step equations", s: S(["9C", "9D"], ["7A", "7B"], ["2D"], ["1B"]) },
  "angles-on-parallel-lines": { name: "Angles on parallel lines", s: S(["7C", "7D"], ["2B"], ["7B"]) },
  "mean-median-mode": { name: "Mean, median and mode", s: S(["8B"], ["8D"], ["9H"], ["9D"]) },
  "completing-the-square": { name: "Completing the square", s: S([], [], [], ["5F", "5I"]) },
  substitution: { name: "Substitution", s: S(["4B", "6F"], ["1H", "5B"], ["2H"]) },
  "collecting-like-terms": { name: "Collecting like terms", s: S(["4D"], ["5C"], ["2B"], ["1A"]) },
  "24-hour-time": { name: "Time and time zones", s: S([], ["4J"]) },
  "box-plots": { name: "Box plots", s: S([], [], ["9K", "9L"], ["9E"]) },
  // Topic hubs (lib/topic-hubs.js)
  algebra: { name: "Algebra", s: S(range(4, "A", "G"), range(5, "A", "I"), ["2A", "2B", "2C", "8A", "8B", "8C", "8F"], ["1A", "5A", "5B", "5D"], ["5E", "10C"]) },
  "area-and-perimeter": { name: "Area and perimeter", s: S(range(10, "B", "H"), range(4, "A", "F"), range(5, "B", "E"), ["4E", "4G"]) },
  "index-laws": { name: "Index laws", s: S(["2E"], ["5J", "5K"], range(6, "A", "E"), ["3A", "3B"], ["3D"]) },
  trigonometry: { name: "Trigonometry", s: S([], [], range(3, "E", "J"), range(6, "A", "D"), range(6, "E", "K")) },
  probability: { name: "Probability", s: S(["8G", "8H", "8I"], range(8, "G", "K"), range(9, "A", "F"), range(8, "A", "G"), range(8, "H", "K")) },
  // New skill pages (lib/skill-pages-c.js, -d.js), 8 Nov 2026
  "equivalent-fractions": { name: "Equivalent fractions", s: S(["3B", "3D"], ["3A"]) },
  "multiplying-fractions": { name: "Multiplying fractions", s: S(["3G"], ["3B"], ["1D"]) },
  "fractions-decimals-percentages": { name: "Fractions, decimals and percentages", s: S(["3I", "5G", "5H", "5I"], ["3F", "3G"]) },
  percentages: { name: "Percentages", s: S(["3I", "3J", "5H"], range(3, "H", "K"), ["1F", "1G", "1H"]) },
  ratios: { name: "Ratios", s: S(["3K", "3L"], ["6A", "6B", "6G"], ["1E"]) },
  "linear-equations": { name: "Linear equations", s: S(range(9, "A", "F"), range(7, "A", "E"), ["2D", "2E", "2F"], ["1B"], ["1D"]) },
  "simultaneous-equations": { name: "Simultaneous equations", s: S([], [], ["2I", "2J", "2K", "4K"], ["1I", "1J", "1K"]) },
  pythagoras: { name: "Pythagoras' theorem", s: S([], ["4K", "4L", "4M"], range(3, "A", "D"), ["4F"]) },
  factorising: { name: "Factorising", s: S([], ["5H"], range(8, "C", "G"), ["5B", "5D"], ["5E"]) },
};

const fileSlug = (fileYear) => fileYear.toLowerCase().replace(/\s+/g, "-");
const yearSlug = (y) => y.toLowerCase().replace(/\s+/g, "-");

export const skillPdfPath = (slug, year) => `/worksheets/pdf/${slug}-${yearSlug(year)}.pdf`;

// Every skill and year that has sections (for static params and the sitemap).
export function skillYearPairs() {
  const out = [];
  for (const slug of Object.keys(SKILL_SECTIONS)) for (const y of skillYears(slug)) out.push({ slug, year: y.year });
  return out;
}

// The sections (with names) for a skill in one year, or [].
function sectionsFor(slug, year) {
  const def = SKILL_SECTIONS[slug];
  if (!def) return [];
  let codes = def.s[year] || [];
  if (year === "Year 10A") codes = [...(def.s["Year 10"] || []), ...codes];
  if (!codes.length) return [];
  const map = getSectionMap(year);
  if (!map) return [];
  const byCode = Object.fromEntries(map.sections.map((s) => [s.code, s]));
  return codes
    .map((code) => byCode[code])
    .filter(Boolean)
    .map((s) => ({ code: s.code, name: s.name, slug: `${fileSlug(year)}-${s.code.toLowerCase()}`, extension: year === "Year 10A" && !s.from_year_10 }));
}

// Spread picks across sections: one from each in turn.
function spread(lists, n, prefer) {
  const pools = lists.map((qs) => [...qs.filter(prefer), ...qs.filter((q) => !prefer(q))]);
  const out = [];
  for (let round = 0; out.length < n && pools.some((p) => p.length > round); round++) {
    for (const p of pools) {
      if (out.length >= n) break;
      if (p[round]) out.push(p[round]);
    }
  }
  return out;
}

// For the picker: each year with sections, sample questions and links.
export function skillYears(slug) {
  if (!SKILL_SECTIONS[slug]) return [];
  const years = [];
  for (const year of PICKER_YEARS) {
    const sections = sectionsFor(slug, year);
    if (!sections.length) continue;
    // 10A is only worth its own tab when it adds extension sections.
    if (year === "Year 10A" && !sections.some((s) => s.extension)) continue;
    const lists = sections.map((s) => sectionQuestions(year, s.slug).map((q) => ({ ...q, section: s.name })));
    if (!lists.some((l) => l.length)) continue;
    const samples = spread(lists, 4, (q) => q.kind === "short" && !!q.solution).map(({ question, answer, solution, section }) => ({ question, answer, solution, section }));
    const topics = sections.map((s) => s.slug).join(",");
    const q = `year=${encodeURIComponent(year)}&topics=${topics}`;
    years.push({
      year,
      sections,
      samples,
      pdf: skillPdfPath(slug, year),
      zoneHref: `/teachers?${q}#teacher-zone`,
      examHref: `/teachers/printable-exam?${q}#build`,
      autoCount: lists.flat().filter((x) => x.key).length,
    });
  }
  return years;
}

// The 10-question printable worksheet for a skill and year: questions, then
// answers with worked solutions where we have them.
export function skillWorksheet(slug, yearSlugOrYear) {
  const year = PICKER_YEARS.find((y) => y === yearSlugOrYear || yearSlug(y) === yearSlugOrYear);
  if (!year) return null;
  const sections = sectionsFor(slug, year);
  const lists = sections.map((s) => sectionQuestions(year, s.slug));
  const qs = spread(lists, 10, (q) => !!q.solution);
  if (!qs.length) return null;
  const qmd = [], amd = [];
  qs.forEach((q, i) => {
    qmd.push(`**Question ${i + 1}**`, q.question, "Answer: ____________");
    amd.push(`**Question ${i + 1}**`, q.solution ? q.solution : `**Answer:** ${q.answer}`);
  });
  return { year, name: SKILL_SECTIONS[slug].name, questions: qmd.join("\n\n"), answers: amd.join("\n\n"), count: qs.length };
}

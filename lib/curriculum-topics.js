import { getCurriculumForStudent } from "@/lib/curriculum";

// Flatten a level's curriculum into a UI-friendly { strand, topics[] } list
// for the practice-question topic picker. VCAA F-10 entries are keyed by
// `code` and use `desc` as the human label; VCE entries already carry a
// `topic` short-name.
//
// `id` is the value sent back to the API. The API doesn't actually need to
// resolve the id back to the curriculum entry - we also send `label` and
// `level` - but a stable id makes a future "regenerate same topic" cheap.

/**
 * @param {string} level - year level or VCE study key (matches lib/curriculum.js)
 * @param {'maths' | 'english'} subject
 * @param {string[] | null} subjects - student.subjects, used to pick up VCE
 *   study designs even when `level` is a generic year (e.g. "Year 11").
 */
export function getTopicGroupsForLevel(level, subject = "maths", subjects = null) {
  const lookup = getCurriculumForStudent(level, subjects ?? [level], subject);
  if (!lookup) return [];
  const isVCE = lookup.isVCE;

  return Object.entries(lookup.curriculum).map(([strand, items]) => ({
    strand,
    topics: items.map((item) => {
      const fullDesc = item.desc;
      return {
        id: isVCE ? `${strand}::${item.topic}` : item.code,
        label: isVCE
          ? item.topic
          : SHORT_LABEL_OVERRIDES[item.code] || shortLabel(fullDesc),
        desc: fullDesc,
        strand,
      };
    }),
  }));
}

// Hand-curated short labels (one to four words) for every Year 3-10 VCAA
// F-10 maths code that shows up in the worksheet picker. Done by hand because the original
// descriptors are long compound sentences ("Multiply and divide fractions
// and decimals using efficient mental and written strategies, and digital
// tools") that auto-truncation can only butcher. Anything not in this
// map falls back to shortLabel() below.
const SHORT_LABEL_OVERRIDES = {
  VC2M3N01: "Odd and even numbers",
  VC2M3N02: "Numbers beyond 10,000",
  VC2M3N03: "Unit fractions",
  VC2M3N04: "Adding and subtracting",
  VC2M3N05: "Multiplying and dividing",
  VC2M3N06: "Estimating",
  VC2M3N07: "Money",
  VC2M3N08: "Word problems",
  VC2M3N09: "Number patterns",
  VC2M3A01: "Add and subtract facts",
  VC2M3A02: "Mental maths",
  VC2M3A03: "Times tables 3, 4, 5, 10",
  VC2M3M01: "Metric units",
  VC2M3M02: "Measuring",
  VC2M3M03: "Units of time",
  VC2M3M04: "Telling the time",
  VC2M3M05: "Angles",
  VC2M3SP01: "Shapes and objects",
  VC2M3SP02: "Maps",
  VC2M3ST01: "Collecting data",
  VC2M3ST02: "Graphs",
  VC2M3ST03: "Data investigations",
  VC2M3P01: "Chance",
  VC2M3P02: "Chance experiments",
  VC2M4N01: "Decimals",
  VC2M4N02: "Number sequences",
  VC2M4N03: "Equivalent fractions",
  VC2M4N04: "Fractions on a number line",
  VC2M4N05: "Multiplying by 10s",
  VC2M4N06: "Four operations",
  VC2M4N07: "Estimating and rounding",
  VC2M4N08: "Money and change",
  VC2M4N09: "Word problems",
  VC2M4N10: "Number patterns",
  VC2M4A01: "Missing numbers",
  VC2M4A02: "Times tables",
  VC2M4M01: "Measuring",
  VC2M4M02: "Perimeter and area",
  VC2M4M03: "Time",
  VC2M4M04: "Angles",
  VC2M4SP01: "2D and 3D shapes",
  VC2M4SP02: "Composite shapes",
  VC2M4SP03: "Grid maps",
  VC2M4SP04: "Symmetry",
  VC2M4ST01: "Graphs",
  VC2M4ST02: "Comparing graphs",
  VC2M4ST03: "Data investigations",
  VC2M4P01: "Chance",
  VC2M4P02: "Chance experiments",
  VC2M5N01: "Decimals",
  VC2M5N02: "Factors and multiples",
  VC2M5N03: "Comparing fractions",
  VC2M5N04: "Percentages",
  VC2M5N05: "Adding fractions",
  VC2M5N06: "Multiplication",
  VC2M5N07: "Division",
  VC2M5N08: "Estimating",
  VC2M5N09: "Word problems",
  VC2M5N10: "Number algorithms",
  VC2M5A01: "Multiply and divide facts",
  VC2M5A02: "Missing numbers",
  VC2M5M01: "Metric units",
  VC2M5M02: "Perimeter and area",
  VC2M5M03: "12- and 24-hour time",
  VC2M5M04: "Measuring angles",
  VC2M5SP01: "Nets",
  VC2M5SP02: "Coordinates",
  VC2M5SP03: "Transformations",
  VC2M5ST01: "Data",
  VC2M5ST02: "Line graphs",
  VC2M5ST03: "Data investigations",
  VC2M5P01: "Outcomes",
  VC2M5P02: "Chance experiments",
  VC2M6N01: "Integers",
  VC2M6N02: "Prime and square numbers",
  VC2M6N03: "Comparing fractions",
  VC2M6N04: "Adding decimals",
  VC2M6N05: "Adding fractions",
  VC2M6N06: "Multiplying decimals",
  VC2M6N07: "Percentages and discounts",
  VC2M6N08: "Estimating",
  VC2M6N09: "Word problems",
  VC2M6A01: "Patterns",
  VC2M6A02: "Order of operations",
  VC2M6A03: "Number algorithms",
  VC2M6M01: "Metric conversions",
  VC2M6M02: "Area of rectangles",
  VC2M6M03: "Timetables",
  VC2M6M04: "Angle rules",
  VC2M6SP01: "Prisms",
  VC2M6SP02: "Cartesian plane",
  VC2M6SP03: "Tessellations",
  VC2M6ST01: "Comparing data",
  VC2M6ST02: "Data in the media",
  VC2M6ST03: "Data investigations",
  VC2M6P01: "Probability",
  VC2M6P02: "Chance experiments",
  VC2M7N01: "Squares and square roots",
  VC2M7N02: "Powers and primes",
  VC2M7N03: "Negative numbers",
  VC2M7N04: "Rounding decimals",
  VC2M7N05: "Multiplying fractions",
  VC2M7N06: "Fraction operations",
  VC2M7N07: "Percentages",
  VC2M7N08: "Integers",
  VC2M7N09: "Ratios",
  VC2M7N10: "Percentage problems",
  VC2M7A01: "Formulas",
  VC2M7A02: "Expressions",
  VC2M7A03: "Linear equations",
  VC2M7A04: "Reading graphs",
  VC2M7A05: "Tables and graphs",
  VC2M7A06: "Rearranging formulas",
  VC2M7M01: "Area",
  VC2M7M02: "Volume of prisms",
  VC2M7M03: "Circles and pi",
  VC2M7M04: "Parallel lines",
  VC2M7M05: "Angles in triangles",
  VC2M7M06: "Ratio problems",
  VC2M7SP01: "3D drawings",
  VC2M7SP02: "Polygons",
  VC2M7SP03: "Transformations",
  VC2M7SP04: "Sorting shapes",
  VC2M7ST01: "Mean, median, mode",
  VC2M7ST02: "Dot and stem plots",
  VC2M7ST03: "Data investigations",
  VC2M7P01: "Probability",
  VC2M7P02: "Simulations",
  VC2M8N01: "Irrational numbers",
  VC2M8N02: "Index laws",
  VC2M8N03: "Fractions to decimals",
  VC2M8N04: "Integer operations",
  VC2M8N05: "Percentage change",
  VC2M8N06: "Profit and loss",
  VC2M8A01: "Expanding and factorising",
  VC2M8A02: "Linear graphs",
  VC2M8A03: "Linear problems",
  VC2M8A04: "Algorithms",
  VC2M8A05: "Linear patterns",
  VC2M8M01: "Area and perimeter",
  VC2M8M02: "Volume",
  VC2M8M03: "Circles",
  VC2M8M04: "Time zones",
  VC2M8M05: "Rates",
  VC2M8M06: "Pythagoras",
  VC2M8M07: "Speed, distance, time",
  VC2M8SP01: "Congruence",
  VC2M8SP02: "Quadrilaterals",
  VC2M8SP03: "3D coordinates",
  VC2M8SP04: "Shape algorithms",
  VC2M8ST01: "Populations and samples",
  VC2M8ST02: "Sampling",
  VC2M8ST03: "Comparing samples",
  VC2M8ST04: "Data investigations",
  VC2M8P01: "Complementary events",
  VC2M8P02: "Tree and Venn diagrams",
  VC2M8P03: "Simulations",
  VC2M9N01: "Real numbers",
  VC2M9A01: "Index laws",
  VC2M9A02: "Expanding and factorising",
  VC2M9A03: "Linear graphs",
  VC2M9A04: "Gradient and midpoint",
  VC2M9A05: "Quadratics",
  VC2M9A06: "Simple interest",
  VC2M9A07: "Transforming graphs",
  VC2M9M01: "Surface area and volume",
  VC2M9M02: "Scientific notation",
  VC2M9M03: "Pythagoras and trig",
  VC2M9M04: "Measurement error",
  VC2M9M05: "Proportion",
  VC2M9SP01: "Trigonometry",
  VC2M9SP02: "Enlargements",
  VC2M9SP03: "Geometric algorithms",
  VC2M9ST01: "Surveys",
  VC2M9ST02: "Sampling",
  VC2M9ST03: "Comparing data",
  VC2M9ST04: "Data displays",
  VC2M9ST05: "Data investigations",
  VC2M9P01: "Two-step probability",
  VC2M9P02: "And / or probability",
  VC2M9P03: "Simulations",
  VC2M10N01: "Approximations",
  VC2M10A01: "Common factors",
  VC2M10A02: "Index laws",
  VC2M10A03: "Algebraic fractions",
  VC2M10A04: "Factorising quadratics",
  VC2M10A05: "Rearranging formulas",
  VC2M10A06: "Algorithms",
  VC2M10A07: "Linear equations",
  VC2M10A08: "Linear inequalities",
  VC2M10A09: "Simultaneous equations",
  VC2M10A10: "Parallel lines",
  VC2M10A11: "Graphs",
  VC2M10A12: "Equations with fractions",
  VC2M10A13: "Quadratic equations",
  VC2M10A14: "Exponential equations",
  VC2M10A15: "Growth and decay",
  VC2M10A16: "Solving with graphs",
  VC2M10M01: "Surface area and volume",
  VC2M10M02: "Log scales",
  VC2M10M03: "Trigonometry",
  VC2M10M04: "Proportion",
  VC2M10SP01: "Geometric proofs",
  VC2M10SP02: "Networks",
  VC2M10ST01: "Box plots",
  VC2M10ST02: "Scatterplots",
  VC2M10ST03: "Two-way tables",
  VC2M10ST04: "Statistics in the media",
  VC2M10ST05: "Bivariate data",
  VC2M10P01: "Conditional probability",
  VC2M10P02: "Multi-step probability",
};

// VCAA F-10 descriptors are long, comma-jointed sentences. Year 7-10
// codes use the SHORT_LABEL_OVERRIDES map above; this fallback covers
// Year 3-6 (and anything else missing from the map).
//
// We cut at the first connector that introduces an implementation
// detail clause past a small offset, then hard-cap at 5 words so the
// dropdown stays tidy regardless of how the descriptor was written.
function shortLabel(desc) {
  if (!desc) return "";
  let short = desc;

  // Strong cuts past 15 chars - "and", "or", "to" usually start a
  // second clause that students don't need in the dropdown label.
  const strongRe = /\s+(?:and|or|to)\b/gi;
  // Qualifier cuts past 25 chars - "using", "including", etc. always
  // introduce implementation detail, never the topic name itself.
  const qualifierRe = /\s+(?:using|including|with|by|such as|or using|involving|that use|where|to solve for|and including|that comply|in applied contexts|in financial contexts|from|of increasing complexity)\b/gi;

  let cutAt = desc.length;
  let m;
  while ((m = qualifierRe.exec(desc)) !== null) {
    if (m.index >= 25 && m.index < cutAt) {
      cutAt = m.index;
      break;
    }
  }
  while ((m = strongRe.exec(desc)) !== null) {
    if (m.index >= 15 && m.index < cutAt) {
      cutAt = m.index;
      break;
    }
  }
  if (cutAt < desc.length) short = desc.slice(0, cutAt);

  short = short.replace(/[,;:]\s*$/, "").trim();

  // 5-word backstop. Drop trailing function words so we don't end on
  // "and" / "to" / "of" after the slice.
  const words = short.split(/\s+/);
  if (words.length > 5) {
    short = words.slice(0, 5).join(" ");
    short = short.replace(/[,;:]?\s+(?:and|or|but|to|of|the|a|an|in|on|for|with|by)$/i, "");
    short += "...";
  }
  return short.trim();
}

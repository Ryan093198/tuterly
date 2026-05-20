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

// Hand-curated 3-5 word labels for every Year 7-10 VCAA F-10 code that
// shows up in the worksheet picker. Done by hand because the original
// descriptors are long compound sentences ("Multiply and divide fractions
// and decimals using efficient mental and written strategies, and digital
// tools") that auto-truncation can only butcher. Anything not in this
// map falls back to shortLabel() below.
const SHORT_LABEL_OVERRIDES = {
  // Year 7
  VC2M7N01: "Square numbers and roots",
  VC2M7N02: "Powers of 10 and primes",
  VC2M7N03: "Rational numbers on a number line",
  VC2M7N04: "Rounding decimals",
  VC2M7N05: "Multiply and divide fractions",
  VC2M7N06: "Four operations with fractions",
  VC2M7N07: "Percentages of quantities",
  VC2M7N08: "Adding and subtracting integers",
  VC2M7N09: "Ratios",
  VC2M7N10: "Modelling with percentages",
  VC2M7A01: "Variables and formulas",
  VC2M7A02: "Distributive law and expressions",
  VC2M7A03: "Solve linear equations",
  VC2M7A04: "Graphs from data",
  VC2M7A05: "Patterns and the Cartesian plane",
  VC2M7A06: "Formulas with several variables",
  VC2M7M01: "Area of rectangles and triangles",
  VC2M7M02: "Volume of prisms",
  VC2M7M03: "Pi and circumference",
  VC2M7M04: "Parallel lines and angles",
  VC2M7M05: "Triangle angle sum",
  VC2M7M06: "Modelling with ratios",
  VC2M7SP01: "3D shapes in 2D",
  VC2M7SP02: "Classifying polygons",
  VC2M7SP03: "Transformations on the plane",
  VC2M7SP04: "Sorting shapes by attributes",
  VC2M7ST01: "Mean, median, mode, range",
  VC2M7ST02: "Dot and stem plots",
  VC2M7ST03: "Statistical investigations",
  VC2M7P01: "Sample space and probability",
  VC2M7P02: "Probability simulations",

  // Year 8
  VC2M8N01: "Irrational numbers and pi",
  VC2M8N02: "Exponent laws",
  VC2M8N03: "Fractions to decimals",
  VC2M8N04: "Operations with rationals",
  VC2M8N05: "Percentage change and error",
  VC2M8N06: "Modelling profit and loss",
  VC2M8A01: "Linear expressions",
  VC2M8A02: "Linear graphs and inequalities",
  VC2M8A03: "Modelling linear relations",
  VC2M8A04: "Algorithms and testing",
  VC2M8A05: "Linear function patterns",
  VC2M8M01: "Composite area and perimeter",
  VC2M8M02: "Volume and capacity",
  VC2M8M03: "Circumference and area of circles",
  VC2M8M04: "Time zones and duration",
  VC2M8M05: "Rates",
  VC2M8M06: "Pythagoras' theorem",
  VC2M8M07: "Modelling rates and ratios",
  VC2M8SP01: "Congruence and similarity",
  VC2M8SP02: "Quadrilateral properties",
  VC2M8SP03: "3D Cartesian coordinates",
  VC2M8SP04: "Shape-matching algorithms",
  VC2M8ST01: "Population vs sample",
  VC2M8ST02: "Sampling techniques",
  VC2M8ST03: "Comparing sample distributions",
  VC2M8ST04: "Statistical investigations",
  VC2M8P01: "Complementary events",
  VC2M8P02: "Trees, Venn diagrams, tables",
  VC2M8P03: "Compound event simulations",

  // Year 9
  VC2M9N01: "Rational and irrational numbers",
  VC2M9A01: "Exponent laws with variables",
  VC2M9A02: "Binomial expansion and factorising",
  VC2M9A03: "Linear graphs and equations",
  VC2M9A04: "Gradient, midpoint, distance",
  VC2M9A05: "Quadratic functions",
  VC2M9A06: "Simple interest modelling",
  VC2M9A07: "Function parameter effects",
  VC2M9M01: "Surface area and volume",
  VC2M9M02: "Scientific notation",
  VC2M9M03: "Trigonometry and Pythagoras",
  VC2M9M04: "Measurement errors",
  VC2M9M05: "Modelling proportion",
  VC2M9SP01: "Sine, cosine, tangent ratios",
  VC2M9SP02: "Enlargement transformations",
  VC2M9SP03: "Geometric algorithms",
  VC2M9ST01: "Survey reports and data",
  VC2M9ST02: "Sampling methods",
  VC2M9ST03: "Comparing distributions",
  VC2M9ST04: "Choosing data displays",
  VC2M9ST05: "Statistical investigations",
  VC2M9P01: "Two-step experiments",
  VC2M9P02: "And / or probabilities",
  VC2M9P03: "Probability simulations",

  // Year 10
  VC2M10N01: "Approximations in calculations",
  VC2M10A01: "Factorising common factors",
  VC2M10A02: "Exponent law simplification",
  VC2M10A03: "Algebraic fractions",
  VC2M10A04: "Expand and factorise quadratics",
  VC2M10A05: "Substitute and rearrange formulas",
  VC2M10A06: "Algorithms and data structures",
  VC2M10A07: "Linear equation problems",
  VC2M10A08: "Linear inequalities",
  VC2M10A09: "Simultaneous linear equations",
  VC2M10A10: "Parallel and perpendicular gradients",
  VC2M10A11: "Quadratic and exponential graphs",
  VC2M10A12: "Equations with algebraic fractions",
  VC2M10A13: "Quadratic equations",
  VC2M10A14: "Exponential equations",
  VC2M10A15: "Compound interest and growth",
  VC2M10A16: "Graphical equation solving",
  VC2M10M01: "Composite surface area and volume",
  VC2M10M02: "Logarithmic scales",
  VC2M10M03: "Pythagoras and trigonometry",
  VC2M10M04: "Modelling proportion and scale",
  VC2M10SP01: "Geometric proofs",
  VC2M10SP02: "Networks and connectedness",
  VC2M10ST01: "Quartiles, IQR, boxplots",
  VC2M10ST02: "Scatterplots and line of fit",
  VC2M10ST03: "Two-way tables",
  VC2M10ST04: "Statistical claim analysis",
  VC2M10ST05: "Bivariate investigations",
  VC2M10P01: "Conditional probability",
  VC2M10P02: "Independence and multi-step events",

  // Year 10A (extension)
  VC2M10AN01: "Surds and fractional indices",
  VC2M10AN02: "Surd operations",
  VC2M10AN03: "Logarithm laws",
  VC2M10AA01: "Polynomial theorems",
  VC2M10AA02: "Algorithms and simulations",
  VC2M10AA03: "Rational coefficient expressions",
  VC2M10AA04: "Exponential and log functions",
  VC2M10AA05: "Curves and transformations",
  VC2M10AA06: "Polynomial sketching",
  VC2M10AA07: "Non-monic quadratics",
  VC2M10AA08: "Function notation",
  VC2M10AA09: "Non-linear simultaneous equations",
  VC2M10AA10: "Function experiments",
  VC2M10AM01: "Pyramids, cones, spheres",
  VC2M10AM02: "Limits and rates of change",
  VC2M10ASP01: "Circle geometry",
  VC2M10ASP02: "Sine, cosine, area rules",
  VC2M10ASP03: "Unit circle and trig graphs",
  VC2M10ASP04: "Trigonometric equations",
  VC2M10ASP05: "3D Pythagoras and trig",
  VC2M10ASP06: "Spatial algorithms",
  VC2M10AST01: "Mean and standard deviation",
  VC2M10AST02: "Measures of spread",
  VC2M10AST03: "Bivariate data analysis",
  VC2M10AP01: "Counting and factorials",
  VC2M10AP02: "Statistical studies",
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

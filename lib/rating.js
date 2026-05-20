// Ported from Premier+ premier-app.jsx (~line 3373).
// Pulls subtopic names out of a generated report and infers an overall topic.

const FILTER_PATTERN =
  /(Student|Date|Year|Tutor|Subject|Session|Premier|Bayside|Tuterly|Lesson|Summary|Report|Khan Academy|Khan|Eddie Woo|Eddie|YouTube|Mathspace|CorbettMaths|Corbett|VCAA|Homework|Areas|Focus|Recommended|Resources|Practice|Questions|Foundation|Standard|Extension|www\.|\.com|\.edu|\.au|Desmos|GeoGebra|Transum|Mathisfun|IXL|Mathswatch|Mathsonline|Channel|Website|Search|Chapter|Section|Textbook|Cambridge)/i;

function cleanTopic(raw) {
  let t = raw.trim();
  // Remove VCAA codes - Maths (VC2M…) and English (VC2E…). The
  // character classes accept hyphen, en-dash and em-dash because the
  // AI-generated report text uses all three interchangeably as the
  // separator before the code. Hyphen is kept at the start of the
  // class so it's unambiguously literal.
  t = t.replace(/\s*[-–—&,]\s*VC2[ME]\w+/g, "").trim();
  t = t.replace(/VC2[ME]\w+\s*[-–—&:,]?\s*/g, "").trim();
  // Remove strand prefixes (maths + English)
  t = t
    .replace(
      /^(Probability|Algebra|Number|Measurement|Space|Statistics|Geometry|Calculus|Data Analysis|Language|Literature|Literacy)\s*[-–—:]\s*/i,
      ""
    )
    .trim();
  // Trailing punctuation
  t = t.replace(/[-–—:,]+$/, "").trim();
  return t;
}

export function extractSubtopics(reportText) {
  if (!reportText) return [];

  const seen = new Set();
  const subtopics = [];
  const lines = reportText.split("\n");

  const addTopic = (raw) => {
    const cleaned = cleanTopic(raw);
    if (cleaned.length < 4 || cleaned.length > 60) return;
    if (FILTER_PATTERN.test(cleaned)) return;
    const key = cleaned.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    subtopics.push(cleaned);
  };

  // Strategy 1: bold text inside the Topics/Curriculum section
  let inTopicsSection = false;
  let sectionEnded = false;
  for (const line of lines) {
    if (/^#+\s*(Topics|Curriculum)/i.test(line)) {
      inTopicsSection = true;
      sectionEnded = false;
      continue;
    }
    if (inTopicsSection && /^##\s/.test(line)) {
      inTopicsSection = false;
      sectionEnded = true;
      continue;
    }
    if (
      inTopicsSection &&
      /^(Recommended|Practice Questions|Homework|How .+ Went|Areas to Focus|Eddie Woo|Khan Academy)/i.test(
        line.replace(/[*#-]/g, "").trim()
      )
    ) {
      inTopicsSection = false;
      sectionEnded = true;
      continue;
    }
    if (inTopicsSection && !sectionEnded) {
      const match = line.match(/\*\*(.+?)\*\*/);
      if (match) addTopic(match[1]);
    }
  }
  if (subtopics.length > 0) return subtopics.slice(0, 10);

  // Strategy 2: bold text between What We Covered and How X Went
  let beforeHow = true;
  let pastCoverSection = false;
  for (const line of lines) {
    if (/^#+\s*How\s/i.test(line) || /^#+\s*Areas/i.test(line)) {
      beforeHow = false;
      continue;
    }
    if (/^#+\s*(Topics|Curriculum|What We Covered)/i.test(line)) {
      pastCoverSection = true;
      continue;
    }
    if (beforeHow && pastCoverSection) {
      const match = line.match(/\*\*(.+?)\*\*/);
      if (match) addTopic(match[1]);
    }
  }
  if (subtopics.length > 0) return subtopics.slice(0, 10);

  return [];
}

const TOPIC_PATTERNS = [
  { name: "Trigonometry", patterns: [/trigonometry/g, /trig ratios/g, /sine rule/g, /cosine rule/g, /bearing/g, /sohcahtoa/g, /\bsin\b/g, /\bcos\b/g, /\btan\b/g, /trigonometric/g] },
  { name: "Simultaneous Equations", patterns: [/simultaneous/g, /elimination method/g, /substitution method/g] },
  { name: "Quadratic Expressions & Equations", patterns: [/quadratic/g, /parabola/g, /completing the square/g, /null factor/g, /factoris.*quadratic/g, /quadratic formula/g, /discriminant/g] },
  { name: "Linear Equations & Graphs", patterns: [/linear relation/g, /linear equation/g, /linear graph/g, /x.intercept/g, /y.intercept/g, /straight line/g, /gradient.*line/g, /slope.*line/g, /parallel.*line/g, /perpendicular.*line/g, /\bgradient\b/g, /linear/g] },
  { name: "Indices & Surds", patterns: [/\bindex\b/g, /\bindices\b/g, /\bsurd/g, /index law/g, /exponent/g, /scientific notation/g] },
  { name: "Financial Mathematics", patterns: [/compound interest/g, /simple interest/g, /depreciation/g, /annuit/g, /investment/g, /loan/g] },
  { name: "Statistics & Probability", patterns: [/probability/g, /venn diagram/g, /two.way table/g, /conditional/g, /statistics/g, /mean/g, /median/g, /histogram/g, /box plot/g, /standard deviation/g] },
  { name: "Data Analysis", patterns: [/data analysis/g, /regression/g, /correlation/g, /time series/g, /seasonal/g, /scatter/g] },
  { name: "Calculus - Differentiation", patterns: [/differentiat/g, /derivative/g, /gradient function/g, /chain rule/g, /product rule/g, /quotient rule/g, /turning point.*calculus/g] },
  { name: "Calculus - Integration", patterns: [/integrat/g, /anti.differentiat/g, /area under/g, /definite integral/g] },
  { name: "Circular Functions", patterns: [/circular function/g, /period.*amplitude/g, /amplitude.*period/g, /unit circle/g] },
  { name: "Logarithms & Exponentials", patterns: [/logarithm/g, /exponential/g, /log law/g, /natural log/g] },
  { name: "Matrices", patterns: [/\bmatrix\b/g, /\bmatrices\b/g, /determinant/g, /inverse matrix/g, /transition matrix/g] },
  { name: "Networks", patterns: [/\bnetwork\b/g, /graph theory/g, /euler/g, /hamilton/g, /shortest path/g, /critical path/g] },
  { name: "Fractions & Decimals", patterns: [/fraction/g, /decimal/g, /numerator/g, /denominator/g, /equivalent fraction/g, /simplif.*fraction/g, /mixed number/g] },
  { name: "Percentages & Ratios", patterns: [/percentage/g, /\bratio\b/g, /proportion/g, /discount/g, /increase.*decrease/g] },
  { name: "Measurement", patterns: [/perimeter/g, /\barea\b/g, /volume/g, /surface area/g, /measurement/g, /units.*conver/g] },
  { name: "Geometry", patterns: [/\bangle\b/g, /\bpolygon/g, /symmetry/g, /congruent/g, /similar.*triangle/g, /transformation/g, /reflection/g, /rotation/g] },
  { name: "Algebra", patterns: [/algebra/g, /\bexpand\b/g, /\bpronumeral/g, /\bvariable\b/g, /algebraic/g] },
  { name: "Number & Place Value", patterns: [/place value/g, /rounding/g, /order of operations/g, /\binteger/g, /whole number/g] },
];

// English-side topic patterns. Same shape as TOPIC_PATTERNS above; kept
// separate so detectOverallTopic can pick the right family based on the
// session subject. Without this split, English reports were
// occasionally tagged with maths topics like "Geometry" because words
// like "angle" or "expand" tripped the maths heuristics.
const ENGLISH_TOPIC_PATTERNS = [
  { name: "Text Response & Analysis", patterns: [/text response/g, /textual analysis/g, /text analysis/g, /literary analysis/g, /quote integration/g, /\btheme\b/g, /\bthemes\b/g, /character analysis/g] },
  { name: "Essay Writing", patterns: [/essay/g, /thesis/g, /topic sentence/g, /paragraph structure/g, /TEEL/gi, /PEEL/gi, /introduction.*conclusion/g] },
  { name: "Persuasive Writing", patterns: [/persuasive/g, /argument/g, /rhetoric/g, /persuad/g, /\bappeal\b/g] },
  { name: "Language Analysis", patterns: [/language analysis/g, /persuasive techniques/g, /tone\b/g, /\brhetorical\b/g, /metalanguage/g] },
  { name: "Creative Writing", patterns: [/creative writing/g, /short story/g, /narrative writing/g, /character development/g, /setting.*description/g, /show.*don.t tell/g] },
  { name: "Comparative Essays", patterns: [/comparative/g, /comparison.*text/g, /both texts/g, /two texts/g] },
  { name: "Reading Comprehension", patterns: [/comprehension/g, /reading skill/g, /inference/g, /infer.*meaning/g] },
  { name: "Spelling & Vocabulary", patterns: [/spelling/g, /vocabulary/g, /\bvocab\b/g, /\bword bank\b/g] },
  { name: "Grammar & Punctuation", patterns: [/grammar/g, /punctuation/g, /\bcomma\b/g, /apostrophe/g, /sentence structure/g, /\btense\b/g] },
  { name: "Poetry", patterns: [/\bpoetry\b/g, /\bpoem\b/g, /\bstanza\b/g, /\brhyme\b/g, /metaphor/g, /simile/g, /\bimagery\b/g] },
];

export function detectOverallTopic(reportText, subject = "maths") {
  if (!reportText) return "";
  const patterns = subject === "english" ? ENGLISH_TOPIC_PATTERNS : TOPIC_PATTERNS;
  const fullText = reportText.toLowerCase();
  let bestMatch = "";
  let bestScore = 0;

  for (const topic of patterns) {
    let score = 0;
    for (const pattern of topic.patterns) {
      const matches = fullText.match(pattern);
      if (matches) score += matches.length;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = topic.name;
    }
  }
  return bestScore >= 2 ? bestMatch : "";
}

export const CONFIDENCE_LABELS = ["", "Struggling", "Needs work", "Developing", "Confident", "Mastered"];
export const CONFIDENCE_COLORS = ["", "#C53030", "#E07B39", "#C9A84C", "#2D8A56", "#1A7A3A"];

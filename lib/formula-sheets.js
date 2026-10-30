// Printable maths formula sheets, Years 7 to 10A (/formula-sheets).
// Written by hand (30 Oct 2026) to match the Victorian Curriculum 2.0
// topics on our topic pages, and the notation those pages use (e.g.
// simple interest as I = PRT with R as a decimal). Each item links to the
// topic page that teaches it. Maths is LaTeX between $...$.
export const FORMULA_YEARS = ["7", "8", "9", "10", "10a"];
export const formulaSlug = (y) => `year-${y}-maths`;
export const yearLabel = (y) => (y === "10a" ? "Year 10A" : `Year ${y}`);
export const yearFromFormulaSlug = (slug) => {
  const m = /^year-(7|8|9|10|10a)-maths$/.exec(slug || "");
  return m ? m[1] : null;
};

const T = (slug) => `/worksheets/${slug}`;

export const FORMULA_SHEETS = {
  "7": [
    {
      strand: "Number",
      items: [
        { name: "Order of operations", f: "\\text{Brackets} \\to \\text{Indices} \\to \\times \\div \\ (\\text{left to right}) \\to + - \\ (\\text{left to right})", link: T("year-7-integers") },
        { name: "Square and square root", f: "5^2 = 25 \\qquad \\sqrt{25} = 5", link: T("year-7-square-roots") },
        { name: "Index notation", f: "2^4 = 2 \\times 2 \\times 2 \\times 2 = 16", link: T("year-7-prime-factors") },
        { name: "Prime factor form", f: "60 = 2^2 \\times 3 \\times 5", link: T("year-7-prime-factors") },
        { name: "Percentage of an amount", f: "p\\% \\text{ of } A = \\dfrac{p}{100} \\times A", link: T("year-7-percentages") },
        { name: "Fraction to percentage", f: "\\dfrac{\\text{part}}{\\text{whole}} \\times 100\\%", link: T("year-7-fractions-decimals") },
        { name: "Dividing fractions", f: "\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c}", link: T("year-7-fraction-operations") },
        { name: "Ratio", f: "a : b = ka : kb \\quad (\\text{multiply or divide both parts by the same number})", link: T("year-7-ratios") },
      ],
    },
    {
      strand: "Algebra",
      items: [
        { name: "Distributive law", f: "a(b + c) = ab + ac", link: T("year-7-expressions") },
        { name: "Substitution", f: "\\text{If } x = 3, \\ 2x + 5 = 2(3) + 5 = 11", link: T("year-7-algebra") },
        { name: "Solving an equation", f: "\\text{Do the same to both sides: } 2x + 5 = 11 \\Rightarrow 2x = 6 \\Rightarrow x = 3", link: T("year-7-linear-equations") },
      ],
    },
    {
      strand: "Measurement",
      items: [
        { name: "Perimeter of a rectangle", f: "P = 2(l + w)", link: T("year-7-area-perimeter") },
        { name: "Area of a rectangle", f: "A = lw", link: T("year-7-area-perimeter") },
        { name: "Area of a triangle", f: "A = \\tfrac{1}{2}bh", link: T("year-7-area-perimeter") },
        { name: "Area of a parallelogram", f: "A = bh", link: T("year-7-area-perimeter") },
        { name: "Volume of a rectangular prism", f: "V = lwh", link: T("year-7-volume") },
        { name: "Circumference of a circle", f: "C = \\pi d = 2\\pi r", link: T("year-7-circles") },
        { name: "Length", f: "1 \\text{ cm} = 10 \\text{ mm}, \\ 1 \\text{ m} = 100 \\text{ cm}, \\ 1 \\text{ km} = 1000 \\text{ m}" },
        { name: "Volume and capacity", f: "1 \\text{ cm}^3 = 1 \\text{ mL}, \\ 1000 \\text{ cm}^3 = 1 \\text{ L}", link: T("year-7-volume") },
      ],
    },
    {
      strand: "Space",
      items: [
        { name: "Angles on a straight line", f: "\\text{add to } 180^\\circ", link: T("year-7-angles") },
        { name: "Angles around a point", f: "\\text{add to } 360^\\circ", link: T("year-7-angles") },
        { name: "Vertically opposite angles", f: "\\text{are equal}", link: T("year-7-angles") },
        { name: "Parallel lines", f: "\\text{corresponding and alternate angles are equal; co-interior angles add to } 180^\\circ", link: T("year-7-angles") },
        { name: "Angle sum", f: "\\text{triangle } 180^\\circ, \\ \\text{quadrilateral } 360^\\circ, \\ n\\text{-sided polygon } (n - 2) \\times 180^\\circ", link: T("year-7-angles-in-triangles") },
      ],
    },
    {
      strand: "Statistics and probability",
      items: [
        { name: "Mean", f: "\\text{mean} = \\dfrac{\\text{sum of the values}}{\\text{number of values}}", link: T("year-7-statistics") },
        { name: "Median, mode, range", f: "\\text{median: middle value in order; mode: most common; range} = \\text{highest} - \\text{lowest}", link: T("year-7-statistics") },
        { name: "Probability", f: "P(\\text{event}) = \\dfrac{\\text{number of favourable outcomes}}{\\text{total number of equally likely outcomes}}", link: T("year-7-probability") },
        { name: "Probability scale", f: "0 \\le P \\le 1 \\quad (0 = \\text{impossible}, \\ 1 = \\text{certain})", link: T("year-7-probability") },
      ],
    },
  ],

  "8": [
    {
      strand: "Number",
      items: [
        { name: "Index laws", f: "a^m \\times a^n = a^{m+n} \\qquad a^m \\div a^n = a^{m-n} \\qquad (a^m)^n = a^{mn} \\qquad a^0 = 1", link: T("year-8-exponents") },
        { name: "Percentage increase or decrease", f: "\\text{new amount} = \\text{original} \\times \\left(1 \\pm \\dfrac{r}{100}\\right)", link: T("year-8-percentages") },
        { name: "Profit and loss", f: "\\text{profit} = \\text{selling price} - \\text{cost price} \\qquad \\%\\text{ profit} = \\dfrac{\\text{profit}}{\\text{cost price}} \\times 100\\%", link: T("year-8-profit-and-loss") },
        { name: "Recurring decimals", f: "\\tfrac{1}{3} = 0.\\dot{3} \\qquad \\tfrac{1}{11} = 0.\\dot{0}\\dot{9}", link: T("year-8-recurring-decimals") },
      ],
    },
    {
      strand: "Algebra",
      items: [
        { name: "Expanding brackets", f: "a(b + c) = ab + ac \\qquad -2(x - 3) = -2x + 6", link: T("year-8-algebra") },
        { name: "Linear relationship", f: "y = mx + c \\quad (\\text{a straight line when graphed})", link: T("year-8-linear-equations") },
      ],
    },
    {
      strand: "Measurement",
      items: [
        { name: "Pythagoras' theorem", f: "c^2 = a^2 + b^2 \\quad (c \\text{ is the hypotenuse})", link: T("year-8-pythagoras") },
        { name: "Circumference of a circle", f: "C = 2\\pi r = \\pi d", link: T("year-8-circles") },
        { name: "Area of a circle", f: "A = \\pi r^2", link: T("year-8-circles") },
        { name: "Area of a trapezium", f: "A = \\tfrac{1}{2}(a + b)h", link: T("year-8-area-perimeter") },
        { name: "Area of a rhombus or kite", f: "A = \\tfrac{1}{2}xy \\quad (x, y \\text{ are the diagonals})", link: T("year-8-area-perimeter") },
        { name: "Volume of a prism", f: "V = A \\times h \\quad (A \\text{ is the area of the cross-section})", link: T("year-8-volume") },
        { name: "Capacity", f: "1 \\text{ L} = 1000 \\text{ mL}, \\ 1 \\text{ kL} = 1000 \\text{ L}, \\ 1 \\text{ m}^3 = 1000 \\text{ L}", link: T("year-8-volume") },
        { name: "Speed, distance, time", f: "s = \\dfrac{d}{t} \\qquad d = st \\qquad t = \\dfrac{d}{s}", link: T("year-8-speed-distance-time") },
        { name: "Area units", f: "1 \\text{ m}^2 = 10\\,000 \\text{ cm}^2 \\qquad 1 \\text{ ha} = 10\\,000 \\text{ m}^2", link: T("year-8-area-perimeter") },
      ],
    },
    {
      strand: "Space",
      items: [
        { name: "Congruent triangle tests", f: "\\text{SSS, SAS, AAS, RHS}", link: T("year-8-congruence-similarity") },
        { name: "Quadrilateral angle sum", f: "360^\\circ", link: T("year-8-quadrilaterals") },
      ],
    },
    {
      strand: "Statistics and probability",
      items: [
        { name: "Complementary events", f: "P(\\text{not } A) = 1 - P(A)", link: T("year-8-complementary-events") },
        { name: "Mean, median, mode, range", f: "\\text{mean} = \\dfrac{\\text{sum}}{\\text{count}} \\qquad \\text{range} = \\text{highest} - \\text{lowest}", link: T("year-8-statistics") },
      ],
    },
  ],

  "9": [
    {
      strand: "Number and algebra",
      items: [
        { name: "Index laws", f: "a^m \\times a^n = a^{m+n} \\qquad \\dfrac{a^m}{a^n} = a^{m-n} \\qquad (a^m)^n = a^{mn} \\qquad (ab)^n = a^n b^n", link: T("year-9-exponent-laws") },
        { name: "Zero and negative indices", f: "a^0 = 1 \\qquad a^{-n} = \\dfrac{1}{a^n}", link: T("year-9-exponent-laws") },
        { name: "Scientific notation", f: "a \\times 10^n, \\quad 1 \\le a < 10", link: T("year-9-scientific-notation") },
        { name: "Expanding binomials", f: "(a + b)(c + d) = ac + ad + bc + bd", link: T("year-9-algebra") },
        { name: "Special products", f: "(a + b)^2 = a^2 + 2ab + b^2 \\qquad (a - b)^2 = a^2 - 2ab + b^2 \\qquad (a + b)(a - b) = a^2 - b^2", link: T("year-9-quadratics") },
        { name: "Null factor law", f: "\\text{If } ab = 0, \\text{ then } a = 0 \\text{ or } b = 0", link: T("year-9-quadratics") },
        { name: "Simple interest", f: "I = PRT \\quad (R \\text{ as a decimal per year}, \\ T \\text{ in years})", link: T("year-9-simple-interest") },
        { name: "Direct proportion", f: "y = kx", link: T("year-9-direct-proportion") },
      ],
    },
    {
      strand: "Linear relationships",
      items: [
        { name: "Gradient", f: "m = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{y_2 - y_1}{x_2 - x_1}", link: T("year-9-coordinate-geometry") },
        { name: "Equation of a line", f: "y = mx + c \\quad (c \\text{ is the } y\\text{-intercept})", link: T("year-9-linear-equations") },
        { name: "Midpoint", f: "M = \\left(\\dfrac{x_1 + x_2}{2}, \\dfrac{y_1 + y_2}{2}\\right)", link: T("year-9-coordinate-geometry") },
        { name: "Distance between two points", f: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}", link: T("year-9-coordinate-geometry") },
      ],
    },
    {
      strand: "Measurement and space",
      items: [
        { name: "Pythagoras' theorem", f: "c^2 = a^2 + b^2", link: T("year-9-pythagoras") },
        { name: "Trigonometric ratios (SOH CAH TOA)", f: "\\sin\\theta = \\dfrac{O}{H} \\qquad \\cos\\theta = \\dfrac{A}{H} \\qquad \\tan\\theta = \\dfrac{O}{A}", link: T("year-9-trigonometry") },
        { name: "Surface area of a rectangular prism", f: "SA = 2(lw + lh + wh)", link: T("year-9-surface-area-volume") },
        { name: "Cylinder", f: "V = \\pi r^2 h \\qquad SA = 2\\pi r^2 + 2\\pi r h", link: T("year-9-surface-area-volume") },
        { name: "Scale factor", f: "k = \\dfrac{\\text{image length}}{\\text{original length}}", link: T("year-9-enlargements") },
        { name: "Absolute error", f: "\\pm \\tfrac{1}{2} \\times \\text{the smallest unit on the scale}", link: T("year-9-measurement-error") },
      ],
    },
    {
      strand: "Statistics and probability",
      items: [
        { name: "Two-step probability", f: "\\text{multiply along the branches; add the outcomes you want}", link: T("year-9-probability") },
        { name: "Venn diagrams", f: "P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B)", link: T("year-9-venn-diagrams-probability") },
        { name: "Comparing data", f: "\\text{compare centre (mean, median) and spread (range)}", link: T("year-9-comparing-data") },
      ],
    },
  ],

  "10": [
    {
      strand: "Algebra",
      items: [
        { name: "Factorising quadratics", f: "x^2 + bx + c = (x + p)(x + q), \\ \\text{where } pq = c \\text{ and } p + q = b", link: T("year-10-quadratic-factorising") },
        { name: "Difference of two squares", f: "a^2 - b^2 = (a - b)(a + b)", link: T("year-10-quadratic-factorising") },
        { name: "Quadratic formula", f: "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", link: T("year-10-quadratic-equations") },
        { name: "Discriminant", f: "\\Delta = b^2 - 4ac \\quad (> 0: \\text{two solutions}, \\ = 0: \\text{one}, \\ < 0: \\text{none})", link: T("year-10-quadratic-equations") },
        { name: "Simultaneous equations", f: "\\text{substitute one equation into the other, or add/subtract to eliminate a pronumeral}", link: T("year-10-simultaneous-equations") },
        { name: "Inverse proportion", f: "y = \\dfrac{k}{x}", link: T("year-10-inverse-proportion") },
      ],
    },
    {
      strand: "Graphs",
      items: [
        { name: "Straight line", f: "y = mx + c \\qquad m = \\dfrac{y_2 - y_1}{x_2 - x_1}", link: T("year-10-coordinate-geometry") },
        { name: "Parallel and perpendicular lines", f: "\\text{parallel: } m_1 = m_2 \\qquad \\text{perpendicular: } m_1 \\times m_2 = -1", link: T("year-10-coordinate-geometry") },
        { name: "Parabola, turning point form", f: "y = a(x - h)^2 + k \\quad (\\text{turning point } (h, k))", link: T("year-10-parabolas-circles-exponentials") },
        { name: "Axis of symmetry", f: "x = -\\dfrac{b}{2a} \\quad \\text{for } y = ax^2 + bx + c", link: T("year-10-parabolas-circles-exponentials") },
        { name: "Circle", f: "(x - h)^2 + (y - k)^2 = r^2 \\quad (\\text{centre } (h, k), \\text{ radius } r)", link: T("year-10-parabolas-circles-exponentials") },
        { name: "Exponential", f: "y = a \\times b^x", link: T("year-10-parabolas-circles-exponentials") },
      ],
    },
    {
      strand: "Measurement and money",
      items: [
        { name: "Compound interest", f: "A = P(1 + r)^n \\qquad I = A - P \\quad (r \\text{ per period as a decimal}, \\ n \\text{ periods})", link: T("year-10-compound-interest") },
        { name: "Trigonometry", f: "\\sin\\theta = \\dfrac{O}{H} \\qquad \\cos\\theta = \\dfrac{A}{H} \\qquad \\tan\\theta = \\dfrac{O}{A}", link: T("year-10-trigonometry") },
        { name: "Cylinder", f: "V = \\pi r^2 h \\qquad SA = 2\\pi r^2 + 2\\pi r h", link: T("year-10-surface-area-volume") },
        { name: "Prism", f: "V = A h \\quad (A \\text{ is the area of the cross-section})", link: T("year-10-surface-area-volume") },
      ],
    },
    {
      strand: "Statistics and probability",
      items: [
        { name: "Interquartile range", f: "\\text{IQR} = Q_3 - Q_1", link: T("year-10-statistics") },
        { name: "Outliers", f: "\\text{below } Q_1 - 1.5 \\times \\text{IQR} \\ \\text{ or above } Q_3 + 1.5 \\times \\text{IQR}", link: T("year-10-statistics") },
        { name: "Independent events", f: "P(A \\text{ and } B) = P(A) \\times P(B)", link: T("year-10-tree-diagrams") },
        { name: "Conditional probability (two-way table)", f: "P(A \\mid B) = \\dfrac{\\text{number in } A \\text{ and } B}{\\text{number in } B}", link: T("year-10-two-way-tables") },
      ],
    },
  ],

  "10a": [
    {
      strand: "Surds, indices and logarithms",
      items: [
        { name: "Surds", f: "\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab} \\qquad \\dfrac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\dfrac{a}{b}} \\qquad \\dfrac{1}{\\sqrt{a}} = \\dfrac{\\sqrt{a}}{a}", link: T("year-10a-surds") },
        { name: "Fractional indices", f: "a^{\\frac{1}{n}} = \\sqrt[n]{a} \\qquad a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^m", link: T("year-10a-surds") },
        { name: "Definition of a logarithm", f: "\\log_a x = y \\iff a^y = x", link: T("year-10a-logarithms") },
        { name: "Log laws", f: "\\log_a (mn) = \\log_a m + \\log_a n \\qquad \\log_a \\dfrac{m}{n} = \\log_a m - \\log_a n \\qquad \\log_a m^p = p\\log_a m", link: T("year-10a-logarithms") },
        { name: "Special values", f: "\\log_a 1 = 0 \\qquad \\log_a a = 1", link: T("year-10a-logarithms") },
      ],
    },
    {
      strand: "Algebra and functions",
      items: [
        { name: "Quadratic formula", f: "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", link: T("year-10a-non-monic-quadratics") },
        { name: "Remainder theorem", f: "\\text{the remainder when } P(x) \\text{ is divided by } (x - a) \\text{ is } P(a)", link: T("year-10a-polynomials") },
        { name: "Factor theorem", f: "\\text{if } P(a) = 0, \\text{ then } (x - a) \\text{ is a factor of } P(x)", link: T("year-10a-polynomials") },
        { name: "Function notation", f: "f(x) = 2x + 1 \\Rightarrow f(3) = 7", link: T("year-10a-function-notation") },
      ],
    },
    {
      strand: "Trigonometry and geometry",
      items: [
        { name: "Sine rule", f: "\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}", link: T("year-10a-sine-cosine-rule") },
        { name: "Cosine rule", f: "c^2 = a^2 + b^2 - 2ab\\cos C", link: T("year-10a-sine-cosine-rule") },
        { name: "Area of a triangle", f: "A = \\tfrac{1}{2}ab\\sin C", link: T("year-10a-sine-cosine-rule") },
        { name: "Exact values", f: "\\sin 30^\\circ = \\tfrac{1}{2} \\qquad \\cos 30^\\circ = \\tfrac{\\sqrt{3}}{2} \\qquad \\sin 45^\\circ = \\cos 45^\\circ = \\tfrac{\\sqrt{2}}{2} \\qquad \\tan 45^\\circ = 1", link: T("year-10a-trigonometric-equations") },
        { name: "Circle theorems", f: "\\text{angle at the centre} = 2 \\times \\text{angle at the circumference; angle in a semicircle} = 90^\\circ", link: T("year-10a-circle-theorems") },
        { name: "More circle theorems", f: "\\text{opposite angles of a cyclic quadrilateral add to } 180^\\circ; \\text{ a tangent is perpendicular to the radius}", link: T("year-10a-circle-theorems") },
      ],
    },
    {
      strand: "Measurement",
      items: [
        { name: "Pyramid", f: "V = \\tfrac{1}{3}A h", link: T("year-10a-pyramids-cones-spheres") },
        { name: "Cone", f: "V = \\tfrac{1}{3}\\pi r^2 h \\qquad SA = \\pi r^2 + \\pi r l \\quad (l \\text{ is the slant height})", link: T("year-10a-pyramids-cones-spheres") },
        { name: "Sphere", f: "V = \\tfrac{4}{3}\\pi r^3 \\qquad SA = 4\\pi r^2", link: T("year-10a-pyramids-cones-spheres") },
      ],
    },
    {
      strand: "Statistics and counting",
      items: [
        { name: "Standard deviation (population)", f: "\\sigma = \\sqrt{\\dfrac{\\sum (x - \\bar{x})^2}{n}}", link: T("year-10a-standard-deviation") },
        { name: "Permutations", f: "{}^nP_r = \\dfrac{n!}{(n - r)!}", link: T("year-10a-permutations-combinations") },
        { name: "Combinations", f: "{}^nC_r = \\dbinom{n}{r} = \\dfrac{n!}{r!(n - r)!}", link: T("year-10a-permutations-combinations") },
      ],
    },
  ],
};

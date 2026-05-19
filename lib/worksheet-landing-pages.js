// Topic-specific landing pages for the free worksheet generator.
// Each entry produces a page at /worksheets/[slug] with the generator
// embedded and the topic pre-selected. The slug is the SEO URL.
//
// `topicId` maps to a VCAA F-10 code in lib/curriculum.js. The
// generator uses that code's `desc` to seed the practice questions.
// `topicLabel` is the short label shown to the user (mirrors the
// auto-trim done by shortLabel() in lib/curriculum-topics.js so the
// pre-selected option in the dropdown matches a real option).
//
// `whatsCovered` is the bullet list shown under the generator —
// concrete sub-skills students should expect, written for parents
// who skim before clicking.

export const WORKSHEET_LANDING_PAGES = [
  // ===== Year 7 =====
  {
    slug: "year-7-algebra",
    yearLevel: "Year 7",
    topicId: "VC2M7A01",
    topicLabel: "Recognise and use variables to represent everyday formulas algebraically and substitute values into formulas to determine an unknown",
    topic: "Algebra",
    h1: "Year 7 Algebra Worksheets & Practice Tests",
    subtitle: "Variables, substitution, formulas - fresh questions every click, with worked solutions.",
    intro:
      "Year 7 is when algebra stops being arithmetic with letters and starts feeling like a language. These worksheets give your student practice writing formulas, substituting values, and rearranging simple expressions - exactly the moves the Victorian Curriculum expects them to be fluent in by the end of the year.",
    whatsCovered: [
      "Use a pronumeral to represent an unknown",
      "Substitute values into formulas (perimeter, area, simple cost equations)",
      "Apply the distributive, associative and commutative laws",
      "Write algebraic expressions from word problems",
      "Tables of values from a rule, plot on the Cartesian plane",
    ],
    metaTitle: "Year 7 Algebra Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 7 algebra worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on variables, formulas and substitution. Generate one now.",
  },
  {
    slug: "year-7-linear-equations",
    yearLevel: "Year 7",
    topicId: "VC2M7A03",
    topicLabel: "Solve one-variable linear equations of increasing complexity with natural number solutions",
    topic: "Linear equations",
    h1: "Year 7 Linear Equations Worksheets & Practice Tests",
    subtitle: "Solve for x with confidence. Worked solutions every time, free.",
    intro:
      "Linear equations are the first real \"do the same thing to both sides\" topic in Year 7 maths. These worksheets give your student a steady ramp from one-step equations to two- and three-step problems, with worked solutions for every question so they can see exactly where their working breaks.",
    whatsCovered: [
      "One-step equations (x + 7 = 12, 3x = 18)",
      "Two-step equations (2x + 5 = 17)",
      "Equations with brackets (3(x + 2) = 21)",
      "Word problems that translate into a linear equation",
      "Verifying solutions by substitution",
    ],
    metaTitle: "Year 7 Linear Equations Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 7 linear equations worksheets aligned to the Victorian Curriculum. 10 \"solve for x\" questions with full worked solutions. Generate yours now.",
  },
  {
    slug: "year-7-fractions-decimals",
    yearLevel: "Year 7",
    topicId: "VC2M7N05",
    topicLabel: "Multiply and divide fractions and decimals using efficient mental and written strategies",
    topic: "Fractions and decimals",
    h1: "Year 7 Fractions & Decimals Worksheets",
    subtitle: "Multiply, divide, convert. The fluency drills Year 7 needs.",
    intro:
      "Year 7 builds on the primary-school fraction work and pushes into multiplication, division, and conversion between fractions and decimals. These worksheets isolate that exact skill set so your student gets the repetition they need without slogging through unrelated topics.",
    whatsCovered: [
      "Multiplying fractions (proper, improper, mixed)",
      "Dividing fractions (\"keep, change, flip\")",
      "Multiplying and dividing decimals",
      "Converting between fractions and decimals",
      "Mixed-operation problems with rational numbers",
    ],
    metaTitle: "Year 7 Fractions & Decimals Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 7 fractions and decimals worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions covering multiplication, division and conversion.",
  },
  {
    slug: "year-7-percentages",
    yearLevel: "Year 7",
    topicId: "VC2M7N07",
    topicLabel: "Find percentages of quantities and express one quantity as a percentage of another",
    topic: "Percentages",
    h1: "Year 7 Percentages Worksheets & Practice Tests",
    subtitle: "Discounts, GST, percent of a number - the financial-maths backbone.",
    intro:
      "Percentages are one of the most useful Year 7 topics for everyday life: discounts, GST, tips, mark-ups. These worksheets practise both directions - finding a percentage of a quantity, and working out what percentage one number is of another - in contexts students actually run into.",
    whatsCovered: [
      "Percent of a quantity (15% of 80)",
      "Expressing one quantity as a percentage of another",
      "Converting between fractions, decimals and percentages",
      "Discount and mark-up word problems",
      "Best-buy and value-for-money comparisons",
    ],
    metaTitle: "Year 7 Percentages Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 7 percentages worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions covering discounts, GST and percent-of word problems.",
  },
  {
    slug: "year-7-integers",
    yearLevel: "Year 7",
    topicId: "VC2M7N08",
    topicLabel: "Compare, order and solve problems involving addition and subtraction of integers",
    topic: "Integers",
    h1: "Year 7 Integers Worksheets & Practice Tests",
    subtitle: "Adding and subtracting positive and negative numbers, the easy way.",
    intro:
      "Negative numbers are where a lot of Year 7 students stall - especially when subtraction and negatives collide. These worksheets give your student the repetition they need to make the sign rules automatic, with worked solutions that show each step.",
    whatsCovered: [
      "Comparing and ordering integers on a number line",
      "Adding integers with the same and opposite signs",
      "Subtracting integers (and why \"minus a minus is plus\")",
      "Word problems involving temperature, debt, depth",
      "Mixed-sign multi-step problems",
    ],
    metaTitle: "Year 7 Integers Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 7 integers worksheets aligned to the Victorian Curriculum. 10 questions on adding and subtracting positive and negative numbers, with worked solutions.",
  },
  {
    slug: "year-7-ratios",
    yearLevel: "Year 7",
    topicId: "VC2M7N09",
    topicLabel: "Recognise, represent and solve problems involving ratios",
    topic: "Ratios",
    h1: "Year 7 Ratios Worksheets & Practice Tests",
    subtitle: "Simplify, scale, divide in a ratio - the Year 7 foundations.",
    intro:
      "Ratios show up in everything from recipes to map scales to currency exchange. These Year 7 worksheets give your student practice across all the standard ratio question types so the topic feels routine rather than tricky by the time tests roll around.",
    whatsCovered: [
      "Writing and simplifying ratios",
      "Equivalent ratios",
      "Dividing a quantity in a given ratio",
      "Comparing ratios using a common term",
      "Word problems involving recipes, scale and proportion",
    ],
    metaTitle: "Year 7 Ratios Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 7 ratios worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on simplifying, equivalent ratios and dividing quantities.",
  },
  {
    slug: "year-7-geometry",
    yearLevel: "Year 7",
    topicId: "VC2M7SP02",
    topicLabel: "Classify triangles, quadrilaterals and other polygons according to their side and angle properties",
    topic: "Geometry",
    h1: "Year 7 Geometry Worksheets & Practice Tests",
    subtitle: "Classifying shapes, polygon properties, transformations.",
    intro:
      "Year 7 geometry is mostly about being precise: naming shapes correctly, classifying them by their side and angle properties, and describing how they move on the Cartesian plane. These worksheets give your student fresh shape-recognition and property-based questions every time you generate one.",
    whatsCovered: [
      "Classifying triangles by sides (scalene, isosceles, equilateral) and angles",
      "Classifying quadrilaterals (square, rectangle, rhombus, parallelogram, trapezium, kite)",
      "Side and angle properties of common polygons",
      "Representing 3D objects in 2D",
      "Transformations on the Cartesian plane",
    ],
    metaTitle: "Year 7 Geometry Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 7 geometry worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on classifying triangles, quadrilaterals and polygons.",
  },
  {
    slug: "year-7-angles",
    yearLevel: "Year 7",
    topicId: "VC2M7M04",
    topicLabel: "Identify corresponding, alternate and co-interior relationships between angles formed when parallel lines are crossed by a transversal",
    topic: "Angles",
    h1: "Year 7 Angles Worksheets & Practice Tests",
    subtitle: "Parallel lines, transversals, angle sums - all in one place.",
    intro:
      "Angle work in Year 7 is mostly about naming the right relationship (corresponding, alternate, co-interior, vertically opposite) and using it to solve for an unknown. These worksheets drill that exact reasoning - the part students lose marks on most often in tests.",
    whatsCovered: [
      "Complementary, supplementary and vertically opposite angles",
      "Corresponding angles on parallel lines",
      "Alternate angles (Z and reverse-Z)",
      "Co-interior (C) angles",
      "Interior angle sum of triangles and other polygons",
    ],
    metaTitle: "Year 7 Angles Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 7 angles worksheets aligned to the Victorian Curriculum. 10 questions on parallel lines, transversals and angle sums with worked solutions.",
  },
  {
    slug: "year-7-area-perimeter",
    yearLevel: "Year 7",
    topicId: "VC2M7M01",
    topicLabel: "Establish the formulas for areas of rectangles, triangles and parallelograms and use these in problem-solving",
    topic: "Area and perimeter",
    h1: "Year 7 Area & Perimeter Worksheets",
    subtitle: "Rectangles, triangles, parallelograms - formulas and word problems.",
    intro:
      "Year 7 students are expected to fluently calculate area and perimeter of rectangles, triangles and parallelograms, and apply those formulas to real-world problems. These worksheets give them mixed-shape practice every click so they can't just memorise one type.",
    whatsCovered: [
      "Perimeter of rectangles, squares and compound shapes",
      "Area of a rectangle and square",
      "Area of a triangle using base x height x 1/2",
      "Area of parallelograms",
      "Word problems involving floor area, paint, fencing",
    ],
    metaTitle: "Year 7 Area & Perimeter Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 7 area and perimeter worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on rectangles, triangles and parallelograms.",
  },
  {
    slug: "year-7-volume",
    yearLevel: "Year 7",
    topicId: "VC2M7M02",
    topicLabel: "Solve problems involving the volume of right prisms including rectangular and triangular prisms",
    topic: "Volume",
    h1: "Year 7 Volume Worksheets & Practice Tests",
    subtitle: "Volume of right prisms - rectangular, triangular, and word problems.",
    intro:
      "Year 7 introduces the formula \"volume = area of cross-section x length\" for right prisms. These worksheets give your student varied practice on rectangular and triangular prisms, plus the wordier problems VCAA loves to put on practice tests.",
    whatsCovered: [
      "Volume of a rectangular prism",
      "Volume of a triangular prism",
      "Volume in litres vs cubic centimetres",
      "Compound-prism word problems (swimming pools, garden beds)",
      "Working back from a known volume to find a missing dimension",
    ],
    metaTitle: "Year 7 Volume Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 7 volume worksheets aligned to the Victorian Curriculum. 10 questions on volume of rectangular and triangular prisms, with worked solutions.",
  },
  {
    slug: "year-7-circles",
    yearLevel: "Year 7",
    topicId: "VC2M7M03",
    topicLabel: "Describe the relationship between pi and the circumference, radius and diameter of a circle",
    topic: "Circles",
    h1: "Year 7 Circles Worksheets & Practice Tests",
    subtitle: "Pi, circumference, radius and diameter - all the early-circle work.",
    intro:
      "Year 7 is where students meet pi formally for the first time. These worksheets keep things at the right level: relating radius, diameter and circumference, with a few applied problems thrown in. (Area of a circle is mostly Year 8 - check the Year 8 worksheets when you get there.)",
    whatsCovered: [
      "Relationship between diameter and radius",
      "Pi as the ratio of circumference to diameter",
      "Calculating circumference given the radius or diameter",
      "Working back from circumference to find the radius",
      "Mixed circle word problems (wheels, tracks, gardens)",
    ],
    metaTitle: "Year 7 Circles Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 7 circles worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on pi, circumference, radius and diameter.",
  },
  {
    slug: "year-7-statistics",
    yearLevel: "Year 7",
    topicId: "VC2M7ST01",
    topicLabel: "Acquire data sets for discrete and continuous numerical variables and calculate the range, median, mean and mode",
    topic: "Statistics",
    h1: "Year 7 Statistics Worksheets & Practice Tests",
    subtitle: "Mean, median, mode, range - the four numbers everyone needs.",
    intro:
      "Year 7 statistics centres on calculating the mean, median, mode and range from raw data and from frequency tables. These worksheets give your student varied datasets so they can't just memorise one example - they have to understand each measure.",
    whatsCovered: [
      "Mean from a list of numbers",
      "Median (with both odd and even data counts)",
      "Mode (and what to do when there are two modes)",
      "Range",
      "Comparing two datasets using their summary statistics",
    ],
    metaTitle: "Year 7 Statistics Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 7 statistics worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on mean, median, mode and range.",
  },
  {
    slug: "year-7-probability",
    yearLevel: "Year 7",
    topicId: "VC2M7P01",
    topicLabel: "Identify the sample space for single-stage experiments; assign probabilities to possible outcomes and predict relative frequencies",
    topic: "Probability",
    h1: "Year 7 Probability Worksheets & Practice Tests",
    subtitle: "Sample spaces, single-stage experiments, relative frequency.",
    intro:
      "Probability in Year 7 is mostly about listing all possible outcomes and assigning fractions to them. These worksheets keep the questions concrete - coins, dice, spinners, cards - while making sure your student handles the language (\"equally likely\", \"impossible\", \"certain\") correctly.",
    whatsCovered: [
      "Listing the sample space for a single-stage experiment",
      "Assigning probabilities as fractions, decimals or percentages",
      "Probability of complementary events",
      "Relative frequency from experimental data",
      "Comparing theoretical and experimental probabilities",
    ],
    metaTitle: "Year 7 Probability Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 7 probability worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on sample spaces, single-stage events and relative frequency.",
  },
];

export function getLandingPageBySlug(slug) {
  return WORKSHEET_LANDING_PAGES.find((p) => p.slug === slug) ?? null;
}

export function getLandingPagesForYear(year) {
  return WORKSHEET_LANDING_PAGES.filter((p) => p.yearLevel === year);
}

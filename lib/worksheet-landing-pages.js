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

  // ===== Year 8 =====
  {
    slug: "year-8-algebra",
    yearLevel: "Year 8",
    topicId: "VC2M8A01",
    topicLabel: "Create, expand, factorise, rearrange and simplify linear expressions",
    topic: "Algebra",
    h1: "Year 8 Algebra Worksheets & Practice Tests",
    subtitle: "Expanding, factorising and simplifying linear expressions.",
    intro:
      "Year 8 algebra is where students move beyond writing expressions and start manipulating them - expanding brackets, factorising out common terms, collecting like terms across longer expressions. These worksheets give your student the repetition they need to make those moves automatic before quadratics arrive in Year 9.",
    whatsCovered: [
      "Collecting like terms with multiple variables",
      "Expanding single-bracket expressions using the distributive law",
      "Factorising by taking out a common factor",
      "Rearranging expressions and applying inverse operations",
      "Substituting values into simplified expressions",
    ],
    metaTitle: "Year 8 Algebra Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 8 algebra worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on expanding, factorising and simplifying linear expressions.",
  },
  {
    slug: "year-8-linear-equations",
    yearLevel: "Year 8",
    topicId: "VC2M8A02",
    topicLabel: "Graph linear relations on the Cartesian plane; solve linear equations and one-variable inequalities",
    topic: "Linear equations and graphs",
    h1: "Year 8 Linear Equations & Graphs Worksheets",
    subtitle: "Plot, solve, sketch. The core Year 8 algebra skill set.",
    intro:
      "Year 8 takes linear equations further: graphing them on the Cartesian plane, solving them algebraically, and starting to work with inequalities. These worksheets mix all three so your student can't just memorise one procedure - they have to recognise what the question is asking.",
    whatsCovered: [
      "Solving multi-step linear equations",
      "Graphing y = mx + c style equations on the Cartesian plane",
      "Reading the gradient and y-intercept from a graph",
      "Solving one-variable linear inequalities",
      "Representing inequalities on a number line",
    ],
    metaTitle: "Year 8 Linear Equations & Graphs Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 8 linear equations worksheets aligned to the Victorian Curriculum. 10 questions on graphing, solving and inequalities with worked solutions.",
  },
  {
    slug: "year-8-pythagoras",
    yearLevel: "Year 8",
    topicId: "VC2M8M06",
    topicLabel: "Use Pythagoras' theorem to solve problems involving the side lengths of right-angled triangles",
    topic: "Pythagoras' theorem",
    h1: "Year 8 Pythagoras' Theorem Worksheets",
    subtitle: "Find the hypotenuse, find a shorter side, apply to word problems.",
    intro:
      "Pythagoras' theorem is one of the most-tested Year 8 topics. These worksheets give your student practice across the three standard question types - finding the hypotenuse, finding a shorter side, and applying Pythagoras to real-world problems like ladders, ramps and TV screen sizes.",
    whatsCovered: [
      "Finding the hypotenuse given two shorter sides",
      "Finding a shorter side given the hypotenuse",
      "Identifying when a triangle is right-angled from its side lengths",
      "Applied problems (ladders, ramps, diagonal distances)",
      "Exact (surd) vs decimal answers",
    ],
    metaTitle: "Year 8 Pythagoras' Theorem Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 8 Pythagoras' theorem worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on right-angled triangles.",
  },
  {
    slug: "year-8-circles",
    yearLevel: "Year 8",
    topicId: "VC2M8M03",
    topicLabel: "Solve problems involving the circumference and area of a circle using formulas",
    topic: "Circles",
    h1: "Year 8 Circles Worksheets & Practice Tests",
    subtitle: "Area and circumference - the full Year 8 circle skill set.",
    intro:
      "Year 8 is where students apply pi to both circumference and area of circles, and start handling composite shapes (semicircles, quadrants, annulus). These worksheets give your student practice on each variation - exact, decimal and word-problem answers - so the formulas stay in long-term memory.",
    whatsCovered: [
      "Circumference using diameter or radius",
      "Area of a circle from radius or diameter",
      "Working back from an area or circumference to find the radius",
      "Composite shapes (semicircles, quadrants, annulus)",
      "Real-world circle problems (running tracks, gardens, pizzas)",
    ],
    metaTitle: "Year 8 Circles Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 8 circles worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on circumference, area, and composite circle shapes.",
  },
  {
    slug: "year-8-area-perimeter",
    yearLevel: "Year 8",
    topicId: "VC2M8M01",
    topicLabel: "Solve problems involving the area and perimeter of irregular and composite shapes",
    topic: "Area and perimeter",
    h1: "Year 8 Area & Perimeter Worksheets",
    subtitle: "Irregular and composite shapes - the trickier Year 8 problems.",
    intro:
      "Year 8 takes area and perimeter past simple rectangles into composite and irregular shapes. The trick is splitting the shape sensibly. These worksheets give your student exposure to lots of split-it-up-then-add problems so they get fast at choosing a clean strategy.",
    whatsCovered: [
      "Composite rectangle problems (L-shapes, T-shapes)",
      "Triangles and parallelograms inside composite shapes",
      "Perimeter where some sides need calculating first",
      "Subtraction method (whole shape minus the cut-out)",
      "Word problems involving floor area, paving, fencing",
    ],
    metaTitle: "Year 8 Area & Perimeter Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 8 area and perimeter worksheets aligned to the Victorian Curriculum. 10 questions on composite and irregular shapes with worked solutions.",
  },
  {
    slug: "year-8-volume",
    yearLevel: "Year 8",
    topicId: "VC2M8M02",
    topicLabel: "Solve problems involving the volume and capacity of right prisms",
    topic: "Volume",
    h1: "Year 8 Volume Worksheets & Practice Tests",
    subtitle: "Right prisms, capacity, real-world volume problems.",
    intro:
      "Year 8 builds on the Year 7 volume formula and adds capacity (litres) and a wider range of prism cross-sections. These worksheets give your student practice in both directions - calculating volume from dimensions, and working back to find a missing dimension when the volume is known.",
    whatsCovered: [
      "Volume of rectangular and triangular prisms",
      "Volume of trapezoidal and other right prisms",
      "Capacity (mL, L, kL) conversions",
      "Working back from volume to find a missing dimension",
      "Composite-prism problems (steps, swimming pools)",
    ],
    metaTitle: "Year 8 Volume Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 8 volume worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on right prisms and capacity.",
  },
  {
    slug: "year-8-percentages",
    yearLevel: "Year 8",
    topicId: "VC2M8N05",
    topicLabel: "Solve problems involving the use of percentages, including percentage increases and decreases and percentage error",
    topic: "Percentages",
    h1: "Year 8 Percentages Worksheets & Practice Tests",
    subtitle: "Increases, decreases, GST, percentage error.",
    intro:
      "Year 8 percentages move past \"percent of\" into increases, decreases and percentage error - the real-life versions students will keep using. These worksheets focus on the harder applied problems where a question first needs translating before any calculation.",
    whatsCovered: [
      "Percentage increase and decrease",
      "Reverse-percentage problems (find the original price)",
      "GST (add or extract from a total)",
      "Percentage error in measurement",
      "Real-world problems (sales, mark-ups, commission)",
    ],
    metaTitle: "Year 8 Percentages Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 8 percentages worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on increases, decreases, GST and percentage error.",
  },
  {
    slug: "year-8-rates",
    yearLevel: "Year 8",
    topicId: "VC2M8M05",
    topicLabel: "Recognise and use rates to solve problems involving the comparison of 2 related quantities of different units",
    topic: "Rates",
    h1: "Year 8 Rates Worksheets & Practice Tests",
    subtitle: "Speed, density, unit pricing - the everyday rate problems.",
    intro:
      "Rates are the secret backbone of physics, chemistry and even VCE economics. Year 8 introduces them properly - distance/time, unit price, density. These worksheets give your student practice setting up the right ratio every time, then converting units cleanly.",
    whatsCovered: [
      "Speed = distance / time problems",
      "Unit pricing and best-buy comparisons",
      "Density and similar rate-based quantities",
      "Converting between rate units (km/h to m/s, $/kg to $/g)",
      "Multi-step word problems involving rates",
    ],
    metaTitle: "Year 8 Rates Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 8 rates worksheets aligned to the Victorian Curriculum. 10 questions on speed, density, unit pricing with worked solutions.",
  },
  {
    slug: "year-8-exponents",
    yearLevel: "Year 8",
    topicId: "VC2M8N02",
    topicLabel: "Establish and apply the exponent laws with integer exponents and the zero exponent",
    topic: "Exponents",
    h1: "Year 8 Exponents (Index Laws) Worksheets",
    subtitle: "Multiply, divide, power-of-a-power - the four index laws.",
    intro:
      "Index laws (\"the exponent rules\") trip up students because there are several of them and they look similar. These worksheets isolate each rule and then mix them up so your student learns to recognise which law applies before they start writing.",
    whatsCovered: [
      "Multiplying terms with the same base (a^m x a^n = a^(m+n))",
      "Dividing terms with the same base (a^m / a^n = a^(m-n))",
      "Power-of-a-power rule",
      "Zero index (a^0 = 1)",
      "Mixed-rule simplification problems",
    ],
    metaTitle: "Year 8 Exponents Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 8 exponent law worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on multiplying, dividing and power-of-power.",
  },
  {
    slug: "year-8-congruence-similarity",
    yearLevel: "Year 8",
    topicId: "VC2M8SP01",
    topicLabel: "Identify the conditions for congruence and similarity of triangles",
    topic: "Congruence and similarity",
    h1: "Year 8 Congruence & Similarity Worksheets",
    subtitle: "SSS, SAS, AAS - which conditions prove triangles match?",
    intro:
      "Year 8 introduces the four congruence conditions (SSS, SAS, AAS, RHS) and the corresponding similarity conditions. The hard part is recognising which one applies - these worksheets give your student varied figures to train that instinct.",
    whatsCovered: [
      "The four triangle-congruence conditions (SSS, SAS, AAS, RHS)",
      "Identifying which condition applies to a given figure",
      "Similar-triangle conditions (AA, SSS, SAS in ratio)",
      "Using similarity to find missing side lengths",
      "Short formal proofs of congruence",
    ],
    metaTitle: "Year 8 Congruence & Similarity Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 8 congruence and similarity worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on triangle conditions and ratios.",
  },
  {
    slug: "year-8-statistics",
    yearLevel: "Year 8",
    topicId: "VC2M8ST01",
    topicLabel: "Distinguish between a population and a sample, and investigate techniques for data collection",
    topic: "Statistics",
    h1: "Year 8 Statistics Worksheets & Practice Tests",
    subtitle: "Population vs sample, data collection methods, bias.",
    intro:
      "Year 8 statistics shifts from \"calculate the mean\" to \"why was this data collected this way\". These worksheets give your student practice spotting bias, choosing the right sampling method, and interpreting reported statistics from real-world contexts.",
    whatsCovered: [
      "Population vs sample",
      "Random, systematic and stratified sampling",
      "Census vs sample - when to use each",
      "Identifying bias in data collection",
      "Interpreting statistical claims in the media",
    ],
    metaTitle: "Year 8 Statistics Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 8 statistics worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on population, sample and sampling methods.",
  },
  {
    slug: "year-8-probability",
    yearLevel: "Year 8",
    topicId: "VC2M8P02",
    topicLabel: "Determine all possible outcome combinations for 2 events using two-way tables, tree diagrams and Venn diagrams",
    topic: "Probability",
    h1: "Year 8 Probability Worksheets & Practice Tests",
    subtitle: "Tree diagrams, two-way tables, Venn diagrams.",
    intro:
      "Year 8 probability adds two-event experiments - which means tree diagrams, two-way tables and Venn diagrams enter the picture. These worksheets give your student practice in each representation so they can pick whichever is fastest for the question in front of them.",
    whatsCovered: [
      "Tree diagrams for two-stage experiments",
      "Two-way tables (with-replacement and without-replacement)",
      "Venn diagrams for two events",
      "Complementary events",
      "Calculating P(A and B) from a tree or table",
    ],
    metaTitle: "Year 8 Probability Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 8 probability worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on tree diagrams, Venn diagrams and two-way tables.",
  },
  {
    slug: "year-8-time-zones",
    yearLevel: "Year 8",
    topicId: "VC2M8M04",
    topicLabel: "Solve problems involving time and duration, including using 12- and 24-hour time across multiple time zones",
    topic: "Time and time zones",
    h1: "Year 8 Time & Time Zones Worksheets",
    subtitle: "12- and 24-hour time, duration, world time zones.",
    intro:
      "The Year 8 \"time\" topic is deceptively tricky - especially when crossing time zones and daylight savings. These worksheets give your student varied problems on durations, 24-hour conversions and global time-zone calculations.",
    whatsCovered: [
      "Converting between 12-hour and 24-hour time",
      "Adding and subtracting durations",
      "Time-zone calculations (Australia vs international)",
      "Daylight savings considerations",
      "Word problems involving flights, schedules, broadcasts",
    ],
    metaTitle: "Year 8 Time & Time Zones Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 8 time worksheets aligned to the Victorian Curriculum. 10 questions on duration, 24-hour time and time-zone problems with worked solutions.",
  },

  // ===== Year 9 =====
  {
    slug: "year-9-quadratics",
    yearLevel: "Year 9",
    topicId: "VC2M9A05",
    topicLabel: "Identify and graph quadratic functions, solve quadratic equations graphically and numerically",
    topic: "Quadratics",
    h1: "Year 9 Quadratics Worksheets & Practice Tests",
    subtitle: "Graphing parabolas, null factor law, solving quadratic equations.",
    intro:
      "Year 9 is when students meet quadratics properly. These worksheets give your student varied practice across graphing parabolas, using the null factor law, and solving monic quadratics with integer roots - the exact skills VCAA tests at the Year 9 level.",
    whatsCovered: [
      "Recognising the standard parabola y = x^2",
      "Effect of transformations on a parabola (y = ax^2 + c)",
      "Solving quadratic equations by null factor law",
      "Reading roots from a graph",
      "Setting up a quadratic from a worded scenario",
    ],
    metaTitle: "Year 9 Quadratics Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 9 quadratics worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on graphing parabolas and null factor law.",
  },
  {
    slug: "year-9-algebra",
    yearLevel: "Year 9",
    topicId: "VC2M9A02",
    topicLabel: "Simplify algebraic expressions, apply the distributive law to expand including binomial products, and factorise monic quadratic expressions",
    topic: "Algebra",
    h1: "Year 9 Algebra Worksheets & Practice Tests",
    subtitle: "Binomial expansion, monic quadratic factorising, simplifying.",
    intro:
      "Year 9 algebra is the year FOIL (binomial expansion) and factorising x^2 + bx + c become routine. These worksheets give your student the repetition they need - both directions, plus mixed-format problems that show up on practice tests.",
    whatsCovered: [
      "Expanding (x + a)(x + b) using FOIL / distributive law",
      "Factorising monic quadratics into two binomial factors",
      "Difference of two squares pattern",
      "Simplifying multi-term algebraic expressions",
      "Mixed expand-then-factorise problems",
    ],
    metaTitle: "Year 9 Algebra Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 9 algebra worksheets aligned to the Victorian Curriculum. 10 questions on binomial expansion, factorising monic quadratics and simplifying.",
  },
  {
    slug: "year-9-linear-equations",
    yearLevel: "Year 9",
    topicId: "VC2M9A03",
    topicLabel: "Sketch linear graphs of equations in various algebraic forms, using the coordinates of 2 points, and solve linear equations",
    topic: "Linear equations and graphs",
    h1: "Year 9 Linear Equations & Graphs Worksheets",
    subtitle: "Sketch from gradient/intercept, solve from any form.",
    intro:
      "Year 9 students should be able to look at any linear equation - in any form - and sketch it. These worksheets practise that across the forms they'll meet (y = mx + c, ax + by = c, x = k, y = k) and tie sketching back to solving.",
    whatsCovered: [
      "Sketching from y = mx + c using gradient and intercept",
      "Sketching from two known points",
      "Sketching horizontal and vertical lines",
      "Solving linear equations algebraically",
      "Finding the intersection of two lines",
    ],
    metaTitle: "Year 9 Linear Equations & Graphs Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 9 linear equations worksheets aligned to the Victorian Curriculum. 10 questions on sketching, solving and intersections with worked solutions.",
  },
  {
    slug: "year-9-trigonometry",
    yearLevel: "Year 9",
    topicId: "VC2M9SP01",
    topicLabel: "Recognise the constancy of the sine, cosine and tangent ratios for a given angle in right-angled triangles",
    topic: "Trigonometry",
    h1: "Year 9 Trigonometry Worksheets & Practice Tests",
    subtitle: "SOHCAHTOA - find missing sides and angles in right-angled triangles.",
    intro:
      "Year 9 trig is the first proper introduction to SOHCAHTOA. These worksheets give your student practice on both directions - finding a missing side, finding a missing angle - across enough varied triangles to make the right-ratio choice feel automatic.",
    whatsCovered: [
      "Labelling opposite / adjacent / hypotenuse for a given angle",
      "Choosing the right ratio (sin / cos / tan) for the question",
      "Finding a missing side length",
      "Finding a missing angle using inverse trig",
      "Word problems involving heights, ramps, shadows",
    ],
    metaTitle: "Year 9 Trigonometry Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 9 trigonometry worksheets aligned to the Victorian Curriculum. 10 SOHCAHTOA questions with worked solutions on right-angled triangles.",
  },
  {
    slug: "year-9-pythagoras",
    yearLevel: "Year 9",
    topicId: "VC2M9M03",
    topicLabel: "Solve spatial problems applying angle properties, scale, similarity, ratio, Pythagoras' theorem and trigonometry",
    topic: "Pythagoras (applied)",
    h1: "Year 9 Pythagoras & Applied Geometry Worksheets",
    subtitle: "Combine Pythagoras with similarity, ratio and trig.",
    intro:
      "Year 9 students are expected to combine Pythagoras with similarity, scale and angle properties to solve more complex spatial problems. These worksheets push past the basic \"find the hypotenuse\" stage into multi-step applied problems.",
    whatsCovered: [
      "Pythagoras combined with angle-property reasoning",
      "Pythagoras in 3D problems (diagonals of boxes)",
      "Similarity + Pythagoras to find missing lengths",
      "Scale drawings and ratio-based problems",
      "Applied problems mixing Pythagoras and basic trig",
    ],
    metaTitle: "Year 9 Pythagoras Worksheet & Practice Test (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 9 Pythagoras worksheets aligned to the Victorian Curriculum. 10 applied questions combining Pythagoras with similarity and ratio.",
  },
  {
    slug: "year-9-surface-area-volume",
    yearLevel: "Year 9",
    topicId: "VC2M9M01",
    topicLabel: "Solve problems involving the volume and surface area of right prisms, cylinders and composite objects",
    topic: "Surface area and volume",
    h1: "Year 9 Surface Area & Volume Worksheets",
    subtitle: "Cylinders, prisms, composite 3D objects.",
    intro:
      "Year 9 takes 3D measurement up a level - cylinders, composite prisms, and surface area for the first time. These worksheets give your student varied 3D objects so they get comfortable identifying which formula applies to which face.",
    whatsCovered: [
      "Surface area of right prisms (rectangular, triangular)",
      "Surface area of cylinders (curved + two circles)",
      "Volume of cylinders",
      "Composite solids (prism + prism, prism + cylinder)",
      "Real-world problems (paint, packaging, capacity)",
    ],
    metaTitle: "Year 9 Surface Area & Volume Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 9 surface area and volume worksheets aligned to the Victorian Curriculum. 10 questions on prisms, cylinders and composite solids.",
  },
  {
    slug: "year-9-coordinate-geometry",
    yearLevel: "Year 9",
    topicId: "VC2M9A04",
    topicLabel: "Find the gradient of a line segment, the midpoint of the line interval and the distance between 2 distinct points",
    topic: "Coordinate geometry",
    h1: "Year 9 Coordinate Geometry Worksheets",
    subtitle: "Gradient, midpoint, distance between two points.",
    intro:
      "Year 9 coordinate geometry is essentially three formulas - gradient, midpoint, distance - applied to a long list of varied problems. These worksheets drill all three and combine them in the multi-part questions VCAA loves to set.",
    whatsCovered: [
      "Gradient formula and interpretation",
      "Midpoint of two points",
      "Distance between two points (Pythagoras based)",
      "Identifying parallel vs perpendicular lines",
      "Multi-step problems combining all three",
    ],
    metaTitle: "Year 9 Coordinate Geometry Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 9 coordinate geometry worksheets aligned to the Victorian Curriculum. 10 questions on gradient, midpoint and distance with worked solutions.",
  },
  {
    slug: "year-9-exponent-laws",
    yearLevel: "Year 9",
    topicId: "VC2M9A01",
    topicLabel: "Apply the exponent laws to numerical expressions with positive integer exponents and the zero exponent",
    topic: "Exponent laws",
    h1: "Year 9 Exponent Laws Worksheets & Practice Tests",
    subtitle: "Index laws extended to variables and longer expressions.",
    intro:
      "Year 9 extends the exponent laws from Year 8 numbers to algebraic variables and longer expressions. These worksheets give your student practice mixing the laws in single questions - the format that catches them out on tests.",
    whatsCovered: [
      "Product, quotient and power-of-a-power laws applied to variables",
      "Zero exponent in algebraic expressions",
      "Negative exponents (preview)",
      "Simplifying multi-step exponent problems",
      "Mixed-rule questions with multiple bases",
    ],
    metaTitle: "Year 9 Exponent Laws Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 9 exponent law worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on index law application to variables.",
  },
  {
    slug: "year-9-scientific-notation",
    yearLevel: "Year 9",
    topicId: "VC2M9M02",
    topicLabel: "Solve problems involving very small and very large measurements, timescales and intervals expressed in scientific notation",
    topic: "Scientific notation",
    h1: "Year 9 Scientific Notation Worksheets",
    subtitle: "Standard form, conversions, calculations with very large and very small numbers.",
    intro:
      "Year 9 introduces scientific notation as the way to handle astronomically large and microscopically small numbers cleanly. These worksheets give your student practice converting both ways and performing operations in standard form.",
    whatsCovered: [
      "Converting between standard form and decimal form",
      "Multiplying and dividing in scientific notation",
      "Adding and subtracting (matching powers first)",
      "Comparing the size of numbers in standard form",
      "Real-world applications (astronomy, microbiology, physics)",
    ],
    metaTitle: "Year 9 Scientific Notation Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 9 scientific notation worksheets aligned to the Victorian Curriculum. 10 questions on standard form conversions and calculations.",
  },
  {
    slug: "year-9-simple-interest",
    yearLevel: "Year 9",
    topicId: "VC2M9A06",
    topicLabel: "Use mathematical modelling to solve applied problems involving change, including financial contexts involving simple interest",
    topic: "Simple interest",
    h1: "Year 9 Simple Interest Worksheets",
    subtitle: "I = PRT - the Year 9 financial maths foundation.",
    intro:
      "Year 9 students should be comfortable with the simple interest formula in both directions - finding the interest, and rearranging for principal, rate or time. These worksheets give your student a steady set of applied problems across each variation.",
    whatsCovered: [
      "Calculating simple interest using I = PRT",
      "Rearranging for principal, rate or time",
      "Converting between annual and monthly rates",
      "Total amount = P + I problems",
      "Comparing simple interest scenarios",
    ],
    metaTitle: "Year 9 Simple Interest Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 9 simple interest worksheets aligned to the Victorian Curriculum. 10 financial maths questions with worked solutions.",
  },
  {
    slug: "year-9-statistics",
    yearLevel: "Year 9",
    topicId: "VC2M9ST04",
    topicLabel: "Choose appropriate forms of display or visualisation for a given type of data",
    topic: "Statistics",
    h1: "Year 9 Statistics Worksheets & Practice Tests",
    subtitle: "Choosing displays, comparing distributions, describing skew.",
    intro:
      "Year 9 statistics is about interpretation - choosing the right display for a dataset, describing whether it's skewed or symmetric, and comparing two datasets fairly. These worksheets practise exactly that judgment.",
    whatsCovered: [
      "Choosing between histograms, stem-and-leaf, dot plots, boxplots",
      "Describing shape (symmetric, skewed, bi-modal)",
      "Comparing two distributions using summary stats",
      "Sampling and its effect on results",
      "Interpreting survey data for bias",
    ],
    metaTitle: "Year 9 Statistics Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 9 statistics worksheets aligned to the Victorian Curriculum. 10 questions on data displays, distributions and sampling.",
  },
  {
    slug: "year-9-probability",
    yearLevel: "Year 9",
    topicId: "VC2M9P01",
    topicLabel: "List all outcomes for two-step chance experiments both with and without replacement",
    topic: "Probability",
    h1: "Year 9 Probability Worksheets & Practice Tests",
    subtitle: "With/without replacement, multi-step events, relative frequency.",
    intro:
      "Year 9 probability mostly distinguishes \"with replacement\" from \"without replacement\" in two-step experiments. These worksheets give your student varied tree diagrams, tables and worded scenarios so the rule for adjusting the second draw becomes automatic.",
    whatsCovered: [
      "Tree diagrams with and without replacement",
      "Tables for two-step experiments",
      "And vs or probability questions",
      "Calculating relative frequency from data",
      "Designing simulations to estimate probabilities",
    ],
    metaTitle: "Year 9 Probability Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 9 probability worksheets aligned to the Victorian Curriculum. 10 questions on two-step events, replacement and relative frequency.",
  },

  // ===== Year 10 =====
  {
    slug: "year-10-simultaneous-equations",
    yearLevel: "Year 10",
    topicId: "VC2M10A09",
    topicLabel: "Solve simultaneous linear equations, using algebraic and graphical techniques",
    topic: "Simultaneous equations",
    h1: "Year 10 Simultaneous Equations Worksheets",
    subtitle: "Substitution, elimination, graphical - all three methods.",
    intro:
      "Simultaneous equations are one of the most-tested Year 10 topics. These worksheets give your student practice on all three solution methods - substitution, elimination, graphical - plus applied problems that need the student to set up the system before solving.",
    whatsCovered: [
      "Solving by substitution",
      "Solving by elimination",
      "Solving graphically (intersection of two lines)",
      "Recognising no solution / infinite solutions",
      "Word problems requiring setup of two equations",
    ],
    metaTitle: "Year 10 Simultaneous Equations Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 10 simultaneous equations worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on substitution, elimination and graphical.",
  },
  {
    slug: "year-10-quadratic-equations",
    yearLevel: "Year 10",
    topicId: "VC2M10A13",
    topicLabel: "Solve simple quadratic equations using a range of strategies, including null factor law",
    topic: "Quadratic equations",
    h1: "Year 10 Quadratic Equations Worksheets",
    subtitle: "Null factor law, factorising, completing the square preview.",
    intro:
      "Year 10 quadratic equations expand past null factor law into more varied factorising patterns. These worksheets give your student practice on each method so they're not relying on one approach when the test asks something unfamiliar.",
    whatsCovered: [
      "Solving by null factor law from factorised form",
      "Solving by first factorising a monic quadratic",
      "Solving simple non-monic quadratics",
      "Completing the square (preview of Methods)",
      "Word problems leading to a quadratic equation",
    ],
    metaTitle: "Year 10 Quadratic Equations Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 10 quadratic equations worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions on null factor law and factorising.",
  },
  {
    slug: "year-10-quadratic-factorising",
    yearLevel: "Year 10",
    topicId: "VC2M10A04",
    topicLabel: "Expand binomial products and factorise monic quadratic expressions using a variety of strategies",
    topic: "Quadratic factorising",
    h1: "Year 10 Quadratic Factorising Worksheets",
    subtitle: "Expand, factorise, difference of squares - the building blocks.",
    intro:
      "Year 10 expects students to fluently expand and factorise quadratics. These worksheets give the structured repetition needed to make the pattern recognition automatic - critical for VCE Methods.",
    whatsCovered: [
      "Expanding binomial products (FOIL)",
      "Factorising x^2 + bx + c",
      "Difference of two squares",
      "Perfect-square trinomials",
      "Mixed-format expand and factorise problems",
    ],
    metaTitle: "Year 10 Quadratic Factorising Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 10 quadratic factorising worksheets aligned to the Victorian Curriculum. 10 questions on expanding and factorising with worked solutions.",
  },
  {
    slug: "year-10-trigonometry",
    yearLevel: "Year 10",
    topicId: "VC2M10M03",
    topicLabel: "Solve practical problems by applying Pythagoras' theorem and trigonometry to right-angled triangles",
    topic: "Trigonometry",
    h1: "Year 10 Trigonometry Worksheets & Practice Tests",
    subtitle: "Pythagoras + SOHCAHTOA in applied contexts, including bearings.",
    intro:
      "Year 10 trig is the practical version - bearings, angles of elevation and depression, three-dimensional problems. These worksheets give your student real-context problems where they have to draw the triangle first, then choose the right tool.",
    whatsCovered: [
      "Choosing between Pythagoras and trig for a given problem",
      "Angle of elevation and depression",
      "Bearings (three-figure and compass)",
      "Combined trig + Pythagoras problems",
      "3D trig (diagonal of a rectangular prism)",
    ],
    metaTitle: "Year 10 Trigonometry Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 10 trigonometry worksheets aligned to the Victorian Curriculum. 10 applied questions on Pythagoras, SOHCAHTOA, bearings and elevation.",
  },
  {
    slug: "year-10-surface-area-volume",
    yearLevel: "Year 10",
    topicId: "VC2M10M01",
    topicLabel: "Solve problems involving the surface area and volume of composite objects",
    topic: "Surface area and volume",
    h1: "Year 10 Surface Area & Volume Worksheets",
    subtitle: "Composite objects, real-world capacity, optimisation flavours.",
    intro:
      "Year 10 surface area and volume problems combine multiple shapes into one composite object. These worksheets push your student into varied splitting-and-summing problems that are common on practice tests and SACs.",
    whatsCovered: [
      "Composite solids (prism + cylinder, two prisms)",
      "Subtraction method for hollow / drilled objects",
      "Surface area of composite shapes (careful about hidden faces)",
      "Mixed capacity and volume problems",
      "Real-world applications (tanks, packaging)",
    ],
    metaTitle: "Year 10 Surface Area & Volume Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 10 surface area and volume worksheets aligned to the Victorian Curriculum. 10 composite-object questions with worked solutions.",
  },
  {
    slug: "year-10-linear-equations",
    yearLevel: "Year 10",
    topicId: "VC2M10A07",
    topicLabel: "Solve problems involving linear equations, including those derived from formulas",
    topic: "Linear equations",
    h1: "Year 10 Linear Equations Worksheets & Practice Tests",
    subtitle: "Multi-step equations, equations from formulas, applied problems.",
    intro:
      "Year 10 linear equations are mostly the multi-step variety - fractions on both sides, brackets nested in brackets, and equations derived from rearranged formulas. These worksheets give your student that exact difficulty level so the routine becomes second nature before VCE Methods.",
    whatsCovered: [
      "Multi-step linear equations with brackets",
      "Equations with fractions on both sides",
      "Rearranging formulas to make a variable the subject",
      "Solving equations derived from worded scenarios",
      "Equations leading to fractional or decimal solutions",
    ],
    metaTitle: "Year 10 Linear Equations Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 10 linear equations worksheets aligned to the Victorian Curriculum. 10 multi-step questions with worked solutions.",
  },
  {
    slug: "year-10-linear-inequalities",
    yearLevel: "Year 10",
    topicId: "VC2M10A08",
    topicLabel: "Solve linear inequalities and graph their solutions on a number line",
    topic: "Linear inequalities",
    h1: "Year 10 Linear Inequalities Worksheets",
    subtitle: "Solve, graph on number line, handle sign flips from negatives.",
    intro:
      "Year 10 inequalities mostly mirror equations - with one crucial twist: dividing by a negative flips the sign. These worksheets give your student varied multi-step inequalities and number-line representations to hammer that rule home.",
    whatsCovered: [
      "Solving one-variable linear inequalities",
      "Inequalities with fractions",
      "Inequalities with brackets and like-term collection",
      "Sign-flipping when multiplying / dividing by a negative",
      "Representing the solution on a number line",
    ],
    metaTitle: "Year 10 Linear Inequalities Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 10 linear inequalities worksheets aligned to the Victorian Curriculum. 10 questions with worked solutions and number-line representations.",
  },
  {
    slug: "year-10-algebraic-fractions",
    yearLevel: "Year 10",
    topicId: "VC2M10A03",
    topicLabel: "Apply the 4 operations to simple algebraic fractions with numerical or single variable denominators",
    topic: "Algebraic fractions",
    h1: "Year 10 Algebraic Fractions Worksheets",
    subtitle: "Add, subtract, multiply, divide - and simplify cleanly.",
    intro:
      "Algebraic fractions are a foundational Year 10 skill that VCE Methods leans on heavily. These worksheets isolate the four operations on simple algebraic fractions so your student gets the repetition needed to make finding common denominators automatic.",
    whatsCovered: [
      "Multiplying and dividing algebraic fractions",
      "Adding and subtracting with a common denominator",
      "Simplifying before multiplying / dividing",
      "Single-variable denominators",
      "Mixed-operation problems",
    ],
    metaTitle: "Year 10 Algebraic Fractions Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 10 algebraic fractions worksheets aligned to the Victorian Curriculum. 10 questions on the four operations with worked solutions.",
  },
  {
    slug: "year-10-exponential-equations",
    yearLevel: "Year 10",
    topicId: "VC2M10A14",
    topicLabel: "Solve simple exponential equations",
    topic: "Exponential equations",
    h1: "Year 10 Exponential Equations Worksheets",
    subtitle: "Same-base solving, index manipulation, growth/decay setup.",
    intro:
      "Year 10 exponential equations focus on the same-base technique - getting both sides expressed as a power of the same number and equating exponents. These worksheets give your student varied same-base problems plus the lead-up to logarithms in Year 10A.",
    whatsCovered: [
      "Solving by writing both sides as the same base",
      "Working with negative and fractional exponents",
      "Setting up growth and decay equations",
      "Equations leading to a quadratic in disguise",
      "Word problems involving exponential change",
    ],
    metaTitle: "Year 10 Exponential Equations Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 10 exponential equations worksheets aligned to the Victorian Curriculum. 10 questions on same-base solving with worked solutions.",
  },
  {
    slug: "year-10-coordinate-geometry",
    yearLevel: "Year 10",
    topicId: "VC2M10A10",
    topicLabel: "Solve problems involving gradients of parallel and perpendicular lines",
    topic: "Coordinate geometry",
    h1: "Year 10 Coordinate Geometry Worksheets",
    subtitle: "Parallel, perpendicular, equations of lines from conditions.",
    intro:
      "Year 10 coordinate geometry adds parallel and perpendicular gradients to the Year 9 toolkit. These worksheets give your student practice writing the equation of a line from varied conditions - the format that shows up on every Year 10 Methods practice test.",
    whatsCovered: [
      "Identifying parallel vs perpendicular gradients",
      "Equation of a line through a point with given gradient",
      "Equation of a line through two points",
      "Equation of a line parallel/perpendicular to another",
      "Distance and midpoint applied to gradient questions",
    ],
    metaTitle: "Year 10 Coordinate Geometry Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 10 coordinate geometry worksheets aligned to the Victorian Curriculum. 10 questions on parallel, perpendicular and equation-of-line problems.",
  },
  {
    slug: "year-10-compound-interest",
    yearLevel: "Year 10",
    topicId: "VC2M10A15",
    topicLabel: "Use mathematical modelling to solve applied problems involving inverse proportion, growth and decay, including compound interest",
    topic: "Compound interest",
    h1: "Year 10 Compound Interest Worksheets",
    subtitle: "Growth, decay, compound interest in applied contexts.",
    intro:
      "Year 10 financial maths jumps from simple to compound interest, and adds general growth/decay scenarios. These worksheets give your student practice across each variation - calculating final value, finding the principal, finding time.",
    whatsCovered: [
      "Calculating compound interest using A = P(1 + r)^n",
      "Finding the principal given the final amount",
      "Comparing simple vs compound interest",
      "Population growth and depreciation problems",
      "Different compounding frequencies (annual, quarterly, monthly)",
    ],
    metaTitle: "Year 10 Compound Interest Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 10 compound interest worksheets aligned to the Victorian Curriculum. 10 questions on growth, decay and compound interest with worked solutions.",
  },
  {
    slug: "year-10-statistics",
    yearLevel: "Year 10",
    topicId: "VC2M10ST01",
    topicLabel: "Compare data distributions for continuous numerical variables using quartiles and interquartile range and appropriate displays including boxplots",
    topic: "Statistics",
    h1: "Year 10 Statistics Worksheets & Practice Tests",
    subtitle: "Quartiles, IQR, boxplots, comparing distributions.",
    intro:
      "Year 10 statistics is heavy on boxplots, quartiles and the interquartile range. These worksheets give your student varied datasets so they can construct boxplots accurately and compare two distributions using their five-number summaries.",
    whatsCovered: [
      "Calculating Q1, Q2 (median) and Q3 from a dataset",
      "Interquartile range and outliers",
      "Constructing boxplots from raw data",
      "Comparing two boxplots side by side",
      "Identifying outliers using 1.5 x IQR rule",
    ],
    metaTitle: "Year 10 Statistics Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 10 statistics worksheets aligned to the Victorian Curriculum. 10 questions on quartiles, IQR and boxplots with worked solutions.",
  },
  {
    slug: "year-10-probability",
    yearLevel: "Year 10",
    topicId: "VC2M10P01",
    topicLabel: "Use the language of conditional statements to investigate conditional probability",
    topic: "Probability",
    h1: "Year 10 Probability Worksheets & Practice Tests",
    subtitle: "Conditional probability, independence, multi-step events.",
    intro:
      "Year 10 probability introduces conditional probability - one of the trickier ideas in school maths. These worksheets give your student practice in tree diagrams, two-way tables and the formal P(A|B) notation that VCE Methods builds on.",
    whatsCovered: [
      "Conditional probability from two-way tables",
      "Tree diagrams with conditional branches",
      "P(A|B) formal notation",
      "Independence of two events",
      "Word problems involving conditional reasoning",
    ],
    metaTitle: "Year 10 Probability Worksheet (Free, Victorian Curriculum) | Tuterly",
    metaDescription:
      "Free Year 10 probability worksheets aligned to the Victorian Curriculum. 10 questions on conditional probability and independence with worked solutions.",
  },
];

export function getLandingPageBySlug(slug) {
  return WORKSHEET_LANDING_PAGES.find((p) => p.slug === slug) ?? null;
}

export function getLandingPagesForYear(year) {
  return WORKSHEET_LANDING_PAGES.filter((p) => p.yearLevel === year);
}

// FAQ content for each worksheet landing page. Pure content - the
// page template at /app/worksheets/[slug]/page.js renders these as
// collapsible <details> below the main content AND emits a matching
// FAQPage JSON-LD block so Google can pick the answers up as rich
// snippets in SERPs.
//
// Rules of thumb when adding new entries:
//   - Real, parent-or-student-helpful answers, not boilerplate
//   - 2-3 sentence answers; over ~300 chars Google ignores anyway
//   - Each page's set must be unique - Google penalises duplicate
//     FAQ content across URLs

export const WORKSHEET_FAQS = {
  // ============================== Year 7 ==============================

  "year-7-algebra": [
    {
      q: "What does Year 7 algebra cover in the Victorian Curriculum?",
      a: "Year 7 introduces variables, algebraic expressions, and simple linear equations. Students learn to substitute values into formulas, apply the distributive law, and translate worded problems into algebraic expressions. It's the foundational year before linear equations get harder in Year 8.",
    },
    {
      q: "What's the most common mistake students make with Year 7 algebra?",
      a: "Treating variables like labels instead of numbers. When students see 3x + 2 = 14, they often guess instead of working backwards. The fix is lots of practice substituting values and verifying solutions - which is exactly what these worksheets drill.",
    },
    {
      q: "How long should a Year 7 student spend on algebra each week?",
      a: "About 30-45 minutes of focused practice per week is enough to keep algebra fluent through the year. Two 15-minute worksheet sessions twice a week works better than one long session.",
    },
    {
      q: "Are these worksheets aligned to VCAA Mathematics 2.0?",
      a: "Yes - every question is generated from the Year 7 Number and Algebra content descriptors in the Victorian Curriculum F-10 Version 2.0. Solutions reference the same descriptor codes so you can match the work back to school content.",
    },
  ],

  "year-7-linear-equations": [
    {
      q: "What kind of linear equations does Year 7 cover?",
      a: "Year 7 focuses on one-variable equations with natural number solutions - so things like 2x + 5 = 17 and 3(x + 4) = 21, but not yet equations with negative or fractional solutions. The aim is fluency with the 'do the same to both sides' move.",
    },
    {
      q: "What order should students solve linear equations in?",
      a: "Undo the operations in reverse PEMDAS order: cancel addition or subtraction first, then multiplication or division. For an equation like 2x + 5 = 17, subtract 5 from both sides first, then divide by 2.",
    },
    {
      q: "Why do students get linear equations wrong even when they understand the steps?",
      a: "Usually it's signs and operations on negatives - especially when subtracting on both sides. The other common slip is forgetting to expand brackets before collecting like terms. These worksheets mix both formats so students can't just apply one pattern.",
    },
    {
      q: "Do students need to know how to graph linear equations in Year 7?",
      a: "Year 7 introduces patterns on the Cartesian plane and tables of values, but full y = mx + c graphing properly arrives in Year 8. For now, plotting points from a rule is the main graphing skill.",
    },
  ],

  "year-7-fractions-decimals": [
    {
      q: "Why do Year 7 students still struggle with fractions?",
      a: "Most students come into Year 7 strong on adding and subtracting fractions but weak on multiplication and division. The 'keep, change, flip' rule for division feels arbitrary unless they've seen why it works - so worked solutions matter more here than in other topics.",
    },
    {
      q: "Is it OK to use a calculator for Year 7 fraction problems?",
      a: "Not for the calculations themselves - VCAA expects students to multiply and divide fractions and decimals fluently without a calculator at this level. A calculator is OK for checking, not for solving.",
    },
    {
      q: "How are fractions and decimals connected in Year 7?",
      a: "Year 7 students are expected to convert between fractions, decimals, and percentages and to move fluently between the three representations. The same question might be set as 0.6, 3/5, or 60% and students need to spot the equivalence.",
    },
    {
      q: "What comes after fractions and decimals in Year 7?",
      a: "Percentages and ratios build directly on this work. Once students are fluent with fractions and decimals, the percentages and ratios topics feel routine rather than tricky.",
    },
  ],

  "year-7-percentages": [
    {
      q: "What's the easiest way to find a percentage of a quantity?",
      a: "Convert the percentage to a decimal (10% = 0.1, 25% = 0.25), then multiply. For 15% of 80: 0.15 x 80 = 12. This works without a calculator once the decimal-equivalents become automatic.",
    },
    {
      q: "What kinds of percentage problems does Year 7 cover?",
      a: "Year 7 covers finding a percentage of a quantity (15% of 80) and expressing one quantity as a percentage of another (15 is what percent of 60?). Percentage increase, decrease, and error are Year 8 topics.",
    },
    {
      q: "Do students need to know percent conversions by heart?",
      a: "The common ones, yes - 10%, 20%, 25%, 50%, 75% all come up so often that students should know them as decimals and fractions without thinking. The rest can be derived from those.",
    },
    {
      q: "How are percentage word problems different from the calculations?",
      a: "Word problems hide the operation. 'The shirt was $80, now $60' means students have to recognise that the discount is $20, which is 25% of $80. The translation step is where most marks are lost.",
    },
  ],

  "year-7-integers": [
    {
      q: "Why are negative numbers so tricky in Year 7?",
      a: "Students have spent six years working with only positive numbers, so the sign rules feel arbitrary - especially 'subtract a negative becomes plus'. The fix is repetition until the rules become automatic rather than something students try to reason through each time.",
    },
    {
      q: "What's the difference between -3 - 5 and -3 - (-5)?",
      a: "-3 - 5 means starting at -3 and going down 5, landing at -8. -3 - (-5) means starting at -3 and subtracting a negative, which is the same as adding 5, landing at +2. The double-negative is where most students slip.",
    },
    {
      q: "Do students need to know integer multiplication in Year 7?",
      a: "Year 7 focuses on addition and subtraction of integers. Multiplication and division of integers are formally introduced in Year 8, though many teachers preview them once addition and subtraction are solid.",
    },
    {
      q: "What's a quick check students can use on integer answers?",
      a: "If the question involves more negatives than positives in the calculation, the answer should usually be negative - and vice versa. A quick sign-check catches about half of all integer errors before they leave the page.",
    },
  ],

  "year-7-ratios": [
    {
      q: "How are ratios different from fractions?",
      a: "A fraction compares a part to a whole (3/5 of the pizza). A ratio compares two parts to each other (3:5 of red to blue marbles). The arithmetic is the same but the way you read the answer differs.",
    },
    {
      q: "How do students divide a quantity in a given ratio?",
      a: "Add the parts of the ratio to get the total number of shares, then divide the quantity by that total to find one share. For $80 split 3:5, total = 8 shares, one share = $10, so the split is $30 and $50.",
    },
    {
      q: "Why do students get ratio problems wrong?",
      a: "Usually they treat the ratio as a fraction and divide by the second number instead of the total. The other common mistake is leaving the answer in shares ($30 and $50 written as 3 and 5).",
    },
    {
      q: "What real-world contexts use ratios in Year 7?",
      a: "Recipes (mix the cordial 1:4 with water), map scales, currency exchange, and sharing money or items between people are the most common contexts. These worksheets use varied contexts so students can't memorise one type.",
    },
  ],

  "year-7-geometry": [
    {
      q: "What does Year 7 geometry cover?",
      a: "Mostly classification and properties: triangles by sides and angles, quadrilaterals by their properties, and other polygons. Plus transformations (translation, reflection, rotation) on the Cartesian plane.",
    },
    {
      q: "Do Year 7 students need to memorise shape names?",
      a: "Yes - all the basic polygons up to about 10 sides, plus the special quadrilaterals (square, rectangle, rhombus, parallelogram, trapezium, kite). Tests often present unlabelled shapes and ask students to identify which conditions apply.",
    },
    {
      q: "What's the difference between a rhombus and a parallelogram?",
      a: "A rhombus is a parallelogram where all four sides are equal length. So every rhombus is a parallelogram, but not every parallelogram is a rhombus. This 'special case' pattern is the trickiest part of Year 7 geometry.",
    },
    {
      q: "How is Year 7 geometry connected to later years?",
      a: "Year 7 builds the vocabulary. Year 8 introduces congruence and similarity (when two shapes match exactly or in ratio), Year 9 brings trigonometry, and Year 10 covers proofs. The vocabulary established here carries all the way through.",
    },
  ],

  "year-7-angles": [
    {
      q: "What angle relationships does Year 7 cover?",
      a: "Year 7 introduces corresponding, alternate, co-interior, and vertically opposite angles - all the relationships that arise when parallel lines are crossed by a transversal. Plus complementary (add to 90) and supplementary (add to 180) angles.",
    },
    {
      q: "What's the easiest way to spot alternate angles?",
      a: "Alternate angles form a Z-shape (or backwards Z) across two parallel lines and a transversal. Co-interior angles form a C-shape (or backwards C). Drawing the letter on top of the figure helps students identify which pair the question is asking about.",
    },
    {
      q: "Why is the triangle angle sum 180 degrees?",
      a: "It's a consequence of parallel-line angle relationships - if you draw a line parallel to one side of a triangle through the opposite vertex, the angles at that vertex form a straight line, which sums to 180. This proof is part of Year 7.",
    },
    {
      q: "Are there other polygons whose angle sums students need to know?",
      a: "Quadrilateral (360), pentagon (540), hexagon (720) - all derived from the triangle sum by splitting the polygon into triangles. The general rule (n - 2) x 180 isn't formally required at Year 7 but many teachers introduce it.",
    },
  ],

  "year-7-area-perimeter": [
    {
      q: "What area and perimeter formulas does Year 7 require?",
      a: "Rectangles (length x width), squares (side squared), triangles (half x base x height), and parallelograms (base x height). Year 8 builds on this with composite shapes and circles.",
    },
    {
      q: "Why is the triangle area formula a half?",
      a: "Because a triangle is exactly half a parallelogram with the same base and height - you can prove this by cutting a parallelogram diagonally. Most Year 7 students remember the formula but not why; the worksheets occasionally test the reasoning.",
    },
    {
      q: "How do students handle parallelograms when the height isn't given?",
      a: "The height must be perpendicular to the base, not the slanted side. This catches a lot of students who multiply the two visible side lengths instead of base x perpendicular height.",
    },
    {
      q: "What units do answers need to be in?",
      a: "Always include units. Area answers use squared units (cm^2, m^2). Perimeter uses linear units (cm, m). Marks are routinely deducted for missing or wrong units even when the number is correct.",
    },
  ],

  "year-7-volume": [
    {
      q: "What does Year 7 volume cover?",
      a: "The volume of right prisms - mostly rectangular and triangular prisms - using the formula 'area of cross-section x length'. Year 8 extends this to capacity in litres and Year 9 brings in cylinders.",
    },
    {
      q: "What does 'right prism' mean exactly?",
      a: "A right prism has its top and bottom faces parallel and the sides perpendicular to them. The cross-section (shape of the top and bottom) stays the same all the way through. Examples: rectangular boxes, triangular toblerone bars.",
    },
    {
      q: "How do students approach a tricky volume word problem?",
      a: "Identify the cross-section first, calculate its area, then multiply by the length perpendicular to that cross-section. For a swimming pool, the cross-section is usually the side view (a rectangle or trapezium).",
    },
    {
      q: "What units does Year 7 volume use?",
      a: "Cubic units - cm^3 or m^3. Capacity (mL, L) arrives in Year 8 with the relationship 1 mL = 1 cm^3. For Year 7, sticking to cubic units is enough.",
    },
  ],

  "year-7-circles": [
    {
      q: "Why is pi about 3.14?",
      a: "Pi is the ratio of any circle's circumference to its diameter - it's the same number no matter how big or small the circle is. The actual value never terminates or repeats, so 3.14 (or 22/7) is a working approximation.",
    },
    {
      q: "What circle formulas does Year 7 use?",
      a: "Year 7 covers the circumference (C = pi x diameter or 2 x pi x radius). Area of a circle is mostly a Year 8 topic and isn't required at Year 7 level.",
    },
    {
      q: "How do students decide whether to use diameter or radius?",
      a: "Whichever the question gives. If only the radius is given, double it for the diameter. C = pi x d and C = 2 x pi x r are the same formula written two ways.",
    },
    {
      q: "Why might my child's answer not match the textbook exactly?",
      a: "Because of how pi is rounded. If the textbook uses pi = 3.14 and your child used 3.14159, answers will differ slightly. Most VCAA assessments accept either as long as the working is shown.",
    },
  ],

  "year-7-statistics": [
    {
      q: "What's the difference between mean, median, and mode?",
      a: "Mean is the average (add up all values, divide by the count). Median is the middle value when the data is sorted. Mode is the most common value. Range is the difference between the largest and smallest.",
    },
    {
      q: "When does median matter more than mean?",
      a: "When the dataset has outliers - one very large or small value pulls the mean but not the median. For house prices or incomes, median is the more honest 'typical' value.",
    },
    {
      q: "What if there's no mode?",
      a: "If every value appears exactly once, the dataset has no mode. If two values tie for most frequent, the dataset is bimodal. Some questions specifically test these edge cases.",
    },
    {
      q: "Do students need to draw graphs at Year 7 statistics?",
      a: "Yes - dot plots and stem-and-leaf plots are introduced at Year 7, along with describing and comparing distributions. Boxplots and scatterplots arrive in Year 10.",
    },
  ],

  "year-7-probability": [
    {
      q: "What kind of probability questions does Year 7 cover?",
      a: "Single-stage experiments - one coin flip, one die roll, one spinner, one card drawn from a pack. Two-stage experiments (which need tree diagrams or two-way tables) arrive in Year 8.",
    },
    {
      q: "How should probabilities be written?",
      a: "Year 7 accepts fractions, decimals, or percentages, but the cleanest format is usually a fraction in simplest form. For 'pick a heart from a deck', 13/52 = 1/4 is the preferred form.",
    },
    {
      q: "What does 'complementary event' mean?",
      a: "The probability that an event doesn't happen. If P(rain) = 0.3, then P(no rain) = 0.7. Complementary probabilities always add to 1.",
    },
    {
      q: "What's the difference between theoretical and experimental probability?",
      a: "Theoretical probability is what the maths says should happen (P(heads) = 1/2). Experimental probability is what actually happened in a real trial (heads came up 47 times in 100 flips = 0.47). They get closer together as the number of trials increases.",
    },
  ],

  // ============================== Year 8 ==============================

  "year-8-algebra": [
    {
      q: "What does Year 8 algebra cover that Year 7 didn't?",
      a: "Year 8 introduces expanding brackets using the distributive law, factorising by taking out a common factor, and rearranging expressions across both sides of an equation. Year 7 stayed mostly with writing and substituting; Year 8 is where students start manipulating.",
    },
    {
      q: "How do students factorise an algebraic expression?",
      a: "Find the largest common factor between the terms and pull it out. For 6x + 12, the common factor is 6, leaving 6(x + 2). For 4x^2 + 8x, the common factor is 4x, leaving 4x(x + 2).",
    },
    {
      q: "What's the trickiest part of Year 8 algebra?",
      a: "Keeping track of signs when expanding brackets that have negatives in front. -(x + 3) expands to -x - 3, not -x + 3. This is the single most common mistake on Year 8 tests.",
    },
    {
      q: "How does Year 8 algebra prepare students for Year 9?",
      a: "Year 9 introduces binomial expansion ((x + 2)(x + 3)) and factorising quadratics. Both build directly on the single-bracket distribution and common-factor work that Year 8 cements.",
    },
  ],

  "year-8-linear-equations": [
    {
      q: "What's new in Year 8 linear equations?",
      a: "Graphing on the Cartesian plane (y = mx + c form), reading gradient and y-intercept from a graph, and solving one-variable inequalities. Year 7 stayed algebraic; Year 8 brings the visual side in.",
    },
    {
      q: "What does the gradient of a line mean?",
      a: "How steep the line is - specifically, how much y changes for each unit of x. A gradient of 3 means y goes up 3 for every step right. A negative gradient means the line slopes down.",
    },
    {
      q: "What's the rule for solving inequalities?",
      a: "Same as equations, except: if you multiply or divide both sides by a negative number, flip the inequality sign. Forgetting to flip is the single most common Year 8 inequality mistake.",
    },
    {
      q: "How do students sketch y = mx + c quickly?",
      a: "Start at the y-intercept (the 'c' value), then use the gradient (the 'm' value) to find a second point - rise over run. Connect them with a straight line.",
    },
  ],

  "year-8-pythagoras": [
    {
      q: "What is Pythagoras' theorem in plain English?",
      a: "In a right-angled triangle, the square of the longest side (the hypotenuse) equals the sum of the squares of the other two sides. Written as a^2 + b^2 = c^2 where c is the hypotenuse.",
    },
    {
      q: "How do students find a shorter side, not the hypotenuse?",
      a: "Rearrange the formula: if c^2 = a^2 + b^2, then a^2 = c^2 - b^2. The shorter side equals the square root of the difference of squares, not the sum.",
    },
    {
      q: "When does Pythagoras work?",
      a: "Only in right-angled triangles. If the triangle has no 90-degree angle, Pythagoras doesn't apply - you'd need trigonometry or the cosine rule (Year 9-10 topics).",
    },
    {
      q: "What real-world problems use Pythagoras?",
      a: "Ladder problems (how tall a wall can a ladder reach), TV screen sizes (diagonal measurement), ramp gradients, and the distance between two points on a map. Year 8 introduces these contexts so the abstract formula has somewhere to land.",
    },
  ],

  "year-8-circles": [
    {
      q: "What's the difference between circumference and area of a circle?",
      a: "Circumference is the distance around the circle (the perimeter). Area is the space inside. Different formulas: C = pi x d for circumference, A = pi x r^2 for area.",
    },
    {
      q: "Why is the area formula pi r squared?",
      a: "If you imagine slicing a circle into thin wedges and rearranging them, they approximate a rectangle with height equal to the radius and width equal to half the circumference. So area = r x (1/2 x 2 x pi x r) = pi x r^2.",
    },
    {
      q: "What does Year 8 do with composite shapes?",
      a: "Year 8 introduces composite shapes like semicircles, quadrants, and annulus (a ring shape). Students learn to add and subtract circle parts from rectangles or each other - a key skill for SAC questions.",
    },
    {
      q: "Are exact (in terms of pi) answers acceptable?",
      a: "Yes - many Year 8 questions specifically ask for an exact answer in terms of pi (e.g., 16 pi cm^2). Decimal answers are also accepted, usually to 1 or 2 decimal places.",
    },
  ],

  "year-8-area-perimeter": [
    {
      q: "What changes about area and perimeter in Year 8?",
      a: "The shapes get harder - composite L-shapes, T-shapes, irregular polygons, shapes with cut-outs. The Year 7 formulas still apply but students have to split or subtract shapes themselves.",
    },
    {
      q: "What's the cleanest strategy for a composite shape?",
      a: "Split it into rectangles and triangles where each piece has all dimensions visible. Calculate each piece's area, then add. For shapes with cut-outs, do the whole rectangle minus the cut-out.",
    },
    {
      q: "What do students often miss on composite perimeter problems?",
      a: "Some side lengths aren't directly labelled - students have to work them out from the other dimensions. Missing one of these is the most common Year 8 perimeter error.",
    },
    {
      q: "What units do answers go in?",
      a: "Same as Year 7: perimeter in linear units (cm, m), area in squared units (cm^2, m^2). Capacity (mL, L) is for volume only.",
    },
  ],

  "year-8-volume": [
    {
      q: "What's new about Year 8 volume compared to Year 7?",
      a: "Year 8 adds capacity (mL, L, kL conversions), trapezoidal and other non-rectangular cross-sections, and working back from a known volume to find a missing dimension. Cylinders arrive in Year 9.",
    },
    {
      q: "How do students convert between volume and capacity?",
      a: "1 cm^3 = 1 mL exactly. So a 500 mL water bottle holds 500 cm^3 of water. The conversion is the same whether the container is rectangular, triangular, or any other prism shape.",
    },
    {
      q: "How does capacity relate to litres?",
      a: "1000 mL = 1 L, and 1 L = 1000 cm^3 (or 1000 cubic centimetres). So a fish tank with internal dimensions 50 cm x 30 cm x 40 cm has a volume of 60,000 cm^3 = 60 L.",
    },
    {
      q: "Why does Year 8 work back from volume to find missing dimensions?",
      a: "Real-world problems often state the volume needed (a 20 L planter box) and one or two dimensions, then ask for the third. The reverse calculation - divide volume by the other dimensions - is what shows up on tests.",
    },
  ],

  "year-8-percentages": [
    {
      q: "What's a percentage increase or decrease?",
      a: "An increase or decrease expressed as a percentage of the original. A $50 item raised to $60 is a $10 increase, which is 10/50 = 20% of the original. The formula is (change / original) x 100.",
    },
    {
      q: "How do students do a reverse percentage problem?",
      a: "If $60 is the new price after a 20% increase, divide by 1.2 to get back to the original ($50). For a 20% decrease, divide by 0.8. The 'multiplier' approach saves a lot of working.",
    },
    {
      q: "What's percentage error?",
      a: "How far off a measurement or estimate is from the true value, as a percentage. Formula: (|measured - actual| / actual) x 100. Year 8 introduces this for measurement contexts.",
    },
    {
      q: "Is GST a Year 8 topic?",
      a: "Yes - Year 8 uses 10% GST in financial contexts. Students learn both directions: adding GST (multiply by 1.1) and extracting GST from a total (divide by 1.1).",
    },
  ],

  "year-8-rates": [
    {
      q: "What's a rate in maths?",
      a: "A comparison of two quantities with different units. Speed is a rate (km per hour), so is unit price ($ per kg), density (kg per m^3), and pay (dollars per hour).",
    },
    {
      q: "How do students convert between rate units?",
      a: "Convert each unit separately. To go from km/h to m/s: km to m is x 1000, h to s is /3600, so the rate gets multiplied by 1000/3600 = 5/18. So 36 km/h = 36 x 5/18 = 10 m/s.",
    },
    {
      q: "What's the difference between a ratio and a rate?",
      a: "A ratio compares two quantities with the same units (3 boys to 5 girls). A rate compares two quantities with different units (50 km in 2 hours). The arithmetic looks similar but the interpretation differs.",
    },
    {
      q: "What real-world problems use rates in Year 8?",
      a: "Speed, density, currency exchange, fuel consumption, water flow, and unit pricing for shopping comparisons. These worksheets pull from a mix so students get fluent across contexts.",
    },
  ],

  "year-8-exponents": [
    {
      q: "What are the four index laws?",
      a: "(1) a^m x a^n = a^(m+n) when multiplying. (2) a^m / a^n = a^(m-n) when dividing. (3) (a^m)^n = a^(m x n) for power of a power. (4) a^0 = 1 for any non-zero base.",
    },
    {
      q: "Why does anything to the power of zero equal one?",
      a: "Because of the division law: a^n / a^n = a^(n-n) = a^0. But anything divided by itself is also 1. So a^0 = 1. This is the cleanest justification for an otherwise mysterious rule.",
    },
    {
      q: "What gets students confused about index laws?",
      a: "Adding exponents when they should be multiplying. (a^3)^2 is a^6, not a^5 - the rule is multiplication of exponents for a power of a power, not addition. Worksheets that mix all four laws are the only way to make this stick.",
    },
    {
      q: "Are negative exponents Year 8?",
      a: "Year 8 stays with integer and zero exponents. Negative exponents (a^-1 = 1/a) are formally Year 9, though many teachers preview them once the four basic laws are solid.",
    },
  ],

  "year-8-congruence-similarity": [
    {
      q: "What's the difference between congruent and similar?",
      a: "Congruent shapes are exactly the same - same side lengths and angles. Similar shapes have the same angles but their sides are in proportion - one is a scaled version of the other. Photos enlarged on a printer are similar, not congruent.",
    },
    {
      q: "What are the four triangle congruence conditions?",
      a: "SSS (three equal sides), SAS (two sides and the angle between them), AAS (two angles and a non-included side), and RHS (right angle, hypotenuse, side). Any one of these is enough to prove congruence.",
    },
    {
      q: "Why doesn't SSA prove congruence?",
      a: "Because two triangles can share two sides and a non-included angle yet have different shapes. This is the 'ambiguous case'. RHS works because the right angle removes the ambiguity.",
    },
    {
      q: "How is similarity used in Year 8?",
      a: "Mostly to find missing lengths. If two triangles are similar with a ratio of 2:3, every pair of corresponding sides has the same ratio. This sets up trigonometry in Year 9.",
    },
  ],

  "year-8-statistics": [
    {
      q: "What's the difference between a population and a sample?",
      a: "A population is the whole group you want information about - every Year 8 student in Victoria, say. A sample is a smaller subset of that population, chosen because surveying everyone is impractical.",
    },
    {
      q: "What's a random sample?",
      a: "A sample where every member of the population has an equal chance of being chosen. Random samples are less biased than non-random samples like a 'sample of the first 10 people through the door'.",
    },
    {
      q: "What's biased data?",
      a: "Data collected in a way that systematically favours certain outcomes. Surveying only swimming-club members about how often Victorian kids swim is biased, because swimmers are over-represented.",
    },
    {
      q: "Why is sampling a Year 8 topic?",
      a: "Real statistical work always involves samples - censuses are rare and expensive. Year 8 introduces sample design and bias detection so students can critique data they see in the media.",
    },
  ],

  "year-8-probability": [
    {
      q: "What's a tree diagram used for?",
      a: "Mapping out all possible outcomes of a multi-stage event. Each branch is one possible outcome at one stage. Year 8 introduces two-stage tree diagrams - three coin flips, picking two marbles, etc.",
    },
    {
      q: "What's the difference between 'with' and 'without' replacement?",
      a: "With replacement: the first item is put back before the second is drawn, so each draw has the same probability. Without replacement: the first item stays out, so the second draw's probability changes. This catches a lot of students out.",
    },
    {
      q: "When do students use a two-way table vs a tree diagram?",
      a: "Two-way tables work well when you already have category totals. Tree diagrams are better when probabilities differ at each stage. Venn diagrams suit problems involving 'and / or' overlap between events.",
    },
    {
      q: "What's a complementary event in Year 8?",
      a: "The opposite of an event - if A is 'roll a 6', then 'not A' is 'roll 1, 2, 3, 4, or 5'. P(A) + P(not A) = 1 always. This is one of the most-used probability shortcuts in Year 8 problems.",
    },
  ],

  "year-8-time-zones": [
    {
      q: "Why is time a Year 8 maths topic?",
      a: "Because time arithmetic isn't base-10. Adding 30 minutes to 7:45 isn't the same as adding 0.30 to 7.45. Year 8 formalises the conversions and applies them to durations and time-zone calculations.",
    },
    {
      q: "How do students convert between 12-hour and 24-hour time?",
      a: "For PM times in 24-hour format, add 12 to the hour: 3:30 PM = 15:30. For AM times, the hour stays the same: 9:15 AM = 09:15. Midnight is 00:00, noon is 12:00.",
    },
    {
      q: "How do time zones work?",
      a: "Each zone is offset from UTC (Coordinated Universal Time) by a whole or half number of hours. Melbourne is UTC+10 (or +11 in daylight saving). New York is UTC-5. The difference between zones tells you the time gap.",
    },
    {
      q: "What's the difference between AEST and AEDT?",
      a: "AEST is Australian Eastern Standard Time (UTC+10), used in winter. AEDT is Australian Eastern Daylight Time (UTC+11), used in summer. Daylight saving starts on the first Sunday in October and ends on the first Sunday in April.",
    },
  ],

  // ============================== Year 9 ==============================

  "year-9-quadratics": [
    {
      q: "What's a quadratic function?",
      a: "A function where the highest power of x is 2 - so y = x^2, y = x^2 + 3x, y = 2x^2 - 5x + 1. Their graphs are always parabolas (U-shaped or upside-down U).",
    },
    {
      q: "What's the null factor law?",
      a: "If two things multiply to zero, at least one of them must be zero. So if (x - 3)(x + 5) = 0, then either x - 3 = 0 or x + 5 = 0. This is the main method Year 9 uses to solve quadratics.",
    },
    {
      q: "How do students sketch a parabola?",
      a: "Find the y-intercept (set x = 0), the x-intercepts if they exist (set y = 0 and solve), and the vertex (the turning point). Mark those points and draw a smooth curve.",
    },
    {
      q: "What kind of quadratics does Year 9 solve?",
      a: "Monic quadratics (where the x^2 coefficient is 1) with integer roots, using null factor law after factorising. Quadratic formula and completing the square arrive in Year 10.",
    },
  ],

  "year-9-algebra": [
    {
      q: "What is binomial expansion?",
      a: "Multiplying out a product of two two-term expressions, like (x + 2)(x + 3). The result is x^2 + 5x + 6. The method (FOIL: First, Outer, Inner, Last) is one of the few maths acronyms genuinely worth remembering.",
    },
    {
      q: "How do students factorise a monic quadratic?",
      a: "Find two numbers that multiply to the constant term and add to the x coefficient. For x^2 + 5x + 6, those numbers are 2 and 3, so it factorises as (x + 2)(x + 3). This is the inverse of FOIL.",
    },
    {
      q: "What's difference of two squares?",
      a: "A specific factorising pattern: a^2 - b^2 = (a + b)(a - b). So x^2 - 9 factorises as (x + 3)(x - 3). Recognising this pattern saves a lot of time on quadratic factorising questions.",
    },
    {
      q: "Why does Year 9 spend so much time on factorising?",
      a: "Because every quadratic equation solved in Year 9 or Year 10 starts with factorising. Students who are slow at factorising hit a wall by mid-Year 10. The fluency built in Year 9 pays off for the next four years of maths.",
    },
  ],

  "year-9-linear-equations": [
    {
      q: "What forms can a linear equation take?",
      a: "y = mx + c (gradient-intercept form), ax + by + c = 0 (general form), and special cases like x = k (vertical line) and y = k (horizontal line). Year 9 expects students to sketch any of them.",
    },
    {
      q: "How do students sketch from gradient-intercept form?",
      a: "Plot the y-intercept (the 'c' value) on the y-axis. Then use the gradient (rise/run) to find a second point. Draw a straight line through both points.",
    },
    {
      q: "How do students find the intersection of two lines?",
      a: "Set the equations equal to each other (or use substitution / elimination), solve for x, then substitute back to find y. The intersection point is (x, y). This is a Year 9 preview of simultaneous equations.",
    },
    {
      q: "Are vertical and horizontal lines linear equations?",
      a: "Yes - y = k is a horizontal line at height k, and x = k is a vertical line at position k. Vertical lines have an undefined gradient (rise over zero), which Year 9 introduces formally.",
    },
  ],

  "year-9-trigonometry": [
    {
      q: "What does SOHCAHTOA stand for?",
      a: "Sine = Opposite / Hypotenuse, Cosine = Adjacent / Hypotenuse, Tangent = Opposite / Adjacent. It's a memory trick for the three trig ratios in a right-angled triangle.",
    },
    {
      q: "How do students choose which ratio to use?",
      a: "Look at the two sides involved in the question relative to the given angle. If it's opposite and hypotenuse, use sine. Adjacent and hypotenuse, cosine. Opposite and adjacent, tangent.",
    },
    {
      q: "How do students find a missing angle (not a side)?",
      a: "Set up the trig ratio with the known sides, then apply the inverse function (sin^-1, cos^-1, tan^-1). For sin theta = 0.5, theta = sin^-1(0.5) = 30 degrees.",
    },
    {
      q: "Why does Year 9 trigonometry only cover right-angled triangles?",
      a: "Because non-right-angle trig needs the sine and cosine rules, which are Year 10A and beyond. The SOHCAHTOA toolkit covers right-angled triangles fully but doesn't extend to other shapes.",
    },
  ],

  "year-9-pythagoras": [
    {
      q: "How is Year 9 Pythagoras different from Year 8?",
      a: "Year 9 combines Pythagoras with similarity, scale, ratio, and angle properties - so problems are multi-step rather than 'find the hypotenuse'. Many Year 9 problems also feed into trig.",
    },
    {
      q: "How is Pythagoras used in 3D problems?",
      a: "Find the diagonal of a face first (using 2D Pythagoras), then use that diagonal as one of the shorter sides for a second Pythagoras on the body diagonal. So for a cuboid, body diagonal = sqrt(l^2 + w^2 + h^2).",
    },
    {
      q: "What's an exact answer vs a decimal answer?",
      a: "Exact answers leave surds in (sqrt(2), sqrt(5)) without converting to decimals. Decimal answers give an approximation (1.414, 2.236). VCAA questions usually specify which is required.",
    },
    {
      q: "Why is Pythagoras such a focus across Years 8-10?",
      a: "It's the most-used theorem in school geometry. It underlies trigonometry, coordinate geometry (distance formula), 3D measurement, and circle geometry. Every subsequent topic assumes fluency with it.",
    },
  ],

  "year-9-surface-area-volume": [
    {
      q: "What's the surface area of a cylinder?",
      a: "Two circles (top and bottom) plus the curved side, which unrolls into a rectangle. So SA = 2 x pi x r^2 + 2 x pi x r x h. The 2 x pi x r is the circumference, which becomes the width of the unrolled rectangle.",
    },
    {
      q: "How is Year 9 SA harder than Year 8?",
      a: "Year 9 includes cylinders (curved surfaces) and composite solids (a cylinder on top of a rectangular prism, say). Students have to think about which faces are hidden inside the join and not counted.",
    },
    {
      q: "What's the volume formula for a cylinder?",
      a: "V = pi x r^2 x h - the area of the circular base times the height. Same pattern as a prism: cross-section area times length.",
    },
    {
      q: "How do students approach a composite solid?",
      a: "Split it into individual shapes, calculate the volume or SA of each, then add (for volume) or subtract any hidden faces (for SA). The hidden-face check is what catches Year 9 students out.",
    },
  ],

  "year-9-coordinate-geometry": [
    {
      q: "What's the gradient formula?",
      a: "Gradient = (y2 - y1) / (x2 - x1), where (x1, y1) and (x2, y2) are any two points on the line. Rise over run - how much y changes per unit of x.",
    },
    {
      q: "What's the midpoint formula?",
      a: "Midpoint of (x1, y1) and (x2, y2) is ((x1 + x2) / 2, (y1 + y2) / 2). Average the x's, average the y's. The midpoint of (2, 4) and (6, 8) is (4, 6).",
    },
    {
      q: "How do students find the distance between two points?",
      a: "It's just Pythagoras: distance = sqrt((x2 - x1)^2 + (y2 - y1)^2). The horizontal gap is one shorter side, the vertical gap is the other, the straight-line distance is the hypotenuse.",
    },
    {
      q: "Why does Year 9 coordinate geometry matter?",
      a: "It's the bridge between algebra and geometry. Year 10 uses it heavily for parallel and perpendicular gradients and the equation-of-a-line problems VCE Methods is built on.",
    },
  ],

  "year-9-exponent-laws": [
    {
      q: "How are Year 9 exponent laws different from Year 8?",
      a: "Year 9 extends the laws to algebraic variables and longer expressions. The same rules apply but students mix them in single questions: (2x^3)^2 x x^4 / x^5 needs three different laws.",
    },
    {
      q: "What do students do when bases differ?",
      a: "Index laws only work when bases match. 2^3 x 3^2 can't be simplified into a single power - it stays as 8 x 9 = 72. Students sometimes try to combine unlike bases and get it wrong.",
    },
    {
      q: "What about negative exponents?",
      a: "Year 9 introduces them as a preview: a^-n = 1/a^n. So 2^-3 = 1/8. They become more central in Year 10 once scientific notation arrives.",
    },
    {
      q: "Is the zero exponent a Year 9 topic?",
      a: "Yes - a^0 = 1 for any non-zero a. Introduced in Year 8, extended to variables in Year 9. Most students remember the rule but not why it's true (it follows from the division law).",
    },
  ],

  "year-9-scientific-notation": [
    {
      q: "What's scientific notation?",
      a: "A way of writing very large or very small numbers as a single digit (followed by a decimal) times a power of 10. 65,000,000 in scientific notation is 6.5 x 10^7. 0.00043 is 4.3 x 10^-4.",
    },
    {
      q: "When is scientific notation actually useful?",
      a: "In astronomy (the distance from Earth to the Sun is 1.5 x 10^11 metres), biology (cells around 10^-5 m wide), physics (Planck's constant 6.6 x 10^-34). Most professional science uses it routinely.",
    },
    {
      q: "How do students multiply in scientific notation?",
      a: "Multiply the digits, add the exponents. (3 x 10^4) x (2 x 10^5) = 6 x 10^9. Then check the digit part is between 1 and 10 - if not, adjust the exponent.",
    },
    {
      q: "Why is the digit between 1 and 10?",
      a: "By convention. It keeps the form unique - 65 x 10^6 and 6.5 x 10^7 are the same number, so the 1-to-10 rule picks one canonical form. Some scientific contexts allow other normalisations but Year 9 uses the standard.",
    },
  ],

  "year-9-simple-interest": [
    {
      q: "What's simple interest?",
      a: "Interest calculated only on the original principal, not on accumulated interest. Formula: I = PRT, where P is the principal, R is the rate per year, and T is the time in years.",
    },
    {
      q: "How does simple interest differ from compound interest?",
      a: "Simple interest grows linearly (same dollar amount each year). Compound interest grows exponentially (each year's interest earns interest in subsequent years). Year 10 covers compound; Year 9 stays with simple.",
    },
    {
      q: "How is the rate expressed in the formula?",
      a: "As a decimal, not a percentage. A 5% rate becomes 0.05 in the formula. Forgetting to convert is the most common Year 9 simple-interest error.",
    },
    {
      q: "Do students need to rearrange the formula?",
      a: "Yes. Given any three of the four variables, students should be able to solve for the fourth. So 'find the principal needed to earn $500 interest at 4% over 2 years' is a standard Year 9 question.",
    },
  ],

  "year-9-statistics": [
    {
      q: "What's a skewed distribution?",
      a: "A distribution where one tail is longer than the other. Right-skewed (positive skew) has a longer right tail - household incomes are like this. Left-skewed has a longer left tail. Symmetric distributions have neither.",
    },
    {
      q: "When does Year 9 use a boxplot vs a histogram?",
      a: "Histograms show the full shape of a distribution. Boxplots (formally introduced in Year 10) show the five-number summary. Year 9 uses dot plots, stem-and-leaf, and histograms.",
    },
    {
      q: "What does 'bimodal' mean?",
      a: "A distribution with two peaks. Often indicates two underlying groups in the data - say, men's and women's heights combined. Recognising bimodality is part of Year 9 distribution description.",
    },
    {
      q: "What's a fair sampling method?",
      a: "Random sampling where every member of the population has an equal chance of selection. Year 9 also covers stratified sampling (sampling proportionally from subgroups) and systematic sampling (every nth member).",
    },
  ],

  "year-9-probability": [
    {
      q: "What does 'two-step experiment' mean?",
      a: "A probability experiment with two stages - flip a coin then roll a die, or pick two cards in sequence. Year 9 introduces tree diagrams for these, with branches for each stage.",
    },
    {
      q: "What's 'with replacement' vs 'without replacement'?",
      a: "With replacement: the first item is returned before the second draw, so each stage's probability stays the same. Without replacement: the first item is kept, so the second-stage probability shifts.",
    },
    {
      q: "How does Year 9 handle 'and' / 'or' probabilities?",
      a: "P(A and B) = P(A) x P(B) for independent events. P(A or B) = P(A) + P(B) - P(A and B) using the inclusion-exclusion rule. Year 9 introduces both formally.",
    },
    {
      q: "What's relative frequency?",
      a: "The proportion of times an outcome actually occurred in a real experiment. Tossing a coin 100 times and getting 47 heads gives a relative frequency of 47/100 = 0.47. Long-run relative frequencies approach theoretical probabilities.",
    },
  ],

  // ============================== Year 10 ==============================

  "year-10-simultaneous-equations": [
    {
      q: "What are simultaneous equations?",
      a: "Two or more equations that students need to solve together to find values that satisfy all of them. Most Year 10 work is two equations with two variables (x and y).",
    },
    {
      q: "What are the three solution methods?",
      a: "Substitution (solve one equation for one variable, then sub into the other), elimination (add or subtract the equations to cancel a variable), and graphical (sketch both lines and find the intersection).",
    },
    {
      q: "Which method should students use?",
      a: "Substitution if one equation is already 'y = ...' or 'x = ...'. Elimination if the coefficients line up neatly. Graphical when the question specifically asks for it or as a quick check.",
    },
    {
      q: "When do simultaneous equations have no solution?",
      a: "When the two lines are parallel (same gradient, different y-intercept). When they're the same line (same gradient and y-intercept), there are infinitely many solutions. Year 10 expects students to recognise both cases.",
    },
  ],

  "year-10-quadratic-equations": [
    {
      q: "How does Year 10 quadratic solving differ from Year 9?",
      a: "Year 10 introduces non-monic quadratics (coefficient of x^2 isn't 1), completing the square as a preview of VCE Methods, and the quadratic formula. Year 9 stayed with monic factorising plus null factor law.",
    },
    {
      q: "What's the quadratic formula?",
      a: "For ax^2 + bx + c = 0: x = (-b plus or minus sqrt(b^2 - 4ac)) / 2a. It works for every quadratic, even ones that don't factorise nicely. Most teachers introduce it in Year 10A.",
    },
    {
      q: "What's the discriminant?",
      a: "The b^2 - 4ac inside the quadratic formula. If it's positive, the quadratic has two real solutions. If zero, one repeated solution. If negative, no real solutions (the parabola never touches the x-axis).",
    },
    {
      q: "What real-world problems lead to a quadratic equation?",
      a: "Anything involving area, projectile motion (h = -5t^2 + vt + s), or revenue / profit modelling. Year 10 introduces a few of each so students see why quadratics show up outside textbook abstractions.",
    },
  ],

  "year-10-quadratic-factorising": [
    {
      q: "What's the cleanest way to factorise a monic quadratic?",
      a: "Find two numbers that multiply to the constant term and add to the x coefficient. For x^2 - 7x + 12: factors of 12 that add to -7 are -3 and -4. So (x - 3)(x - 4).",
    },
    {
      q: "How do students factorise a non-monic quadratic?",
      a: "Use the 'ac method' (or 'splitting the middle term'): for ax^2 + bx + c, find factors of ac that sum to b, then split bx into those two terms and factorise by grouping. Year 10A goes deeper into this.",
    },
    {
      q: "What's perfect-square factorisation?",
      a: "A specific pattern: a^2 + 2ab + b^2 = (a + b)^2 and a^2 - 2ab + b^2 = (a - b)^2. So x^2 + 6x + 9 factorises as (x + 3)^2. Recognising the pattern saves time on exam questions.",
    },
    {
      q: "Why is fluent factorising so important in Year 10?",
      a: "Because every Methods topic from now on assumes it - solving equations, sketching parabolas, finding intercepts, completing the square. Students who can't factorise fluently spend twice as long on every Methods question.",
    },
  ],

  "year-10-trigonometry": [
    {
      q: "What does Year 10 add to Year 9 trigonometry?",
      a: "Bearings (three-figure compass directions), angles of elevation and depression, and 3D problems (diagonals of rectangular prisms). The Year 9 SOHCAHTOA toolkit stays the same; the applied contexts get harder.",
    },
    {
      q: "What's the difference between bearing and angle?",
      a: "Bearings are measured clockwise from north and use three figures (045 for 45 degrees east of north, 270 for due west). Standard angles are measured anticlockwise from the positive x-axis. The conversion catches students out.",
    },
    {
      q: "What's an angle of elevation vs depression?",
      a: "Angle of elevation: the upward angle from the horizontal to an object above you. Angle of depression: the downward angle to an object below. They're always equal as alternate angles between parallel horizontal lines.",
    },
    {
      q: "How does Year 10 handle a 3D trig problem?",
      a: "Find the relevant 2D triangle inside the 3D figure first, often a vertical triangle that includes the height. Solve that with SOHCAHTOA or Pythagoras. The trick is identifying which 2D triangle the question is really asking about.",
    },
  ],

  "year-10-surface-area-volume": [
    {
      q: "What's a composite solid?",
      a: "A 3D shape made of two or more simpler shapes - a prism on top of a cylinder, two prisms joined, a sphere with a hole. Year 10 expects students to handle volume and surface area for these.",
    },
    {
      q: "What's the trickiest part of composite surface area?",
      a: "The hidden faces. Where two shapes join, the contact faces don't count toward surface area. Students who blindly add the SAs of each piece overcount these.",
    },
    {
      q: "Are spheres and cones in Year 10 or 10A?",
      a: "Spheres and cones are Year 10A topics. Mainstream Year 10 focuses on prisms, cylinders, and their composites. If your school follows the Methods pathway, expect Year 10A.",
    },
    {
      q: "How does Year 10 SA differ from Year 9?",
      a: "Year 10 introduces composite shapes (multiple solids joined), hollow / drilled objects (a cylinder with a hole), and more complex real-world problems (paint coverage, packaging materials). Year 9 stayed with single shapes.",
    },
  ],

  "year-10-linear-equations": [
    {
      q: "What's new about Year 10 linear equations?",
      a: "Multi-step equations with brackets and fractions on both sides, plus equations derived from rearranged formulas (make x the subject of A = B + Cx). Year 10 also covers equations whose solutions involve fractions or decimals.",
    },
    {
      q: "How do students approach an equation with fractions?",
      a: "Multiply both sides by the lowest common denominator to clear all fractions in one move. For x/3 + 1/2 = 4, multiply by 6: 2x + 3 = 24, then 2x = 21, x = 10.5.",
    },
    {
      q: "What does 'make x the subject' mean?",
      a: "Rearrange the formula so x is alone on one side. For y = 2x + 5, make x the subject: y - 5 = 2x, then x = (y - 5) / 2. Same algebra as solving an equation.",
    },
    {
      q: "Why are multi-step equations so important for VCE Methods?",
      a: "Methods spends a huge fraction of its time rearranging and solving equations within longer problems. Students who plateau at single-step equations stall in Year 11. Fluency built in Year 10 carries through.",
    },
  ],

  "year-10-linear-inequalities": [
    {
      q: "What's an inequality?",
      a: "A statement that two expressions are not equal but in a specific relationship - greater than (>), less than (<), greater than or equal to (>=), less than or equal to (<=). Solving them gives a range of values, not a single number.",
    },
    {
      q: "What's the key rule for inequalities?",
      a: "If you multiply or divide both sides by a negative number, you must flip the inequality sign. So -2x > 4 becomes x < -2 (note the flip). Forgetting this is the single most common Year 10 inequality mistake.",
    },
    {
      q: "How do students represent inequality solutions on a number line?",
      a: "Open circle for strict (< or >), filled circle for inclusive (<= or >=). Arrow extending in the direction of the solution. For x > 3, open circle at 3, arrow pointing right.",
    },
    {
      q: "Are quadratic inequalities a Year 10 topic?",
      a: "Mainstream Year 10 stays with linear inequalities. Quadratic inequalities (where x^2 < 9 or similar) arrive in Year 11 Methods. The technique - sketch the parabola, identify where it's below/above zero - is a Methods skill.",
    },
  ],

  "year-10-algebraic-fractions": [
    {
      q: "What's an algebraic fraction?",
      a: "A fraction with at least one variable in it - 3/x, (x + 1)/2, (x^2 - 1)/(x + 1). Year 10 covers the four operations on simple algebraic fractions plus solving equations that involve them.",
    },
    {
      q: "How do students add algebraic fractions?",
      a: "Find a common denominator, just like with numeric fractions. For 2/x + 3/y, the common denominator is xy, giving (2y + 3x) / xy. The common denominator step is what most students forget.",
    },
    {
      q: "How do students multiply algebraic fractions?",
      a: "Multiply numerators, multiply denominators, then simplify by cancelling common factors. The simplification step often involves factorising first - which is why fluent factorising matters.",
    },
    {
      q: "Why are algebraic fractions a Year 10 priority?",
      a: "Because VCE Methods uses them constantly - derivative quotients, rational functions, partial fractions in Specialist. Students who can't simplify algebraic fractions struggle from Methods Unit 1 onwards.",
    },
  ],

  "year-10-exponential-equations": [
    {
      q: "What's an exponential equation?",
      a: "An equation where the unknown is in the exponent - 2^x = 32, 3^(x + 1) = 81. Year 10 introduces the same-base method to solve these without logarithms.",
    },
    {
      q: "What's the same-base method?",
      a: "Rewrite both sides as a power of the same base, then equate exponents. For 2^x = 32: rewrite 32 as 2^5, so 2^x = 2^5, therefore x = 5. Works whenever both sides can be expressed in a common base.",
    },
    {
      q: "What does Year 10 do when same-base doesn't work?",
      a: "Mostly the questions are chosen so same-base does work. For cases where it doesn't (2^x = 7), logarithms are needed - that's Year 10A territory.",
    },
    {
      q: "Where do exponential equations show up outside school?",
      a: "Compound interest, population growth, radioactive decay, viral spread, cooling. Anywhere a quantity changes by a fixed proportion per unit of time, there's an exponential equation underneath.",
    },
  ],

  "year-10-coordinate-geometry": [
    {
      q: "What's special about parallel lines' gradients?",
      a: "Parallel lines have equal gradients. So if one line has gradient 3, any line parallel to it also has gradient 3. The y-intercepts differ unless they're the same line.",
    },
    {
      q: "What's special about perpendicular lines' gradients?",
      a: "Perpendicular gradients multiply to -1. So a line perpendicular to y = 3x + 2 has gradient -1/3. Recognising this saves a lot of working on Year 10 geometry questions.",
    },
    {
      q: "How do students find the equation of a line from a point and gradient?",
      a: "Use point-gradient form: y - y1 = m(x - x1). Then rearrange into y = mx + c form. For point (2, 5) and gradient 3: y - 5 = 3(x - 2), so y = 3x - 1.",
    },
    {
      q: "What does Year 10 coordinate geometry feed into?",
      a: "Year 11 Methods uses these results constantly in calculus (tangent and normal lines), function transformations, and applications. Year 10 sets up the geometric language Methods relies on.",
    },
  ],

  "year-10-compound-interest": [
    {
      q: "What's the compound interest formula?",
      a: "A = P(1 + r)^n, where A is the final amount, P is the principal, r is the rate per period (as a decimal), and n is the number of periods. For monthly compounding over a year at 12%, r = 0.01 and n = 12.",
    },
    {
      q: "How does compound interest differ from simple interest?",
      a: "Simple interest pays the same dollar amount each year (based on the original principal). Compound interest pays interest on the principal plus accumulated interest, so the dollar amounts grow each year.",
    },
    {
      q: "What's compounding frequency?",
      a: "How often interest is added to the balance. Annual (once a year), semi-annual (twice), quarterly (four times), monthly (twelve), daily (365). More frequent compounding gives a higher final amount for the same nominal rate.",
    },
    {
      q: "Is the formula the same for depreciation?",
      a: "Almost - depreciation uses A = P(1 - r)^n, with a minus instead of a plus. A car worth $30,000 depreciating 15% per year for 4 years: A = 30000 x (0.85)^4 = $15,660.",
    },
  ],

  "year-10-statistics": [
    {
      q: "What's the interquartile range?",
      a: "Q3 - Q1, the spread of the middle 50% of the data. It's less sensitive to outliers than the full range. IQR is the headline measure of spread for skewed data.",
    },
    {
      q: "What's a five-number summary?",
      a: "Minimum, Q1, median, Q3, maximum. The five numbers that define a boxplot. Year 10 expects students to calculate it from raw data and use it to compare distributions.",
    },
    {
      q: "How do students identify outliers?",
      a: "Using the 1.5 x IQR rule: any value more than 1.5 IQR below Q1 or above Q3 is an outlier. Some textbooks use 3 x IQR for 'extreme outliers'. The 1.5 rule is the Year 10 standard.",
    },
    {
      q: "Why do statisticians prefer boxplots over histograms sometimes?",
      a: "Boxplots compress a dataset to five key numbers, making side-by-side comparisons of multiple distributions easy. Histograms are richer but harder to compare at a glance. Year 10 introduces side-by-side boxplots.",
    },
  ],

  "year-10-probability": [
    {
      q: "What's conditional probability?",
      a: "The probability of event A happening, given that event B has already happened. Written P(A|B). For 'probability of having the flu given a positive test', P(flu | positive test) depends on the test's accuracy.",
    },
    {
      q: "What's the conditional probability formula?",
      a: "P(A|B) = P(A and B) / P(B). Year 10 introduces this for two-way table and tree-diagram contexts. The formal definition extends in Year 11 Methods.",
    },
    {
      q: "When are two events independent?",
      a: "When the occurrence of one doesn't change the probability of the other. P(A|B) = P(A) - and equivalently P(A and B) = P(A) x P(B). Independence is a common Year 10 test question.",
    },
    {
      q: "Why does conditional probability trip students up?",
      a: "Because the language 'given that' isn't always explicit. Students have to spot when a question is implicitly conditional - 'given the test was positive, what's the probability...' - and apply the conditional formula rather than the simple probability.",
    },
  ],
};

export function getFaqsForSlug(slug) {
  return WORKSHEET_FAQS[slug] ?? [];
}

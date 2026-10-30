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
      q: "What does Year 7 algebra cover in the Australian Curriculum?",
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
      q: "Do these worksheets follow the Australian Curriculum?",
      a: "Yes - every question is written to the Year 7 number and algebra content of the Australian Curriculum (Version 9), which every state teaches in some form. Victoria, NSW and WA use their own versions, but the maths at this level is the same.",
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
      a: "Not for the calculations themselves - the curriculum expects students to multiply and divide fractions and decimals fluently without a calculator at this level. A calculator is OK for checking, not for solving.",
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
      a: "Because of how pi is rounded. If the textbook uses pi = 3.14 and your child used 3.14159, answers will differ slightly. Most school assessments accept either as long as the working is shown.",
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
      a: "A population is the whole group you want information about - every Year 8 student in Australia, say. A sample is a smaller subset of that population, chosen because surveying everyone is impractical.",
    },
    {
      q: "What's a random sample?",
      a: "A sample where every member of the population has an equal chance of being chosen. Random samples are less biased than non-random samples like a 'sample of the first 10 people through the door'.",
    },
    {
      q: "What's biased data?",
      a: "Data collected in a way that systematically favours certain outcomes. Surveying only swimming-club members about how often Australian kids swim is biased, because swimmers are over-represented.",
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
      a: "Each zone is offset from UTC (Coordinated Universal Time) by a whole or half number of hours. Sydney and Melbourne are UTC+10 (or +11 in daylight saving), and Perth is UTC+8. New York is UTC-5. The difference between zones tells you the time gap.",
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
      a: "Exact answers leave surds in (sqrt(2), sqrt(5)) without converting to decimals. Decimal answers give an approximation (1.414, 2.236). Exam questions usually specify which is required.",
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
      a: "It's the bridge between algebra and geometry. Year 10 uses it heavily for parallel and perpendicular gradients and the equation-of-a-line problems senior Methods maths is built on.",
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
      a: "Year 10 introduces non-monic quadratics (coefficient of x^2 isn't 1), completing the square as a preview of senior Methods maths, and the quadratic formula. Year 9 stayed with monic factorising plus null factor law.",
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
      q: "Why are multi-step equations so important for senior Methods maths?",
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
      a: "Because senior Methods maths uses them constantly - derivative quotients, rational functions, partial fractions in Specialist. Students who can't simplify algebraic fractions struggle from Methods Unit 1 onwards.",
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
  // ===== Added Oct 2026 =====
  "year-7-square-roots": [
    {
      q: "What is a perfect square and which ones should my Year 7 student know?",
      a: "A perfect square is the result of multiplying a whole number by itself, for example 36 = 6 × 6. Year 7 students are expected to be fluent with perfect squares from 1² up to at least 12², so from 1 all the way to 144.",
    },
    {
      q: "How do squares and square roots relate to each other?",
      a: "Squaring a number and taking its square root are inverse operations, meaning they undo each other. Because 8² = 64, we know √64 = 8. Seeing this two-way relationship is the core idea of this topic in the curriculum.",
    },
    {
      q: "What kinds of problems will my child solve using squares and square roots?",
      a: "Students apply squares and square roots to problems such as finding the side length of a square given its area, or working out missing values in simple equations like x² = 81. These problems build the thinking skills needed for geometry and algebra later in Year 7 and beyond.",
    },
  ],
  "year-7-prime-factors": [
    {
      q: "What is prime factorisation and why does Year 7 study it?",
      a: "Prime factorisation means writing a number as a product of its prime number building blocks, using exponent notation where primes repeat. It underpins later topics like highest common factor, lowest common multiple and simplifying fractions.",
    },
    {
      q: "What is the difference between a factor tree and repeated division?",
      a: "Both methods find the same prime factors. A factor tree splits a number into any two factors and keeps branching until all ends are prime. Repeated division divides by the smallest prime each time, working downward until the result is 1. Students should be comfortable with both.",
    },
    {
      q: "How does expanded notation with powers of 10 connect to place value?",
      a: "Expanded notation shows each digit multiplied by its place value as a power of 10. For example, 4 506 = 4 × 10³ + 5 × 10² + 0 × 10¹ + 6 × 10⁰. It deepens understanding of why our number system works the way it does.",
    },
  ],
  "year-7-rounding-estimation": [
    {
      q: "What does 'appropriate rounding' mean in Year 7 maths?",
      a: "It means choosing a level of precision that suits the situation. Rounding a price to the nearest cent is appropriate; rounding it to the nearest hundred dollars usually is not. Students learn to read context clues to decide how many decimal places make sense.",
    },
    {
      q: "How is estimation different from rounding in Year 7?",
      a: "Rounding adjusts a single number to a convenient value. Estimation uses rounded numbers to quickly calculate an approximate answer, which you then compare with your exact result to check it is reasonable.",
    },
    {
      q: "Why does the curriculum ask students to check the reasonableness of computations?",
      a: "A quick estimate catches errors like a misplaced decimal point or a wrong operation before they become a problem. It is a practical habit that applies well beyond the classroom, from grocery shopping to interpreting data.",
    },
  ],
  "year-7-fraction-operations": [
    {
      q: "Why do you need a common denominator for adding and subtracting fractions but not for multiplying?",
      a: "When adding or subtracting, you are combining parts of the same whole, so the parts must be the same size first. When multiplying, you are finding a fraction of a fraction, so you simply multiply the numerators and denominators straight across.",
    },
    {
      q: "What is the 'keep, change, flip' method for dividing fractions?",
      a: "Keep the first fraction as it is, change the division sign to multiplication, then flip the second fraction upside down (its reciprocal). For example, 3/4 ÷ 2/5 becomes 3/4 × 5/2, which equals 15/8 or 1 and 7/8.",
    },
    {
      q: "How do mixed numbers fit into Year 7 fraction work?",
      a: "Students are expected to convert mixed numbers to improper fractions before adding, subtracting, multiplying or dividing, then convert the answer back. It is a key step and a common place for errors to creep in.",
    },
  ],
  "year-7-expressions": [
    {
      q: "What does the distributive law actually mean in Year 7 maths?",
      a: "The distributive law says you can multiply a term outside a bracket by every term inside it. For example, 3(x + 4) becomes 3x + 12. It works for numbers too, so 6 × 23 can be calculated as 6 × 20 + 6 × 3.",
    },
    {
      q: "What is the difference between an expression and an equation at this level?",
      a: "An expression is a maths phrase with no equals sign, such as 2x + 5. An equation sets two expressions equal to each other, like 2x + 5 = 11. Year 7 students learn to write and simplify expressions before they start solving equations.",
    },
    {
      q: "Why do students lose marks when expanding brackets?",
      a: "The most common mistake is only multiplying the first term inside the bracket, forgetting the second. Another frequent error is dropping a negative sign when the term outside the bracket is negative. Worked solutions help students spot exactly where their working goes wrong.",
    },
  ],
  "year-7-tables-of-values": [
    {
      q: "What is a table of values in Year 7 maths?",
      a: "A table of values lists inputs (x) and their matching outputs (y) for a rule or pattern. For example, the rule y = 2x + 1 gives the pairs (0, 1), (1, 3), (2, 5) and so on. Building the table is the first step before drawing a graph.",
    },
    {
      q: "How do I help my child plot points on the Cartesian plane?",
      a: "Remind them to always go along the x-axis first, then up or down the y-axis. A common saying is 'along the corridor, then up the stairs'. Checking that the plotted points form a straight line or a clear pattern is a good way to catch any errors.",
    },
    {
      q: "What kinds of patterns appear in the Year 7 curriculum for this topic?",
      a: "Students work with both visual patterns (like growing dot or tile arrangements) and function rules written with variables. They describe how the output changes as the input increases, and they connect that description to the shape of the graph.",
    },
  ],
  "year-7-angles-in-triangles": [
    {
      q: "Why do the angles in a triangle always add up to 180°?",
      a: "If you tear off the three corners of any triangle and place them side by side, they always form a straight line, which is 180°. This works for every triangle, no matter its shape or size.",
    },
    {
      q: "How do you find the angle sum of a quadrilateral from the triangle rule?",
      a: "Any quadrilateral can be split into two triangles by drawing one diagonal. Each triangle has an angle sum of 180°, so the quadrilateral has an angle sum of 2 × 180° = 360°.",
    },
    {
      q: "Does the interior angle sum rule work for all polygons, not just triangles and quadrilaterals?",
      a: "Yes. A polygon with n sides can be split into (n - 2) triangles, giving an interior angle sum of (n - 2) × 180°. For a pentagon that is 3 × 180° = 540°, for a hexagon it is 4 × 180° = 720°.",
    },
  ],
  "year-7-transformations": [
    {
      q: "What are the three transformations Year 7 students need to know on the Cartesian plane?",
      a: "The three main transformations are translation (sliding a shape), reflection (flipping it across an axis) and rotation (turning it about a point). At Year 7 the focus is on describing how each one changes the coordinates of every point in the shape.",
    },
    {
      q: "How do I find the new coordinates after a reflection across the y-axis?",
      a: "When you reflect a point across the y-axis, the y-coordinate stays the same and the x-coordinate changes sign. So the point (3, 5) becomes (−3, 5). Reflecting across the x-axis works the same way but the x-coordinate stays and the y-coordinate changes sign.",
    },
    {
      q: "What does rotating a point 90° about the origin do to its coordinates?",
      a: "A 90° anticlockwise rotation turns the point (x, y) into (−y, x). A 90° clockwise rotation gives (y, −x). Practising these rules with specific coordinates is one of the most common worksheet activities at this level.",
    },
  ],
  "year-7-dot-plots-stem-and-leaf": [
    {
      q: "What is the difference between a dot plot and a stem-and-leaf plot?",
      a: "A dot plot places one dot above a number line for each data value, making it easy to see clusters and gaps. A stem-and-leaf plot splits each value into a stem (the leading digit) and a leaf (the last digit), so you keep the exact values while still seeing the shape of the data.",
    },
    {
      q: "How do you draw a stem-and-leaf plot in Year 7?",
      a: "List the tens digits (or hundreds, depending on your data) in order down the middle as the stems. Then write each units digit on the correct row as a leaf. Leaves are usually written in order from smallest to largest, and you always include a key showing what one entry means.",
    },
    {
      q: "What does 'describing a distribution' mean at Year 7?",
      a: "It means commenting on the shape (is it spread out or bunched up?), the centre (where most values sit) and any outliers (values that stand apart from the rest). At Year 7 this is mostly done in plain language rather than with formal statistics.",
    },
  ],
  "year-8-recurring-decimals": [
    {
      q: "What is the difference between a terminating and a recurring decimal?",
      a: "A terminating decimal has a finite number of digits after the decimal point, like 0.75. A recurring decimal has one or more digits that repeat forever, like 0.333... Written with a dot or bar above the repeating part.",
    },
    {
      q: "How do I know if a fraction will terminate or recur before I divide?",
      a: "Write the fraction in simplest form and look at the denominator. If its only prime factors are 2s and 5s, the decimal terminates. Any other prime factor, like 3 or 7, means the decimal will recur.",
    },
    {
      q: "How do you convert a recurring decimal back to a fraction?",
      a: "Let x equal the recurring decimal, then multiply both sides by a power of 10 to shift one full repeating block. Subtracting the original equation cancels the repeating part, leaving a whole number you can divide to find the fraction.",
    },
  ],
  "year-8-integer-operations": [
    {
      q: "Why do two negatives make a positive when multiplying?",
      a: "It comes down to the sign rules for multiplication. A negative times a negative gives a positive because each negative reverses the direction on the number line, and two reversals bring you back to positive. Students often confuse this with addition, where two negatives simply give a larger negative.",
    },
    {
      q: "What is the most common mistake Year 8 students make with integer operations?",
      a: "Mixing up the rules for addition and multiplication is very common. For example, treating negative × negative as negative instead of positive. Working through the sign rules step by step, rather than trying to remember shortcuts, helps students avoid this error consistently.",
    },
    {
      q: "How does this topic connect to the rest of Year 8 maths?",
      a: "Integer operations underpin nearly everything in Year 8, including algebra, substitution into formulas and working with rational numbers. A solid understanding here makes topics like linear equations and graphing on the Cartesian plane much more manageable.",
    },
  ],
  "year-8-profit-and-loss": [
    {
      q: "What is the difference between profit and percentage profit?",
      a: "Profit is the dollar amount gained: selling price minus cost price. Percentage profit expresses that gain as a percentage of the cost price, so it lets you compare how good a deal was regardless of the original price.",
    },
    {
      q: "How do students find the original price before a discount?",
      a: "If a price after a 20% discount is $80, then $80 represents 80% of the original. Dividing $80 by 0.8 (or by 80 then multiplying by 100) gives the original price of $100. This reverse-percentage step is a common sticking point in Year 8.",
    },
    {
      q: "Why do Year 8 students use mathematical modelling for these problems?",
      a: "Mathematical modelling means setting up a clear representation of a real situation before calculating. For financial problems it helps students identify what is known, choose the right formula and check whether their answer makes sense in context.",
    },
  ],
  "year-8-linear-problems": [
    {
      q: "What kinds of real-life problems use linear relations in Year 8?",
      a: "Common contexts include mobile phone plans, hourly wages, taxi fares, savings accounts and distance-time problems. Students write an equation, solve it, and interpret the answer in plain language.",
    },
    {
      q: "How is this different from just solving linear equations?",
      a: "Solving equations is one step in the process. In real-life problems students also need to define variables, build the equation from a description, and explain what the answer means in context. That full cycle is what these worksheets practise.",
    },
    {
      q: "What does it mean to compare two linear models?",
      a: "Students might compare two phone plans, say Plan A costs $20 plus $0.10 per text and Plan B costs $5 plus $0.30 per text. They find the number of texts where both plans cost the same, then decide which is cheaper above or below that point.",
    },
  ],
  "year-8-speed-distance-time": [
    {
      q: "What formula do Year 8 students need to know for speed, distance and time?",
      a: "Students need to know speed = distance ÷ time, and be able to rearrange it to find distance = speed × time or time = distance ÷ speed. A formula triangle is a handy memory aid for the rearrangements.",
    },
    {
      q: "How do you convert between km/h and m/s in Year 8?",
      a: "To convert km/h to m/s, divide by 3.6. To go from m/s to km/h, multiply by 3.6. Knowing why this works (1 km = 1000 m, 1 hour = 3600 s) helps students apply it confidently rather than just memorising the rule.",
    },
    {
      q: "What kinds of word problems come up in Year 8 speed, distance and time?",
      a: "Common problems include finding travel time for a road trip, calculating average speed from a race result, and two-stage journeys where speed or direction changes partway. Distance-time graphs are also covered at this level.",
    },
  ],
  "year-8-quadrilaterals": [
    {
      q: "Why do Year 8 students use congruent triangles to study quadrilaterals?",
      a: "Drawing a diagonal splits any quadrilateral into two triangles. If those triangles are congruent, their matching sides and angles must be equal, which is exactly how we prove that opposite sides or angles of a parallelogram are always equal.",
    },
    {
      q: "What is the difference between a rhombus and a square in Year 8 geometry?",
      a: "Both have four equal sides and diagonals that bisect each other at right angles. A square also has four right angles, so it is a special type of rhombus. Students practise identifying which extra property makes the difference.",
    },
    {
      q: "How do students find unknown angles in quadrilateral problems?",
      a: "The interior angles of any quadrilateral add to 360 degrees. For special quadrilaterals like parallelograms or kites, extra properties such as equal opposite angles or a line of symmetry let students set up simple equations to solve for the unknown angle.",
    },
  ],
  "year-8-complementary-events": [
    {
      q: "What is a complementary event in Year 8 maths?",
      a: "A complementary event is everything that can happen apart from the event you are looking at. For example, if the probability of rolling a 6 is 1/6, the complementary event is not rolling a 6, which has a probability of 5/6. The two probabilities always add to 1.",
    },
    {
      q: "How do students use the complement rule to solve problems?",
      a: "Students rearrange the rule P(not A) = 1 minus P(A). If a problem gives the probability of an event happening, they subtract it from 1 to find the probability of it not happening. This is often quicker than listing every other outcome.",
    },
    {
      q: "Why do complementary events add to 1 and not 100?",
      a: "Probability is measured on a scale from 0 to 1, where 1 means certain. When you write probability as a percentage it adds to 100%, but as a decimal or fraction it adds to 1. Both are correct, just different ways of expressing the same idea.",
    },
  ],
  "year-9-measurement-error": [
    {
      q: "What is the difference between absolute error and percentage error?",
      a: "Absolute error is the raw difference between the measured value and the true value, in the original units. Percentage error expresses that gap as a percentage of the true value, making it easier to judge how significant the error actually is.",
    },
    {
      q: "Why do we use relative error instead of just absolute error?",
      a: "An absolute error of 2 cm sounds small when measuring a room but huge when measuring a bolt. Relative error divides the absolute error by the true value, giving a sense of the error in proportion to what is being measured.",
    },
    {
      q: "How do I calculate percentage error in Year 9 maths?",
      a: "Divide the absolute error by the true value, then multiply by 100. For example, if the true length is 50 cm and the measured length is 53 cm, the absolute error is 3 cm, and the percentage error is 3 ÷ 50 × 100 = 6%.",
    },
  ],
  "year-9-direct-proportion": [
    {
      q: "What is direct proportion and how is it taught in Year 9?",
      a: "Two quantities are in direct proportion when they increase or decrease at the same rate, written as y = kx where k is the constant of proportionality. In Year 9, students move beyond simple ratio to set up and solve these equations in practical contexts like speed, fuel consumption and ingredient scaling.",
    },
    {
      q: "How are rates different from ratios at Year 9 level?",
      a: "A ratio compares two quantities of the same kind, such as 3 : 1. A rate compares quantities of different kinds, such as 60 km per hour or $4.50 per kilogram. Year 9 students work with both, including converting between units and choosing the most useful form for a given problem.",
    },
    {
      q: "What kinds of scale problems appear in Year 9 maths?",
      a: "Students read and apply scale ratios on maps and technical drawings, calculate real distances or dimensions from scaled measurements, and work backwards to find what scale was used. Problems often involve unit conversion as an extra step.",
    },
  ],
  "year-9-enlargements": [
    {
      q: "What stays the same and what changes when you enlarge a shape?",
      a: "Angles and the overall shape (similarity) are preserved under an enlargement. Side lengths change by the scale factor, and area changes by the square of the scale factor, so a scale factor of 3 makes the area 9 times larger.",
    },
    {
      q: "What is a scale factor less than 1 called, and how does it work?",
      a: "A scale factor between 0 and 1 produces a reduction: the image is smaller than the original but still similar. For example, a scale factor of 0.5 halves every side length and reduces the area to one quarter of the original.",
    },
    {
      q: "How do students find the centre of enlargement from a diagram?",
      a: "Draw straight lines through each pair of matching vertices on the original and image shapes. The lines all meet at a single point, which is the centre of enlargement. If the image is on the same side as the original, the scale factor is positive.",
    },
  ],
  "year-9-comparing-data": [
    {
      q: "What does it mean for a distribution to be skewed or symmetric?",
      a: "A symmetric distribution has data spread roughly evenly around the centre, like a hill. A skewed distribution has a longer tail on one side, pulling the mean away from the median. Students need to spot this from stem-and-leaf plots and box plots.",
    },
    {
      q: "What is a bi-modal distribution and how do students identify one?",
      a: "Bi-modal means the data has two distinct peaks or clusters rather than one. On a dot plot or histogram it looks like two humps. Students learn to recognise this pattern and explain what it might mean in context.",
    },
    {
      q: "How are back-to-back stem-and-leaf plots different from ordinary ones?",
      a: "A back-to-back plot shares one central stem column, with one data set reading left and the other reading right. This layout makes it easy to compare two groups at a glance, and Year 9 students are expected to draw and interpret them.",
    },
  ],
  "year-9-venn-diagrams-probability": [
    {
      q: "What is the difference between inclusive or and exclusive or in probability?",
      a: "Inclusive or means at least one of the events occurs, including both at once. Exclusive or means exactly one of the two events occurs, not both. Year 9 students need to recognise which version a question is asking about before they calculate.",
    },
    {
      q: "How do Venn diagrams and two-way tables show the same information differently?",
      a: "A two-way table arranges counts into rows and columns by category, making totals easy to read. A Venn diagram shows the same counts as overlapping circles, which makes the and region (the intersection) very visible. Students often find it helpful to convert between the two.",
    },
    {
      q: "What does relative frequency mean and why is it used to estimate probability?",
      a: "Relative frequency is the number of times an outcome occurs divided by the total number of trials or observations. Because we rarely know true theoretical probabilities from real data, relative frequency gives a practical estimate based on what was actually collected.",
    },
  ],
  "year-10-common-factors": [
    {
      q: "What does 'taking out a common factor' actually mean?",
      a: "It means rewriting an expression as a product by dividing every term by the highest common factor and placing that factor outside a pair of brackets. For example, 6x² + 9x becomes 3x(2x + 3).",
    },
    {
      q: "How do students find the highest common factor of algebraic terms?",
      a: "Find the HCF of the coefficients first, then include any variables that appear in every term, using the lowest power of each. For 4x³ and 6x², the HCF is 2x².",
    },
    {
      q: "Why do teachers ask students to 'check by expanding'?",
      a: "Expanding the brackets after factorising multiplies everything back out, so the result should match the original expression exactly. It is a quick, reliable way to catch errors in the factorised form.",
    },
  ],
  "year-10-index-laws": [
    {
      q: "What index laws do Year 10 students need to know for algebra?",
      a: "Students work with the product law, quotient law, power of a power law, zero index and negative index rules. They apply these to algebraic terms with pronumerals and coefficients, not just numbers.",
    },
    {
      q: "What is the difference between the product law and the power law?",
      a: "The product law applies when multiplying two terms with the same base: you add the indices. The power law applies when a power is raised to another power: you multiply the indices. Mixing these up is one of the most common errors at Year 10.",
    },
    {
      q: "Why do students lose marks simplifying index expressions in algebra?",
      a: "The most frequent mistakes are forgetting to apply the index law to the coefficient as well as the pronumeral, and subtracting indices in the wrong order when dividing. Worked solutions make these slip-ups easy to catch and correct.",
    },
  ],
  "year-10-rearranging-formulas": [
    {
      q: "What is the difference between substituting into a formula and rearranging it?",
      a: "Substituting means replacing variables with known numbers to calculate one remaining unknown. Rearranging means using algebraic steps to rewrite the formula so a different variable is by itself on one side, before any numbers are plugged in.",
    },
    {
      q: "Why does Year 10 maths use formulas from science and other subjects?",
      a: "The Australian Curriculum expects students to apply algebra in real contexts, not just abstract exercises. Formulas from physics, geometry and finance give purpose to rearrangement and help students see why the skill matters beyond the maths classroom.",
    },
    {
      q: "My child can substitute numbers fine but freezes when asked to rearrange. What usually helps?",
      a: "The most common fix is treating rearrangement like a balance scale: whatever operation undoes a term on one side must be applied to the other. Practising with simple formulas first, then checking by substituting back in, builds that instinct steadily.",
    },
  ],
  "year-10-equations-with-fractions": [
    {
      q: "What does 'clearing the fractions' mean and why do we do it?",
      a: "Clearing the fractions means multiplying every term on both sides by the lowest common denominator so no fraction signs remain. It turns a harder-looking equation into a straightforward linear one that is much easier to solve.",
    },
    {
      q: "What mistakes do Year 10 students commonly make with algebraic fraction equations?",
      a: "The most common errors are forgetting to multiply every term (not just the fraction terms) by the LCD, and making sign errors when the numerator contains more than one term. Checking the answer by substituting it back in catches both mistakes quickly.",
    },
    {
      q: "Are algebraic fraction equations in the Year 10 curriculum?",
      a: "Yes, solving linear equations involving simple algebraic fractions is part of Year 10 in the Australian Curriculum, so it is fair game in school assessments and end-of-year exams. In WA it sits in the optional Year 10 content.",
    },
  ],
  "year-10-parabolas-circles-exponentials": [
    {
      q: "What are the four curve types students need to know in Year 10?",
      a: "Students study parabolas (y = ax² + bx + c), circles (x² + y² = r²), hyperbolas (y = k/x) and exponentials (y = aˣ). Each has a distinct shape and set of key features to identify and sketch.",
    },
    {
      q: "What key features should my child be able to identify for each curve?",
      a: "For parabolas: turning point, axis of symmetry and intercepts. For circles: centre and radius. For hyperbolas: asymptotes. For exponentials: the horizontal asymptote and whether the curve shows growth or decay.",
    },
    {
      q: "How do students connect the equation of a curve to its graph?",
      a: "They learn to read values directly from the equation, such as the radius from x² + y² = r², and to use those values to plot key points and features. Worked examples on every worksheet show this process in full.",
    },
  ],
  "year-10-inverse-proportion": [
    {
      q: "What is the difference between direct and inverse proportion?",
      a: "In direct proportion, two quantities increase or decrease together at a constant ratio, written as y = kx. In inverse proportion, one quantity increases as the other decreases, written as y = k ÷ x. Both relationships involve a constant k called the constant of proportionality.",
    },
    {
      q: "How does scaling work with area and volume in Year 10?",
      a: "When lengths are scaled by a factor, area scales by the factor squared and volume scales by the factor cubed. For example, doubling the side length of a shape makes its area 4 times larger and its volume 8 times larger. This is a common source of errors, so it gets plenty of practice in these worksheets.",
    },
    {
      q: "What kinds of real-world problems involve proportion at Year 10 level?",
      a: "Typical problems include speed and travel time (inverse), unit pricing and recipe scaling (direct), shadows and similar figures (direct), and pressure or electrical resistance (inverse). The Australian Curriculum emphasises setting up a model first, then solving it.",
    },
  ],
  "year-10-geometric-reasoning": [
    {
      q: "What is deductive reasoning in Year 10 geometry?",
      a: "Deductive reasoning means building a logical argument from known facts and theorems to reach a conclusion that must be true. In Year 10 geometry, students chain together angle rules, congruence tests and side properties in a structured proof rather than just stating an answer.",
    },
    {
      q: "What are the four triangle congruence tests students need to know?",
      a: "The four tests are SSS (three sides equal), SAS (two sides and the included angle equal), AAS (two angles and a corresponding side equal) and RHS (right angle, hypotenuse and one other side equal). Students need to state which test they are using and show that all required conditions are met.",
    },
    {
      q: "How is a geometry proof different from just solving for a missing angle?",
      a: "Solving for an angle gives a numerical answer, while a proof shows that a general statement is always true. A proof lists each step with a reason, such as a theorem or given information, so the argument holds for any figure that satisfies the starting conditions.",
    },
  ],
  "year-10-networks": [
    {
      q: "What does 'connectedness' mean in a Year 10 networks topic?",
      a: "A network is connected if you can travel from any vertex to any other vertex by following edges. If one or more vertices are isolated or unreachable, the network is disconnected. Students are asked to identify and explain this property in real-world diagrams such as road or communication networks.",
    },
    {
      q: "What is the difference between a path, a trail and a walk in a network?",
      a: "A walk is any route through the network where edges and vertices can be repeated. A trail repeats vertices but not edges. A path repeats neither vertices nor edges. Year 10 students need to distinguish these when describing routes through practical networks.",
    },
    {
      q: "Do Year 10 students need to solve shortest-path algorithms like Dijkstra's?",
      a: "The curriculum focus at Year 10 is on interpreting and describing networks rather than applying formal algorithms. Students work with weighted networks to compare path lengths and reason about efficiency, but full algorithmic methods are more typical of further study.",
    },
  ],
  "year-10-scatterplots": [
    {
      q: "What does 'line of good fit' mean in Year 10 maths?",
      a: "A line of good fit (sometimes called a trend line) is a straight line drawn through a scatterplot so that it sits as close as possible to all the data points. In Year 10 students draw this line by eye, balancing the points above and below it roughly equally.",
    },
    {
      q: "How do students describe the association between two variables in a scatterplot?",
      a: "Students comment on three things: direction (positive means both variables increase together, negative means one rises as the other falls), form (whether the pattern looks roughly linear or curved), and strength (how tightly the points cluster around the line).",
    },
    {
      q: "What is the difference between correlation and causation at Year 10 level?",
      a: "Correlation means two variables tend to move together in the data. Causation means one variable actually causes the change in the other. A scatterplot can show correlation, but students need to reason carefully before concluding that one variable causes another.",
    },
  ],
  "year-10-two-way-tables": [
    {
      q: "What is a two-way table in Year 10 maths?",
      a: "A two-way table displays data for two categorical variables at the same time, with one variable across the rows and the other across the columns. Each cell shows how many data values fall into both categories. Students use the totals to spot patterns and discuss possible relationships.",
    },
    {
      q: "How do students decide if two variables are related using a two-way table?",
      a: "They compare percentages across rows or columns. If the percentage breakdown looks similar for every group, the variables are probably not related. If the percentages differ noticeably between groups, that suggests a possible relationship between the two variables.",
    },
    {
      q: "What is the difference between a joint frequency and a marginal frequency?",
      a: "A joint frequency is the count in a single cell inside the table, representing one combination of both categories. A marginal frequency is a row or column total, representing all values for just one category regardless of the other variable.",
    },
  ],
  "year-10-tree-diagrams": [
    {
      q: "What is a tree diagram and why does Year 10 use them?",
      a: "A tree diagram maps every possible outcome of a multi-step experiment as branches, making it easy to list the sample space and read off probabilities. At Year 10, students use them for two- and three-step experiments where tracking outcomes mentally becomes unreliable.",
    },
    {
      q: "How do you find the probability of a combined outcome from a tree diagram?",
      a: "Multiply the probabilities along each branch that leads to the outcome you want. If more than one path gives that outcome, add those products together. This is the foundation of the multiplication and addition rules for probability.",
    },
    {
      q: "How do students show that two events are independent?",
      a: "Two events A and B are independent if P(A and B) equals P(A) × P(B). Students calculate each side separately and compare them. If the values match, the events do not influence each other.",
    },
  ],
  "year-10-logarithmic-scales": [
    {
      q: "What are logarithmic scales and why do Year 10 students study them?",
      a: "A logarithmic scale spaces values by equal multiples rather than equal additions, so each step up represents ten times (or another fixed multiple) the previous value. Year 10 students study them because many real measurements, from earthquake strength to sound loudness, span ranges too wide to show usefully on a normal linear scale.",
    },
    {
      q: "How do I help my child understand the difference between a log scale and a normal scale?",
      a: "A helpful starting point is the Richter scale: a magnitude 6 earthquake is not twice as strong as a magnitude 3, it is one thousand times stronger. Practising with concrete examples like this, then moving to reading values off a printed log scale, builds the intuition quickly.",
    },
    {
      q: "What kinds of real-world contexts appear in Year 10 log scale problems?",
      a: "The Australian Curriculum emphasises applied contexts, so problems typically involve the Richter scale for earthquakes, decibels for sound intensity, pH for acids and bases, and sometimes astronomical distances or population data that spans many orders of magnitude.",
    },
  ],
  "year-10a-surds": [
    {
      q: "What is the difference between a rational and an irrational number?",
      a: "A rational number can be written as a fraction of two integers, such as 3/4 or 2. An irrational number, like √2 or √5, cannot be expressed as an exact fraction and its decimal expansion goes on forever without repeating.",
    },
    {
      q: "How do fractional indices connect to surds?",
      a: "A fractional index is just another way to write a root. For example, x^(1/2) means √x, and x^(1/3) means ³√x. More generally, x^(m/n) means the nth root of x, raised to the power m. Switching fluently between both forms is a key skill for senior maths.",
    },
    {
      q: "Why do students need to learn surds in Year 10A and not just use a calculator?",
      a: "Leaving answers in surd form gives an exact value, which is essential in higher maths where rounding errors accumulate. Year 12 exams regularly require exact surd answers, and the algebraic reasoning practised here underpins work with functions and calculus.",
    },
  ],
  "year-10a-logarithms": [
    {
      q: "What exactly is a logarithm and how is it related to a power?",
      a: "A logarithm answers the question: what power do I raise the base to in order to get this number? For example, log base 2 of 8 equals 3 because 2³ = 8. It is simply another way of writing an index (exponential) statement.",
    },
    {
      q: "How do the three log laws work and when do students need to use them?",
      a: "The product law combines two logs with the same base by adding them, the quotient law subtracts them, and the power law brings a power out to the front as a multiplier. Students use them to simplify expressions, solve log equations and evaluate quantities that would otherwise be awkward to compute.",
    },
    {
      q: "Why do Year 10A students study logarithmic scales like the Richter scale?",
      a: "Logarithmic scales compress very large ranges of values into manageable numbers. The curriculum asks students to see logs in real contexts, and the Richter scale, decibel scale and pH scale are the three most common examples. Understanding why each whole-number step represents a tenfold change is a key skill.",
    },
  ],
  "year-10a-polynomials": [
    {
      q: "What is the remainder theorem and why does it matter at Year 10A?",
      a: "The remainder theorem says that when you divide a polynomial P(x) by (x - a), the remainder equals P(a). It lets students check factors and find remainders quickly without working through full polynomial long division, which is a key skill heading into Methods.",
    },
    {
      q: "How does the factor theorem follow from the remainder theorem?",
      a: "The factor theorem is a special case: if P(a) = 0, the remainder is zero, so (x - a) divides evenly into P(x) and is a factor. Students use this to test candidate values and break a cubic or quartic into linear factors they can then solve.",
    },
    {
      q: "What kinds of problems do these worksheets include?",
      a: "Questions range from identifying polynomial degree and evaluating expressions to polynomial long division, applying both theorems, and fully factorising cubics and quartics to find all real solutions. Every question comes with a worked solution.",
    },
  ],
  "year-10a-exponential-log-equations": [
    {
      q: "What is the inverse relationship between exponential and logarithmic functions?",
      a: "If y = aˣ, then x = logₐy. Each function undoes the other, so applying both in sequence returns you to your starting value. This is why logarithms are the key tool for solving exponential equations.",
    },
    {
      q: "How do you solve an exponential equation like 3ˣ = 20?",
      a: "Take the logarithm of both sides: x = log₃20, which equals log10(20) ÷ log10(3) using the change of base rule. Students then evaluate this on a calculator to get an exact decimal answer.",
    },
    {
      q: "Why do logarithmic equations sometimes produce solutions that must be rejected?",
      a: "The argument of a logarithm must be strictly positive, so any solution that makes the argument zero or negative is undefined and must be discarded. Checking solutions back in the original equation is an essential step at this level.",
    },
  ],
  "year-10a-non-monic-quadratics": [
    {
      q: "What makes a quadratic 'non-monic' and why does it matter?",
      a: "A quadratic is non-monic when the coefficient of x² is not 1, for example 3x² + 10x + 8. It matters because the simple factorising shortcuts from Year 9 no longer work directly, so students need a reliable method like the ac approach.",
    },
    {
      q: "What is the ac method and how does it work?",
      a: "For ax² + bx + c, multiply a × c, then find two numbers that multiply to give ac and add to give b. Split the middle term using those two numbers, then factorise by grouping in pairs. For example, 6x² + 11x + 3 has ac = 18; the pair 9 and 2 works, giving (2x + 3)(3x + 1).",
    },
    {
      q: "When should a student use the quadratic formula instead of factorising?",
      a: "If no whole-number pair satisfies the ac condition, the quadratic may not factorise over the integers. The quadratic formula x = (-b ± √(b² - 4ac)) ÷ 2a always works and is the go-to method for Year 10A and senior maths when factorising fails or feels slow.",
    },
  ],
  "year-10a-function-notation": [
    {
      q: "What is function notation and why does my child need it in Year 10A?",
      a: "Function notation is a precise way to write a rule, such as f(x) = 2x + 3, that makes it clear which variable is the input and which is the output. It is the standard language of senior Mathematical Methods (Mathematics Advanced in NSW), so building fluency now means students spend less time decoding notation and more time on the actual maths.",
    },
    {
      q: "What is the difference between f(x) and y?",
      a: "Both f(x) and y describe the output of a rule for a given input, so f(x) = 2x + 3 and y = 2x + 3 convey the same relationship. Function notation is more powerful because it lets you write f(3) to mean 'the output when x = 3' without needing a separate sentence to explain it.",
    },
    {
      q: "How do students find x when they are given f(x) = some number?",
      a: "They replace f(x) with the given number and then solve the resulting equation for x. For example, if f(x) = 2x + 3 and f(x) = 11, they solve 2x + 3 = 11 to get x = 4. Practising this both ways, evaluating and solving, is one of the most useful skills for Methods.",
    },
  ],
  "year-10a-non-linear-simultaneous-equations": [
    {
      q: "What makes non-linear simultaneous equations different from the linear ones students already know?",
      a: "With two linear equations the graphs are straight lines and there is at most one intersection point. When one equation is a parabola or circle, the graphs can cross at two points, one point (tangent), or not at all, so students need to interpret the discriminant or graph to know how many solutions to expect.",
    },
    {
      q: "Does my child need to solve these algebraically, or is using a graphing app enough?",
      a: "The curriculum explicitly allows graphing tools and guess-check-and-refine with digital technology. Algebraic substitution is also expected for standard linear-quadratic pairs, so ideally students practise both and use technology to check their working.",
    },
    {
      q: "Why does substitution work for a line paired with a parabola but elimination usually does not?",
      a: "Elimination relies on adding or subtracting equations to cancel a variable, which works neatly when both equations are linear. When one equation is quadratic, rearranging the linear equation and substituting into the quadratic gives a single quadratic equation in one variable that can then be solved directly.",
    },
  ],
  "year-10a-pyramids-cones-spheres": [
    {
      q: "What formulas does my student need to know for pyramids, cones and spheres in Year 10A?",
      a: "The key formulas are: volume of a pyramid or cone is (1/3) × base area × height; surface area of a cone is πrl + πr², where l is the slant height; and surface area and volume of a sphere are 4πr² and (4/3)πr³. Students also need Pythagoras' theorem to find slant heights.",
    },
    {
      q: "What is a composite solid and how do students approach those problems?",
      a: "A composite solid is a shape made by combining two or more standard solids, for example a cone sitting on top of a cylinder. Students find the volume or surface area of each part separately, then add or subtract as needed. The trickiest part is working out which faces are internal and should not be included in a surface area calculation.",
    },
    {
      q: "Is this topic in the regular Year 10 curriculum or only for extension students?",
      a: "This content is Year 10A, the optional extension level for students heading toward senior Methods or Specialist maths (called Mathematics Advanced and Extension 1 in NSW). It goes beyond the standard Year 10 measurement topics and is not assessed in the core curriculum.",
    },
  ],
  "year-10a-circle-theorems": [
    {
      q: "How many circle theorems do Year 10A students need to know?",
      a: "The curriculum focuses on relationships involving radii, diameters, chords and tangents. Students are typically expected to know and prove around six core theorems, including the angle at the centre, angles in the same segment, the semicircle angle, cyclic quadrilaterals and the two tangent results.",
    },
    {
      q: "Do students need to write formal proofs or just apply the theorems?",
      a: "Both. The curriculum standard uses the word 'prove', so students should be able to construct a logical written argument for each theorem, not just quote the result. Applying the theorems to find unknown angles in diagrams is also assessed, and the two skills reinforce each other.",
    },
    {
      q: "Are circle theorems needed for senior Mathematical Methods (Mathematics Advanced in NSW)?",
      a: "Circle theorems themselves do not appear directly in the Methods course, but the deductive reasoning and algebraic manipulation practised here carry over. Students heading to Methods or Specialist Mathematics benefit from the rigour that circle theorem proofs develop.",
    },
  ],
  "year-10a-sine-cosine-rule": [
    {
      q: "What is the difference between the sine rule and the cosine rule?",
      a: "Use the sine rule when you know two angles and a side, or two sides and a non-included angle. Use the cosine rule when you know two sides and the included angle, or all three sides. Picking the right rule first saves a lot of working.",
    },
    {
      q: "What is the ambiguous case of the sine rule?",
      a: "When you know two sides and a non-included angle, there can be two possible triangles that fit the given information. Students need to check whether both solutions are geometrically valid, which is a common source of lost marks in Year 10A and senior maths.",
    },
    {
      q: "Is the area formula (1/2)ab sin C only for right-angled triangles?",
      a: "No, it works for any triangle. The angle C is the angle included between sides a and b. When C is 90 degrees the formula reduces to the familiar (1/2) base times height, but it is valid for any angle.",
    },
  ],
  "year-10a-trigonometric-equations": [
    {
      q: "What does 'solve a trigonometric equation' actually mean?",
      a: "It means finding all angle values that make the equation true over a given interval. For example, solving sin(x) = 0.5 for 0 to 360 degrees gives x = 30° and x = 150°, because sine equals 0.5 at both those angles.",
    },
    {
      q: "Do students need to know radians for Year 10A trig equations?",
      a: "Yes. The 10A extension content expects students to work in both degrees and radians. Radians are introduced here and are essential for senior Mathematical Methods (Mathematics Advanced in NSW), so it is worth building comfort with both units early.",
    },
    {
      q: "Why do trigonometric equations have more than one solution?",
      a: "Because sine, cosine and tangent are periodic, meaning their values repeat at regular intervals. The unit circle makes this visual: two different angles can share the same sine or cosine value within a single 360° cycle, and more solutions appear in wider intervals.",
    },
  ],
  "year-10a-3d-trigonometry": [
    {
      q: "Why do students need to do two separate triangle calculations in 3D problems?",
      a: "Most 3D problems have no single right-angled triangle that directly connects the two points you care about. You need to find an intermediate length first, usually a base diagonal or a slant height, and then use that result in a second triangle to get the final answer.",
    },
    {
      q: "What is a space diagonal and how is it different from a face diagonal?",
      a: "A face diagonal lies on one flat face of a solid, connecting opposite corners of that rectangle. A space diagonal cuts through the interior of the solid from one corner all the way to the opposite corner. Finding a space diagonal usually requires applying Pythagoras twice.",
    },
    {
      q: "How does the angle of elevation work differently in a 3D problem compared to a 2D one?",
      a: "In 2D the horizontal distance is given directly. In 3D you often have to calculate the horizontal distance across a floor or base first, then use that length as the adjacent side in a trigonometric ratio to find the elevation angle.",
    },
  ],
  "year-10a-standard-deviation": [
    {
      q: "What is standard deviation and why does Year 10A cover it?",
      a: "Standard deviation measures how spread out data values are around the mean. Year 10A introduces it because it is a core tool in senior Mathematical Methods (Mathematics Advanced in NSW) and gives students a precise way to compare the consistency of different data sets.",
    },
    {
      q: "Do Year 10A students need to calculate standard deviation by hand?",
      a: "Yes, at this level students are expected to use the formula so they understand where the value comes from. Working through the steps by hand makes it much easier to explain what standard deviation means and why outliers increase it.",
    },
    {
      q: "How do outliers affect the standard deviation?",
      a: "An outlier is a value far from the mean, so it contributes a large squared deviation to the formula and pushes standard deviation up. Students investigate this by adding or removing a single extreme value and comparing the results.",
    },
  ],
  "year-10a-permutations-combinations": [
    {
      q: "What is factorial notation and why does it matter in Year 10A?",
      a: "Factorial notation writes the product of all positive integers up to n as n!, so 5! = 5 × 4 × 3 × 2 × 1 = 120. It gives a compact way to count arrangements, and it is used directly in probability calculations and in senior Mathematical Methods (Mathematics Advanced in NSW).",
    },
    {
      q: "What is the difference between a permutation and a combination at this level?",
      a: "A permutation counts ordered arrangements, so placing A then B is different from B then A. Year 10A focuses on permutations and the multiplication principle. Combinations, where order does not matter, are introduced more formally in senior maths.",
    },
    {
      q: "How do restrictions or repeated elements change an arrangements problem?",
      a: "If certain objects must stay together or certain positions are fixed, you reduce the count by treating those objects as a single unit first. Repeated identical objects reduce the total by dividing out the factorials of each repeated group.",
    },
  ],
};

export function getFaqsForSlug(slug) {
  return WORKSHEET_FAQS[slug] ?? [];
}

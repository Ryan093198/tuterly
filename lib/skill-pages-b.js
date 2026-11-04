const R = String.raw;

// Skill pages, batch B (4 Nov 2026): standalone pages for searches like
// "box plot worksheet" (monthly Australian volumes from Keyword Planner).
// Every example and quiz answer is checked in code
// (scratchpad/check-skills-b.mjs). No em or en dashes. Money as \$.

export const SKILL_PAGES_B = [
  {
    slug: "angles-on-parallel-lines",
    keyword: "angles on parallel lines worksheet",
    monthlySearches: 170,
    topicSlug: "year-7-angles",
    relatedSlugs: ["year-7-angles-in-triangles", "year-8-quadrilaterals", "year-10-geometric-reasoning"],
    metaTitle: "Angles on Parallel Lines Worksheets with Answers | Tuterly",
    metaDescription:
      "Free angles on parallel lines worksheets with answers: corresponding, alternate and co-interior angles, with reasons and algebra. Worked examples and a 10-question quick check.",
    h1: "Angles on parallel lines worksheets with answers",
    lead: "When a line crosses two parallel lines, eight angles appear, and three rules tell you all of them. Learn the rules, then practise with fresh questions and worked solutions.",
    guide: {
      title: "Angles on parallel lines, explained",
      lead: "The three angle pairs, how to spot them, and how to write the reason a test expects.",
      sections: [
        {
          h: "1. The transversal",
          md: R`A transversal is a line that crosses two or more other lines. When it crosses two parallel lines, it makes eight angles: four at each crossing. The angles at one crossing match the angles at the other, so once you know one angle you can find all eight.`,
        },
        {
          h: "2. Corresponding angles are equal (F shape)",
          md: R`Corresponding angles sit in the same position at each crossing, for example both above the line and to the right of the transversal. Trace an F shape to find them. If one is $65°$, the other is $65°$.`,
        },
        {
          h: "3. Alternate angles are equal (Z shape)",
          md: R`Alternate angles sit between the parallel lines, on opposite sides of the transversal. Trace a Z shape. If one is $112°$, the other is $112°$.`,
        },
        {
          h: "4. Co-interior angles add to 180° (C shape)",
          md: R`Co-interior angles sit between the parallel lines, on the same side of the transversal. Trace a C shape. They are supplementary:
$$a + b = 180°$$
If one is $74°$, the other is $180° - 74° = 106°$.`,
        },
        {
          h: "5. Two rules that work on any lines",
          md: R`- Vertically opposite angles are equal: they are across from each other where two lines cross.
- Angles on a straight line add to $180°$.

Most questions mix these with the parallel line rules, one step at a time.`,
        },
        {
          h: "6. Using algebra, and giving reasons",
          md: R`If corresponding angles are $3x + 10$ and $70°$, set them equal:
$$3x + 10 = 70, \quad 3x = 60, \quad x = 20$$
In a test, write the reason next to each step, for example "corresponding angles, parallel lines". Leaving out "parallel lines" often costs the mark, because the rule only works when the lines are parallel.`,
        },
      ],
      quiz: [
        { q: R`An angle of $65°$ is corresponding to angle $a$. Find $a$.`, a: R`$a = 65°$ (corresponding angles, parallel lines)` },
        { q: R`An angle of $112°$ is alternate to angle $b$. Find $b$.`, a: R`$b = 112°$ (alternate angles, parallel lines)` },
        { q: R`An angle of $74°$ is co-interior to angle $c$. Find $c$.`, a: R`$c = 106°$ (co-interior angles add to $180°$)` },
        { q: R`An angle of $38°$ is vertically opposite angle $d$. Find $d$.`, a: R`$d = 38°$` },
        { q: R`Angle $e$ and an angle of $125°$ lie on a straight line. Find $e$.`, a: R`$e = 55°$` },
        { q: R`Two co-interior angles are $x$ and $2x$. Find $x$.`, a: R`$3x = 180$, so $x = 60$` },
        { q: R`Two alternate angles are $4x - 10$ and $2x + 30$. Find $x$ and the size of each angle.`, a: R`$x = 20$, and each angle is $70°$` },
        { q: R`Corresponding angles are $5x + 15$ and $80°$. Find $x$.`, a: R`$x = 13$` },
        { q: R`Co-interior angles are $3x + 20$ and $2x + 10$. Find $x$.`, a: R`$5x + 30 = 180$, so $x = 30$` },
        { q: R`Angle $a$ is alternate to an angle of $47°$, and angle $b$ is co-interior to angle $a$. Find $a$ and $b$.`, a: R`$a = 47°$ and $b = 133°$` },
      ],
    },
    faqs: [
      { q: "What are the three angle rules for parallel lines?", a: "Corresponding angles are equal, alternate angles are equal, and co-interior angles add to 180 degrees. They only work when the two lines are parallel." },
      { q: "How do I remember corresponding, alternate and co-interior angles?", a: "Use the letters: corresponding angles make an F shape, alternate angles make a Z shape, and co-interior angles make a C shape." },
      { q: "What year are angles on parallel lines taught?", a: "In the Australian Curriculum, angles formed by a transversal crossing parallel lines are introduced in Year 7 and used again in later geometry." },
    ],
  },

  {
    slug: "mean-median-mode",
    keyword: "mean median mode worksheet",
    monthlySearches: 140,
    topicSlug: "year-7-statistics",
    relatedSlugs: ["year-7-dot-plots-stem-and-leaf", "year-9-statistics", "year-10-statistics"],
    metaTitle: "Mean, Median and Mode Worksheets with Answers (Free) | Tuterly",
    metaDescription:
      "Free mean, median and mode worksheets with answers, plus range: odd and even data sets, outliers and finding a missing value. Worked examples and a 10-question quick check.",
    h1: "Mean, median and mode worksheets with answers",
    lead: "Three ways to describe a typical value, and the range to describe the spread. Learn when each one is useful, then practise with fresh questions and worked solutions.",
    guide: {
      title: "Mean, median, mode and range, explained",
      lead: "How to find each one, including the cases that trip students up.",
      sections: [
        {
          h: "1. The mean: add, then divide",
          md: R`Add all the values, then divide by how many there are. For $4, 8, 6, 5, 7$:
$$\text{mean} = \frac{4 + 8 + 6 + 5 + 7}{5} = \frac{30}{5} = 6$$`,
        },
        {
          h: "2. The median: put them in order first",
          md: R`The median is the middle value once the data is in order. For $3, 9, 4, 7, 5$, order it as $3, 4, 5, 7, 9$, so the median is $5$.

With an even number of values, the median is halfway between the middle two. For $2, 5, 8, 10$ the median is $\dfrac{5 + 8}{2} = 6.5$.`,
        },
        {
          h: "3. The mode: the most common value",
          md: R`For $3, 5, 5, 6, 8, 8, 8$ the mode is $8$. A data set can have two modes (bimodal) or no mode at all, if every value appears the same number of times.`,
        },
        {
          h: "4. The range: highest minus lowest",
          md: R`The range measures spread, not a typical value. For $3, 5, 5, 6, 8, 8, 8$ the range is $8 - 3 = 5$.`,
        },
        {
          h: "5. Outliers pull the mean, not the median",
          md: R`For $4, 5, 5, 6, 50$ the mean is $\dfrac{70}{5} = 14$, but the median is $5$. One very large value dragged the mean up, so the median describes a typical value better here.`,
        },
        {
          h: "6. Finding a missing value from the mean",
          md: R`Work with the total. The mean of five numbers is $7$, so their total is $5 \times 7 = 35$. If four of them are $5, 8, 6$ and $9$ (total $28$), the fifth is
$$35 - 28 = 7$$`,
        },
      ],
      quiz: [
        { q: R`Find the mean of $2, 4, 6, 8, 10$.`, a: R`$6$` },
        { q: R`Find the median of $7, 1, 5, 3, 9$.`, a: R`$5$` },
        { q: R`Find the median of $12, 15, 18, 20$.`, a: R`$16.5$` },
        { q: R`Find the mode of $4, 7, 7, 2, 9, 7, 4$.`, a: R`$7$` },
        { q: R`Find the range of $15, 3, 22, 9, 11$.`, a: R`$19$` },
        { q: R`Find the mean of $3.5, 4.5, 6, 8$.`, a: R`$5.5$` },
        { q: R`Find the mean, median and mode of $2, 3, 3, 5, 7, 10$.`, a: R`Mean $5$, median $4$, mode $3$` },
        { q: R`A student's mean score over 6 tests is $72$. What is the total of the 6 scores?`, a: R`$432$` },
        { q: R`The mean of four numbers is $15$. Three of them are $12$, $18$ and $10$. Find the fourth.`, a: R`$60 - 40 = 20$` },
        { q: R`The scores $5, 6, 6, 7, 46$ have a mean of $14$. Which describes a typical score better, the mean or the median? Why?`, a: R`The median, $6$, because the outlier $46$ pulls the mean up` },
      ],
    },
    faqs: [
      { q: "What is the difference between mean, median and mode?", a: "The mean is the total divided by the number of values, the median is the middle value in order, and the mode is the most common value. All three describe a typical value in different ways." },
      { q: "How do you find the median of an even number of values?", a: "Put the values in order and find the two in the middle. The median is halfway between them: add them and divide by 2." },
      { q: "When is the median better than the mean?", a: "When the data has an outlier or is skewed. One very large or very small value moves the mean a lot but barely moves the median." },
    ],
  },

  {
    slug: "completing-the-square",
    keyword: "completing the square worksheet",
    monthlySearches: 110,
    topicSlug: "year-10-quadratic-equations",
    relatedSlugs: ["year-10-quadratic-factorising", "year-10a-non-monic-quadratics", "year-10-parabolas-circles-exponentials"],
    metaTitle: "Completing the Square Worksheets with Answers (Free) | Tuterly",
    metaDescription:
      "Free completing the square worksheets with answers: writing quadratics as perfect squares, solving equations with surd answers and finding turning points. Worked examples and a quick check.",
    h1: "Completing the square worksheets with answers",
    lead: "Completing the square turns any quadratic into a perfect square plus a number, which lets you solve equations that won't factorise and find the turning point of a parabola.",
    guide: {
      title: "Completing the square, explained",
      lead: "The one step at the heart of it, then how to use it to solve equations and sketch parabolas.",
      sections: [
        {
          h: "1. Perfect squares",
          md: R`A perfect square expands like this:
$$(x + a)^2 = x^2 + 2ax + a^2$$
The number in front of $x$ is $2a$, and the constant is $a^2$. So the constant is always the square of half the $x$ coefficient.`,
        },
        {
          h: "2. The key step: halve, then square",
          md: R`To make $x^2 + 6x$ into a perfect square, halve $6$ to get $3$, then square it to get $9$:
$$x^2 + 6x + 9 = (x + 3)^2$$`,
        },
        {
          h: "3. Completing the square on any quadratic",
          md: R`Add and subtract the number you need, so the expression doesn't change:
$$x^2 + 6x + 5 = x^2 + 6x + 9 - 9 + 5 = (x + 3)^2 - 4$$`,
        },
        {
          h: "4. Solving an equation",
          md: R`Solve $x^2 + 6x + 5 = 0$. Complete the square, move the number across, then take the square root of both sides (positive and negative):
$$(x + 3)^2 = 4, \quad x + 3 = \pm 2, \quad x = -1 \text{ or } x = -5$$
It also works when the answers are surds. For $x^2 + 4x - 1 = 0$, $(x + 2)^2 = 5$, so $x = -2 \pm \sqrt{5}$.`,
        },
        {
          h: "5. Turning point form",
          md: R`Completing the square writes a parabola as $y = (x - h)^2 + k$, with its turning point at $(h, k)$.
$$y = x^2 - 8x + 10 = (x - 4)^2 - 6$$
So the turning point is $(4, -6)$. Watch the sign: $(x - 4)$ means $h = 4$.`,
        },
        {
          h: "6. When the x² coefficient isn't 1 (Year 10A)",
          md: R`Take the coefficient out of the $x$ terms first, then complete the square inside the brackets:
$$2x^2 + 12x + 7 = 2(x^2 + 6x) + 7 = 2(x + 3)^2 - 18 + 7 = 2(x + 3)^2 - 11$$`,
        },
      ],
      quiz: [
        { q: R`What number completes the square: $x^2 + 10x + \underline{\quad}$?`, a: R`$25$` },
        { q: R`What number completes the square: $x^2 - 6x + \underline{\quad}$?`, a: R`$9$` },
        { q: R`Write $x^2 + 8x + 3$ in the form $(x + a)^2 + b$.`, a: R`$(x + 4)^2 - 13$` },
        { q: R`Write $x^2 - 2x - 7$ in the form $(x + a)^2 + b$.`, a: R`$(x - 1)^2 - 8$` },
        { q: R`What number completes the square: $x^2 + 5x + \underline{\quad}$?`, a: R`$\dfrac{25}{4}$` },
        { q: R`Solve $x^2 + 4x - 12 = 0$ by completing the square.`, a: R`$(x + 2)^2 = 16$, so $x = 2$ or $x = -6$` },
        { q: R`Solve $x^2 - 6x + 4 = 0$, giving exact answers.`, a: R`$(x - 3)^2 = 5$, so $x = 3 \pm \sqrt{5}$` },
        { q: R`Find the turning point of $y = x^2 + 2x - 3$.`, a: R`$y = (x + 1)^2 - 4$, so $(-1, -4)$` },
        { q: R`Write $x^2 + 3x + 1$ in the form $(x + a)^2 + b$.`, a: R`$\left(x + \dfrac{3}{2}\right)^2 - \dfrac{5}{4}$` },
        { q: R`Write $2x^2 - 8x + 3$ in the form $a(x - h)^2 + k$.`, a: R`$2(x - 2)^2 - 5$` },
      ],
    },
    faqs: [
      { q: "What does completing the square mean?", a: "It means rewriting a quadratic as a perfect square plus or minus a number, for example x squared plus 6x plus 5 becomes (x plus 3) squared minus 4." },
      { q: "Why use completing the square instead of factorising?", a: "It works on every quadratic, including ones that don't factorise neatly, and it shows the turning point of the parabola straight away." },
      { q: "What year is completing the square taught?", a: "It is usually taught in Year 10 alongside solving quadratic equations, and used again in senior maths. Quadratics with a leading coefficient other than 1 are Year 10A." },
    ],
  },

  {
    slug: "substitution",
    keyword: "substitution worksheet",
    monthlySearches: 110,
    topicSlug: "year-7-algebra",
    relatedSlugs: ["year-7-expressions", "year-8-algebra", "year-10-rearranging-formulas"],
    metaTitle: "Substitution Worksheets with Answers (Free) | Tuterly",
    metaDescription:
      "Free algebra substitution worksheets with answers: substituting whole numbers, negatives and powers into expressions and formulas. Worked examples and a 10-question quick check.",
    h1: "Substitution worksheets with answers",
    lead: "Substitution means replacing a letter with its value and working out the answer. Learn the steps, including negatives and powers, then practise with fresh questions and worked solutions.",
    guide: {
      title: "Substitution in algebra, explained",
      lead: "Four rules that get substitution right every time, with an example of each.",
      sections: [
        {
          h: "1. Replace the letter, using brackets",
          md: R`Write each value in brackets in place of its letter. If $x = 5$:
$$3x + 2 = 3(5) + 2 = 15 + 2 = 17$$
The brackets remind you that $3x$ means $3 \times x$.`,
        },
        {
          h: "2. Follow the order of operations",
          md: R`Brackets, then powers, then multiplication and division, then addition and subtraction. If $a = 4$ and $b = 3$:
$$2a + b^2 = 2(4) + (3)^2 = 8 + 9 = 17$$`,
        },
        {
          h: "3. Negative values",
          md: R`Brackets matter most with negatives. If $a = 4$ and $b = -3$:
$$2a - b = 2(4) - (-3) = 8 + 3 = 11$$
Subtracting a negative is the same as adding.`,
        },
        {
          h: "4. Powers of negatives",
          md: R`If $x = -4$, then $x^2 = (-4)^2 = 16$, because a negative times a negative is positive. But $-x^2$ means the negative of $x^2$, so $-x^2 = -16$.`,
        },
        {
          h: "5. Formulas from science and everyday life",
          md: R`Formulas work the same way. To convert $25$ degrees Celsius to Fahrenheit with $F = 1.8C + 32$:
$$F = 1.8(25) + 32 = 45 + 32 = 77$$`,
        },
        {
          h: "6. Fractions in expressions",
          md: R`Work out the top and bottom separately, then divide. If $a = 7$ and $b = 11$:
$$\frac{a + b}{2} = \frac{7 + 11}{2} = \frac{18}{2} = 9$$`,
        },
      ],
      quiz: [
        { q: R`Find $4x - 1$ when $x = 3$.`, a: R`$11$` },
        { q: R`Find $5a + 2b$ when $a = 2$ and $b = 6$.`, a: R`$22$` },
        { q: R`Find $p^2 + 3$ when $p = 4$.`, a: R`$19$` },
        { q: R`Find $3m - n$ when $m = -2$ and $n = 5$.`, a: R`$-11$` },
        { q: R`Find $x^2$ when $x = -5$.`, a: R`$25$` },
        { q: R`Find $2y^2$ when $y = 3$.`, a: R`$18$` },
        { q: R`Find $\dfrac{a + b}{2}$ when $a = 7$ and $b = 11$.`, a: R`$9$` },
        { q: R`Using $v = u + at$, find $v$ when $u = 4$, $a = 3$ and $t = 5$.`, a: R`$19$` },
        { q: R`Using $A = \dfrac{1}{2}bh$, find the area of a triangle with $b = 12$ and $h = 7$.`, a: R`$42$` },
        { q: R`Using $F = 1.8C + 32$, convert $-10$ degrees Celsius to Fahrenheit.`, a: R`$14$` },
      ],
    },
    faqs: [
      { q: "What does substitution mean in algebra?", a: "It means replacing each letter in an expression or formula with a given number, then working out the value." },
      { q: "Why use brackets when substituting?", a: "Brackets keep negative numbers and powers correct. For example, if x is negative 4, x squared is 16, which you only get by squaring the whole of negative 4." },
      { q: "What year is substitution taught?", a: "Substitution into formulas is introduced in Year 7 in the Australian Curriculum and used in every later year of algebra and science." },
    ],
  },

  {
    slug: "collecting-like-terms",
    keyword: "collecting like terms worksheet",
    monthlySearches: 110,
    topicSlug: "year-7-expressions",
    relatedSlugs: ["year-7-algebra", "year-8-algebra", "year-9-algebra"],
    metaTitle: "Collecting Like Terms Worksheets with Answers (Free) | Tuterly",
    metaDescription:
      "Free collecting like terms worksheets with answers: simplifying expressions with one or more letters, negatives and powers. Worked examples and a 10-question quick check.",
    h1: "Collecting like terms worksheets with answers",
    lead: "Collecting like terms is how you simplify an algebraic expression. Learn what makes terms alike and how to handle the signs, then practise with fresh questions and worked solutions.",
    guide: {
      title: "Collecting like terms, explained",
      lead: "What counts as a like term, and the sign rule that most mistakes come from.",
      sections: [
        {
          h: "1. What like terms are",
          md: R`Like terms have exactly the same letters, raised to the same powers. Only the number in front can differ.

- $5a$ and $3a$ are like terms.
- $4x$ and $4y$ are not.
- $3x^2$ and $3x$ are not, because the powers differ.`,
        },
        {
          h: "2. Add or subtract the numbers in front",
          md: R`Keep the letters the same and combine the numbers:
$$5a + 3a = 8a \qquad 9y - 3y = 6y$$`,
        },
        {
          h: "3. The sign belongs to the term after it",
          md: R`Each term carries the sign in front of it. Group like terms with their signs:
$$4m - 9 - m + 2 = (4m - m) + (-9 + 2) = 3m - 7$$
A letter on its own, like $m$, means $1m$.`,
        },
        {
          h: "4. More than one letter",
          md: R`Collect each kind separately:
$$7x - 2y + 3x + 5y = 10x + 3y$$
The answer has two terms because $x$ and $y$ terms can't be combined.`,
        },
        {
          h: "5. Order of letters doesn't matter",
          md: R`$ab$ and $ba$ are the same, because multiplication can be done in any order. So
$$2ab + 5ba = 7ab$$`,
        },
        {
          h: "6. Terms with powers",
          md: R`Treat $x^2$ terms and $x$ terms as different kinds:
$$3x^2 + 2x - x^2 + 5x = 2x^2 + 7x$$`,
        },
      ],
      quiz: [
        { q: R`Simplify $6x + 4x$.`, a: R`$10x$` },
        { q: R`Simplify $9y - 3y$.`, a: R`$6y$` },
        { q: R`Simplify $5a + 2b + 3a$.`, a: R`$8a + 2b$` },
        { q: R`Simplify $4p - 7 + 2p + 3$.`, a: R`$6p - 4$` },
        { q: R`Simplify $8m - 3n - 5m + n$.`, a: R`$3m - 2n$` },
        { q: R`Simplify $x + x + x$.`, a: R`$3x$` },
        { q: R`Simplify $3xy + 4yx$.`, a: R`$7xy$` },
        { q: R`Simplify $2k^2 + 5k - k^2 + 3k$.`, a: R`$k^2 + 8k$` },
        { q: R`Simplify $-4a + 6b - 2a - b$.`, a: R`$-6a + 5b$` },
        { q: R`A rectangle has sides $3x + 2$ and $x - 1$. Write a simplified expression for its perimeter.`, a: R`$2(3x + 2) + 2(x - 1) = 8x + 2$` },
      ],
    },
    faqs: [
      { q: "What are like terms?", a: "Like terms have exactly the same letters raised to the same powers, such as 5a and 3a. Only the number in front can be different." },
      { q: "Can you collect x and x squared?", a: "No. x and x squared are different kinds of term, so an expression like 3x squared plus 2x can't be simplified any further." },
      { q: "What is the most common mistake when collecting like terms?", a: "Losing the sign. Each term carries the sign in front of it, so in 4m minus 9 minus m, the m term is negative." },
    ],
  },

  {
    slug: "24-hour-time",
    keyword: "24 hour time worksheet",
    monthlySearches: 110,
    topicSlug: "year-8-time-zones",
    relatedSlugs: ["year-8-speed-distance-time", "year-8-rates"],
    metaTitle: "24-Hour Time Worksheets with Answers (Free) | Tuterly",
    metaDescription:
      "Free 24-hour time worksheets with answers: converting between 12-hour and 24-hour time, midnight and noon, and durations across midnight. Worked examples and a quick check.",
    h1: "24-hour time worksheets with answers",
    lead: "24-hour time runs from 00:00 at midnight to 23:59. Learn to convert both ways and to work out durations, including across midnight, then practise with fresh questions and worked solutions.",
    guide: {
      title: "24-hour time, explained",
      lead: "Converting both ways, the two tricky times, and how to work out a duration.",
      sections: [
        {
          h: "1. Always four digits",
          md: R`24-hour time uses four digits: two for the hour and two for the minutes. The day starts at 00:00 (midnight) and ends at 23:59. There's no am or pm.`,
        },
        {
          h: "2. Morning times",
          md: R`From midnight to just before noon, keep the hour and add a leading zero if needed. 7:45 am is 07:45. The exception is the hour after midnight: 12:15 am is 00:15.`,
        },
        {
          h: "3. Afternoon and evening times",
          md: R`From 1 pm onwards, add 12 to the hour. 3:20 pm is 15:20 and 11:50 pm is 23:50. Noon stays as it is: 12:40 pm is 12:40.`,
        },
        {
          h: "4. Converting back to 12-hour time",
          md: R`If the hour is 13 or more, subtract 12 and write pm. 21:05 is 9:05 pm. If the hour is 00, it's 12 am: 00:45 is 12:45 am.`,
        },
        {
          h: "5. Durations on the same day",
          md: R`Count up in steps instead of subtracting. From 08:35 to 14:10:

- 08:35 to 09:00 is 25 minutes
- 09:00 to 14:00 is 5 hours
- 14:00 to 14:10 is 10 minutes

Total: 5 hours 35 minutes.`,
        },
        {
          h: "6. Durations across midnight",
          md: R`Split the time at midnight. From 22:40 to 06:15 the next morning:

- 22:40 to 00:00 is 1 hour 20 minutes
- 00:00 to 06:15 is 6 hours 15 minutes

Total: 7 hours 35 minutes.`,
        },
      ],
      quiz: [
        { q: R`Write 6:30 am in 24-hour time.`, a: R`06:30` },
        { q: R`Write 4:15 pm in 24-hour time.`, a: R`16:15` },
        { q: R`Write 12:05 am in 24-hour time.`, a: R`00:05` },
        { q: R`Write 11:50 pm in 24-hour time.`, a: R`23:50` },
        { q: R`Write 19:25 in 12-hour time.`, a: R`7:25 pm` },
        { q: R`Write 00:45 in 12-hour time.`, a: R`12:45 am` },
        { q: R`How long is it from 09:20 to 15:05?`, a: R`5 hours 45 minutes` },
        { q: R`A movie starts at 20:50 and runs for 2 hours 25 minutes. When does it finish?`, a: R`23:15` },
        { q: R`A flight leaves at 23:35 and lands at 05:10 the next day, in the same time zone. How long is the flight?`, a: R`5 hours 35 minutes` },
        { q: R`A nurse works from 21:30 until 07:15 the next morning. How long is the shift?`, a: R`9 hours 45 minutes` },
      ],
    },
    faqs: [
      { q: "How do you convert pm times to 24-hour time?", a: "Add 12 to the hour for any time from 1 pm onwards. For example, 3:20 pm becomes 15:20. Times between 12 noon and 1 pm keep the 12." },
      { q: "What is midnight in 24-hour time?", a: "Midnight is 00:00, the start of the day. So 12:30 am is written as 00:30." },
      { q: "How do you work out a time difference across midnight?", a: "Split it at midnight: work out the time up to 00:00, then the time from 00:00 to the finish, and add the two." },
    ],
  },

  {
    slug: "box-plots",
    keyword: "box plot worksheet",
    monthlySearches: 110,
    topicSlug: "year-10-statistics",
    relatedSlugs: ["year-9-comparing-data", "year-7-dot-plots-stem-and-leaf", "year-9-statistics"],
    metaTitle: "Box Plot Worksheets with Answers (Free) | Tuterly",
    metaDescription:
      "Free box plot worksheets with answers: five-number summaries, quartiles for odd and even data sets, interquartile range, outliers and comparing data. Worked examples and a quick check.",
    h1: "Box plot worksheets with answers",
    lead: "A box plot shows a data set's five-number summary at a glance. Learn to find the quartiles, draw and read the plot and spot outliers, then practise with fresh questions and worked solutions.",
    guide: {
      title: "Box plots, explained",
      lead: "From a list of numbers to a five-number summary and a box plot. Quartiles here use the method common in Australian schools: when there's an odd number of values, leave the median out of both halves.",
      sections: [
        {
          h: "1. The five-number summary",
          md: R`A box plot is built from five numbers: the minimum, the lower quartile $Q_1$, the median, the upper quartile $Q_3$ and the maximum. The box runs from $Q_1$ to $Q_3$ with a line at the median, and the whiskers reach out to the minimum and maximum.`,
        },
        {
          h: "2. Quartiles with an odd number of values",
          md: R`Order the data and find the median. Leave the median out, then find the median of each half. For $3, 5, 6, 8, 9, 11, 14$:

- median $= 8$
- lower half $3, 5, 6$, so $Q_1 = 5$
- upper half $9, 11, 14$, so $Q_3 = 11$

Five-number summary: $3, 5, 8, 11, 14$.`,
        },
        {
          h: "3. Quartiles with an even number of values",
          md: R`Split the ordered data into two equal halves. For $2, 4, 5, 7, 8, 10, 12, 15$:

- median $= \dfrac{7 + 8}{2} = 7.5$
- lower half $2, 4, 5, 7$, so $Q_1 = \dfrac{4 + 5}{2} = 4.5$
- upper half $8, 10, 12, 15$, so $Q_3 = \dfrac{10 + 12}{2} = 11$`,
        },
        {
          h: "4. The interquartile range (IQR)",
          md: R`The IQR is the width of the box, and it measures the spread of the middle half of the data:
$$\text{IQR} = Q_3 - Q_1$$
For the even example above, $\text{IQR} = 11 - 4.5 = 6.5$. About half the data lies inside the box.`,
        },
        {
          h: "5. Outliers",
          md: R`A value is an outlier if it lies more than $1.5 \times \text{IQR}$ below $Q_1$ or above $Q_3$. For $1, 3, 4, 5, 6, 7, 30$: $Q_1 = 3$, $Q_3 = 7$ and $\text{IQR} = 4$, so the upper limit is
$$7 + 1.5 \times 4 = 13$$
$30$ is above $13$, so it's an outlier. On a box plot, the whisker stops at the largest value that isn't an outlier and the outlier is marked with a cross.`,
        },
        {
          h: "6. Reading and comparing box plots",
          md: R`To compare two groups, compare their medians (which is higher, typically) and their IQRs (which is more spread out). If the box and whisker are longer above the median, the data is positively skewed; if longer below, it's negatively skewed.`,
        },
      ],
      quiz: [
        { q: R`Find the five-number summary of $2, 4, 6, 8, 10$.`, a: R`$2, 3, 6, 9, 10$` },
        { q: R`Find the median of $12, 15, 17, 20, 22, 25$.`, a: R`$18.5$` },
        { q: R`A data set has $Q_1 = 14$ and $Q_3 = 23$. Find the IQR.`, a: R`$9$` },
        { q: R`Find $Q_1$ and $Q_3$ for $1, 2, 4, 6, 7, 8, 9, 12$.`, a: R`$Q_1 = 3$ and $Q_3 = 8.5$` },
        { q: R`A box plot has a minimum of $12$ and a maximum of $47$. What is the range?`, a: R`$35$` },
        { q: R`About what percentage of the data lies between $Q_1$ and $Q_3$?`, a: R`About $50\%$` },
        { q: R`For $4, 6, 7, 9, 10, 12, 13, 15, 40$, find $Q_1$, $Q_3$ and the IQR, and decide whether $40$ is an outlier.`, a: R`$Q_1 = 6.5$, $Q_3 = 14$, $\text{IQR} = 7.5$. The upper limit is $14 + 11.25 = 25.25$, so $40$ is an outlier` },
        { q: R`Find the five-number summary of $15, 18, 20, 21, 24, 26, 29, 31, 33, 35, 38$.`, a: R`$15, 20, 26, 33, 38$` },
        { q: R`Class A has a median of $64$ and an IQR of $10$. Class B has a median of $71$ and an IQR of $22$. Which class scored higher typically, and which was more consistent?`, a: R`Class B scored higher typically; Class A was more consistent` },
        { q: R`A box plot has $Q_1 = 30$, median $40$ and $Q_3 = 60$, with whiskers of similar length. Describe the skew.`, a: R`Positively skewed, because the box is longer above the median` },
      ],
    },
    faqs: [
      { q: "What are the five numbers in a box plot?", a: "The minimum, the lower quartile, the median, the upper quartile and the maximum." },
      { q: "How do you find quartiles when there is an odd number of values?", a: "Find the median, leave it out, then find the median of the lower half for the lower quartile and of the upper half for the upper quartile. This is the method most Australian schools use." },
      { q: "How do you know if a value is an outlier on a box plot?", a: "Work out 1.5 times the interquartile range. A value further than that below the lower quartile or above the upper quartile is an outlier." },
    ],
  },
];

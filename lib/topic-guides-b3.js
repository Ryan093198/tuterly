const R = String.raw;

// Topic guides, batch 3 (4 Nov 2026): eight pages Google crawled but did not
// index. Same shape as TOPIC_GUIDES in lib/topic-guides.js. Every number was
// checked in code (scratchpad/check-b3.mjs). No em dashes; money as \$.

export const TOPIC_GUIDES_B3 = {
  "year-7-percentages": {
    title: "Year 7 percentages, explained",
    lead: "Percentages turn up everywhere from test marks to sale signs. Here are the five skills Year 7 worksheets and tests ask for, each with an example.",
    sections: [
      {
        h: "1. Percent means out of 100",
        md: R`$35\%$ means $35$ out of every $100$, so $35\% = \dfrac{35}{100} = 0.35$. These conversions come up so often they're worth knowing by heart:

| Percentage | Fraction | Decimal |
|---|---|---|
| 50% | $\frac{1}{2}$ | 0.5 |
| 25% | $\frac{1}{4}$ | 0.25 |
| 75% | $\frac{3}{4}$ | 0.75 |
| 20% | $\frac{1}{5}$ | 0.2 |
| 10% | $\frac{1}{10}$ | 0.1 |
| 12.5% | $\frac{1}{8}$ | 0.125 |`,
      },
      {
        h: "2. A percentage of a quantity: start from 10%",
        md: R`To find $10\%$, divide by $10$. Every other percentage can be built from that. For $240$:

- $10\%$ of $240$ is $24$
- $30\%$ is three lots of that: $72$
- $5\%$ is half of $10\%$: $12$
- $35\%$ is $30\% + 5\%$: $72 + 12 = 84$

On a calculator, the same answer is $0.35 \times 240 = 84$.`,
      },
      {
        h: "3. One quantity as a percentage of another",
        md: R`Write it as a fraction, then multiply by $100$. A score of $18$ out of $24$ is
$$\frac{18}{24} \times 100 = 75\%$$
Both amounts must be in the same units first. $45$ minutes as a percentage of $2$ hours is $\dfrac{45}{120} \times 100 = 37.5\%$.`,
      },
      {
        h: "4. Discounts and mark-ups",
        md: R`A \$60 shirt with $15\%$ off: the discount is $0.15 \times 60 = 9$, so the sale price is \$51. A quicker way is to pay $85\%$ of the price: $0.85 \times 60 = 51$.

A shop buys a toy for \$25 and adds a $40\%$ mark-up: $1.4 \times 25 = 35$, so it sells for \$35.`,
      },
      {
        h: "5. Best buys: compare the same amount",
        md: R`To compare value, work out the price of the same quantity of each. A $500$ g box for \$3.20 costs \$0.64 per $100$ g. A $750$ g box for \$4.50 costs \$0.60 per $100$ g, so the bigger box is better value.`,
      },
    ],
    quiz: [
      { q: R`Find $20\%$ of $65$.`, a: R`$13$` },
      { q: R`Find $15\%$ of $260$.`, a: R`$39$` },
      { q: R`Write $12$ as a percentage of $40$.`, a: R`$30\%$` },
      { q: R`Write $\dfrac{3}{8}$ as a percentage.`, a: R`$37.5\%$` },
      { q: R`Write $0.07$ as a percentage.`, a: R`$7\%$` },
      { q: R`A jacket costs \$80. It is reduced by $30\%$. What is the sale price?`, a: R`\$56` },
      { q: R`A shop buys a book for \$50 and sells it with a $20\%$ mark-up. What is the selling price?`, a: R`\$60` },
      { q: R`A student scores $42$ out of $56$ on a test. What is the score as a percentage?`, a: R`$75\%$` },
    ],
  },

  "year-7-circles": {
    title: "Year 7 circles and pi, explained",
    lead: "Year 7 circle questions are about the circumference: the distance around the edge. Here's how radius, diameter and pi fit together.",
    sections: [
      {
        h: "1. The parts of a circle",
        md: R`The radius $r$ goes from the centre to the edge. The diameter $d$ goes right across through the centre, so it is two radii: $d = 2r$. The circumference $C$ is the distance around the circle.`,
      },
      {
        h: "2. What pi actually is",
        md: R`For every circle, the circumference divided by the diameter gives the same number, about $3.14159$. That number is called $\pi$ (pi). Measure a can with a diameter of $10$ cm and its circumference will be close to $31.4$ cm, because $31.4 \div 10 = 3.14$.`,
      },
      {
        h: "3. Finding the circumference",
        md: R`Use $C = \pi d$, or $C = 2\pi r$ if you know the radius. For a radius of $7$ cm:
$$C = 2 \times \pi \times 7 = 14\pi \approx 43.98 \text{ cm}$$
That uses the $\pi$ button. With $\pi \approx 3.14$ you get $43.96$ cm, so check which one the question wants. $14\pi$ cm is the exact answer.`,
      },
      {
        h: "4. Working backwards from the circumference",
        md: R`Divide by $\pi$ to get the diameter, then halve it for the radius. If $C = 50$ cm:
$$d = \frac{50}{\pi} \approx 15.92 \text{ cm}, \quad r \approx 7.96 \text{ cm}$$`,
      },
      {
        h: "5. Wheels and distance",
        md: R`One full turn of a wheel moves it forward one circumference. A wheel with a diameter of $0.7$ m moves $0.7\pi \approx 2.20$ m per turn, so $100$ turns cover about $219.9$ m (using the $\pi$ button).`,
      },
    ],
    quiz: [
      { q: R`A circle has a radius of $4$ cm. What is its diameter?`, a: R`$8$ cm` },
      { q: R`Find the circumference of a circle with a diameter of $12$ cm, to 1 decimal place (use the $\pi$ button).`, a: R`$12\pi \approx 37.7$ cm` },
      { q: R`Find the circumference of a circle with a radius of $5$ m, to 1 decimal place (use the $\pi$ button).`, a: R`$10\pi \approx 31.4$ m` },
      { q: R`A circle has a circumference of $62.8$ cm. Using $\pi \approx 3.14$, find its diameter.`, a: R`$20$ cm` },
      { q: R`A circle has a circumference of $100$ cm. Find its radius, to 1 decimal place (use the $\pi$ button).`, a: R`$\dfrac{100}{2\pi} \approx 15.9$ cm` },
      { q: R`Give the exact circumference of a circle with a radius of $9$ cm.`, a: R`$18\pi$ cm` },
      { q: R`A round garden bed has a diameter of $6$ m. How much edging goes around it, to the nearest metre?`, a: R`$6\pi \approx 18.85$, so about $19$ m` },
      { q: R`A bike wheel has a radius of $30$ cm. How far does the bike travel in $10$ turns of the wheel, in metres to 1 decimal place (use the $\pi$ button)?`, a: R`$10 \times 60\pi = 600\pi \approx 1885$ cm, about $18.8$ m` },
    ],
  },

  "year-7-statistics": {
    title: "Year 7 mean, median, mode and range, explained",
    lead: "Four numbers that sum up a whole data set. Here's how to find each one, and which one to trust when the data has an unusual value.",
    sections: [
      {
        h: "1. The mean: share it out evenly",
        md: R`Add up all the values and divide by how many there are. For $4, 9, 7, 12, 8$:
$$\text{mean} = \frac{4 + 9 + 7 + 12 + 8}{5} = \frac{40}{5} = 8$$`,
      },
      {
        h: "2. The median: the middle value",
        md: R`Put the values in order first. With an odd number of values, the median is the middle one. With an even number, it's halfway between the two middle values. For $3, 5, 8, 10, 12, 14$ the middle two are $8$ and $10$, so the median is $\dfrac{8 + 10}{2} = 9$.`,
      },
      {
        h: "3. The mode: the most common value",
        md: R`The mode is the value that appears most often. A data set can have two modes, like $1, 2, 2, 3, 3, 4$ (modes $2$ and $3$), or no mode at all if every value appears once.`,
      },
      {
        h: "4. The range: how spread out it is",
        md: R`Range is the largest value minus the smallest. For $14, 3, 22, 9$ the range is $22 - 3 = 19$. A big range means the data is spread out.`,
      },
      {
        h: "5. Which one to use",
        md: R`An unusual value (an outlier) pulls the mean towards it but barely moves the median. For $2, 3, 3, 4, 28$ the mean is $\dfrac{40}{5} = 8$, but the median is $3$. Here the median describes a typical value much better.`,
      },
    ],
    quiz: [
      { q: R`Find the mean of $6, 10, 8, 4$.`, a: R`$7$` },
      { q: R`Find the median of $11, 3, 7, 9, 5$.`, a: R`$7$` },
      { q: R`Find the median of $2, 9, 4, 6$.`, a: R`In order $2, 4, 6, 9$, so $\dfrac{4 + 6}{2} = 5$` },
      { q: R`Find the mode of $5, 3, 5, 8, 3, 5$.`, a: R`$5$` },
      { q: R`Find the mode or modes of $1, 2, 2, 3, 3, 4$.`, a: R`$2$ and $3$` },
      { q: R`Find the range of $14, 3, 22, 9$.`, a: R`$19$` },
      { q: R`The mean of five numbers is $6$. Four of them are $4, 5, 7$ and $8$. What is the fifth?`, a: R`The total is $5 \times 6 = 30$, so $30 - 24 = 6$` },
      { q: R`For $3, 4, 4, 5, 34$, find the mean and the median. Which better describes a typical value?`, a: R`Mean $10$, median $4$. The median, because $34$ is an outlier.` },
    ],
  },

  "year-10-statistics": {
    title: "Year 10 quartiles, IQR and boxplots, explained",
    lead: "Year 10 statistics is about describing and comparing spread. Here's the five-number summary, the interquartile range, outliers and how to read boxplots.",
    sections: [
      {
        h: "1. The five-number summary",
        md: R`A boxplot is built from five values: the minimum, the lower quartile $Q_1$, the median $Q_2$, the upper quartile $Q_3$ and the maximum. The quartiles split the ordered data into four groups of equal size.`,
      },
      {
        h: "2. Quartiles with an even number of values",
        md: R`For $2, 4, 5, 7, 8, 10, 12, 15$ (already in order), the median is halfway between $7$ and $8$, so $Q_2 = 7.5$. The lower half is $2, 4, 5, 7$, so $Q_1 = 4.5$. The upper half is $8, 10, 12, 15$, so $Q_3 = 11$. With an odd number of values, leave the median out of both halves.`,
      },
      {
        h: "3. The interquartile range and outliers",
        md: R`$\text{IQR} = Q_3 - Q_1$, the spread of the middle half of the data. Above, $\text{IQR} = 11 - 4.5 = 6.5$.

A value is an outlier if it is more than $1.5 \times \text{IQR}$ below $Q_1$ or above $Q_3$. Here $1.5 \times 6.5 = 9.75$, so the limits are $4.5 - 9.75 = -5.25$ and $11 + 9.75 = 20.75$. A value of $26$ would be an outlier.`,
      },
      {
        h: "4. Drawing a boxplot",
        md: R`Draw a scale, then a box from $Q_1$ to $Q_3$ with a line at the median. Draw whiskers out to the smallest and largest values that are not outliers, and mark any outliers as separate dots.`,
      },
      {
        h: "5. Comparing two boxplots",
        md: R`Compare the medians to say which group is typically higher, and the IQRs to say which is more consistent. Always use both numbers in your answer, for example: "Class B scored higher (median $72$ compared with $68$), but Class A was more consistent (IQR $10$ compared with $25$)."`,
      },
    ],
    quiz: [
      { q: R`Find the median of $3, 8, 5, 12, 9, 7$.`, a: R`In order $3, 5, 7, 8, 9, 12$, so $7.5$` },
      { q: R`Find $Q_1$ and $Q_3$ for $1, 3, 4, 6, 8, 9, 11$.`, a: R`$Q_1 = 3$ and $Q_3 = 9$ (the median $6$ is left out of both halves)` },
      { q: R`Find the IQR for the data in question 2.`, a: R`$9 - 3 = 6$` },
      { q: R`A data set has $Q_1 = 20$ and $Q_3 = 30$. Above what value is a data point an outlier?`, a: R`$30 + 1.5 \times 10 = 45$` },
      { q: R`For the same data set ($Q_1 = 20$, $Q_3 = 30$), is a value of $4$ an outlier?`, a: R`Yes: the lower limit is $20 - 15 = 5$, and $4 < 5$` },
      { q: R`Write the five-number summary for $2, 5, 6, 8, 10, 13, 15, 20$.`, a: R`Minimum $2$, $Q_1 = 5.5$, median $9$, $Q_3 = 14$, maximum $20$` },
      { q: R`Find the range and the IQR for the data in question 6.`, a: R`Range $18$, IQR $8.5$` },
      { q: R`Class A: median $68$, IQR $10$. Class B: median $72$, IQR $25$. Which class did better, and which was more consistent?`, a: R`Class B had the higher median. Class A was more consistent (smaller IQR).` },
    ],
  },

  "year-10-quadratic-equations": {
    title: "Year 10 quadratic equations, explained",
    lead: "Every quadratic equation in Year 10 comes down to the null factor law. Here's how to set it up, and the methods to use when it doesn't factorise straight away.",
    sections: [
      {
        h: "1. The null factor law",
        md: R`If two things multiply to give $0$, at least one of them is $0$. So for $(2x - 1)(x + 4) = 0$:
$$2x - 1 = 0 \quad \text{or} \quad x + 4 = 0$$
$$x = \frac{1}{2} \quad \text{or} \quad x = -4$$`,
      },
      {
        h: "2. Make one side zero first",
        md: R`The null factor law only works when one side is $0$. For $x^2 = 5x$, subtract $5x$ from both sides, then factorise:
$$x^2 - 5x = 0 \Rightarrow x(x - 5) = 0 \Rightarrow x = 0 \text{ or } x = 5$$
Don't divide both sides by $x$: that loses the solution $x = 0$.`,
      },
      {
        h: "3. Factorising a monic quadratic",
        md: R`For $x^2 + bx + c$, find two numbers that multiply to $c$ and add to $b$. For $x^2 + x - 12 = 0$, those numbers are $4$ and $-3$:
$$(x + 4)(x - 3) = 0 \Rightarrow x = -4 \text{ or } x = 3$$`,
      },
      {
        h: "4. Simple non-monic quadratics",
        md: R`When the $x^2$ term has a number in front, try factor pairs and check by expanding. $2x^2 - 7x + 3 = (2x - 1)(x - 3)$, because expanding gives $2x^2 - 6x - x + 3$. So $x = \dfrac{1}{2}$ or $x = 3$.`,
      },
      {
        h: "5. Completing the square",
        md: R`Halve the coefficient of $x$, square it, and use it to write a perfect square. For $x^2 + 6x - 7 = 0$:
$$x^2 + 6x + 9 = 7 + 9 \Rightarrow (x + 3)^2 = 16 \Rightarrow x + 3 = \pm 4$$
So $x = 1$ or $x = -7$. This method works even when a quadratic won't factorise neatly.`,
      },
    ],
    quiz: [
      { q: R`Solve $(x - 5)(x + 2) = 0$.`, a: R`$x = 5$ or $x = -2$` },
      { q: R`Solve $x(3x - 6) = 0$.`, a: R`$x = 0$ or $x = 2$` },
      { q: R`Solve $x^2 - 9 = 0$.`, a: R`$x = 3$ or $x = -3$` },
      { q: R`Solve $x^2 + 7x + 10 = 0$.`, a: R`$(x + 2)(x + 5) = 0$, so $x = -2$ or $x = -5$` },
      { q: R`Solve $x^2 - 3x - 28 = 0$.`, a: R`$(x - 7)(x + 4) = 0$, so $x = 7$ or $x = -4$` },
      { q: R`Solve $3x^2 + 5x - 2 = 0$.`, a: R`$(3x - 1)(x + 2) = 0$, so $x = \dfrac{1}{3}$ or $x = -2$` },
      { q: R`Solve $x^2 - 4x - 5 = 0$ by completing the square.`, a: R`$(x - 2)^2 = 9$, so $x = 5$ or $x = -1$` },
      { q: R`A rectangle is $4$ m longer than it is wide, and its area is $45$ m². Find its width and length.`, a: R`$x(x + 4) = 45$ gives $(x + 9)(x - 5) = 0$. The width is $5$ m and the length is $9$ m.` },
    ],
  },

  "year-10-linear-equations": {
    title: "Year 10 linear equations, explained",
    lead: "Year 10 linear equations have brackets, fractions and unknowns on both sides. Here's a reliable order of steps, plus rearranging formulas.",
    sections: [
      {
        h: "1. Keep the equation balanced",
        md: R`Whatever you do to one side, do to the other. Gather the $x$ terms on one side and the numbers on the other:
$$5x + 3 = 2x + 18 \Rightarrow 3x = 15 \Rightarrow x = 5$$`,
      },
      {
        h: "2. Expand brackets first",
        md: R`Watch the sign in front of each bracket:
$$4(x - 3) - 2(x + 1) = 10$$
$$4x - 12 - 2x - 2 = 10 \Rightarrow 2x - 14 = 10 \Rightarrow x = 12$$`,
      },
      {
        h: "3. Clear fractions by multiplying",
        md: R`Multiply every term by the lowest common denominator. For $\dfrac{x}{3} + \dfrac{x}{4} = 7$, multiply by $12$:
$$4x + 3x = 84 \Rightarrow 7x = 84 \Rightarrow x = 12$$`,
      },
      {
        h: "4. Rearranging formulas",
        md: R`Making a variable the subject uses the same steps as solving. From $v = u + at$, subtract $u$ and divide by $t$:
$$a = \frac{v - u}{t}$$
From $A = \dfrac{1}{2}bh$, multiply by $2$ and divide by $b$: $h = \dfrac{2A}{b}$.`,
      },
      {
        h: "5. Equations from words, and checking",
        md: R`Three consecutive whole numbers add to $72$. Call them $n$, $n + 1$ and $n + 2$:
$$3n + 3 = 72 \Rightarrow n = 23$$
The numbers are $23$, $24$ and $25$. Check by substituting back: $23 + 24 + 25 = 72$.`,
      },
    ],
    quiz: [
      { q: R`Solve $7x - 4 = 3x + 16$.`, a: R`$x = 5$` },
      { q: R`Solve $3(2x + 1) = 5x + 9$.`, a: R`$x = 6$` },
      { q: R`Solve $5(x - 2) - 3(x - 4) = 14$.`, a: R`$2x + 2 = 14$, so $x = 6$` },
      { q: R`Solve $\dfrac{x}{2} - \dfrac{x}{5} = 6$.`, a: R`$5x - 2x = 60$, so $x = 20$` },
      { q: R`Solve $\dfrac{x + 3}{4} = \dfrac{x - 1}{2}$.`, a: R`$2(x + 3) = 4(x - 1)$, so $x = 5$` },
      { q: R`Solve $4x + 7 = 2$.`, a: R`$x = -\dfrac{5}{4} = -1.25$` },
      { q: R`Make $r$ the subject of $C = 2\pi r$.`, a: R`$r = \dfrac{C}{2\pi}$` },
      { q: R`A taxi charges \$3.60 plus \$2.20 per kilometre. A trip cost \$25.60. How far was it?`, a: R`$3.6 + 2.2k = 25.6$, so $k = 10$ km` },
    ],
  },

  "year-10-linear-inequalities": {
    title: "Year 10 linear inequalities, explained",
    lead: "Inequalities are solved almost exactly like equations, with one rule that catches everyone out. Here it is, with number lines and word problems.",
    sections: [
      {
        h: "1. What the symbols mean",
        md: R`$x > 3$ means every number bigger than $3$, but not $3$ itself. On a number line, draw an open circle at $3$ and an arrow to the right. $x \le -1$ includes $-1$, so the circle at $-1$ is filled in and the arrow points left.`,
      },
      {
        h: "2. Solve it like an equation",
        md: R`Adding, subtracting, and multiplying or dividing by a positive number keep the inequality sign the same:
$$2x + 5 < 17 \Rightarrow 2x < 12 \Rightarrow x < 6$$`,
      },
      {
        h: "3. The one rule: negatives flip the sign",
        md: R`Multiplying or dividing both sides by a negative number reverses the inequality sign:
$$-3x + 4 \ge 19 \Rightarrow -3x \ge 15 \Rightarrow x \le -5$$
Check with a number from your answer. $x = -6$ gives $18 + 4 = 22$, which is at least $19$. A number outside it, $x = 0$, gives $4$, which isn't.`,
      },
      {
        h: "4. Brackets and fractions",
        md: R`Expand brackets and clear fractions first, exactly as for equations:
$$3(x - 2) > x + 4 \Rightarrow 3x - 6 > x + 4 \Rightarrow 2x > 10 \Rightarrow x > 5$$
$$\frac{x + 1}{3} \le 4 \Rightarrow x + 1 \le 12 \Rightarrow x \le 11$$`,
      },
      {
        h: "5. Word problems with whole numbers",
        md: R`Concert tickets cost \$6 each plus a \$4 booking fee, and you have \$40. With $n$ tickets, $6n + 4 \le 40$, so $6n \le 36$ and $n \le 6$. You can buy at most $6$ tickets. When the answer has to be a whole number, round in the direction the inequality allows.`,
      },
    ],
    quiz: [
      { q: R`Solve $x + 7 > 12$.`, a: R`$x > 5$` },
      { q: R`Solve $4x - 3 \le 13$.`, a: R`$x \le 4$` },
      { q: R`Solve $-2x > 8$.`, a: R`$x < -4$` },
      { q: R`Solve $5 - 3x \ge 20$.`, a: R`$x \le -5$` },
      { q: R`Solve $2(x + 3) < x - 1$.`, a: R`$x < -7$` },
      { q: R`Solve $\dfrac{x}{4} - 1 \ge 2$.`, a: R`$x \ge 12$` },
      { q: R`Solve $\dfrac{2 - x}{3} < 1$.`, a: R`$2 - x < 3$, so $x > -1$` },
      { q: R`A phone plan costs \$15 a month plus \$0.50 per GB of data. How many GB can you use to keep the bill at \$30 or less?`, a: R`$15 + 0.5g \le 30$, so $g \le 30$: up to $30$ GB` },
    ],
  },

  "year-9-linear-equations": {
    title: "Year 9 linear graphs and equations, explained",
    lead: "Year 9 connects straight-line graphs with the equations behind them. Here's how to read, sketch and solve them.",
    sections: [
      {
        h: "1. Gradient and y-intercept",
        md: R`In $y = mx + c$, $m$ is the gradient (how far the line rises for each step right) and $c$ is where it crosses the $y$-axis. For $y = -2x + 5$, the line crosses the $y$-axis at $5$ and goes down $2$ for every $1$ step to the right.`,
      },
      {
        h: "2. The gradient from two points",
        md: R`Gradient is rise over run. Through $(1, 3)$ and $(4, 12)$:
$$m = \frac{12 - 3}{4 - 1} = \frac{9}{3} = 3$$
Substitute one point to find $c$: $3 = 3(1) + c$, so $c = 0$ and the line is $y = 3x$.`,
      },
      {
        h: "3. Sketching from the intercepts",
        md: R`For an equation like $2x + 3y = 12$, set $x = 0$ to get the $y$-intercept ($y = 4$), and $y = 0$ to get the $x$-intercept ($x = 6$). Plot $(0, 4)$ and $(6, 0)$ and join them.`,
      },
      {
        h: "4. Horizontal and vertical lines",
        md: R`$y = 4$ is a horizontal line through $4$ on the $y$-axis, with a gradient of $0$. $x = -2$ is a vertical line through $-2$ on the $x$-axis. Its gradient is undefined.`,
      },
      {
        h: "5. Where two lines meet",
        md: R`At the point of intersection, both equations give the same $y$. For $y = 2x + 1$ and $y = -x + 7$:
$$2x + 1 = -x + 7 \Rightarrow 3x = 6 \Rightarrow x = 2$$
Then $y = 2(2) + 1 = 5$, so the lines meet at $(2, 5)$.`,
      },
    ],
    quiz: [
      { q: R`State the gradient and $y$-intercept of $y = 4x - 7$.`, a: R`Gradient $4$, $y$-intercept $-7$` },
      { q: R`Solve $6x - 5 = 2x + 11$.`, a: R`$x = 4$` },
      { q: R`Find the gradient of the line through $(2, 1)$ and $(6, 9)$.`, a: R`$\dfrac{9 - 1}{6 - 2} = 2$` },
      { q: R`Write the equation of the line with gradient $5$ that crosses the $y$-axis at $-3$.`, a: R`$y = 5x - 3$` },
      { q: R`Find the $x$- and $y$-intercepts of $3x + 2y = 6$.`, a: R`$(2, 0)$ and $(0, 3)$` },
      { q: R`Does the point $(3, 5)$ lie on $y = 2x - 1$?`, a: R`Yes: $2(3) - 1 = 5$` },
      { q: R`Find where $y = x + 4$ and $y = 3x$ intersect.`, a: R`$(2, 6)$` },
      { q: R`Solve $2(x + 5) = 3(x - 1)$.`, a: R`$2x + 10 = 3x - 3$, so $x = 13$` },
    ],
  },
};

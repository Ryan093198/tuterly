const R = String.raw;

// Skill pages, batch D (8 Nov 2026): linear equations, simultaneous
// equations, Pythagoras and factorising. Volumes are Australian monthly
// searches from Google Keyword Planner (Nov 2026). Every example and quiz
// answer was checked in code (scratchpad/skilld/check-skills-d.py).
// Australian spelling, no em or en dashes, money as \$ outside maths.

export const SKILL_PAGES_D = [
  {
    slug: "linear-equations",
    keyword: "linear equations worksheet",
    monthlySearches: 320,
    topicSlug: "year-8-linear-equations",
    relatedSlugs: ["year-7-linear-equations", "year-8-linear-equations", "year-9-linear-equations", "year-10-linear-equations", "year-10-equations-with-fractions"],
    metaTitle: "Linear Equations Worksheets with Answers (Free) | Tuterly",
    metaDescription:
      "Free linear equations worksheets with answers: one-step and two-step equations, pronumerals on both sides, brackets and equations with fractions. Worked examples and a quick check.",
    h1: "Linear equations worksheets with answers",
    lead: "Every linear equation is solved the same way: do the same thing to both sides until the pronumeral is on its own. Learn each type, then make a free worksheet with full solutions.",
    guide: {
      title: "Linear equations, explained",
      lead: "From one-step equations in Year 7 to fractions on both sides in Year 10, one type at a time.",
      sections: [
        {
          h: "1. One-step equations",
          md: R`Use the inverse operation to undo what has been done to the pronumeral:
$$x + 7 = 12, \quad x = 5 \qquad 4x = 28, \quad x = 7 \qquad \frac{x}{3} = 6, \quad x = 18$$
Adding undoes subtracting, and multiplying undoes dividing.`,
        },
        {
          h: "2. Two-step equations",
          md: R`Undo the adding or subtracting first, then the multiplying or dividing:
$$5x - 3 = 22, \quad 5x = 25, \quad x = 5$$
Whatever you do to one side, do to the other.`,
        },
        {
          h: "3. Pronumerals on both sides",
          md: R`Move the smaller pronumeral term so the pronumeral is only on one side, then solve as before:
$$7x - 4 = 3x + 12$$
$$4x - 4 = 12, \quad 4x = 16, \quad x = 4$$
Subtracting $3x$ from both sides keeps the coefficient positive.`,
        },
        {
          h: "4. Equations with brackets",
          md: R`Expand the brackets first, then collect the pronumerals on one side:
$$3(2x - 1) = 4(x + 2)$$
$$6x - 3 = 4x + 8, \quad 2x = 11, \quad x = 5.5$$
Answers do not have to be whole numbers.`,
        },
        {
          h: "5. Equations with fractions",
          md: R`Multiply every term by the lowest common denominator to clear the fractions:
$$\frac{x}{2} + \frac{x}{3} = 10 \quad \xrightarrow{\times 6} \quad 3x + 2x = 60, \quad 5x = 60, \quad x = 12$$
With one fraction on each side, cross-multiply:
$$\frac{2x + 1}{5} = \frac{x - 1}{2}, \quad 2(2x + 1) = 5(x - 1), \quad 4x + 2 = 5x - 5, \quad x = 7$$`,
        },
        {
          h: "6. Check, then use it in word problems",
          md: R`Substitute to check: for $x = 4$ in $7x - 4 = 3x + 12$, the left side is $24$ and the right side is $24$, so it's right.

Three consecutive whole numbers add to $72$. Let the smallest be $n$:
$$n + (n + 1) + (n + 2) = 72, \quad 3n + 3 = 72, \quad n = 23$$
The numbers are $23$, $24$ and $25$.`,
        },
      ],
      quiz: [
        { q: R`Solve $x - 9 = 4$.`, a: R`$x = 13$` },
        { q: R`Solve $\frac{x}{5} = 8$.`, a: R`$x = 40$` },
        { q: R`Solve $3x + 8 = 29$.`, a: R`$x = 7$` },
        { q: R`Solve $9 - 2x = 15$.`, a: R`$-2x = 6$, so $x = -3$` },
        { q: R`Solve $5x + 2 = 2x + 17$.`, a: R`$3x = 15$, so $x = 5$` },
        { q: R`Solve $4(x - 3) = 2x + 6$.`, a: R`$4x - 12 = 2x + 6$, $2x = 18$, so $x = 9$` },
        { q: R`Solve $3(x + 4) - 2(x - 1) = 20$.`, a: R`$x + 14 = 20$, so $x = 6$` },
        { q: R`Solve $\frac{x}{4} - \frac{x}{6} = 2$.`, a: R`$3x - 2x = 24$, so $x = 24$` },
        { q: R`Solve $\frac{x + 3}{2} = \frac{2x - 1}{3}$.`, a: R`$3x + 9 = 4x - 2$, so $x = 11$` },
        { q: R`Jess is three times as old as her brother. In $4$ years their ages will add to $40$. How old is Jess now?`, a: R`$b + 3b + 8 = 40$, so $b = 8$ and Jess is $24$` },
      ],
    },
    faqs: [
      { q: "What is a linear equation?", a: "A linear equation has a pronumeral raised only to the power of one, such as 3x + 5 = 20. It has one solution, and its graph is a straight line." },
      { q: "How do you solve an equation with pronumerals on both sides?", a: "Subtract the smaller pronumeral term from both sides so the pronumeral appears on one side only, then solve it like a two-step equation. Expand any brackets first." },
      { q: "Do the linear equations worksheets come with answers?", a: "Yes. Every question on a generated worksheet has a fully worked solution, and every example on this page shows each step." },
    ],
  },

  {
    slug: "simultaneous-equations",
    keyword: "simultaneous equations worksheet",
    monthlySearches: 260,
    topicSlug: "year-10-simultaneous-equations",
    relatedSlugs: ["year-10-simultaneous-equations", "year-9-linear-equations", "year-9-coordinate-geometry", "year-10a-non-linear-simultaneous-equations"],
    metaTitle: "Simultaneous Equations Worksheets with Answers | Tuterly",
    metaDescription:
      "Free simultaneous equations worksheets with answers: the substitution method, elimination, multiplying before you eliminate, checking a solution and worded problems. Worked examples and a quick check.",
    h1: "Simultaneous equations worksheets with answers",
    lead: "Simultaneous equations are two equations that share the same solution. Learn substitution and elimination, then make a free worksheet with full solutions.",
    guide: {
      title: "Simultaneous equations, explained",
      lead: "Two methods cover every linear pair. Here's how each one works and when to use it.",
      sections: [
        {
          h: "1. What the solution means",
          md: R`The solution is the pair of values that makes both equations true at once. For
$$x + y = 10 \qquad x - y = 4$$
the solution is $x = 7$, $y = 3$, because $7 + 3 = 10$ and $7 - 3 = 4$. On a graph, it is the point $(7, 3)$ where the two lines cross.`,
        },
        {
          h: "2. Substitution",
          md: R`Use this when one equation already says $y = \ldots$ or $x = \ldots$. Replace that pronumeral in the other equation:
$$y = 2x - 1 \qquad 3x + y = 14$$
$$3x + (2x - 1) = 14, \quad 5x = 15, \quad x = 3$$
Then $y = 2(3) - 1 = 5$.`,
        },
        {
          h: "3. Elimination",
          md: R`If one pronumeral has the same coefficient in both equations, subtract the equations to remove it (add them if the signs are opposite):
$$2x + 3y = 13 \qquad 2x + y = 7$$
Subtracting gives $2y = 6$, so $y = 3$. Then $2x + 3 = 7$, so $x = 2$.`,
        },
        {
          h: "4. Multiplying first",
          md: R`If no coefficients match, multiply one or both equations so they do:
$$2x + 3y = 12 \qquad 3x - 2y = 5$$
Multiply the first by $2$ and the second by $3$:
$$4x + 6y = 24 \qquad 9x - 6y = 15$$
Adding gives $13x = 39$, so $x = 3$. Then $2(3) + 3y = 12$, so $y = 2$.`,
        },
        {
          h: "5. Check in both equations",
          md: R`Substitute the answer into both original equations, not just one. For $x = 3$, $y = 2$:
$$2(3) + 3(2) = 12 \checkmark \qquad 3(3) - 2(2) = 5 \checkmark$$
A pair that only works in one equation is not a solution.`,
        },
        {
          h: "6. Worded problems",
          md: R`Adult tickets cost \$15 and child tickets cost \$9. A group buys $10$ tickets for \$126. Let $a$ be adult tickets and $c$ child tickets:
$$a + c = 10 \qquad 15a + 9c = 126$$
Substitute $c = 10 - a$: $15a + 90 - 9a = 126$, so $6a = 36$, $a = 6$ and $c = 4$. Define your pronumerals, write two equations, then solve.`,
        },
      ],
      quiz: [
        { q: R`Solve $x + y = 9$ and $x - y = 3$.`, a: R`$x = 6$, $y = 3$` },
        { q: R`Solve $y = x + 2$ and $x + y = 12$.`, a: R`$2x + 2 = 12$, so $x = 5$, $y = 7$` },
        { q: R`Is $x = 2$, $y = -1$ a solution of $3x + y = 5$ and $x - 2y = 3$?`, a: R`No. It works in the first, but $2 - 2(-1) = 4$, not $3$` },
        { q: R`Solve $y = 3x$ and $2x + y = 20$.`, a: R`$5x = 20$, so $x = 4$, $y = 12$` },
        { q: R`Solve $3x + y = 11$ and $x + y = 5$.`, a: R`Subtract: $2x = 6$, so $x = 3$, $y = 2$` },
        { q: R`Solve $2x + y = 9$ and $3x - y = 11$.`, a: R`Add: $5x = 20$, so $x = 4$, $y = 1$` },
        { q: R`Solve $y = 2x - 3$ and $4x - y = 9$.`, a: R`$4x - 2x + 3 = 9$, so $x = 3$, $y = 3$` },
        { q: R`Solve $x + 2y = 7$ and $3x + y = 11$.`, a: R`Double the second and subtract: $5x = 15$, so $x = 3$, $y = 2$` },
        { q: R`Solve $4x + 3y = 18$ and $5x - 2y = 11$.`, a: R`$8x + 6y = 36$ and $15x - 6y = 33$, so $23x = 69$, $x = 3$, $y = 2$` },
        { q: R`Three pens and two notebooks cost \$13. One pen and four notebooks cost \$16. Find the cost of each.`, a: R`$3p + 2n = 13$ and $p + 4n = 16$, so a pen is \$2 and a notebook is \$3.50` },
      ],
    },
    faqs: [
      { q: "What are simultaneous equations?", a: "Simultaneous equations are two or more equations with the same unknowns that are solved together. The solution is the pair of values that makes every equation true, which is where their graphs cross." },
      { q: "Should I use substitution or elimination?", a: "Use substitution when one equation is already written as y = or x =. Use elimination when both equations are in the form ax + by = c, especially if a coefficient already matches." },
      { q: "Do the worksheets include worked solutions?", a: "Yes. Every question on a generated worksheet comes with a fully worked solution, so students can follow each step of the method." },
    ],
  },

  {
    slug: "pythagoras",
    keyword: "pythagoras worksheet",
    monthlySearches: 170,
    topicSlug: "year-8-pythagoras",
    relatedSlugs: ["year-8-pythagoras", "year-9-pythagoras", "year-9-trigonometry", "year-10a-3d-trigonometry"],
    metaTitle: "Pythagoras' Theorem Worksheets with Answers (Free) | Tuterly",
    metaDescription:
      "Free Pythagoras worksheets with answers: finding the hypotenuse, finding a shorter side, Pythagorean triples, testing for a right angle and worded problems. Worked examples and a quick check.",
    h1: "Pythagoras' theorem worksheets with answers",
    lead: "Pythagoras' theorem links the three sides of any right-angled triangle. Learn to find any missing side, then make a free worksheet with full solutions.",
    guide: {
      title: "Pythagoras' theorem, explained",
      lead: "One rule, used forwards to find the hypotenuse, backwards to find a shorter side, and as a test for right angles.",
      sections: [
        {
          h: "1. The theorem",
          md: R`In a right-angled triangle with shorter sides $a$ and $b$ and hypotenuse $c$:
$$c^2 = a^2 + b^2$$
The hypotenuse is the longest side, opposite the right angle. Label it first, every time.`,
        },
        {
          h: "2. Finding the hypotenuse",
          md: R`Square the two shorter sides, add, then take the square root:
$$c^2 = 6^2 + 8^2 = 36 + 64 = 100, \quad c = 10$$
If the answer is not exact, round at the end: with sides $5$ and $7$,
$$c = \sqrt{25 + 49} = \sqrt{74} \approx 8.60$$`,
        },
        {
          h: "3. Finding a shorter side",
          md: R`Subtract instead of adding:
$$b^2 = c^2 - a^2 = 13^2 - 5^2 = 169 - 25 = 144, \quad b = 12$$
With a hypotenuse of $10$ and a side of $7$: $b = \sqrt{100 - 49} = \sqrt{51} \approx 7.14$. A shorter side must come out smaller than the hypotenuse.`,
        },
        {
          h: "4. Pythagorean triples",
          md: R`Some whole-number sets fit exactly. Worth knowing:
$$3, 4, 5 \qquad 5, 12, 13 \qquad 8, 15, 17 \qquad 7, 24, 25$$
Any multiple of a triple is also a triple, so $6, 8, 10$ and $9, 12, 15$ work too.`,
        },
        {
          h: "5. Testing for a right angle",
          md: R`A triangle is right-angled only if the square of the longest side equals the sum of the squares of the other two. For $9, 40, 41$:
$$9^2 + 40^2 = 81 + 1600 = 1681 = 41^2$$
so it is right-angled. For $6, 7, 9$: $36 + 49 = 85$ but $9^2 = 81$, so it is not.`,
        },
        {
          h: "6. Worded problems",
          md: R`A $5$ m ladder leans against a wall with its foot $1.5$ m from the wall. How high up the wall does it reach?
$$h = \sqrt{5^2 - 1.5^2} = \sqrt{22.75} \approx 4.77 \text{ m}$$
Draw the triangle, mark the right angle, and decide whether the unknown is the hypotenuse.`,
        },
      ],
      quiz: [
        { q: R`Find the hypotenuse when the shorter sides are $3$ cm and $4$ cm.`, a: R`$5$ cm` },
        { q: R`Find the hypotenuse when the shorter sides are $9$ m and $12$ m.`, a: R`$15$ m` },
        { q: R`The hypotenuse is $17$ cm and one side is $8$ cm. Find the other side.`, a: R`$\sqrt{289 - 64} = 15$ cm` },
        { q: R`Find the hypotenuse when the shorter sides are $4$ cm and $6$ cm, to 2 decimal places.`, a: R`$\sqrt{52} \approx 7.21$ cm` },
        { q: R`The hypotenuse is $12$ m and one side is $5$ m. Find the other side to 2 decimal places.`, a: R`$\sqrt{119} \approx 10.91$ m` },
        { q: R`Is a triangle with sides $7$, $24$ and $25$ right-angled?`, a: R`Yes: $49 + 576 = 625 = 25^2$` },
        { q: R`Is a triangle with sides $5$, $9$ and $11$ right-angled?`, a: R`No: $25 + 81 = 106$, but $11^2 = 121$` },
        { q: R`Find the length of the diagonal of a $20$ cm by $15$ cm rectangle.`, a: R`$\sqrt{400 + 225} = 25$ cm` },
        { q: R`Mia walks $7$ km north, then $4$ km east. How far is she from her starting point, to 2 decimal places?`, a: R`$\sqrt{65} \approx 8.06$ km` },
        { q: R`A $6$ m ladder reaches $5.5$ m up a wall. How far is its foot from the wall, to 2 decimal places?`, a: R`$\sqrt{36 - 30.25} = \sqrt{5.75} \approx 2.40$ m` },
      ],
    },
    faqs: [
      { q: "What is Pythagoras' theorem?", a: "In a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides: c squared equals a squared plus b squared. It only works for right-angled triangles." },
      { q: "How do you find a shorter side with Pythagoras?", a: "Square the hypotenuse, subtract the square of the known shorter side, then take the square root. Check your answer is smaller than the hypotenuse." },
      { q: "Which year level learns Pythagoras' theorem?", a: "Pythagoras is introduced in Year 8 or Year 9, depending on the school, and is used again in Year 9 and 10 trigonometry, coordinate geometry and 3D problems." },
    ],
  },

  {
    slug: "factorising",
    keyword: "factorising worksheet",
    monthlySearches: 170,
    topicSlug: "year-10-quadratic-factorising",
    relatedSlugs: ["year-10-quadratic-factorising", "year-10-common-factors", "year-9-quadratics", "year-10a-non-monic-quadratics", "year-8-algebra"],
    metaTitle: "Factorising Worksheets with Answers (Free) | Tuterly",
    metaDescription:
      "Free factorising worksheets with answers: taking out the HCF, the difference of two squares, monic and non-monic quadratic trinomials, and grouping in pairs. Worked examples and a quick check.",
    h1: "Factorising worksheets with answers",
    lead: "Factorising is expanding in reverse: you write an expression as a product of brackets. Learn the five methods and when to use each, then make a free worksheet with full solutions.",
    guide: {
      title: "Factorising, explained",
      lead: "Always look for a common factor first, then count the terms to choose the method.",
      sections: [
        {
          h: "1. Take out the highest common factor",
          md: R`Find the HCF of every term, write it outside the bracket, and divide each term by it:
$$6x + 15 = 3(2x + 5) \qquad 8a^2 - 12a = 4a(2a - 3)$$
Expand your answer to check it gives back the original.`,
        },
        {
          h: "2. The difference of two squares",
          md: R`Two perfect squares with a minus between them factorise as
$$a^2 - b^2 = (a - b)(a + b)$$
$$x^2 - 49 = (x - 7)(x + 7) \qquad 9y^2 - 16 = (3y - 4)(3y + 4)$$
Take out a common factor first if there is one: $2x^2 - 50 = 2(x - 5)(x + 5)$.`,
        },
        {
          h: "3. Monic quadratic trinomials",
          md: R`For $x^2 + bx + c$, find two numbers that multiply to $c$ and add to $b$. For $x^2 + 7x + 12$, the numbers are $3$ and $4$:
$$x^2 + 7x + 12 = (x + 3)(x + 4)$$
Watch the signs: $x^2 - 2x - 15 = (x - 5)(x + 3)$, because $-5 \times 3 = -15$ and $-5 + 3 = -2$.`,
        },
        {
          h: "4. Non-monic quadratic trinomials",
          md: R`For $ax^2 + bx + c$, find two numbers that multiply to $ac$ and add to $b$, split the middle term, then group. For $2x^2 + 7x + 3$, $ac = 6$, and $6$ and $1$ add to $7$:
$$2x^2 + 6x + x + 3 = 2x(x + 3) + 1(x + 3) = (2x + 1)(x + 3)$$`,
        },
        {
          h: "5. Grouping in pairs",
          md: R`With four terms, factorise each pair, then take out the common bracket:
$$xy + 5x + 2y + 10 = x(y + 5) + 2(y + 5) = (y + 5)(x + 2)$$
If the brackets don't match, try pairing the terms a different way.`,
        },
        {
          h: "6. Putting it together",
          md: R`HCF first, then count the terms: two terms suggests the difference of two squares, three terms a trinomial, four terms grouping.
$$3x^2 - 12x - 36 = 3(x^2 - 4x - 12) = 3(x - 6)(x + 2)$$
An expression is fully factorised when no bracket can be factorised further.`,
        },
      ],
      quiz: [
        { q: R`Factorise $5x + 20$.`, a: R`$5(x + 4)$` },
        { q: R`Factorise $12a^2 - 18a$.`, a: R`$6a(2a - 3)$` },
        { q: R`Factorise $x^2 - 36$.`, a: R`$(x - 6)(x + 6)$` },
        { q: R`Factorise $x^2 + 9x + 20$.`, a: R`$(x + 4)(x + 5)$` },
        { q: R`Factorise $x^2 - x - 12$.`, a: R`$(x - 4)(x + 3)$` },
        { q: R`Factorise $25m^2 - 4$.`, a: R`$(5m - 2)(5m + 2)$` },
        { q: R`Factorise $3x^2 - 27$ fully.`, a: R`$3(x^2 - 9) = 3(x - 3)(x + 3)$` },
        { q: R`Factorise $ab + 4a + 3b + 12$.`, a: R`$a(b + 4) + 3(b + 4) = (b + 4)(a + 3)$` },
        { q: R`Factorise $2x^2 + 5x - 3$.`, a: R`$2x^2 + 6x - x - 3 = (2x - 1)(x + 3)$` },
        { q: R`Factorise $6x^2 - 11x + 4$.`, a: R`$6x^2 - 8x - 3x + 4 = (3x - 4)(2x - 1)$` },
      ],
    },
    faqs: [
      { q: "What does factorising mean?", a: "Factorising means writing an expression as a product of its factors, usually with brackets. It is the reverse of expanding, so expanding your answer is a quick way to check it." },
      { q: "What should you look for first when factorising?", a: "Always take out the highest common factor first. Then count the terms: two terms may be a difference of two squares, three terms a quadratic trinomial, and four terms can often be grouped in pairs." },
      { q: "Do the factorising worksheets come with answers?", a: "Yes. Every question on a generated worksheet has a fully worked solution, and you can choose a year level to get a free printable PDF." },
    ],
  },
];

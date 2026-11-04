const R = String.raw;

// Topic guides, batch 2 (4 Nov 2026): the remaining high-volume pages Google
// had crawled but not indexed. Same shape as TOPIC_GUIDES in
// lib/topic-guides.js. Every number checked in code
// (scratchpad/check-b2.mjs). Markdown with KaTeX; money as \$. No em dashes.

export const TOPIC_GUIDES_B2 = {
  "year-7-integers": {
    title: "Integers, explained",
    lead: "Positive and negative whole numbers, and the rules for adding and subtracting them, with an example of each.",
    sections: [
      {
        h: "1. The number line",
        md: R`Integers are the whole numbers and their negatives: $\ldots, -3, -2, -1, 0, 1, 2, 3, \ldots$ On a number line, numbers get bigger as you move right. So $-2 > -7$, even though $7$ is bigger than $2$. Ordered from smallest to largest, $-8, -3, 0, 4, 9$.`,
      },
      {
        h: "2. Adding integers with the same sign",
        md: R`Add the sizes and keep the sign.
$$-4 + (-6) = -10 \qquad 5 + 3 = 8$$`,
      },
      {
        h: "3. Adding integers with opposite signs",
        md: R`Find the difference between the sizes, then use the sign of the number further from zero.
$$-9 + 4 = -5 \qquad 11 + (-3) = 8$$`,
      },
      {
        h: "4. Subtracting: add the opposite",
        md: R`Subtracting a number is the same as adding its opposite. That's why subtracting a negative makes the answer bigger.
$$3 - 8 = 3 + (-8) = -5 \qquad 2 - (-6) = 2 + 6 = 8$$`,
      },
      {
        h: "5. Integers in real life",
        md: R`Temperatures below zero, money owed and depths below sea level are all negatives. A temperature of $-4^\circ$C that rises $9$ degrees ends at $-4 + 9 = 5^\circ$C. The change from $-4^\circ$C to $5^\circ$C is $5 - (-4) = 9$ degrees.`,
      },
    ],
    quiz: [
      { q: R`Which is larger, $-3$ or $-11$?`, a: R`$-3$` },
      { q: R`Order from smallest to largest: $4, -6, 0, -1, -9$.`, a: R`$-9, -6, -1, 0, 4$` },
      { q: R`Calculate $-7 + (-5)$.`, a: R`$-12$` },
      { q: R`Calculate $-12 + 8$.`, a: R`$-4$` },
      { q: R`Calculate $6 - 10$.`, a: R`$-4$` },
      { q: R`Calculate $-3 - (-9)$.`, a: R`$6$` },
      { q: R`At 6 am the temperature was $-5^\circ$C. By noon it had risen $12$ degrees. What was the temperature at noon?`, a: R`$7^\circ$C` },
      { q: R`A diver is at $-18$ m and swims up $7$ m, then down $4$ m. Where is the diver now?`, a: R`$-18 + 7 - 4 = -15$, so $15$ m below the surface` },
    ],
  },

  "year-7-ratios": {
    title: "Ratios, explained",
    lead: "How to write, simplify and use ratios, with an example of each.",
    sections: [
      {
        h: "1. What a ratio says",
        md: R`A ratio compares amounts of the same kind, in a fixed order. If a fruit bowl has $3$ apples and $5$ oranges, the ratio of apples to oranges is $3 : 5$, and oranges to apples is $5 : 3$. Order matters.`,
      },
      {
        h: "2. Simplifying a ratio",
        md: R`Divide every part by the highest common factor, just like simplifying a fraction.
$$24 : 36 = 2 : 3 \quad \text{(divide both by } 12\text{)}$$
Write both parts in the same units first: $50$ cm to $2$ m is $50 : 200 = 1 : 4$.`,
      },
      {
        h: "3. Equivalent ratios",
        md: R`Multiplying or dividing every part by the same number gives an equivalent ratio. $2 : 3$, $4 : 6$ and $10 : 15$ are all equivalent. To find a missing value in $3 : 4 = 12 : ?$, notice $3 \times 4 = 12$, so the missing value is $4 \times 4 = 16$.`,
      },
      {
        h: "4. Dividing a quantity in a ratio",
        md: R`Add the parts, find one part, then multiply. To share \$60 in the ratio $2 : 3$:
$$2 + 3 = 5 \text{ parts}, \quad 60 \div 5 = 12, \quad 2 \times 12 = 24, \quad 3 \times 12 = 36$$
So the shares are \$24 and \$36. Check: $24 + 36 = 60$.`,
      },
      {
        h: "5. Scaling a recipe",
        md: R`A recipe for $4$ people uses $300$ g of flour. For $6$ people, multiply by $\dfrac{6}{4} = 1.5$, so you need $300 \times 1.5 = 450$ g.`,
      },
    ],
    quiz: [
      { q: R`Simplify $18 : 27$.`, a: R`$2 : 3$` },
      { q: R`Simplify $40 : 100$.`, a: R`$2 : 5$` },
      { q: R`Write $75$ cents to \$3 as a ratio in simplest form.`, a: R`$75 : 300 = 1 : 4$` },
      { q: R`Find the missing value: $5 : 2 = 35 : ?$`, a: R`$14$` },
      { q: R`Share \$84 in the ratio $3 : 4$.`, a: R`\$36 and \$48` },
      { q: R`A class has boys and girls in the ratio $4 : 5$. There are $27$ students. How many are girls?`, a: R`$15$` },
      { q: R`Cordial is mixed with water in the ratio $1 : 6$. How much water goes with $250$ mL of cordial?`, a: R`$1500$ mL ($1.5$ L)` },
      { q: R`A recipe for $4$ uses $2$ cups of rice. How much rice is needed for $10$ people?`, a: R`$5$ cups` },
    ],
  },

  "year-10-trigonometry": {
    title: "Trigonometry in Year 10, explained",
    lead: "Choosing the right ratio, angles of elevation and depression, bearings and 3D problems, each with an example.",
    sections: [
      {
        h: "1. SOH CAH TOA",
        md: R`In a right-angled triangle, label the sides from the angle $\theta$: opposite, adjacent and hypotenuse.
$$\sin\theta = \frac{O}{H} \qquad \cos\theta = \frac{A}{H} \qquad \tan\theta = \frac{O}{A}$$
Pick the ratio that uses the side you know and the side you want. Make sure your calculator is in degrees.`,
      },
      {
        h: "2. Finding a side, then an angle",
        md: R`Hypotenuse $10$ cm and angle $35^\circ$: the opposite side is $10\sin 35^\circ \approx 5.74$ cm.

To find an angle, use the inverse: if the opposite side is $7$ and the adjacent side is $9$, then $\theta = \tan^{-1}\left(\dfrac{7}{9}\right) \approx 37.9^\circ$.`,
      },
      {
        h: "3. Pythagoras or trigonometry?",
        md: R`Two sides known and you want the third side: Pythagoras. An angle is given or wanted: trigonometry. Many problems need both, one after the other.`,
      },
      {
        h: "4. Elevation, depression and bearings",
        md: R`An angle of elevation is measured up from the horizontal; an angle of depression is measured down from the horizontal. They are equal for two points looking at each other (alternate angles).

A three-figure bearing is measured clockwise from north, so east is $090^\circ$, south is $180^\circ$ and west is $270^\circ$.`,
      },
      {
        h: "5. Trigonometry in 3D",
        md: R`Find the right-angled triangle inside the shape, usually with Pythagoras first. In a box $8$ cm long, $6$ cm wide and $5$ cm high, the base diagonal is $\sqrt{8^2 + 6^2} = 10$ cm, so the angle the space diagonal makes with the base is
$$\tan^{-1}\left(\frac{5}{10}\right) \approx 26.6^\circ$$`,
      },
    ],
    quiz: [
      { q: R`In a right-angled triangle the hypotenuse is $15$ cm and one angle is $40^\circ$. Find the side opposite the angle, to 2 decimal places.`, a: R`$15\sin 40^\circ \approx 9.64$ cm` },
      { q: R`The side adjacent to a $25^\circ$ angle is $12$ m. Find the opposite side, to 2 decimal places.`, a: R`$12\tan 25^\circ \approx 5.60$ m` },
      { q: R`The opposite side is $5$ and the hypotenuse is $13$. Find the angle, to 1 decimal place.`, a: R`$\sin^{-1}\left(\dfrac{5}{13}\right) \approx 22.6^\circ$` },
      { q: R`A $6$ m ladder makes an angle of $70^\circ$ with the ground. How high up the wall does it reach, to 2 decimal places?`, a: R`$6\sin 70^\circ \approx 5.64$ m` },
      { q: R`From $50$ m away, the angle of elevation to the top of a tower is $32^\circ$. How tall is the tower, to 1 decimal place?`, a: R`$50\tan 32^\circ \approx 31.2$ m` },
      { q: R`From a $40$ m cliff, the angle of depression to a boat is $18^\circ$. How far is the boat from the foot of the cliff, to the nearest metre?`, a: R`$\dfrac{40}{\tan 18^\circ} \approx 123$ m` },
      { q: R`What is the three-figure bearing of south-west?`, a: R`$225^\circ$` },
      { q: R`A box is $8$ cm by $6$ cm by $5$ cm. Find the length of its longest diagonal, to 1 decimal place.`, a: R`$\sqrt{64 + 36 + 25} = \sqrt{125} \approx 11.2$ cm` },
    ],
  },

  "year-8-area-perimeter": {
    title: "Area and perimeter of composite shapes, explained",
    lead: "How to break a composite shape into simple pieces, and the formulas you need, with an example of each.",
    sections: [
      {
        h: "1. The formulas",
        md: R`| Shape | Area |
|---|---|
| Rectangle | $A = lw$ |
| Triangle | $A = \tfrac{1}{2}bh$ |
| Parallelogram | $A = bh$ |
| Trapezium | $A = \tfrac{1}{2}(a + b)h$ |

The height $h$ is always the perpendicular height, at right angles to the base, not the slanted side.`,
      },
      {
        h: "2. Adding pieces",
        md: R`Split the shape into rectangles and triangles, find each area, then add. An L-shape made of a $10 \times 4$ rectangle and a $3 \times 5$ rectangle has area
$$40 + 15 = 55 \text{ m}^2$$`,
      },
      {
        h: "3. Subtracting a cut-out",
        md: R`Sometimes it's easier to find the whole rectangle and take away the missing part. A $12 \times 8$ rectangle with a $3 \times 3$ square cut from one corner has area
$$96 - 9 = 87 \text{ cm}^2$$`,
      },
      {
        h: "4. Perimeter: walk around the outside",
        md: R`Add every outside edge once, working out any missing lengths first. For an L-shape, the missing horizontal edge is the total width minus the part you know, and the same for the missing vertical edge. A useful check: an L-shape cut from a $12 \times 8$ rectangle has the same perimeter as the full rectangle, $2(12 + 8) = 40$ cm.`,
      },
      {
        h: "5. Area in real problems",
        md: R`Paving, carpet and paint are about area (square units). Fencing, edging and skirting boards are about perimeter (units). If pavers cost \$45 per square metre, paving $18 \text{ m}^2$ costs $18 \times 45 = 810$, so \$810.`,
      },
    ],
    quiz: [
      { q: R`Find the area of a triangle with base $14$ cm and perpendicular height $9$ cm.`, a: R`$63 \text{ cm}^2$` },
      { q: R`Find the area of a parallelogram with base $11$ m and perpendicular height $6$ m.`, a: R`$66 \text{ m}^2$` },
      { q: R`Find the area of a trapezium with parallel sides $8$ cm and $12$ cm and height $5$ cm.`, a: R`$50 \text{ cm}^2$` },
      { q: R`An L-shape is made from a $9 \times 4$ rectangle and a $5 \times 3$ rectangle. Find its area.`, a: R`$36 + 15 = 51$ square units` },
      { q: R`A $15 \times 10$ m garden has a $4 \times 4$ m shed in one corner. What area is left for lawn?`, a: R`$150 - 16 = 134 \text{ m}^2$` },
      { q: R`A rectangle $10$ cm by $6$ cm has a triangle with base $10$ cm and height $4$ cm on top of its longer side. Find the total area.`, a: R`$60 + 20 = 80 \text{ cm}^2$` },
      { q: R`An L-shaped room is a $12 \times 8$ m rectangle with a $4 \times 3$ m corner cut out. Find its perimeter.`, a: R`$40$ m, the same as the full rectangle` },
      { q: R`A courtyard of $24 \text{ m}^2$ is paved at \$52 per square metre. What does it cost?`, a: R`\$1248` },
    ],
  },

  "year-9-exponent-laws": {
    title: "Exponent laws, explained",
    lead: "The index laws for products, quotients, powers and the zero index, each with an example.",
    sections: [
      {
        h: "1. Multiplying: add the indices",
        md: R`When the bases are the same, multiply by adding the indices.
$$a^3 \times a^4 = a^7 \qquad 2x^2 \times 5x^3 = 10x^5$$
Multiply the numbers (coefficients) as normal.`,
      },
      {
        h: "2. Dividing: subtract the indices",
        md: R`$$\frac{m^9}{m^4} = m^5 \qquad \frac{12y^6}{4y^2} = 3y^4$$
Divide the coefficients, then subtract the indices.`,
      },
      {
        h: "3. Power of a power: multiply the indices",
        md: R`$$(p^3)^4 = p^{12} \qquad (3k^2)^3 = 27k^6$$
Everything inside the brackets is raised to the power, including the number: $3^3 = 27$.`,
      },
      {
        h: "4. The zero index",
        md: R`Anything (except zero) to the power $0$ is $1$, because $\dfrac{a^3}{a^3} = a^0$ and also equals $1$. So $7^0 = 1$ and $5x^0 = 5 \times 1 = 5$, but $(5x)^0 = 1$.`,
      },
      {
        h: "5. A look ahead: negative indices",
        md: R`Subtracting indices can give a negative index, which means a reciprocal: $\dfrac{a^2}{a^5} = a^{-3} = \dfrac{1}{a^3}$, and $2^{-2} = \dfrac{1}{4}$.`,
      },
    ],
    quiz: [
      { q: R`Simplify $b^5 \times b^2$.`, a: R`$b^7$` },
      { q: R`Simplify $4m^3 \times 3m^4$.`, a: R`$12m^7$` },
      { q: R`Simplify $\dfrac{x^{10}}{x^3}$.`, a: R`$x^7$` },
      { q: R`Simplify $\dfrac{20a^8}{5a^2}$.`, a: R`$4a^6$` },
      { q: R`Simplify $(y^4)^3$.`, a: R`$y^{12}$` },
      { q: R`Simplify $(2n^3)^4$.`, a: R`$16n^{12}$` },
      { q: R`Evaluate $9^0 + 4x^0$.`, a: R`$1 + 4 = 5$` },
      { q: R`Evaluate $2^3 \times 2^4 \div 2^5$.`, a: R`$2^2 = 4$` },
    ],
  },

  "year-10-compound-interest": {
    title: "Compound interest, explained",
    lead: "The compound interest formula, how it differs from simple interest, and how to handle growth, depreciation and different compounding periods.",
    sections: [
      {
        h: "1. The formula",
        md: R`$$A = P(1 + r)^n$$
$P$ is the principal (the starting amount), $r$ is the interest rate per period as a decimal, $n$ is the number of periods, and $A$ is the final amount. The interest earned is $I = A - P$.`,
      },
      {
        h: "2. An example",
        md: R`\$5000 is invested at $4\%$ per annum, compounded annually, for $3$ years:
$$A = 5000(1.04)^3 = 5624.32$$
So the account holds \$5624.32, and the interest is \$624.32.`,
      },
      {
        h: "3. Simple versus compound",
        md: R`Simple interest is paid only on the principal; compound interest is also paid on the interest already earned. On \$5000 at $4\%$ for $3$ years, simple interest is $5000 \times 0.04 \times 3 = 600$, so \$600, which is \$24.32 less than compound.`,
      },
      {
        h: "4. Compounding more often",
        md: R`Divide the annual rate by the number of periods in a year, and multiply the years by it. Quarterly at $6\%$ per annum for $2$ years: $r = 0.06 \div 4 = 0.015$ and $n = 2 \times 4 = 8$. For \$2000:
$$A = 2000(1.015)^8 \approx 2252.99$$`,
      },
      {
        h: "5. Depreciation and growth",
        md: R`For a value that falls by a percentage each year, use $1 - r$. A \$30 000 car depreciating at $15\%$ per annum is worth $30000(0.85)^2 = 21675$, so \$21 675, after $2$ years. Population growth works like interest: $1200$ growing at $5\%$ a year is about $1200(1.05)^4 \approx 1459$ after $4$ years.`,
      },
    ],
    quiz: [
      { q: R`Find the final amount when \$8000 is invested at $5\%$ per annum, compounded annually, for $2$ years.`, a: R`\$8820` },
      { q: R`How much interest is earned on \$10 000 at $3\%$ per annum, compounded annually, for $4$ years? Round to the nearest cent.`, a: R`$10000(1.03)^4 \approx 11255.09$, so \$1255.09` },
      { q: R`Find the simple interest on \$10 000 at $3\%$ per annum for $4$ years.`, a: R`\$1200` },
      { q: R`\$4000 is invested at $8\%$ per annum compounded quarterly for $3$ years. Find the final amount, to the nearest cent.`, a: R`$4000(1.02)^{12} \approx 5072.97$, so \$5072.97` },
      { q: R`\$1500 is invested at $6\%$ per annum compounded monthly for $1$ year. Find the final amount, to the nearest cent.`, a: R`$1500(1.005)^{12} \approx 1592.52$, so \$1592.52` },
      { q: R`What principal grows to \$6615 in $2$ years at $5\%$ per annum, compounded annually?`, a: R`$6615 \div 1.05^2 = 6000$, so \$6000` },
      { q: R`A \$2400 laptop depreciates at $20\%$ per annum. What is it worth after $3$ years?`, a: R`$2400(0.8)^3 = 1228.80$, so \$1228.80` },
      { q: R`A town of $5000$ people grows by $2\%$ a year. What is the population after $5$ years, to the nearest person?`, a: R`$5000(1.02)^5 \approx 5520$` },
    ],
  },

  "year-8-congruence-similarity": {
    title: "Congruent and similar triangles, explained",
    lead: "The tests for congruent and similar triangles, and how to use similarity to find a missing length.",
    sections: [
      {
        h: "1. Congruent means identical",
        md: R`Congruent triangles have exactly the same shape and size: every matching side and angle is equal. One can be moved, turned or flipped to fit exactly on the other. We write $\triangle ABC \cong \triangle PQR$, with matching vertices in the same order.`,
      },
      {
        h: "2. The four congruence tests",
        md: R`| Test | What must match |
|---|---|
| SSS | All three sides |
| SAS | Two sides and the angle between them |
| AAS | Two angles and a matching side |
| RHS | Right angle, hypotenuse and one other side |

AAA is not a congruence test: triangles with the same angles can be different sizes.`,
      },
      {
        h: "3. Similar means same shape",
        md: R`Similar triangles have equal angles and sides in the same ratio, so one is an enlargement of the other. The tests are AA (two equal angles), SSS (three sides in the same ratio) and SAS (two sides in the same ratio with the included angle equal).`,
      },
      {
        h: "4. Finding a missing side",
        md: R`Find the scale factor from a pair of matching sides, then use it. If matching sides are $4$ cm and $10$ cm, the scale factor is $10 \div 4 = 2.5$, so a side of $6$ cm in the small triangle matches $6 \times 2.5 = 15$ cm in the large one.`,
      },
      {
        h: "5. Heights using shadows",
        md: R`At the same moment, objects and their shadows form similar triangles. If a $1.6$ m person casts a $2$ m shadow and a tree casts a $15$ m shadow, the tree is
$$15 \times \frac{1.6}{2} = 12 \text{ m tall}$$`,
      },
    ],
    quiz: [
      { q: R`Two triangles have sides $5, 7, 9$ cm and $9, 5, 7$ cm. Are they congruent, and by which test?`, a: R`Yes, SSS` },
      { q: R`Two right-angled triangles both have hypotenuse $13$ cm and one other side $5$ cm. Which test shows they are congruent?`, a: R`RHS` },
      { q: R`Why isn't AAA a test for congruence?`, a: R`Triangles with equal angles can be different sizes, so they are similar but not necessarily congruent.` },
      { q: R`A triangle has angles $50^\circ$ and $70^\circ$. Another has angles $70^\circ$ and $60^\circ$. Are they similar?`, a: R`Yes: the third angles are $60^\circ$ and $50^\circ$, so all three angles match (AA).` },
      { q: R`Matching sides of two similar triangles are $3$ cm and $12$ cm. What is the scale factor?`, a: R`$4$` },
      { q: R`Two similar triangles have matching sides $8$ cm and $20$ cm. Another side of the small triangle is $6$ cm. Find the matching side of the large triangle.`, a: R`$15$ cm` },
      { q: R`Are triangles with sides $6, 8, 10$ and $9, 12, 15$ similar?`, a: R`Yes, every side is multiplied by $1.5$ (SSS)` },
      { q: R`A $2$ m post casts a $3$ m shadow. At the same time a building casts a $27$ m shadow. How tall is the building?`, a: R`$18$ m` },
    ],
  },

  "year-7-volume": {
    title: "Volume of prisms, explained",
    lead: "How to find the volume of rectangular and triangular prisms, convert to litres, and work backwards to a missing length.",
    sections: [
      {
        h: "1. Volume of any right prism",
        md: R`A prism has the same cross-section all the way through, so
$$V = \text{area of the cross-section} \times \text{length}$$
Volume is measured in cubic units, such as $\text{cm}^3$ or $\text{m}^3$.`,
      },
      {
        h: "2. Rectangular prisms",
        md: R`$$V = l \times w \times h$$
A box $8$ cm long, $5$ cm wide and $3$ cm high has volume $8 \times 5 \times 3 = 120 \text{ cm}^3$.`,
      },
      {
        h: "3. Triangular prisms",
        md: R`Find the area of the triangle, then multiply by the length of the prism. A triangle with base $6$ cm and height $4$ cm has area $\tfrac{1}{2} \times 6 \times 4 = 12 \text{ cm}^2$. If the prism is $10$ cm long, $V = 12 \times 10 = 120 \text{ cm}^3$.`,
      },
      {
        h: "4. Volume and capacity",
        md: R`$$1 \text{ cm}^3 = 1 \text{ mL} \qquad 1000 \text{ cm}^3 = 1 \text{ L} \qquad 1 \text{ m}^3 = 1000 \text{ L}$$
A fish tank $50$ cm by $30$ cm by $40$ cm holds $60\,000 \text{ cm}^3$, which is $60$ L.`,
      },
      {
        h: "5. Working backwards",
        md: R`If you know the volume, divide by what you know. A box with volume $240 \text{ cm}^3$, length $10$ cm and width $6$ cm has height $240 \div (10 \times 6) = 4$ cm.`,
      },
    ],
    quiz: [
      { q: R`Find the volume of a rectangular prism $7$ cm by $4$ cm by $5$ cm.`, a: R`$140 \text{ cm}^3$` },
      { q: R`Find the volume of a cube with sides of $6$ cm.`, a: R`$216 \text{ cm}^3$` },
      { q: R`A triangular prism has a cross-section with base $8$ cm and height $5$ cm, and is $12$ cm long. Find its volume.`, a: R`$240 \text{ cm}^3$` },
      { q: R`How many litres is $4500 \text{ cm}^3$?`, a: R`$4.5$ L` },
      { q: R`A tank is $1$ m by $0.5$ m by $0.8$ m. How many litres does it hold?`, a: R`$0.4 \text{ m}^3 = 400$ L` },
      { q: R`A box has volume $360 \text{ cm}^3$, length $12$ cm and width $5$ cm. Find its height.`, a: R`$6$ cm` },
      { q: R`A garden bed is $3$ m long, $1.2$ m wide and $0.4$ m deep. How many cubic metres of soil fill it?`, a: R`$1.44 \text{ m}^3$` },
      { q: R`A prism has a cross-section area of $15 \text{ cm}^2$ and volume $195 \text{ cm}^3$. How long is it?`, a: R`$13$ cm` },
    ],
  },

  "year-10-algebraic-fractions": {
    title: "Algebraic fractions, explained",
    lead: "Algebraic fractions follow the same rules as number fractions. Here's each operation with an example.",
    sections: [
      {
        h: "1. Simplify first",
        md: R`Cancel common factors from the numerator and denominator, just like $\dfrac{6}{8} = \dfrac{3}{4}$.
$$\frac{10x}{15} = \frac{2x}{3} \qquad \frac{6a^2}{9a} = \frac{2a}{3}$$
Only cancel factors, never terms: in $\dfrac{x + 2}{2}$ the $2$s don't cancel.`,
      },
      {
        h: "2. Multiplying",
        md: R`Multiply the numerators and the denominators, cancelling first to keep the numbers small.
$$\frac{2x}{5} \times \frac{10}{x} = \frac{20x}{5x} = 4$$`,
      },
      {
        h: "3. Dividing: multiply by the reciprocal",
        md: R`Flip the second fraction and multiply.
$$\frac{3a}{4} \div \frac{a}{8} = \frac{3a}{4} \times \frac{8}{a} = 6$$`,
      },
      {
        h: "4. Adding and subtracting",
        md: R`You need a common denominator. With the same denominator, just add the numerators: $\dfrac{3x}{7} + \dfrac{2x}{7} = \dfrac{5x}{7}$. With different denominators, use the lowest common denominator:
$$\frac{x}{3} + \frac{x}{4} = \frac{4x}{12} + \frac{3x}{12} = \frac{7x}{12}$$`,
      },
      {
        h: "5. Brackets in the numerator",
        md: R`Treat a numerator in brackets as one block, and take care with subtraction:
$$\frac{x + 1}{2} - \frac{x - 3}{5} = \frac{5(x + 1) - 2(x - 3)}{10} = \frac{3x + 11}{10}$$`,
      },
    ],
    quiz: [
      { q: R`Simplify $\dfrac{12y}{18}$.`, a: R`$\dfrac{2y}{3}$` },
      { q: R`Simplify $\dfrac{8m^2}{12m}$.`, a: R`$\dfrac{2m}{3}$` },
      { q: R`Simplify $\dfrac{3x}{4} \times \dfrac{8}{9x}$.`, a: R`$\dfrac{2}{3}$` },
      { q: R`Simplify $\dfrac{5a}{6} \div \dfrac{10a}{3}$.`, a: R`$\dfrac{1}{4}$` },
      { q: R`Simplify $\dfrac{4k}{9} + \dfrac{2k}{9}$.`, a: R`$\dfrac{2k}{3}$` },
      { q: R`Simplify $\dfrac{x}{2} + \dfrac{x}{5}$.`, a: R`$\dfrac{7x}{10}$` },
      { q: R`Simplify $\dfrac{3x}{4} - \dfrac{x}{6}$.`, a: R`$\dfrac{7x}{12}$` },
      { q: R`Simplify $\dfrac{x + 2}{3} + \dfrac{x - 1}{4}$.`, a: R`$\dfrac{7x + 5}{12}$` },
    ],
  },
};

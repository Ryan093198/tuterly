// Topic guides: a written explainer and a quick check, shown on a topic page
// under the worked examples. Added 4 Nov 2026 to the pages with the biggest
// search demand that Google had crawled but not indexed, or ranked low
// (Year 7 and 8 algebra, Year 8 and 9 Pythagoras), so each has substantial
// content of its own. Every quick-check answer was checked in code
// (scratchpad/check-guides.mjs). Markdown with KaTeX; money as \$. No em dashes.

import { TOPIC_GUIDES_B2 } from "@/lib/topic-guides-b2";
import { TOPIC_GUIDES_B3 } from "@/lib/topic-guides-b3";

const R = String.raw;

export const TOPIC_GUIDES = {
  "year-7-algebra": {
    title: "Year 7 algebra, explained",
    lead: "The five ideas every Year 7 algebra worksheet and test is built on, each with an example.",
    sections: [
      {
        h: "1. A letter stands for a number",
        md: R`A variable (also called a pronumeral) is a letter that stands for a number we don't know yet, or one that can change. Algebra has its own shorthand:

- $3 \times n$ is written $3n$
- $a \times b$ is written $ab$
- $a \div 4$ is written $\dfrac{a}{4}$
- $1x$ is written $x$, and $n \times n$ is written $n^2$`,
      },
      {
        h: "2. Substitution: swap the letter for its number",
        md: R`Replace each letter with its value in brackets, then follow the order of operations.

The perimeter of a rectangle is $P = 2l + 2w$. If $l = 7$ and $w = 4$:
$$P = 2(7) + 2(4) = 14 + 8 = 22$$

With a negative value, the brackets matter. If $a = -3$, then $5a - 2 = 5(-3) - 2 = -15 - 2 = -17$.`,
      },
      {
        h: "3. Collecting like terms",
        md: R`Like terms have exactly the same letters, so they can be added or subtracted. Unlike terms can't be combined.
$$4x + 3y - x + 5y = 3x + 8y$$
Here $4x$ and $-x$ are like terms, and so are $3y$ and $5y$.`,
      },
      {
        h: "4. The distributive law",
        md: R`Multiply the number outside the brackets by every term inside.
$$3(x + 5) = 3x + 15 \qquad 4(2a - 3) = 8a - 12$$
The most common mistake is multiplying only the first term: $3(x + 5)$ is not $3x + 5$.`,
      },
      {
        h: "5. Writing expressions from words",
        md: R`Turn each phrase into maths, one piece at a time:

- "five more than a number" is $n + 5$
- "seven less than a number" is $n - 7$ (not $7 - n$)
- "twice a number, minus three" is $2n - 3$
- "a number shared between four" is $\dfrac{n}{4}$`,
      },
    ],
    quiz: [
      { q: R`Simplify $5 \times m \times 2$.`, a: R`$10m$` },
      { q: R`Write "seven less than a number $n$" as an expression.`, a: R`$n - 7$` },
      { q: R`If $x = 4$, find the value of $3x + 5$.`, a: R`$17$` },
      { q: R`If $a = 6$ and $b = 2$, find $a^2 - 4b$.`, a: R`$36 - 8 = 28$` },
      { q: R`Simplify $6p + 2q - 4p + q$.`, a: R`$2p + 3q$` },
      { q: R`Expand $5(y + 3)$.`, a: R`$5y + 15$` },
      { q: R`Expand $2(3k - 4)$.`, a: R`$6k - 8$` },
      { q: R`A taxi charges \$4 plus \$2 per kilometre, so the cost is $C = 4 + 2d$. Find the cost of a 9 km trip.`, a: R`$4 + 2(9) = 22$, so \$22` },
    ],
  },

  "year-8-algebra": {
    title: "Year 8 algebra, explained",
    lead: "Year 8 algebra is about manipulating expressions: simplifying, expanding and factorising. Here's each skill with an example.",
    sections: [
      {
        h: "1. Like terms need exactly the same letters and powers",
        md: R`$3xy$ and $5yx$ are like terms (the order of the letters doesn't matter), so $3xy + 5yx = 8xy$. But $2x^2$ and $2x$ are not like terms, so $2x^2 + 2x$ can't be simplified.`,
      },
      {
        h: "2. Multiplying and dividing terms",
        md: R`Multiply the numbers, then the letters. Divide the same way.
$$3a \times 4b = 12ab \qquad \frac{12x^2}{4x} = 3x$$`,
      },
      {
        h: "3. Expanding brackets, including negatives",
        md: R`A negative number outside the brackets changes the sign of every term inside.
$$-3(2x - 5) = -6x + 15$$
To expand and simplify, expand each bracket first, then collect like terms:
$$4(x + 2) - 3(x - 1) = 4x + 8 - 3x + 3 = x + 11$$`,
      },
      {
        h: "4. Factorising: the reverse of expanding",
        md: R`Find the highest common factor (HCF) of every term, write it outside the brackets, and divide each term by it.
$$6x + 9 = 3(2x + 3) \qquad 8ab - 12a = 4a(2b - 3)$$
If the first term is negative, take out a negative factor: $-5x - 10 = -5(x + 2)$.`,
      },
      {
        h: "5. Always check by expanding",
        md: R`Expanding your answer should give back the expression you started with. For $4a(2b - 3)$: $4a \times 2b = 8ab$ and $4a \times (-3) = -12a$, so it checks out.`,
      },
    ],
    quiz: [
      { q: R`Simplify $7a + 3b - 2a + 4b$.`, a: R`$5a + 7b$` },
      { q: R`Simplify $4x \times 3y$.`, a: R`$12xy$` },
      { q: R`Simplify $15m^2 \div 5m$.`, a: R`$3m$` },
      { q: R`Expand $-2(4x - 3)$.`, a: R`$-8x + 6$` },
      { q: R`Expand and simplify $3(x + 4) + 2(x - 5)$.`, a: R`$5x + 2$` },
      { q: R`Factorise $10y + 15$.`, a: R`$5(2y + 3)$` },
      { q: R`Factorise $6ab - 9a$.`, a: R`$3a(2b - 3)$` },
      { q: R`Expand and simplify $5(2k - 1) - 3(k - 4)$.`, a: R`$10k - 5 - 3k + 12 = 7k + 7$` },
    ],
  },

  "year-8-pythagoras": {
    title: "Pythagoras' theorem, explained",
    lead: "Everything a Pythagoras' theorem worksheet or test asks for, with an example of each.",
    sections: [
      {
        h: "1. The theorem",
        md: R`In a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides:
$$c^2 = a^2 + b^2$$
The hypotenuse $c$ is the longest side, opposite the right angle. Finding it first is the step most mistakes come from.`,
      },
      {
        h: "2. Finding the hypotenuse: add, then square root",
        md: R`The two shorter sides are $6$ cm and $8$ cm:
$$c^2 = 6^2 + 8^2 = 36 + 64 = 100, \quad c = \sqrt{100} = 10 \text{ cm}$$`,
      },
      {
        h: "3. Finding a shorter side: subtract, then square root",
        md: R`The hypotenuse is $13$ cm and one side is $5$ cm:
$$b^2 = 13^2 - 5^2 = 169 - 25 = 144, \quad b = \sqrt{144} = 12 \text{ cm}$$
If your "shorter" side comes out longer than the hypotenuse, you added when you should have subtracted.`,
      },
      {
        h: "4. Pythagorean triads worth knowing",
        md: R`These whole-number sets fit $c^2 = a^2 + b^2$ exactly, and they turn up in tests all the time:

| Triad | Check |
|---|---|
| 3, 4, 5 | $9 + 16 = 25$ |
| 5, 12, 13 | $25 + 144 = 169$ |
| 8, 15, 17 | $64 + 225 = 289$ |
| 7, 24, 25 | $49 + 576 = 625$ |

Multiples work too: 6, 8, 10 and 9, 12, 15 are both multiples of 3, 4, 5.`,
      },
      {
        h: "5. Is the triangle right-angled? (the converse)",
        md: R`Square the two shorter sides and add. If the total equals the square of the longest side, the triangle is right-angled.

- 9, 12, 15: $81 + 144 = 225 = 15^2$, so yes.
- 5, 7, 9: $25 + 49 = 74$, but $9^2 = 81$, so no.`,
      },
      {
        h: "6. Exact answers and decimals",
        md: R`When the answer isn't a whole number, leave it as a surd for an exact answer, or round it if the question asks. Sides $2$ and $3$ give $c = \sqrt{13} \approx 3.61$.`,
      },
    ],
    quiz: [
      { q: R`The shorter sides of a right-angled triangle are $9$ cm and $12$ cm. Find the hypotenuse.`, a: R`$15$ cm` },
      { q: R`The hypotenuse is $25$ m and one side is $7$ m. Find the other side.`, a: R`$\sqrt{625 - 49} = \sqrt{576} = 24$ m` },
      { q: R`The shorter sides are $5$ cm and $7$ cm. Find the hypotenuse, correct to 2 decimal places.`, a: R`$\sqrt{74} \approx 8.60$ cm` },
      { q: R`Is a triangle with sides $10$, $24$ and $26$ right-angled?`, a: R`Yes: $100 + 576 = 676 = 26^2$` },
      { q: R`Is a triangle with sides $6$, $9$ and $11$ right-angled?`, a: R`No: $36 + 81 = 117$, but $11^2 = 121$` },
      { q: R`A $5$ m ladder leans against a wall with its foot $1.4$ m from the wall. How high up the wall does it reach?`, a: R`$\sqrt{25 - 1.96} = \sqrt{23.04} = 4.8$ m` },
      { q: R`A TV screen is $80$ cm wide and $45$ cm high. Find its diagonal, to the nearest centimetre.`, a: R`$\sqrt{8425} \approx 92$ cm` },
      { q: R`A rectangular field is $20$ m by $15$ m. How long is its diagonal?`, a: R`$25$ m` },
    ],
  },

  "year-9-pythagoras": {
    title: "Applying Pythagoras' theorem in Year 9",
    lead: "Year 9 questions rarely say \"use Pythagoras\". Here's how to spot it, set it up and handle the multi-step and 3D versions.",
    sections: [
      {
        h: "1. Find the right-angled triangle first",
        md: R`Sketch the situation and look for the right angle: a wall meeting the ground, the height of an isosceles triangle, a north and east journey, the gap between two points on a grid. Label the hypotenuse before you write anything else.`,
      },
      {
        h: "2. Pythagoras or trigonometry?",
        md: R`If you know two sides and want the third, use Pythagoras. If an angle is given or asked for, use trigonometry (SOH CAH TOA).`,
      },
      {
        h: "3. Two-step problems",
        md: R`Often the first triangle gives you a length you need for a second one. An isosceles triangle with equal sides of $13$ cm and a base of $10$ cm splits into two right-angled triangles with a base of $5$ cm, so its height is:
$$h = \sqrt{13^2 - 5^2} = \sqrt{144} = 12 \text{ cm}$$`,
      },
      {
        h: "4. Distance between two points",
        md: R`The horizontal and vertical gaps are the two shorter sides. From $A(1, 2)$ to $B(7, 10)$ the gaps are $6$ and $8$, so
$$AB = \sqrt{6^2 + 8^2} = \sqrt{100} = 10$$`,
      },
      {
        h: "5. Pythagoras in 3D",
        md: R`The longest diagonal of a box with length $l$, width $w$ and height $h$ is
$$d = \sqrt{l^2 + w^2 + h^2}$$
For a $3 \times 4 \times 12$ box, $d = \sqrt{9 + 16 + 144} = \sqrt{169} = 13$. It's two Pythagoras steps in one: across the base, then up to the opposite corner.`,
      },
    ],
    quiz: [
      { q: R`Find the longest diagonal of a box measuring $6$ cm by $8$ cm by $24$ cm.`, a: R`$\sqrt{36 + 64 + 576} = \sqrt{676} = 26$ cm` },
      { q: R`An isosceles triangle has equal sides of $13$ cm and a base of $10$ cm. Find its height.`, a: R`$12$ cm` },
      { q: R`A ramp rises $0.9$ m over a horizontal distance of $4$ m. Find the length of the ramp.`, a: R`$\sqrt{16.81} = 4.1$ m` },
      { q: R`A kite string is $50$ m long and the kite is directly above a point $30$ m away along the ground. How high is the kite?`, a: R`$40$ m` },
      { q: R`Find the exact length of the diagonal of a square with sides of $7$ cm.`, a: R`$7\sqrt{2}$ cm (about $9.90$ cm)` },
      { q: R`Find the distance between $A(1, 2)$ and $B(7, 10)$.`, a: R`$10$ units` },
      { q: R`A ship sails $9$ km east and then $12$ km north. How far is it from where it started?`, a: R`$15$ km` },
      { q: R`What is the longest straw that fits inside a can with a radius of $3$ cm and a height of $8$ cm?`, a: R`$\sqrt{6^2 + 8^2} = 10$ cm` },
    ],
  },
};

// More guides (4 Nov 2026): the rest of the pages Google crawled but
// didn't index. Same format; checked by scratchpad/check-b2.mjs and check-b3.mjs.
const ALL_GUIDES = { ...TOPIC_GUIDES_B2, ...TOPIC_GUIDES_B3, ...TOPIC_GUIDES };

export function getTopicGuide(slug) {
  return ALL_GUIDES[slug] || null;
}

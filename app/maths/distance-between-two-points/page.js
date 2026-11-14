import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import DistanceCalc from "@/components/maths/DistanceCalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a calculator: the distance between two points. Built by
// the daily page task (Nov 2026); not yet read by Ryan, so it's in
// UNREVIEWED_PATHS (lib/reviewed.js). Every example, practice answer and
// calculator test case was recomputed by script before publishing.

const PATH = "/maths/distance-between-two-points";
const TITLE = "Distance Between Two Points: Formula, Examples and Calculator | Tuterly";
const DESCRIPTION =
  "How to find the distance between two points with the distance formula, including negative coordinates, exact surd answers and missing coordinates, with a calculator.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is the distance formula?", a: "d = √((x₂ − x₁)² + (y₂ − y₁)²). Subtract the x-coordinates, subtract the y-coordinates, square both answers, add them, then take the square root. For (1, 2) and (7, 10), that's √(6² + 8²) = √100 = 10." },
  { q: "Is the distance formula just Pythagoras’ theorem?", a: "Yes. Join the two points and draw a horizontal and a vertical line to make a right-angled triangle. The horizontal side is the change in x, the vertical side is the change in y, and the distance between the points is the hypotenuse, so d² = (change in x)² + (change in y)²." },
  { q: "Does it matter which point is (x₁, y₁)?", a: "No. Swapping the points changes the signs of the differences, but squaring makes them positive again, so you get the same distance. From (−3, 4) to (2, −8) the changes are 5 and −12; the other way round they are −5 and 12. Both give √169 = 13." },
  { q: "How do you find the distance with negative coordinates?", a: "Put each negative number in brackets when you substitute. For (−3, 4) and (2, −8): x₂ − x₁ = 2 − (−3) = 5 and y₂ − y₁ = −8 − 4 = −12. Then 5² + (−12)² = 25 + 144 = 169, so the distance is 13. Subtracting a negative is the step most students get wrong." },
  { q: "How do you give the distance in exact form?", a: "Leave the answer as a square root and simplify it. For a distance of √80, find the biggest square factor: 80 = 16 × 5, so √80 = 4√5. That is exact; 8.94 is the rounded value. If a question says ‘exact’, give the surd." },
  { q: "What year level learns the distance between two points?", a: "In the Victorian Curriculum 2.0 it’s part of Year 9 coordinate geometry, alongside gradient and midpoint, once students know Pythagoras’ theorem from Year 8. Year 10 uses it in harder line and shape problems, and Year 10A extends the same idea to three dimensions." },
];

const PRACTICE = [
  { q: R`Find the distance between $(2, 3)$ and $(5, 7)$.`, a: R`Changes: $5 - 2 = 3$ and $7 - 3 = 4$. $d = \sqrt{3^2 + 4^2} = \sqrt{25} = 5$` },
  { q: R`Find the distance between $(-4, 1)$ and $(4, 7)$.`, a: R`Changes: $4 - (-4) = 8$ and $7 - 1 = 6$. $d = \sqrt{64 + 36} = \sqrt{100} = 10$` },
  { q: R`Find the distance between $(0, -5)$ and $(12, 0)$.`, a: R`Changes: $12$ and $5$. $d = \sqrt{144 + 25} = \sqrt{169} = 13$` },
  { q: R`Find the exact distance between $(3, -2)$ and $(-3, 1)$.`, a: R`Changes: $-3 - 3 = -6$ and $1 - (-2) = 3$. $d = \sqrt{36 + 9} = \sqrt{45} = 3\sqrt{5} \approx 6.71$` },
  { q: R`Find the distance between $(-2, -7)$ and $(-2, 5)$.`, a: R`The $x$-values are the same, so the line is vertical. $d = 5 - (-7) = 12$` },
  { q: R`Find the distance between $(1.5, 2)$ and $(4.5, 6)$.`, a: R`Changes: $3$ and $4$. $d = \sqrt{9 + 16} = 5$` },
  { q: R`Which point is closer to the origin: $(6, -8)$ or $(-7, 7)$?`, a: R`$\sqrt{36 + 64} = \sqrt{100} = 10$ and $\sqrt{49 + 49} = \sqrt{98} \approx 9.90$. So $(-7, 7)$ is closer, but only just.` },
  { q: R`The distance from $(a, 1)$ to $(5, 4)$ is $5$ units. Find the two possible values of $a$.`, a: R`$(5 - a)^2 + 3^2 = 25$, so $(5 - a)^2 = 16$ and $5 - a = 4$ or $-4$. So $a = 1$ or $a = 9$.` },
  { q: R`Triangle $ABC$ has vertices $A(0, 0)$, $B(4, 2)$ and $C(2, 6)$. Show that it is isosceles and right-angled.`, a: R`$AB = \sqrt{16 + 4} = \sqrt{20}$, $BC = \sqrt{4 + 16} = \sqrt{20}$ and $AC = \sqrt{4 + 36} = \sqrt{40}$. $AB = BC$, so it's isosceles. $AB^2 + BC^2 = 20 + 20 = 40 = AC^2$, so by the converse of Pythagoras it has a right angle at $B$.` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Distance between two points", path: PATH }]}
      eyebrow="Maths explained · Years 9 and 10"
      h1="How to find the distance between two points"
      lead="The distance between two points on the Cartesian plane is the length of the straight line joining them. You find it with the distance formula, which is Pythagoras’ theorem in disguise. Here’s where the formula comes from, how to handle negative coordinates, how to give an exact surd answer, and how to work backwards to a missing coordinate, with a calculator that draws the triangle for you."
      quickAnswer="Use d = √((x₂ − x₁)² + (y₂ − y₁)²). Find the change in x and the change in y, square each one, add them, then take the square root. From (1, 2) to (7, 10): √(6² + 8²) = √100 = 10 units."
      toc={[
        ["formula", "The formula"],
        ["why", "Why it works"],
        ["steps", "Step by step"],
        ["calculator", "Calculator"],
        ["negatives", "Negative coordinates"],
        ["exact", "Exact (surd) answers"],
        ["missing", "Finding a missing coordinate"],
        ["shapes", "Using it on shapes"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a coordinate geometry question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_distance_two_points"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="Distance between two points: common questions"
      links={[
        { href: "/worksheets/year-9-coordinate-geometry", label: "Year 9 coordinate geometry worksheets" },
        { href: "/maths/gradient", label: "Gradient explained (with midpoint)" },
        { href: "/maths/pythagoras-theorem", label: "Pythagoras’ theorem explained" },
        { href: "/year-9-maths-test", label: "Year 9 maths practice test" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Lost marks on a distance question?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="formula" className="tb-section" aria-labelledby="h-formula">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-formula" className="tb-h2 pg-h2">The distance formula</h2>
          <div className="mx-formula"><MathMd md={R`$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$`} /></div>
          <MathMd md={R`- $(x_1, y_1)$ and $(x_2, y_2)$ are the two points. It doesn't matter which one you call the first.
- $x_2 - x_1$ is the **horizontal change** (sometimes called the run).
- $y_2 - y_1$ is the **vertical change** (the rise).
- $d$ is the straight-line distance between the points, in the same units as the axes.

Some textbooks write it as $d = \sqrt{(\Delta x)^2 + (\Delta y)^2}$, where $\Delta$ (delta) means "change in". It's the same formula.`} />
        </div>
      </section>

      <section id="why" className="tb-section" aria-labelledby="h-why">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-why" className="tb-h2 pg-h2">Why it works: it’s Pythagoras</h2>
          <svg className="mx-plot" viewBox="0 0 300 200" role="img" aria-label="Points (1, 2) and (7, 10) joined by a line of length 10, with a horizontal side of 6 and a vertical side of 8 forming a right-angled triangle">
            <line x1="40" y1="170" x2="190" y2="170" className="mx-plot__leg" />
            <line x1="190" y1="170" x2="190" y2="30" className="mx-plot__leg" />
            <polyline points="178,170 178,158 190,158" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x1="40" y1="170" x2="190" y2="30" className="mx-plot__d" />
            <circle cx="40" cy="170" r="4.5" className="mx-plot__pt" />
            <circle cx="190" cy="30" r="4.5" className="mx-plot__pt" />
            <text x="34" y="190" textAnchor="middle">(1, 2)</text>
            <text x="200" y="26" textAnchor="start">(7, 10)</text>
            <text x="115" y="188" textAnchor="middle" className="mx-plot__small">7 − 1 = 6</text>
            <text x="198" y="104" textAnchor="start" className="mx-plot__small">10 − 2 = 8</text>
            <text x="100" y="92" textAnchor="end">d</text>
          </svg>
          <MathMd md={R`Draw a horizontal line from one point and a vertical line from the other. They meet at a right angle, so the line joining the points is the **hypotenuse** of a right-angled triangle.

The two shorter sides are the change in $x$ and the change in $y$. Pythagoras' theorem, $c^2 = a^2 + b^2$, gives

$$d^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2$$

and taking the square root of both sides gives the distance formula. If you forget the formula in a test, sketch the triangle and use Pythagoras. You'll get the same answer.`} />
        </div>
      </section>

      <section id="steps" className="tb-section" aria-labelledby="h-steps">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-steps" className="tb-h2 pg-h2">How to find the distance, step by step</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the distance between $A(1, 2)$ and $B(7, 10)$.

**1. Find the change in $x$:** $\;7 - 1 = 6$

**2. Find the change in $y$:** $\;10 - 2 = 8$

**3. Square both and add:** $\;6^2 + 8^2 = 36 + 64 = 100$

**4. Take the square root:**
$$d = \sqrt{100} = 10 \text{ units}$$`} />
          </div>
          <MathMd md={R`Working out the two changes **before** you square anything keeps the signs under control, and it's exactly what the calculator below does.`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Distance between two points calculator</h2>
          <p className="pg-intro">Enter the two points. You’ll get the distance as an exact surd and to 2 decimal places, every step of the working, and a sketch of the right-angled triangle between the points.</p>
          <DistanceCalc placement="concept_distance_two_points_calc" />
        </div>
      </section>

      <section id="negatives" className="tb-section" aria-labelledby="h-negatives">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-negatives" className="tb-h2 pg-h2">Distance with negative coordinates</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the distance between $P(-3, 4)$ and $Q(2, -8)$.

Put the negatives in brackets when you substitute:

$$x_2 - x_1 = 2 - (-3) = 2 + 3 = 5$$
$$y_2 - y_1 = -8 - 4 = -12$$

Square and add. A negative number squared is positive:

$$d = \sqrt{5^2 + (-12)^2}$$
$$= \sqrt{25 + 144}$$
$$= \sqrt{169} = 13 \text{ units}$$`} />
          </div>
          <MathMd md={R`The points are in different quadrants, but nothing changes in the method. A change of $-12$ just means $Q$ is $12$ units **below** $P$. Distance is always positive, which is why squaring (and then square rooting) takes care of the direction for you.`} />
        </div>
      </section>

      <section id="exact" className="tb-section" aria-labelledby="h-exact">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-exact" className="tb-h2 pg-h2">Exact answers: leaving the distance as a surd</h2>
          <MathMd md={R`Most pairs of points don't give a whole-number distance. If the question asks for an **exact** answer, leave it as a simplified square root (a surd).`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the exact distance between $C(-1, -2)$ and $D(3, 6)$.

$$x_2 - x_1 = 3 - (-1) = 4$$
$$y_2 - y_1 = 6 - (-2) = 8$$
$$d = \sqrt{4^2 + 8^2} = \sqrt{16 + 64} = \sqrt{80}$$

Simplify the surd by pulling out the largest square factor, $16$:

$$d = \sqrt{16 \times 5} = 4\sqrt{5} \text{ units}$$
$$d \approx 8.94 \text{ units}$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: on a map</p>
            <MathMd md={R`On a map grid measured in kilometres, a campsite is at $(2, -1)$ and a lookout is at $(-4, 3)$. How far apart are they in a straight line, to the nearest $0.1$ km?

$$x_2 - x_1 = -4 - 2 = -6$$
$$y_2 - y_1 = 3 - (-1) = 4$$
$$d = \sqrt{(-6)^2 + 4^2} = \sqrt{36 + 16}$$
$$= \sqrt{52} = 2\sqrt{13} \approx 7.2 \text{ km}$$`} />
          </div>
          <MathMd md={R`The walking track will be longer than this. The distance formula gives the shortest, straight-line distance ("as the crow flies").`} />
        </div>
      </section>

      <section id="missing" className="tb-section" aria-labelledby="h-missing">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-missing" className="tb-h2 pg-h2">Finding a missing coordinate</h2>
          <MathMd md={R`Sometimes you're given the distance and have to find a coordinate. Substitute everything you know, square both sides to get rid of the square root, then solve.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`The distance between $(1, 3)$ and $(k, 7)$ is $5$ units. Find the possible values of $k$.

$$\sqrt{(k - 1)^2 + (7 - 3)^2} = 5$$

Square both sides:

$$(k - 1)^2 + 16 = 25$$
$$(k - 1)^2 = 9$$
$$k - 1 = 3 \quad \text{or} \quad k - 1 = -3$$
$$k = 4 \quad \text{or} \quad k = -2$$`} />
          </div>
          <MathMd md={R`There are **two** answers because the point could be $3$ units to the right of $x = 1$ or $3$ units to the left. Check one: from $(1, 3)$ to $(-2, 7)$ is $\sqrt{(-3)^2 + 4^2} = \sqrt{25} = 5$.`} />
        </div>
      </section>

      <section id="shapes" className="tb-section" aria-labelledby="h-shapes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-shapes" className="tb-h2 pg-h2">Using distance on shapes</h2>
          <MathMd md={R`Test questions often give the corners of a shape and ask you to prove something about it. Find the length of each side with the distance formula, then compare.

- **Isosceles triangle:** two sides are equal.
- **Right-angled triangle:** the squares of the two shorter sides add to the square of the longest side.
- **Rhombus or square:** all four sides are equal.
- **Perimeter:** add up all the side lengths.

**Horizontal and vertical sides need no formula.** From $(-2, 5)$ to $(6, 5)$ the $y$-values match, so the distance is just $6 - (-2) = 8$.

**In three dimensions (Year 10A),** add a third term: $d = \sqrt{(\Delta x)^2 + (\Delta y)^2 + (\Delta z)^2}$. From $(0, 0, 0)$ to $(2, 3, 6)$ that's $\sqrt{4 + 9 + 36} = \sqrt{49} = 7$. There's more on this in [3D Pythagoras](/maths/3d-pythagoras).`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Subtracting a negative wrongly.** $2 - (-3)$ is $5$, not $-1$. Write negative coordinates in brackets and change $- (-)$ to $+$ before you go on.
- **Typing $-12^2$ into a calculator.** That gives $-144$. Use brackets, $(-12)^2 = 144$, or square the number without its sign, since the square is always positive.
- **Adding the coordinates instead of subtracting.** The formula uses the **differences** $x_2 - x_1$ and $y_2 - y_1$. Adding them is the midpoint method, and it gives a different answer.
- **Mixing up the order.** Use the same point first in both brackets: $x_2 - x_1$ **and** $y_2 - y_1$. Matching an $x$ from one point with a $y$ from the other gives nonsense.
- **Square rooting each part separately.** $\sqrt{36 + 64}$ is $\sqrt{100} = 10$, not $6 + 8 = 14$. Add first, then take the square root.
- **Forgetting the second answer** when finding a missing coordinate. $(k - 1)^2 = 9$ gives $k - 1 = 3$ **or** $-3$.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer. Rounded answers are to 2 decimal places.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Got a distance question wrong? Don't just move on. Study your mistakes." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Distance and coordinate geometry by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-8-pythagoras", text: "Pythagoras’ theorem: finding the hypotenuse and a shorter side, which the distance formula is built on." },
              { slug: "year-9-coordinate-geometry", text: "The distance between two points, alongside gradient and midpoint." },
              { slug: "year-9-pythagoras", text: "Two-step Pythagoras problems, including the distance between points." },
              { slug: "year-10-coordinate-geometry", text: "Parallel and perpendicular lines, with distance and midpoint used in multi-part questions." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import MidpointCalc from "@/components/maths/MidpointCalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a calculator: the midpoint formula. Built by the daily
// page task (Nov 2026); not yet read by Ryan, so it's in UNREVIEWED_PATHS
// (lib/reviewed.js). Every example, practice answer and calculator test case
// was recomputed by script before publishing.

const PATH = "/maths/midpoint-formula";
const TITLE = "Midpoint Formula: How to Find the Midpoint, with Calculator | Tuterly";
const DESCRIPTION =
  "How to find the midpoint of two points with the midpoint formula, including negatives, decimals and a missing endpoint, with worked examples and a calculator.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is the midpoint formula?", a: "M = ((x₁ + x₂)/2, (y₁ + y₂)/2). Add the two x-coordinates and halve the total, then add the two y-coordinates and halve that total. For (2, 3) and (8, 11), the midpoint is ((2 + 8)/2, (3 + 11)/2) = (5, 7)." },
  { q: "Is the midpoint just the average?", a: "Yes. Each coordinate of the midpoint is the mean of the two matching coordinates. Halfway between 2 and 8 on a number line is their average, 5, and the midpoint formula does the same thing once across and once up." },
  { q: "Does it matter which point is (x₁, y₁)?", a: "No. Addition works in either order, so (−5 + 3)/2 and (3 + (−5))/2 both give −1. Unlike the gradient, there's no order to keep consistent." },
  { q: "How do you find an endpoint if you know the midpoint?", a: "Double the midpoint, then subtract the endpoint you know. If M(1, 4) is the midpoint of A(−3, 2) and B, then B = (2 × 1 − (−3), 2 × 4 − 2) = (5, 6). Check it: the midpoint of (−3, 2) and (5, 6) is (1, 4)." },
  { q: "What’s the difference between the midpoint and the distance formula?", a: "The midpoint formula adds the coordinates and halves them, and gives a point. The distance formula subtracts the coordinates, squares, adds and square roots, and gives a length. Mixing up the plus and minus signs between the two is a common mistake." },
  { q: "What year level learns the midpoint formula?", a: "In the Victorian Curriculum 2.0 it’s part of Year 9 coordinate geometry, alongside gradient and the distance between two points. Year 10 uses it in multi-part questions, such as finding the centre of a circle or the equation of a perpendicular bisector." },
];

const PRACTICE = [
  { q: R`Find the midpoint of $(4, 6)$ and $(10, 2)$.`, a: R`$\left(\dfrac{4 + 10}{2}, \dfrac{6 + 2}{2}\right) = (7, 4)$` },
  { q: R`Find the midpoint of $(-3, 5)$ and $(7, -1)$.`, a: R`$\left(\dfrac{-3 + 7}{2}, \dfrac{5 + (-1)}{2}\right) = \left(\dfrac{4}{2}, \dfrac{4}{2}\right) = (2, 2)$` },
  { q: R`Find the midpoint of the origin and $(-8, 14)$.`, a: R`$\left(\dfrac{0 + (-8)}{2}, \dfrac{0 + 14}{2}\right) = (-4, 7)$. From the origin, just halve each coordinate.` },
  { q: R`Find the midpoint of $(2, 3)$ and $(5, 10)$.`, a: R`$\left(\dfrac{7}{2}, \dfrac{13}{2}\right) = (3.5, 6.5)$` },
  { q: R`Find the midpoint of $(-6, -2)$ and $(-1, -9)$.`, a: R`$\left(\dfrac{-7}{2}, \dfrac{-11}{2}\right) = (-3.5, -5.5)$` },
  { q: R`$M(3, -2)$ is the midpoint of $A(7, 1)$ and $B$. Find the coordinates of $B$.`, a: R`$B = (2 \times 3 - 7, \; 2 \times (-2) - 1) = (-1, -5)$. Check: $\left(\dfrac{7 + (-1)}{2}, \dfrac{1 + (-5)}{2}\right) = (3, -2)$ ✓` },
  { q: R`The midpoint of $(a, 5)$ and $(9, b)$ is $(6, -1)$. Find $a$ and $b$.`, a: R`$\dfrac{a + 9}{2} = 6$, so $a + 9 = 12$ and $a = 3$. $\dfrac{5 + b}{2} = -1$, so $5 + b = -2$ and $b = -7$.` },
  { q: R`A diameter of a circle has endpoints $(-4, 3)$ and $(2, -5)$. Find the centre and the radius of the circle.`, a: R`Centre: $\left(\dfrac{-4 + 2}{2}, \dfrac{3 + (-5)}{2}\right) = (-1, -1)$. Radius: distance from $(-1, -1)$ to $(2, -5)$ is $\sqrt{3^2 + (-4)^2} = \sqrt{25} = 5$ units.` },
  { q: R`Triangle $ABC$ has $A(0, 0)$, $B(8, 0)$ and $C(2, 6)$. $P$ is the midpoint of $AB$ and $Q$ is the midpoint of $AC$. Show that $PQ$ is parallel to $BC$ and half as long.`, a: R`$P = (4, 0)$ and $Q = (1, 3)$. Gradient of $PQ = \dfrac{3 - 0}{1 - 4} = -1$ and gradient of $BC = \dfrac{6 - 0}{2 - 8} = -1$, so they're parallel. $PQ = \sqrt{9 + 9} = 3\sqrt{2}$ and $BC = \sqrt{36 + 36} = 6\sqrt{2}$, so $PQ$ is half of $BC$.` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Midpoint formula", path: PATH }]}
      eyebrow="Maths explained · Years 9 and 10"
      h1="How to find the midpoint of two points"
      lead="The midpoint of a line segment is the point exactly halfway between its two ends. Finding it takes one idea: average the x-coordinates, then average the y-coordinates. This page shows the midpoint formula, why it works, how to handle negative and decimal coordinates, and how to work backwards to a missing endpoint, plus a calculator that marks the midpoint on a sketch."
      quickAnswer="Use M = ((x₁ + x₂)/2, (y₁ + y₂)/2). Add the x-coordinates and halve them, then add the y-coordinates and halve them. For (2, 3) and (8, 11): ((2 + 8)/2, (3 + 11)/2) = (5, 7)."
      toc={[
        ["formula", "The formula"],
        ["why", "Why it works"],
        ["steps", "Step by step"],
        ["calculator", "Calculator"],
        ["negatives", "Negatives and decimals"],
        ["endpoint", "Finding a missing endpoint"],
        ["uses", "Where it’s used"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a midpoint question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_midpoint"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="Midpoint formula: common questions"
      links={[
        { href: "/worksheets/year-9-coordinate-geometry", label: "Year 9 coordinate geometry worksheets" },
        { href: "/maths/distance-between-two-points", label: "Distance between two points explained" },
        { href: "/maths/gradient", label: "Gradient explained" },
        { href: "/year-9-maths-test", label: "Year 9 maths practice test" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Lost marks on a coordinate geometry question?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="formula" className="tb-section" aria-labelledby="h-formula">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-formula" className="tb-h2 pg-h2">The midpoint formula</h2>
          <div className="mx-formula"><MathMd md={R`$$M = \left(\frac{x_1 + x_2}{2}, \; \frac{y_1 + y_2}{2}\right)$$`} /></div>
          <MathMd md={R`- $(x_1, y_1)$ and $(x_2, y_2)$ are the two endpoints of the line segment. Either one can go first.
- $\dfrac{x_1 + x_2}{2}$ is the **average of the $x$-coordinates**. It tells you how far across the midpoint is.
- $\dfrac{y_1 + y_2}{2}$ is the **average of the $y$-coordinates**. It tells you how far up or down the midpoint is.
- $M$ is a **point**, so the answer is a pair of coordinates, not a single number.`} />
        </div>
      </section>

      <section id="why" className="tb-section" aria-labelledby="h-why">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-why" className="tb-h2 pg-h2">Why it works: halfway is the average</h2>
          <MathMd md={R`Start on a number line. Halfway between $-3$ and $9$ is the number with the same gap to each end. The gap from $-3$ to $9$ is $12$, so halfway is $6$ along from $-3$, which is $3$. That's also the average:

$$\frac{-3 + 9}{2} = \frac{6}{2} = 3$$

On the Cartesian plane, a point has two coordinates, so you do this twice: once along the $x$-axis and once along the $y$-axis.`} />
          <svg className="mx-plot" viewBox="0 0 300 200" role="img" aria-label="Points (2, 3) and (8, 11) joined by a line, with the midpoint (5, 7) marked halfway along. The midpoint is 3 across and 4 up from each end.">
            <line x1="50" y1="170" x2="140" y2="170" className="mx-plot__leg" />
            <line x1="140" y1="170" x2="140" y2="110" className="mx-plot__leg" />
            <line x1="140" y1="110" x2="230" y2="110" className="mx-plot__leg" />
            <line x1="230" y1="110" x2="230" y2="50" className="mx-plot__leg" />
            <line x1="50" y1="170" x2="230" y2="50" className="mx-plot__d" />
            <circle cx="50" cy="170" r="4.5" className="mx-plot__pt" />
            <circle cx="230" cy="50" r="4.5" className="mx-plot__pt" />
            <circle cx="140" cy="110" r="5" className="mx-plot__mid" />
            <text x="44" y="190" textAnchor="middle">(2, 3)</text>
            <text x="236" y="44" textAnchor="start">(8, 11)</text>
            <text x="128" y="98" textAnchor="end" className="mx-plot__mlabel">M (5, 7)</text>
            <text x="95" y="186" textAnchor="middle" className="mx-plot__small">3 across</text>
            <text x="146" y="144" textAnchor="start" className="mx-plot__small">4 up</text>
            <text x="185" y="126" textAnchor="middle" className="mx-plot__small">3 across</text>
            <text x="236" y="84" textAnchor="start" className="mx-plot__small">4 up</text>
          </svg>
          <MathMd md={R`From $(2, 3)$ to $(8, 11)$ is $6$ across and $8$ up. The midpoint is half of each: $3$ across and $4$ up from the start, which lands on $(5, 7)$. From there, another $3$ across and $4$ up reaches $(8, 11)$, so the two halves match.`} />
        </div>
      </section>

      <section id="steps" className="tb-section" aria-labelledby="h-steps">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-steps" className="tb-h2 pg-h2">How to find the midpoint, step by step</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the midpoint of $A(2, 3)$ and $B(8, 11)$.

**1. Add the $x$-coordinates and halve:** $\;\dfrac{2 + 8}{2} = \dfrac{10}{2} = 5$

**2. Add the $y$-coordinates and halve:** $\;\dfrac{3 + 11}{2} = \dfrac{14}{2} = 7$

**3. Write the answer as a point:**
$$M = (5, 7)$$`} />
          </div>
          <MathMd md={R`**Quick check:** the midpoint's $x$-value should sit between the two $x$-values ($2 < 5 < 8$), and the same for $y$ ($3 < 7 < 11$). If it doesn't, something has gone wrong.`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Midpoint calculator</h2>
          <p className="pg-intro">Find the midpoint of two points, or switch to “A missing endpoint” to work backwards from one end and the midpoint. You’ll see every step and a sketch with the midpoint marked.</p>
          <MidpointCalc placement="concept_midpoint_calc" />
        </div>
      </section>

      <section id="negatives" className="tb-section" aria-labelledby="h-negatives">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-negatives" className="tb-h2 pg-h2">Midpoints with negatives and decimals</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: negative coordinates</p>
            <MathMd md={R`Find the midpoint of $P(-5, 4)$ and $Q(3, -6)$.

Put negatives in brackets when you substitute:

$$x = \frac{-5 + 3}{2} = \frac{-2}{2} = -1$$
$$y = \frac{4 + (-6)}{2} = \frac{-2}{2} = -1$$

$$M = (-1, -1)$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: a decimal answer</p>
            <MathMd md={R`Find the midpoint of $(1, -2)$ and $(4, 7)$.

$$x = \frac{1 + 4}{2} = \frac{5}{2} = 2.5$$
$$y = \frac{-2 + 7}{2} = \frac{5}{2} = 2.5$$

$$M = (2.5, 2.5)$$`} />
          </div>
          <MathMd md={R`When the total is odd, the midpoint has a half in it. That's fine: $(2.5, 2.5)$, or $\left(\frac{5}{2}, \frac{5}{2}\right)$, is the exact answer. Don't round it to a whole number.`} />
        </div>
      </section>

      <section id="endpoint" className="tb-section" aria-labelledby="h-endpoint">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-endpoint" className="tb-h2 pg-h2">Finding a missing endpoint</h2>
          <MathMd md={R`Sometimes you're given one end and the midpoint, and asked for the other end. Set up each coordinate as an equation and solve it.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`$M(1, 4)$ is the midpoint of $A(-3, 2)$ and $B$. Find $B$.

Let $B = (x, y)$. The $x$-coordinates average to $1$:

$$\frac{-3 + x}{2} = 1$$
$$-3 + x = 2$$
$$x = 5$$

The $y$-coordinates average to $4$:

$$\frac{2 + y}{2} = 4$$
$$2 + y = 8$$
$$y = 6$$

$$B = (5, 6)$$`} />
          </div>
          <MathMd md={R`**Shortcut:** the step from $A$ to $M$ is the same as the step from $M$ to $B$. From $(-3, 2)$ to $(1, 4)$ is $4$ across and $2$ up, so add that again: $(1 + 4, 4 + 2) = (5, 6)$. Both methods give the same point, and so does $B = 2M - A$.`} />
        </div>
      </section>

      <section id="uses" className="tb-section" aria-labelledby="h-uses">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-uses" className="tb-h2 pg-h2">Where the midpoint turns up</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: the centre of a circle</p>
            <MathMd md={R`The points $(-2, 5)$ and $(6, -1)$ are the ends of a diameter of a circle. Find the centre and the radius.

The centre is the midpoint of the diameter:

$$\left(\frac{-2 + 6}{2}, \frac{5 + (-1)}{2}\right) = \left(\frac{4}{2}, \frac{4}{2}\right) = (2, 2)$$

The radius is the distance from the centre to either end. From $(2, 2)$ to $(6, -1)$:

$$r = \sqrt{(6 - 2)^2 + (-1 - 2)^2} = \sqrt{16 + 9} = \sqrt{25} = 5 \text{ units}$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: proving a parallelogram</p>
            <MathMd md={R`Show that $A(0, 0)$, $B(5, 1)$, $C(7, 5)$ and $D(2, 4)$ form a parallelogram.

The diagonals of a parallelogram bisect each other, so they share a midpoint.

$$\text{Midpoint of } AC = \left(\frac{0 + 7}{2}, \frac{0 + 5}{2}\right) = (3.5, 2.5)$$
$$\text{Midpoint of } BD = \left(\frac{5 + 2}{2}, \frac{1 + 4}{2}\right) = (3.5, 2.5)$$

The diagonals have the same midpoint, so $ABCD$ is a parallelogram.`} />
          </div>
          <MathMd md={R`**In Year 10**, the midpoint is the first step in finding a **perpendicular bisector**: the line through the midpoint at right angles to the segment. For $A(1, 2)$ and $B(5, 10)$, the midpoint is $(3, 6)$ and the gradient of $AB$ is $\frac{8}{4} = 2$, so the perpendicular gradient is $-\frac{1}{2}$ and the bisector is $y - 6 = -\frac{1}{2}(x - 3)$, or $y = -\frac{1}{2}x + 7.5$.`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Subtracting instead of adding.** The midpoint **adds** the coordinates: $\frac{x_1 + x_2}{2}$. Subtracting is for gradient and distance. For $(2, 3)$ and $(8, 11)$, $\frac{8 - 2}{2} = 3$ is half the run, not the midpoint's $x$-value, which is $5$.
- **Forgetting to halve.** $(2 + 8, 3 + 11) = (10, 14)$ is the total, not the midpoint. Divide both totals by $2$.
- **Mixing $x$ and $y$.** Add $x$ with $x$ and $y$ with $y$. Adding the two coordinates of the same point gives nonsense.
- **Dropping a negative sign.** $\frac{4 + (-6)}{2}$ is $-1$, not $5$. Brackets around negatives help.
- **Halving the midpoint to find an endpoint.** If $M(1, 4)$ is the midpoint of $A(-3, 2)$ and $B$, then $B$ is **not** the midpoint of $A$ and $M$. Double the midpoint and subtract the known end: $B = (2 - (-3), 8 - 2) = (5, 6)$.
- **Rounding a half.** $(3.5, 6.5)$ is exact. Rounding it to $(4, 7)$ gives a point that isn't halfway.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer. The last two mix the midpoint with the distance formula and gradient.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Got a midpoint wrong? Find out which step slipped, then fix it for good." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">The midpoint and coordinate geometry by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-8-gradient", text: "Rise over run and plotting points, the groundwork for coordinate geometry." },
              { slug: "year-9-coordinate-geometry", text: "The midpoint formula, alongside gradient and the distance between two points." },
              { slug: "year-10-coordinate-geometry", text: "Parallel and perpendicular lines, with the midpoint used in perpendicular bisector and shape questions." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

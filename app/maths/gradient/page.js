import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import GradientCalc from "@/components/maths/GradientCalc";

// Concept page with a calculator: gradient ("how to find the gradient"
// ~1,900 searches a month, "gradient calculator" ~880). Every example and
// practice answer was checked (Nov 2026).

const PATH = "/maths/gradient";
const TITLE = "How to Find the Gradient: Formula, Examples and Gradient Calculator (Years 8 to 10) | Tuterly";
const DESCRIPTION =
  "How to find the gradient of a line from two points, a graph or an equation, with the formula m = rise ÷ run, worked examples, parallel and perpendicular lines, practice questions and a free calculator that shows the working.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is the gradient of a line?", a: "How steep the line is: how far it goes up (the rise) for every 1 unit it goes across (the run). Gradient = rise ÷ run." },
  { q: "What's the formula for gradient?", a: "m = (y₂ − y₁) ÷ (x₂ − x₁), using any two points (x₁, y₁) and (x₂, y₂) on the line." },
  { q: "How do I find the gradient from an equation?", a: "Rearrange it to y = mx + c. The number in front of x is the gradient. For y = 3x − 2, the gradient is 3." },
  { q: "What's the gradient of a horizontal or vertical line?", a: "A horizontal line has gradient 0. A vertical line's gradient is undefined, because the run is 0." },
  { q: "What year level learns gradient?", a: "In the Victorian Curriculum 2.0, gradient comes in with linear graphs in Year 8, the gradient formula and coordinate geometry in Year 9, and parallel and perpendicular lines in Year 10." },
];

const PRACTICE = [
  { q: R`Find the gradient through $(2, 3)$ and $(6, 11)$.`, a: R`$m = \dfrac{11 - 3}{6 - 2} = \dfrac{8}{4} = 2$` },
  { q: R`Find the gradient through $(-1, 4)$ and $(3, -4)$.`, a: R`$m = \dfrac{-4 - 4}{3 - (-1)} = \dfrac{-8}{4} = -2$` },
  { q: R`Find the gradient through $(1, -2)$ and $(5, 0)$.`, a: R`$m = \dfrac{0 - (-2)}{5 - 1} = \dfrac{2}{4} = \dfrac{1}{2}$` },
  { q: R`Find the gradient through $(0, 5)$ and $(4, 5)$.`, a: R`$m = \dfrac{0}{4} = 0$ (a horizontal line)` },
  { q: R`What is the gradient of $y = -4x + 7$?`, a: R`$-4$` },
  { q: R`What is the gradient of $3x + 2y = 6$?`, a: R`Rearrange: $y = -\dfrac{3}{2}x + 3$, so $m = -\dfrac{3}{2}$` },
  { q: R`A line is perpendicular to one with gradient $\dfrac{2}{3}$. What is its gradient?`, a: R`The negative reciprocal: $-\dfrac{3}{2}$` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Gradient", path: PATH }]}
      eyebrow="Maths explained · Years 8 to 10"
      h1="How to find the gradient of a line"
      lead="Gradient is how steep a line is. You can find it from two points, by counting on a graph, or straight from the equation. Here’s each method with an example, a calculator that shows the working, and practice questions with answers."
      quickAnswer="Gradient = rise ÷ run. From two points, m = (y₂ − y₁) ÷ (x₂ − x₁). From an equation, rearrange to y = mx + c and read off m. Uphill lines have a positive gradient, downhill lines a negative one, horizontal lines 0, and vertical lines are undefined."
      toc={[
        ["meaning", "What gradient means"],
        ["points", "From two points"],
        ["calculator", "Calculator"],
        ["graph", "From a graph"],
        ["equation", "From an equation"],
        ["parallel", "Parallel and perpendicular"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a gradient question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_gradient"
      faqs={FAQS}
      faqTitle="Gradient: common questions"
      links={[
        { href: "/maths/simultaneous-equations", label: "Simultaneous equations explained" },
        { href: "/maths/pythagoras-theorem", label: "Pythagoras' theorem (distance between points)" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got a gradient question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="meaning" className="tb-section" aria-labelledby="h-meaning">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-meaning" className="tb-h2 pg-h2">What gradient means</h2>
          <div className="mx-formula"><MathMd md={R`$$m = \frac{\text{rise}}{\text{run}}$$`} /></div>
          <MathMd md={R`- **Positive** gradient: the line goes up from left to right.
- **Negative** gradient: it goes down from left to right.
- **Zero**: a horizontal line.
- **Undefined**: a vertical line (you can't divide by a run of 0).

The bigger the number (ignoring the sign), the steeper the line.`} />
        </div>
      </section>

      <section id="points" className="tb-section" aria-labelledby="h-points">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-points" className="tb-h2 pg-h2">From two points</h2>
          <div className="mx-formula"><MathMd md={R`$$m = \frac{y_2 - y_1}{x_2 - x_1}$$`} /></div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the gradient of the line through $(1, 2)$ and $(4, 8)$.

$$m = \frac{8 - 2}{4 - 1} = \frac{6}{3} = 2$$`} />
          </div>
          <MathMd md={R`It doesn't matter which point you call the first, as long as you keep the $x$ and $y$ from the same point together.`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Gradient calculator (with working)</h2>
          <p className="pg-intro">Enter two points. You’ll get the gradient, the equation of the line, the midpoint and the distance between them, with every step.</p>
          <GradientCalc placement="concept_gradient_calc" />
        </div>
      </section>

      <section id="graph" className="tb-section" aria-labelledby="h-graph">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-graph" className="tb-h2 pg-h2">From a graph</h2>
          <MathMd md={R`Pick two points where the line crosses grid corners exactly. Count the **rise** (up is positive, down is negative), then the **run** (left to right), and divide.

If the line goes down 3 squares for every 2 across, the gradient is $\dfrac{-3}{2} = -\dfrac{3}{2}$.`} />
        </div>
      </section>

      <section id="equation" className="tb-section" aria-labelledby="h-equation">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-equation" className="tb-h2 pg-h2">From an equation</h2>
          <MathMd md={R`In $y = mx + c$, $m$ is the gradient and $c$ is the y-intercept.

- $y = 3x - 2$: gradient $3$.
- $2x + y = 5$: rearrange to $y = -2x + 5$, so the gradient is $-2$.

Always get $y$ on its own first.`} />
        </div>
      </section>

      <section id="parallel" className="tb-section" aria-labelledby="h-parallel">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-parallel" className="tb-h2 pg-h2">Parallel and perpendicular lines (Year 10)</h2>
          <MathMd md={R`- **Parallel** lines have the **same** gradient.
- **Perpendicular** lines have gradients that multiply to $-1$: $m_1 \times m_2 = -1$. Flip the fraction and change the sign. Perpendicular to $m = 3$ is $m = -\dfrac{1}{3}$.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Gradient by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-8-linear-equations", text: "Linear graphs and gradient as rise over run." },
              { slug: "year-9-coordinate-geometry", text: "The gradient formula, midpoint and distance between two points." },
              { slug: "year-10-coordinate-geometry", text: "Equations of lines, parallel and perpendicular gradients." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

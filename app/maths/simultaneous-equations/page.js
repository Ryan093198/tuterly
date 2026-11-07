import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import SimEqCalc from "@/components/maths/SimEqCalc";

// Concept page with a solver: simultaneous equations ("simultaneous
// equations" ~4,400 searches a month in Australia). Every example and
// practice answer was checked (Nov 2026).

const PATH = "/maths/simultaneous-equations";
const TITLE = "Simultaneous Equations: Substitution and Elimination Explained, with a Solver (Year 10) | Tuterly";
const DESCRIPTION =
  "How to solve simultaneous equations by substitution, elimination and graphing, with worked examples, word problems, practice questions with answers and a free solver that shows every step.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What are simultaneous equations?", a: "Two (or more) equations with the same unknowns that are true at the same time. The solution is the pair of values, like x = 2 and y = 3, that works in both. On a graph, it's where the two lines cross." },
  { q: "Should I use substitution or elimination?", a: "Use substitution when one equation already says y = … or x = …. Use elimination when both are in the form ax + by = c, especially if a coefficient already matches or is opposite." },
  { q: "What if there's no solution?", a: "If the lines are parallel (same gradient, different intercepts), they never cross, so there's no solution. If both equations describe the same line, there are infinitely many." },
  { q: "How do I check my answer?", a: "Substitute both values into the equation you didn't use to find the second value. If it works, the answer is right." },
  { q: "What year level learns simultaneous equations?", a: "In the Victorian Curriculum 2.0 they're a Year 10 topic, solved algebraically and graphically. Year 10A extends to one linear and one non-linear equation, such as a line and a parabola." },
];

const PRACTICE = [
  { q: R`Solve $y = x + 3$ and $2x + y = 12$.`, a: R`Substitute: $2x + x + 3 = 12$, so $3x = 9$, $x = 3$ and $y = 6$.` },
  { q: R`Solve $x + y = 9$ and $x - y = 3$.`, a: R`Add: $2x = 12$, so $x = 6$ and $y = 3$.` },
  { q: R`Solve $3x + 2y = 16$ and $x + 2y = 8$.`, a: R`Subtract: $2x = 8$, so $x = 4$ and $y = 2$.` },
  { q: R`Solve $5x - 2y = 11$ and $3x + 4y = 4$.`, a: R`Multiply the first by 2: $10x - 4y = 22$. Add: $13x = 26$, so $x = 2$. Then $10 - 2y = 11$, so $y = -\dfrac{1}{2}$.` },
  { q: R`Solve $y = 2x - 1$ and $y = -x + 8$.`, a: R`Set them equal: $2x - 1 = -x + 8$, so $3x = 9$, $x = 3$ and $y = 5$.` },
  { q: R`Two numbers add to 25 and their difference is 7. Find them.`, a: R`$x + y = 25$ and $x - y = 7$. Add: $2x = 32$, so the numbers are 16 and 9.` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Simultaneous equations", path: PATH }]}
      eyebrow="Maths explained · Year 10"
      h1="Simultaneous equations: substitution and elimination, explained"
      lead="Simultaneous equations are two equations that share the same unknowns. There are two main ways to solve them, and choosing the right one makes the algebra much shorter. Here’s each method with a worked example, a solver that shows the working, and practice questions with answers."
      quickAnswer="Simultaneous equations are solved when you find the x and y that make both equations true. Substitution: rearrange one equation for y (or x) and substitute it into the other. Elimination: make the coefficients of one letter match, then add or subtract the equations so it cancels. Always check your answer in the other equation."
      toc={[
        ["what", "What they are"],
        ["substitution", "Substitution"],
        ["elimination", "Elimination"],
        ["solver", "Solver"],
        ["graph", "Graphing"],
        ["word", "Word problems"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a simultaneous equations question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_simeq"
      faqs={FAQS}
      faqTitle="Simultaneous equations: common questions"
      links={[
        { href: "/maths/gradient", label: "How to find the gradient" },
        { href: "/calculators/quadratic-formula", label: "Quadratic formula calculator" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got one wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="what" className="tb-section" aria-labelledby="h-what">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-what" className="tb-h2 pg-h2">What simultaneous equations are</h2>
          <MathMd md={R`Each equation on its own has endless solutions. Together, there's usually just one pair $(x, y)$ that works in both. That pair is where their graphs cross.

For example, $x + y = 10$ and $x - y = 4$ are both true when $x = 7$ and $y = 3$.`} />
        </div>
      </section>

      <section id="substitution" className="tb-section" aria-labelledby="h-sub">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-sub" className="tb-h2 pg-h2">Method 1: substitution</h2>
          <p className="pg-intro">Best when one equation already says <em>y = …</em>{" "}or <em>x = …</em>.</p>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Solve $y = 2x + 1$ and $3x + y = 11$.

Replace $y$ in the second equation with $2x + 1$:
$$3x + (2x + 1) = 11$$
$$5x = 10 \quad \Rightarrow \quad x = 2$$
Substitute back: $y = 2(2) + 1 = 5$. So $x = 2$, $y = 5$.`} />
          </div>
        </div>
      </section>

      <section id="elimination" className="tb-section" aria-labelledby="h-elim">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-elim" className="tb-h2 pg-h2">Method 2: elimination</h2>
          <p className="pg-intro">Best when both are in the form ax + by = c. Same signs: subtract. Opposite signs: add.</p>
          <div className="mx-example">
            <p className="mx-example__k">Coefficients already opposite</p>
            <MathMd md={R`Solve $x + y = 10$ and $x - y = 4$.

The $y$ terms are opposites, so add:
$$2x = 14 \quad \Rightarrow \quad x = 7$$
Then $7 + y = 10$, so $y = 3$.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Multiply first</p>
            <MathMd md={R`Solve $2x + 3y = 13$ (1) and $4x - y = 5$ (2).

Multiply (2) by 3 so the $y$ terms are opposites: $12x - 3y = 15$.

Add to (1):
$$14x = 28 \quad \Rightarrow \quad x = 2$$
Substitute into (1): $4 + 3y = 13$, so $y = 3$.

**Check** in (2): $4(2) - 3 = 5$ ✓`} />
          </div>
        </div>
      </section>

      <section id="solver" className="tb-section" aria-labelledby="h-solver">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-solver" className="tb-h2 pg-h2">Simultaneous equations solver (with working)</h2>
          <p className="pg-intro">Enter both equations in the form ax + by = c. It solves them by elimination and shows every step, with exact fractions.</p>
          <SimEqCalc placement="concept_simeq_calc" />
        </div>
      </section>

      <section id="graph" className="tb-section" aria-labelledby="h-graph">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-graph" className="tb-h2 pg-h2">Method 3: graphing</h2>
          <MathMd md={R`Draw both lines on the same axes. The solution is the point where they cross. It's a good check, but reading an exact answer off a graph is hard if it isn't a whole number, so the algebra methods are more reliable.

- Lines cross once: **one solution**.
- Parallel lines: **no solution**.
- The same line: **infinitely many solutions**.`} />
        </div>
      </section>

      <section id="word" className="tb-section" aria-labelledby="h-word">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-word" className="tb-h2 pg-h2">Word problems</h2>
          <p className="pg-intro">Choose a letter for each unknown, write one equation for each fact, then solve.</p>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <p style={{ margin: "0 0 8px" }}>Adult tickets cost 15 dollars and child tickets cost 8 dollars. A family buys 7 tickets for 77 dollars. How many of each?</p>
            <MathMd md={R`Let $a$ = adults and $c$ = children.
$$a + c = 7 \qquad 15a + 8c = 77$$
From the first, $c = 7 - a$. Substitute:
$$15a + 8(7 - a) = 77$$
$$7a = 21 \quad \Rightarrow \quad a = 3$$
So 3 adults and 4 children. Check: $15 \times 3 + 8 \times 4 = 77$ ✓`} />
          </div>
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes that cost marks</h2>
          <ul className="pg-checklist">
            <li><strong>Multiplying only one term.</strong>{" "}When you multiply an equation, multiply every term, including the right-hand side.</li>
            <li><strong>Adding when you should subtract.</strong>{" "}Same signs: subtract. Opposite signs: add.</li>
            <li><strong>Sign errors when subtracting.</strong>{" "}Subtracting −y is adding y. Write each step.</li>
            <li><strong>Stopping after x.</strong>{" "}The answer needs both values.</li>
            <li><strong>Not checking.</strong>{" "}Substituting into the other equation catches most errors in seconds.</li>
          </ul>
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
          <h2 id="h-years" className="tb-h2 pg-h2">Simultaneous equations by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-10-simultaneous-equations", text: "Two linear equations: substitution, elimination and graphing, plus word problems." },
              { slug: "year-10a-non-linear-simultaneous-equations", text: "A line with a parabola, circle or hyperbola: zero, one or two solutions." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

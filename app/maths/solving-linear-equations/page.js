import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";

// Concept page: solving linear equations ("how to solve linear equations",
// "solving equations", "two step equations"). Every example and practice
// answer was checked in code by substituting it back (Nov 2026).

const PATH = "/maths/solving-linear-equations";
const TITLE = "How to Solve Linear Equations: Step by Step with Worked Examples (Years 7 to 10) | Tuterly";
const DESCRIPTION =
  "How to solve linear equations step by step: one-step and two-step equations, variables on both sides, brackets, fractions and word problems, with worked examples and practice questions with answers.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is a linear equation?", a: "An equation where the unknown isn't squared or under a root, like 2x + 5 = 17. It has (at most) one solution, and its graph is a straight line, which is where the name comes from." },
  { q: "What's the golden rule for solving equations?", a: "Whatever you do to one side, do to the other, so the equation stays balanced. Undo each operation with its opposite: subtract to undo adding, divide to undo multiplying." },
  { q: "How do I solve an equation with x on both sides?", a: "Move all the x terms to one side and the numbers to the other, by adding or subtracting the same thing on both sides. For 5x + 3 = 2x + 15, subtract 2x from both sides, then subtract 3, to get 3x = 12, so x = 4." },
  { q: "How do I get rid of fractions in an equation?", a: "Multiply every term on both sides by the lowest common denominator. For x/2 + x/3 = 10, multiply by 6 to get 3x + 2x = 60, so x = 12." },
  { q: "What year level learns linear equations?", a: "In the Victorian Curriculum 2.0, solving one-step and two-step equations starts in Year 7, Year 8 adds equations with negatives, brackets and pronumerals on both sides, and Year 10 covers multi-step equations with algebraic fractions. Schools sequence topics differently, so check your course." },
];

const PRACTICE = [
  { q: R`Solve $x - 8 = 15$.`, a: R`Add 8 to both sides: $x = 23$` },
  { q: R`Solve $4x + 9 = 33$.`, a: R`$4x = 24$, so $x = 6$` },
  { q: R`Solve $7 - 3x = 22$.`, a: R`$-3x = 15$, so $x = -5$` },
  { q: R`Solve $6x - 5 = 2x + 11$.`, a: R`$4x - 5 = 11$, so $4x = 16$ and $x = 4$` },
  { q: R`Solve $4(x + 3) = 2(x - 1)$.`, a: R`$4x + 12 = 2x - 2$, so $2x = -14$ and $x = -7$` },
  { q: R`Solve $\dfrac{x - 2}{5} = 3$.`, a: R`Multiply by 5: $x - 2 = 15$, so $x = 17$` },
  { q: R`Solve $\dfrac{x}{4} + \dfrac{x}{6} = 5$.`, a: R`Multiply every term by 12: $3x + 2x = 60$, so $5x = 60$ and $x = 12$` },
  { q: R`Three consecutive whole numbers add to 72. Find them.`, a: R`Let them be $n$, $n + 1$ and $n + 2$. Then $3n + 3 = 72$, so $3n = 69$ and $n = 23$. The numbers are 23, 24 and 25.` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Solving linear equations", path: PATH }]}
      eyebrow="Maths explained · Years 7 to 10"
      h1="How to solve linear equations"
      lead="Solving an equation means finding the value of the unknown that makes both sides equal. The method is the same every time: undo what’s been done to x, doing the same thing to both sides. Here it is for each type of equation you’ll meet, with worked examples and practice questions with answers."
      quickAnswer="Do the same thing to both sides to get x on its own. Undo operations in reverse order: first undo adding or subtracting, then undo multiplying or dividing. Expand brackets first, multiply through to clear fractions, and gather the x terms on one side. Check by substituting your answer back in."
      toc={[
        ["balance", "The balance idea"],
        ["onestep", "One-step equations"],
        ["twostep", "Two-step equations"],
        ["both", "x on both sides"],
        ["brackets", "Brackets"],
        ["fractions", "Fractions"],
        ["word", "Word problems"],
        ["check", "Checking your answer"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on an equation?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_solving-linear-equations"
      faqs={FAQS}
      faqTitle="Solving linear equations: common questions"
      links={[
        { href: "/maths/simultaneous-equations", label: "Simultaneous equations explained" },
        { href: "/worksheets/linear-equations", label: "Linear equations worksheets" },
        { href: "/worksheets/two-step-equations", label: "Two-step equations worksheets" },
        { href: "/maths/expanding-brackets", label: "How to expand brackets" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got an equation wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="balance" className="tb-section" aria-labelledby="h-balance">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-balance" className="tb-h2 pg-h2">The balance idea</h2>
          <MathMd md={R`An equation is like a balanced scale: the left side equals the right side. You can do anything you like to it, as long as you do **the same thing to both sides**.

To get $x$ on its own, use the **inverse** (opposite) operation:

| To undo | Do this |
|---|---|
| $+\,5$ | subtract 5 |
| $-\,5$ | add 5 |
| $\times\, 5$ | divide by 5 |
| $\div\, 5$ | multiply by 5 |`} />
        </div>
      </section>

      <section id="onestep" className="tb-section" aria-labelledby="h-onestep">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-onestep" className="tb-h2 pg-h2">One-step equations</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked examples</p>
            <MathMd md={R`$x + 7 = 12$: subtract 7 from both sides.
$$x = 5$$

$x - 4 = 9$: add 4 to both sides.
$$x = 13$$

$3x = 21$: divide both sides by 3.
$$x = 7$$

$\dfrac{x}{5} = 4$: multiply both sides by 5.
$$x = 20$$`} />
          </div>
        </div>
      </section>

      <section id="twostep" className="tb-section" aria-labelledby="h-twostep">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-twostep" className="tb-h2 pg-h2">Two-step equations</h2>
          <MathMd md={R`Undo the operations in **reverse order**. In $2x + 5$, $x$ was multiplied by 2 and then 5 was added. So subtract 5 first, then divide by 2.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Solve $2x + 5 = 17$.
$$2x = 12 \quad (\text{subtract 5 from both sides})$$
$$x = 6 \quad (\text{divide both sides by 2})$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">More worked examples</p>
            <MathMd md={R`$\dfrac{x}{3} - 2 = 4$: add 2, then multiply by 3.
$$\frac{x}{3} = 6$$
$$x = 18$$

$5 - 2x = 11$: subtract 5, then divide by $-2$.
$$-2x = 6$$
$$x = -3$$`} />
          </div>
        </div>
      </section>

      <section id="both" className="tb-section" aria-labelledby="h-both">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-both" className="tb-h2 pg-h2">Equations with x on both sides</h2>
          <MathMd md={R`Get all the $x$ terms on one side first. It's usually easiest to move the smaller $x$ term, so you don't end up with a negative.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Solve $5x + 3 = 2x + 15$.
$$3x + 3 = 15 \quad (\text{subtract } 2x)$$
$$3x = 12 \quad (\text{subtract 3})$$
$$x = 4$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example with negatives</p>
            <MathMd md={R`Solve $3x - 8 = 5x + 2$. The smaller $x$ term is $3x$, so subtract it.
$$-8 = 2x + 2$$
$$-10 = 2x$$
$$x = -5$$`} />
          </div>
        </div>
      </section>

      <section id="brackets" className="tb-section" aria-labelledby="h-brackets">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-brackets" className="tb-h2 pg-h2">Equations with brackets</h2>
          <MathMd md={R`Expand the brackets first, then solve as normal.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Solve $3(x - 4) = 15$.
$$3x - 12 = 15$$
$$3x = 27$$
$$x = 9$$

You could also divide both sides by 3 first: $x - 4 = 5$, so $x = 9$.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: brackets on both sides</p>
            <MathMd md={R`Solve $2(x + 5) = 4(x - 1)$.
$$2x + 10 = 4x - 4$$
$$10 = 2x - 4 \quad (\text{subtract } 2x)$$
$$14 = 2x$$
$$x = 7$$`} />
          </div>
        </div>
      </section>

      <section id="fractions" className="tb-section" aria-labelledby="h-fractions">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-fractions" className="tb-h2 pg-h2">Equations with fractions</h2>
          <MathMd md={R`Clear the fractions by multiplying **every term on both sides** by the denominator (or the lowest common denominator if there's more than one).`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Solve $\dfrac{x + 3}{4} = 5$.
$$x + 3 = 20 \quad (\text{multiply both sides by 4})$$
$$x = 17$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: two fractions</p>
            <MathMd md={R`Solve $\dfrac{x}{2} + \dfrac{x}{3} = 10$. The lowest common denominator is 6.
$$3x + 2x = 60 \quad (\text{multiply every term by 6})$$
$$5x = 60$$
$$x = 12$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: a fraction on each side (Year 10)</p>
            <MathMd md={R`Solve $\dfrac{2x - 1}{3} = \dfrac{x + 4}{2}$. Multiply both sides by 6 (or cross-multiply).
$$2(2x - 1) = 3(x + 4)$$
$$4x - 2 = 3x + 12$$
$$x = 14$$`} />
          </div>
        </div>
      </section>

      <section id="word" className="tb-section" aria-labelledby="h-word">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-word" className="tb-h2 pg-h2">Setting up word problems</h2>
          <MathMd md={R`1. Choose a letter for the unknown and say what it stands for.
2. Turn the words into an equation.
3. Solve it.
4. Answer the question in words, with units.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`*I think of a number, multiply it by 3 and add 7. The answer is 31. What's my number?*

Let the number be $n$.
$$3n + 7 = 31$$
$$3n = 24$$
$$n = 8$$

The number is 8.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`*A taxi charges \$4 to start plus \$2.50 per kilometre. A trip cost \$29. How far was it?*

Let the distance be $d$ km.
$$4 + 2.5d = 29$$
$$2.5d = 25$$
$$d = 10$$

The trip was 10 km.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`*A rectangle is 3 cm longer than it is wide. Its perimeter is 34 cm. Find its length and width.*

Let the width be $w$ cm, so the length is $w + 3$ cm.
$$2w + 2(w + 3) = 34$$
$$4w + 6 = 34$$
$$4w = 28$$
$$w = 7$$

The rectangle is 7 cm wide and 10 cm long.`} />
          </div>
        </div>
      </section>

      <section id="check" className="tb-section" aria-labelledby="h-check">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-check" className="tb-h2 pg-h2">Checking your answer</h2>
          <MathMd md={R`Substitute your answer into the **original** equation. If both sides come out the same, it's right.

For $3x - 8 = 5x + 2$ with $x = -5$:

- Left side: $3 \times (-5) - 8 = -23$
- Right side: $5 \times (-5) + 2 = -23$

Both sides are $-23$, so $x = -5$ is correct.

**Common mistakes:** only doing an operation to one side, forgetting to multiply every term when clearing fractions, and dropping the negative when dividing by a negative number.`} />
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
          <h2 id="h-years" className="tb-h2 pg-h2">Linear equations by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course. Once you can solve one equation, the next step is two at once: <Link href="/maths/simultaneous-equations">simultaneous equations</Link> (Year 10).</p>
          <YearLinks
            rows={[
              { slug: "year-7-linear-equations", text: "One-step and two-step equations, using inverse operations and checking by substitution." },
              { slug: "year-8-linear-equations", text: "Equations with negatives, brackets and x on both sides, and linear graphs." },
              { slug: "year-10-linear-equations", text: "Multi-step equations, including rearranging formulas." },
              { slug: "year-10-equations-with-fractions", text: "Equations with algebraic fractions, cleared with the lowest common denominator." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

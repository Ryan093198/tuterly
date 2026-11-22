import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import RearrangeCalc from "@/components/maths/RearrangeCalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a checker: rearranging formulas (changing the subject).
// Built by the daily page task (Nov 2026); not yet read by Ryan, so it's in
// UNREVIEWED_PATHS (lib/reviewed.js). Every example, practice answer and
// checker test case was recomputed by script before publishing.

const PATH = "/maths/rearranging-formulas";
const TITLE = "Rearranging Formulas: How to Change the Subject (Years 8 to 10) | Tuterly";
const DESCRIPTION =
  "How to rearrange a formula to change the subject: inverse operations in reverse order, fractions, squares and square roots, with worked examples and a checker.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What does it mean to make a letter the subject of a formula?", a: "It means rewriting the formula so that letter is on its own on one side of the equals sign, with no copies of it on the other side. In A = πr², A is the subject. Rearranged as r = √(A ÷ π), r is the subject, so you can find the radius straight from the area." },
  { q: "How do you rearrange a formula?", a: "Work out what has been done to the letter you want, in order, then undo those operations in reverse order using inverse operations. Whatever you do to one side, do to the whole of the other side. For v = u + at, t is multiplied by a and then u is added, so subtract u first and then divide by a: t = (v − u) ÷ a." },
  { q: "How do you rearrange a formula with a fraction?", a: "Multiply both sides by the denominator to clear the fraction, then carry on as normal. For C = 5(F − 32) ÷ 9, multiply both sides by 9 to get 9C = 5(F − 32), divide by 5, then add 32: F = 9C ÷ 5 + 32." },
  { q: "What do you do when the subject is squared?", a: "Get the squared term on its own first, then take the square root of both sides. For E = ½mv², multiply by 2 and divide by m to get v² = 2E ÷ m, so v = √(2E ÷ m). Strictly the square root gives ±, but a length or a speed is positive, so you keep the positive root." },
  { q: "How can I check that my rearranged formula is right?", a: "Pick easy numbers, work out the value of the original subject, then put the numbers into your new formula and see whether you get back the value you started with. With u = 4, a = 3 and t = 5, v = u + at gives v = 19, and (19 − 4) ÷ 3 = 5, so t = (v − u) ÷ a checks out. The checker on this page does the same thing with random numbers." },
  { q: "What year level learns rearranging formulas?", a: "In the Victorian Curriculum 2.0, Year 7 and 8 students substitute into formulas and solve linear equations, which uses the same inverse operations. Rearranging formulas to make a particular letter the subject is named in Year 10 algebra, and formulas where the subject appears twice are an extension skill. Schools sequence topics differently, so check your course." },
];

const PRACTICE = [
  { q: R`Make $x$ the subject of $y = 4x - 7$.`, a: R`Add $7$: $y + 7 = 4x$. Divide by $4$: $x = \dfrac{y + 7}{4}$` },
  { q: R`Make $b$ the subject of $P = a + b + c$.`, a: R`Subtract $a$ and $c$ from both sides: $b = P - a - c$` },
  { q: R`Make $r$ the subject of $C = 2\pi r$.`, a: R`Divide both sides by $2\pi$: $r = \dfrac{C}{2\pi}$` },
  { q: R`Make $x$ the subject of $y = \dfrac{x - 3}{5}$.`, a: R`Multiply by $5$: $5y = x - 3$. Add $3$: $x = 5y + 3$` },
  { q: R`Make $R$ the subject of $I = \dfrac{V}{R}$.`, a: R`Multiply by $R$: $IR = V$. Divide by $I$: $R = \dfrac{V}{I}$` },
  { q: R`Make $u$ the subject of $s = \dfrac{(u + v)t}{2}$.`, a: R`Multiply by $2$: $2s = (u + v)t$. Divide by $t$: $\dfrac{2s}{t} = u + v$. Subtract $v$: $u = \dfrac{2s}{t} - v$` },
  { q: R`Make $r$ the subject of $V = \dfrac{4}{3}\pi r^3$.`, a: R`Multiply by $3$: $3V = 4\pi r^3$. Divide by $4\pi$: $r^3 = \dfrac{3V}{4\pi}$. Take the cube root: $r = \sqrt[3]{\dfrac{3V}{4\pi}}$` },
  { q: R`$E = \dfrac{1}{2}mv^2$. Find $v$ when $E = 400$ and $m = 8$.`, a: R`$v = \sqrt{\dfrac{2E}{m}} = \sqrt{\dfrac{800}{8}} = \sqrt{100} = 10$` },
  { q: R`(Year 10A) Make $a$ the subject of $ab = a + 6$.`, a: R`Get the $a$ terms together: $ab - a = 6$. Factorise: $a(b - 1) = 6$. Divide: $a = \dfrac{6}{b - 1}$` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Rearranging formulas", path: PATH }]}
      eyebrow="Maths explained · Years 8 to 10"
      h1="Rearranging formulas (changing the subject)"
      lead="A formula is set up to find one thing, but questions often hand you that thing and ask for something else. Rearranging, also called changing the subject or transposing, turns the formula around so the letter you need is on its own. It uses the same inverse operations as solving an equation, just with letters instead of numbers. Here’s the method, with fractions, squares and square roots, a Year 10A case where the letter appears twice, and a checker that tests your own answer."
      quickAnswer="To make a letter the subject, list what has been done to it, then undo those operations in reverse order with inverse operations (+ and −, × and ÷, squaring and square roots), doing the same to both sides each time. For v = u + at: subtract u, then divide by a, so t = (v − u) ÷ a."
      toc={[
        ["what", "What changing the subject means"],
        ["method", "The method"],
        ["examples", "Worked examples"],
        ["checker", "Checker"],
        ["roots", "Squares and square roots"],
        ["twice", "When the letter appears twice"],
        ["substitute", "Rearrange or substitute first?"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a rearranging question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_rearranging_formulas"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="Rearranging formulas: common questions"
      links={[
        { href: "/worksheets/year-10-rearranging-formulas", label: "Year 10 rearranging formulas worksheets" },
        { href: "/maths/solving-linear-equations", label: "Solving linear equations explained" },
        { href: "/worksheets/substitution", label: "Substitution worksheets" },
        { href: "/year-10-maths-test", label: "Year 10 maths practice test" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got a formula question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="what" className="tb-section" aria-labelledby="h-what">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-what" className="tb-h2 pg-h2">What changing the subject means</h2>
          <MathMd md={R`The **subject** of a formula is the letter on its own on one side. In

$$A = \pi r^2$$

$A$ is the subject, so the formula is built to find an area from a radius. If you know the area and need the radius, rearrange it so $r$ is on its own:

$$r = \sqrt{\frac{A}{\pi}}$$

Both formulas say exactly the same thing. They're just set up to answer different questions.`} />
        </div>
      </section>

      <section id="method" className="tb-section" aria-labelledby="h-method">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-method" className="tb-h2 pg-h2">The method: undo in reverse order</h2>
          <MathMd md={R`1. **Find the letter you want** and list what has been done to it, in the order a calculator would do it.
2. **Undo each step in reverse order** using the inverse operation.
3. **Do the same thing to both sides**, and to the *whole* of each side.
4. **Stop when the letter is on its own**, then write it on the left.

The inverse pairs are:

| Operation | Undo it with |
|---|---|
| $+$ add | $-$ subtract |
| $\times$ multiply | $\div$ divide |
| square, $x^2$ | square root, $\sqrt{x}$ |
| divide by a letter | multiply by it |

It's the same skill as [solving a linear equation](/maths/solving-linear-equations). The only difference is that the answer is an expression in other letters instead of a number.`} />
        </div>
      </section>

      <section id="examples" className="tb-section" aria-labelledby="h-examples">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-examples" className="tb-h2 pg-h2">Worked examples</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example 1: two steps</p>
            <MathMd md={R`Make $t$ the subject of $v = u + at$.

What happens to $t$: it's multiplied by $a$, then $u$ is added. Undo in reverse order: subtract $u$ first, then divide by $a$.

$$v - u = at$$
$$\frac{v - u}{a} = t$$

So $t = \dfrac{v - u}{a}$.

**Check:** with $u = 4$, $a = 3$ and $t = 5$, the original formula gives $v = 4 + 3 \times 5 = 19$. The new one gives $t = \dfrac{19 - 4}{3} = 5$ ✓`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example 2: clearing a fraction</p>
            <MathMd md={R`The formula $C = \dfrac{5(F - 32)}{9}$ changes a temperature in degrees Fahrenheit to degrees Celsius. Make $F$ the subject.

What happens to $F$: subtract $32$, multiply by $5$, divide by $9$. Undo in reverse order:

1. Multiply both sides by $9$: $\ 9C = 5(F - 32)$
2. Divide both sides by $5$: $\ \dfrac{9C}{5} = F - 32$
3. Add $32$ to both sides: $\ \dfrac{9C}{5} + 32 = F$

So $F = \dfrac{9C}{5} + 32$.

**Check:** water boils at $100\,^\circ$C, and $\dfrac{9 \times 100}{5} + 32 = 180 + 32 = 212\,^\circ$F ✓`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example 3: the subject in the denominator</p>
            <MathMd md={R`Pressure is force divided by area, $P = \dfrac{F}{A}$. Make $A$ the subject.

$A$ is on the bottom of a fraction, so multiply both sides by $A$ to bring it up:

$$PA = F$$

Now $A$ is multiplied by $P$, so divide both sides by $P$:

$$A = \frac{F}{P}$$

**Check:** a force of $600$ N on an area of $1.5$ m² gives $P = \dfrac{600}{1.5} = 400$ Pa, and $\dfrac{600}{400} = 1.5$ ✓`} />
          </div>
        </div>
      </section>

      <section id="checker" className="tb-section" aria-labelledby="h-checker">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-checker" className="tb-h2 pg-h2">Rearranging formulas checker</h2>
          <p className="pg-intro">Choose a formula and the letter to make the subject. Try it on paper, type your answer and check it. The checker substitutes random numbers into the original formula and your version, so any correct form is accepted. Stuck? Show the steps.</p>
          <RearrangeCalc placement="concept_rearranging_formulas_calc" />
        </div>
      </section>

      <section id="roots" className="tb-section" aria-labelledby="h-roots">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-roots" className="tb-h2 pg-h2">Squares and square roots</h2>
          <MathMd md={R`When the letter you want is squared, get the squared term on its own first, then take the square root of **both whole sides**. If the letter is inside a square root, square both sides instead.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example 4: making r the subject</p>
            <MathMd md={R`A circular garden bed has an area of $50$ m². Rearrange $A = \pi r^2$ to find its radius.

1. Divide both sides by $\pi$: $\ \dfrac{A}{\pi} = r^2$
2. Take the square root of both sides: $\ r = \sqrt{\dfrac{A}{\pi}}$

Taking a square root really gives $\pm$, but a radius is a length, so only the positive root makes sense.

$$r = \sqrt{\frac{50}{\pi}} \approx 3.99 \text{ m}$$

**Check:** $\pi \times 3.989^2 \approx 50$ ✓`} />
          </div>
          <MathMd md={R`The square root goes over everything. From $c^2 = a^2 + b^2$, making $a$ the subject gives $a = \sqrt{c^2 - b^2}$, which is **not** $c - b$. Try it with $c = 5$ and $b = 3$: $\sqrt{25 - 9} = 4$, but $5 - 3 = 2$.`} />
        </div>
      </section>

      <section id="twice" className="tb-section" aria-labelledby="h-twice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-twice" className="tb-h2 pg-h2">When the letter appears twice (Year 10A)</h2>
          <MathMd md={R`If the letter you want shows up in two places, inverse operations alone won't isolate it. Collect every term with that letter on one side, **factorise** it out, then divide.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example 5: factorising out the subject</p>
            <MathMd md={R`Make $x$ the subject of $y = \dfrac{x + 2}{x - 1}$.

1. Multiply both sides by $(x - 1)$: $\ y(x - 1) = x + 2$
2. Expand: $\ xy - y = x + 2$
3. Get the $x$ terms on one side and the rest on the other: $\ xy - x = y + 2$
4. Factorise out $x$: $\ x(y - 1) = y + 2$
5. Divide by $(y - 1)$: $\ x = \dfrac{y + 2}{y - 1}$

**Check:** with $x = 3$, $y = \dfrac{5}{2} = 2.5$, and $\dfrac{2.5 + 2}{2.5 - 1} = \dfrac{4.5}{1.5} = 3$ ✓`} />
          </div>
        </div>
      </section>

      <section id="substitute" className="tb-section" aria-labelledby="h-substitute">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-substitute" className="tb-h2 pg-h2">Rearrange first or substitute first?</h2>
          <MathMd md={R`If you only need one answer, you can substitute the numbers first and solve the equation that's left. If the question asks for a formula, or you'll use it several times, rearrange first. Both give the same answer.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example 6: both ways</p>
            <MathMd md={R`A trapezium has an area of $45$ cm² and parallel sides of $7$ cm and $11$ cm. Use $A = \dfrac{1}{2}(a + b)h$ to find its height.

**Rearrange first:** $h = \dfrac{2A}{a + b} = \dfrac{2 \times 45}{7 + 11} = \dfrac{90}{18} = 5$ cm

**Substitute first:** $45 = \dfrac{1}{2}(7 + 11)h = 9h$, so $h = \dfrac{45}{9} = 5$ cm`} />
          </div>
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Undoing in the wrong order.** From $y = mx + c$, dividing by $m$ first and writing $x = \dfrac{y}{m} - c$ is wrong. The $+\,c$ was the last thing done to $x$, so undo it first, giving $x = \dfrac{y - c}{m}$
- **Dividing only part of a side.** From $v - u = at$, writing $t = v - \dfrac{u}{a}$ divides only the $u$. Divide the whole side: $t = \dfrac{v - u}{a}$. When typing it, use brackets: (v - u)/a.
- **Square rooting term by term.** $\sqrt{c^2 - b^2}$ is not $c - b$. Leave the square root over the whole expression.
- **Flipping a fraction by guessing.** From $P = \dfrac{F}{A}$, the answer is $A = \dfrac{F}{P}$, not $A = FP$. Multiply both sides by $A$ first, then divide.
- **Leaving the subject on both sides.** $x = \dfrac{y + x + 2}{y}$ still has $x$ on the right, so it isn't finished. Collect the $x$ terms and factorise.
- **Not checking.** Two seconds with easy numbers catches most errors. Choose values, find the old subject, then see whether your new formula gives the numbers back.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Rearranged it wrong in a test? Don't just move on. Study your mistakes." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Formulas and equations by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-7-algebra", text: "Writing formulas and substituting values into them: the starting point for rearranging." },
              { slug: "year-8-linear-equations", text: "Solving linear equations with inverse operations, the same moves used to change the subject." },
              { slug: "year-9-linear-equations", text: "Multi-step equations with brackets and fractions, which come up when formulas have fractions." },
              { slug: "year-10-rearranging-formulas", text: "Substituting into formulas and rearranging them to make any letter the subject." },
              { slug: "year-10-equations-with-fractions", text: "Equations with algebraic fractions, useful when the subject is in a denominator." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";

// Concept page: expanding brackets ("how to expand brackets", "expanding
// brackets", "FOIL method"). Every example and practice answer was checked
// in code by substituting values (Nov 2026).

const PATH = "/maths/expanding-brackets";
const TITLE = "How to Expand Brackets: Distributive Law, FOIL and Worked Examples (Years 8 to 10) | Tuterly";
const DESCRIPTION =
  "How to expand brackets: single brackets and the distributive law, expanding and simplifying, binomial products with FOIL or the area method, perfect squares and difference of squares, with practice and answers.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What does expand mean in maths?", a: "Removing the brackets by multiplying everything inside by what's outside. Expanding 3(x + 4) gives 3x + 12. It's the opposite of factorising." },
  { q: "What is the FOIL method?", a: "A way to remember the four multiplications when expanding two brackets: First, Outer, Inner, Last. For (x + 3)(x + 5): x × x, x × 5, 3 × x and 3 × 5, which gives x² + 8x + 15 once you collect like terms." },
  { q: "How do you expand (x + a)²?", a: "Write it as (x + a)(x + a) and expand, or use the rule (x + a)² = x² + 2ax + a². So (x + 5)² = x² + 10x + 25. It is not x² + 25: that misses the middle term." },
  { q: "How do you expand a bracket with a negative in front?", a: "Multiply every term inside by the negative number, so each sign flips. −2(x − 5) = −2x + 10, because −2 × −5 = +10." },
  { q: "What year level learns expanding brackets?", a: "In the Victorian Curriculum 2.0, expanding with the distributive law is Year 8, expanding binomial products like (x + 3)(x + 5) is Year 9, and Year 10 uses perfect squares and difference of squares expansions with quadratics. Schools sequence topics differently, so check your course." },
];

const PRACTICE = [
  { q: R`Expand $4(3x - 2)$.`, a: R`$12x - 8$` },
  { q: R`Expand $-3(2x - 5)$.`, a: R`$-6x + 15$` },
  { q: R`Expand and simplify $2(x + 5) - 3(x - 2)$.`, a: R`$2x + 10 - 3x + 6 = -x + 16$` },
  { q: R`Expand $(x + 4)(x + 6)$.`, a: R`$x^2 + 6x + 4x + 24 = x^2 + 10x + 24$` },
  { q: R`Expand $(3x - 2)(x + 5)$.`, a: R`$3x^2 + 15x - 2x - 10 = 3x^2 + 13x - 10$` },
  { q: R`Expand $(x - 7)^2$.`, a: R`$x^2 - 14x + 49$` },
  { q: R`Expand $(5x + 1)(5x - 1)$.`, a: R`Difference of squares: $25x^2 - 1$` },
  { q: R`Expand and simplify $(x + 3)(x^2 - 2x + 4)$.`, a: R`$x^3 - 2x^2 + 4x + 3x^2 - 6x + 12 = x^3 + x^2 - 2x + 12$` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Expanding brackets", path: PATH }]}
      eyebrow="Maths explained · Years 8 to 10"
      h1="How to expand brackets"
      lead="Expanding brackets means multiplying out so there are no brackets left. Every method comes back to one rule: multiply each term inside by each term outside. Here’s how it works for single brackets, two brackets and special products, with plenty of worked examples and practice questions with answers."
      quickAnswer="To expand a(b + c), multiply each term inside by the term outside: a(b + c) = ab + ac. To expand two brackets, multiply every term in the first by every term in the second (FOIL: First, Outer, Inner, Last), then collect like terms: (x + 3)(x + 5) = x² + 8x + 15. Watch the signs when there's a negative."
      toc={[
        ["single", "Single brackets"],
        ["negative", "A negative outside"],
        ["simplify", "Expand and simplify"],
        ["binomial", "Two brackets (FOIL)"],
        ["area", "The area method"],
        ["special", "Perfect squares and difference of squares"],
        ["three", "Three terms or three brackets"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on an expanding question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_expanding-brackets"
      faqs={FAQS}
      faqTitle="Expanding brackets: common questions"
      links={[
        { href: "/maths/factorising", label: "How to factorise (expanding in reverse)" },
        { href: "/worksheets/expanding-brackets", label: "Expanding brackets worksheets" },
        { href: "/maths/index-laws", label: "Index laws explained" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got an expanding question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="single" className="tb-section" aria-labelledby="h-single">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-single" className="tb-h2 pg-h2">Expanding a single bracket (the distributive law)</h2>
          <div className="mx-formula"><MathMd md={R`$$a(b + c) = ab + ac$$`} /></div>
          <MathMd md={R`Multiply the term outside by **every** term inside the bracket.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked examples</p>
            <MathMd md={R`$$3(x + 4) = 3x + 12$$
$$5(2a - 3) = 10a - 15$$
$$x(x + 7) = x^2 + 7x$$
$$2a(3a - 4b) = 6a^2 - 8ab$$`} />
          </div>
          <MathMd md={R`When a letter is outside, use index laws: $x \times x = x^2$ and $2a \times 3a = 6a^2$.`} />
        </div>
      </section>

      <section id="negative" className="tb-section" aria-labelledby="h-negative">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-negative" className="tb-h2 pg-h2">Expanding with a negative outside</h2>
          <MathMd md={R`The negative sign belongs to the number outside, and it multiplies every term inside. A negative times a negative is positive, so every sign inside flips.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked examples</p>
            <MathMd md={R`$$-2(x - 5) = -2x + 10$$
$$-4(3x + 2) = -12x - 8$$
$$-(x - 6) = -x + 6$$`} />
          </div>
        </div>
      </section>

      <section id="simplify" className="tb-section" aria-labelledby="h-simplify">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-simplify" className="tb-h2 pg-h2">Expanding and simplifying</h2>
          <MathMd md={R`Expand each bracket, then **collect like terms** (the $x$ terms together and the numbers together).`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Expand and simplify $3(x + 2) + 4(x - 1)$.
$$= 3x + 6 + 4x - 4$$
$$= 7x + 2$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example with a subtraction</p>
            <MathMd md={R`Expand and simplify $5(2x - 1) - 3(x - 4)$.

The $-3$ multiplies both terms in the second bracket, so $-3 \times -4 = +12$.
$$= 10x - 5 - 3x + 12$$
$$= 7x + 7$$`} />
          </div>
        </div>
      </section>

      <section id="binomial" className="tb-section" aria-labelledby="h-binomial">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-binomial" className="tb-h2 pg-h2">Expanding two brackets (binomial products and FOIL)</h2>
          <div className="mx-formula"><MathMd md={R`$$(a + b)(c + d) = ac + ad + bc + bd$$`} /></div>
          <MathMd md={R`Every term in the first bracket multiplies every term in the second, so there are four multiplications. **FOIL** is a way to remember them: **F**irst, **O**uter, **I**nner, **L**ast.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Expand $(x + 3)(x + 5)$.

First: $x \times x = x^2$. Outer: $x \times 5 = 5x$. Inner: $3 \times x = 3x$. Last: $3 \times 5 = 15$.
$$(x + 3)(x + 5) = x^2 + 5x + 3x + 15$$
$$= x^2 + 8x + 15$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked examples with negatives</p>
            <MathMd md={R`$(x - 6)(x - 2)$: the last term is $-6 \times -2 = +12$.
$$= x^2 - 2x - 6x + 12 = x^2 - 8x + 12$$

$(2x - 1)(x + 4)$:
$$= 2x^2 + 8x - x - 4 = 2x^2 + 7x - 4$$`} />
          </div>
        </div>
      </section>

      <section id="area" className="tb-section" aria-labelledby="h-area">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-area" className="tb-h2 pg-h2">The area (grid) method</h2>
          <MathMd md={R`If FOIL feels easy to mix up, draw a grid. Put the terms of one bracket across the top and the other down the side, multiply to fill each box, then add everything up. Here's $(2x - 1)(x + 4)$:

| × | $x$ | $+4$ |
|---|---|---|
| $2x$ | $2x^2$ | $8x$ |
| $-1$ | $-x$ | $-4$ |

Add the four boxes: $2x^2 + 8x - x - 4 = 2x^2 + 7x - 4$.

The grid works for any size of bracket, so it's handy for three terms too.`} />
        </div>
      </section>

      <section id="special" className="tb-section" aria-labelledby="h-special">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-special" className="tb-h2 pg-h2">Perfect squares and difference of squares</h2>
          <MathMd md={R`Some products come up so often they're worth knowing as rules.

**Perfect squares**`} />
          <div className="mx-formula"><MathMd md={R`$$(a + b)^2 = a^2 + 2ab + b^2 \qquad (a - b)^2 = a^2 - 2ab + b^2$$`} /></div>
          <div className="mx-example">
            <p className="mx-example__k">Worked examples</p>
            <MathMd md={R`$(x + 5)^2 = (x + 5)(x + 5)$
$$= x^2 + 10x + 25$$

$(3x - 2)^2$: square the first, double the product, square the last.
$$= 9x^2 - 12x + 4$$`} />
          </div>
          <MathMd md={R`**Difference of squares**`} />
          <div className="mx-formula"><MathMd md={R`$$(a + b)(a - b) = a^2 - b^2$$`} /></div>
          <div className="mx-example">
            <p className="mx-example__k">Worked examples</p>
            <MathMd md={R`$(x + 7)(x - 7)$: the middle terms $-7x$ and $+7x$ cancel.
$$= x^2 - 49$$

$$(2x + 3)(2x - 3) = 4x^2 - 9$$`} />
          </div>
        </div>
      </section>

      <section id="three" className="tb-section" aria-labelledby="h-three">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-three" className="tb-h2 pg-h2">Expanding three terms or three brackets</h2>
          <MathMd md={R`The rule doesn't change: every term in one bracket multiplies every term in the other. A binomial times a trinomial gives $2 \times 3 = 6$ products before you simplify.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Expand $(x + 2)(x^2 + 3x + 1)$.

Multiply by $x$, then by $2$:
$$= x^3 + 3x^2 + x + 2x^2 + 6x + 2$$
$$= x^3 + 5x^2 + 7x + 2$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: three brackets</p>
            <MathMd md={R`Expand $(x + 1)(x + 2)(x + 3)$.

Expand two brackets first: $(x + 1)(x + 2) = x^2 + 3x + 2$.
$$(x^2 + 3x + 2)(x + 3) = x^3 + 3x^2 + 3x^2 + 9x + 2x + 6$$
$$= x^3 + 6x^2 + 11x + 6$$`} />
          </div>
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Only multiplying the first term.** $3(x + 4)$ is $3x + 12$, not $3x + 4$.
- **Losing the sign.** In $5 - 2(x - 3)$, the $-2$ multiplies the $-3$ to give $+6$: $5 - 2x + 6 = 11 - 2x$.
- **Squaring each term.** $(x + 5)^2$ is not $x^2 + 25$. Write it as two brackets and you'll see the $10x$.
- **Forgetting to collect like terms** at the end.

To check an expansion, substitute a number. With $x = 2$: $(2 + 3)(2 + 5) = 35$ and $2^2 + 8 \times 2 + 15 = 35$. They match.`} />
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
          <h2 id="h-years" className="tb-h2 pg-h2">Expanding brackets by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-8-algebra", text: "The distributive law: expanding single brackets and collecting like terms." },
              { slug: "year-9-algebra", text: "Expanding binomial products like (x + 3)(x + 5)." },
              { slug: "year-10-quadratic-factorising", text: "Perfect squares and difference of squares, expanding and factorising quadratics." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

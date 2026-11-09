import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import FactoriseCalc from "@/components/maths/FactoriseCalc";

// Concept page with a calculator: factorising ("how to factorise",
// "factorising quadratics", "factorise calculator"). Every example and
// practice answer was checked in code by expanding it back (Nov 2026).

const PATH = "/maths/factorising";
const TITLE = "How to Factorise: Methods, Examples and Factorising Calculator (Years 8 to 10) | Tuterly";
const DESCRIPTION =
  "How to factorise: taking out the HCF, grouping, quadratics x² + bx + c and ax² + bx + c, difference of two squares and perfect squares, with worked examples, practice and a free calculator.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What does factorise mean?", a: "Writing an expression as a product: something multiplied by something. It's expanding in reverse. Expanding 3(x + 4) gives 3x + 12, so factorising 3x + 12 gives 3(x + 4)." },
  { q: "What should I always do first?", a: "Look for a common factor (the HCF) and take it out. Then count the terms: two terms might be a difference of two squares, three terms is usually a quadratic trinomial, and four terms usually means grouping in pairs." },
  { q: "How do I factorise x² + bx + c?", a: "Find two numbers that multiply to c and add to b. If they're p and q, the answer is (x + p)(x + q). For x² + 7x + 12, the numbers are 3 and 4, so it factorises to (x + 3)(x + 4)." },
  { q: "What if a quadratic won't factorise?", a: "Not every quadratic factorises using whole numbers. If b² − 4ac isn't a perfect square, it doesn't. To solve the equation anyway, use the quadratic formula or complete the square." },
  { q: "What year level learns factorising?", a: "In the Victorian Curriculum 2.0, taking out common factors starts in Year 8, factorising monic quadratics like x² + 5x + 6 is Year 9, and Year 10 adds more quadratic factorising. Non-monic quadratics like 2x² + 7x + 3 are usually Year 10A. Schools sequence topics differently, so check your course." },
];

const PRACTICE = [
  { q: R`Factorise $8x + 12$.`, a: R`The HCF is $4$: $4(2x + 3)$` },
  { q: R`Factorise $15a^2b + 10ab^2$.`, a: R`The HCF is $5ab$: $5ab(3a + 2b)$` },
  { q: R`Factorise $x^2 + 9x + 20$.`, a: R`$4 \times 5 = 20$ and $4 + 5 = 9$, so $(x + 4)(x + 5)$` },
  { q: R`Factorise $x^2 - x - 12$.`, a: R`$-4 \times 3 = -12$ and $-4 + 3 = -1$, so $(x - 4)(x + 3)$` },
  { q: R`Factorise $x^2 - 49$.`, a: R`Difference of two squares: $(x - 7)(x + 7)$` },
  { q: R`Factorise $2x^2 - 8x - 24$ fully.`, a: R`Take out $2$: $2(x^2 - 4x - 12)$. Then $-6 \times 2 = -12$ and $-6 + 2 = -4$, so $2(x - 6)(x + 2)$` },
  { q: R`Factorise $ab + 3a + 2b + 6$.`, a: R`Group in pairs: $a(b + 3) + 2(b + 3) = (b + 3)(a + 2)$` },
  { q: R`Factorise $3x^2 + 10x + 8$ (Year 10A).`, a: R`$ac = 24$. $6 \times 4 = 24$ and $6 + 4 = 10$. Split: $3x^2 + 6x + 4x + 8 = 3x(x + 2) + 4(x + 2) = (x + 2)(3x + 4)$` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Factorising", path: PATH }]}
      eyebrow="Maths explained · Years 8 to 10"
      h1="How to factorise"
      lead="Factorising means writing an expression as a product of factors, the reverse of expanding brackets. There are a handful of methods and the trick is knowing which one to use. Here’s each one with a worked example, a quadratic factorising calculator that shows the working, and practice questions with answers."
      quickAnswer="Always take out the highest common factor (HCF) first. Then count the terms. Two terms: look for a difference of two squares, a² − b² = (a − b)(a + b). Three terms (x² + bx + c): find two numbers that multiply to c and add to b. Four terms: group in pairs. Check your answer by expanding it."
      toc={[
        ["what", "What factorising means"],
        ["hcf", "Common factor (HCF)"],
        ["monic", "Quadratics x² + bx + c"],
        ["calculator", "Calculator"],
        ["dots", "Difference of two squares"],
        ["squares", "Perfect squares"],
        ["grouping", "Grouping in pairs"],
        ["nonmonic", "Non-monic quadratics"],
        ["which", "Which method?"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a factorising question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_factorising"
      faqs={FAQS}
      faqTitle="Factorising: common questions"
      links={[
        { href: "/maths/expanding-brackets", label: "How to expand brackets" },
        { href: "/worksheets/factorising", label: "Factorising worksheets with answers" },
        { href: "/calculators/quadratic-formula", label: "Quadratic formula calculator" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got a factorising question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="what" className="tb-section" aria-labelledby="h-what">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-what" className="tb-h2 pg-h2">What factorising means</h2>
          <MathMd md={R`Expanding turns a product into a sum. Factorising goes the other way.

$$3(x + 4) \;\xrightarrow{\text{expand}}\; 3x + 12$$
$$3x + 12 \;\xrightarrow{\text{factorise}}\; 3(x + 4)$$

That means you can **always check a factorising answer by expanding it**. If you get back to the question, it's right.`} />
        </div>
      </section>

      <section id="hcf" className="tb-section" aria-labelledby="h-hcf">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-hcf" className="tb-h2 pg-h2">Taking out a common factor (HCF)</h2>
          <MathMd md={R`Find the highest common factor of every term: the biggest number **and** the most of each letter that goes into all of them. Write it outside the bracket, and divide each term by it to get what goes inside.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked examples</p>
            <MathMd md={R`$6x + 9$: the HCF is $3$.
$$6x + 9 = 3(2x + 3)$$

$12x^2y - 8xy$: the HCF is $4xy$ (4 goes into 12 and 8, and both terms have an $x$ and a $y$).
$$12x^2y - 8xy = 4xy(3x - 2)$$

$-5x - 15$: when the first term is negative, take out a negative factor.
$$-5x - 15 = -5(x + 3)$$`} />
          </div>
          <MathMd md={R`If you take out a factor that isn't the highest, like $2(6x^2y - 4xy)$, the answer isn't fully factorised. Look inside the bracket again.`} />
        </div>
      </section>

      <section id="monic" className="tb-section" aria-labelledby="h-monic">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-monic" className="tb-h2 pg-h2">Factorising quadratics x² + bx + c</h2>
          <div className="mx-formula"><MathMd md={R`$$x^2 + bx + c = (x + p)(x + q) \quad \text{where } p \times q = c \text{ and } p + q = b$$`} /></div>
          <MathMd md={R`Find two numbers that **multiply to $c$** and **add to $b$**. List the factor pairs of $c$ and check which pair adds to $b$.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Factorise $x^2 + 7x + 12$.

Factor pairs of 12: $1 \times 12$, $2 \times 6$, $3 \times 4$. Only $3 + 4 = 7$.
$$x^2 + 7x + 12 = (x + 3)(x + 4)$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example with negatives</p>
            <MathMd md={R`Factorise $x^2 - 2x - 15$.

You need two numbers that multiply to $-15$ and add to $-2$: $-5$ and $3$.
$$x^2 - 2x - 15 = (x - 5)(x + 3)$$

Factorise $x^2 - 9x + 20$: $-4 \times -5 = 20$ and $-4 + (-5) = -9$.
$$x^2 - 9x + 20 = (x - 4)(x - 5)$$`} />
          </div>
          <MathMd md={R`**Sign shortcut:**

- $c$ positive, $b$ positive: both numbers are positive.
- $c$ positive, $b$ negative: both numbers are negative.
- $c$ negative: one is positive and one is negative. The bigger one (ignoring signs) has the same sign as $b$.`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Factorising calculator (with working)</h2>
          <p className="pg-intro">Enter a, b and c for any quadratic ax² + bx + c with whole-number coefficients. It takes out the common factor first and shows how to find the two numbers.</p>
          <FactoriseCalc placement="concept_factorising_calc" />
        </div>
      </section>

      <section id="dots" className="tb-section" aria-labelledby="h-dots">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-dots" className="tb-h2 pg-h2">Difference of two squares</h2>
          <div className="mx-formula"><MathMd md={R`$$a^2 - b^2 = (a - b)(a + b)$$`} /></div>
          <MathMd md={R`Look for **two terms**, both perfect squares, with a **minus** between them.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked examples</p>
            <MathMd md={R`$x^2 - 25 = x^2 - 5^2$
$$x^2 - 25 = (x - 5)(x + 5)$$

$4x^2 - 9 = (2x)^2 - 3^2$
$$4x^2 - 9 = (2x - 3)(2x + 3)$$

$2x^2 - 50$: take out the common factor first.
$$2x^2 - 50 = 2(x^2 - 25) = 2(x - 5)(x + 5)$$`} />
          </div>
          <MathMd md={R`A **sum** of two squares, like $x^2 + 25$, doesn't factorise this way.`} />
        </div>
      </section>

      <section id="squares" className="tb-section" aria-labelledby="h-squares">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-squares" className="tb-h2 pg-h2">Perfect squares</h2>
          <div className="mx-formula"><MathMd md={R`$$a^2 + 2ab + b^2 = (a + b)^2 \qquad a^2 - 2ab + b^2 = (a - b)^2$$`} /></div>
          <MathMd md={R`If the first and last terms are perfect squares and the middle term is twice their square roots multiplied, it's a perfect square.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked examples</p>
            <MathMd md={R`$x^2 + 6x + 9$: $x^2$ and $9 = 3^2$ are squares, and $2 \times x \times 3 = 6x$.
$$x^2 + 6x + 9 = (x + 3)^2$$

$9x^2 - 12x + 4$: $9x^2 = (3x)^2$, $4 = 2^2$, and $2 \times 3x \times 2 = 12x$.
$$9x^2 - 12x + 4 = (3x - 2)^2$$`} />
          </div>
        </div>
      </section>

      <section id="grouping" className="tb-section" aria-labelledby="h-grouping">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-grouping" className="tb-h2 pg-h2">Grouping in pairs (four terms)</h2>
          <MathMd md={R`With four terms, split them into two pairs, take a common factor out of each pair, then take out the bracket they share.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked examples</p>
            <MathMd md={R`$x^3 + 3x^2 + 2x + 6$
$$= x^2(x + 3) + 2(x + 3)$$
$$= (x + 3)(x^2 + 2)$$

$xy - 2y + 3x - 6$
$$= y(x - 2) + 3(x - 2)$$
$$= (x - 2)(y + 3)$$`} />
          </div>
          <MathMd md={R`If the two brackets don't match, try swapping the middle two terms and grouping again.`} />
        </div>
      </section>

      <section id="nonmonic" className="tb-section" aria-labelledby="h-nonmonic">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-nonmonic" className="tb-h2 pg-h2">Non-monic quadratics ax² + bx + c (Year 10A)</h2>
          <MathMd md={R`When the $x^2$ term has a number in front (and there's no common factor), **split the middle term**:

1. Multiply $a \times c$.
2. Find two numbers that multiply to $ac$ and add to $b$.
3. Use them to split $bx$ into two terms.
4. Factorise by grouping in pairs.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Factorise $2x^2 + 7x + 3$.

$ac = 2 \times 3 = 6$. Two numbers that multiply to 6 and add to 7: $6$ and $1$.
$$2x^2 + 6x + x + 3$$
$$= 2x(x + 3) + 1(x + 3)$$
$$= (x + 3)(2x + 1)$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example with negatives</p>
            <MathMd md={R`Factorise $6x^2 - x - 2$.

$ac = 6 \times (-2) = -12$. Two numbers that multiply to $-12$ and add to $-1$: $-4$ and $3$.
$$6x^2 - 4x + 3x - 2$$
$$= 2x(3x - 2) + 1(3x - 2)$$
$$= (3x - 2)(2x + 1)$$`} />
          </div>
        </div>
      </section>

      <section id="which" className="tb-section" aria-labelledby="h-which">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-which" className="tb-h2 pg-h2">Which method should I use?</h2>
          <MathMd md={R`1. **Common factor first, every time.** $3x^2 - 12x - 36 = 3(x^2 - 4x - 12)$.
2. **Count the terms** in what's left:
   - Two terms with a minus: difference of two squares.
   - Three terms: a quadratic trinomial. Check for a perfect square, then find the two numbers.
   - Four terms: grouping in pairs.
3. **Check each bracket** to see if it factorises again.
4. **Expand to check.**

So $3x^2 - 12x - 36 = 3(x^2 - 4x - 12) = 3(x - 6)(x + 2)$.`} />
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
          <h2 id="h-years" className="tb-h2 pg-h2">Factorising by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-8-algebra", text: "Factorising by taking out a numerical or algebraic common factor." },
              { slug: "year-9-algebra", text: "Factorising monic quadratics x² + bx + c." },
              { slug: "year-10-quadratic-factorising", text: "Quadratic factorising, including difference of two squares and perfect squares." },
              { slug: "year-10a-non-monic-quadratics", text: "Non-monic quadratics ax² + bx + c by splitting the middle term." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

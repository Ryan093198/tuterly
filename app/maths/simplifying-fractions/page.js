import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import FractionCalc from "@/components/maths/FractionCalc";

// Concept page with a calculator: simplifying fractions ("how to simplify
// fractions" ~1,900 searches a month in Australia). Every example and
// practice answer was checked (Nov 2026).

const PATH = "/maths/simplifying-fractions";
const TITLE = "How to Simplify Fractions: HCF Method, Examples and Fraction Simplifier (Years 7 to 10) | Tuterly";
const DESCRIPTION =
  "How to simplify fractions using the HCF or step-by-step dividing, plus improper fractions, mixed numbers, ratios and algebraic fractions. Worked examples, practice questions and a free simplifier that shows the working.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "How do you simplify a fraction?", a: "Divide the numerator and denominator by their highest common factor (HCF). For 18/24 the HCF is 6, so 18/24 = 3/4." },
  { q: "How do I know when a fraction is fully simplified?", a: "When the only number that divides into both the top and the bottom is 1. 3/4 is fully simplified; 6/8 isn't, because 2 divides into both." },
  { q: "How do I simplify an improper fraction?", a: "Simplify it the same way, then change it to a mixed number if the question asks. 45/12 simplifies to 15/4, which is 3¾ as a mixed number." },
  { q: "Can I simplify by dividing by a smaller number first?", a: "Yes. Dividing by any common factor works, as long as you keep going until nothing else divides into both. Using the HCF just gets there in one step." },
  { q: "What year level learns simplifying fractions?", a: "Equivalent fractions start in primary school. In the Victorian Curriculum 2.0, Year 7 uses simplifying in fraction operations and ratios, and finds HCFs using prime factors. Simplifying algebraic expressions builds through Years 8 and 9 with factorising, and algebraic fractions are a Year 10 topic." },
];

const PRACTICE = [
  { q: R`Simplify $\dfrac{15}{25}$.`, a: R`The HCF is $5$: $\dfrac{15 \div 5}{25 \div 5} = \dfrac{3}{5}$` },
  { q: R`Simplify $\dfrac{36}{48}$.`, a: R`The HCF is $12$: $\dfrac{36 \div 12}{48 \div 12} = \dfrac{3}{4}$` },
  { q: R`Simplify $\dfrac{56}{84}$.`, a: R`The HCF is $28$: $\dfrac{56 \div 28}{84 \div 28} = \dfrac{2}{3}$` },
  { q: R`Simplify $\dfrac{42}{12}$ and write it as a mixed number.`, a: R`The HCF is $6$: $\dfrac{42}{12} = \dfrac{7}{2} = 3\dfrac{1}{2}$` },
  { q: R`Simplify the ratio $24 : 40$.`, a: R`The HCF is $8$: $24 : 40 = 3 : 5$` },
  { q: R`Simplify the ratio $0.6 : 1.5$.`, a: R`Multiply both by $10$: $6 : 15$. The HCF is $3$: $2 : 5$` },
  { q: R`Simplify $\dfrac{12xy}{18x}$.`, a: R`The HCF of $12$ and $18$ is $6$, and $x$ cancels: $\dfrac{12xy}{18x} = \dfrac{2y}{3}$` },
  { q: R`Simplify $\dfrac{5x - 10}{x - 2}$.`, a: R`Factorise the top: $\dfrac{5(x - 2)}{x - 2} = 5$ (for $x \neq 2$)` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Simplifying fractions", path: PATH }]}
      eyebrow="Maths explained · Years 7 to 10"
      h1="How to simplify fractions"
      lead="Simplifying a fraction means writing it with the smallest possible numbers without changing its value. You can do it in one step with the highest common factor, or a few smaller steps. Here’s each method with a worked example, then mixed numbers, ratios and algebraic fractions, a simplifier that shows the working, and practice questions with answers."
      quickAnswer="To simplify a fraction, find the highest common factor (HCF) of the numerator and denominator, then divide both by it. For 18/24 the HCF is 6, so 18/24 = 3/4. A fraction is fully simplified when the only common factor of the top and bottom is 1."
      toc={[
        ["meaning", "What simplest form means"],
        ["hcf", "The HCF method"],
        ["steps", "Dividing step by step"],
        ["calculator", "Calculator"],
        ["mixed", "Improper fractions and mixed numbers"],
        ["ratios", "Simplifying ratios"],
        ["algebra", "Algebraic fractions"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a fractions question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_simplifying_fractions"
      faqs={FAQS}
      faqTitle="Simplifying fractions: common questions"
      links={[
        { href: "/maths/percentages", label: "How to calculate a percentage" },
        { href: "/maths/index-laws", label: "Index laws explained" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got a fractions question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="meaning" className="tb-section" aria-labelledby="h-meaning">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-meaning" className="tb-h2 pg-h2">What simplest form means</h2>
          <MathMd md={R`$\dfrac{6}{8}$ and $\dfrac{3}{4}$ are **equivalent fractions**: they're the same amount. $\dfrac{3}{4}$ is in **simplest form** (lowest terms) because no number except 1 divides into both 3 and 4.

Dividing the top and bottom by the same number never changes a fraction's value. It just writes it with smaller numbers.`} />
        </div>
      </section>

      <section id="hcf" className="tb-section" aria-labelledby="h-hcf">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-hcf" className="tb-h2 pg-h2">The HCF method (one step)</h2>
          <MathMd md={R`1. Find the **highest common factor** (HCF) of the numerator and the denominator.
2. Divide both by it.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Simplify $\dfrac{18}{24}$.

Factors of 18: 1, 2, 3, **6**, 9, 18. Factors of 24: 1, 2, 3, 4, **6**, 8, 12, 24. The HCF is 6.

$$\frac{18}{24} = \frac{18 \div 6}{24 \div 6} = \frac{3}{4}$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: bigger numbers</p>
            <MathMd md={R`Simplify $\dfrac{84}{126}$.

Use prime factors: $84 = 2^2 \times 3 \times 7$ and $126 = 2 \times 3^2 \times 7$. The HCF is the product of the primes they share: $2 \times 3 \times 7 = 42$.

$$\frac{84}{126} = \frac{84 \div 42}{126 \div 42} = \frac{2}{3}$$`} />
          </div>
        </div>
      </section>

      <section id="steps" className="tb-section" aria-labelledby="h-steps">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-steps" className="tb-h2 pg-h2">Dividing step by step</h2>
          <MathMd md={R`If you can't spot the HCF, divide by any number that goes into both, and repeat until you can't go any further.

Quick checks: both even, divide by 2. Digits of both add to a multiple of 3, divide by 3. Both end in 0 or 5, divide by 5.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Simplify $\dfrac{48}{72}$.

$$\frac{48}{72} = \frac{24}{36} \quad (\div 2)$$
$$\frac{24}{36} = \frac{12}{18} \quad (\div 2)$$
$$\frac{12}{18} = \frac{2}{3} \quad (\div 6)$$

You get the same answer as dividing by the HCF, 24, in one go.`} />
          </div>
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Fraction simplifier (with working)</h2>
          <p className="pg-intro">Enter the numerator and denominator. You’ll get the HCF, the simplified fraction, and the mixed number if it’s improper, with every step.</p>
          <FractionCalc placement="concept_simplifying_fractions_calc" />
        </div>
      </section>

      <section id="mixed" className="tb-section" aria-labelledby="h-mixed">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mixed" className="tb-h2 pg-h2">Improper fractions and mixed numbers</h2>
          <MathMd md={R`An **improper fraction** has a numerator bigger than its denominator. Simplify it first, then divide to turn it into a mixed number: the whole number is how many times the bottom goes in, and the remainder goes over the bottom.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Simplify $\dfrac{45}{12}$ and write it as a mixed number.

$$\frac{45}{12} = \frac{45 \div 3}{12 \div 3} = \frac{15}{4}$$

$15 \div 4 = 3$ remainder $3$, so $\dfrac{15}{4} = 3\dfrac{3}{4}$.`} />
          </div>
          <MathMd md={R`To simplify a **mixed number**, leave the whole number alone and simplify the fraction part: $2\dfrac{6}{8} = 2\dfrac{3}{4}$.`} />
        </div>
      </section>

      <section id="ratios" className="tb-section" aria-labelledby="h-ratios">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-ratios" className="tb-h2 pg-h2">Simplifying ratios</h2>
          <MathMd md={R`Ratios simplify exactly like fractions: divide every part by the HCF.

- $12 : 18$. The HCF is 6, so $12 : 18 = 2 : 3$.
- $1.5 : 2.5$. Multiply by 10 to clear the decimals: $15 : 25$, then divide by 5: $3 : 5$.
- $50$ cm $: 2$ m. Make the units the same first: $50 : 200$, then divide by 50: $1 : 4$.
- $8 : 12 : 20$. The HCF of all three is 4: $2 : 3 : 5$.`} />
        </div>
      </section>

      <section id="algebra" className="tb-section" aria-labelledby="h-algebra">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-algebra" className="tb-h2 pg-h2">Simplifying algebraic fractions (Years 8 to 10)</h2>
          <MathMd md={R`The rule is the same: cancel **factors** that appear in both the top and the bottom. Numbers cancel by their HCF, and letters cancel using the index laws ($\dfrac{a^2}{a} = a$).`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked examples</p>
            <MathMd md={R`$$\frac{6x}{9} = \frac{2x}{3}$$
$$\frac{4a^2b}{10ab} = \frac{2a}{5}$$

When there's a bracket or a sum, **factorise first**, then cancel the common factor:

$$\frac{3x + 6}{x + 2} = \frac{3(x + 2)}{x + 2} = 3$$
$$\frac{x^2 - 9}{x + 3} = \frac{(x + 3)(x - 3)}{x + 3} = x - 3$$`} />
          </div>
          <MathMd md={R`You can only cancel something that **multiplies** the whole top and the whole bottom. $\dfrac{x + 3}{3}$ does **not** simplify to $x$, because the 3 on top is added, not multiplied. (These cancellations also assume the bottom isn't zero.)`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Stopping too early.** $\dfrac{12}{18} = \dfrac{6}{9}$ is right, but not finished: it simplifies again to $\dfrac{2}{3}$.
- **Dividing only the top or only the bottom.** Whatever you do to one, do to the other.
- **Subtracting instead of dividing.** Taking 2 off the top and bottom of $\dfrac{5}{7}$ gives $\dfrac{3}{5}$, which is a different amount. Only multiplying or dividing keeps a fraction equivalent.
- **Cancelling terms instead of factors** in algebra, like turning $\dfrac{x + 3}{3}$ into $x$.`} />
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
          <h2 id="h-years" className="tb-h2 pg-h2">Simplifying fractions by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-7-prime-factors", text: "Prime factors and factor trees, which make finding the HCF quick." },
              { slug: "year-7-fraction-operations", text: "Simplifying answers when adding, subtracting, multiplying and dividing fractions, and mixed numbers." },
              { slug: "year-7-ratios", text: "Writing and simplifying ratios, and equivalent ratios." },
              { slug: "year-8-algebra", text: "Factorising by taking out a common factor, the first step in simplifying algebraic fractions." },
              { slug: "year-10-algebraic-fractions", text: "Simplifying and using the 4 operations with algebraic fractions." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import OrderOpsCalc from "@/components/maths/OrderOpsCalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a step-by-step checker: order of operations (BODMAS).
// Built by the daily page task (Nov 2026); not yet read by Ryan, so it's in
// UNREVIEWED_PATHS (lib/reviewed.js). Every example, practice answer and
// checker case was recomputed by script before publishing.

const PATH = "/maths/order-of-operations";
const TITLE = "Order of Operations (BODMAS): Rules, Examples and Step-by-Step Checker | Tuterly";
const DESCRIPTION =
  "What BODMAS means and how to use the order of operations with brackets, powers, negative numbers and fraction bars. Worked examples, practice questions and a checker that shows every step.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What does BODMAS stand for?", a: "Brackets, Orders (powers and square roots), Division and Multiplication, Addition and Subtraction. BIDMAS (I for indices) and PEMDAS (used in the USA) are the same rules with different names." },
  { q: "Do you always divide before you multiply?", a: "No. Division and multiplication have the same priority, so you do whichever comes first reading from left to right. 36 ÷ 4 × 3 is 9 × 3 = 27. Addition and subtraction work the same way: 18 − 6 + 2 is 12 + 2 = 14." },
  { q: "What is the answer to 6 ÷ 2(1 + 2)?", a: "Using the order of operations as taught in Australian schools, it is 9: the bracket gives 3, then 6 ÷ 2 × 3 is worked from left to right, so 3 × 3 = 9. Some people and some calculators treat 2(1 + 2) as one block and get 1, which is why the question is badly written. In your own work, use extra brackets or a fraction so there is only one way to read it." },
  { q: "Is −3² equal to 9 or −9?", a: "−9. The power applies only to the 3, and the minus sign is applied after it: −3² = −(3 × 3) = −9. To square negative 3, write (−3)², which is 9." },
  { q: "Does my calculator follow the order of operations?", a: "A scientific calculator does: typing 3 + 4 × 2 gives 11. Many basic calculators work out each operation as you press it, so they give 14. When you use a basic calculator, work out the multiplication first yourself." },
  { q: "What year level learns the order of operations?", a: "In the Victorian Curriculum 2.0, Year 6 works with brackets and combinations of operations. Year 7 uses all four operations with fractions and decimals, and Year 8 adds negative numbers. From then on it sits underneath every algebra topic, such as substitution and solving equations." },
];

const PRACTICE = [
  { q: R`$12 + 6 \div 3$`, a: R`Divide first: $6 \div 3 = 2$, then $12 + 2 = 14$.` },
  { q: R`$9 - 4 + 2$`, a: R`Left to right: $9 - 4 = 5$, then $5 + 2 = 7$.` },
  { q: R`$48 \div 6 \times 2$`, a: R`Left to right: $48 \div 6 = 8$, then $8 \times 2 = 16$.` },
  { q: R`$(7 - 2) \times 4 + 1$`, a: R`Brackets: $5$. Then $5 \times 4 = 20$, then $20 + 1 = 21$.` },
  { q: R`$3 \times 2^3 - 5$`, a: R`Power: $2^3 = 8$. Then $3 \times 8 = 24$, then $24 - 5 = 19$.` },
  { q: R`$60 \div (4 + 2 \times 3)$`, a: R`Inside the brackets, multiply first: $2 \times 3 = 6$, so the bracket is $4 + 6 = 10$. Then $60 \div 10 = 6$.` },
  { q: R`$-5^2 + 3 \times (-2)$`, a: R`Power first: $-5^2 = -25$. Then $3 \times (-2) = -6$. So $-25 + (-6) = -31$.` },
  { q: R`$[4 + 2 \times (7 - 3)]^2 \div 8$`, a: R`Inner brackets: $7 - 3 = 4$. Square brackets: $4 + 2 \times 4 = 4 + 8 = 12$. Power: $12^2 = 144$. Then $144 \div 8 = 18$.` },
  { q: R`$\dfrac{15 - 3}{2 \times 3}$`, a: R`Work out the top and bottom separately: $\dfrac{12}{6} = 2$.` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Order of operations", path: PATH }]}
      eyebrow="Maths explained · Years 7 to 10"
      h1="Order of operations (BODMAS)"
      lead="When a calculation has more than one operation, the order you do them in changes the answer. Here are the rules everyone agrees on, what BODMAS stands for, the two places students lose marks (left to right, and negative numbers with powers), and a checker that works through any calculation one step at a time."
      quickAnswer="Work out brackets first, then powers (indices), then multiplication and division from left to right, then addition and subtraction from left to right. This is BODMAS. Multiplication does not come before division, and addition does not come before subtraction: each pair has equal priority, so go left to right. For example, 7 + 3 × 5 = 7 + 15 = 22."
      toc={[
        ["rules", "The rules"],
        ["basic", "Multiplication before addition"],
        ["left-to-right", "Left to right"],
        ["brackets-powers", "Brackets and powers"],
        ["checker", "Step-by-step checker"],
        ["negatives", "Negative numbers and powers"],
        ["fraction-bar", "Fraction bars"],
        ["viral", "The viral puzzles"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Got a calculation wrong and can’t see why?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_order_of_operations"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="Order of operations: common questions"
      links={[
        { href: "/maths/index-laws", label: "Index laws" },
        { href: "/maths/expanding-brackets", label: "Expanding brackets" },
        { href: "/worksheets/year-8-integer-operations", label: "Year 8 integer operations worksheets" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Still losing marks on calculations?"
      finalText="Snap the question with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it sticks. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="rules" className="tb-section" aria-labelledby="h-rules">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-rules" className="tb-h2 pg-h2">The order of operations rules</h2>
          <MathMd md={R`Work through a calculation in this order:

| Step | What to do |
|---|---|
| 1 | **B**rackets, innermost first |
| 2 | **O**rders: powers and roots |
| 3 | **D**ivision and **M**ultiplication, left to right |
| 4 | **A**ddition and **S**ubtraction, left to right |

The letters D and M sit together because they have equal priority. So do A and S. That's the part most people forget: BODMAS does **not** mean division always comes before multiplication, or addition before subtraction.

You might also see **BIDMAS** (I for indices) or **PEMDAS** (parentheses, exponents). They're the same rules.`} />
        </div>
      </section>

      <section id="basic" className="tb-section" aria-labelledby="h-basic">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-basic" className="tb-h2 pg-h2">Multiplication before addition</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Work out $7 + 3 \times 5$.

Multiplication comes before addition, even though the $+$ is written first.

$$7 + 3 \times 5$$
$$= 7 + 15$$
$$= 22$$`} />
          </div>
          <MathMd md={R`Going straight across gives $10 \times 5 = 50$, which is wrong. A useful way to see it: $3 \times 5$ means "three fives", and you're adding $7$ to three fives.`} />
        </div>
      </section>

      <section id="left-to-right" className="tb-section" aria-labelledby="h-ltr">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-ltr" className="tb-h2 pg-h2">Equal priority: work left to right</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: division and multiplication</p>
            <MathMd md={R`Work out $36 \div 4 \times 3$.

Division and multiplication have equal priority, so go left to right. The division comes first.

$$36 \div 4 \times 3$$
$$= 9 \times 3$$
$$= 27$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: subtraction and addition</p>
            <MathMd md={R`Work out $18 - 6 + 2$.

$$18 - 6 + 2$$
$$= 12 + 2$$
$$= 14$$`} />
          </div>
          <MathMd md={R`Doing the multiplication first would give $36 \div 12 = 3$, and doing the addition first would give $18 - 8 = 10$. Both are wrong. If it helps, think of subtracting $6$ as adding $-6$: $18 + (-6) + 2 = 14$, and now the order doesn't matter.`} />
        </div>
      </section>

      <section id="brackets-powers" className="tb-section" aria-labelledby="h-bp">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-bp" className="tb-h2 pg-h2">Brackets and powers</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Work out $5 \times (8 - 2)^2 \div 10$.

$$5 \times (8 - 2)^2 \div 10$$
$$= 5 \times 6^2 \div 10 \qquad \text{(brackets)}$$
$$= 5 \times 36 \div 10 \qquad \text{(power)}$$
$$= 180 \div 10 \qquad \text{(left to right)}$$
$$= 18$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: brackets inside brackets</p>
            <MathMd md={R`Work out $50 - [3 \times (9 - 4) + 7]$.

Start with the innermost brackets, then work outwards. Inside each bracket, the usual rules still apply.

$$50 - [3 \times (9 - 4) + 7]$$
$$= 50 - [3 \times 5 + 7]$$
$$= 50 - [15 + 7]$$
$$= 50 - 22$$
$$= 28$$`} />
          </div>
          <MathMd md={R`Square brackets $[\;]$ work exactly like round ones. They just make it easier to see which bracket closes where.`} />
        </div>
      </section>

      <section id="checker" className="tb-section" aria-labelledby="h-checker">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-checker" className="tb-h2 pg-h2">Order of operations checker (shows every step)</h2>
          <p className="pg-intro">Type a calculation and it’s worked out one operation at a time, with the rule used at each step. Add your own answer to check it. Try one of the examples, or copy a question from your homework.</p>
          <OrderOpsCalc placement="concept_order_of_operations_calc" />
        </div>
      </section>

      <section id="negatives" className="tb-section" aria-labelledby="h-neg">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-neg" className="tb-h2 pg-h2">Negative numbers and powers</h2>
          <MathMd md={R`A power only applies to what's directly underneath it. In $-4^2$ the power belongs to the $4$, and the minus sign is applied after:

$$-4^2 = -(4 \times 4) = -16$$
$$(-4)^2 = (-4) \times (-4) = 16$$`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Work out $10 - 2 \times (-3)^2$.

$$10 - 2 \times (-3)^2$$
$$= 10 - 2 \times 9 \qquad \text{(power: } (-3)^2 = 9\text{)}$$
$$= 10 - 18$$
$$= -8$$`} />
          </div>
          <MathMd md={R`On a scientific calculator, type the brackets: $(-3)^2$. Typing $-3$ then the $x^2$ key can give $-9$ on some calculators.`} />
        </div>
      </section>

      <section id="fraction-bar" className="tb-section" aria-labelledby="h-frac">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-frac" className="tb-h2 pg-h2">Fraction bars act like brackets</h2>
          <MathMd md={R`A fraction bar groups everything above it and everything below it. Work out the top and the bottom first, then divide.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Work out $\dfrac{12 + 8}{9 - 4}$.

$$\frac{12 + 8}{9 - 4} = \frac{20}{5} = 4$$

To type it into a calculator in one line, you need brackets: $(12 + 8) \div (9 - 4)$. Typing $12 + 8 \div 9 - 4$ gives about $8.89$, a different calculation.`} />
          </div>
        </div>
      </section>

      <section id="viral" className="tb-section" aria-labelledby="h-viral">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-viral" className="tb-h2 pg-h2">The viral puzzles: 8 ÷ 2(2 + 2)</h2>
          <MathMd md={R`Puzzles like $8 \div 2(2 + 2)$ go round social media because people get two different answers. A number written next to a bracket means multiply, so this is $8 \div 2 \times (2 + 2)$.

$$8 \div 2 \times (2 + 2)$$
$$= 8 \div 2 \times 4 \qquad \text{(brackets)}$$
$$= 4 \times 4 \qquad \text{(left to right)}$$
$$= 16$$

The other answer, $1$, comes from treating $2(2 + 2)$ as a single block and doing it first. Using the rules taught in Australian schools, the answer is $16$. But the real lesson is that the question is written badly. In your own working, write $\dfrac{8}{2} \times (2 + 2)$ or $\dfrac{8}{2(2 + 2)}$, so only one answer is possible.`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Working straight across.** $7 + 3 \times 5$ is not $50$. Find the multiplication and division first: $7 + 15 = 22$.
- **Multiplying before dividing every time.** $36 \div 4 \times 3$ is not $3$. Equal-priority operations go left to right, so it's $27$.
- **Adding before subtracting every time.** $18 - 6 + 2$ is not $10$. Left to right gives $14$.
- **Squaring the minus sign.** $-4^2 = -16$. Only $(-4)^2$ is $16$.
- **Forgetting the brackets when typing a fraction.** $\dfrac{12 + 8}{9 - 4}$ must be typed as $(12 + 8) \div (9 - 4)$.
- **Rushing several steps at once.** Write a new line after each operation. It's slower for one question and much faster than finding an error later.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Work each one out without a calculator, then open the answer. If you get one wrong, put it into the checker above to see where your working went a different way.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Lost marks on a calculation? Snap it, find the step that went wrong, and fix it." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Order of operations by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-7-fraction-operations", text: "All four operations with fractions and decimals, in the right order, with and without a calculator." },
              { slug: "year-7-expressions", text: "Writing and evaluating expressions, where the order of operations decides what 2 + 3n means." },
              { slug: "year-8-integer-operations", text: "The order of operations with negative numbers, including powers of negatives." },
              { slug: "year-7-integers", text: "Adding and subtracting negative numbers, the base skill for every calculation with signs." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

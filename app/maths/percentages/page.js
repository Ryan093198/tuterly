import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import PercentCalc from "@/components/maths/PercentCalc";

// Concept page with a calculator: percentages ("how to calculate
// percentage" and its variants, ~8,100 searches a month in Australia).
// Every example and practice answer was checked (Nov 2026).

const PATH = "/maths/percentages";
const TITLE = "How to Calculate a Percentage: Formulas, Examples and Percentage Calculator (Years 7 to 10) | Tuterly";
const DESCRIPTION =
  "How to calculate a percentage of a number, one number as a percentage of another, percentage increase, decrease and change, and discounts, with worked examples, practice questions and a free calculator that shows the working.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "How do I calculate a percentage of a number?", a: "Divide the percentage by 100, then multiply by the number. 15% of 80 is 0.15 × 80 = 12." },
  { q: "How do I work out one number as a percentage of another?", a: "Divide the part by the whole, then multiply by 100. 18 out of 24 is 18 ÷ 24 × 100 = 75%." },
  { q: "How do I calculate percentage increase or decrease?", a: "Find the change (new minus original), divide by the original value, then multiply by 100. From 40 to 50 is a change of 10, and 10 ÷ 40 × 100 = 25%, so it's a 25% increase." },
  { q: "How do I work out a percentage without a calculator?", a: "Find 10% by dividing by 10, then build up from it. For 35% of 240: 10% is 24, so 30% is 72, 5% is 12, and 35% is 72 + 12 = 84." },
  { q: "What year level learns percentages?", a: "In the Victorian Curriculum 2.0, Year 7 covers percentages of quantities and one quantity as a percentage of another. Year 8 adds percentage increase and decrease, percentage error, and profit and loss. Percentages then carry into simple interest in Year 9 and compound interest in Year 10." },
];

const PRACTICE = [
  { q: R`Find $20\%$ of $65$.`, a: R`$0.2 \times 65 = 13$ (or: $10\%$ is $6.5$, so $20\%$ is $13$)` },
  { q: R`Find $12\%$ of $250$.`, a: R`$0.12 \times 250 = 30$` },
  { q: R`A student scores 27 out of 45 on a test. What percentage is that?`, a: R`$\dfrac{27}{45} \times 100 = 0.6 \times 100 = 60\%$` },
  { q: R`Increase $80$ by $15\%$.`, a: R`$15\%$ of $80$ is $12$, so $80 + 12 = 92$. Or: $80 \times 1.15 = 92$.` },
  { q: R`A jacket costs \$120 and is $35\%$ off. What is the sale price?`, a: R`$120 \times 0.65 = 78$, so the sale price is \$78 (a saving of \$42).` },
  { q: R`The price of a ticket rises from \$50 to \$62. What is the percentage increase?`, a: R`Change $= 62 - 50 = 12$. $\dfrac{12}{50} \times 100 = 24\%$ increase.` },
  { q: R`A town's population falls from 2,400 to 2,040. What is the percentage decrease?`, a: R`Change $= 2040 - 2400 = -360$. $\dfrac{-360}{2400} \times 100 = -15\%$, so a $15\%$ decrease.` },
  { q: R`After a $25\%$ increase, a price is \$150. What was the original price?`, a: R`The new price is $125\%$ of the original, so $150 \div 1.25 = 120$. The original price was \$120.` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Percentages", path: PATH }]}
      eyebrow="Maths explained · Years 7 to 10"
      h1="How to calculate a percentage"
      lead="Most percentage questions are one of four types: a percentage of a number, one number as a percentage of another, a percentage increase or decrease, or a percentage change. Here’s the formula for each with a worked example, a calculator that shows the working, and practice questions with answers."
      quickAnswer="Percent means out of 100. To find X% of Y, work out X ÷ 100 × Y. To write X as a percentage of Y, work out X ÷ Y × 100. For percentage change, divide the change by the original value and multiply by 100. To increase by X%, multiply by (1 + X ÷ 100); to decrease, multiply by (1 − X ÷ 100)."
      toc={[
        ["meaning", "What a percentage is"],
        ["of", "Percentage of a number"],
        ["as", "As a percentage of another"],
        ["calculator", "Calculator"],
        ["increase", "Increase, decrease and discounts"],
        ["change", "Percentage change"],
        ["reverse", "Finding the original amount"],
        ["mental", "Without a calculator"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a percentages question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_percentages"
      faqs={FAQS}
      faqTitle="Percentages: common questions"
      links={[
        { href: "/maths/simplifying-fractions", label: "How to simplify fractions" },
        { href: "/maths/area-of-a-circle", label: "Area of a circle" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got a percentages question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="meaning" className="tb-section" aria-labelledby="h-meaning">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-meaning" className="tb-h2 pg-h2">What a percentage is</h2>
          <MathMd md={R`Per cent means "out of 100". So $35\%$ means $\dfrac{35}{100}$, which is $0.35$ as a decimal.

| Percentage | Fraction | Decimal |
|---|---|---|
| $50\%$ | $\frac{1}{2}$ | $0.5$ |
| $25\%$ | $\frac{1}{4}$ | $0.25$ |
| $10\%$ | $\frac{1}{10}$ | $0.1$ |
| $75\%$ | $\frac{3}{4}$ | $0.75$ |
| $5\%$ | $\frac{1}{20}$ | $0.05$ |

To change a percentage to a decimal, divide by 100 (move the decimal point two places left). To change a decimal to a percentage, multiply by 100.`} />
        </div>
      </section>

      <section id="of" className="tb-section" aria-labelledby="h-of">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-of" className="tb-h2 pg-h2">How to find a percentage of a number</h2>
          <div className="mx-formula"><MathMd md={R`$$X\% \text{ of } Y = \frac{X}{100} \times Y$$`} /></div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find $15\%$ of $80$.

$$15\% = \frac{15}{100} = 0.15$$
$$0.15 \times 80 = 12$$`} />
          </div>
          <MathMd md={R`In maths, "of" means multiply. On a calculator you can type $15 \div 100 \times 80$, or $0.15 \times 80$.`} />
        </div>
      </section>

      <section id="as" className="tb-section" aria-labelledby="h-as">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-as" className="tb-h2 pg-h2">How to write one number as a percentage of another</h2>
          <div className="mx-formula"><MathMd md={R`$$\text{percentage} = \frac{\text{part}}{\text{whole}} \times 100$$`} /></div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`You got 42 out of 60 on a test. What percentage is that?

$$\frac{42}{60} \times 100 = 0.7 \times 100 = 70\%$$`} />
          </div>
          <MathMd md={R`Make sure both amounts are in the same units first. To write 30 cents as a percentage of \$2, use 30 cents out of 200 cents: $\dfrac{30}{200} \times 100 = 15\%$.`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Percentage calculator (with working)</h2>
          <p className="pg-intro">Pick the type of question, enter the two numbers, and you’ll get the answer with every step. Answers that don’t come out exactly are rounded to 2 decimal places.</p>
          <PercentCalc placement="concept_percentages_calc" />
        </div>
      </section>

      <section id="increase" className="tb-section" aria-labelledby="h-increase">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-increase" className="tb-h2 pg-h2">Percentage increase, decrease and discounts</h2>
          <MathMd md={R`There are two ways. Either find the percentage and add it on (or take it off), or multiply by a **multiplier** in one step.

- Increase by $X\%$: multiply by $1 + \dfrac{X}{100}$. Increasing by $25\%$ means multiplying by $1.25$.
- Decrease by $X\%$: multiply by $1 - \dfrac{X}{100}$. Taking $30\%$ off means multiplying by $0.7$.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: increase</p>
            <MathMd md={R`Increase $120$ by $25\%$.

$$25\% \text{ of } 120 = 0.25 \times 120 = 30$$
$$120 + 30 = 150$$

Or in one step: $120 \times 1.25 = 150$.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: discount</p>
            <MathMd md={R`Shoes cost \$85 and are $30\%$ off. What is the sale price?

$$30\% \text{ of } 85 = 0.3 \times 85 = 25.5$$
$$85 - 25.5 = 59.5$$

The sale price is \$59.50, a saving of \$25.50. In one step: $85 \times 0.7 = 59.5$.`} />
          </div>
        </div>
      </section>

      <section id="change" className="tb-section" aria-labelledby="h-change">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-change" className="tb-h2 pg-h2">Percentage change (increase or decrease from one value to another)</h2>
          <div className="mx-formula"><MathMd md={R`$$\text{percentage change} = \frac{\text{new} - \text{original}}{\text{original}} \times 100$$`} /></div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A price goes from \$40 to \$50. What is the percentage increase?

$$\text{change} = 50 - 40 = 10$$
$$\frac{10}{40} \times 100 = 25\%$$

It's a $25\%$ increase.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A car's value drops from \$80,000 to \$68,000. What is the percentage decrease?

$$\text{change} = 68\,000 - 80\,000 = -12\,000$$
$$\frac{-12\,000}{80\,000} \times 100 = -15\%$$

The negative sign tells you it's a decrease: a $15\%$ decrease.`} />
          </div>
          <MathMd md={R`**Percentage difference.** In most school questions, "percentage difference" means the same thing as percentage change: compare to the original value. In science, it sometimes means the difference divided by the average of the two values. Check which one your question wants.

**Percentage error** (Year 8) works the same way: $\dfrac{\text{measured} - \text{actual}}{\text{actual}} \times 100$, usually written without the sign.`} />
        </div>
      </section>

      <section id="reverse" className="tb-section" aria-labelledby="h-reverse">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-reverse" className="tb-h2 pg-h2">Finding the original amount (reverse percentages)</h2>
          <MathMd md={R`If you know the amount **after** a percentage change, divide by the multiplier to undo it. Don't take the percentage of the new amount.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`After a $20\%$ discount, a game costs \$64. What was the original price?

The sale price is $80\%$ of the original, so the multiplier is $0.8$.

$$64 \div 0.8 = 80$$

The original price was \$80. Check: $20\%$ of \$80 is \$16, and $80 - 16 = 64$.`} />
          </div>
          <MathMd md={R`**GST.** In Australia GST is $10\%$, so a price including GST is $110\%$ of the price without it. To take the GST out, divide by $1.1$: \$110 including GST is \$100 before GST, and the GST is \$10 (which is the total divided by 11).`} />
        </div>
      </section>

      <section id="mental" className="tb-section" aria-labelledby="h-mental">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mental" className="tb-h2 pg-h2">How to work out percentages without a calculator</h2>
          <MathMd md={R`Start from easy percentages and build the one you need.

- $50\%$: halve it.
- $25\%$: halve it, then halve again.
- $10\%$: divide by 10.
- $5\%$: half of $10\%$.
- $1\%$: divide by 100.

**Example:** $35\%$ of $240$. $10\%$ is $24$, so $30\%$ is $72$. $5\%$ is $12$. So $35\%$ is $72 + 12 = 84$.

**The swap trick:** $X\%$ of $Y$ is the same as $Y\%$ of $X$. So $8\%$ of $25$ is $25\%$ of $8$, which is $2$.`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Dividing by the new value** in percentage change. Always divide by the original (starting) value.
- **Undoing a percentage by reversing it.** Going up $10\%$ then down $10\%$ doesn't get you back: $100 \to 110 \to 99$. To undo a change, divide by the multiplier.
- **Forgetting to add or subtract.** $25\%$ of $120$ is $30$, but "increase $120$ by $25\%$" is $150$.
- **Mixing units.** Convert to the same units before writing one amount as a percentage of another.`} />
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
          <h2 id="h-years" className="tb-h2 pg-h2">Percentages by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-7-percentages", text: "Percentages of quantities, one quantity as a percentage of another, and converting between fractions, decimals and percentages." },
              { slug: "year-8-percentages", text: "Percentage increase and decrease, percentage error, and finding the original amount." },
              { slug: "year-8-profit-and-loss", text: "Profit, loss, mark-ups and discounts as percentages in money problems." },
              { slug: "year-9-simple-interest", text: "Simple interest, where interest is a percentage of the principal each year." },
              { slug: "year-10-compound-interest", text: "Compound interest, using repeated percentage increases." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import SimpleInterestCalc from "@/components/maths/SimpleInterestCalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a calculator: simple interest. Built by the daily page
// task (Nov 2026); not yet read by Ryan, so it's in UNREVIEWED_PATHS
// (lib/reviewed.js). Every example, practice answer and calculator test case
// was recomputed by script before publishing.

const PATH = "/maths/simple-interest";
const TITLE = "How to Calculate Simple Interest: I = Prt, Examples and Calculator (Year 9) | Tuterly";
const DESCRIPTION =
  "How to calculate simple interest with I = Prt, time in months, finding the rate, time or principal, and loan repayments, with a calculator that shows the working.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is the formula for simple interest?", a: "I = Prt. I is the interest, P is the principal (the amount invested or borrowed), r is the interest rate per year as a decimal, and t is the time in years. For $4500 at 3.2% p.a. for 5 years, I = 4500 × 0.032 × 5 = $720." },
  { q: "How do I calculate simple interest for months?", a: "The rate is per year, so write the time as a fraction of a year: divide the number of months by 12. For $1800 at 9% p.a. for 8 months, I = 1800 × 0.09 × 8/12 = $108. For weeks divide by 52, and for days divide by 365." },
  { q: "How do I find the total amount with simple interest?", a: "Add the interest to the principal: A = P + I. If $4500 earns $720 interest, the total is $5220. For a loan, this is the total amount you pay back." },
  { q: "How do I find the interest rate?", a: "Rearrange I = Prt to r = I ÷ (P × t), then multiply by 100 to get a percentage. If $6000 earns $810 in 3 years, r = 810 ÷ 18 000 = 0.045, which is 4.5% p.a." },
  { q: "What is the difference between simple and compound interest?", a: "Simple interest is always worked out on the original amount, so you earn the same interest every year. Compound interest is worked out on the balance, which grows as interest is added, so it earns more each year. $5000 at 6% p.a. for 4 years earns $1200 simple interest but $1312.38 compounded yearly." },
  { q: "What year level learns simple interest?", a: "In the Victorian Curriculum 2.0, simple interest is part of Year 9 algebra (modelling with linear relations in financial contexts). Year 8 builds the percentage skills it needs, and Year 10 moves on to compound interest. Schools sequence topics differently, so check your course." },
];

const PRACTICE = [
  { q: R`Find the simple interest on $\$3000$ invested at $4\%$ p.a. for $7$ years.`, a: R`$I = 3000 \times 0.04 \times 7 = \$840$` },
  { q: R`$\$12\,500$ is invested at $2.8\%$ p.a. simple interest for $3$ years. What is the total amount at the end?`, a: R`$I = 12\,500 \times 0.028 \times 3 = \$1050$, so $A = 12\,500 + 1050 = \$13\,550$` },
  { q: R`Sam borrows $\$950$ at $12\%$ p.a. simple interest for $9$ months. How much does he pay back in total?`, a: R`$t = \dfrac{9}{12} = 0.75$ years. $I = 950 \times 0.12 \times 0.75 = \$85.50$, so he pays back $950 + 85.50 = \$1035.50$` },
  { q: R`$\$4000$ earns $\$560$ simple interest over $4$ years. What is the interest rate?`, a: R`$r = \dfrac{560}{4000 \times 4} = \dfrac{560}{16\,000} = 0.035$, so $3.5\%$ p.a.` },
  { q: R`How long will it take $\$7200$ to earn $\$1080$ at $5\%$ p.a. simple interest?`, a: R`$t = \dfrac{1080}{7200 \times 0.05} = \dfrac{1080}{360} = 3$ years` },
  { q: R`An investment earns $\$93.60$ simple interest in $18$ months at $5.2\%$ p.a. How much was invested?`, a: R`$t = \dfrac{18}{12} = 1.5$ years. $P = \dfrac{93.60}{0.052 \times 1.5} = \dfrac{93.60}{0.078} = \$1200$` },
  { q: R`A $\$15\,000$ car loan is charged $6.4\%$ p.a. simple interest over $4$ years. It is repaid in equal monthly instalments. How much is each instalment?`, a: R`$I = 15\,000 \times 0.064 \times 4 = \$3840$. Total to repay: $15\,000 + 3840 = \$18\,840$. There are $4 \times 12 = 48$ months, so each instalment is $18\,840 \div 48 = \$392.50$` },
  { q: R`How many years will it take $\$5000$ to double at $8\%$ p.a. simple interest?`, a: R`To double, the interest must be $\$5000$. $t = \dfrac{5000}{5000 \times 0.08} = \dfrac{5000}{400} = 12.5$ years` },
  { q: R`Which earns more on $\$10\,000$ over $5$ years: $4.2\%$ p.a. simple interest, or $4\%$ p.a. compounded yearly?`, a: R`Simple: $I = 10\,000 \times 0.042 \times 5 = \$2100$. Compound: $A = 10\,000 \times 1.04^5 \approx \$12\,166.53$, so $I \approx \$2166.53$. The compound option earns $\$66.53$ more, even at the lower rate.` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Simple interest", path: PATH }]}
      eyebrow="Maths explained · Year 9"
      h1="How to calculate simple interest"
      lead="Simple interest is interest worked out only on the amount you started with, so it’s the same every year. Here’s the formula, what to do when the time is in months or weeks, how to work backwards to the rate, the time or the amount invested, and how loan repayments are worked out, with a calculator that shows the working."
      quickAnswer="Use I = Prt. P is the amount invested or borrowed, r is the yearly interest rate as a decimal, and t is the time in years. The total amount is A = P + I. If the time is in months, divide by 12 to get years first."
      toc={[
        ["formula", "The formula"],
        ["finding", "Finding the interest"],
        ["calculator", "Calculator"],
        ["months", "Time in months or weeks"],
        ["backwards", "Finding the rate, time or principal"],
        ["loans", "Loans and repayments"],
        ["compound", "Simple vs compound interest"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a simple interest question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_simple_interest"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="Simple interest: common questions"
      links={[
        { href: "/worksheets/year-9-simple-interest", label: "Year 9 simple interest worksheets" },
        { href: "/maths/compound-interest", label: "Compound interest explained" },
        { href: "/maths/percentages", label: "Percentages explained" },
        { href: "/year-9-maths-test", label: "Year 9 maths practice test" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got a simple interest question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="formula" className="tb-section" aria-labelledby="h-formula">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-formula" className="tb-h2 pg-h2">The simple interest formula</h2>
          <div className="mx-formula"><MathMd md={R`$$I = Prt$$`} /></div>
          <MathMd md={R`- $I$ is the **interest**: the extra money earned on an investment, or charged on a loan.
- $P$ is the **principal**: the amount invested or borrowed.
- $r$ is the **interest rate per year** (per annum, written p.a.) as a decimal. $3.2\%$ is $0.032$.
- $t$ is the **time in years**.

The total at the end is the principal plus the interest:

$$A = P + I$$

"Simple" means the interest is always worked out on the original principal. The interest earned in year one isn't added on before working out year two, so every year earns exactly the same amount.`} />
        </div>
      </section>

      <section id="finding" className="tb-section" aria-labelledby="h-finding">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-finding" className="tb-h2 pg-h2">Finding the interest</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Liam puts $\$4500$ into a savings account that pays $3.2\%$ p.a. simple interest. How much interest does he earn in $5$ years, and how much is in the account at the end?

$$I = Prt$$
$$I = 4500 \times 0.032 \times 5$$
$$I = \$720$$

Total: $A = 4500 + 720 = \$5220$`} />
          </div>
          <MathMd md={R`Each year Liam earns $4500 \times 0.032 = \$144$. Over $5$ years that's $5 \times 144 = \$720$, the same answer. Because the yearly interest never changes, a simple interest balance grows in a straight line: it's a linear relation, $A = 4500 + 144t$.`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Simple interest calculator</h2>
          <p className="pg-intro">Choose what you want to find, then fill in the other three values. The time can be in years, months, weeks or days. You’ll get the answer with every step, and a year-by-year table when the time is a whole number of years.</p>
          <SimpleInterestCalc placement="concept_simple_interest_calc" />
        </div>
      </section>

      <section id="months" className="tb-section" aria-labelledby="h-months">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-months" className="tb-h2 pg-h2">When the time is in months or weeks</h2>
          <MathMd md={R`The rate is per year, so $t$ must be in years too. Turn other units into a fraction of a year:

| Time given in | Divide by | Example |
|---|---|---|
| Months | $12$ | $8$ months $= \dfrac{8}{12}$ years |
| Weeks | $52$ | $26$ weeks $= \dfrac{26}{52} = 0.5$ years |
| Days | $365$ | $73$ days $= \dfrac{73}{365} = 0.2$ years |`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: months</p>
            <MathMd md={R`Ava borrows $\$1800$ for a new laptop. The lender charges $9\%$ p.a. simple interest, and she repays it all after $8$ months. How much does she repay?

$$t = \frac{8}{12} \text{ years}$$
$$I = 1800 \times 0.09 \times \frac{8}{12}$$
$$I = \$108$$

Ava repays $1800 + 108 = \$1908$.`} />
          </div>
          <MathMd md={R`Leave $\dfrac{8}{12}$ as a fraction in your calculator rather than rounding it to $0.67$. Rounding first gives $\$108.54$, which is wrong by $54$ cents.`} />
        </div>
      </section>

      <section id="backwards" className="tb-section" aria-labelledby="h-backwards">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-backwards" className="tb-h2 pg-h2">Finding the rate, the time or the principal</h2>
          <MathMd md={R`If you know the interest and need one of the other values, rearrange $I = Prt$ by dividing both sides:

$$r = \frac{I}{Pt} \qquad t = \frac{I}{Pr} \qquad P = \frac{I}{rt}$$

You can also substitute everything you know into $I = Prt$ first, then solve the equation. Both ways give the same answer.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: finding the rate</p>
            <MathMd md={R`A term deposit of $\$6000$ earns $\$810$ simple interest over $3$ years. What is the interest rate?

$$r = \frac{I}{Pt} = \frac{810}{6000 \times 3}$$
$$r = \frac{810}{18\,000} = 0.045$$

Multiply by $100$: the rate is $4.5\%$ p.a.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: finding the time</p>
            <MathMd md={R`How long will it take $\$2500$ to earn $\$350$ at $4\%$ p.a. simple interest?

$$t = \frac{I}{Pr} = \frac{350}{2500 \times 0.04}$$
$$t = \frac{350}{100} = 3.5 \text{ years}$$

That's $3$ years and $6$ months.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: finding the principal</p>
            <MathMd md={R`An investment earns $\$378$ simple interest in $2$ years at $6.3\%$ p.a. How much was invested?

$$P = \frac{I}{rt} = \frac{378}{0.063 \times 2}$$
$$P = \frac{378}{0.126} = \$3000$$

Check: $3000 \times 0.063 \times 2 = 378$ ✓`} />
          </div>
        </div>
      </section>

      <section id="loans" className="tb-section" aria-labelledby="h-loans">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-loans" className="tb-h2 pg-h2">Loans and repayments</h2>
          <MathMd md={R`For a loan, work out the interest, add it to the amount borrowed to get the total to repay, then share that total over the number of repayments.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: monthly repayments</p>
            <MathMd md={R`Noah borrows $\$3600$ for a used motorbike at $7.5\%$ p.a. simple interest over $2$ years. He repays it in equal monthly instalments. How much is each instalment?

1. Interest: $I = 3600 \times 0.075 \times 2 = \$540$
2. Total to repay: $3600 + 540 = \$4140$
3. Number of months: $2 \times 12 = 24$
4. Each instalment: $4140 \div 24 = \$172.50$`} />
          </div>
          <MathMd md={R`Questions like this often finish with "how much more than the amount borrowed does Noah pay?" That's just the interest, $\$540$.`} />
        </div>
      </section>

      <section id="compound" className="tb-section" aria-labelledby="h-compound">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-compound" className="tb-h2 pg-h2">Simple interest vs compound interest</h2>
          <MathMd md={R`$\$5000$ is invested for $4$ years at $6\%$ p.a.

| Year | Simple | Compound (yearly) |
|---|---|---|
| 1 | $\$300.00$ | $\$300.00$ |
| 2 | $\$300.00$ | $\$318.00$ |
| 3 | $\$300.00$ | $\$337.08$ |
| 4 | $\$300.00$ | $\$357.30$ |
| **Total** | $\$1200.00$ | $\$1312.38$ |

Simple interest stays at $\$300$ a year. Compound interest grows, because each year's interest is worked out on a bigger balance. The [compound interest page](/maths/compound-interest) shows how to calculate it with $A = P(1 + r)^n$.`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Using the percentage as a whole number.** $4500 \times 3.2 \times 5$ gives $72\,000$, which is clearly far too much interest. Change $3.2\%$ to $0.032$ first, or divide by $100$ at the end.
- **Putting months straight into the formula.** For $8$ months, $t = \dfrac{8}{12}$, not $8$. Using $8$ makes the interest $12$ times too big.
- **Giving the interest when the question asks for the total.** "How much is in the account" or "how much is repaid" means $A = P + I$. "How much interest" means $I$.
- **Mixing up the rearranged formulas.** To find $r$, divide $I$ by $P$ **and** $t$. Dividing by only one of them is a common slip. Substitute your answer back into $I = Prt$ to check.
- **Forgetting to change the rate back to a percentage.** $r = 0.045$ is the decimal. The answer is $4.5\%$ p.a.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer. Money is rounded to the nearest cent.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Lost marks on an interest question? Don't just move on. Study your mistakes." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Interest and percentages by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-8-percentages", text: "Percentage increase and decrease, and finding a percentage of an amount: the skills I = Prt is built on." },
              { slug: "year-8-profit-and-loss", text: "Profit, loss, discounts and GST in everyday money problems." },
              { slug: "year-9-simple-interest", text: "Simple interest with I = Prt, finding the rate, time or principal, and simple interest loans." },
              { slug: "year-10-compound-interest", text: "Compound interest, different compounding periods and depreciation." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

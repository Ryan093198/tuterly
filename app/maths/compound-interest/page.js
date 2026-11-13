import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import CompoundCalc from "@/components/maths/CompoundCalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a calculator: compound interest. Built by the daily page
// task (Nov 2026); not yet read by Ryan, so it's in UNREVIEWED_PATHS
// (lib/reviewed.js). Every example, practice answer and calculator test case
// was recomputed by script before publishing.

const PATH = "/maths/compound-interest";
const TITLE = "How to Calculate Compound Interest: Formula, Examples and Calculator (Year 10) | Tuterly";
const DESCRIPTION =
  "How to calculate compound interest with A = P(1 + r)^n, monthly and quarterly compounding, finding the principal and depreciation, with a calculator and yearly table.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is the formula for compound interest?", a: "A = P(1 + r)^n, where P is the amount invested or borrowed (the principal), r is the interest rate per compounding period as a decimal, n is the number of compounding periods, and A is the final amount. The interest earned is I = A − P. For $5000 at 4% p.a. compounded yearly for 3 years, A = 5000 × 1.04³ = $5624.32, so the interest is $624.32." },
  { q: "What is the difference between simple and compound interest?", a: "Simple interest is worked out on the original amount only, so it is the same every year (I = Prt). Compound interest is worked out on the balance, which already includes earlier interest, so it grows each year. $8000 at 5% p.a. for 10 years earns $4000 simple interest but $5031.16 compound interest (compounded yearly)." },
  { q: "How do I calculate compound interest compounded monthly?", a: "Divide the yearly rate by 12 and multiply the number of years by 12. At 6% p.a. compounded monthly for 5 years, r = 0.06 ÷ 12 = 0.005 per month and n = 5 × 12 = 60 months, so A = P × 1.005⁶⁰." },
  { q: "How do I find the principal in a compound interest question?", a: "Rearrange A = P(1 + r)^n to P = A ÷ (1 + r)^n. To have $10 000 in 4 years at 3.5% p.a. compounded quarterly, P = 10 000 ÷ 1.00875¹⁶ ≈ $8698.88." },
  { q: "Is depreciation the same as compound interest?", a: "It uses the same idea, but the value goes down. Use A = P(1 − r)^n. A $30 000 car that loses 15% of its value each year is worth 30 000 × 0.85⁴ ≈ $15 660.19 after 4 years." },
  { q: "What year level learns compound interest?", a: "In the Victorian Curriculum 2.0, Year 9 covers simple interest, and Year 10 uses mathematical modelling for growth and decay, including compound interest. Year 10A and senior maths (General and Methods) build on it with exponential functions and logarithms." },
];

const PRACTICE = [
  { q: R`Find the final amount when $\$2000$ is invested at $5\%$ p.a. compounded yearly for $2$ years.`, a: R`$A = 2000 \times 1.05^2 = \$2205$` },
  { q: R`$\$6500$ is invested at $3\%$ p.a. compounded yearly for $4$ years. How much interest is earned?`, a: R`$A = 6500 \times 1.03^4 \approx \$7315.81$, so $I = 7315.81 - 6500 = \$815.81$` },
  { q: R`Find the final amount when $\$4000$ is invested at $6\%$ p.a. compounded quarterly for $3$ years.`, a: R`$r = 0.06 \div 4 = 0.015$ and $n = 3 \times 4 = 12$. $A = 4000 \times 1.015^{12} \approx \$4782.47$` },
  { q: R`A loan of $\$15\,000$ is charged $4.8\%$ p.a. interest compounded monthly. If nothing is repaid, how much is owed after $2$ years?`, a: R`$r = 0.048 \div 12 = 0.004$ and $n = 24$. $A = 15\,000 \times 1.004^{24} \approx \$16\,508.22$` },
  { q: R`How much interest does $\$9000$ earn in $5$ years at $7\%$ p.a. compounded half-yearly?`, a: R`$r = 0.035$ and $n = 10$. $A = 9000 \times 1.035^{10} \approx \$12\,695.39$, so $I \approx \$3695.39$` },
  { q: R`How much needs to be invested now at $5\%$ p.a. compounded yearly to have $\$20\,000$ in $6$ years?`, a: R`$P = \dfrac{20\,000}{1.05^6} \approx \$14\,924.31$` },
  { q: R`A laptop bought for $\$2400$ loses $20\%$ of its value each year. What is it worth after $3$ years?`, a: R`$A = 2400 \times 0.8^3 = \$1228.80$` },
  { q: R`Which earns more on $\$10\,000$ over $3$ years: $5\%$ p.a. simple interest, or $4.8\%$ p.a. compounded monthly?`, a: R`Simple: $I = 10\,000 \times 0.05 \times 3 = \$1500$. Compound: $A = 10\,000 \times 1.004^{36} \approx \$11\,545.52$, so $I \approx \$1545.52$. The compound option earns $\$45.52$ more, even at the lower rate.` },
  { q: R`$\$5000$ is invested at $6\%$ p.a. compounded yearly. After how many whole years will it first be worth more than $\$10\,000$?`, a: R`Try values of $n$: $5000 \times 1.06^{11} \approx \$9491.49$ (not yet) and $5000 \times 1.06^{12} \approx \$10\,060.98$. So it takes $12$ years.` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Compound interest", path: PATH }]}
      eyebrow="Maths explained · Year 10"
      h1="How to calculate compound interest"
      lead="Compound interest is interest on the interest. Each period, the interest is added to the balance, and the next lot of interest is worked out on that bigger balance. Here’s the formula, how to handle monthly and quarterly compounding, how to work backwards to the amount invested, and how the same idea handles depreciation, with a calculator that shows a year-by-year table."
      quickAnswer="Use A = P(1 + r)^n. P is the amount invested or borrowed, r is the interest rate per compounding period as a decimal, and n is the number of compounding periods. The interest is I = A − P. For monthly compounding, divide the yearly rate by 12 and multiply the years by 12."
      toc={[
        ["formula", "The formula"],
        ["yearly", "Compounded yearly"],
        ["calculator", "Calculator"],
        ["periods", "Monthly and quarterly"],
        ["simple", "Compound vs simple interest"],
        ["principal", "Finding the principal"],
        ["decay", "Depreciation"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on an interest question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_compound_interest"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="Compound interest: common questions"
      links={[
        { href: "/worksheets/year-10-compound-interest", label: "Year 10 compound interest worksheets" },
        { href: "/maths/percentages", label: "Percentages explained" },
        { href: "/year-10-maths-test", label: "Year 10 maths practice test" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got an interest question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="formula" className="tb-section" aria-labelledby="h-formula">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-formula" className="tb-h2 pg-h2">The compound interest formula</h2>
          <div className="mx-formula"><MathMd md={R`$$A = P(1 + r)^n$$`} /></div>
          <MathMd md={R`- $P$ is the **principal**: the amount you start with (invested or borrowed).
- $r$ is the interest rate **per compounding period**, written as a decimal. $4\%$ is $0.04$.
- $n$ is the **number of compounding periods**: years, months or quarters, depending on how often interest is added.
- $A$ is the **final amount** (principal plus all the interest).

The interest itself is the difference:

$$I = A - P$$

Why a power? Adding $4\%$ is the same as multiplying by $1.04$. Do that once a year for $3$ years and you've multiplied by $1.04 \times 1.04 \times 1.04 = 1.04^3$.`} />
        </div>
      </section>

      <section id="yearly" className="tb-section" aria-labelledby="h-yearly">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-yearly" className="tb-h2 pg-h2">Compound interest compounded yearly</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Maya invests $\$5000$ at $4\%$ p.a. compounded yearly. Find the value of the investment after $3$ years and the interest earned.

$$A = P(1 + r)^n$$
$$A = 5000 \times (1 + 0.04)^3$$
$$A = 5000 \times 1.04^3$$
$$A = \$5624.32$$

Interest earned: $I = 5624.32 - 5000 = \$624.32$`} />
          </div>
          <MathMd md={R`Here's the same thing one year at a time, so you can see the interest grow:

| Year | Start | Interest ($4\%$) | End |
|---|---|---|---|
| 1 | $\$5000.00$ | $\$200.00$ | $\$5200.00$ |
| 2 | $\$5200.00$ | $\$208.00$ | $\$5408.00$ |
| 3 | $\$5408.00$ | $\$216.32$ | $\$5624.32$ |

Simple interest would pay $\$200$ every year. With compounding, year 2 pays $\$208$ because the first year's $\$200$ is now earning interest too.`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Compound interest calculator (with a yearly table)</h2>
          <p className="pg-intro">Enter the amount, the yearly interest rate, the time and how often it’s compounded. You’ll get the final amount, the interest, the working, a comparison with simple interest and the balance at the end of every year.</p>
          <CompoundCalc placement="concept_compound_interest_calc" />
        </div>
      </section>

      <section id="periods" className="tb-section" aria-labelledby="h-periods">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-periods" className="tb-h2 pg-h2">Compounding monthly, quarterly or half-yearly</h2>
          <MathMd md={R`Rates are quoted **per annum** (p.a.), but interest is often added more often than once a year. Change both the rate and the number of periods to match:

| Compounded | Rate per period | Periods in $t$ years |
|---|---|---|
| Yearly | $r$ | $t$ |
| Half-yearly | $r \div 2$ | $2t$ |
| Quarterly | $r \div 4$ | $4t$ |
| Monthly | $r \div 12$ | $12t$ |`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: monthly</p>
            <MathMd md={R`Josh puts $\$12\,000$ in a term deposit paying $6\%$ p.a. compounded monthly. How much is it worth after $5$ years?

Rate per month: $r = 0.06 \div 12 = 0.005$

Number of months: $n = 5 \times 12 = 60$

$$A = 12\,000 \times 1.005^{60}$$
$$A \approx \$16\,186.20$$

So the interest is about $\$4186.20$.`} />
          </div>
          <MathMd md={R`The more often interest is added, the more you end up with, but the differences get small. $\$10\,000$ at $6\%$ p.a. for $5$ years grows to $\$13\,382.26$ compounded yearly, $\$13\,468.55$ quarterly and $\$13\,488.50$ monthly.`} />
        </div>
      </section>

      <section id="simple" className="tb-section" aria-labelledby="h-simple">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-simple" className="tb-h2 pg-h2">Compound interest vs simple interest</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: comparing</p>
            <MathMd md={R`$\$8000$ is invested for $10$ years at $5\%$ p.a. Compare simple interest with interest compounded yearly.

**Simple interest:** $I = Prt = 8000 \times 0.05 \times 10 = \$4000$, so the final amount is $\$12\,000$.

**Compound interest:**
$$A = 8000 \times 1.05^{10} \approx \$13\,031.16$$

Compounding gives $\$13\,031.16 - \$12\,000 = \$1031.16$ more.`} />
          </div>
          <MathMd md={R`Over a short time the two are close. Over a long time compound interest pulls further and further ahead, because simple interest grows in a straight line and compound interest grows exponentially. That's why it matters for savings, and for credit card and loan debt.`} />
        </div>
      </section>

      <section id="principal" className="tb-section" aria-labelledby="h-principal">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-principal" className="tb-h2 pg-h2">Finding the principal (working backwards)</h2>
          <MathMd md={R`If you know the final amount and need the starting amount, divide instead of multiply:

$$P = \frac{A}{(1 + r)^n}$$`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`How much should Priya invest now at $3.5\%$ p.a. compounded quarterly so that she has $\$10\,000$ in $4$ years?

Rate per quarter: $r = 0.035 \div 4 = 0.00875$

Number of quarters: $n = 4 \times 4 = 16$

$$P = \frac{10\,000}{1.00875^{16}}$$
$$P \approx \$8698.88$$`} />
          </div>
          <MathMd md={R`Check by going forwards: $8698.88 \times 1.00875^{16} \approx 10\,000$. Type the whole calculation into your calculator in one go, using brackets, rather than rounding $1.00875^{16}$ first.`} />
        </div>
      </section>

      <section id="decay" className="tb-section" aria-labelledby="h-decay">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-decay" className="tb-h2 pg-h2">Depreciation: the same idea going down</h2>
          <MathMd md={R`When something loses a percentage of its value each year, subtract the rate instead of adding it:

$$A = P(1 - r)^n$$`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A car bought for $\$30\,000$ depreciates by $15\%$ each year. What is it worth after $4$ years?

$$A = 30\,000 \times (1 - 0.15)^4$$
$$A = 30\,000 \times 0.85^4$$
$$A \approx \$15\,660.19$$`} />
          </div>
          <MathMd md={R`Losing $15\%$ a year for $4$ years is **not** losing $60\%$. Each year's $15\%$ comes off a smaller value, so the car keeps a little over half its value, not $40\%$.`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Using the percentage instead of the decimal.** $5\%$ is $0.05$, so the multiplier is $1.05$, not $1.5$ or $6$.
- **Forgetting to change the rate and the periods together.** $6\%$ p.a. compounded monthly for $5$ years is $1.005^{60}$. Using $1.06^{60}$ or $1.005^{5}$ gives answers that are far too big or too small.
- **Giving $A$ when the question asks for the interest.** "How much interest" means $I = A - P$. "What is it worth" or "how much is owed" means $A$.
- **Multiplying before the power.** $5000 \times 1.04^3$ means cube $1.04$ first, then multiply. Working out $(5000 \times 1.04)^3$ gives a huge wrong answer.
- **Rounding in the middle.** Rounding $1.00875^{16}$ to $1.15$ changes the answer by several dollars. Keep everything in the calculator and round to the nearest cent at the end.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer. Money is rounded to the nearest cent.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Got an interest question wrong? Don't just move on. Study your mistakes." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Interest and growth by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-9-simple-interest", text: "Simple interest with I = Prt, finding the rate or time, and simple interest loans." },
              { slug: "year-10-compound-interest", text: "Compound interest, different compounding periods, finding the principal, and depreciation." },
              { slug: "year-10-exponential-equations", text: "Growth and decay written as exponential equations, solved by trial and error or graphs." },
              { slug: "year-10a-logarithms", text: "Logarithms, which let you solve for the time n exactly instead of by trial and error." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

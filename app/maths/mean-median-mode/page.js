import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import StatsCalc from "@/components/maths/StatsCalc";

// Concept page with a calculator: mean, median, mode and range, plus
// quartiles and the interquartile range (a big cluster of Australian
// searches: "how to find the mean", "mean median mode and range", "how to
// find the median", "interquartile range"). Every example and practice
// answer was checked in code (Nov 2026).

const PATH = "/maths/mean-median-mode";
const TITLE = "How to Find the Mean, Median, Mode and Range: Examples and Calculator (Years 7 to 10) | Tuterly";
const DESCRIPTION =
  "How to find the mean, median, mode and range, plus quartiles and the interquartile range, with worked examples, frequency tables, practice questions with answers and a free calculator that shows the working.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What's the difference between the mean, median and mode?", a: "The mean is the average: add up the values and divide by how many there are. The median is the middle value once the data is in order. The mode is the value that appears most often." },
  { q: "How do you find the median when there's an even number of values?", a: "Put the values in order and find the middle two. The median is halfway between them: add them and divide by 2. For 11, 12, 14, 15, 18, 20 the middle two are 14 and 15, so the median is 14.5." },
  { q: "Can there be no mode, or more than one?", a: "Yes. If every value appears once, there's no mode. If two values tie for most common, both are modes (the data is bimodal). The mode is the only one of the three that doesn't have to be a single number." },
  { q: "How do you find the interquartile range?", a: "Put the data in order and find the median. Split the data into a lower half and an upper half (leave the median out if there's an odd number of values). Q1 is the median of the lower half, Q3 is the median of the upper half, and IQR = Q3 − Q1. Textbooks and calculators vary slightly in how they find quartiles, so use your teacher's method." },
  { q: "What year level learns mean, median and mode?", a: "In the Victorian Curriculum 2.0, the mean, median, mode and range are Year 7 statistics and are used again every year after. Quartiles, the interquartile range and box plots come in Years 9 and 10. Schools sequence topics differently, so check your course." },
];

const PRACTICE = [
  { q: R`Find the mean of $5, 8, 12, 3, 7$.`, a: R`$\dfrac{5 + 8 + 12 + 3 + 7}{5} = \dfrac{35}{5} = 7$` },
  { q: R`Find the median of $9, 2, 7, 4, 11$.`, a: R`In order: $2, 4, 7, 9, 11$. The middle value is $7$.` },
  { q: R`Find the median of $6, 1, 8, 3, 10, 4$.`, a: R`In order: $1, 3, 4, 6, 8, 10$. The middle two are $4$ and $6$, so the median is $\dfrac{4 + 6}{2} = 5$.` },
  { q: R`Find the mode and the range of $4, 7, 2, 7, 9, 3, 7, 2$.`, a: R`Mode: $7$ (it appears 3 times). Range: $9 - 2 = 7$.` },
  { q: R`The mean of five numbers is $8$. Four of them are $6, 9, 4$ and $10$. What is the fifth number?`, a: R`The five numbers add to $5 \times 8 = 40$. The four you know add to $29$, so the fifth is $40 - 29 = 11$.` },
  { q: R`Find $Q_1$, $Q_3$ and the IQR of $2, 5, 7, 8, 11, 13, 15, 18, 20$.`, a: R`The median is $11$. Lower half: $2, 5, 7, 8$, so $Q_1 = \dfrac{5 + 7}{2} = 6$. Upper half: $13, 15, 18, 20$, so $Q_3 = \dfrac{15 + 18}{2} = 16.5$. $\text{IQR} = 16.5 - 6 = 10.5$.` },
  { q: R`A class recorded goals scored per game: 0 goals 4 times, 1 goal 6 times, 2 goals 7 times and 3 goals 3 times. Find the mean.`, a: R`$\sum f = 4 + 6 + 7 + 3 = 20$ games. $\sum fx = 0 + 6 + 14 + 9 = 29$ goals. Mean $= \dfrac{29}{20} = 1.45$ goals per game.` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Mean, median, mode and range", path: PATH }]}
      eyebrow="Maths explained · Years 7 to 10"
      h1="How to find the mean, median, mode and range"
      lead="The mean, median and mode are three ways to describe the centre of a set of data, and the range and interquartile range describe how spread out it is. Here’s how to find each one with an example, a calculator that shows the working, and practice questions with answers."
      quickAnswer="Mean: add all the values and divide by how many there are. Median: put the values in order and take the middle one (or the average of the middle two). Mode: the value that appears most often. Range: highest value minus lowest value. Interquartile range: Q3 − Q1, the spread of the middle half of the data."
      toc={[
        ["mean", "The mean"],
        ["median", "The median"],
        ["mode", "The mode"],
        ["range", "The range"],
        ["calculator", "Calculator"],
        ["frequency", "From a frequency table"],
        ["quartiles", "Quartiles and IQR"],
        ["which", "Which one to use"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a statistics question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_mean-median-mode"
      faqs={FAQS}
      faqTitle="Mean, median and mode: common questions"
      links={[
        { href: "/calculators/standard-deviation", label: "Standard deviation calculator" },
        { href: "/worksheets/mean-median-mode", label: "Mean, median and mode worksheets" },
        { href: "/worksheets/box-plots", label: "Box plot worksheets" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got a statistics question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="mean" className="tb-section" aria-labelledby="h-mean">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mean" className="tb-h2 pg-h2">How to find the mean</h2>
          <div className="mx-formula"><MathMd md={R`$$\bar{x} = \frac{\text{sum of the values}}{\text{number of values}}$$`} /></div>
          <MathMd md={R`The mean is what most people call the average. Add up every value, then divide by how many values there are.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the mean of $4, 8, 2, 9, 5, 8, 6$.

There are 7 values and they add to $4 + 8 + 2 + 9 + 5 + 8 + 6 = 42$.

$$\bar{x} = \frac{42}{7} = 6$$`} />
          </div>
          <MathMd md={R`The mean doesn't have to be one of the values, or even a whole number. The mean of $3, 4, 4, 6$ is $\dfrac{17}{4} = 4.25$.`} />
        </div>
      </section>

      <section id="median" className="tb-section" aria-labelledby="h-median">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-median" className="tb-h2 pg-h2">How to find the median</h2>
          <MathMd md={R`The median is the middle value **once the data is in order**. Forgetting to order the data first is the most common mistake.

- **Odd number of values:** there's one middle value. For $n$ values, it's value number $\dfrac{n + 1}{2}$.
- **Even number of values:** there are two middle values. The median is halfway between them.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: odd count</p>
            <MathMd md={R`Find the median of $4, 8, 2, 9, 5, 8, 6$.

In order: $2, 4, 5, 6, 8, 8, 9$. There are 7 values, so the median is value number $\dfrac{7 + 1}{2} = 4$, which is $6$.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: even count</p>
            <MathMd md={R`Find the median of $12, 15, 11, 18, 14, 20$.

In order: $11, 12, 14, 15, 18, 20$. The middle two values are $14$ and $15$.

$$\text{median} = \frac{14 + 15}{2} = 14.5$$`} />
          </div>
        </div>
      </section>

      <section id="mode" className="tb-section" aria-labelledby="h-mode">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mode" className="tb-h2 pg-h2">How to find the mode</h2>
          <MathMd md={R`The mode is the value that appears **most often**. Ordering the data first makes repeats easy to spot.

- $2, 4, 5, 6, 8, 8, 9$: the mode is $8$.
- $3, 5, 8, 10$: every value appears once, so there's **no mode**.
- $2, 4, 4, 6, 7, 7$: $4$ and $7$ both appear twice, so there are **two modes**, $4$ and $7$ (the data is bimodal).

The mode is the only one of the three that also works for categories, like the most popular sport in a class.`} />
        </div>
      </section>

      <section id="range" className="tb-section" aria-labelledby="h-range">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-range" className="tb-h2 pg-h2">How to find the range</h2>
          <div className="mx-formula"><MathMd md={R`$$\text{range} = \text{highest value} - \text{lowest value}$$`} /></div>
          <MathMd md={R`The range measures spread, not the centre. For $2, 4, 5, 6, 8, 8, 9$ the range is $9 - 2 = 7$.

The range is always a single number. Writing "2 to 9" is not the range.`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Mean, median, mode and range calculator (with working)</h2>
          <p className="pg-intro">Paste or type your numbers. You’ll get the ordered data, mean, median, mode, range, quartiles and interquartile range, with every step.</p>
          <StatsCalc placement="concept_mean-median-mode_calc" />
        </div>
      </section>

      <section id="frequency" className="tb-section" aria-labelledby="h-frequency">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-frequency" className="tb-h2 pg-h2">Mean, median and mode from a frequency table</h2>
          <MathMd md={R`A frequency table tells you how many times ($f$) each value ($x$) appears. Add an $f \times x$ column to find the total.

| Score ($x$) | Frequency ($f$) | $f \times x$ |
|---|---|---|
| 1 | 2 | 2 |
| 2 | 5 | 10 |
| 3 | 8 | 24 |
| 4 | 3 | 12 |
| 5 | 2 | 10 |
| **Total** | **20** | **58** |`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`**Mean:** divide the total of the $f \times x$ column by the total frequency.

$$\bar{x} = \frac{\sum fx}{\sum f} = \frac{58}{20} = 2.9$$

**Median:** there are 20 values, so the median is halfway between the 10th and 11th. Count down the frequencies: the 1s are values 1 to 2, the 2s are values 3 to 7, and the 3s are values 8 to 15. The 10th and 11th are both $3$, so the median is $3$.

**Mode:** the score with the highest frequency, $3$.

**Range:** $5 - 1 = 4$.`} />
          </div>
          <MathMd md={R`A common mistake is dividing by the number of rows (5) instead of the total frequency (20).`} />
        </div>
      </section>

      <section id="quartiles" className="tb-section" aria-labelledby="h-quartiles">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-quartiles" className="tb-h2 pg-h2">Quartiles and the interquartile range (Years 9 and 10)</h2>
          <MathMd md={R`Quartiles split ordered data into four equal parts. $Q_1$ (the lower quartile) has a quarter of the data below it, the median ($Q_2$) has half, and $Q_3$ (the upper quartile) has three quarters.

The **interquartile range** is the spread of the middle half of the data:`} />
          <div className="mx-formula"><MathMd md={R`$$\text{IQR} = Q_3 - Q_1$$`} /></div>
          <MathMd md={R`The method most Australian textbooks use:

1. Put the data in order and find the median.
2. Split the data into a lower half and an upper half. If there's an odd number of values, leave the median out of both halves.
3. $Q_1$ is the median of the lower half, and $Q_3$ is the median of the upper half.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: odd count</p>
            <MathMd md={R`Find the IQR of $1, 4, 5, 7, 9, 10, 12, 15, 18$.

There are 9 values, so the median is the 5th: $9$. Leave it out.

Lower half: $1, 4, 5, 7$, so $Q_1 = \dfrac{4 + 5}{2} = 4.5$.

Upper half: $10, 12, 15, 18$, so $Q_3 = \dfrac{12 + 15}{2} = 13.5$.

$$\text{IQR} = 13.5 - 4.5 = 9$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: even count</p>
            <MathMd md={R`Find the IQR of $3, 5, 6, 8, 10, 12, 13, 15$.

There are 8 values, so the halves are the first 4 and the last 4.

Lower half: $3, 5, 6, 8$, so $Q_1 = \dfrac{5 + 6}{2} = 5.5$.

Upper half: $10, 12, 13, 15$, so $Q_3 = \dfrac{12 + 13}{2} = 12.5$.

$$\text{IQR} = 12.5 - 5.5 = 7$$`} />
          </div>
          <MathMd md={R`Methods for quartiles vary slightly between textbooks and calculators (some include the median in each half, some use a formula for the position). They can give slightly different answers for the same data, so follow the method your teacher uses.

**Outliers (Year 10).** A value is usually called an outlier if it's below $Q_1 - 1.5 \times \text{IQR}$ or above $Q_3 + 1.5 \times \text{IQR}$. The five-number summary (minimum, $Q_1$, median, $Q_3$, maximum) is what you draw a box plot from.`} />
        </div>
      </section>

      <section id="which" className="tb-section" aria-labelledby="h-which">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-which" className="tb-h2 pg-h2">Mean or median: which one to use</h2>
          <MathMd md={R`An outlier (a value far from the rest) pulls the mean towards it, but barely moves the median.

Five people earn \$500, \$550, \$600, \$650 and \$5000 a week. The mean is $\dfrac{7300}{5} = \$1460$, which is more than four of the five people earn. The median, \$600, is a better summary of a typical wage.

- Use the **mean** when the data has no outliers.
- Use the **median** when there are outliers or the data is skewed.
- Use the **mode** for categories, or when you want the most common value.

The same goes for spread: the IQR isn't affected by outliers, but the range is.`} />
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
          <h2 id="h-years" className="tb-h2 pg-h2">Mean, median and mode by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-7-statistics", text: "Mean, median, mode and range from lists of data and frequency tables." },
              { slug: "year-8-statistics", text: "Collecting data and samples, and how outliers change the mean and median." },
              { slug: "year-9-comparing-data", text: "Comparing data sets using measures of centre and spread, including the range and IQR." },
              { slug: "year-10-statistics", text: "Quartiles, the interquartile range, five-number summaries, box plots and outliers." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import YearLinks from "@/components/maths/YearLinks";
import StdDevCalc from "@/components/maths/StdDevCalc";

// Calculator page: standard deviation ("standard deviation calculator"
// ~4,400 searches a month in Australia). Shows population and sample
// values, since schools and calculators use both (Nov 2026).

const PATH = "/calculators/standard-deviation";
const TITLE = "Standard Deviation Calculator with Steps: Mean, Population and Sample (Year 10) | Tuterly";
const DESCRIPTION =
  "Free standard deviation calculator that shows the working: the mean, each squared deviation, and both the population (σ) and sample (s) standard deviation. With a plain-English explanation of what standard deviation means.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What does standard deviation tell you?", a: "How spread out the data is around the mean. A small standard deviation means the values are close to the mean; a large one means they're more spread out." },
  { q: "What's the difference between σ and s?", a: "σ (population) divides by n and is used when your data is the whole group. s (sample) divides by n − 1 and is used when your data is a sample from a larger group. s is always a little bigger." },
  { q: "Which one does my calculator show?", a: "Scientific calculators usually show both: σx (or σn) is the population value and sx (or σn−1) is the sample value. Check which one your teacher or textbook uses." },
  { q: "What year level learns standard deviation?", a: "In the Victorian Curriculum 2.0 it's a Year 10A statistics topic; some schools and states introduce it in Year 10. It's used a lot in senior maths." },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Standard deviation calculator", path: PATH }]}
      eyebrow="Free calculator · Year 10"
      h1="Standard deviation calculator, with the working out"
      lead="Paste or type your data. You’ll get the mean and the standard deviation, both population and sample, with every step shown so you can follow it or copy the method."
      toc={[["calc", "Calculator"], ["meaning", "What it means"], ["formula", "The formula"], ["years", "By year level"], ["faq", "FAQ"]]}
      ctaTitle="Got it wrong in homework?"
      ctaText="Snap the question. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own."
      placement="calc_stddev"
      faqs={FAQS}
      faqTitle="Standard deviation: questions"
      links={[
        { href: "/worksheets/year-10-statistics", label: "Year 10 statistics worksheets" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Practise until you don’t need the calculator"
      finalText="Tuterly saves the questions you get wrong, shows the working, and gives fresh questions on the same skill until it’s mastered."
    >
      <section id="calc" className="tb-section" aria-labelledby="h-calc">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calc" className="tb-h2 pg-h2">Calculate the standard deviation</h2>
          <StdDevCalc placement="calc_stddev_page" />
        </div>
      </section>
      <section id="meaning" className="tb-section" aria-labelledby="h-meaning">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-meaning" className="tb-h2 pg-h2">What standard deviation means</h2>
          <MathMd md={R`Standard deviation measures how spread out data is around the mean: roughly, how far a typical value is from the average.

Two classes might both average 70% on a test. If one has a standard deviation of 5 and the other 15, the first class's marks are bunched close to 70 and the second's are spread from much lower to much higher.

For data shaped like a bell curve, about 68% of values lie within one standard deviation of the mean, and about 95% within two.`} />
        </div>
      </section>
      <section id="formula" className="tb-section" aria-labelledby="h-formula">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-formula" className="tb-h2 pg-h2">The formula</h2>
          <MathMd md={R`$$\sigma = \sqrt{\frac{\sum (x - \bar{x})^2}{n}}$$
$$s = \sqrt{\frac{\sum (x - \bar{x})^2}{n - 1}}$$

1. Find the mean $\bar{x}$.
2. Subtract the mean from each value and square the result.
3. Add the squares.
4. Divide by $n$ (population) or $n - 1$ (sample).
5. Take the square root.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Data: 2, 4, 4, 4, 5, 5, 7, 9. The mean is $\dfrac{40}{8} = 5$.

Squared deviations: 9, 1, 1, 1, 0, 0, 4, 16, which add to 32.

$$\sigma = \sqrt{\frac{32}{8}} = \sqrt{4} = 2$$
$$s = \sqrt{\frac{32}{7}} \approx 2.14$$`} />
          </div>
        </div>
      </section>
      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">By year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-10-statistics", text: "Comparing data sets with box plots, the interquartile range and scatterplots." },
              { slug: "year-10a-standard-deviation", text: "Calculating and interpreting the mean and standard deviation." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

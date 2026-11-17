import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import SciNotationCalc from "@/components/maths/SciNotationCalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a converter: scientific notation. Built by the daily
// page task (Nov 2026); not yet read by Ryan, so it's in UNREVIEWED_PATHS
// (lib/reviewed.js). Every example, practice answer and converter test case
// was recomputed by script before publishing.

const PATH = "/maths/scientific-notation";
const TITLE = "Scientific Notation: How to Write Numbers in Standard Form, with Converter | Tuterly";
const DESCRIPTION =
  "How to write large and small numbers in scientific notation and back again, with significant figures, multiplying and dividing, worked examples and a converter.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is scientific notation?", a: "A short way to write very large or very small numbers as a × 10ⁿ, where a is at least 1 and less than 10, and n is a whole number. For example, 45 600 000 = 4.56 × 10⁷ and 0.000 072 = 7.2 × 10⁻⁵. It’s also called standard form." },
  { q: "How do you know if the power is positive or negative?", a: "Look at the size of the original number. Numbers of 10 or more get a positive power, because you divide by 10 to get down to a number between 1 and 10. Numbers less than 1 get a negative power. Numbers from 1 up to (but not including) 10 have a power of 0." },
  { q: "Is 25 × 10³ in scientific notation?", a: "No. The number in front has to be at least 1 and less than 10, and 25 is too big. Rewrite 25 as 2.5 × 10¹, then add the powers: 25 × 10³ = 2.5 × 10⁴. Both have the value 25 000." },
  { q: "What does E mean on a calculator?", a: "E stands for “times 10 to the power of”. A display of 3.2E−6 means 3.2 × 10⁻⁶, which is 0.000 003 2. Write it in proper scientific notation in your answer, not as calculator E notation." },
  { q: "Are standard form and scientific notation the same thing?", a: "In Australian classrooms, yes: both mean a × 10ⁿ with a between 1 and 10. Some older books call it standard notation. Be careful with online sources from the USA, where “standard form” can mean an ordinary number written out in full." },
  { q: "What year level learns scientific notation?", a: "In the Victorian Curriculum 2.0 it’s a Year 9 topic, used to solve problems with very large and very small measurements. It builds on the Year 8 index laws, and Year 10 science and maths keep using it for calculations." },
];

const PRACTICE = [
  { q: R`Write $5\,300\,000$ in scientific notation.`, a: R`$5.3 \times 10^{6}$. The point moves $6$ places to the left.` },
  { q: R`Write $0.000\,84$ in scientific notation.`, a: R`$8.4 \times 10^{-4}$. The point moves $4$ places to the right, and the number is less than $1$, so the power is negative.` },
  { q: R`Write $60\,200$ in scientific notation.`, a: R`$6.02 \times 10^{4}$. Keep the zero between the $6$ and the $2$; only the zeros at the end drop off.` },
  { q: R`Write $0.07$ in scientific notation.`, a: R`$7 \times 10^{-2}$` },
  { q: R`Write $2.9 \times 10^{5}$ as an ordinary number.`, a: R`$290\,000$. Move the point $5$ places to the right.` },
  { q: R`Write $4.06 \times 10^{-3}$ as an ordinary number.`, a: R`$0.004\,06$. Move the point $3$ places to the left.` },
  { q: R`Write $38\,450\,000$ in scientific notation, correct to $3$ significant figures.`, a: R`$3.845 \times 10^{7}$ exactly. The fourth digit is $5$, so round up: $3.85 \times 10^{7}$.` },
  { q: R`Calculate $(4 \times 10^{3}) \times (7 \times 10^{5})$. Give your answer in scientific notation.`, a: R`$4 \times 7 = 28$ and $10^{3} \times 10^{5} = 10^{8}$, so $28 \times 10^{8}$. $28$ is too big, so write it as $2.8 \times 10^{1}$: the answer is $2.8 \times 10^{9}$.` },
  { q: R`Calculate $(9.6 \times 10^{-2}) \div (3.2 \times 10^{4})$.`, a: R`$9.6 \div 3.2 = 3$ and $10^{-2} \div 10^{4} = 10^{-6}$, so the answer is $3 \times 10^{-6}$.` },
  { q: R`Order from smallest to largest: $4.1 \times 10^{-3}$, $3.9 \times 10^{2}$, $8 \times 10^{-4}$, $1.2 \times 10^{2}$.`, a: R`Compare the powers first, then the numbers in front: $8 \times 10^{-4}$, $4.1 \times 10^{-3}$, $1.2 \times 10^{2}$, $3.9 \times 10^{2}$.` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Scientific notation", path: PATH }]}
      eyebrow="Maths explained · Years 9 and 10"
      h1="How to write numbers in scientific notation"
      lead="Scientific notation (also called standard form) writes a huge or tiny number as a number between 1 and 10 multiplied by a power of 10. Instead of counting the zeros in 0.000 000 52, you write 5.2 × 10⁻⁷. This page shows how to convert both ways, how to tell whether the power is positive or negative, how to round to significant figures, and how to multiply and divide, with a converter that shows the working."
      quickAnswer="Move the decimal point until there’s one non-zero digit in front of it. The number of places moved is the power of 10: positive if the original number was 10 or more, negative if it was less than 1. So 45 600 000 = 4.56 × 10⁷ and 0.000 072 = 7.2 × 10⁻⁵."
      toc={[
        ["form", "What it looks like"],
        ["large", "Large numbers"],
        ["small", "Small numbers"],
        ["calculator", "Converter"],
        ["back", "Back to ordinary numbers"],
        ["sigfigs", "Significant figures"],
        ["operations", "Multiplying and dividing"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a scientific notation question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_scientific_notation"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="Scientific notation: common questions"
      links={[
        { href: "/worksheets/year-9-scientific-notation", label: "Year 9 scientific notation worksheets" },
        { href: "/maths/index-laws", label: "Index laws explained" },
        { href: "/worksheets/year-7-rounding-estimation", label: "Rounding and estimation worksheets" },
        { href: "/year-9-maths-test", label: "Year 9 maths practice test" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Lost marks on a powers of 10 question?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="form" className="tb-section" aria-labelledby="h-form">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-form" className="tb-h2 pg-h2">What scientific notation looks like</h2>
          <div className="mx-formula"><MathMd md={R`$$a \times 10^{n}$$

where $1 \le a < 10$ and $n$ is an integer (a whole number, positive, negative or zero).`} /></div>
          <MathMd md={R`- $a$ is the **coefficient**. It has exactly one non-zero digit before the decimal point, so it's at least $1$ and less than $10$. $4.56$ and $7$ are fine; $45.6$ and $0.72$ are not.
- $n$ is the **power of 10**. It counts how many places the decimal point has moved.
- A **positive** power makes a big number: $10^{3} = 1000$.
- A **negative** power makes a small number: $10^{-3} = \dfrac{1}{1000} = 0.001$.

| Power of 10 | Value |
|---|---|
| $10^{4}$ | $10\,000$ |
| $10^{1}$ | $10$ |
| $10^{0}$ | $1$ |
| $10^{-1}$ | $0.1$ |
| $10^{-4}$ | $0.000\,1$ |`} />
        </div>
      </section>

      <section id="large" className="tb-section" aria-labelledby="h-large">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-large" className="tb-h2 pg-h2">Writing a large number in scientific notation</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`The average distance from Earth to the Sun is about $149\,600\,000$ km. Write this in scientific notation.

**1. Find the coefficient.** Put the point straight after the first digit and drop the zeros at the end: $a = 1.496$.

**2. Count the places.** The point starts at the end of $149\,600\,000$ and moves left past $8$ digits to sit after the $1$:

$$1\underbrace{49\,600\,000}_{8 \text{ places}}.$$

**3. Choose the sign of the power.** The original number is bigger than $10$, so the power is positive: $n = 8$.

$$149\,600\,000 = 1.496 \times 10^{8} \text{ km}$$`} />
          </div>
          <MathMd md={R`**Check:** $1.496 \times 10^{8}$ means $1.496 \times 100\,000\,000$, which moves the point $8$ places back to the right and gives $149\,600\,000$ ✓`} />
        </div>
      </section>

      <section id="small" className="tb-section" aria-labelledby="h-small">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-small" className="tb-h2 pg-h2">Writing a small number in scientific notation</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Write $0.000\,038$ in scientific notation.

**1. Find the coefficient.** The first non-zero digit is the $3$. Put the point after it and ignore the zeros in front: $a = 3.8$.

**2. Count the places.** The point moves right past $0$, $0$, $0$, $0$ and $3$ to sit after the $3$. That's $5$ places.

**3. Choose the sign of the power.** The original number is less than $1$, so the power is negative: $n = -5$.

$$0.000\,038 = 3.8 \times 10^{-5}$$`} />
          </div>
          <MathMd md={R`**Shortcut for small numbers:** the power is minus the position of the first non-zero digit after the point. In $0.000\,038$ the $3$ is in the 5th decimal place, so the power is $-5$. In $0.4$ the $4$ is in the 1st place, so $0.4 = 4 \times 10^{-1}$.`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Scientific notation converter</h2>
          <p className="pg-intro">Type an ordinary number to get it in scientific notation, with the option to round to significant figures. Switch the drop-down to go the other way. Spaces and commas in the number are fine. Every step is shown.</p>
          <SciNotationCalc placement="concept_scientific_notation_calc" />
        </div>
      </section>

      <section id="back" className="tb-section" aria-labelledby="h-back">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-back" className="tb-h2 pg-h2">Converting back to an ordinary number</h2>
          <MathMd md={R`Read the power as an instruction: a positive power moves the point to the **right** (the number gets bigger), and a negative power moves it to the **left** (the number gets smaller). Fill any empty places with zeros.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: a positive power</p>
            <MathMd md={R`Write $6.4 \times 10^{6}$ as an ordinary number.

The power is $6$, so move the point $6$ places to the right. There's one digit after the point already, so add $5$ zeros:

$$6.4 \times 10^{6} = 6\,400\,000$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: a negative power</p>
            <MathMd md={R`Write $2.05 \times 10^{-4}$ as an ordinary number.

The power is $-4$, so move the point $4$ places to the left. The $2$ ends up in the 4th decimal place, with $3$ zeros after the point in front of it:

$$2.05 \times 10^{-4} = 0.000\,205$$`} />
          </div>
          <MathMd md={R`**Sense check:** $10^{-4}$ is $0.000\,1$, so $2.05 \times 10^{-4}$ should be about twice that, and $0.000\,205$ is ✓`} />
        </div>
      </section>

      <section id="sigfigs" className="tb-section" aria-labelledby="h-sigfigs">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-sigfigs" className="tb-h2 pg-h2">Rounding to significant figures</h2>
          <MathMd md={R`Questions often say “correct to 3 significant figures”. In scientific notation that's easy to read: the significant figures are just the digits of the coefficient. Round the coefficient to that many digits.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`The speed of light is $299\,792\,458$ metres per second. Write it in scientific notation, correct to $3$ significant figures.

**1. Convert exactly:** $299\,792\,458 = 2.997\,924\,58 \times 10^{8}$.

**2. Round the coefficient to $3$ digits.** Keep $2.99$; the next digit is $7$, so round up. $2.99$ rounds up to $3.00$.

$$299\,792\,458 \approx 3.00 \times 10^{8} \text{ m/s}$$`} />
          </div>
          <MathMd md={R`Keep the zeros in $3.00$. They show the answer is accurate to $3$ significant figures, while $3 \times 10^{8}$ only claims $1$.

A small one: $0.004\,739$ to $2$ significant figures. The first two significant digits are $4$ and $7$, and the next is $3$, so round down: $4.7 \times 10^{-3}$. Zeros in front of the first non-zero digit never count as significant figures.`} />
        </div>
      </section>

      <section id="operations" className="tb-section" aria-labelledby="h-operations">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-operations" className="tb-h2 pg-h2">Multiplying and dividing in scientific notation</h2>
          <MathMd md={R`Deal with the coefficients and the powers of 10 separately. Use the index laws for the powers: add them when you multiply, subtract them when you divide. Then check the coefficient is still between $1$ and $10$.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: multiplying</p>
            <MathMd md={R`Calculate $(6 \times 10^{5}) \times (4 \times 10^{3})$.

**1. Multiply the coefficients:** $6 \times 4 = 24$

**2. Add the powers:** $10^{5} \times 10^{3} = 10^{5 + 3} = 10^{8}$

**3. Fix the coefficient.** $24 \times 10^{8}$ isn't in scientific notation, because $24 \ge 10$. Write $24 = 2.4 \times 10^{1}$:

$$24 \times 10^{8} = 2.4 \times 10^{1} \times 10^{8}$$
$$= 2.4 \times 10^{9}$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: dividing</p>
            <MathMd md={R`Calculate $(8.4 \times 10^{9}) \div (2.1 \times 10^{-3})$.

**1. Divide the coefficients:** $8.4 \div 2.1 = 4$

**2. Subtract the powers:** $10^{9} \div 10^{-3} = 10^{9 - (-3)} = 10^{12}$

**3. Put them together:** the coefficient $4$ is already between $1$ and $10$, so the answer is

$$4 \times 10^{12}$$

Dividing by a small number gives a bigger answer, and the power went up from $9$ to $12$ ✓`} />
          </div>
          <MathMd md={R`**On a calculator,** use the $\times 10^x$ or EXP key rather than typing $\times 10$ and then the power key, which can upset the order of operations in a division. A display of $4\text{E}12$ means $4 \times 10^{12}$. Write it out properly in your answer.`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Getting the sign of the power backwards.** $0.000\,62$ is a small number, so its power must be negative: $6.2 \times 10^{-4}$, not $6.2 \times 10^{4}$. Ask yourself whether the number is bigger than $10$ or less than $1$ before you write the sign.
- **A coefficient that's too big or too small.** $45.6 \times 10^{6}$ and $0.456 \times 10^{8}$ both equal $45\,600\,000$, but neither is scientific notation. Only $4.56 \times 10^{7}$ is.
- **Counting the zeros instead of the places.** $45\,600\,000$ has $5$ zeros, but the point moves $7$ places. Count every digit the point jumps over, not just the zeros.
- **Dropping zeros from the middle.** $60\,200 = 6.02 \times 10^{4}$, not $6.2 \times 10^{4}$. Only the zeros at the end (or at the start of a small number) disappear.
- **Multiplying the powers.** $10^{5} \times 10^{3} = 10^{8}$, not $10^{15}$. The index law says add.
- **Leaving the answer unfixed.** $24 \times 10^{8}$ is a correct value but not scientific notation. Finish the job: $2.4 \times 10^{9}$.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Work each one out before opening the answer. The first six convert one way or the other; the last four add rounding, operations and ordering.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Lost track of a power of 10? Find the step that slipped, then fix it for good." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Scientific notation by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-7-rounding-estimation", text: "Rounding and place value, the groundwork for significant figures." },
              { slug: "year-9-scientific-notation", text: "Converting very large and very small numbers, and calculating with them." },
              { slug: "year-10-index-laws", text: "Index laws with negative powers, which explain why scientific notation works." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

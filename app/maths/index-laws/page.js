import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";

// Concept page: index laws ("index laws" ~12,100 searches a month in
// Australia, plus "7 laws of indices" variants). Every example and
// practice answer was checked (Nov 2026).

const PATH = "/maths/index-laws";
const TITLE = "Index Laws Explained: All 7 Laws of Indices with Examples and Practice (Years 8 to 10) | Tuterly";
const DESCRIPTION =
  "The 7 index laws explained simply, with an example for each: multiplying and dividing powers, powers of powers, the zero index and negative indices, plus fractional indices for Year 10A. Worked examples and practice questions with answers.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const LAWS = [
  { name: "1. Multiplying: add the indices", rule: R`a^m \times a^n = a^{m+n}`, ex: R`x^4 \times x^3 = x^7 \qquad 2^3 \times 2^5 = 2^8 = 256` },
  { name: "2. Dividing: subtract the indices", rule: R`a^m \div a^n = a^{m-n}`, ex: R`y^9 \div y^4 = y^5 \qquad \frac{5^6}{5^4} = 5^2 = 25` },
  { name: "3. Power of a power: multiply the indices", rule: R`(a^m)^n = a^{mn}`, ex: R`(x^3)^4 = x^{12}` },
  { name: "4. Power of a product", rule: R`(ab)^n = a^n b^n`, ex: R`(2x)^3 = 2^3x^3 = 8x^3` },
  { name: "5. Power of a quotient", rule: R`\left(\frac{a}{b}\right)^n = \frac{a^n}{b^n}`, ex: R`\left(\frac{x}{3}\right)^2 = \frac{x^2}{9}` },
  { name: "6. The zero index", rule: R`a^0 = 1 \quad (a \neq 0)`, ex: R`5^0 = 1 \qquad (3x)^0 = 1 \qquad 3x^0 = 3` },
  { name: "7. Negative indices", rule: R`a^{-n} = \frac{1}{a^n}`, ex: R`2^{-3} = \frac{1}{8} \qquad x^{-2} = \frac{1}{x^2}` },
];

const FAQS = [
  { q: "What are the 7 index laws?", a: "Multiplying (add the indices), dividing (subtract them), power of a power (multiply them), power of a product, power of a quotient, the zero index (anything to the power 0 is 1) and negative indices (a to the power −n is 1 over a to the power n)." },
  { q: "Are indices the same as exponents and powers?", a: "Yes. Index, exponent and power all mean the small raised number. Australian schools usually say index (plural indices) or exponent." },
  { q: "Do the index laws work when adding?", a: "No. The laws are for multiplying and dividing powers with the same base. x² + x³ can't be simplified to a single power." },
  { q: "Why is anything to the power of zero equal to 1?", a: "Using the dividing law, a³ ÷ a³ = a⁰. But anything divided by itself is 1, so a⁰ = 1 (as long as a isn't 0)." },
  { q: "What year level learns index laws?", a: "In the Victorian Curriculum 2.0, index laws start in Year 8 with whole-number indices, extend in Year 9 to negative indices and scientific notation, and are used in Year 10 algebra. Year 10A adds fractional indices and surds." },
];

const PRACTICE = [
  { q: R`Simplify $a^5 \times a^6$`, a: R`$a^{11}$` },
  { q: R`Simplify $4x^3 \times 5x^2$`, a: R`Multiply the numbers and add the indices: $20x^5$` },
  { q: R`Simplify $m^{10} \div m^4$`, a: R`$m^6$` },
  { q: R`Simplify $18y^7 \div 6y^2$`, a: R`Divide the numbers and subtract the indices: $3y^5$` },
  { q: R`Simplify $(p^4)^3$`, a: R`$p^{12}$` },
  { q: R`Simplify $(2x^3)^4$`, a: R`$2^4 x^{12} = 16x^{12}$` },
  { q: R`Evaluate $7^0 + 4x^0$`, a: R`$1 + 4 \times 1 = 5$` },
  { q: R`Write $5^{-2}$ as a fraction`, a: R`$\dfrac{1}{5^2} = \dfrac{1}{25}$` },
  { q: R`Simplify $(3a^2b)^2 \div a^3b^4$, with positive indices`, a: R`$9a^4b^2 \div a^3b^4 = 9a^{1}b^{-2} = \dfrac{9a}{b^2}$` },
  { q: R`(Year 10A) Evaluate $27^{\frac{2}{3}}$`, a: R`$\left(\sqrt[3]{27}\right)^2 = 3^2 = 9$` },
];

const LINKS = [
  { href: "/maths/pythagoras-theorem", label: "Pythagoras' theorem explained" },
  { href: "/maths/sohcahtoa", label: "SOH CAH TOA explained" },
  { href: "/maths", label: "All maths topics explained" },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[
        { name: "Maths explained", path: "/maths" },
        { name: "Index laws", path: PATH },
      ]}
      eyebrow="Maths explained · Years 8 to 10"
      h1="Index laws: all 7 laws of indices, explained with examples"
      lead="Index laws are shortcuts for simplifying powers. There are seven to learn, and they all come from what a power means. Here’s each law with an example, the mistakes that cost marks, and practice questions with answers."
      quickAnswer="With the same base: when multiplying, add the indices (aᵐ × aⁿ = aᵐ⁺ⁿ); when dividing, subtract them (aᵐ ÷ aⁿ = aᵐ⁻ⁿ); for a power of a power, multiply them ((aᵐ)ⁿ = aᵐⁿ). Anything (except 0) to the power 0 is 1, and a negative index means one over: a⁻ⁿ = 1/aⁿ."
      toc={[
        ["meaning", "What an index means"],
        ["laws", "The 7 laws"],
        ["combined", "Combining the laws"],
        ["fractional", "Fractional indices"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on an index laws question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_index_laws"
      faqs={FAQS}
      faqTitle="Index laws: common questions"
      links={LINKS}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got an index laws question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="meaning" className="tb-section" aria-labelledby="h-meaning">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-meaning" className="tb-h2 pg-h2">What an index means</h2>
          <MathMd md={R`In $2^5$, the **base** is 2 and the **index** (or exponent, or power) is 5. It means multiply 2 by itself 5 times:

$$2^5 = 2 \times 2 \times 2 \times 2 \times 2 = 32$$

Every index law comes from this. If you forget one in a test, write the powers out in full and you'll see the pattern.`} />
        </div>
      </section>

      <section id="laws" className="tb-section" aria-labelledby="h-laws">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-laws" className="tb-h2 pg-h2">The 7 index laws</h2>
          <p className="pg-intro">Laws 1 to 3 only work when the bases are the same.</p>
          {LAWS.map((l) => (
            <div key={l.name} className="mx-example">
              <p className="mx-example__k">{l.name}</p>
              <MathMd md={`$$${l.rule}$$\n\nExample: $${l.ex}$`} />
            </div>
          ))}
        </div>
      </section>

      <section id="combined" className="tb-section" aria-labelledby="h-combined">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-combined" className="tb-h2 pg-h2">Combining the laws</h2>
          <p className="pg-intro">Deal with the numbers (coefficients) and each letter separately, one law at a time.</p>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Simplify $(3x^2y^3)^2 \times 2xy^{-1}$.

Power of a product, then power of a power:
$$(3x^2y^3)^2 = 9x^4y^6$$
Multiply: numbers $9 \times 2 = 18$, add the indices on each letter:
$$9x^4y^6 \times 2xy^{-1} = 18x^{5}y^{5}$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Simplify $\dfrac{12a^5b^2}{4a^2b^5}$ and write the answer with positive indices.

$$\frac{12}{4} = 3, \quad a^{5-2} = a^3, \quad b^{2-5} = b^{-3}$$
$$3a^3b^{-3} = \frac{3a^3}{b^3}$$`} />
          </div>
        </div>
      </section>

      <section id="fractional" className="tb-section" aria-labelledby="h-frac">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-frac" className="tb-h2 pg-h2">Fractional indices (Year 10A)</h2>
          <MathMd md={R`A fractional index means a root: the bottom number is the root, the top is the power.

$$a^{\frac{1}{n}} = \sqrt[n]{a} \qquad a^{\frac{m}{n}} = \left(\sqrt[n]{a}\right)^m$$

For example, $8^{\frac{2}{3}} = \left(\sqrt[3]{8}\right)^2 = 2^2 = 4$, and $16^{\frac{3}{4}} = \left(\sqrt[4]{16}\right)^3 = 2^3 = 8$. Take the root first so the numbers stay small.`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes that cost marks</h2>
          <ul className="pg-checklist">
            <li><strong>Adding the coefficients.</strong>{" "}2x³ × 3x⁴ = 6x⁷: multiply the numbers, add the indices.</li>
            <li><strong>Multiplying indices when multiplying powers.</strong>{" "}x³ × x⁴ is x⁷, not x¹².</li>
            <li><strong>Using the laws on addition.</strong>{" "}x³ + x² can’t be simplified to x⁵.</li>
            <li><strong>The zero index on the wrong part.</strong>{" "}3x⁰ = 3 × 1 = 3, but (3x)⁰ = 1.</li>
            <li><strong>Thinking a negative index makes it negative.</strong>{" "}2⁻³ is 1/8, a positive number.</li>
            <li><strong>Forgetting to raise the number.</strong>{" "}(2x)³ = 8x³, not 2x³.</li>
          </ul>
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer.</p>
          <Practice items={PRACTICE} />
          <p className="pg-small">
            Want more? Each year level below has a free printable PDF of 10 questions with answers, and a full 20-question test.
          </p>
        </div>
      </section>

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Index laws by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-8-exponents", text: "Index notation and the first index laws with whole-number indices." },
              { slug: "year-9-exponent-laws", text: "All the index laws with variables, including the zero and negative indices." },
              { slug: "year-9-scientific-notation", text: "Using powers of 10 to write very large and very small numbers." },
              { slug: "year-10-index-laws", text: "Index laws in algebra: simplifying and expanding expressions." },
              { slug: "year-10a-surds", text: "Fractional indices and surds." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

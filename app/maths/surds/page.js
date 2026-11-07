import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";

// Concept page: surds ("surds" ~4,400 searches a month in Australia).
// Every example and practice answer was checked numerically (Nov 2026).

const PATH = "/maths/surds";
const TITLE = "Surds Explained: Simplifying, Adding, Multiplying and Rationalising, with Examples (Years 9 to 10A) | Tuterly";
const DESCRIPTION =
  "Surds explained simply: what a surd is, how to simplify surds like √72, add and subtract like surds, multiply and divide them, expand brackets and rationalise the denominator. Worked examples and practice questions with answers.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is a surd?", a: "A surd is a root that can't be simplified to a whole number or fraction, like √2, √5 or ∛7. Its decimal goes on forever without repeating, so it's irrational. √9 isn't a surd, because it equals 3." },
  { q: "How do you simplify a surd?", a: "Find the largest perfect square that divides the number under the root, split the root, and take the square root of that part. For example √72 = √(36 × 2) = 6√2." },
  { q: "Can you add √2 and √3?", a: "No. You can only add or subtract like surds, which have the same number under the root. √2 + √3 stays as it is, but 3√5 + 2√5 = 5√5." },
  { q: "Why do we rationalise the denominator?", a: "It's the convention for a final answer, and it makes surd answers easier to compare and add. Multiply the top and bottom by the surd in the denominator (or by the conjugate, in Year 10A)." },
  { q: "What year level learns surds?", a: "Students meet irrational numbers around Year 9. Working with surds (simplifying, operations and rationalising) is mainly a Year 10A topic in the Victorian Curriculum 2.0, ready for senior Methods maths." },
];

const PRACTICE = [
  { q: R`Simplify $\sqrt{45}$`, a: R`$\sqrt{9 \times 5} = 3\sqrt{5}$` },
  { q: R`Simplify $\sqrt{98}$`, a: R`$\sqrt{49 \times 2} = 7\sqrt{2}$` },
  { q: R`Simplify $2\sqrt{18}$`, a: R`$2 \times 3\sqrt{2} = 6\sqrt{2}$` },
  { q: R`Simplify $4\sqrt{3} + \sqrt{75}$`, a: R`$\sqrt{75} = 5\sqrt{3}$, so $4\sqrt{3} + 5\sqrt{3} = 9\sqrt{3}$` },
  { q: R`Simplify $\sqrt{8} \times \sqrt{6}$`, a: R`$\sqrt{48} = \sqrt{16 \times 3} = 4\sqrt{3}$` },
  { q: R`Simplify $3\sqrt{2} \times 5\sqrt{6}$`, a: R`$15\sqrt{12} = 15 \times 2\sqrt{3} = 30\sqrt{3}$` },
  { q: R`Simplify $\dfrac{\sqrt{80}}{\sqrt{5}}$`, a: R`$\sqrt{\dfrac{80}{5}} = \sqrt{16} = 4$` },
  { q: R`Expand $\sqrt{3}(\sqrt{3} + 4)$`, a: R`$3 + 4\sqrt{3}$` },
  { q: R`Expand $(2 + \sqrt{5})^2$`, a: R`$4 + 4\sqrt{5} + 5 = 9 + 4\sqrt{5}$` },
  { q: R`Rationalise $\dfrac{8}{\sqrt{2}}$`, a: R`$\dfrac{8\sqrt{2}}{2} = 4\sqrt{2}$` },
  { q: R`(Year 10A) Rationalise $\dfrac{4}{\sqrt{5} - 1}$`, a: R`Multiply by the conjugate: $\dfrac{4(\sqrt{5} + 1)}{5 - 1} = \sqrt{5} + 1$` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Surds", path: PATH }]}
      eyebrow="Maths explained · Years 9 to 10A"
      h1="Surds: how to simplify, add, multiply and rationalise them"
      lead="Surds look harder than they are. Almost every surd question comes down to one move: pulling the largest square number out from under the root. Here’s each skill with a worked example, the mistakes that cost marks, and practice questions with answers."
      quickAnswer="A surd is a root that can’t be simplified to a whole number, like √2. To simplify one, take out the largest square factor: √72 = √(36 × 2) = 6√2. You can only add like surds (3√5 + 2√5 = 5√5). Multiply by multiplying under the roots: √3 × √12 = √36 = 6. To rationalise, multiply the top and bottom by the surd in the denominator."
      toc={[
        ["what", "What a surd is"],
        ["simplify", "Simplifying"],
        ["add", "Adding and subtracting"],
        ["multiply", "Multiplying and dividing"],
        ["expand", "Expanding brackets"],
        ["rationalise", "Rationalising"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a surds question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_surds"
      faqs={FAQS}
      faqTitle="Surds: common questions"
      links={[
        { href: "/maths/index-laws", label: "Index laws explained" },
        { href: "/calculators/quadratic-formula", label: "Quadratic formula calculator (answers in surd form)" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got a surds question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="what" className="tb-section" aria-labelledby="h-what">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-what" className="tb-h2 pg-h2">What a surd is</h2>
          <MathMd md={R`A **surd** is a root that can't be written as a whole number or fraction, like $\sqrt{2}$, $\sqrt{5}$ or $\sqrt[3]{7}$. Its decimal never ends or repeats ($\sqrt{2} = 1.41421356\ldots$), so we keep it in surd form to stay exact.

$\sqrt{9}$ and $\sqrt{25}$ are **not** surds, because they equal 3 and 5.

Two rules do almost all the work:
$$\sqrt{a} \times \sqrt{b} = \sqrt{ab}$$
$$\frac{\sqrt{a}}{\sqrt{b}} = \sqrt{\frac{a}{b}}$$`} />
        </div>
      </section>

      <section id="simplify" className="tb-section" aria-labelledby="h-simplify">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-simplify" className="tb-h2 pg-h2">Simplifying surds</h2>
          <p className="pg-intro">Find the <strong>largest</strong>{" "}square number that goes into the number under the root: 4, 9, 16, 25, 36, 49, 64, 81, 100.</p>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Simplify $\sqrt{72}$.

$$\sqrt{72} = \sqrt{36 \times 2}$$
$$= \sqrt{36} \times \sqrt{2} = 6\sqrt{2}$$

More: $\sqrt{50} = 5\sqrt{2}$, $\sqrt{48} = 4\sqrt{3}$, and $3\sqrt{20} = 3 \times 2\sqrt{5} = 6\sqrt{5}$.`} />
          </div>
        </div>
      </section>

      <section id="add" className="tb-section" aria-labelledby="h-add">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-add" className="tb-h2 pg-h2">Adding and subtracting surds</h2>
          <MathMd md={R`Only **like surds** (the same number under the root) can be added or subtracted. Treat the surd like a letter: $3\sqrt{5} + 2\sqrt{5} = 5\sqrt{5}$, just as $3x + 2x = 5x$.

Simplify first, and unlike surds often become like ones:`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Simplify $\sqrt{12} + \sqrt{27}$.

$$\sqrt{12} = 2\sqrt{3}, \qquad \sqrt{27} = 3\sqrt{3}$$
$$2\sqrt{3} + 3\sqrt{3} = 5\sqrt{3}$$`} />
          </div>
          <MathMd md={R`$\sqrt{2} + \sqrt{3}$ can't be simplified. Leave it as it is.`} />
        </div>
      </section>

      <section id="multiply" className="tb-section" aria-labelledby="h-multiply">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-multiply" className="tb-h2 pg-h2">Multiplying and dividing surds</h2>
          <MathMd md={R`Multiply the numbers outside together and the numbers inside together, then simplify.

- $\sqrt{3} \times \sqrt{12} = \sqrt{36} = 6$
- $2\sqrt{5} \times 3\sqrt{2} = 6\sqrt{10}$
- $\sqrt{7} \times \sqrt{7} = 7$, so $(\sqrt{7})^2 = 7$
- $\dfrac{\sqrt{50}}{\sqrt{2}} = \sqrt{25} = 5$`} />
        </div>
      </section>

      <section id="expand" className="tb-section" aria-labelledby="h-expand">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-expand" className="tb-h2 pg-h2">Expanding brackets with surds</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Expand $(\sqrt{5} + 2)(\sqrt{5} - 3)$.

$$= 5 - 3\sqrt{5} + 2\sqrt{5} - 6$$
$$= -1 - \sqrt{5}$$`} />
          </div>
          <MathMd md={R`**Difference of squares:** $(\sqrt{3} + 1)(\sqrt{3} - 1) = 3 - 1 = 2$. The surds disappear, which is the idea behind rationalising with a conjugate.`} />
        </div>
      </section>

      <section id="rationalise" className="tb-section" aria-labelledby="h-rationalise">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-rationalise" className="tb-h2 pg-h2">Rationalising the denominator</h2>
          <MathMd md={R`Multiply the top and bottom by the surd in the denominator, so the bottom becomes a whole number.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Rationalise $\dfrac{6}{\sqrt{3}}$.

$$\frac{6}{\sqrt{3}} \times \frac{\sqrt{3}}{\sqrt{3}} = \frac{6\sqrt{3}}{3}$$
$$= 2\sqrt{3}$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Year 10A: using the conjugate</p>
            <MathMd md={R`Rationalise $\dfrac{1}{\sqrt{3} + 1}$. Multiply by the conjugate $\sqrt{3} - 1$:

$$\frac{1}{\sqrt{3} + 1} \times \frac{\sqrt{3} - 1}{\sqrt{3} - 1}$$
$$= \frac{\sqrt{3} - 1}{3 - 1} = \frac{\sqrt{3} - 1}{2}$$`} />
          </div>
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes that cost marks</h2>
          <ul className="pg-checklist">
            <li><strong>Splitting a sum.</strong>{" "}√(9 + 16) = √25 = 5, not √9 + √16 = 7.</li>
            <li><strong>Adding unlike surds.</strong>{" "}√2 + √3 is not √5.</li>
            <li><strong>Not simplifying fully.</strong>{" "}√72 = 2√18 isn’t finished: use the largest square, 36, to get 6√2.</li>
            <li><strong>Rationalising only the bottom.</strong>{" "}Whatever you multiply the denominator by, multiply the numerator by too.</li>
            <li><strong>Squaring a bracket term by term.</strong>{" "}(2 + √5)² = 9 + 4√5, not 4 + 5.</li>
          </ul>
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
          <h2 id="h-years" className="tb-h2 pg-h2">Surds by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks rows={[{ slug: "year-10a-surds", text: "Simplifying surds, operations, rationalising denominators and fractional indices, ready for senior Methods." }]} />
        </div>
      </section>
    </GuideShell>
  );
}

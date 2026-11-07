import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import YearLinks from "@/components/maths/YearLinks";
import QuadraticCalc from "@/components/maths/QuadraticCalc";

// Calculator page: quadratic formula ("quadratic formula calculator"
// ~1,900 searches a month, "how to solve quadratic equations" ~880).
// Exact answers (fractions and simplified surds) plus decimals (Nov 2026).

const PATH = "/calculators/quadratic-formula";
const TITLE = "Quadratic Formula Calculator with Steps: Exact Answers and Decimals (Years 10 and 10A) | Tuterly";
const DESCRIPTION =
  "Free quadratic formula calculator that shows every step: a, b and c, the discriminant, and the solutions in exact form (simplified surds) and as decimals. With an explanation of the quadratic formula and the discriminant.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is the quadratic formula?", a: "For ax² + bx + c = 0, the solutions are x = (−b ± √(b² − 4ac)) ÷ 2a." },
  { q: "What does the discriminant tell you?", a: "Δ = b² − 4ac. If it's positive there are two solutions, if it's 0 there's one, and if it's negative there are no real solutions." },
  { q: "When should I use the quadratic formula instead of factorising?", a: "When the quadratic doesn't factorise neatly, or you can't spot the factors quickly. It always works, so it's a safe fallback." },
  { q: "Why does it give a surd answer?", a: "When the discriminant isn't a perfect square, the exact answer contains a surd. Leave it in that form unless the question asks for decimals." },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Quadratic formula calculator", path: PATH }]}
      eyebrow="Free calculator · Years 10 and 10A"
      h1="Quadratic formula calculator, with the working out"
      lead="Enter a, b and c from ax² + bx + c = 0. You’ll get the discriminant and the solutions, in exact form and as decimals, with every step set out the way your teacher wants to see it."
      toc={[["calc", "Calculator"], ["formula", "The formula"], ["discriminant", "The discriminant"], ["years", "By year level"], ["faq", "FAQ"]]}
      ctaTitle="Got it wrong in homework?"
      ctaText="Snap the question. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own."
      placement="calc_quadratic"
      faqs={FAQS}
      faqTitle="Quadratic formula: questions"
      links={[
        { href: "/maths/surds", label: "Surds explained (simplifying surd answers)" },
        { href: "/maths/simultaneous-equations", label: "Simultaneous equations explained" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Practise until you don’t need the calculator"
      finalText="Tuterly saves the questions you get wrong, shows the working, and gives fresh questions on the same skill until it’s mastered."
    >
      <section id="calc" className="tb-section" aria-labelledby="h-calc">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calc" className="tb-h2 pg-h2">Solve a quadratic equation</h2>
          <QuadraticCalc placement="calc_quadratic_page" />
        </div>
      </section>
      <section id="formula" className="tb-section" aria-labelledby="h-formula">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-formula" className="tb-h2 pg-h2">The quadratic formula</h2>
          <div className="mx-formula"><MathMd md={R`$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$`} /></div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Solve $2x^2 - 4x - 3 = 0$. Here $a = 2$, $b = -4$, $c = -3$.

$$\Delta = (-4)^2 - 4(2)(-3)$$
$$= 16 + 24 = 40$$
$$x = \frac{4 \pm \sqrt{40}}{4} = \frac{4 \pm 2\sqrt{10}}{4}$$
$$= \frac{2 \pm \sqrt{10}}{2}$$
$$x \approx 2.58 \text{ or } x \approx -0.58$$`} />
          </div>
          <p className="pg-small">Simplifying the surd is the step most students miss. See <Link href="/maths/surds">surds explained</Link>.</p>
        </div>
      </section>
      <section id="discriminant" className="tb-section" aria-labelledby="h-disc">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-disc" className="tb-h2 pg-h2">The discriminant: how many solutions?</h2>
          <MathMd md={R`| $\Delta = b^2 - 4ac$ | Solutions | Example |
|---|---|---|
| Positive | Two | $x^2 + 5x + 6 = 0$: $\Delta = 1$, $x = -2$ or $-3$ |
| Zero | One | $x^2 - 6x + 9 = 0$: $\Delta = 0$, $x = 3$ |
| Negative | None (real) | $x^2 + 2x + 5 = 0$: $\Delta = -16$ |

If $\Delta$ is a perfect square, the quadratic factorises, so factorising may be quicker.`} />
        </div>
      </section>
      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">By year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-10-quadratic-equations", text: "Solving quadratics: factorising, the null factor law and the quadratic formula." },
              { slug: "year-10a-non-monic-quadratics", text: "Quadratics where a isn't 1, ready for senior Methods." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

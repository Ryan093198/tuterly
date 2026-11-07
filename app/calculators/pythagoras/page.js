import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import PythagorasCalc from "@/components/maths/PythagorasCalc";
import MathMd from "@/components/maths/MathMd";

// Calculator page ("pythagoras calculator" ~4,400 a month, "pythagorean
// theorem calculator" ~3,600). The tool comes first; the explanation is
// on /maths/pythagoras-theorem.

const PATH = "/calculators/pythagoras";
const TITLE = "Pythagoras Calculator with Working Out: Find the Hypotenuse or a Missing Side | Tuterly";
const DESCRIPTION =
  "Free Pythagoras calculator that shows every step of the working. Enter any two sides of a right-angled triangle to find the hypotenuse or a missing shorter side, set out the way teachers mark it.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "How do I find the hypotenuse?", a: "Enter the two shorter sides and leave the hypotenuse blank. The calculator squares them, adds them and takes the square root, showing each step." },
  { q: "How do I find a missing shorter side?", a: "Enter the hypotenuse and the side you know, and leave the other blank. It squares the hypotenuse, subtracts the square of the known side and takes the square root." },
  { q: "Why does it say the hypotenuse must be the longest side?", a: "The hypotenuse is opposite the right angle and is always the longest side. If the number you entered as the hypotenuse is shorter than another side, it's probably in the wrong box." },
  { q: "Does it round the answer?", a: "If the answer is a whole number it shows it exactly. Otherwise it shows the exact square root and the answer rounded to 2 decimal places, which is what most questions ask for." },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[
        { name: "Maths explained", path: "/maths" },
        { name: "Pythagoras calculator", path: PATH },
      ]}
      eyebrow="Free calculator · Years 8 to 10"
      h1="Pythagoras calculator, with the working out"
      lead="Enter any two sides of a right-angled triangle. You’ll get the missing side and every step of the working, set out the way your teacher wants to see it."
      toc={[["calc", "Calculator"], ["how", "How it works"], ["faq", "FAQ"]]}
      ctaTitle="Got it wrong in homework?"
      ctaText="Snap the question. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own."
      placement="calc_pythagoras"
      faqs={FAQS}
      faqTitle="Pythagoras calculator: questions"
      links={[
        { href: "/maths/pythagoras-theorem", label: "Pythagoras' theorem explained, with practice questions" },
        { href: "/calculators/trigonometry", label: "Trigonometry calculator (SOH CAH TOA)" },
        { href: "/worksheets/year-8-pythagoras", label: "Year 8 Pythagoras worksheets" },
        { href: "/worksheets/year-9-pythagoras", label: "Year 9 Pythagoras worksheets" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Practise until you don’t need the calculator"
      finalText="Tuterly saves the questions you get wrong, shows the working, and gives fresh questions on the same skill until it’s mastered."
    >
      <section id="calc" className="tb-section" aria-labelledby="h-calc">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calc" className="tb-h2 pg-h2">Find a missing side</h2>
          <PythagorasCalc placement="calc_pythagoras_page" />
        </div>
      </section>
      <section id="how" className="tb-section" aria-labelledby="h-how">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-how" className="tb-h2 pg-h2">How it works</h2>
          <MathMd md={R`It uses Pythagoras' theorem, $a^2 + b^2 = c^2$, where $c$ is the hypotenuse.

- **Finding the hypotenuse:** $c = \sqrt{a^2 + b^2}$
- **Finding a shorter side:** $a = \sqrt{c^2 - b^2}$

It only works for right-angled triangles. If the question involves an angle, use the [trigonometry calculator](/calculators/trigonometry) instead.`} />
          <p className="pg-small">Learning the method? Read <Link href="/maths/pythagoras-theorem">Pythagoras’ theorem explained</Link>, with worked examples and practice questions.</p>
        </div>
      </section>
    </GuideShell>
  );
}

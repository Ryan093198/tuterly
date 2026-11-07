import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import TrigCalc from "@/components/maths/TrigCalc";
import MathMd from "@/components/maths/MathMd";

// Calculator page ("trigonometry calculator" ~6,600 a month, "trig
// calculator" ~6,600, "sin cos tan calculator" variants ~1,900, "sohcahtoa
// calculator" 320). The explanation is on /maths/sohcahtoa.

const PATH = "/calculators/trigonometry";
const TITLE = "Trigonometry Calculator with Steps: Find a Missing Side or Angle (SOH CAH TOA) | Tuterly";
const DESCRIPTION =
  "Free right-angled triangle trigonometry calculator that shows the working. Find a missing side from an angle and a side, or find an angle from two sides, using sin, cos and tan (SOH CAH TOA).";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "How do I find a missing side?", a: "Choose 'Find a side', enter the angle, the side you know and its length, and the side you want. The calculator picks sin, cos or tan for you and shows each step." },
  { q: "How do I find a missing angle?", a: "Choose 'Find an angle' and enter two sides. It works out the ratio and uses the inverse (sin⁻¹, cos⁻¹ or tan⁻¹), giving the angle to 1 decimal place." },
  { q: "Does it use degrees or radians?", a: "Degrees, which is what Australian school questions use up to Year 10." },
  { q: "Does it work for triangles without a right angle?", a: "No. SOH CAH TOA is for right-angled triangles. For other triangles you need the sine rule or cosine rule (Year 10A)." },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[
        { name: "Maths explained", path: "/maths" },
        { name: "Trigonometry calculator", path: PATH },
      ]}
      eyebrow="Free calculator · Years 9 and 10"
      h1="Trigonometry calculator, with the working out"
      lead="Find a missing side or angle in a right-angled triangle. It picks sin, cos or tan for you and shows every step, set out the way your teacher wants to see it."
      toc={[["calc", "Calculator"], ["how", "How it works"], ["faq", "FAQ"]]}
      ctaTitle="Got it wrong in homework?"
      ctaText="Snap the question. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own."
      placement="calc_trig"
      faqs={FAQS}
      faqTitle="Trigonometry calculator: questions"
      links={[
        { href: "/maths/sohcahtoa", label: "SOH CAH TOA explained, with practice questions" },
        { href: "/calculators/pythagoras", label: "Pythagoras calculator" },
        { href: "/worksheets/year-9-trigonometry", label: "Year 9 trigonometry worksheets" },
        { href: "/worksheets/year-10-trigonometry", label: "Year 10 trigonometry worksheets" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Practise until you don’t need the calculator"
      finalText="Tuterly saves the questions you get wrong, shows the working, and gives fresh questions on the same skill until it’s mastered."
    >
      <section id="calc" className="tb-section" aria-labelledby="h-calc">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calc" className="tb-h2 pg-h2">Find a side or an angle</h2>
          <TrigCalc placement="calc_trig_page" />
        </div>
      </section>
      <section id="how" className="tb-section" aria-labelledby="h-how">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-how" className="tb-h2 pg-h2">How it works</h2>
          <MathMd md={R`It labels the sides from your angle and picks the ratio that uses the two sides involved:

| Sides | Ratio |
|---|---|
| Opposite and hypotenuse | $\sin\theta = \dfrac{\text{O}}{\text{H}}$ (SOH) |
| Adjacent and hypotenuse | $\cos\theta = \dfrac{\text{A}}{\text{H}}$ (CAH) |
| Opposite and adjacent | $\tan\theta = \dfrac{\text{O}}{\text{A}}$ (TOA) |

Sides are rounded to 2 decimal places and angles to 1, as most questions ask.`} />
          <p className="pg-small">Learning the method? Read <Link href="/maths/sohcahtoa">SOH CAH TOA explained</Link>, with worked examples and practice questions.</p>
        </div>
      </section>
    </GuideShell>
  );
}

import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import TrigCalc from "@/components/maths/TrigCalc";

// Concept page: SOH CAH TOA / right-angled trigonometry ("sohcahtoa" ~8,100
// searches a month in Australia; "finding an angle trigonometry" variants
// ~600). Every number in the examples and practice was checked (Nov 2026).

const PATH = "/maths/sohcahtoa";
const TITLE = "SOH CAH TOA Explained: Find Missing Sides and Angles, with Examples (Years 9 and 10) | Tuterly";
const DESCRIPTION =
  "SOH CAH TOA explained simply: how to label the opposite, adjacent and hypotenuse, which ratio to use, how to find a missing side or angle, angles of elevation, worked examples and practice questions with answers.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What does SOH CAH TOA stand for?", a: "Sine = Opposite ÷ Hypotenuse, Cosine = Adjacent ÷ Hypotenuse, Tangent = Opposite ÷ Adjacent. It's a way to remember the three trigonometric ratios for right-angled triangles." },
  { q: "How do I know whether to use sin, cos or tan?", a: "Label the sides from the angle you're using, then look at which two sides are involved (the one you know and the one you want). Opposite and hypotenuse: sin. Adjacent and hypotenuse: cos. Opposite and adjacent: tan." },
  { q: "Why is my calculator giving the wrong answer?", a: "It's probably in radians mode. Australian school questions use degrees, so check the screen shows D or DEG." },
  { q: "When do I use Pythagoras instead of trigonometry?", a: "If the question involves only sides (two known, one to find), use Pythagoras. If it involves an angle, either known or to find, use trigonometry." },
  { q: "What year level learns SOH CAH TOA?", a: "In the Victorian Curriculum 2.0 it's introduced in Year 9 and applied in Year 10, including angles of elevation and depression and bearings. Year 10A adds the sine and cosine rules and 3D problems." },
];

const PRACTICE = [
  { q: R`The angle is $50^\circ$ and the hypotenuse is 20 cm. Find the opposite side, to 2 decimal places.`, a: R`$\sin 50^\circ = \dfrac{x}{20}$, so $x = 20 \sin 50^\circ \approx 15.32$ cm.` },
  { q: R`The angle is $25^\circ$ and the adjacent side is 14 m. Find the opposite side, to 2 decimal places.`, a: R`$\tan 25^\circ = \dfrac{x}{14}$, so $x = 14 \tan 25^\circ \approx 6.53$ m.` },
  { q: R`The angle is $70^\circ$ and the opposite side is 8 cm. Find the hypotenuse, to 2 decimal places.`, a: R`$\sin 70^\circ = \dfrac{8}{x}$, so $x = \dfrac{8}{\sin 70^\circ} \approx 8.51$ cm.` },
  { q: R`The opposite side is 5 and the hypotenuse is 13. Find the angle, to 1 decimal place.`, a: R`$\sin\theta = \dfrac{5}{13}$, so $\theta = \sin^{-1}\left(\dfrac{5}{13}\right) \approx 22.6^\circ$.` },
  { q: R`The adjacent side is 12 and the hypotenuse is 15. Find the angle, to 1 decimal place.`, a: R`$\cos\theta = \dfrac{12}{15} = 0.8$, so $\theta = \cos^{-1}(0.8) \approx 36.9^\circ$.` },
  { q: R`A ramp rises 1.2 m over a horizontal distance of 6 m. What angle does it make with the ground, to 1 decimal place?`, a: R`$\tan\theta = \dfrac{1.2}{6} = 0.2$, so $\theta = \tan^{-1}(0.2) \approx 11.3^\circ$.` },
];

const LINKS = [
  { href: "/calculators/trigonometry", label: "Trigonometry calculator with working out" },
  { href: "/maths/pythagoras-theorem", label: "Pythagoras' theorem explained" },
  { href: "/maths/index-laws", label: "Index laws explained" },
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
        { name: "SOH CAH TOA", path: PATH },
      ]}
      eyebrow="Maths explained · Years 9 and 10"
      h1="SOH CAH TOA: how to find missing sides and angles"
      lead="SOH CAH TOA is how you remember the three trigonometric ratios. Once you can label a triangle’s sides and pick the right ratio, every right-angled trigonometry question follows the same few steps. Here they are, with worked examples and practice."
      quickAnswer="SOH: sin θ = opposite ÷ hypotenuse. CAH: cos θ = adjacent ÷ hypotenuse. TOA: tan θ = opposite ÷ adjacent. Label the sides from the angle, pick the ratio that uses the side you know and the side you want, substitute, then solve. To find an angle, use the inverse (sin⁻¹, cos⁻¹ or tan⁻¹), with your calculator in degrees."
      toc={[
        ["label", "Label the sides"],
        ["ratios", "The three ratios"],
        ["calculator", "Calculator"],
        ["side", "Finding a side"],
        ["angle", "Finding an angle"],
        ["elevation", "Elevation and depression"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a trig question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_sohcahtoa"
      faqs={FAQS}
      faqTitle="SOH CAH TOA: common questions"
      links={LINKS}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got a trig question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="label" className="tb-section" aria-labelledby="h-label">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-label" className="tb-h2 pg-h2">Step 1: label the sides from the angle</h2>
          <MathMd md={R`Always label from the angle you're using, $\theta$ (not the right angle):

- **Hypotenuse (H):** the longest side, opposite the right angle. It never changes.
- **Opposite (O):** the side across from $\theta$. It doesn't touch the angle.
- **Adjacent (A):** the side next to $\theta$ that isn't the hypotenuse.

If you use the other angle in the triangle, the opposite and adjacent swap.`} />
        </div>
      </section>

      <section id="ratios" className="tb-section" aria-labelledby="h-ratios">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-ratios" className="tb-h2 pg-h2">Step 2: pick the ratio</h2>
          <div className="mx-formula">
            <MathMd md={R`$$\sin\theta = \frac{\text{O}}{\text{H}}$$
$$\cos\theta = \frac{\text{A}}{\text{H}}$$
$$\tan\theta = \frac{\text{O}}{\text{A}}$$`} />
          </div>
          <MathMd md={R`| You know or want | Use | Remember |
|---|---|---|
| Opposite and hypotenuse | $\sin$ | **SOH** |
| Adjacent and hypotenuse | $\cos$ | **CAH** |
| Opposite and adjacent | $\tan$ | **TOA** |

Look at the two sides in the question (the one you know and the one you want) and find the row that has both.`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Trigonometry calculator (with working)</h2>
          <p className="pg-intro">Find a side or an angle. You’ll get every step, set out the way your teacher wants to see it.</p>
          <TrigCalc placement="concept_sohcahtoa_calc" />
        </div>
      </section>

      <section id="side" className="tb-section" aria-labelledby="h-side">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-side" className="tb-h2 pg-h2">Step 3: finding a missing side</h2>
          <p className="pg-intro">If the unknown is on top of the fraction, multiply. If it’s on the bottom, divide.</p>
          <div className="mx-example">
            <p className="mx-example__k">Unknown on top</p>
            <MathMd md={R`The angle is $35^\circ$ and the hypotenuse is 12 cm. Find the opposite side.

Opposite and hypotenuse, so SOH:
$$\sin 35^\circ = \frac{x}{12}$$
$$x = 12 \times \sin 35^\circ \approx 6.88 \text{ cm}$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Unknown on the bottom</p>
            <MathMd md={R`The angle is $40^\circ$ and the opposite side is 9 m. Find the adjacent side.

Opposite and adjacent, so TOA:
$$\tan 40^\circ = \frac{9}{x}$$
$$x = \frac{9}{\tan 40^\circ} \approx 10.73 \text{ m}$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Finding the hypotenuse</p>
            <MathMd md={R`The angle is $62^\circ$ and the adjacent side is 5 cm. Find the hypotenuse.

Adjacent and hypotenuse, so CAH:
$$\cos 62^\circ = \frac{5}{x}$$
$$x = \frac{5}{\cos 62^\circ} \approx 10.65 \text{ cm}$$`} />
          </div>
        </div>
      </section>

      <section id="angle" className="tb-section" aria-labelledby="h-angle">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-angle" className="tb-h2 pg-h2">Finding a missing angle</h2>
          <p className="pg-intro">With two sides, write the ratio as a fraction, then use the inverse key (shift, then sin, cos or tan).</p>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`The opposite side is 7 and the adjacent side is 10. Find the angle.

$$\tan\theta = \frac{7}{10}$$
$$\theta = \tan^{-1}(0.7) \approx 35.0^\circ$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`The opposite side is 4 and the hypotenuse is 9. Find the angle.

$$\sin\theta = \frac{4}{9}$$
$$\theta = \sin^{-1}\left(\frac{4}{9}\right) \approx 26.4^\circ$$`} />
          </div>
        </div>
      </section>

      <section id="elevation" className="tb-section" aria-labelledby="h-elev">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-elev" className="tb-h2 pg-h2">Angles of elevation and depression (Year 10)</h2>
          <MathMd md={R`The **angle of elevation** is measured up from the horizontal; the **angle of depression** is measured down from the horizontal. Draw the horizontal line first, then the right-angled triangle.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`From 30 m away, the angle of elevation to the top of a tree is $28^\circ$. How tall is the tree?

The height is opposite the angle and the 30 m is adjacent, so TOA:
$$\tan 28^\circ = \frac{h}{30}$$
$$h = 30 \tan 28^\circ \approx 15.95 \text{ m}$$`} />
          </div>
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes that cost marks</h2>
          <ul className="pg-checklist">
            <li><strong>Calculator in radians.</strong>{" "}Check for D or DEG on the screen before you start.</li>
            <li><strong>Labelling from the right angle.</strong>{" "}Opposite and adjacent depend on the angle θ you’re using.</li>
            <li><strong>Multiplying when the unknown is on the bottom.</strong>{" "}If x is the denominator, divide the known side by the ratio.</li>
            <li><strong>Forgetting the inverse to find an angle.</strong>{" "}sin θ = 0.44 means θ = sin⁻¹(0.44), not 0.44°.</li>
            <li><strong>Rounding the ratio too early.</strong>{" "}Keep the full calculator value, then round the final answer.</li>
          </ul>
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer. Calculator in degrees mode.</p>
          <Practice items={PRACTICE} />
          <p className="pg-small">
            Want more? Each year level below has a free printable PDF of 10 questions with answers, and a full 20-question test. Or <Link href="/calculators/trigonometry">check your working with the calculator</Link>.
          </p>
        </div>
      </section>

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Trigonometry by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-9-trigonometry", text: "Introducing sin, cos and tan: labelling sides and finding missing sides and angles." },
              { slug: "year-10-trigonometry", text: "Applying trigonometry: angles of elevation and depression, bearings and multi-step problems." },
              { slug: "year-10a-sine-cosine-rule", text: "Beyond right angles: the sine rule, the cosine rule and the area of a triangle." },
              { slug: "year-10a-3d-trigonometry", text: "Pythagoras and trigonometry in 3D shapes." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

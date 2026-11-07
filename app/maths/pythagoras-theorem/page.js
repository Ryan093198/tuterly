import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import PythagorasCalc from "@/components/maths/PythagorasCalc";

// Concept page: Pythagoras' theorem ("pythagoras theorem" ~27,100 searches
// a month in Australia; year-specific searches are tiny, so one page with
// a by-year section rather than a page per year). Every number in the
// examples and practice was checked (Nov 2026).

const PATH = "/maths/pythagoras-theorem";
const TITLE = "Pythagoras' Theorem: Formula, Worked Examples and Practice Questions (Years 8 to 10) | Tuterly";
const DESCRIPTION =
  "Pythagoras' theorem explained simply: the formula a² + b² = c², how to find the hypotenuse or a shorter side, word problems, worked examples, practice questions with answers and a free calculator that shows the working.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is Pythagoras' theorem?", a: "In a right-angled triangle, the square of the hypotenuse (the longest side, opposite the right angle) equals the sum of the squares of the other two sides: a² + b² = c²." },
  { q: "When can you use Pythagoras' theorem?", a: "Only in right-angled triangles, and only when you know two sides and want the third. If you know an angle, or want to find one, use trigonometry (SOH CAH TOA) instead." },
  { q: "How do you know which side is the hypotenuse?", a: "It's the side opposite the right angle, and always the longest side. It doesn't touch the right angle." },
  { q: "What year level learns Pythagoras' theorem?", a: "In the Victorian Curriculum 2.0 it's introduced in Year 8 and applied in Year 9 alongside trigonometry. Year 10A extends it to 3D shapes. Schools sequence topics differently, so check your child's course." },
  { q: "Should I round my answer?", a: "Leave it exact (for example √149) unless the question asks you to round. If it says 'to 2 decimal places', round only at the very end." },
];

const PRACTICE = [
  { q: R`The two shorter sides of a right-angled triangle are 9 cm and 12 cm. Find the hypotenuse.`, a: R`$c^2 = 9^2 + 12^2 = 81 + 144 = 225$, so $c = \sqrt{225} = 15$ cm.` },
  { q: R`The hypotenuse is 13 m and one shorter side is 5 m. Find the other side.`, a: R`$a^2 = 13^2 - 5^2 = 169 - 25 = 144$, so $a = 12$ m.` },
  { q: R`The shorter sides are 7 cm and 10 cm. Find the hypotenuse, to 2 decimal places.`, a: R`$c^2 = 49 + 100 = 149$, so $c = \sqrt{149} \approx 12.21$ cm.` },
  { q: R`The hypotenuse is 20 mm and one side is 11 mm. Find the third side, to 2 decimal places.`, a: R`$a^2 = 400 - 121 = 279$, so $a = \sqrt{279} \approx 16.70$ mm.` },
  { q: R`A 5 m ladder leans against a wall with its foot 1.5 m from the wall. How high up the wall does it reach, to 2 decimal places?`, a: R`$h^2 = 5^2 - 1.5^2 = 25 - 2.25 = 22.75$, so $h \approx 4.77$ m.` },
  { q: R`Is a triangle with sides 7, 24 and 25 right-angled?`, a: R`Yes. $7^2 + 24^2 = 49 + 576 = 625 = 25^2$.` },
  { q: R`A rectangle is 16 cm long and 12 cm wide. How long is its diagonal?`, a: R`$d^2 = 16^2 + 12^2 = 256 + 144 = 400$, so $d = 20$ cm.` },
  { q: R`Find the diagonal of a square with sides of 6 cm. Give an exact answer and a decimal to 2 places.`, a: R`$d^2 = 6^2 + 6^2 = 72$, so $d = \sqrt{72} = 6\sqrt{2} \approx 8.49$ cm.` },
];

const LINKS = [
  { href: "/calculators/pythagoras", label: "Pythagoras calculator with working out" },
  { href: "/maths/sohcahtoa", label: "SOH CAH TOA explained (trigonometry)" },
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
        { name: "Pythagoras' theorem", path: PATH },
      ]}
      eyebrow="Maths explained · Years 8 to 10"
      h1="Pythagoras’ theorem: the formula, explained with examples"
      lead="Pythagoras’ theorem finds a missing side of a right-angled triangle when you know the other two. Here’s the formula, how to use it step by step, the mistakes that cost marks, and practice questions with answers."
      quickAnswer="In a right-angled triangle, a² + b² = c², where c is the hypotenuse (the longest side, opposite the right angle). To find the hypotenuse, square the two shorter sides, add them, then take the square root. To find a shorter side, square the hypotenuse, subtract the square of the other side, then take the square root."
      toc={[
        ["formula", "The formula"],
        ["calculator", "Calculator"],
        ["hypotenuse", "Finding the hypotenuse"],
        ["shorter", "Finding a shorter side"],
        ["problems", "Word problems"],
        ["check", "Is it right-angled?"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a Pythagoras question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_pythagoras"
      faqs={FAQS}
      faqTitle="Pythagoras' theorem: common questions"
      links={LINKS}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got a Pythagoras question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="formula" className="tb-section" aria-labelledby="h-formula">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-formula" className="tb-h2 pg-h2">The formula</h2>
          <div className="mx-formula"><MathMd md={R`$$a^2 + b^2 = c^2$$`} /></div>
          <MathMd md={R`- $c$ is the **hypotenuse**: the longest side, opposite the right angle.
- $a$ and $b$ are the two **shorter sides**, which meet at the right angle. It doesn't matter which is which.
- It only works in **right-angled triangles**, and you need **two sides** to find the third.

In words: *the square on the hypotenuse equals the sum of the squares on the other two sides.*`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Pythagoras calculator (with working)</h2>
          <p className="pg-intro">Fill in any two sides. You’ll get the answer and every step, set out the way your teacher wants to see it.</p>
          <PythagorasCalc placement="concept_pythagoras_calc" />
        </div>
      </section>

      <section id="hypotenuse" className="tb-section" aria-labelledby="h-hyp">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-hyp" className="tb-h2 pg-h2">Finding the hypotenuse</h2>
          <p className="pg-intro">Square the two shorter sides, <strong>add</strong>{" "}them, then take the square root.</p>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A right-angled triangle has shorter sides of 6 cm and 8 cm. Find the hypotenuse.

$$c^2 = 6^2 + 8^2$$
$$c^2 = 36 + 64 = 100$$
$$c = \sqrt{100} = 10 \text{ cm}$$`} />
          </div>
        </div>
      </section>

      <section id="shorter" className="tb-section" aria-labelledby="h-shorter">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-shorter" className="tb-h2 pg-h2">Finding a shorter side</h2>
          <p className="pg-intro">Square the hypotenuse, <strong>subtract</strong>{" "}the square of the side you know, then take the square root.</p>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`The hypotenuse is 17 m and one shorter side is 8 m. Find the other side.

$$a^2 + 8^2 = 17^2$$
$$a^2 = 289 - 64 = 225$$
$$a = \sqrt{225} = 15 \text{ m}$$`} />
          </div>
          <MathMd md={R`**Quick check:** the hypotenuse must be the longest side. If your "shorter side" comes out longer than the hypotenuse, you added when you should have subtracted.`} />
        </div>
      </section>

      <section id="problems" className="tb-section" aria-labelledby="h-problems">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-problems" className="tb-h2 pg-h2">Word problems</h2>
          <p className="pg-intro">Draw the triangle first, mark the right angle, and label the hypotenuse. Ladders, ramps, diagonals of rectangles and screens, and distances on a map are all Pythagoras problems.</p>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A 4 m ladder leans against a wall. Its foot is 1.2 m from the wall. How high up the wall does it reach, to 2 decimal places?

The ladder is the hypotenuse (it's opposite the right angle between the wall and the ground).

$$h^2 + 1.2^2 = 4^2$$
$$h^2 = 16 - 1.44 = 14.56$$
$$h = \sqrt{14.56} \approx 3.82 \text{ m}$$`} />
          </div>
        </div>
      </section>

      <section id="check" className="tb-section" aria-labelledby="h-check">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-check" className="tb-h2 pg-h2">Is a triangle right-angled?</h2>
          <MathMd md={R`Square the longest side and compare it with the sum of the squares of the other two (this is the *converse* of Pythagoras' theorem).

- Sides 8, 15, 17: $8^2 + 15^2 = 64 + 225 = 289 = 17^2$, so **yes**, it's right-angled.
- Sides 6, 7, 9: $6^2 + 7^2 = 36 + 49 = 85$, but $9^2 = 81$, so **no**.

**Pythagorean triples** are whole-number sets that work: 3, 4, 5; 5, 12, 13; 8, 15, 17; 7, 24, 25. Any multiple works too, like 6, 8, 10. Spotting one saves time in a test.`} />
          <MathMd md={R`**In 3D (Year 10A):** use Pythagoras twice. For a box 3 by 4 by 12, the space diagonal is $\sqrt{3^2 + 4^2 + 12^2} = \sqrt{169} = 13$.`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes that cost marks</h2>
          <ul className="pg-checklist">
            <li><strong>Adding when finding a shorter side.</strong>{" "}To find a shorter side you subtract: c² − b².</li>
            <li><strong>Forgetting the square root.</strong>{" "}c² = 100 means c = 10, not 100.</li>
            <li><strong>Picking the wrong hypotenuse.</strong>{" "}It's opposite the right angle, not just the side drawn at a slant.</li>
            <li><strong>Squaring the sum.</strong>{" "}6² + 8² is 36 + 64, not (6 + 8)².</li>
            <li><strong>Rounding too early.</strong>{" "}Keep the exact value until the last line, then round.</li>
            <li><strong>Using it without a right angle.</strong>{" "}No right angle, no Pythagoras.</li>
          </ul>
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer.</p>
          <Practice items={PRACTICE} />
          <p className="pg-small">
            Want more? Each year level below has a free printable PDF of 10 questions with answers, and a full 20-question test. Or <Link href="/calculators/pythagoras">check your working with the calculator</Link>.
          </p>
        </div>
      </section>

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Pythagoras by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-8-pythagoras", text: "Introducing the theorem: finding the hypotenuse and shorter sides, and checking for right angles." },
              { slug: "year-9-pythagoras", text: "Applying it to problems, alongside trigonometry: ladders, ramps, diagonals and distances." },
              { slug: "year-10a-3d-trigonometry", text: "Pythagoras and trigonometry in 3D: space diagonals in boxes, pyramids and cones." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

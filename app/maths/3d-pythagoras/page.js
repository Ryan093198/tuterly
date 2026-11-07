import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";

// Concept page: 3D Pythagoras ("3d pythagoras" 390 + "3d pythagorean
// theorem" 390 searches a month). A Year 10A topic. Every example and
// practice answer was checked (Nov 2026).

const PATH = "/maths/3d-pythagoras";
const TITLE = "3D Pythagoras: Space Diagonals, Pyramids and Cones, with Examples (Year 10A) | Tuterly";
const DESCRIPTION =
  "Pythagoras' theorem in 3D explained: the space diagonal of a box, slant heights of pyramids and cones, the two-step method, worked examples and practice questions with answers.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is the 3D Pythagoras formula?", a: "For a rectangular box with length l, width w and height h, the space diagonal is d = √(l² + w² + h²)." },
  { q: "What's the two-step method?", a: "Find a diagonal across the base with Pythagoras, then use it with the height in a second right-angled triangle to find the space diagonal." },
  { q: "How do I find the slant height of a cone?", a: "The radius, the vertical height and the slant height make a right-angled triangle, with the slant height as the hypotenuse: s = √(r² + h²)." },
  { q: "What year level learns 3D Pythagoras?", a: "It's part of Year 10A in the Victorian Curriculum 2.0, alongside trigonometry in 3D." },
];

const PRACTICE = [
  { q: R`A box measures 2 cm by 3 cm by 6 cm. Find the length of its space diagonal.`, a: R`$d = \sqrt{2^2 + 3^2 + 6^2} = \sqrt{49} = 7$ cm` },
  { q: R`Find the space diagonal of a cube with sides of 5 cm.`, a: R`$d = \sqrt{25 + 25 + 25} = \sqrt{75} = 5\sqrt{3} \approx 8.66$ cm` },
  { q: R`A box is 10 m by 6 m by 4 m. Find the space diagonal to 2 decimal places.`, a: R`$d = \sqrt{100 + 36 + 16} = \sqrt{152} \approx 12.33$ m` },
  { q: R`A cone has radius 8 cm and vertical height 15 cm. Find its slant height.`, a: R`$s = \sqrt{8^2 + 15^2} = \sqrt{289} = 17$ cm` },
  { q: R`A square pyramid has a base of side 6 cm and a vertical height of 4 cm. Find the slant height of a face (apex to the midpoint of a base edge).`, a: R`Half the base is 3 cm, so $s = \sqrt{4^2 + 3^2} = 5$ cm` },
  { q: R`What's the longest pencil that fits in a pencil case 20 cm by 4 cm by 3 cm, to 2 decimal places?`, a: R`$\sqrt{400 + 16 + 9} = \sqrt{425} \approx 20.62$ cm` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "3D Pythagoras", path: PATH }]}
      eyebrow="Maths explained · Year 10A"
      h1="3D Pythagoras: space diagonals, pyramids and cones"
      lead="In 3D, Pythagoras’ theorem still works: you just find the right-angled triangle hiding inside the shape. Often that takes two steps. Here’s how, with worked examples and practice questions with answers."
      quickAnswer="For a box l by w by h, the space diagonal is d = √(l² + w² + h²). Or work in two steps: find the diagonal of the base, then use it with the height in a second right-angled triangle. For a cone, slant height s = √(r² + h²)."
      toc={[
        ["formula", "The formula"],
        ["two-step", "The two-step method"],
        ["pyramids", "Pyramids and cones"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a 3D question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_3d_pythagoras"
      faqs={FAQS}
      faqTitle="3D Pythagoras: common questions"
      links={[
        { href: "/maths/pythagoras-theorem", label: "Pythagoras' theorem in 2D" },
        { href: "/calculators/pythagoras", label: "Pythagoras calculator" },
        { href: "/maths/sohcahtoa", label: "SOH CAH TOA explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got a 3D question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered."
    >
      <section id="formula" className="tb-section" aria-labelledby="h-formula">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-formula" className="tb-h2 pg-h2">The formula for a box</h2>
          <div className="mx-formula"><MathMd md={R`$$d = \sqrt{l^2 + w^2 + h^2}$$`} /></div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the space diagonal of a box 3 cm by 4 cm by 12 cm.

$$d = \sqrt{3^2 + 4^2 + 12^2}$$
$$= \sqrt{9 + 16 + 144}$$
$$= \sqrt{169} = 13 \text{ cm}$$`} />
          </div>
          <p className="pg-small">New to Pythagoras? Start with <Link href="/maths/pythagoras-theorem">Pythagoras’ theorem in 2D</Link>.</p>
        </div>
      </section>

      <section id="two-step" className="tb-section" aria-labelledby="h-two">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-two" className="tb-h2 pg-h2">The two-step method</h2>
          <p className="pg-intro">Showing both triangles earns method marks, and works for shapes other than boxes.</p>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A box is 6 cm by 8 cm by 5 cm high. Find the space diagonal, to 2 decimal places.

**Step 1:** the base diagonal: $\sqrt{6^2 + 8^2} = \sqrt{100} = 10$ cm.

**Step 2:** the base diagonal and the height make a right-angled triangle:
$$d = \sqrt{10^2 + 5^2} = \sqrt{125}$$
$$= 5\sqrt{5} \approx 11.18 \text{ cm}$$`} />
          </div>
        </div>
      </section>

      <section id="pyramids" className="tb-section" aria-labelledby="h-pyr">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-pyr" className="tb-h2 pg-h2">Pyramids and cones</h2>
          <div className="mx-example">
            <p className="mx-example__k">Square pyramid</p>
            <MathMd md={R`A square pyramid has a base of side 10 cm and a vertical height of 12 cm. Find the slant height of a face.

From the centre of the base to the midpoint of an edge is half the side, 5 cm:
$$s = \sqrt{12^2 + 5^2} = \sqrt{169} = 13 \text{ cm}$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Cone</p>
            <MathMd md={R`A cone has radius 5 cm and height 12 cm. The slant height is $\sqrt{5^2 + 12^2} = 13$ cm.`} />
          </div>
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Draw the right-angled triangle first. Try each one before you open the answer.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">By year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-9-pythagoras", text: "Pythagoras in 2D problems, the skill 3D builds on." },
              { slug: "year-10a-3d-trigonometry", text: "Pythagoras and trigonometry in 3D shapes." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

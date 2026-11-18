import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import CylinderSACalc from "@/components/maths/CylinderSACalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a calculator: surface area of a cylinder. Built by the
// daily page task (Nov 2026); not yet read by Ryan, so it's in
// UNREVIEWED_PATHS (lib/reviewed.js). Every example, practice answer and
// calculator test case was recomputed by script before publishing.

const PATH = "/maths/surface-area-of-a-cylinder";
const TITLE = "How to Find the Surface Area of a Cylinder: Formula, Examples and Calculator (Year 9) | Tuterly";
const DESCRIPTION =
  "How to find the surface area of a cylinder with SA = 2πr² + 2πrh: the net, the curved surface, open cylinders and finding the height. Worked examples and a free calculator.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is the formula for the surface area of a cylinder?", a: "SA = 2πr² + 2πrh, where r is the radius and h is the height. The 2πr² is the two circular ends and 2πrh is the curved side. A cylinder with radius 3 cm and height 8 cm has SA = 18π + 48π = 66π ≈ 207.35 cm²." },
  { q: "What is the curved surface area of a cylinder?", a: "It's the area of the side only, without the two ends: A = 2πrh. If you unroll the side it becomes a rectangle whose length is the circumference (2πr) and whose width is the height. It's what you need for a label on a can or the outside of a pipe." },
  { q: "How do I find the surface area of a cylinder with no lid?", a: "Count only one circle: SA = πr² + 2πrh. For a tank with radius 0.8 m and height 1.5 m and no lid, SA = 0.64π + 2.4π = 3.04π ≈ 9.55 m². If both ends are open, like a pipe, use only 2πrh." },
  { q: "How do I find the surface area of a cylinder from the diameter?", a: "Halve the diameter to get the radius, then use SA = 2πr² + 2πrh. A tin with diameter 10 cm and height 12 cm has r = 5, so SA = 50π + 120π = 170π ≈ 534.07 cm²." },
  { q: "What units is surface area measured in?", a: "Square units, like mm², cm² or m², because it's an area. Volume is the one in cubic units (cm³). Make sure every length is in the same unit before you substitute." },
  { q: "What year level learns the surface area of a cylinder?", a: "In the Victorian Curriculum 2.0, Year 9 finds the surface area and volume of right prisms and cylinders. Year 10 uses cylinders in composite solids, and Year 10A adds cones, pyramids and spheres." },
];

const PRACTICE = [
  { q: R`Find the total surface area of a cylinder with radius $5$ cm and height $10$ cm.`, a: R`$SA = 2\pi \times 5^2 + 2\pi \times 5 \times 10 = 50\pi + 100\pi = 150\pi \approx 471.24$ cm²` },
  { q: R`Find the total surface area of a cylinder with diameter $12$ m and height $5$ m.`, a: R`$r = 6$, so $SA = 2\pi \times 6^2 + 2\pi \times 6 \times 5 = 72\pi + 60\pi = 132\pi \approx 414.69$ m²` },
  { q: R`Find the total surface area of a cylinder with radius $2.5$ cm and height $6$ cm.`, a: R`$SA = 2\pi \times 2.5^2 + 2\pi \times 2.5 \times 6 = 12.5\pi + 30\pi = 42.5\pi \approx 133.52$ cm²` },
  { q: R`Find the curved surface area of a cylinder with radius $4$ cm and height $9$ cm.`, a: R`$A = 2\pi \times 4 \times 9 = 72\pi \approx 226.19$ cm²` },
  { q: R`A bucket is a cylinder with no lid, radius $15$ cm and height $30$ cm. Find the area of plastic needed to make it.`, a: R`One circle only: $SA = \pi \times 15^2 + 2\pi \times 15 \times 30 = 225\pi + 900\pi = 1125\pi \approx 3534.29$ cm²` },
  { q: R`A closed cylindrical water tank has diameter $2$ m and height $2.4$ m. The outside is painted, and $1$ L of paint covers $8$ m². How many litres of paint are needed?`, a: R`$r = 1$, so $SA = 2\pi \times 1^2 + 2\pi \times 1 \times 2.4 = 6.8\pi \approx 21.36$ m². Paint: $21.36 \div 8 \approx 2.67$ L, so buy $3$ L if it comes in $1$ L tins.` },
  { q: R`A closed cylinder has total surface area $500$ cm² and radius $5$ cm. Find its height.`, a: R`Ends: $2\pi \times 5^2 = 50\pi \approx 157.08$. Curved: $500 - 50\pi \approx 342.92$. $h = \dfrac{342.92}{10\pi} \approx 10.92$ cm` },
  { q: R`A pipe, open at both ends, has outside diameter $0.3$ m and length $4$ m. Find the area of its outside surface.`, a: R`$r = 0.15$, so $A = 2\pi \times 0.15 \times 4 = 1.2\pi \approx 3.77$ m²` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Surface area of a cylinder", path: PATH }]}
      eyebrow="Maths explained · Years 9 and 10"
      h1="How to find the surface area of a cylinder"
      lead="The surface area of a cylinder is the total area of its outside: two circles and one curved side that unrolls into a rectangle. Here’s where the formula comes from, how to use it from the radius or the diameter, what changes when a cylinder has no lid or no ends, and how to work back to a missing height, with a calculator that shows every step."
      quickAnswer="Surface area of a cylinder = 2πr² + 2πrh, where r is the radius and h is the height. The 2πr² is the two circular ends and 2πrh is the curved side. For a cylinder with no lid use πr² + 2πrh, and for the curved side only (like a label) use 2πrh. Surface area is in square units, like cm²."
      toc={[
        ["net", "Where the formula comes from"],
        ["radius", "From the radius"],
        ["diameter", "From the diameter"],
        ["calculator", "Calculator"],
        ["curved", "Curved surface area"],
        ["open", "Cylinders with no lid"],
        ["reverse", "Finding the height"],
        ["units", "Mixed units"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a surface area question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_surface_area_of_a_cylinder"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="Surface area of a cylinder: common questions"
      links={[
        { href: "/maths/volume-of-a-cylinder", label: "Volume of a cylinder" },
        { href: "/maths/circumference-of-a-circle", label: "Circumference of a circle" },
        { href: "/worksheets/year-9-surface-area-volume", label: "Year 9 surface area and volume worksheets" },
        { href: "/year-9-maths-test", label: "Year 9 maths practice test" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Lost marks on a surface area question?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="net" className="tb-section" aria-labelledby="h-net">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-net" className="tb-h2 pg-h2">The surface area of a cylinder formula</h2>
          <div className="mx-formula"><MathMd md={R`$$SA = 2\pi r^2 + 2\pi r h$$`} /></div>
          <MathMd md={R`Imagine cutting a can open and flattening it out. This flat shape is the **net** of the cylinder, and it has three pieces:

- **Two circles**, the top and the bottom. Each has area $\pi r^2$, so together they make $2\pi r^2$.
- **One rectangle**, the curved side unrolled. Its length is the distance around the circle, the circumference $2\pi r$, and its width is the height $h$. So its area is $2\pi r \times h = 2\pi r h$.

Add the three pieces and you get the formula. Some textbooks factorise it as $SA = 2\pi r(r + h)$, which gives the same answer.

Surface area is measured in **square units**: mm², cm² or m².`} />
        </div>
      </section>

      <section id="radius" className="tb-section" aria-labelledby="h-radius">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-radius" className="tb-h2 pg-h2">Surface area from the radius and height</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the total surface area of a cylinder with radius $3$ cm and height $8$ cm.

Two ends:
$$2\pi r^2 = 2 \times \pi \times 3^2 = 18\pi$$
Curved side:
$$2\pi r h = 2 \times \pi \times 3 \times 8 = 48\pi$$
Add:
$$SA = 18\pi + 48\pi = 66\pi$$
$$SA \approx 207.35 \text{ cm}^2$$`} />
          </div>
          <MathMd md={R`Working out the two parts separately makes it easy to check, and easy to drop a piece when a question says the cylinder is open. $66\pi$ cm² is the **exact** answer; $207.35$ cm² is rounded to 2 decimal places.`} />
        </div>
      </section>

      <section id="diameter" className="tb-section" aria-labelledby="h-diameter">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-diameter" className="tb-h2 pg-h2">Surface area from the diameter</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A tin of tomatoes has diameter $10$ cm and height $12$ cm. How much metal is needed to make it?

$$r = \frac{10}{2} = 5 \text{ cm}$$
$$2\pi r^2 = 2 \times \pi \times 5^2 = 50\pi$$
$$2\pi r h = 2 \times \pi \times 5 \times 12 = 120\pi$$
$$SA = 50\pi + 120\pi = 170\pi$$
$$SA \approx 534.07 \text{ cm}^2$$`} />
          </div>
          <MathMd md={R`Halve the diameter before anything else. If you use $10$ as the radius, the ends come out four times too big and the side twice too big.`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Surface area of a cylinder calculator (with working)</h2>
          <p className="pg-intro">Find the total surface area from the radius or diameter, the curved surface only, a cylinder open at one end, or work back to the height. You’ll get the exact answer in terms of π where it’s tidy and the decimal rounded to 2 decimal places.</p>
          <CylinderSACalc placement="concept_surface_area_of_a_cylinder_calc" />
        </div>
      </section>

      <section id="curved" className="tb-section" aria-labelledby="h-curved">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-curved" className="tb-h2 pg-h2">Curved surface area (labels and pipes)</h2>
          <MathMd md={R`Sometimes only the side counts: the paper label on a can, the outside of a pipe, a cardboard tube. Leave out the circles and use

$$A = 2\pi r h$$`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: a label</p>
            <MathMd md={R`A can of soup has diameter $7.4$ cm and height $11$ cm. The label covers the whole curved side. Find the area of the label.

$$r = \frac{7.4}{2} = 3.7 \text{ cm}$$
$$A = 2 \times \pi \times 3.7 \times 11 = 81.4\pi$$
$$A \approx 255.73 \text{ cm}^2$$`} />
          </div>
          <MathMd md={R`Unrolled, the label is a rectangle about $2\pi \times 3.7 \approx 23.25$ cm long and $11$ cm high, and $23.25 \times 11 \approx 255.7$, which matches.`} />
        </div>
      </section>

      <section id="open" className="tb-section" aria-labelledby="h-open">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-open" className="tb-h2 pg-h2">Cylinders with no lid</h2>
          <MathMd md={R`Read the question for clues like "open top", "no lid", "bucket", "glass" or "vase". These have only **one** circle:

$$SA = \pi r^2 + 2\pi r h$$`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: an open tank</p>
            <MathMd md={R`A water tank with no lid has radius $0.8$ m and height $1.5$ m. The inside is to be lined with waterproof sheeting. Find the area to be lined.

Base only:
$$\pi r^2 = \pi \times 0.8^2 = 0.64\pi$$
Curved side:
$$2\pi r h = 2 \times \pi \times 0.8 \times 1.5 = 2.4\pi$$
Add:
$$SA = 0.64\pi + 2.4\pi = 3.04\pi \approx 9.55 \text{ m}^2$$`} />
          </div>
        </div>
      </section>

      <section id="reverse" className="tb-section" aria-labelledby="h-reverse">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-reverse" className="tb-h2 pg-h2">Finding the height from the surface area</h2>
          <MathMd md={R`If you know the total surface area and the radius, take off the two ends first. What's left is the curved side, $2\pi r h$, so divide by $2\pi r$:

$$h = \frac{SA - 2\pi r^2}{2\pi r}$$`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: missing height</p>
            <MathMd md={R`A closed cylinder has total surface area $300$ cm² and radius $4$ cm. Find its height, to 2 decimal places.

$$2\pi r^2 = 2 \times \pi \times 4^2 = 32\pi \approx 100.53$$
$$2\pi r h = 300 - 32\pi \approx 199.47$$
$$h = \frac{300 - 32\pi}{8\pi} \approx 7.94 \text{ cm}$$`} />
          </div>
          <MathMd md={R`Check by substituting back: $32\pi + 2\pi \times 4 \times 7.94 \approx 100.53 + 199.55 = 300.08$, which is $300$ allowing for rounding.`} />
        </div>
      </section>

      <section id="units" className="tb-section" aria-labelledby="h-units">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-units" className="tb-h2 pg-h2">When the lengths are in different units</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A closed cylindrical hot water service has radius $50$ cm and height $2$ m. Find its surface area in square metres.

Convert first: $50$ cm $= 0.5$ m.
$$2\pi r^2 = 2 \times \pi \times 0.5^2 = 0.5\pi$$
$$2\pi r h = 2 \times \pi \times 0.5 \times 2 = 2\pi$$
$$SA = 0.5\pi + 2\pi = 2.5\pi \approx 7.85 \text{ m}^2$$`} />
          </div>
          <MathMd md={R`Convert lengths **before** you substitute. Converting an area afterwards is harder, because $1$ m² is $10\,000$ cm², not $100$ cm².`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Forgetting one of the circles.** A closed cylinder has two ends, so it's $2\pi r^2$, not $\pi r^2$. Sketch the net if you're unsure how many pieces there are.
- **Counting circles that aren't there.** A bucket has one end and a pipe has none. Read the question before you reach for the full formula.
- **Using the diameter as the radius.** Halve it first.
- **Using $\pi r^2$ for the side.** The curved side is a rectangle, $2\pi r \times h$. Its length is the circumference, not the area of the circle.
- **Mixing up surface area and volume.** Surface area uses $2\pi r^2 + 2\pi r h$ and is in square units (cm²). Volume uses $\pi r^2 h$ and is in cubic units (cm³).
- **Rounding too early.** Keep the exact multiples of $\pi$ (like $18\pi + 48\pi = 66\pi$) and round once, at the end.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer. Decimal answers use the π button and are rounded to 2 decimal places unless the question says otherwise.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Dropped a circle or used the diameter by mistake? Don't just fix the number. Study the mistake." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Surface area by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-9-surface-area-volume", text: "Surface area and volume of right prisms and cylinders, including nets and open containers." },
              { slug: "year-10-surface-area-volume", text: "Composite objects made from prisms and cylinders, where shared faces are left out of the total." },
              { slug: "year-10a-pyramids-cones-spheres", text: "Cones, pyramids and spheres. A cone's curved surface is πrl, where l is the slant height." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

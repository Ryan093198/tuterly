import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import CylinderCalc from "@/components/maths/CylinderCalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a calculator: volume of a cylinder. Built by the daily
// page task (Nov 2026); not yet read by Ryan, so it's in UNREVIEWED_PATHS
// (lib/reviewed.js). Every example and practice answer was recomputed by
// script before publishing.

const PATH = "/maths/volume-of-a-cylinder";
const TITLE = "How to Find the Volume of a Cylinder: Formula, Examples and Calculator (Years 8 to 10) | Tuterly";
const DESCRIPTION =
  "How to find the volume of a cylinder with V = πr²h, from the radius or the diameter, in litres, and working back to the height or radius. Worked examples, practice questions and a free calculator.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is the formula for the volume of a cylinder?", a: "V = πr²h, where r is the radius of the circular end and h is the height. Find the area of the circle (πr²), then multiply by the height. A cylinder with radius 4 cm and height 10 cm has volume 160π ≈ 502.65 cm³." },
  { q: "How do I find the volume of a cylinder from the diameter?", a: "Halve the diameter to get the radius first, then use V = πr²h. A tank with diameter 1.2 m and height 1.5 m has radius 0.6 m, so V = π × 0.36 × 1.5 ≈ 1.70 m³." },
  { q: "How do I change the volume of a cylinder into litres?", a: "1000 cm³ is 1 litre and 1 m³ is 1000 litres. So a volume of 2500 cm³ is 2.5 L, and 1.7 m³ is 1700 L. Work out the volume in cm³ or m³ first, then convert." },
  { q: "How do I find the height of a cylinder from its volume?", a: "Rearrange V = πr²h to h = V ÷ (πr²). Work out πr² first, then divide the volume by it. A 1000 cm³ cylinder with radius 5 cm has height 1000 ÷ (25π) ≈ 12.73 cm." },
  { q: "Is the volume of a cylinder the same as its surface area?", a: "No. Volume is the space inside, measured in cubic units like cm³. Surface area is the total area of the outside (two circles plus the curved side), measured in square units like cm². They use different formulas." },
  { q: "What year level learns the volume of a cylinder?", a: "In the Victorian Curriculum 2.0, Year 8 finds the volume of right prisms, and cylinders are part of Year 9 measurement along with their surface area. Year 10 uses them in composite solids, and Year 10A adds cones and spheres." },
];

const PRACTICE = [
  { q: R`Find the volume of a cylinder with radius $3$ cm and height $7$ cm.`, a: R`$V = \pi \times 3^2 \times 7 = 63\pi \approx 197.92$ cm³` },
  { q: R`Find the volume of a cylinder with diameter $10$ m and height $4$ m.`, a: R`$r = 5$, so $V = \pi \times 5^2 \times 4 = 100\pi \approx 314.16$ m³` },
  { q: R`Find the volume of a cylinder with radius $2.5$ cm and height $8$ cm.`, a: R`$V = \pi \times 2.5^2 \times 8 = 50\pi \approx 157.08$ cm³` },
  { q: R`A rainwater tank is a cylinder with radius $0.9$ m and height $2$ m. How many litres does it hold?`, a: R`$V = \pi \times 0.9^2 \times 2 = 1.62\pi \approx 5.089$ m³. Since $1$ m³ $= 1000$ L, it holds about $5089$ L.` },
  { q: R`A cylinder has volume $750$ cm³ and radius $4$ cm. Find its height.`, a: R`$h = \dfrac{750}{\pi \times 4^2} = \dfrac{750}{16\pi} \approx 14.92$ cm` },
  { q: R`A cylinder has volume $2000$ cm³ and height $10$ cm. Find its radius.`, a: R`$r^2 = \dfrac{2000}{10\pi} \approx 63.66$, so $r \approx 7.98$ cm` },
  { q: R`A water trough is half a cylinder, with radius $0.3$ m and length $2$ m. Find its capacity in litres.`, a: R`$V = \dfrac{1}{2} \times \pi \times 0.3^2 \times 2 = 0.09\pi \approx 0.2827$ m³, which is about $282.7$ L.` },
  { q: R`A pipe is $50$ cm long, with outer diameter $10$ cm and inner diameter $8$ cm. Find the volume of material in the pipe.`, a: R`Outer radius $5$, inner radius $4$. $V = \pi(5^2 - 4^2) \times 50 = 450\pi \approx 1413.72$ cm³` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Volume of a cylinder", path: PATH }]}
      eyebrow="Maths explained · Years 8 to 10"
      h1="How to find the volume of a cylinder"
      lead="A cylinder is a prism with a circle for its cross-section, so its volume is the area of the circle times the height. Here’s the formula, how to use it from the radius or the diameter, how to change the answer into litres, and how to work backwards to a missing height or radius, with a calculator that shows every step."
      quickAnswer="Volume of a cylinder = πr²h, where r is the radius and h is the height. Square the radius, multiply by π to get the area of the circular end, then multiply by the height. If you’re given the diameter, halve it first. Volume is in cubic units, like cm³ or m³, and 1000 cm³ = 1 litre."
      toc={[
        ["formula", "The formula"],
        ["radius", "From the radius"],
        ["diameter", "From the diameter"],
        ["calculator", "Calculator"],
        ["litres", "Volume in litres"],
        ["reverse", "Finding the height or radius"],
        ["parts", "Half cylinders and pipes"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a cylinder question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_volume_of_a_cylinder"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="Volume of a cylinder: common questions"
      links={[
        { href: "/maths/area-of-a-circle", label: "Area of a circle" },
        { href: "/worksheets/year-9-surface-area-volume", label: "Year 9 surface area and volume worksheets" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got a volume question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="formula" className="tb-section" aria-labelledby="h-formula">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-formula" className="tb-h2 pg-h2">The volume of a cylinder formula</h2>
          <div className="mx-formula"><MathMd md={R`$$V = \pi r^2 h$$`} /></div>
          <MathMd md={R`Every prism has volume $V = A \times h$: the area of its cross-section times its height. A cylinder's cross-section is a circle, with area $\pi r^2$, so

$$V = \underbrace{\pi r^2}_{\text{area of the circle}} \times h$$

- $r$ is the **radius** of the circular end (centre to edge).
- $h$ is the **height**: the distance between the two circular ends. If the cylinder is lying down, like a pipe or a log, the "height" is its length.
- Volume is measured in **cubic units**: mm³, cm³ or m³.`} />
        </div>
      </section>

      <section id="radius" className="tb-section" aria-labelledby="h-radius">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-radius" className="tb-h2 pg-h2">Volume from the radius and height</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the volume of a cylinder with radius $4$ cm and height $10$ cm.

$$V = \pi r^2 h$$
$$V = \pi \times 4^2 \times 10$$
$$V = \pi \times 16 \times 10 = 160\pi$$
$$V \approx 502.65 \text{ cm}^3$$`} />
          </div>
          <MathMd md={R`$160\pi$ cm³ is the **exact** answer; $502.65$ cm³ is rounded to 2 decimal places. Square the radius before anything else: $4^2 = 16$, not $8$.`} />
        </div>
      </section>

      <section id="diameter" className="tb-section" aria-labelledby="h-diameter">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-diameter" className="tb-h2 pg-h2">Volume from the diameter</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A cylindrical water tank has diameter $1.2$ m and height $1.5$ m. Find its volume.

$$r = \frac{1.2}{2} = 0.6 \text{ m}$$
$$V = \pi \times 0.6^2 \times 1.5$$
$$V = \pi \times 0.36 \times 1.5 = 0.54\pi$$
$$V \approx 1.70 \text{ m}^3$$`} />
          </div>
          <MathMd md={R`Questions about tanks, cans and pipes usually give the diameter, because that's what you can measure with a tape. Halve it before you square it. Using the diameter by mistake makes the answer four times too big.`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Volume of a cylinder calculator (with working)</h2>
          <p className="pg-intro">Find the volume from the radius or diameter, or work back to the height or radius. You’ll get the exact answer in terms of π where it’s tidy, decimals rounded to 2 decimal places, and litres when the units are mm, cm or m.</p>
          <CylinderCalc placement="concept_volume_of_a_cylinder_calc" />
        </div>
      </section>

      <section id="litres" className="tb-section" aria-labelledby="h-litres">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-litres" className="tb-h2 pg-h2">Volume of a cylinder in litres (capacity)</h2>
          <MathMd md={R`Capacity is how much a container holds. Work out the volume, then convert:

| Volume | Capacity |
|---|---|
| $1$ cm³ | $1$ mL |
| $1000$ cm³ | $1$ L |
| $1$ m³ | $1000$ L |`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A drink can has diameter $6.6$ cm and height $12$ cm. How many millilitres does it hold, to the nearest millilitre?

$$r = 3.3 \text{ cm}$$
$$V = \pi \times 3.3^2 \times 12$$
$$V = \pi \times 10.89 \times 12 = 130.68\pi$$
$$V \approx 410.54 \text{ cm}^3$$

Since $1$ cm³ $= 1$ mL, the can holds about $411$ mL.`} />
          </div>
          <MathMd md={R`For the tank above, $1.70$ m³ is about $1.70 \times 1000 = 1700$ L. (Using the unrounded value, $0.54\pi \times 1000 \approx 1696$ L. Round at the end, not in the middle.)`} />
        </div>
      </section>

      <section id="reverse" className="tb-section" aria-labelledby="h-reverse">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-reverse" className="tb-h2 pg-h2">Finding the height or radius from the volume</h2>
          <MathMd md={R`Rearrange $V = \pi r^2 h$ for the measurement you need:

$$h = \frac{V}{\pi r^2} \qquad\qquad r = \sqrt{\frac{V}{\pi h}}$$`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: missing height</p>
            <MathMd md={R`A cylindrical jug holds $1$ L ($1000$ cm³) and has radius $5$ cm. How tall is it on the inside?

$$h = \frac{1000}{\pi \times 5^2} = \frac{1000}{25\pi}$$
$$h \approx 12.73 \text{ cm}$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: missing radius</p>
            <MathMd md={R`A cylinder has volume $500$ cm³ and height $12$ cm. Find its radius.

$$r^2 = \frac{500}{\pi \times 12} \approx 13.26$$
$$r = \sqrt{13.26\ldots} \approx 3.64 \text{ cm}$$`} />
          </div>
          <MathMd md={R`Check by substituting back: $\pi \times 3.64^2 \times 12 \approx 499.5$, which is $500$ allowing for rounding.`} />
        </div>
      </section>

      <section id="parts" className="tb-section" aria-labelledby="h-parts">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-parts" className="tb-h2 pg-h2">Half cylinders and hollow cylinders (pipes)</h2>
          <MathMd md={R`A **half cylinder** (like a trough or a tunnel) has half the volume: $V = \dfrac{1}{2}\pi r^2 h$.

A **hollow cylinder** (a pipe or tube) is a big cylinder with a smaller one removed. Subtract the inside from the outside:

$$V = \pi R^2 h - \pi r^2 h$$
$$V = \pi (R^2 - r^2) h$$

where $R$ is the outer radius and $r$ is the inner radius.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: a pipe</p>
            <MathMd md={R`A concrete pipe is $20$ cm long, with outer radius $5$ cm and inner radius $4$ cm. Find the volume of concrete.

$$V = \pi(5^2 - 4^2) \times 20$$
$$V = \pi \times 9 \times 20 = 180\pi$$
$$V \approx 565.49 \text{ cm}^3$$`} />
          </div>
          <MathMd md={R`Subtract the squares, not the radii: $5^2 - 4^2 = 9$, but $(5 - 4)^2 = 1$.`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Using the diameter as the radius.** Halve the diameter first. Otherwise the answer is four times too big.
- **Squaring the wrong thing.** Only the radius is squared. $\pi r^2 h$ means $\pi \times r \times r \times h$, not $(\pi r)^2 h$ or $\pi r^2 h^2$.
- **Mixed units.** A radius in cm and a height in m won't work. Convert so every length is in the same unit before you multiply.
- **Mixing up volume and surface area.** Volume is in cubic units (cm³) and uses $\pi r^2 h$. Surface area is in square units (cm²) and uses $2\pi r^2 + 2\pi r h$.
- **Rounding too early.** Keep the full value of $\pi r^2$ in your calculator and only round the final answer.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer. Decimal answers use the π button and are rounded to 2 decimal places unless the question says otherwise.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Got a cylinder question wrong? Don't just move on. Study your mistakes." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Volume by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-8-volume", text: "Volume of right prisms as area of the cross-section times the height, and capacity in mL and L." },
              { slug: "year-9-surface-area-volume", text: "Volume and surface area of cylinders, plus composite solids made from prisms and cylinders." },
              { slug: "year-10-surface-area-volume", text: "Composite objects, including hollow and drilled solids, and capacity problems like tanks and packaging." },
              { slug: "year-10a-pyramids-cones-spheres", text: "Cones and spheres. A cone has one third of the volume of a cylinder with the same radius and height." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

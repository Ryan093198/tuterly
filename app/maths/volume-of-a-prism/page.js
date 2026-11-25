import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import PrismVolumeCalc from "@/components/maths/PrismVolumeCalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a calculator: volume of a prism. Built by the daily
// page task (Nov 2026); not yet read by Ryan, so it's in UNREVIEWED_PATHS
// (lib/reviewed.js). Every example and practice answer was recomputed by
// script before publishing.

const PATH = "/maths/volume-of-a-prism";
const TITLE = "How to Find the Volume of a Prism: Formula, Examples and Calculator (Years 7 to 9) | Tuterly";
const DESCRIPTION =
  "How to find the volume of any prism with V = A × l: rectangular, triangular and trapezoidal prisms, L-shaped solids, litres and missing lengths. Worked examples, practice and a free calculator.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is the formula for the volume of a prism?", a: "V = A × l, where A is the area of the cross-section (the shape at the end) and l is the length of the prism, the distance between the two ends. Find the area of the end shape first, then multiply by the length. A prism with a 12 cm² cross-section and a length of 5 cm has a volume of 60 cm³." },
  { q: "How do you find the volume of a triangular prism?", a: "Find the area of the triangle with ½ × base × height, then multiply by the length of the prism. A prism whose triangle has base 3 m and height 2 m, and which is 4.5 m long, has volume ½ × 3 × 2 × 4.5 = 13.5 m³. Use the perpendicular height of the triangle, not a sloping side." },
  { q: "Is the volume of a rectangular prism length × width × height?", a: "Yes. The cross-section is a rectangle with area length × width, and the height is how far it runs. A box 8 cm by 5 cm by 3 cm has volume 8 × 5 × 3 = 120 cm³. It's the same V = A × l rule as every other prism." },
  { q: "How do I change the volume of a prism into litres?", a: "1 cm³ is 1 mL, 1000 cm³ is 1 L and 1 m³ is 1000 L. A fish tank measuring 60 cm by 30 cm by 40 cm has a volume of 72,000 cm³, which is 72 L. Work out the volume first, then convert." },
  { q: "Which face is the cross-section of a prism?", a: "The cross-section is the shape that stays the same all the way through the prism, so it's one of the two identical, parallel ends. It isn't always the face the prism is sitting on. A Toblerone-style box lying on its side still has a triangular cross-section." },
  { q: "Is a cylinder a prism?", a: "A cylinder works like a prism because its cross-section (a circle) is the same all the way along, so V = A × l still applies with A = πr². Strictly, a prism has flat faces and polygon ends, so many textbooks treat the cylinder as its own solid. See the volume of a cylinder page for that formula." },
];

const PRACTICE = [
  { q: R`Find the volume of a rectangular prism $8$ cm long, $5$ cm wide and $3$ cm high.`, a: R`$V = 8 \times 5 \times 3 = 120$ cm³` },
  { q: R`Find the volume of a cube with side length $6$ cm.`, a: R`$V = 6 \times 6 \times 6 = 216$ cm³` },
  { q: R`A triangular prism has a right-angled triangle for its cross-section, with the two shorter sides $6$ cm and $8$ cm. The prism is $15$ cm long. Find its volume.`, a: R`$A = \dfrac{1}{2} \times 6 \times 8 = 24$ cm², so $V = 24 \times 15 = 360$ cm³` },
  { q: R`A prism has a cross-section with area $42$ m² and a length of $7$ m. Find its volume.`, a: R`$V = 42 \times 7 = 294$ m³` },
  { q: R`A trapezoidal prism has parallel sides $5$ cm and $9$ cm, a trapezium height of $4$ cm and a length of $10$ cm. Find its volume.`, a: R`$A = \dfrac{1}{2}(5 + 9) \times 4 = 28$ cm², so $V = 28 \times 10 = 280$ cm³` },
  { q: R`A lunchbox is $20$ cm long, $15$ cm wide and $6$ cm deep. How many litres does it hold?`, a: R`$V = 20 \times 15 \times 6 = 1800$ cm³. Since $1000$ cm³ $= 1$ L, it holds $1.8$ L.` },
  { q: R`A triangular prism has volume $240$ cm³ and a cross-section area of $16$ cm². How long is it?`, a: R`$l = \dfrac{V}{A} = \dfrac{240}{16} = 15$ cm` },
  { q: R`A sandpit is $2$ m long and $1.5$ m wide, and the sand is $25$ cm deep. Find the volume of sand in m³ and in litres.`, a: R`$25$ cm $= 0.25$ m, so $V = 2 \times 1.5 \times 0.25 = 0.75$ m³, which is $750$ L.` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Volume of a prism", path: PATH }]}
      eyebrow="Maths explained · Years 7 to 9"
      h1="How to find the volume of a prism"
      lead="A prism is a solid with the same shape all the way through, like a loaf of bread, a tent or a shipping container. That makes its volume easy: find the area of the end, then multiply by how long it is. Here’s the formula, how it works for rectangular, triangular, trapezoidal and L-shaped prisms, how to get litres, and how to work back to a missing length, with a calculator that shows every step."
      quickAnswer="Volume of a prism = area of the cross-section × length, or V = A × l. The cross-section is the shape at the end that stays the same all the way through. For a rectangular prism that's length × width × height. For a triangular prism, find ½ × base × height of the triangle, then multiply by the length. Volume is in cubic units like cm³ or m³, and 1000 cm³ = 1 litre."
      toc={[
        ["formula", "The formula"],
        ["rectangular", "Rectangular prisms"],
        ["triangular", "Triangular prisms"],
        ["calculator", "Calculator"],
        ["trapezoidal", "Trapezoidal prisms"],
        ["composite", "L-shaped and composite prisms"],
        ["reverse", "Finding a missing length"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a volume question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_volume_of_a_prism"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="Volume of a prism: common questions"
      links={[
        { href: "/worksheets/year-8-volume", label: "Year 8 volume worksheets" },
        { href: "/worksheets/year-7-volume", label: "Year 7 volume worksheets" },
        { href: "/maths/volume-of-a-cylinder", label: "Volume of a cylinder" },
        { href: "/year-8-maths-test", label: "Year 8 maths practice test" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Lost marks on a volume question?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="formula" className="tb-section" aria-labelledby="h-formula">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-formula" className="tb-h2 pg-h2">The volume of a prism formula</h2>
          <div className="mx-formula"><MathMd md={R`$$V = A \times l$$`} /></div>
          <MathMd md={R`Picture a prism as a stack of identical thin slices, each one the same shape as the end. The area of one slice is $A$, and stacking them along the length $l$ fills the whole solid. So

$$V = \underbrace{A}_{\text{area of the cross-section}} \times \underbrace{l}_{\text{length of the prism}}$$

- $A$ is the **area of the cross-section**: the shape at either end that stays the same all the way through.
- $l$ is the **length** (sometimes called the height or depth): the distance between the two ends, measured at right angles to them.
- Volume is in **cubic units**: mm³, cm³ or m³.

The only part that changes from prism to prism is how you find $A$. Name the prism after its cross-section, use the area formula for that shape, then multiply by the length.`} />
        </div>
      </section>

      <section id="rectangular" className="tb-section" aria-labelledby="h-rectangular">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-rectangular" className="tb-h2 pg-h2">Volume of a rectangular prism</h2>
          <MathMd md={R`A rectangular prism (a cuboid) has a rectangle for its cross-section, so $A = l \times w$ and the volume becomes

$$V = l \times w \times h$$`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A fish tank is $60$ cm long, $30$ cm wide and $40$ cm high. Find its volume, and how many litres it holds when full.

$$A = 60 \times 30 = 1800 \text{ cm}^2$$
$$V = 1800 \times 40 = 72\,000 \text{ cm}^3$$

Since $1000$ cm³ $= 1$ L, the tank holds $72\,000 \div 1000 = 72$ L.`} />
          </div>
          <MathMd md={R`You can multiply the three measurements in any order and get the same answer. A cube is a rectangular prism with all three the same, so $V = s^3$.`} />
        </div>
      </section>

      <section id="triangular" className="tb-section" aria-labelledby="h-triangular">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-triangular" className="tb-h2 pg-h2">Volume of a triangular prism</h2>
          <MathMd md={R`The cross-section is a triangle, so find its area with $A = \dfrac{1}{2} \times b \times h$ first, then multiply by the length of the prism:

$$V = \frac{1}{2} \times b \times h \times l$$

There are two different "heights" here. $h$ is the perpendicular height of the **triangle**; $l$ is how long the **prism** is.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A camping tent is a triangular prism. The triangular end has a base of $3$ m and a height of $2$ m, and the tent is $4.5$ m long. Find the volume of air inside.

$$A = \frac{1}{2} \times 3 \times 2 = 3 \text{ m}^2$$
$$V = 3 \times 4.5 = 13.5 \text{ m}^3$$`} />
          </div>
          <MathMd md={R`If the diagram also shows the sloping sides of the triangle, ignore them for volume. The area of a triangle needs the height measured straight up from the base, at right angles to it.`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Volume of a prism calculator (with working)</h2>
          <p className="pg-intro">Pick the cross-section, enter the measurements and see each step. Use “Any cross-section” when you already know the area of the end, and “Find the length” to work backwards from the volume. Type mm, cm or m in the units box to get the capacity in mL or L as well.</p>
          <PrismVolumeCalc placement="concept_volume_of_a_prism_calc" />
        </div>
      </section>

      <section id="trapezoidal" className="tb-section" aria-labelledby="h-trapezoidal">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-trapezoidal" className="tb-h2 pg-h2">Volume of a trapezoidal prism</h2>
          <MathMd md={R`When the cross-section is a trapezium, use the trapezium area formula for $A$:

$$A = \frac{1}{2}(a + b) \times h$$

where $a$ and $b$ are the parallel sides and $h$ is the distance between them. Swimming pools with a shallow end and a deep end are the classic example, because the side view is a trapezium.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A pool is $25$ m long and $10$ m wide. It is $1$ m deep at the shallow end and $2$ m deep at the deep end, sloping evenly. How many litres of water fill it?

The side view is a trapezium with parallel sides $1$ m and $2$ m, $25$ m apart:

$$A = \frac{1}{2}(1 + 2) \times 25 = 37.5 \text{ m}^2$$

The prism runs across the width of the pool:

$$V = 37.5 \times 10 = 375 \text{ m}^3$$

Since $1$ m³ $= 1000$ L, the pool holds $375\,000$ L.`} />
          </div>
          <MathMd md={R`Here the $25$ m length of the pool is the height of the trapezium, and the $10$ m width is the length of the prism. Sketch the cross-section first so you know which measurement goes where.`} />
        </div>
      </section>

      <section id="composite" className="tb-section" aria-labelledby="h-composite">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-composite" className="tb-h2 pg-h2">L-shaped and composite prisms</h2>
          <MathMd md={R`An L-shaped solid, a set of steps or a beam with a T-shaped end is still a prism, as long as the end shape stays the same all the way through. Split the cross-section into rectangles (or triangles), add their areas to get $A$, then multiply by the length once.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A concrete step has two levels. From the side, the bottom level is a rectangle $60$ cm deep and $20$ cm high, and the top level sits on its back half: a rectangle $30$ cm deep and $20$ cm high. The step is $1.2$ m wide. Find the volume of concrete in m³.

Area of the cross-section:

$$A = 60 \times 20 + 30 \times 20 = 1200 + 600 = 1800 \text{ cm}^2$$

Use the same units: $1.2$ m $= 120$ cm.

$$V = 1800 \times 120 = 216\,000 \text{ cm}^3$$

There are $100 \times 100 \times 100 = 1\,000\,000$ cm³ in $1$ m³, so

$$V = 216\,000 \div 1\,000\,000 = 0.216 \text{ m}^3$$`} />
          </div>
          <MathMd md={R`Check that it really is a prism before you use $V = A \times l$. A pyramid or a cone gets narrower towards the top, so its slices aren't all the same and it needs a different formula.`} />
        </div>
      </section>

      <section id="reverse" className="tb-section" aria-labelledby="h-reverse">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-reverse" className="tb-h2 pg-h2">Finding a missing length from the volume</h2>
          <MathMd md={R`Rearrange $V = A \times l$ for whatever is missing:

$$l = \frac{V}{A} \qquad\qquad A = \frac{V}{l}$$`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A storage tub has a rectangular base $30$ cm by $20$ cm and holds $18$ L. How deep is it?

Convert the capacity to cm³: $18$ L $= 18 \times 1000 = 18\,000$ cm³.

$$A = 30 \times 20 = 600 \text{ cm}^2$$
$$h = \frac{18\,000}{600} = 30 \text{ cm}$$

Check: $30 \times 20 \times 30 = 18\,000$ cm³ $= 18$ L ✓`} />
          </div>
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Forgetting the ½ for a triangular prism.** Multiplying base × height × length gives a rectangular prism, twice the size. The triangle's area is $\frac{1}{2} \times b \times h$.
- **Using a sloping side as the height.** The height of a triangle or trapezium is measured at right angles to the base. A slanted edge is always longer, so the answer comes out too big.
- **Picking the wrong face as the cross-section.** The cross-section is the face that's the same all the way through, not the face the prism happens to be resting on. Find the pair of identical, parallel ends.
- **Mixing units.** In the sandpit question, $2 \times 1.5 \times 25 = 75$ is wrong because $25$ is in cm. Convert every length to the same unit first: $25$ cm $= 0.25$ m.
- **Converting cm³ to m³ by dividing by 100.** $1$ m³ $= 100 \times 100 \times 100 = 1\,000\,000$ cm³, so divide by a million. For capacity, $1000$ cm³ $= 1$ L.
- **Writing square units.** Volume is three lengths multiplied, so the units are cubed: cm³, not cm².`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer. Sketch the cross-section first whenever the prism isn't a box.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Dropped marks on a volume question? Study the mistake, not just the answer." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Volume by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-7-volume", text: "Volume of rectangular and triangular prisms with V = A × l, and simple word problems." },
              { slug: "year-8-volume", text: "Volume and capacity of right prisms, trapezoidal cross-sections and working back to a missing measurement." },
              { slug: "year-9-surface-area-volume", text: "Cylinders and composite solids, plus surface area of prisms for the first time." },
              { slug: "year-10-surface-area-volume", text: "Composite objects and capacity problems such as tanks and packaging." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

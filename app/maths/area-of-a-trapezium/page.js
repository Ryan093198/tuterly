import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import TrapeziumAreaCalc from "@/components/maths/TrapeziumAreaCalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a calculator: area of a trapezium. Built by the daily
// page task (Nov 2026); not yet read by Ryan, so it's in UNREVIEWED_PATHS
// (lib/reviewed.js). Every example and practice answer was recomputed by
// script before publishing.

const PATH = "/maths/area-of-a-trapezium";
const TITLE = "Area of a Trapezium: Formula, Worked Examples and Calculator (Years 7 to 9) | Tuterly";
const DESCRIPTION =
  "How to find the area of a trapezium with A = ½(a + b)h, why the formula works, right and isosceles trapeziums, and finding a missing height or side. Free calculator.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is the formula for the area of a trapezium?", a: "A = ½(a + b)h. Add the two parallel sides, halve the total, then multiply by the perpendicular height between them. A trapezium with parallel sides 6 cm and 10 cm and a height of 4 cm has area ½ × 16 × 4 = 32 cm²." },
  { q: "Which sides are a and b in a trapezium?", a: "a and b are the two parallel sides, the pair that never meet however far you extend them. It doesn't matter which one you call a and which one you call b, because you add them. The other two sides (the legs) aren't in the formula at all." },
  { q: "Is the height of a trapezium the same as the sloping side?", a: "No. The height is the perpendicular distance between the parallel sides, measured at right angles to them. A sloping side is always longer than the height. The only time a side is the height is in a right trapezium, where one leg meets the parallel sides at 90°." },
  { q: "Why do you halve (a + b) in the trapezium formula?", a: "½(a + b) is the average of the two parallel sides. A trapezium has the same area as a rectangle whose width is that average and whose height is h. Another way to see it: two identical trapeziums, one flipped, fit together into a parallelogram with base a + b and height h, so one trapezium is half of that." },
  { q: "How do you find the height of a trapezium from its area?", a: "Rearrange the formula to h = 2A ÷ (a + b). If the area is 63 m² and the parallel sides are 8 m and 10 m, then h = 126 ÷ 18 = 7 m. Check by putting it back in: ½ × 18 × 7 = 63." },
  { q: "Is a trapezium the same as a trapezoid?", a: "In Australia and the UK a trapezium is a four-sided shape with at least one pair of parallel sides. In the US the same shape is usually called a trapezoid. The area formula is the same whichever name your textbook uses." },
];

const PRACTICE = [
  { q: R`Find the area of a trapezium with parallel sides $5$ cm and $9$ cm and a height of $6$ cm.`, a: R`$A = \dfrac{1}{2}(5 + 9) \times 6 = \dfrac{1}{2} \times 14 \times 6 = 42$ cm²` },
  { q: R`A trapezium has parallel sides $12$ m and $20$ m, $7$ m apart. Find its area.`, a: R`$A = \dfrac{1}{2}(12 + 20) \times 7 = 16 \times 7 = 112$ m²` },
  { q: R`Find the area of a trapezium with parallel sides $4.5$ cm and $7.5$ cm and a height of $3.2$ cm.`, a: R`$A = \dfrac{1}{2}(4.5 + 7.5) \times 3.2 = 6 \times 3.2 = 19.2$ cm²` },
  { q: R`A right trapezium has parallel sides $11$ cm and $16$ cm, a side of $12$ cm at right angles to both, and a sloping side of $13$ cm. Find its area and its perimeter.`, a: R`The $12$ cm side is the height: $A = \dfrac{1}{2}(11 + 16) \times 12 = 162$ cm². Perimeter $= 11 + 16 + 12 + 13 = 52$ cm.` },
  { q: R`A trapezium has an area of $90$ cm² and parallel sides of $13$ cm and $17$ cm. Find its height.`, a: R`$h = \dfrac{2 \times 90}{13 + 17} = \dfrac{180}{30} = 6$ cm` },
  { q: R`A trapezium has an area of $40$ m², a height of $5$ m and one parallel side of $6$ m. Find the other parallel side.`, a: R`$a + b = \dfrac{2 \times 40}{5} = 16$, so the other side is $16 - 6 = 10$ m` },
  { q: R`An isosceles trapezium has parallel sides $8$ cm and $20$ cm, and each sloping side is $10$ cm. Find its height and its area.`, a: R`Each end sticks out $\dfrac{20 - 8}{2} = 6$ cm, so $h = \sqrt{10^2 - 6^2} = 8$ cm and $A = \dfrac{1}{2}(8 + 20) \times 8 = 112$ cm²` },
  { q: R`A trapezium-shaped garden bed has parallel edges of $1.5$ m and $90$ cm, and they are $60$ cm apart. Find its area in m².`, a: R`In metres: $0.9$ m and $0.6$ m. $A = \dfrac{1}{2}(1.5 + 0.9) \times 0.6 = 0.72$ m²` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Area of a trapezium", path: PATH }]}
      eyebrow="Maths explained · Years 7 to 9"
      h1="How to find the area of a trapezium"
      lead="A trapezium is a four-sided shape with one pair of parallel sides. You’ll see it in the side view of a ramp, a handbag, a dam wall or a block of land that narrows at the back. Its area takes one short formula. Here’s that formula, why it works, how to spot the real height, and how to work backwards to a missing height or side, with a calculator that shows the working."
      quickAnswer="Area of a trapezium = ½ × (sum of the parallel sides) × height, or A = ½(a + b)h. Add the two parallel sides, halve the total, then multiply by the perpendicular height between them. For parallel sides of 6 cm and 10 cm, 4 cm apart: A = ½ × 16 × 4 = 32 cm². The sloping sides aren’t used."
      toc={[
        ["formula", "The formula"],
        ["why", "Why it works"],
        ["examples", "Worked examples"],
        ["calculator", "Calculator"],
        ["right", "Right trapeziums"],
        ["reverse", "Finding a missing height or side"],
        ["isosceles", "Isosceles trapeziums and Pythagoras"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on an area question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_area_of_a_trapezium"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="Area of a trapezium: common questions"
      links={[
        { href: "/worksheets/year-8-area-perimeter", label: "Year 8 area and perimeter worksheets" },
        { href: "/worksheets/year-7-area-perimeter", label: "Year 7 area and perimeter worksheets" },
        { href: "/maths/volume-of-a-prism", label: "Volume of a prism" },
        { href: "/year-8-maths-test", label: "Year 8 maths practice test" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Lost marks on an area question?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="formula" className="tb-section" aria-labelledby="h-formula">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-formula" className="tb-h2 pg-h2">The area of a trapezium formula</h2>
          <div className="mx-formula"><MathMd md={R`$$A = \frac{1}{2}(a + b)h$$`} /></div>
          <MathMd md={R`- $a$ and $b$ are the **parallel sides**. It doesn’t matter which is which.
- $h$ is the **perpendicular height**: the shortest distance between the parallel sides, measured at right angles to them.
- Area is in **square units**: mm², cm², m² or km².

The two slanted sides (the legs) don’t appear in the formula. You only need them when the height isn’t given and you have to work it out, which is covered further down.`} />
        </div>
      </section>

      <section id="why" className="tb-section" aria-labelledby="h-why">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-why" className="tb-h2 pg-h2">Why the formula works</h2>
          <MathMd md={R`Take two copies of the same trapezium and turn one upside down. Slide them together and they make a parallelogram. Its base is $a + b$ (one short side and one long side end to end) and its height is still $h$, so its area is $(a + b)h$. One trapezium is half of that:

$$A = \frac{1}{2}(a + b)h$$

You can also read the formula as **average width × height**. $\frac{1}{2}(a + b)$ is the average of the two parallel sides, so a trapezium has the same area as a rectangle with that average width and the same height. If the top is $6$ cm and the bottom is $10$ cm, the average width is $8$ cm.`} />
        </div>
      </section>

      <section id="examples" className="tb-section" aria-labelledby="h-examples">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-examples" className="tb-h2 pg-h2">Worked examples</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example 1</p>
            <MathMd md={R`Find the area of a trapezium with parallel sides $6$ cm and $10$ cm and a height of $4$ cm.

$$a + b = 6 + 10 = 16$$
$$A = \frac{1}{2} \times 16 \times 4 = 32 \text{ cm}^2$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example 2: decimals</p>
            <MathMd md={R`A wheelchair ramp is boxed in at the side by a timber panel shaped like a trapezium. The panel’s parallel edges are $0.35$ m and $0.15$ m, and they are $2.4$ m apart. How much timber does the panel need?

$$a + b = 0.35 + 0.15 = 0.5$$
$$A = \frac{1}{2} \times 0.5 \times 2.4 = 0.6 \text{ m}^2$$

Here the trapezium lies on its side, so the “height” is the $2.4$ m run along the ground. The height is always the distance between the two parallel sides, whichever way the shape is turned.`} />
          </div>
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Area of a trapezium calculator (with working)</h2>
          <p className="pg-intro">Enter the two parallel sides and the height to get the area, or switch tabs to find a missing height, a missing parallel side, or the area of an isosceles trapezium when you only know its sloping sides.</p>
          <TrapeziumAreaCalc placement="concept_area_of_a_trapezium_calc" />
        </div>
      </section>

      <section id="right" className="tb-section" aria-labelledby="h-right">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-right" className="tb-h2 pg-h2">Right trapeziums: which side is the height?</h2>
          <MathMd md={R`A right trapezium has one leg at right angles to both parallel sides. That leg **is** the height. The other leg slopes, and it’s a trap: it’s longer than the height, so using it gives an area that’s too big.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example 3</p>
            <MathMd md={R`A block of land is a right trapezium. Its street frontage is $15$ m, its back fence is $9$ m and parallel to the street, the side fence at right angles to both is $8$ m, and the other side fence slopes and is $10$ m. Find the area of the block and the total length of fencing around it.

The $8$ m side meets the parallel sides at $90°$, so $h = 8$:

$$A = \frac{1}{2}(15 + 9) \times 8 = 12 \times 8 = 96 \text{ m}^2$$

Perimeter uses every side, including the sloping one:

$$P = 15 + 9 + 8 + 10 = 42 \text{ m}$$`} />
          </div>
          <MathMd md={R`Area needs the height; perimeter needs all four sides. Questions that ask for both are checking you know the difference.`} />
        </div>
      </section>

      <section id="reverse" className="tb-section" aria-labelledby="h-reverse">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-reverse" className="tb-h2 pg-h2">Finding a missing height or parallel side</h2>
          <MathMd md={R`Double both sides of $A = \frac{1}{2}(a + b)h$ to get rid of the half, then divide:

$$h = \frac{2A}{a + b} \qquad\qquad a + b = \frac{2A}{h}$$`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example 4: the height</p>
            <MathMd md={R`A trapezium has an area of $63$ m² and parallel sides of $8$ m and $10$ m. How far apart are the parallel sides?

$$h = \frac{2 \times 63}{8 + 10} = \frac{126}{18} = 7 \text{ m}$$

Check: $\frac{1}{2} \times 18 \times 7 = 63$ ✓`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example 5: a parallel side</p>
            <MathMd md={R`A trapezium has an area of $54$ cm², a height of $6$ cm and one parallel side of $7$ cm. Find the other parallel side.

$$a + b = \frac{2 \times 54}{6} = 18$$
$$b = 18 - 7 = 11 \text{ cm}$$

Check: $\frac{1}{2}(7 + 11) \times 6 = 9 \times 6 = 54$ ✓`} />
          </div>
        </div>
      </section>

      <section id="isosceles" className="tb-section" aria-labelledby="h-isosceles">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-isosceles" className="tb-h2 pg-h2">Isosceles trapeziums: finding the height with Pythagoras</h2>
          <MathMd md={R`An isosceles trapezium has two equal sloping sides, like the cross-section of a gutter or a lampshade. If a question gives the sloping sides instead of the height, drop a perpendicular from each end of the short side. That makes a rectangle in the middle and two matching right-angled triangles at the ends.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example 6</p>
            <MathMd md={R`An isosceles trapezium has parallel sides $10$ cm and $22$ cm, and each sloping side is $10$ cm. Find its area.

1. The long side is $22 - 10 = 12$ cm longer, shared between the two ends, so each triangle has a base of $12 \div 2 = 6$ cm.
2. The sloping side is the hypotenuse:
$$h = \sqrt{10^2 - 6^2} = \sqrt{64} = 8 \text{ cm}$$
3. Now use the formula:
$$A = \frac{1}{2}(10 + 22) \times 8 = 16 \times 8 = 128 \text{ cm}^2$$`} />
          </div>
          <MathMd md={R`This combination of Pythagoras and area is common in Year 9 tests. If the square root doesn’t come out whole, keep the full value in your calculator until the last step and round only the final area.`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Using a sloping side as the height.** In worked example 3, using $10$ m instead of $8$ m gives $120$ m², which is too big. The height meets the parallel sides at a right angle.
- **Forgetting to halve.** $(6 + 10) \times 4 = 64$ is the area of the parallelogram made from two trapeziums. One trapezium is half of it: $32$ cm².
- **Halving only one of the sides.** $\frac{1}{2} \times 6 + 10$ is not $\frac{1}{2}(6 + 10)$. Add the parallel sides first, then halve the total. On a calculator, use brackets.
- **Adding a non-parallel side.** $a$ and $b$ must be the pair of parallel sides. In an isosceles trapezium, the two equal sides are the legs, not $a$ and $b$.
- **Mixing units.** In the last practice question, $\frac{1}{2}(1.5 + 90) \times 60$ is meaningless. Change every length to metres (or every length to centimetres) before you substitute.
- **Leaving out the 2 when working backwards.** From $A = 54$, $h = 6$, the parallel sides add to $\frac{2 \times 54}{6} = 18$, not $\frac{54}{6} = 9$.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer. Mark the two parallel sides on a quick sketch first, then find the height.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Picked the wrong height again? Study the mistake, not just the answer." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Trapeziums by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-7-area-perimeter", text: "Areas of rectangles, triangles and parallelograms: the building blocks the trapezium formula comes from." },
              { slug: "year-8-area-perimeter", text: "Trapeziums, rhombuses and kites, plus irregular and composite shapes split into parts." },
              { slug: "year-8-volume", text: "Trapezoidal prisms: find the trapezium’s area, then multiply by the length." },
              { slug: "year-9-pythagoras", text: "Finding a missing height with Pythagoras before using the area formula." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

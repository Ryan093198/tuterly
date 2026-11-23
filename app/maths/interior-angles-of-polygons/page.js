import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import InteriorAnglesCalc from "@/components/maths/InteriorAnglesCalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a calculator: interior angles of polygons. Built by the
// daily page task (Nov 2026); not yet read by Ryan, so it's in
// UNREVIEWED_PATHS (lib/reviewed.js). Every example, practice answer and
// calculator test case was recomputed by script before publishing.

const PATH = "/maths/interior-angles-of-polygons";
const TITLE = "Interior Angles of Polygons: Angle Sum Formula, Examples and Calculator | Tuterly";
const DESCRIPTION =
  "How to find the sum of the interior angles of any polygon with (n − 2) × 180°, each angle of a regular polygon, missing angles and the number of sides. Free calculator.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is the formula for the sum of the interior angles of a polygon?", a: "Angle sum = (n − 2) × 180°, where n is the number of sides. A hexagon has 6 sides, so its interior angles add to (6 − 2) × 180° = 720°. The formula works for every polygon, regular or not, as long as it has straight sides." },
  { q: "Why do you subtract 2 in the interior angle formula?", a: "Pick one corner and draw lines to every other corner you can. Those lines split the polygon into triangles, and there are always 2 fewer triangles than sides, because the two sides that meet at your chosen corner don't get a triangle of their own. Each triangle holds 180°, so the total is (n − 2) × 180°." },
  { q: "How do you find one interior angle of a regular polygon?", a: "Find the angle sum, then divide by the number of angles, since they are all equal: (n − 2) × 180° ÷ n. A regular octagon has an angle sum of 1080°, so each angle is 1080° ÷ 8 = 135°. Another way is 180° minus the exterior angle, 360° ÷ n." },
  { q: "What do the exterior angles of a polygon add up to?", a: "360°, whatever the number of sides. If you walk around the outside of a polygon and turn at every corner, you turn through one full revolution by the time you are back where you started. In a regular polygon each exterior angle is 360° ÷ n." },
  { q: "How do you work out the number of sides from the interior angles?", a: "If you know the angle sum, divide it by 180° and add 2. An angle sum of 1260° gives 1260 ÷ 180 = 7, so n = 9. If you know one angle of a regular polygon, find the exterior angle (180° minus it) and divide 360° by that. An interior angle of 140° gives an exterior angle of 40°, so n = 360 ÷ 40 = 9." },
  { q: "What year level learns interior angles of polygons?", a: "In the Victorian Curriculum 2.0, Year 7 shows that the angles in a triangle add to 180° and uses that to find the angle sum of other shapes. Year 8 applies angle properties to quadrilaterals, and later years use polygon angles in geometry problems and proofs." },
];

const PRACTICE = [
  { q: R`Find the sum of the interior angles of a heptagon (7 sides).`, a: R`$(7 - 2) \times 180^\circ = 5 \times 180^\circ = 900^\circ$` },
  { q: R`Find the sum of the interior angles of a dodecagon (12 sides).`, a: R`$(12 - 2) \times 180^\circ = 10 \times 180^\circ = 1800^\circ$` },
  { q: R`Find the size of each interior angle of a regular nonagon (9 sides).`, a: R`Angle sum $= 7 \times 180^\circ = 1260^\circ$. Each angle $= 1260^\circ \div 9 = 140^\circ$` },
  { q: R`A stop sign is a regular octagon. Find each interior angle and each exterior angle.`, a: R`Angle sum $= 6 \times 180^\circ = 1080^\circ$, so each interior angle $= 1080^\circ \div 8 = 135^\circ$. Each exterior angle $= 360^\circ \div 8 = 45^\circ$, and $135^\circ + 45^\circ = 180^\circ$ ✓` },
  { q: R`Three angles of a quadrilateral are $85^\circ$, $110^\circ$ and $72^\circ$. Find the fourth angle.`, a: R`$360^\circ - (85^\circ + 110^\circ + 72^\circ) = 360^\circ - 267^\circ = 93^\circ$` },
  { q: R`Five angles of a hexagon are $120^\circ$, $135^\circ$, $100^\circ$, $140^\circ$ and $115^\circ$. Find the sixth angle.`, a: R`Angle sum $= 4 \times 180^\circ = 720^\circ$. Known angles $= 610^\circ$. Sixth angle $= 720^\circ - 610^\circ = 110^\circ$` },
  { q: R`The interior angles of a polygon add to $2520^\circ$. How many sides does it have?`, a: R`$n - 2 = 2520 \div 180 = 14$, so $n = 16$ sides` },
  { q: R`Each interior angle of a regular polygon is $162^\circ$. How many sides does it have?`, a: R`Exterior angle $= 180^\circ - 162^\circ = 18^\circ$, so $n = 360 \div 18 = 20$ sides` },
  { q: R`Can a regular polygon have interior angles of $130^\circ$? Explain.`, a: R`No. The exterior angle would be $50^\circ$, and $360 \div 50 = 7.2$, which isn't a whole number of sides.` },
  { q: R`The angles of a pentagon are $x$, $x + 10^\circ$, $2x$, $100^\circ$ and $110^\circ$. Find $x$ and the size of each angle.`, a: R`Angle sum $= 540^\circ$, so $4x + 220 = 540$, $4x = 320$, $x = 80^\circ$. The angles are $80^\circ$, $90^\circ$, $160^\circ$, $100^\circ$ and $110^\circ$, which add to $540^\circ$ ✓` },
];

const TABLE = R`| Polygon | Sides $n$ | Triangles $n - 2$ | Angle sum | Each angle if regular |
|---|---|---|---|---|
| Triangle | $3$ | $1$ | $180^\circ$ | $60^\circ$ |
| Quadrilateral | $4$ | $2$ | $360^\circ$ | $90^\circ$ |
| Pentagon | $5$ | $3$ | $540^\circ$ | $108^\circ$ |
| Hexagon | $6$ | $4$ | $720^\circ$ | $120^\circ$ |
| Heptagon | $7$ | $5$ | $900^\circ$ | $\approx 128.57^\circ$ |
| Octagon | $8$ | $6$ | $1080^\circ$ | $135^\circ$ |
| Nonagon | $9$ | $7$ | $1260^\circ$ | $140^\circ$ |
| Decagon | $10$ | $8$ | $1440^\circ$ | $144^\circ$ |
| Dodecagon | $12$ | $10$ | $1800^\circ$ | $150^\circ$ |`;

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Interior angles of polygons", path: PATH }]}
      eyebrow="Maths explained · Years 7 to 10"
      h1="Interior angles of polygons"
      lead="Every polygon can be cut into triangles, and that one idea gives you the angle sum of any shape with straight sides. Here’s the formula and why it works, how to find each angle of a regular polygon, how to find a missing angle, and how to work backwards to the number of sides, with a calculator that sketches the polygon and shows every step."
      quickAnswer="The interior angles of a polygon with n sides add to (n − 2) × 180°. A pentagon’s angles add to 540°, a hexagon’s to 720° and an octagon’s to 1080°. In a regular polygon every angle is equal, so each one is (n − 2) × 180° ÷ n. The exterior angles of any polygon always add to 360°."
      toc={[
        ["formula", "The angle sum formula"],
        ["table", "Angle sums table"],
        ["sum", "Finding the angle sum"],
        ["regular", "Regular polygons"],
        ["calculator", "Calculator"],
        ["missing", "Finding a missing angle"],
        ["sides", "Finding the number of sides"],
        ["exterior", "Exterior angles"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a polygon angle question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_interior_angles_of_polygons"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="Interior angles of polygons: common questions"
      links={[
        { href: "/worksheets/year-7-angles-in-triangles", label: "Year 7 angle sum worksheets" },
        { href: "/worksheets/year-8-quadrilaterals", label: "Year 8 quadrilaterals worksheets" },
        { href: "/worksheets/year-7-angles", label: "Year 7 angles worksheets" },
        { href: "/year-7-maths-test", label: "Year 7 maths practice test" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Lost marks on an angle sum question?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="formula" className="tb-section" aria-labelledby="h-formula">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-formula" className="tb-h2 pg-h2">The interior angle sum formula</h2>
          <div className="mx-formula"><MathMd md={R`$$S = (n - 2) \times 180^\circ$$`} /></div>
          <MathMd md={R`Here $S$ is the sum of the interior angles and $n$ is the number of sides. An **interior angle** is an angle inside the polygon, at one of its corners (vertices).

**Why it works.** Choose one vertex and draw a diagonal to every vertex that isn't next to it. The polygon is now cut into triangles. A pentagon gives $3$ triangles, a hexagon $4$ and an octagon $6$: always $2$ fewer than the number of sides. The angles of all the triangles together make up the angles of the polygon exactly, and each triangle has $180^\circ$, so

$$S = (\text{number of triangles}) \times 180^\circ = (n - 2) \times 180^\circ$$

The formula works for any polygon with straight sides, whether it's regular or irregular. The calculator below draws the triangles for you.`} />
        </div>
      </section>

      <section id="table" className="tb-section" aria-labelledby="h-table">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-table" className="tb-h2 pg-h2">Interior angle sums of common polygons</h2>
          <MathMd md={TABLE} />
          <MathMd md={R`Each extra side adds one more triangle, so the angle sum goes up by $180^\circ$ every time.`} />
        </div>
      </section>

      <section id="sum" className="tb-section" aria-labelledby="h-sum">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-sum" className="tb-h2 pg-h2">Finding the angle sum of a polygon</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the sum of the interior angles of an octagon.

An octagon has $8$ sides, so $n = 8$.
$$S = (8 - 2) \times 180^\circ$$
$$S = 6 \times 180^\circ = 1080^\circ$$`} />
          </div>
          <MathMd md={R`Quick check: $6$ triangles at $180^\circ$ each. If your answer isn't a multiple of $180^\circ$, something has gone wrong.`} />
        </div>
      </section>

      <section id="regular" className="tb-section" aria-labelledby="h-regular">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-regular" className="tb-h2 pg-h2">Each interior angle of a regular polygon</h2>
          <MathMd md={R`A **regular** polygon has all sides equal and all angles equal, so share the angle sum equally between the $n$ angles:

$$\text{each interior angle} = \frac{(n - 2) \times 180^\circ}{n}$$`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the size of each interior angle of a regular decagon.

A decagon has $10$ sides.
$$S = (10 - 2) \times 180^\circ = 1440^\circ$$
$$\text{each angle} = \frac{1440^\circ}{10} = 144^\circ$$`} />
          </div>
          <MathMd md={R`Only divide when the polygon is regular. In an irregular decagon the angles still add to $1440^\circ$, but they aren't all $144^\circ$.`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Interior angles calculator (with working)</h2>
          <p className="pg-intro">Find the angle sum, each angle of a regular polygon, a missing angle, or work back to the number of sides. The sketch splits the polygon into triangles from one corner so you can see where the formula comes from.</p>
          <InteriorAnglesCalc placement="concept_interior_angles_calc" />
        </div>
      </section>

      <section id="missing" className="tb-section" aria-labelledby="h-missing">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-missing" className="tb-h2 pg-h2">Finding a missing angle in a polygon</h2>
          <MathMd md={R`Work out the angle sum, add up the angles you know, and subtract.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Four angles of a pentagon are $110^\circ$, $95^\circ$, $120^\circ$ and $105^\circ$. Find the fifth angle.

$$S = (5 - 2) \times 180^\circ = 540^\circ$$
$$110^\circ + 95^\circ + 120^\circ + 105^\circ = 430^\circ$$
$$\text{fifth angle} = 540^\circ - 430^\circ = 110^\circ$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: with algebra</p>
            <MathMd md={R`The angles of a hexagon are $2x$, $3x$, $110^\circ$, $130^\circ$, $140^\circ$ and $125^\circ$. Find $x$.

$$S = (6 - 2) \times 180^\circ = 720^\circ$$
Write an equation:
$$2x + 3x + 110 + 130 + 140 + 125 = 720$$
$$5x + 505 = 720$$
$$5x = 215$$
$$x = 43^\circ$$
So the two unknown angles are $2 \times 43^\circ = 86^\circ$ and $3 \times 43^\circ = 129^\circ$.`} />
          </div>
          <MathMd md={R`Check: $86 + 129 + 110 + 130 + 140 + 125 = 720$ ✓`} />
        </div>
      </section>

      <section id="sides" className="tb-section" aria-labelledby="h-sides">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-sides" className="tb-h2 pg-h2">Finding the number of sides</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: from the angle sum</p>
            <MathMd md={R`The interior angles of a polygon add to $1980^\circ$. How many sides does it have?

$$(n - 2) \times 180 = 1980$$
$$n - 2 = \frac{1980}{180} = 11$$
$$n = 13$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: from one angle of a regular polygon</p>
            <MathMd md={R`Each interior angle of a regular polygon is $156^\circ$. How many sides does it have?

The exterior angle at each corner is
$$180^\circ - 156^\circ = 24^\circ$$
The exterior angles add to $360^\circ$, so
$$n = \frac{360^\circ}{24^\circ} = 15$$`} />
          </div>
          <MathMd md={R`If the division doesn't give a whole number, no such polygon exists. An angle sum of $1000^\circ$ gives $n - 2 \approx 5.56$, so it can't be the angle sum of a polygon.`} />
        </div>
      </section>

      <section id="exterior" className="tb-section" aria-labelledby="h-exterior">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-exterior" className="tb-h2 pg-h2">Exterior angles always add to 360°</h2>
          <MathMd md={R`An **exterior angle** is the angle between one side and the next side extended outwards. At each corner the interior and exterior angles sit on a straight line, so they add to $180^\circ$.

Walk all the way around any polygon, turning at each corner, and you finish facing the way you started: one full turn. So the exterior angles of **every** polygon add to $360^\circ$, and in a regular polygon

$$\text{each exterior angle} = \frac{360^\circ}{n}$$

For a regular hexagon that's $360^\circ \div 6 = 60^\circ$, and $180^\circ - 60^\circ = 120^\circ$ matches the interior angle in the table. Exterior angles are often the fastest route for regular polygons, especially when you need the number of sides.`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Using $n \times 180^\circ$.** That counts two triangles too many. A pentagon is $3 \times 180^\circ = 540^\circ$, not $900^\circ$.
- **Dividing the angle sum for an irregular polygon.** $(n - 2) \times 180^\circ \div n$ only works when every angle is equal.
- **Mixing up interior and exterior angles.** The $360^\circ$ rule is for exterior angles. Interior angles add to $(n - 2) \times 180^\circ$.
- **Miscounting the sides.** Count the sides on the diagram, not the labelled angles. Some diagrams only label a few of them.
- **Forgetting a reflex angle.** In a polygon that isn't convex, one interior angle can be more than $180^\circ$. It still counts in the angle sum.
- **Accepting a fraction of a side.** If you get $n = 7.2$, the polygon can't exist. Recheck the question or your working.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer. Draw a quick sketch if it helps you count the sides.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Used n × 180° or divided for an irregular shape? Don't just fix the number. Study the mistake." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Polygon angles by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-7-angles", text: "Angles on parallel lines and at a point, the starting point for every angle sum argument." },
              { slug: "year-7-angles-in-triangles", text: "The triangle angle sum of 180°, then the angle sums of quadrilaterals and other polygons." },
              { slug: "year-8-quadrilaterals", text: "Properties of quadrilaterals, using the 360° angle sum and congruent triangles." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

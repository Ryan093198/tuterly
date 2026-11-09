import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import CircleCalc from "@/components/maths/CircleCalc";

// Concept page with a calculator: area of a circle ("area of a circle"
// ~3,600 searches a month in Australia). Every example and practice
// answer was checked (Nov 2026).

const PATH = "/maths/area-of-a-circle";
const TITLE = "How to Find the Area of a Circle: Formula, Examples and Circle Calculator (Years 7 to 10) | Tuterly";
const DESCRIPTION =
  "How to find the area of a circle from the radius or diameter with A = πr², plus semicircles, quarter circles, sectors and finding the radius from the area. Worked examples, practice questions and a free calculator.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is the formula for the area of a circle?", a: "A = πr², where r is the radius. Square the radius first, then multiply by π. A circle with radius 6 cm has area 36π ≈ 113.10 cm²." },
  { q: "How do I find the area of a circle from the diameter?", a: "Halve the diameter to get the radius, then use A = πr². A circle with diameter 10 m has radius 5 m, so its area is 25π ≈ 78.54 m²." },
  { q: "How do I find the radius from the area?", a: "Divide the area by π, then take the square root: r = √(A ÷ π). If the area is 50 cm², r = √(50 ÷ π) ≈ 3.99 cm." },
  { q: "Should I use 3.14 or the π button?", a: "Use whatever your teacher or the question says. The π button is more accurate. Using 3.14 gives a slightly smaller answer, so answers can differ in the second decimal place. If the question says to give an exact answer, leave π in it, like 25π cm²." },
  { q: "What year level learns the area of a circle?", a: "In the Victorian Curriculum 2.0, Year 7 introduces π and the circumference, and the area of a circle is a Year 8 topic, including composite shapes like semicircles and quadrants. It's then used for the volume and surface area of cylinders in Year 9. Sectors are often taught in Year 9 or 10, depending on the school." },
];

const PRACTICE = [
  { q: R`Find the area of a circle with radius $3$ cm.`, a: R`$A = \pi \times 3^2 = 9\pi \approx 28.27$ cm²` },
  { q: R`Find the area of a circle with diameter $14$ m.`, a: R`$r = 7$, so $A = \pi \times 7^2 = 49\pi \approx 153.94$ m²` },
  { q: R`Find the area of a circle with radius $2.5$ cm.`, a: R`$A = \pi \times 2.5^2 = 6.25\pi \approx 19.63$ cm²` },
  { q: R`Find the area of a semicircle with diameter $12$ cm.`, a: R`$r = 6$, so $A = \dfrac{1}{2} \times \pi \times 6^2 = 18\pi \approx 56.55$ cm²` },
  { q: R`Find the area of a quarter circle with radius $8$ m.`, a: R`$A = \dfrac{1}{4} \times \pi \times 8^2 = 16\pi \approx 50.27$ m²` },
  { q: R`Find the area of a sector with radius $6$ cm and angle $120^\circ$.`, a: R`$A = \dfrac{120}{360} \times \pi \times 6^2 = \dfrac{1}{3} \times 36\pi = 12\pi \approx 37.70$ cm²` },
  { q: R`A circular garden has an area of $200$ m². Find its radius.`, a: R`$r = \sqrt{\dfrac{200}{\pi}} \approx \sqrt{63.66} \approx 7.98$ m` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Area of a circle", path: PATH }]}
      eyebrow="Maths explained · Years 7 to 10"
      h1="How to find the area of a circle"
      lead="The area of a circle is the space inside it. There’s one formula to learn, A = πr², and everything else (diameters, semicircles, quarter circles and sectors) is a small change to it. Here’s each one with a worked example, a calculator that shows the working, and practice questions with answers."
      quickAnswer="Area of a circle = πr², where r is the radius. If you’re given the diameter, halve it first. Square the radius, then multiply by π. Area is in square units, like cm² or m². A semicircle is half of πr², a quarter circle is a quarter, and a sector with angle θ is θ ÷ 360 of it."
      toc={[
        ["formula", "The formula"],
        ["radius", "From the radius"],
        ["diameter", "From the diameter"],
        ["calculator", "Calculator"],
        ["parts", "Semicircles and quarter circles"],
        ["sector", "Area of a sector"],
        ["reverse", "Radius from the area"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a circle area question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_area_of_a_circle"
      faqs={FAQS}
      faqTitle="Area of a circle: common questions"
      links={[
        { href: "/maths/circumference-of-a-circle", label: "Circumference of a circle" },
        { href: "/maths/pythagoras-theorem", label: "Pythagoras' theorem explained" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got a circle question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="formula" className="tb-section" aria-labelledby="h-formula">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-formula" className="tb-h2 pg-h2">The area of a circle formula</h2>
          <div className="mx-formula"><MathMd md={R`$$A = \pi r^2$$`} /></div>
          <MathMd md={R`- $r$ is the **radius**: the distance from the centre to the edge.
- The **diameter** $d$ goes all the way across through the centre, so $d = 2r$.
- $\pi \approx 3.14159$. Use the $\pi$ button on your calculator unless the question says otherwise.
- Area is measured in **square units**: mm², cm², m² or km².`} />
        </div>
      </section>

      <section id="radius" className="tb-section" aria-labelledby="h-radius">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-radius" className="tb-h2 pg-h2">Area from the radius</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the area of a circle with radius $6$ cm.

$$A = \pi r^2$$
$$A = \pi \times 6^2 = 36\pi$$
$$A \approx 113.10 \text{ cm}^2$$`} />
          </div>
          <MathMd md={R`$36\pi$ cm² is the **exact** answer. $113.10$ cm² is the answer rounded to 2 decimal places. Square the radius before you multiply by $\pi$.`} />
        </div>
      </section>

      <section id="diameter" className="tb-section" aria-labelledby="h-diameter">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-diameter" className="tb-h2 pg-h2">Area from the diameter</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the area of a circle with diameter $10$ m.

$$r = \frac{10}{2} = 5 \text{ m}$$
$$A = \pi \times 5^2 = 25\pi \approx 78.54 \text{ m}^2$$`} />
          </div>
          <MathMd md={R`Always halve the diameter first. Using $10$ instead of $5$ gives an answer four times too big.`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Area of a circle calculator (with working)</h2>
          <p className="pg-intro">Enter the radius, diameter, circumference or area. You’ll get all four, with the exact answer in terms of π where it’s tidy and decimals rounded to 2 decimal places.</p>
          <CircleCalc placement="concept_area_of_a_circle_calc" focus="area" />
        </div>
      </section>

      <section id="parts" className="tb-section" aria-labelledby="h-parts">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-parts" className="tb-h2 pg-h2">Area of a semicircle and a quarter circle</h2>
          <MathMd md={R`A semicircle is half a circle and a quarter circle (a quadrant) is a quarter, so take that fraction of $\pi r^2$.

$$\text{semicircle: } A = \frac{1}{2}\pi r^2 \qquad \text{quarter circle: } A = \frac{1}{4}\pi r^2$$`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the area of a semicircle with radius $4$ cm.

$$A = \frac{1}{2} \times \pi \times 4^2 = \frac{1}{2} \times 16\pi = 8\pi \approx 25.13 \text{ cm}^2$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: a ring (annulus)</p>
            <MathMd md={R`A ring has outer radius $7$ cm and inner radius $4$ cm. Find its area.

Subtract the small circle from the big one:

$$A = \pi \times 7^2 - \pi \times 4^2 = 49\pi - 16\pi = 33\pi \approx 103.67 \text{ cm}^2$$`} />
          </div>
          <MathMd md={R`For composite shapes, split the shape into a rectangle, triangle or other shape plus the circle parts, find each area, then add (or subtract the cut-out).`} />
        </div>
      </section>

      <section id="sector" className="tb-section" aria-labelledby="h-sector">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-sector" className="tb-h2 pg-h2">Area of a sector (Years 9 and 10)</h2>
          <MathMd md={R`A sector is a "pizza slice" of a circle, between two radii. If the angle at the centre is $\theta$ degrees, the sector is $\dfrac{\theta}{360}$ of the whole circle.`} />
          <div className="mx-formula"><MathMd md={R`$$A = \frac{\theta}{360} \times \pi r^2$$`} /></div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the area of a sector with radius $9$ cm and angle $60^\circ$.

$$A = \frac{60}{360} \times \pi \times 9^2 = \frac{1}{6} \times 81\pi = 13.5\pi \approx 42.41 \text{ cm}^2$$`} />
          </div>
          <MathMd md={R`A semicircle is a sector with $\theta = 180^\circ$, and a quarter circle has $\theta = 90^\circ$.`} />
        </div>
      </section>

      <section id="reverse" className="tb-section" aria-labelledby="h-reverse">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-reverse" className="tb-h2 pg-h2">How to find the radius from the area</h2>
          <MathMd md={R`Work backwards: divide by $\pi$, then take the square root.`} />
          <div className="mx-formula"><MathMd md={R`$$r = \sqrt{\frac{A}{\pi}}$$`} /></div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A circle has an area of $50$ cm². Find its radius.

$$\pi r^2 = 50$$
$$r^2 = \frac{50}{\pi} \approx 15.92$$
$$r = \sqrt{15.92} \approx 3.99 \text{ cm}$$`} />
          </div>
          <MathMd md={R`Keep the full value of $\dfrac{50}{\pi}$ in your calculator before taking the square root, and round only at the end. Double it to get the diameter: about $7.98$ cm.`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Using the diameter instead of the radius.** Halve the diameter first.
- **Doubling instead of squaring.** $r^2$ means $r \times r$, not $2 \times r$. For $r = 6$, $r^2 = 36$, not $12$.
- **Squaring $\pi$ as well.** $\pi r^2$ means $\pi \times r^2$. Only the radius is squared.
- **Mixing up area and circumference.** Area is $\pi r^2$ (square units). Circumference is $2\pi r$ (plain units).
- **Rounding too early.** Keep the full value until the last step.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer. Decimal answers use the π button and are rounded to 2 decimal places.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Area of a circle by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-7-circles", text: "Radius, diameter and π as the ratio of the circumference to the diameter." },
              { slug: "year-8-circles", text: "The area of a circle, working back to the radius, and composite shapes like semicircles, quadrants and rings." },
              { slug: "year-9-surface-area-volume", text: "Circle area inside the volume and surface area of cylinders." },
              { slug: "year-10a-pyramids-cones-spheres", text: "Circle area in the surface area and volume of cones and spheres." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

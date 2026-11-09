import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import CircleCalc from "@/components/maths/CircleCalc";

// Concept page with a calculator: circumference of a circle
// ("circumference of a circle" ~2,900 searches a month in Australia).
// Shares CircleCalc with the area page. Every example and practice
// answer was checked (Nov 2026).

const PATH = "/maths/circumference-of-a-circle";
const TITLE = "How to Find the Circumference of a Circle: Formula, Examples and Calculator (Years 7 to 10) | Tuterly";
const DESCRIPTION =
  "How to find the circumference of a circle from the radius or diameter, the perimeter of a semicircle or sector, arc length, and the radius from the circumference. Worked examples, practice questions and a free calculator.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is the formula for circumference?", a: "C = πd, or C = 2πr. Both give the same answer, because the diameter is twice the radius. A circle with radius 4 cm has circumference 8π ≈ 25.13 cm." },
  { q: "What's the difference between circumference and area?", a: "Circumference is the distance around the edge of the circle, measured in plain units like cm. Area is the space inside, measured in square units like cm². Circumference uses 2πr; area uses πr²." },
  { q: "How do I find the diameter from the circumference?", a: "Divide the circumference by π: d = C ÷ π. Halve that for the radius. If C = 50 cm, d = 50 ÷ π ≈ 15.92 cm and r ≈ 7.96 cm." },
  { q: "How do I find the perimeter of a semicircle?", a: "Add half the circumference to the straight edge (the diameter): P = ½πd + d. For a diameter of 10 cm, P = 5π + 10 ≈ 25.71 cm." },
  { q: "What year level learns circumference?", a: "In the Victorian Curriculum 2.0, Year 7 covers π and the relationship between the circumference, radius and diameter. Year 8 uses the formulas to solve problems, including composite shapes. Arc length is often taught in Year 9 or 10, depending on the school." },
];

const PRACTICE = [
  { q: R`Find the circumference of a circle with radius $7$ cm.`, a: R`$C = 2 \times \pi \times 7 = 14\pi \approx 43.98$ cm` },
  { q: R`Find the circumference of a circle with diameter $20$ m.`, a: R`$C = \pi \times 20 = 20\pi \approx 62.83$ m` },
  { q: R`Find the circumference of a circle with radius $3.5$ mm.`, a: R`$C = 2 \times \pi \times 3.5 = 7\pi \approx 21.99$ mm` },
  { q: R`Find the perimeter of a semicircle with diameter $8$ cm.`, a: R`Curved part: $\dfrac{1}{2} \times \pi \times 8 = 4\pi$. Add the diameter: $P = 4\pi + 8 \approx 20.57$ cm` },
  { q: R`Find the arc length of a sector with radius $10$ cm and angle $90^\circ$.`, a: R`$l = \dfrac{90}{360} \times 2\pi \times 10 = 5\pi \approx 15.71$ cm` },
  { q: R`A circle has a circumference of $100$ cm. Find its diameter and radius.`, a: R`$d = \dfrac{100}{\pi} \approx 31.83$ cm, so $r \approx 15.92$ cm` },
  { q: R`Find the perimeter of a sector with radius $12$ m and angle $60^\circ$.`, a: R`Arc: $\dfrac{60}{360} \times 2\pi \times 12 = 4\pi$. Add the two radii: $P = 4\pi + 24 \approx 36.57$ m` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Circumference of a circle", path: PATH }]}
      eyebrow="Maths explained · Years 7 to 10"
      h1="How to find the circumference of a circle"
      lead="The circumference is the distance all the way around a circle: its perimeter. You can find it from the radius or the diameter, and the same idea gives you the perimeter of a semicircle and the length of an arc. Here’s each one with a worked example, a calculator that shows the working, and practice questions with answers."
      quickAnswer="Circumference = π × diameter, or 2 × π × radius: C = πd = 2πr. Use the π button on your calculator (π ≈ 3.14159). Circumference is a length, so it’s in plain units like cm or m. To work backwards, the diameter is C ÷ π."
      toc={[
        ["formula", "The formula"],
        ["examples", "From the radius or diameter"],
        ["calculator", "Calculator"],
        ["semicircle", "Perimeter of a semicircle"],
        ["arc", "Arc length and sectors"],
        ["reverse", "Radius from the circumference"],
        ["wheels", "Wheels and distance"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a circumference question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_circumference_of_a_circle"
      faqs={FAQS}
      faqTitle="Circumference: common questions"
      links={[
        { href: "/maths/area-of-a-circle", label: "Area of a circle" },
        { href: "/maths/percentages", label: "How to calculate a percentage" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got a circle question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="formula" className="tb-section" aria-labelledby="h-formula">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-formula" className="tb-h2 pg-h2">The circumference formula</h2>
          <div className="mx-formula"><MathMd md={R`$$C = \pi d = 2\pi r$$`} /></div>
          <MathMd md={R`$\pi$ is the number you get when you divide **any** circle's circumference by its diameter: about $3.14159$. That's why $C = \pi d$. Because the diameter is two radii, $C = 2\pi r$ is the same formula.

- Given the **diameter**: multiply by $\pi$.
- Given the **radius**: multiply by $2$, then by $\pi$.`} />
        </div>
      </section>

      <section id="examples" className="tb-section" aria-labelledby="h-examples">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-examples" className="tb-h2 pg-h2">Circumference from the radius or diameter</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: from the radius</p>
            <MathMd md={R`Find the circumference of a circle with radius $4$ cm.

$$C = 2\pi r = 2 \times \pi \times 4 = 8\pi$$
$$C \approx 25.13 \text{ cm}$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: from the diameter</p>
            <MathMd md={R`Find the circumference of a circle with diameter $15$ m.

$$C = \pi d = \pi \times 15 = 15\pi$$
$$C \approx 47.12 \text{ m}$$`} />
          </div>
          <MathMd md={R`$8\pi$ cm is the **exact** answer; $25.13$ cm is rounded to 2 decimal places.`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Circumference calculator (with working)</h2>
          <p className="pg-intro">Enter the radius, diameter, circumference or area. You’ll get all four, with the exact answer in terms of π where it’s tidy and decimals rounded to 2 decimal places.</p>
          <CircleCalc placement="concept_circumference_calc" focus="circumference" />
        </div>
      </section>

      <section id="semicircle" className="tb-section" aria-labelledby="h-semicircle">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-semicircle" className="tb-h2 pg-h2">Perimeter of a semicircle and a quarter circle</h2>
          <MathMd md={R`The perimeter is the whole way around the shape, so include the straight edges as well as the curved part.

$$\text{semicircle: } P = \frac{1}{2}\pi d + d$$`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the perimeter of a semicircle with diameter $10$ cm.

$$\text{curved part} = \frac{1}{2} \times \pi \times 10 = 5\pi$$
$$P = 5\pi + 10 \approx 25.71 \text{ cm}$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: quarter circle</p>
            <MathMd md={R`Find the perimeter of a quarter circle with radius $6$ cm.

$$\text{curved part} = \frac{1}{4} \times 2\pi \times 6 = 3\pi$$
$$P = 3\pi + 6 + 6 = 3\pi + 12 \approx 21.42 \text{ cm}$$`} />
          </div>
        </div>
      </section>

      <section id="arc" className="tb-section" aria-labelledby="h-arc">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-arc" className="tb-h2 pg-h2">Arc length and the perimeter of a sector (Years 9 and 10)</h2>
          <MathMd md={R`An arc is part of the circumference. If the angle at the centre is $\theta$ degrees, the arc is $\dfrac{\theta}{360}$ of the whole circumference.`} />
          <div className="mx-formula"><MathMd md={R`$$l = \frac{\theta}{360} \times 2\pi r$$`} /></div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A sector has radius $8$ cm and angle $45^\circ$. Find the arc length and the perimeter of the sector.

$$l = \frac{45}{360} \times 2 \times \pi \times 8 = \frac{1}{8} \times 16\pi = 2\pi \approx 6.28 \text{ cm}$$
$$P = l + 2r = 2\pi + 16 \approx 22.28 \text{ cm}$$`} />
          </div>
          <MathMd md={R`The perimeter of a sector is the arc **plus the two radii**. Forgetting the radii is the most common mistake.`} />
        </div>
      </section>

      <section id="reverse" className="tb-section" aria-labelledby="h-reverse">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-reverse" className="tb-h2 pg-h2">How to find the radius or diameter from the circumference</h2>
          <div className="mx-formula"><MathMd md={R`$$d = \frac{C}{\pi} \qquad r = \frac{C}{2\pi}$$`} /></div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A circle has a circumference of $50$ cm. Find its diameter and radius.

$$d = \frac{50}{\pi} \approx 15.92 \text{ cm}$$
$$r = \frac{50}{2\pi} \approx 7.96 \text{ cm}$$`} />
          </div>
        </div>
      </section>

      <section id="wheels" className="tb-section" aria-labelledby="h-wheels">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-wheels" className="tb-h2 pg-h2">Wheels and distance</h2>
          <MathMd md={R`Each full turn of a wheel moves it forward one circumference.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A bike wheel has a diameter of $60$ cm. How far does the bike travel in $100$ full turns?

$$C = \pi \times 60 = 60\pi \text{ cm}$$
$$100 \times 60\pi = 6000\pi \approx 18\,849.56 \text{ cm}$$

That's about $188.50$ m.`} />
          </div>
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Using $\pi r$ instead of $2\pi r$.** With the radius you must double it (or use $\pi d$).
- **Doubling the diameter.** $C = \pi d$ already uses the full width. Don't multiply by 2 again.
- **Mixing up circumference and area.** Circumference is $2\pi r$ in cm. Area is $\pi r^2$ in cm².
- **Leaving out straight edges.** The perimeter of a semicircle or sector includes the diameter or the two radii.`} />
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
          <h2 id="h-years" className="tb-h2 pg-h2">Circumference by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-7-circles", text: "Radius, diameter, π, and the circumference from the radius or diameter." },
              { slug: "year-8-circles", text: "Circumference and area problems, working back to the radius, and semicircles and quadrants." },
              { slug: "year-8-area-perimeter", text: "Perimeter of composite shapes, including where some sides need calculating first." },
              { slug: "year-9-surface-area-volume", text: "The circumference inside the curved surface area of a cylinder, 2πrh." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

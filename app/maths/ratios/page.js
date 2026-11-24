import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import RatioCalc from "@/components/maths/RatioCalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a calculator: ratios (simplifying, equivalent ratios,
// dividing in a ratio). Built by the daily page task (Nov 2026); not yet
// read by Ryan, so it's in UNREVIEWED_PATHS (lib/reviewed.js). Every
// example, practice answer and calculator test case was recomputed by
// script before publishing.

const PATH = "/maths/ratios";
const TITLE = "Ratios: How to Simplify and Divide in a Ratio, with Calculator | Tuterly";
const DESCRIPTION =
  "How to simplify ratios (including units, decimals and fractions), find equivalent ratios and divide an amount in a given ratio. Worked examples and a free ratio calculator.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "How do you simplify a ratio?", a: "Divide every part by the highest common factor (HCF). For 45 : 60, the HCF is 15, so 45 : 60 = 3 : 4. A ratio is in simplest form when its parts are whole numbers with no common factor other than 1. If the parts have different units, decimals or fractions, fix that first." },
  { q: "How do you divide an amount in a given ratio?", a: "Add the parts of the ratio to get the total number of parts, divide the amount by that total to find one part, then multiply by each part of the ratio. To share $240 in the ratio 3 : 5, there are 8 parts, one part is $240 ÷ 8 = $30, so the shares are $90 and $150." },
  { q: "Does the order of a ratio matter?", a: "Yes. The order of the numbers matches the order of the words. If there are 3 boys for every 5 girls, boys : girls is 3 : 5, but girls : boys is 5 : 3. Swapping them changes the meaning, so always check which quantity comes first in the question." },
  { q: "What is the difference between a ratio and a fraction?", a: "A ratio compares parts with each other, while a fraction compares a part with the whole. If a fruit bowl has apples and oranges in the ratio 2 : 3, there are 5 parts altogether, so 2/5 of the fruit is apples and 3/5 is oranges. The fraction 2/3 would be wrong here, because 3 is the oranges, not the whole bowl." },
  { q: "Can a ratio have decimals or fractions in it?", a: "It can be written that way, but its simplest form uses whole numbers. Multiply every part by 10, 100 or the lowest common denominator to clear them, then divide by the HCF. For example, 1.2 : 0.8 = 12 : 8 = 3 : 2, and 2/3 : 5/6 becomes 4 : 5 after multiplying both parts by 6." },
  { q: "What year level learns ratios?", a: "In the Victorian Curriculum 2.0, Year 7 students recognise, represent and solve problems involving ratios, including simplifying and dividing a quantity in a given ratio. Year 8 moves on to rates, which compare quantities with different units, and Year 9 uses ratios for scale factors in similar figures." },
];

const PRACTICE = [
  { q: R`Simplify $18 : 30$.`, a: R`HCF $= 6$, so $18 : 30 = 3 : 5$` },
  { q: R`Simplify $56 : 42 : 14$.`, a: R`HCF $= 14$, so $56 : 42 : 14 = 4 : 3 : 1$` },
  { q: R`Simplify $40$ minutes $: 2$ hours.`, a: R`Same units first: $2$ hours $= 120$ minutes. $40 : 120 = 1 : 3$` },
  { q: R`Simplify $0.45 : 0.6$.`, a: R`Multiply by $100$: $45 : 60$. HCF $= 15$, so $3 : 4$` },
  { q: R`Simplify $\dfrac{3}{4} : \dfrac{2}{5}$.`, a: R`Multiply both parts by the LCD $20$: $15 : 8$` },
  { q: R`Share $\$150$ between Jo and Sam in the ratio $2 : 3$.`, a: R`$5$ parts, one part $= \$150 \div 5 = \$30$. Jo gets $\$60$ and Sam gets $\$90$` },
  { q: R`Divide $2.4$ kg of flour in the ratio $5 : 3$.`, a: R`$2.4$ kg $= 2400$ g. $8$ parts, one part $= 300$ g. The amounts are $1500$ g ($1.5$ kg) and $900$ g ($0.9$ kg)` },
  { q: R`Concrete is mixed as cement : sand : gravel $= 1 : 2 : 4$. How many buckets of each are in a $21$-bucket batch?`, a: R`$7$ parts, one part $= 3$ buckets. Cement $3$, sand $6$, gravel $12$` },
  { q: R`The ratio of boys to girls in a choir is $4 : 5$. There are $36$ boys. How many girls are there, and how many students altogether?`, a: R`$4$ parts $= 36$, so one part $= 9$. Girls $= 5 \times 9 = 45$. Total $= 9 \times 9 = 81$` },
  { q: R`Two numbers are in the ratio $5 : 2$ and their difference is $45$. Find the numbers.`, a: R`The difference is $5 - 2 = 3$ parts, so one part $= 15$. The numbers are $75$ and $30$` },
  { q: R`On a map with scale $1 : 50\,000$, two towns are $6.5$ cm apart. How far apart are they in real life, in kilometres?`, a: R`$6.5 \times 50\,000 = 325\,000$ cm $= 3250$ m $= 3.25$ km` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Ratios", path: PATH }]}
      eyebrow="Maths explained · Years 7 to 9"
      h1="Ratios: how to simplify and divide in a ratio"
      lead="A ratio compares two or more quantities, like 2 cups of rice to 3 cups of water. Here’s how to read a ratio, simplify it (even when it has units, decimals or fractions), find equivalent ratios, share an amount in a given ratio and work backwards from one share, with a calculator that shows every step."
      quickAnswer="To simplify a ratio, divide every part by the highest common factor: 45 : 60 = 3 : 4. To divide an amount in a ratio, add the parts, divide the amount by that total to find one part, then multiply by each part. Sharing $240 in the ratio 3 : 5 gives 8 parts of $30, so $90 and $150."
      toc={[
        ["what", "What a ratio means"],
        ["simplify", "Simplifying ratios"],
        ["tricky", "Units, decimals and fractions"],
        ["equivalent", "Equivalent ratios"],
        ["calculator", "Ratio calculator"],
        ["divide", "Dividing in a ratio"],
        ["backwards", "Working back from one share"],
        ["scale", "Unit ratios and map scales"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a ratio question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_ratios"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="Ratios: common questions"
      links={[
        { href: "/worksheets/year-7-ratios", label: "Year 7 ratios worksheets" },
        { href: "/worksheets/year-8-rates", label: "Year 8 rates worksheets" },
        { href: "/maths/simplifying-fractions", label: "Simplifying fractions" },
        { href: "/maths/hcf-and-lcm", label: "HCF and LCM" },
        { href: "/year-7-maths-test", label: "Year 7 maths practice test" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Lost marks sharing in a ratio?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="what" className="tb-section" aria-labelledby="h-what">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-what" className="tb-h2 pg-h2">What a ratio means</h2>
          <MathMd md={R`A **ratio** compares quantities of the same kind. If a rice recipe uses $2$ cups of rice for every $3$ cups of water, the ratio of rice to water is

$$\text{rice} : \text{water} = 2 : 3$$

read as "2 to 3". The order matters: water to rice is $3 : 2$.

A ratio tells you about **parts**, not actual amounts. $2 : 3$ could be $2$ cups and $3$ cups, or $4$ cups and $6$ cups, or $10$ cups and $15$ cups. In every case there are $2 + 3 = 5$ parts altogether, so rice is $\tfrac{2}{5}$ of the mixture and water is $\tfrac{3}{5}$.`} />
        </div>
      </section>

      <section id="simplify" className="tb-section" aria-labelledby="h-simplify">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-simplify" className="tb-h2 pg-h2">How to simplify a ratio</h2>
          <MathMd md={R`Divide **every** part by the highest common factor (HCF). The ratio is in simplest form when the parts are whole numbers whose only common factor is $1$.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`A school band has $45$ brass players and $60$ woodwind players. Write the ratio of brass to woodwind in simplest form.

$$45 : 60$$
The HCF of $45$ and $60$ is $15$.
$$45 \div 15 : 60 \div 15 = 3 : 4$$
For every $3$ brass players there are $4$ woodwind players.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: three parts</p>
            <MathMd md={R`Simplify $24 : 36 : 60$.

The HCF of $24$, $36$ and $60$ is $12$.
$$24 : 36 : 60 = 2 : 3 : 5$$`} />
          </div>
          <MathMd md={R`If you can't spot the HCF straight away, divide by any common factor and keep going: $24 : 36 : 60 \to 12 : 18 : 30 \to 2 : 3 : 5$. You've finished when no number other than $1$ divides every part.`} />
        </div>
      </section>

      <section id="tricky" className="tb-section" aria-labelledby="h-tricky">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-tricky" className="tb-h2 pg-h2">Simplifying ratios with units, decimals and fractions</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: different units</p>
            <MathMd md={R`Simplify $75$ cm $: 2$ m.

The units must match before you compare. $2$ m $= 200$ cm.
$$75 : 200$$
HCF $= 25$, so
$$75 : 200 = 3 : 8$$
The answer has no units, because they cancel.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: decimals</p>
            <MathMd md={R`Simplify $1.2 : 0.8$.

Multiply both parts by $10$ to make whole numbers:
$$12 : 8$$
HCF $= 4$, so
$$12 : 8 = 3 : 2$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: fractions</p>
            <MathMd md={R`Simplify $\dfrac{2}{3} : \dfrac{5}{6}$.

The lowest common denominator of $3$ and $6$ is $6$. Multiply both parts by $6$:
$$\frac{2}{3} \times 6 : \frac{5}{6} \times 6 = 4 : 5$$
$4$ and $5$ have no common factor, so the answer is $4 : 5$.`} />
          </div>
        </div>
      </section>

      <section id="equivalent" className="tb-section" aria-labelledby="h-equivalent">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-equivalent" className="tb-h2 pg-h2">Equivalent ratios and finding a missing value</h2>
          <MathMd md={R`Multiplying or dividing every part by the same number gives an **equivalent ratio**: $2 : 3 = 4 : 6 = 10 : 15$. Use this to find a missing amount, by working out what the known part was multiplied by.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Cordial is mixed with concentrate and water in the ratio $1 : 4$. How much water is needed for $250$ mL of concentrate?

$$1 : 4 = 250 : \ ?$$
The concentrate went from $1$ to $250$, so it was multiplied by $250$. Do the same to the water:
$$4 \times 250 = 1000$$
You need $1000$ mL ($1$ L) of water.`} />
          </div>
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Ratio calculator (with working)</h2>
          <p className="pg-intro">Simplify any ratio with two to four parts, share an amount in a ratio, or find the other shares and the total when you know one share. The bar model shows the parts.</p>
          <RatioCalc placement="concept_ratios_calc" />
        </div>
      </section>

      <section id="divide" className="tb-section" aria-labelledby="h-divide">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-divide" className="tb-h2 pg-h2">How to divide an amount in a given ratio</h2>
          <MathMd md={R`1. Add the parts of the ratio to find the total number of parts.
2. Divide the amount by the total number of parts to find **one part**.
3. Multiply one part by each number in the ratio.
4. Check that the shares add back to the amount.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Mia and Lachlan share $\$240$ in the ratio $3 : 5$. How much does each person get?

Total parts: $3 + 5 = 8$

One part: $\$240 \div 8 = \$30$

Mia: $3 \times \$30 = \$90$

Lachlan: $5 \times \$30 = \$150$

Check: $\$90 + \$150 = \$240$ ✓`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: three parts</p>
            <MathMd md={R`A $360$ g bag of trail mix has nuts, sultanas and seeds in the ratio $4 : 3 : 2$. Find the mass of each.

Total parts: $4 + 3 + 2 = 9$

One part: $360 \div 9 = 40$ g

Nuts: $4 \times 40 = 160$ g

Sultanas: $3 \times 40 = 120$ g

Seeds: $2 \times 40 = 80$ g

Check: $160 + 120 + 80 = 360$ ✓`} />
          </div>
        </div>
      </section>

      <section id="backwards" className="tb-section" aria-labelledby="h-backwards">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-backwards" className="tb-h2 pg-h2">Working back from one share or the difference</h2>
          <MathMd md={R`Sometimes you're given one person's share, or the difference between shares, instead of the total. Find what **one part** is worth first, then build everything else from it.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: one share known</p>
            <MathMd md={R`Prize money is split between Ava and Ben in the ratio $2 : 5$. Ben receives $\$85$. How much does Ava get, and what was the total prize?

Ben's share is $5$ parts, so
$$\text{one part} = \$85 \div 5 = \$17$$

Ava: $2 \times \$17 = \$34$

Total: $7 \times \$17 = \$119$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: the difference known</p>
            <MathMd md={R`The ratio of adults to children at a show is $3 : 7$. There are $28$ more children than adults. How many of each are there?

The difference is $7 - 3 = 4$ parts, so
$$\text{one part} = 28 \div 4 = 7$$

Adults: $3 \times 7 = 21$

Children: $7 \times 7 = 49$

Check: $49 - 21 = 28$ ✓`} />
          </div>
        </div>
      </section>

      <section id="scale" className="tb-section" aria-labelledby="h-scale">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-scale" className="tb-h2 pg-h2">Unit ratios and map scales</h2>
          <MathMd md={R`A **unit ratio** has one part equal to $1$. Divide both parts by the one you want to be $1$. For example, dividing both parts of $4 : 10$ by $4$ gives $1 : 2.5$. Unit ratios make comparisons quick, and they're how map and model scales are written.

A map scale of $1 : 25\,000$ means $1$ cm on the map is $25\,000$ cm in real life.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`On a map with scale $1 : 25\,000$, a walking track measures $8$ cm. How long is the real track in kilometres?

$$8 \times 25\,000 = 200\,000 \text{ cm}$$
$$200\,000 \text{ cm} = 2000 \text{ m} = 2 \text{ km}$$`} />
          </div>
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Dividing by the wrong number.** To share $\$240$ in the ratio $3 : 5$, divide by $3 + 5 = 8$, not by $3$ or $5$.
- **Getting the order back to front.** If the question asks for girls to boys, the girls' number goes first.
- **Mixing units.** $75$ cm $: 2$ m is not $75 : 2$. Convert to the same unit first, then simplify.
- **Stopping too early.** $12 : 18$ simplifies to $6 : 9$, but $6$ and $9$ still share a factor of $3$. Keep going to $2 : 3$.
- **Treating a ratio as a fraction of the whole.** In the ratio $2 : 3$, the first part is $\tfrac{2}{5}$ of the total, not $\tfrac{2}{3}$.
- **Leaving decimals or fractions in the answer.** Simplest form uses whole numbers, so $1 : 1.5$ becomes $2 : 3$.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Have a go at each one first, then open the answer. A quick bar sketch helps with the sharing questions.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Divided by 3 instead of 3 + 5? Don't just redo the question. Study the mistake." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Ratios by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-7-ratios", text: "Writing and simplifying ratios, equivalent ratios and dividing a quantity in a given ratio." },
              { slug: "year-8-rates", text: "Rates such as speed and unit price, which compare quantities with different units." },
              { slug: "year-9-similar-triangles", text: "Scale factors and ratios of matching sides in similar triangles." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

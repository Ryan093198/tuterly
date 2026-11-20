import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import HcfLcmCalc from "@/components/maths/HcfLcmCalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a calculator: highest common factor and lowest common
// multiple. Built by the daily page task (Nov 2026); not yet read by Ryan, so
// it's in UNREVIEWED_PATHS (lib/reviewed.js). Every example, practice answer
// and calculator test case was recomputed by script before publishing.

const PATH = "/maths/hcf-and-lcm";
const TITLE = "HCF and LCM: How to Find Them, Word Problems and a Calculator | Tuterly";
const DESCRIPTION =
  "How to find the highest common factor and lowest common multiple by listing, prime factors or a Venn diagram, plus word problems. Free calculator with working.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is the difference between HCF and LCM?", a: "The highest common factor (HCF) is the biggest number that divides exactly into all of the numbers, so it is never bigger than the smallest one. The lowest common multiple (LCM) is the smallest number that all of the numbers divide into, so it is never smaller than the biggest one. For 12 and 18, the HCF is 6 and the LCM is 36." },
  { q: "How do you find the HCF using prime factors?", a: "Write each number as a product of primes in index notation. Take each prime that appears in every number, using the lowest power, and multiply them. For 84 = 2² × 3 × 7 and 120 = 2³ × 3 × 5, the shared primes are 2 and 3, the lowest powers are 2² and 3, so the HCF is 4 × 3 = 12." },
  { q: "How do you find the LCM using prime factors?", a: "Write each number as a product of primes. Take every prime that appears in any of the numbers, using its highest power, and multiply them. For 84 = 2² × 3 × 7 and 120 = 2³ × 3 × 5, that is 2³ × 3 × 5 × 7 = 840." },
  { q: "Is HCF the same as GCD or GCF?", a: "Yes. Highest common factor (HCF), greatest common factor (GCF) and greatest common divisor (GCD) are three names for the same thing. Australian textbooks usually say HCF. Similarly, lowest common multiple and least common multiple (both LCM) mean the same." },
  { q: "How do I know whether a word problem needs the HCF or the LCM?", a: "If you are splitting things into equal groups, packs or pieces that are as large as possible, it is an HCF question, and the answer is smaller than the numbers given. If you are waiting for repeating events to line up again, or need the smallest amount that several sizes fit into exactly, it is an LCM question, and the answer is bigger than the numbers given." },
  { q: "What is the HCF of two prime numbers?", a: "The HCF of two different prime numbers is always 1, because a prime's only factors are 1 and itself. Their LCM is their product, so for 7 and 11 the HCF is 1 and the LCM is 77. Numbers with an HCF of 1 are called coprime." },
];

const PRACTICE = [
  { q: R`List the factors of $30$ and $42$, and find their HCF.`, a: R`Factors of $30$: $1, 2, 3, 5, 6, 10, 15, 30$. Factors of $42$: $1, 2, 3, 6, 7, 14, 21, 42$. The highest in both lists is $6$, so the HCF is $6$.` },
  { q: R`List multiples to find the LCM of $9$ and $15$.`, a: R`Multiples of $15$: $15, 30, 45, \ldots$ The first that $9$ also divides into is $45$, so the LCM is $45$.` },
  { q: R`Use prime factors to find the HCF and LCM of $90$ and $126$.`, a: R`$90 = 2 \times 3^2 \times 5$ and $126 = 2 \times 3^2 \times 7$. HCF $= 2 \times 3^2 = 18$. LCM $= 2 \times 3^2 \times 5 \times 7 = 630$. Check: $18 \times 630 = 11\,340 = 90 \times 126$ ✓` },
  { q: R`Find the HCF and LCM of $16$, $24$ and $40$.`, a: R`$16 = 2^4$, $24 = 2^3 \times 3$, $40 = 2^3 \times 5$. HCF $= 2^3 = 8$. LCM $= 2^4 \times 3 \times 5 = 240$.` },
  { q: R`Find the HCF and LCM of $35$ and $48$.`, a: R`$35 = 5 \times 7$ and $48 = 2^4 \times 3$. They share no primes, so the HCF is $1$ and the LCM is $35 \times 48 = 1680$.` },
  { q: R`A rectangular courtyard is $360$ cm by $280$ cm. It will be covered with identical square pavers with no cutting. What is the largest paver side length possible, and how many pavers are needed?`, a: R`HCF of $360$ and $280$: $360 = 2^3 \times 3^2 \times 5$, $280 = 2^3 \times 5 \times 7$, so HCF $= 2^3 \times 5 = 40$ cm. That gives $360 \div 40 = 9$ by $280 \div 40 = 7$, so $9 \times 7 = 63$ pavers.` },
  { q: R`One lighthouse flashes every $8$ seconds and another every $14$ seconds. They flash together now. How long until they next flash together?`, a: R`LCM of $8 = 2^3$ and $14 = 2 \times 7$ is $2^3 \times 7 = 56$. They flash together again after $56$ seconds.` },
  { q: R`Two numbers have an HCF of $6$ and an LCM of $72$. One number is $18$. Find the other.`, a: R`For two numbers, HCF $\times$ LCM $=$ product. $6 \times 72 = 432$, so the other number is $432 \div 18 = 24$. Check: HCF of $18$ and $24$ is $6$, LCM is $72$ ✓` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "HCF and LCM", path: PATH }]}
      eyebrow="Maths explained · Years 7 and 8"
      h1="How to find the HCF and LCM"
      lead="The highest common factor (HCF) and lowest common multiple (LCM) come up in fractions, algebra and a whole family of word problems about packs, tiles and timetables. Here are three ways to find them, how to tell which one a question wants, and a calculator that shows the prime factor working for any two or three numbers."
      quickAnswer="To find the HCF and LCM, write each number as a product of prime factors. The HCF multiplies the primes the numbers share, using the lowest power of each. The LCM multiplies every prime that appears, using the highest power. For 84 = 2² × 3 × 7 and 120 = 2³ × 3 × 5, the HCF is 2² × 3 = 12 and the LCM is 2³ × 3 × 5 × 7 = 840."
      toc={[
        ["meaning", "What HCF and LCM mean"],
        ["listing", "Method 1: listing"],
        ["primes", "Method 2: prime factors"],
        ["venn", "Method 3: a Venn diagram"],
        ["calculator", "Calculator"],
        ["three", "Three numbers"],
        ["word", "Word problems: HCF or LCM?"],
        ["fractions", "Using them with fractions"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on an HCF or LCM question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_hcf_lcm"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="HCF and LCM: common questions"
      links={[
        { href: "/worksheets/year-7-prime-factors", label: "Year 7 powers and prime factors worksheets" },
        { href: "/year-7-maths-test", label: "Year 7 maths practice test" },
        { href: "/maths/prime-factorisation", label: "Prime factorisation" },
        { href: "/maths/simplifying-fractions", label: "Simplifying fractions" },
        { href: "/maths/factorising", label: "Factorising" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Mixed up the HCF and the LCM on a test?"
      finalText="Snap the question with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="meaning" className="tb-section" aria-labelledby="h-meaning">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-meaning" className="tb-h2 pg-h2">What HCF and LCM mean</h2>
          <MathMd md={R`A **factor** of a number divides into it exactly. A **multiple** of a number is in its times table.

- The **highest common factor (HCF)** of two or more numbers is the largest number that is a factor of all of them. The HCF of $12$ and $18$ is $6$.
- The **lowest common multiple (LCM)** is the smallest number that is a multiple of all of them. The LCM of $12$ and $18$ is $36$.

A quick sense check: the HCF can’t be bigger than the smallest number, and the LCM can’t be smaller than the biggest number.`} />
        </div>
      </section>

      <section id="listing" className="tb-section" aria-labelledby="h-listing">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-listing" className="tb-h2 pg-h2">Method 1: list the factors or multiples</h2>
          <MathMd md={R`For small numbers, writing out the lists is fast and hard to get wrong.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: HCF by listing</p>
            <MathMd md={R`Find the HCF of $18$ and $24$.

List the factors of each number in pairs, so none are missed:
$$18:\ 1, 2, 3, 6, 9, 18$$
$$24:\ 1, 2, 3, 4, 6, 8, 12, 24$$
The common factors are $1, 2, 3$ and $6$. The highest is
$$\text{HCF} = 6$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: LCM by listing</p>
            <MathMd md={R`Find the LCM of $6$ and $8$.

List multiples of the **bigger** number and stop at the first one the smaller number divides into:
$$8,\ 16,\ 24, \ldots$$
$8 \div 6$ and $16 \div 6$ don’t work, but $24 \div 6 = 4$. So
$$\text{LCM} = 24$$
Notice it isn’t $6 \times 8 = 48$. Multiplying the numbers gives *a* common multiple, but not always the lowest one.`} />
          </div>
        </div>
      </section>

      <section id="primes" className="tb-section" aria-labelledby="h-primes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-primes" className="tb-h2 pg-h2">Method 2: prime factors (works for any size)</h2>
          <MathMd md={R`Once the numbers are bigger, listing gets slow. Write each number as a product of primes in index notation (see [prime factorisation](/maths/prime-factorisation) if you need a refresher), then:

- **HCF:** primes that are in **every** number, with the **lowest** power.
- **LCM:** **every** prime that appears, with the **highest** power.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the HCF and LCM of $84$ and $120$.

$$84 = 2^2 \times 3 \times 7$$
$$120 = 2^3 \times 3 \times 5$$
**HCF.** Both contain $2$ and $3$. The lowest power of $2$ is $2^2$, and of $3$ is $3^1$:
$$\text{HCF} = 2^2 \times 3 = 12$$
**LCM.** The primes are $2, 3, 5, 7$. Highest powers: $2^3$, $3$, $5$, $7$:
$$\text{LCM} = 2^3 \times 3 \times 5 \times 7 = 840$$
Check: $12 \times 840 = 10\,080$ and $84 \times 120 = 10\,080$ ✓`} />
          </div>
          <MathMd md={R`That check always works for **two** numbers: the HCF times the LCM equals the two numbers multiplied together. It does not work for three numbers.`} />
        </div>
      </section>

      <section id="venn" className="tb-section" aria-labelledby="h-venn">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-venn" className="tb-h2 pg-h2">Method 3: a Venn diagram of prime factors</h2>
          <MathMd md={R`Some teachers like a Venn diagram because it shows both answers at once. Put the shared primes in the overlap and the leftovers in each side.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the HCF and LCM of $60$ and $72$.

Write out every prime, repeats included:
$$60 = 2 \times 2 \times 3 \times 5$$
$$72 = 2 \times 2 \times 2 \times 3 \times 3$$
Match up the ones they share: two $2$s and one $3$. Those go in the overlap.

- Overlap: $2, 2, 3$
- Only in $60$: $5$
- Only in $72$: $2, 3$

The **HCF** is the overlap multiplied together:
$$\text{HCF} = 2 \times 2 \times 3 = 12$$
The **LCM** is everything in the diagram multiplied together:
$$\text{LCM} = 5 \times (2 \times 2 \times 3) \times 2 \times 3$$
$$\text{LCM} = 5 \times 12 \times 6 = 360$$`} />
          </div>
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">HCF and LCM calculator (with working)</h2>
          <p className="pg-intro">Type two or three whole numbers up to one million, separated by commas. You’ll see each prime factorisation, how the HCF and LCM are built from it, and a check.</p>
          <HcfLcmCalc placement="concept_hcf_lcm_calc" />
        </div>
      </section>

      <section id="three" className="tb-section" aria-labelledby="h-three">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-three" className="tb-h2 pg-h2">HCF and LCM of three numbers</h2>
          <MathMd md={R`The prime factor rules are exactly the same. The only difference is that for the HCF, a prime has to be in **all three** numbers.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the HCF and LCM of $18$, $30$ and $45$.

$$18 = 2 \times 3^2$$
$$30 = 2 \times 3 \times 5$$
$$45 = 3^2 \times 5$$
**HCF.** Only $3$ is in all three ($2$ is missing from $45$, and $5$ is missing from $18$). The lowest power of $3$ is $3^1$:
$$\text{HCF} = 3$$
**LCM.** Every prime with its highest power: $2^1$, $3^2$, $5^1$:
$$\text{LCM} = 2 \times 3^2 \times 5 = 90$$
Check: $90 \div 18 = 5$, $90 \div 30 = 3$, $90 \div 45 = 2$ ✓`} />
          </div>
        </div>
      </section>

      <section id="word" className="tb-section" aria-labelledby="h-word">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-word" className="tb-h2 pg-h2">Word problems: is it HCF or LCM?</h2>
          <MathMd md={R`- **Sharing or cutting into equal groups, as big as possible:** HCF. The answer is **smaller** than the numbers in the question.
- **Things repeating until they line up again, or the smallest amount several sizes fit into:** LCM. The answer is **bigger** than the numbers in the question.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: an HCF problem</p>
            <MathMd md={R`A teacher has $48$ pencils and $36$ erasers. She wants to make identical packs using all of them, with nothing left over. What is the greatest number of packs she can make, and what is in each pack?

The number of packs must divide into both $48$ and $36$, and we want the greatest, so find the HCF.
$$48 = 2^4 \times 3 \qquad 36 = 2^2 \times 3^2$$
$$\text{HCF} = 2^2 \times 3 = 12$$
She can make $12$ packs, each with $48 \div 12 = 4$ pencils and $36 \div 12 = 3$ erasers.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: an LCM problem</p>
            <MathMd md={R`Two buses leave the depot together at 7:00 am. Route A leaves every $12$ minutes and Route B every $20$ minutes. When do they next leave together?

Route A leaves at $12, 24, 36, \ldots$ minutes and Route B at $20, 40, 60, \ldots$ minutes. We need the first time in both lists, which is the LCM.
$$12 = 2^2 \times 3 \qquad 20 = 2^2 \times 5$$
$$\text{LCM} = 2^2 \times 3 \times 5 = 60$$
They next leave together $60$ minutes later, at **8:00 am**.`} />
          </div>
        </div>
      </section>

      <section id="fractions" className="tb-section" aria-labelledby="h-fractions">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-fractions" className="tb-h2 pg-h2">Using HCF and LCM with fractions</h2>
          <MathMd md={R`The HCF **simplifies** a fraction in one step, and the LCM of the denominators is the **lowest common denominator** for adding and subtracting.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`(a) Simplify $\dfrac{84}{120}$. (b) Work out $\dfrac{5}{12} + \dfrac{7}{18}$.

(a) The HCF of $84$ and $120$ is $12$ (from Method 2). Divide top and bottom by $12$:
$$\frac{84}{120} = \frac{84 \div 12}{120 \div 12} = \frac{7}{10}$$
(b) $12 = 2^2 \times 3$ and $18 = 2 \times 3^2$, so the LCM is $2^2 \times 3^2 = 36$.
$$\frac{5}{12} + \frac{7}{18} = \frac{15}{36} + \frac{14}{36} = \frac{29}{36}$$
$29$ is prime, so the answer can’t be simplified.`} />
          </div>
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Swapping the two answers.** If your “HCF” is bigger than the numbers, or your “LCM” is smaller, you’ve mixed them up.
- **Multiplying the numbers to get the LCM.** $6 \times 8 = 48$ is a common multiple, but the LCM is $24$. Only coprime numbers have their product as the LCM.
- **Using the highest power for the HCF.** For $2^2 \times 3$ and $2^3 \times 5$, the HCF uses $2^2$, not $2^3$, because $2^3 = 8$ doesn’t divide into $12$.
- **Including a prime that isn’t in every number.** In the HCF of $18$, $30$ and $45$, the $2$ is left out because $45$ is odd.
- **Saying the HCF is 0 when nothing is shared.** If no prime is shared, the HCF is $1$, since $1$ divides every whole number.
- **Using HCF × LCM = product for three numbers.** It only holds for two. For $18$, $30$ and $45$: $3 \times 90 = 270$, but $18 \times 30 \times 45 = 24\,300$.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer. For the word problems, decide first whether it’s an HCF or an LCM question.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Gave the LCM when the question wanted the HCF? Don't just fix it. Study the mistake." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">HCF and LCM by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-7-prime-factors", text: "Prime factors in index notation, and using them to find the HCF and LCM of whole numbers." },
              { slug: "year-7-fraction-operations", text: "Simplifying with the HCF and adding or subtracting fractions over the lowest common denominator." },
              { slug: "year-8-factorising", text: "The HCF of algebraic terms like 12a²b and 18ab, taken outside the brackets." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

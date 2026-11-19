import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import PrimeFactorCalc from "@/components/maths/PrimeFactorCalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a calculator: prime factorisation. Built by the daily
// page task (Nov 2026); not yet read by Ryan, so it's in UNREVIEWED_PATHS
// (lib/reviewed.js). Every example, practice answer and calculator test case
// was recomputed by script before publishing.

const PATH = "/maths/prime-factorisation";
const TITLE = "Prime Factorisation: Factor Trees, Repeated Division and a Calculator (Year 7) | Tuterly";
const DESCRIPTION =
  "How to find the prime factors of a number with a factor tree or repeated division, write them in index notation, and use them for square roots. Free calculator.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is prime factorisation?", a: "Prime factorisation means writing a whole number as a product of prime numbers. For example, 84 = 2 × 2 × 3 × 7, which is written 2² × 3 × 7 in index notation. Every whole number greater than 1 has exactly one prime factorisation, apart from the order of the factors." },
  { q: "Is 1 a prime number?", a: "No. A prime number has exactly two different factors, 1 and itself. The number 1 has only one factor, so it isn't prime, and it never appears in a prime factorisation. The smallest prime is 2, which is also the only even prime." },
  { q: "How do you make a factor tree?", a: "Write the number at the top and split it into any two factors, such as 84 = 4 × 21. Circle any factor that is prime. Keep splitting the factors that aren't prime until every branch ends in a circled prime. Then multiply the circled primes together: 84 = 2 × 2 × 3 × 7." },
  { q: "Do different factor trees give different answers?", a: "No. You can start a factor tree with any pair of factors and the branches will look different, but the primes at the ends are always the same. 120 split as 10 × 12 or as 2 × 60 both end at 2 × 2 × 2 × 3 × 5 = 2³ × 3 × 5." },
  { q: "What is the prime factorisation of 100?", a: "100 = 2 × 2 × 5 × 5, or 2² × 5² in index notation. Both powers are even, which tells you 100 is a perfect square: its square root is 2 × 5 = 10." },
  { q: "What year level learns prime factorisation?", a: "In the Victorian Curriculum 2.0, Year 7 students write natural numbers as products of powers of primes using exponent notation. The skill is used again in Year 8 index laws and in Year 9 and 10 when simplifying surds and finding square roots." },
];

const PRACTICE = [
  { q: R`Write $60$ as a product of prime factors in index notation.`, a: R`$60 = 2 \times 2 \times 3 \times 5 = 2^2 \times 3 \times 5$` },
  { q: R`Write $126$ as a product of prime factors in index notation.`, a: R`$126 \div 2 = 63$, $63 \div 3 = 21$, $21 \div 3 = 7$, $7 \div 7 = 1$, so $126 = 2 \times 3^2 \times 7$` },
  { q: R`Write $200$ as a product of prime factors in index notation.`, a: R`$200 = 2 \times 2 \times 2 \times 5 \times 5 = 2^3 \times 5^2$` },
  { q: R`Write $1001$ as a product of prime factors.`, a: R`It isn't divisible by $2$, $3$ or $5$. $1001 \div 7 = 143$, $143 \div 11 = 13$, so $1001 = 7 \times 11 \times 13$` },
  { q: R`Write $2025$ as a product of prime factors in index notation.`, a: R`$2025 \div 3 = 675$, $675 \div 3 = 225$, $225 \div 3 = 75$, $75 \div 3 = 25$, $25 \div 5 = 5$, $5 \div 5 = 1$, so $2025 = 3^4 \times 5^2$` },
  { q: R`Is $391$ a prime number? Explain.`, a: R`No. $\sqrt{391} \approx 19.77$, so test primes up to $19$. $391 \div 17 = 23$, so $391 = 17 \times 23$.` },
  { q: R`Use prime factors to find $\sqrt{3136}$.`, a: R`$3136 = 2^6 \times 7^2$. Halve each power: $\sqrt{3136} = 2^3 \times 7 = 8 \times 7 = 56$` },
  { q: R`What is the smallest whole number you can multiply $300$ by to make a perfect square?`, a: R`$300 = 2^2 \times 3 \times 5^2$. Only the power of $3$ is odd, so multiply by $3$: $900 = 2^2 \times 3^2 \times 5^2 = 30^2$` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Prime factorisation", path: PATH }]}
      eyebrow="Maths explained · Years 7 to 9"
      h1="How to find the prime factorisation of a number"
      lead="Prime factorisation breaks a whole number down into the prime numbers that multiply to make it. Here’s how to do it with a factor tree or by repeated division, how to write the answer in index notation, how to tell if a number is prime, and how prime factors give you square roots without a calculator. The calculator below shows every division."
      quickAnswer="To find the prime factorisation of a number, keep dividing it by the smallest prime that goes in exactly (2, then 3, 5, 7, 11 and so on) until you reach 1. The primes you divided by are the prime factors. For example, 84 ÷ 2 = 42, 42 ÷ 2 = 21, 21 ÷ 3 = 7 and 7 ÷ 7 = 1, so 84 = 2 × 2 × 3 × 7 = 2² × 3 × 7."
      toc={[
        ["primes", "Prime numbers first"],
        ["tree", "Factor trees"],
        ["division", "Repeated division"],
        ["calculator", "Calculator"],
        ["same", "Why every tree gives the same answer"],
        ["is-prime", "Is it prime?"],
        ["roots", "Square roots and perfect squares"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a prime factors question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_prime_factorisation"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="Prime factorisation: common questions"
      links={[
        { href: "/worksheets/year-7-prime-factors", label: "Year 7 powers and prime factors worksheets" },
        { href: "/year-7-maths-test", label: "Year 7 maths practice test" },
        { href: "/maths/index-laws", label: "Index laws" },
        { href: "/maths/simplifying-fractions", label: "Simplifying fractions" },
        { href: "/maths/surds", label: "Surds" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Lost marks on a prime factors question?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="primes" className="tb-section" aria-labelledby="h-primes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-primes" className="tb-h2 pg-h2">Prime numbers first</h2>
          <MathMd md={R`A **prime number** is a whole number with exactly two factors: $1$ and itself. The first few are

$$2,\ 3,\ 5,\ 7,\ 11,\ 13,\ 17,\ 19,\ 23,\ 29,\ 31,\ 37, \ldots$$

A whole number bigger than $1$ that isn't prime is **composite**: it can be split into smaller factors, like $15 = 3 \times 5$. The number $1$ is neither prime nor composite.

**Prime factorisation** writes a composite number as a product of primes only. Because primes can't be split any further, they are the building blocks of every whole number.`} />
        </div>
      </section>

      <section id="tree" className="tb-section" aria-labelledby="h-tree">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-tree" className="tb-h2 pg-h2">Method 1: a factor tree</h2>
          <MathMd md={R`Split the number into any two factors. Circle the ones that are prime and keep splitting the rest until every branch ends in a prime.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Write $84$ as a product of prime factors.

Split $84$ into two factors:
$$84 = 4 \times 21$$
Neither $4$ nor $21$ is prime, so split both:
$$4 = 2 \times 2 \qquad 21 = 3 \times 7$$
Every branch now ends in a prime: $2$, $2$, $3$ and $7$.
$$84 = 2 \times 2 \times 3 \times 7$$
Group the repeated $2$s with an index:
$$84 = 2^2 \times 3 \times 7$$`} />
          </div>
          <MathMd md={R`Check by multiplying back: $4 \times 3 \times 7 = 84$ ✓. Write the primes from smallest to largest; it’s the order most teachers expect.`} />
        </div>
      </section>

      <section id="division" className="tb-section" aria-labelledby="h-division">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-division" className="tb-h2 pg-h2">Method 2: repeated division (the ladder)</h2>
          <MathMd md={R`Divide by the smallest prime that goes in exactly. Keep dividing the answer until you reach $1$. This is the tidier method for bigger numbers, because you never have to guess a starting pair.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Find the prime factorisation of $630$.

$$630 \div 2 = 315$$
$315$ is odd, so try $3$ (its digits add to $9$):
$$315 \div 3 = 105$$
$$105 \div 3 = 35$$
$35$ isn't divisible by $3$, so try $5$:
$$35 \div 5 = 7$$
$$7 \div 7 = 1$$
The divisors were $2, 3, 3, 5, 7$:
$$630 = 2 \times 3^2 \times 5 \times 7$$`} />
          </div>
          <MathMd md={R`Quick divisibility tests save time: a number is divisible by $2$ if it’s even, by $3$ if its digits add to a multiple of $3$, and by $5$ if it ends in $0$ or $5$.`} />
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Prime factorisation calculator (with working)</h2>
          <p className="pg-intro">Type any whole number up to one billion. You’ll see each division, the answer in index notation, and whether the number is prime or a perfect square.</p>
          <PrimeFactorCalc placement="concept_prime_factorisation_calc" />
        </div>
      </section>

      <section id="same" className="tb-section" aria-labelledby="h-same">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-same" className="tb-h2 pg-h2">Why every factor tree gives the same answer</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: two different trees for 120</p>
            <MathMd md={R`**Tree A** starts with $120 = 10 \times 12$:
$$10 = 2 \times 5 \qquad 12 = 2 \times 6 = 2 \times 2 \times 3$$
$$120 = 2 \times 5 \times 2 \times 2 \times 3$$

**Tree B** starts with $120 = 2 \times 60$:
$$60 = 2 \times 30 = 2 \times 2 \times 15 = 2 \times 2 \times 3 \times 5$$
$$120 = 2 \times 2 \times 2 \times 3 \times 5$$

Sort both lists and they match:
$$120 = 2^3 \times 3 \times 5$$`} />
          </div>
          <MathMd md={R`This always happens. Every whole number greater than $1$ has exactly one set of prime factors (mathematicians call this the Fundamental Theorem of Arithmetic). So if two students get different answers, at least one of them has a number in their list that isn’t prime.`} />
        </div>
      </section>

      <section id="is-prime" className="tb-section" aria-labelledby="h-is-prime">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-is-prime" className="tb-h2 pg-h2">How to check if a number is prime</h2>
          <MathMd md={R`You only need to test primes up to the **square root** of the number. If a number has a factor bigger than its square root, the matching factor is smaller than the square root, and you would already have found it.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example</p>
            <MathMd md={R`Are $221$ and $199$ prime?

**221:** $\sqrt{221} \approx 14.87$, so test $2, 3, 5, 7, 11, 13$.
It’s odd, its digits add to $5$, it doesn’t end in $0$ or $5$, and $7$ and $11$ don’t go in. Then
$$221 \div 13 = 17$$
So $221 = 13 \times 17$ is **not** prime.

**199:** $\sqrt{199} \approx 14.11$, so test the same primes, $2$ to $13$. None of them divides $199$ exactly, so $199$ **is** prime.`} />
          </div>
        </div>
      </section>

      <section id="roots" className="tb-section" aria-labelledby="h-roots">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-roots" className="tb-h2 pg-h2">Square roots and perfect squares</h2>
          <MathMd md={R`A number is a **perfect square** when every power in its prime factorisation is even. To find the square root, halve each power.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: a square root without a calculator</p>
            <MathMd md={R`Find $\sqrt{1764}$.

$$1764 \div 2 = 882, \quad 882 \div 2 = 441$$
$$441 \div 3 = 147, \quad 147 \div 3 = 49$$
$$49 \div 7 = 7, \quad 7 \div 7 = 1$$
$$1764 = 2^2 \times 3^2 \times 7^2$$
All the powers are even, so halve them:
$$\sqrt{1764} = 2 \times 3 \times 7 = 42$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: making a perfect square</p>
            <MathMd md={R`What is the smallest whole number you can multiply $540$ by to get a perfect square?

$$540 = 2^2 \times 3^3 \times 5$$
The powers of $3$ and $5$ are odd. One more $3$ and one more $5$ make them even, so multiply by $3 \times 5 = 15$:
$$540 \times 15 = 8100 = 2^2 \times 3^4 \times 5^2$$
$$\sqrt{8100} = 2 \times 3^2 \times 5 = 90$$
The answer is $15$.`} />
          </div>
          <MathMd md={R`Prime factors are also the quickest way to find the highest common factor and lowest common multiple of two numbers, and to simplify surds like $\sqrt{72} = 6\sqrt{2}$ in Year 9.`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Stopping at a number that isn’t prime.** $84 = 2 \times 2 \times 21$ isn’t finished, because $21 = 3 \times 7$. Check every number in your answer is on the prime list.
- **Including 1.** $1$ isn’t prime, so $84 = 1 \times 2^2 \times 3 \times 7$ is wrong. Leave it out.
- **Treating 9, 15, 21, 27 or 51 as prime.** They’re odd, but they aren’t prime: $51 = 3 \times 17$. Use the digit-sum test for $3$.
- **Writing the index wrongly.** $2 \times 2 \times 2$ is $2^3$, not $2 \times 3$ or $6$.
- **Adding instead of multiplying.** The factors multiply to make the number. $2 + 2 + 3 + 7$ is $14$, not $84$.
- **Not checking.** Multiply your primes back together at the end. If you don’t get the starting number, something went wrong.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer. Use whichever method you like; the primes at the end will be the same.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Left a 21 in your answer or counted 1 as prime? Don't just fix it. Study the mistake." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Prime factors by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-7-prime-factors", text: "Factor trees, repeated division and writing numbers as products of prime powers in index notation." },
              { slug: "year-8-exponents", text: "Index laws with numbers, where prime factorisations make simplifying powers quicker." },
              { slug: "year-9-surds", text: "Simplifying surds by pulling out square factors, found from the prime factorisation." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import ProbabilityCalc from "@/components/maths/ProbabilityCalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a calculator: how to calculate probability. Built by
// the daily page task (Nov 2026); not yet read by Ryan, so it's in
// UNREVIEWED_PATHS (lib/reviewed.js). Every example and practice answer was
// recomputed by script before publishing.

const PATH = "/maths/probability";
const TITLE = "How to Calculate Probability: Formula, Worked Examples and Calculator (Years 7 to 10) | Tuterly";
const DESCRIPTION =
  "How to calculate probability: favourable over total outcomes, the 0 to 1 scale, complements, two dice, and/or events, without replacement. Free calculator.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "How do you calculate probability?", a: "Count the outcomes that give the result you want and divide by the total number of outcomes, as long as every outcome is equally likely. Rolling a number greater than 4 on a die: 5 and 6 are favourable out of 6 outcomes, so the probability is 2/6 = 1/3." },
  { q: "Can a probability be more than 1?", a: "No. Every probability is between 0 and 1. A probability of 0 means the event is impossible and 1 means it is certain. If you get an answer above 1 (or above 100%), something has gone wrong, usually counting an outcome twice or dividing the wrong way round." },
  { q: "What is the difference between theoretical and experimental probability?", a: "Theoretical probability comes from counting equally likely outcomes, before anything happens: the chance of a head is 1/2. Experimental probability (relative frequency) comes from results you actually recorded: 27 heads in 50 tosses gives 27/50 = 0.54. The more trials you run, the closer the two usually get." },
  { q: "How do you find the probability of two events happening?", a: "If the events are independent (one doesn't change the other), multiply: a head and a 6 is 1/2 × 1/6 = 1/12. For ‘A or B’, add the two probabilities and take away the overlap so it isn’t counted twice. When the first result changes what’s left, as in drawing without replacement, change the second fraction before you multiply." },
  { q: "What is a sample space?", a: "The sample space is the list of every possible outcome. For one die it is {1, 2, 3, 4, 5, 6}. For two dice it is the 36 pairs in a 6 by 6 grid. Writing out the sample space first is the safest way to count favourable outcomes without missing any." },
  { q: "Should I write a probability as a fraction, decimal or percentage?", a: "Any of the three is correct, unless the question asks for one. Fractions are exact and are best for multiplying probabilities together, so most teachers expect a simplified fraction. Decimals and percentages make it easier to compare two chances, such as 0.35 against 0.4." },
];

const PRACTICE = [
  { q: R`A fair six-sided die is rolled. Find the probability of rolling a prime number.`, a: R`The primes are $2, 3, 5$: $P = \dfrac{3}{6} = \dfrac{1}{2}$` },
  { q: R`A bag holds $7$ red, $5$ white and $8$ black counters. One is taken at random. Find $P(\text{white})$ and $P(\text{not black})$.`, a: R`$20$ counters. $P(\text{white}) = \dfrac{5}{20} = \dfrac{1}{4}$, $P(\text{not black}) = \dfrac{12}{20} = \dfrac{3}{5}$` },
  { q: R`One letter is chosen at random from the word MATHEMATICS. Find the probability that it is an M, and the probability that it is a vowel.`, a: R`$11$ letters. Two Ms: $P(\text{M}) = \dfrac{2}{11}$. Vowels A, E, A, I: $P(\text{vowel}) = \dfrac{4}{11}$` },
  { q: R`The chance of rain tomorrow is $0.35$. What is the chance it doesn’t rain? Give your answer as a percentage too.`, a: R`$1 - 0.35 = 0.65$, or $65\%$` },
  { q: R`Two fair dice are rolled and the numbers are added. Find the probability that the total is $5$.`, a: R`$(1,4), (2,3), (3,2), (4,1)$: $P = \dfrac{4}{36} = \dfrac{1}{9}$` },
  { q: R`A coin is tossed three times. Find the probability of getting exactly two heads.`, a: R`$8$ outcomes. HHT, HTH, THH: $P = \dfrac{3}{8}$` },
  { q: R`A spinner lands on red with probability $0.2$. How many times would you expect red in $150$ spins?`, a: R`$0.2 \times 150 = 30$ times` },
  { q: R`A box has $12$ pens and $3$ of them don’t work. Two pens are taken without replacement. Find the probability that both don’t work.`, a: R`$\dfrac{3}{12} \times \dfrac{2}{11} = \dfrac{6}{132} = \dfrac{1}{22}$` },
  { q: R`One card is drawn from a standard deck of $52$. Find the probability that it is a red picture card (jack, queen or king).`, a: R`$3$ picture cards in each of the $2$ red suits: $P = \dfrac{6}{52} = \dfrac{3}{26}$` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Probability", path: PATH }]}
      eyebrow="Maths explained · Years 7 to 10"
      h1="How to calculate probability"
      lead="Probability measures how likely something is, on a scale from 0 (it can’t happen) to 1 (it’s certain). Most school questions come down to one fraction: the outcomes you want over all the outcomes. Here’s how to use it with dice, cards and bags of counters, how to handle ‘not’, ‘and’ and ‘or’, what changes without replacement, and how experiments fit in, with a calculator that shows every step."
      quickAnswer="Probability of an event = number of favourable outcomes ÷ total number of outcomes, when every outcome is equally likely. Rolling an even number on a die: 3 favourable outcomes (2, 4, 6) out of 6, so P = 3/6 = 1/2 = 0.5 = 50%. The chance it doesn’t happen is 1 minus the probability."
      toc={[
        ["formula", "The probability formula"],
        ["examples", "Worked examples"],
        ["calculator", "Probability calculator"],
        ["not", "The chance it doesn’t happen"],
        ["or", "‘Or’ questions and overlaps"],
        ["two", "Two dice, coins and two-step events"],
        ["replacement", "Without replacement"],
        ["experimental", "Experimental probability and expected number"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a probability question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_probability"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="Probability: common questions"
      links={[
        { href: "/worksheets/probability", label: "Probability worksheets, Years 7 to 10" },
        { href: "/worksheets/year-8-probability", label: "Year 8 probability worksheets" },
        { href: "/worksheets/year-9-relative-frequency", label: "Year 9 relative frequency worksheets" },
        { href: "/maths/simplifying-fractions", label: "Simplifying fractions" },
        { href: "/year-8-maths-test", label: "Year 8 maths practice test" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Lost marks on a probability question?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="formula" className="tb-section" aria-labelledby="h-formula">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-formula" className="tb-h2 pg-h2">The probability formula</h2>
          <div className="mx-formula"><MathMd md={R`$$P(\text{event}) = \frac{\text{number of favourable outcomes}}{\text{total number of outcomes}}$$`} /></div>
          <MathMd md={R`- The **sample space** is the list of every possible outcome. For one die it is $\{1, 2, 3, 4, 5, 6\}$.
- The **favourable outcomes** are the ones that give the result you’re asked about.
- The formula only works when the outcomes are **equally likely**: a fair die, a well-shuffled deck, a counter chosen at random.

Every probability sits on a scale from $0$ to $1$:

| Probability | $0$ | between $0$ and $\tfrac{1}{2}$ | $\tfrac{1}{2}$ | between $\tfrac{1}{2}$ and $1$ | $1$ |
|---|---|---|---|---|---|
| In words | impossible | unlikely | even chance | likely | certain |

You can write the same probability as a fraction, a decimal or a percentage: $\tfrac{1}{4} = 0.25 = 25\%$. A simplified fraction is the usual choice, because it is exact.`} />
        </div>
      </section>

      <section id="examples" className="tb-section" aria-labelledby="h-examples">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-examples" className="tb-h2 pg-h2">Worked examples</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example 1: one die</p>
            <MathMd md={R`A fair six-sided die is rolled. Find the probability of rolling a number greater than $4$.

1. Sample space: $\{1, 2, 3, 4, 5, 6\}$, so there are $6$ equally likely outcomes.
2. Greater than $4$ means $5$ or $6$: $2$ favourable outcomes. ($4$ itself is not greater than $4$.)
$$P(\text{greater than } 4) = \frac{2}{6} = \frac{1}{3}$$
As a decimal that is about $0.33$, or about $33\%$.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example 2: a bag of counters</p>
            <MathMd md={R`A bag has $5$ red, $3$ blue and $4$ green counters. One counter is taken out without looking. Find $P(\text{blue})$ and $P(\text{not green})$.

1. Total: $5 + 3 + 4 = 12$ counters.
2. Blue: $3$ of the $12$.
$$P(\text{blue}) = \frac{3}{12} = \frac{1}{4} = 0.25 = 25\%$$
3. Not green means red or blue: $5 + 3 = 8$ counters.
$$P(\text{not green}) = \frac{8}{12} = \frac{2}{3}$$`} />
          </div>
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Probability calculator (with working)</h2>
          <p className="pg-intro">Enter the number of favourable outcomes and the total to get the probability as a simplified fraction, decimal and percentage, plus the chance it doesn’t happen. Switch tabs for two independent events or the expected number of results in a set of trials.</p>
          <ProbabilityCalc placement="concept_probability_calc" />
        </div>
      </section>

      <section id="not" className="tb-section" aria-labelledby="h-not">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-not" className="tb-h2 pg-h2">The chance it doesn’t happen (complementary events)</h2>
          <MathMd md={R`An event either happens or it doesn’t, so the two probabilities add to $1$:

$$P(\text{not } A) = 1 - P(A)$$

If the chance of a train running late is $0.15$, the chance it is on time is $1 - 0.15 = 0.85$. This shortcut is often quicker than counting, especially when the event you want has lots of outcomes and its opposite has only a few.`} />
        </div>
      </section>

      <section id="or" className="tb-section" aria-labelledby="h-or">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-or" className="tb-h2 pg-h2">‘Or’ questions: don’t count the overlap twice</h2>
          <MathMd md={R`A standard deck has $52$ cards in four suits (hearts, diamonds, clubs, spades), with $13$ cards in each suit and $4$ kings.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example 3: a king or a heart</p>
            <MathMd md={R`One card is drawn at random. Find the probability that it is a king or a heart.

1. There are $13$ hearts. One of them is the king of hearts.
2. The other kings not yet counted: clubs, diamonds and spades, so $3$ more.
3. Favourable outcomes: $13 + 3 = 16$.
$$P(\text{king or heart}) = \frac{16}{52} = \frac{4}{13}$$

The same answer from the addition rule: $P(\text{king}) + P(\text{heart}) - P(\text{king and heart}) = \frac{4}{52} + \frac{13}{52} - \frac{1}{52} = \frac{16}{52}$.`} />
          </div>
          <MathMd md={R`A Venn diagram or a two-way table makes the overlap easy to see. If two events can’t happen together (rolling a $2$ and rolling a $5$ on one die), there is no overlap and you simply add.`} />
        </div>
      </section>

      <section id="two" className="tb-section" aria-labelledby="h-two">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-two" className="tb-h2 pg-h2">Two dice, coins and two-step events</h2>
          <MathMd md={R`When two things happen, list the sample space as a grid or a tree diagram. Two dice give $6 \times 6 = 36$ equally likely pairs. Here are the totals:

| $+$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ |
|---|---|---|---|---|---|---|
| $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ |
| $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ |
| $3$ | $4$ | $5$ | $6$ | $7$ | $8$ | $9$ |
| $4$ | $5$ | $6$ | $7$ | $8$ | $9$ | $10$ |
| $5$ | $6$ | $7$ | $8$ | $9$ | $10$ | $11$ |
| $6$ | $7$ | $8$ | $9$ | $10$ | $11$ | $12$ |`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example 4: a total of 8</p>
            <MathMd md={R`Two fair dice are rolled. Find the probability that the total is $8$.

1. Find every $8$ in the grid: $(2, 6), (3, 5), (4, 4), (5, 3), (6, 2)$. That’s $5$ outcomes.
$$P(\text{total of } 8) = \frac{5}{36}$$
Notice $(2, 6)$ and $(6, 2)$ are different outcomes: the first die and the second die are different dice.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example 5: a coin and a die</p>
            <MathMd md={R`A coin is tossed and a die is rolled. Find the probability of a head and a $6$.

The coin can’t affect the die, so the events are **independent**. Multiply:
$$P(\text{head and } 6) = \frac{1}{2} \times \frac{1}{6} = \frac{1}{12}$$
Check by listing: there are $2 \times 6 = 12$ outcomes (H1, H2, …, T6) and only H6 works.`} />
          </div>
        </div>
      </section>

      <section id="replacement" className="tb-section" aria-labelledby="h-replacement">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-replacement" className="tb-h2 pg-h2">Without replacement: the second fraction changes</h2>
          <MathMd md={R`If the first item isn’t put back, there is one fewer item for the second pick, and possibly one fewer of the colour you took.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example 6</p>
            <MathMd md={R`A jar has $4$ red and $6$ yellow jellybeans. Two are taken, one after the other, without replacement. Find the probability that (a) both are red, (b) one of each colour is taken.

1. (a) First pick: $4$ red out of $10$. Second pick: $3$ red left out of $9$.
$$P(\text{both red}) = \frac{4}{10} \times \frac{3}{9} = \frac{12}{90} = \frac{2}{15}$$
2. (b) One of each can happen two ways: red then yellow, or yellow then red.
$$\frac{4}{10} \times \frac{6}{9} + \frac{6}{10} \times \frac{4}{9} = \frac{24}{90} + \frac{24}{90} = \frac{48}{90} = \frac{8}{15}$$
3. Check: $P(\text{both yellow}) = \frac{6}{10} \times \frac{5}{9} = \frac{1}{3} = \frac{5}{15}$, and $\frac{2}{15} + \frac{8}{15} + \frac{5}{15} = 1$ ✓`} />
          </div>
        </div>
      </section>

      <section id="experimental" className="tb-section" aria-labelledby="h-experimental">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-experimental" className="tb-h2 pg-h2">Experimental probability and expected number</h2>
          <MathMd md={R`When you can’t count equally likely outcomes (a drawing pin landing point up, a basketball shot going in), use results instead:

$$\text{relative frequency} = \frac{\text{number of times it happened}}{\text{number of trials}}$$

Going the other way, the **expected number** of times something happens is the probability multiplied by the number of trials.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example 7</p>
            <MathMd md={R`(a) A spinner landed on blue $18$ times in $60$ spins. Estimate $P(\text{blue})$. (b) A different, fair spinner has $4$ equal sectors, one of them blue. How many blues would you expect in $200$ spins?

1. (a) $\dfrac{18}{60} = \dfrac{3}{10} = 0.3$
2. (b) $P(\text{blue}) = \dfrac{1}{4}$, so the expected number is $\dfrac{1}{4} \times 200 = 50$.

The expected number is a long-run average. In a real set of $200$ spins you might get $46$ or $53$ blues, and that is normal.`} />
          </div>
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Assuming outcomes are equally likely when they aren’t.** “You either win or you don’t, so it’s $\tfrac{1}{2}$” is wrong. A spinner with one large and two small sectors isn’t three equal outcomes either. Count equally likely outcomes, or use results.
- **Treating the totals of two dice as equally likely.** The totals $2$ to $12$ are $11$ values, but $P(7)$ is not $\tfrac{1}{11}$. Use the $36$-square grid: $P(7) = \tfrac{6}{36} = \tfrac{1}{6}$.
- **Counting the overlap twice.** For a king or a heart, $\tfrac{4 + 13}{52} = \tfrac{17}{52}$ counts the king of hearts twice. The correct answer is $\tfrac{16}{52} = \tfrac{4}{13}$.
- **Adding when the question says ‘and’.** For two independent events, $P(\text{head and } 6) = \tfrac{1}{2} \times \tfrac{1}{6}$, not $\tfrac{1}{2} + \tfrac{1}{6}$. A quick test: ‘and’ should make the chance smaller, not bigger.
- **Forgetting to change the second fraction without replacement.** In worked example 6, $\tfrac{4}{10} \times \tfrac{4}{10}$ treats the first jellybean as if it went back in.
- **Writing odds instead of a probability.** $3$ blue and $9$ other counters is a probability of $\tfrac{3}{12}$, not $\tfrac{3}{9}$ or $3 : 9$. The bottom of the fraction is always the total.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer. Write the sample space or the total first, then count.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Counted the overlap twice again? Study the mistake, not just the answer." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Probability by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-7-probability", text: "Sample spaces for one event, probabilities as fractions, decimals and percentages, and predicting relative frequencies." },
              { slug: "year-8-complementary-events", text: "Complementary events: using P(not A) = 1 − P(A) in real contexts." },
              { slug: "year-9-probability", text: "Two-step experiments with and without replacement, using tables and tree diagrams." },
              { slug: "year-10-probability", text: "Multi-step events, independence and conditional probability." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

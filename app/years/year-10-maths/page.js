import Link from "next/link";
import HubShell from "@/components/years-maths-hubs/HubShell";
import { pageMetadata } from "@/lib/years-maths-hubs";

const PATH = "/years/year-10-maths";
const TITLE = "Year 10 and 10A Maths: Australian Parent Guide | Tuterly";
const DESCRIPTION =
  "What Year 10 and 10A maths cover in Australia, where students lose marks, how it prepares for senior maths choices, and practical ways parents can help at home.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const W = (slug, label) => ({ href: `/worksheets/${slug}`, label });

const STRANDS = [
  {
    name: "Number",
    summary: "Exact values versus rounded ones.",
    items: [
      "The effect of rounding and approximation in repeated calculations, compared with exact values",
    ],
  },
  {
    name: "Algebra",
    summary: "The heaviest strand of Year 10, and the one senior maths builds on most.",
    items: [
      "Index laws applied to algebraic products and quotients",
      "Expanding binomials and factorising monic quadratics such as x² + 5x + 6",
      "Solving simple quadratic equations, including with the null factor law",
      "Simultaneous linear equations, algebraically and graphically",
      "Linear inequalities, graphed on a number line",
      "Algebraic fractions and equations with fractions",
      "Rearranging formulas to change the subject",
      "Gradients of parallel and perpendicular lines, building on Year 9 gradient, midpoint and distance",
      "Graphs of simple quadratics, reciprocals, circles and exponentials",
      "Simple exponential equations",
      "Modelling with inverse proportion, growth and decay, including compound interest",
    ],
    links: [
      W("year-10-index-laws", "Index laws"),
      W("year-10-quadratic-factorising", "Factorising quadratics"),
      W("year-10-quadratic-equations", "Quadratic equations"),
      W("year-10-simultaneous-equations", "Simultaneous equations"),
      W("year-10-linear-inequalities", "Inequalities"),
      W("year-10-algebraic-fractions", "Algebraic fractions"),
      W("year-10-rearranging-formulas", "Rearranging formulas"),
      W("year-10-coordinate-geometry", "Coordinate geometry"),
      W("year-10-parabolas-circles-exponentials", "Graphs"),
      W("year-10-exponential-equations", "Exponential equations"),
      W("year-10-compound-interest", "Compound interest"),
    ],
  },
  {
    name: "Measurement",
    summary: "Composite solids, trigonometry in context and proportion.",
    items: [
      "Surface area and volume of composite objects",
      "Pythagoras and trigonometry with direction and angles of elevation and depression",
      "Logarithmic scales, such as the Richter and decibel scales",
      "Direct and inverse proportion, and scaling objects",
    ],
    links: [
      W("year-10-surface-area-volume", "Surface area and volume"),
      W("year-10-trigonometry", "Trigonometry"),
      W("year-10-logarithmic-scales", "Logarithmic scales"),
      W("year-10-inverse-proportion", "Inverse proportion"),
    ],
  },
  {
    name: "Space",
    summary: "Reasoning and proof.",
    items: [
      "Geometric proofs using congruence and similarity",
      "Networks, paths and connections",
    ],
    links: [
      W("year-10-geometric-reasoning", "Geometric reasoning"),
      W("year-10-networks", "Networks"),
    ],
  },
  {
    name: "Statistics",
    summary: "Spread, relationships and judging claims.",
    items: [
      "Comparing data sets using quartiles, interquartile range and box plots",
      "Scatter plots and describing relationships between two variables",
      "Two-way tables for categorical data",
      "Evaluating statistical claims in the media",
    ],
    links: [
      W("year-10-statistics", "Statistics"),
      W("year-10-scatterplots", "Scatter plots"),
      W("year-10-two-way-tables", "Two-way tables"),
    ],
  },
  {
    name: "Probability",
    summary: "Conditional thinking.",
    items: [
      "Two- and three-step experiments with and without replacement",
      "Conditional probability and the language of “given” and “if … then”",
      "Independent and dependent events",
    ],
    links: [
      W("year-10-probability", "Probability"),
      W("year-10-tree-diagrams", "Tree diagrams"),
    ],
  },
];

// Victorian Curriculum 2.0 Level 10A (VC2M10AN.., VC2M10AA.., etc.): optional
// extension content, kept separate from the mainstream Year 10 strands above.
// AC v9 has a shorter list ("Optional content for post-Year 10 mathematics
// pathways"); the 10A intro below names the topics it leaves out.
const STRANDS_10A = [
  {
    name: "Number (10A)",
    items: [
      "Rational and irrational numbers, surds and fractional indices",
      "Logarithms and the log laws",
    ],
    links: [
      W("year-10a-surds", "Surds"),
      W("year-10a-logarithms", "Logarithms"),
    ],
  },
  {
    name: "Algebra (10A)",
    items: [
      "Polynomials, and the factor and remainder theorems",
      "Factorising non-monic quadratics such as 2x² + 7x + 3",
      "Exponential and logarithmic equations",
      "Sketching parabolas, hyperbolas, circles and exponentials, and their transformations",
      "Function notation",
      "Linear and non-linear simultaneous equations",
    ],
    links: [
      W("year-10a-polynomials", "Polynomials"),
      W("year-10a-non-monic-quadratics", "Non-monic quadratics"),
      W("year-10a-exponential-log-equations", "Exponential and log equations"),
      W("year-10a-function-notation", "Function notation"),
      W("year-10a-non-linear-simultaneous-equations", "Non-linear simultaneous equations"),
    ],
  },
  {
    name: "Measurement (10A)",
    items: [
      "Surface area and volume of right pyramids, right cones and spheres",
      "Average rate of change and limiting values",
    ],
    links: [W("year-10a-pyramids-cones-spheres", "Pyramids, cones and spheres")],
  },
  {
    name: "Space (10A)",
    items: [
      "Circle theorems (radii, diameters, chords and tangents)",
      "The sine, cosine and area rules for any triangle",
      "The unit circle and graphs of sine, cosine and tangent",
      "Simple trigonometric equations",
      "Pythagoras and trigonometry in three dimensions",
    ],
    links: [
      W("year-10a-circle-theorems", "Circle theorems"),
      W("year-10a-sine-cosine-rule", "Sine and cosine rules"),
      W("year-10a-trigonometric-equations", "Trig equations"),
      W("year-10a-3d-trigonometry", "3D trigonometry"),
    ],
  },
  {
    name: "Statistics (10A)",
    items: [
      "Mean and standard deviation, and the effect of outliers",
      "Choosing a measure of spread to suit the data",
      "Lines of best fit for bivariate data using digital tools",
    ],
    links: [W("year-10a-standard-deviation", "Standard deviation")],
  },
  {
    name: "Probability (10A)",
    items: [
      "Counting principles and factorial notation",
    ],
    links: [W("year-10a-permutations-combinations", "Counting and arrangements")],
  },
];

const MISTAKES = [
  {
    title: "Factorising errors with negatives",
    text: "Finding two numbers that multiply and add correctly gets harder when signs are negative. A small sign error makes every later step wrong.",
    eg: "Example: x² − x − 6 = (x − 3)(x + 2).",
    link: W("year-10-quadratic-factorising", "Year 10 factorising quadratics worksheet"),
  },
  {
    title: "Dividing by x instead of factorising",
    text: "Solving x² = 5x by dividing both sides by x loses the solution x = 0. Students need to move everything to one side and factorise.",
    link: W("year-10-quadratic-equations", "Year 10 quadratic equations worksheet"),
  },
  {
    title: "Simultaneous equations sign slips",
    text: "Subtracting one equation from another and forgetting to subtract every term is the usual cause of wrong answers. Substituting back in to check catches it.",
    link: W("year-10-simultaneous-equations", "Year 10 simultaneous equations worksheet"),
  },
  {
    title: "Flipping the inequality",
    text: "Multiplying or dividing an inequality by a negative number reverses the sign. It is a one-mark rule that is easy to forget.",
    link: W("year-10-linear-inequalities", "Year 10 linear inequalities worksheet"),
  },
  {
    title: "Rearranging formulas out of order",
    text: "Changing the subject means undoing operations in reverse order. Students who memorised “move it across” often get stuck when the formula has a square or a fraction.",
    link: W("year-10-rearranging-formulas", "Year 10 rearranging formulas worksheet"),
  },
  {
    title: "Rushing exam conditions",
    text: "Year 10 exams are often longer and closer to senior exam style. Running out of time, or skipping the reading time plan, costs marks that knowledge alone will not recover.",
    link: { href: "/maths-exam-preparation/year-10", label: "Year 10 maths exam preparation" },
  },
];

const PARENT_TIPS = [
  { title: "Find out what each senior maths option needs.", text: "Ask the school which Year 10 results or classes are expected for each Year 11 maths subject before subject selection opens." },
  { title: "Prioritise algebra over everything else.", text: "Factorising, solving and rearranging appear in every senior maths subject. Time spent here pays off the most." },
  { title: "Practise under timed conditions before exams.", text: "In the weeks before exams, one or two timed practice tests show your child how their pace holds up." },
  { title: "Review mistakes, not just marks.", text: "After each test, go through what went wrong. Repeated errors are the clearest guide to what to practise next." },
  { title: "Keep the conversation low-pressure.", text: "Students who feel maths decides their future can freeze in tests. Focus on steady progress and the next step, not the final mark." },
  { title: "Plan for the mid-year exams.", text: "Many schools hold Year 10 exams mid-year and at the end of the year. Starting revision two to three weeks early avoids last-minute cramming." },
];

const APP_STEPS = [
  { title: "Snap the question they got wrong", text: "A factorising question, a simultaneous equation or an angle of elevation problem. It is saved to their bank with a step-by-step worked solution." },
  { title: "Try a similar question", text: "Tuterly gives a similar question on the same skill, so a sign slip in factorising gets practised on its own rather than the whole chapter." },
  { title: "Topic check before exams", text: "Pick any Year 10 topic, such as quadratics or probability, for a short test with one question per section, even before anything has been snapped. Wrong answers go into the bank." },
  { title: "Fix my mistakes", text: "A drill of every question still to fix in the bank, which makes a focused last session before a mid-year or end-of-year exam." },
];

const FAQS = [
  {
    q: "What is the difference between Year 10 and 10A maths?",
    a: "Year 10 maths is the standard course. 10A is optional extra content that some schools teach to students heading towards the more advanced senior maths subjects. It usually covers harder algebra and further topics. Schools name and structure it differently, so ask yours what its advanced class covers.",
  },
  {
    q: "What topics are in 10A maths?",
    a: "Content varies, but 10A commonly includes topics such as surds, factorising harder (non-monic) quadratics, polynomials, logarithms, circle geometry, the sine and cosine rules, and standard deviation. Some schools teach only part of it.",
  },
  {
    q: "Does my child need 10A to take advanced maths in Year 11?",
    a: "Not always, but many schools recommend a strong Year 10 or 10A result for the more advanced senior maths subjects, because they assume fluent algebra. Requirements differ between schools, so check before subject selection.",
  },
  {
    q: "Which senior maths subject should my child choose?",
    a: "It depends on their strengths, interests and any prerequisites for courses they are considering. In Victoria, the VCE maths subjects are Foundation Mathematics, General Mathematics, Mathematical Methods and Specialist Mathematics, and Specialist is normally taken together with Methods. Talk with the maths teacher and the careers adviser at school.",
  },
  {
    q: "How can my child catch up if they are behind in Year 10 maths?",
    a: "Start with algebra, because it underpins most other topics. Work through the questions they get wrong one at a time, with a worked solution, then practise similar questions until they are reliable. Steady weekly practice usually works better than a big catch-up push.",
  },
  {
    q: "How does Tuterly help with Year 10 maths?",
    a: "Your child photographs a question they got wrong, such as a quadratic, a simultaneous equation or an elevation problem. Tuterly saves it with a worked solution and gives a similar question to try. Before exams, Topic check sets a short test on any Year 10 topic, and Fix my mistakes drills every question still to fix. It covers Years 7 to 10 maths and is designed by Australian educators.",
  },
];

const LEARN = [
  { href: "/learn/year-10-maths-guide-victorian-parents", label: "How to help your child with Year 10 maths", note: "(a longer read for Victorian parents)" },
  { href: "/learn/vce-general-maths-vs-methods", label: "VCE General Maths vs Methods: how to choose" },
  { href: "/learn/vce-subject-selection-guide-year-10-parents-victoria", label: "VCE subject selection: a guide for Year 10 parents" },
];

const MORE = [
  { href: "/worksheets", label: "Free maths worksheets, Years 7 to 10" },
  { href: "/formula-sheets/year-10-maths", label: "Year 10 maths formula sheet" },
  { href: "/formula-sheets/year-10a-maths", label: "Year 10A maths formula sheet" },
  { href: "/maths-exam-preparation/year-10", label: "Year 10 maths exam preparation" },
];

export default function Page() {
  return (
    <HubShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      year={10}
      h1="Year 10 maths and 10A: a guide for parents"
      lead="Year 10 is the last year of the common maths course before students choose senior maths subjects. Quadratics, simultaneous equations and exponentials take centre stage, and some schools offer 10A content for students aiming at advanced senior maths. Here is what is covered, where marks go, and how to help."
      facts={[
        ["Big new ideas", "Quadratics, simultaneous equations"],
        ["Most common slip", "Signs when factorising"],
        ["Optional extension", "10A or an advanced class"],
        ["Leads to", "Senior maths subject choices"],
      ]}
      topicsIntro="Year 10 combines everything from Years 7 to 9 into longer, multi-step problems. This list follows the Victorian Curriculum 2.0 Level 10, which adds a few topics to the Australian Curriculum v9 Year 10: in AC v9, gradients of parallel and perpendicular lines are a Year 9 topic, algebraic fractions are optional extension content, and inverse proportion is not listed. Each box links to free Year 10 worksheets for that topic."
      strands={STRANDS}
      mistakesIntro="In Year 10, most lost marks come from small algebra slips inside otherwise correct working. Catching them early is the easiest way to lift results."
      mistakes={MISTAKES}
      parentsIntro="In Year 10, most of the help that matters is planning: when exams fall, what each senior maths subject expects, and which algebra slips keep costing marks. None of it needs you to factorise a quadratic."
      parentTips={PARENT_TIPS}
      appIntro="With exams and subject selection ahead, Year 10 is a good time to stop repeating the same mistakes. Tuterly keeps a record of every one and turns it into practice."
      appSteps={APP_STEPS}
      learnLinks={LEARN}
      moreLinks={MORE}
      faqs={FAQS}
      ctaTitle="Clean up Year 10 algebra before exams"
      ctaText="Snap the factorising, simultaneous equation or trig question your child got wrong. Tuterly saves it with a worked solution, and Topic check sets a short test on any Year 10 topic."
      finalText="Each Year 10 mistake your child snaps becomes a worked solution in their bank. Fix my mistakes drills every one still to fix, and the weekly review is a short test of up to 8 of that week’s questions, trickiest first."
    >
      <section className="tb-section" aria-labelledby="h-10a-topics">
        <div className="tb-wrap">
          <h2 id="h-10a-topics" className="tb-h2 ym-h2">Optional 10A topics</h2>
          <p className="ym-intro">
            10A is optional extension content in the Victorian Curriculum 2.0 (Level 10A), and this list follows it. The Australian Curriculum v9 has a shorter list of optional content for students heading to senior maths: surds, logarithms, completing the square and the quadratic formula, graphs of sine and cosine, circle theorems, standard deviation and counting. Polynomials, the sine and cosine rules, and pyramids, cones and spheres are in Victoria&rsquo;s 10A but not in that list. 10A is usually taught to students heading for Mathematical Methods or Specialist Mathematics, and many schools teach only part of it. Each box links to free 10A worksheets.
          </p>
          <div className="ym-strands">
            {STRANDS_10A.map((s) => (
              <div key={s.name} className="ym-box">
                <h3>{s.name}</h3>
                <ul>
                  {s.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
                {s.links?.length > 0 && (
                  <p className="ym-box__links">
                    {s.links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-10a">
        <div className="tb-wrap">
          <h2 id="h-10a" className="tb-h2 ym-h2">Year 10, 10A and senior maths pathways</h2>
          <div className="ym-table">
            <table>
              <caption>A general picture only: every school structures this differently</caption>
              <thead>
                <tr><th scope="col">Course</th><th scope="col">Who it suits</th><th scope="col">What to focus on</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row">Year 10 mainstream</th><td>All students, including those heading for general senior maths</td><td>Secure linear algebra, quadratics, trigonometry, statistics and financial maths</td></tr>
                <tr><th scope="row">10A or advanced</th><td>Students considering the more advanced senior maths subjects</td><td>Algebra speed and accuracy, plus extension topics such as surds, polynomials and harder factorising</td></tr>
                <tr><th scope="row">Any course</th><td>Every student</td><td>Reviewing mistakes regularly, and practising under timed conditions before exams</td></tr>
              </tbody>
            </table>
          </div>
          <div className="ym-prose" style={{ marginTop: 18 }}>
            <p>
              A strong Year 10 helps, but it does not lock in a pathway. Requirements for senior subjects are set by each school, so check with your child&rsquo;s maths teacher. For more on the choice itself, read <Link href="/learn/vce-general-maths-vs-methods">VCE General Maths vs Methods</Link>.
            </p>
          </div>
        </div>
      </section>
    </HubShell>
  );
}

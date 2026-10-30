import Link from "next/link";
import HubShell from "@/components/years-maths-hubs/HubShell";
import { pageMetadata } from "@/lib/years-maths-hubs";

const PATH = "/years/year-7-maths";
const TITLE = "Year 7 Maths: Australian Curriculum Guide for Parents | Tuterly";
const DESCRIPTION =
  "What Year 7 maths covers under the Australian Curriculum, where students lose marks in their first year of secondary school, and practical ways parents can help at home.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const W = (slug, label) => ({ href: `/worksheets/${slug}`, label });

const STRANDS = [
  {
    name: "Number",
    summary: "Consolidating primary number skills, then extending them to negatives and powers.",
    items: [
      "Integers: ordering, adding and subtracting negative numbers on a number line",
      "Primes, factors, multiples and writing numbers as a product of prime factors",
      "Square numbers, square roots and index notation such as 2⁵",
      "Adding, subtracting, multiplying and dividing fractions and decimals",
      "Percentages of quantities, and converting between fractions, decimals and percentages",
      "Rounding, estimating and checking whether an answer is sensible",
      "Ratios, simple rates and best-buy problems",
    ],
    links: [
      W("year-7-integers", "Integers"),
      W("year-7-prime-factors", "Prime factors"),
      W("year-7-square-roots", "Square roots"),
      W("year-7-fraction-operations", "Fraction operations"),
      W("year-7-fractions-decimals", "Fractions and decimals"),
      W("year-7-percentages", "Percentages"),
      W("year-7-ratios", "Ratios"),
      W("year-7-rounding-estimation", "Rounding"),
    ],
  },
  {
    name: "Algebra",
    summary: "The big new idea of Year 7: letters standing for numbers.",
    items: [
      "Using variables to write expressions and simple formulas",
      "Substituting values into expressions",
      "Simplifying by collecting like terms",
      "Solving one-step and two-step linear equations",
      "Tables of values and plotting points on the Cartesian plane",
      "Recognising and describing simple linear patterns",
    ],
    links: [
      W("year-7-expressions", "Expressions"),
      W("year-7-algebra", "Algebra"),
      W("year-7-linear-equations", "Linear equations"),
      W("year-7-tables-of-values", "Tables of values"),
    ],
  },
  {
    name: "Measurement",
    summary: "Formulas replace counting squares.",
    items: [
      "Area of rectangles, triangles and parallelograms using formulas",
      "Perimeter of composite shapes",
      "Volume of rectangular prisms",
      "Parts of a circle and an introduction to pi",
      "Converting between metric units",
    ],
    links: [
      W("year-7-area-perimeter", "Area and perimeter"),
      W("year-7-volume", "Volume"),
      W("year-7-circles", "Circles"),
    ],
  },
  {
    name: "Space",
    summary: "Angle reasoning and shapes, with reasons given for each step.",
    items: [
      "Angles on a straight line, at a point and vertically opposite",
      "Angles formed by parallel lines and a transversal",
      "Angle sum of a triangle and of a quadrilateral",
      "Classifying triangles and quadrilaterals by their properties",
      "Translations, reflections and rotations on the Cartesian plane",
    ],
    links: [
      W("year-7-angles", "Angles"),
      W("year-7-angles-in-triangles", "Angles in triangles"),
      W("year-7-geometry", "Geometry"),
      W("year-7-transformations", "Transformations"),
    ],
  },
  {
    name: "Statistics",
    summary: "Collecting, displaying and summarising data.",
    items: [
      "Mean, median, mode and range",
      "Dot plots and stem-and-leaf plots",
      "Choosing a suitable display for a data set",
      "Describing what a data set shows in words",
    ],
    links: [
      W("year-7-statistics", "Statistics"),
      W("year-7-dot-plots-stem-and-leaf", "Dot plots and stem-and-leaf"),
    ],
  },
  {
    name: "Probability",
    summary: "Chance described with numbers.",
    items: [
      "Listing the sample space for simple experiments",
      "Probabilities as fractions, decimals and percentages from 0 to 1",
      "Comparing what you expect with what happens in an experiment",
    ],
    links: [W("year-7-probability", "Probability")],
  },
];

const MISTAKES = [
  {
    title: "Negative number signs",
    text: "Subtracting a negative, or adding a negative to a positive, is the most common Year 7 slip. Students often know the rule but apply it to the wrong step.",
    eg: "Example: 5 − (−3) is 8, not 2.",
    link: W("year-7-integers", "Year 7 integers worksheet"),
  },
  {
    title: "Fractions with different denominators",
    text: "Adding the tops and the bottoms (1/2 + 1/3 = 2/5) shows up again in Year 7, especially under time pressure. Dividing by a fraction is the other weak spot.",
    link: W("year-7-fraction-operations", "Year 7 fraction operations worksheet"),
  },
  {
    title: "Treating algebra as a code to memorise",
    text: "Students who learn steps without understanding what a variable is struggle when a question looks slightly different. A common sign is writing 3x + 2 = 5x.",
    link: W("year-7-expressions", "Year 7 expressions worksheet"),
  },
  {
    title: "Not showing working",
    text: "Primary school often rewards the answer. Secondary maths gives marks for method, and teachers cannot award them if the working is missing or jumbled.",
  },
  {
    title: "Angle answers without reasons",
    text: "Many Year 7 geometry questions ask for a reason, such as “angles on a straight line add to 180°”. A correct number with no reason can lose marks.",
    link: W("year-7-angles", "Year 7 angles worksheet"),
  },
  {
    title: "Units and area versus perimeter",
    text: "Mixing up area and perimeter, or writing cm instead of cm², is an easy mark to lose on tests.",
    link: W("year-7-area-perimeter", "Year 7 area and perimeter worksheet"),
  },
];

const PARENT_TIPS = [
  { title: "Ask about the method, not just the answer.", text: "“How did you get that?” is more useful than “Is it right?” Explaining a step out loud is how students notice their own gaps." },
  { title: "Keep a regular, short homework slot.", text: "Secondary school brings more subjects and more homework. Twenty focused minutes at the same time each day is easier to keep than a long weekend session." },
  { title: "Practise times tables and fraction basics quietly.", text: "Quick recall frees up working memory for algebra. A few minutes in the car or at breakfast is enough." },
  { title: "Treat wrong answers as useful.", text: "A marked test with mistakes is the best study guide your child will get. Go through the wrong questions together rather than filing the test away." },
  { title: "Watch the first few weeks of algebra closely.", text: "If equations are confusing in Term 1 or 2, address it then. Year 8 algebra assumes Year 7 algebra is secure." },
  { title: "Talk to the teacher early.", text: "If your child seems lost or anxious about maths, a short email to their maths teacher in the first term is often the fastest fix." },
];

const APP_STEPS = [
  { title: "Snap the question they got wrong", text: "From homework, a class worksheet or a marked test. It is saved with a step-by-step worked solution." },
  { title: "Practise a fresh version", text: "Tuterly gives a new question on the same skill, such as another negative number subtraction, so practice targets the real gap." },
  { title: "Keep going until it is mastered", text: "Questions come back until your child gets them right, so mistakes from Term 1 do not resurface on the end-of-year test." },
  { title: "Build a practice test before assessments", text: "Before a topic test, Tuterly builds a practice test from your child’s own mistakes in that topic." },
];

const FAQS = [
  {
    q: "Is Year 7 maths much harder than Year 6?",
    a: "The content steps up gradually, but the way it is taught changes a lot. There are new teachers, faster pacing, more written working and more formal tests. Many students find the adjustment harder than the maths itself, especially algebra and negative numbers.",
  },
  {
    q: "What should my child know before starting Year 7 maths?",
    a: "Secure times tables, confident place value and decimals, and the basics of fractions (equivalent fractions and simplifying) make the biggest difference. If any of these are shaky, short regular practice before and during Term 1 helps.",
  },
  {
    q: "How much maths homework is normal in Year 7?",
    a: "It varies by school. Many set a few short tasks a week. If homework regularly takes much longer than the teacher expects, it is worth mentioning to them, as it can be a sign of a gap from earlier years.",
  },
  {
    q: "My child got good marks in primary school but is struggling now. Why?",
    a: "This is common. Primary tests often reward quick, correct answers, while secondary tests reward written method and multi-step reasoning. Working through the questions they get wrong, one skill at a time, usually closes the gap.",
  },
  {
    q: "Does Year 7 maths count for anything?",
    a: "Year 7 results are not used for university entry, but the skills are. Year 8 and Year 9 build directly on Year 7 integers, fractions and algebra. Year 7 students in most schools also sit NAPLAN Numeracy.",
  },
  {
    q: "How does Tuterly help a Year 7 student?",
    a: "Your child photographs the maths questions they get wrong. Tuterly saves each one with a worked solution, gives fresh practice on the same skill, and builds practice tests from their own mistakes before assessments. It covers Years 7 to 10 maths and is designed by Australian educators.",
  },
];

const LEARN = [
  { href: "/learn/year-7-maths-guide-victorian-parents", label: "How to help your child with Year 7 maths", note: "(a longer read for Victorian parents)" },
  { href: "/learn/year-7-maths-transition-preparation-victorian-parents", label: "Preparing for the Year 7 maths transition" },
  { href: "/learn/maths-anxiety-help-children-victoria", label: "Helping a child with maths anxiety" },
];

const MORE = [
  { href: "/worksheets", label: "Free maths worksheets, Years 7 to 10" },
  { href: "/formula-sheets/year-7-maths", label: "Year 7 maths formula sheet" },
  { href: "/maths-exam-preparation/year-7", label: "Year 7 maths exam preparation" },
  { href: "/naplan/year-7-numeracy", label: "Year 7 NAPLAN Numeracy practice" },
];

export default function Page() {
  return (
    <HubShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      year={7}
      h1="Year 7 maths: a guide for parents"
      lead="Year 7 is the first year of secondary maths. The content builds on primary school, but algebra arrives, working out has to be shown, and tests become more formal. Here is what your child will study, where marks usually slip, and how to help without needing to reteach the maths yourself."
      facts={[
        ["Big new idea", "Algebra and equations"],
        ["Most common slip", "Negative numbers and fractions"],
        ["Assessments", "Topic tests, tasks and NAPLAN"],
        ["Sets up", "Year 8 algebra and geometry"],
      ]}
      topicsIntro="Year 7 maths is organised into six strands. Most schools teach them as units across the year, so your child may finish fractions in Term 1 and not see them again until a later test. Each box links to free worksheets for that topic."
      strands={STRANDS}
      mistakesIntro="These come up again and again when Year 7 tests are marked. Most are not about ability: they are habits that can be fixed with targeted practice."
      mistakes={MISTAKES}
      parentTips={PARENT_TIPS}
      appIntro="The fastest way to improve marks is to fix the exact questions your child gets wrong, then check the fix has stuck. Tuterly is built around that loop."
      appSteps={APP_STEPS}
      learnLinks={LEARN}
      moreLinks={MORE}
      faqs={FAQS}
    >
      <section className="tb-section" aria-labelledby="h-transition">
        <div className="tb-wrap">
          <h2 id="h-transition" className="tb-h2 ym-h2">What changes from primary to secondary maths</h2>
          <div className="ym-table">
            <table>
              <caption>Common differences families notice in Year 7</caption>
              <thead>
                <tr><th scope="col">Area</th><th scope="col">Primary school</th><th scope="col">Year 7</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row">Teacher</th><td>One classroom teacher for most subjects</td><td>A specialist maths teacher, often several lessons a week</td></tr>
                <tr><th scope="row">Working out</th><td>Often optional if the answer is right</td><td>Expected, and usually worth marks</td></tr>
                <tr><th scope="row">Pace</th><td>Topics revisited often</td><td>Units move on, then reappear on end-of-term tests</td></tr>
                <tr><th scope="row">Content</th><td>Mostly number</td><td>Algebra, negative numbers and angle reasoning arrive</td></tr>
                <tr><th scope="row">Assessment</th><td>Ongoing observation</td><td>Topic tests, assignments and NAPLAN Numeracy</td></tr>
              </tbody>
            </table>
          </div>
          <div className="ym-prose" style={{ marginTop: 18 }}>
            <p>
              If your child is also preparing for a Year 7 entry scholarship test, that is a different kind of preparation focused on reasoning and test technique. The <Link href="/scholarship/year-7-entry-guide">Year 7 entry scholarship guide</Link> covers it.
            </p>
          </div>
        </div>
      </section>
    </HubShell>
  );
}

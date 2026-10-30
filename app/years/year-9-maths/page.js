import Link from "next/link";
import HubShell from "@/components/years-maths-hubs/HubShell";
import { pageMetadata } from "@/lib/years-maths-hubs";

const PATH = "/years/year-9-maths";
const TITLE = "Year 9 Maths: Australian Curriculum Guide for Parents | Tuterly";
const DESCRIPTION =
  "Year 9 maths explained for parents: index laws, quadratics, trigonometry, coordinate geometry and probability, the mistakes that cost marks, and how to help before Year 10 and NAPLAN.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const W = (slug, label) => ({ href: `/worksheets/${slug}`, label });

const STRANDS = [
  {
    name: "Number",
    summary: "Very large and very small numbers, and money over time.",
    items: [
      "Index laws, including zero and negative powers",
      "Scientific notation for very large and very small numbers",
      "Simple interest and other financial calculations",
      "Real numbers, including an introduction to surds in some schools",
    ],
    links: [
      W("year-9-exponent-laws", "Exponent laws"),
      W("year-9-scientific-notation", "Scientific notation"),
      W("year-9-simple-interest", "Simple interest"),
    ],
  },
  {
    name: "Algebra",
    summary: "From straight lines to curves.",
    items: [
      "Expanding binomial products such as (x + 3)(x − 2)",
      "Factorising, including simple (monic) quadratics",
      "Solving linear equations and rearranging formulas",
      "Gradient, intercepts and the equation of a straight line",
      "Distance and midpoint between two points",
      "Graphing simple quadratics and other non-linear relationships",
      "Direct proportion",
    ],
    links: [
      W("year-9-algebra", "Algebra"),
      W("year-9-quadratics", "Quadratics"),
      W("year-9-linear-equations", "Linear equations"),
      W("year-9-coordinate-geometry", "Coordinate geometry"),
      W("year-9-direct-proportion", "Direct proportion"),
    ],
  },
  {
    name: "Measurement",
    summary: "Three-dimensional problems and precision.",
    items: [
      "Surface area and volume of prisms and cylinders",
      "Pythagoras’ theorem in more complex problems",
      "Right-angled trigonometry: sine, cosine and tangent",
      "Measurement error, accuracy and very small or large units",
    ],
    links: [
      W("year-9-surface-area-volume", "Surface area and volume"),
      W("year-9-pythagoras", "Pythagoras"),
      W("year-9-trigonometry", "Trigonometry"),
      W("year-9-measurement-error", "Measurement error"),
    ],
  },
  {
    name: "Space",
    summary: "Scale and similarity.",
    items: [
      "Enlargements and scale factors",
      "Similar triangles and finding unknown sides",
      "Geometric reasoning with reasons for each step",
    ],
    links: [W("year-9-enlargements", "Enlargements")],
  },
  {
    name: "Statistics",
    summary: "Comparing groups, not just describing one.",
    items: [
      "Histograms and back-to-back stem-and-leaf plots",
      "Describing shape: symmetric and skewed data",
      "Comparing two data sets using centre and spread",
      "Questioning how data was collected",
    ],
    links: [
      W("year-9-statistics", "Statistics"),
      W("year-9-comparing-data", "Comparing data"),
    ],
  },
  {
    name: "Probability",
    summary: "Two steps at a time.",
    items: [
      "Two-step experiments with tree diagrams and tables",
      "With and without replacement",
      "Venn diagrams and two-way tables for “and” and “or”",
    ],
    links: [
      W("year-9-probability", "Probability"),
      W("year-9-venn-diagrams-probability", "Venn diagrams"),
    ],
  },
];

const MISTAKES = [
  {
    title: "Index laws applied the wrong way",
    text: "Multiplying the powers when they should be added, or thinking a negative power gives a negative number, are the most common Year 9 index errors.",
    eg: "Example: x³ × x⁴ = x⁷, and 2⁻¹ = 1/2, not −2.",
    link: W("year-9-exponent-laws", "Year 9 exponent laws worksheet"),
  },
  {
    title: "Missing the middle term when expanding",
    text: "Writing (x + 3)² as x² + 9 leaves out the 6x. It is one of the most common errors in all of secondary algebra.",
    link: W("year-9-algebra", "Year 9 algebra worksheet"),
  },
  {
    title: "Choosing the wrong trig ratio",
    text: "Students can use a calculator but pick sine when they need cosine. Labelling opposite, adjacent and hypotenuse from the given angle before writing anything prevents most of these.",
    link: W("year-9-trigonometry", "Year 9 trigonometry worksheet"),
  },
  {
    title: "Calculator in the wrong mode",
    text: "Trig answers that come out strange often mean the calculator is in radians. It is worth checking it shows DEG before every test.",
  },
  {
    title: "Gradient upside down",
    text: "Gradient is rise over run. Swapping them, or getting the sign wrong for a line going down, costs marks in coordinate geometry.",
    link: W("year-9-coordinate-geometry", "Year 9 coordinate geometry worksheet"),
  },
  {
    title: "Probability without replacement",
    text: "Forgetting that the total changes after the first pick is the usual error in two-step probability questions.",
    link: W("year-9-probability", "Year 9 probability worksheet"),
  },
];

const PARENT_TIPS = [
  { title: "Expect some disengagement, and plan around it.", text: "Year 9 is a known dip for motivation in many schools. A predictable weekly routine matters more than how long each session is." },
  { title: "Find out how maths is streamed.", text: "Many schools use Year 9 results to place students into Year 10 classes, including any 10A or advanced group. Ask the school how and when this happens." },
  { title: "Check the calculator.", text: "Make sure your child has the calculator the school requires and knows how to use it, including degree mode and the power and fraction keys." },
  { title: "Focus revision on algebra and index laws.", text: "These two topics show up inside almost every other Year 9 topic. Strengthening them lifts marks across the board." },
  { title: "Keep a list of repeated mistakes.", text: "If the same type of question goes wrong on two tests, that is the topic to work on next, not the one that feels hardest." },
  { title: "Connect it to future choices.", text: "Without adding pressure, it helps students to know that Year 9 and Year 10 algebra prepares them for Years 11 and 12 maths options." },
];

const APP_STEPS = [
  { title: "Snap the question they got wrong", text: "An index law question, a trig problem or a probability tree. It is saved with a step-by-step worked solution." },
  { title: "Practise a fresh version", text: "Tuterly gives a new question on the same skill, so your child practises the exact step that went wrong." },
  { title: "Master it, then move on", text: "Questions return until they are right, so a Term 1 index law mistake does not reappear in the end-of-year exam." },
  { title: "Practice tests before assessments", text: "Before a topic test or exam, Tuterly builds a practice test from your child’s own mistakes." },
];

const FAQS = [
  {
    q: "What are the hardest topics in Year 9 maths?",
    a: "Many students find index laws, expanding and factorising quadratics, and trigonometry the hardest, because they introduce new rules that are easy to mix up. Probability without replacement is another common sticking point.",
  },
  {
    q: "Do Year 9 maths results affect VCE or senior subject choices?",
    a: "Year 9 results do not count towards an ATAR. However, many schools use Year 9 and Year 10 results to decide which maths class a student joins next year, which can affect access to the more advanced senior maths subjects. Each school is different, so ask yours.",
  },
  {
    q: "Is NAPLAN in Year 9?",
    a: "Yes. Year 9 is the last year of NAPLAN, which includes a Numeracy test. It is a snapshot of skills rather than a test you need to cram for, but familiarity with the question style helps.",
  },
  {
    q: "My child says they will never use Year 9 maths. How do I respond?",
    a: "It is a fair question. Some topics, like percentages and interest, are used every day. Others, like algebra, are mostly about keeping options open, because many courses and careers require senior maths, and senior maths requires Year 9 algebra.",
  },
  {
    q: "How can I help if I do not remember Year 9 maths?",
    a: "You do not need to. Ask your child to explain their method, check homework is done consistently, and help them review marked tests. Worked solutions, from the textbook or an app, can do the explaining for you.",
  },
  {
    q: "How does Tuterly help with Year 9 maths?",
    a: "Your child photographs a question they got wrong. Tuterly saves it with a worked solution, generates new questions on the same concept, and builds practice tests from their mistakes before assessments. It covers Years 7 to 10 maths and is designed by Australian educators.",
  },
];

const LEARN = [
  { href: "/learn/year-9-maths-guide-victorian-parents", label: "How to help your child with Year 9 maths", note: "(a longer read for Victorian parents)" },
  { href: "/learn/year-9-index-laws-mistakes-victorian-maths", label: "Year 9 index laws: the mistakes to watch for" },
  { href: "/learn/year-9-maths-decides-vce-options", label: "How Year 9 maths shapes VCE options" },
];

const MORE = [
  { href: "/worksheets", label: "Free maths worksheets, Years 7 to 10" },
  { href: "/formula-sheets/year-9-maths", label: "Year 9 maths formula sheet" },
  { href: "/maths-exam-preparation/year-9", label: "Year 9 maths exam preparation" },
  { href: "/naplan/year-9-numeracy", label: "Year 9 NAPLAN Numeracy practice" },
];

export default function Page() {
  return (
    <HubShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      year={9}
      h1="Year 9 maths: a guide for parents"
      lead="Year 9 maths moves from straight lines to curves. Index laws, quadratics and trigonometry arrive, and results often help decide which Year 10 maths class your child joins. Here is what is covered, where marks go, and how to keep your child engaged through a year that many find hard to stay motivated in."
      facts={[
        ["Big new ideas", "Index laws, quadratics, trig"],
        ["Most common slip", "Mixing up index laws"],
        ["Also this year", "NAPLAN Numeracy"],
        ["Sets up", "Year 10 and 10A pathways"],
      ]}
      topicsIntro="Year 9 uses every algebra skill from Years 7 and 8. Each box links to free Year 9 worksheets for that topic."
      strands={STRANDS}
      mistakesIntro="Most Year 9 errors come from new rules that look similar to old ones. They are very fixable with targeted practice."
      mistakes={MISTAKES}
      parentTips={PARENT_TIPS}
      appIntro="In Year 9, the same small error (an index law, a missing middle term) can cost marks across several topics. Tuterly helps your child find and fix those patterns."
      appSteps={APP_STEPS}
      learnLinks={LEARN}
      moreLinks={MORE}
      faqs={FAQS}
    >
      <section className="tb-section" aria-labelledby="h-path">
        <div className="tb-wrap">
          <h2 id="h-path" className="tb-h2 ym-h2">Why Year 9 matters for what comes next</h2>
          <div className="ym-prose">
            <p>
              Year 9 is the first year where maths results commonly have a practical consequence. Many schools use Year 9 assessments, alongside teacher judgement, to place students into Year 10 classes. Some offer a 10A or advanced class that covers extra algebra in preparation for the harder senior maths subjects.
            </p>
            <ul>
              <li><strong>Algebra fluency</strong> is usually the deciding skill for advanced classes.</li>
              <li><strong>Consistency</strong> across topic tests often matters more than one strong exam.</li>
              <li><strong>Gaps are easier to close now</strong> than in Year 10, when the pace picks up.</li>
            </ul>
            <p>
              See what comes next on the <Link href="/years/year-10-maths">Year 10 maths and 10A guide</Link>.
            </p>
          </div>
        </div>
      </section>
    </HubShell>
  );
}

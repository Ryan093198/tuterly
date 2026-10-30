import HubShell from "@/components/years-maths-hubs/HubShell";
import { pageMetadata } from "@/lib/years-maths-hubs";

const PATH = "/years/year-8-maths";
const TITLE = "Year 8 Maths: Australian Curriculum Guide for Parents | Tuterly";
const DESCRIPTION =
  "A parent guide to Year 8 maths in Australia: algebra, Pythagoras, circles, rates and probability, the mistakes that cost marks, and how to help your child stay on track.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const W = (slug, label) => ({ href: `/worksheets/${slug}`, label });

const STRANDS = [
  {
    name: "Number",
    summary: "Fluency with all four operations on integers, plus new number types.",
    items: [
      "Multiplying and dividing integers, and order of operations with negatives",
      "Terminating and recurring decimals, and an introduction to irrational numbers",
      "Index laws with positive whole-number powers",
      "Percentage increase and decrease, profit, loss and discounts",
      "Rates and ratios in real contexts such as speed, cost per unit and recipes",
    ],
    links: [
      W("year-8-integer-operations", "Integer operations"),
      W("year-8-recurring-decimals", "Recurring decimals"),
      W("year-8-exponents", "Exponents"),
      W("year-8-percentages", "Percentages"),
      W("year-8-profit-and-loss", "Profit and loss"),
      W("year-8-rates", "Rates"),
    ],
  },
  {
    name: "Algebra",
    summary: "The centre of Year 8. Most later maths depends on it.",
    items: [
      "Expanding brackets using the distributive law",
      "Factorising by taking out a common factor",
      "Solving linear equations with brackets and pronumerals on both sides",
      "Writing equations from worded problems",
      "Plotting linear relationships and reading solutions from graphs",
    ],
    links: [
      W("year-8-algebra", "Algebra"),
      W("year-8-linear-equations", "Linear equations"),
      W("year-8-linear-problems", "Linear problems"),
    ],
  },
  {
    name: "Measurement",
    summary: "New formulas, and the first appearance of Pythagoras.",
    items: [
      "Pythagoras’ theorem to find a side of a right-angled triangle",
      "Circumference and area of circles",
      "Area of trapeziums, rhombuses and kites, and composite shapes",
      "Volume of prisms",
      "Time, 24-hour time and time zones",
      "Speed, distance and time",
    ],
    links: [
      W("year-8-pythagoras", "Pythagoras"),
      W("year-8-circles", "Circles"),
      W("year-8-area-perimeter", "Area and perimeter"),
      W("year-8-volume", "Volume"),
      W("year-8-time-zones", "Time zones"),
      W("year-8-speed-distance-time", "Speed, distance, time"),
    ],
  },
  {
    name: "Space",
    summary: "From finding angles to proving shapes match.",
    items: [
      "Congruent figures and the tests for congruent triangles",
      "Properties of quadrilaterals and using them to find unknowns",
      "Similar figures and scale",
    ],
    links: [
      W("year-8-congruence-similarity", "Congruence and similarity"),
      W("year-8-quadrilaterals", "Quadrilaterals"),
    ],
  },
  {
    name: "Statistics",
    summary: "Thinking about where data comes from.",
    items: [
      "Samples and populations, and why samples vary",
      "How outliers affect the mean and median",
      "Choosing and interpreting data displays",
    ],
    links: [W("year-8-statistics", "Statistics")],
  },
  {
    name: "Probability",
    summary: "Events that overlap, or that cannot both happen.",
    items: [
      "Complementary events (the probability something does not happen)",
      "Two-way tables and Venn diagrams",
      "Mutually exclusive events and the words “and”, “or” and “not”",
    ],
    links: [
      W("year-8-probability", "Probability"),
      W("year-8-complementary-events", "Complementary events"),
    ],
  },
];

const MISTAKES = [
  {
    title: "Expanding only the first term",
    text: "Writing 3(x + 4) as 3x + 4 is the classic Year 8 error. It then breaks every equation that contains brackets.",
    eg: "Example: 3(x + 4) = 3x + 12.",
    link: W("year-8-algebra", "Year 8 algebra worksheet"),
  },
  {
    title: "Losing a negative when solving",
    text: "Moving a term to the other side and forgetting to change its sign, or dropping a negative when dividing, accounts for many wrong equation answers.",
    link: W("year-8-linear-equations", "Year 8 linear equations worksheet"),
  },
  {
    title: "Using Pythagoras on the wrong side",
    text: "Students learn a² + b² = c² but add when they should subtract to find a shorter side. Labelling the hypotenuse first fixes most of this.",
    link: W("year-8-pythagoras", "Year 8 Pythagoras worksheet"),
  },
  {
    title: "Radius and diameter mix-ups",
    text: "Using the diameter in the area formula, or mixing up circumference and area, is common when both formulas are new.",
    link: W("year-8-circles", "Year 8 circles worksheet"),
  },
  {
    title: "Percentage change from the wrong amount",
    text: "Percentage increase and decrease are always worked out from the original amount. Students often divide by the new amount instead.",
    link: W("year-8-percentages", "Year 8 percentages worksheet"),
  },
  {
    title: "Worded problems left blank",
    text: "When a question is written as a story, some students do not know where to start. Turning words into an equation is a skill that needs its own practice.",
    link: W("year-8-linear-problems", "Year 8 linear problems worksheet"),
  },
];

const PARENT_TIPS = [
  { title: "Keep an eye on algebra in particular.", text: "If expanding brackets and solving equations are not secure by the end of Year 8, Year 9 gets much harder. Ask to see a recent algebra test." },
  { title: "Do not let motivation dip unnoticed.", text: "Year 8 often feels like a quieter year. Short, regular practice keeps skills ticking over even when school feels less urgent." },
  { title: "Ask your child to teach you one thing.", text: "Explaining how to expand a bracket or find a hypotenuse shows quickly whether they understand it or are following steps." },
  { title: "Use real-world maths.", text: "Discounts while shopping, speed and travel time on a trip, and time zones for overseas calls all match Year 8 content." },
  { title: "Go back over marked tests.", text: "The questions your child got wrong are a ready-made revision list. Rework them a week later without looking at the answers." },
  { title: "Check calculator habits.", text: "Students should know when a calculator is allowed and still be able to estimate whether an answer makes sense." },
];

const APP_STEPS = [
  { title: "Snap the question they got wrong", text: "A Pythagoras question from homework or an equation from a test. It is saved with a step-by-step worked solution." },
  { title: "Practise a fresh version", text: "Tuterly gives a new question on the same skill, so your child practises the step that went wrong rather than redoing the whole worksheet." },
  { title: "Track it by topic", text: "Mistakes are organised by topic, so you can both see whether algebra or measurement needs the most work." },
  { title: "Practice tests before assessments", text: "Before a topic test, Tuterly builds a practice test from your child’s own mistakes in that topic." },
];

const FAQS = [
  {
    q: "Why does Year 8 maths matter so much?",
    a: "Year 8 is where algebra becomes the main tool for solving problems. Year 9 and Year 10 topics like quadratics, linear graphs and trigonometry all assume your child can expand, factorise and solve equations confidently.",
  },
  {
    q: "My child did well in Year 7 but is struggling in Year 8. Is that normal?",
    a: "It is common. Year 7 algebra is often simple enough to guess, while Year 8 equations have brackets and pronumerals on both sides. A gap that did not matter before starts to show. Practising the exact questions they get wrong usually helps quickly.",
  },
  {
    q: "Is Pythagoras taught in Year 8 or Year 9?",
    a: "Under the Australian Curriculum v9 and the Victorian Curriculum 2.0, Pythagoras’ theorem is introduced in Year 8 and then used again with trigonometry in Year 9. Some schools and states order it differently, so check your school’s course outline.",
  },
  {
    q: "How much revision should a Year 8 student do for a maths test?",
    a: "Several short sessions in the week before a test work better than one long one. The most useful revision is reworking questions they got wrong, then trying similar questions without notes.",
  },
  {
    q: "Should my child do extra maths outside school in Year 8?",
    a: "Not always. If they are keeping up, regular review of class work may be enough. If tests show the same topics going wrong, targeted practice on those topics is more useful than a general workbook.",
  },
  {
    q: "How does Tuterly help with Year 8 maths?",
    a: "Your child photographs a question they got wrong and Tuterly saves it with a worked solution, then gives new questions on the same skill until it is mastered. Before a test it builds a practice test from their own mistakes. It covers Years 7 to 10 maths and is designed by Australian educators.",
  },
];

const LEARN = [
  { href: "/learn/year-8-maths-guide-victorian-parents", label: "How to help your child with Year 8 maths", note: "(a longer read for Victorian parents)" },
  { href: "/learn/year-8-maths-algebra-fundamentals-victoria", label: "Year 8 algebra fundamentals" },
  { href: "/learn/how-to-help-child-with-homework-victorian-parents-years-3-9", label: "How to help with homework without doing it for them" },
];

const MORE = [
  { href: "/worksheets", label: "Free maths worksheets, Years 7 to 10" },
  { href: "/formula-sheets/year-8-maths", label: "Year 8 maths formula sheet" },
  { href: "/maths-exam-preparation/year-8", label: "Year 8 maths exam preparation" },
];

export default function Page() {
  return (
    <HubShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      year={8}
      h1="Year 8 maths: a guide for parents"
      lead="Year 8 is the algebra year. Expanding brackets, solving harder equations and Pythagoras all arrive, and they become the foundation for everything in Years 9 and 10. Here is what your child will study, where marks usually go, and how to help them keep momentum."
      facts={[
        ["Big new ideas", "Expanding, Pythagoras, circles"],
        ["Most common slip", "Brackets and negative signs"],
        ["Watch for", "A mid-year motivation dip"],
        ["Sets up", "Year 9 quadratics and trigonometry"],
      ]}
      topicsIntro="Year 8 goes deeper rather than wider. Many topics have the same names as Year 7, but the questions involve more steps. Each box links to free Year 8 worksheets for that topic."
      strands={STRANDS}
      mistakesIntro="The Year 8 mistakes below are worth fixing now, because each one carries straight into Year 9."
      mistakes={MISTAKES}
      parentTips={PARENT_TIPS}
      appIntro="Year 8 gaps are usually specific: one type of equation, or one formula used the wrong way. Tuterly targets exactly those questions."
      appSteps={APP_STEPS}
      learnLinks={LEARN}
      moreLinks={MORE}
      faqs={FAQS}
    >
      <section className="tb-section" aria-labelledby="h-ahead">
        <div className="tb-wrap">
          <h2 id="h-ahead" className="tb-h2 ym-h2">How Year 8 skills feed into Year 9</h2>
          <div className="ym-table">
            <table>
              <caption>If this Year 8 skill is shaky, this Year 9 topic is usually affected</caption>
              <thead>
                <tr><th scope="col">Year 8 skill</th><th scope="col">Year 9 topic that relies on it</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row">Expanding a single bracket</th><td>Expanding binomials such as (x + 2)(x + 5), and factorising quadratics</td></tr>
                <tr><th scope="row">Solving equations with negatives</th><td>Rearranging formulas and finding gradients and intercepts</td></tr>
                <tr><th scope="row">Index laws</th><td>Index laws with zero and negative powers, and scientific notation</td></tr>
                <tr><th scope="row">Pythagoras&rsquo; theorem</th><td>Trigonometry and the distance between two points</td></tr>
                <tr><th scope="row">Similar figures and scale</th><td>Enlargements and similar triangles</td></tr>
                <tr><th scope="row">Two-way tables and Venn diagrams</th><td>Two-step probability</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </HubShell>
  );
}

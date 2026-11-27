import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import BearingsCalc from "@/components/maths/BearingsCalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a calculator: bearings. Built by the daily page task
// (Nov 2026); not yet read by Ryan, so it's in UNREVIEWED_PATHS
// (lib/reviewed.js). Every example and practice answer was recomputed by
// script before publishing.

const PATH = "/maths/bearings";
const TITLE = "Bearings in Maths: True and Compass Bearings, Back Bearings and Trig (Years 9 and 10) | Tuterly";
const DESCRIPTION =
  "How to read and write bearings: three-figure true bearings, compass bearings like S35°W, back bearings, and bearings problems with trig. Free calculator with working.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is a bearing in maths?", a: "A bearing is a direction given as an angle. A true bearing is measured clockwise from north and written with three figures, so east is 090°, south is 180° and west is 270°. A bearing of 045° points exactly halfway between north and east." },
  { q: "Why are bearings written with three figures?", a: "So there is no confusion about what was meant, especially when bearings are read aloud or written quickly. A bearing of 40° is written 040°, and 7° is written 007°. Bearings from 100° to 359° already have three figures." },
  { q: "How do you find a back bearing?", a: "Add 180° if the bearing is less than 180°, or subtract 180° if it is 180° or more. If B is on a bearing of 065° from A, then A is on a bearing of 245° from B. If the bearing is 310°, the back bearing is 130°." },
  { q: "What is the difference between a true bearing and a compass bearing?", a: "A true bearing is one angle from 000° to 359°, measured clockwise from north. A compass bearing (also called a conventional or quadrant bearing) starts from north or south and turns towards east or west, by at most 90°. N40°E is the same as 040°, and S35°W is the same as 215°." },
  { q: "What does 'the bearing of B from A' mean?", a: "Stand at A, face north, and turn clockwise until you face B. The angle you turned is the bearing of B from A. The word after 'from' tells you where to draw the north line. The bearing of A from B is the back bearing, which differs by 180°." },
  { q: "How do you use trigonometry with bearings?", a: "Draw a north line at the starting point, mark the bearing, then make a right-angled triangle using the north–south and east–west directions. The path is the hypotenuse. Use sine or cosine to find how far east and north someone has gone, or Pythagoras and inverse tan to find a distance and bearing from those movements." },
];

const PRACTICE = [
  { q: R`Write N52°E as a true bearing.`, a: R`It turns $52°$ clockwise from north, so the true bearing is $052°$.` },
  { q: R`Write S48°E as a true bearing.`, a: R`Start at south ($180°$) and turn $48°$ back towards east: $180° - 48° = 132°$.` },
  { q: R`Write the true bearing $290°$ as a compass bearing.`, a: R`$290°$ is between $270°$ and $360°$, so it is west of north by $360° - 290° = 70°$: **N70°W**.` },
  { q: R`The bearing of Q from P is $038°$. What is the bearing of P from Q?`, a: R`$038°$ is less than $180°$, so add: $38° + 180° = 218°$.` },
  { q: R`The bearing of T from S is $255°$. What is the bearing of S from T?`, a: R`$255°$ is more than $180°$, so subtract: $255° - 180° = 075°$.` },
  { q: R`A boat sails $25$ km on a bearing of $060°$. How far east and how far north of its start is it? Give answers to 2 decimal places.`, a: R`East $= 25\sin 60° \approx 21.65$ km. North $= 25\cos 60° = 12.5$ km.` },
  { q: R`A plane flies $300$ km on a bearing of $235°$. How far west and how far south of its start is it, to the nearest kilometre?`, a: R`The angle between the path and the south line is $235° - 180° = 55°$. West $= 300\sin 55° \approx 246$ km. South $= 300\cos 55° \approx 172$ km.` },
  { q: R`A cyclist rides $9$ km east and then $4$ km south. How far is she from her start (2 decimal places), and what is her bearing from the start, to the nearest degree?`, a: R`Distance $= \sqrt{9^2 + 4^2} = \sqrt{97} \approx 9.85$ km. The angle east of south is $\tan^{-1}\left(\frac{9}{4}\right) \approx 66.04°$, so the bearing is $180° - 66.04° \approx 114°$.` },
  { q: R`Town B is $15$ km due north of town A, and town C is $20$ km due east of town B. Find the bearing of C from A and the bearing of A from C, to the nearest degree.`, a: R`From A, C is $20$ km east and $15$ km north. The angle east of north is $\tan^{-1}\left(\frac{20}{15}\right) \approx 53.13°$, so the bearing of C from A is about $053°$. The bearing of A from C is the back bearing, about $233°$. (Also, $AC = \sqrt{15^2 + 20^2} = 25$ km.)` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Bearings", path: PATH }]}
      eyebrow="Maths explained · Years 9 and 10"
      h1="How to use bearings"
      lead="Bearings are how pilots, sailors, orienteers and surveyors give a direction precisely. Instead of “north-east-ish”, a bearing says exactly how far to turn from north. Here’s how to read and write true and compass bearings, find a back bearing, and solve the trigonometry questions where bearings usually turn up in Year 9 and 10 tests, with a calculator that shows every step."
      quickAnswer="A true bearing is the angle measured clockwise from north, written with three figures: north is 000°, east is 090°, south is 180° and west is 270°. To find the bearing of B from A, draw a north line at A and measure clockwise to the line AB. The back bearing (A from B) is 180° more or less: 065° becomes 245°."
      toc={[
        ["what", "What a bearing is"],
        ["compass", "Compass bearings"],
        ["examples", "Worked examples"],
        ["back", "Back bearings"],
        ["calculator", "Calculator"],
        ["trig", "Bearings and trigonometry"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a bearings question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_bearings"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="Bearings: common questions"
      links={[
        { href: "/worksheets/year-10-trigonometry", label: "Year 10 trigonometry worksheets (including bearings)" },
        { href: "/worksheets/year-9-trigonometry", label: "Year 9 trigonometry worksheets" },
        { href: "/maths/sohcahtoa", label: "SOHCAHTOA explained" },
        { href: "/maths/pythagoras-theorem", label: "Pythagoras’ theorem" },
        { href: "/year-10-maths-test", label: "Year 10 maths practice test" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Lost marks on a bearings question?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="what" className="tb-section" aria-labelledby="h-what">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-what" className="tb-h2 pg-h2">What a bearing is</h2>
          <MathMd md={R`A **true bearing** gives a direction as one angle, following three rules:

1. Start facing **north**.
2. Turn **clockwise**.
3. Write the angle with **three figures**, from $000°$ up to $359°$.

So the four main directions are:

| Direction | True bearing |
|---|---|
| North | $000°$ |
| East | $090°$ |
| South | $180°$ |
| West | $270°$ |

North-east is halfway between north and east, so it is $045°$. South-west is halfway between south and west: $225°$.

When a question asks for **the bearing of B from A**, A is where you stand. Draw a small north arrow at A, then measure clockwise from that arrow round to the line from A to B.`} />
        </div>
      </section>

      <section id="compass" className="tb-section" aria-labelledby="h-compass">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-compass" className="tb-h2 pg-h2">Compass bearings (like N40°E)</h2>
          <MathMd md={R`Some questions use **compass bearings**, also called conventional or quadrant bearings. They start from north or south, then turn towards east or west, never by more than $90°$. N40°E means “face north, turn $40°$ towards east”. S35°W means “face south, turn $35°$ towards west”.

To change a compass bearing into a true bearing:

| Compass bearing | True bearing |
|---|---|
| N$\theta$E | $\theta$ |
| S$\theta$E | $180° - \theta$ |
| S$\theta$W | $180° + \theta$ |
| N$\theta$W | $360° - \theta$ |

A quick sketch makes the table unnecessary: mark north, south, east and west, draw the direction, and see how far clockwise from north it is.`} />
        </div>
      </section>

      <section id="examples" className="tb-section" aria-labelledby="h-examples">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-examples" className="tb-h2 pg-h2">Worked examples</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example 1: compass to true</p>
            <MathMd md={R`Write each compass bearing as a true bearing: (a) N35°E (b) S20°E (c) S70°W (d) N15°W.

(a) Clockwise from north already: $035°$.

(b) South is $180°$. Turning towards east goes back towards north, so subtract: $180° - 20° = 160°$.

(c) Turning from south towards west keeps going clockwise, so add: $180° + 70° = 250°$.

(d) $15°$ anticlockwise from north is $360° - 15° = 345°$ clockwise.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example 2: true to compass</p>
            <MathMd md={R`Write $300°$ and $108°$ as compass bearings.

$300°$ is past west ($270°$) and short of north ($360°$). It is $360° - 300° = 60°$ west of north: **N60°W**.

$108°$ is past east ($090°$) and short of south ($180°$). Measure from south: $180° - 108° = 72°$ towards east: **S72°E**.`} />
          </div>
        </div>
      </section>

      <section id="back" className="tb-section" aria-labelledby="h-back">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-back" className="tb-h2 pg-h2">Back bearings</h2>
          <MathMd md={R`If you walk from A to B and then want to walk straight back, you need to face the opposite way: a half turn, $180°$. That direction is the **back bearing**.

- Bearing less than $180°$: **add** $180°$.
- Bearing $180°$ or more: **subtract** $180°$.

Either way the answer stays between $000°$ and $359°$.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example 3</p>
            <MathMd md={R`(a) The bearing of B from A is $065°$. Find the bearing of A from B.

$65° + 180° = 245°$

(b) From a fishing boat, a lighthouse is on a bearing of $310°$. What is the bearing of the boat from the lighthouse?

$310° - 180° = 130°$

Check (b) with a sketch: the lighthouse is north-west of the boat, so the boat must be south-east of the lighthouse, and $130°$ is between east ($090°$) and south ($180°$). ✓`} />
          </div>
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Bearings calculator (with working)</h2>
          <p className="pg-intro">Find a back bearing, convert between compass and true bearings, work out how far east and north a trip goes, or turn an east and north movement into a distance and bearing.</p>
          <BearingsCalc placement="concept_bearings_calc" />
        </div>
      </section>

      <section id="trig" className="tb-section" aria-labelledby="h-trig">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-trig" className="tb-h2 pg-h2">Bearings problems with trigonometry</h2>
          <MathMd md={R`Most Year 9 and 10 bearings questions are right-angled triangle questions in disguise. The method is the same every time:

1. Draw a north line at the starting point.
2. Draw the path at the given bearing.
3. Complete a right-angled triangle with one side north–south and one side east–west. The path is the hypotenuse.
4. Find the angle **inside** the triangle (it is often not the bearing itself), then use SOHCAHTOA or Pythagoras.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example 4: distance and bearing to east and south</p>
            <MathMd md={R`A ship sails $40$ km on a bearing of $130°$. How far east and how far south of its starting point is it? Give answers to 2 decimal places.

$130°$ is between east and south. The angle between the path and the **south** line is $180° - 130° = 50°$. In the right-angled triangle, the south side is adjacent to that $50°$ angle and the east side is opposite it:

$$\text{south} = 40\cos 50° \approx 25.71 \text{ km}$$
$$\text{east} = 40\sin 50° \approx 30.64 \text{ km}$$

Check with Pythagoras: $\sqrt{30.64^2 + 25.71^2} \approx 40.00$ ✓`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example 5: east and north to distance and bearing</p>
            <MathMd md={R`A bushwalker walks $6$ km west and then $8$ km north. How far is she from where she started, and on what bearing would she need to walk to get straight back to her start?

Distance:
$$d = \sqrt{6^2 + 8^2} = \sqrt{100} = 10 \text{ km}$$

Her position from the start is north and west. The angle west of north is
$$\theta = \tan^{-1}\left(\frac{6}{8}\right) \approx 36.87°$$
so her bearing from the start is $360° - 36.87° \approx 323°$.

To walk back she needs the back bearing: $323.13° - 180° \approx 143°$.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example 6: two legs of a trip</p>
            <MathMd md={R`A drone flies $5$ km on a bearing of $090°$, then $12$ km on a bearing of $180°$. Find its distance from the launch point and its bearing from the launch point, to the nearest degree.

$090°$ is due east and $180°$ is due south, so the drone ends up $5$ km east and $12$ km south. Those two legs meet at a right angle.

$$d = \sqrt{5^2 + 12^2} = \sqrt{169} = 13 \text{ km}$$

The angle east of south is
$$\tan^{-1}\left(\frac{5}{12}\right) \approx 22.62°$$
so the bearing from the launch point is $180° - 22.62° \approx 157°$.`} />
          </div>
          <MathMd md={R`When the two legs of a trip are **not** at right angles, the triangle isn’t right-angled and you need the sine rule or cosine rule. That’s a Year 10A skill.`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Measuring anticlockwise.** True bearings always go clockwise. A direction $20°$ to the left of north is $340°$, not $020°$.
- **Measuring from east (or from the x-axis).** Angles in other topics often start from the positive $x$-axis. Bearings start from north. If your bearing for north-east comes out as anything but $045°$, check where you started.
- **Drawing the north line at the wrong point.** In “the bearing of B from A”, the north line goes at A, the point after “from”.
- **Not using three figures.** Write $040°$, not $40°$, and $007°$, not $7°$. Some teachers take marks off for this.
- **Using the bearing as the angle in the triangle.** In worked example 4 the bearing is $130°$, but the angle inside the right-angled triangle is $50°$. Sketch first, then find the angle you actually need.
- **Back bearings over 360°.** $250° + 180° = 430°$ is not a bearing. For bearings of $180°$ or more, subtract: $250° - 180° = 070°$.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Draw a north arrow and a quick sketch for every one before you open the answer.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Measured from the wrong line again? Study the mistake, not just the answer." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Bearings by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-9-pythagoras", text: "Pythagoras in context: the distance part of most bearings questions." },
              { slug: "year-9-trigonometry", text: "SOHCAHTOA in right-angled triangles, the tool for east and north components." },
              { slug: "year-10-trigonometry", text: "Applied trigonometry: bearings, angles of elevation and depression, multi-step problems." },
              { slug: "year-10a-sine-cosine-rule", text: "The sine and cosine rules, for bearings problems where the triangle isn’t right-angled." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

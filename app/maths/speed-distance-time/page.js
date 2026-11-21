import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import Practice from "@/components/maths/Practice";
import YearLinks from "@/components/maths/YearLinks";
import SpeedCalc from "@/components/maths/SpeedCalc";
import MethodStrip from "@/components/method/MethodStrip";

// Concept page with a calculator: speed, distance and time. Built by the
// daily page task (Nov 2026); not yet read by Ryan, so it's in
// UNREVIEWED_PATHS (lib/reviewed.js). Every example, practice answer and
// calculator test case was recomputed by script before publishing.

const PATH = "/maths/speed-distance-time";
const TITLE = "Speed, Distance, Time Formula: Examples and Calculator (Year 8) | Tuterly";
const DESCRIPTION =
  "How to use the speed, distance and time formula: finding each one, decimal hours, km/h to m/s, average speed and distance-time graphs, with a calculator.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const R = String.raw;

const FAQS = [
  { q: "What is the formula for speed, distance and time?", a: "Speed = distance ÷ time. Rearranged, distance = speed × time and time = distance ÷ speed. A car that covers 245 km in 3.5 hours has a speed of 245 ÷ 3.5 = 70 km/h." },
  { q: "How do you work out time from speed and distance?", a: "Divide the distance by the speed. 27 km at 18 km/h takes 27 ÷ 18 = 1.5 hours. The decimal part is a fraction of an hour, so multiply it by 60 to get minutes: 0.5 × 60 = 30, giving 1 hour 30 minutes, not 1 hour 50 minutes." },
  { q: "How do you convert km/h to m/s?", a: "Divide by 3.6. One kilometre is 1000 m and one hour is 3600 s, so 1 km/h = 1000 ÷ 3600 m/s = 1/3.6 m/s. For example, 72 km/h ÷ 3.6 = 20 m/s. To go from m/s back to km/h, multiply by 3.6." },
  { q: "How do you calculate average speed?", a: "Divide the total distance by the total time, including any stops. Don't average the speeds: 120 km at 60 km/h then 120 km at 40 km/h takes 2 + 3 = 5 hours, so the average speed is 240 ÷ 5 = 48 km/h, not 50 km/h." },
  { q: "What does the gradient of a distance-time graph tell you?", a: "The gradient (rise over run) is the speed. A steeper line means a faster speed, a horizontal line means the object has stopped, and a line sloping back down to the time axis shows the return trip towards the start." },
  { q: "What year level learns speed, distance and time?", a: "In the Victorian Curriculum 2.0, distance-time problems are part of Year 8 measurement, under ratios and rates. Year 7 builds the unit rate skills it needs, and distance-time graphs link to gradient work in Years 8 and 9. Schools sequence topics differently, so check your course." },
];

const PRACTICE = [
  { q: R`A plane flies $1890$ km in $2.25$ hours. What is its average speed?`, a: R`$s = \dfrac{1890}{2.25} = 840$ km/h` },
  { q: R`A truck travels at $85$ km/h for $4$ hours $24$ minutes. How far does it go?`, a: R`$24$ min $= \dfrac{24}{60} = 0.4$ h, so $t = 4.4$ h. $d = 85 \times 4.4 = 374$ km` },
  { q: R`How long does it take to drive $195$ km at $78$ km/h? Give your answer in hours and minutes.`, a: R`$t = \dfrac{195}{78} = 2.5$ h. $0.5 \times 60 = 30$ min, so $2$ hours $30$ minutes` },
  { q: R`Convert $126$ km/h to m/s.`, a: R`$126 \div 3.6 = 35$ m/s` },
  { q: R`Convert $22$ m/s to km/h.`, a: R`$22 \times 3.6 = 79.2$ km/h` },
  { q: R`A swimmer swims $400$ m in $5$ minutes $20$ seconds. What is her average speed in m/s?`, a: R`$5$ min $20$ s $= 5 \times 60 + 20 = 320$ s. $s = \dfrac{400}{320} = 1.25$ m/s` },
  { q: R`A ferry leaves at 10:50 am and arrives at 12:35 pm. The trip is $42$ km. What is the ferry's average speed?`, a: R`10:50 am to 12:35 pm is $1$ h $45$ min $= 1.75$ h. $s = \dfrac{42}{1.75} = 24$ km/h` },
  { q: R`Mia cycles $30$ km at $20$ km/h, then another $30$ km at $30$ km/h. What is her average speed for the whole ride?`, a: R`Times: $\dfrac{30}{20} = 1.5$ h and $\dfrac{30}{30} = 1$ h. Average speed $= \dfrac{60}{2.5} = 24$ km/h (not $25$ km/h)` },
  { q: R`You see lightning, then hear the thunder $6$ seconds later. Taking the speed of sound as $343$ m/s, how far away was the lightning?`, a: R`$d = 343 \times 6 = 2058$ m, which is about $2.1$ km` },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths explained", path: "/maths" }, { name: "Speed, distance and time", path: PATH }]}
      eyebrow="Maths explained · Year 8"
      h1="Speed, distance and time"
      lead="Speed tells you how far something travels in each unit of time. One formula, rearranged three ways, answers every speed, distance and time question, as long as the units match. Here’s how to find each one, what to do with minutes and decimal hours, how to change km/h to m/s, how to work out an average speed and how to read a distance-time graph, with a calculator that shows the working."
      quickAnswer="Speed = distance ÷ time, distance = speed × time and time = distance ÷ speed. Make the units match first: kilometres with hours for km/h, metres with seconds for m/s. Divide by 3.6 to change km/h to m/s."
      toc={[
        ["formula", "The formula"],
        ["finding", "Finding speed, distance or time"],
        ["calculator", "Calculator"],
        ["minutes", "Minutes and decimal hours"],
        ["convert", "km/h and m/s"],
        ["average", "Average speed"],
        ["graphs", "Distance-time graphs"],
        ["mistakes", "Common mistakes"],
        ["practice", "Practice questions"],
        ["years", "By year level"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Stuck on a speed question?"
      ctaText="Snap it. Tuterly shows a detailed worked solution, then gives fresh questions on the same skill until you can do it on your own. Years 7 to 10."
      placement="concept_speed_distance_time"
      pageType="WebPage"
      faqs={FAQS}
      faqTitle="Speed, distance and time: common questions"
      links={[
        { href: "/worksheets/year-8-speed-distance-time", label: "Year 8 speed, distance and time worksheets" },
        { href: "/worksheets/year-8-rates", label: "Year 8 rates worksheets" },
        { href: "/maths/gradient", label: "Gradient explained" },
        { href: "/year-8-maths-test", label: "Year 8 maths practice test" },
        { href: "/maths", label: "All maths topics explained" },
      ]}
      moreTitle="More maths help, Years 7 to 10"
      showGuides={false}
      finalTitle="Got a speed question wrong in homework?"
      finalText="Snap it with Tuterly. You’ll see every step of the working, then get fresh questions on the same skill until it’s mastered. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="formula" className="tb-section" aria-labelledby="h-formula">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-formula" className="tb-h2 pg-h2">The speed, distance and time formula</h2>
          <div className="mx-formula"><MathMd md={R`$$s = \frac{d}{t}$$`} /></div>
          <MathMd md={R`Speed ($s$) is distance ($d$) divided by time ($t$). Rearranging gives the other two:

$$d = s \times t \qquad\qquad t = \frac{d}{s}$$

Many students remember all three with a triangle. Cover the one you want and what's left shows the calculation: cover $d$ and you see $s$ next to $t$, so multiply; cover $s$ and you see $d$ over $t$, so divide.`} />
          <svg className="mx-plot" viewBox="0 0 240 180" role="img" aria-label="Formula triangle with D on top, and S and T side by side underneath" style={{ maxWidth: 240 }}>
            <polygon points="120,10 230,170 10,170" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            <line x1="51.25" y1="110" x2="188.75" y2="110" stroke="currentColor" strokeWidth="2" />
            <line x1="120" y1="110" x2="120" y2="170" stroke="currentColor" strokeWidth="2" />
            <text x="120" y="92" textAnchor="middle" style={{ fontSize: 26 }}>D</text>
            <text x="78" y="150" textAnchor="middle" style={{ fontSize: 26 }}>S</text>
            <text x="162" y="150" textAnchor="middle" style={{ fontSize: 26 }}>T</text>
          </svg>
          <MathMd md={R`**The units must match.** Before you use the formula, check:

- a speed in **km/h** needs the distance in **kilometres** and the time in **hours**
- a speed in **m/s** needs the distance in **metres** and the time in **seconds**`} />
        </div>
      </section>

      <section id="finding" className="tb-section" aria-labelledby="h-finding">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-finding" className="tb-h2 pg-h2">Finding the speed, the distance or the time</h2>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: finding the speed</p>
            <MathMd md={R`A family drives $245$ km to a campsite, and the driving takes $3.5$ hours. What is their average speed?

$$s = \frac{d}{t} = \frac{245}{3.5} = 70 \text{ km/h}$$`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: finding the time</p>
            <MathMd md={R`A cyclist rides $27$ km along a bike trail at an average of $18$ km/h. How long does the ride take?

$$t = \frac{d}{s} = \frac{27}{18} = 1.5 \text{ hours}$$

$0.5$ of an hour is $0.5 \times 60 = 30$ minutes, so the ride takes **1 hour 30 minutes**.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: finding the distance</p>
            <MathMd md={R`A regional train averages $96$ km/h for $2.75$ hours. How far does it travel?

$$d = s \times t = 96 \times 2.75 = 264 \text{ km}$$`} />
          </div>
        </div>
      </section>

      <section id="calculator" className="tb-section" aria-labelledby="h-calculator">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-calculator" className="tb-h2 pg-h2">Speed, distance and time calculator</h2>
          <p className="pg-intro">Choose what you want to find and the unit you want the answer in, then fill in the other two values in any units. The calculator converts the units so they match and shows every step.</p>
          <SpeedCalc placement="concept_speed_distance_time_calc" />
        </div>
      </section>

      <section id="minutes" className="tb-section" aria-labelledby="h-minutes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-minutes" className="tb-h2 pg-h2">Minutes and decimal hours</h2>
          <MathMd md={R`Most marks in this topic are lost on time. An hour has $60$ minutes, not $100$, so decimal hours and minutes don't line up:

| Minutes | Hours |
|---|---|
| $15$ min | $0.25$ h |
| $20$ min | $\dfrac{1}{3}$ h $\approx 0.333$ h |
| $30$ min | $0.5$ h |
| $40$ min | $\dfrac{2}{3}$ h $\approx 0.667$ h |
| $45$ min | $0.75$ h |

To change minutes to hours, divide by $60$. To change the decimal part of an hour to minutes, multiply by $60$.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: time given in minutes</p>
            <MathMd md={R`Zara walks to school at $5.4$ km/h. The walk takes $40$ minutes. How far is it?

The speed is in km/h, so the time must be in hours:

$$t = \frac{40}{60} \text{ h}$$
$$d = 5.4 \times \frac{40}{60} = 3.6 \text{ km}$$

Keep $\dfrac{40}{60}$ as a fraction in your calculator. Rounding it to $0.67$ first gives $3.618$ km, which is slightly off.`} />
          </div>
          <div className="mx-example">
            <p className="mx-example__k">Worked example: from a timetable</p>
            <MathMd md={R`A train leaves Southern Cross at 9:45 am and arrives at its destination at 1:15 pm. The trip is $252$ km. What is the train's average speed?

1. 9:45 am to 12:45 pm is $3$ hours, and 12:45 pm to 1:15 pm is $30$ minutes.
2. $3$ h $30$ min $= 3.5$ h
3. $s = \dfrac{252}{3.5} = 72$ km/h`} />
          </div>
        </div>
      </section>

      <section id="convert" className="tb-section" aria-labelledby="h-convert">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-convert" className="tb-h2 pg-h2">Converting between km/h and m/s</h2>
          <MathMd md={R`One kilometre is $1000$ m and one hour is $3600$ s, so

$$1 \text{ km/h} = \frac{1000 \text{ m}}{3600 \text{ s}} = \frac{1}{3.6} \text{ m/s}$$

- **km/h to m/s:** divide by $3.6$. For example, $72$ km/h $= 72 \div 3.6 = 20$ m/s.
- **m/s to km/h:** multiply by $3.6$. For example, $15$ m/s $= 15 \times 3.6 = 54$ km/h.

A quick check: the m/s number is always the smaller one.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: a sprinter’s speed</p>
            <MathMd md={R`A sprinter runs $100$ m in $12.5$ seconds. Find the speed in m/s and in km/h.

$$s = \frac{100}{12.5} = 8 \text{ m/s}$$
$$8 \times 3.6 = 28.8 \text{ km/h}$$`} />
          </div>
        </div>
      </section>

      <section id="average" className="tb-section" aria-labelledby="h-average">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-average" className="tb-h2 pg-h2">Average speed for a journey in parts</h2>
          <MathMd md={R`Average speed is the **total distance divided by the total time**. It is not the average of the speeds.`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: two legs at different speeds</p>
            <MathMd md={R`A driver travels $120$ km at $60$ km/h, then another $120$ km at $40$ km/h through roadworks. What is the average speed for the whole trip?

1. First leg: $t = \dfrac{120}{60} = 2$ h
2. Second leg: $t = \dfrac{120}{40} = 3$ h
3. Total: $240$ km in $5$ h
4. Average speed $= \dfrac{240}{5} = 48$ km/h

Averaging $60$ and $40$ gives $50$ km/h, which is wrong. The driver spends longer at the slower speed, so the average is pulled closer to $40$.`} />
          </div>
          <MathMd md={R`If the trip includes a stop, add the stop to the total time. A $30$-minute lunch break on the trip above would make the average $\dfrac{240}{5.5} \approx 43.6$ km/h.`} />
        </div>
      </section>

      <section id="graphs" className="tb-section" aria-labelledby="h-graphs">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-graphs" className="tb-h2 pg-h2">Distance-time graphs</h2>
          <MathMd md={R`On a distance-time graph, time goes on the horizontal axis and distance from the start on the vertical axis. The **gradient** of each straight section is the speed:

- a steeper line means a faster speed
- a horizontal line means the object has stopped
- a line going back down means it's heading back towards the start`} />
          <div className="mx-example">
            <p className="mx-example__k">Worked example: reading a graph</p>
            <MathMd md={R`A distance-time graph for a delivery van joins these points with straight lines: $(0 \text{ h}, 0 \text{ km})$, $(2 \text{ h}, 150 \text{ km})$, $(2.5 \text{ h}, 150 \text{ km})$ and $(4 \text{ h}, 0 \text{ km})$. Describe the trip.

1. $0$ to $2$ h: gradient $= \dfrac{150}{2} = 75$, so the van travels away at $75$ km/h.
2. $2$ to $2.5$ h: the line is flat, so the van is stopped for $30$ minutes.
3. $2.5$ to $4$ h: it covers $150$ km back to the start in $1.5$ h, so $\dfrac{150}{1.5} = 100$ km/h.
4. Average speed for the whole trip: $\dfrac{300}{4} = 75$ km/h.`} />
          </div>
          <MathMd md={R`The [gradient page](/maths/gradient) covers rise over run in more detail.`} />
        </div>
      </section>

      <section id="mistakes" className="tb-section" aria-labelledby="h-mistakes">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-mistakes" className="tb-h2 pg-h2">Common mistakes</h2>
          <MathMd md={R`- **Reading decimal hours as minutes.** $1.5$ hours is $1$ hour $30$ minutes, not $1$ hour $50$ minutes. Multiply the decimal part by $60$.
- **Putting minutes straight into a km/h question.** $5.4 \times 40 = 216$ km for a $40$-minute walk is clearly wrong. Change $40$ minutes to $\dfrac{40}{60}$ hours first.
- **Mixing units.** A speed in km/h with a distance in metres gives nonsense. Convert so the units match before you use the formula.
- **Multiplying by 3.6 the wrong way.** Going from km/h to m/s, the number gets smaller, so divide. If $72$ km/h came out as $259.2$ m/s, you multiplied.
- **Averaging the speeds.** For a journey in parts, use total distance $\div$ total time, and include any stops in the time.
- **Dividing the wrong way round.** Time is $\dfrac{d}{s}$, not $\dfrac{s}{d}$. A quick sense check: $27$ km at $18$ km/h should take a bit more than an hour, not $0.67$ of one.`} />
        </div>
      </section>

      <section id="practice" className="tb-section" aria-labelledby="h-practice">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-practice" className="tb-h2 pg-h2">Practice questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer.</p>
          <Practice items={PRACTICE} />
        </div>
      </section>

      <MethodStrip lead="Keep losing marks on the units? Don't just move on. Study your mistakes." />

      <section id="years" className="tb-section" aria-labelledby="h-years">
        <div className="tb-wrap">
          <h2 id="h-years" className="tb-h2 pg-h2">Rates and speed by year level</h2>
          <p className="pg-intro">Following the Victorian Curriculum 2.0. Schools sequence topics differently, so check your course.</p>
          <YearLinks
            rows={[
              { slug: "year-7-best-buys", text: "Unit rates and best buys: the idea of an amount per one unit that speed is built on." },
              { slug: "year-8-rates", text: "Rates and ratios in everyday problems, including converting between rate units." },
              { slug: "year-8-speed-distance-time", text: "Speed, distance and time: the formula, unit conversion, multi-stage trips and distance-time graphs." },
              { slug: "year-8-gradient", text: "Gradient as rise over run, which is the speed on a distance-time graph." },
              { slug: "year-9-direct-proportion", text: "Direct proportion: at a constant speed, distance is directly proportional to time." },
            ]}
          />
        </div>
      </section>
    </GuideShell>
  );
}

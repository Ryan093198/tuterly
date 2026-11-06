import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";

// Parent guide to dyscalculia for Years 7 to 10 ("dyscalculia" ~12,100
// searches a month in Australia, "dyscalculia test" ~720). General
// information only, sourced from Raising Children Network and SPELD NSW.
// Ryan's position (6 Nov 2026): the recommendation is a tutor who
// specialises in dyscalculia, with Tuterly as practice alongside the
// tutoring. Never claim Tuterly treats or diagnoses dyscalculia.

const PATH = "/parents/dyscalculia";
const TITLE = "Dyscalculia in High School: Signs, Assessment and Support (Australia) | Tuterly";
const DESCRIPTION =
  "Is it dyscalculia, or maths gaps that can be fixed? Signs in Years 7 to 10, how assessment works in Australia, how to find a tutor who specialises in dyscalculia, and how practice at home fits alongside.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const RCN = "https://raisingchildren.net.au/guides/a-z-health-reference/dyscalculia";

const FAQS = [
  {
    q: "Is there an online test for dyscalculia?",
    a: "Online checklists and screeners can help you decide whether to look further, but they can't diagnose dyscalculia. A diagnosis comes from a formal assessment by a psychologist, usually after your child has had specific maths support and is still having difficulties.",
  },
  {
    q: "Do we need a GP referral to see a psychologist?",
    a: "No. You can book a psychologist directly. A GP or paediatrician can help rule out other causes, and may be able to refer you to a lower-cost clinic.",
  },
  {
    q: "Can dyscalculia be cured?",
    a: "Dyscalculia is lifelong, but the right support makes a real difference. Specialist teaching, adjustments at school and tools like calculators help students build skills and confidence.",
  },
  {
    q: "Can my child get extra support or adjustments at school?",
    a: "Yes. Dyscalculia is recognised as a disability under the Disability Discrimination Act, and schools can make adjustments such as an individual learning plan, extra time, calculators or modified tasks. Ask the school's learning support team what's available.",
  },
  {
    q: "What should I look for in a dyscalculia tutor?",
    a: "Experience with specific learning difficulties and dyscalculia in particular, a focus on number sense and foundations rather than just this week's homework, concrete and visual methods, small steps, and a way of showing you progress. Ask how they'll use the psychologist's report if you have one.",
  },
  {
    q: "Does Tuterly treat or diagnose dyscalculia?",
    a: "No. Tuterly is a practice app for Years 7 to 10 maths. It can be a useful resource alongside a specialist tutor, for practising this term's class topics between sessions, but it doesn't diagnose dyscalculia or replace specialist support.",
  },
];

const LINKS = [
  { href: RCN, label: "Raising Children Network: dyscalculia" },
  { href: "https://www.speldnsw.org.au/services/referral-database/", label: "SPELD NSW: tutor and practitioner referrals" },
  { href: "/parents/maths-app-vs-tutoring", label: "Maths help without the $100-an-hour tutor" },
  { href: "/end-of-year-maths-exams", label: "Free topic tests, Years 7 to 10" },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[
        { name: "Parents", path: "/parents" },
        { name: "Dyscalculia", path: PATH },
      ]}
      eyebrow="Parent guide · Years 7 to 10 maths"
      h1="Is it dyscalculia, or maths gaps that can be fixed?"
      lead="Many students who struggle with maths have gaps from earlier years that practice can close. A smaller number have dyscalculia, a lifelong learning difference with numbers that needs specialist support. Here’s how to tell the difference, how assessment works in Australia, and what help actually helps."
      quickAnswer="Dyscalculia is a specific learning disorder that makes understanding numbers and quantities very hard. If you suspect it, talk to the teacher first, then see a psychologist for a formal assessment. The most useful support is a tutor who specialises in dyscalculia, with adjustments at school, and regular practice at home alongside."
      toc={[
        ["what", "What dyscalculia is"],
        ["signs", "Signs in high school"],
        ["gaps", "Dyscalculia or gaps?"],
        ["assess", "Getting an assessment"],
        ["tutor", "Finding a specialist tutor"],
        ["tuterly", "Practice alongside tutoring"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Practice between tutoring sessions"
      ctaText="Tuterly gives your child detailed worked solutions and fresh practice on this term’s maths topics, at their own pace and in private. A resource alongside specialist tutoring, Years 7 to 10."
      placement="parents_dyscalculia"
      faqs={FAQS}
      faqTitle="Dyscalculia: questions parents ask"
      links={LINKS}
      finalTitle="A resource alongside their tutor"
      finalText="Between specialist tutoring sessions, Tuterly lets your child practise this term’s class topics with step-by-step worked solutions, at their own pace and in private. It doesn’t diagnose or treat dyscalculia."
    >
      <section id="what" className="tb-section" aria-labelledby="h-what">
        <div className="tb-wrap">
          <h2 id="h-what" className="tb-h2 pg-h2">What dyscalculia is (and isn&rsquo;t)</h2>
          <div className="pg-prose">
            <p>
              Dyscalculia is a specific learning disorder in mathematics: a serious, ongoing difficulty with understanding and working with numbers and quantities. It&rsquo;s lifelong, it isn&rsquo;t caused by poor teaching or a lack of effort, and it often occurs alongside dyslexia or ADHD.
            </p>
            <p>
              It&rsquo;s not the same as being &ldquo;bad at maths&rdquo;, finding a topic hard, or having maths anxiety. Plenty of students are anxious about maths without having dyscalculia, although anxiety and avoidance can be part of the picture.
            </p>
          </div>
          <p className="pg-small">
            This page is general information, not a diagnosis. Definitions and signs are from <a href={RCN}>Raising Children Network</a>, the Australian parenting website.
          </p>
        </div>
      </section>

      <section id="signs" className="tb-section" aria-labelledby="h-signs">
        <div className="tb-wrap">
          <h2 id="h-signs" className="tb-h2 pg-h2">Signs of dyscalculia in high school</h2>
          <p className="pg-intro">
            In Years 7 to 10, signs often show up as the maths becomes more abstract. A student with dyscalculia may:
          </p>
          <ul className="pg-checklist">
            <li><strong>Struggle with abstract maths</strong>{" "}like algebra and fractions, well beyond the rest of their schoolwork.</li>
            <li><strong>Rely on memorised steps</strong>{" "}without understanding why they work, and lose them quickly.</li>
            <li><strong>Find it hard to spot obviously wrong answers,</strong>{" "}or to estimate whether an answer is about the right size.</li>
            <li><strong>Still struggle with basic number facts,</strong>{" "}like times tables, or still count on fingers.</li>
            <li><strong>Have trouble with everyday numbers,</strong>{" "}such as managing time and money.</li>
            <li><strong>Find it hard to explain their thinking</strong>{" "}in maths.</li>
            <li><strong>Rush or avoid maths tasks,</strong>{" "}or feel very anxious about them.</li>
          </ul>
          <p className="pg-small">
            Signs from <a href={RCN}>Raising Children Network</a>. One or two of these on their own is common; it&rsquo;s a persistent pattern, despite good support, that&rsquo;s worth looking into.
          </p>
        </div>
      </section>

      <section id="gaps" className="tb-section" aria-labelledby="h-gaps">
        <div className="tb-wrap">
          <h2 id="h-gaps" className="tb-h2 pg-h2">Dyscalculia or gaps that can be fixed?</h2>
          <p className="pg-intro">
            Many struggling students have gaps: topics missed or never quite learnt, which make later topics hard. Gaps and dyscalculia can look similar at first. The difference shows up over time, with good support.
          </p>
          <div className="pg-table">
            <table>
              <caption>How maths gaps and dyscalculia tend to differ</caption>
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Gaps from earlier years</th>
                  <th scope="col">Possible dyscalculia</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Where it shows up</th>
                  <td>Specific topics, often ones missed or rushed</td>
                  <td>Across almost all number work, including the basics</td>
                </tr>
                <tr>
                  <th scope="row">With targeted practice</th>
                  <td>Improves fairly quickly once the missing skill is taught</td>
                  <td>Improves slowly, and skills fade quickly without ongoing support</td>
                </tr>
                <tr>
                  <th scope="row">Basic number facts</th>
                  <td>Usually secure</td>
                  <td>Often still hard, even in high school</td>
                </tr>
                <tr>
                  <th scope="row">Sense of size</th>
                  <td>Can usually tell when an answer is way off</td>
                  <td>Finds estimating and spotting wrong answers hard</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pg-note" style={{ marginTop: 18 }}>
            <strong>Either way, start with support.</strong>{" "}In Australia, a dyscalculia diagnosis is usually only considered after a child has had specific maths support and still has difficulties. So getting the right help now is the first step, whatever the answer turns out to be.
          </div>
          <p className="pg-small">
            A free <Link href="/end-of-year-maths-exams">topic test</Link>{" "}can show which topics are causing trouble. If your child struggles with the first, easier questions in almost every topic, that&rsquo;s worth raising with the school.
          </p>
        </div>
      </section>

      <section id="assess" className="tb-section" aria-labelledby="h-assess">
        <div className="tb-wrap">
          <h2 id="h-assess" className="tb-h2 pg-h2">Getting an assessment in Australia</h2>
          <ol className="pg-steps">
            <li><strong>Talk to the teacher</strong>Ask how your child is going compared with the class, what they&rsquo;ve noticed, and what extra support the school can offer, such as an individual learning plan.</li>
            <li><strong>See a professional if it continues</strong>If difficulties continue despite support, see a GP, paediatrician or psychologist. You don&rsquo;t need a GP referral to see a psychologist.</li>
            <li><strong>Formal assessment</strong>A psychologist runs a range of tests comparing your child&rsquo;s skills with what&rsquo;s typical for their age and year level, and writes a report with recommendations.</li>
            <li><strong>Share the report</strong>Give it to the school and to your child&rsquo;s tutor, so adjustments and teaching can be based on it.</li>
          </ol>
          <p className="pg-small">
            Dyscalculia is an accepted disability under the Disability Discrimination Act, so schools can make adjustments such as extra time, calculators or modified tasks. Source: <a href={RCN}>Raising Children Network</a>.
          </p>
        </div>
      </section>

      <section id="tutor" className="tb-section" aria-labelledby="h-tutor">
        <div className="tb-wrap">
          <h2 id="h-tutor" className="tb-h2 pg-h2">The most useful step: a tutor who specialises in dyscalculia</h2>
          <p className="pg-intro">
            One-on-one tutoring with a trained teacher is one of the main supports for dyscalculia. A general maths tutor can help with homework, but a specialist works on the underlying number sense, which is what makes everything else easier.
          </p>
          <div className="pg-grid">
            <div className="pg-box">
              <h3>What to look for</h3>
              <ul>
                <li>Experience with specific learning difficulties, and dyscalculia in particular</li>
                <li>Work on foundations and number sense, not only this week&rsquo;s homework</li>
                <li>Concrete and visual methods: number lines, diagrams, hands-on materials</li>
                <li>Small steps, lots of practice, and patience</li>
              </ul>
            </div>
            <div className="pg-box">
              <h3>Questions to ask</h3>
              <ul>
                <li>How many students with dyscalculia have you worked with?</li>
                <li>How will you use the psychologist&rsquo;s report?</li>
                <li>How will you work with the school?</li>
                <li>How will I see progress?</li>
              </ul>
            </div>
            <div className="pg-box">
              <h3>Where to find one</h3>
              <ul>
                <li>Your state&rsquo;s SPELD association. <a href="https://www.speldnsw.org.au/services/referral-database/">SPELD NSW</a>{" "}runs a referral service for tutors with learning-difficulty experience, including remote tele-tutoring</li>
                <li>The psychologist who did the assessment</li>
                <li>Your school&rsquo;s learning support team</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="tuterly" className="tb-section" aria-labelledby="h-tuterly">
        <div className="tb-wrap">
          <h2 id="h-tuterly" className="tb-h2 pg-h2">Practice at home, alongside the tutor</h2>
          <div className="pg-prose">
            <p>
              A weekly session with a specialist is where the core work happens. Between sessions, students still have this term&rsquo;s class topics to keep up with. That&rsquo;s where Tuterly can be a useful resource:
            </p>
            <ul>
              <li><strong>Detailed worked solutions,</strong>{" "}with every step written out, which your child can go back to as often as they need.</li>
              <li><strong>Fresh questions on the same skill,</strong>{" "}so practice is repeated without being the same question again.</li>
              <li><strong>Mistakes come back until they&rsquo;re mastered,</strong>{" "}which helps when methods fade quickly.</li>
              <li><strong>Private and at their own pace,</strong>{" "}with no one watching them get it wrong.</li>
              <li><strong>Saved mistakes to share with the tutor,</strong>{" "}so sessions can start from what your child found hard that week.</li>
            </ul>
            <p>
              To be clear about what it isn&rsquo;t: Tuterly doesn&rsquo;t diagnose or treat dyscalculia, and it doesn&rsquo;t replace a specialist tutor or support at school. It covers Years 7 to 10 class maths, so building early number sense is the tutor&rsquo;s job. Used together, the tutor builds the foundations and Tuterly keeps the practice going in between.
            </p>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}

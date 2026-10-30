import Link from "next/link";
import GuideShell from "@/components/scholarship-guides/GuideShell";
import { pageMetadata } from "@/lib/scholarship-guides";

const PATH = "/scholarship/year-5-and-year-6-prep";
const TITLE = "Year 5 and Year 6 Entry Scholarship Prep: A Parent Guide | Tuterly";
const DESCRIPTION =
  "Preparing a younger child for a Year 5 or Year 6 entry scholarship test in Australia: primary-level tests such as ACER Level P, age-appropriate practice, avoiding burnout, the parent's role and a free diagnostic.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const FAQS = [
  {
    q: "Which test will my child sit for Year 5 or Year 6 entry?",
    a: "It depends on the school. ACER's Primary test (Level P) covers entry into Years 4 to 6, with Reading and Viewing, Mathematics and Writing. Some schools use Edutest or AAS at a primary level, or their own assessment. The school's scholarship page names the test.",
  },
  {
    q: "Is my Year 4 child too young to prepare?",
    a: "Not too young for light, enjoyable practice. At this age the goal is familiarity and confidence, not long timed papers. Short sessions, lots of reading and talking about how they solved a problem go a long way.",
  },
  {
    q: "How long should practice sessions be for a Year 4 or Year 5 child?",
    a: "Short. Many children this age do best with sessions of 15 to 25 minutes a few times a week, with an occasional longer timed practice closer to the test. Stop while it is still going well.",
  },
  {
    q: "What if my child finds the questions very hard?",
    a: "That is normal. Scholarship tests are designed to stretch the strongest students, so most children get plenty wrong at first. Look at the worked solution together, try a similar question, and celebrate progress rather than scores.",
  },
  {
    q: "Should we also plan for Year 7 entry?",
    a: "Many families treat an earlier attempt as one option, with Year 7 entry as another. Skills built now carry straight over. See the Year 7 entry guide for the later timeline.",
  },
  {
    q: "How does Tuterly Scholarship work for Year 5 and Year 6 entry?",
    a: "Choose the entry level, and the first 10 diagnostic questions are free. Scholarship Pass (launch special A$99 one-off per entry level, usual price A$198 from 1 April 2027) unlocks the full diagnostic, worked solutions and follow-up practice on missed questions.",
  },
];

const CRUMBS = [
  { name: "Scholarship", path: "/scholarship" },
  { name: "Year 5 and Year 6 prep", path: PATH },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={CRUMBS}
      faqs={FAQS}
      defaultEntry={6}
      eyebrow="Year 5 and Year 6 entry"
      h1="Year 5 and Year 6 entry scholarship prep: a parent guide"
      lead="Some independent schools offer scholarships for entry in Year 5 or Year 6, with tests sat in Year 4 or Year 5. Younger children need a different approach: shorter practice, more encouragement and a clear eye on wellbeing."
      facts={[
        ["Year 5 entry", "Test usually sat in Year 4"],
        ["Year 6 entry", "Test usually sat in Year 5"],
        ["Common primary test", "ACER Level P"],
        ["Free to start", "First 10 diagnostic questions"],
      ]}
    >
      <section className="tb-section" aria-labelledby="h-levels">
        <div className="tb-wrap">
          <h2 id="h-levels" className="tb-h2 sg-h2">Primary-level tests vs early secondary tests</h2>
          <div className="sg-prose" style={{ marginBottom: 18 }}>
            <p>
              Tests for earlier entry are pitched at primary level. They look different from the secondary tests used for Year 7 entry, and the difference matters when you choose practice.
            </p>
          </div>
          <div className="sg-table">
            <table>
              <caption>Primary-level and early secondary scholarship tests compared (general summary)</caption>
              <thead>
                <tr><th scope="col">&nbsp;</th><th scope="col">Primary level (Year 5 and 6 entry)</th><th scope="col">Early secondary (Year 7 entry)</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row">ACER</th><td>Level P: Reading and Viewing, Mathematics, Writing. Typically on paper.</td><td>Secondary levels: Written Expression, Humanities, Mathematics. Online or paper.</td></tr>
                <tr><th scope="row">Edutest and AAS</th><td>Primary-level versions where the school uses them. Sections depend on the school.</td><td>Reasoning and achievement sections, often five for Edutest.</td></tr>
                <tr><th scope="row">Reading</th><td>Shorter texts and visuals, with literal and inferential questions</td><td>Longer and more varied texts, including poetry and persuasive pieces</td></tr>
                <tr><th scope="row">Maths</th><td>Number sense, patterns, measurement and simple data, often in puzzle form</td><td>Multi-step problems across more topics</td></tr>
                <tr><th scope="row">Writing</th><td>A shorter piece, often from a picture or simple prompt</td><td>A timed piece with higher expectations for structure and vocabulary</td></tr>
              </tbody>
            </table>
          </div>
          <p className="sg-sources">
            Always confirm the test and level on the school&rsquo;s own page. For a provider-by-provider view, see <Link href="/scholarship/acer-vs-edutest-vs-aas">ACER vs Edutest vs AAS</Link>.
          </p>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-age">
        <div className="tb-wrap">
          <h2 id="h-age" className="tb-h2 sg-h2">Age-appropriate preparation</h2>
          <div className="sg-grid">
            <div className="sg-box">
              <h3>Reading</h3>
              <ul>
                <li>Daily reading of books they enjoy, plus some non-fiction and poetry.</li>
                <li>Talk about why a character acted, or what a picture is suggesting.</li>
                <li>Ask &ldquo;how do you know?&rdquo; to build the habit of finding evidence.</li>
              </ul>
            </div>
            <div className="sg-box">
              <h3>Maths and reasoning</h3>
              <ul>
                <li>Quick, fun mental arithmetic and times tables.</li>
                <li>Number patterns, logic puzzles and &ldquo;what comes next&rdquo; games.</li>
                <li>Short sets of scholarship-style questions, without a calculator.</li>
              </ul>
            </div>
            <div className="sg-box">
              <h3>Writing</h3>
              <ul>
                <li>Short stories from a picture or opening line, once a week.</li>
                <li>Focus on a clear beginning, middle and end before vocabulary.</li>
                <li>Gentle, specific feedback: one thing that worked, one thing to try.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-burnout">
        <div className="tb-wrap">
          <h2 id="h-burnout" className="tb-h2 sg-h2">Avoiding burnout</h2>
          <div className="sg-prose">
            <p>
              A Year 4 or Year 5 child preparing for a scholarship test is still a primary school student. Preparation that crowds out play, sport, friends and sleep tends to backfire, both in the test and afterwards.
            </p>
            <ul>
              <li><strong>Keep sessions short</strong> and finish on a success.</li>
              <li><strong>Protect weekends and holidays</strong> from heavy practice, especially early on.</li>
              <li><strong>Watch for warning signs</strong>: tears over practice, trouble sleeping, stomach aches before sessions, or avoiding schoolwork they used to enjoy.</li>
              <li><strong>Talk about the test as one opportunity</strong>, not a verdict on how clever they are.</li>
              <li><strong>Remember there are other entry points</strong>, including Year 7 entry, if this attempt does not go the way you hoped.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-parent">
        <div className="tb-wrap">
          <h2 id="h-parent" className="tb-h2 sg-h2">The parent&rsquo;s role</h2>
          <div className="sg-prose">
            <p>At this age, parents do most of the organising, and children do the thinking. A useful split:</p>
          </div>
          <ul className="sg-checklist" style={{ marginTop: 14 }}>
            <li>You confirm the provider, level, date, registration and fee on each school&rsquo;s page.</li>
            <li>You set a simple weekly routine and keep it light.</li>
            <li>Your child does the questions; you sit nearby and help them read the worked solution, not give the answer.</li>
            <li>You keep a short list of skills that keep tripping them up, and revisit those.</li>
            <li>You rehearse the practical side: getting to the venue, or the online set-up if the test is at home.</li>
          </ul>
        </div>
      </section>

      <section className="tb-section" aria-labelledby="h-path">
        <div className="tb-wrap">
          <h2 id="h-path" className="tb-h2 sg-h2">The diagnostic path for Year 5 and Year 6 entry</h2>
          <ol className="sg-steps">
            <li><strong>Pick the level</strong>Year 5 entry (child in Year 4) or Year 6 entry (child in Year 5).</li>
            <li><strong>Try 10 free questions</strong>The first 10 diagnostic questions are free, a gentle first look at the style.</li>
            <li><strong>Unlock Scholarship Pass if useful</strong>Launch special A$99 one-off per entry level (usual price A$198 from 1 April 2027): full diagnostic and worked solutions.</li>
            <li><strong>Practise little and often</strong>Follow-up practice on missed questions, in short sessions that suit younger children.</li>
          </ol>
          <div className="sg-prose" style={{ marginTop: 18 }}>
            <p>
              You can start today with the <Link href="/scholarship-practice">free scholarship numerical reasoning practice</Link>: choose Year 4 for Year 5 entry, or Year 5 for Year 6 entry. Planning ahead? Read the <Link href="/scholarship/year-7-entry-guide">Year 7 entry guide</Link>, or go back to the <Link href="/scholarship">scholarship hub</Link>.
            </p>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}

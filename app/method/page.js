import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import MethodList from "@/components/method/MethodList";
import { Eyebrow } from "@/components/brand";
import { BAYSIDE } from "@/lib/bayside";
import { SITE_URL, EDUCOURSE_URL } from "@/lib/site";
import { appCta } from "@/lib/study-app";
import "@/components/state/state-hub.css";
import "@/components/brand/brand.css";
import "../worksheets/worksheets.css";
import "./method.css";

// The Tuterly Method: Snap. Fix. Ace. (Ryan, 10 Nov 2026; Ace chosen over Test). The aim is a
// simple, repeatable system that feels small: only study the questions you
// got wrong, and the list only gets shorter. No promised results.

const PATH = "/method";
const URL = `${SITE_URL}${PATH}`;
const TITLE = "The Tuterly Method: Snap. Fix. Ace. | Tuterly";
const DESCRIPTION =
  "Don't study more. Study your mistakes. The 3-step maths method from the team behind Bayside Academics and Educourse: snap every question you get wrong, fix it, then ace a full practice test.";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const STEPS = [
  {
    word: "Snap.",
    action: "Got one wrong? Snap it.",
    body: "Snap every question you get wrong: school tests, homework, class work. One photo, a few seconds. That's your study list, and nothing else goes on it.",
    moment: "Test handed back? Snap the ones you lost marks on.",
  },
  {
    word: "Fix.",
    action: "Fix one before dinner.",
    body: "See the worked solution and where it went wrong. Then do fresh questions on that same skill until you get one right without help. Then it comes off the list.",
    moment: "One question is enough for tonight.",
  },
  {
    word: "Ace.",
    action: "Prove it's stuck.",
    body: "A full test on your topics, with questions you've got wrong before mixed in, so you find out if they've really stuck. Anything you miss goes back on your list.",
    moment: "Exam coming up? Start a week or two before.",
  },
];

const TABLE = [
  {
    step: "Snap",
    free: "Not on the website",
    app: "Snap any question from a test, worksheet or textbook. It's saved, sorted by topic, and ready to fix.",
  },
  {
    step: "Fix",
    free: "Worked examples by topic",
    app: "The worked solution to your exact question, then fresh questions on that skill until you get it right.",
  },
  {
    step: "Ace",
    free: "One practice exam a day",
    app: "Full practice tests on your topics, with the questions you've got wrong before mixed in, and Exam Zone for practice exams in your school's style.",
  },
];

const FAQS = [
  {
    q: "What is the Tuterly Method?",
    a: "Three steps: snap every maths question you get wrong, fix each one with the worked solution and fresh practice on the same skill, then sit a full practice test with your past mistakes mixed in. Anything you miss goes back on the list. You only ever study your mistakes.",
  },
  {
    q: "How much time does it take?",
    a: "Less than most revision, because it skips what you already know. On a normal week, fixing a question or two a night is enough. In the two or three weeks before an exam, 30 to 45 minutes a night works well, and the free study planner sets out each night for you.",
  },
  {
    q: "Do I need the app?",
    a: "The app is where the method happens: it's where you snap, and it writes new questions on exactly the skill you got wrong. Our free worked examples and practice exams are a good place to start.",
  },
  {
    q: "Who came up with it?",
    a: `The educators behind Bayside Academics and Educourse. ${BAYSIDE.line.replace(/^Bayside Academics, a/, "Bayside Academics is a")}. Educourse is our selective entry and scholarship preparation platform.`,
  },
  {
    q: "Is it only for students who are struggling?",
    a: "No. Every student loses marks somewhere, and strong students often lose them to the same few question types. Fixing those is usually the quickest way to the next grade up.",
  },
  {
    q: "Which year levels is it for?",
    a: "The method works at any level. The Tuterly app and our free resources cover Years 7 to 10 maths, following the Australian Curriculum.",
  },
];

export default function MethodPage() {
  const cta = appCta();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <div className="sh">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MarketingNav />

      <section className="tb ws-hero2 mt-hero" aria-labelledby="mt-title">
        <div className="tb-wrap ws-hero2__grid">
          <div>
            <Eyebrow>The Tuterly Method</Eyebrow>
            <h1 id="mt-title" className="tb-h1 mt-h1">
              <span>Snap.</span> <span>Fix.</span> <span>Ace.</span>
            </h1>
            <p className="mt-sub">Don&rsquo;t study more. Study your mistakes.</p>
            <p className="tb-lead ws-hero2__lead">
              Most revision goes on practising what a student already knows. This method only spends time on the questions they got wrong, so there&rsquo;s less to do, and every night it&rsquo;s clear what&rsquo;s next.
            </p>
            <div className="ws-hero2__bayside">
              <p className="ws-hero2__bayside-t">From the team behind Bayside Academics and <a href={EDUCOURSE_URL} className="mt-plain">Educourse</a></p>
              <p className="ws-hero2__bayside-x">{`Built on 10 years of tutoring over 1,000 students at Bayside Academics in ${BAYSIDE.where}, with a ${BAYSIDE.rating} rating on Google.`}</p>
            </div>
            <div className="ws-hero2__cta">
              <a href="#steps" className="tb-btn tb-btn--primary">See the 3 steps</a>
              <Link href="/study-planner" className="ws-hero2__more">Exam coming up? Make a free plan →</Link>
            </div>
          </div>
          <MethodList />
        </div>
      </section>

      <section id="steps" className="mt-steps" aria-labelledby="mt-steps-h">
        <div className="tb-wrap">
          <h2 id="mt-steps-h" className="tb-h2 mt-steps__h">Three steps.</h2>
          <ol className="mt-steps__list">
            {STEPS.map((s, i) => (
              <li key={s.word} className={`mt-step mt-step--${i + 1}`}>
                <p className="mt-step__word"><span className="mt-step__n">{i + 1}</span>{s.word}</p>
                <p className="mt-step__action">{s.action}</p>
                <p className="mt-step__body">{s.body}</p>
                <p className="mt-step__moment">{s.moment}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-reframe" aria-label="Why mistakes matter">
        <div className="tb-wrap">
          <p className="mt-reframe__big">Every mistake is a mark you can win back.</p>
          <p className="mt-reframe__x">A disappointing test isn&rsquo;t a verdict. It&rsquo;s a list of exactly what to work on next, and it&rsquo;s shorter than it looks.</p>
        </div>
      </section>

      <section className="mt-parents" aria-labelledby="mt-parents-h">
        <div className="tb-wrap mt-parents__grid">
          <div>
            <h2 id="mt-parents-h" className="tb-h2">For parents: one question a week</h2>
            <p className="tb-lead">You don&rsquo;t need to remember the maths or check every page of homework. Ask one thing.</p>
          </div>
          <div className="mt-bubble">
            <p className="mt-bubble__q">&ldquo;Did you snap anything this week?&rdquo;</p>
            <p className="mt-bubble__x">If the answer is yes, they&rsquo;re doing the method. If it&rsquo;s no, ask which tests or homework came back this week, and start there.</p>
          </div>
        </div>
      </section>

      <section className="mt-table-sec" aria-labelledby="mt-table-h">
        <div className="tb-wrap">
          <h2 id="mt-table-h" className="tb-h2">What's free, and what the app adds</h2>
          <div className="mt-table" role="table" aria-label="The method, free and in the Tuterly app">
            <div className="mt-row mt-row--head" role="row">
              <span role="columnheader">Step</span>
              <span role="columnheader">Free on this website</span>
              <span role="columnheader">In the Tuterly app</span>
            </div>
            {TABLE.map((r) => (
              <div key={r.step} className="mt-row" role="row">
                <span role="rowheader" className="mt-row__step">{r.step}</span>
                <span role="cell" className="mt-row__free"><em className="mt-row__lab">Free</em>{r.free}</span>
                <span role="cell" className="mt-row__app"><em className="mt-row__lab">In the app</em>{r.app}</span>
              </div>
            ))}
          </div>
          <p className="mt-table__more">
            Curious what the app costs? <Link href={cta.href}>It&rsquo;s half price until 31 March 2027</Link>.
          </p>
        </div>
      </section>

      <section className="sh-sec" aria-labelledby="mt-faq">
        <div className="sh-wrap sh-narrow">
          <h2 id="mt-faq">Questions about the method</h2>
          <div className="sh-faqs">
            {FAQS.map((f) => (
              <div key={f.q} className="sh-box">
                <h3 className="sh-h3">{f.q}</h3>
                <p className="sh-p">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AppCtaBand
        placement="method_final"
        title="Snap. Fix. Ace. All three in one app."
        lead="Snap a question you got wrong, see the worked solution, then fresh questions on that skill until it's fixed. Years 7 to 10 maths."
      />
      <MarketingFooter />
    </div>
  );
}

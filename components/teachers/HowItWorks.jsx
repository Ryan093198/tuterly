"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./how-it-works.css";

// /teachers/how-it-works: Tuterly for Teachers as one continuous scroll
// story (Ryan, 16 Nov 2026). One stage of 1000 x 600 design pixels: the same
// pieces (Archie's paper, the copier, the laptop, the student cards) move and
// change shape from step to step, so each scene grows out of the last.
// Everything shown comes from Tuterly Demo College (an invented class) and
// the marking app's real screens; the phone is a real Tuterly app screenshot.
const STEPS = [
  { t: "Any test or exam your class sits on paper.", s: "Your school’s own tests, end-of-term exams, textbook tests. It doesn’t have to come from Tuterly." },
  { t: "Scan the class set on any copier or scanner.", s: "We set up your school’s copier free of charge, or supply a Tuterly copier that arrives ready to go." },
  { t: "Every page is matched to the right student.", s: "Each class has its own scan address. Papers come back marked in about 10 minutes, stored securely." },
  { t: "Every answer is marked twice, with a blind check.", s: "Ticks, crosses and part marks, each with a reason. This is a real paper from our demo class." },
  { t: "You check the marks and approve.", s: "Flagged answers come first, every mark shows Tuterly’s reason, and you can change any of them. Nothing reaches students until you approve." },
  { t: "See exactly what to reteach.", s: "The class’s weakest topics first, and what went wrong. In this test, 12 of 19 students lost marks on question 7." },
  { t: "Every student gets practice on their own weak topics.", s: "Archie, Mia and Henry each get a different set: new questions on what they lost marks on, and an extension question where they got full marks." },
  { t: "Approve, and every student has it instantly.", s: "In the Tuterly app, at study.tuterly.com.au, or printed for class." },
  { t: "Then watch the class improve.", s: "Every test feeds the next round of practice. Demo class 9B went from 72% to 79% over three tests." },
];
const N = STEPS.length;

const ROSTER = ["Amelia Novak", "Archie Brown", "Ava Thompson", "Chloe Murphy", "Ethan Okafor", "Grace Tran", "Henry Walsh", "Isla Chen", "Jack Morrison", "Liam Nguyen", "Lucas Rossi", "Max Delaney", "Mia Kowalski", "Noah Williams", "Olivia Patel", "Oscar Fitzgerald", "Ruby Singh", "Sophie Kim", "Zara Ahmed"];
const initials = (n) => n.split(" ").map((w) => w[0]).join("");

// Archie Brown's Pythagoras and trigonometry test: real demo marks, placed
// on the scan with the marking boxes (fractions of the page height).
const MARKS = [
  { q: 1, y: 0.204, h: 0.096, got: 1, of: 1 },
  { q: 2, y: 0.3, h: 0.096, got: 2, of: 2 },
  { q: 3, y: 0.397, h: 0.167, got: 2, of: 2 },
  { q: 4, y: 0.563, h: 0.086, got: 0, of: 1, why: "Used the adjacent side: sin θ = 3/5" },
  { q: 5, y: 0.649, h: 0.096, got: 0, of: 2, why: "Multiply by sin 30° = 0.5, not by 30" },
  { q: 6, y: 0.745, h: 0.096, got: 2, of: 2 },
  { q: 7, y: 0.842, h: 0.123, got: 1, of: 2, why: "No working shown: the method mark needs the working" },
];

// Topics to reteach for 9B Maths, as the marking app shows them.
const RETEACH = [
  ["Negative indices", "Mostly misunderstood the idea", 53],
  ["Solving for the denominator", "Mostly used the wrong method", 58],
  ["Perfect squares", "Mostly misunderstood the idea", 63],
  ["Factorising non-monic trinomials", "Mostly used the wrong method", 63],
];

// Each student's own practice, from their real marks on this test.
const STUDENTS = [
  { name: "Archie Brown", score: "8/12", miss: ["Trigonometric ratios", "Finding unknown side lengths", "Solving for the denominator"], ext: "Finding unknown angles" },
  { name: "Mia Kowalski", score: "7/12", miss: ["Finding unknown side lengths", "Solving for the denominator", "Finding the shorter sides"], ext: "Using Pythagoras in problems" },
  { name: "Henry Walsh", score: "6/12", miss: ["Pythagoras’ theorem", "Finding the shorter sides", "Finding unknown angles"], ext: "Trigonometric ratios" },
];

// Where each moving piece sits at each step: x, y (top left), scale, rotate, opacity.
const P = (x, y, s = 1, r = 0, o = 1) => ({ x, y, s, r, o });
const POSE = {
  back1: [P(372, 70, 1, -6), P(640, 30, 0.62, -3), P(700, 190, 0.2, 0, 0), P(700, 190, 0.2, 0, 0)],
  back2: [P(386, 64, 1, 4), P(650, 26, 0.62, 2), P(700, 190, 0.2, 0, 0), P(700, 190, 0.2, 0, 0)],
  paper: [P(398, 54), P(660, 20, 0.62), P(704, 214, 0.14, 0, 0), P(300, 62, 1.02), P(40, -330, 2.1), P(330, 140, 0.4, 0, 0)],
  copier: [P(1060, 210, 1, 0, 0), P(580, 210), P(40, 300, 0.62), P(-420, 300, 0.62, 0, 0)],
  laptop: [P(250, 700, 0.8, 0, 0), P(250, 700, 0.8, 0, 0), P(390, 60, 0.92), P(230, 26, 1.12), P(532, 80, 0.74), P(190, 40, 1.0), P(380, 420, 0.3, 0, 0), P(360, 236, 0.56), P(360, 700, 0.5, 0, 0)],
};
const poseAt = (key, i) => { const a = POSE[key]; return a[Math.min(i, a.length - 1)]; };
const style = (p) => ({ transform: `translate(${p.x}px, ${p.y}px) rotate(${p.r}deg) scale(${p.s})`, opacity: p.o });

function Laptop({ step }) {
  return (
    <div className="hw-laptop">
      <div className="hw-laptop__screen">
        <div className="hw-app">
          <div className="hw-app__side"><i className="hw-app__logo" /><span /><span /><span /></div>
          <div className="hw-app__main">
            <div className={`hw-view${step === 2 ? " is-on" : ""}`}>
              <p className="hw-app__title">9B Maths · Pythagoras and trigonometry test</p>
              <p className="hw-app__sub">Scanned 2 Nov · 19 of 19 papers matched</p>
              <div className="hw-roster">
                {ROSTER.map((n, i) => <span key={n} style={{ "--i": i }}><b>{initials(n)}</b>{n.split(" ")[0]}</span>)}
              </div>
            </div>
            <div className={`hw-view${step === 3 ? " is-on" : ""}`}>
              <div className="hw-paperhead"><p className="hw-app__title">Archie’s paper</p><b className="hw-score">8 / 12</b></div>
              <div className="hw-qrow hw-qrow--h"><span>Q</span><span>Mark</span></div>
              {MARKS.map((m, i) => (
                <div key={m.q} className="hw-qrow" style={{ "--i": i }}>
                  <span>Q{m.q}</span>
                  <span className={m.got === m.of ? "hw-ok" : m.got === 0 ? "hw-no" : "hw-part"}>{m.got === m.of ? "✓" : m.got === 0 ? "✗" : "½"} {m.got}/{m.of}</span>
                </div>
              ))}
              <div className="hw-passes">
                <span style={{ "--i": 0 }}>1st mark ✓</span><span style={{ "--i": 1 }}>2nd mark ✓</span><span style={{ "--i": 2 }}>Blind check ✓</span>
              </div>
            </div>
            <div className={`hw-view${step === 4 ? " is-on" : ""}`}>
              <p className="hw-app__sub">Archie Brown · Pythagoras and trigonometry test</p>
              <p className="hw-review__q">Question 7 · Is 1 of 2 right?</p>
              <div className="hw-two">
                <div className="hw-ans"><small>Archie wrote</small><em>x = 10.4</em></div>
                <div className="hw-ans hw-ans--ok"><small>Answer</small><strong>x = 10.4</strong></div>
              </div>
              <p className="hw-reason"><b>Why:</b> No working shown: the method mark needs the working</p>
              <div className="hw-marks"><span>0</span><span className="is-on">1</span><span>2</span></div>
              <span className="hw-btn">Confirm and next</span>
            </div>
            <div className={`hw-view${step === 5 ? " is-on" : ""}`}>
              <p className="hw-app__title">Topics to reteach</p>
              <p className="hw-app__sub">9B Maths · lowest class scores first</p>
              {RETEACH.map(([t, why, pct], i) => (
                <div key={t} className="hw-topic" style={{ "--i": i }}>
                  <div><b>{t}</b><small>{why}</small></div>
                  <span className="hw-topic__bar"><i style={{ "--w": `${pct}%` }} /></span>
                  <span className="hw-topic__pct">{pct}%</span>
                </div>
              ))}
              <p className="hw-tip">Worth going over Q7 in class: 12 of 19 lost marks on it.</p>
            </div>
            <div className={`hw-view${step === 7 ? " is-on" : ""}`}>
              <p className="hw-url">study.tuterly.com.au</p>
              <p className="hw-app__title">Your practice · Archie</p>
              <p className="hw-app__sub">From your Pythagoras and trigonometry test</p>
              <div className="hw-prac"><b>Solving for the denominator</b><span>3 questions</span></div>
              <div className="hw-prac"><b>Trigonometric ratios</b><span>3 questions</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="hw-laptop__base" />
    </div>
  );
}

function Stage({ step }) {
  const at = (k) => style(poseAt(k, step));
  return (
    <div className="hw-stage__inner">
      <div className={`hw-desk${step <= 1 ? " is-on" : ""}`} />

      {/* Scene labels that belong to one step */}
      <div className={`hw-tags${step === 0 ? " is-on" : ""}`}>
        <span className="hw-tag hw-tag--dark">Any test or exam</span><span className="hw-tag">Topic tests</span><span className="hw-tag">End-of-term exams</span><span className="hw-tag">Textbook tests</span>
      </div>
      <div className={`hw-tags${step === 1 ? " is-on" : ""}`}>
        <span className="hw-tag hw-tag--dark">Any copier or scanner</span><span className="hw-tag hw-tag--ok">Free set-up</span><span className="hw-tag">Or a Tuterly copier, ready to go</span>
      </div>
      <span className={`hw-chip hw-chip--scan${step === 1 || step === 2 ? " is-on" : ""}`}>Scan to: 9b-maths@scan.tuterly.com.au</span>
      <span className={`hw-chip hw-chip--secure${step === 2 ? " is-on" : ""}`}>Stored securely · back in about 10 minutes</span>

      {/* The copier */}
      <div className="hw-move" style={at("copier")}>
        <div className="hw-copier">
          <div className="hw-copier__lid" />
          <div className="hw-copier__body"><span className={`hw-copier__light${step === 1 ? " is-on" : ""}`} /><span className="hw-copier__panel"><i /></span><span className="hw-copier__slot" /></div>
          <div className={`hw-copier__out${step === 1 ? " is-on" : ""}`}>
            {[0, 1, 2, 3].map((i) => <img key={i} src={`/teachers/demo/scan-${["2102", "2107", "2112", "2102"][i]}.jpg`} alt="" style={{ "--i": i }} />)}
          </div>
        </div>
      </div>

      {/* Pages flying from the copier to the laptop */}
      <div className={`hw-fly${step === 2 ? " is-on" : ""}`}>
        {[0, 1, 2, 3, 4, 5].map((i) => <img key={i} src={`/teachers/demo/scan-${["2102", "2107", "2112"][i % 3]}.jpg`} alt="" style={{ "--i": i }} />)}
      </div>

      {/* The laptop running the marking app */}
      <div className="hw-move hw-move--laptop" style={at("laptop")}><Laptop step={step} /></div>

      {/* Archie's paper and the class set behind it */}
      <div className="hw-move" style={at("back1")}><img className="hw-sheet" src="/teachers/demo/scan-2107.jpg" alt="" /></div>
      <div className="hw-move" style={at("back2")}><img className="hw-sheet" src="/teachers/demo/scan-2102.jpg" alt="" /></div>
      <div className="hw-move hw-move--paper" style={at("paper")}>
        <div className={`hw-paper${step === 1 ? " is-feeding" : ""}${step >= 3 ? " is-marked" : ""}${step === 4 ? " is-zoom" : ""}`}>
          <img className="hw-sheet hw-sheet--top" src="/teachers/demo/archie-brown-pythagoras.jpg" alt="" />
          {MARKS.map((m, i) => (
            <span key={m.q} className={`hw-mark ${m.got === m.of ? "hw-mark--ok" : m.got === 0 ? "hw-mark--no" : "hw-mark--part"}${m.q === 7 ? " hw-mark--q7" : ""}`} style={{ top: `${(m.y + m.h / 2) * 100}%`, "--i": i }}>
              {m.got === m.of ? "✓" : m.got === 0 ? "✗" : `${m.got}/${m.of}`}
            </span>
          ))}
          <span className="hw-q7box" style={{ top: `${MARKS[6].y * 100}%`, height: `${MARKS[6].h * 100}%` }} />
        </div>
      </div>

      {/* Practice for each student */}
      {STUDENTS.map((st, i) => (
        <div key={st.name} className={`hw-student hw-student--${i}${step === 6 ? " is-on" : step === 7 ? " is-gone" : ""}`} style={{ "--i": i }}>
          <div className="hw-student__head"><b>{st.name}</b><span>{st.score}</span></div>
          {st.miss.map((t) => <span key={t} className="hw-pchip hw-pchip--miss">{t} · 3 Qs</span>)}
          <span className="hw-pchip hw-pchip--ok">Extension: {st.ext}</span>
        </div>
      ))}

      {/* Released: phone, laptop, paper */}
      <span className={`hw-chip hw-chip--released${step === 7 ? " is-on" : ""}`}>All 19 papers released · students notified just now</span>
      <div className={`hw-phone${step === 7 ? " is-on" : ""}`}>
        <img src="/app-screens/flow-exam-zone/07-fix-what-you-missed.png" alt="" />
      </div>
      <div className={`hw-print${step === 7 ? " is-on" : ""}`}>
        <b>Archie’s revision sheet</b>
        <small>Solving for the denominator</small><i /><i /><i className="hw-print__box" />
        <small>Trigonometric ratios</small><i /><i />
      </div>
      <div className={`hw-devlabels${step === 7 ? " is-on" : ""}`}><span>Tuterly app</span><span>study.tuterly.com.au</span><span>Printed</span></div>

      {/* The term so far */}
      <div className={`hw-chart${step === 8 ? " is-on" : ""}`}>
        <div className="hw-chart__head"><b>9B Maths · class average</b><small>Demo class</small></div>
        <svg viewBox="0 0 420 200" role="img" aria-label="Class average: 72% on 5 Oct, 74% on 19 Oct, 79% on 2 Nov">
          <line x1="40" y1="170" x2="400" y2="170" stroke="#d5dee5" />
          <polyline className="hw-chart__line" points="70,122 210,108 350,73" fill="none" stroke="#0e9fbf" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          {[[70, 122, "72%", "Indices, 5 Oct"], [210, 108, "74%", "Algebra, 19 Oct"], [350, 73, "79%", "Pythagoras, 2 Nov"]].map(([x, y, v, l]) => (
            <g key={l}><circle cx={x} cy={y} r="8" fill="#0e9fbf" /><text x={x} y={y - 18} textAnchor="middle" fontSize="18" fontWeight="800" fill="#0b1a2c">{v}</text><text x={x} y="194" textAnchor="middle" fontSize="13" fill="#5b6677">{l}</text></g>
          ))}
        </svg>
      </div>

      <span className="hw-demo">Tuterly Demo College · invented students</span>
    </div>
  );
}

export default function HowItWorks({ demoHref }) {
  const wrap = useRef(null);
  const stageBox = useRef(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const stepHeight = () => window.innerHeight * 0.85;
  const go = useCallback((i) => {
    const el = wrap.current;
    if (!el) return;
    const n = Math.max(0, Math.min(N - 1, i));
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + n * stepHeight() + 2, behavior: "smooth" });
  }, []);

  // Which step is showing, from how far the story has scrolled.
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const i = Math.floor(-el.getBoundingClientRect().top / stepHeight() + 0.4);
      setStep(Math.max(0, Math.min(N - 1, i)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    measure();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // Fit the 1000 x 600 stage to the space it has.
  useEffect(() => {
    const el = stageBox.current;
    if (!el) return;
    // Phones crop the stage's empty edges a little so the content is bigger.
    const fit = () => {
      const w = el.clientWidth < 600 ? 820 : 1000;
      el.style.setProperty("--k", String(Math.min(el.clientWidth / w, el.clientHeight / 600)));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Play: one step every 4 seconds, stopping at the end.
  useEffect(() => {
    if (!playing) return;
    if (step >= N - 1) { setPlaying(false); return; }
    const t = setTimeout(() => go(step + 1), 4000);
    return () => clearTimeout(t);
  }, [playing, step, go]);

  // Arrow keys and Page Up/Down step through while the story is on screen.
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
      const r = wrap.current?.getBoundingClientRect();
      if (!r || r.top > 10 || r.bottom < window.innerHeight) return;
      if (["ArrowRight", "ArrowDown", "PageDown"].includes(e.key)) { e.preventDefault(); go(step + 1); }
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); go(step - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, go]);

  const play = () => {
    if (playing) { setPlaying(false); return; }
    if (step >= N - 1) go(0);
    else if ((wrap.current?.getBoundingClientRect().top ?? 1) > 0) go(step);
    setPlaying(true);
  };

  return (
    <>
      <section className="hw-hero" aria-labelledby="hw-title">
        <p className="hw-eyebrow">Tuterly for Teachers · How it works</p>
        <h1 id="hw-title">Paper tests become customised questions for every student.</h1>
        <p className="hw-lead">Follow one real class test from the copier to each student’s phone, in nine steps. Every screen here comes from our demo class.</p>
        <div className="hw-hero__btns">
          <button type="button" className="tb-btn tb-btn--primary" onClick={() => { go(0); setPlaying(true); }}>Play the demo</button>
          <a href={demoHref} className="tb-btn tb-btn--secondary">Book a demo</a>
        </div>
        <button type="button" className="hw-scrollcue" onClick={() => go(0)}>
          <span className="hw-mouse" aria-hidden="true"><i /></span>
          <span className="hw-scrollcue__t">Keep scrolling down</span>
          <span className="hw-scrollcue__s">to follow a class test through all 9 steps</span>
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </section>

      <div ref={wrap} className="hw-wrap" style={{ "--n": N }}>
        <div className="hw-pin">
          <div className="hw-progress" aria-hidden="true"><i style={{ width: `${((step + 1) / N) * 100}%` }} /></div>
          <div className="hw-top">
            <p className="hw-count"><b>{step + 1}</b> of {N}</p>
            <div className="hw-caps" aria-live="polite">
              {STEPS.map((st, i) => (
                <div key={i} className={`hw-cap${i === step ? " is-on" : i < step ? " is-past" : ""}`} aria-hidden={i !== step}>
                  <h2>{st.t}</h2>
                  <p>{st.s}</p>
                </div>
              ))}
            </div>
          </div>
          <div ref={stageBox} className="hw-stage" aria-hidden="true">
            <div className="hw-stage__scale"><Stage step={step} /></div>
            <span className={`hw-keep${step < 2 && !playing ? " is-on" : ""}`}>Keep scrolling down
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </div>
          <div className="hw-controls">
            <button type="button" className="hw-ctl" onClick={() => go(step - 1)} disabled={step === 0} aria-label="Back">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" className="hw-ctl hw-ctl--play" onClick={play} aria-label={playing ? "Pause" : "Play"}>
              {playing
                ? <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                : <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M8 5l11 7-11 7z" fill="currentColor" /></svg>}
              <span>{playing ? "Pause" : "Play"}</span>
            </button>
            <div className="hw-dots" role="group" aria-label="Jump to a step">
              {STEPS.map((_, i) => <button key={i} type="button" className={i === step ? "is-on" : i < step ? "is-done" : ""} onClick={() => go(i)} aria-label={`Step ${i + 1}`} />)}
            </div>
            <button type="button" className="hw-ctl hw-ctl--next" onClick={() => go(step + 1)} disabled={step === N - 1}>
              <span>Next</span>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <a href={demoHref} className="tb-btn tb-btn--primary hw-book">Book a demo</a>
          </div>
        </div>
      </div>
    </>
  );
}

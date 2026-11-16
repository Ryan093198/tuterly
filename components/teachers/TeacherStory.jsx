"use client";

import { useEffect, useRef, useState } from "react";
import "./teacher-story.css";

// Tuterly for Teachers as a scroll story (storyboard agreed with Ryan, 16 Nov
// 2026): a class test goes from paper to practice for every student in nine
// steps. On wide screens the section pins and each scroll step plays the next
// scene; on phones, and with reduced motion, it's a plain list of cards.
// Numbers in the pictures are labelled example data until a real class's are in.
const STEPS = [
  { t: "Any test or exam your class sits on paper.", s: "Your school’s own tests, end-of-term exams, textbook tests. It doesn’t have to come from Tuterly." },
  { t: "Scan on any school copier or scanner.", s: "We set up your school’s copier free of charge, or supply a Tuterly copier that arrives ready to go." },
  { t: "Every page is matched to the right student.", s: "Each class has its own scan address. Pages sort into place as they arrive, and are stored securely." },
  { t: "Every answer marked twice, with a blind check.", s: "Anything Tuterly isn’t sure about is flagged for you to look at." },
  { t: "You check the flagged ones and approve.", s: "One decision at a time, on a laptop or your phone. Nothing reaches students until you approve." },
  { t: "See what to reteach, by topic.", s: "The class’s weakest topics come first, with the mistakes behind them." },
  { t: "Every student gets practice on their own weak topics.", s: "Not one worksheet for the whole class: a different set for every student, each with worked solutions." },
  { t: "Approve, and every student has it instantly.", s: "In the Tuterly app, at study.tuterly.com.au, or printed for class." },
  { t: "A follow-up quiz shows the gap closing.", s: "Then the next test starts the loop again." },
];

const TILES = ["AB", "CL", "DM", "EK", "FN", "GH", "JP", "KT", "LS", "MW", "NR", "OB", "PS", "RT", "SV"];
const TICKS = [["✓", "ok"], ["✓", "ok"], ["✗", "no"], ["✓", "ok"], ["Check", "flag"], ["✗", "no"], ["✓", "ok"], ["✓", "ok"], ["2/3", "ok"], ["✓", "ok"]];
const BARS = [["Index laws", 42, "weak"], ["Linear equations", 55, "weak"], ["Pythagoras", 71, ""], ["Ratios and rates", 88, "good"]];
const STUDENTS = [
  ["Student A", [["Index laws · 3 Qs", "miss"], ["Linear equations · 3 Qs", "miss"], ["Ratios · stretch", "ok"]]],
  ["Student B", [["Pythagoras · 3 Qs", "miss"], ["Index laws · stretch", "ok"], ["Linear eq. · stretch", "ok"]]],
  ["Student C", [["Linear equations · 3 Qs", "miss"], ["Ratios · 3 Qs", "miss"], ["Pythagoras · 3 Qs", "miss"]]],
];

function Scene({ n }) {
  switch (n) {
    case 0:
      return (
        <div className="ts-sc ts-sc--paper">
          <div className="ts-tags">
            <span className="ts-tag ts-tag--dark">Any test or exam</span>
            <span className="ts-tag">Topic tests</span>
            <span className="ts-tag">End-of-term exams</span>
            <span className="ts-tag">Textbook tests</span>
          </div>
          <div className="ts-stack">
            <div className="ts-sheet ts-sheet--a" />
            <div className="ts-sheet ts-sheet--b" />
            <div className="ts-sheet ts-sheet--top">
              <b>Your school’s own test</b>
              <span className="ts-name">Name <i /></span>
              <i className="ts-line" style={{ width: "90%" }} /><i className="ts-line" style={{ width: "70%" }} />
              <i className="ts-box" /><i className="ts-line" style={{ width: "85%" }} /><i className="ts-box" />
            </div>
          </div>
          <span className="ts-count">25 papers</span>
        </div>
      );
    case 1:
      return (
        <div className="ts-sc">
          <div className="ts-tags">
            <span className="ts-tag ts-tag--dark">Any copier or scanner</span>
            <span className="ts-tag ts-tag--ok">Free set-up</span>
            <span className="ts-tag">Or a Tuterly copier, ready to go</span>
          </div>
          <div className="ts-copier">
            <div className="ts-copier__feed"><i /><i /></div>
            <div className="ts-copier__lid" />
            <div className="ts-copier__body"><span className="ts-copier__scan" /><span className="ts-copier__panel"><i /></span></div>
          </div>
          <span className="ts-count ts-count--wide">Scan to: 8b-maths@scan.tuterly.com.au</span>
        </div>
      );
    case 2:
      return (
        <div className="ts-sc">
          <div className="ts-laptop">
            <div className="ts-laptop__screen">
              <b>8B · Topic test · 25 of 25 matched</b>
              <div className="ts-tiles">
                {TILES.map((x, i) => <span key={x} style={{ "--i": i }}>{x}</span>)}
              </div>
              <small>Pages sort into place as they arrive</small>
            </div>
            <div className="ts-laptop__base" />
          </div>
          <span className="ts-count ts-count--left">Stored securely</span>
        </div>
      );
    case 3:
      return (
        <div className="ts-sc ts-sc--row">
          {[0, 5].map((start) => (
            <div key={start} className="ts-marked">
              <b>{`Q${start + 1} – Q${start + 5}`}</b>
              {TICKS.slice(start, start + 5).map(([m, k], i) => (
                <span key={i} className={`ts-mrow ts-mrow--${k}`} style={{ "--i": start + i }}><i /><em>{m}</em></span>
              ))}
            </div>
          ))}
          <div className="ts-checks">
            <span style={{ "--i": 0 }}>1st mark ✓</span>
            <span style={{ "--i": 1 }}>2nd mark ✓</span>
            <span style={{ "--i": 2 }}>Blind check ✓</span>
            <span style={{ "--i": 3 }} className="ts-checks--flag">1 flagged for you</span>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="ts-sc">
          <div className="ts-card ts-approve">
            <small>8B · Topic test · 1 to check</small>
            <b className="ts-approve__q">Is question 4 right?</b>
            <div className="ts-two">
              <div className="ts-ans"><small>Student wrote</small><em>x = 7.50</em></div>
              <div className="ts-ans ts-ans--ok"><small>Correct answer</small><strong>x = 7.5</strong></div>
            </div>
            <div className="ts-two">
              <span className="ts-pill">Wrong</span>
              <span className="ts-pill ts-pill--on">Right</span>
            </div>
            <span className="ts-pill ts-pill--dark">Approve and release to 8B</span>
          </div>
        </div>
      );
    case 5:
      return (
        <div className="ts-sc">
          <div className="ts-card ts-bars">
            <div className="ts-card__head"><b>8B · Topics to reteach</b><small>Example data</small></div>
            {BARS.map(([name, pct, k], i) => (
              <div key={name} className="ts-bar" style={{ "--i": i }}>
                <span>{name}</span>
                <span className="ts-bar__track"><i className={`ts-bar__fill ts-bar__fill--${k}`} style={{ "--w": `${pct}%` }} /></span>
                <span className={k === "weak" ? "ts-bar__pct ts-bar__pct--weak" : "ts-bar__pct"}>{pct}%</span>
              </div>
            ))}
            <p className="ts-note">Reteach first: index laws. Most marks went on multiplying powers with the same base.</p>
          </div>
        </div>
      );
    case 6:
      return (
        <div className="ts-sc ts-sc--row">
          {STUDENTS.map(([name, tags], i) => (
            <div key={name} className="ts-card ts-student" style={{ "--i": i }}>
              <b>{name}</b>
              {tags.map(([t, k]) => <span key={t} className={`ts-chip ts-chip--${k}`}>{t}</span>)}
            </div>
          ))}
        </div>
      );
    case 7:
      return (
        <div className="ts-sc ts-sc--devices">
          <span className="ts-released">Approved · released to 8B just now</span>
          <div className="ts-phone" style={{ "--i": 0 }}>
            <div>
              <small className="ts-brand">Tuterly</small>
              <span className="ts-msg">New from your teacher: your marked test</span>
              <span className="ts-msg ts-msg--warn">6 questions to fix</span>
              <span className="ts-pill ts-pill--on ts-pill--sm">Start</span>
            </div>
          </div>
          <div className="ts-laptop ts-laptop--sm" style={{ "--i": 1 }}>
            <div className="ts-laptop__screen">
              <small className="ts-url">study.tuterly.com.au</small>
              <b>Your practice: Index laws</b>
              <i className="ts-line" style={{ width: "80%" }} /><i className="ts-line" style={{ width: "60%" }} /><i className="ts-box" />
            </div>
            <div className="ts-laptop__base" />
          </div>
          <div className="ts-sheet ts-sheet--print" style={{ "--i": 2 }}>
            <b>Printed sheet</b>
            <i className="ts-line" style={{ width: "90%" }} /><i className="ts-line" style={{ width: "70%" }} /><i className="ts-box" />
          </div>
        </div>
      );
    default:
      return (
        <div className="ts-sc ts-sc--col">
          <div className="ts-loop">
            <span>Test</span><em>→</em><span>Marked</span><em>→</em><span>Practice</span><em>→</em><span className="ts-loop--on">Follow-up quiz</span>
          </div>
          <div className="ts-card ts-bars ts-bars--sm">
            <div className="ts-card__head"><b>Index laws, class average</b><small>Example data</small></div>
            <div className="ts-bar" style={{ "--i": 0 }}><span>Topic test</span><span className="ts-bar__track"><i className="ts-bar__fill ts-bar__fill--weak" style={{ "--w": "42%" }} /></span></div>
            <div className="ts-bar" style={{ "--i": 1 }}><span>Follow-up</span><span className="ts-bar__track"><i className="ts-bar__fill ts-bar__fill--good" style={{ "--w": "78%" }} /></span></div>
          </div>
        </div>
      );
  }
}

export default function TeacherStory({ demoHref }) {
  const wrap = useRef(null);
  const stage = useRef(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 900px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const step = window.innerHeight * 0.7;
      const i = Math.floor(-el.getBoundingClientRect().top / step + 0.35);
      setActive(Math.max(0, Math.min(STEPS.length - 1, i)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    const setup = () => {
      const on = wide.matches && !still.matches;
      setPinned(on);
      window.removeEventListener("scroll", onScroll);
      if (on) { window.addEventListener("scroll", onScroll, { passive: true }); measure(); }
    };
    setup();
    wide.addEventListener("change", setup);
    still.addEventListener("change", setup);
    return () => {
      window.removeEventListener("scroll", onScroll);
      wide.removeEventListener("change", setup);
      still.removeEventListener("change", setup);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Scale the 560 x 340 scenes to fit the stage.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const fit = () => el.style.setProperty("--k", String(Math.min(1, (el.clientWidth - 24) / 560, (el.clientHeight - 24) / 340)));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [pinned]);

  // Jump to a step from the progress dots.
  const go = (i) => {
    const el = wrap.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY + i * window.innerHeight * 0.7 + 4;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (!pinned) {
    return (
      <ol className="ts-list" aria-label="How Tuterly for Teachers works">
        {STEPS.map((st, i) => (
          <li key={i} className="ts-item is-on">
            <div className="ts-item__vis"><Scene n={i} /></div>
            <p className="ts-step">Step {i + 1} of {STEPS.length}</p>
            <p className="ts-t">{st.t}</p>
            <p className="ts-s">{st.s}</p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div ref={wrap} className="ts-wrap" style={{ "--n": STEPS.length }}>
      <div className="ts-pin">
        <div className="ts-copy">
          <p className="ts-step">Step {active + 1} of {STEPS.length}</p>
          {STEPS.map((st, i) => (
            <div key={i} className={`ts-cap${i === active ? " is-on" : ""}`} aria-hidden={i !== active}>
              <p className="ts-t">{st.t}</p>
              <p className="ts-s">{st.s}</p>
            </div>
          ))}
          <div className="ts-dots" role="group" aria-label="Jump to a step">
            {STEPS.map((_, i) => (
              <button key={i} type="button" className={i === active ? "is-on" : i < active ? "is-done" : ""} onClick={() => go(i)} aria-label={`Step ${i + 1}`} />
            ))}
          </div>
          <a href={demoHref} className="tb-btn tb-btn--primary ts-demo">Book a demo</a>
        </div>
        <div ref={stage} className="ts-stage" aria-hidden="true">
          {STEPS.map((_, i) => (
            <div key={i} className={`ts-scene${i === active ? " is-on" : i < active ? " is-past" : ""}`}><Scene n={i} /></div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { checkAnswer } from "@/lib/answer-check";
import { trackEvent } from "@/lib/analytics";

// "Your turn" on a topic page: type an answer, it's marked, then the
// hint or solution, then the app. The question, hint, answer and solution
// arrive already rendered (maths and all) from the server component.
const PLACEHOLDER = {
  number: "Your answer",
  values: "Your answers, separated by commas",
  expression: "Your answer, e.g. 3x^2 + 2x - 5",
};

export default function TurnChecker({ slug, topic, kind, accept, question, hint, answer, solution }) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null); // null | "right" | "wrong" | "unreadable"
  const [tries, setTries] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onCheck(e) {
    e.preventDefault();
    if (!value.trim()) return;
    setBusy(true);
    try {
      const math = await import("mathjs");
      const r = checkAnswer(math, kind, accept, value);
      const state = r.ok === true ? "right" : r.ok === false ? "wrong" : "unreadable";
      setResult(state);
      if (state !== "unreadable") setTries((t) => t + 1);
      if (state === "right") setShowSolution(true);
      trackEvent("turn_check", { slug, result: state });
    } finally {
      setBusy(false);
    }
  }

  const unit = accept?.unit ? ` (in ${accept.unit})` : "";
  return (
    <div className="wx-card wx-practice tc">
      {question}
      <form className="tc__form" onSubmit={onCheck}>
        <label className="tc__label" htmlFor={`tc-${slug}`}>Your answer{unit}</label>
        <div className="tc__row">
          <input
            id={`tc-${slug}`}
            className="tc__input"
            inputMode={kind === "expression" ? "text" : "decimal"}
            autoComplete="off"
            spellCheck={false}
            placeholder={PLACEHOLDER[kind] || "Your answer"}
            value={value}
            onChange={(e) => { setValue(e.target.value); if (result) setResult(null); }}
          />
          <button className="tc__btn" type="submit" disabled={busy || !value.trim()}>Check</button>
        </div>
      </form>

      {result === "right" && (
        <p className="tc__msg tc__msg--right" role="status">Correct. Nice work.</p>
      )}
      {result === "wrong" && (
        <p className="tc__msg tc__msg--wrong" role="status">
          Not quite. {tries < 2 ? "Have another go, or open the hint." : "Open the worked solution to see where it went wrong."}
        </p>
      )}
      {result === "unreadable" && (
        <p className="tc__msg" role="status">We couldn’t read that answer. Type a number{kind === "values" ? "s separated by commas" : kind === "expression" ? " or an expression like 2x + 3" : ""}.</p>
      )}

      <div className="tc__links">
        {hint && !showHint && result !== "right" && (
          <button type="button" className="tc__link" onClick={() => { setShowHint(true); trackEvent("turn_hint", { slug }); }}>Show a hint</button>
        )}
        {!showSolution && (
          <button type="button" className="tc__link" onClick={() => { setShowSolution(true); trackEvent("turn_show_solution", { slug, tries }); }}>Show the worked solution</button>
        )}
      </div>
      {showHint && hint && <div className="tc__hint"><strong>Hint:</strong> {hint}</div>}
      {showSolution && (
        <div className="tc__solution">
          {answer && <div className="tc__answer"><strong>Answer:</strong> {answer}</div>}
          {solution}
        </div>
      )}

      {(result === "right" || result === "wrong" || showSolution) && (
        <div className={`tc__next ${result === "right" ? "is-right" : ""}`}>
          <p className="tc__next-title">
            {result === "right" ? "Want harder ones?" : `Practise ${topic.toLowerCase()} until it sticks.`}
          </p>
          <p className="tc__next-text">
            {result === "right"
              ? "In the Tuterly app, every question they master unlocks a harder one, and Test any topic checks every part of the topic before a school test."
              : "In the Tuterly app, snap the questions they get wrong and get a fresh one on the same idea, again and again, until it’s mastered."}
          </p>
          <div className="tc__next-btns">
            <Link href="/#get-app" className="tc__cta" onClick={() => trackEvent("turn_cta_click", { slug, to: "app", result: result || "solution" })}>
              Sign up early for a free trial
            </Link>
            <Link href="/try" className="tc__cta2" onClick={() => trackEvent("turn_cta_click", { slug, to: "try", result: result || "solution" })}>
              Try it free on a question they got wrong →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

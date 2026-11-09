"use client";

import { useState } from "react";
import Link from "next/link";
import "katex/dist/katex.min.css";
import "./maths.css";
import { parseNum, stepHtml, gcd } from "./calc-utils";
import { trackEvent } from "@/lib/analytics";

// Factorises ax² + bx + c (integer coefficients) with working: common
// factor first, then "two numbers that multiply to … and add to …", with
// splitting the middle term for non-monic quadratics. Plain arithmetic (no AI).

// LaTeX for a coefficient times a term: 1x → x, -1x → -x.
function term(k, v, first) {
  const sign = k < 0 ? "-" : first ? "" : "+";
  const abs = Math.abs(k);
  const body = v ? (abs === 1 ? v : `${abs}${v}`) : String(abs);
  return first ? `${sign}${body}` : ` ${sign} ${body}`;
}
export function polyTex(cs, vars) {
  // cs and vars line up: [a, b, c] with ["x^2", "x", ""].
  let out = "";
  cs.forEach((k, i) => {
    if (k === 0) return;
    out += term(k, vars[i], out === "");
  });
  return out || "0";
}
const lin = (p, q) => polyTex([p, q], ["x", ""]);
const quad = (a, b, c) => polyTex([a, b, c], ["x^2", "x", ""]);
const num = (k) => (k < 0 ? `(${k})` : String(k));
const front = (g) => (g === 1 ? "" : g === -1 ? "-" : String(g));

// Two integers that multiply to P and add to S, or null.
function pairFor(P, S) {
  if (P === 0) return [0, S];
  const m = Math.abs(P);
  for (let i = 1; i * i <= m; i++) {
    if (m % i) continue;
    const j = m / i;
    for (const [p, q] of [[i, j], [-i, -j], [i, -j], [-i, j]]) {
      if (p * q === P && p + q === S) return [p, q];
    }
  }
  return null;
}
function factorPairs(P) {
  const m = Math.abs(P), out = [];
  for (let i = 1; i * i <= m; i++) if (m % i === 0) out.push(`${i} \\times ${m / i}`);
  return out;
}

export function factorise(av, bv, cv) {
  const nums = [av, bv, cv].map((x) => parseNum(String(x ?? "").replace(/[−–]/g, "-")));
  if (nums.some((x) => x === null)) return { error: "Enter a, b and c. Use 0 for a missing term." };
  if (nums.some((x) => Number.isNaN(x) || !Number.isInteger(x))) return { error: "Enter whole numbers only, like 2, -5 or 0." };
  const [a, b, c] = nums;
  if (a === 0) return { error: "a can't be 0, or it isn't a quadratic. For bx + c, take out the common factor." };
  if (nums.some((x) => Math.abs(x) > 100000)) return { error: "Keep the numbers between -100000 and 100000." };

  const steps = [];
  const start = quad(a, b, c);
  // 1. Common factor (negative if the x² term is negative).
  let g = gcd(gcd(a, b), c);
  if (a < 0) g = -g;
  const A = a / g, B = b / g, C = c / g;
  if (g !== 1) {
    steps.push(`Take out the common factor${g < 0 ? " (a negative one, so the $x^2$ term is positive)" : ""}: $${start} = ${front(g)}(${quad(A, B, C)})$`);
  } else {
    steps.push(`Look for a common factor: the HCF of ${a}, ${b} and ${c} is 1, so there isn't one to take out.`);
  }
  const pre = front(g);
  const wrap = (inner) => `${pre}${inner}`;

  // 2. c = 0: x is a common factor too.
  if (C === 0) {
    if (B === 0) {
      const ans = `${pre === "" ? "" : pre}${A === 1 ? "" : A}x^2`;
      steps.push(`There's only one term, so this is fully factorised: $${ans}$`);
      return { answer: ans, steps, ok: true };
    }
    const ans = `${pre}x(${lin(A, B)})`;
    steps.push(`Every term has an $x$, so take out $x$ as well: $${ans}$`);
    steps.push(`Check by expanding: $${ans} = ${start}$`);
    return { answer: ans, steps, ok: true };
  }

  const P = A * C;
  const disc = B * B - 4 * A * C;
  const pair = pairFor(P, B);
  if (!pair) {
    const pairs = factorPairs(P);
    if (pairs.length && pairs.length <= 10) steps.push(`Factor pairs of ${Math.abs(P)}: $${pairs.join(",\\ ")}$`);
    steps.push(`No pair of whole numbers multiplies to $${P}$ and adds to $${B}$.`);
    steps.push(`Check with the discriminant: $\\Delta = b^2 - 4ac = ${num(B)}^2 - 4 \\times ${num(A)} \\times ${num(C)} = ${disc}$. ${disc < 0 ? "It's negative, so the quadratic has no real roots and can't be factorised over the real numbers." : "It isn't a perfect square, so the quadratic doesn't factorise using whole numbers (it can be factorised using surds, by completing the square)."}`);
    return { answer: `$${start}$ doesn't factorise over the integers`, steps, ok: false };
  }
  const [p, q] = pair;

  if (A === 1) {
    const pairs = factorPairs(P);
    if (pairs.length <= 10) steps.push(`Find two numbers that multiply to $${P}$ and add to $${B}$. Factor pairs of ${Math.abs(P)}: $${pairs.join(",\\ ")}$`);
    else steps.push(`Find two numbers that multiply to $${P}$ and add to $${B}$.`);
    steps.push(`$${p}$ and $${q}$ work: $${num(p)} \\times ${num(q)} = ${P}$ and $${num(p)} + ${num(q)} = ${B}$`);
    let ans;
    if (p === q) {
      ans = wrap(`(${lin(1, p)})^2`);
      steps.push(`The two numbers are the same, so it's a perfect square: $${ans}$`);
    } else {
      ans = wrap(`(${lin(1, Math.min(p, q))})(${lin(1, Math.max(p, q))})`);
      if (B === 0) steps.push(`This is a difference of two squares, $x^2 - ${Math.abs(p)}^2$.`);
      steps.push(`Write the brackets: $${ans}$`);
    }
    steps.push(`Check by expanding: $${ans} = ${start}$`);
    return { answer: ans, steps, ok: true };
  }

  // Non-monic: split the middle term, then group in pairs.
  steps.push(`Multiply $a \\times c$: $${A} \\times ${num(C)} = ${P}$. Find two numbers that multiply to $${P}$ and add to $${B}$.`);
  steps.push(`$${p}$ and $${q}$ work: $${num(p)} \\times ${num(q)} = ${P}$ and $${num(p)} + ${num(q)} = ${B}$`);
  steps.push(`Split the middle term: $${polyTex([A, p, q, C], ["x^2", "x", "x", ""])}$`);
  const g1 = gcd(A, p); // A > 0, so g1 > 0
  const r = A / g1, s = p / g1; // first pair = g1·x(rx + s)
  const g2 = q / r; // second pair = g2(rx + s)
  const firstPair = `${g1 === 1 ? "" : g1}x(${lin(r, s)})`;
  const secondPair = `${g2 < 0 ? "-" : "+"} ${Math.abs(g2)}(${lin(r, s)})`;
  steps.push(`Factorise each pair: $${firstPair} ${secondPair}$`);
  let ans;
  const b1 = `(${lin(r, s)})`, b2 = `(${lin(g1, g2)})`;
  if (b1 === b2) {
    ans = wrap(`${b1}^2`);
    steps.push(`Both brackets are the same, so it's a perfect square: $${ans}$`);
  } else {
    ans = wrap(`${b1}${b2}`);
    steps.push(`Take out the common bracket: $${ans}$`);
  }
  steps.push(`Check by expanding: $${ans} = ${start}$`);
  return { answer: ans, steps, ok: true, parts: { g, r, s, g1, g2 } };
}

export default function FactoriseCalc({ placement = "factorise_calc" }) {
  const [v, setV] = useState(["1", "-5", "6"]);
  const [res, setRes] = useState(() => factorise("1", "-5", "6"));
  const set = (i) => (e) => setV((old) => old.map((x, j) => (j === i ? e.target.value : x)));
  function go(e) {
    e?.preventDefault();
    const r = factorise(...v);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: "factorise_quadratic", placement });
  }
  return (
    <form className="mx-calc" onSubmit={go} aria-label="Factorising calculator">
      <p className="mx-calc__eq">Factorise <strong>ax² + bx + c</strong></p>
      <div className="mx-calc__row">
        <label>a<input inputMode="numeric" value={v[0]} onChange={set(0)} /></label>
        <label>b<input inputMode="numeric" value={v[1]} onChange={set(1)} /></label>
        <label>c<input inputMode="numeric" value={v[2]} onChange={set(2)} /></label>
      </div>
      <div className="mx-calc__btns"><button type="submit" className="mx-calc__go">Show the working</button></div>
      {res?.error && <p className="mx-calc__err" role="alert">{res.error}</p>}
      {res && !res.error && (
        <div className="mx-calc__out" aria-live="polite">
          <p className="mx-calc__ans" style={{ overflowX: "auto" }} dangerouslySetInnerHTML={{ __html: stepHtml(res.ok ? `$${res.answer}$` : res.answer) }} />
          <ol className="mx-calc__steps">
            {res.steps.map((s, i) => (
              <li key={i} style={{ minWidth: 0, overflowWrap: "anywhere", overflowX: "auto" }} dangerouslySetInnerHTML={{ __html: stepHtml(s) }} />
            ))}
          </ol>
          {!res.ok && (
            <p className="mx-calc__hint">To solve it anyway, use the <Link href="/calculators/quadratic-formula">quadratic formula calculator</Link>.</p>
          )}
        </div>
      )}
      <p className="mx-calc__hint">Whole numbers only. For x² − 5x + 6, enter a = 1, b = −5, c = 6. Use 0 for a missing term.</p>
    </form>
  );
}

"use client";

import { useState } from "react";
import "katex/dist/katex.min.css";
import "./maths.css";
import { parseNum, fmt, fixed, stepHtml, gcd } from "./calc-utils";
import { trackEvent } from "@/lib/analytics";

// Fraction simplifier with working: finds the HCF of the numerator and
// denominator, divides both by it, and writes an improper answer as a
// mixed number too. Plain arithmetic (no AI).

const LIMIT = 1e9;

function factors(n) {
  const out = [];
  for (let i = 1; i <= n; i++) if (n % i === 0) out.push(i);
  return out;
}
// 360 → "2^3 \times 3^2 \times 5"
function primeTex(n) {
  const parts = [];
  let r = n;
  for (let p = 2; p * p <= r; p++) {
    let k = 0;
    while (r % p === 0) { r /= p; k++; }
    if (k) parts.push(k === 1 ? `${p}` : `${p}^{${k}}`);
  }
  if (r > 1) parts.push(String(r));
  return parts.length ? parts.join(" \\times ") : "1";
}
const decimals = (s) => {
  const t = String(s).trim().replace(/,/g, "");
  if (/e/i.test(t)) return 99;
  return (t.split(".")[1] || "").length;
};

function solve(nRaw, dRaw) {
  let num = parseNum(nRaw), den = parseNum(dRaw);
  if (num === null || den === null) return { error: "Enter a numerator (top) and a denominator (bottom)." };
  if (Number.isNaN(num) || Number.isNaN(den)) return { error: "Enter numbers only, like 84 and 126. For a mixed number, change it to an improper fraction first." };
  if (den === 0) return { error: "The denominator can't be 0. A fraction with 0 on the bottom has no value." };
  const steps = [];
  // Clear decimals: multiply top and bottom by a power of 10.
  const places = Math.max(decimals(nRaw), decimals(dRaw));
  if (places > 4) return { error: "Use at most 4 decimal places." };
  if (places > 0) {
    const k = 10 ** places;
    const n2 = Math.round(num * k), d2 = Math.round(den * k);
    steps.push(`Clear the decimals first: multiply top and bottom by $${k}$ to get $\\dfrac{${n2}}{${d2}}$`);
    num = n2; den = d2;
  }
  if (Math.abs(num) > LIMIT || Math.abs(den) > LIMIT) return { error: "Use whole numbers up to 1,000,000,000." };
  // Put any negative sign out the front.
  const neg = num < 0 !== den < 0 && num !== 0;
  const sign = neg ? "-" : "";
  if (den < 0 && num < 0) steps.push("Both numbers are negative. A negative divided by a negative is positive, so drop both signs.");
  else if (den < 0) steps.push("A negative denominator: move the negative sign to the front of the fraction.");
  else if (num < 0) steps.push("Keep the negative sign out the front and simplify the numbers.");
  const a = Math.abs(num), b = Math.abs(den);
  if (a === 0) {
    steps.push("0 divided by anything (except 0) is 0.");
    return { answer: "0", steps };
  }
  const h = gcd(a, b);
  if (Math.max(a, b) <= 100) {
    steps.push(`Factors of $${a}$: ${factors(a).join(", ")}`);
    steps.push(`Factors of $${b}$: ${factors(b).join(", ")}`);
    steps.push(`The highest number in both lists is the HCF: $\\text{HCF} = ${h}$`);
  } else {
    steps.push(`Prime factors: $${a} = ${primeTex(a)}$ and $${b} = ${primeTex(b)}$`);
    steps.push(h === 1
      ? "They share no prime factors, so the HCF is $1$."
      : `Multiply the prime factors they share: $\\text{HCF} = ${primeTex(h)}${primeTex(h).includes("\\times") || primeTex(h).includes("^") ? ` = ${h}` : ""}$`);
  }
  const sn = a / h, sd = b / h;
  const fr = (p, q) => (q === 1 ? `${sign}${p}` : `${sign}\\dfrac{${p}}{${q}}`);
  if (h === 1) {
    steps.push(`The HCF is 1, so $${fr(a, b)}$ is already in simplest form.`);
  } else {
    steps.push(`Divide the top and bottom by $${h}$: $${sign}\\dfrac{${a} \\div ${h}}{${b} \\div ${h}} = ${fr(sn, sd)}$`);
  }
  let answer = sd === 1 ? `${sign}${sn}` : `${sign}${sn}/${sd}`;
  if (sd === 1) {
    steps.push(`The denominator is 1, so the fraction is the whole number $${sign}${sn}$.`);
  } else if (sn > sd) {
    const w = Math.floor(sn / sd), rem = sn % sd;
    steps.push(`It's improper (top bigger than bottom). $${sn} \\div ${sd} = ${w}$ remainder $${rem}$, so it's $${sign}${w}\\tfrac{${rem}}{${sd}}$ as a mixed number.`);
    answer += ` = ${sign}${w} ${rem}/${sd}`;
  }
  const val = (neg ? -1 : 1) * (sn / sd);
  const exact = Math.abs(val * 1e4 - Math.round(val * 1e4)) < 1e-7;
  steps.push(`As a decimal: $${exact ? `${fmt(val, 4)}` : `\\approx ${fixed(val, 4)}`}$${exact ? "" : " (rounded to 4 decimal places)"}`);
  return { answer, hcf: h, steps };
}

export default function FractionCalc({ placement = "fraction_calc" }) {
  const [n, setN] = useState("84");
  const [d, setD] = useState("126");
  const [res, setRes] = useState(() => solve("84", "126"));

  function go(e) {
    e?.preventDefault();
    const r = solve(n, d);
    setRes(r);
    if (!r.error) trackEvent?.("calculator_use", { calculator: "simplify_fraction", placement });
  }

  return (
    <form className="mx-calc" onSubmit={go} aria-label="Simplifying fractions calculator">
      <div className="mx-calc__row">
        <label>Numerator (top)<input inputMode="decimal" value={n} onChange={(e) => setN(e.target.value)} /></label>
        <label>Denominator (bottom)<input inputMode="decimal" value={d} onChange={(e) => setD(e.target.value)} /></label>
      </div>
      <div className="mx-calc__btns"><button type="submit" className="mx-calc__go">Show the working</button></div>
      {res?.error && <p className="mx-calc__err" role="alert">{res.error}</p>}
      {res && !res.error && (
        <div className="mx-calc__out" aria-live="polite">
          <p className="mx-calc__ans">{res.answer}</p>
          <ol className="mx-calc__steps">
            {res.steps.map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: stepHtml(s) }} />)}
          </ol>
        </div>
      )}
      <p className="mx-calc__hint">Enter whole numbers, like 84 over 126. For a ratio like 12 : 18, enter 12 and 18.</p>
    </form>
  );
}

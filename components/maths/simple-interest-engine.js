// Simple interest engine for SimpleInterestCalc.jsx. I = Prt, solved for
// whichever of I, P, r or t is missing. Plain arithmetic, rounding only for
// display. The time can be entered in years, months, weeks or days.

import { money, mtex, trim } from "./compound-engine";

export const MODES = {
  I: "Interest",
  P: "Principal",
  r: "Interest rate",
  t: "Time",
};

export const UNITS = { years: 1, months: 12, weeks: 52, days: 365 };

function num(v) {
  const s = String(v ?? "").trim().replace(/[,$\s]/g, "").replace(/%$/, "");
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

// Time as a fraction of a year, with the step that explains it.
function toYears(t, unit) {
  const per = UNITS[unit];
  if (per === 1) return { years: t, step: null, tex: trim(t, 6) };
  const tex = `\\dfrac{${trim(t, 6)}}{${per}}`;
  return {
    years: t / per,
    step: `The rate is per year, so write the time in years: $${trim(t, 6)}$ ${unit} $= ${tex}$ years.`,
    tex,
  };
}

/**
 * @param {"I"|"P"|"r"|"t"} mode which quantity to find
 * @param {{P?: string, r?: string, t?: string, I?: string}} raw inputs as typed
 * @param {"years"|"months"|"weeks"|"days"} unit unit for the time (entered or answered)
 */
export function solveSimple(mode, raw, unit = "years") {
  if (!MODES[mode]) return { error: "Choose what you want to find." };
  if (!UNITS[unit]) return { error: "Choose a unit for the time." };
  const need = { I: ["P", "r", "t"], P: ["I", "r", "t"], r: ["I", "P", "t"], t: ["I", "P", "r"] }[mode];
  const v = {};
  for (const k of need) v[k] = num(raw?.[k]);
  if (need.some((k) => v[k] === null)) return { error: "Fill in all three boxes." };
  if (need.some((k) => Number.isNaN(v[k]))) return { error: "Enter numbers only, like 4500, 3.2 and 5." };
  if (need.some((k) => v[k] <= 0)) return { error: "Every value has to be more than 0." };
  if ("r" in v && v.r > 100) return { error: "Enter a rate of 100% p.a. or less." };
  if ("P" in v && v.P > 1e10) return { error: "That amount is too big for this calculator." };
  if ("t" in v && v.t / UNITS[unit] > 100) return { error: "Enter a time of 100 years or less." };

  const steps = [`Simple interest formula: $I = Prt$, where $P$ is the principal, $r$ is the yearly interest rate as a decimal and $t$ is the time in years.`];
  let answer;
  let P, I, years;

  if (mode === "I") {
    P = v.P;
    const r = v.r / 100;
    const T = toYears(v.t, unit);
    years = T.years;
    if (T.step) steps.push(T.step);
    steps.push(`Write the rate as a decimal: $${trim(v.r, 6)}\\% = ${trim(r, 8)}$.`);
    I = P * r * years;
    steps.push(`Substitute: $I = ${trim(P, 2)} \\times ${trim(r, 8)} \\times ${T.tex} = ${mtex(I)}$.`);
    steps.push(`Total amount: $A = P + I = ${mtex(P)} + ${mtex(I)} = ${mtex(P + I)}$.`);
    answer = `Interest: ${money(I)}. Total amount: ${money(P + I)}.`;
  } else if (mode === "P") {
    I = v.I;
    const r = v.r / 100;
    const T = toYears(v.t, unit);
    years = T.years;
    if (T.step) steps.push(T.step);
    steps.push(`Rearrange for the principal: $P = \\dfrac{I}{rt}$.`);
    P = I / (r * years);
    steps.push(`Substitute: $P = \\dfrac{${trim(I, 2)}}{${trim(r, 8)} \\times ${T.tex}} = ${mtex(P)}$.`);
    steps.push(`Check: $${trim(P, 2)} \\times ${trim(r, 8)} \\times ${T.tex} = ${mtex(P * r * years)}$ ✓`);
    answer = `Principal: ${money(P)}.`;
  } else if (mode === "r") {
    I = v.I;
    P = v.P;
    const T = toYears(v.t, unit);
    years = T.years;
    if (T.step) steps.push(T.step);
    steps.push(`Rearrange for the rate: $r = \\dfrac{I}{Pt}$.`);
    const r = I / (P * years);
    steps.push(`Substitute: $r = \\dfrac{${trim(I, 2)}}{${trim(P, 2)} \\times ${T.tex}} = ${trim(r, 6)}$.`);
    steps.push(`Change the decimal to a percentage: $${trim(r, 6)} \\times 100 = ${trim(r * 100, 4)}\\%$ p.a.`);
    if (r > 1) steps.push(`That is more than $100\\%$ p.a., which is very unusual. Check the numbers you entered.`);
    answer = `Interest rate: ${trim(r * 100, 4)}% p.a.`;
  } else {
    I = v.I;
    P = v.P;
    const r = v.r / 100;
    steps.push(`Rearrange for the time: $t = \\dfrac{I}{Pr}$.`);
    years = I / (P * r);
    steps.push(`Substitute: $t = \\dfrac{${trim(I, 2)}}{${trim(P, 2)} \\times ${trim(r, 8)}} = ${trim(years, 6)}$ years.`);
    if (unit !== "years") {
      steps.push(`Change to ${unit}: $${trim(years, 6)} \\times ${UNITS[unit]} = ${trim(years * UNITS[unit], 4)}$ ${unit}.`);
      answer = `Time: ${trim(years * UNITS[unit], 4)} ${unit} (${trim(years, 4)} years).`;
    } else {
      answer = `Time: ${trim(years, 4)} years.`;
    }
    if (years > 100) return { error: "That would take more than 100 years. Check the numbers you entered." };
  }

  // Year-by-year table when the time is a whole number of years (up to 20):
  // the interest is the same every year, which is the point of simple interest.
  const rows = [];
  const whole = Math.round(years);
  if (Math.abs(years - whole) < 1e-9 && whole >= 1 && whole <= 20) {
    const perYear = I / years;
    for (let y = 1; y <= whole; y++) {
      rows.push({ label: y, start: P + perYear * (y - 1), interest: perYear, end: P + perYear * y });
    }
  }

  return { answer, steps, rows, P, I, years };
}

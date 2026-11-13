// Compound interest engine for CompoundCalc.jsx. Plain arithmetic, no
// rounding until the final display: A = P(1 + r/n)^(nt), with a year-by-year
// table and a comparison with simple interest at the same rate.

export const FREQS = {
  1: "yearly",
  2: "half-yearly",
  4: "quarterly",
  12: "monthly",
  26: "fortnightly",
  52: "weekly",
  365: "daily",
};
const PERIOD = { 1: "year", 2: "half-year", 4: "quarter", 12: "month", 26: "fortnight", 52: "week", 365: "day" };

function num(v) {
  const s = String(v ?? "").trim().replace(/[,$\s]/g, "").replace(/%$/, "");
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

// $1,234.56 (always 2 decimal places).
export function money(x) {
  const neg = x < 0;
  const [whole, cents] = (Math.round(Math.abs(x) * 100) / 100).toFixed(2).split(".");
  return `${neg ? "-" : ""}$${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${cents}`;
}
// Money for inside KaTeX maths: no raw $ (stepHtml splits on $), no comma spacing.
export const mtex = (x) => money(x).replace("$", "\\text{\\textdollar}").replace(/,/g, "{,}");

// Up to `dp` decimal places, trailing zeros removed.
export function trim(x, dp = 6) {
  const r = Math.round(x * 10 ** dp) / 10 ** dp;
  return String(Object.is(r, -0) ? 0 : r);
}

/**
 * @param {string} pRaw principal in dollars
 * @param {string} rateRaw interest rate, % per annum
 * @param {string} yearsRaw time in years
 * @param {number|string} freqRaw compounding periods per year
 */
export function solveCompound(pRaw, rateRaw, yearsRaw, freqRaw) {
  const P = num(pRaw), R = num(rateRaw), t = num(yearsRaw);
  const n = Number(freqRaw);
  if ([P, R, t].some((v) => v === null)) return { error: "Fill in the amount, the interest rate and the number of years." };
  if ([P, R, t].some((v) => Number.isNaN(v))) return { error: "Enter numbers only, like 5000, 4.5 and 3." };
  if (!FREQS[n]) return { error: "Choose how often the interest is compounded." };
  if (P <= 0) return { error: "The amount invested or borrowed has to be more than $0." };
  if (R <= 0) return { error: "The interest rate has to be more than 0%." };
  if (R > 100) return { error: "Enter a rate of 100% p.a. or less." };
  if (P > 1e10) return { error: "That amount is too big for this calculator." };
  if (t <= 0) return { error: "The time has to be more than 0 years." };
  if (t > 100) return { error: "Enter a time of 100 years or less." };
  const periods = n * t;
  if (Math.abs(periods - Math.round(periods)) > 1e-9) {
    return { error: `With ${FREQS[n]} compounding, the time has to be a whole number of ${PERIOD[n]}s. Try a different number of years.` };
  }
  const N = Math.round(periods);
  const i = R / 100 / n; // rate per period
  const growth = 1 + i;
  const A = P * growth ** N;
  const I = A - P;
  const simpleI = P * (R / 100) * t;

  const steps = [];
  steps.push(`Compound interest formula: $A = P(1 + r)^n$, where $r$ is the interest rate per compounding period (as a decimal) and $n$ is the number of periods.`);
  if (n === 1) {
    steps.push(`Interest is added once a year, so $r = ${trim(R, 6)}\\% = ${trim(i, 8)}$ and $n = ${N}$.`);
  } else {
    steps.push(`Interest is compounded ${FREQS[n]}, so divide the yearly rate by ${n}: $r = \\dfrac{${trim(R, 6)}\\%}{${n}} = ${trim(R / n, 8)}\\% = ${trim(i, 10)}$ per ${PERIOD[n]}.`);
    steps.push(`Number of ${PERIOD[n]}s: $n = ${trim(t, 6)} \\times ${n} = ${N}$.`);
  }
  steps.push(`Substitute: $A = ${trim(P, 2)} \\times (1 + ${trim(i, 10)})^{${N}} = ${trim(P, 2)} \\times ${trim(growth, 10)}^{${N}}$.`);
  steps.push(`Work it out in one go on your calculator: $A \\approx ${mtex(A)}$ (rounded to the nearest cent).`);
  steps.push(`Interest earned: $I = A - P = ${mtex(A)} - ${mtex(P)} = ${mtex(I)}$.`);
  steps.push(`Simple interest at the same rate would be $I = Prt = ${trim(P, 2)} \\times ${trim(R / 100, 8)} \\times ${trim(t, 6)} = ${mtex(simpleI)}$, so compounding earns $${mtex(I - simpleI)}$ more.`);

  // Year-by-year table: balance at the end of each whole year, plus the
  // final balance if the time isn't a whole number of years.
  const rows = [];
  let start = P;
  const whole = Math.floor(t + 1e-9);
  for (let y = 1; y <= whole && rows.length < 100; y++) {
    const end = P * growth ** (n * y);
    rows.push({ label: `Year ${y}`, start, interest: end - start, end });
    start = end;
  }
  if (t - whole > 1e-9) {
    rows.push({ label: `To ${trim(t, 4)} years`, start, interest: A - start, end: A });
  }

  return {
    P, R, t, n, N, i, A, I, simpleI, rows, steps,
    answer: `${money(A)} after ${trim(t, 4)} year${t === 1 ? "" : "s"} (${money(I)} interest)`,
  };
}

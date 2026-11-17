// Scientific notation engine for SciNotationCalc.jsx. Two jobs: an ordinary
// number to scientific notation (optionally rounded to significant figures),
// and scientific notation back to an ordinary number. Works on the digits as
// text with BigInt, so 0.000 000 72 never picks up floating point errors.
// Plain arithmetic, no AI. Kept free of imports so the logic can be tested
// on its own.

export const MODES = {
  toSci: "To scientific notation",
  toOrd: "To an ordinary number",
};

// "45 600 000", "0.000072", "-3,800", "4.5e6" to { neg, m, s } meaning
// (neg ? -1 : 1) × m × 10^(-s), with m a BigInt with no trailing zeros.
function parse(v) {
  let t = String(v ?? "").trim().replace(/[\s,  ]/g, "").replace(/[−–]/g, "-");
  if (!t) return null;
  let e = 0;
  const em = t.match(/^(.*?)[eE]([-+]?\d{1,4})$/);
  if (em) {
    t = em[1];
    e = Number(em[2]);
  }
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(t)) return NaN;
  const neg = t.startsWith("-");
  const body = t.replace(/^[-+]/, "");
  const [whole, part = ""] = body.split(".");
  let m = BigInt((whole || "0") + part);
  let s = part.length - e;
  if (m === 0n) return { neg: false, m: 0n, s: 0 };
  while (m % 10n === 0n) {
    m /= 10n;
    s -= 1;
  }
  return { neg, m, s };
}

// Groups of three either side of the point: 45 600 000 and 0.000 072.
function group(str) {
  const [i, f] = str.split(".");
  const gi = i.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  if (f === undefined) return gi;
  const gf = f.replace(/(\d{3})(?=\d)/g, "$1 ");
  return `${gi}.${gf}`;
}

// The ordinary decimal for m × 10^(-s), ungrouped.
function plain(m, s) {
  const d = m.toString();
  if (s <= 0) return d + "0".repeat(-s);
  if (d.length > s) return `${d.slice(0, d.length - s)}.${d.slice(d.length - s)}`;
  return `0.${"0".repeat(s - d.length)}${d}`;
}

// The coefficient digits "456" as "4.56".
const coef = (digits) => (digits.length === 1 ? digits : `${digits[0]}.${digits.slice(1)}`);

// LaTeX for a grouped number: spaces become thin spaces.
const tex = (str) => str.replace(/ /g, "\\,");

const sciTex = (neg, digits, n) => `${neg ? "-" : ""}${coef(digits)} \\times 10^{${n}}`;
const sciText = (neg, digits, n) => `${neg ? "−" : ""}${coef(digits)} × 10^${n}`;

const places = (k) => `${k} place${k === 1 ? "" : "s"}`;

/**
 * @param {"toSci"|"toOrd"} mode
 * @param {{x?: string, a?: string, n?: string, sf?: string}} raw inputs as typed
 */
export function solveSci(mode, raw) {
  if (!MODES[mode]) return { error: "Choose which way to convert." };

  if (mode === "toSci") {
    const p = parse(raw?.x);
    if (p === null) return { error: "Type a number, like 45 600 000 or 0.000 072." };
    if (Number.isNaN(p)) return { error: "Enter digits only, like 45600000 or 0.000072." };
    if (p.m === 0n) return { error: "0 can’t be written in scientific notation, because there’s no first non-zero digit to put before the point." };
    let digits = p.m.toString();
    let n = digits.length - 1 - p.s;
    if (Math.abs(n) > 99) return { error: "That number is too big or too small for this calculator. Keep the power between −99 and 99." };
    if (digits.length > 30) return { error: "Enter 30 significant digits or fewer." };

    let sf = String(raw?.sf ?? "").trim();
    let sfN = null;
    if (sf) {
      if (!/^\d{1,2}$/.test(sf) || Number(sf) < 1 || Number(sf) > 15) return { error: "Significant figures should be a whole number from 1 to 15, or leave it blank." };
      sfN = Number(sf);
    }

    const ordinary = group(plain(p.m, p.s));
    const sign = p.neg ? "−" : "";
    const steps = [];
    steps.push(`Scientific notation is $a \\times 10^n$, where $1 \\le a < 10$ and $n$ is a whole number.`);
    if (p.neg) steps.push(`The number is negative, so keep the minus sign in front and convert $${tex(ordinary)}$.`);
    steps.push(`Put the decimal point straight after the first non-zero digit: $a = ${coef(digits)}$.`);
    if (n > 0) {
      steps.push(`To get from $${tex(ordinary)}$ to $${coef(digits)}$, the point moves ${places(n)} to the left. The number is 10 or more, so the power is positive: $n = ${n}$.`);
    } else if (n < 0) {
      steps.push(`To get from $${tex(ordinary)}$ to $${coef(digits)}$, the point moves ${places(-n)} to the right. The number is less than 1, so the power is negative: $n = ${n}$.`);
    } else {
      steps.push(`The number is already between 1 and 10, so the point doesn’t move: $n = 0$, and $10^0 = 1$.`);
    }
    const exact = sciTex(p.neg, digits, n);
    steps.push(`$${tex((p.neg ? "-" : "") + ordinary)} = ${exact}$`);

    let answer = `${sign}${ordinary} = ${sciText(p.neg, digits, n)}`;
    let answerTex = `${tex((p.neg ? "-" : "") + ordinary)} = ${exact}`;
    let rounded = null;
    if (sfN !== null) {
      if (digits.length <= sfN) {
        // Pad with zeros so the answer shows the requested accuracy.
        const padded = digits + "0".repeat(sfN - digits.length);
        rounded = { digits: padded, n };
        steps.push(`To ${sfN} significant figure${sfN === 1 ? "" : "s"}, write the coefficient with ${sfN} digit${sfN === 1 ? "" : "s"}: $${sciTex(p.neg, padded, n)}$.`);
      } else {
        const keep = BigInt(digits.slice(0, sfN));
        const next = Number(digits[sfN]);
        let r = next >= 5 ? keep + 1n : keep;
        let rn = n;
        let rd = r.toString();
        if (rd.length > sfN) {
          // 9.99 rounded up to 10.0: shift so a stays below 10.
          rd = rd.slice(0, sfN);
          rn += 1;
        }
        rounded = { digits: rd, n: rn };
        steps.push(`To ${sfN} significant figure${sfN === 1 ? "" : "s"}: keep the first ${sfN} digit${sfN === 1 ? "" : "s"} of $${coef(digits)}$. The next digit is $${next}$, so round ${next >= 5 ? "up" : "down"}: $${sciTex(p.neg, rd, rn)}$.`);
      }
      const same = rounded.digits.replace(/0+$/, "") === digits && rounded.n === n;
      answer = `${sign}${ordinary} ${same ? "=" : "≈"} ${sciText(p.neg, rounded.digits, rounded.n)} (${sfN} significant figure${sfN === 1 ? "" : "s"})`;
      answerTex = `${tex((p.neg ? "-" : "") + ordinary)} ${same ? "=" : "\\approx"} ${sciTex(p.neg, rounded.digits, rounded.n)}`;
    }

    return {
      answer,
      answerTex,
      steps,
      result: { neg: p.neg, a: coef(digits), n, rounded: rounded ? { a: coef(rounded.digits), n: rounded.n } : null },
    };
  }

  // Scientific notation to an ordinary number.
  const a = parse(raw?.a);
  const nRaw = String(raw?.n ?? "").trim().replace(/[−–]/g, "-");
  if (a === null || !nRaw) return { error: "Fill in both boxes: the number in front and the power of 10." };
  if (Number.isNaN(a)) return { error: "The number in front should be a decimal, like 3.07." };
  if (!/^[-+]?\d{1,3}$/.test(nRaw)) return { error: "The power of 10 should be a whole number, like 6 or −5." };
  const n = Number(nRaw);
  if (Math.abs(n) > 30) return { error: "Keep the power between −30 and 30 so the answer fits on the screen." };
  if (a.m === 0n) return { error: "The number in front can’t be 0. In scientific notation it’s between 1 and 10." };

  const aDigits = a.m.toString();
  const aStr = plain(a.m, a.s);
  const aVal = aDigits.length - 1 - a.s; // power of the leading digit of a
  const steps = [];
  if (aVal !== 0) {
    steps.push(`Heads up: $${aStr}$ isn’t between 1 and 10, so $${aStr} \\times 10^{${n}}$ isn’t in scientific notation yet. It still has a value, so here it is.`);
  }
  if (n > 0) steps.push(`The power is positive, so the answer is bigger than $${aStr}$. Multiply by $10^{${n}}$: move the point ${places(n)} to the right, filling gaps with zeros.`);
  else if (n < 0) steps.push(`The power is negative, so the answer is smaller than $${aStr}$. $10^{${n}} = \\dfrac{1}{10^{${-n}}}$, so move the point ${places(-n)} to the left, filling gaps with zeros.`);
  else steps.push(`$10^0 = 1$, so the number doesn’t change.`);
  const value = group(plain(a.m, a.s - n));
  const sign = a.neg ? "-" : "";
  steps.push(`$${sign}${aStr} \\times 10^{${n}} = ${sign}${tex(value)}$`);
  return {
    answer: `${a.neg ? "−" : ""}${aStr} × 10^${n} = ${a.neg ? "−" : ""}${value}`,
    answerTex: `${sign}${aStr} \\times 10^{${n}} = ${sign}${tex(value)}`,
    steps,
    result: { value: (a.neg ? "-" : "") + value },
  };
}

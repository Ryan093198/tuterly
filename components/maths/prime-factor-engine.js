// Prime factorisation engine for PrimeFactorCalc.jsx. Takes a whole number
// from 2 to 1 000 000 000, divides by the smallest prime that goes in each
// time (the repeated division or "ladder" method), and returns the steps,
// the prime factors and the answer in index notation. Also says whether the
// number is prime and whether it's a perfect square (with its square root).
// Plain arithmetic, no AI. Kept free of imports so it can be tested on its own.

export const MAX = 1000000000;

const SUP = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
const sup = (n) => String(n).split("").map((d) => SUP[d]).join("");

export function parseWhole(v) {
  const s = String(v ?? "").trim().replace(/[\s,]/g, "");
  if (!s) return { error: "Type a whole number, like 84 or 630." };
  if (!/^\d+$/.test(s)) return { error: "Enter a whole number only, with no decimal point or minus sign." };
  const n = Number(s);
  if (n < 2) return { error: "Prime factorisation starts at 2. The number 1 has no prime factors, and 0 can't be written as a product of primes." };
  if (n > MAX) return { error: "That number is too big for this calculator. Try one up to 1 000 000 000." };
  return { n };
}

// [[prime, power], ...] in increasing order of prime.
export function factorise(n) {
  const out = [];
  let m = n;
  for (let p = 2; p * p <= m; p += p === 2 ? 1 : 2) {
    if (m % p === 0) {
      let k = 0;
      while (m % p === 0) {
        m /= p;
        k += 1;
      }
      out.push([p, k]);
    }
  }
  if (m > 1) out.push([m, 1]);
  return out;
}

export const indexTex = (f) => f.map(([p, k]) => (k === 1 ? `${p}` : `${p}^{${k}}`)).join(" \\times ");
export const indexPlain = (f) => f.map(([p, k]) => (k === 1 ? `${p}` : `${p}${sup(k)}`)).join(" × ");
const longTex = (f) => f.flatMap(([p, k]) => Array(k).fill(p)).join(" \\times ");

export function solve(raw) {
  const parsed = parseWhole(raw);
  if (parsed.error) return { error: parsed.error };
  const { n } = parsed;
  const f = factorise(n);
  const steps = [];

  if (f.length === 1 && f[0][1] === 1) {
    const root = Math.floor(Math.sqrt(n));
    steps.push(`Try dividing $${n}$ by each prime up to $\\sqrt{${n}} \\approx ${Math.sqrt(n).toFixed(2)}$, that is, every prime up to $${root}$.`);
    steps.push(`None of them divides $${n}$ exactly, so $${n}$ has no factors other than $1$ and itself.`);
    return { answer: `${n} is a prime number`, steps, factors: f, isPrime: true, n };
  }

  let m = n;
  for (const [p, k] of f) {
    for (let i = 0; i < k; i += 1) {
      const next = m / p;
      steps.push(`$${m} \\div ${p} = ${next}$`);
      m = next;
    }
  }
  steps.push("You've reached $1$, so stop. The primes you divided by are the prime factors.");
  const multi = f.some(([, k]) => k > 1);
  steps.push(`$${n} = ${longTex(f)}$`);
  if (multi) steps.push(`In index notation: $${n} = ${indexTex(f)}$`);
  const check = f.reduce((a, [p, k]) => a * p ** k, 1);
  steps.push(`Check: multiplying the primes back together gives $${check}$ ✓`);

  let square = null;
  if (f.every(([, k]) => k % 2 === 0)) {
    const halves = f.map(([p, k]) => [p, k / 2]);
    const r = halves.reduce((a, [p, k]) => a * p ** k, 1);
    square = r;
    steps.push(`Every power is even, so $${n}$ is a perfect square: $\\sqrt{${n}} = ${indexTex(halves)} = ${r}$`);
  }
  return { answer: `${n} = ${indexPlain(f)}`, steps, factors: f, isPrime: false, square, n };
}

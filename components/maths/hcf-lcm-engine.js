// HCF and LCM engine for HcfLcmCalc.jsx. Takes two or three whole numbers
// (1 to 1 000 000), writes each as a product of primes, then builds the HCF
// from the lowest power of each shared prime and the LCM from the highest
// power of every prime that appears. Plain arithmetic, no AI. Reuses the
// factoriser from prime-factor-engine.js.

import { factorise, indexTex } from "./prime-factor-engine";

export const MAX = 1000000;

export const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

export function parseList(raw) {
  const parts = String(raw ?? "")
    .split(/[\s,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length < 2) return { error: "Type two or three whole numbers, separated by commas, like 12, 18 or 8, 12, 20." };
  if (parts.length > 3) return { error: "This calculator takes two or three numbers at a time." };
  const nums = [];
  for (const p of parts) {
    if (!/^\d+$/.test(p)) return { error: `“${p}” isn’t a whole number. Use whole numbers only, with no decimals or minus signs.` };
    const n = Number(p);
    if (n < 1) return { error: "HCF and LCM are for whole numbers from 1 upwards, so 0 can’t be used." };
    if (n > MAX) return { error: "Each number needs to be 1 000 000 or less." };
    nums.push(n);
  }
  return { nums };
}

const facTex = (n) => (n === 1 ? "1" : indexTex(factorise(n)));
const powTex = (p, k) => (k === 1 ? `${p}` : `${p}^{${k}}`);

export function solve(raw) {
  const parsed = parseList(raw);
  if (parsed.error) return { error: parsed.error };
  const { nums } = parsed;
  const fs = nums.map((n) => new Map(n === 1 ? [] : factorise(n)));
  const primes = [...new Set(fs.flatMap((m) => [...m.keys()]))].sort((a, b) => a - b);
  const steps = [];
  const list = nums.join(", ");

  steps.push("Write each number as a product of prime factors:");
  nums.forEach((n) => steps.push(`$${n} = ${facTex(n)}$`));

  const shared = primes.filter((p) => fs.every((m) => m.has(p)));
  const hcfParts = shared.map((p) => [p, Math.min(...fs.map((m) => m.get(p)))]);
  const hcf = hcfParts.reduce((a, [p, k]) => a * p ** k, 1);
  if (hcfParts.length === 0) {
    steps.push(`HCF: no prime appears in every number, so the HCF is $1$.`);
  } else {
    steps.push(`HCF: take each prime that is in every number, with its lowest power: $${hcfParts.map(([p, k]) => powTex(p, k)).join(" \\times ")} = ${hcf}$`);
  }

  const lcmParts = primes.map((p) => [p, Math.max(...fs.map((m) => m.get(p) || 0))]);
  // BigInt: three numbers near a million can have an LCM past 2^53.
  const lcm = lcmParts.reduce((a, [p, k]) => a * BigInt(p) ** BigInt(k), 1n).toString();
  if (lcmParts.length === 0) {
    steps.push(`LCM: every number is $1$, so the LCM is $1$.`);
  } else {
    steps.push(`LCM: take every prime that appears anywhere, with its highest power: $${lcmParts.map(([p, k]) => powTex(p, k)).join(" \\times ")} = ${lcm}$`);
  }
  if (nums.length === 2) {
    steps.push(`Check: $\\text{HCF} \\times \\text{LCM} = ${hcf} \\times ${lcm} = ${BigInt(hcf) * BigInt(lcm)}$, which equals $${nums[0]} \\times ${nums[1]} = ${nums[0] * nums[1]}$ ✓`);
  } else {
    steps.push(`Check: $${lcm}$ divides exactly by ${nums.map((n) => `$${n}$`).join(", ")} and $${hcf}$ divides exactly into each of them ✓`);
  }
  if (hcf === 1) steps.push(`The HCF is $1$, so these numbers are coprime: they share no factor except $1$.`);

  return { hcf, lcm, nums, steps, answer: `HCF of ${list} = ${hcf}   ·   LCM = ${lcm}` };
}

// Speed, distance and time engine for SpeedCalc.jsx. Finds the speed, the
// distance or the time from the other two, converting units first so they
// match (km with hours for km/h, metres with seconds for m/s). Plain
// arithmetic; rounding is for display only.

import { fmt } from "./calc-utils";

export const MODES = { s: "Speed", d: "Distance", t: "Time" };
export const DIST_UNITS = ["km", "m"];
export const TIME_UNITS = ["h", "min", "s"];
export const SPEED_UNITS = ["km/h", "m/s"];

const TIME_IN_S = { h: 3600, min: 60, s: 1 };
const DIST_IN_M = { km: 1000, m: 1 };
// The matching distance and time units for each speed unit.
const SYSTEM = { "km/h": { d: "km", t: "h" }, "m/s": { d: "m", t: "s" } };

function num(v) {
  const s = String(v ?? "").trim().replace(/,/g, "");
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

const n = (x) => fmt(x, 4);
const unitTex = (u) => `\\text{ ${u}}`;

// A time in hours as "2 h 15 min" (or with seconds when needed).
export function hms(hours) {
  let total = Math.round(hours * 3600);
  const h = Math.floor(total / 3600);
  total -= h * 3600;
  const m = Math.floor(total / 60);
  const s = total - m * 60;
  const parts = [];
  if (h) parts.push(`${h} h`);
  if (m) parts.push(`${m} min`);
  if (s || parts.length === 0) parts.push(`${s} s`);
  return parts.join(" ");
}

function convDist(value, from, to) {
  if (from === to) return { value, step: null };
  const out = (value * DIST_IN_M[from]) / DIST_IN_M[to];
  const how = from === "km" ? `\\times 1000` : `\\div 1000`;
  return { value: out, step: `Change the distance to ${to}: $${n(value)}${unitTex(from)} ${how} = ${n(out)}${unitTex(to)}$.` };
}

function convTime(value, from, to) {
  if (from === to) return { value, step: null, tex: n(value) };
  const ratio = TIME_IN_S[from] / TIME_IN_S[to];
  const out = value * ratio;
  if (ratio >= 1) {
    return { value: out, step: `Change the time to ${to}: $${n(value)}${unitTex(from)} \\times ${n(ratio)} = ${n(out)}${unitTex(to)}$.`, tex: n(out) };
  }
  const div = 1 / ratio;
  // Keep a fraction like 40/60 exact in the working if the decimal recurs.
  const clean = Math.abs(out * 10000 - Math.round(out * 10000)) < 1e-9;
  const tex = clean ? n(out) : `\\dfrac{${n(value)}}{${n(div)}}`;
  return {
    value: out,
    step: `Change the time to ${to}: $${n(value)}${unitTex(from)} \\div ${n(div)} = ${clean ? n(out) : `\\dfrac{${n(value)}}{${n(div)}} \\approx ${n(out)}`}${unitTex(to)}$.`,
    tex,
  };
}

function convSpeed(value, from, to) {
  if (from === to) return value;
  return from === "km/h" ? value / 3.6 : value * 3.6;
}

/**
 * @param {"s"|"d"|"t"} mode what to find
 * @param {{d?: string, dUnit?: string, t?: string, tUnit?: string, s?: string, sUnit?: string, out?: string}} raw
 *   values as typed, their units, and `out`: the unit for the answer
 */
export function solveSDT(mode, raw = {}) {
  if (!MODES[mode]) return { error: "Choose what you want to find." };
  const need = { s: ["d", "t"], d: ["s", "t"], t: ["d", "s"] }[mode];
  const v = {};
  for (const k of need) v[k] = num(raw[k]);
  if (need.some((k) => v[k] === null)) return { error: "Fill in both boxes." };
  if (need.some((k) => Number.isNaN(v[k]))) return { error: "Enter numbers only, like 245 and 3.5." };
  if (need.some((k) => v[k] <= 0)) return { error: "Each value has to be more than 0." };
  if (need.some((k) => v[k] > 1e9)) return { error: "That number is too big for this calculator." };

  const dUnit = DIST_UNITS.includes(raw.dUnit) ? raw.dUnit : "km";
  const tUnit = TIME_UNITS.includes(raw.tUnit) ? raw.tUnit : "h";
  const sUnit = SPEED_UNITS.includes(raw.sUnit) ? raw.sUnit : "km/h";
  const steps = [];
  let answer, extra = [];

  if (mode === "s") {
    const out = SPEED_UNITS.includes(raw.out) ? raw.out : "km/h";
    const sys = SYSTEM[out];
    steps.push(`Speed $= \\dfrac{\\text{distance}}{\\text{time}}$. For an answer in ${out}, the distance must be in ${sys.d} and the time in ${sys.t}.`);
    const D = convDist(v.d, dUnit, sys.d);
    const T = convTime(v.t, tUnit, sys.t);
    if (D.step) steps.push(D.step);
    if (T.step) steps.push(T.step);
    const s = D.value / T.value;
    steps.push(`Divide: $s = \\dfrac{${n(D.value)}}{${T.tex}} = ${n(s)}${unitTex(out)}$.`);
    const other = out === "km/h" ? "m/s" : "km/h";
    const so = convSpeed(s, out, other);
    extra.push(`In ${other}: ${n(so)} ${other} (${out === "km/h" ? "divide" : "multiply"} by 3.6).`);
    answer = `Speed: ${n(s)} ${out}`;
    return { answer, steps, extra, value: s, unit: out };
  }

  const sys = SYSTEM[sUnit];
  if (mode === "d") {
    const out = DIST_UNITS.includes(raw.out) ? raw.out : sys.d;
    steps.push(`Distance $=$ speed $\\times$ time. The speed is in ${sUnit}, so the time must be in ${sys.t}.`);
    const T = convTime(v.t, tUnit, sys.t);
    if (T.step) steps.push(T.step);
    const d = v.s * T.value;
    steps.push(`Multiply: $d = ${n(v.s)} \\times ${T.tex} = ${n(d)}${unitTex(sys.d)}$.`);
    let final = d;
    if (out !== sys.d) {
      const D = convDist(d, sys.d, out);
      steps.push(D.step);
      final = D.value;
    }
    answer = `Distance: ${n(final)} ${out}`;
    return { answer, steps, extra, value: final, unit: out };
  }

  // mode === "t"
  const out = TIME_UNITS.includes(raw.out) ? raw.out : sys.t;
  steps.push(`Time $= \\dfrac{\\text{distance}}{\\text{speed}}$. The speed is in ${sUnit}, so the distance must be in ${sys.d}.`);
  const D = convDist(v.d, dUnit, sys.d);
  if (D.step) steps.push(D.step);
  const t = D.value / v.s;
  steps.push(`Divide: $t = \\dfrac{${n(D.value)}}{${n(v.s)}} = ${n(t)}${unitTex(sys.t)}$.`);
  let final = t;
  if (out !== sys.t) {
    const ratio = TIME_IN_S[sys.t] / TIME_IN_S[out];
    final = t * ratio;
    steps.push(ratio >= 1
      ? `Change to ${out}: $${n(t)} \\times ${n(ratio)} = ${n(final)}${unitTex(out)}$.`
      : `Change to ${out}: $${n(t)} \\div ${n(1 / ratio)} = ${n(final)}${unitTex(out)}$.`);
  }
  const hours = (t * TIME_IN_S[sys.t]) / 3600;
  extra.push(`In hours and minutes: ${hms(hours)}.`);
  if (sys.t === "h" && Math.abs(hours - Math.round(hours)) > 1e-9) {
    const whole = Math.floor(hours);
    steps.push(`The decimal part is a fraction of an hour, not minutes: $${n(hours - whole)} \\times 60 = ${n((hours - whole) * 60)}$ min.`);
  }
  answer = `Time: ${n(final)} ${out}`;
  return { answer, steps, extra, value: final, unit: out, hours };
}

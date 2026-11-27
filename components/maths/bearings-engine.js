// Bearings engine for BearingsCalc.jsx. Four jobs: the back bearing of a
// true bearing, converting a compass bearing (like S35°W) to a true bearing
// and back, how far east/west and north/south a trip goes from its distance
// and bearing, and the distance and bearing from an east/west and
// north/south movement. True bearings are measured clockwise from north.
// Plain arithmetic, no AI. Kept free of imports so it can be tested alone.

export const MODES = {
  back: { tab: "Back bearing", labels: ["True bearing (°)"], start: ["065"] },
  convert: { tab: "Compass ↔ true", labels: ["Compass bearing (like S35°W) or true bearing (like 215)"], start: ["S35°W"] },
  trip: { tab: "Distance + bearing", labels: ["Distance travelled", "True bearing (°)"], start: ["40", "130"] },
  position: { tab: "East/north → bearing", labels: ["Distance east (negative for west)", "Distance north (negative for south)"], start: ["-6", "8"] },
};

export function parseNum(v) {
  const s = String(v ?? "").trim().replace(/,/g, "").replace(/°$/, "").trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

export function fmt(n, dp = 2) {
  const r = Math.round(n * 10 ** dp) / 10 ** dp;
  return String(Object.is(r, -0) ? 0 : r);
}
const isExact = (x, dp = 2) => Math.abs(x * 10 ** dp - Math.round(x * 10 ** dp)) < 1e-7;

// Three-figure bearing: 40 -> "040°", 7.5 -> "007.5°", 323.13 -> "323.13°".
export function threeFig(b, dp = 2) {
  let r = Math.round(b * 10 ** dp) / 10 ** dp;
  if (r >= 360) r -= 360;
  const [i, d] = String(Object.is(r, -0) ? 0 : r).split(".");
  return `${i.padStart(3, "0")}${d ? "." + d : ""}°`;
}

export const backBearing = (b) => (b < 180 ? b + 180 : b - 180);

// Compass (quadrant) bearing to true bearing.
export function compassToTrue(ns, angle, ew) {
  if (ns === "N" && ew === "E") return angle;
  if (ns === "S" && ew === "E") return 180 - angle;
  if (ns === "S" && ew === "W") return 180 + angle;
  return (360 - angle) % 360;
}

// True bearing to compass form, with due N/E/S/W for the four axes.
export function trueToCompass(b) {
  const d = fmt;
  if (Math.abs(b) < 1e-9 || Math.abs(b - 360) < 1e-9) return "due north (N)";
  if (Math.abs(b - 90) < 1e-9) return "due east (E)";
  if (Math.abs(b - 180) < 1e-9) return "due south (S)";
  if (Math.abs(b - 270) < 1e-9) return "due west (W)";
  if (b < 90) return `N${d(b)}°E`;
  if (b < 180) return `S${d(180 - b)}°E`;
  if (b < 270) return `S${d(b - 180)}°W`;
  return `N${d(360 - b)}°W`;
}

const COMPASS_RE = /^([NS])\s*(\d+(?:\.\d+)?)\s*(?:°|deg)?\s*([EW])$/i;

function bearingError(b) {
  if (b === null) return "Enter a bearing.";
  if (Number.isNaN(b)) return "Enter a bearing as a number of degrees, like 065 or 210.";
  if (b < 0 || b >= 360) return "A true bearing is from 000° up to (but not including) 360°.";
  return null;
}

export function solve(mode, raws) {
  const steps = [];

  if (mode === "back") {
    const b = parseNum(raws[0]);
    const err = bearingError(b);
    if (err) return { error: err };
    const bb = backBearing(b);
    steps.push(`The back bearing points the opposite way, so it differs by $180°$`);
    steps.push(b < 180
      ? `$${fmt(b)}°$ is less than $180°$, so add: $${fmt(b)}° + 180° = ${fmt(bb)}°$`
      : `$${fmt(b)}°$ is $180°$ or more, so subtract: $${fmt(b)}° - 180° = ${fmt(bb)}°$`);
    steps.push(`Written with three figures: ${threeFig(bb)}`);
    return { answer: `Back bearing = ${threeFig(bb)}`, steps, value: bb };
  }

  if (mode === "convert") {
    const raw = String(raws[0] ?? "").trim();
    if (!raw) return { error: "Enter a compass bearing like N40°E, or a true bearing like 215." };
    const m = raw.replace(/\s+/g, " ").match(COMPASS_RE);
    if (m) {
      const ns = m[1].toUpperCase();
      const ew = m[3].toUpperCase();
      const a = Number(m[2]);
      if (a > 90) return { error: "The angle in a compass bearing is between 0° and 90°, measured from north or south." };
      const t = compassToTrue(ns, a, ew);
      const from = ns === "N" ? "north" : "south";
      const to = ew === "E" ? "east" : "west";
      steps.push(`${ns}${fmt(a)}°${ew} means: face ${from}, then turn $${fmt(a)}°$ towards the ${to}`);
      if (ns === "N" && ew === "E") steps.push(`Turning clockwise from north by $${fmt(a)}°$ gives a true bearing of $${fmt(t)}°$`);
      if (ns === "S" && ew === "E") steps.push(`South is $180°$. Turning towards east is back towards north, so subtract: $180° - ${fmt(a)}° = ${fmt(t)}°$`);
      if (ns === "S" && ew === "W") steps.push(`South is $180°$. Turning towards west keeps going clockwise, so add: $180° + ${fmt(a)}° = ${fmt(t)}°$`);
      if (ns === "N" && ew === "W") steps.push(`Turning anticlockwise from north by $${fmt(a)}°$ is the same as $360° - ${fmt(a)}° = ${fmt(t)}°$ clockwise`);
      return { answer: `${ns}${fmt(a)}°${ew} = true bearing ${threeFig(t)}`, steps, value: t };
    }
    const b = parseNum(raw);
    if (b === null || Number.isNaN(b)) return { error: "Write a compass bearing as a letter, an angle and a letter, like N40°E or S35W. Or enter a true bearing like 215." };
    const err = bearingError(b);
    if (err) return { error: err };
    const c = trueToCompass(b);
    if (b < 90) steps.push(`$${fmt(b)}°$ is between $000°$ and $090°$, so it is east of north: N${fmt(b)}°E`);
    else if (b < 180) steps.push(`$${fmt(b)}°$ is between $090°$ and $180°$, so measure from south towards east: $180° - ${fmt(b)}° = ${fmt(180 - b)}°$`);
    else if (b < 270) steps.push(`$${fmt(b)}°$ is between $180°$ and $270°$, so measure from south towards west: $${fmt(b)}° - 180° = ${fmt(b - 180)}°$`);
    else steps.push(`$${fmt(b)}°$ is between $270°$ and $360°$, so measure from north towards west: $360° - ${fmt(b)}° = ${fmt(360 - b)}°$`);
    return { answer: `True bearing ${threeFig(b)} = ${c}`, steps, compass: c };
  }

  if (mode === "trip") {
    const d = parseNum(raws[0]);
    const b = parseNum(raws[1]);
    if (d === null) return { error: "Enter the distance travelled." };
    if (Number.isNaN(d)) return { error: "Enter the distance as a number, like 40 or 2.5." };
    if (d <= 0) return { error: "The distance has to be greater than 0." };
    if (d > 1e9) return { error: "That distance is too big for this calculator." };
    const err = bearingError(b);
    if (err) return { error: err };
    const rad = (b * Math.PI) / 180;
    let east = d * Math.sin(rad);
    let north = d * Math.cos(rad);
    if (Math.abs(east) < 1e-9) east = 0;
    if (Math.abs(north) < 1e-9) north = 0;
    const ew = east >= 0 ? "east" : "west";
    const ns = north >= 0 ? "north" : "south";
    steps.push(`Draw a north line at the start and turn $${fmt(b)}°$ clockwise. The path is the hypotenuse of a right-angled triangle with an east–west side and a north–south side.`);
    steps.push(`East–west distance $= ${fmt(d, 4)} \\times \\sin ${fmt(b)}° ${isExact(east) ? "=" : "\\approx"} ${fmt(east)}$`);
    steps.push(`North–south distance $= ${fmt(d, 4)} \\times \\cos ${fmt(b)}° ${isExact(north) ? "=" : "\\approx"} ${fmt(north)}$`);
    steps.push(`A negative east value means west, and a negative north value means south.`);
    steps.push(`Back bearing to the start: ${threeFig(backBearing(b))}`);
    const parts = [];
    if (east !== 0) parts.push(`${fmt(Math.abs(east))} ${ew}`);
    if (north !== 0) parts.push(`${fmt(Math.abs(north))} ${ns}`);
    return { answer: parts.join(" and "), steps, east, north };
  }

  if (mode === "position") {
    const e = parseNum(raws[0]);
    const n = parseNum(raws[1]);
    if (e === null || n === null) return { error: "Fill in both distances (use 0 if there is no movement that way)." };
    if (Number.isNaN(e) || Number.isNaN(n)) return { error: "Enter numbers only, like 6 or -8." };
    if (e === 0 && n === 0) return { error: "If you don't move at all, there's no bearing to find." };
    if (Math.abs(e) > 1e9 || Math.abs(n) > 1e9) return { error: "That number is too big for this calculator." };
    const dist = Math.sqrt(e * e + n * n);
    let b = (Math.atan2(e, n) * 180) / Math.PI;
    if (b < 0) b += 360;
    if (Math.abs(b - 360) < 1e-9) b = 0;
    const sq = (v) => (v < 0 ? `(${fmt(v, 4)})^2` : `${fmt(v, 4)}^2`);
    steps.push(`Distance by Pythagoras: $\\sqrt{${sq(e)} + ${sq(n)}} = \\sqrt{${fmt(e * e + n * n, 4)}} ${isExact(dist) ? "=" : "\\approx"} ${fmt(dist)}$`);
    if (e !== 0 && n !== 0) {
      const ang = (Math.atan(Math.abs(e) / Math.abs(n)) * 180) / Math.PI;
      const ns = n > 0 ? "north" : "south";
      const ew = e > 0 ? "east" : "west";
      steps.push(`Angle from the ${ns} line towards ${ew}: $\\tan^{-1}\\left(\\dfrac{${fmt(Math.abs(e), 4)}}{${fmt(Math.abs(n), 4)}}\\right) ${isExact(ang) ? "=" : "\\approx"} ${fmt(ang)}°$`);
      if (n > 0 && e > 0) steps.push(`East of north, so the true bearing is that angle: $${fmt(b)}°$`);
      if (n < 0 && e > 0) steps.push(`East of south: $180° - ${fmt(ang)}° = ${fmt(b)}°$`);
      if (n < 0 && e < 0) steps.push(`West of south: $180° + ${fmt(ang)}° = ${fmt(b)}°$`);
      if (n > 0 && e < 0) steps.push(`West of north: $360° - ${fmt(ang)}° = ${fmt(b)}°$`);
    } else {
      steps.push(`The movement is straight along one compass direction, so the bearing is ${threeFig(b)}.`);
    }
    steps.push(`Back bearing to the start: ${threeFig(backBearing(b))}`);
    return { answer: `Distance ${isExact(dist) ? "=" : "≈"} ${fmt(dist)}, bearing ${isExact(b) ? "" : "≈ "}${threeFig(b)}`, steps, dist, bearing: b };
  }

  return { error: "Pick what you want to find." };
}

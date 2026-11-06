// More diagrams for mind map cards (see Figure.jsx). Each is drawn from the
// props in the map's JSON, in a 220 x 92 box, and to scale where the numbers
// on the card allow it.
const INK = "#0b1a2c";
const MUTED = "#5b6677";
const rad = (d) => (d * Math.PI) / 180;
const pt = ([x, y], r, d) => [x + r * Math.cos(rad(d)), y - r * Math.sin(rad(d))];
const f1 = (n) => Number(n).toFixed(1);
const P = (a) => a.map(([x, y]) => `${f1(x)},${f1(y)}`).join(" ");
const angleOf = ([ax, ay], [bx, by]) => (Math.atan2(ay - by, bx - ax) * 180) / Math.PI;
const cross = (a, b, c, d) => {
  const den = (a[0] - b[0]) * (c[1] - d[1]) - (a[1] - b[1]) * (c[0] - d[0]);
  const u = (a[0] * b[1] - a[1] * b[0]), v = (c[0] * d[1] - c[1] * d[0]);
  return [(u * (c[0] - d[0]) - (a[0] - b[0]) * v) / den, (u * (c[1] - d[1]) - (a[1] - b[1]) * v) / den];
};
const minus = (n) => String(n).replace("-", "−");

function T({ x, y, children, a = "middle", s = 12, c = INK, w, i, halo = "#fff" }) {
  return <text x={x} y={y} fontSize={s} fill={c} textAnchor={a} fontWeight={w} fontStyle={i ? "italic" : undefined} stroke={halo} strokeWidth="2.5" strokeLinejoin="round" paintOrder="stroke">{children}</text>;
}
function L({ a, b, c = INK, w = 1.8, d }) {
  return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={c} strokeWidth={w} strokeDasharray={d} strokeLinecap="round" />;
}
// A filled angle mark, anticlockwise from a1 to a2 (degrees, maths convention).
function Wedge({ c, r = 14, a1, a2, fill }) {
  const p1 = pt(c, r, a1), p2 = pt(c, r, a2);
  const large = ((a2 - a1 + 720) % 360) > 180 ? 1 : 0;
  return <path d={`M ${f1(c[0])} ${f1(c[1])} L ${f1(p1[0])} ${f1(p1[1])} A ${r} ${r} 0 ${large} 0 ${f1(p2[0])} ${f1(p2[1])} Z`} fill={fill} opacity=".5" />;
}
function RightMark({ at, u, v, s = 7, c = INK }) {
  const p1 = [at[0] + u[0] * s, at[1] + u[1] * s], p2 = [p1[0] + v[0] * s, p1[1] + v[1] * s], p3 = [at[0] + v[0] * s, at[1] + v[1] * s];
  return <polyline points={P([p1, p2, p3])} fill="none" stroke={c} strokeWidth="1.3" />;
}
function Dot({ at, r = 3, c = INK }) { return <circle cx={at[0]} cy={at[1]} r={r} fill={c} />; }
function Arrow({ a, b, c = INK, w = 2 }) {
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), h = 6;
  const p1 = [b[0] - h * Math.cos(ang - 0.5), b[1] - h * Math.sin(ang - 0.5)], p2 = [b[0] - h * Math.cos(ang + 0.5), b[1] - h * Math.sin(ang + 0.5)];
  return <><L a={a} b={b} c={c} w={w} /><polyline points={P([p1, b, p2])} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" /></>;
}
// Tick marks across a side, to show equal lengths.
function Ticks({ a, b, n = 1, c = INK }) {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  return Array.from({ length: n }, (_, i) => {
    const off = (i - (n - 1) / 2) * 4, cx = mx + off * Math.cos(ang), cy = my + off * Math.sin(ang);
    const nx = -Math.sin(ang) * 4, ny = Math.cos(ang) * 4;
    return <line key={i} x1={cx - nx} y1={cy - ny} x2={cx + nx} y2={cy + ny} stroke={c} strokeWidth="1.5" />;
  });
}
// x and y scales for a graph, with axes where zero falls.
function scale(xr, yr, box = [14, 6, 206, 86]) {
  const [l, t, r, b] = box;
  return { X: (x) => l + ((x - xr[0]) / (xr[1] - xr[0])) * (r - l), Y: (y) => b - ((y - yr[0]) / (yr[1] - yr[0])) * (b - t), l, t, r, b };
}
function Axes({ s, xl = "x", yl = "y" }) {
  const { X, Y, l, r, t, b } = s;
  const ox = Math.min(Math.max(X(0), l), r), oy = Math.min(Math.max(Y(0), t), b);
  return <>
    <L a={[l, oy]} b={[r, oy]} c={MUTED} w={1.2} />
    <L a={[ox, t]} b={[ox, b]} c={MUTED} w={1.2} />
    <T x={r - 2} y={oy - 3} a="end" s={10} c={MUTED}>{xl}</T>
    <T x={ox + 4} y={t + 8} a="start" s={10} c={MUTED}>{yl}</T>
  </>;
}
function curve(fn, s, x0, x1, n = 80) {
  const out = [];
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n, y = fn(x);
    if (Number.isFinite(y)) out.push([s.X(x), s.Y(y)]);
  }
  return P(out);
}
// The part of y = mx + c inside a graph's box, for drawing straight lines.
function clipLine(m, k, s, xr, yr) {
  const xs = [xr[0], xr[1]];
  if (m !== 0) xs.push((yr[0] - k) / m, (yr[1] - k) / m);
  const inside = xs.filter((x) => x >= xr[0] - 1e-9 && x <= xr[1] + 1e-9 && m * x + k >= yr[0] - 1e-9 && m * x + k <= yr[1] + 1e-9).sort((a, b) => a - b);
  const a = inside[0], b = inside[inside.length - 1];
  return [[s.X(a), s.Y(m * a + k)], [s.X(b), s.Y(m * b + k)]];
}

export default function FigureMore({ fig, c, box }) {
  const Svg = ({ children }) => <svg viewBox="0 0 220 92" style={fig.type === "tessellation" ? { ...box, overflow: "hidden" } : box} role="img" aria-label={fig.alt || fig.type}>{children}</svg>;
  const soft = `${c}26`;
  const shape = { fill: soft, stroke: c, strokeWidth: 2.2, strokeLinejoin: "round" };
  const thin = { fill: soft, stroke: c, strokeWidth: 1.8, strokeLinejoin: "round" };
  switch (fig.type) {
    case "fzc": {
      // Corresponding (F), alternate (Z) and co-interior (C) angles side by side.
      const panels = [["F", "equal", 0], ["Z", "equal", 74], ["C", "add to 180°", 148]];
      return <Svg>
        {panels.map(([name, says, x]) => {
          const top = [x + 42, 14], bot = [x + 26, 50], t = angleOf(bot, top), low = [x + 16, 72.5];
          const a = name === "Z" ? [180, 180 + t] : name === "C" ? [180 + t, 360] : [0, t];
          const trail = [[name === "Z" ? x + 4 : x + 68, top[1]], top, bot, [x + 68, bot[1]]];
          return <g key={name}>
            <L a={[x + 4, top[1]]} b={[x + 68, top[1]]} c={MUTED} w={1.4} /><L a={[x + 4, bot[1]]} b={[x + 68, bot[1]]} c={MUTED} w={1.4} />
            <L a={low} b={[x + 45, 7]} c={MUTED} w={1.4} />
            {name === "F" && <L a={top} b={[x + 45, 7]} c={c} w={3} />}
            <Wedge c={top} r={11} a1={a[0]} a2={a[1]} fill={c} /><Wedge c={bot} r={11} a1={0} a2={t} fill={c} />
            <polyline points={P(trail)} fill="none" stroke={c} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
            <T x={x + 36} y={74} s={13} w={800}>{name}</T>
            <T x={x + 36} y={87} s={10}>{says}</T>
          </g>;
        })}
      </Svg>;
    }
    case "compound": {
      // A bent line between parallel lines, split by an extra parallel line.
      const [p, q] = fig.parts, v = [130, 46], up = 180 - p, dn = 180 + q;
      const a = [v[0] - 32 / Math.tan(rad(p)), 14], b = [v[0] - 32 / Math.tan(rad(q)), 78];
      const lp = pt(v, 32, up + p / 2), lq = pt(v, 32, 180 + q / 2);
      return <Svg>
        <L a={[16, 14]} b={[204, 14]} /><L a={[16, 78]} b={[204, 78]} />
        <L a={[16, 46]} b={[204, 46]} c={MUTED} w={1.4} d="4 4" />
        <L a={a} b={v} c={c} w={2.6} /><L a={v} b={b} c={c} w={2.6} />
        <Wedge c={v} r={22} a1={up} a2={180} fill={c} /><Wedge c={v} r={22} a1={180} a2={dn} fill={INK} />
        <T x={lp[0] - 4} y={lp[1] + 3} w={700}>{`${p}°`}</T><T x={lq[0] - 4} y={lq[1] + 8} w={700}>{`${q}°`}</T>
        <T x={204} y={42} a="end" s={10} c={MUTED}>extra parallel line</T>
      </Svg>;
    }
    case "intersect": {
      const o = [110, 46], d = fig.deg, s = 20;
      const q = (r, m) => pt(o, r, m);
      return <Svg>
        <L a={q(62, s)} b={q(62, s + 180)} /><L a={q(46, s + d)} b={q(46, s + d + 180)} />
        <Wedge c={o} r={17} a1={s} a2={s + d} fill={c} /><Wedge c={o} r={17} a1={s + 180} a2={s + d + 180} fill={c} />
        <T x={q(30, s + d / 2)[0]} y={q(30, s + d / 2)[1] + 4} w={700}>{`${d}°`}</T>
        <T x={q(30, s + 180 + d / 2)[0]} y={q(30, s + 180 + d / 2)[1] + 4} w={700}>{`${d}°`}</T>
        <T x={q(26, s + d + (180 - d) / 2)[0]} y={q(26, s + d + (180 - d) / 2)[1] + 4} c={MUTED}>{`${180 - d}°`}</T>
        <T x={q(26, s - (180 - d) / 2)[0]} y={q(26, s - (180 - d) / 2)[1] + 4} c={MUTED}>{`${180 - d}°`}</T>
      </Svg>;
    }
    case "angletypes": {
      const kinds = [["acute", 50], ["right", 90], ["obtuse", 130], ["straight", 180], ["reflex", 300]];
      return <Svg>
        {kinds.map(([name, d], i) => {
          const o = [22 + i * 44, 44], r = 19;
          return <g key={name}>
            <Wedge c={o} r={10} a1={0} a2={d} fill={c} />
            <polyline points={P([pt(o, r, d), o, pt(o, r, 0)])} fill="none" stroke={INK} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            <T x={o[0]} y={80} s={10}>{name}</T>
          </g>;
        })}
      </Svg>;
    }
    case "triangle": {
      // To scale from the angles at bottom left (A) and bottom right (B).
      const { A: dA, B: dB, exterior } = fig, h = 64, y = 80;
      const base = h / Math.tan(rad(dA)) + h / Math.tan(rad(dB));
      const x0 = exterior ? 24 : (220 - base) / 2;
      const A = [x0, y], B = [x0 + base, y], C = [x0 + h / Math.tan(rad(dA)), y - h];
      const cA = angleOf(C, A), cB = angleOf(C, B), bC = angleOf(B, C);
      const lab = (p, r, m, t) => { const q = pt(p, r, m); return <T x={q[0]} y={q[1] + 4} w={700}>{t}</T>; };
      return <Svg>
        <polygon points={P([A, B, C])} {...shape} />
        <Wedge c={A} a1={0} a2={dA} fill={c} /><Wedge c={B} a1={bC} a2={180} fill={c} /><Wedge c={C} a1={cA} a2={cB} fill={c} />
        {lab(A, 27, dA / 2, `${dA}°`)}{lab(B, 25, 180 - dB / 2, `${dB}°`)}{lab(C, 26, (cA + cB) / 2, `${180 - dA - dB}°`)}
        {exterior && <>
          <L a={B} b={[Math.min(212, B[0] + 70), y]} d="4 3" />
          <Wedge c={B} r={18} a1={0} a2={bC} fill={INK} />
          {lab(B, 32, bC / 2, `${180 - dB}°`)}
        </>}
      </Svg>;
    }
    case "polygon": {
      const n = fig.n, o = [70, 47], R = 41, vs = Array.from({ length: n }, (_, i) => pt(o, R, 90 + (360 * i) / n));
      return <Svg>
        <polygon points={P(vs)} {...shape} />
        {vs.slice(2, -1).map((v, i) => <L key={i} a={vs[0]} b={v} c={c} w={1.3} d="3 3" />)}
        <T x={122} y={32} a="start" w={700}>{`${n} sides`}</T>
        <T x={122} y={49} a="start">{`${n - 2} triangles`}</T>
        <T x={122} y={66} a="start">{`${n - 2} × 180° = ${(n - 2) * 180}°`}</T>
      </Svg>;
    }
    case "triangletypes": {
      const tri = (x, pts, ticks) => {
        const ps = pts.map(([a, b]) => [x + a, b]);
        return <g key={x}><polygon points={P(ps)} {...thin} />{ticks.map(([i, j, n], k) => <Ticks key={k} a={ps[i]} b={ps[j]} n={n} />)}</g>;
      };
      return <Svg>
        {tri(8, [[0, 66], [56, 66], [28, 17.5]], [[0, 1, 1], [1, 2, 1], [2, 0, 1]])}
        {tri(82, [[0, 66], [46, 66], [23, 8]], [[1, 2, 1], [2, 0, 1]])}
        {tri(146, [[0, 66], [66, 66], [16, 26]], [])}
        <T x={36} y={84} s={10}>equilateral</T><T x={105} y={84} s={10}>isosceles</T><T x={179} y={84} s={10}>scalene</T>
      </Svg>;
    }
    case "quadrilaterals": {
      const item = (x, y, pts, name) => <g key={name}>
        <polygon points={P(pts.map(([a, b]) => [x + a, y + b]))} {...thin} />
        <T x={x + 30} y={y + 39} s={10}>{name}</T>
      </g>;
      return <Svg>
        {item(6, 1, [[16, 2], [44, 2], [44, 28], [16, 28]], "square")}
        {item(80, 1, [[4, 6], [56, 6], [56, 28], [4, 28]], "rectangle")}
        {item(154, 1, [[14, 6], [60, 6], [46, 28], [0, 28]], "parallelogram")}
        {item(6, 48, [[30, 0], [46, 14], [30, 28], [14, 14]], "rhombus")}
        {item(80, 48, [[18, 4], [42, 4], [56, 28], [4, 28]], "trapezium")}
        {item(154, 48, [[30, 0], [44, 10], [30, 29], [16, 10]], "kite")}
      </Svg>;
    }
    case "congruent": {
      const tri = (dx) => [[dx, 74], [dx + 76, 74], [dx + 24, 16]];
      const marks = (t) => <>
        <polygon points={P(t)} {...shape} />
        <Ticks a={t[0]} b={t[1]} n={1} /><Ticks a={t[1]} b={t[2]} n={2} /><Ticks a={t[2]} b={t[0]} n={3} />
        <Wedge c={t[0]} a1={0} a2={angleOf(t[0], t[2])} fill={c} />
      </>;
      return <Svg>{marks(tri(14))}{marks(tri(126))}<T x={110} y={52} s={17} w={700}>≅</T></Svg>;
    }
    case "congruencetests": {
      const w = 55;
      return <Svg>
        {["SSS", "SAS", "AAS", "RHS"].map((name, i) => {
          const x = i * w;
          const A = [x + 5, 60], B = [x + 50, 60], C = name === "RHS" ? [x + 5, 16] : [x + 17, 16];
          const aA = angleOf(A, C), aB = angleOf(B, C);
          return <g key={name}>
            <polygon points={P([A, B, C])} {...thin} />
            {name === "SSS" && <><Ticks a={A} b={B} n={1} /><Ticks a={B} b={C} n={2} /><Ticks a={C} b={A} n={3} /></>}
            {name === "SAS" && <><Ticks a={A} b={B} n={1} /><Ticks a={C} b={A} n={2} /><Wedge c={A} r={11} a1={0} a2={aA} fill={INK} /></>}
            {name === "AAS" && <><Wedge c={A} r={11} a1={0} a2={aA} fill={INK} /><Wedge c={B} r={11} a1={aB} a2={180} fill={INK} /><Ticks a={B} b={C} n={1} /></>}
            {name === "RHS" && <><RightMark at={A} u={[1, 0]} v={[0, -1]} s={6} /><Ticks a={B} b={C} n={2} /><Ticks a={A} b={B} n={1} /></>}
            <T x={x + 27} y={78} s={12} w={800}>{name}</T>
          </g>;
        })}
      </Svg>;
    }
    case "paradiag": {
      const A = [38, 76], B = [150, 76], C = [186, 18], D = [74, 18];
      return <Svg>
        <polygon points={P([A, B, C, D])} {...shape} />
        <L a={A} b={C} c={INK} w={2} d="5 3" />
        <Ticks a={A} b={B} n={1} /><Ticks a={D} b={C} n={1} /><Ticks a={B} b={C} n={2} /><Ticks a={A} b={D} n={2} />
        <T x={30} y={84} a="end" w={700}>A</T><T x={156} y={86} a="start" w={700}>B</T><T x={192} y={18} a="start" w={700}>C</T><T x={68} y={16} a="end" w={700}>D</T>
      </Svg>;
    }
    case "similar": {
      // A small triangle and a bigger copy, scale factor k, to scale.
      const bw = 104, bh = 68, y = 76, k = fig.k, sw = bw / k, sh = bh / k;
      const tri = (x, w, h) => [[x, y], [x + w, y], [x + w * 0.3, y - h]];
      const s = tri(Math.max(18, 62 - sw), sw, sh), b = tri(100, bw, bh);
      return <Svg>
        <polygon points={P(s)} {...shape} /><polygon points={P(b)} {...shape} />
        <T x={s[0][0] + sw / 2} y={89}>{fig.a}</T><T x={100 + bw / 2} y={89}>{fig.b}</T>
        {fig.c && <T x={s[0][0] + sw * 0.15 - 4} y={y - sh / 2 + 2} a="end">{fig.c}</T>}
        {fig.d && <T x={100 + bw * 0.15 - 5} y={y - bh / 2 + 2} a="end">{fig.d}</T>}
      </Svg>;
    }
    case "shadow": {
      // Same sun angle for both, so the two right triangles are similar.
      const y = 76, u = 7.5, ph = fig.p[0] * u, ps = fig.p[1] * u, th = fig.t[0] * u, ts = fig.t[1] * u, px = 30, tx = 92;
      return <Svg>
        <L a={[8, y]} b={[212, y]} c={MUTED} />
        <L a={[px, y]} b={[px, y - ph]} c={c} w={3} /><L a={[px, y - ph]} b={[px + ps, y]} d="4 3" />
        <L a={[tx, y]} b={[tx, y - th]} c={c} w={3} /><L a={[tx, y - th]} b={[tx + ts, y]} d="4 3" />
        <T x={px - 5} y={y - ph / 2 + 4} a="end">{`${fig.p[0]} m`}</T><T x={px + ps / 2} y={y + 13}>{`${fig.p[1]} m`}</T>
        <T x={tx - 5} y={y - th / 2 + 4} a="end" w={700}>{`${fig.t[0]} m`}</T><T x={tx + ts / 2} y={y + 13}>{`${fig.t[1]} m`}</T>
      </Svg>;
    }
    case "chord": {
      const o = [66, 46], R = 42, off = (R * fig.d) / fig.r, hw = (R * fig.half) / fig.r, y = o[1] + off, a = [o[0] - hw, y], b = [o[0] + hw, y];
      return <Svg>
        <circle cx={o[0]} cy={o[1]} r={R} fill={soft} stroke={c} strokeWidth="2.2" />
        <L a={a} b={b} c={INK} w={2} /><L a={o} b={[o[0], y]} d="3 3" /><L a={o} b={b} c={c} w={2} />
        <RightMark at={[o[0], y]} u={[1, 0]} v={[0, -1]} s={6} /><Dot at={o} />
        <Ticks a={a} b={[o[0], y]} /><Ticks a={[o[0], y]} b={b} />
        <T x={122} y={30} a="start">{`radius ${fig.r}`}</T><T x={122} y={47} a="start">{`half chord ${fig.half}`}</T><T x={122} y={64} a="start" w={700}>{`distance ${fig.d}`}</T>
      </Svg>;
    }
    case "circleangle": {
      const o = [66, 46], R = 42, d = fig.deg, A = pt(o, R, 270 - d / 2), B = pt(o, R, 270 + d / 2), Q = pt(o, R, 90);
      const qa = angleOf(Q, A), qb = angleOf(Q, B);
      return <Svg>
        <circle cx={o[0]} cy={o[1]} r={R} fill={soft} stroke={c} strokeWidth="2.2" />
        <polyline points={P([A, Q, B])} fill="none" stroke={INK} strokeWidth="1.8" /><polyline points={P([A, o, B])} fill="none" stroke={c} strokeWidth="2.2" />
        <Wedge c={o} r={13} a1={270 - d / 2} a2={270 + d / 2} fill={c} /><Wedge c={Q} r={22} a1={qa} a2={qb} fill={INK} />
        <T x={o[0]} y={o[1] + 25} w={700} s={11}>{`${d}°`}</T><T x={Q[0]} y={Q[1] + 36} w={700} s={11}>{`${d / 2}°`}</T>
        <T x={122} y={34} a="start">Angle at the centre</T><T x={122} y={51} a="start">= 2 × angle at the</T><T x={122} y={68} a="start">circumference</T>
      </Svg>;
    }
    case "tangent": {
      const o = [52, 46], R = 36, D = (R * fig.d) / fig.r, Q = [o[0] + D, 46], th = (Math.acos(R / D) * 180) / Math.PI, t = pt(o, R, th);
      const u = [(o[0] - t[0]) / R, (o[1] - t[1]) / R], len = Math.hypot(Q[0] - t[0], Q[1] - t[1]), v = [(Q[0] - t[0]) / len, (Q[1] - t[1]) / len];
      return <Svg>
        <circle cx={o[0]} cy={o[1]} r={R} fill={soft} stroke={c} strokeWidth="2.2" />
        <L a={o} b={t} c={c} w={2.2} /><L a={t} b={Q} w={2.2} /><L a={o} b={Q} d="3 3" /><Dot at={o} /><Dot at={Q} />
        <RightMark at={t} u={u} v={v} s={7} />
        <T x={(o[0] + t[0]) / 2 - 7} y={(o[1] + t[1]) / 2 + 2} a="end">{fig.r}</T>
        <T x={(t[0] + Q[0]) / 2 + 7} y={(t[1] + Q[1]) / 2 - 4} a="start" w={700}>{fig.t}</T>
        <T x={(o[0] + Q[0]) / 2} y={60}>{fig.d}</T>
      </Svg>;
    }
    case "chords": {
      const o = [66, 46], R = 42, A = pt(o, R, 172), B = pt(o, R, 325), C = pt(o, R, 105), D = pt(o, R, 232), X = cross(A, B, C, D);
      return <Svg>
        <circle cx={o[0]} cy={o[1]} r={R} fill={soft} stroke={c} strokeWidth="2.2" />
        <L a={A} b={B} /><L a={C} b={D} c={c} w={2.2} /><Dot at={X} />
        <T x={A[0] - 3} y={A[1] - 3} a="end" s={10}>A</T><T x={B[0] + 4} y={B[1] + 7} a="start" s={10}>B</T>
        <T x={C[0] - 5} y={C[1] + 2} a="end" s={10}>C</T><T x={D[0] - 3} y={D[1] + 9} a="end" s={10}>D</T>
        <T x={X[0] + 5} y={X[1] - 5} a="start" s={10} w={700}>P</T>
        <T x={120} y={38} a="start" s={11}>Chords cross at P:</T><T x={120} y={56} a="start" s={11} w={700}>AP × PB = CP × PD</T>
      </Svg>;
    }
    case "sector": {
      const d = fig.deg, o = [74, 78], R = 66, e = pt(o, R, d), s = pt(o, R, 0), m = pt(o, 28, d / 2);
      return <Svg>
        <path d={`M ${o[0]} ${o[1]} L ${f1(s[0])} ${f1(s[1])} A ${R} ${R} 0 ${d > 180 ? 1 : 0} 0 ${f1(e[0])} ${f1(e[1])} Z`} {...shape} />
        <RightMark at={o} u={[1, 0]} v={[0, -1]} s={8} />
        <T x={m[0]} y={m[1] + 4} w={700}>{`${d}°`}</T>
        <T x={o[0] + R / 2} y={o[1] + 12}>{fig.r}</T><T x={o[0] - 6} y={o[1] - R / 2 + 4} a="end">{fig.r}</T>
      </Svg>;
    }
    case "circleparts": {
      const o = [66, 46], R = 42;
      return <Svg>
        <circle cx={o[0]} cy={o[1]} r={R} fill={soft} stroke={c} strokeWidth="2.2" />
        <L a={[o[0] - R, o[1]]} b={[o[0] + R, o[1]]} /><L a={o} b={pt(o, R, 60)} c={c} w={2.2} /><Dot at={o} />
        <T x={pt(o, 21, 60)[0] + 7} y={pt(o, 21, 60)[1] + 2} w={700} i>r</T><T x={o[0] - 20} y={o[1] + 14} w={700} i>d</T>
        <T x={122} y={30} a="start">d = diameter</T><T x={122} y={47} a="start">r = radius</T><T x={122} y={64} a="start" w={700}>d = 2r</T>
      </Svg>;
    }
    case "box": {
      // To scale from l, w and h.
      const { l, w, h, diag, base } = fig, extra = diag ? 100 : 170;
      const k = Math.min(extra / (l + 0.5 * w), 62 / (h + 0.35 * w));
      const W = l * k, H = h * k, dx = 0.5 * w * k, dy = -0.35 * w * k, x = diag ? 26 : (220 - W - dx) / 2, y = 80 - H;
      return <Svg>
        <polygon points={P([[x, y], [x + W, y], [x + W + dx, y + dy], [x + dx, y + dy]])} {...thin} />
        <polygon points={P([[x + W, y], [x + W + dx, y + dy], [x + W + dx, y + H + dy], [x + W, y + H]])} {...thin} />
        <rect x={x} y={y} width={W} height={H} fill="#fff" fillOpacity=".55" stroke={c} strokeWidth="1.8" />
        {base && <L a={[x, y + H]} b={[x + W + dx, y + H + dy]} c={MUTED} w={1.6} d="3 3" />}
        {diag && <L a={[x, y + H]} b={[x + W + dx, y + dy]} c={INK} w={2.2} />}
        <T x={x + W / 2} y={y + H + 12}>{l}</T><T x={x - 5} y={y + H / 2 + 4} a="end">{h}</T>
        <T x={x + W + dx / 2 + 5} y={y + H + dy / 2 + 8} a="start">{w}</T>
        {base && <T x={x + W + dx + 18} y={38} a="start">{`Floor diagonal ${base}`}</T>}
        {diag && <T x={x + W + dx + 18} y={56} a="start" w={700}>{`Space diagonal ${diag}`}</T>}
      </Svg>;
    }
    case "cylinder": {
      const cx = 100, rx = 36, ry = 9, t = 14, b = 72;
      return <Svg>
        <path d={`M ${cx - rx} ${t} L ${cx - rx} ${b} A ${rx} ${ry} 0 0 0 ${cx + rx} ${b} L ${cx + rx} ${t}`} fill={soft} stroke={c} strokeWidth="2.2" />
        <path d={`M ${cx - rx} ${b} A ${rx} ${ry} 0 0 1 ${cx + rx} ${b}`} fill="none" stroke={c} strokeWidth="1.3" strokeDasharray="3 3" />
        <ellipse cx={cx} cy={t} rx={rx} ry={ry} fill="#fff" stroke={c} strokeWidth="2.2" />
        <L a={[cx, t]} b={[cx + rx, t]} /><Dot at={[cx, t]} r={2.2} />
        <T x={cx + rx / 2} y={t - 2} s={11} w={700}>{fig.r}</T>
        <T x={cx + rx + 7} y={(t + b) / 2 + 4} a="start" w={700}>{fig.h}</T>
      </Svg>;
    }
    case "cylindernet": {
      const x = 54, y = 26, w = 108, h = 40, r = 13;
      return <Svg>
        <rect x={x} y={y} width={w} height={h} {...thin} />
        <circle cx={x + 26} cy={y - r} r={r} {...thin} /><circle cx={x + 26} cy={y + h + r} r={r} {...thin} />
        <T x={x + w / 2 + 14} y={y + h / 2 + 4}>{fig.around}</T>
        <T x={x + w + 6} y={y + h / 2 + 4} a="start">{fig.h}</T>
        <T x={x + 46} y={y - 9} a="start" s={11}>2 circles</T>
      </Svg>;
    }
    case "cone": {
      const cx = 96, rx = 40, ry = 9, t = 6, b = 74;
      return <Svg>
        <path d={`M ${cx - rx} ${b} L ${cx} ${t} L ${cx + rx} ${b} A ${rx} ${ry} 0 0 1 ${cx - rx} ${b}`} {...shape} />
        <path d={`M ${cx - rx} ${b} A ${rx} ${ry} 0 0 1 ${cx + rx} ${b}`} fill="none" stroke={c} strokeWidth="1.3" strokeDasharray="3 3" />
        <L a={[cx, t]} b={[cx, b]} d="3 3" /><L a={[cx, b]} b={[cx + rx, b]} />
        <RightMark at={[cx, b]} u={[1, 0]} v={[0, -1]} s={6} />
        <T x={cx - 5} y={46} a="end">{fig.h}</T><T x={cx + rx / 2} y={b - 3}>{fig.r}</T>
        <T x={cx + 28} y={36} a="start" w={700}>{fig.s}</T>
      </Svg>;
    }
    case "sphere": {
      const o = [110, 46], R = 40;
      return <Svg>
        <circle cx={o[0]} cy={o[1]} r={R} fill={soft} stroke={c} strokeWidth="2.2" />
        <ellipse cx={o[0]} cy={o[1]} rx={R} ry={9} fill="none" stroke={c} strokeWidth="1.3" strokeDasharray="3 3" />
        <L a={o} b={[o[0] + R, o[1]]} w={2} /><Dot at={o} r={2.4} />
        <T x={o[0] + R / 2} y={o[1] - 4} w={700}>{fig.r}</T>
      </Svg>;
    }
    case "triprism": {
      const A = [38, 76], B = [38 + 12 * fig.b, 76], C = [38, 76 - 12 * fig.h], dx = 84, dy = -18;
      const s = ([x, y]) => [x + dx, y + dy];
      return <Svg>
        <polygon points={P([B, s(B), s(C), C])} {...thin} />
        <L a={A} b={s(A)} c={c} w={1.3} d="3 3" /><L a={s(A)} b={s(B)} c={c} w={1.3} d="3 3" /><L a={s(A)} b={s(C)} c={c} w={1.3} d="3 3" />
        <polygon points={P([A, B, C])} {...shape} />
        <RightMark at={A} u={[1, 0]} v={[0, -1]} s={6} />
        <T x={(A[0] + B[0]) / 2} y={89}>{fig.b}</T><T x={32} y={(A[1] + C[1]) / 2 + 4} a="end">{fig.h}</T>
        <T x={(B[0] + s(B)[0]) / 2 + 8} y={(B[1] + s(B)[1]) / 2 + 10} a="start" w={700}>{fig.l}</T>
      </Svg>;
    }
    case "pyramid": {
      const a = [44, 76], b = [130, 76], d = [168, 54], e = [82, 54], top = [106, 6], mid = [87, 76], centre = [106, 65];
      return <Svg>
        <polygon points={P([a, b, d, e])} {...thin} />
        <polyline points={P([a, top, b])} fill="none" stroke={c} strokeWidth="2.2" strokeLinejoin="round" /><L a={top} b={d} c={c} w={2.2} /><L a={top} b={e} c={c} w={1.3} d="3 3" />
        {fig.t && <><L a={top} b={mid} d="3 3" /><T x={92} y={46} a="end" w={700}>{fig.t}</T></>}
        {fig.h && <><L a={top} b={centre} d="3 3" /><Dot at={centre} r={2} /><T x={111} y={40} a="start" w={700}>{fig.h}</T></>}
        <T x={87} y={89}>{fig.b}</T>
      </Svg>;
    }
    case "nets": {
      const cube = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]], s = 13, cx = 8, cy = 12;
      const px = 76, py = 24, pw = 15, ph = 28, tri = 13, qx = 170, qy = 26, q = 22, qh = 15;
      return <Svg>
        {cube.map(([i, j], k) => <rect key={k} x={cx + i * s} y={cy + j * s} width={s} height={s} {...thin} />)}
        {[0, 1, 2].map((i) => <rect key={i} x={px + i * pw} y={py} width={pw} height={ph} {...thin} />)}
        <polygon points={P([[px + pw, py], [px + 2 * pw, py], [px + 1.5 * pw, py - tri]])} {...thin} />
        <polygon points={P([[px + pw, py + ph], [px + 2 * pw, py + ph], [px + 1.5 * pw, py + ph + tri]])} {...thin} />
        <rect x={qx} y={qy} width={q} height={q} {...thin} />
        {[[[qx, qy], [qx + q, qy], [qx + q / 2, qy - qh]], [[qx, qy + q], [qx + q, qy + q], [qx + q / 2, qy + q + qh]], [[qx, qy], [qx, qy + q], [qx - qh, qy + q / 2]], [[qx + q, qy], [qx + q, qy + q], [qx + q + qh, qy + q / 2]]].map((t, i) =>
          <polygon key={i} points={P(t)} {...thin} />)}
        <T x={34} y={84} s={10}>cube</T><T x={98} y={84} s={10}>triangular prism</T><T x={181} y={84} s={10}>square pyramid</T>
      </Svg>;
    }
    case "solids": {
      return <Svg>
        <rect x="8" y="30" width="30" height="30" {...thin} /><polygon points="8,30 18,20 48,20 38,30" {...thin} /><polygon points="38,30 48,20 48,50 38,60" {...thin} />
        <polygon points="62,60 100,60 112,50 74,50" {...thin} /><polyline points="62,60 87,18 100,60" fill="none" stroke={c} strokeWidth="1.8" strokeLinejoin="round" /><L a={[87, 18]} b={[112, 50]} c={c} />
        <path d="M 122 28 L 122 60 A 14 5 0 0 0 150 60 L 150 28" {...thin} /><ellipse cx="136" cy="28" rx="14" ry="5" fill="#fff" stroke={c} strokeWidth="1.8" />
        <path d="M 164 60 L 180 20 L 196 60 A 16 5 0 0 1 164 60" {...thin} />
        <T x={28} y={80} s={10}>prism</T><T x={86} y={80} s={10}>pyramid</T><T x={136} y={80} s={10}>cylinder</T><T x={180} y={80} s={10}>cone</T>
      </Svg>;
    }
    case "reflect": {
      const t = [[34, 74], [82, 74], [46, 20]], m = t.map(([x, y]) => [220 - x, y]);
      return <Svg>
        <polygon points={P(t)} {...shape} />
        <polygon points={P(m)} fill="none" stroke={c} strokeWidth="2.2" strokeLinejoin="round" strokeDasharray="5 3" />
        <L a={[110, 4]} b={[110, 88]} w={2} d="5 4" />
        <L a={t[2]} b={m[2]} c={MUTED} w={1} d="2 3" />
        <T x={115} y={88} a="start" s={10} c={MUTED}>mirror line</T>
      </Svg>;
    }
    case "translate": {
      const t = [[18, 78], [64, 78], [28, 38]], s = t.map(([x, y]) => [x + 118, y - 30]);
      return <Svg>
        <polygon points={P(t)} {...shape} />
        <polygon points={P(s)} fill="none" stroke={c} strokeWidth="2.2" strokeLinejoin="round" strokeDasharray="5 3" />
        <Arrow a={[72, 58]} b={[128, 36]} />
        <T x={124} y={78} a="start" s={10} c={MUTED}>same shape,</T><T x={124} y={89} a="start" s={10} c={MUTED}>same way up</T>
      </Svg>;
    }
    case "rotate": {
      // A quarter turn clockwise about the dot.
      const o = fig.half ? [168, 48] : [110, 48];
      const t = [[6, -6], [38, -6], [6, -32]].map(([x, y]) => [o[0] + x, o[1] + y]);
      const q = t.map(([x, y]) => { const dx = x - o[0], dy = y - o[1]; return [o[0] - dy, o[1] + dx]; });
      return <Svg>
        {fig.half && <>
          <polygon points={P([[8, 74], [44, 74], [18, 26]])} {...shape} />
          <polygon points={P([[108, 74], [72, 74], [98, 26]])} fill="none" stroke={c} strokeWidth="2.2" strokeLinejoin="round" strokeDasharray="5 3" />
          <L a={[58, 6]} b={[58, 82]} w={2} d="5 4" />
          <T x={58} y={91} s={10} c={MUTED}>reflection</T>
        </>}
        <polygon points={P(t)} {...shape} />
        <polygon points={P(q)} fill="none" stroke={c} strokeWidth="2.2" strokeLinejoin="round" strokeDasharray="5 3" />
        <Dot at={o} />
        <path d={`M ${o[0] + 34} ${o[1] - 16} A 38 38 0 0 1 ${o[0] + 34} ${o[1] + 16}`} fill="none" stroke={INK} strokeWidth="1.6" />
        <polyline points={P([[o[0] + 28.5, o[1] + 15], [o[0] + 34, o[1] + 16], [o[0] + 35.5, o[1] + 10.5]])} fill="none" stroke={INK} strokeWidth="1.6" />
        {fig.half
          ? <T x={o[0] - 14} y={91} s={10} c={MUTED}>rotation</T>
          : <><T x={o[0] - 8} y={o[1] + 2} a="end" s={11}>90° clockwise</T><T x={o[0] - 8} y={o[1] + 16} a="end" s={11} c={MUTED}>about the dot</T></>}
      </Svg>;
    }
    case "symmetry": {
      return <Svg>
        <rect x="24" y="14" width="56" height="56" {...shape} />
        <L a={[52, 6]} b={[52, 78]} d="4 3" /><L a={[16, 42]} b={[88, 42]} d="4 3" /><L a={[18, 8]} b={[86, 76]} d="4 3" /><L a={[86, 8]} b={[18, 76]} d="4 3" />
        <rect x="124" y="24" width="80" height="36" {...shape} />
        <L a={[164, 14]} b={[164, 70]} d="4 3" /><L a={[116, 42]} b={[212, 42]} d="4 3" />
        <T x={52} y={90} s={11}>4 lines</T><T x={164} y={90} s={11}>2 lines</T>
      </Svg>;
    }
    case "numberline": {
      const { lo, hi, from, to } = fig, s = scale([lo, hi], [0, 1], [16, 0, 204, 0]), y = 66;
      const ints = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
      const a = [s.X(from), y], b = [s.X(to), y], ctrl = 6, dir = b[0] > a[0] ? 1 : -1;
      return <Svg>
        <L a={[8, y]} b={[212, y]} />
        {ints.map((n) => <g key={n}><L a={[s.X(n), y - 4]} b={[s.X(n), y + 4]} w={1.3} /><T x={s.X(n)} y={y + 17} s={10} w={n === 0 ? 800 : undefined}>{minus(n)}</T></g>)}
        <path d={`M ${f1(a[0])} ${y - 5} Q ${f1((a[0] + b[0]) / 2)} ${ctrl + 12} ${f1(b[0])} ${y - 6}`} fill="none" stroke={c} strokeWidth="2.4" />
        <polyline points={P([[b[0] - dir * 2, y - 14], [b[0], y - 6], [b[0] - dir * 8.5, y - 8]])} fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <Dot at={a} r={3.6} c={c} /><Dot at={b} r={3.6} c={c} />
        {fig.label && <T x={(a[0] + b[0]) / 2} y={22} w={700}>{fig.label}</T>}
      </Svg>;
    }
    case "inequality": {
      const { lo, hi, value, dir, closed } = fig, s = scale([lo, hi], [0, 1], [16, 0, 204, 0]), y = 54, x = s.X(value), end = dir === "left" ? 10 : 210;
      const ints = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
      return <Svg>
        <L a={[8, y]} b={[212, y]} c={MUTED} w={1.4} />
        {ints.map((n) => <g key={n}><L a={[s.X(n), y - 4]} b={[s.X(n), y + 4]} c={MUTED} w={1.2} /><T x={s.X(n)} y={y + 18} s={10}>{minus(n)}</T></g>)}
        <Arrow a={[x, y]} b={[end, y]} c={c} w={3} />
        <circle cx={x} cy={y} r={5} fill={closed ? c : "#fff"} stroke={c} strokeWidth="2.4" />
        <T x={110} y={24} w={700} s={13}>{fig.label}</T>
      </Svg>;
    }
    case "quadrants": {
      const s = scale([-5.5, 5.5], [-5, 5]);
      return <Svg>
        <Axes s={s} />
        {fig.names && <>
          <T x={s.X(1.2)} y={s.Y(3.8)} s={10} c={MUTED}>1st</T><T x={s.X(-1.2)} y={s.Y(3.8)} s={10} c={MUTED}>2nd</T>
          <T x={s.X(-4.4)} y={s.Y(-1.8)} s={10} c={MUTED}>3rd</T><T x={s.X(4.4)} y={s.Y(-1.8)} s={10} c={MUTED}>4th</T>
        </>}
        {(fig.points || []).map(([x, y, label], i) => <g key={i}><Dot at={[s.X(x), s.Y(y)]} r={3.4} c={c} /><T x={s.X(x) + (x < 0 ? -6 : 6)} y={s.Y(y) + 4} a={x < 0 ? "end" : "start"} s={11} w={700}>{label}</T></g>)}
      </Svg>;
    }
    case "axes3d": {
      const o = [84, 62], ux = [-10, 7.5], uy = [18, 0], uz = [0, -11];
      const [x, y, z] = fig.at, A = [o[0] + x * ux[0], o[1] + x * ux[1]], B = [A[0] + y * uy[0], A[1] + y * uy[1]], Q = [B[0] + z * uz[0], B[1] + z * uz[1]];
      return <Svg>
        <Arrow a={o} b={[o[0] + 3.3 * ux[0], o[1] + 3.3 * ux[1]]} c={MUTED} w={1.6} /><Arrow a={o} b={[190, o[1]]} c={MUTED} w={1.6} /><Arrow a={o} b={[o[0], 6]} c={MUTED} w={1.6} />
        <T x={o[0] + 3.3 * ux[0] - 5} y={o[1] + 3.3 * ux[1] + 2} s={11} a="end" c={MUTED}>x</T><T x={196} y={o[1] + 4} s={11} a="start" c={MUTED}>y</T><T x={o[0] + 7} y={12} s={11} a="start" c={MUTED}>z</T>
        <polyline points={P([A, B, Q])} fill="none" stroke={c} strokeWidth="1.8" strokeDasharray="4 3" />
        <Dot at={Q} r={3.8} c={c} /><T x={Q[0] + 7} y={Q[1] + 3} a="start" w={700}>{fig.label}</T>
      </Svg>;
    }
    case "bearing": {
      const o = [76, 48], d = fig.deg, end = pt(o, 40, 90 - d), m = pt(o, 30, 90 - d / 2);
      return <Svg>
        <Arrow a={o} b={[o[0], 3]} /><T x={o[0] + 6} y={13} a="start" w={800}>N</T>
        <L a={[o[0] - 44, o[1]]} b={[o[0] + 44, o[1]]} c={MUTED} w={1} d="2 3" /><L a={o} b={[o[0], 90]} c={MUTED} w={1} d="2 3" />
        <Wedge c={o} r={20} a1={90 - d} a2={90} fill={c} />
        <Arrow a={o} b={end} c={c} w={2.4} />
        <T x={m[0]} y={m[1] + 4} s={11} w={700}>{`${d}°`}</T>
        <T x={136} y={38} a="start" w={700} s={13}>{fig.label}</T><T x={136} y={54} a="start" s={11}>clockwise</T><T x={136} y={67} a="start" s={11}>from north</T>
      </Svg>;
    }
    case "elevation": {
      const d = fig.deg;
      if (fig.kind === "depression") {
        const h = 62, top = [34, 14], boat = [34 + h / Math.tan(rad(d)), 76];
        const m = pt(top, 52, -d / 2);
        return <Svg>
          <polygon points={`8,14 ${top[0]},14 ${top[0] + 8},76 8,76`} {...thin} />
          <L a={[4, 76]} b={[214, 76]} c={MUTED} /><L a={top} b={[214, 14]} d="4 3" /><L a={top} b={boat} c={c} w={2.2} />
          <Wedge c={top} r={42} a1={-d} a2={0} fill={c} />
          <T x={m[0] + 4} y={m[1] + 4} w={700}>{`${d}°`}</T><T x={22} y={50} w={700} s={11}>{fig.height}</T><T x={(top[0] + boat[0]) / 2 + 8} y={89}>{fig.base}</T><Dot at={boat} r={3.6} c={c} />
          <T x={210} y={10} a="end" s={10} c={MUTED}>horizontal</T>
        </Svg>;
      }
      const e = [28, 76], h = 60, tx = e[0] + h / Math.tan(rad(d)), tt = [tx, 76 - h], m = pt(e, 52, d / 2);
      return <Svg>
        <L a={[8, 76]} b={[212, 76]} c={MUTED} /><L a={e} b={tt} c={c} w={2.2} d="5 3" />
        <L a={[tx, 76]} b={tt} c={c} w={3} /><RightMark at={[tx, 76]} u={[-1, 0]} v={[0, -1]} s={7} />
        <Wedge c={e} r={40} a1={0} a2={d} fill={c} />
        <T x={m[0]} y={m[1] + 4} w={700}>{`${d}°`}</T><T x={(e[0] + tx) / 2} y={89}>{fig.base}</T><T x={tx + 6} y={50} a="start" w={700}>{fig.height}</T>
      </Svg>;
    }
    case "graph": {
      const fn = fig.fn;
      if (fn === "sincos") {
        const s = scale([0, 360], [-1.25, 1.25], [26, 4, 208, 78]);
        return <Svg>
          <Axes s={s} xl="" yl="" />
          <polyline points={curve((x) => Math.sin(rad(x)), s, 0, 360)} fill="none" stroke={c} strokeWidth="2.6" />
          <polyline points={curve((x) => Math.cos(rad(x)), s, 0, 360)} fill="none" stroke={INK} strokeWidth="2" strokeDasharray="5 3" />
          {[90, 180, 270, 360].map((v) => <T key={v} x={s.X(v)} y={90} s={10}>{`${v}°`}</T>)}
          <T x={22} y={s.Y(1) + 4} a="end" s={10}>1</T><T x={22} y={s.Y(-1) + 4} a="end" s={10}>−1</T>
          <T x={s.X(92)} y={s.Y(1) - 2} s={10} w={700} c={c}>sin</T><T x={s.X(330)} y={s.Y(1.08)} s={10} w={700}>cos</T>
        </Svg>;
      }
      if (fn === "exp") {
        const s = scale([-3.5, 3.5], [-1, 9]);
        return <Svg><Axes s={s} /><polyline points={curve((x) => 2 ** x, s, -3.5, 3.15)} fill="none" stroke={c} strokeWidth="2.6" /><Dot at={[s.X(0), s.Y(1)]} c={c} /><T x={s.X(0) - 6} y={s.Y(1) - 5} a="end" w={700} s={11}>(0, 1)</T><T x={s.X(2.4)} y={s.Y(7.6)} a="end" w={700}>{fig.label}</T></Svg>;
      }
      if (fn === "hyperbola") {
        const { h, k, a } = fig, s = scale([h - 6, h + 6], [k - 6, k + 6]), g = (x) => a / (x - h) + k;
        return <Svg>
          <Axes s={s} />
          <L a={[s.X(h), s.t]} b={[s.X(h), s.b]} d="4 3" w={1.3} /><L a={[s.l, s.Y(k)]} b={[s.r, s.Y(k)]} d="4 3" w={1.3} />
          <polyline points={curve(g, s, h + a / 6, h + 6)} fill="none" stroke={c} strokeWidth="2.6" /><polyline points={curve(g, s, h - 6, h - a / 6)} fill="none" stroke={c} strokeWidth="2.6" />
          <T x={s.X(h) + 24} y={s.t + 9} a="start" w={700} s={11}>{fig.xLabel}</T><T x={s.l + 2} y={s.Y(k) - 4} a="start" w={700} s={11}>{fig.yLabel}</T>
        </Svg>;
      }
      if (fn === "cubic") {
        const { h, k } = fig, s = scale([-4, 5], [-4, 8]);
        return <Svg><Axes s={s} /><polyline points={curve((x) => (x - h) ** 3 + k, s, h - 1.8, h + 1.8)} fill="none" stroke={c} strokeWidth="2.6" /><Dot at={[s.X(h), s.Y(k)]} c={c} r={3.6} /><T x={s.X(h) + 8} y={s.Y(k) + 12} a="start" w={700} s={11}>{fig.label}</T></Svg>;
      }
      if (fn === "poly") {
        const s = scale([-2.5, 4.2], [-5, 10]), g = (x) => (x + 1) * (x - 2) * (x - 3);
        return <Svg><Axes s={s} /><polyline points={curve(g, s, -1.3, 3.9)} fill="none" stroke={c} strokeWidth="2.6" />
          {[-1, 2, 3].map((v) => <g key={v}><Dot at={[s.X(v), s.Y(0)]} /><T x={s.X(v) + (v < 0 ? -6 : 0)} y={s.Y(0) - 6} s={11} w={700}>{minus(v)}</T></g>)}
          <Dot at={[s.X(0), s.Y(6)]} c={c} /><T x={s.X(0) - 5} y={s.Y(6) + 4} a="end" s={11} w={700}>6</T>
        </Svg>;
      }
      if (fn === "circle") {
        // Equal scales on both axes, so it stays a true circle.
        const s = scale([-6.5, 9.5], [-4.4, 2.27]), cx = s.X(fig.h), cy = s.Y(fig.k), r = s.X(fig.h + fig.r) - cx;
        return <Svg><Axes s={s} /><circle cx={cx} cy={cy} r={r} fill={soft} stroke={c} strokeWidth="2.4" /><Dot at={[cx, cy]} c={c} /><L a={[cx, cy]} b={[cx + r, cy]} /><T x={cx + r / 2} y={cy + 13} w={700} s={11}>{fig.r}</T><T x={cx + r + 6} y={cy + 16} a="start" s={11} w={700}>{fig.label}</T></Svg>;
      }
      return null;
    }
    case "gradient": {
      // Rise and run drawn to the numbers on the card.
      const { rise, run } = fig, H = 58, W = (H * run) / rise, a = [110 - W / 2, 74], b = [110 + W / 2, 16], mid = [b[0], a[1]];
      const ex = W * 0.14, ey = H * 0.14;
      return <Svg>
        <L a={[a[0] - ex / 3, a[1] + ey / 3]} b={[b[0] + ex, b[1] - ey]} c={c} w={2.6} />
        <L a={a} b={mid} d="4 3" /><L a={mid} b={b} d="4 3" /><RightMark at={mid} u={[-1, 0]} v={[0, -1]} s={6} />
        <Dot at={a} c={c} /><Dot at={b} c={c} />
        <T x={(a[0] + mid[0]) / 2} y={88}>{`run ${run}`}</T><T x={b[0] + 7} y={(a[1] + b[1]) / 2 + 4} a="start">{`rise ${rise}`}</T>
      </Svg>;
    }
    case "readline": {
      // y = mx + c, read across from y and down to x.
      const { m, k, x, xr, yr } = fig, s = scale(xr, yr), y = m * x + k, [p, q] = clipLine(m, k, s, xr, yr);
      return <Svg>
        <Axes s={s} /><L a={p} b={q} c={c} w={2.6} />
        <L a={[s.X(0), s.Y(y)]} b={[s.X(x), s.Y(y)]} d="4 3" /><L a={[s.X(x), s.Y(y)]} b={[s.X(x), s.Y(0)]} d="4 3" />
        <Dot at={[s.X(x), s.Y(y)]} r={3.6} c={c} />
        <T x={s.X(0) - 5} y={s.Y(y) + 4} a="end" w={700} s={11}>{y}</T><T x={s.X(x)} y={s.Y(0) + 12} w={700} s={11}>{x}</T>
        <T x={s.r} y={s.Y(y * 0.4)} a="end" s={11} w={700}>{fig.label}</T>
      </Svg>;
    }
    case "twolines": {
      const { a, b, at, xr, yr } = fig, s = scale(xr, yr), [p1, p2] = clipLine(a[0], a[1], s, xr, yr), [q1, q2] = clipLine(b[0], b[1], s, xr, yr);
      return <Svg><Axes s={s} />
        <L a={p1} b={p2} c={c} w={2.4} /><L a={q1} b={q2} w={2.4} />
        <Dot at={[s.X(at[0]), s.Y(at[1])]} r={4} c={c} /><T x={s.X(at[0]) + 14} y={s.Y(at[1]) + 4} a="start" w={700}>{`(${at[0]}, ${at[1]})`}</T>
      </Svg>;
    }
    case "parperp": {
      const m = [168, 48];
      return <Svg>
        <L a={[14, 78]} b={[70, 18]} c={c} w={2.4} /><L a={[44, 78]} b={[100, 18]} c={c} w={2.4} />
        <T x={60} y={90} s={11}>parallel</T>
        <L a={[m[0] - 42, m[1] + 28]} b={[m[0] + 42, m[1] - 28]} w={2.4} /><L a={[m[0] - 24, m[1] - 36]} b={[m[0] + 18, m[1] + 27]} c={c} w={2.4} />
        <RightMark at={m} u={[0.83, -0.55]} v={[0.55, 0.83]} s={7} />
        <T x={168} y={90} s={11}>perpendicular</T>
      </Svg>;
    }
    case "region": {
      const xr = [-4, 4], yr = [-4, 7], s = scale(xr, yr), [a, b] = clipLine(2, 1, s, xr, yr);
      return <Svg>
        <polygon points={P([a, b, [s.l, s.t], [s.l, s.b]])} fill={`${c}44`} />
        <Axes s={s} /><L a={a} b={b} c={c} w={2.4} d="5 4" />
        <T x={s.X(-2.3)} y={s.Y(4)} w={700}>{fig.label}</T><T x={s.X(2.6)} y={s.Y(-2.5)} s={10} c={MUTED}>not shaded</T>
      </Svg>;
    }
    case "lineparabola": {
      const xr = [-3, 3.4], yr = [-1, 7], s = scale(xr, yr), [a, b] = clipLine(1, 2, s, xr, yr);
      return <Svg><Axes s={s} /><polyline points={curve((x) => x * x, s, -2.6, 2.6)} fill="none" stroke={c} strokeWidth="2.6" /><L a={a} b={b} w={2.2} />
        <Dot at={[s.X(2), s.Y(4)]} c={c} r={3.8} /><Dot at={[s.X(-1), s.Y(1)]} c={c} r={3.8} />
        <T x={s.X(2) + 8} y={s.Y(4) + 11} a="start" w={700} s={11}>(2, 4)</T><T x={s.X(-1.45)} y={s.Y(1.5)} a="end" w={700} s={11}>(−1, 1)</T>
      </Svg>;
    }
    case "rates": {
      // y = x squared: chord from x = 1 to 3, tangent at x = 2 (same gradient).
      const xr = [-0.5, 5], yr = [-1, 11], s = scale(xr, yr);
      return <Svg><Axes s={s} /><polyline points={curve((x) => x * x, s, 0, 3.3)} fill="none" stroke={c} strokeWidth="2.6" />
        <L a={[s.X(1), s.Y(1)]} b={[s.X(3), s.Y(9)]} w={2} d="5 3" />
        <L a={[s.X(1.2), s.Y(0.8)]} b={[s.X(2.9), s.Y(7.6)]} w={2} />
        <Dot at={[s.X(1), s.Y(1)]} r={3.2} /><Dot at={[s.X(3), s.Y(9)]} r={3.2} /><Dot at={[s.X(2), s.Y(4)]} r={3.2} c={c} />
        <T x={s.X(3.3)} y={s.Y(7)} a="start" s={11}>Dashed: chord</T><T x={s.X(3.3)} y={s.Y(4.8)} a="start" s={11}>Solid: tangent</T>
      </Svg>;
    }
    case "scatter": {
      const pts = [[24, 76], [40, 70], [52, 60], [66, 62], [80, 50], [96, 52], [112, 40], [126, 42], [142, 30], [160, 28], [176, 18], [190, 20]];
      return <Svg>
        <L a={[14, 84]} b={[208, 84]} c={MUTED} w={1.2} /><L a={[14, 6]} b={[14, 84]} c={MUTED} w={1.2} />
        {pts.map(([x, y], i) => <Dot key={i} at={[x, y]} c={c} r={3} />)}
        {fig.line && <L a={[18, 80]} b={[200, 14]} w={2} />}
      </Svg>;
    }
    case "linegraph": {
      const pts = [[22, 66], [52, 54], [82, 58], [112, 40], [142, 44], [172, 22], [200, 16]];
      return <Svg>
        <L a={[14, 76]} b={[208, 76]} c={MUTED} w={1.2} /><L a={[14, 6]} b={[14, 76]} c={MUTED} w={1.2} />
        <polyline points={P(pts)} fill="none" stroke={c} strokeWidth="2.4" />{pts.map((p, i) => <Dot key={i} at={p} c={c} r={2.8} />)}
        <T x={110} y={89} s={10} c={MUTED}>time</T>
      </Svg>;
    }
    case "bars": {
      const v = fig.values, w = fig.touch ? 30 : 24, gap = fig.touch ? 0 : 12, m = Math.max(...v), x0 = 110 - (v.length * w + (v.length - 1) * gap) / 2;
      return <Svg>
        <L a={[14, 82]} b={[208, 82]} c={MUTED} w={1.2} /><L a={[14, 6]} b={[14, 82]} c={MUTED} w={1.2} />
        {v.map((n, i) => { const h = (n / m) * 70; return <rect key={i} x={x0 + i * (w + gap)} y={82 - h} width={w} height={h} {...thin} />; })}
      </Svg>;
    }
    case "pie": {
      const o = [58, 46], R = 42, d = (fig.pct / 100) * 360, e = pt(o, R, 90 - d), s = pt(o, R, 90);
      return <Svg>
        <circle cx={o[0]} cy={o[1]} r={R} fill={soft} stroke={c} strokeWidth="2" />
        <path d={`M ${o[0]} ${o[1]} L ${f1(s[0])} ${f1(s[1])} A ${R} ${R} 0 ${d > 180 ? 1 : 0} 1 ${f1(e[0])} ${f1(e[1])} Z`} fill={c} fillOpacity=".6" stroke={c} strokeWidth="2" />
        <T x={112} y={40} a="start" w={700}>{`${fig.pct}% of the circle`}</T><T x={112} y={58} a="start">{`${fig.pct}% × 360° = ${Math.round(d)}°`}</T>
      </Svg>;
    }
    case "fractionbar": {
      const { n, d } = fig, w = 176 / d;
      return <Svg>
        {Array.from({ length: d }, (_, i) => <rect key={i} x={22 + i * w} y={20} width={w} height={36} fill={i < n ? `${c}88` : "#fff"} stroke={c} strokeWidth="2" />)}
        <T x={110} y={76}>{`${n} of ${d} equal parts`}</T>
      </Svg>;
    }
    case "parallelogram": {
      const a = [40, 74], b = [146, 74], e = [176, 18], g = [70, 18];
      return <Svg>
        <polygon points={P([a, b, e, g])} {...shape} />
        <L a={g} b={[70, 74]} d="4 3" /><RightMark at={[70, 74]} u={[1, 0]} v={[0, -1]} s={6} />
        <T x={93} y={88}>{fig.b}</T><T x={76} y={50} a="start" w={700}>{fig.h}</T>
      </Svg>;
    }
    case "trapezium": {
      const a = [28, 74], b = [192, 74], e = [136, 22], g = [70, 22];
      return <Svg>
        <polygon points={P([a, b, e, g])} {...shape} />
        <L a={g} b={[70, 74]} d="4 3" /><RightMark at={[70, 74]} u={[1, 0]} v={[0, -1]} s={6} />
        <T x={103} y={16}>{fig.a}</T><T x={110} y={88}>{fig.b}</T><T x={76} y={52} a="start" w={700}>{fig.h}</T>
      </Svg>;
    }
    case "triangleh": {
      const a = [30, 74], b = [190, 74], t = [84, 14];
      return <Svg>
        <polygon points={P([a, b, t])} {...shape} />
        <L a={t} b={[84, 74]} d="4 3" /><RightMark at={[84, 74]} u={[1, 0]} v={[0, -1]} s={6} />
        <T x={110} y={88}>{fig.b}</T><T x={90} y={50} a="start" w={700}>{fig.h}</T>
      </Svg>;
    }
    case "lshape": {
      // Bottom w1 by h1, with w2 by h2 on its left end.
      const { w1, h1, w2, h2 } = fig, u = Math.min(150 / w1, 62 / (h1 + h2)), W = w1 * u, x = (220 - W) / 2, y = 14;
      const pts = [[x, y], [x + w2 * u, y], [x + w2 * u, y + h2 * u], [x + W, y + h2 * u], [x + W, y + (h1 + h2) * u], [x, y + (h1 + h2) * u]];
      return <Svg>
        <polygon points={P(pts)} {...shape} />
        <L a={[x, y + h2 * u]} b={[x + w2 * u, y + h2 * u]} d="4 3" />
        <T x={x + W / 2} y={y + (h1 + h2) * u + 13}>{w1}</T><T x={x + W + 6} y={y + (h2 + h1 / 2) * u + 4} a="start">{h1}</T>
        <T x={x + (w2 * u) / 2} y={y - 3}>{w2}</T><T x={x - 6} y={y + (h2 * u) / 2 + 4} a="end">{h2}</T>
      </Svg>;
    }
    case "rectsemi": {
      // Rectangle w by h with a semicircle on the h side.
      const H = 58, W = (H * fig.w) / fig.h, x = 110 - (W + H / 2) / 2, y = 14, R = H / 2;
      return <Svg>
        <path d={`M ${x} ${y} L ${x + W} ${y} A ${R} ${R} 0 0 1 ${x + W} ${y + H} L ${x} ${y + H} Z`} {...shape} />
        <L a={[x + W, y]} b={[x + W, y + H]} d="4 3" />
        <T x={x + W / 2} y={y + H + 13}>{fig.w}</T><T x={x + W - 6} y={y + H / 2 + 4} a="end">{fig.h}</T>
      </Svg>;
    }
    case "matchsticks": {
      const sq = (x, n) => Array.from({ length: n }, (_, i) => <rect key={i} x={x + i * 18} y={22} width={18} height={18} fill="none" stroke={c} strokeWidth="2.6" />);
      return <Svg>
        {sq(14, 1)}{sq(54, 2)}{sq(112, 3)}
        <T x={23} y={60} s={10}>4 sticks</T><T x={72} y={60} s={10}>7 sticks</T><T x={139} y={60} s={10}>10 sticks</T>
        <T x={194} y={36} s={11} w={700}>+3</T><T x={110} y={80} s={11}>Each new square adds 3</T>
      </Svg>;
    }
    case "tessellation": {
      const R = 21, h = (R * Math.sqrt(3)) / 2, cells = [];
      for (let col = 0; col < 7; col++) for (let row = -1; row < 3; row++) {
        const o = [12 + col * R * 1.5 + 12, 10 + row * 2 * h + (col % 2 ? h : 0)];
        cells.push(<polygon key={`${col}-${row}`} points={P(Array.from({ length: 6 }, (_, i) => pt(o, R, 60 * i)))} fill={(((col + 2 * row) % 3) + 3) % 3 === 0 ? `${c}55` : "#fff"} stroke={c} strokeWidth="1.8" />);
      }
      return <Svg>{cells}</Svg>;
    }
    case "network": {
      const v = { A: [26, 46], B: [94, 12], C: [94, 80], D: [162, 46] };
      const onPath = (a, b) => (fig.path || []).some((_, i, p) => (p[i] === a && p[i + 1] === b) || (p[i] === b && p[i + 1] === a));
      return <Svg>
        {fig.edges.map(([a, b, w], i) => {
          const mx = (v[a][0] + v[b][0]) / 2, my = (v[a][1] + v[b][1]) / 2;
          return <g key={i}><L a={v[a]} b={v[b]} c={onPath(a, b) ? INK : c} w={onPath(a, b) ? 3.4 : 2.2} />{w && <T x={mx + (mx < 94 ? -8 : 8)} y={my + (my < 46 ? -3 : 12)} w={700}>{w}</T>}</g>;
        })}
        {Object.entries(v).map(([k, p]) => { const hot = (fig.odd || []).includes(k); return <g key={k}><circle cx={p[0]} cy={p[1]} r={9} fill={hot ? c : "#fff"} stroke={INK} strokeWidth="1.8" /><T x={p[0]} y={p[1] + 4} s={11} w={700} c={hot ? "#fff" : INK} halo={hot ? c : "#fff"}>{k}</T></g>; })}
        {(fig.caption || []).map((t, i) => <T key={i} x={178} y={40 + i * 14} a="start" s={11} w={i === 0 ? 700 : undefined}>{t}</T>)}
      </Svg>;
    }
    case "planar": {
      const sq = (x) => ({ a: [x, 14], b: [x + 56, 14], d: [x + 56, 70], e: [x, 70] });
      const node = (p, k) => <circle key={k} cx={p[0]} cy={p[1]} r={5} fill="#fff" stroke={INK} strokeWidth="1.8" />;
      const l = sq(22), r = sq(136);
      return <Svg>
        <polygon points={P([l.a, l.b, l.d, l.e])} fill="none" stroke={c} strokeWidth="2.2" /><L a={l.a} b={l.d} c={c} w={2.2} /><L a={l.b} b={l.e} c={c} w={2.2} />
        {[l.a, l.b, l.d, l.e].map(node)}
        <polygon points={P([r.a, r.b, r.d, r.e])} fill="none" stroke={c} strokeWidth="2.2" /><L a={r.a} b={r.d} c={c} w={2.2} />
        <path d={`M ${r.b[0]} ${r.b[1]} C ${r.b[0] + 40} ${r.b[1] - 6}, ${r.d[0] + 26} ${r.d[1] + 30}, ${r.e[0]} ${r.e[1]}`} fill="none" stroke={c} strokeWidth="2.2" />
        {[r.a, r.b, r.d, r.e].map(node)}
        <T x={50} y={88} s={10}>edges cross</T><T x={164} y={90} s={10}>same graph, planar</T>
      </Svg>;
    }
    case "tree": {
      const [a, b] = fig.labels, [p1, p2, p3, p4, p5, p6] = fig.probs;
      const root = [12, 46], m1 = [84, 22], m2 = [84, 70], ends = [[156, 10], [156, 34], [156, 58], [156, 82]];
      const edge = (p, q, t, up) => <><L a={p} b={q} c={c} w={1.8} /><T x={(p[0] + q[0]) / 2 - 2} y={(p[1] + q[1]) / 2 + (up ? -4 : 12)} s={11}>{t}</T></>;
      return <Svg>
        {edge(root, m1, p1, true)}{edge(root, m2, p2, false)}
        {edge(m1, ends[0], p3, true)}{edge(m1, ends[1], p4, false)}{edge(m2, ends[2], p5, true)}{edge(m2, ends[3], p6, false)}
        {[a + a, a + b, b + a, b + b].map((t, i) => <T key={t} x={162} y={ends[i][1] + 4} a="start" w={700} s={11}>{t}</T>)}
      </Svg>;
    }
    case "bell": {
      const s = scale([-3.4, 3.4], [0, 0.44], [14, 6, 206, 74]), g = (x) => Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI);
      const area = [[s.X(-2), s.b], ...Array.from({ length: 41 }, (_, i) => { const x = -2 + (4 * i) / 40; return [s.X(x), s.Y(g(x))]; }), [s.X(2), s.b]];
      return <Svg>
        <polygon points={P(area)} fill={`${c}44`} />
        <polyline points={curve(g, s, -3.4, 3.4)} fill="none" stroke={c} strokeWidth="2.4" /><L a={[14, 74]} b={[206, 74]} c={MUTED} w={1.2} />
        {[[-2, fig.lo], [0, fig.mid], [2, fig.hi]].map(([x, t]) => <g key={x}><L a={[s.X(x), 72]} b={[s.X(x), 77]} w={1.3} /><T x={s.X(x)} y={88} s={11}>{t}</T></g>)}
        <T x={s.X(0)} y={54} w={700} s={12}>about 95%</T>
      </Svg>;
    }
    case "ogive": {
      const s = scale([0, 10], [0, 40], [28, 6, 208, 76]), g = (x) => 40 / (1 + Math.exp(-(x - 5) * 1.2));
      return <Svg>
        <L a={[28, 76]} b={[208, 76]} c={MUTED} w={1.2} /><L a={[28, 6]} b={[28, 76]} c={MUTED} w={1.2} />
        <polyline points={curve(g, s, 0, 10)} fill="none" stroke={c} strokeWidth="2.4" />
        <L a={[28, s.Y(20)]} b={[s.X(5), s.Y(20)]} d="4 3" /><L a={[s.X(5), s.Y(20)]} b={[s.X(5), 76]} d="4 3" />
        <T x={s.X(5)} y={88} s={11} w={700}>median</T><T x={24} y={s.Y(20) + 4} a="end" s={11}>20</T><T x={24} y={s.Y(40) + 8} a="end" s={11}>40</T>
      </Svg>;
    }
    case "oblique": {
      // To scale from the angles at A and B.
      const dA = fig.A, dB = fig.B, h = 58, y = 74, base = h / Math.tan(rad(dA)) + h / Math.tan(rad(dB)), x0 = (220 - base) / 2;
      const A = [x0, y], B = [x0 + base, y], C = [x0 + h / Math.tan(rad(dA)), y - h], cA = angleOf(C, A), cB = angleOf(C, B), bC = angleOf(B, C);
      const has = (k) => (fig.mark || []).includes(k);
      return <Svg>
        <polygon points={P([A, B, C])} {...shape} />
        {has("A") && <Wedge c={A} r={16} a1={0} a2={dA} fill={c} />}{has("B") && <Wedge c={B} r={16} a1={bC} a2={180} fill={c} />}{has("C") && <Wedge c={C} r={16} a1={cA} a2={cB} fill={c} />}
        <T x={A[0] - 6} y={y + 4} a="end" w={700}>A</T><T x={B[0] + 6} y={y + 4} a="start" w={700}>B</T><T x={C[0]} y={C[1] - 4} w={700}>C</T>
        {fig.angA && <T x={pt(A, 28, dA / 2)[0]} y={pt(A, 28, dA / 2)[1] + 4} s={11} w={700}>{fig.angA}</T>}
        {fig.angB && <T x={pt(B, 28, 180 - dB / 2)[0]} y={pt(B, 28, 180 - dB / 2)[1] + 4} s={11} w={700}>{fig.angB}</T>}
        {fig.angC && <T x={pt(C, 28, (cA + cB) / 2)[0]} y={pt(C, 28, (cA + cB) / 2)[1] + 4} s={11} w={700}>{fig.angC}</T>}
        <T x={(B[0] + C[0]) / 2 + 6} y={(B[1] + C[1]) / 2} a="start">{fig.a}</T>
        <T x={(A[0] + C[0]) / 2 - 6} y={(A[1] + C[1]) / 2} a="end">{fig.b}</T>
        <T x={(A[0] + B[0]) / 2} y={88}>{fig.c}</T>
      </Svg>;
    }
    case "unitcircle": {
      const o = [66, 46], R = 40, p = pt(o, R, 40);
      return <Svg>
        <L a={[14, o[1]]} b={[118, o[1]]} c={MUTED} w={1.2} /><L a={[o[0], 2]} b={[o[0], 90]} c={MUTED} w={1.2} />
        <circle cx={o[0]} cy={o[1]} r={R} fill={soft} stroke={c} strokeWidth="2.2" />
        <L a={o} b={p} c={c} w={2.2} /><L a={p} b={[p[0], o[1]]} d="3 3" />
        <Wedge c={o} r={12} a1={0} a2={40} fill={c} /><Dot at={p} c={c} />
        <T x={o[0] + 18} y={o[1] - 3} s={10} i>θ</T>
        <T x={124} y={30} a="start" w={700}>(cos θ, sin θ)</T><T x={124} y={48} a="start">radius 1</T>
      </Svg>;
    }
    case "dst": {
      const A = [110, 6], B = [50, 84], C = [170, 84];
      return <Svg>
        <polygon points={P([A, B, C])} {...shape} />
        <L a={[80, 45]} b={[140, 45]} c={c} /><L a={[110, 45]} b={[110, 84]} c={c} />
        <T x={110} y={36} s={16} w={800}>D</T><T x={91} y={72} s={16} w={800}>S</T><T x={129} y={72} s={16} w={800}>T</T>
      </Svg>;
    }
    default:
      return null;
  }
}

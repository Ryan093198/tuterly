// Small diagrams for mind map cards, drawn as SVG so they print crisply.
// Each figure is described in the map's JSON: { "type": "...", ... }.
const INK = "#0b1a2c";
const MUTED = "#5b6677";

export default function Figure({ fig, colour }) {
  const c = colour || "#0e9fbf";
  const box = { width: "100%", height: "calc(100px * var(--s, 1))", display: "block", flexShrink: 0 };
  switch (fig?.type) {
    case "right-triangle": {
      // Right angle bottom-right, angle θ bottom-left.
      const l = fig.labels || {};
      return (
        <svg viewBox="0 0 220 92" style={box} role="img" aria-label={fig.alt || "Right-angled triangle"}>
          <polygon points="30,80 170,80 170,14" fill={`${c}22`} stroke={c} strokeWidth="2.5" strokeLinejoin="round" />
          <polyline points="160,80 160,70 170,70" fill="none" stroke={c} strokeWidth="1.8" />
          {fig.angle && <path d="M 52 80 A 22 22 0 0 0 50 71" fill="none" stroke={INK} strokeWidth="1.6" />}
          {fig.angle && <text x="58" y="76" fontSize="12" fill={INK} fontStyle="italic">{fig.angle}</text>}
          {l.base && <text x="100" y="91" fontSize="11.5" fill={INK} textAnchor="middle">{l.base}</text>}
          {l.height && <text x="176" y="51" fontSize="11.5" fill={INK}>{l.height}</text>}
          {l.hyp && <text x="92" y="40" fontSize="11.5" fill={INK} textAnchor="end">{l.hyp}</text>}
        </svg>
      );
    }
    case "line": {
      // A straight line through two labelled intercepts.
      const { xLabel = "", yLabel = "", rising = true } = fig;
      const [x1, y1, x2, y2] = rising ? [40, 84, 200, 8] : [40, 8, 200, 84];
      return (
        <svg viewBox="0 0 220 92" style={box} role="img" aria-label={fig.alt || "Straight line graph"}>
          <line x1="10" y1="62" x2="214" y2="62" stroke={MUTED} strokeWidth="1.2" />
          <line x1="100" y1="2" x2="100" y2="90" stroke={MUTED} strokeWidth="1.2" />
          <text x="208" y="74" fontSize="11" fill={MUTED}>x</text>
          <text x="105" y="11" fontSize="11" fill={MUTED}>y</text>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="2.8" strokeLinecap="round" />
          {fig.yPoint && <circle cx="100" cy={rising ? 55.5 : 36.5} r="3.5" fill={c} />}
          {fig.xPoint && <circle cx={rising ? 86 : 154} cy="62" r="3.5" fill={c} />}
          {yLabel && <text x="106" y={rising ? 50 : 32} fontSize="11" fill={INK}>{yLabel}</text>}
          {xLabel && <text x={rising ? 82 : 158} y="78" fontSize="11" fill={INK} textAnchor={rising ? "end" : "start"}>{xLabel}</text>}
        </svg>
      );
    }
    case "parabola": {
      // Upright (or upside-down) parabola with optional labels. xAxisY and
      // yAxisX place the axes, so the turning point and intercepts sit where
      // the labels say (the vertex is at x 110, y 73 up or 19 down; the curve
      // crosses y 62 at x 86 and 134).
      const up = fig.up !== false;
      const ax = fig.xAxisY ?? 62, ay = fig.yAxisX ?? 110;
      const d = up ? "M 50 6 Q 110 140 170 6" : "M 50 86 Q 110 -48 170 86";
      return (
        <svg viewBox="0 0 220 92" style={box} role="img" aria-label={fig.alt || "Parabola"}>
          <line x1="10" y1={ax} x2="214" y2={ax} stroke={MUTED} strokeWidth="1.2" />
          <line x1={ay} y1="2" x2={ay} y2="90" stroke={MUTED} strokeWidth="1.2" />
          {fig.axis && <line x1="110" y1="2" x2="110" y2="90" stroke={c} strokeWidth="1.2" strokeDasharray="3 3" />}
          <path d={d} fill="none" stroke={c} strokeWidth="2.8" strokeLinecap="round" />
          {fig.turning && <circle cx="110" cy={up ? 73 : 19} r="3.5" fill={c} />}
          {fig.turning && (fig.roots
            ? <text x="110" y="89" fontSize="11" fill={INK} textAnchor="middle">{fig.turning}</text>
            : <text x="118" y={up ? 86 : 12} fontSize="11" fill={INK}>{fig.turning}</text>)}
          {fig.roots && <circle cx="86" cy="62" r="3.2" fill={INK} />}
          {fig.roots && <circle cx="134" cy="62" r="3.2" fill={INK} />}
          {fig.roots && <text x="86" y="76" fontSize="11" fill={INK} textAnchor="end">{fig.roots[0]}</text>}
          {fig.roots && <text x="134" y="76" fontSize="11" fill={INK}>{fig.roots[1]}</text>}
        </svg>
      );
    }
    case "venn": {
      const [a = "", both = "", b = "", out = ""] = fig.counts || [];
      return (
        <svg viewBox="0 0 220 92" style={box} role="img" aria-label={fig.alt || "Venn diagram"}>
          <rect x="16" y="4" width="188" height="84" rx="10" fill="none" stroke={MUTED} strokeWidth="1.2" />
          <circle cx="88" cy="47" r="34" fill={`${c}26`} stroke={c} strokeWidth="2.2" />
          <circle cx="132" cy="47" r="34" fill={`${c}26`} stroke={c} strokeWidth="2.2" />
          <text x="62" y="20" fontSize="12" fontWeight="700" fill={INK}>A</text>
          <text x="152" y="20" fontSize="12" fontWeight="700" fill={INK}>B</text>
          <text x="72" y="52" fontSize="13" fill={INK} textAnchor="middle">{a}</text>
          <text x="110" y="52" fontSize="13" fill={INK} textAnchor="middle">{both}</text>
          <text x="148" y="52" fontSize="13" fill={INK} textAnchor="middle">{b}</text>
          <text x="194" y="82" fontSize="13" fill={INK} textAnchor="end">{out}</text>
        </svg>
      );
    }
    case "boxplot": {
      // Five-number summary on a scale from lo to hi.
      const [mn, q1, med, q3, mx] = fig.five;
      const lo = fig.lo ?? mn, hi = fig.hi ?? mx;
      const X = (v) => 18 + ((v - lo) / (hi - lo)) * 184;
      return (
        <svg viewBox="0 0 220 92" style={box} role="img" aria-label={fig.alt || "Box plot"}>
          <line x1={X(mn)} y1="34" x2={X(q1)} y2="34" stroke={INK} strokeWidth="1.8" />
          <line x1={X(q3)} y1="34" x2={X(mx)} y2="34" stroke={INK} strokeWidth="1.8" />
          <line x1={X(mn)} y1="26" x2={X(mn)} y2="42" stroke={INK} strokeWidth="1.8" />
          <line x1={X(mx)} y1="26" x2={X(mx)} y2="42" stroke={INK} strokeWidth="1.8" />
          <rect x={X(q1)} y="18" width={X(q3) - X(q1)} height="32" fill={`${c}26`} stroke={c} strokeWidth="2.2" rx="3" />
          <line x1={X(med)} y1="18" x2={X(med)} y2="50" stroke={c} strokeWidth="2.6" />
          <line x1="18" y1="66" x2="202" y2="66" stroke={MUTED} strokeWidth="1.2" />
          {[mn, q1, med, q3, mx].map((v, i) => (
            <text key={i} x={X(v)} y="82" fontSize="11" fill={INK} textAnchor="middle">{v}</text>
          ))}
        </svg>
      );
    }
    default:
      return null;
  }
}

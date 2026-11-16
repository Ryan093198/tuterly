"use client";

import { useRef, useState } from "react";

// The two NAPLAN Online "technology-enhanced" question types (16 Nov 2026).
//
// OrderQuestion: drag the items into order (or use the arrow buttons, which
//   also work on phones and with a keyboard). value = array of item indexes.
// HotspotQuestion: click a point on a grid; clicks snap to the nearest whole
//   coordinates. value = [x, y].

export function OrderQuestion({ n, items, value, onChange, disabled, correctOrder }) {
  const order = value || items.map((_, i) => i);
  const [drag, setDrag] = useState(null);

  const move = (from, to) => {
    if (disabled || to < 0 || to >= order.length || from === to) return;
    const next = [...order];
    const [it] = next.splice(from, 1);
    next.splice(to, 0, it);
    onChange(next);
  };

  return (
    <div className="nq-order">
      <ol className="nq-order__list" aria-label={`Question ${n}: put these in order`}>
        {order.map((itemIdx, pos) => {
          const right = correctOrder ? correctOrder[pos] === itemIdx : null;
          return (
            <li
              key={itemIdx}
              className={`nq-order__item ${drag === pos ? "is-drag" : ""} ${right === true ? "is-right" : right === false ? "is-wrong" : ""}`}
              draggable={!disabled}
              onDragStart={(e) => { setDrag(pos); e.dataTransfer.effectAllowed = "move"; }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); if (drag !== null) move(drag, pos); setDrag(null); }}
              onDragEnd={() => setDrag(null)}
            >
              <span className="nq-order__grip" aria-hidden="true">⠿</span>
              <span className="nq-order__pos" aria-hidden="true">{pos + 1}</span>
              <span className="nq-order__text">{items[itemIdx]}</span>
              {!disabled && (
                <span className="nq-order__btns">
                  <button type="button" aria-label="Move up" disabled={pos === 0} onClick={() => move(pos, pos - 1)}>↑</button>
                  <button type="button" aria-label="Move down" disabled={pos === order.length - 1} onClick={() => move(pos, pos + 1)}>↓</button>
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {!disabled && <p className="nq-note">Drag to reorder, or use the arrows. First goes at the top.</p>}
      {correctOrder && (
        <p className="nq-note">Correct order: {correctOrder.map((i, k) => <span key={i}>{k > 0 ? ", " : ""}{items[i]}</span>)}</p>
      )}
    </div>
  );
}

export function HotspotQuestion({ n, grid, value, onChange, disabled, answer }) {
  const svgRef = useRef(null);
  const { xmin, xmax, ymin, ymax } = grid;
  const cols = xmax - xmin;
  const rows = ymax - ymin;
  const U = 30; // px per unit in the viewBox
  const PAD = 18;
  const W = cols * U + PAD * 2;
  const H = rows * U + PAD * 2;
  const sx = (x) => PAD + (x - xmin) * U;
  const sy = (y) => PAD + (ymax - y) * U;

  function click(e) {
    if (disabled) return;
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    const x = Math.round((p.x - PAD) / U + xmin);
    const y = Math.round(ymax - (p.y - PAD) / U);
    if (x < xmin || x > xmax || y < ymin || y > ymax) return;
    onChange([x, y]);
  }

  function key(e) {
    if (disabled) return;
    const [x, y] = value || [0, 0];
    const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
    if (!d) return;
    e.preventDefault();
    onChange([Math.min(xmax, Math.max(xmin, x + d[0])), Math.min(ymax, Math.max(ymin, y + d[1]))]);
  }

  // A line y = mx + c, clipped to the grid.
  const seg = (m, c) => {
    const pts = [];
    for (const x of [xmin, xmax]) { const y = m * x + c; if (y >= ymin && y <= ymax) pts.push([x, y]); }
    for (const y of [ymin, ymax]) { const x = (y - c) / m; if (x > xmin && x < xmax) pts.push([x, y]); }
    return pts.slice(0, 2);
  };
  const right = answer && value ? value[0] === answer[0] && value[1] === answer[1] : null;

  return (
    <div className="nq-hot">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className={`nq-hot__svg ${disabled ? "" : "is-live"}`}
        role="application"
        aria-label={`Question ${n} grid. Click a point, or use the arrow keys.${value ? ` Selected (${value[0]}, ${value[1]}).` : ""}`}
        tabIndex={disabled ? -1 : 0}
        onClick={click}
        onKeyDown={key}
      >
        {Array.from({ length: cols + 1 }, (_, i) => xmin + i).map((x) => (
          <line key={`v${x}`} x1={sx(x)} x2={sx(x)} y1={sy(ymax)} y2={sy(ymin)} className={x === 0 ? "nq-axis" : "nq-gridline"} />
        ))}
        {Array.from({ length: rows + 1 }, (_, i) => ymin + i).map((y) => (
          <line key={`h${y}`} y1={sy(y)} y2={sy(y)} x1={sx(xmin)} x2={sx(xmax)} className={y === 0 ? "nq-axis" : "nq-gridline"} />
        ))}
        {Array.from({ length: cols + 1 }, (_, i) => xmin + i).filter((x) => x !== 0).map((x) => (
          <text key={`tx${x}`} x={sx(x)} y={sy(0) + 13} className="nq-tick" textAnchor="middle">{x}</text>
        ))}
        {Array.from({ length: rows + 1 }, (_, i) => ymin + i).filter((y) => y !== 0).map((y) => (
          <text key={`ty${y}`} x={sx(0) - 5} y={sy(y) + 4} className="nq-tick" textAnchor="end">{y}</text>
        ))}
        <text x={sx(xmax) - 2} y={sy(0) - 6} className="nq-axislabel" textAnchor="end">x</text>
        <text x={sx(0) + 7} y={sy(ymax) + 12} className="nq-axislabel">y</text>
        {(grid.lines || []).map((l, i) => {
          const s = seg(l.m, l.c);
          if (s.length < 2) return null;
          const lx = l.m > 0 ? s[1] : s[0];
          return (
            <g key={i}>
              <line x1={sx(s[0][0])} y1={sy(s[0][1])} x2={sx(s[1][0])} y2={sy(s[1][1])} className={`nq-line nq-line--${i}`} />
              <text x={sx(lx[0]) + (l.m > 0 ? -6 : 6)} y={sy(lx[1]) + (l.m > 0 ? 14 : -6)} textAnchor={l.m > 0 ? "end" : "start"} className={`nq-linelabel nq-line--${i}`}>{l.label}</text>
            </g>
          );
        })}
        {(grid.points || []).map((p) => (
          <g key={p.label}>
            <circle cx={sx(p.x)} cy={sy(p.y)} r="5" className="nq-given" />
            <text x={sx(p.x) + 8} y={sy(p.y) - 8} className="nq-givenlabel">{p.label}</text>
          </g>
        ))}
        {answer && right === false && (
          <circle cx={sx(answer[0])} cy={sy(answer[1])} r="9" className="nq-answer" />
        )}
        {value && (
          <g className={`nq-pick ${right === true ? "is-right" : right === false ? "is-wrong" : ""}`}>
            <circle cx={sx(value[0])} cy={sy(value[1])} r="9" />
            <circle cx={sx(value[0])} cy={sy(value[1])} r="3.5" className="nq-pick__dot" />
          </g>
        )}
      </svg>
      <p className="nq-note">
        {value ? <>You chose <strong>({value[0]}, {value[1]})</strong>.</> : "Click a point on the grid."}
        {answer && right === false && <> The answer is ({answer[0]}, {answer[1]}), circled in green.</>}
      </p>
    </div>
  );
}

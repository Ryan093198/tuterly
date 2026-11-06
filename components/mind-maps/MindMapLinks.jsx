"use client";

import { useEffect } from "react";

// Draws the curved lines from the title strip to each card, and scales the
// fixed-size sheet to fit its frame. In export mode with ?pdf=1 the sheet is
// zoomed to exactly one A4 landscape page.
const W = 1680;

export default function MindMapLinks({ mode }) {
  useEffect(() => {
    const frame = document.querySelector("[data-mm-frame]");
    const sheet = frame?.querySelector("[data-mm-sheet]");
    if (!sheet) return;

    // Phones get the stacked card list (mind-maps.css), no scaling or lines.
    const stacked = () => mode !== "export" && window.matchMedia("(max-width: 899px)").matches;

    const fit = () => {
      if (stacked()) { sheet.style.zoom = "1"; return; }
      if (mode === "export") {
        const pdf = new URLSearchParams(window.location.search).has("pdf");
        sheet.style.zoom = pdf ? String(1122 / W) : "1";
        return;
      }
      sheet.style.zoom = String(Math.min(1, frame.clientWidth / W));
    };

    const draw = () => {
      const svg = sheet.querySelector("[data-mm-links]");
      const hubEl = sheet.querySelector("[data-mm-hub]");
      if (!svg || !hubEl) return;
      if (stacked()) { svg.innerHTML = ""; return; }
      // Work in the sheet's own units, whatever the zoom.
      const k = sheet.getBoundingClientRect().width / sheet.offsetWidth || 1;
      const base = sheet.getBoundingClientRect();
      const box = (n) => {
        const r = n.getBoundingClientRect();
        return { left: (r.left - base.left) / k, right: (r.right - base.left) / k, top: (r.top - base.top) / k, bottom: (r.bottom - base.top) / k };
      };
      const hub = box(hubEl);
      const ns = "http://www.w3.org/2000/svg";
      svg.innerHTML = "";
      sheet.querySelectorAll("[data-mm-card]").forEach((card) => {
        const r = box(card);
        const cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2;
        const colour = getComputedStyle(card).getPropertyValue("--c").trim();
        let d, ex, ey;
        if (r.right < hub.left) {
          const sy = Math.min(Math.max(cy, hub.top + 24), hub.bottom - 24);
          ex = r.right; ey = cy; const mx = (hub.left + ex) / 2;
          d = `M ${hub.left} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`;
        } else if (r.left > hub.right) {
          const sy = Math.min(Math.max(cy, hub.top + 24), hub.bottom - 24);
          ex = r.left; ey = cy; const mx = (hub.right + ex) / 2;
          d = `M ${hub.right} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`;
        } else {
          const sx = Math.min(Math.max(cx, hub.left + 40), hub.right - 40);
          const above = cy < (hub.top + hub.bottom) / 2;
          const sy = above ? hub.top : hub.bottom;
          ex = cx; ey = above ? r.bottom : r.top; const my = (sy + ey) / 2;
          d = `M ${sx} ${sy} C ${sx} ${my}, ${ex} ${my}, ${ex} ${ey}`;
        }
        const p = document.createElementNS(ns, "path");
        p.setAttribute("d", d);
        p.setAttribute("fill", "none");
        p.setAttribute("stroke", colour);
        p.setAttribute("stroke-width", "5");
        p.setAttribute("stroke-linecap", "round");
        p.setAttribute("opacity", ".55");
        svg.appendChild(p);
        const dot = document.createElementNS(ns, "circle");
        dot.setAttribute("cx", ex); dot.setAttribute("cy", ey); dot.setAttribute("r", "7"); dot.setAttribute("fill", colour);
        svg.appendChild(dot);
      });
      sheet.setAttribute("data-mm-ready", "1");
    };

    // Grow the text on sparse maps: the biggest scale (up to 1.4x) at which
    // no card overflows. Same scale for every card on the sheet.
    const grow = () => {
      if (stacked()) { sheet.style.setProperty("--s", "1"); return; }
      const cards = [...sheet.querySelectorAll("[data-mm-card]")];
      const over = (c) => c.scrollHeight > c.clientHeight + 1;
      const fits = (v) => { sheet.style.setProperty("--s", String(v)); return cards.every((c) => !over(c)); };
      cards.forEach((c) => c.style.removeProperty("--fh"));
      if (!fits(1)) {
        // A crowded card gets a smaller diagram rather than clipped text.
        sheet.style.setProperty("--s", "1");
        cards.filter(over).forEach((c) => {
          for (let h = 92; h >= 72 && over(c); h -= 4) c.style.setProperty("--fh", `${h}px`);
        });
        return;
      }
      let lo = 1, hi = 1.4;
      for (let i = 0; i < 8; i++) { const mid = (lo + hi) / 2; if (fits(mid)) lo = mid; else hi = mid; }
      // A little headroom so rounding never tips a card over.
      sheet.style.setProperty("--s", Math.max(1, lo * 0.98).toFixed(3));
    };

    const run = () => { grow(); fit(); draw(); };
    run();
    document.fonts?.ready.then(run);
    const ro = new ResizeObserver(run);
    ro.observe(frame);
    return () => ro.disconnect();
  }, [mode]);
  return null;
}

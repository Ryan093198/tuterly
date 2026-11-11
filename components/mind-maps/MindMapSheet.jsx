import { QuinnFigure } from "@/components/brand/QuinnArt";
import "katex/dist/katex.min.css";
import Figure from "@/components/mind-maps/Figure";
import MindMapLinks from "@/components/mind-maps/MindMapLinks";
import { PALETTE, layoutFor, rich } from "@/lib/mind-maps";
import "./mind-maps.css";

// One A4-landscape mind map (1680 x 1188 design pixels, scaled to fit).
// mode "page": scaled into the page on wide screens, stacked cards on
// phones. mode "export": the bare sheet, for the PNG and PDF renderer.
export default function MindMapSheet({ map, mode = "page" }) {
  const spots = layoutFor(map.cards.length);
  const cards = map.cards.map((card, i) => ({ ...card, n: i + 1, colour: PALETTE[i % PALETTE.length], spot: spots[i] }));
  return (
    <div className={`mm-frame mm-frame--${mode}`} data-mm-frame>
      <div className="mm-sheet" data-mm-sheet>
        <svg className="mm-links" data-mm-links aria-hidden="true" />
        <div className="mm-grid">
          {cards.map((c) => (
            <section key={c.n} className="mm-card" data-mm-card style={{ "--c": c.colour, gridColumn: c.spot.col, gridRow: c.spot.row }}>
              <h3 className="mm-card__title">
                <span className="mm-num">{c.n}</span>
                <span dangerouslySetInnerHTML={{ __html: rich(c.title) }} />
              </h3>
              {c.rule && <p className="mm-rule" dangerouslySetInnerHTML={{ __html: rich(c.rule) }} />}
              {(c.lines || []).map((l, i) => (
                <p key={i} className="mm-line" dangerouslySetInnerHTML={{ __html: rich(l) }} />
              ))}
              {c.note && <p className="mm-note" dangerouslySetInnerHTML={{ __html: rich(c.note) }} />}
              {c.fig && <Figure fig={c.fig} colour={c.colour} />}
              {c.tip && <p className="mm-tip" dangerouslySetInnerHTML={{ __html: `<b>Watch out:</b> ${rich(c.tip)}` }} />}
            </section>
          ))}
          <div className="mm-hub" data-mm-hub>
            <QuinnFigure mood="happy" bag glasses size={96} />
            <div>
              <p className="mm-hub__eyebrow">{`Year ${map.year} maths · Chapter ${map.chapter} · Mind map`}</p>
              <p className="mm-hub__title">{map.short || map.title}</p>
              <p className="mm-hub__brand">tuterly.com.au · Free for students and families</p>
            </div>
          </div>
        </div>
      </div>
      <MindMapLinks mode={mode} />
    </div>
  );
}

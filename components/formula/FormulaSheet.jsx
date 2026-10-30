import Link from "next/link";
import katex from "katex";
import "katex/dist/katex.min.css";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import StudyAppCTA from "@/components/StudyAppCTA";
import { Eyebrow, PhoneFrame } from "@/components/brand";
import PrintButton from "@/components/formula/PrintButton";
import { FORMULA_SHEETS, FORMULA_YEARS, formulaSlug, yearLabel } from "@/lib/formula-sheets";
import "@/components/study/study-landing.css";
import "./formula.css";

// Words inside \text{} render as normal text so long rules can wrap;
// everything else renders as maths (KaTeX can't wrap \text{}).
const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
function tex(f) {
  const out = [];
  // \quad and \qquad separate different formulas ("a^0 = 1 \qquad a^{-n} = ..."):
  // render each part on its own with a visible gap, never run together.
  const trimEnds = (t) => t.replace(/^(\s|\\[ ,;])+|(\s|\\[ ,;])+$/g, "");
  const GAP = '<span class="fs-gap" aria-hidden="true"></span>';
  const math = (seg) => {
    // Every \quad / \qquad becomes a visible gap, even next to words.
    const parts = seg.split(/\\q?quad/);
    parts.forEach((p, idx) => {
      if (idx > 0) out.push(GAP);
      const t = trimEnds(p);
      if (t) {
        const lead = /^(\s|\\[ ,;])/.test(p) && idx === 0 ? " " : "";
        const trail = /(\s|\\[ ,;])$/.test(p) && idx === parts.length - 1 ? " " : "";
        out.push(lead + katex.renderToString(t, { throwOnError: false }) + trail);
      } else if (p.length && parts.length === 1) {
        out.push(" ");
      }
    });
  };
  // Split on \text{...} only at brace depth 0 (not inside \dfrac{...}{...}).
  let depth = 0, segStart = 0, i = 0;
  while (i < f.length) {
    if (depth === 0 && f.startsWith("\\text{", i)) {
      let j = i + 6, d = 1;
      while (j < f.length && d > 0) { j++; if (f[j] === "{") d++; else if (f[j] === "}") d--; }
      math(f.slice(segStart, i));
      out.push(`<span class="fs-word">${esc(f.slice(i + 6, j))}</span>`);
      i = j + 1; segStart = i; continue;
    }
    if (f[i] === "\\") { i += 2; continue; }
    if (f[i] === "{") depth++;
    else if (f[i] === "}") depth--;
    i++;
  }
  math(f.slice(segStart));
  let html = out.join("");
  while (html.includes(GAP + GAP)) html = html.split(GAP + GAP).join(GAP);
  return html;
}

// One printable formula sheet. On screen: the sheet, then the Study notes
// pitch. On paper: the sheet only, with a small "from tuterly.com.au" line.
export default function FormulaSheet({ year }) {
  const label = yearLabel(year);
  const sheet = FORMULA_SHEETS[year];
  return (
    <div className="tb sl fs">
      <MarketingNav />
      <section className="fs-hero no-print" aria-labelledby="fs-title">
        <div className="tb-wrap">
          <Eyebrow><Link href="/formula-sheets" className="tb-link">Formula sheets</Link> · {label}</Eyebrow>
          <h1 id="fs-title" className="tb-h1 fs-h1">{label} maths <span className="sl-accent">formula sheet</span></h1>
          <p className="tb-lead fs-lead">
            Every key formula and rule for {label} maths on one printable page, following the Australian Curriculum. Tap any formula to see worked examples on that topic.
          </p>
          <PrintButton year={year} />
        </div>
      </section>

      <section className="fs-sheetwrap" aria-label={`${label} maths formula sheet`}>
        <div className="tb-wrap">
          <article className="fs-sheet">
            <header className="fs-sheet__head">
              <p className="fs-sheet__title">{label} maths formula sheet</p>
              <p className="fs-sheet__sub">Australian Curriculum · tuterly.com.au/formula-sheets</p>
            </header>
            <div className="fs-cols">
              {sheet.map((s) => (
                <section key={s.strand} className="fs-strand">
                  <h2 className="fs-strand__title">{s.strand}</h2>
                  <dl className="fs-items">
                    {s.items.map((it) => (
                      <div key={it.name} className="fs-item">
                        <dt>{it.link ? <Link href={it.link}>{it.name}</Link> : it.name}</dt>
                        <dd dangerouslySetInnerHTML={{ __html: tex(it.f) }} />
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
            </div>
            <p className="fs-sheet__foot">Free from Tuterly · worked examples and practice for every topic at tuterly.com.au</p>
          </article>
        </div>
      </section>

      <section className="tb-section fs-cta-wrap no-print" aria-labelledby="fs-notes">
        <div className="tb-wrap">
          <div className="fs-cta">
            <div className="fs-cta__copy">
              <p className="tb-eyebrow">Study notes in the Tuterly app</p>
              <h2 id="fs-notes" className="tb-h2 fs-cta__title">Formulas are a start. Notes built around their mistakes are better.</h2>
              <ul className="fs-cta__list">
                <li><strong>Notes on any topic in their year,</strong> covering every part of it, with worked examples, ready in moments.</li>
                <li><strong>Or notes built from the questions they got wrong,</strong> with a “watch out” for each mistake they’ve made and how to fix it.</li>
                <li><strong>Download or share as a PDF,</strong> ready to revise from before a test.</li>
              </ul>
              <div className="fs-cta__form"><StudyAppCTA variant="hero" placement={`formula_${year}`} position="inline" slim /></div>
            </div>
            <div className="fs-cta__phone">
              <PhoneFrame src="/app-screens/flow-notes/03-notes-sheet.png" alt="A Tuterly study notes sheet with a summary and key ideas" width={240} sizes="(max-width: 899px) 56vw, 240px" />
            </div>
          </div>
          <p className="fs-other">
            Other years: {FORMULA_YEARS.filter((y) => y !== year).map((y, i) => (
              <span key={y}>{i ? " · " : ""}<Link href={`/formula-sheets/${formulaSlug(y)}`}>{yearLabel(y)}</Link></span>
            ))}
          </p>
        </div>
      </section>
      <div className="no-print"><MarketingFooter /></div>
    </div>
  );
}

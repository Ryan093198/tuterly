// Turns a Try it result (Markdown + LaTeX) into email-safe HTML. Email
// apps can't render KaTeX, so LaTeX is rewritten as readable text
// (\frac{1}{2} -> 1/2, x^2 -> x², \times -> ×) and the Markdown is
// rendered with inline styles.

const SUP = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻", "+": "⁺", "n": "ⁿ", "x": "ˣ" };
const SYMBOLS = {
  "\\times": "×", "\\div": "÷", "\\cdot": "·", "\\pm": "±", "\\le": "≤", "\\leq": "≤", "\\ge": "≥", "\\geq": "≥",
  "\\neq": "≠", "\\ne": "≠", "\\approx": "≈", "\\pi": "π", "\\theta": "θ", "\\alpha": "α", "\\beta": "β",
  "\\infty": "∞", "\\circ": "°", "\\degree": "°", "\\square": "□", "\\Rightarrow": "⇒", "\\rightarrow": "→",
  "\\to": "→", "\\therefore": "∴", "\\angle": "∠", "\\triangle": "△", "\\perp": "⊥", "\\parallel": "∥",
  "\\vert": "∣", "\\lvert": "∣", "\\rvert": "∣", "\\mid": "∣", "\\checkmark": "✓",
  "\\quad": "  ", "\\qquad": "    ", "\\,": " ", "\\;": " ", "\\!": "", "\\ ": " ",
};

// Read a {...} group starting at s[i] === "{"; returns [content, nextIndex].
function group(s, i) {
  let depth = 0;
  for (let j = i; j < s.length; j++) {
    if (s[j] === "{") depth++;
    else if (s[j] === "}" && --depth === 0) return [s.slice(i + 1, j), j + 1];
  }
  return [s.slice(i + 1), s.length];
}

function sup(t) {
  const plain = t.replace(/[{}]/g, "");
  return [...plain].every((c) => SUP[c]) ? [...plain].map((c) => SUP[c]).join("") : `^(${plain})`;
}

const wrap = (t) => (/^[\w.]+$/.test(t) ? t : `(${t})`);

export function latexToReadable(tex) {
  let s = String(tex);
  // Environments: aligned / cases / array -> lines.
  s = s.replace(/\\begin\{(aligned|align\*?|cases|array|gathered)\}(\{[^}]*\})?/g, "").replace(/\\end\{(aligned|align\*?|cases|array|gathered)\}/g, "");
  s = s.replace(/\\\\/g, "\n").replace(/&/g, " ");
  s = s.replace(/\\(left|right|big|Big|bigg|Bigg)\s*([()[\]|.]|\\\{|\\\})/g, (_, __, d) => (d === "." ? "" : d.replace("\\", "")));
  s = s.replace(/\\[dt]?frac\s*/g, "\\frac");
  // Structures with {...} arguments, innermost first.
  for (let pass = 0; pass < 6; pass++) {
    let out = "";
    let i = 0;
    let changed = false;
    while (i < s.length) {
      const m = s.slice(i).match(/^\\(frac|sqrt|text|textbf|mathrm|mathbf|operatorname|overline|hat|vec)\b\s*/);
      if (m && s[i + m[0].length] === "{") {
        const [a, j] = group(s, i + m[0].length);
        if (m[1] === "frac" && s[j] === "{") {
          const [b, k] = group(s, j);
          out += `${wrap(latexToReadable(a))}/${wrap(latexToReadable(b))}`;
          i = k;
        } else if (m[1] === "sqrt") {
          out += `√${wrap(latexToReadable(a))}`;
          i = j;
        } else {
          out += latexToReadable(a);
          i = j;
        }
        changed = true;
        continue;
      }
      out += s[i++];
    }
    s = out;
    if (!changed) break;
  }
  s = s.replace(/\^\s*\{?\s*\\circ\s*\}?/g, "°");
  s = s.replace(/\^\{([^{}]*)\}/g, (_, t) => sup(t)).replace(/\^(\w)/g, (_, t) => sup(t));
  s = s.replace(/_\{([^{}]*)\}/g, "$1").replace(/_(\w)/g, "$1");
  for (const [k, v] of Object.entries(SYMBOLS).sort((a, b) => b[0].length - a[0].length)) s = s.split(k).join(v);
  s = s.replace(/\\%/g, "%").replace(/\\\$/g, "$").replace(/\\([a-zA-Z]+)/g, "$1").replace(/[{}]/g, "");
  return s.replace(/[ \t]{3,}/g, "  ").trim();
}

// Replace every $...$ / $$...$$ span with readable text (escaped \$ is money).
export function mathToReadable(md) {
  return String(md || "")
    .replace(/(?<!\\)\$\$([\s\S]+?)\$\$/g, (_, t) => `\n\n${latexToReadable(t).split("\n").map((l) => l.trim()).filter(Boolean).join("\n\n")}\n\n`)
    .replace(/(?<!\\)\$((?:\\.|[^$\\\n])+)\$/g, (_, t) => latexToReadable(t))
    .replace(/\\\$/g, "$");
}

// A small Markdown-to-HTML converter for the shapes the demo produces:
// paragraphs, **bold**, *italic*, numbered and bulleted lists, tables,
// headings and > notes. Everything is HTML-escaped first.
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const inline = (t) =>
  esc(t)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
const P = 'style="margin:0 0 10px;font-size:15px;line-height:1.6;color:#27272a;"';
const LI = 'style="margin:0 0 4px;font-size:15px;line-height:1.6;color:#27272a;"';
const CELL = "border:1px solid #e4e4e7;padding:5px 10px;text-align:center;";

export function mdToEmailHtml(md) {
  const lines = mathToReadable(md).split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }
    // Table: header row, separator row, body rows.
    if (line.startsWith("|") && /^\|?\s*:?-{3,}/.test((lines[i + 1] || "").trim())) {
      const cells = (l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => inline(c.trim()));
      const head = cells(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(cells(lines[i++]));
      out.push(
        `<table style="border-collapse:collapse;margin:6px 0 12px;font-size:14px;"><tr>${head.map((c) => `<th style="${CELL}background:#f4f4f5;">${c}</th>`).join("")}</tr>` +
          rows.map((r) => `<tr>${r.map((c) => `<td style="${CELL}">${c}</td>`).join("")}</tr>`).join("") +
          "</table>"
      );
      continue;
    }
    // Lists.
    const ol = /^\d+[.)]\s+/;
    const ul = /^[-*+]\s+/;
    if (ol.test(line) || ul.test(line)) {
      const isOl = ol.test(line);
      const re = isOl ? ol : ul;
      const items = [];
      while (i < lines.length && re.test(lines[i].trim())) items.push(`<li ${LI}>${inline(lines[i++].trim().replace(re, ""))}</li>`);
      out.push(isOl ? `<ol style="margin:0 0 10px;padding-left:22px;">${items.join("")}</ol>` : `<ul style="margin:0 0 10px;padding-left:22px;">${items.join("")}</ul>`);
      continue;
    }
    if (/^#{1,6}\s/.test(line)) { out.push(`<p ${P}><strong>${inline(line.replace(/^#+\s*/, ""))}</strong></p>`); i++; continue; }
    if (/^---+$/.test(line)) { i++; continue; }
    // Paragraph (or > note): join following plain lines.
    const quote = line.startsWith(">");
    const buf = [line.replace(/^>\s?/, "")];
    i++;
    while (i < lines.length && lines[i].trim() && !/^(\||#|>|\d+[.)]\s|[-*+]\s)/.test(lines[i].trim())) buf.push(lines[i++].trim());
    const html = buf.map(inline).join("<br>");
    out.push(quote ? `<p ${P.replace('color:#27272a;', 'color:#52525b;')}><em>${html}</em></p>` : `<p ${P}>${html}</p>`);
  }
  return out.join("\n");
}

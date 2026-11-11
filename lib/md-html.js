import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";

// Markdown + LaTeX to an HTML string, on the server.
//
// Why not <ReactMarkdown> in server components: React sends every rendered
// element twice, once as HTML and once as the RSC payload, and the payload
// version of a KaTeX tree (thousands of nested spans) is about twice the size
// of the HTML. Worksheet pages reached 1.2 MB. Rendering to a string and using
// dangerouslySetInnerHTML puts the maths in the payload once, as one compact
// string. Same plugins and output as before (raw HTML in the markdown is still
// dropped, as react-markdown did).
//
// Client components can't use this (it would ship the whole pipeline to the
// browser); they keep react-markdown.

function wrapTables(className) {
  return () => (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((ch) => {
        if (ch.type === "element" && ch.tagName === "table") {
          return { type: "element", tagName: "div", properties: { className: [className] }, children: [ch] };
        }
        walk(ch);
        return ch;
      });
    };
    walk(tree);
  };
}

const processors = new Map();
function processor(gfm, tableClass) {
  const key = `${gfm}|${tableClass || ""}`;
  if (!processors.has(key)) {
    let p = unified().use(remarkParse);
    if (gfm) p = p.use(remarkGfm);
    p = p.use(remarkMath).use(remarkRehype).use(rehypeKatex);
    if (tableClass) p = p.use(wrapTables(tableClass));
    processors.set(key, p.use(rehypeStringify).freeze());
  }
  return processors.get(key);
}

const cache = new Map();
export function mdToHtml(md, { gfm = true, tableClass = "" } = {}) {
  const src = md || "";
  const key = `${gfm}|${tableClass}|${src}`;
  let html = cache.get(key);
  if (html === undefined) {
    html = String(processor(gfm, tableClass).processSync(src));
    if (cache.size > 5000) cache.clear();
    cache.set(key, html);
  }
  return html;
}

// <Md md="..." className="wx-md" tableClass="wx-table" />
export function Md({ md, className, tableClass, gfm = true, as: Tag = "div", style }) {
  return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: mdToHtml(md, { gfm, tableClass }) }} />;
}

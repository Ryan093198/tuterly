import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Font,
} from "@react-pdf/renderer";

// React-pdf needs JSX disabled for plain JS — use createElement directly.
import { createElement as h } from "react";

const COLOR = {
  fg: "#18181b",
  body: "#3f3f46",
  muted: "#71717a",
  border: "#e4e4e7",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 56,
    paddingBottom: 56,
    paddingHorizontal: 56,
    fontSize: 11,
    color: COLOR.body,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  brand: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: COLOR.fg,
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  meta: {
    fontSize: 9,
    color: COLOR.muted,
    marginBottom: 28,
  },
  h1: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: COLOR.fg,
    marginBottom: 4,
    letterSpacing: -0.4,
  },
  h2: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: COLOR.fg,
    marginTop: 18,
    marginBottom: 4,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.border,
    borderBottomStyle: "solid",
  },
  h3: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: COLOR.fg,
    marginTop: 10,
    marginBottom: 2,
  },
  paragraph: {
    fontSize: 11,
    color: COLOR.body,
    marginVertical: 4,
    lineHeight: 1.55,
  },
  bullet: {
    flexDirection: "row",
    marginVertical: 2,
    paddingLeft: 4,
  },
  bulletDot: {
    width: 12,
    fontSize: 11,
    color: COLOR.body,
  },
  bulletText: {
    flex: 1,
    fontSize: 11,
    color: COLOR.body,
    lineHeight: 1.55,
  },
  hr: {
    height: 1,
    backgroundColor: COLOR.border,
    marginVertical: 12,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
    color: COLOR.fg,
  },
  italic: {
    fontFamily: "Helvetica-Oblique",
    color: COLOR.muted,
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 56,
    right: 56,
    fontSize: 9,
    color: COLOR.muted,
    textAlign: "center",
  },
});

// Split inline markdown into segments with bold/italic styling.
function inlineSegments(text) {
  const segments = [];
  let remaining = text ?? "";
  while (remaining.length > 0) {
    const bold = remaining.match(/^\*\*(.+?)\*\*/);
    if (bold) {
      segments.push({ text: bold[1], style: "bold" });
      remaining = remaining.slice(bold[0].length);
      continue;
    }
    const italic = remaining.match(/^\*(.+?)\*/);
    if (italic) {
      segments.push({ text: italic[1], style: "italic" });
      remaining = remaining.slice(italic[0].length);
      continue;
    }
    const next = remaining.search(/\*\*|\*/);
    if (next === -1) {
      segments.push({ text: remaining });
      remaining = "";
    } else if (next === 0) {
      // Unmatched marker — emit it as plain text and continue
      segments.push({ text: remaining[0] });
      remaining = remaining.slice(1);
    } else {
      segments.push({ text: remaining.slice(0, next) });
      remaining = remaining.slice(next);
    }
  }
  return segments;
}

function renderInline(text, key) {
  const segments = inlineSegments(text);
  return segments.map((seg, i) => {
    const style =
      seg.style === "bold"
        ? styles.bold
        : seg.style === "italic"
          ? styles.italic
          : undefined;
    return h(Text, { key: `${key}-${i}`, style }, seg.text);
  });
}

// Strip <details>/<summary> tags so PDF readers see the worked solutions
// inline (no expand/collapse on paper). Keep the inner content; replace the
// summary text with a small "Worked solution" header.
function stripDetailsTags(md) {
  return (md ?? "")
    .replace(/<summary>[^<]*<\/summary>/gi, "**Worked solution**")
    .replace(/<\/?details[^>]*>/gi, "");
}

// Group consecutive non-blank, non-special lines into paragraphs and bullets.
function parseBlocks(markdown) {
  const lines = stripDetailsTags(markdown).split("\n");
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (/^---+$/.test(line.trim())) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({ type: `h${headingMatch[1].length}`, text: headingMatch[2] });
      i++;
      continue;
    }
    if (/^\s*-\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*-\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }
    if (line.trim() === "") {
      i++;
      continue;
    }
    // Paragraph: gather consecutive non-empty lines that aren't a heading/list/hr.
    const para = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,3}\s|---+$|\s*-\s+)/.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push({ type: "p", text: para.join(" ") });
  }
  return blocks;
}

function renderBlocks(blocks) {
  return blocks.map((block, i) => {
    const key = `b${i}`;
    if (block.type === "hr") {
      return h(View, { key, style: styles.hr });
    }
    if (block.type === "h1") {
      return h(Text, { key, style: styles.h1 }, renderInline(block.text, key));
    }
    if (block.type === "h2") {
      return h(Text, { key, style: styles.h2 }, renderInline(block.text, key));
    }
    if (block.type === "h3") {
      return h(Text, { key, style: styles.h3 }, renderInline(block.text, key));
    }
    if (block.type === "ul") {
      return h(
        View,
        { key, style: { marginVertical: 4 } },
        block.items.map((item, idx) =>
          h(
            View,
            { key: `${key}-${idx}`, style: styles.bullet },
            h(Text, { style: styles.bulletDot }, "•"),
            h(Text, { style: styles.bulletText }, renderInline(item, `${key}-${idx}`))
          )
        )
      );
    }
    return h(
      Text,
      { key, style: styles.paragraph },
      renderInline(block.text, key)
    );
  });
}

function ReportDocument({ content, studentName, sessionDate }) {
  const blocks = parseBlocks(content);
  const dateLine = sessionDate
    ? new Date(sessionDate).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
  return h(
    Document,
    null,
    h(
      Page,
      { size: "A4", style: styles.page },
      h(Text, { style: styles.brand }, "Tuterly"),
      h(
        Text,
        { style: styles.meta },
        [studentName, dateLine].filter(Boolean).join(" · ")
      ),
      ...renderBlocks(blocks),
      h(
        Text,
        {
          style: styles.footer,
          fixed: true,
          render: ({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`,
        }
      )
    )
  );
}

export async function renderReportPdf({ content, studentName, sessionDate }) {
  const stream = await pdf(
    h(ReportDocument, { content, studentName, sessionDate })
  ).toBuffer();
  // .toBuffer() in @react-pdf returns a Node Readable stream; collect it.
  return await streamToBuffer(stream);
}

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

export function pdfFilename({ firstName, lastName, sessionDate }) {
  const safe = (s) => (s || "").replace(/[^a-zA-Z0-9]/g, "");
  const dateStr = sessionDate
    ? formatDdMmYyyy(new Date(sessionDate))
    : formatDdMmYyyy(new Date());
  return `${safe(firstName)}${safe(lastName)}-${dateStr}.pdf`;
}

function formatDdMmYyyy(d) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

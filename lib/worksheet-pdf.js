import { Document, Page, Text, pdf } from "@react-pdf/renderer";
import { createElement as h } from "react";
import {
  styles,
  parseBlocks,
  renderBlocks,
  streamToBuffer,
} from "./report-pdf.js";

// Public-worksheet PDF — same shape as the lesson-plan and report PDFs but
// the meta line carries the year level + topic + "Free worksheet" framing
// instead of a student name.
function WorksheetDocument({ content, yearLevel, topicLabel }) {
  const blocks = parseBlocks(content);
  const dateLine = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const metaParts = [
    [yearLevel, topicLabel].filter(Boolean).join(" — "),
    dateLine,
    "Free practice worksheet · tuterly.com.au",
  ].filter(Boolean);
  return h(
    Document,
    null,
    h(
      Page,
      { size: "A4", style: styles.page },
      h(Text, { style: styles.brand }, "Tuterly"),
      h(Text, { style: styles.meta }, metaParts.join(" · ")),
      ...renderBlocks(blocks),
      h(Text, {
        style: styles.footer,
        fixed: true,
        render: ({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`,
      })
    )
  );
}

export async function renderWorksheetPdf({ content, yearLevel, topicLabel }) {
  const stream = await pdf(
    h(WorksheetDocument, { content, yearLevel, topicLabel })
  ).toBuffer();
  return await streamToBuffer(stream);
}

export function worksheetPdfFilename({ yearLevel, topicLabel }) {
  const safe = (s) => (s || "").replace(/[^a-zA-Z0-9]/g, "");
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `Tuterly-${safe(yearLevel)}-${safe(topicLabel).slice(0, 40)}-${dd}-${mm}-${yyyy}.pdf`;
}

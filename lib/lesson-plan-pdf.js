import { Document, Page, Text, pdf } from "@react-pdf/renderer";
import { createElement as h } from "react";
import {
  styles,
  parseBlocks,
  renderBlocks,
  streamToBuffer,
} from "./report-pdf.js";

function LessonPlanDocument({ content, studentName, generatedDate }) {
  const blocks = parseBlocks(content);
  const dateLine = generatedDate
    ? new Date(generatedDate).toLocaleDateString("en-AU", {
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
      h(Text, {
        style: styles.footer,
        fixed: true,
        render: ({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`,
      })
    )
  );
}

export async function renderLessonPlanPdf({ content, studentName, generatedDate }) {
  const stream = await pdf(
    h(LessonPlanDocument, { content, studentName, generatedDate })
  ).toBuffer();
  return await streamToBuffer(stream);
}

export function lessonPlanPdfFilename({ firstName, lastName, weeks }) {
  const safe = (s) => (s || "").replace(/[^a-zA-Z0-9]/g, "");
  const dateStr = formatDdMmYyyy(new Date());
  return `${safe(firstName)}${safe(lastName)}-LessonPlan-${weeks}wk-${dateStr}.pdf`;
}

function formatDdMmYyyy(d) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

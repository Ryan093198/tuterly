import { Document, Page, Text, View, pdf } from "@react-pdf/renderer";
import { createElement as h } from "react";
import {
  styles,
  parseBlocks,
  renderBlocks,
  streamToBuffer,
} from "./report-pdf.js";
import { STUDY_APP } from "./study-app.js";

// Years 7 to 10 worksheets point to Tuterly Study in the footer; younger
// year levels keep the tutor line.
const STUDY_APP_YEARS = ["Year 7", "Year 8", "Year 9", "Year 10"];

// Public-worksheet PDF - same shape as the lesson-plan and report PDFs but
// the meta line carries the year level + topic + "Free worksheet" framing
// instead of a student name.
// The shared page style minus lineHeight (see the comment on the Page).
const { lineHeight: BODY_LINE_HEIGHT, ...PAGE_STYLE } = styles.page;

function WorksheetDocument({ content, yearLevel, topicLabel }) {
  const blocks = parseBlocks(content);
  const footerLine = STUDY_APP_YEARS.includes(yearLevel)
    ? `Got some wrong? Snap them in ${STUDY_APP.name} to practise until they're fixed: tuterly.com.au`
    : "Need a tutor? tuterly.com.au/find-a-tutor";
  const dateLine = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const metaParts = [
    [yearLevel, topicLabel].filter(Boolean).join(" - "),
    dateLine,
    "Free practice worksheet · tuterly.com.au",
  ].filter(Boolean);
  return h(
    Document,
    null,
    h(
      Page,
      // lineHeight moves from the Page onto a body View: with it on the Page,
      // react-pdf silently drops the fixed render-prop footer below (which
      // is why the worksheet footer never showed).
      { size: "A4", style: PAGE_STYLE },
      h(
        View,
        { style: { lineHeight: BODY_LINE_HEIGHT } },
        h(Text, { style: styles.brand }, "Tuterly"),
        h(Text, { style: styles.meta }, metaParts.join(" · ")),
        ...renderBlocks(blocks)
      ),
      h(Text, {
        style: styles.footer,
        fixed: true,
        render: ({ pageNumber, totalPages }) =>
          `${footerLine} · Page ${pageNumber} of ${totalPages}`,
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

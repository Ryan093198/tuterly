import { Document, Page, Text, pdf } from "@react-pdf/renderer";
import { createElement as h } from "react";
import {
  styles,
  parseBlocks,
  renderBlocks,
  streamToBuffer,
} from "./report-pdf.js";

// Full-practice-test PDFs. Two documents share the same styled pipeline as
// reports and worksheets (parseBlocks/renderBlocks handle headings, lists,
// tables and LaTeX-to-unicode):
//   - the TEST: questions only, with a name/date line to fill in
//   - the ANSWER KEY: worked solutions
// The two halves are split upstream (lib/full-test-split.js) and each half's
// markdown is passed in as `content`.

function metaLine({ studentName, yearLevel, topicLabel, kind }) {
  const dateLine = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const who = [studentName, yearLevel].filter(Boolean).join(" · ");
  const tail =
    kind === "answers"
      ? "Answer key · tuterly.com.au"
      : "Practice test · tuterly.com.au";
  return [who, topicLabel, dateLine, tail].filter(Boolean).join(" · ");
}

function TestDocument({ content, studentName, yearLevel, topicLabel, kind }) {
  const blocks = parseBlocks(content);
  const heading = kind === "answers" ? "Tuterly Answer Key" : "Tuterly Practice Test";
  const children = [
    h(Text, { key: "brand", style: styles.brand }, heading),
    h(
      Text,
      { key: "meta", style: styles.meta },
      metaLine({ studentName, yearLevel, topicLabel, kind })
    ),
  ];

  // On the test itself, give the student a line to write their name and the
  // date, and a one-line instruction. Not on the answer key.
  if (kind !== "answers") {
    children.push(
      h(
        Text,
        {
          key: "namedate",
          style: { fontSize: 11, color: "#3f3f46", marginBottom: 6 },
        },
        "Name: ______________________________          Date: ____________________"
      )
    );
    children.push(
      h(
        Text,
        {
          key: "instructions",
          style: {
            fontSize: 10,
            color: "#71717a",
            marginBottom: 16,
            fontStyle: "italic",
          },
        },
        "Attempt all questions and show your working. Suggested time: 45–60 minutes."
      )
    );
  }

  children.push(...renderBlocks(blocks));
  children.push(
    h(Text, {
      key: "footer",
      style: styles.footer,
      fixed: true,
      render: ({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`,
    })
  );

  return h(
    Document,
    null,
    h(Page, { size: "A4", style: styles.page }, ...children)
  );
}

export async function renderFullTestPdf({
  content,
  studentName,
  yearLevel,
  topicLabel,
  part,
}) {
  const kind = part === "answers" ? "answers" : "test";
  const stream = await pdf(
    h(TestDocument, { content, studentName, yearLevel, topicLabel, kind })
  ).toBuffer();
  return await streamToBuffer(stream);
}

export function fullTestPdfFilename({ studentName, topicLabel, part }) {
  const safe = (s) => (s || "").replace(/[^a-zA-Z0-9]/g, "");
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const suffix = part === "answers" ? "AnswerKey" : "Test";
  const who = safe(studentName).slice(0, 20);
  const topic = safe(topicLabel).slice(0, 32);
  return `Tuterly-${suffix}-${[who, topic].filter(Boolean).join("-")}-${dd}-${mm}-${yyyy}.pdf`;
}

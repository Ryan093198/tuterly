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

const DEFAULT_INSTRUCTIONS = "Attempt all questions and show your working. Suggested time: 45–60 minutes.";

function TestDocument({ content, studentName, yearLevel, topicLabel, kind, instructions = DEFAULT_INSTRUCTIONS }) {
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
    if (instructions) children.push(
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
        instructions
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

// instructions: the line under the name/date (test only). Pass "" when the
// markdown already has its own instructions (the written topic tests do).
export async function renderFullTestPdf({
  content,
  studentName,
  yearLevel,
  topicLabel,
  part,
  instructions,
}) {
  const kind = part === "answers" ? "answers" : "test";
  const stream = await pdf(
    h(TestDocument, { content, studentName, yearLevel, topicLabel, kind, ...(instructions !== undefined ? { instructions } : {}) })
  ).toBuffer();
  return await streamToBuffer(stream);
}

// The free practice sheet on each topic page: the questions, then the
// answers on a new page, in one PDF. No name or date in the header, so the
// file is the same every time it's built.
function SheetDocument({ questions, answers, yearLevel, topicLabel, pageUrl, count }) {
  const head = (title) => [
    h(Text, { key: "brand", style: { ...styles.brand, fontSize: 18, lineHeight: 1.3 } }, title),
    h(Text, { key: "meta", style: { ...styles.meta, marginBottom: 18 } }, [yearLevel, "Free practice sheet from Tuterly", "tuterly.com.au"].filter(Boolean).join(" · ")),
  ];
  const footer = h(Text, {
    key: "footer",
    style: styles.footer,
    fixed: true,
    render: ({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages} · The full 20-question test is free at ${pageUrl.replace(/^https?:\/\//, "")}`,
  });
  const nameLine = h(Text, { key: "namedate", style: { fontSize: 11, color: "#3f3f46", marginBottom: 10 } }, "Name: ______________________________          Date: ____________________");
  return h(
    Document,
    { title: `${yearLevel} ${topicLabel} practice questions with answers`, author: "Tuterly", subject: `${yearLevel} maths: ${topicLabel}` },
    h(Page, { size: "A4", style: styles.page }, ...head(`${topicLabel}: ${count} practice questions`), nameLine, ...renderBlocks(parseBlocks(questions)), footer),
    h(Page, { size: "A4", style: styles.page }, ...head(`${topicLabel}: answers`), ...renderBlocks(parseBlocks(answers)), footer)
  );
}

export async function renderPracticeSheetPdf({ questions, answers, yearLevel, topicLabel, pageUrl, count = 10 }) {
  const stream = await pdf(h(SheetDocument, { questions, answers, yearLevel, topicLabel, pageUrl, count })).toBuffer();
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

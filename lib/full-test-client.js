"use client";

// Client helper: given one half of a full-test's markdown, fetch its styled
// PDF from /api/practice/full-test/pdf and trigger a browser download. Shared
// by FullTestModal (right after generation) and ResourceViewer (re-download
// from a saved resource).

export async function downloadFullTestPdf({
  content,
  part,
  studentName,
  yearLevel,
  topicLabel,
}) {
  const res = await fetch("/api/practice/full-test/pdf", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      content,
      part: part === "answers" ? "answers" : "test",
      student_name: studentName || "",
      year_level: yearLevel || "",
      topic_label: topicLabel || "",
    }),
  });
  if (!res.ok) {
    let message = "Could not render PDF.";
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      /* fall through to default message */
    }
    throw new Error(message);
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const dispo = res.headers.get("content-disposition") || "";
  const m = dispo.match(/filename="([^"]+)"/);
  a.download =
    m?.[1] ||
    (part === "answers" ? "Tuterly-AnswerKey.pdf" : "Tuterly-PracticeTest.pdf");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

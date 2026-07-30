import { NextResponse } from "next/server";
import {
  renderFullTestPdf,
  fullTestPdfFilename,
} from "@/lib/full-test-pdf";

export const runtime = "nodejs";
export const maxDuration = 30;

// Stateless PDF renderer for the full practice test. The client posts one half
// of the markdown (either the test or the answer key, already split client-side
// via lib/full-test-split) plus which `part` it is, and we stream a styled PDF
// back. No DB access, no auth needed - the markdown itself is the source of
// truth, same pattern as /api/worksheets/pdf.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }

  const content = typeof body?.content === "string" ? body.content : "";
  if (!content.trim()) {
    return NextResponse.json({ error: "content required" }, { status: 400 });
  }
  const part = body?.part === "answers" ? "answers" : "test";
  const studentName = body?.student_name?.toString().trim() || "";
  const yearLevel = body?.year_level?.toString().trim() || "";
  const topicLabel = body?.topic_label?.toString().trim() || "";

  try {
    const buffer = await renderFullTestPdf({
      content,
      studentName,
      yearLevel,
      topicLabel,
      part,
    });
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fullTestPdfFilename({
          studentName,
          topicLabel,
          part,
        })}"`,
      },
    });
  } catch (err) {
    console.error("[full-test/pdf] render failed:", err);
    return NextResponse.json(
      { error: "Could not render the PDF. Try again." },
      { status: 500 }
    );
  }
}

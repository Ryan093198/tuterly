import { NextResponse } from "next/server";
import { renderFullTestPdf, fullTestPdfFilename } from "@/lib/full-test-pdf";
import { getTopicTest } from "@/lib/topic-test";

export const runtime = "nodejs";
export const maxDuration = 30;

// GET /api/topic-test/[id]/pdf?part=test|answers
// The emailed topic test as a printable PDF (same styling as the app's
// full practice tests). Linked from the email and /topic-test/[id].
export async function GET(request, { params }) {
  const { id } = await params;
  const test = await getTopicTest(id);
  if (!test || test.status !== "ready") {
    return NextResponse.json({ error: "test not found" }, { status: 404 });
  }
  const part = new URL(request.url).searchParams.get("part") === "answers" ? "answers" : "test";
  try {
    const buffer = await renderFullTestPdf({
      content: part === "answers" ? test.answers_md : test.questions_md,
      studentName: "",
      yearLevel: test.year_level,
      topicLabel: test.topic_label,
      part,
      instructions: "", // the written tests carry their own instructions
    });
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${fullTestPdfFilename({ studentName: test.year_level, topicLabel: test.topic_label, part })}"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (err) {
    console.error("[topic-test/pdf] render failed", err);
    return NextResponse.json({ error: "Could not render the PDF. Try again." }, { status: 500 });
  }
}

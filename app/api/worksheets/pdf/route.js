import { NextResponse } from "next/server";
import {
  renderWorksheetPdf,
  worksheetPdfFilename,
} from "@/lib/worksheet-pdf";

export const runtime = "nodejs";
export const maxDuration = 30;

// Stateless PDF renderer — the client posts the markdown it already received
// from /api/worksheets/generate and we stream a styled PDF back. No DB
// access, no auth needed; the markdown itself is the source of truth.
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
  const yearLevel = body?.year_level?.toString().trim() || "";
  const topicLabel = body?.topic_label?.toString().trim() || "";

  try {
    const buffer = await renderWorksheetPdf({
      content,
      yearLevel,
      topicLabel,
    });
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${worksheetPdfFilename({
          yearLevel,
          topicLabel,
        })}"`,
      },
    });
  } catch (err) {
    console.error("[worksheets/pdf] render failed:", err);
    return NextResponse.json(
      { error: "Could not render the PDF. Try again." },
      { status: 500 }
    );
  }
}

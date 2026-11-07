import { NextResponse } from "next/server";
import { NAPLAN_YEARS, naplanSlug, yearFromSlug, naplanPdfMarkdown } from "@/lib/naplan";
import { renderPracticeSheetPdf } from "@/lib/full-test-pdf";
import { SITE_URL } from "@/lib/site";

// GET /naplan/year-N-numeracy/practice-test.pdf
// The printable NAPLAN-style numeracy practice test: all 20 questions, then
// the answers with worked solutions. No sign-up. Built once at deploy time.
export const runtime = "nodejs";
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return NAPLAN_YEARS.map((y) => ({ slug: naplanSlug(y) }));
}

export async function GET(_request, { params }) {
  const { slug } = await params;
  const y = yearFromSlug(slug);
  const md = y && naplanPdfMarkdown(y);
  if (!md) return NextResponse.json({ error: "not found" }, { status: 404 });
  const host = SITE_URL.replace(/^https?:\/\//, "");
  const buffer = await renderPracticeSheetPdf({
    questions: md.questions,
    answers: md.answers,
    yearLevel: `Year ${y}`,
    topicLabel: "NAPLAN numeracy",
    pageUrl: `${SITE_URL}/naplan/${slug}`,
    count: md.count,
    title: `Year ${y} NAPLAN-style numeracy practice test`,
    answersTitle: `Year ${y} NAPLAN-style numeracy: answers and worked solutions`,
    meta: `Year ${y} · ${md.count} questions · Tuterly’s own NAPLAN-style questions, not official NAPLAN questions · ${host}`,
    footerNote: `Take it online with instant marking at ${host}/naplan/${slug}`,
    docTitle: `Year ${y} NAPLAN numeracy practice test with answers`,
  });
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="year-${y}-naplan-numeracy-practice-test.pdf"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}

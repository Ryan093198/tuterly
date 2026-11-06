import { NextResponse } from "next/server";
import { WORKSHEET_LANDING_PAGES, getLandingPageBySlug } from "@/lib/worksheet-landing-pages";
import { writtenTopicTest, practiceSheet } from "@/lib/topic-test-files";
import { renderPracticeSheetPdf } from "@/lib/full-test-pdf";
import { SITE_URL } from "@/lib/site";

// GET /worksheets/<slug>/practice-questions.pdf
// The free practice sheet for a topic page: the first 10 questions of its
// written topic test, then the answers. No email needed, so Google and
// teachers can find and link to it; the full 20-question test is still the
// emailed offer on the page. Built once at deploy time.
export const runtime = "nodejs";
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return WORKSHEET_LANDING_PAGES.filter((p) => writtenTopicTest(p.yearLevel, p.topicId)).map((p) => ({ slug: p.slug }));
}

export async function GET(_request, { params }) {
  const { slug } = await params;
  const page = getLandingPageBySlug(slug);
  const sheet = page && practiceSheet(writtenTopicTest(page.yearLevel, page.topicId));
  if (!sheet) return NextResponse.json({ error: "not found" }, { status: 404 });
  const buffer = await renderPracticeSheetPdf({
    questions: sheet.questions,
    answers: sheet.answers,
    yearLevel: page.yearLevel,
    topicLabel: page.topic,
    pageUrl: `${SITE_URL}/worksheets/${page.slug}`,
    count: sheet.count,
  });
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${page.slug}-practice-questions.pdf"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}

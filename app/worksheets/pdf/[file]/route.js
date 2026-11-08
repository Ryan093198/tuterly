import { NextResponse } from "next/server";
import { skillYearPairs, skillWorksheet, SKILL_SECTIONS } from "@/lib/skill-years";
import { renderPracticeSheetPdf } from "@/lib/full-test-pdf";
import { SITE_URL } from "@/lib/site";

// GET /worksheets/pdf/<skill>-<year>.pdf, e.g. fractions-year-8.pdf
// A free 10-question worksheet for one skill and year level, then answers
// and worked solutions. No sign-up. Built once at deploy time.
export const runtime = "nodejs";
export const dynamic = "force-static";
export const dynamicParams = false;

const ys = (y) => y.toLowerCase().replace(/\s+/g, "-");

export function generateStaticParams() {
  return skillYearPairs().map(({ slug, year }) => ({ file: `${slug}-${ys(year)}.pdf` }));
}

export async function GET(_request, { params }) {
  const { file } = await params;
  const m = /^(.+)-(year-\d+a?)\.pdf$/.exec(file || "");
  const slug = m?.[1];
  const sheet = m && SKILL_SECTIONS[slug] && skillWorksheet(slug, m[2]);
  if (!sheet) return NextResponse.json({ error: "not found" }, { status: 404 });
  const host = SITE_URL.replace(/^https?:\/\//, "");
  const buffer = await renderPracticeSheetPdf({
    questions: sheet.questions,
    answers: sheet.answers,
    yearLevel: sheet.year,
    topicLabel: sheet.name,
    pageUrl: `${SITE_URL}/worksheets/${slug}`,
    count: sheet.count,
    title: `${sheet.year} ${sheet.name.toLowerCase()} worksheet`,
    answersTitle: `${sheet.year} ${sheet.name.toLowerCase()}: answers and worked solutions`,
    meta: `${sheet.year} · ${sheet.count} questions · ${host}`,
    footerNote: `More free worksheets and auto-marked tests at ${host}/worksheets/${slug}`,
    docTitle: `${sheet.year} ${sheet.name} worksheet with answers`,
  });
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${file}"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}

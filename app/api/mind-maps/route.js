import { NextResponse } from "next/server";
import { LIVE_YEARS, mindMapFiles, mindMapPath, mindMapSheetPath, mindMapsForYear, revisionBooklet } from "@/lib/mind-maps";
import { SITE_URL } from "@/lib/site";

// GET /api/mind-maps: every published mind map with its image and PDF, for
// the Tuterly Study app's future Mind Maps section (Practice > Study notes).
// appKey matches the app's chapter key (e.g. "y9-ch1"). png and pdf need
// the email-unlock cookie (the app will need its own access when it uses them).
export const dynamic = "force-static";

export function GET() {
  const maps = LIVE_YEARS.flatMap((y) =>
    mindMapsForYear(y).map((m) => {
      const f = mindMapFiles(m);
      return {
        year: m.year, chapter: m.chapter, appKey: m.appKey, title: m.title, summary: m.summary,
        page: `${SITE_URL}${mindMapPath(m)}`, png: `${SITE_URL}${f.png}`, pdf: `${SITE_URL}${f.pdf}`, preview: `${SITE_URL}${f.preview}`, sheet: mindMapSheetPath(m),
      };
    })
  );
  const booklets = LIVE_YEARS.map((y) => ({ year: y, pdf: `${SITE_URL}${revisionBooklet(y)}` }));
  return NextResponse.json({ maps, booklets });
}

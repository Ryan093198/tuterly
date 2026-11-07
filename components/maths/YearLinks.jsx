import Link from "next/link";
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { writtenTopicTest } from "@/lib/topic-test-files";

// "By year level" cards on a concept page: what each year covers, with the
// topic page and (where there is one) the free practice sheet PDF.
export default function YearLinks({ rows }) {
  return (
    <div className="mx-years">
      {rows.map((r) => {
        const page = WORKSHEET_LANDING_PAGES.find((p) => p.slug === r.slug);
        if (!page) return null;
        const pdf = writtenTopicTest(page.yearLevel, page.topicId);
        return (
          <div key={r.slug} className="mx-year">
            <p className="mx-year__k">{page.yearLevel}</p>
            <p className="mx-year__t">{page.topic}</p>
            <p className="mx-year__x">{r.text}</p>
            <p className="mx-year__links">
              <Link href={`/worksheets/${page.slug}`}>Worksheets and topic test</Link>
              {pdf && (
                <>
                  {" · "}
                  <a href={`/worksheets/${page.slug}/practice-questions.pdf`}>Free PDF with answers</a>
                </>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}

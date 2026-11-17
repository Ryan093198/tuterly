import Link from "next/link";
import { DIAG_PATH, diagYear } from "@/lib/diagnostic";
import "@/components/naplan/naplan-callout.css";

// A small link box to the free diagnostic test (Ryan, 17 Nov 2026). Search
// data showed people find Tuterly through topic searches ("year 7 algebra
// test"), so the test is linked from those pages rather than chasing broad
// terms. Same look as NaplanCallout. With no year, links all three.
export default function DiagnosticCallout({ year, title, lead }) {
  const y = year ? diagYear(`year-${year}`) : null;
  if (year && !y) return null;
  if (y) {
    return (
      <aside className="npc" aria-label={`Free ${y.year} maths assessment`}>
        <p className="npc__t">{title || `Is your child ready for ${y.next} maths?`}</p>
        <p className="npc__x">{lead || `A free ${y.year} maths assessment: 20 questions from every chapter of the year, marked straight away, with a free parent report on the gaps to fix before ${y.next}.`}</p>
        <Link href={`${DIAG_PATH}/${y.slug}`} className="npc__a">Take the free {y.year} assessment →</Link>
      </aside>
    );
  }
  return (
    <aside className="npc" aria-label="Free maths assessment, Years 7 to 9">
      <p className="npc__t">{title || "Not sure where the gaps are?"}</p>
      <p className="npc__x">{lead || "A free 35-minute maths assessment for Years 7, 8 and 9 checks every chapter of the year and shows which topics need work, with a free report for parents."}</p>
      <p className="npc__links">
        <Link href={`${DIAG_PATH}/year-7`}>Year 7</Link>
        <Link href={`${DIAG_PATH}/year-8`}>Year 8</Link>
        <Link href={`${DIAG_PATH}/year-9`}>Year 9</Link>
      </p>
    </aside>
  );
}

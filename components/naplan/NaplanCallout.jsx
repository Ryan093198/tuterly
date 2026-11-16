import Link from "next/link";
import { naplanSlug } from "@/lib/naplan";
import "./naplan-callout.css";

// A small link to a year's NAPLAN practice test (Ryan, 17 Nov 2026: link the
// tests from across the site so they rank). Years 7 and 9 run like NAPLAN
// Online; Years 3 and 5 are the simpler online test. With no year, links all
// four. Server component; drop it into any page.
const LINE = {
  3: "20 free questions that work like NAPLAN Online, with drag-and-drop and grid questions. Marked instantly with worked solutions.",
  5: "20 free questions that work like NAPLAN Online, with drag-and-drop and grid questions. Marked instantly with worked solutions.",
  7: "20 free questions that work like NAPLAN Online: non-calculator section, on-screen calculator, drag-and-drop and graph questions. Marked instantly.",
  9: "20 free questions that work like NAPLAN Online: non-calculator section, on-screen calculator, drag-and-drop and graph questions. Marked instantly.",
};

export default function NaplanCallout({ year, title, className = "" }) {
  if (year && !LINE[year]) return null;
  if (year) {
    return (
      <aside className={`npc ${className}`} aria-label={`Year ${year} NAPLAN practice test`}>
        <p className="npc__t">{title || `Year ${year} NAPLAN practice test`}</p>
        <p className="npc__x">{LINE[year]}</p>
        <Link href={`/naplan/${naplanSlug(year)}`} className="npc__a">Take the free Year {year} test →</Link>
      </aside>
    );
  }
  return (
    <aside className={`npc ${className}`} aria-label="NAPLAN practice tests">
      <p className="npc__t">{title || "Free NAPLAN numeracy practice tests"}</p>
      <p className="npc__x">A free 20-question test for each year that works like NAPLAN Online, marked instantly with worked solutions, and 4 more tests for each year.</p>
      <p className="npc__links">
        <Link href={`/naplan/${naplanSlug(7)}`}>Year 7</Link>
        <Link href={`/naplan/${naplanSlug(9)}`}>Year 9</Link>
        <Link href={`/naplan/${naplanSlug(3)}`}>Year 3</Link>
        <Link href={`/naplan/${naplanSlug(5)}`}>Year 5</Link>
      </p>
    </aside>
  );
}

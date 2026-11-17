import Link from "next/link";
import { DIAG_PATH } from "@/lib/diagnostic";
import { naplanSlug } from "@/lib/naplan";
import "./marketing-ux.css";

// The free tools, in one row near the top of the main pages (Ryan, 18 Nov
// 2026): the easiest first step for a parent before the app.
const TOOLS = [
  {
    href: DIAG_PATH,
    k: "Years 7 to 9 · 35 minutes",
    t: "Free maths assessment",
    x: "Two questions from every chapter of the year, marked straight away, with a free parent report.",
  },
  {
    href: "/worksheets",
    k: "Years 3 to 10",
    t: "Worksheet generator",
    x: "New questions on any topic, with a fully worked solution for each one.",
  },
  {
    href: `/naplan/${naplanSlug(7)}`,
    k: "Years 3, 5, 7 and 9",
    t: "NAPLAN practice test",
    x: "Twenty questions that work like NAPLAN Online, marked instantly.",
  },
];

export default function FreeTools({ title = "Start with something free", lead }) {
  return (
    <section className="mx-tools" aria-labelledby="mx-tools-h">
      <div className="tb-wrap">
        <h2 id="mx-tools-h" className="mx-tools__h">{title}</h2>
        {lead && <p className="mx-tools__lead">{lead}</p>}
        <div className="mx-tools__grid">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href} className="mx-tool">
              <span className="mx-tool__k">{t.k}</span>
              <span className="mx-tool__t">{t.t}</span>
              <span className="mx-tool__x">{t.x}</span>
              <span className="mx-tool__go">Try it free →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

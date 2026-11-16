import { Md } from "@/lib/md-html";
import { getNaplanTest } from "@/lib/naplan";

const M = ({ md, inline = false }) => (
  <Md className={inline ? "wx-md nt-inline" : "wx-md"} tableClass="wx-table" md={md} />
);

// A test's questions with the maths rendered on the server, ready for
// <NaplanTest>. Server only: the answers and solutions are in here.
export function naplanQuestions(year, n = 1) {
  const qs = getNaplanTest(year, n) || [];
  return qs.map((q) => ({
    n: q.n, strand: q.strand, skill: q.skill, format: q.format, calculator: q.calculator,
    answerIndex: q.answerIndex, accept: q.accept,
    q: <M md={q.question} />,
    opts: q.options ? q.options.map((o, j) => <M key={j} md={o} inline />) : null,
    items: q.items ? q.items.map((o, j) => <M key={j} md={o} inline />) : null,
    answerOrder: q.answerOrder, grid: q.grid, answerPoint: q.answerPoint,
    sol: <M md={q.solution} />,
  }));
}

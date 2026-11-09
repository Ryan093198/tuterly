import { BAYSIDE } from "@/lib/bayside";
import { PLUS_PRICES } from "@/lib/study-launch";

// "Designed by Bayside Academics educators" (Ryan, 9 Nov 2026): on every
// tutoring comparison page. Facts: lib/bayside.js; the four steps are the
// Tuterly Method, each one a real app feature.
export default function BaysideBuilt({ id = "bayside" }) {
  return (
    <section id={id} className="tb-section" aria-labelledby={`h-${id}`}>
      <div className="tb-wrap pg-narrow">
        <h2 id={`h-${id}`} className="tb-h2 pg-h2">Designed by tutors who know what lifts exam marks</h2>
        <p>
          Tuterly was carefully designed by the educators at {BAYSIDE.line}. In that time we&rsquo;ve seen what actually moves a maths mark before a test or exam: knowing exactly what&rsquo;s on it, working from the student&rsquo;s own mistakes, and practising each one until it&rsquo;s mastered. Tuterly is built around exactly that, for {PLUS_PRICES.week.now} a week at the launch price (50% off until 31 March 2027):
        </p>
        <ul className="pg-checklist">
          <li><strong>Find it:</strong> your child snaps the questions they got wrong, or uploads a whole marked test.</li>
          <li><strong>Fix it:</strong> a worked solution for each one, and the exact step that went wrong.</li>
          <li><strong>Master it:</strong> fresh versions of the same idea until it&rsquo;s mastered, not just explained once.</li>
          <li><strong>Predict it:</strong> Exam Zone works from their school&rsquo;s test outline and past papers and writes practice exams in that style.</li>
        </ul>
        <p>It&rsquo;s an app, not a tutor, and it covers Years 7 to 10 maths. Some families use it instead of a tutor; others use it between sessions, so the tutor&rsquo;s hour goes further.</p>
      </div>
    </section>
  );
}

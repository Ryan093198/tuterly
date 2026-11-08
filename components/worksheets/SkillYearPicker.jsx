import Link from "next/link";
import MathMd from "@/components/maths/MathMd";
import YearTabs from "@/components/worksheets/YearTabs";
import { skillYears, SKILL_SECTIONS } from "@/lib/skill-years";
import "@/components/maths/maths.css";
import "./skill-years.css";

// "Choose your year" for a skill page or topic hub (lib/skill-years.js).
export default function SkillYearPicker({ slug, initialYear }) {
  const years = skillYears(slug);
  if (!years.length) return null;
  const name = SKILL_SECTIONS[slug].name;
  const lower = name.toLowerCase();
  const first = years.find((y) => y.year === initialYear)?.year || years[0].year;
  return (
    <section id="by-year" className="sh-sec sy" aria-labelledby="sy-h">
      <div className="sh-wrap">
        <h2 id="sy-h">Choose your year level</h2>
        <p className="sh-sub">{name} at each year level, matched to the textbook chapters most Victorian schools use: a free printable worksheet with answers, sample questions, and an auto-marked test teachers can share.</p>
        <YearTabs years={years.map((y) => y.year)} initial={first} placement={`skill_${slug}`}>
          {years.map((y) => (
            <div key={y.year} className="sy-panel">
              <div className="sy-cards">
                <div className="sy-card sy-card--main">
                  <p className="sy-card__t">Free {y.year} {lower} worksheet</p>
                  <p className="sy-card__x">10 questions, then the answers with worked solutions. Printable PDF, no sign-up.</p>
                  <a href={y.pdf} className="tb-btn tb-btn--primary" target="_blank" rel="noopener">Download the PDF</a>
                </div>
                <div className="sy-card">
                  <p className="sy-card__t">Auto-marked test for your class</p>
                  <p className="sy-card__x">Teachers: share one link and every student is marked straight away, with worked solutions.</p>
                  <Link href={y.zoneHref} className="tb-btn tb-btn--secondary">Create a test</Link>
                </div>
                <div className="sy-card">
                  <p className="sy-card__t">Printable practice exam</p>
                  <p className="sy-card__x">Mix in harder questions, with marks and a suggested time.</p>
                  <Link href={y.examHref} className="tb-btn tb-btn--secondary">Build an exam</Link>
                </div>
              </div>
              <p className="sy-label">{y.year} topics covered</p>
              <ul className="sy-secs">
                {y.sections.map((s) => (
                  <li key={s.code}>{s.name}{s.extension && <span className="sy-tag">10A</span>}</li>
                ))}
              </ul>
              {y.samples.length > 0 && (
                <>
                  <p className="sy-label">Sample {y.year} {lower} questions</p>
                  <ol className="mx-practice sy-samples">
                    {y.samples.map((q, k) => (
                      <li key={k}>
                        <p className="ct-qtopic">{q.section}</p>
                        <MathMd md={q.question} />
                        <details>
                          <summary>Show the answer</summary>
                          <MathMd md={q.solution || `**Answer:** ${q.answer}`} />
                        </details>
                      </li>
                    ))}
                  </ol>
                </>
              )}
            </div>
          ))}
        </YearTabs>
      </div>
    </section>
  );
}

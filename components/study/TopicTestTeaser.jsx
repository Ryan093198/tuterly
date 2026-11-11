import { Md } from "@/lib/md-html";
import "katex/dist/katex.min.css";
import TopicTestOffer from "@/components/study/TopicTestOffer";
import { writtenTopicTest, sectionA, SHEET_QUESTIONS } from "@/lib/topic-test-files";
import { cleanMathText } from "@/lib/math-text-fixes";
import { c } from "@/components/marketing/theme";

// On a topic page (/worksheets/[slug]): the first four questions of that
// topic's written test, then "email me the full test" (TopicTestOffer,
// which also joins the Tuterly early list). Renders nothing for a topic
// without a written test yet, so each year level appears as it's written.
export default function TopicTestTeaser({ yearLevel, topicId, topic, slug }) {
  const test = writtenTopicTest(yearLevel, topicId);
  const sample = test && sectionA(test.questions_md);
  if (!sample) return null;
  const n = (test.questions_md.match(/^\*\*Question \d+\*\*/gm) || []).length;
  return (
    <section id="topic-test" aria-labelledby="tt-h" style={{ padding: "8px 24px 56px", background: c.white }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 8px" }}>Free topic test</p>
        <h2 id="tt-h" style={{ fontSize: 30, color: c.navy, lineHeight: 1.2, margin: "0 0 10px" }}>
          {yearLevel} {topic} test, with answers
        </h2>
        <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, margin: "0 0 20px" }}>
          A full {n}-question test on {topic.toLowerCase()}, from the basics up to harder questions, with an answer key to mark it. Here are the first four, and the first {SHEET_QUESTIONS} are a free printable PDF with answers.
        </p>
        <div style={{ border: `1px solid ${c.border}`, borderRadius: 16, padding: "8px 22px", background: c.offWhite, fontSize: 16, lineHeight: 1.7 }}>
          <Md md={cleanMathText(sample)} />
        </div>
        {slug && (
          <a
            href={`/worksheets/${slug}/practice-questions.pdf`}
            style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16, padding: "14px 18px", borderRadius: 14, border: `2px solid ${c.teal}`, background: c.white, textDecoration: "none", color: c.navy }}
          >
            <span aria-hidden="true" style={{ flex: "none", width: 42, height: 42, borderRadius: 10, background: c.teal, color: c.white, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 13 }}>PDF</span>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: "block", fontWeight: 700, fontSize: 16 }}>{`Download ${SHEET_QUESTIONS} ${yearLevel} ${topic.toLowerCase()} questions with answers`}</span>
              <span style={{ display: "block", fontSize: 14, color: c.textLight }}>Free printable PDF, no sign-up needed</span>
            </span>
          </a>
        )}
        <TopicTestOffer
          yearLevel={yearLevel}
          topicId={topicId}
          topicLabel={topic}
          placement="topic_page_test"
          eyebrow="Free full topic test"
          title={`Get the full ${n}-question ${topic.toLowerCase()} test, free`}
          count={n}
          style={{ marginTop: 20 }}
        />
      </div>
    </section>
  );
}

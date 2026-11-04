import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import TopicTestOffer from "@/components/study/TopicTestOffer";
import { writtenTopicTest, sectionA } from "@/lib/topic-test-files";
import { cleanMathText } from "@/lib/math-text-fixes";
import { c } from "@/components/marketing/theme";

// On a topic page (/worksheets/[slug]): the first four questions of that
// topic's written test, then "email me the full test" (TopicTestOffer,
// which also joins the Tuterly early list). Renders nothing for a topic
// without a written test yet, so each year level appears as it's written.
export default function TopicTestTeaser({ yearLevel, topicId, topic }) {
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
          A full {n}-question test on {topic.toLowerCase()}, from the basics up to harder questions, with an answer key to mark it. Here are the first four.
        </p>
        <div style={{ border: `1px solid ${c.border}`, borderRadius: 16, padding: "8px 22px", background: c.offWhite, fontSize: 16, lineHeight: 1.7 }}>
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
            {cleanMathText(sample)}
          </ReactMarkdown>
        </div>
        <TopicTestOffer
          yearLevel={yearLevel}
          topicId={topicId}
          topicLabel={topic}
          placement="topic_page_test"
          eyebrow={`${n} questions · answer key · printable`}
          title={`Get the full ${topic.toLowerCase()} test`}
          intro={`We'll email you all ${n} questions and the answer key, ready to print. You'll also be on the early list for the Tuterly app, which turns every question your child gets wrong into fresh practice.`}
          style={{ marginTop: 20 }}
        />
      </div>
    </section>
  );
}

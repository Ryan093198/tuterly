import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import { getTopicTest, questionCount } from "@/lib/topic-test";
import { cleanMathText } from "@/lib/math-text-fixes";
import "@/components/state/state-hub.css";
import "@/components/exam/exam.css";

// /topic-test/[id]: a full topic test emailed from the worksheet generator's
// free-limit box (lib/topic-test.js). Private link, not indexed.
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Your practice test",
  robots: { index: false, follow: false },
};

function Md({ children }) {
  return (
    <div className="eg-md">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
        {cleanMathText(children)}
      </ReactMarkdown>
    </div>
  );
}

// The model's own "# Topic - Practice Test - Year" heading is replaced by the page's.
const dropH1 = (md) => String(md || "").replace(/^#\s+.*\n+/, "");

export default async function TopicTestPage({ params }) {
  const { id } = await params;
  const test = await getTopicTest(id);
  const ready = test?.status === "ready";
  const pdf = (part) => `/api/topic-test/${id}/pdf?part=${part}`;

  return (
    <div className="sh">
      <MarketingNav />
      <header className="sh-hero">
        <p className="sh-eyebrow">{test ? `${test.year_level} maths · Practice test` : "Practice test"}</p>
        <h1>{test ? `${test.year_level} ${test.topic_label} test` : "Test not found"}</h1>
        {ready ? (
          <>
            <p className="sh-lead">{questionCount(test.questions_md)} questions, from the basics up to harder ones. Allow about {questionCount(test.questions_md) > 20 ? "45" : "30 to 35"} minutes, no notes, then mark it with the answer key at the bottom.</p>
            <p style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
              <a href={pdf("test")} className="tb-btn tb-btn--primary">Download the test (PDF)</a>
              <a href={pdf("answers")} className="tb-btn">Answer key (PDF)</a>
            </p>
          </>
        ) : (
          <p className="sh-lead">
            {test
              ? "This test is still being written. It usually takes a minute or two. Refresh this page shortly."
              : "We couldn't find this test. Check the link in your email."}
          </p>
        )}
      </header>

      {ready && (
        <main className="sh-wrap" style={{ paddingBottom: 40 }}>
          <Md>{dropH1(test.questions_md)}</Md>
          <details className="sh-box" style={{ marginTop: 32 }}>
            <summary style={{ fontWeight: 800, cursor: "pointer" }}>Show the answer key</summary>
            <div style={{ marginTop: 12 }}>
              <Md>{dropH1(test.answers_md)}</Md>
            </div>
          </details>
        </main>
      )}

      <AppCtaBand placement="topic_test_page" />
      <MarketingFooter />
    </div>
  );
}

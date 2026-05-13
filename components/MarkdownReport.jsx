import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import FlagQuestion from "@/components/FlagQuestion";

// flagOptions (optional): { reportId | resourceId, topic, flaggedSet: Set<number> }
//   — when provided, every <details> in the report is treated as a practice
//   question and gets a FlagQuestion button at the bottom. The Nth details in
//   document order is question N (1-indexed). Pass either reportId (for
//   session reports) or resourceId (for practice worksheets) — never both.
export default function MarkdownReport({ content, flagOptions }) {
  // Track which details we're rendering so we can assign question numbers
  // 1, 2, 3 sequentially. Reset on every render via a fresh closure.
  const counter = { n: 0 };

  return (
    <article className="report-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          h1: (props) => (
            <h1 className="text-[26px] font-semibold tracking-tight text-foreground" {...props} />
          ),
          h2: (props) => (
            <h2
              className="text-base font-semibold tracking-tight text-foreground mt-8 mb-1.5 pb-1.5 border-b border-zinc-200 dark:border-zinc-800 uppercase letter-spacing-wide"
              style={{ letterSpacing: "0.04em" }}
              {...props}
            />
          ),
          h3: (props) => (
            <h3 className="text-[15px] font-semibold mt-5 mb-1" {...props} />
          ),
          p: (props) => (
            <p
              className="text-[15px] leading-[1.65] my-2.5 text-zinc-700 dark:text-zinc-300"
              {...props}
            />
          ),
          ul: (props) => (
            <ul className="my-2.5 space-y-1.5 list-none pl-0" {...props} />
          ),
          ol: (props) => (
            <ol className="my-2.5 space-y-1.5 list-decimal pl-5" {...props} />
          ),
          li: ({ ordered, ...props }) => (
            <li
              className={`text-[15px] leading-[1.65] text-zinc-700 dark:text-zinc-300 ${
                ordered ? "" : "pl-5 relative"
              }`}
              {...props}
            >
              {!ordered && (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[0.6em] w-2 h-2 rounded-full bg-brand"
                />
              )}
              {props.children}
            </li>
          ),
          strong: (props) => (
            <strong className="font-semibold text-foreground" {...props} />
          ),
          em: (props) => (
            <em className="not-italic text-xs text-muted" {...props} />
          ),
          hr: () => <hr className="my-8 border-zinc-200 dark:border-zinc-800" />,
          code: (props) => (
            <code
              className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-[13px] font-mono"
              {...props}
            />
          ),
          a: (props) => (
            <a
              className="text-brand hover:text-brand-dark underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          details: (props) => {
            counter.n += 1;
            const num = counter.n;
            return (
              <details
                id={`question-${num}`}
                className="group my-3 scroll-mt-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-surface-soft overflow-hidden [&>*:not(summary)]:px-5 [&>*:not(summary):first-of-type]:mt-3 [&>*:not(summary):last-of-type]:mb-3 open:bg-card open:border-brand/30 target:ring-2 target:ring-brand/40"
                {...props}
              >
                {props.children}
                {flagOptions && (
                  <div className="px-5 pb-3">
                    <FlagQuestion
                      reportId={flagOptions.reportId}
                      resourceId={flagOptions.resourceId}
                      questionNumber={num}
                      topic={flagOptions.topic}
                      initial={flagOptions.flaggedSet?.has(num)}
                    />
                  </div>
                )}
              </details>
            );
          },
          table: (props) => (
            <div className="my-3 overflow-x-auto">
              <table
                className="min-w-[50%] border-collapse text-[14px] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden"
                {...props}
              />
            </div>
          ),
          thead: (props) => (
            <thead className="bg-surface-soft" {...props} />
          ),
          th: (props) => (
            <th
              className="text-left font-semibold px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 text-foreground"
              {...props}
            />
          ),
          td: (props) => (
            <td
              className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-900 last:border-b-0"
              {...props}
            />
          ),
          summary: (props) => (
            <summary
              className="cursor-pointer select-none px-4 py-2.5 text-sm font-medium text-brand-dark hover:bg-brand-pale transition flex items-center gap-2 list-none [&::-webkit-details-marker]:hidden"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform group-open:rotate-90"
              >
                <polyline points="9 6 15 12 9 18" />
              </svg>
              {props.children}
            </summary>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllSlugs } from "@/lib/learn";
import { SITE_URL } from "@/lib/site";
import { c } from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import WorksheetGenerator from "@/components/WorksheetGenerator";
import { getTopicGroupsForLevel } from "@/lib/curriculum-topics";

// Year ranges an article can opt into via the `generator` frontmatter key.
const GENERATOR_RANGES = {
  primary: { years: ["Year 3", "Year 4", "Year 5", "Year 6"], initial: "Year 5", label: "Years 3 to 6" },
  secondary: { years: ["Year 7", "Year 8", "Year 9", "Year 10"], initial: "Year 8", label: "Years 7 to 10" },
  all: {
    years: ["Year 3", "Year 4", "Year 5", "Year 6", "Year 7", "Year 8", "Year 9", "Year 10"],
    initial: "Year 7",
    label: "Years 3 to 10",
  },
};
const GENERATOR_ANCHOR = "build-a-practice-test";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Tuterly`,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/learn/${slug}` },
    openGraph: {
      title: `${post.title} | Tuterly`,
      description: post.description,
      url: `${SITE_URL}/learn/${slug}`,
      type: "article",
    },
  };
}

export default async function LearnPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Articles opt in with `generator: primary | secondary | all` in frontmatter.
  const range = GENERATOR_RANGES[post.generator] || null;
  const topicsByYear = range
    ? Object.fromEntries(
        range.years.map((y) => [y, getTopicGroupsForLevel(y, "maths", [y])])
      )
    : null;

  // Optional placement marker. Without it the generator renders after the
  // article body; with it, wherever the author put it.
  const [beforeGenerator, afterGenerator] = range
    ? (() => {
        const parts = post.content.split("<!--GENERATOR-->");
        return parts.length > 1 ? [parts[0], parts.slice(1).join("")] : [post.content, ""];
      })()
    : [post.content, ""];

  return (
    <article style={{ padding: "72px 24px 80px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <Fade>
          <Link href="/learn" style={{ fontSize: 13, fontWeight: 600, color: c.teal, textDecoration: "none", marginBottom: 24, display: "inline-block" }}>
            &larr; All guides
          </Link>

          {post.audience && (
            <p style={{ fontSize: 12, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, marginTop: 16 }}>{post.audience}</p>
          )}

          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, color: c.navy, lineHeight: 1.2, marginBottom: 12 }}>
            {post.title}
          </h1>

          {post.date && (
            <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 32 }}>
              {new Date(post.date).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}
        </Fade>

        {range && (
          <Fade>
            <a
              href={`#${GENERATOR_ANCHOR}`}
              style={{
                display: "block",
                textDecoration: "none",
                background: "#ECFDFB",
                border: "1px solid #14B8A6",
                borderRadius: 14,
                padding: "16px 20px",
                marginBottom: 32,
              }}
            >
              <p style={{ fontSize: 15.5, fontWeight: 700, color: c.navy, marginBottom: 4 }}>
                Build a free practice test in seconds &darr;
              </p>
              <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.55 }}>
                {range.label}, aligned to the Victorian Curriculum, with full worked
                solutions. No signup needed.
              </p>
            </a>
          </Fade>
        )}

        <Fade>
          <div className="learn-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {beforeGenerator}
            </ReactMarkdown>
          </div>
        </Fade>

        {range && (
          <div id={GENERATOR_ANCHOR} style={{ scrollMarginTop: 90, margin: "40px 0" }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: c.navy, lineHeight: 1.25, marginBottom: 8 }}>
              Build a free practice test
            </h2>
            <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, marginBottom: 20 }}>
              Pick a year level and topic. Fresh questions every time, with full
              worked solutions, ready to print.
            </p>
            <WorksheetGenerator
              topicsByYear={topicsByYear}
              yearLevels={range.years}
              initialYearLevel={range.initial}
            />
          </div>
        )}

        {afterGenerator.trim() && (
          <Fade>
            <div className="learn-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {afterGenerator}
              </ReactMarkdown>
            </div>
          </Fade>
        )}

        {range && (
          <Fade>
            <div
              style={{
                marginTop: 44,
                background: "#ECFDFB",
                border: "1px solid #14B8A6",
                borderRadius: 18,
                padding: 28,
              }}
            >
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: c.navy, lineHeight: 1.25, marginBottom: 10 }}>
                Want a full 25-question test?
              </h2>
              <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, marginBottom: 18 }}>
                Tuterly builds a complete practice test across a whole topic, mixed
                difficulty and VCAA aligned, with a separate answer key for marking.
                Any topic, any time, for every child on your account.
              </p>
              <Link
                href="/get-started"
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  borderRadius: 12,
                  background: c.navy,
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(15,27,45,0.18)",
                }}
              >
                Build their first test free &rarr;
              </Link>
              <p style={{ fontSize: 13, color: c.textLight, marginTop: 12 }}>
                Free for 7 days, then $29/month. Cancel anytime.
              </p>
            </div>
          </Fade>
        )}
      </div>

      {/* Prose styles for markdown content */}
      <style dangerouslySetInnerHTML={{ __html: `
        .learn-prose { font-size: 16px; line-height: 1.8; color: ${c.text}; }
        .learn-prose h2 { font-family: 'DM Serif Display', serif; font-size: 26px; color: ${c.navy}; margin: 40px 0 16px; }
        .learn-prose h3 { font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 600; color: ${c.navy}; margin: 32px 0 12px; }
        .learn-prose p { margin: 0 0 18px; color: ${c.text}; }
        .learn-prose ul, .learn-prose ol { margin: 0 0 18px; padding-left: 24px; }
        .learn-prose li { margin-bottom: 8px; }
        .learn-prose a { color: ${c.teal}; text-decoration: underline; text-underline-offset: 2px; }
        .learn-prose a:hover { color: ${c.tealDark}; }
        .learn-prose strong { font-weight: 600; color: ${c.navy}; }
        .learn-prose blockquote { border-left: 3px solid ${c.teal}; padding-left: 16px; margin: 24px 0; color: ${c.textLight}; font-style: italic; }
        .learn-prose hr { border: none; border-top: 1px solid ${c.border}; margin: 40px 0; }
        .learn-prose .cta-box { background: ${c.tealPale}; border: 1px solid ${c.teal}20; border-radius: 12px; padding: 24px; margin: 32px 0; }
        .learn-prose .cta-box a { font-weight: 600; }
      `}} />
    </article>
  );
}

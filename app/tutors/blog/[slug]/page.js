import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getTutorPostBySlug, getAllTutorSlugs } from "@/lib/tutor-blog";
import { SITE_URL } from "@/lib/site";
import { c } from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";

export async function generateStaticParams() {
  return getAllTutorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getTutorPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Tuterly`,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/tutors/blog/${slug}` },
    openGraph: {
      title: `${post.title} | Tuterly`,
      description: post.description,
      url: `${SITE_URL}/tutors/blog/${slug}`,
      type: "article",
    },
  };
}

export default async function TutorBlogPost({ params }) {
  const { slug } = await params;
  const post = getTutorPostBySlug(slug);
  if (!post) notFound();

  return (
    <article style={{ padding: "72px 24px 80px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <Fade>
          <Link href="/tutors/blog" style={{ fontSize: 13, fontWeight: 600, color: c.teal, textDecoration: "none", marginBottom: 24, display: "inline-block" }}>
            &larr; All tutor posts
          </Link>

          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, color: c.navy, lineHeight: 1.2, marginBottom: 12, marginTop: 16 }}>
            {post.title}
          </h1>

          {post.date && (
            <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 32 }}>
              {new Date(post.date).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}
        </Fade>

        <Fade>
          <div className="tutor-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </Fade>
      </div>

      {/* Prose styles for markdown content */}
      <style dangerouslySetInnerHTML={{ __html: `
        .tutor-prose { font-size: 16px; line-height: 1.8; color: ${c.text}; }
        .tutor-prose h2 { font-family: 'DM Serif Display', serif; font-size: 26px; color: ${c.navy}; margin: 40px 0 16px; }
        .tutor-prose h3 { font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 600; color: ${c.navy}; margin: 32px 0 12px; }
        .tutor-prose p { margin: 0 0 18px; color: ${c.text}; }
        .tutor-prose ul, .tutor-prose ol { margin: 0 0 18px; padding-left: 24px; }
        .tutor-prose li { margin-bottom: 8px; }
        .tutor-prose a { color: ${c.teal}; text-decoration: underline; text-underline-offset: 2px; }
        .tutor-prose a:hover { color: ${c.tealDark}; }
        .tutor-prose strong { font-weight: 600; color: ${c.navy}; }
        .tutor-prose blockquote { border-left: 3px solid ${c.teal}; padding-left: 16px; margin: 24px 0; color: ${c.textLight}; font-style: italic; }
        .tutor-prose hr { border: none; border-top: 1px solid ${c.border}; margin: 40px 0; }
      `}} />
    </article>
  );
}

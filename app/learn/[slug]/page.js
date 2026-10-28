import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllSlugs } from "@/lib/learn";
import { SITE_URL } from "@/lib/site";
import { c } from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import StudyAppCTA from "@/components/StudyAppCTA";
import { STUDY_APP } from "@/lib/study-app";
import { studyAppFit, splitAtThird } from "@/lib/learn-study-fit";


export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: { absolute: `${post.title} | Tuterly` },
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

  // The practice-test builder was removed from the site (Oct 2026). Old
  // articles may still carry a <!--GENERATOR--> marker or a `generator`
  // frontmatter key; both are ignored now.
  const beforeGenerator = post.content.replace(/<!--GENERATOR-->/g, "");

  // Tuterly placement (see lib/learn-study-fit.js). Full-fit articles
  // get an inline CTA about a third of the way in and a card at the end;
  // soft-fit articles only the end card.
  const fit = studyAppFit(post);
  const split = fit === "full" ? splitAtThird(beforeGenerator) : null;
  const [introPart, restPart] = split || [beforeGenerator, ""];

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

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 38, color: c.navy, lineHeight: 1.2, marginBottom: 12 }}>
            {post.title}
          </h1>

          {post.date && (
            <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 32 }}>
              {new Date(post.date).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}
        </Fade>


        <Fade>
          <div className="learn-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {introPart}
            </ReactMarkdown>
          </div>
        </Fade>

        {split && (
          <StudyAppCTA
            variant="inline"
            placement="learn_inline"
            heading="Has your child got maths questions wrong this week?"
          />
        )}

        {restPart.trim() && (
          <Fade>
            <div className="learn-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {restPart}
              </ReactMarkdown>
            </div>
          </Fade>
        )}



        {fit === "full" && (
          <StudyAppCTA
            variant="card"
            placement="learn_end"
            heading="Turn the questions they get wrong into practice"
            style={{ marginTop: 44 }}
          />
        )}
        {fit === "soft" && (
          <StudyAppCTA
            variant="card"
            placement="learn_end_soft"
            heading={`For Years 7 to 10 maths, try ${STUDY_APP.name}`}
            sub="Your child snaps the maths questions they get wrong and practises fresh versions until they're mastered."
            style={{ marginTop: 44 }}
          />
        )}

      </div>

      {/* Prose styles for markdown content */}
      <style dangerouslySetInnerHTML={{ __html: `
        .learn-prose { font-size: 16px; line-height: 1.8; color: ${c.text}; }
        .learn-prose h2 { font-family: var(--font-display); font-size: 26px; color: ${c.navy}; margin: 40px 0 16px; }
        .learn-prose h3 { font-family: var(--font-display); font-size: 18px; font-weight: 600; color: ${c.navy}; margin: 32px 0 12px; }
        .learn-prose p { margin: 0 0 18px; color: ${c.text}; }
        .learn-prose ul, .learn-prose ol { margin: 0 0 18px; padding-left: 24px; }
        .learn-prose li { margin-bottom: 8px; }
        .learn-prose a { color: ${c.teal}; text-decoration: underline; text-underline-offset: 2px; }
        .learn-prose a:hover { color: ${c.tealDark}; }
        .learn-prose img { display: block; width: 100%; height: auto; margin: 28px 0; border: 1px solid ${c.border}; border-radius: 12px; background: #fff; }
        .learn-prose strong { font-weight: 600; color: ${c.navy}; }
        .learn-prose blockquote { border-left: 3px solid ${c.teal}; padding-left: 16px; margin: 24px 0; color: ${c.textLight}; font-style: italic; }
        .learn-prose hr { border: none; border-top: 1px solid ${c.border}; margin: 40px 0; }
        .learn-prose .cta-box { background: ${c.tealPale}; border: 2px solid var(--border); border-radius: 12px; padding: 24px; margin: 32px 0; }
        .learn-prose .cta-box a { font-weight: 600; }
      `}} />
    </article>
  );
}

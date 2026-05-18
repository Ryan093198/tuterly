import Link from "next/link";
import { getAllPosts } from "@/lib/learn";
import { SITE_URL } from "@/lib/site";
import { c } from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";

export const metadata = {
  title: "Learn | Tuterly",
  description:
    "Guides for Melbourne parents — when to tutor, what to expect at each year level, and how to support your child's learning at home.",
  alternates: { canonical: `${SITE_URL}/learn` },
  openGraph: {
    title: "Learn | Tuterly",
    description:
      "Guides for Melbourne parents — when to tutor, what to expect at each year level, and how to support your child's learning at home.",
    url: `${SITE_URL}/learn`,
    type: "website",
  },
};

export default function LearnIndex() {
  const posts = getAllPosts();

  return (
    <section style={{ padding: "72px 24px 80px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Fade>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>
            Parent Guides
          </p>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, color: c.navy, lineHeight: 1.15, marginBottom: 16 }}>
            Learn
          </h1>
          <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 48 }}>
            Straightforward answers to the questions Melbourne parents actually ask — year levels, subject choices, when to get help, and how to make it count.
          </p>
        </Fade>

        {posts.length === 0 && (
          <p style={{ fontSize: 15, color: c.textMuted }}>Posts coming soon.</p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {posts.map((post) => (
            <Fade key={post.slug}>
              <Link href={`/learn/${post.slug}`} style={{ textDecoration: "none", display: "block", padding: "24px 28px", borderRadius: 12, border: `1px solid ${c.border}`, transition: "box-shadow 0.2s, border-color 0.2s" }}>
                {post.audience && (
                  <p style={{ fontSize: 12, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{post.audience}</p>
                )}
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: c.navy, marginBottom: 8 }}>{post.title}</h2>
                <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.6 }}>{post.description}</p>
                {post.date && (
                  <p style={{ fontSize: 12, color: c.textMuted, marginTop: 12 }}>{new Date(post.date).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}</p>
                )}
              </Link>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content", "learn");

/**
 * Parse simple YAML frontmatter from a markdown string.
 * Returns { meta: {}, content: string }
 */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    // Strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    meta[key] = val;
  }
  return { meta, content: match[2] };
}

/**
 * Get all published posts sorted by date (newest first).
 */
export function getAllPosts() {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { meta } = parseFrontmatter(raw);
    return {
      slug: file.replace(/\.md$/, ""),
      title: meta.title || file.replace(/\.md$/, ""),
      description: meta.description || "",
      date: meta.date || "",
      audience: meta.audience || "",
      published: meta.published !== "false",
    };
  });

  return posts
    .filter((p) => p.published)
    .sort((a, b) => (b.date > a.date ? 1 : -1));
}

/**
 * Get a single post by slug. Returns null if not found.
 */
export function getPostBySlug(slug) {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { meta, content } = parseFrontmatter(raw);

  return {
    slug,
    title: meta.title || slug,
    description: meta.description || "",
    date: meta.date || "",
    audience: meta.audience || "",
    // Optional: "primary" | "secondary" | "all". When set, the article page
    // embeds the free worksheet/practice-test generator for that year range.
    generator: meta.generator || "",
    content,
  };
}

/**
 * Get all slugs (for generateStaticParams).
 */
export function getAllSlugs() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

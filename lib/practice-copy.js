// The worksheet / practice-test builder was removed from the site (Oct
// 2026); practice now happens in the Tuterly Study app. The topic pages
// keep their URLs and their teaching content, so this strips sentences
// that describe the builder ("these worksheets", "generate", "print")
// from copy written for it. Content files stay untouched.
const BUILDER = /worksheet|generat|printable|\bprint\b|every click|no signup/i;

export function withoutBuilderSentences(text) {
  if (!text) return text;
  const kept = text
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"“(])/)
    .filter((sentence) => !BUILDER.test(sentence));
  return kept.length ? kept.join(" ") : null;
}

// FAQs: drop questions about the builder itself, and builder sentences
// inside other answers.
export function practiceFaqs(faqs) {
  return (faqs || [])
    .filter((f) => !BUILDER.test(f.q))
    .map((f) => ({ q: f.q, a: withoutBuilderSentences(f.a) }))
    .filter((f) => f.a);
}

// Page copy for a topic page, now that the builder is gone.
export function topicPageCopy(page) {
  const topic = page.topic.toLowerCase();
  return {
    h1: `Practise ${page.yearLevel} ${topic}`,
    subtitle: `What ${page.yearLevel} students learn in ${topic}, where they usually slip, and practice tests with a worked solution for every question.`,
    metaTitle: `${page.yearLevel} ${page.topic} Practice (Victorian Curriculum)`,
    metaDescription: `${page.yearLevel} ${topic}, aligned to the Victorian Curriculum: the sub-skills covered, common mistakes, and practice tests with worked solutions in the Tuterly Study app.`,
  };
}

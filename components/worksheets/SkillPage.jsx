import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import WorksheetGenerator from "@/components/WorksheetGenerator";
import WorksheetUpgrade from "@/components/study/WorksheetUpgrade";
import TopicGuide from "@/components/study/TopicGuide";
import SkillYearPicker from "@/components/worksheets/SkillYearPicker";
import { getTopicGroupsForLevel } from "@/lib/curriculum-topics";
import { getLandingPageBySlug } from "@/lib/worksheet-landing-pages";
import { SKILL_PAGES, skillTopic } from "@/lib/skill-pages";
import { mathToReadable } from "@/lib/try-email";
import { SITE_URL } from "@/lib/site";
import "@/components/state/state-hub.css";

const GEN_YEARS = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 10A"];

export function skillMetadata(skill) {
  const url = `${SITE_URL}/worksheets/${skill.slug}`;
  return {
    title: { absolute: skill.metaTitle },
    description: skill.metaDescription,
    alternates: { canonical: url },
    openGraph: { images: ["/og-tuterly.png"], title: skill.metaTitle, description: skill.metaDescription, url, type: "website" },
    twitter: { card: "summary_large_image", title: skill.metaTitle, description: skill.metaDescription },
  };
}

// One skill, one page: what it is (guide), a quick check, and a worksheet
// generator preset to the curriculum topic that covers it.
export default function SkillPage({ skill }) {
  const topic = skillTopic(skill);
  const url = `${SITE_URL}/worksheets/${skill.slug}`;
  const topicsByYear = Object.fromEntries(GEN_YEARS.map((y) => [y, getTopicGroupsForLevel(y, "maths", [y])]));
  const related = [skill.topicSlug, ...(skill.relatedSlugs || [])]
    .filter((s, i, a) => a.indexOf(s) === i)
    .map(getLandingPageBySlug)
    .filter(Boolean);
  const otherSkills = SKILL_PAGES.filter((s) => s.slug !== skill.slug).slice(0, 8);
  const quiz = skill.guide?.quiz || [];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Free Worksheets", item: `${SITE_URL}/worksheets` },
        { "@type": "ListItem", position: 3, name: skill.h1, item: url },
      ],
    },
    quiz.length && {
      "@context": "https://schema.org",
      "@type": "Quiz",
      name: skill.guide.title,
      about: { "@type": "Thing", name: skill.keyword },
      hasPart: quiz.map((q) => ({
        "@type": "Question",
        eduQuestionType: "Short answer",
        text: mathToReadable(q.q),
        acceptedAnswer: { "@type": "Answer", text: mathToReadable(q.a) },
      })),
    },
    skill.faqs?.length && {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: skill.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ].filter(Boolean);

  return (
    <div className="sh">
      {schema.map((x, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />
      ))}
      <MarketingNav />

      <nav aria-label="Breadcrumb" className="sh-crumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/worksheets">Free Worksheets</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{skill.h1.replace(/ worksheets with answers$/i, "")}</li>
        </ol>
      </nav>

      <header className="sh-hero">
        <p className="sh-eyebrow">Free worksheet · Australian Curriculum</p>
        <h1>{skill.h1}</h1>
        <p className="sh-lead">{skill.lead}</p>
        <p className="yt-jump" style={{ marginTop: 16 }}>
          <a href="#by-year" style={{ fontWeight: 800, color: "var(--brand-text)", textDecoration: "none" }}>Choose your year ↓</a>
          <span aria-hidden="true" style={{ color: "var(--muted)", margin: "0 10px" }}>·</span>
          <a href="#make-worksheet" style={{ fontWeight: 800, color: "var(--brand-text)", textDecoration: "none" }}>Make a worksheet ↓</a>
          <span aria-hidden="true" style={{ color: "var(--muted)", margin: "0 10px" }}>·</span>
          <a href="#guide" style={{ fontWeight: 800, color: "var(--brand-text)", textDecoration: "none" }}>How to do it and a quick check ↓</a>
        </p>
      </header>

      <SkillYearPicker slug={skill.slug} initialYear={topic?.yearLevel} />
      <TopicGuide guide={skill.guide} id="guide" />

      <main id="make-worksheet" className="sh-gen" style={{ scrollMarginTop: 90 }}>
        <WorksheetGenerator
          topicsByYear={topicsByYear}
          initialYearLevel={topic?.yearLevel || "Year 7"}
          initialTopicId={topic?.topicId}
          yearLevels={GEN_YEARS}
          studyAppUnderGenerator={false}
        />
      </main>

      <div className="sh-upgrade">
        <WorksheetUpgrade topic={skill.keyword.replace(/ worksheets?$/i, "")} placement={`skill_${skill.slug}_upgrade`} />
      </div>

      {related.length > 0 && (
        <section className="sh-sec sh-sec--paper" aria-labelledby="sk-related">
          <div className="sh-wrap">
            <h2 id="sk-related">Topic worksheets with worked examples</h2>
            <p className="sh-sub">These topic pages cover this skill, with worked examples, common mistakes and a question to try.</p>
            <div className="sh-grid">
              {related.map((p) => (
                <Link key={p.slug} href={`/worksheets/${p.slug}`} className="sh-card">
                  <span className="sh-card__kicker">{p.yearLevel} worksheet</span>
                  <span className="sh-card__name">{p.topic}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {skill.faqs?.length > 0 && (
        <section className="sh-sec" aria-labelledby="sk-faq">
          <div className="sh-wrap sh-narrow">
            <h2 id="sk-faq">Questions</h2>
            <div className="sh-faqs">
              {skill.faqs.map((f) => (
                <div key={f.q} className="sh-box">
                  <h3 className="sh-h3">{f.q}</h3>
                  <p className="sh-p">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sh-sec sh-sec--paper" aria-labelledby="sk-more">
        <div className="sh-wrap">
          <h2 id="sk-more">More skill worksheets</h2>
          <div className="sh-grid">
            {otherSkills.map((s) => (
              <Link key={s.slug} href={`/worksheets/${s.slug}`} className="sh-card">
                <span className="sh-card__kicker">Skill worksheet</span>
                <span className="sh-card__name">{s.h1.replace(/ worksheets with answers$/i, "")}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AppCtaBand placement={`skill_${skill.slug}_final`} />
      <MarketingFooter />
    </div>
  );
}

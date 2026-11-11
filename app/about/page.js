import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import MethodStrip from "@/components/method/MethodStrip";
import { SITE_URL, EDUCOURSE_URL } from "@/lib/site";
import { reviewerPerson } from "@/lib/reviewed";
import "@/components/state/state-hub.css";
import "@/components/brand/brand.css";

// About Tuterly and the people behind it (Ryan, 11 Nov 2026): who writes and
// checks the maths, for parents and for Google's "who is behind this site"
// questions. Facts only as Ryan has stated them. Tutor profiles get added
// here once each tutor has approved their details.

const URL = `${SITE_URL}/about`;
const TITLE = "About Tuterly: the team behind it | Tuterly";
const DESCRIPTION =
  "Tuterly is a Years 7 to 10 maths app from Bayside Academics, a Brighton tutoring centre that has taught over 2,000 students in 10 years. Who we are and how we check our maths.";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${URL}#page`,
        url: URL,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "en-AU",
        mainEntity: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "Tuterly",
        url: SITE_URL,
        logo: `${SITE_URL}/og-tuterly.png`,
        founder: { "@id": `${URL}#ryan` },
        parentOrganization: {
          "@type": "EducationalOrganization",
          name: "Bayside Academics",
          url: "https://baysideacademics.com.au",
          address: { "@type": "PostalAddress", streetAddress: "240 Bay Street", addressLocality: "Brighton", addressRegion: "VIC", addressCountry: "AU" },
        },
      },
      { ...reviewerPerson(), "@id": `${URL}#ryan` },
    ],
  };
  return (
    <div className="sh">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />
      <header className="sh-hero">
        <p className="sh-eyebrow">About Tuterly</p>
        <h1>Made by a Melbourne tutoring centre, not a tech company</h1>
        <p className="sh-lead">
          Tuterly is a maths study app for Years 7 to 10, built by Bayside Academics, a tutoring centre at 240 Bay Street, Brighton. We&rsquo;ve taught over 2,000 students in 10 years and have a 5.0 rating on Google.
        </p>
      </header>

      <section className="sh-sec">
        <div className="sh-wrap sh-narrow">
          <h2>Why we built it</h2>
          <p className="sh-p">
            Most students don&rsquo;t need more maths. They need to fix the questions they keep getting wrong. That&rsquo;s what a good tutor does in a lesson, and it&rsquo;s what Tuterly does between lessons, or instead of them: snap a question you got wrong, see the worked solution, then practise fresh questions on that same skill until it sticks. We call it <Link href="/method">the Tuterly Method</Link>.
          </p>
          <p className="sh-p">
            The free tools on this site (the <Link href="/worksheets">worksheet generator</Link>, <Link href="/exam-generator">practice exams</Link>, <Link href="/study-planner">study planner</Link> and <Link href="/formula-sheets">formula sheets</Link>) come from the same experience.
          </p>
        </div>
      </section>

      <section className="sh-sec" id="ryan" style={{ scrollMarginTop: 80 }}>
        <div className="sh-wrap sh-narrow">
          <h2>Ryan, founder</h2>
          <div className="sh-box">
            <p className="sh-p" style={{ marginTop: 0 }}>
              Ryan founded Bayside Academics and Tuterly, and has spent 15 years in private tutoring. He writes Tuterly&rsquo;s guides for parents and checks the maths topic pages on this site before they go out.
            </p>
            <p className="sh-p">
              Bayside Academics also runs <a href={EDUCOURSE_URL}>Educourse</a>, our selective entry and scholarship preparation platform.
            </p>
          </div>
        </div>
      </section>

      <section className="sh-sec">
        <div className="sh-wrap sh-narrow">
          <h2>How we check our maths</h2>
          <ul className="sh-p" style={{ paddingLeft: 20, lineHeight: 1.7 }}>
            <li>Topic pages, guides and worked examples are checked by Ryan before they&rsquo;re marked as checked. Newer pages that haven&rsquo;t been read yet say so.</li>
            <li>Every worked example and answer is recomputed step by step before it&rsquo;s published.</li>
            <li>Practice questions from the generators are written with AI and then solved a second time, independently, before you see them. If the two answers don&rsquo;t match, the question is thrown out.</li>
            <li>Everything follows the Australian Curriculum (Version 9.0) and the Victorian Curriculum 2.0.</li>
          </ul>
          <p className="sh-p">
            Spotted a mistake? Email <a href="mailto:admin@baysideacademics.com.au">admin@baysideacademics.com.au</a> and we&rsquo;ll fix it.
          </p>
        </div>
      </section>

      <MethodStrip />
      <MarketingFooter />
    </div>
  );
}

import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import HowItWorks from "@/components/teachers/HowItWorks";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

// Tuterly for Teachers, step by step: a scroll story from a paper class test
// to practice for every student (Ryan, 16 Nov 2026). Linked from /teachers.
const TITLE = "How Tuterly for Teachers Works: Paper Tests to Practice | Tuterly";
const DESCRIPTION =
  "Scan your class's paper tests on any copier. Tuterly marks every answer twice, you approve, and every student instantly gets practice on their own weak topics. See it step by step.";
const URL = `${SITE_URL}/teachers/how-it-works`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const mail = (subject, body) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
const DEMO = mail("Tuterly for Teachers: book a demo", "Hi Tuterly team,\n\nI'd like a demo of Tuterly for Teachers.\n\nName:\nSchool:\nYear levels I teach:\nBest time to talk:\n\nThanks");
const ACCOUNT = mail("Tuterly for Teachers: teacher account", "Hi Tuterly team,\n\nI'd like to set up a teacher account for my own classes.\n\nName:\nSchool:\nYear levels and number of classes:\n\nThanks");

export default function HowItWorksPage() {
  return (
    <div className="tb">
      <MarketingNav />
      <main className="hw">
        <HowItWorks demoHref={DEMO} />
        <section className="hw-end" aria-labelledby="hw-end-title">
          <h2 id="hw-end-title">Want to see it with your own class&rsquo;s tests?</h2>
          <p>We&rsquo;ll set up your school&rsquo;s copier free of charge and mark a class set with you, from scan to practice. For a whole department, or just your own classes.</p>
          <div className="hw-hero__btns">
            <a href={DEMO} className="tb-btn tb-btn--primary">Book a demo</a>
            <a href={ACCOUNT} className="tb-btn tb-btn--secondary">Ask about a teacher account</a>
          </div>
          <Link href="/teachers#tuterly-for-teachers" className="hw-end__back">Back to Tuterly for Teachers</Link>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}

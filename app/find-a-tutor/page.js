import { SITE_URL } from "@/lib/site";
import { c, MARKETING_FONTS_IMPORT } from "@/components/marketing/theme";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import FindTutorButton from "@/components/FindTutorButton";
import { AppSoftLine } from "@/components/study/TutoringPageApp";

// /find-a-tutor - plain landing for the "Find a local tutor" form. Linked
// from the worksheet PDF footer and the marketing footers.

const TITLE = "Find a local tutor | Tuterly";
const DESCRIPTION =
  "Tell us what your child needs and up to 3 tutoring centres near you can get in touch. Free, no obligation.";
const URL = `${SITE_URL}/find-a-tutor`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
};

export default async function FindATutorPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const source = ["worksheet", "suburb_page", "parents_page"].includes(sp.source)
    ? sp.source
    : "parents_page";

  return (
    <main style={{ background: c.white, fontFamily: "var(--font-display)", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />
      <MarketingNav />
      <section style={{ padding: "80px 24px 96px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>
            Free, no obligation
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 42, color: c.navy, lineHeight: 1.15, marginBottom: 18 }}>
            Want help from a local tutor?
          </h1>
          <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 28 }}>
            Tell us what your child needs and up to 3 tutoring centres near you
            can get in touch. It&apos;s free.
          </p>
          <FindTutorButton
            source={source}
            style={{ padding: "15px 32px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 16, fontWeight: 600, border: "none" }}
          >
            Find me a tutor
          </FindTutorButton>
          <p style={{ fontSize: 13, color: c.textMuted, marginTop: 18 }}>
            Takes about a minute. We only share your details with centres if you tick the consent box.
          </p>
          {/* This page is the "prefer a real tutor" destination, so the tutor
              form stays primary and the app is the quiet alternative. */}
          <AppSoftLine />
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}

import Link from "next/link";
import { SEO_SUBURBS, isPublishable } from "@/lib/seo-suburbs";
import { SITE_URL } from "@/lib/site";
import {
  c,
  MARKETING_FONTS_IMPORT,
} from "@/components/marketing/theme";
import TuterlyMethod from "@/components/marketing/TuterlyMethod";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const DIRECTORY_HREF = "/directory";

export const metadata = {
  title: "Tutoring across Melbourne | Tuterly",
  description:
    "Tutoring across Melbourne — Tuterly connects families with experienced tutors who know the local curriculum. Online or in-person, with detailed reports after every session.",
  alternates: { canonical: `${SITE_URL}/tutoring` },
  openGraph: {
    title: "Tutoring across Melbourne | Tuterly",
    description:
      "Tutoring across Melbourne — Tuterly connects families with experienced tutors who know the local curriculum. Online or in-person, with detailed reports after every session.",
    url: `${SITE_URL}/tutoring`,
    type: "website",
  },
};

export default function TutoringDirectory() {
  const live = SEO_SUBURBS.filter(isPublishable);

  return (
    <main style={{ background: c.white, fontFamily: "'DM Sans', sans-serif", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      {/* HERO */}
      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Tutoring across Melbourne</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Tutoring across Melbourne.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Finding the right tutor in Melbourne shouldn&apos;t be hard. Tuterly connects families with experienced tutors who know their child&apos;s curriculum and deliver results you can actually see — sessions can be online or in-person, depending on what works for your family.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href={DIRECTORY_HREF} style={{ padding: "14px 28px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Find a tutor →
              </Link>
            </div>
          </Fade>
        </div>
      </section>

      {/* SUBURB LIST */}
      <section style={{ padding: "56px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Suburbs we serve</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 24, lineHeight: 1.25 }}>
              Find tutoring near you.
            </h2>
            {live.length === 0 ? (
              <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7 }}>
                More suburb-specific pages are on the way. In the meantime, any Melbourne family can{" "}
                <Link href={DIRECTORY_HREF} style={{ color: c.teal, fontWeight: 600 }}>find a tutor in our directory</Link>.
              </p>
            ) : (
              <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
                {live.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/tutoring/${s.slug}`}
                      style={{ display: "block", padding: "14px 18px", borderRadius: 12, background: c.white, border: `1px solid ${c.border}`, textDecoration: "none", color: c.navy, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, transition: "border-color 0.2s" }}
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Fade>
        </div>
      </section>

      {/* THE TUTERLY METHOD */}
      <TuterlyMethod background={c.white} padding="80px 24px" />

      {/* GET STARTED CTA */}
      <section style={{ padding: "72px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Ready to find a tutor?
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 28 }}>
              No lock-in contracts. No agency markups. Browse tutors, message them directly, and start whenever you&apos;re ready.
            </p>
            <Link href={DIRECTORY_HREF} style={{ display: "inline-block", padding: "14px 32px", borderRadius: 10, background: c.teal, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Get started — free to sign up
            </Link>
          </Fade>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}

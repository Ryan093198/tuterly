import Link from "next/link";
import { SEO_SUBURBS, isPublishable } from "@/lib/seo-suburbs";
import { SITE_URL, APP_URL } from "@/lib/site";
import {
  c,
  MARKETING_FONTS_IMPORT,
} from "@/components/marketing/theme";
import TuterlyMethod from "@/components/marketing/TuterlyMethod";
import Fade from "@/components/marketing/Fade";

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

      {/* TOP NAV */}
      <nav style={{ background: c.white, borderBottom: `1px solid ${c.border}`, padding: "16px 24px", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg, ${c.teal}, ${c.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: c.white }}>T</div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.navy }}>tuterly</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <Link href="/parents" style={{ padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>For Parents</Link>
            <Link href={DIRECTORY_HREF} style={{ padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>Find a Tutor</Link>
            <Link href="/tutors" style={{ padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>Apply as a Tutor</Link>
            <a href={APP_URL} style={{ padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>Log in</a>
            <Link href={DIRECTORY_HREF} style={{ padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: c.navy, color: c.white, textDecoration: "none" }}>Sign up free</Link>
          </div>
        </div>
      </nav>

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

      {/* FOOTER */}
      <footer style={{ background: c.navy, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg, ${c.teal}, ${c.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: c.white }}>T</div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>tuterly</span>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2026 Tuterly by Bayside Academics</p>
        </div>
      </footer>
    </main>
  );
}

import Link from "next/link";
import { SEO_SUBURBS, isPublishable } from "@/lib/seo-suburbs";
import { SEO_TUTOR_SUBJECTS } from "@/lib/seo-tutor-subjects";
import { SITE_URL } from "@/lib/site";
import {
  c,
  MARKETING_FONTS_IMPORT,
} from "@/components/marketing/theme";
import Fade from "@/components/marketing/Fade";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const APPLY_HREF = "/tutors#apply";

export const metadata = {
  title: "Tutoring Jobs across Melbourne | Tuterly",
  description:
    "Tutoring jobs across Melbourne — set your own rate, keep what you earn, and use Tuterly's professional tools. Online or in-person, no agency markup.",
  alternates: { canonical: `${SITE_URL}/tutor-jobs` },
  openGraph: {
    title: "Tutoring Jobs across Melbourne | Tuterly",
    description:
      "Tutoring jobs across Melbourne — set your own rate, keep what you earn, and use Tuterly's professional tools. Online or in-person, no agency markup.",
    url: `${SITE_URL}/tutor-jobs`,
    type: "website",
  },
};

export default function TutorJobsDirectory() {
  const live = SEO_SUBURBS.filter(isPublishable);

  return (
    <main style={{ background: c.white, fontFamily: "'DM Sans', sans-serif", color: c.text }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />

      <MarketingNav />

      {/* HERO */}
      <section style={{ padding: "72px 24px 56px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Tutoring jobs across Melbourne</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>
              Tutoring jobs across Melbourne.
            </h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.7, marginBottom: 24 }}>
              Tuterly is a platform for independent tutors who&apos;d rather run their own practice than work as a contractor for an agency. You set your own rate, keep what you earn, and use our tooling — session reports, practice generators, parent comms — to look as organised as a top agency from day one.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href={APPLY_HREF} style={{ padding: "14px 28px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Start your application →
              </Link>
            </div>
          </Fade>
        </div>
      </section>

      {/* HIRING BY SUBJECT */}
      <section style={{ padding: "56px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>By subject</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 24, lineHeight: 1.25 }}>
              The subjects we&apos;re actively recruiting for.
            </h2>
            <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, listStyle: "none", padding: 0, margin: 0 }}>
              {SEO_TUTOR_SUBJECTS.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/tutor-jobs/${s.slug}`}
                    style={{ display: "block", padding: "18px 20px", borderRadius: 14, background: c.white, border: `1px solid ${c.border}`, textDecoration: "none" }}
                  >
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>{s.level} · {s.yearRange}</p>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 4 }}>{s.name}</p>
                    <p style={{ fontSize: 13, color: c.textLight }}>{s.typicalRate}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
      </section>

      {/* HIRING BY SUBURB */}
      <section style={{ padding: "56px 24px", background: c.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>By suburb</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 24, lineHeight: 1.25 }}>
              Suburbs we&apos;re actively building tutor supply in.
            </h2>
            {live.length === 0 ? (
              <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7 }}>
                More suburb-specific pages are on the way. In the meantime, any Melbourne tutor can{" "}
                <Link href={APPLY_HREF} style={{ color: c.teal, fontWeight: 600 }}>apply to tutor with Tuterly</Link>.
              </p>
            ) : (
              <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
                {live.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/tutor-jobs/${s.slug}`}
                      style={{ display: "block", padding: "14px 18px", borderRadius: 12, background: c.offWhite, border: `1px solid ${c.border}`, textDecoration: "none", color: c.navy, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15 }}
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

      {/* WHY TUTOR WITH TUTERLY — compact */}
      <section style={{ padding: "80px 24px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Why tutor with Tuterly</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: c.navy, marginBottom: 24, lineHeight: 1.25 }}>
              Earn more. Do less admin.
            </h2>
            <ul style={{ display: "grid", gap: 14, listStyle: "none", padding: 0, margin: 0 }}>
              {[
                ["Set your own rate", "You decide what you charge. Raise it when demand justifies it. No agency cap and no commission taken out."],
                ["Tools an agency would charge for", "Session reports, practice-worksheet generators, progress dashboards, and parent messaging — all built in."],
                ["Parents find you", "Sign-ups from the parent-facing directory funnel directly to tutors. You don't need to chase referrals or spend on ads."],
                ["On your terms", "Online or in-person. Whatever hours you want. No fixed weekly shifts, no minimum commitment."],
              ].map(([title, body]) => (
                <li key={title} style={{ display: "flex", gap: 14, alignItems: "start" }}>
                  <span style={{ color: c.teal, fontWeight: 700, fontSize: 18, marginTop: 1 }}>✓</span>
                  <div>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: c.navy, marginBottom: 4 }}>{title}</p>
                    <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.65 }}>{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
      </section>

      {/* GET STARTED CTA */}
      <section style={{ padding: "72px 24px", background: c.offWhite }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>
              Ready to start tutoring through Tuterly?
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 28 }}>
              Application takes about 10 minutes. We&apos;ll review your subjects, year levels, and a short writing sample, then onboard you to the platform.
            </p>
            <Link href={APPLY_HREF} style={{ display: "inline-block", padding: "14px 32px", borderRadius: 10, background: c.teal, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Start your application →
            </Link>
          </Fade>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}

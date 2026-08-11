import Link from "next/link";
import { createAdminClient } from "@/lib/supabase-admin";
import GetStartedChooser from "@/components/GetStartedChooser";

export const metadata = {
  title: "Get started",
  description:
    "Book a tutor, try the Tuterly software free, or get matched first. Session reports, progress tracking, and practice, all in one place.",
};

const c = {
  navy: "#0B1220", ink: "#0F172A", slate: "#334155", slateLight: "#64748B",
  muted: "#94A3B8", line: "#E6EAF0", white: "#FFFFFF", cool: "#F7F9FC",
  teal: "#0D9488", tealDeep: "#0F766E", tealBright: "#14B8A6", tealPale: "#ECFDFB",
  success: "#10B981",
};
const sans = "'Inter','Helvetica Neue',Arial,sans-serif";

export default async function GetStartedPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const purchased = sp.purchased === "1";
  const cancelled = sp.cancelled === "1";

  const admin = createAdminClient();
  const { data: packRows } = await admin
    .from("session_packs")
    .select("id, name, sessions, price, per_session")
    .eq("active", true)
    .order("sessions");
  const packs = packRows ?? [];

  return (
    <div style={{ fontFamily: sans, minHeight: "100vh", background: c.cool, color: c.slate }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'); *{box-sizing:border-box;margin:0;padding:0}`}</style>

      {/* header */}
      <header style={{ padding: "22px 32px", background: c.white, borderBottom: `1px solid ${c.line}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: c.navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: c.tealBright }}>t</div>
            <span style={{ fontSize: 20, fontWeight: 800, color: c.ink, letterSpacing: "-0.8px" }}>tuterly</span>
          </Link>
          <a href="https://app.tuterly.com.au" style={{ fontSize: 14, fontWeight: 600, color: c.slateLight, textDecoration: "none" }}>Log in</a>
        </div>
      </header>

      <main style={{ maxWidth: 940, margin: "0 auto", padding: "56px 24px 80px" }}>
        {purchased ? (
          <SuccessPanel />
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-1.2px", color: c.ink, lineHeight: 1.14, marginBottom: 12 }}>
                Get started with Tuterly
              </h1>
              <p style={{ fontSize: 16.5, color: c.slateLight, lineHeight: 1.65, maxWidth: 560, margin: "0 auto" }}>
                Book a tutor and see the reports for yourself, or try the software on its own. Pick what suits you, you can always change later.
              </p>
              {cancelled && (
                <p style={{ marginTop: 16, display: "inline-block", background: "#FEF3F2", color: "#B42318", borderRadius: 10, padding: "8px 14px", fontSize: 13.5, fontWeight: 500 }}>
                  No worries, your checkout was cancelled and you haven&apos;t been charged.
                </p>
              )}
            </div>
            <GetStartedChooser packs={packs} />
          </>
        )}
      </main>
    </div>
  );
}

function SuccessPanel() {
  return (
    <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center", background: "#fff", borderRadius: 20, border: `1px solid ${c.line}`, padding: "44px 36px" }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: c.tealPale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c.teal} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
      </div>
      <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.8px", color: c.ink, marginBottom: 12 }}>Payment received</h1>
      <p style={{ fontSize: 15.5, color: c.slateLight, lineHeight: 1.7, marginBottom: 24 }}>
        Your credits are ready. We&apos;ve emailed a <strong style={{ color: c.ink }}>secure sign-in link</strong> to the address you used: click it to sign in, add your child, and get matched with a tutor. No password needed.
      </p>
      <p style={{ fontSize: 13.5, color: c.muted }}>
        Didn&apos;t get it within a few minutes? Check your spam folder, or email{" "}
        <a href="mailto:admin@baysideacademics.com.au" style={{ color: c.tealDeep, fontWeight: 600 }}>admin@baysideacademics.com.au</a>.
      </p>
    </div>
  );
}

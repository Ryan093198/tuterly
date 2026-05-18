import Link from "next/link";
import { c } from "./theme";
import { APP_URL } from "@/lib/site";

const DIRECTORY_HREF = "/directory";

// Sticky top nav shared across the /tutoring marketing pages so the
// brand and primary navigation stay consistent with /parents and the
// other public-facing pages.
export default function MarketingNav() {
  return (
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
  );
}

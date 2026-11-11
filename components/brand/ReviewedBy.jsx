import Link from "next/link";
import { REVIEWER, isReviewed } from "@/lib/reviewed";

// One line under a page's heading saying who checked it (lib/reviewed.js).
export default function ReviewedBy({ path, style, className = "" }) {
  const base = { margin: "12px 0 0", fontSize: 14.5, fontWeight: 700, lineHeight: 1.5, color: "var(--muted, #64748b)", ...style };
  if (!isReviewed(path)) {
    return (
      <p className={className} style={base}>
        Built by the Bayside Academics team. Every answer is checked step by step.
      </p>
    );
  }
  return (
    <p className={className} style={base}>
      Checked by{" "}
      <Link href={REVIEWER.href} style={{ color: "var(--brand-text, #0e87a1)", textDecoration: "underline", textUnderlineOffset: 3 }}>
        {REVIEWER.name}
      </Link>
      , {REVIEWER.role}
    </p>
  );
}

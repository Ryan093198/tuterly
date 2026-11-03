import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

export const metadata = { title: "Unsubscribed | Tuterly", robots: { index: false, follow: false } };

export default async function UnsubscribedPage({ searchParams }) {
  const { error } = await searchParams;
  return (
    <div>
      <MarketingNav />
      <main style={{ maxWidth: 560, margin: "0 auto", padding: "72px 24px", textAlign: "center" }}>
        {error ? (
          <>
            <h1 style={{ fontSize: 30, marginBottom: 12 }}>That link didn&rsquo;t work</h1>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--muted)" }}>
              The unsubscribe link may be incomplete. Email learning@baysideacademics.com.au and we&rsquo;ll remove you straight away.
            </p>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: 30, marginBottom: 12 }}>You&rsquo;re unsubscribed</h1>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--muted)" }}>
              You won&rsquo;t get the weekly worksheet email or any other Tuterly emails at that address. The free worksheets are still here whenever you need them.
            </p>
          </>
        )}
        <p style={{ marginTop: 24 }}>
          <Link href="/worksheets" style={{ color: "var(--brand-text)", fontWeight: 700 }}>Free worksheets →</Link>
        </p>
      </main>
      <MarketingFooter />
    </div>
  );
}

import { Suspense } from "react";
import Link from "next/link";
import Auth from "@/components/Auth";
import Logo from "@/components/Logo";
import { SITE_URL } from "@/lib/site";

const TITLE = "Tuterly - Tutoring Reports & Practice for Melbourne";
const DESCRIPTION =
  "Tuterly turns tutoring into structured session reports, practice worksheets, and progress tracking. Built for families and tutors in Melbourne.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Organization schema for the homepage. Helps Google build a
// knowledge panel and ties the brand to Bayside Academics.
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tuterly",
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  description: DESCRIPTION,
  areaServed: { "@type": "Place", name: "Melbourne, Victoria, Australia" },
  parentOrganization: {
    "@type": "Organization",
    name: "Bayside Academics",
  },
};

export default async function Home({ searchParams }) {
  const sp = await searchParams;
  const inviter = sp?.inviter || null;
  const student = sp?.student || null;
  const role = sp?.role || null;
  const isInvite = !!inviter && !!student;

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-12 bg-gradient-to-b from-brand-pale via-surface-soft to-surface-soft">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
      />
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="flex flex-col items-center mb-8 text-center">
          <Logo size="lg" />
          <p className="mt-3 text-sm text-muted max-w-xs">
            Tutoring sessions tracked. Curriculum aligned reports prepared.
          </p>
        </div>

        {isInvite && (
          <div className="mb-4 rounded-2xl border border-brand/30 bg-brand-pale/60 px-5 py-4 text-center">
            <p className="text-sm text-brand-foreground">
              <span className="font-semibold">{inviter}</span> invited you to{" "}
              {role === "tutor" ? "tutor" : "view reports for"}{" "}
              <span className="font-semibold">{student}</span>.
            </p>
            <p className="text-xs text-brand-foreground/70 mt-1">
              Create an account below to accept.
            </p>
          </div>
        )}

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card shadow-xl shadow-black/5 p-6 sm:p-8">
          <Suspense fallback={null}>
            <Auth />
          </Suspense>
        </div>

        <p className="mt-6 text-xs text-center text-muted">
          By signing up you agree to our{" "}
          <Link href="/terms" className="text-brand hover:text-brand-dark underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-brand hover:text-brand-dark underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}

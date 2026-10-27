import { Suspense } from "react";
import Link from "next/link";
import Auth from "@/components/Auth";
import Logo from "@/components/Logo";
import { SITE_URL } from "@/lib/site";
import { headers } from "next/headers";
import StudyLanding from "@/components/study/StudyLanding";
import { STUDY_APP } from "@/lib/study-app";
import { getStudyFaqs } from "@/lib/study-faqs";

// "/" serves two surfaces (see proxy.js):
//   app.tuterly.com.au/      the sign-in card for existing Tuterly users
//                            (dashboards redirect here when signed out)
//   tuterly.com.au/          the Tuterly Study landing page
// Invite links (?inviter=&student=), ?next= redirects and ?login always
// get the sign-in card, on any host, so nothing that links here breaks.
// Localhost and Vercel previews show the landing page; add ?login to see
// the sign-in card there.

const APP_HOST = "app.tuterly.com.au";

const LOGIN_TITLE = "Tuterly - Tutoring Reports & Practice for Melbourne";
const LOGIN_DESCRIPTION =
  "Tuterly turns tutoring into structured session reports, practice worksheets, and progress tracking. Built for families and tutors in Melbourne.";

const HOME_TITLE = `${STUDY_APP.name}: fix the maths questions your child gets wrong`;
const HOME_DESCRIPTION = `${STUDY_APP.name} is an iPhone app for Years 7 to 10 maths. Snap a question your child got wrong, see the worked solution, then practise fresh versions until it's fixed. ${STUDY_APP.priceLine}.`;
const HOME_OG = "/og-tuterly-study.png";

async function showLoginCard(sp) {
  const h = await headers();
  const host = (h.get("host") || "").split(":")[0].toLowerCase();
  if (host === APP_HOST) return true;
  if (sp?.inviter && sp?.student) return true;
  return sp?.next !== undefined || sp?.login !== undefined;
}

export async function generateMetadata({ searchParams }) {
  const sp = await searchParams;
  if (await showLoginCard(sp)) {
    // Unchanged from the old sign-in home.
    return {
      title: LOGIN_TITLE,
      description: LOGIN_DESCRIPTION,
      alternates: { canonical: SITE_URL },
      openGraph: { title: LOGIN_TITLE, description: LOGIN_DESCRIPTION, url: SITE_URL, type: "website" },
      twitter: { card: "summary_large_image", title: LOGIN_TITLE, description: LOGIN_DESCRIPTION },
    };
  }
  return {
    title: { absolute: HOME_TITLE },
    description: HOME_DESCRIPTION,
    alternates: { canonical: SITE_URL },
    openGraph: {
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      url: SITE_URL,
      type: "website",
      images: [{ url: HOME_OG, width: 1200, height: 630, alt: `${STUDY_APP.name}: Years 7 to 10 maths` }],
    },
    twitter: {
      card: "summary_large_image",
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      images: [HOME_OG],
    },
  };
}

// Organization + SoftwareApplication + FAQPage. No offers or ratings until
// there are real ones.
function homeSchema() {
  const org = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Tuterly",
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    description: `Tuterly makes ${STUDY_APP.name}, an iPhone app for Years 7 to 10 maths, and free maths resources for Victorian families.`,
    areaServed: { "@type": "Place", name: "Melbourne, Victoria, Australia" },
    parentOrganization: { "@type": "Organization", name: "Bayside Academics", url: "https://baysideacademics.com.au" },
  };
  const app = {
    "@type": "SoftwareApplication",
    name: STUDY_APP.name,
    operatingSystem: "iOS",
    applicationCategory: "EducationalApplication",
    description: HOME_DESCRIPTION,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    audience: { "@type": "EducationalAudience", educationalRole: "student" },
    ...(STUDY_APP.appStoreUrl ? { installUrl: STUDY_APP.appStoreUrl } : {}),
  };
  const faq = {
    "@type": "FAQPage",
    mainEntity: getStudyFaqs().map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return { "@context": "https://schema.org", "@graph": [org, app, faq] };
}

// Organization schema for the sign-in view (unchanged from before).
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tuterly",
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  description: LOGIN_DESCRIPTION,
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

  if (!(await showLoginCard(sp))) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema()) }}
        />
        <StudyLanding />
      </>
    );
  }

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

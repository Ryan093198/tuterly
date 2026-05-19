import Link from "next/link";
import { SEO_SUBURBS, isPublishable } from "@/lib/seo-suburbs";
import { SEO_TUTOR_SUBJECTS } from "@/lib/seo-tutor-subjects";

// Internal navigation hub for ryanou - lists every public page on the
// site so they're easy to spot-check without remembering the URLs.
// noindex/nofollow + robots.txt disallow keep this out of Google.
// Not auth-gated, so don't treat it as private - it's just unlinked.

export const metadata = {
  title: "Page Directory | Tuterly (internal)",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const MAIN_MARKETING = [
  { path: "/", label: "Sign-in / home" },
  { path: "/parents", label: "For Parents (marketing)" },
  { path: "/tutors", label: "For Tutors (recruitment + apply form)" },
  { path: "/centres", label: "For Tutoring Centres" },
  { path: "/worksheets", label: "Free Worksheets" },
  { path: "/directory", label: "Parent-facing tutor directory" },
  { path: "/learn", label: "Learn (blog)" },
  { path: "/atar-planner", label: "ATAR Course Planner (tool)" },
  { path: "/privacy", label: "Privacy" },
  { path: "/terms", label: "Terms" },
];

const HUBS = [
  { path: "/tutoring", label: "Tutoring directory (parent-facing hub)" },
  { path: "/tutor-jobs", label: "Tutor-jobs directory (tutor-facing hub)" },
];

const PREP_PAGES = [
  { path: "/tutoring/selective-entry-exam-prep", label: "Selective Entry Exam Prep" },
  { path: "/tutoring/scholarship-exam-prep", label: "Scholarship Exam Prep" },
];

const SYSTEM = [
  { path: "/sitemap.xml", label: "Sitemap (XML)" },
  { path: "/robots.txt", label: "Robots.txt" },
];

export default function MainDirectory() {
  const publishable = SEO_SUBURBS.filter(isPublishable);
  const east = publishable.filter((s) => s.region === "east");
  const bayside = publishable.filter((s) => s.region === "bayside");

  const subjectJobs = SEO_TUTOR_SUBJECTS.map((s) => ({
    path: `/tutor-jobs/${s.slug}`,
    label: `${s.name} (${s.level}, ${s.yearRange})`,
  }));

  const total =
    MAIN_MARKETING.length +
    HUBS.length +
    PREP_PAGES.length +
    subjectJobs.length +
    publishable.length * 2 +
    SYSTEM.length;

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Page Directory</h1>
        <p className="text-sm text-muted">
          Every public page on tuterly.com.au. This page is unlinked and
          noindexed - bookmark the URL. {total} pages total.
        </p>
      </header>

      <SimpleSection title="Main marketing pages" entries={MAIN_MARKETING} />
      <SimpleSection title="SEO hubs" entries={HUBS} />
      <SimpleSection title="Exam prep landing pages" entries={PREP_PAGES} />
      <SimpleSection title="Tutor jobs by subject" entries={subjectJobs} />

      <SuburbSection
        title="Parent suburb pages - Eastern"
        suburbs={east}
        prefix="/tutoring/"
      />
      <SuburbSection
        title="Parent suburb pages - Bayside"
        suburbs={bayside}
        prefix="/tutoring/"
      />
      <SuburbSection
        title="Tutor-jobs suburb pages - Eastern"
        suburbs={east}
        prefix="/tutor-jobs/"
      />
      <SuburbSection
        title="Tutor-jobs suburb pages - Bayside"
        suburbs={bayside}
        prefix="/tutor-jobs/"
      />

      <SimpleSection title="System" entries={SYSTEM} />
    </main>
  );
}

function SimpleSection({ title, entries }) {
  return (
    <section>
      <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
        <span>{title}</span>
        <span className="text-xs text-muted font-normal">{entries.length}</span>
      </h2>
      <ul className="space-y-1.5 text-sm">
        {entries.map((e) => (
          <li key={e.path} className="flex flex-wrap items-baseline gap-x-3">
            <Link
              href={e.path}
              className="text-brand hover:underline font-mono"
            >
              {e.path}
            </Link>
            {e.label && <span className="text-muted text-xs">{e.label}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

function SuburbSection({ title, suburbs, prefix }) {
  return (
    <section>
      <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
        <span>{title}</span>
        <span className="text-xs text-muted font-normal">{suburbs.length}</span>
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 text-sm">
        {suburbs.map((s) => (
          <li key={s.slug}>
            <Link
              href={`${prefix}${s.slug}`}
              className="text-brand hover:underline"
            >
              {s.name}
            </Link>{" "}
            <span className="text-xs text-muted">T{s.tier}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

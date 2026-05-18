import { notFound } from "next/navigation";
import {
  SEO_SUBURBS,
  getSeoSuburb,
  isPublishable,
} from "@/lib/seo-suburbs";
import {
  SEO_TUTOR_SUBJECTS,
  getSeoTutorSubject,
} from "@/lib/seo-tutor-subjects";
import { SITE_URL } from "@/lib/site";
import TutorJobsSuburbPage from "@/components/marketing/TutorJobsSuburbPage";
import TutorJobsSubjectPage from "@/components/marketing/TutorJobsSubjectPage";

// Single dispatcher for /tutor-jobs/[slug] - same URL pattern handles
// both suburb landing pages (eg /tutor-jobs/glen-waverley) and subject
// landing pages (eg /tutor-jobs/vce-methods). Subject slugs take
// priority for collision-handling, though current data has none.

export function generateStaticParams() {
  return [
    ...SEO_SUBURBS.map((s) => ({ slug: s.slug })),
    ...SEO_TUTOR_SUBJECTS.map((s) => ({ slug: s.slug })),
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const subject = getSeoTutorSubject(slug);
  if (subject) {
    const title = `${subject.pageTitle} | Tuterly`;
    const description = `${subject.pageTitle} in Melbourne. Set your own rate, keep what you earn, and use Tuterly's tools to build a professional tutoring practice.`;
    const url = `${SITE_URL}/tutor-jobs/${slug}`;
    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: { title, description, url, type: "website" },
    };
  }
  const suburb = getSeoSuburb(slug);
  if (suburb) {
    const title = `Tutoring Jobs in ${suburb.name} | Tuterly`;
    const description = `Tutoring jobs in ${suburb.name}, Melbourne. Set your own rate, keep what you earn, and use Tuterly's tools to build a professional tutoring practice - online or in-person.`;
    const url = `${SITE_URL}/tutor-jobs/${slug}`;
    const robots = isPublishable(suburb)
      ? undefined
      : { index: false, follow: false };
    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: { title, description, url, type: "website" },
      ...(robots ? { robots } : {}),
    };
  }
  return {};
}

export default async function TutorJobsPage({ params }) {
  const { slug } = await params;
  const subject = getSeoTutorSubject(slug);
  if (subject) return <TutorJobsSubjectPage subject={subject} />;
  const suburb = getSeoSuburb(slug);
  if (suburb) return <TutorJobsSuburbPage suburb={suburb} />;
  notFound();
}

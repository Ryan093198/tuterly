// Subject/level tutor-recruitment landing pages, served alongside the
// suburb tutor pages from /tutor-jobs/[slug]. Tutors search for work
// by subject ("VCE Methods tutor jobs") far more than by suburb, so
// this is the higher-conversion side of the tutor SEO funnel.
//
// Tiering reflects supply-side priority:
//   Tier 1 - primary/secondary maths & English: easiest to recruit
//            for, largest demand pool, fits the platform's general-
//            subject reporting/practice tooling cleanly.
//   Tier 2 - VCE specialists: smaller candidate pool, higher rates,
//            harder to fill but very high parent demand.
//   Tier 3 - scholarship/selective: niche, hardest to source.

export const SEO_TUTOR_SUBJECTS = [
  // ---------- Tier 1 - primary/secondary core ----------
  {
    slug: "primary-maths",
    name: "Primary Maths",
    pageTitle: "Primary Maths Tutor Jobs",
    level: "Primary",
    yearRange: "Years 3-6",
    tier: 1,
    blurb:
      "Primary maths is the most reliable demand on Tuterly. Most families come to us when their child has fallen behind on fundamentals - times tables, fractions, place value, word problems - or when a strong student is bored at school pace and needs extension work.",
    demand:
      "Three main streams of demand: (1) Year 3-5 catch-up after the post-COVID gaps that schools still haven't closed, (2) extension and acceleration for kids coasting at school, and (3) Year 5-6 scholarship and selective entry preparation. If you're confident teaching the Australian Curriculum maths content for primary, there's steady weekly work here.",
    relatedSubjects: ["primary-english", "secondary-maths"],
  },
  {
    slug: "primary-english",
    name: "Primary English",
    pageTitle: "Primary English Tutor Jobs",
    level: "Primary",
    yearRange: "Years 3-6",
    tier: 1,
    blurb:
      "Primary English tutoring is in steady demand from parents whose kids are strong at maths but struggling with reading comprehension, writing structure, or vocabulary. Year 3 and Year 5 NAPLAN windows drive seasonal spikes.",
    demand:
      "Most primary English families come to us for (1) reading comprehension and inference (the section that drags NAPLAN scores down), (2) writing structure and grammar for kids whose ideas are good but whose sentences are weak, and (3) vocabulary expansion for selective entry / scholarship-bound students. Tutors with a primary teaching background or a strong English/humanities ATAR do well here.",
    relatedSubjects: ["primary-maths", "secondary-english"],
  },
  {
    slug: "secondary-maths",
    name: "Secondary Maths",
    pageTitle: "Secondary Maths Tutor Jobs (Years 7-10)",
    level: "Secondary",
    yearRange: "Years 7-10",
    tier: 1,
    blurb:
      "Year 7-10 maths is the hinge subject for most students - the year their VCE pathway is decided. Year 9 in particular drives a lot of tutoring demand from families worried about Methods readiness.",
    demand:
      "Year 7-8 work is mostly consolidation of algebra, geometry, and number skills. Year 9-10 is where families start preparing seriously for VCE: the algebraic manipulation, quadratics, trigonometry, and indices content that Methods builds on. Tutors who can hold a Year 9 student's attention and connect the curriculum to where it's going in VCE see strong demand.",
    relatedSubjects: ["primary-maths", "vce-methods", "secondary-english"],
  },
  {
    slug: "secondary-english",
    name: "Secondary English",
    pageTitle: "Secondary English Tutor Jobs (Years 7-10)",
    level: "Secondary",
    yearRange: "Years 7-10",
    tier: 1,
    blurb:
      "Secondary English tutoring focuses on the writing skills that determine VCE results: essay structure, textual analysis, and developing an argument. Families bring tutors in from Year 9 to get ahead of the Year 11-12 jump.",
    demand:
      "Year 7-8 students typically need work on reading comprehension, grammar, and structured writing. Year 9-10 demand is driven by analytical essay writing and the introduction of textual analysis - both are weak points in most school programs and a clear handover task for tutors. Tutors with strong VCE English / Literature backgrounds are highly sought-after.",
    relatedSubjects: ["primary-english", "vce-english", "secondary-maths"],
  },

  // ---------- Tier 2 - VCE specialists ----------
  {
    slug: "vce-methods",
    name: "VCE Methods",
    pageTitle: "VCE Methods Tutor Jobs",
    level: "VCE",
    yearRange: "Years 11-12",
    tier: 2,
    blurb:
      "VCE Methods is the single biggest VCE subject for tutoring - taken by most ATAR-conscious students and notorious for the gap between school teaching pace and what's actually needed for a 35+ study score. Demand is steady year-round and spikes in the lead-up to exams.",
    demand:
      "Most VCE Methods tutoring is split between (1) Unit 3-4 consolidation across functions, calculus, and probability, (2) exam technique - past paper drilling, time pressure, and the trick questions that show up year-on-year, and (3) SAC preparation. Tutors who scored 40+ in Methods and can articulate why they did are in high demand and command premium rates.",
    relatedSubjects: ["vce-specialist-maths", "secondary-maths"],
  },
  {
    slug: "vce-english",
    name: "VCE English",
    pageTitle: "VCE English Tutor Jobs",
    level: "VCE",
    yearRange: "Years 11-12",
    tier: 2,
    blurb:
      "VCE English is compulsory for every student in Victoria, which makes it the largest single tutor-demand subject on the platform. Families want help with the analytical essay, comparative essay, and language analysis sections - the three pieces that decide the study score.",
    demand:
      "Most VCE English tutoring is structural - students have ideas but need help organising them into the essay forms VCAA actually rewards. Demand peaks (1) at the start of Year 12 when the new texts hit, (2) before SACs, and (3) in the September-October exam run-up. Tutors with 40+ study scores in English / Literature / Language do well here.",
    relatedSubjects: ["vce-methods", "secondary-english"],
  },
  {
    slug: "vce-specialist-maths",
    name: "VCE Specialist Maths",
    pageTitle: "VCE Specialist Maths Tutor Jobs",
    level: "VCE",
    yearRange: "Years 11-12",
    tier: 2,
    blurb:
      "VCE Specialist Maths is a smaller subject but commands the highest tutoring rates on the platform. It's typically taken by students aiming for ATARs above 95 and the demand for tutors who actually understand the content at depth significantly outstrips supply.",
    demand:
      "Specialist Maths tutoring is almost entirely Unit 3-4 work: complex numbers, vectors, mechanics, differential equations, and proof. Students typically already do Methods and need help bridging from Methods-style problem-solving to the more abstract Specialist style. Tutors who scored 40+ in Specialist are rare and highly paid.",
    relatedSubjects: ["vce-methods", "secondary-maths"],
  },

  // ---------- Tier 3 - scholarship / selective ----------
  {
    slug: "scholarship-exam-prep",
    name: "Scholarship & Selective Entry Prep",
    pageTitle: "Scholarship & Selective Entry Tutor Jobs",
    level: "Selective / Scholarship",
    yearRange: "Years 5-8",
    tier: 3,
    blurb:
      "Scholarship and selective entry preparation is the highest-rate niche on Tuterly. Families preparing for EduTest, ACER, or the Victorian selective entry exams (John Monash Science, Nossal, MacRobertson, Suzanne Cory) spend more on tutoring than any other parent segment.",
    demand:
      "The work is split across (1) verbal reasoning and reading comprehension under time pressure, (2) numerical reasoning at Year 7-8 difficulty even when the student is in Year 5-6, (3) written expression - creative and persuasive - which is the section most students lose marks on, and (4) interview coaching for scholarship rounds. Tutors who've themselves done well at selective entry / scholarship exams are highly sought after.",
    relatedSubjects: ["primary-english", "secondary-maths"],
  },
];

const BY_SLUG = new Map(SEO_TUTOR_SUBJECTS.map((s) => [s.slug, s]));

export function getSeoTutorSubject(slug) {
  return BY_SLUG.get(slug) ?? null;
}

// Source of truth for the /tutoring/[suburb] SEO landing pages.
//
// Different concern from lib/suburbs.js — that module powers the
// in-app directory's location search across inner-southeast Melbourne.
// This one is the curated set we want Google to rank us for, organised
// as one entry per landing page.
//
// Each entry produces one statically-generated page. Fields:
//   - slug         (required): URL segment, kebab-case
//   - name         (required): display name
//   - tier         (optional): 1 / 2 / 3 — used for sitemap priority
//   - neighbouring (optional): slugs of nearby suburbs, surfaced as a
//                  "Also serving" link list for internal linking
//   - blurb        (optional): hero intro paragraph. Pattern is "Finding
//                  the right tutor in {suburb} shouldn't be hard…".
//                  Falls back to a generic template if missing.
//   - schools      (optional): [{ name, note }] rendered as an inline
//                  list ("School Name – note").
//   - parentNeeds  (optional): single-paragraph answer to "what parents
//                  in {suburb} typically need help with" — should reflect
//                  the real local tutoring focus (selective entry,
//                  particular VCE subjects, scholarship prep, etc.).
//
// IMPORTANT: thin/duplicate content gets penalised by Google. Don't
// publish a suburb page with empty `schools` AND empty `blurb` — the
// template will render either way, but a 20-page site of near-identical
// content will hurt the whole domain. `isPublishable` filters the
// sitemap so unfinished entries don't get submitted to Google.

export const SEO_SUBURBS = [
  // ---------- Tier 1 — highest tutoring demand ----------
  {
    slug: "glen-waverley",
    name: "Glen Waverley",
    tier: 1,
    neighbouring: ["mount-waverley", "wheelers-hill", "burwood"],
    blurb:
      "Finding the right tutor in Glen Waverley shouldn't be hard. Whether your child attends Glen Waverley Secondary College, Brentwood Secondary, or one of the nearby schools in Mount Waverley or Wheelers Hill, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Glen Waverley Secondary College",
        note: "large state secondary with strong VCE results in maths and sciences",
      },
      {
        name: "Brentwood Secondary College",
        note: "co-educational state school with an academic-extension focus",
      },
      {
        name: "Highvale Secondary College",
        note: "state secondary on the Mount Waverley / Glen Waverley fringe",
      },
      {
        name: "Wesley College (Glen Waverley campus)",
        note: "independent K-12 offering both IB and VCE pathways",
      },
    ],
    parentNeeds:
      "Most families in Glen Waverley come to us for selective entry exam preparation (John Monash Science, Nossal, MacRobertson) and VCE Methods, Specialist Maths, Chemistry and Physics. Some want ongoing weekly support from middle school, while others bring a tutor in just before specific exams or SACs.",
  },
  {
    slug: "mount-waverley",
    name: "Mount Waverley",
    tier: 1,
    neighbouring: ["glen-waverley", "wheelers-hill", "burwood"],
    blurb:
      "Finding the right tutor in Mount Waverley shouldn't be hard. Whether your child attends Mount Waverley Secondary College, Huntingtower School, or one of the nearby schools in Glen Waverley or Burwood, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Mount Waverley Secondary College",
        note: "sought-after state secondary with strong VCE outcomes",
      },
      {
        name: "Huntingtower School",
        note: "independent ELC-12 with consistently top-tier ATAR results",
      },
      {
        name: "Avila College",
        note: "Catholic girls' school, Years 7-12",
      },
      {
        name: "Mount Scopus Memorial College",
        note: "independent Jewish ELC-12 on the Burwood / Mount Waverley border",
      },
    ],
    parentNeeds:
      "Most families in Mount Waverley come to us for VCE preparation — Methods, Specialist Maths, Chemistry and Physics — and Year 9 selective entry exam practice. Some want ongoing weekly sessions across a term; others book intensively in the lead-up to assessments.",
  },
  {
    slug: "balwyn",
    name: "Balwyn",
    tier: 1,
    neighbouring: ["surrey-hills", "kew", "canterbury"],
    blurb:
      "Finding the right tutor in Balwyn shouldn't be hard. Whether your child attends Balwyn High School, Balwyn Primary, or one of the nearby schools in Kew or Canterbury, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Balwyn High School",
        note: "among Australia's strongest public schools by VCE median",
      },
      {
        name: "Balwyn Primary School",
        note: "feeder primary inside the Balwyn High zone",
      },
      {
        name: "Carey Baptist Grammar (Kew)",
        note: "nearby — independent co-ed with strong VCE and IB results",
      },
    ],
    parentNeeds:
      "Most families in Balwyn aren't looking to catch up — they're looking to keep pace with a fast-moving Balwyn High classroom. Some bring a tutor in for short-term help before scholarship or entry exams, while others use ongoing weekly sessions to consolidate.",
  },
  {
    slug: "box-hill",
    name: "Box Hill",
    tier: 1,
    neighbouring: ["blackburn", "surrey-hills", "doncaster"],
    blurb:
      "Finding the right tutor in Box Hill shouldn't be hard. Whether your child attends Box Hill High School, Kingswood College, or one of the nearby schools in Blackburn or Doncaster, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Box Hill High School",
        note: "runs the SEAL program for academically gifted students",
      },
      {
        name: "Kingswood College",
        note: "independent co-ed school",
      },
      {
        name: "Koonung Secondary College",
        note: "state co-ed secondary in the area",
      },
    ],
    parentNeeds:
      "Most families in Box Hill come to us for SEAL entry exam preparation (Year 5 through to Year 7 entry) and for ongoing support through Box Hill High's accelerated program. Reasoning, written expression and quick-paced maths practice are the typical focus areas.",
  },
  {
    slug: "camberwell",
    name: "Camberwell",
    tier: 1,
    neighbouring: ["hawthorn", "canterbury", "kew"],
    blurb:
      "Finding the right tutor in Camberwell shouldn't be hard. Whether your child attends Camberwell Grammar, MLC, Camberwell High, or one of the nearby schools in Kew or Hawthorn, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Camberwell Grammar School",
        note: "independent boys' school with a strong academic record",
      },
      {
        name: "Methodist Ladies' College (MLC)",
        note: "independent girls' school, VCE and IB pathways",
      },
      {
        name: "Presbyterian Ladies' College (PLC)",
        note: "independent girls' ELC-12",
      },
      {
        name: "Camberwell High School",
        note: "co-educational state secondary",
      },
    ],
    parentNeeds:
      "Most families in Camberwell come to us for IB Diploma or VCE preparation across the inner-east private schools, and for scholarship exam practice in the lead-up to Year 7 entry. Sessions often focus on the specific assessment styles set by individual schools.",
  },
  {
    slug: "kew",
    name: "Kew",
    tier: 1,
    neighbouring: ["hawthorn", "balwyn", "camberwell"],
    blurb:
      "Finding the right tutor in Kew shouldn't be hard. Whether your child attends Trinity Grammar, MLC, Carey Baptist, or one of the nearby schools in Hawthorn or Balwyn, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Trinity Grammar School",
        note: "independent boys' school, ELC-12",
      },
      {
        name: "Methodist Ladies' College (Kew)",
        note: "independent girls' school, VCE and IB pathways",
      },
      {
        name: "Carey Baptist Grammar School",
        note: "independent co-ed",
      },
      {
        name: "Genazzano FCJ College",
        note: "Catholic girls' school, ELC-12",
      },
      {
        name: "Xavier College",
        note: "Catholic boys' school, ELC-12",
      },
      {
        name: "Ruyton Girls' School",
        note: "independent girls' school",
      },
      {
        name: "Kew High School",
        note: "co-educational state secondary",
      },
    ],
    parentNeeds:
      "Most families in Kew come to us for IB Diploma or VCE preparation across the local private schools, or for Year 5-6 scholarship and entry exam tutoring. Many parents prefer in-person sessions because feedback on school-specific tasks is faster face-to-face.",
  },
  {
    slug: "doncaster",
    name: "Doncaster",
    tier: 1,
    neighbouring: ["doncaster-east", "templestowe", "box-hill"],
    blurb:
      "Finding the right tutor in Doncaster shouldn't be hard. Whether your child attends Doncaster Secondary College, East Doncaster Secondary, or one of the nearby schools in Templestowe or Box Hill, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Doncaster Secondary College",
        note: "co-educational state secondary",
      },
      {
        name: "East Doncaster Secondary College",
        note: "strong VCE outcomes, particularly in maths and sciences",
      },
      {
        name: "Carey Baptist Grammar (Donvale campus)",
        note: "nearby — independent co-ed",
      },
    ],
    parentNeeds:
      "Most families in Doncaster come to us for VCE preparation — Methods, Specialist Maths, Chemistry and Physics — through Units 3-4. Some bring a tutor in to help across the full year, others to consolidate before end-of-year exams and major SACs.",
  },

  // ---------- Tier 2 — strong catchments ----------
  {
    slug: "hawthorn",
    name: "Hawthorn",
    tier: 2,
    neighbouring: ["kew", "camberwell"],
    blurb:
      "Finding the right tutor in Hawthorn shouldn't be hard. Whether your child attends Scotch College, MLC, Auburn High, or one of the nearby schools in Kew or Camberwell, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Scotch College",
        note: "independent boys' school",
      },
      {
        name: "Methodist Ladies' College (Hawthorn)",
        note: "independent girls' school",
      },
      {
        name: "Auburn High School",
        note: "co-educational state secondary",
      },
    ],
    parentNeeds:
      "Most families in Hawthorn come to us for pacing support through IB or VCE, especially in specific maths or English subjects rather than full-course tutoring. Many parents bring a tutor in when their child needs a different explanation to what they're getting at school.",
  },
  {
    slug: "doncaster-east",
    name: "Doncaster East",
    tier: 2,
    neighbouring: ["doncaster", "templestowe", "blackburn"],
    blurb:
      "Finding the right tutor in Doncaster East shouldn't be hard. Whether your child attends East Doncaster Secondary, Templestowe College, or one of the nearby schools in Doncaster or Blackburn, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "East Doncaster Secondary College",
        note: "consistently strong VCE outcomes",
      },
      {
        name: "Templestowe College",
        note: "nearby — state co-ed secondary",
      },
    ],
    parentNeeds:
      "Most families in Doncaster East come to us for VCE Methods, Specialist Maths and English through Years 11-12. A lot of parents start tutoring in Year 10 and continue right through to ATAR — often keeping the same tutor across both years.",
  },
  {
    slug: "surrey-hills",
    name: "Surrey Hills",
    tier: 2,
    neighbouring: ["box-hill", "canterbury", "balwyn"],
    blurb:
      "Finding the right tutor in Surrey Hills shouldn't be hard. Whether your child attends Surrey Hills Primary, Chatham Primary, or one of the nearby schools in Box Hill or Balwyn, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Surrey Hills Primary School",
        note: "local state primary",
      },
      {
        name: "Chatham Primary School",
        note: "state primary in the area",
      },
      {
        name: "Strathcona Girls Grammar (Canterbury)",
        note: "nearby — independent girls' school",
      },
    ],
    parentNeeds:
      "Most families in Surrey Hills come to us for Year 4-6 scholarship and SEAL exam preparation, and for Year 7-9 maths and English foundations once children move into secondary school. Sessions often focus on test-style practice and written expression.",
  },
  {
    slug: "canterbury",
    name: "Canterbury",
    tier: 2,
    neighbouring: ["camberwell", "balwyn", "surrey-hills"],
    blurb:
      "Finding the right tutor in Canterbury shouldn't be hard. Whether your child attends Strathcona Girls Grammar, Camberwell High, or one of the nearby schools in Camberwell or Balwyn, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Strathcona Girls Grammar",
        note: "independent girls' school in Canterbury",
      },
      {
        name: "Camberwell Grammar School",
        note: "nearby — independent boys' school",
      },
      {
        name: "Camberwell High School",
        note: "co-educational state secondary",
      },
    ],
    parentNeeds:
      "Most families in Canterbury come to us for IB and VCE preparation across the local private schools, and for Year 5-6 scholarship and selective entry exam tutoring. Some want ongoing weekly sessions, others book intensively before specific assessments.",
  },
  {
    slug: "templestowe",
    name: "Templestowe",
    tier: 2,
    neighbouring: ["doncaster", "doncaster-east", "bulleen"],
    blurb:
      "Finding the right tutor in Templestowe shouldn't be hard. Whether your child attends Templestowe College, or one of the nearby schools in Doncaster East or Bulleen, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Templestowe College",
        note: "co-educational state secondary",
      },
      {
        name: "East Doncaster Secondary College",
        note: "nearby — strong VCE results, particularly in sciences",
      },
    ],
    parentNeeds:
      "Most families in Templestowe come to us for VCE preparation, particularly maths and sciences, and for primary numeracy and literacy support. Some prefer ongoing weekly sessions to build confidence; others want short-term help leading up to a specific test.",
  },
  {
    slug: "bulleen",
    name: "Bulleen",
    tier: 2,
    neighbouring: ["templestowe", "doncaster"],
    blurb:
      "Finding the right tutor in Bulleen shouldn't be hard. Whether your child attends Marcellin College, or one of the nearby schools in Templestowe or Doncaster, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Marcellin College",
        note: "Catholic boys' secondary in Bulleen",
      },
      {
        name: "Templestowe College",
        note: "nearby — state co-ed secondary",
      },
    ],
    parentNeeds:
      "Most families in Bulleen come to us for selective entry exam preparation and VCE Methods, Specialist Maths, Chemistry and Physics. Tutoring is often a weekly routine that runs across multiple years rather than a short-term fix.",
  },
  {
    slug: "wheelers-hill",
    name: "Wheelers Hill",
    tier: 2,
    neighbouring: ["glen-waverley", "mount-waverley"],
    blurb:
      "Finding the right tutor in Wheelers Hill shouldn't be hard. Whether your child attends Wheelers Hill Secondary College, John Monash Science School, or one of the nearby schools in Glen Waverley or Mount Waverley, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Wheelers Hill Secondary College",
        note: "co-educational state secondary",
      },
      {
        name: "John Monash Science School",
        note: "nearby — selective entry, Years 10-12, science and maths focus",
      },
    ],
    parentNeeds:
      "Most families in Wheelers Hill come to us for John Monash Science School entry preparation and Year 11-12 VCE maths and sciences. Many parents start exam prep two years before Year 9 entry — the application is competitive and well-practised.",
  },

  // ---------- Tier 3 — good demand, less SEO competition ----------
  {
    slug: "burwood",
    name: "Burwood",
    tier: 3,
    neighbouring: ["mount-waverley", "box-hill", "blackburn"],
    blurb:
      "Finding the right tutor in Burwood shouldn't be hard. Whether your child attends Mount Scopus Memorial College, Ashwood Secondary, or one of the nearby schools in Mount Waverley or Box Hill, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Mount Scopus Memorial College",
        note: "independent Jewish school, ELC-12",
      },
      {
        name: "Ashwood Secondary College",
        note: "co-educational state secondary",
      },
    ],
    parentNeeds:
      "Most families in Burwood come to us for VCE preparation, particularly maths and sciences, and for primary and middle-school numeracy and literacy support. Tutoring spans the full range of year levels here, with parents often booking siblings together.",
  },
  {
    slug: "vermont",
    name: "Vermont",
    tier: 3,
    neighbouring: ["mitcham", "forest-hill", "ringwood"],
    blurb:
      "Finding the right tutor in Vermont shouldn't be hard. Whether your child attends Vermont Secondary College, or one of the nearby schools in Mitcham, Forest Hill or Ringwood, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Vermont Secondary College",
        note: "strong VCE outcomes for a non-selective state school",
      },
      {
        name: "Whitefriars College (Donvale)",
        note: "nearby — Catholic boys' secondary",
      },
    ],
    parentNeeds:
      "Most families in Vermont come to us for VCE Methods, Specialist Maths and English, and for Year 9-10 academic extension work. Sessions are typically aligned with Vermont Secondary's term plan and SAC schedule.",
  },
  {
    slug: "blackburn",
    name: "Blackburn",
    tier: 3,
    neighbouring: ["box-hill", "forest-hill", "mitcham"],
    blurb:
      "Finding the right tutor in Blackburn shouldn't be hard. Whether your child attends Blackburn High School, or one of the nearby schools in Box Hill, Forest Hill or Mitcham, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Blackburn High School",
        note: "co-educational state secondary",
      },
      {
        name: "Whitefriars College (Donvale)",
        note: "nearby — Catholic boys' secondary",
      },
      {
        name: "Forest Hill College",
        note: "nearby — state co-ed secondary",
      },
    ],
    parentNeeds:
      "Most families in Blackburn come to us for Year 7-10 maths and English foundations, and for VCE Methods and English preparation. Some want ongoing weekly sessions through middle school; others need short-term help before assessments.",
  },
  {
    slug: "mitcham",
    name: "Mitcham",
    tier: 3,
    neighbouring: ["blackburn", "vermont", "ringwood"],
    blurb:
      "Finding the right tutor in Mitcham shouldn't be hard. Whether your child attends Mullauna College, or one of the nearby schools in Blackburn, Vermont or Ringwood, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Mullauna College",
        note: "state co-ed secondary in Mitcham",
      },
      {
        name: "Vermont Secondary College",
        note: "nearby — strong VCE outcomes",
      },
    ],
    parentNeeds:
      "Most families in Mitcham come to us for weekly maths and English support across primary and secondary, and for VCE preparation in Years 11-12. Ongoing support is more common here than spike-driven booking.",
  },
  {
    slug: "ringwood",
    name: "Ringwood",
    tier: 3,
    neighbouring: ["mitcham", "vermont"],
    blurb:
      "Finding the right tutor in Ringwood shouldn't be hard. Whether your child attends Ringwood Secondary, Aquinas College, or one of the nearby schools in Mitcham or Vermont, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Ringwood Secondary College",
        note: "co-educational state secondary",
      },
      {
        name: "Aquinas College",
        note: "Catholic co-ed secondary in Ringwood",
      },
      {
        name: "Tintern Grammar",
        note: "nearby — independent co-ed",
      },
    ],
    parentNeeds:
      "Most families in Ringwood come to us for primary numeracy and literacy, and for VCE preparation across maths, English and sciences. Some parents combine an in-person tutor for younger children with online help for VCE students.",
  },
  {
    slug: "forest-hill",
    name: "Forest Hill",
    tier: 3,
    neighbouring: ["blackburn", "vermont", "box-hill"],
    blurb:
      "Finding the right tutor in Forest Hill shouldn't be hard. Whether your child attends Forest Hill College, Vermont Secondary, or one of the nearby schools in Box Hill or Blackburn, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Forest Hill College",
        note: "state co-ed secondary",
      },
      {
        name: "Vermont Secondary College",
        note: "well-regarded for VCE outcomes",
      },
      {
        name: "Whitefriars College (Donvale)",
        note: "Catholic boys' secondary",
      },
      {
        name: "Box Hill High School",
        note: "nearby — strong academic program",
      },
      {
        name: "Blackburn High School",
        note: "nearby",
      },
    ],
    parentNeeds:
      "Most families in the area come to us for Year 7-10 maths and English support, or VCE preparation as exams approach. Some parents want ongoing weekly sessions to build confidence, while others need short-term help before a specific test or SAC.",
  },
];

const BY_SLUG = new Map(SEO_SUBURBS.map((s) => [s.slug, s]));

export function getSeoSuburb(slug) {
  return BY_SLUG.get(slug) ?? null;
}

// A suburb is "publishable" once it has at least a blurb or a school
// list — pages with neither are still routable but get excluded from
// the sitemap so they don't dilute the domain's quality signals.
export function isPublishable(suburb) {
  if (!suburb) return false;
  if (typeof suburb.blurb === "string" && suburb.blurb.trim().length > 0)
    return true;
  if (Array.isArray(suburb.schools) && suburb.schools.length > 0) return true;
  return false;
}

// Source of truth for the /tutoring/[suburb] SEO landing pages.
//
// Different concern from lib/suburbs.js - that module powers the
// in-app directory's location search across inner-southeast Melbourne.
// This one is the curated set we want Google to rank us for, organised
// as one entry per landing page.
//
// Each entry produces one statically-generated page. Fields:
//   - slug         (required): URL segment, kebab-case
//   - name         (required): display name
//   - tier         (optional): 1 / 2 / 3 - used for sitemap priority
//   - region       (optional): "east" | "bayside" - used to group the
//                  directory list and let visitors orient themselves
//                  by where they are in Melbourne
//   - neighbouring (optional): slugs of nearby suburbs, surfaced as a
//                  "Also serving" link list for internal linking
//   - blurb        (optional): hero intro paragraph. Pattern is "Finding
//                  the right tutor in {suburb} shouldn't be hard...".
//                  Falls back to a generic template if missing.
//   - schools      (optional): [{ name, note }] rendered as an inline
//                  list ("School Name - note").
//   - parentNeeds  (optional): single-paragraph answer to "what parents
//                  in {suburb} typically need help with". Should always
//                  lead with maths and English tutoring across all year
//                  levels (since that's the bulk of our actual demand),
//                  then mention any suburb-specific niches (selective
//                  entry, scholarship prep, particular schools, etc).
//
// IMPORTANT: thin/duplicate content gets penalised by Google. Don't
// publish a suburb page with empty `schools` AND empty `blurb` - the
// template will render either way, but a multi-page site of near-
// identical content will hurt the whole domain. `isPublishable`
// filters the sitemap so unfinished entries don't get submitted to
// Google.

export const SEO_SUBURBS = [
  // ===================================================================
  // EASTERN SUBURBS
  // ===================================================================

  // ---------- Tier 1 - highest tutoring demand ----------
  {
    slug: "glen-waverley",
    name: "Glen Waverley",
    tier: 1,
    region: "east",
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
      "Most families in Glen Waverley come to us for maths and English tutoring across all year levels - primary fundamentals, Year 7-10 foundations, and senior VCE Methods, Specialist Maths, and English. Selective entry exam preparation (John Monash Science, Nossal, MacRobertson) is a strong additional niche given the local demographic. Some families want ongoing weekly support; others bring a tutor in just before specific exams or SACs.",
  },
  {
    slug: "mount-waverley",
    name: "Mount Waverley",
    tier: 1,
    region: "east",
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
      "Most families in Mount Waverley come to us for maths and English tutoring across all year levels - primary, secondary, and senior VCE. Year 9 selective entry exam preparation is a popular secondary niche, and VCE Methods and sciences anchor the senior demand. Some want ongoing weekly sessions across a term; others book intensively in the lead-up to assessments.",
  },
  {
    slug: "balwyn",
    name: "Balwyn",
    tier: 1,
    region: "east",
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
        note: "nearby - independent co-ed with strong VCE and IB results",
      },
    ],
    parentNeeds:
      "Most families in Balwyn come to us for maths and English tutoring across all year levels - primary, secondary, and VCE. Balwyn High's fast-moving classroom drives a lot of the demand here, so most families aren't looking to catch up - they're looking to keep pace. Year 9-10 scholarship and entry-exam preparation is a strong secondary niche.",
  },
  {
    slug: "box-hill",
    name: "Box Hill",
    tier: 1,
    region: "east",
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
      "Most families in Box Hill come to us for maths and English tutoring across primary, secondary, and VCE. Box Hill High's SEAL program drives strong additional demand for Year 5-7 entry exam preparation, particularly reasoning, written expression, and quick-paced maths.",
  },
  {
    slug: "camberwell",
    name: "Camberwell",
    tier: 1,
    region: "east",
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
      "Most families in Camberwell come to us for maths and English tutoring across all year levels - primary, secondary, and senior VCE / IB. The dense cluster of independent schools (Camberwell Grammar, MLC, PLC) also drives scholarship and entry exam preparation in the Year 5-7 window. Sessions often focus on the specific assessment styles set by individual schools.",
  },
  {
    slug: "kew",
    name: "Kew",
    tier: 1,
    region: "east",
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
      "Most families in Kew come to us for maths and English tutoring across all year levels - primary, secondary, and senior VCE / IB. The local independent schools (Trinity, Carey, Genazzano, Xavier, MLC, Ruyton) also drive Year 5-6 scholarship and entry exam tutoring. Many parents prefer in-person sessions because feedback on school-specific tasks is faster face-to-face.",
  },
  {
    slug: "doncaster",
    name: "Doncaster",
    tier: 1,
    region: "east",
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
        note: "nearby - independent co-ed",
      },
    ],
    parentNeeds:
      "Most families in Doncaster come to us for maths and English tutoring across all year levels, with VCE preparation particularly strong here. Methods, Specialist Maths, Chemistry, and Physics through Units 3-4 are the most-requested senior subjects. Some bring a tutor in to help across the full year, others to consolidate before end-of-year exams and SACs.",
  },

  // ---------- Tier 2 - strong catchments ----------
  {
    slug: "hawthorn",
    name: "Hawthorn",
    tier: 2,
    region: "east",
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
      "Most families in Hawthorn come to us for maths and English tutoring across primary, secondary, and senior VCE / IB. Scotch College and MLC drive a lot of the demand - parents often bring tutors in to help with pacing rather than catch-up, and to support specific subjects rather than the full course load.",
  },
  {
    slug: "doncaster-east",
    name: "Doncaster East",
    tier: 2,
    region: "east",
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
        note: "nearby - state co-ed secondary",
      },
    ],
    parentNeeds:
      "Most families in Doncaster East come to us for maths and English tutoring across all year levels - from primary right through to VCE. East Doncaster Secondary's strong VCE outcomes drive a lot of Year 10-12 demand; a lot of families here start tutoring in Year 10 and continue through to ATAR.",
  },
  {
    slug: "surrey-hills",
    name: "Surrey Hills",
    tier: 2,
    region: "east",
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
        note: "nearby - independent girls' school",
      },
    ],
    parentNeeds:
      "Most families in Surrey Hills come to us for maths and English tutoring across primary and secondary. Year 4-6 scholarship and SEAL exam preparation is a strong additional niche given how many families are aiming at nearby selective programs. Year 7-10 foundations work picks up once kids move into secondary.",
  },
  {
    slug: "canterbury",
    name: "Canterbury",
    tier: 2,
    region: "east",
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
        note: "nearby - independent boys' school",
      },
      {
        name: "Camberwell High School",
        note: "co-educational state secondary",
      },
    ],
    parentNeeds:
      "Most families in Canterbury come to us for maths and English tutoring across all year levels - primary, secondary, and senior. The nearby independent schools (Strathcona, Camberwell Grammar) also drive Year 5-6 scholarship and selective entry exam preparation. Some families want ongoing weekly sessions, others book intensively before specific assessments.",
  },
  {
    slug: "templestowe",
    name: "Templestowe",
    tier: 2,
    region: "east",
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
        note: "nearby - strong VCE results, particularly in sciences",
      },
    ],
    parentNeeds:
      "Most families in Templestowe come to us for maths and English tutoring across all year levels. Primary numeracy and literacy is steady, and VCE preparation (particularly maths and sciences) picks up in Years 11-12. Some prefer ongoing weekly sessions to build confidence; others want short-term help leading up to a specific test.",
  },
  {
    slug: "bulleen",
    name: "Bulleen",
    tier: 2,
    region: "east",
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
        note: "nearby - state co-ed secondary",
      },
    ],
    parentNeeds:
      "Most families in Bulleen come to us for maths and English tutoring across all year levels - from primary through to senior VCE. Selective entry exam preparation is a strong additional niche given the local demographic. Tutoring here tends to be a weekly routine running across multiple years rather than a short-term fix.",
  },
  {
    slug: "wheelers-hill",
    name: "Wheelers Hill",
    tier: 2,
    region: "east",
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
        note: "nearby - selective entry, Years 10-12, science and maths focus",
      },
    ],
    parentNeeds:
      "Most families in Wheelers Hill come to us for maths and English tutoring across all year levels - from primary fundamentals right through to senior VCE Methods, Specialist Maths, and sciences. John Monash Science School entry preparation is a strong additional niche, with many parents starting prep two years before Year 9 entry.",
  },

  // ---------- Tier 3 - good demand, less SEO competition ----------
  {
    slug: "burwood",
    name: "Burwood",
    tier: 3,
    region: "east",
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
      "Most families in Burwood come to us for maths and English tutoring across all year levels. Primary and middle-school numeracy and literacy is a steady demand, and VCE preparation picks up in senior years. Parents often book siblings together - tutoring here spans the full range of year levels.",
  },
  {
    slug: "vermont",
    name: "Vermont",
    tier: 3,
    region: "east",
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
        note: "nearby - Catholic boys' secondary",
      },
    ],
    parentNeeds:
      "Most families in Vermont come to us for maths and English tutoring across primary, secondary, and senior VCE. Vermont Secondary's strong VCE outcomes shape a lot of the senior demand - Methods, Specialist Maths, and English are typical Year 11-12 focus areas. Year 9-10 academic extension is also common.",
  },
  {
    slug: "blackburn",
    name: "Blackburn",
    tier: 3,
    region: "east",
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
        note: "nearby - Catholic boys' secondary",
      },
      {
        name: "Forest Hill College",
        note: "nearby - state co-ed secondary",
      },
    ],
    parentNeeds:
      "Most families in Blackburn come to us for maths and English tutoring across all year levels, with Year 7-10 foundations and VCE preparation the strongest demand pools. Some want ongoing weekly sessions through middle school; others need short-term help before assessments.",
  },
  {
    slug: "mitcham",
    name: "Mitcham",
    tier: 3,
    region: "east",
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
        note: "nearby - strong VCE outcomes",
      },
    ],
    parentNeeds:
      "Most families in Mitcham come to us for maths and English tutoring across primary, secondary, and senior VCE. Weekly ongoing support is more common here than spike-driven booking - parents typically build tutoring into the family routine rather than turning to it only at exam time.",
  },
  {
    slug: "ringwood",
    name: "Ringwood",
    tier: 3,
    region: "east",
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
        note: "nearby - independent co-ed",
      },
    ],
    parentNeeds:
      "Most families in Ringwood come to us for maths and English tutoring across all year levels. Primary numeracy and literacy is steady, and VCE preparation across maths, English, and sciences picks up in senior years. Some parents combine an in-person tutor for younger children with online help for VCE students.",
  },
  {
    slug: "forest-hill",
    name: "Forest Hill",
    tier: 3,
    region: "east",
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
        note: "nearby - strong academic program",
      },
      {
        name: "Blackburn High School",
        note: "nearby",
      },
    ],
    parentNeeds:
      "Most families in Forest Hill come to us for maths and English tutoring across primary, secondary, and VCE. Year 7-10 foundations and VCE preparation are the strongest demand pools. Some parents want ongoing weekly sessions to build confidence, while others need short-term help before a specific test or SAC.",
  },

  // ===================================================================
  // BAYSIDE SUBURBS
  // ===================================================================

  // ---------- Tier 1 - highest tutoring demand ----------
  {
    slug: "brighton",
    name: "Brighton",
    tier: 1,
    region: "bayside",
    neighbouring: ["brighton-east", "hampton", "elsternwick"],
    blurb:
      "Finding the right tutor in Brighton shouldn't be hard. Whether your child attends Brighton Grammar, Firbank Grammar, St Leonard's College, or one of the nearby schools in Brighton East or Hampton, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Brighton Grammar School",
        note: "independent boys' school, ELC-12",
      },
      {
        name: "Firbank Grammar School",
        note: "independent girls' school, ELC-12",
      },
      {
        name: "St Leonard's College",
        note: "independent co-ed, ELC-12",
      },
      {
        name: "Brighton Secondary College",
        note: "co-educational state secondary",
      },
      {
        name: "Brighton Beach Primary School",
        note: "local state primary",
      },
    ],
    parentNeeds:
      "Most families in Brighton come to us for maths and English tutoring across all year levels - primary, secondary, and senior VCE. The local independent school cluster (Brighton Grammar, Firbank, St Leonard's) also drives scholarship and entry exam preparation in the Year 5-7 window. Some families want ongoing weekly sessions, others book intensively before specific assessments.",
  },
  {
    slug: "hampton",
    name: "Hampton",
    tier: 1,
    region: "bayside",
    neighbouring: ["brighton", "sandringham", "hampton-east"],
    blurb:
      "Finding the right tutor in Hampton shouldn't be hard. Whether your child attends Hampton Primary, Sandringham College, or one of the nearby schools in Brighton or Sandringham, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Hampton Primary School",
        note: "local state primary",
      },
      {
        name: "Sandringham College",
        note: "multi-campus state secondary",
      },
      {
        name: "Haileybury Newlands",
        note: "nearby - independent co-ed",
      },
    ],
    parentNeeds:
      "Most families in Hampton come to us for maths and English tutoring across all year levels - primary, secondary, and senior VCE. Primary fundamentals and Year 7-10 foundations are the steady demand; VCE preparation picks up in senior years. Some families combine in-person sessions with online for older students.",
  },
  {
    slug: "sandringham",
    name: "Sandringham",
    tier: 1,
    region: "bayside",
    neighbouring: ["hampton", "beaumaris", "black-rock"],
    blurb:
      "Finding the right tutor in Sandringham shouldn't be hard. Whether your child attends Sandringham Primary, Sandringham College, or one of the nearby schools in Hampton or Black Rock, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Sandringham College",
        note: "multi-campus state secondary",
      },
      {
        name: "Sandringham Primary School",
        note: "local state primary",
      },
      {
        name: "Sandringham East Primary School",
        note: "local state primary",
      },
    ],
    parentNeeds:
      "Most families in Sandringham come to us for maths and English tutoring across all year levels - primary, secondary, and senior VCE. Primary and middle-school numeracy and literacy is steady demand; VCE preparation picks up from Year 10 onwards.",
  },
  {
    slug: "beaumaris",
    name: "Beaumaris",
    tier: 1,
    region: "bayside",
    neighbouring: ["sandringham", "black-rock", "mentone"],
    blurb:
      "Finding the right tutor in Beaumaris shouldn't be hard. Whether your child attends Beaumaris Secondary, Beaumaris Primary, or one of the nearby schools in Sandringham or Mentone, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Beaumaris Secondary College",
        note: "newer state secondary with a growing academic reputation",
      },
      {
        name: "Beaumaris Primary School",
        note: "local state primary",
      },
      {
        name: "Beaumaris North Primary School",
        note: "local state primary",
      },
      {
        name: "Mentone Grammar",
        note: "nearby - independent co-ed",
      },
    ],
    parentNeeds:
      "Most families in Beaumaris come to us for maths and English tutoring across all year levels - primary, secondary, and VCE. Beaumaris Secondary's growing VCE reputation drives a lot of senior demand; primary and Year 7-10 work is also steady year-round.",
  },
  {
    slug: "bentleigh",
    name: "Bentleigh",
    tier: 1,
    region: "bayside",
    neighbouring: ["bentleigh-east", "mckinnon", "ormond"],
    blurb:
      "Finding the right tutor in Bentleigh shouldn't be hard. Whether your child attends Bentleigh Secondary, Coatesville Primary, McKinnon Secondary (nearby), or another local school, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Bentleigh Secondary College",
        note: "co-educational state secondary",
      },
      {
        name: "Coatesville Primary School",
        note: "local state primary",
      },
      {
        name: "Bentleigh West Primary School",
        note: "local state primary",
      },
      {
        name: "McKinnon Secondary College",
        note: "nearby - top-performing state secondary",
      },
    ],
    parentNeeds:
      "Most families in Bentleigh come to us for maths and English tutoring across all year levels - primary, secondary, and VCE. McKinnon Secondary zone proximity drives a lot of the secondary demand, and primary foundations work is steady year-round.",
  },
  {
    slug: "mckinnon",
    name: "McKinnon",
    tier: 1,
    region: "bayside",
    neighbouring: ["bentleigh", "ormond", "caulfield-north"],
    blurb:
      "Finding the right tutor in McKinnon shouldn't be hard. Whether your child attends McKinnon Secondary College, McKinnon Primary, or one of the nearby schools in Bentleigh or Ormond, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "McKinnon Secondary College",
        note: "consistently one of Victoria's top-performing public secondaries",
      },
      {
        name: "McKinnon Primary School",
        note: "feeder primary inside the McKinnon Secondary zone",
      },
    ],
    parentNeeds:
      "Most families in McKinnon come to us for maths and English tutoring across all year levels - primary through to VCE. McKinnon Secondary's competitive academic environment drives a lot of the demand - most families aren't looking to catch up, they're looking to keep pace. Year 9-10 scholarship and selective entry exam preparation is also common.",
  },

  // ---------- Tier 2 - strong catchments ----------
  {
    slug: "black-rock",
    name: "Black Rock",
    tier: 2,
    region: "bayside",
    neighbouring: ["sandringham", "beaumaris", "cheltenham"],
    blurb:
      "Finding the right tutor in Black Rock shouldn't be hard. Whether your child attends Black Rock Primary, Sandringham College, or one of the local schools in Beaumaris or Sandringham, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Black Rock Primary School",
        note: "local state primary",
      },
      {
        name: "Sandringham College",
        note: "nearby - multi-campus state secondary",
      },
      {
        name: "Mentone Grammar",
        note: "nearby - independent co-ed",
      },
    ],
    parentNeeds:
      "Most families in Black Rock come to us for maths and English tutoring across all year levels - primary, secondary, and senior VCE. Primary numeracy and literacy is the steady demand here, and VCE preparation picks up in senior years.",
  },
  {
    slug: "brighton-east",
    name: "Brighton East",
    tier: 2,
    region: "bayside",
    neighbouring: ["brighton", "hampton-east", "bentleigh"],
    blurb:
      "Finding the right tutor in Brighton East shouldn't be hard. Whether your child attends Haileybury, St Leonard's College (nearby), Brighton Secondary, or one of the local schools in Brighton or Bentleigh, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Haileybury (Castlefield campus)",
        note: "independent co-ed",
      },
      {
        name: "St Leonard's College",
        note: "nearby - independent co-ed in Brighton",
      },
      {
        name: "Brighton Secondary College",
        note: "co-educational state secondary nearby",
      },
      {
        name: "Brighton Beach Primary School",
        note: "local state primary nearby",
      },
    ],
    parentNeeds:
      "Most families in Brighton East come to us for maths and English tutoring across all year levels - primary, secondary, and VCE. The mix of independent and state schools in the area drives a wide range of demand; scholarship and entry exam preparation in the Year 5-7 window is a notable secondary niche.",
  },
  {
    slug: "hampton-east",
    name: "Hampton East",
    tier: 2,
    region: "bayside",
    neighbouring: ["hampton", "bentleigh", "brighton-east"],
    blurb:
      "Finding the right tutor in Hampton East shouldn't be hard. Whether your child attends Sandringham College, Bentleigh Secondary (nearby), or one of the local primary schools, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Sandringham College",
        note: "multi-campus state secondary",
      },
      {
        name: "Bentleigh Secondary College",
        note: "nearby - state secondary",
      },
      {
        name: "Moorabbin Primary School",
        note: "nearby - local state primary",
      },
    ],
    parentNeeds:
      "Most families in Hampton East come to us for maths and English tutoring across all year levels - primary, secondary, and VCE. Primary and middle-school foundations work is steady demand; VCE preparation builds through senior years.",
  },
  {
    slug: "mentone",
    name: "Mentone",
    tier: 2,
    region: "bayside",
    neighbouring: ["beaumaris", "cheltenham", "black-rock"],
    blurb:
      "Finding the right tutor in Mentone shouldn't be hard. Whether your child attends Mentone Grammar, St Bede's, Kilbreda, or one of the nearby schools in Beaumaris or Cheltenham, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Mentone Grammar",
        note: "independent co-ed, ELC-12",
      },
      {
        name: "St Bede's College",
        note: "Catholic boys' secondary",
      },
      {
        name: "Kilbreda College",
        note: "Catholic girls' secondary",
      },
      {
        name: "Mentone Girls' Grammar",
        note: "independent girls' school",
      },
      {
        name: "Mentone Girls' Secondary College",
        note: "state girls' secondary",
      },
    ],
    parentNeeds:
      "Most families in Mentone come to us for maths and English tutoring across all year levels - primary, secondary, and VCE. The cluster of independent and Catholic schools (Mentone Grammar, St Bede's, Kilbreda) drives senior-school demand; primary foundations work is also steady.",
  },
  {
    slug: "bentleigh-east",
    name: "Bentleigh East",
    tier: 2,
    region: "bayside",
    neighbouring: ["bentleigh", "mckinnon", "ormond"],
    blurb:
      "Finding the right tutor in Bentleigh East shouldn't be hard. Whether your child attends Coatesville Primary, McKinnon Secondary (nearby), or one of the local schools in Bentleigh or Ormond, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Coatesville Primary School",
        note: "local state primary",
      },
      {
        name: "McKinnon Secondary College",
        note: "nearby - top-performing state secondary",
      },
      {
        name: "Bentleigh Secondary College",
        note: "nearby - state secondary",
      },
    ],
    parentNeeds:
      "Most families in Bentleigh East come to us for maths and English tutoring across all year levels - primary, secondary, and VCE. McKinnon Secondary zone proximity drives a lot of the secondary demand; primary fundamentals and Year 7-10 foundations work is steady.",
  },
  {
    slug: "elsternwick",
    name: "Elsternwick",
    tier: 2,
    region: "bayside",
    neighbouring: ["brighton", "caulfield-north", "ormond"],
    blurb:
      "Finding the right tutor in Elsternwick shouldn't be hard. Whether your child attends Caulfield Grammar, Shelford Girls' Grammar, Wesley College (nearby), or one of the local schools in Brighton or Caulfield North, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Caulfield Grammar School",
        note: "independent co-ed, ELC-12 (Caulfield campus nearby)",
      },
      {
        name: "Shelford Girls' Grammar",
        note: "independent girls' school, ELC-12",
      },
      {
        name: "Wesley College",
        note: "nearby - independent co-ed",
      },
      {
        name: "Elsternwick Primary School",
        note: "local state primary",
      },
    ],
    parentNeeds:
      "Most families in Elsternwick come to us for maths and English tutoring across all year levels - primary, secondary, and senior VCE / IB. The local independent school cluster (Caulfield Grammar, Shelford, Wesley) drives scholarship and entry exam preparation in the Year 5-7 window.",
  },

  // ---------- Tier 3 - good demand, less SEO competition ----------
  {
    slug: "caulfield-north",
    name: "Caulfield North",
    tier: 3,
    region: "bayside",
    neighbouring: ["elsternwick", "ormond", "mckinnon"],
    blurb:
      "Finding the right tutor in Caulfield North shouldn't be hard. Whether your child attends Caulfield Grammar, or one of the nearby schools in Elsternwick or Ormond, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Caulfield Grammar School",
        note: "independent co-ed, ELC-12",
      },
      {
        name: "Caulfield Junior College",
        note: "local state primary",
      },
    ],
    parentNeeds:
      "Most families in Caulfield North come to us for maths and English tutoring across all year levels. Primary and Year 7-10 foundations work is steady; VCE preparation picks up in senior years.",
  },
  {
    slug: "cheltenham",
    name: "Cheltenham",
    tier: 3,
    region: "bayside",
    neighbouring: ["mentone", "black-rock", "beaumaris"],
    blurb:
      "Finding the right tutor in Cheltenham shouldn't be hard. Whether your child attends Cheltenham Secondary, Le Page Primary, or one of the nearby schools in Mentone or Black Rock, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "Cheltenham Secondary College",
        note: "co-educational state secondary",
      },
      {
        name: "Le Page Primary School",
        note: "local state primary",
      },
      {
        name: "Mentone Grammar",
        note: "nearby - independent co-ed",
      },
    ],
    parentNeeds:
      "Most families in Cheltenham come to us for maths and English tutoring across all year levels - primary, secondary, and VCE. Primary numeracy and literacy is steady demand here; secondary maths and English picks up through Year 7-10.",
  },
  {
    slug: "ormond",
    name: "Ormond",
    tier: 3,
    region: "bayside",
    neighbouring: ["mckinnon", "bentleigh", "caulfield-north"],
    blurb:
      "Finding the right tutor in Ormond shouldn't be hard. Whether your child attends McKinnon Secondary, Glen Eira College, or one of the nearby schools in Bentleigh or McKinnon, Tuterly connects you with experienced tutors who know the curriculum and deliver results you can actually see.",
    schools: [
      {
        name: "McKinnon Secondary College",
        note: "top-performing state secondary, very competitive",
      },
      {
        name: "Glen Eira College",
        note: "co-educational state secondary",
      },
      {
        name: "Ormond Primary School",
        note: "local state primary",
      },
    ],
    parentNeeds:
      "Most families in Ormond come to us for maths and English tutoring across all year levels. McKinnon Secondary zone proximity drives a lot of the secondary demand; primary foundations work is steady year-round.",
  },
];

const BY_SLUG = new Map(SEO_SUBURBS.map((s) => [s.slug, s]));

export function getSeoSuburb(slug) {
  return BY_SLUG.get(slug) ?? null;
}

// A suburb is "publishable" once it has at least a blurb or a school
// list - pages with neither are still routable but get excluded from
// the sitemap so they don't dilute the domain's quality signals.
export function isPublishable(suburb) {
  if (!suburb) return false;
  if (typeof suburb.blurb === "string" && suburb.blurb.trim().length > 0)
    return true;
  if (Array.isArray(suburb.schools) && suburb.schools.length > 0) return true;
  return false;
}

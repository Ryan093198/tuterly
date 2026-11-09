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
//   - region       (optional): "east" | "bayside" | "south-east" | "west" | "north" - used to group the
//                  directory list and let visitors orient themselves
//                  by where they are in Melbourne
//   - neighbouring (optional): slugs of nearby suburbs, surfaced as a
//                  "Also serving" link list for internal linking
//   - blurb        (optional): hero intro paragraph. Pattern is "Looking
//                  for tutoring in {suburb}? Whether your child attends
//                  {local schools}, ... For Years 7 to 10, Tuterly ...".
//                  Since Oct 2026 the tutor marketplace is paused and these
//                  pages sell the Tuterly app only: never say Tuterly
//                  connects families with tutors. Falls back to a generic
//                  template if missing.
//   - schools      (optional): [{ name, note }] rendered as an inline
//                  list ("School Name - note").
//   - parentNeeds  (optional): single-paragraph answer to "what parents
//                  in {suburb} typically need help with". Leads with what
//                  local families look for (maths and English, all year
//                  levels), any suburb-specific niches (selective entry,
//                  scholarship prep, particular schools), then one honest
//                  sentence on where Tuterly fits: Years 7 to 10
//                  maths only, never VCE, English or primary.
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
      "Looking for tutoring in Glen Waverley? Whether your child attends Glen Waverley Secondary College, Brentwood Secondary, or one of the nearby schools in Mount Waverley or Wheelers Hill, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
      "Most families in Glen Waverley look for maths and English help across every year level: primary fundamentals, Years 7 to 10 foundations, and senior VCE Methods, Specialist Maths and English. Selective entry preparation (John Monash Science, Nossal, MacRobertson) is a strong extra niche. Some families want a tutor every week; others only before a big test or SAC. Tuterly doesn't teach VCE, but Year 9 and 10 maths is what Methods and Specialist build on, and that's the part it covers.",
  },
  {
    slug: "mount-waverley",
    name: "Mount Waverley",
    tier: 1,
    region: "east",
    neighbouring: ["glen-waverley", "wheelers-hill", "burwood"],
    blurb:
      "Looking for tutoring in Mount Waverley? Whether your child attends Mount Waverley Secondary College, Huntingtower School, or one of the nearby schools in Glen Waverley or Burwood, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
      "Most families in Mount Waverley look for maths and English help across primary, secondary and senior VCE. Selective entry preparation (sat in Year 8, for Year 9 entry) is a popular secondary niche, and VCE Methods and the sciences anchor the senior years. Some want weekly sessions across a term; others want help in the lead-up to assessments. Selective entry tests are sat in Year 8. Tuterly covers the Years 7 and 8 school maths underneath them, not the test's reasoning or writing sections.",
  },
  {
    slug: "balwyn",
    name: "Balwyn",
    tier: 1,
    region: "east",
    neighbouring: ["surrey-hills", "kew", "canterbury"],
    blurb:
      "Looking for tutoring in Balwyn? Whether your child attends Balwyn High School, Balwyn Primary, or one of the nearby schools in Kew or Canterbury, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
        note: "nearby, independent co-ed with strong VCE and IB results",
      },
    ],
    parentNeeds:
      "Most families in Balwyn look for maths and English help across primary, secondary and VCE. Balwyn High’s fast-moving classroom drives a lot of it, so most families aren’t trying to catch up, they’re trying to keep pace. Scholarship and entry exam preparation is a strong extra niche. For keeping pace in Years 7 to 10 maths, practising the questions they got wrong in class, straight after the lesson, is exactly what Tuterly is for.",
  },
  {
    slug: "box-hill",
    name: "Box Hill",
    tier: 1,
    region: "east",
    neighbouring: ["blackburn", "surrey-hills", "doncaster"],
    blurb:
      "Looking for tutoring in Box Hill? Whether your child attends Box Hill High School, Kingswood College, or one of the nearby schools in Blackburn or Doncaster, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
      "Most families in Box Hill look for maths and English help across primary, secondary and VCE. Box Hill High’s SEAL program also drives demand for entry exam preparation in Years 5 to 7, particularly reasoning, written expression and quick-paced maths. Tuterly starts at Year 7, so it helps once they reach secondary school, not in primary. Once they’re in Year 7, it turns every maths question they get wrong into practice.",
  },
  {
    slug: "camberwell",
    name: "Camberwell",
    tier: 1,
    region: "east",
    neighbouring: ["hawthorn", "canterbury", "kew"],
    blurb:
      "Looking for tutoring in Camberwell? Whether your child attends Camberwell Grammar, MLC, Camberwell High, or one of the nearby schools in Kew or Hawthorn, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
      "Most families in Camberwell look for maths and English help across primary, secondary and senior VCE or IB. The cluster of independent schools (Camberwell Grammar, MLC, PLC) also drives scholarship and entry exam preparation in Years 5 to 7, and a lot of help focuses on how each school sets its assessments. In Tuterly, your child can upload their school’s actual maths tests, so their practice comes from what their own teacher set.",
  },
  {
    slug: "kew",
    name: "Kew",
    tier: 1,
    region: "east",
    neighbouring: ["hawthorn", "balwyn", "camberwell"],
    blurb:
      "Looking for tutoring in Kew? Whether your child attends Trinity Grammar, MLC, Carey Baptist, or one of the nearby schools in Hawthorn or Balwyn, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
      "Most families in Kew look for maths and English help across primary, secondary and senior VCE or IB. The local independent schools (Trinity, Carey, Genazzano, Xavier, MLC, Ruyton) also drive Year 5 and 6 scholarship and entry exam preparation. Many parents like in-person sessions for feedback on school-specific tasks. For Years 7 to 10 maths, Tuterly works on the questions from those tasks: snap the ones they got wrong, or upload the whole test.",
  },
  {
    slug: "doncaster",
    name: "Doncaster",
    tier: 1,
    region: "east",
    neighbouring: ["doncaster-east", "templestowe", "box-hill"],
    blurb:
      "Looking for tutoring in Doncaster? Whether your child attends Doncaster Secondary College, East Doncaster Secondary, or one of the nearby schools in Templestowe or Box Hill, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
        note: "nearby, independent co-ed",
      },
    ],
    parentNeeds:
      "Most families in Doncaster look for maths and English help across every year level, with VCE especially strong: Methods, Specialist Maths, Chemistry and Physics through Units 3 and 4. Some keep a tutor for the whole year; others only before end-of-year exams and SACs. Tuterly doesn't teach VCE, but Year 9 and 10 maths is what Methods and Specialist build on, and that's the part it covers.",
  },

  // ---------- Tier 2 - strong catchments ----------
  {
    slug: "hawthorn",
    name: "Hawthorn",
    tier: 2,
    region: "east",
    neighbouring: ["kew", "camberwell"],
    blurb:
      "Looking for tutoring in Hawthorn? Whether your child attends Scotch College, MLC, Auburn High, or one of the nearby schools in Kew or Camberwell, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
      "Most families in Hawthorn look for maths and English help across primary, secondary and senior VCE or IB. Scotch College and MLC drive a lot of it, and parents often want help with pacing rather than catching up, in one subject rather than the full load. If that subject is Years 7 to 10 maths, Tuterly gives your child practice on exactly the questions they’re getting wrong.",
  },
  {
    slug: "doncaster-east",
    name: "Doncaster East",
    tier: 2,
    region: "east",
    neighbouring: ["doncaster", "templestowe", "blackburn"],
    blurb:
      "Looking for tutoring in Doncaster East? Whether your child attends East Doncaster Secondary, Templestowe College, or one of the nearby schools in Doncaster or Blackburn, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      {
        name: "East Doncaster Secondary College",
        note: "consistently strong VCE outcomes",
      },
      {
        name: "Templestowe College",
        note: "nearby, state co-ed secondary",
      },
    ],
    parentNeeds:
      "Most families in Doncaster East look for maths and English help from primary right through to VCE. East Doncaster Secondary’s strong VCE results drive a lot of Year 10 to 12 demand, and many families start in Year 10 and continue to ATAR. Tuterly doesn't teach VCE, but Year 9 and 10 maths is what Methods and Specialist build on, and that's the part it covers.",
  },
  {
    slug: "surrey-hills",
    name: "Surrey Hills",
    tier: 2,
    region: "east",
    neighbouring: ["box-hill", "canterbury", "balwyn"],
    blurb:
      "Looking for tutoring in Surrey Hills? Whether your child attends Surrey Hills Primary, Chatham Primary, or one of the nearby schools in Box Hill or Balwyn, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
        note: "nearby, independent girls' school",
      },
    ],
    parentNeeds:
      "Most families in Surrey Hills look for maths and English help across primary and secondary. Scholarship and SEAL preparation in Years 4 to 6 is a strong extra niche, given how many families aim at nearby selective programs, and Years 7 to 10 foundations pick up once kids start secondary. That secondary maths is where Tuterly comes in.",
  },
  {
    slug: "canterbury",
    name: "Canterbury",
    tier: 2,
    region: "east",
    neighbouring: ["camberwell", "balwyn", "surrey-hills"],
    blurb:
      "Looking for tutoring in Canterbury? Whether your child attends Strathcona Girls Grammar, Camberwell High, or one of the nearby schools in Camberwell or Balwyn, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      {
        name: "Strathcona Girls Grammar",
        note: "independent girls' school in Canterbury",
      },
      {
        name: "Camberwell Grammar School",
        note: "nearby, independent boys' school",
      },
      {
        name: "Camberwell High School",
        note: "co-educational state secondary",
      },
    ],
    parentNeeds:
      "Most families in Canterbury look for maths and English help across primary, secondary and the senior years. The nearby independent schools (Strathcona, Camberwell Grammar) also drive Year 5 and 6 scholarship and selective entry preparation. Some families want weekly sessions; others only before specific assessments. Before a maths test in Years 7 to 10, Topic check in Tuterly gives a short practice test on that topic.",
  },
  {
    slug: "templestowe",
    name: "Templestowe",
    tier: 2,
    region: "east",
    neighbouring: ["doncaster", "doncaster-east", "bulleen"],
    blurb:
      "Looking for tutoring in Templestowe? Whether your child attends Templestowe College, or one of the nearby schools in Doncaster East or Bulleen, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      {
        name: "Templestowe College",
        note: "co-educational state secondary",
      },
      {
        name: "East Doncaster Secondary College",
        note: "nearby, strong VCE results, particularly in sciences",
      },
    ],
    parentNeeds:
      "Most families in Templestowe look for maths and English help across every year level. Primary numeracy and literacy is steady, and VCE (particularly maths and the sciences) picks up in Years 11 and 12. Some want weekly sessions to build confidence; others want short-term help before a test. For a Years 7 to 10 maths test, Tuterly has a test countdown and a short test on any topic.",
  },
  {
    slug: "bulleen",
    name: "Bulleen",
    tier: 2,
    region: "east",
    neighbouring: ["templestowe", "doncaster"],
    blurb:
      "Looking for tutoring in Bulleen? Whether your child attends Marcellin College, or one of the nearby schools in Templestowe or Doncaster, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      {
        name: "Marcellin College",
        note: "Catholic boys' secondary in Bulleen",
      },
      {
        name: "Templestowe College",
        note: "nearby, state co-ed secondary",
      },
    ],
    parentNeeds:
      "Most families in Bulleen look for maths and English help from primary through to senior VCE, and selective entry preparation is a strong extra niche. Help here tends to be a weekly routine over several years rather than a short-term fix. For the Years 7 to 10 maths part of that routine, Tuterly keeps a bank of every question they’ve got wrong, by topic, until each one is mastered.",
  },
  {
    slug: "wheelers-hill",
    name: "Wheelers Hill",
    tier: 2,
    region: "east",
    neighbouring: ["glen-waverley", "mount-waverley"],
    blurb:
      "Looking for tutoring in Wheelers Hill? Whether your child attends Wheelers Hill Secondary College, John Monash Science School, or one of the nearby schools in Glen Waverley or Mount Waverley, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      {
        name: "Wheelers Hill Secondary College",
        note: "co-educational state secondary",
      },
      {
        name: "John Monash Science School",
        note: "nearby, selective entry, Years 10-12, science and maths focus",
      },
    ],
    parentNeeds:
      "Most families in Wheelers Hill look for maths and English help from primary fundamentals through to VCE Methods, Specialist Maths and the sciences. John Monash Science School entry preparation is a strong extra niche, with many parents starting a couple of years ahead. Whichever path they take, solid Years 7 to 10 maths sits underneath it, and that’s the part Tuterly covers.",
  },

  // ---------- Tier 3 - good demand, less SEO competition ----------
  {
    slug: "burwood",
    name: "Burwood",
    tier: 3,
    region: "east",
    neighbouring: ["mount-waverley", "box-hill", "blackburn"],
    blurb:
      "Looking for tutoring in Burwood? Whether your child attends Mount Scopus Memorial College, Ashwood Secondary, or one of the nearby schools in Mount Waverley or Box Hill, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
      "Most families in Burwood look for maths and English help across every year level. Primary and middle-school numeracy and literacy is steady, and VCE picks up in the senior years. Families often look for help for siblings at different stages. Tuterly is for the ones in Years 7 to 10, for maths.",
  },
  {
    slug: "vermont",
    name: "Vermont",
    tier: 3,
    region: "east",
    neighbouring: ["mitcham", "forest-hill", "ringwood"],
    blurb:
      "Looking for tutoring in Vermont? Whether your child attends Vermont Secondary College, or one of the nearby schools in Mitcham, Forest Hill or Ringwood, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      {
        name: "Vermont Secondary College",
        note: "strong VCE outcomes for a non-selective state school",
      },
      {
        name: "Whitefriars College (Donvale)",
        note: "nearby, Catholic boys' secondary",
      },
    ],
    parentNeeds:
      "Most families in Vermont look for maths and English help across primary, secondary and senior VCE. Vermont Secondary’s strong VCE results shape a lot of senior demand, with Methods, Specialist Maths and English typical in Years 11 and 12, and Year 9 and 10 extension is also common. Tuterly doesn't teach VCE, but Year 9 and 10 maths is what Methods and Specialist build on, and that's the part it covers.",
  },
  {
    slug: "blackburn",
    name: "Blackburn",
    tier: 3,
    region: "east",
    neighbouring: ["box-hill", "forest-hill", "mitcham"],
    blurb:
      "Looking for tutoring in Blackburn? Whether your child attends Blackburn High School, or one of the nearby schools in Box Hill, Forest Hill or Mitcham, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      {
        name: "Blackburn High School",
        note: "co-educational state secondary",
      },
      {
        name: "Whitefriars College (Donvale)",
        note: "nearby, Catholic boys' secondary",
      },
      {
        name: "Forest Hill College",
        note: "nearby, state co-ed secondary",
      },
    ],
    parentNeeds:
      "Most families in Blackburn look for maths and English help across every year level, with Years 7 to 10 foundations and VCE the biggest needs. Some want weekly support through middle school; others need short-term help before assessments. For Years 7 to 10 maths, Tuterly works either way: daily practice on what they got wrong, or Study notes and a topic test before a big one.",
  },
  {
    slug: "mitcham",
    name: "Mitcham",
    tier: 3,
    region: "east",
    neighbouring: ["blackburn", "vermont", "ringwood"],
    blurb:
      "Looking for tutoring in Mitcham? Whether your child attends Mullauna College, or one of the nearby schools in Blackburn, Vermont or Ringwood, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      {
        name: "Mullauna College",
        note: "state co-ed secondary in Mitcham",
      },
      {
        name: "Vermont Secondary College",
        note: "nearby, strong VCE outcomes",
      },
    ],
    parentNeeds:
      "Most families in Mitcham look for maths and English help across primary, secondary and senior VCE. Weekly ongoing support is more common here than help only at exam time; parents tend to build it into the family routine. For Years 7 to 10 maths, Tuterly fits that kind of routine, with a weekly streak and goals to keep your child practising.",
  },
  {
    slug: "ringwood",
    name: "Ringwood",
    tier: 3,
    region: "east",
    neighbouring: ["mitcham", "vermont"],
    blurb:
      "Looking for tutoring in Ringwood? Whether your child attends Ringwood Secondary, Aquinas College, or one of the nearby schools in Mitcham or Vermont, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
        note: "nearby, independent co-ed",
      },
    ],
    parentNeeds:
      "Most families in Ringwood look for maths and English help across every year level. Primary numeracy and literacy is steady, and VCE maths, English and sciences pick up in the senior years. Some parents combine an in-person tutor for younger children with online help for VCE students. Tuterly covers the years in between: Years 7 to 10 maths.",
  },
  {
    slug: "forest-hill",
    name: "Forest Hill",
    tier: 3,
    region: "east",
    neighbouring: ["blackburn", "vermont", "box-hill"],
    blurb:
      "Looking for tutoring in Forest Hill? Whether your child attends Forest Hill College, Vermont Secondary, or one of the nearby schools in Box Hill or Blackburn, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
        note: "nearby, strong academic program",
      },
      {
        name: "Blackburn High School",
        note: "nearby",
      },
    ],
    parentNeeds:
      "Most families in Forest Hill look for maths and English help across primary, secondary and VCE, with Years 7 to 10 foundations and VCE the biggest needs. Some want weekly sessions to build confidence; others need short-term help before a test or SAC. For Years 7 to 10 maths, Tuterly turns each question they got wrong into fresh practice until it’s mastered.",
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
      "Looking for tutoring in Brighton? Whether your child attends Brighton Grammar, Firbank Grammar, St Leonard's College, or one of the nearby schools in Brighton East or Hampton, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
      "Most families in Brighton look for maths and English help across primary, secondary and senior VCE. The independent school cluster (Brighton Grammar, Firbank, St Leonard’s) also drives scholarship and entry exam preparation in Years 5 to 7. Some families want weekly sessions; others only before specific assessments. For the Years 7 to 10 maths part, Tuterly is designed by Australian educators at Bayside Academics, right here in Brighton.",
  },
  {
    slug: "hampton",
    name: "Hampton",
    tier: 1,
    region: "bayside",
    neighbouring: ["brighton", "sandringham", "hampton-east"],
    blurb:
      "Looking for tutoring in Hampton? Whether your child attends Hampton Primary, Sandringham College, or one of the nearby schools in Brighton or Sandringham, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
        note: "nearby, independent co-ed",
      },
    ],
    parentNeeds:
      "Most families in Hampton look for maths and English help across primary, secondary and senior VCE. Primary fundamentals and Years 7 to 10 foundations are the steady need, and VCE picks up in the senior years. Some families combine in-person sessions with online help for older students. For Years 7 to 10 maths, Tuterly works on its own or alongside a tutor, who can link to see the questions your child has been getting wrong.",
  },
  {
    slug: "sandringham",
    name: "Sandringham",
    tier: 1,
    region: "bayside",
    neighbouring: ["hampton", "beaumaris", "black-rock"],
    blurb:
      "Looking for tutoring in Sandringham? Whether your child attends Sandringham Primary, Sandringham College, or one of the nearby schools in Hampton or Black Rock, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
      "Most families in Sandringham look for maths and English help across primary, secondary and senior VCE. Primary and middle-school numeracy and literacy is steady, and VCE preparation picks up from Year 10. Before then, Years 7 to 10 maths is where Tuterly helps: every question they get wrong becomes practice until it’s mastered.",
  },
  {
    slug: "beaumaris",
    name: "Beaumaris",
    tier: 1,
    region: "bayside",
    neighbouring: ["sandringham", "black-rock", "mentone"],
    blurb:
      "Looking for tutoring in Beaumaris? Whether your child attends Beaumaris Secondary, Beaumaris Primary, or one of the nearby schools in Sandringham or Mentone, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
        note: "nearby, independent co-ed",
      },
    ],
    parentNeeds:
      "Most families in Beaumaris look for maths and English help across primary, secondary and VCE. Beaumaris Secondary’s growing VCE reputation drives senior demand, and primary and Years 7 to 10 help is steady year-round. For Years 7 to 10 maths, Tuterly is a lower-cost way to keep that steady practice going.",
  },
  {
    slug: "bentleigh",
    name: "Bentleigh",
    tier: 1,
    region: "bayside",
    neighbouring: ["bentleigh-east", "mckinnon", "ormond"],
    blurb:
      "Looking for tutoring in Bentleigh? Whether your child attends Bentleigh Secondary, Coatesville Primary, McKinnon Secondary (nearby), or another local school, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
        note: "nearby, top-performing state secondary",
      },
    ],
    parentNeeds:
      "Most families in Bentleigh look for maths and English help across primary, secondary and VCE. Being close to the McKinnon Secondary zone drives a lot of the secondary demand, and primary foundations work is steady year-round. For Years 7 to 10 maths, Tuterly gives your child practice on the questions they actually got wrong, not a generic worksheet.",
  },
  {
    slug: "mckinnon",
    name: "McKinnon",
    tier: 1,
    region: "bayside",
    neighbouring: ["bentleigh", "ormond", "caulfield-north"],
    blurb:
      "Looking for tutoring in McKinnon? Whether your child attends McKinnon Secondary College, McKinnon Primary, or one of the nearby schools in Bentleigh or Ormond, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
      "Most families in McKinnon look for maths and English help from primary through to VCE. McKinnon Secondary’s competitive classrooms drive a lot of it: most families aren’t trying to catch up, they’re trying to keep pace. Scholarship and selective entry preparation is also common. For keeping pace in Years 7 to 10 maths, Tuterly turns each missed question into fresh practice, then a harder one once it’s mastered.",
  },

  // ---------- Tier 2 - strong catchments ----------
  {
    slug: "black-rock",
    name: "Black Rock",
    tier: 2,
    region: "bayside",
    neighbouring: ["sandringham", "beaumaris", "cheltenham"],
    blurb:
      "Looking for tutoring in Black Rock? Whether your child attends Black Rock Primary, Sandringham College, or one of the local schools in Beaumaris or Sandringham, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      {
        name: "Black Rock Primary School",
        note: "local state primary",
      },
      {
        name: "Sandringham College",
        note: "nearby, multi-campus state secondary",
      },
      {
        name: "Mentone Grammar",
        note: "nearby, independent co-ed",
      },
    ],
    parentNeeds:
      "Most families in Black Rock look for maths and English help across primary, secondary and senior VCE. Primary numeracy and literacy is the steady need, and VCE picks up in the senior years. Tuterly starts at Year 7, so it helps once they reach secondary school, not in primary.",
  },
  {
    slug: "brighton-east",
    name: "Brighton East",
    tier: 2,
    region: "bayside",
    neighbouring: ["brighton", "hampton-east", "bentleigh"],
    blurb:
      "Looking for tutoring in Brighton East? Whether your child attends Haileybury, St Leonard's College (nearby), Brighton Secondary, or one of the local schools in Brighton or Bentleigh, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      {
        name: "Haileybury (Castlefield campus)",
        note: "independent co-ed",
      },
      {
        name: "St Leonard's College",
        note: "nearby, independent co-ed in Brighton",
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
      "Most families in Brighton East look for maths and English help across primary, secondary and VCE. The mix of independent and state schools means a wide range of needs, and scholarship and entry exam preparation in Years 5 to 7 is a notable niche. For Years 7 to 10 maths at any of those schools, Tuterly lets your child upload their real tests and practise from them.",
  },
  {
    slug: "hampton-east",
    name: "Hampton East",
    tier: 2,
    region: "bayside",
    neighbouring: ["hampton", "bentleigh", "brighton-east"],
    blurb:
      "Looking for tutoring in Hampton East? Whether your child attends Sandringham College, Bentleigh Secondary (nearby), or one of the local primary schools, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      {
        name: "Sandringham College",
        note: "multi-campus state secondary",
      },
      {
        name: "Bentleigh Secondary College",
        note: "nearby, state secondary",
      },
      {
        name: "Moorabbin Primary School",
        note: "nearby, local state primary",
      },
    ],
    parentNeeds:
      "Most families in Hampton East look for maths and English help across primary, secondary and VCE. Primary and middle-school foundations are the steady need, and VCE builds through the senior years. For the middle years, Tuterly covers Years 7 to 10 maths.",
  },
  {
    slug: "mentone",
    name: "Mentone",
    tier: 2,
    region: "bayside",
    neighbouring: ["beaumaris", "cheltenham", "black-rock"],
    blurb:
      "Looking for tutoring in Mentone? Whether your child attends Mentone Grammar, St Bede's, Kilbreda, or one of the nearby schools in Beaumaris or Cheltenham, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
      "Most families in Mentone look for maths and English help across primary, secondary and VCE. The cluster of independent and Catholic schools (Mentone Grammar, St Bede’s, Kilbreda) drives senior-school demand, and primary foundations work is steady too. Tuterly sits in between, for Years 7 to 10 maths.",
  },
  {
    slug: "bentleigh-east",
    name: "Bentleigh East",
    tier: 2,
    region: "bayside",
    neighbouring: ["bentleigh", "mckinnon", "ormond"],
    blurb:
      "Looking for tutoring in Bentleigh East? Whether your child attends Coatesville Primary, McKinnon Secondary (nearby), or one of the local schools in Bentleigh or Ormond, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      {
        name: "Coatesville Primary School",
        note: "local state primary",
      },
      {
        name: "McKinnon Secondary College",
        note: "nearby, top-performing state secondary",
      },
      {
        name: "Bentleigh Secondary College",
        note: "nearby, state secondary",
      },
    ],
    parentNeeds:
      "Most families in Bentleigh East look for maths and English help across primary, secondary and VCE. Being close to the McKinnon Secondary zone drives a lot of the secondary demand, and primary fundamentals and Years 7 to 10 foundations are steady. For that Years 7 to 10 maths, Tuterly is the lower-cost option to weigh against a weekly tutor.",
  },
  {
    slug: "elsternwick",
    name: "Elsternwick",
    tier: 2,
    region: "bayside",
    neighbouring: ["brighton", "caulfield-north", "ormond"],
    blurb:
      "Looking for tutoring in Elsternwick? Whether your child attends Caulfield Grammar, Shelford Girls' Grammar, Wesley College (nearby), or one of the local schools in Brighton or Caulfield North, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
        note: "nearby, independent co-ed",
      },
      {
        name: "Elsternwick Primary School",
        note: "local state primary",
      },
    ],
    parentNeeds:
      "Most families in Elsternwick look for maths and English help across primary, secondary and senior VCE or IB. The local independent schools (Caulfield Grammar, Shelford, Wesley) drive scholarship and entry exam preparation in Years 5 to 7. Once they’re in Year 7, Tuterly covers their maths through to Year 10.",
  },

  // ---------- Tier 3 - good demand, less SEO competition ----------
  {
    slug: "caulfield-north",
    name: "Caulfield North",
    tier: 3,
    region: "bayside",
    neighbouring: ["elsternwick", "ormond", "mckinnon"],
    blurb:
      "Looking for tutoring in Caulfield North? Whether your child attends Caulfield Grammar, or one of the nearby schools in Elsternwick or Ormond, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
      "Most families in Caulfield North look for maths and English help across every year level. Primary and Years 7 to 10 foundations are steady, and VCE picks up in the senior years. For the Years 7 to 10 maths foundations, Tuterly works from the exact questions your child gets wrong.",
  },
  {
    slug: "cheltenham",
    name: "Cheltenham",
    tier: 3,
    region: "bayside",
    neighbouring: ["mentone", "black-rock", "beaumaris"],
    blurb:
      "Looking for tutoring in Cheltenham? Whether your child attends Cheltenham Secondary, Le Page Primary, or one of the nearby schools in Mentone or Black Rock, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
        note: "nearby, independent co-ed",
      },
    ],
    parentNeeds:
      "Most families in Cheltenham look for maths and English help across primary, secondary and VCE. Primary numeracy and literacy is the steady need, and secondary maths and English pick up through Years 7 to 10. For that secondary maths, Tuterly turns every missed question into practice until it’s mastered.",
  },
  {
    slug: "ormond",
    name: "Ormond",
    tier: 3,
    region: "bayside",
    neighbouring: ["mckinnon", "bentleigh", "caulfield-north"],
    blurb:
      "Looking for tutoring in Ormond? Whether your child attends McKinnon Secondary, Glen Eira College, or one of the nearby schools in Bentleigh or McKinnon, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
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
      "Most families in Ormond look for maths and English help across every year level. Being close to the McKinnon Secondary zone drives a lot of the secondary demand, and primary foundations work is steady year-round. For Years 7 to 10 maths, Tuterly is a way to keep practising between lessons, or instead of them.",
  },

  // ===================================================================
  // BEYOND THE EAST AND BAYSIDE (added 9 Nov 2026). Schools checked
  // against ACARA's Australian Schools List (australian-schools.xlsx).
  // Notes say only what the school is, not how good it is.
  // ===================================================================
  {
    slug: "toorak",
    name: "Toorak",
    tier: 2,
    region: "south-east",
    neighbouring: ["glen-iris", "albert-park", "caulfield-north"],
    blurb: "Looking for tutoring in Toorak? Whether your child attends St Kevin's College, St Catherine's School, Loreto Mandeville Hall, or one of the nearby schools in South Yarra or Glen Iris, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "St Kevin's College", note: "Catholic boys' school" },
      { name: "St Catherine's School", note: "independent girls' school" },
      { name: "Loreto Mandeville Hall", note: "Catholic girls' school" },
      { name: "Melbourne High School", note: "selective-entry state boys' school for Years 9 to 12, nearby in South Yarra" },
    ],
    parentNeeds: "Families around Toorak are close to a cluster of independent schools and to Melbourne High School, so maths help often starts with scholarship and entry tests in the primary years and continues through secondary assessments and VCE. A private tutor is common here. For the Years 7 to 10 maths in between sessions, Tuterly turns the questions your child gets wrong into fresh practice on the same idea.",
  },
  {
    slug: "glen-iris",
    name: "Glen Iris",
    tier: 2,
    region: "south-east",
    neighbouring: ["toorak", "camberwell", "caulfield-north"],
    blurb: "Looking for tutoring in Glen Iris? Whether your child attends Korowa Anglican Girls' School, Sacre Coeur, De La Salle College, or one of the nearby schools in Malvern or Camberwell, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "Korowa Anglican Girls' School", note: "independent girls' school" },
      { name: "Sacre Coeur", note: "Catholic girls' school" },
      { name: "De La Salle College", note: "Catholic boys' school, nearby in Malvern" },
    ],
    parentNeeds: "Families in Glen Iris have independent and Catholic schools close by, plus the state secondaries of neighbouring Camberwell and Ashburton, so maths help ranges from entry tests to keeping up with a fast-moving secondary course. For Years 7 to 10 maths, Tuterly covers the practice part: snap what they got wrong, see the worked solution, then try a fresh question on the same idea.",
  },
  {
    slug: "albert-park",
    name: "Albert Park",
    tier: 2,
    region: "south-east",
    neighbouring: ["toorak", "elsternwick"],
    blurb: "Looking for tutoring in Albert Park? Whether your child attends Albert Park College, St Michael's Grammar School, Melbourne Girls Grammar, or one of the nearby schools in South Yarra or St Kilda, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "Albert Park College", note: "state secondary college" },
      { name: "St Michael's Grammar School", note: "independent school, nearby in St Kilda" },
      { name: "Melbourne Girls Grammar", note: "independent girls' school, nearby in South Yarra" },
      { name: "Melbourne High School", note: "selective-entry state boys' school for Years 9 to 12, nearby in South Yarra" },
    ],
    parentNeeds: "Families around Albert Park mix state and independent schools, and some Year 8 students sit the selective entry exam for Melbourne High School or Mac.Rob. Maths help usually means keeping up with class tests through Years 7 to 10 and preparing for VCE later. For the Years 7 to 10 maths, Tuterly is daily practice on the exact questions they get wrong.",
  },
  {
    slug: "mulgrave",
    name: "Mulgrave",
    tier: 2,
    region: "south-east",
    neighbouring: ["wheelers-hill", "glen-waverley", "keysborough"],
    blurb: "Looking for tutoring in Mulgrave? Whether your child attends Wellington Secondary College, Mazenod College, or one of the nearby schools in Wheelers Hill or Glen Waverley, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "Wellington Secondary College", note: "state secondary college" },
      { name: "Mazenod College", note: "Catholic boys' secondary college" },
      { name: "John Monash Science School", note: "selective-entry state science school from Year 10, nearby in Clayton" },
    ],
    parentNeeds: "Families in Mulgrave sit between the Glen Waverley school zones and John Monash Science School, which takes students from Year 10 by application, so maths results in Years 8 and 9 matter to a lot of families here. For Years 7 to 10 maths, Tuterly helps between lessons: every question they get wrong becomes a worked solution and a fresh question on the same idea.",
  },
  {
    slug: "keysborough",
    name: "Keysborough",
    tier: 2,
    region: "south-east",
    neighbouring: ["mulgrave", "cheltenham", "mentone"],
    blurb: "Looking for tutoring in Keysborough? Whether your child attends Haileybury, Keysborough Secondary College, Sirius College, or one of the nearby schools in Dingley Village or Noble Park, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "Haileybury", note: "independent school, Keysborough campus" },
      { name: "Keysborough Secondary College", note: "state secondary college" },
      { name: "Lighthouse Christian College", note: "independent Christian school" },
      { name: "Sirius College", note: "independent school, Keysborough campus" },
    ],
    parentNeeds: "Families in Keysborough have a large independent campus at Haileybury alongside state and faith-based schools, so maths help covers everything from entry and scholarship tests to Years 7 to 10 class assessments. For the secondary maths, Tuterly turns each question they got wrong into practice they can do any day of the week.",
  },
  {
    slug: "berwick",
    name: "Berwick",
    tier: 1,
    region: "south-east",
    neighbouring: ["clyde-north", "keysborough"],
    blurb: "Looking for tutoring in Berwick? Whether your child attends Berwick Secondary College, Kambrya College, St Margaret's Berwick Grammar, or one of the nearby schools in Narre Warren or Clyde North, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "Nossal High School", note: "selective-entry state school for Years 9 to 12" },
      { name: "Berwick Secondary College", note: "state secondary college" },
      { name: "Kambrya College", note: "state secondary college" },
      { name: "Haileybury", note: "independent school, Berwick campus" },
      { name: "St Margaret's Berwick Grammar", note: "independent school" },
      { name: "St Francis Xavier College", note: "Catholic secondary college, Berwick campus" },
    ],
    parentNeeds: "Berwick is home to Nossal High School, one of Victoria's selective-entry schools, so Year 8 maths and the selective entry exam are front of mind for many families. Others want steady help keeping up with Years 7 to 10 class tests. Tuterly covers the maths practice: snap what they got wrong, see the worked solution, then prove it with a fresh question on the same idea.",
  },
  {
    slug: "clyde-north",
    name: "Clyde North",
    tier: 3,
    region: "south-east",
    neighbouring: ["berwick"],
    blurb: "Looking for tutoring in Clyde North? Whether your child attends Wulerrp Secondary College, Birranga College, Hillcrest Christian College, or one of the nearby schools in Berwick or Cranbourne, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "Wulerrp Secondary College", note: "state secondary college" },
      { name: "Birranga College", note: "state secondary college" },
      { name: "Hillcrest Christian College", note: "independent Christian school" },
    ],
    parentNeeds: "Clyde North is a fast-growing area with newer secondary colleges, and many families are looking for help as their children move from primary into Year 7 maths. For Years 7 to 10, Tuterly is practice on the exact questions they get wrong, with a weekly summary for parents of what was practised by topic.",
  },
  {
    slug: "frankston",
    name: "Frankston",
    tier: 2,
    region: "south-east",
    neighbouring: ["mentone", "keysborough"],
    blurb: "Looking for tutoring in Frankston? Whether your child attends Frankston High School, McClelland Secondary College, John Paul College, or one of the nearby schools in Frankston South or Langwarrin, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "Frankston High School", note: "state secondary college" },
      { name: "McClelland Secondary College", note: "state secondary college" },
      { name: "John Paul College", note: "Catholic secondary college" },
      { name: "Elisabeth Murdoch College", note: "state secondary college, nearby in Langwarrin" },
    ],
    parentNeeds: "Families in Frankston look for maths help at every stage, from catching up on Year 7 foundations to preparing for end-of-year exams in Years 9 and 10. For Years 7 to 10 maths, Tuterly is a low-cost way to practise between lessons: worked solutions and fresh questions on whatever they got wrong.",
  },
  {
    slug: "point-cook",
    name: "Point Cook",
    tier: 1,
    region: "west",
    neighbouring: ["tarneit", "werribee", "williamstown"],
    blurb: "Looking for tutoring in Point Cook? Whether your child attends Point Cook Senior Secondary College, Saltwater P-9 College, Alamanda K-9 College, or one of the nearby schools in Williams Landing or Werribee, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "Point Cook Senior Secondary College", note: "state senior secondary college" },
      { name: "Saltwater P-9 College", note: "state P-9 school" },
      { name: "Alamanda K-9 College", note: "state K-9 school" },
      { name: "Emmanuel College", note: "Catholic secondary college, Notre Dame campus" },
    ],
    parentNeeds: "Many Point Cook students stay at a P-9 or K-9 college until Year 9 and then move to a senior secondary college for Year 10, so families often want maths to be solid before that move. Suzanne Cory High School in Werribee also brings selective entry into the picture in Year 8. For Years 7 to 10 maths, Tuterly turns every question they got wrong into fresh practice on the same idea.",
  },
  {
    slug: "tarneit",
    name: "Tarneit",
    tier: 2,
    region: "west",
    neighbouring: ["point-cook", "werribee", "caroline-springs"],
    blurb: "Looking for tutoring in Tarneit? Whether your child attends Tarneit Senior College, Brinbeal Secondary College, Thomas Carr College, or one of the nearby schools in Truganina or Werribee, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "Tarneit Senior College", note: "state senior secondary college" },
      { name: "Brinbeal Secondary College", note: "state secondary college" },
      { name: "Thomas Carr College", note: "Catholic secondary college" },
      { name: "Good News Lutheran College", note: "independent Lutheran school" },
    ],
    parentNeeds: "Tarneit is one of Melbourne's fastest-growing areas, with P-9 colleges feeding into senior colleges, and families often look for maths help around the Year 7 start and the move to Year 10. Suzanne Cory High School's selective entry is nearby too. For Years 7 to 10 maths, Tuterly is practice on the exact questions they get wrong, any day of the week.",
  },
  {
    slug: "werribee",
    name: "Werribee",
    tier: 1,
    region: "west",
    neighbouring: ["point-cook", "tarneit"],
    blurb: "Looking for tutoring in Werribee? Whether your child attends Werribee Secondary College, Wyndham Central Secondary College, MacKillop Catholic Regional College, or one of the nearby schools in Hoppers Crossing or Point Cook, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "Suzanne Cory High School", note: "selective-entry state school for Years 9 to 12" },
      { name: "Werribee Secondary College", note: "state secondary college" },
      { name: "Wyndham Central Secondary College", note: "state secondary college" },
      { name: "MacKillop Catholic Regional College", note: "Catholic secondary college" },
      { name: "Heathdale Christian College", note: "independent Christian school" },
    ],
    parentNeeds: "Werribee is home to Suzanne Cory High School, one of Victoria's selective-entry schools, so Year 8 maths and the selective entry exam matter to many local families. Others want help keeping up with Years 7 to 10 class tests. Tuterly covers the maths practice: worked solutions and a fresh question on the same idea for every one they got wrong.",
  },
  {
    slug: "williamstown",
    name: "Williamstown",
    tier: 2,
    region: "west",
    neighbouring: ["point-cook", "essendon"],
    blurb: "Looking for tutoring in Williamstown? Whether your child attends Williamstown High School, Bayside P-12 College, Westbourne Grammar School, or one of the nearby schools in Newport or Altona, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "Williamstown High School", note: "state secondary college" },
      { name: "Bayside P-12 College", note: "state P-12 school" },
      { name: "Westbourne Grammar School", note: "independent school, Williamstown campus in Newport" },
      { name: "Mount St Joseph Girls' College", note: "Catholic girls' school, nearby in Altona" },
    ],
    parentNeeds: "Families in Williamstown look for maths help through the secondary years, from settling into Year 7 to preparing for Year 10 exams and VCE subject choices. For Years 7 to 10 maths, Tuterly is the practice part: snap what they got wrong, see the worked solution, then try a fresh question on the same idea.",
  },
  {
    slug: "essendon",
    name: "Essendon",
    tier: 1,
    region: "west",
    neighbouring: ["williamstown", "coburg", "caroline-springs"],
    blurb: "Looking for tutoring in Essendon? Whether your child attends Penleigh and Essendon Grammar School, St Columba's College, Essendon Keilor College, or one of the nearby schools in Moonee Ponds or Strathmore, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "Penleigh and Essendon Grammar School", note: "independent school" },
      { name: "Lowther Hall Anglican Grammar School", note: "independent girls' school" },
      { name: "St Columba's College", note: "Catholic girls' secondary college" },
      { name: "St Bernard's College", note: "Catholic boys' secondary college" },
      { name: "Essendon Keilor College", note: "state secondary college" },
      { name: "Strathmore Secondary College", note: "state secondary college, nearby in Strathmore" },
    ],
    parentNeeds: "Essendon has a mix of independent, Catholic and state secondary schools, so maths help ranges from entry and scholarship tests to keeping up with Years 7 to 10 class assessments. For the secondary maths, Tuterly turns the questions your child gets wrong into fresh practice, with a weekly summary for parents.",
  },
  {
    slug: "caroline-springs",
    name: "Caroline Springs",
    tier: 2,
    region: "west",
    neighbouring: ["tarneit", "essendon"],
    blurb: "Looking for tutoring in Caroline Springs? Whether your child attends Lakeview Senior College, Catholic Regional College Caroline Springs, Southern Cross Grammar, or one of the nearby schools in Burnside or Taylors Hill, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "Lakeview Senior College", note: "state senior secondary college" },
      { name: "Catholic Regional College Caroline Springs", note: "Catholic secondary college" },
      { name: "Southern Cross Grammar", note: "independent school" },
      { name: "Brookside P-9 College", note: "state P-9 school" },
      { name: "Creekside K-9 College", note: "state K-9 school" },
    ],
    parentNeeds: "In Caroline Springs, many students move from a P-9 or K-9 college to a senior college for Year 10, so families often want maths gaps closed before that step. For Years 7 to 10 maths, Tuterly is daily practice on the exact questions they get wrong, with worked solutions and fresh questions on the same idea.",
  },
  {
    slug: "ivanhoe",
    name: "Ivanhoe",
    tier: 1,
    region: "north",
    neighbouring: ["northcote", "coburg", "bulleen"],
    blurb: "Looking for tutoring in Ivanhoe? Whether your child attends Ivanhoe Grammar School, Ivanhoe Girls' Grammar School, Viewbank College, or one of the nearby schools in Heidelberg or Viewbank, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "Ivanhoe Grammar School", note: "independent school" },
      { name: "Ivanhoe Girls' Grammar School", note: "independent girls' school" },
      { name: "Viewbank College", note: "state secondary college, nearby in Viewbank" },
      { name: "Our Lady of Mercy College", note: "Catholic girls' secondary college, nearby in Heidelberg" },
    ],
    parentNeeds: "Families around Ivanhoe have two independent grammar schools close by alongside state and Catholic secondaries, so maths help often starts with scholarship tests and continues through Years 7 to 10 assessments. For that secondary maths, Tuterly turns every question they got wrong into a worked solution and a fresh question on the same idea.",
  },
  {
    slug: "northcote",
    name: "Northcote",
    tier: 2,
    region: "north",
    neighbouring: ["ivanhoe", "coburg"],
    blurb: "Looking for tutoring in Northcote? Whether your child attends Northcote High School, Santa Maria College, Thornbury High School, or one of the nearby schools in Thornbury or Fairfield, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "Northcote High School", note: "state secondary college" },
      { name: "Santa Maria College", note: "Catholic girls' secondary college" },
      { name: "Thornbury High School", note: "state secondary college, nearby in Thornbury" },
    ],
    parentNeeds: "Families in Northcote mostly look for help keeping up with secondary maths and English, with Year 7 and Year 10 as common starting points. For Years 7 to 10 maths, Tuterly is practice on the exact questions they get wrong, any day of the week, and a weekly summary for parents.",
  },
  {
    slug: "coburg",
    name: "Coburg",
    tier: 2,
    region: "north",
    neighbouring: ["northcote", "essendon", "ivanhoe"],
    blurb: "Looking for tutoring in Coburg? Whether your child attends Coburg High School, Mercy College, Pascoe Vale Girls Secondary College, or one of the nearby schools in Pascoe Vale or Brunswick, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "Coburg High School", note: "state secondary college" },
      { name: "Mercy College", note: "Catholic girls' secondary college" },
      { name: "Pascoe Vale Girls Secondary College", note: "state girls' secondary college, nearby in Pascoe Vale" },
      { name: "Antonine College", note: "independent school" },
    ],
    parentNeeds: "Families in Coburg look for maths help through the secondary years, from building Year 7 foundations to preparing for Year 10 exams. For Years 7 to 10 maths, Tuterly covers the practice part: snap what they got wrong, see the worked solution, and try a fresh question on the same idea.",
  },
  {
    slug: "craigieburn",
    name: "Craigieburn",
    tier: 2,
    region: "north",
    neighbouring: ["essendon"],
    blurb: "Looking for tutoring in Craigieburn? Whether your child attends Craigieburn Secondary College, Elevation Secondary College, Mount Ridley P-12 College, or one of the nearby schools in Mickleham or Greenvale, help with maths usually comes down to a private tutor or regular practice on the exact questions they get wrong. For Years 7 to 10, Tuterly is an iPhone app (Android coming soon) that does the practice part.",
    schools: [
      { name: "Craigieburn Secondary College", note: "state secondary college" },
      { name: "Elevation Secondary College", note: "state secondary college" },
      { name: "Mount Ridley P-12 College", note: "state P-12 school" },
      { name: "Hume Anglican Grammar", note: "independent school, nearby in Mickleham" },
      { name: "Kolbe Catholic College", note: "Catholic secondary college, nearby in Greenvale" },
    ],
    parentNeeds: "Craigieburn is a growing area with several newer schools, and families often want help as children start Year 7 maths or prepare for Year 10. For Years 7 to 10 maths, Tuterly is a low-cost way to practise between lessons: worked solutions and a fresh question on the same idea for every one they got wrong.",
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

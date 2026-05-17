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
//   - blurb        (optional): 1–2 sentence intro shown in the hero.
//                  Falls back to a generic template if missing.
//   - schools      (optional): [{ name, note }] rendered as a card list.
//                  Note is a short line about programs / streams / level.
//   - highlights   (optional): bullet list of suburb-specific things
//                  parents typically ask about (selective entry,
//                  scholarship pathways, VCE vs IB, etc.).
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
      "Glen Waverley has one of Melbourne's most active tutoring communities, with families across the Glen Waverley Secondary College and Brentwood SC zones investing heavily in supplementary support — especially in the lead-up to selective school entry and VCE.",
    schools: [
      {
        name: "Glen Waverley Secondary College",
        note: "Large state secondary with consistently strong VCE results in maths and sciences.",
      },
      {
        name: "Brentwood Secondary College",
        note: "Co-educational state school with an academic-extension focus.",
      },
      {
        name: "Highvale Secondary College",
        note: "State secondary on the Mount Waverley / Glen Waverley fringe.",
      },
      {
        name: "Wesley College (Glen Waverley campus)",
        note: "Independent K-12 campus offering both IB and VCE pathways.",
      },
    ],
    highlights: [
      "Selective school entry exam preparation (John Monash Science, Nossal, MacRobertson)",
      "VCE Methods, Specialist Maths, Chemistry and Physics support",
      "Sessions can run online or in-person across Glen Waverley",
    ],
  },
  {
    slug: "mount-waverley",
    name: "Mount Waverley",
    tier: 1,
    neighbouring: ["glen-waverley", "wheelers-hill", "burwood"],
    blurb:
      "Mount Waverley sits next door to Glen Waverley and shares its strong academic culture. Many families here have older siblings already working with a tutor, and one-on-one help is often used to keep on top of a packed VCE workload rather than to catch up.",
    schools: [
      {
        name: "Mount Waverley Secondary College",
        note: "Sought-after state secondary with strong VCE outcomes.",
      },
      {
        name: "Huntingtower School",
        note: "Independent ELC-12 with consistently top-tier ATAR results.",
      },
      {
        name: "Avila College",
        note: "Catholic girls' school, Years 7-12.",
      },
      {
        name: "Mount Scopus Memorial College",
        note: "Independent Jewish ELC-12 on the Burwood / Mount Waverley border.",
      },
    ],
    highlights: [
      "VCE Methods, Specialist Maths, Chemistry and Physics",
      "Year 9 selective entry exam preparation",
      "Online or in-person, including weekend sessions",
    ],
  },
  {
    slug: "balwyn",
    name: "Balwyn",
    tier: 1,
    neighbouring: ["surrey-hills", "kew", "canterbury"],
    blurb:
      "Balwyn is built around its public school — Balwyn High is one of the most contested non-selective state schools in Australia, and house prices in zone reflect it. Tutoring here is less about catching up and more about keeping pace with a high-performing peer group.",
    schools: [
      {
        name: "Balwyn High School",
        note: "Consistently among Australia's strongest public schools by VCE median — very competitive academic environment.",
      },
      {
        name: "Balwyn Primary School",
        note: "Feeder primary inside the Balwyn High zone.",
      },
      {
        name: "Carey Baptist Grammar (Kew, nearby)",
        note: "Independent co-ed school with strong VCE and IB results.",
      },
    ],
    highlights: [
      "Keeping pace at Balwyn High in maths, English and humanities",
      "Year 9-10 scholarship and entry-exam preparation",
      "Choose online sessions or in-person at your home",
    ],
  },
  {
    slug: "box-hill",
    name: "Box Hill",
    tier: 1,
    neighbouring: ["blackburn", "surrey-hills", "doncaster"],
    blurb:
      "Box Hill High runs the SEAL (Select Entry Accelerated Learning) program, drawing strong applicants from across the eastern suburbs. The SEAL application process itself drives a lot of tutoring demand from Year 4-6 families well before secondary school starts.",
    schools: [
      {
        name: "Box Hill High School",
        note: "Runs the SEAL program for academically gifted students.",
      },
      {
        name: "Kingswood College",
        note: "Independent co-ed school.",
      },
      {
        name: "Koonung Secondary College",
        note: "State co-ed secondary in the area.",
      },
    ],
    highlights: [
      "SEAL entry exam preparation (Year 5 to Year 7 entry)",
      "Reasoning, written expression and maths practice for selective tests",
      "Sessions online or face-to-face in the Box Hill area",
    ],
  },
  {
    slug: "camberwell",
    name: "Camberwell",
    tier: 1,
    neighbouring: ["hawthorn", "canterbury", "kew"],
    blurb:
      "Camberwell is dense with independent schools — Camberwell Grammar, MLC and PLC all draw students from across the inner east. Tutoring here tends to focus on private-school-specific assessment styles and IB or VCE preparation rather than a single state curriculum.",
    schools: [
      {
        name: "Camberwell Grammar School",
        note: "Independent boys' school with a strong academic record.",
      },
      {
        name: "Methodist Ladies' College (MLC)",
        note: "Independent girls' school offering both VCE and IB pathways.",
      },
      {
        name: "Presbyterian Ladies' College (PLC)",
        note: "Independent girls' ELC-12.",
      },
      {
        name: "Camberwell High School",
        note: "Co-educational state secondary.",
      },
    ],
    highlights: [
      "IB Diploma and VCE preparation across all subjects",
      "Scholarship exam preparation for private school entry",
      "Online sessions or in-person at your home",
    ],
  },
  {
    slug: "kew",
    name: "Kew",
    tier: 1,
    neighbouring: ["hawthorn", "balwyn", "camberwell"],
    blurb:
      "Kew has a high concentration of private school families — Trinity, Carey, Genazzano, Xavier, MLC and Ruyton all sit in or near the suburb. With each school setting its own work and assessment style, in-person tutoring is especially popular for the immediate feedback it gives on school-specific tasks.",
    schools: [
      {
        name: "Trinity Grammar School",
        note: "Independent boys' school, ELC-12.",
      },
      {
        name: "Methodist Ladies' College (Kew campus)",
        note: "Independent girls' school, VCE and IB pathways.",
      },
      {
        name: "Carey Baptist Grammar School",
        note: "Independent co-ed.",
      },
      {
        name: "Genazzano FCJ College",
        note: "Catholic girls' school, ELC-12.",
      },
      {
        name: "Xavier College",
        note: "Catholic boys' school, ELC-12.",
      },
      {
        name: "Ruyton Girls' School",
        note: "Independent girls' school.",
      },
      {
        name: "Kew High School",
        note: "Co-educational state secondary.",
      },
    ],
    highlights: [
      "IB Diploma and VCE preparation",
      "Year 5-6 scholarship and entry exam tutoring",
      "Sessions online or in-person across Kew",
    ],
  },
  {
    slug: "doncaster",
    name: "Doncaster",
    tier: 1,
    neighbouring: ["doncaster-east", "templestowe", "box-hill"],
    blurb:
      "Doncaster sits at the heart of one of Melbourne's most VCE-focused communities. East Doncaster Secondary in particular punches well above its state-school weight in ATAR results, and tutoring here is a near-default for Year 11-12 students.",
    schools: [
      {
        name: "Doncaster Secondary College",
        note: "State co-ed secondary.",
      },
      {
        name: "East Doncaster Secondary College",
        note: "Strong VCE outcomes, particularly in maths and sciences.",
      },
      {
        name: "Carey Baptist Grammar (Donvale campus)",
        note: "Independent co-ed in the wider Doncaster area.",
      },
    ],
    highlights: [
      "VCE Methods, Specialist Maths, Chemistry, Physics",
      "Preparing for end-of-year exams and SACs across Units 3-4",
      "Online or in-person across Doncaster",
    ],
  },

  // ---------- Tier 2 — strong catchments ----------
  {
    slug: "hawthorn",
    name: "Hawthorn",
    tier: 2,
    neighbouring: ["kew", "camberwell"],
    blurb:
      "Hawthorn's tutoring landscape is shaped by Scotch College and MLC — both schools set demanding, fast-moving curriculums, and many families bring in a tutor to provide pacing rather than catch-up help.",
    schools: [
      {
        name: "Scotch College",
        note: "Independent boys' school.",
      },
      {
        name: "Methodist Ladies' College (Hawthorn)",
        note: "Independent girls' school nearby.",
      },
      {
        name: "Auburn High School",
        note: "Co-educational state secondary.",
      },
    ],
    highlights: [
      "Pacing support for IB and VCE",
      "Targeted help with specific subjects rather than full-course tutoring",
      "Online sessions or in-person around Hawthorn",
    ],
  },
  {
    slug: "doncaster-east",
    name: "Doncaster East",
    tier: 2,
    neighbouring: ["doncaster", "templestowe", "blackburn"],
    blurb:
      "Doncaster East is anchored by East Doncaster Secondary College, one of the strongest non-selective state schools in Melbourne for VCE. Families here often start tutoring in Year 10 and continue through Year 12.",
    schools: [
      {
        name: "East Doncaster Secondary College",
        note: "Consistently strong VCE outcomes.",
      },
      {
        name: "Templestowe College",
        note: "State co-ed secondary nearby.",
      },
    ],
    highlights: [
      "VCE Methods, Specialist Maths and English",
      "Year 10 pre-VCE foundation work",
      "Online or in-person across the Doncaster East area",
    ],
  },
  {
    slug: "surrey-hills",
    name: "Surrey Hills",
    tier: 2,
    neighbouring: ["box-hill", "canterbury", "balwyn"],
    blurb:
      "Surrey Hills is a family-heavy inner-eastern suburb with strong primary schools and easy access to Box Hill HS, Camberwell HS and several independent secondaries. Tutoring here tends to start early — many families bring in support from Year 4-5 to prepare for scholarship and SEAL exams.",
    schools: [
      {
        name: "Surrey Hills Primary School",
        note: "Local state primary.",
      },
      {
        name: "Chatham Primary School",
        note: "State primary in the area.",
      },
      {
        name: "Strathcona Girls Grammar (Canterbury, nearby)",
        note: "Independent girls' school.",
      },
    ],
    highlights: [
      "Year 4-6 scholarship and SEAL exam preparation",
      "Bridging into Year 7 at a more academic secondary",
      "Sessions online or face-to-face in your home",
    ],
  },
  {
    slug: "canterbury",
    name: "Canterbury",
    tier: 2,
    neighbouring: ["camberwell", "balwyn", "surrey-hills"],
    blurb:
      "Canterbury is one of the most affluent suburbs in Melbourne's east, with families drawing from a wide range of private and state schools — Camberwell Grammar, MLC, Strathcona, Camberwell High and Balwyn High all sit within easy reach.",
    schools: [
      {
        name: "Strathcona Girls Grammar",
        note: "Independent girls' school in Canterbury.",
      },
      {
        name: "Camberwell Grammar School (nearby)",
        note: "Independent boys' school.",
      },
      {
        name: "Camberwell High School",
        note: "State co-ed secondary.",
      },
    ],
    highlights: [
      "IB and VCE preparation across all subjects",
      "Year 5-6 scholarship and selective entry exam preparation",
      "Choose online or in-person",
    ],
  },
  {
    slug: "templestowe",
    name: "Templestowe",
    tier: 2,
    neighbouring: ["doncaster", "doncaster-east", "bulleen"],
    blurb:
      "Templestowe has a strong family demographic with consistent demand for academic support across primary and secondary years. Many families opt for in-person tutoring at home given the area's slightly more spread-out layout.",
    schools: [
      {
        name: "Templestowe College",
        note: "State co-ed secondary.",
      },
      {
        name: "East Doncaster Secondary College (nearby)",
        note: "Strong VCE results, particularly in sciences.",
      },
    ],
    highlights: [
      "VCE preparation, particularly maths and sciences",
      "Primary numeracy and literacy support",
      "Online or in-person across Templestowe",
    ],
  },
  {
    slug: "bulleen",
    name: "Bulleen",
    tier: 2,
    neighbouring: ["templestowe", "doncaster"],
    blurb:
      "Bulleen has a strong Asian-Australian community with deep tutoring culture — many families have been working with tutors since primary school, and tutoring is woven into the weekly routine rather than treated as remediation.",
    schools: [
      {
        name: "Marcellin College",
        note: "Catholic boys' secondary in Bulleen.",
      },
      {
        name: "Templestowe College (nearby)",
        note: "State co-ed secondary.",
      },
    ],
    highlights: [
      "Selective entry exam preparation",
      "VCE maths and sciences",
      "Online sessions or in-person at home",
    ],
  },
  {
    slug: "wheelers-hill",
    name: "Wheelers Hill",
    tier: 2,
    neighbouring: ["glen-waverley", "mount-waverley"],
    blurb:
      "Wheelers Hill sits next to John Monash Science School, one of Victoria's selective entry secondary schools, and that influences a lot of the local tutoring landscape — families often begin selective entry exam prep two years before Year 9 entry.",
    schools: [
      {
        name: "Wheelers Hill Secondary College",
        note: "Co-educational state secondary.",
      },
      {
        name: "John Monash Science School (nearby)",
        note: "Selective entry, Year 10-12, science and maths focus.",
      },
    ],
    highlights: [
      "John Monash Science School entry exam preparation",
      "Year 11-12 VCE Methods, Specialist Maths, Chemistry and Physics",
      "Online or in-person across Wheelers Hill",
    ],
  },

  // ---------- Tier 3 — good demand, less SEO competition ----------
  {
    slug: "burwood",
    name: "Burwood",
    tier: 3,
    neighbouring: ["mount-waverley", "box-hill", "blackburn"],
    blurb:
      "Burwood is bordered by Mount Waverley and Box Hill, sharing demand from both, and is also home to Mount Scopus and Deakin University. Tutoring here ranges across primary fundamentals to senior VCE preparation.",
    schools: [
      {
        name: "Mount Scopus Memorial College",
        note: "Independent Jewish school, ELC-12.",
      },
      {
        name: "Ashwood Secondary College",
        note: "State co-ed secondary.",
      },
    ],
    highlights: [
      "VCE preparation, particularly maths and sciences",
      "Primary and middle-school numeracy and literacy",
      "Online or in-person across Burwood",
    ],
  },
  {
    slug: "vermont",
    name: "Vermont",
    tier: 3,
    neighbouring: ["mitcham", "forest-hill", "ringwood"],
    blurb:
      "Vermont Secondary College is the centrepiece of the area's academic culture — a high-performing state school that consistently lifts students into top ATAR ranges. Most local tutoring is structured around the Vermont SC term plan.",
    schools: [
      {
        name: "Vermont Secondary College",
        note: "Strong VCE outcomes for a non-selective state school.",
      },
      {
        name: "Whitefriars College (Donvale, nearby)",
        note: "Catholic boys' secondary.",
      },
    ],
    highlights: [
      "VCE Methods, Specialist Maths and English",
      "Year 9-10 academic extension",
      "Sessions online or in-person around Vermont",
    ],
  },
  {
    slug: "blackburn",
    name: "Blackburn",
    tier: 3,
    neighbouring: ["box-hill", "forest-hill", "mitcham"],
    blurb:
      "Blackburn families spread across Blackburn High and a number of nearby independent schools. The area has a steady tutoring market focused on consolidating fundamentals through middle school and into VCE.",
    schools: [
      {
        name: "Blackburn High School",
        note: "Co-educational state secondary.",
      },
      {
        name: "Whitefriars College (Donvale)",
        note: "Catholic boys' secondary nearby.",
      },
      {
        name: "Forest Hill College (nearby)",
        note: "State co-ed secondary.",
      },
    ],
    highlights: [
      "Year 7-10 maths and English foundations",
      "VCE Methods and English preparation",
      "Online or in-person across Blackburn",
    ],
  },
  {
    slug: "mitcham",
    name: "Mitcham",
    tier: 3,
    neighbouring: ["blackburn", "vermont", "ringwood"],
    blurb:
      "Mitcham sits in the middle-east band of suburbs with broad school choice — Vermont SC, Mullauna and several independent options. Tutoring demand here is steadier than spiky, and many families use it as ongoing weekly support rather than as exam-driven help.",
    schools: [
      {
        name: "Mullauna College",
        note: "State co-ed secondary in Mitcham.",
      },
      {
        name: "Vermont Secondary College (nearby)",
        note: "Strong VCE outcomes.",
      },
    ],
    highlights: [
      "Weekly maths and English support across primary and secondary",
      "VCE preparation",
      "Online or in-person around Mitcham",
    ],
  },
  {
    slug: "ringwood",
    name: "Ringwood",
    tier: 3,
    neighbouring: ["mitcham", "vermont"],
    blurb:
      "Ringwood is the outer-east hub for school choice — Ringwood Secondary and Aquinas College both draw across the area, and Tintern Grammar sits just down the road. Families here often combine an in-person tutor for younger children with online help for VCE.",
    schools: [
      {
        name: "Ringwood Secondary College",
        note: "Co-educational state secondary.",
      },
      {
        name: "Aquinas College",
        note: "Catholic co-ed secondary in Ringwood.",
      },
      {
        name: "Tintern Grammar (nearby)",
        note: "Independent co-ed.",
      },
    ],
    highlights: [
      "Primary numeracy and literacy",
      "VCE preparation across maths, English and sciences",
      "Online or in-person across Ringwood",
    ],
  },
  {
    slug: "forest-hill",
    name: "Forest Hill",
    tier: 3,
    neighbouring: ["blackburn", "vermont", "box-hill"],
    blurb:
      "Forest Hill is bordered by Box Hill, Blackburn and Vermont, and families here often look to in-area independent and state schools rather than commuting further afield. Tutoring demand is concentrated in middle school and VCE.",
    schools: [
      {
        name: "Forest Hill College",
        note: "State co-ed secondary.",
      },
      {
        name: "Vermont Secondary College (nearby)",
        note: "Strong VCE outcomes.",
      },
      {
        name: "Whitefriars College (Donvale, nearby)",
        note: "Catholic boys' secondary.",
      },
    ],
    highlights: [
      "Year 7-10 maths and English foundations",
      "VCE preparation",
      "Online or in-person around Forest Hill",
    ],
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

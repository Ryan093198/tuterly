// State and territory layer for the worksheet pages.
//
// The 98 topic pages are shared by every state (the maths is the same;
// the questions are written to the Australian Curriculum). This file adds:
//   - STATES: the facts for each state hub (/worksheets/nsw etc.)
//   - topicNotes(slug): short "In NSW / In WA" notes for the topic pages
//     where a state teaches the topic at a different level.
//
// Facts checked 30 Oct 2026 against official sources (see `sources`),
// from STATE-PAGES-CHANGES.md. Items that report marked "Check" are left
// out on purpose. No state authority endorses Tuterly; copy says "covers
// the same maths", never "approved by" or "aligned to the syllabus".

export const NAPLAN_2027 = "10 to 22 March 2027";

// Topics that are not part of the revised WA curriculum (not even the
// Year 10 optional content), so they are left off the WA hub.
const WA_NOT_INCLUDED = new Set([
  "year-10a-logarithms",
  "year-10a-polynomials",
  "year-10a-exponential-log-equations",
]);

// Topics WA teaches as Year 10 optional content.
const WA_OPTIONAL = new Set([
  "year-10-simultaneous-equations",
  "year-10-algebraic-fractions",
  "year-10a-circle-theorems",
]);

const v9Group = (year) =>
  year === "Year 10A"
    ? { label: "Extension (beyond Year 10)", note: "Not part of the Year 10 Australian Curriculum. Useful for students heading to Mathematical Methods or Specialist maths." }
    : { label: year };

export const STATES = {
  nsw: {
    code: "nsw",
    abbr: "NSW",
    name: "New South Wales",
    curriculum: "NSW Mathematics K-10 Syllabus (2022)",
    curriculumShort: "the NSW Mathematics K-10 Syllabus",
    title: "Free Maths Worksheets for NSW, Years 7 to 10 (Stage 4 and 5) | Tuterly",
    description:
      "Free maths worksheets for NSW students in Years 7 to 10 (Stage 4 and Stage 5), with worked solutions. Topics laid out in Stage 4, Stage 5 and Path terms, plus 2027 term dates, selective test dates and NAPLAN.",
    h1: "Free maths worksheets for NSW, Stage 4 and Stage 5",
    lead:
      "Every Year 7 to 10 maths topic, with new questions each time and fully worked solutions. Laid out the NSW way: Stage 4, Stage 5 and the Path topics for students heading to Mathematics Advanced.",
    about: [
      "NSW teaches its own Mathematics K-10 Syllabus (2022), written by NESA. It started in Years 7 and 9 in 2024 and Years 8 and 10 in 2025.",
      "Years 7 and 8 are Stage 4 and Years 9 and 10 are Stage 5. Every student studies the Core. Schools add Path content to suit their students, and Path topics such as surds, logarithms and polynomials are the groundwork for Mathematics Advanced in Year 11.",
      "Tuterly's questions are written to the Australian Curriculum, which covers the same maths. The topic pages below are grouped in NSW terms so you can find what your child's class is on.",
    ],
    group: (year) => {
      if (year === "Year 7" || year === "Year 8") return { label: `${year} (Stage 4)` };
      if (year === "Year 9" || year === "Year 10") return { label: `${year} (Stage 5)` };
      return { label: "Stage 5 Path topics", note: "Extension content, often for students heading to Mathematics Advanced." };
    },
    terms: {
      note: "Eastern division, student dates. Western division schools start Term 1 a week later.",
      rows: [
        ["Term 4 2026", "13 Oct to 17 Dec"],
        ["Term 1 2027", "3 Feb to 9 Apr"],
        ["Term 2 2027", "29 Apr to 2 Jul"],
        ["Term 3 2027", "20 Jul to 24 Sep"],
        ["Term 4 2027", "11 Oct to 17 Dec"],
      ],
    },
    tests: [
      {
        name: "Opportunity Class Placement Test",
        when: "11 to 12 May 2027",
        body: "For entry to Year 5 opportunity classes. Computer-based, with a 40-minute Mathematical Reasoning test and no calculator.",
      },
      {
        name: "Selective High School Placement Test",
        when: "13 to 14 May 2027",
        body: "For Year 7 entry in 2028. Computer-based, with a 40-minute Mathematical Reasoning test and no calculator. From 2026 the tests are held only in NSW.",
      },
    ],
    senior: { cert: "HSC", courses: ["Mathematics Standard", "Mathematics Advanced", "Mathematics Extension 1", "Mathematics Extension 2"], note: "New senior maths syllabuses started in Year 11 in 2026 and are first examined in 2027." },
    faqs: [
      {
        q: "What are Stage 4 and Stage 5?",
        a: "In NSW, Years 7 and 8 are Stage 4 and Years 9 and 10 are Stage 5 of the Mathematics K-10 Syllabus (2022). Every student studies the Core, and schools add Path content to suit students and their plans for Year 11.",
      },
      {
        q: "My child is in an Advanced or Path class. Which worksheets should they use?",
        a: "Start with the topic pages for their year, then move to the Stage 5 Path topics such as surds, logarithms and polynomials. Those are the topics Mathematics Advanced builds on.",
      },
      {
        q: "Do these worksheets follow the NSW syllabus?",
        a: "They cover the same maths. The questions are written to the Australian Curriculum, and the topics are grouped here in NSW Stage 4, Stage 5 and Path terms. They aren't produced or endorsed by NESA.",
      },
      {
        q: "When is the selective high school test?",
        a: "For Year 7 entry in 2028, the Selective High School Placement Test is on 13 or 14 May 2027, and includes a 40-minute Mathematical Reasoning test. Check the NSW Department of Education page for your child's date.",
      },
    ],
    sources: [
      { label: "NESA: Mathematics K-10 course overview", url: "https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-k-10-2022/overview" },
      { label: "NSW Department of Education: 2027 school calendar", url: "https://www.education.nsw.gov.au/schooling/calendars/2027" },
      { label: "NSW Department of Education: placement tests", url: "https://education.nsw.gov.au/schooling/parents-and-carers/choosing-a-school-setting/selective-high-schools/placement-test" },
    ],
  },

  vic: {
    code: "vic",
    abbr: "VIC",
    name: "Victoria",
    curriculum: "Victorian Curriculum F-10 Version 2.0",
    curriculumShort: "the Victorian Curriculum 2.0",
    title: "Free Maths Worksheets for Victoria, Years 7 to 10A (Victorian Curriculum 2.0) | Tuterly",
    description:
      "Free maths worksheets for Victorian students in Years 7 to 10 and 10A, following the Victorian Curriculum 2.0. Worked solutions, plus 2027 term dates, the selective entry exam and NAPLAN.",
    h1: "Free maths worksheets for Victoria, Years 7 to 10A",
    lead:
      "Every Year 7 to 10A maths topic in the Victorian Curriculum 2.0, with new questions each time and fully worked solutions.",
    about: [
      "Victorian schools teach the Victorian Curriculum F-10 Version 2.0, VCAA's version of the Australian Curriculum. Government schools have taught Mathematics Version 2.0 in full since 2025.",
      "Year 10A is extension content for students heading to VCE Mathematical Methods and Specialist Mathematics. Many schools teach it alongside Year 10, or in an accelerated class.",
      "Tuterly is built in Melbourne by Bayside Academics, and the worksheet questions are calibrated to the Victorian Curriculum 2.0.",
    ],
    group: (year) =>
      year === "Year 10A"
        ? { label: "Year 10A", note: "Extension content for students heading to VCE Mathematical Methods or Specialist Mathematics." }
        : { label: year },
    terms: {
      note: "Government school dates. Students start Term 1 a day after teachers.",
      rows: [
        ["Term 4 2026", "5 Oct to 18 Dec"],
        ["Term 1 2027", "28 Jan to 25 Mar"],
        ["Term 2 2027", "12 Apr to 25 Jun"],
        ["Term 3 2027", "12 Jul to 17 Sep"],
        ["Term 4 2027", "4 Oct to 17 Dec"],
      ],
    },
    tests: [
      {
        name: "Selective entry high school exam",
        when: "June of Year 8",
        body: "For Year 9 entry to Melbourne High, Mac.Robertson Girls', Nossal and Suzanne Cory. The 2027-entry exam was on 20 June 2026. It tests reasoning and problem solving, and the maths won't go beyond the Year 8 curriculum.",
      },
    ],
    senior: { cert: "VCE", courses: ["Foundation Mathematics", "General Mathematics", "Mathematical Methods", "Specialist Mathematics"] },
    faqs: [
      {
        q: "Which curriculum do Victorian schools follow for maths?",
        a: "The Victorian Curriculum F-10 Version 2.0, written by VCAA. Government schools have taught Mathematics Version 2.0 in full since 2025.",
      },
      {
        q: "What is Year 10A maths?",
        a: "Year 10A is optional extension content beyond Year 10, such as surds, logarithms, polynomials and the sine and cosine rules. It's the groundwork for VCE Mathematical Methods and Specialist Mathematics.",
      },
      {
        q: "When is the selective entry exam?",
        a: "In June of Year 8, for Year 9 entry the next year. The exam for 2027 entry was on 20 June 2026. Dates for 2028 entry are published by ACER on the selective entry site.",
      },
      {
        q: "When do Victorian school terms run in 2027?",
        a: "Term 1 is 28 January to 25 March (students), Term 2 is 12 April to 25 June, Term 3 is 12 July to 17 September and Term 4 is 4 October to 17 December.",
      },
    ],
    sources: [
      { label: "Victorian Department of Education: curriculum programs", url: "https://www2.education.vic.gov.au/pal/curriculum-programs" },
      { label: "VIC.GOV.AU: school term dates and holidays", url: "https://www.vic.gov.au/school-term-dates-and-holidays-victoria" },
      { label: "VIC.GOV.AU: selective entry high schools", url: "https://www.vic.gov.au/selective-entry-high-schools" },
    ],
  },

  qld: {
    code: "qld",
    abbr: "QLD",
    name: "Queensland",
    curriculum: "Australian Curriculum v9 (Queensland)",
    curriculumShort: "the Australian Curriculum",
    title: "Free Maths Worksheets for Queensland, Years 7 to 10 (Australian Curriculum) | Tuterly",
    description:
      "Free maths worksheets for Queensland students in Years 7 to 10, following the Australian Curriculum v9. Worked solutions, plus 2027 term dates, the QASMT entrance test and NAPLAN.",
    h1: "Free maths worksheets for Queensland, Years 7 to 10",
    lead:
      "Every Year 7 to 10 maths topic in the Australian Curriculum, with new questions each time and fully worked solutions.",
    about: [
      "Queensland state schools teach the Australian Curriculum as written. Version 9 Mathematics must be fully in place by the end of 2026.",
      "Year 10A is not a level in the Australian Curriculum. The extension topics below go beyond Year 10 and suit students planning Mathematical Methods or Specialist Mathematics.",
    ],
    group: v9Group,
    terms: {
      rows: [
        ["Term 4 2026", "6 Oct to 11 Dec"],
        ["Term 1 2027", "27 Jan to 25 Mar"],
        ["Term 2 2027", "12 Apr to 25 Jun"],
        ["Term 3 2027", "12 Jul to 17 Sep"],
        ["Term 4 2027", "5 Oct to 10 Dec"],
      ],
    },
    tests: [
      {
        name: "Queensland Academies (QASMT) Year 7 entrance test",
        when: "September, applied for in Year 5",
        body: "Run by Edutest. Includes a 30-minute Numerical reasoning test and a 30-minute Mathematics test.",
      },
    ],
    senior: { cert: "QCE", courses: ["Essential Mathematics", "General Mathematics", "Mathematical Methods", "Specialist Mathematics"] },
    faqs: [
      {
        q: "Does Queensland use the Australian Curriculum?",
        a: "Yes. Queensland state schools teach the Australian Curriculum as written, and must teach Version 9 Mathematics by the end of 2026.",
      },
      {
        q: "What is in the QASMT entrance test?",
        a: "Queensland Academies says the Year 7 entrance test is run by Edutest and includes a 30-minute Numerical reasoning test and a 30-minute Mathematics test. Students apply in Year 5.",
      },
      {
        q: "What are the extension topics?",
        a: "Topics like surds, logarithms and the sine and cosine rules go beyond the Year 10 Australian Curriculum. Victoria calls them Year 10A. They are a good head start for Mathematical Methods.",
      },
    ],
    sources: [
      { label: "Queensland Department of Education: Australian Curriculum implementation", url: "https://education.qld.gov.au/curriculum/stages-of-schooling/australian-curriculum-implementation" },
      { label: "Queensland Department of Education: future term dates", url: "https://education.qld.gov.au/about-us/calendar/future-dates" },
      { label: "Queensland Academies: Year 7 enrolments", url: "https://qa.eq.edu.au/enrolments/year7-enrolments" },
    ],
  },

  wa: {
    code: "wa",
    abbr: "WA",
    name: "Western Australia",
    curriculum: "Western Australian Curriculum: Mathematics (revised, 2026)",
    curriculumShort: "the WA Mathematics curriculum",
    title: "Free Maths Worksheets for WA, Years 7 to 10 (2026 WA Curriculum) | Tuterly",
    description:
      "Free maths worksheets for Western Australian students in Years 7 to 10, laid out for the revised 2026 WA maths curriculum, including Year 10 optional content. Worked solutions, term dates, ASET and NAPLAN.",
    h1: "Free maths worksheets for WA, Years 7 to 10",
    lead:
      "Every Year 7 to 10 maths topic in the revised WA curriculum, with new questions each time and fully worked solutions. Topics that moved in 2026 are marked.",
    about: [
      "From 2026, every WA school teaches SCSA's revised Western Australian Curriculum: Mathematics, adapted from the Australian Curriculum v9 and the NSW syllabus.",
      "Some topics moved. Algebraic fractions, solving simultaneous equations algebraically and circle geometry are now Year 10 optional content. Congruence is in Year 9 and similar triangles in Year 10. Pythagoras starts in Year 8.",
      "Logarithm laws, the factor and remainder theorems and polynomials are not in the WA curriculum, so they are left off this page.",
    ],
    group: (year) =>
      year === "Year 10A"
        ? { label: "Year 10 optional and extension", note: "Optional content in WA, for students heading to Mathematics Methods. Some go beyond the WA curriculum." }
        : { label: year },
    hide: WA_NOT_INCLUDED,
    tag: (slug) => (WA_OPTIONAL.has(slug) ? "Year 10 optional" : slug === "year-8-congruence-similarity" ? "Year 9 and 10 in WA" : null),
    terms: {
      rows: [
        ["Term 4 2026", "12 Oct to 17 Dec"],
        ["Term 1 2027", "1 Feb to 9 Apr"],
        ["Term 2 2027", "26 Apr to 2 Jul"],
        ["Term 3 2027", "19 Jul to 24 Sep"],
        ["Term 4 2027", "11 Oct to 16 Dec"],
      ],
    },
    tests: [
      {
        name: "Gifted and Talented ASET",
        when: "Saturday 6 March 2027 (applications close 5 Feb 2027)",
        body: "For Year 7 entry in 2028, sat in Year 6. Covers reading comprehension, communicating ideas in writing, quantitative reasoning and abstract reasoning.",
      },
    ],
    senior: { cert: "WACE", courses: ["Mathematics Essential", "Mathematics Applications", "Mathematics Methods", "Mathematics Specialist"] },
    faqs: [
      {
        q: "Did the WA maths curriculum change in 2026?",
        a: "Yes. SCSA's revised Mathematics curriculum, adapted from the Australian Curriculum v9, must be taught in all WA schools from 2026.",
      },
      {
        q: "What happened to Year 10A in WA?",
        a: "WA has Year 9 and Year 10 optional content instead. Topics like algebraic fractions and solving simultaneous equations algebraically moved to optional content, and laws of logarithms and polynomials are not included.",
      },
      {
        q: "What is in the ASET?",
        a: "The Academic Selective Entrance Test has four parts: reading comprehension, communicating ideas in writing, quantitative reasoning and abstract reasoning. For 2028 entry, Year 6 students sit it on 6 March 2027.",
      },
      {
        q: "Do these worksheets follow the WA curriculum?",
        a: "They cover the same maths. The questions are written to the Australian Curriculum, and this page marks the topics WA teaches at a different level. They aren't produced or endorsed by SCSA.",
      },
    ],
    sources: [
      { label: "SCSA: Mathematics summary of changes, Years 7 to 10", url: "https://k10outline.scsa.wa.edu.au/home/teaching/curriculum-browser/mathematics-familiarisation-documents/MATHEMATICS_Summary-of-changes_7-10_For-familiarisation-in-2025.PDF" },
      { label: "WA Department of Education: future term dates", url: "https://www.education.wa.edu.au/future-term-dates" },
      { label: "WA Department of Education: ASET testing", url: "https://www.education.wa.edu.au/gifted-and-talented/testing" },
    ],
  },

  sa: {
    code: "sa",
    abbr: "SA",
    name: "South Australia",
    curriculum: "Australian Curriculum v9 (South Australia)",
    curriculumShort: "the Australian Curriculum",
    title: "Free Maths Worksheets for SA, Years 7 to 10 (Australian Curriculum) | Tuterly",
    description:
      "Free maths worksheets for South Australian students in Years 7 to 10, following the Australian Curriculum. Worked solutions, plus 2027 term dates, the IGNITE test and NAPLAN.",
    h1: "Free maths worksheets for South Australia, Years 7 to 10",
    lead:
      "Every Year 7 to 10 maths topic in the Australian Curriculum, with new questions each time and fully worked solutions.",
    about: [
      "South Australian schools teach the Australian Curriculum, and Year 7 is the first year of high school.",
      "Year 10A is not a level in the Australian Curriculum. The extension topics below go beyond Year 10 and suit students planning SACE Mathematical Methods or Specialist Mathematics.",
    ],
    group: v9Group,
    terms: {
      rows: [
        ["Term 4 2026", "12 Oct to 11 Dec"],
        ["Term 1 2027", "27 Jan to 9 Apr"],
        ["Term 2 2027", "26 Apr to 2 Jul"],
        ["Term 3 2027", "19 Jul to 24 Sep"],
        ["Term 4 2027", "11 Oct to 10 Dec"],
      ],
    },
    tests: [
      {
        name: "IGNITE entrance test",
        when: "February of Year 6",
        body: "For the IGNITE gifted programs at Aberfoyle Park, Glenunga International and The Heights School. An ACER test with Reading Comprehension, Written Expression, Mathematical Reasoning and Abstract Reasoning.",
      },
    ],
    senior: { cert: "SACE", courses: ["Essential Mathematics", "General Mathematics", "Mathematical Methods", "Specialist Mathematics"] },
    faqs: [
      {
        q: "Which curriculum do SA schools follow for maths?",
        a: "The Australian Curriculum. The topic pages below follow it, from Year 7 (the first year of high school in SA) to Year 10, plus extension topics.",
      },
      {
        q: "What is in the IGNITE test?",
        a: "Glenunga International High School says entry uses an ACER test with Reading Comprehension, Written Expression, Mathematical Reasoning and Abstract Reasoning, held each February for Year 6 students.",
      },
      {
        q: "Which SACE maths subject does Year 10 lead to?",
        a: "SACE offers Essential, General, Mathematical Methods and Specialist Mathematics. Students aiming for Methods or Specialist should work through the extension topics as well as Year 10.",
      },
    ],
    sources: [
      { label: "SA Department for Education: term dates", url: "https://www.education.sa.gov.au/parents-and-families/term-dates-south-australian-state-schools" },
      { label: "SA Department for Education: special interest and specialist programs", url: "https://www.education.sa.gov.au/parents-and-families/curriculum-and-learning/primary-and-secondary/special-interest-schools-and-programs/list-high-schools-special-interest-or-specialist-programs" },
      { label: "ACARA: implementation of the Australian Curriculum", url: "https://www.australiancurriculum.edu.au/help/f-10-curriculum-overview/implementation-of-the-australian-curriculum0" },
    ],
  },

  tas: {
    code: "tas",
    abbr: "TAS",
    name: "Tasmania",
    curriculum: "Australian Curriculum v9 (Tasmania)",
    curriculumShort: "the Australian Curriculum",
    title: "Free Maths Worksheets for Tasmania, Years 7 to 10 (Australian Curriculum) | Tuterly",
    description:
      "Free maths worksheets for Tasmanian students in Years 7 to 10, following the Australian Curriculum v9. Worked solutions, plus 2027 term dates and NAPLAN.",
    h1: "Free maths worksheets for Tasmania, Years 7 to 10",
    lead:
      "Every Year 7 to 10 maths topic in the Australian Curriculum, with new questions each time and fully worked solutions.",
    about: [
      "Tasmanian government schools have taught the Australian Curriculum v9 since 2023.",
      "Many students move to a college for Years 11 and 12. The extension topics below go beyond Year 10 and suit students planning TASC Mathematics Methods or Mathematics Specialised.",
    ],
    group: v9Group,
    terms: {
      note: "Tasmania has longer terms, with Term 2 starting in late April or May.",
      rows: [
        ["Term 4 2026", "19 Oct to 18 Dec"],
        ["Term 1 2027", "4 Feb to 9 Apr"],
        ["Term 2 2027", "26 Apr to 2 Jul"],
        ["Term 3 2027", "19 Jul to 24 Sep"],
        ["Term 4 2027", "11 Oct to 16 Dec"],
      ],
    },
    tests: [],
    senior: { cert: "TCE", courses: ["Mathematics Methods (Level 4)", "Mathematics Specialised (Level 4)"], lead: "Senior maths courses include" },
    faqs: [
      {
        q: "Which curriculum do Tasmanian schools follow for maths?",
        a: "The Australian Curriculum v9, taught in government schools since 2023. The topic pages below follow it from Year 7 to Year 10, plus extension topics.",
      },
      {
        q: "When do Tasmanian school terms run in 2027?",
        a: "Term 1 is 4 February to 9 April, Term 2 is 26 April to 2 July, Term 3 is 19 July to 24 September and Term 4 is 11 October to 16 December.",
      },
    ],
    sources: [
      { label: "DECYP: term dates", url: "https://www.decyp.tas.gov.au/learning/term-dates/" },
      { label: "ACARA: implementation of the Australian Curriculum", url: "https://www.australiancurriculum.edu.au/help/f-10-curriculum-overview/implementation-of-the-australian-curriculum0" },
    ],
  },

  act: {
    code: "act",
    abbr: "ACT",
    name: "Australian Capital Territory",
    curriculum: "Australian Curriculum v9 (ACT)",
    curriculumShort: "the Australian Curriculum",
    title: "Free Maths Worksheets for the ACT, Years 7 to 10 (Australian Curriculum) | Tuterly",
    description:
      "Free maths worksheets for Canberra and ACT students in Years 7 to 10, following the Australian Curriculum v9. Worked solutions, plus 2027 term dates and NAPLAN.",
    h1: "Free maths worksheets for the ACT, Years 7 to 10",
    lead:
      "Every Year 7 to 10 maths topic in the Australian Curriculum, with new questions each time and fully worked solutions.",
    about: [
      "ACT schools teach the Australian Curriculum version 9.0 from kindergarten to Year 10.",
      "Years 11 and 12 are at colleges, working towards the ACT Senior Secondary Certificate. The extension topics below go beyond Year 10 and suit students planning Mathematical Methods or Specialist maths.",
    ],
    group: v9Group,
    terms: {
      note: "New Year 1 to 10 students start Term 1 a day or two earlier.",
      rows: [
        ["Term 4 2026", "13 Oct to 18 Dec"],
        ["Term 1 2027", "2 Feb to 9 Apr"],
        ["Term 2 2027", "28 Apr to 2 Jul"],
        ["Term 3 2027", "20 Jul to 24 Sep"],
        ["Term 4 2027", "12 Oct to 17 Dec"],
      ],
    },
    tests: [],
    senior: { cert: "ACT Senior Secondary Certificate", courses: ["Mathematical Methods", "Specialist Methods", "Specialist Mathematics"], lead: "College maths courses include" },
    faqs: [
      {
        q: "Which curriculum do ACT schools follow for maths?",
        a: "The ACT Government says it teaches the Australian Curriculum version 9.0 from kindergarten to Year 10. The topic pages below follow it from Year 7 to Year 10, plus extension topics.",
      },
      {
        q: "When do ACT school terms run in 2027?",
        a: "Term 1 is 2 February to 9 April, Term 2 is 28 April to 2 July, Term 3 is 20 July to 24 September and Term 4 is 12 October to 17 December.",
      },
    ],
    sources: [
      { label: "ACT Government: what we teach", url: "https://www.act.gov.au/education-and-training/teaching-and-assessment/what-we-teach-curriculum" },
      { label: "ACT Government: school terms", url: "https://www.act.gov.au/living-in-the-act/public-holidays-school-terms-and-daylight-saving" },
    ],
  },

  nt: {
    code: "nt",
    abbr: "NT",
    name: "Northern Territory",
    curriculum: "Australian Curriculum v9 (Northern Territory)",
    curriculumShort: "the Australian Curriculum",
    title: "Free Maths Worksheets for the NT, Years 7 to 10 (Australian Curriculum) | Tuterly",
    description:
      "Free maths worksheets for Northern Territory students in Years 7 to 10, following the Australian Curriculum v9. Worked solutions, plus 2027 term dates and NAPLAN.",
    h1: "Free maths worksheets for the Northern Territory, Years 7 to 10",
    lead:
      "Every Year 7 to 10 maths topic in the Australian Curriculum, with new questions each time and fully worked solutions.",
    about: [
      "All NT schools teach the Australian Curriculum, overseen by the NT Board of Studies. Version 9 Mathematics has been in place since 2025.",
      "Senior students work towards the NTCET, which uses SACE subjects. The extension topics below go beyond Year 10 and suit students planning Mathematical Methods or Specialist Mathematics.",
    ],
    group: v9Group,
    terms: {
      note: "Student dates. Some schools differ.",
      rows: [
        ["Term 4 2026", "6 Oct to 10 Dec"],
        ["Term 1 2027", "27 Jan to 2 Apr"],
        ["Term 2 2027", "13 Apr to 18 Jun"],
        ["Term 3 2027", "13 Jul to 17 Sep"],
        ["Term 4 2027", "5 Oct to 9 Dec"],
      ],
    },
    tests: [],
    senior: { cert: "NTCET", courses: ["Essential Mathematics", "General Mathematics", "Mathematical Methods", "Specialist Mathematics"] },
    faqs: [
      {
        q: "Which curriculum do NT schools follow for maths?",
        a: "All NT schools deliver the Australian Curriculum, and Version 9 Mathematics has been in place since 2025. The topic pages below follow it from Year 7 to Year 10, plus extension topics.",
      },
      {
        q: "When do NT school terms run in 2027?",
        a: "Term 1 is 27 January to 2 April, Term 2 is 13 April to 18 June, Term 3 is 13 July to 17 September and Term 4 is 5 October to 9 December (student dates).",
      },
    ],
    sources: [
      { label: "NT.GOV.AU: NT school curriculum", url: "https://nt.gov.au/learning/primary-and-secondary-students/nt-school-curriculum" },
      { label: "NT.GOV.AU: school term dates", url: "https://nt.gov.au/learning/primary-and-secondary-students/school-term-dates-in-nt" },
    ],
  },
};

export const STATE_CODES = Object.keys(STATES);

// ---------------------------------------------------------------------
// Notes on the shared topic pages.
// Every Year 10A page explains what 10A is; a few pages add a note where
// NSW or WA teach the topic at a different level.

const TEN_A_GENERAL =
  "Year 10A is Victoria's name for extension content that goes beyond Year 10. Other states don't use the label, but the maths is the same, and it suits students heading to Mathematical Methods or Specialist maths in Year 11.";

const NOTES = {
  "year-9-pythagoras": { wa: "Pythagoras' theorem starts in Year 8 in WA, so this is revision and extension there." },
  "year-8-congruence-similarity": { wa: "Congruence is taught in Year 9 and similar triangles in Year 10 in WA." },
  "year-10-simultaneous-equations": {
    wa: "Solving simultaneous equations algebraically is Year 10 optional content in WA.",
    nsw: "Solving simultaneous equations algebraically is Stage 5 Path content in NSW.",
  },
  "year-10-algebraic-fractions": { wa: "Algebraic fractions are Year 10 optional content in WA." },
  "year-10a-circle-theorems": { wa: "Circle geometry is Year 10 optional content in WA." },
  "year-10a-logarithms": { wa: "Laws of logarithms are not part of the WA curriculum (Year 7 to 10)." },
  "year-10a-polynomials": { wa: "Polynomials and the factor and remainder theorems are not part of the WA curriculum (Year 7 to 10)." },
  "year-10a-exponential-log-equations": { wa: "Logarithms are not part of the WA curriculum (Year 7 to 10)." },
};

// Returns { tenA: string|null, notes: [{ state, text }] } or null.
export function topicNotes(slug, yearLevel) {
  const isTenA = yearLevel === "Year 10A";
  const extra = NOTES[slug] || {};
  const notes = [];
  if (isTenA) notes.push({ state: "NSW", text: "Extension work in Years 9 and 10 sits in the Stage 5 Paths, often for students heading to Mathematics Advanced." });
  else if (extra.nsw) notes.push({ state: "NSW", text: extra.nsw });
  if (extra.wa) notes.push({ state: "WA", text: extra.wa });
  else if (isTenA) notes.push({ state: "WA", text: "These sit in Year 10 optional content in WA, or go beyond it." });
  if (!isTenA && notes.length === 0) return null;
  return { tenA: isTenA ? TEN_A_GENERAL : null, notes };
}

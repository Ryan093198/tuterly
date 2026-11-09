// Tutoring company review pages (Ryan, 9 Nov 2026): /parents/<slug>.
// Brand searches, Australia (Keyword Planner, Nov 2026). Facts only from
// each company's own website, checked 9 Nov 2026. Where a company doesn't
// publish prices, say so and compare with the Melbourne average for a
// private tutor (about $80 an hour, Ryan): never present it as their price.

export const TUTOR_AVG = 80; // Melbourne private tutor, average per hour

export const BRANDS = [
  {
    slug: "mathnasium-review",
    name: "Mathnasium",
    searches: "3,600",
    site: "https://www.mathnasium.com/au/maths-centres",
    priceKnown: false,
    priceLine: "Mathnasium doesn't publish prices: there's a flat enrolment fee, and pricing varies by program and centre.",
    format: "Maths only, Kindergarten to Year 10, in a centre, online (Mathnasium@Home) or both",
    sessions: "2 to 3 sessions a week recommended until goals are met",
    where: "Centres in NSW, the ACT and Queensland, with Victoria opening soon; online elsewhere",
    how: [
      ["An assessment first", "A diagnostic assessment finds strengths and gaps, and sets a customised learning plan."],
      ["In a centre or online", "Students learn at a local centre, online through Mathnasium@Home, or a mix of both."],
      ["Two or three times a week", "Mathnasium recommends 2 to 3 sessions a week until learning goals are met, with flexible scheduling."],
      ["Homework help, no homework", "It doesn't set homework, but sessions include time to help with school homework."],
    ],
    suits: [
      "Primary and early secondary students who need a structured maths program several times a week.",
      "Families near a centre (NSW, the ACT or Queensland), or happy to learn online.",
      "Students who need to rebuild foundations, not just prepare for this term's test.",
    ],
    weaker: "It's a bigger commitment of time and money if what your child mainly needs is practice on this term's school topics before a test, and centres aren't open in Victoria yet.",
  },
  {
    slug: "success-tutoring-review",
    name: "Success Tutoring",
    searches: "2,900",
    site: "https://successtutoring.com.au/",
    priceKnown: false,
    priceLine: "Success Tutoring doesn't publish prices: it's a weekly membership, with flexible weekly payments and no contract.",
    format: "English and maths, face to face at a local centre, on a membership",
    sessions: "Sessions available every day of the week",
    where: "Centres across Australia, including Victoria; find a centre on its website",
    how: [
      ["A free assessment", "A no-obligation diagnostic assessment in English and maths, then a learning plan."],
      ["Face to face at a centre", "Students attend a local centre; programs adapt to progress rather than set worksheets."],
      ["A weekly membership", "Flexible weekly payments with no lock-in contract: 2 weeks' notice to cancel, and you can pause."],
      ["Any day of the week", "Sessions run every day, so you choose times that fit."],
    ],
    suits: [
      "Families who want regular face-to-face help at a centre nearby.",
      "Students who need both English and maths support.",
      "Families who prefer a weekly membership without a contract.",
    ],
    weaker: "It's a weekly cost on top of school for in-centre time, which is more than you need if your child mainly needs practice on the maths topics they keep getting wrong.",
  },
  {
    slug: "ezymath-review",
    name: "Ezy Math Tutoring",
    searches: "1,900",
    site: "https://www.ezymathtutoring.com.au/tutoring/maths/",
    priceKnown: false,
    priceLine: "Ezy Math Tutoring doesn't publish lesson rates on its website: you request a trial lesson and get a quote.",
    format: "A maths tutor who comes to your home, Year 3 to Year 12",
    sessions: "Usually a weekly lesson, booked with your tutor",
    where: "Sydney, Melbourne, Brisbane, Perth and Adelaide",
    how: [
      ["A trial lesson", "Request a first trial lesson to find problem areas and check you like the tutor."],
      ["A matched local tutor", "A matching service pairs your child with a local tutor experienced with their age group."],
      ["Screened tutors", "Tutors go through screening, skill profiling, tutorial simulations and a working-with-children check."],
      ["At home", "Lessons are in your home, from Year 3 to Year 12, including senior maths."],
    ],
    suits: [
      "Families who want one-on-one help at home, in person.",
      "Students in senior years who need a specialist maths tutor.",
      "Families in the five capital cities it serves.",
    ],
    weaker: "In-home one-on-one tutoring is usually the most expensive option, and the help happens once a week, so it pays to have practice set up for the days in between.",
  },
  {
    slug: "kip-mcgrath-review",
    name: "Kip McGrath",
    searches: "880",
    site: "https://www.kipmcgrath.com.au/",
    priceKnown: true,
    price: 78,
    priceLine: "Kip McGrath lists an RRP of $78 a session; prices vary by centre.",
    format: "English and maths, ages 6 to 16, in a centre or live online",
    sessions: "Most children attend once a week, one subject per session",
    where: "More than 140 locations across Australia, plus online",
    how: [
      ["A free assessment", "A free initial assessment finds strengths and learning gaps."],
      ["Once a week", "Most children attend once a week, focusing on one subject per session."],
      ["Centre or online", "Lessons at a local centre, or live online with video and voice."],
      ["English and maths", "English, reading, spelling, comprehension and maths, for ages 6 to 16."],
    ],
    suits: [
      "Primary and early secondary students who need English and maths support.",
      "Families who want a local centre, with more than 140 across Australia.",
      "Families who want a weekly routine with a tutor.",
    ],
    weaker: "One weekly session covers one subject, so maths practice in the rest of the week still matters, especially before a test.",
  },
];

export const getBrand = (slug) => BRANDS.find((b) => b.slug === slug) || null;

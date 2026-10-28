// Single source of truth for the Tuterly app (the Years 7 to 10
// maths "snap your mistakes" iPhone app). Every app button on the site
// (components/StudyAppCTA.jsx), the home page, the Smart App Banner in
// app/layout.js and the blog writer read from here.
//
// GOING LIVE: set stage to "live" and fill in appStoreUrl + appStoreId.
// Every button then switches to "Download free on the App Store" (with a
// QR code on desktop) and iPhone Safari shows the Smart App Banner. No
// other code change is needed.
//
// The name is still a working title: keep it here only and read
// STUDY_APP.name everywhere else.
export const STUDY_APP = {
  name: "Tuterly",
  stage: "pilot", // "pilot" | "live"
  appStoreUrl: null, // set when live, e.g. "https://apps.apple.com/au/app/id..."
  appStoreId: null, // numeric App Store id, for the Smart App Banner
  testflightUrl: null, // public TestFlight link, if one is opened
  // Shown in the FAQ, the tutoring comparison, CTA buttons and the home
  // description. Keep it matching the real App Store pricing.
  // The live button says "Download free on the App Store": only go live
  // with that label if the download really is free (free tier or trial).
  priceLine: "1-week free trial, then $7.99 a week",
  trialDays: 7,
  priceWeek: 7.99, // AUD, billed weekly
  // $7.99 a week is less than 10 minutes with a private tutor at $80 an
  // hour ($13.33), the low end of PRICING.tutorCompareLow/High.
  priceVsTutor: "A whole week costs less than 10 minutes with a private tutor.",
};

// Live only counts once there is somewhere to send people.
export function isStudyAppLive() {
  return STUDY_APP.stage === "live" && !!STUDY_APP.appStoreUrl;
}

// Facts the site is allowed to state about the app. Kept next to the
// config so copy, schema and the blog writer stay in step.
export const STUDY_APP_FACTS = {
  years: "Years 7 to 10",
  subject: "maths",
  curriculum: "Victorian Curriculum 2.0",
  platform: "iPhone",
  // The Victorian Curriculum F–10 "incorporates and reflects much of the
  // Australian Curriculum" (VCAA). Don't claim it follows other states' syllabuses.
  madeBy: "Designed by Australian educators at Bayside Academics, Brighton, Melbourne",
};

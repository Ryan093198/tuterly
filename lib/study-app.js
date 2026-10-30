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
  playStoreUrl: null, // set when live on Android, e.g. "https://play.google.com/store/apps/details?id=..."
  testflightUrl: null, // public TestFlight link, if one is opened
  // Shown in the FAQ, the tutoring comparison, CTA buttons and the home
  // description. Keep it matching the real App Store pricing.
  // The live button says "Download free on the App Store": only go live
  // with that label if the download really is free (free tier or trial).
  // Public price $15.99 a week. Anyone who signs up before launch pays
  // $7.99 a week for as long as their subscription stays active (50% off,
  // the same as Bayside Academics students). The 1-week trial is for all.
  priceLine: "1-week free trial, then $7.99 a week if you sign up before launch (usually $15.99)",
  offerShort: "50% off for life when you sign up before launch",
  trialDays: 7,
  priceWeek: 15.99, // AUD, billed weekly: the public price
  earlyPriceWeek: 7.99, // early sign-up price, for life
  // $7.99 a week is less than 10 minutes with a private tutor at $80 an
  // hour ($13.33), the low end of PRICING.tutorCompareLow/High.
  priceVsTutor: "At $7.99, a whole week costs less than 10 minutes with a private tutor.",
};

// Live only counts once there is somewhere to send people.
export function isStudyAppLive() {
  return STUDY_APP.stage === "live" && !!(STUDY_APP.appStoreUrl || STUDY_APP.playStoreUrl);
}

// Facts the site is allowed to state about the app. Kept next to the
// config so copy, schema and the blog writer stay in step.
export const STUDY_APP_FACTS = {
  years: "Years 7 to 10",
  subject: "maths",
  curriculum: "Australian Curriculum, including the Victorian Curriculum 2.0",
  platform: "iPhone and Android",
  // The app's topics are built on the Victorian Curriculum 2.0, which is
  // Victoria's version of the Australian Curriculum v9 (Oct 2026: wording
  // changed for the state pages). Don't claim it follows NSW or WA
  // syllabuses; say "covers the same maths" there.
  madeBy: "Designed by Australian educators at Bayside Academics, Brighton, Melbourne",
};

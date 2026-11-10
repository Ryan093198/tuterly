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
  // with that label if the download really is free.
  // Two plans at the launch price, 50% off until 31 March 2027: $8.99 a
  // week or $29.99 a month, then $17.99 or $59.99 from 1 April 2027. No
  // free trial (dropped by Ryan, 11 Nov 2026). No yearly plan. These
  // strings are plain text, so they leave out the end date and "50% off"
  // (see lib/study-launch.js); where the end date shows, use
  // components/study/LaunchPrice.jsx.
  priceLine: "$8.99 a week or $29.99 a month at the launch price (from 1 April 2027, $17.99 a week or $59.99 a month)",
  offerShort: "$8.99 a week or $29.99 a month at the launch price",
  priceWeek: 8.99, // AUD, billed weekly: launch price until 31 March 2027
  priceMonth: 29.99, // AUD, billed monthly: launch price until 31 March 2027
  fullPriceWeek: 17.99, // from 1 April 2027
  fullPriceMonth: 59.99, // from 1 April 2027
  trialDays: 0, // no free trial since 11 Nov 2026
  // $8.99 a week is less than 10 minutes with a private tutor at $80 an
  // hour ($13.33), the low end of PRICING.tutorCompareLow/High.
  priceVsTutor: "At $8.99, a whole week costs less than 10 minutes with a private tutor.",
};

// Checkout on the website (Stripe, live since 31 Oct 2026). Buttons only
// point here once the app is live, because buyers need the app to use it.
export const STUDY_CHECKOUT = { plus: "/study/plus", scholarship: "/study/scholarship" };

// The label and link for every simple "get the app" button outside
// StudyAppCTA (tool results, topic pages). Before launch it goes to the
// early sign-up form; once STUDY_APP.stage is "live" (and the App Store
// link is set) every one of them switches to checkout.
export function appCta() {
  return isStudyAppLive()
    ? { live: true, label: "Get Tuterly", href: STUDY_CHECKOUT.plus }
    : { live: false, label: "Sign up early", href: "/#get-app" };
}

// Live only counts once there is somewhere to send people. The app is on
// iPhone first, so live means the App Store link is set. A Google Play
// button only ever shows when playStoreUrl is set as well.
export function isStudyAppLive() {
  return STUDY_APP.stage === "live" && !!STUDY_APP.appStoreUrl;
}

// "Is Tuterly on Android?" for every app FAQ list (lib/study-faqs.js,
// lib/student-pages.js, lib/exam-prep-pages.js), so the visible FAQ and
// its FAQPage schema say the same thing everywhere. The "On Android?"
// link is on every app sign-up (components/StudyAppCTA.jsx).
export function androidFaq() {
  const name = STUDY_APP.name;
  if (STUDY_APP.playStoreUrl) {
    return { q: `Is ${name} on Android?`, a: `Yes. ${name} is on iPhone from the App Store and on Android from Google Play.` };
  }
  return {
    q: `Is ${name} on Android?`,
    a: `Not yet. ${name} is on iPhone at launch, and Android is coming soon. Tap "On Android?" next to any sign-up button and leave your email, and we'll tell you when it's on Android.`,
  };
}

// Facts the site is allowed to state about the app. Kept next to the
// config so copy, schema and the blog writer stay in step.
export const STUDY_APP_FACTS = {
  years: "Years 7 to 10",
  subject: "maths",
  curriculum: "Australian Curriculum, including the Victorian Curriculum 2.0",
  platform: "iPhone, with Android coming soon",
  // The app's topics are built on the Victorian Curriculum 2.0, which is
  // Victoria's version of the Australian Curriculum v9 (Oct 2026: wording
  // changed for the state pages). Don't claim it follows NSW or WA
  // syllabuses; say "covers the same maths" there.
  madeBy: "Designed by Australian educators at Bayside Academics, Brighton, Melbourne",
};

import { STUDY_APP, isStudyAppLive } from "@/lib/study-app";

// FAQ for the Tuterly Study home page. Rendered on the page and as
// FAQPage schema, so the two always match. Answers switch with the stage
// in lib/study-app.js.
export function getStudyFaqs() {
  const name = STUDY_APP.name;
  const live = isStudyAppLive();
  return [
    {
      q: "Which year levels and subjects does it cover?",
      a: `Years 7 to 10 maths, following the Victorian Curriculum 2.0. It doesn't cover VCE or other subjects yet.`,
    },
    {
      q: live ? "How do we get it?" : "Can we download it now?",
      a: live
        ? `Download ${name} from the App Store on an iPhone.`
        : `Not yet. ${name} is in a small pilot with Bayside Academics students through Apple's TestFlight, and it isn't on the App Store yet. Leave your email and we'll tell you when it launches.`,
    },
    {
      q: "Is it on Android or iPad?",
      a: `It's built for iPhone. iPad and Android aren't supported yet. Android is planned but there's no date. Leave your email and we'll let you know.`,
    },
    {
      q: "How much does it cost?",
      a: live
        ? STUDY_APP.priceLine
        : `It's free during the pilot. Pricing will be a subscription, set after the pilot, and we'll show you the price before you pay anything.`,
    },
    {
      q: "What happens to the photos of my child's work?",
      a: `Photos are stored privately, and the only people who can see them are your child and any tutor they link. They are processed by our AI service to read and solve the question. Parents see topics, counts and test scores, not the photos. Photos and questions are never reused for anyone else, and your child can delete a question, or their whole account, at any time.`,
    },
    {
      q: `What does "fixed" mean?`,
      a: `A question counts as fixed when your child gets a new version of it right in two practice tests on different days. Fixed questions drop out of that topic's tests. A wrong answer later sends it back to "to fix".`,
    },
    {
      q: "Is the new question really different from the one they got wrong?",
      a: `Yes. It tests the same concepts but changes at least two things, such as the context, the structure, the layout or the type of numbers. Changing only the numbers isn't allowed. Each generated question is solved a second time by an independent check before your child sees it.`,
    },
    {
      q: "Does it replace a tutor?",
      a: `It depends on the family. ${name} works on the questions your child gets wrong, every day they use it. A tutor can explain things in different ways and plan what to learn next. Some families will use both: tutors can link to the app, see the bank before a session and set snap goals.`,
    },
    {
      q: "Who makes it?",
      a: `Bayside Academics, a tutoring business in Brighton, Melbourne, which also runs Tuterly.`,
    },
  ];
}

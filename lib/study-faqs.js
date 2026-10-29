import { STUDY_APP, isStudyAppLive } from "@/lib/study-app";
import { STUDY_RESULTS } from "@/lib/study-results";
import { GUARANTEE } from "@/lib/guarantee";

// FAQ for the Tuterly home page. Rendered on the page and as
// FAQPage schema, so the two always match. Answers switch with the stage
// in lib/study-app.js.
// home: true marks the 8 questions shown on the home page (and in its
// FAQPage schema); /faq-style pages can show them all.
export function getStudyFaqs({ home = false } = {}) {
  const name = STUDY_APP.name;
  const live = isStudyAppLive();
  const all = [
    {
      q: "Which year levels and subjects does it cover?",
      home: true,
      a: `Years 7 to 10 maths, following the Victorian Curriculum 2.0 (which incorporates much of the Australian Curriculum). It doesn't cover VCE or other subjects yet.`,
    },
    {
      q: live ? "How do we get it?" : "Can we download it now?",
      home: true,
      a: live
        ? `Download ${name} free from the App Store on iPhone, or from Google Play on Android.`
        : `Not yet. ${name} is in a small pilot with Bayside Academics students through Apple's TestFlight, and it isn't on the App Store or Google Play yet. Leave your email and we'll tell you when it launches.`,
    },
    {
      q: "Is it on Android?",
      a: `${name} is coming to both iPhone and Android. Leave your email and we'll tell you as soon as it's ready.`,
    },
    {
      q: "How much does it cost?",
      home: true,
      a: `There's a 1-week free trial, then it's $15.99 a week. Sign up before launch and you'll pay $7.99 a week for as long as you stay subscribed: 50% off, the same price Bayside Academics students pay. ${STUDY_APP.priceVsTutor}`,
    },
    {
      q: "Is there a money-back guarantee?",
      home: true,
      a: `Yes. If your child uses ${name} every week for ${GUARANTEE.months} months (in each week, at least one question added with a photo, one drill and one practice test, which the app records) and their school maths marks haven't improved, we refund every subscription payment from those ${GUARANTEE.months} months. Compare a school maths mark from before they started with one from the last 2 months, and email us within ${GUARANTEE.claimDays} days. The full conditions are at tuterly.com.au/guarantee.`,
    },
    {
      q: "Can it use my child's actual school tests?",
      home: true,
      a: `Yes. Your child can upload a whole test or practice paper: photos of each page, a PDF or a Word document. ${name} finds each question, automatically stores the ones marked wrong, and writes a fresh question on each one, so their practice matches what they're doing at school.`,
    },
    {
      q: "Can I upload things as a parent?",
      a: `Yes. From your linked account you can upload your child's marked school tests, practice tests and papers (photos, a PDF or a Word document), and the questions go into their bank. You can also upload the term planner or course outline from school, and ${name} focuses their topic tests on what's coming up this term.`,
    },
    {
      q: "Can they practise a topic before they've got anything wrong?",
      a: `Yes. Test any topic writes a short practice test on any topic in their year, one question from each part of the topic, even if they haven't snapped anything yet. The questions they get wrong go into their bank.`,
    },
    {
      q: "What happens to the photos of my child's work?",
      home: true,
      a: `Photos are stored privately, and the only people who can see them are your child and any tutor they link. They are processed by our AI service to read and solve the question. Parents see topics, counts and test scores, not the photos. Photos and questions are never reused for anyone else, and your child can delete a question, or their whole account, at any time.`,
    },
    {
      q: "Does it just give my child the answers?",
      home: true,
      a: `No. Every question has a full worked solution, but it's hidden until your child chooses to see it, so they can try again first. Then ${name} gives them a similar question on the same idea to solve themselves: they type the answer and the app checks it. A question only counts as mastered once they've got similar ones right, and Week in review shows you how many they got right.`,
    },
    {
      q: `What does "mastered" mean?`,
      a: `Each question goes from To fix, to Learning, to Mastered. Your child gets a star for each similar question they get right, and a question is mastered at three stars, or when they tap "I've got it". After that they can try a harder one.`,
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
      q: "Does it actually improve marks?",
      home: true,
      a: `At Bayside Academics it has. ${STUDY_RESULTS.line} (${STUDY_RESULTS.finePrint}) Every child is different, and it works best when they snap the questions they get wrong as they go.`,
    },
    {
      q: "Does it follow the Australian curriculum?",
      a: `Its topics follow the Victorian Curriculum 2.0 for Years 7 to 10 maths, which incorporates much of the Australian Curriculum. Every question is filed under a topic from your child's year level. And because your child can upload their actual school tests and practice papers, their practice also matches what their own teacher set.`,
    },
    {
      q: "Who makes it?",
      a: `Tuterly has been carefully designed by Australian educators at Bayside Academics, one of the leading tutoring companies in Melbourne. They set how it explains each step, what makes a good practice question and when a question counts as mastered.`,
    },
  ];
  return home ? all.filter((f) => f.home) : all;
}

# Tuterly site redesign: notes for approval (27 Oct 2026)

Branch `tuterly-site-redesign` (on top of `tuterly-study-funnel`). Not pushed, not deployed.

## Copy I added (please approve)

**Home**
- Hero secondary link: "See how it works →"
- How it works, step captions (steps 1 and 2 reuse your existing wording):
  - 3 "See the worked solution": "The key idea, then each step, when they want it."
  - 4 "Master it": "Getting a similar one right earns a star. Three stars, or tapping I've got it, and the question is mastered. Then they can try a harder one."
- For parents captions: "Week in review": "Your child's weekly recap. You see the same numbers." / "The bank by topic": "Every question, with a progress ring for each topic." Link: "More for parents →"
- Practice and notes section:
  - Eyebrow "Practice and study notes"; heading "Test any topic. Make study notes."
  - Lead: "A short test on any topic in their year, even with nothing snapped yet. The ones they get wrong go into their bank."
  - Captions: "Test any topic: Pick a topic from their year." / "Answer each question: With maths keys for the answer." / "See the score: The ones they got wrong go into their bank."
  - Notes band: eyebrow "Study notes", heading "A revision sheet on any topic.", line "On a whole topic, or on just the questions they find hard."
  - Captions: "Pick the topics: The whole topic, or just what they find hard." / "Get a revision sheet: One page, to download or share as a PDF."
- Features: eyebrow "In the app", heading "Everything they need to fix their mistakes.", and the tile text:
  - The bank: "Every question they've snapped, by topic, with a progress ring for each."
  - Test any topic: "A short test on any topic in their year, even with nothing snapped."
  - Study notes: "A revision sheet, to download or share as a PDF."
  - Fix my mistakes: "The questions they got wrong, one after another."
  - Streaks and goals: "A weekly streak and this week's goals, with XP and stars."
  - Upload a whole test: "Photos of each page, a PDF or a Word document. The wrong ones come pre-ticked."

**Parents**
- Heading "What you see each week." (was "What you see, and what you don't.")
- Eyebrow "Safety and privacy"; card heading "Their data stays theirs".
- Eyebrow "Price".

**Everywhere**
- Alt text on every screenshot (describes the real screen), and Quinn: "Quinn the quokka, the Tuterly Study mascot".
- The final CTA band on other pages reuses the home page's closing words.

## Factual corrections for build 11 (you OK'd these)
- "fixed" → "mastered" wherever it meant a question the student has got: hero lines (home, parents), how-it-works heading, comparison row, the CTA defaults and banner, home meta description, the waitlist email, Learn cards, tutoring-page blocks, worksheets and ATAR cards, the 11 Learn articles' app line, and the blog writer's CTA.
- Removed the old rule (right in two tests on different days) and the invented ring/summary numbers ("6 to fix · 9 fixed", "7 snapped · 4 fixed · 11 to go").
- How-it-works step 3 now describes stars and mastered (from TUTERLY-STUDY-FEATURES.md).
- "Why practising your own mistakes" ends: "a new similar question each time, and a weekly review of the week's questions."
- FAQ "What does 'mastered' mean?" rewritten from the features file.
- Parents: weekly-summary bullets now match Week in review. Dropped "progress on any snap goal" (the features file doesn't show parents snap goals). Added "You can set a test on any topic for your child."
- Blog writer's product facts updated to build 11.
- Privacy and terms lost their "← Back to login" link (the shared nav has Log in).

## Placeholders
None: every screen I used is in public/app-screens. Not used: flow-snap/01-home (same as home.png), flow-practice/01 and 05, flow-notes/02, bank.png (same as flow-parent/02).

## Decisions and exceptions
- Dashboard and account pages keep Inter (dense tables); they only change colour.
- Small teal text uses #0A7088 (new `--brand-text`) instead of the app's #0E9FBF, which is 3.1:1 on white. Buttons keep #0E9FBF with 19px bold labels (counts as large text); dark-mode buttons use dark text.
- No final app CTA band on: VCE tutoring, primary-only pages (primary practice tests, scholarship and selective prep), /find-a-tutor (the tutor destination), the ATAR planner (keeps its soft card), Learn articles (they already end with an app card) and privacy/terms.
- Worksheet pages stay light in dark mode (an existing rule in WorksheetGenerator, so the worksheet stays readable).
- Floating "Enquire" button is hidden on / and /parents (one primary action).
- Sentry Session Replay now loads from Sentry's CDN after the page is idle, instead of being bundled into every page. Same sample rates.

## Lighthouse (mobile, local production build, 3 runs)
DevTools throttling (closest to a real phone):
- Home: 83, 80, 79. LCP 1.7 to 1.8s, CLS 0.006.
- Parents: 85, 84, 83. LCP 1.7 to 1.9s, CLS 0.016.
- Today's home (/parents content), same method: 74, 77. LCP 2.5 to 2.7s, CLS 0.12.
Accessibility: home 100, parents 100, a suburb page 98 (an existing heading-order issue in the sample report), a Learn article 100.

LCP is under 2.5s, but Performance is short of 90. What's left is JavaScript that every page loads: Next.js plus Sentry (error and performance monitoring, about 430 KB before compression). Getting to 90 means trimming Sentry in the browser (for example no client performance tracing on marketing pages). That's a monitoring decision, so I haven't made it.

## SEO check
156 pages compared with the funnel branch: titles, canonicals, meta descriptions, H1s and structured data are unchanged everywhere except the home page (description and FAQ schema now say "mastered"). The only new heading on SEO pages is the final CTA band's.

## Changes from Ryan, 27 Oct (evening)
- New home section "Straight from school": upload a real test (photos, PDF or Word), the wrong ones come pre-ticked, a fresh question on each. Hero line now mentions uploading a whole school test.
- Practice tests on any topic moved up, straight after it, with a stronger heading ("A practice test on any topic, whenever they want.").
- Two new FAQs: using actual school tests, and practising a topic before anything's wrong.
- Price: "Free trial, then $49 a month" (about $11 a week) everywhere the app's price shows (lib/study-app.js priceLine / priceWeekly). Pilot students use it free.
- Comparison: private tutor "Usually $80 to $100 an hour in Melbourne"; what it works on: "The difficult questions, and the ones your child hasn't fully understood, until each one is fully mastered."
- How it works step 1 now shows the home screen (Snap a question); the snap menu moved to the school-tests section.
- Still to reconcile: /tutoring-prices-melbourne says $50 to $80 an hour for Years 7 to 10, so the two pages disagree.

## Changes from Ryan, 27 Oct (night): "not just an AI app"
- New section on home (after How it works) and /parents: "Designed by Australian educators. Not just an AI app." Four cards: Designed by Australian educators / Built on the curriculum / Aligned with their school / Rules first, then a second check (components/study/MadeByEducators.jsx).
- Home hero: two badges under the pitch, "Designed by Australian educators" and "Victorian Curriculum 2.0".
- FAQ: new "Is it just another AI app?" and "Does it follow the Australian curriculum?"; "Who makes it?" now says Australian educators at Bayside Academics.
- Tutoring pages: the app blurb and the competitor-page facts mention Australian educators and the Victorian Curriculum.
- Curriculum wording: VCAA says the Victorian Curriculum F–10 "incorporates and reflects much of the Australian Curriculum", so the site says "incorporates much of the Australian Curriculum". It doesn't claim to follow NSW or other state syllabuses.
- Phone frames: frames now always size to the screenshot (the step carousel on phones was stretching them).

## Changes from Ryan, 27 Oct (late): price
- Price is now a 1-week free trial, then $7.99 a week (lib/study-app.js). Removed $49 a month, "about $11 a week" and "Students in the current pilot use it free" everywhere, including the blog writer.
- New price block on home (after the comparison) and /parents: "Try it free for a week.", $7.99 a week, about $1.14 a day, "A whole week costs less than 10 minutes with a private tutor" ($80 an hour = $13.33 per 10 minutes), and a three-step trial timeline (Today / Day 1 to 7 / Day 8). While the app isn't live it says "Not on the App Store yet. This is the price when it launches."
- Don't add "we'll remind you before the trial ends" unless the app actually sends that reminder.

## Changes from Ryan, 27 Oct (late night): the app is the only call to action
- **Test builder removed everywhere** (WorksheetGenerator and the $29/month "Tuterly test builder"): /worksheets, the 51 /worksheets/[slug] topic pages, /practice-maths-tests-secondary, and Learn articles. In its place: an "A practice test on {topic}, whenever they want" block (Test any topic, snap a question, educators + curriculum) with the app CTA (components/study/AppPracticeBlock.jsx).
  - Pages and URLs kept. Copy that described the builder is stripped at render (lib/practice-copy.js). /worksheets is now "Maths by topic, Years 7 to 10".
  - **Titles and descriptions changed** (they promised free printable worksheets): /worksheets, all 51 topic pages ("Year 8 Linear equations Practice (Victorian Curriculum) | Tuterly Study"), /practice-maths-tests-secondary, and /parents (was "Find a Tutor & Track Every Session"). LearningResource schema removed from topic pages (it said "free worksheet").
- **Paused pages redirect home (307, temporary)** in proxy.js: /directory, /maindirectory, /find-a-tutor, /get-started, /centres, /sample-report, /tutor-jobs (and its suburb/subject pages), /tutors (apply as a tutor), /tutoring-prices-melbourne, /practice-maths-tests-primary. Removed from the sitemap. To bring one back, delete it from PAUSED_PREFIXES / PAUSED_EXACT.
- **Every other non-app CTA removed**: hero and closing tutor buttons on the tutoring, comparison, VCE, online and scholarship/selective pages; "Prefer a real tutor?" on home, /parents and the tutoring hero block; the floating Enquire button; ContactCTA (phone / message us) blocks; the Educourse callouts; the tutor and practice links in nav and footer; "Log in" in the nav and footer; tutoring testimonials on /parents and the worksheet pages.
- **Learn articles**: removed the closing "find a tutor / browse our directory" lines, "See open positions" lines and links to removed pages from 92 articles; rewrote the six "build a free practice test" passages to point at Test any topic in the app. Every article now ends with the app card (primary articles get the soft "For Years 7 to 10 maths" card). The blog writer no longer adds tutor or builder links.
- **App buttons**: before launch every button shows "Coming soon to the App Store" with the email form (no more "Join the free pilot"). The line under every button: "Free to download · 1-week free trial, then $7.99 a week · Years 7 to 10 maths · iPhone". At launch (stage "live" + appStoreUrl) they become "Download free on the App Store".
- **Still describing the paused tutor marketplace** (body copy, not CTAs): the tutoring suburb pages, /tutoring, the Cluey and Tutor Doctor comparisons, best-of and online tutoring guides, VCE and scholarship/selective pages (incl. their sample session reports), the "When to bring in a tutor" sections in Learn articles, and the privacy policy. These need a rewrite or a redirect decision.

## Changes from Ryan, 27 Oct (night): tutoring pages rewritten around the app
- Rewritten around Tuterly Study (no marketplace claims left): /tutoring, all 35 /tutoring/[suburb] pages (template + lib/seo-suburbs.js blurbs and parentNeeds), /cluey-alternative, /tutor-doctor-alternative, /best-tutoring-melbourne, /best-online-tutoring-melbourne, /best-online-tutoring-victoria, /online-tutoring-melbourne, /vce-tutoring, /scholarship-test-prep, /tutoring/scholarship-exam-prep, /tutoring/selective-entry-exam-prep. Each keeps its URL and search topic, says honestly what tutoring is for and what it costs ($80 to $100 an hour), and where the app fits (Years 7 to 10 maths only).
- Corrections made on the way: the selective entry page now lists the four real selective entry schools (Melbourne High, Mac.Robertson Girls’, Nossal, Suzanne Cory; exam in Year 8 for Year 9 entry), with John Monash and SEAL as "also asked about". Unverifiable claims removed (study score / ATAR gains, "toughest test", which school uses ACER or EduTest, test months).
- Learn: the marketplace pitch ("session reports through the parent dashboard", "Tuterly tutors") is gone from 83 articles. Years 7 to 10 maths articles now describe the app; English, science, primary and VCE articles give tutor-choosing advice without pitching anything they don't cover. Two "measurable difference / 38 to a 43" claims softened.
- New article: /learn/how-tutoring-centres-use-tuterly-study (general, no named centres; waiting on Ryan for real centre details before writing case studies).
- Titles: the root layout already appends " | Tuterly", so pages ending in "| Tuterly" showed it twice ("Tutoring in Brighton | Tuterly | Tuterly"). Those now use title.absolute; no title on the site shows it twice.
- Not changed: the privacy policy (a legal document; it still describes data the old platform collected, so it needs a proper review rather than a marketing rewrite).

## Changes from Ryan, 27 Oct (late night): lead with better marks
- Headlines now lead with the outcome parents want, with the method second. Home H1 "Help your child get better maths marks." (lead: "Better marks start with the questions they got wrong."), home title "Tuterly Study: help your child improve their maths marks", parents H1 and title, the closing CTA bands ("Better maths marks start with the next question they get wrong."), the tutoring-page app block, and section headings ("Win back the marks they lost", "turn mistakes into marks").
- Wording rule: better marks is the aim, never a promise. Not used: "the best way to improve marks", "guaranteed", or any figure, because those are claims the ACCC expects you to be able to prove. Once pilot results exist, they can be added with the evidence.

## Changes from Ryan, 28 Oct: Bayside results
- Ryan reported: all Bayside Academics students using Tuterly Study (Years 7 to 10) for the past month use it every day, and their school test and exam marks have improved. Parent quotes to follow.
- Shown as a results card in the home and parents heroes ("Already lifting marks at Bayside Academics"), with fine print: "Bayside Academics students in Years 7 to 10, October 2026, using Tuterly Study alongside their tutoring." Plus an FAQ, "Does it actually improve marks?". Wording lives in lib/study-results.js.
- Not used: "trusted by students, parents and teachers around Australia" (it has only been used at Bayside, in Melbourne, for a month). Keep each student's before and after marks: the ACCC can ask for them.

## Changes from Ryan, 28 Oct: parents page and parent uploads
- Removed from /parents: "Three questions worth asking at dinner" and "Linking takes a code, not a password".
- New feature confirmed by Ryan (not in TUTERLY-STUDY-FEATURES.md yet; add it there): from a linked parent account, parents can upload marked school tests and practice tests/papers (photos, PDF, Word), which go into the child's bank like a student upload, and the term planner or course outline, which the app uses to focus topic tests on what's coming up this term.
- Shown on /parents ("Upload their tests and term planner from your own phone", three cards), in the home page's For parents points, and as an FAQ ("Can I upload things as a parent?").

## 28 Oct: positioning claims
- Added: "The self-learning maths app built from your child’s own mistakes" (home hero lead and meta description); results card headline "Proof from Bayside Academics: marks are going up".
- Not used, and why:
  - "The only self-learning app aligned to the Australian Curriculum": Mathspace, Edrolo, StudyPug, Mathdingo and others also sell self-paced, curriculum-aligned maths.
  - "The only app that creates questions from students’ mistakes": snap-and-solve apps such as SnapSolve/MathAI already suggest similar practice questions after a photo.
  - "The best way to improve test results": one centre, one month, alongside tutoring, no figures yet; not enough to back "best".
  "Only" and "best" claims have to be literally true and provable under the ACL.

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
  - Notes band: eyebrow "Study notes", heading "A one-page revision sheet on any topic.", line "On a whole topic, or on just the questions they find hard."
  - Captions: "Pick the topics: The whole topic, or just what they find hard." / "Get a revision sheet: One page, to download or share as a PDF."
- Features: eyebrow "In the app", heading "Everything they need to fix their mistakes.", and the tile text:
  - The bank: "Every question they've snapped, by topic, with a progress ring for each."
  - Test any topic: "A short test on any topic in their year, even with nothing snapped."
  - Study notes: "A one-page revision sheet, to download or share as a PDF."
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

# Tuterly Study app screenshots

Real screenshots from the Tuterly Study iPhone app (iPhone 17 Pro simulator, light mode, 1206 × 2622 px, status bar 9:41 / full battery). Taken on 27 Oct 2026 with the e2e test student account (shows as "Ryan", Year 9). Each flow folder is numbered in the order a student goes through it.

## Singles

- `home.png`: Home tab. Level, XP and streak, Quinn's greeting, the big "Snap a question" button, "Fix my mistakes" (23 to fix) and this week's goals, all done.
- `bank.png`: Bank tab. "35 questions in the bank" header, then topics with mastery rings and star counts.

## flow-snap: snap a wrong question, get the solution, master a similar one

- `flow-snap/01-home.png`: Home, the starting point (same as `home.png`).
- `flow-snap/02-snap-menu.png`: The "Snap a question" sheet: take a photo, choose from photos, or upload a whole test.
- `flow-snap/03-question-solution-hidden.png`: A question from an uploaded test (Solve 4 − 2x > 10), marked wrong, with a "Master it" similar question (−3x − 4 ≤ 8) to answer.
- `flow-snap/04-solution-shown.png`: The same question with the worked solution open: key idea, three steps, answer x < −3.
- `flow-snap/05-similar-question-correct.png`: The student got the similar question right: "Too easy! Marked right", a star, +5 XP.

(No crop step: the photo crop screen has a layout bug, with its hint text under the Dynamic Island, so it isn't shown.)

## flow-practice: take a practice test on any topic

- `flow-practice/01-practice-tab.png`: Practice tab: Test any topic, Your topics, Study notes, Uploaded tests.
- `flow-practice/02-test-any-topic-list.png`: Pick a textbook topic. Two tests are ready.
- `flow-practice/03-test-question.png`: Question 1 of 8 (Pythagoras ladder problem) with an answer typed and the maths keys.
- `flow-practice/04-test-score.png`: Result: "Great work! 6 out of 8", +60 XP, 1 week streak.
- `flow-practice/05-test-results.png`: Results list: 6 out of 8, "the 2 you got wrong are in your bank now", each question marked Right/Wrong with its solution.

## flow-notes: make revision notes

- `flow-notes/01-pick-topics.png`: Generate notes: pick up to 4 topics (Expressions and linear equations ticked).
- `flow-notes/02-generate-notes-choice.png`: "What should the notes cover?": the whole topic, or just what I find hard.
- `flow-notes/03-notes-sheet.png`: The revision sheet: title card, summary, then the key ideas.

## flow-parent: what a parent sees

- `flow-parent/01-week-in-review.png`: "Your week" recap (the student's own screen; a parent sees the same numbers): questions added, mastered, similar ones right, XP, streak, tests.
- `flow-parent/02-bank-by-topic.png`: The bank by topic with mastery progress (same as `bank.png`).

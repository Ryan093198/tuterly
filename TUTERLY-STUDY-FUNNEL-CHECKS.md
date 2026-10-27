# Tuterly Study funnel: checks (27 Oct 2026)

Branch `tuterly-study-funnel`, not deployed. Checked against a local production build
(`next build` + `next start`) with a stub Supabase, no Resend key (emails logged, not sent).

## Build and lint
- `npm run build` passes.
- ESLint: 54 problems before, 53 after (all pre-existing; the old /parents page's one
  error went with it). No new errors in any changed file.

## App CTA by device and stage
| | iPhone | Android | Desktop |
|---|---|---|---|
| **pilot** (now) | "Join the free pilot" button, opens the waitlist form (no TestFlight link set) | "Get notified when it launches" form | same form |
| **live** (tested with a dummy App Store URL, then reverted) | "Download free on the App Store" + Smart App Banner meta tag | "Notify me" for Android form | App Store button + QR code |

Every click fired one `study_app_cta_click` with `{ placement, stage, page, action }`
(home, /parents, a suburb page, Cluey comparison, a Learn article, ATAR planner, a worksheet page).

## Waitlist
- New email: one row, one confirmation email, success message.
- Same email again (different case): "already on the list", no row, no email.
- Honeypot filled: silent OK, no row. Bad email: 400. 4th request in a minute from one IP: 429.

## Claims
Grep of every added line for `%`, "better", "effective", "guarantee", "ATAR" and numbers next
to students/families/parents/users: hits are CSS widths, nav links to the ATAR planner, the
blog writer's own banned-claims rules, and code comments. No marketing claim.
Numbers shown to visitors: tutor rates $50 to $80/hr (from /tutoring-prices-melbourne),
sessions from $75 (lib/pricing.js), and the spec's example figures ("7 snapped · 4 fixed ·
11 to go", "6 to fix · 9 fixed"), which are labelled as examples.

**Pre-existing, not changed:** `components/DirectoryClient.jsx` hard-codes nine tutor
cards with star ratings and session counts. If those aren't real tutors with real numbers,
they're the same kind of problem commit 54b1855 removed elsewhere.

## Lighthouse (mobile, performance, 3 runs, local build)
- Today's home (/parents content): 64, 70, 64.
- New home: 68, 84, 81.

## Titles and canonicals
157 pages compared (everything in the sitemap plus /parents, /directory, /find-a-tutor,
/maindirectory). Only `/` changed: title and description now describe Tuterly Study.
Canonical stays https://www.tuterly.com.au. (In production the marketing root used to
rewrite to /parents, so Google saw the /parents page there.)

## Also found
- Worksheet PDF footer never rendered (react-pdf drops a fixed render-prop footer when the
  Page has a lineHeight). Fixed for worksheets. Session report and lesson-plan PDFs use the
  same pattern, so their "Page x of y" footer is probably missing too; not touched (logged-in
  product).
- The blog writer was dry-run against a stub API: seed topics reach the picker, the facts and
  honesty rules reach the writer, and a draft with "40%" / "improve their marks" was rejected
  and rewritten.

## Independent copy review
A separate reviewer checked the new copy against the app spec and the honesty rules (maths
examples verified: x = 13, c = 6, x = −5). Fixed after review: the pilot form now says the
pilot is with Bayside students; photo statements mention AI processing; the waitlist privacy
wording names service providers; no forward-looking app price; iPad answered in the FAQ;
parent setup says they install and sign in; the $29 test-builder price is labelled as separate
from the app; the PDF footer no longer implies the app is downloadable now.
Still to confirm before going live: that the TestFlight pilot is actually running (the copy
says it is), and `priceLine` plus the "Download free" label once pricing is set.

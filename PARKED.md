# Parked

One line per idea. Do not open this file again until Friday Block 3.

The only thing that leaves this file before Friday: something currently broken
for a real user who is currently using the product. Nothing else qualifies.

---


## NEXT WEEK - Billing model v2: view-gating (DECIDED 27 Jul, fast-follow, NOT this week)
Decision: launch this week with the working "block-on-send" model (tutor blocked if parent has 0 credits). Build view-gating next week.
The v2 model Ryan wants:
- Tutor is NEVER blocked - always send/complete the report.
- Paywall moves to the parent: 0-credit parent sees the report LOCKED, tops up to unlock.
Three decisions v2 forces (settle before building):
1. Email must become a NOTIFICATION (no PDF attachment for a locked report), else the paywall is defeated by the inbox. Biggest piece.
2. Credit spent at VIEW/unlock time (one per report), not send time - moves where settleSessionBilling fires.
3. Does the tutor get paid if the parent never tops up? Business call.

## POST-LAUNCH MARKETING BACKLOG (captured Wed 29 Jul - all valuable, none launch-critical)
- Suburb SEO pages: restyle /tutoring/[suburb] template to match the modern /parents design (currently uses older shared marketing components). Bigger design pass. DONE already: pricing corrected to $75 all-inclusive via lib/pricing.js.
- Centralise pricing: make /parents, GetStartedChooser, MembershipPanel, FAQ import lib/pricing.js (currently hardcode their own copies).
- Get the 35 suburb pages INDEXED (Google Search Console, submit sitemap) - existing pages don't rank until indexed + domain gains authority. This is the real lever, not more pages.
- Real social proof: replace placeholder testimonials + fake star rating on /parents with real Google reviews (integrity + conversion). DO NOT launch showing fake reviews.
- Tutor face photos on the directory cards (real onboarded Tuterly tutors only, with consent).
- Risk-reversal offer on the paid path (free/discounted first session or guarantee) for cold parents.
- Bayside -> Tuterly warm funnel: route daily Bayside enquiries (online / out-of-area / waitlist) to Tuterly. Fastest signup lever.
- New subjects (Science etc.): needs report-prompt refactor off the binary maths/english + VCAA curriculum data. Finish VCE for existing subjects first.

## NEXT SESSION - Worksheet variant pool: make the free generator instant + near-zero marginal cost (captured 7 Aug)
Ryan's idea, refined. Problem confirmed in code: every free-worksheet generation is a full
claude-sonnet-4-6 call (max_tokens 3500) taking 20-40s. `worksheet_generations` logs only the
EVENT (ip, email, year_level, topic_id, topic_label, question_count) - the generated markdown is
thrown away. So two parents picking Year 8 Algebra each pay full cost and each wait.

DO NOT just cache one worksheet per topic. Landing pages promise "fresh questions every click"
and the "Generate new questions" button is part of the product. One cached copy breaks both, and
parents in the same class would print identical sheets.

BUILD A POOL INSTEAD:
- New table `worksheet_variants` (year_level, topic_id, topic_label, content markdown, created_at,
  served_count). Service-role only, RLS on, no policies (match the existing public-worksheet tables).
- Request flow in /api/worksheets/generate:
  1. Pool has variants for (year, topic)? -> serve one at random. INSTANT, zero API cost.
  2. "Generate new questions" -> serve a DIFFERENT variant from the pool. Still instant, genuinely
     different questions, so the "fresh questions" promise still holds.
  3. Pool thin/empty -> generate live as now AND store the result. Pool self-warms: first visitor
     for a topic waits, everyone after is instant.
- Target ~5 variants per combo. ~8 year levels x ~13 topics = ~100 combos = ~500 one-off
  generations, then ongoing marginal cost ~0 regardless of traffic.
- Optional: seed/pre-warm script for the popular combos so even the first visitor is fast.

KEEP LIVE-GENERATED: the PAID full practice tests (/api/practice/full-test). They are personalised
per student (pull recent session-report context) and "unlimited tests on any topic" is what the $29
buys. Serving subscribers from a shared pool would hollow out the paid tier. Free = pool, paid = live.
That split also makes the upgrade more meaningful.

WHY IT MATTERS MOST: conversion, not cost. A 20-40s spinner on a free tool loses people on mobile.
Instant results likely beat the API saving in value.

Effort: ~half a day. Contained - the existing API path stays as the fallback, so nothing breaks if
the pool is empty. Open decisions for next time: variants per combo (suggest 5), and whether to
pre-warm top topics or let it self-fill from real traffic.

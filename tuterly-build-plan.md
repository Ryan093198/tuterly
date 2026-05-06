# Tuterly — Build Status & Roadmap

**Live at:** https://app.tuterly.com.au
**Repo:** https://github.com/Ryan093198/tuterly
**Stack:** Next.js 16 on Vercel · Supabase (Singapore) · Anthropic Claude · OpenAI Whisper · Resend

---

## Overview

Tuterly is a multi-tenant SaaS that helps tutors generate professional session reports and gives parents visibility into their child's tutoring progress. It's built on the proven Premier+ system by Bayside Academics, restructured for multi-tenant use.

---

## Revenue Model (planned)

| Plan | Who Pays | Price | What They Get |
|------|----------|-------|---------------|
| Parent Plan | Parent | $35-49/mo per student | Dashboard, reports, progress tracking, invite tutor |
| Tutor Plan | Tutor | $15-25/mo per active student | Add students, generate reports, look premium |
| Business Plan | Company | $50-100/mo per tutor seat | White-label, all students, team management |

Billing is **not implemented yet** — all signups are free during pilot.

---

## What's Live Today

### Auth & Identity
- Email/password and Google OAuth signup with role picker (parent / tutor / admin)
- Profile auto-create on signup via Supabase trigger
- Role-aware dashboard routing (`/dashboard` redirects to tutor / parent / admin)
- Invite flow: tutors can invite parents to a specific student via email; `/invite/[token]` page handles signed-in / signed-out / wrong-email / expired states; resend / cancel controls; invite link surfaced in UI as fallback when email send fails
- Service-role helper (`lib/supabase-admin.js`) for server actions that need to bypass RLS after their own access checks

### Tutor flow
- **Students** — add / edit / delete (cascades sessions). Year level + curriculum level (working level) so a Year 11 student doing Year 9 maths gets the right curriculum block.
- **Sessions** — date, duration, free-text notes, optional photo uploads, optional audio file upload
- **Audio → notes** — Whisper transcription + Claude structuring into "Topics covered / How the student went / Areas of concern / Homework set" dot-points (25 MB cap)
- **Photo → vision** — session photos uploaded to Supabase Storage, signed URLs passed to Claude as image content blocks during report generation; same photos visible to parent on report view
- **Report generation** — `claude-sonnet-4-6` with prompt caching on the static instructions block + the curriculum block. Mathematical accuracy rules, no LaTeX, no invented chapter/page numbers, expanded resource catalogue with rotation rule.
- **Report review** — preview rendered markdown by default with brand-colored prose styling, "Edit" toggles to textarea, "Mark ready", "Regenerate"
- **Practice questions** — each rendered with a `<details><summary>Reveal worked solution</summary>` toggle so students attempt before checking
- **Confidence ratings** — auto-extracts subtopics from the report, auto-detects overall topic, 1–5 rating per subtopic with manual add/remove
- **Send to parent** — modal prompt right after generation, or explicit panel later. Generates a Tuterly-styled PDF (`@react-pdf/renderer`) and attaches to a Resend email. Marks `reports.sent_at` and `sessions.status='sent_to_parent'`. Filename: `<FirstName><LastName>-dd-mm-yyyy.pdf`
- **Resources** — upload PDF/Word/text/image files (auto-classified by filename) or paste contents directly. Categories: textbook, term outline, school report, teacher notes, assessment, assessment schedule, other. Inline edit / delete. Resources flow into the report prompt — pasted textbook contents drive specific chapter references; binary uploads are mentioned generically (no invented page numbers).

### Parent flow
- **Children list** — large avatar cards showing latest report date and "New" badge for unviewed
- **Child detail** — header, sessions list (only sent reports), progress, resources
- **Report view** — premium document feel: branded gradient header, Tuterly logo + session date, prose with brand bullet markers; print/save-as-PDF button. `parent_viewed_at` recorded on first open.
- **Progress tracker** — three summary cards (sessions tracked / overall avg / latest avg), topics grouped from ratings with confidence bars + colour-coded labels, expandable subtopic rows with trend arrows, click → drill-down view fetches `/api/explain` and renders Claude-generated explanation + 4 practice questions for that subtopic

### Design system
- Brand cyan `#00C2E0` with `-soft` / `-pale` / `-dark` / `-foreground` variants
- Dark sidebar `#0b1220` with role-aware nav, mobile hamburger drawer
- Inter font (with variable axis features), fade-in animations, skeleton shimmer
- Shared primitives: `Button`, `Card`, `Badge`, `EmptyState`, `Skeleton`, `Logo`
- Tailwind v4 with `@theme inline` token system in `globals.css`
- Mobile-responsive grids and stacked layouts on every page

### VCAA Curriculum coverage (ported from Premier+)
- F-10 Mathematics: Years 3 to 10A with all strands and content descriptors
- VCE Mathematics: General, Methods, Specialist (2023–2027 accreditation)
- Curriculum is selected by the student's working level when set, otherwise their year level

### Storage / data
- Supabase Storage buckets: `resources` (private), `session-photos` (private)
- Tables: profiles, organisations, students, tutor_students, sessions, reports, ratings, resources, invites, subscriptions, session_photos
- RLS policies on every table; service-role used for cross-table operations where SELECT-after-INSERT is blocked or no DELETE/UPDATE policy exists

### API routes
- `POST /api/generate` — report generation with photos as image blocks
- `POST /api/explain` — drill-down explanation + 4 practice questions for a subtopic
- `POST /api/transcribe` — Whisper transcription + Claude structured-notes pass

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| App | Next.js 16 (App Router) on Vercel — `app.tuterly.com.au` |
| Auth | Supabase Auth (Google + email/password) |
| Database | Supabase PostgreSQL |
| Storage | Supabase Storage (private buckets, signed URLs) |
| AI report / explain | Anthropic Claude (`claude-sonnet-4-6`) with prompt caching |
| AI transcription | OpenAI Whisper (`whisper-1`) |
| Email | Resend (Bayside Academics account) |
| PDF generation | `@react-pdf/renderer` (server-side, no headless browser) |

---

## Domain & URL Structure

```
tuterly.com.au          → Marketing website (not built yet)
app.tuterly.com.au      → The product — LIVE
```

---

## Environment Variables (Vercel)

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=Tuterly <reports@baysideacademics.com.au>
NEXT_PUBLIC_APP_URL=https://app.tuterly.com.au
```

`.env.example` in the repo mirrors these with placeholders.

---

## Supabase Auth configuration (production)

- **Site URL:** `https://app.tuterly.com.au`
- **Additional redirect URLs:** `https://app.tuterly.com.au/auth/callback`
- **Email provider:** enabled, default templates
- **Google provider:** enabled, OAuth credentials from Google Cloud Console; redirect URL set to `https://YOUR_SUPABASE_URL/auth/v1/callback`
- **Next.js 16 quirk:** middleware is renamed to `proxy.js`; `proxyClientMaxBodySize: "26mb"` is set in `next.config.mjs` so audio (≤25 MB) and large resource uploads pass through

---

## Repository Structure

```
tuterly/
├── app/
│   ├── layout.js                      # Root layout, Inter font
│   ├── page.js                        # Login/signup landing
│   ├── globals.css                    # Brand tokens
│   ├── auth/
│   │   ├── callback/route.js          # OAuth + role-on-fresh-signup
│   │   ├── confirm/route.js           # Email confirmation
│   │   └── signout/route.js
│   ├── invite/[token]/page.js         # Invite acceptance
│   ├── dashboard/
│   │   ├── layout.js                  # Auth-checked, role-aware shell
│   │   ├── page.js                    # Role redirect
│   │   ├── tutor/
│   │   │   ├── page.js                # Student list
│   │   │   ├── students/[id]/         # Student detail (sessions, parent, progress, resources)
│   │   │   ├── students/new/          # Add student
│   │   │   ├── students/actions.js    # createStudent, updateStudent
│   │   │   ├── students/invite-actions.js  # inviteParent, resendInvite, cancelInvite
│   │   │   └── session/
│   │   │       ├── new/               # New session form
│   │   │       ├── [id]/              # Session detail (notes, photos, report, ratings, send)
│   │   │       └── actions.js         # createSession, updateReport, saveRatings, sendReportToParent, photo + delete actions
│   │   ├── parent/
│   │   │   ├── page.js                # Children list
│   │   │   ├── students/[id]/         # Child detail
│   │   │   └── reports/[id]/          # Report view
│   │   ├── admin/page.js              # Placeholder
│   │   └── resource-actions.js        # uploadResource, deleteResource, updateResource, signedUrlFor
│   └── api/
│       ├── generate/route.js          # Claude report generation
│       ├── explain/route.js           # Claude drill-down for a subtopic
│       └── transcribe/route.js        # Whisper + Claude notes
├── components/
│   ├── Auth.jsx                       # Login/signup
│   ├── DashboardShell.jsx             # Sidebar layout
│   ├── Logo.jsx
│   ├── ReportWorkbench.jsx            # Generate / preview / edit / send-prompt modal
│   ├── MarkdownReport.jsx             # Branded markdown renderer with details/summary
│   ├── RatingPanel.jsx                # Confidence ratings UI
│   ├── SendToParentPanel.jsx
│   ├── ProgressTracker.jsx            # Topic groups, drill-down
│   ├── ResourcesPanel.jsx             # Upload, list, edit
│   ├── SessionPhotos.jsx
│   ├── NotesEditor.jsx                # Editable notes + audio
│   ├── SessionNotesField.jsx          # Notes for new-session form
│   ├── AudioUpload.jsx
│   ├── StudentEditor.jsx              # Inline view/edit
│   ├── DeleteSessionButton.jsx
│   ├── PrintButton.jsx
│   └── ui/                            # Button, Card, Badge, EmptyState, Skeleton
├── lib/
│   ├── supabase-client.js             # Browser client
│   ├── supabase-server.js             # Server client (cookies)
│   ├── supabase-admin.js              # Service-role client
│   ├── curriculum.js                  # VCAA + VCE data + getCurriculumForStudent
│   ├── report-prompt.js               # buildReportPrompt with cache breakpoints
│   ├── report-pdf.js                  # @react-pdf/renderer document
│   ├── rating.js                      # extractSubtopics + detectOverallTopic
│   ├── email.js                       # Resend wrapper, sendInviteEmail, sendReportEmail
│   └── levels.js                      # SCHOOL_YEARS, CURRICULUM_LEVELS
├── supabase/
│   ├── schema.sql                     # All tables, RLS, trigger
│   └── storage.sql                    # Bucket setup
├── proxy.js                           # Next 16 proxy: Supabase session refresh + protected routes
├── next.config.mjs                    # proxyClientMaxBodySize: 26mb
└── .env.example
```

---

## What's Remaining

### High value, near-term

1. **Marketing site** at `tuterly.com.au` — separate Next.js project. Hero, sample report, pricing, "For Parents / For Tutors / For Businesses" sections, sign-up CTA pointing to `app.tuterly.com.au`.
2. **Demo mode** — pre-loaded sample student + session + report so prospects can try without signing up. Massive top-of-funnel.
3. **Stripe billing** — Phase 5 in original plan. Free 14-day trial → subscription. Stripe Checkout for signup, Customer Portal for management, webhook for subscription status changes.
4. **End-of-day reminder for tutors** — Phase 3.3 in original plan. Daily email if sessions logged but reports not generated. Keeps the app sticky.
5. **PDF text extraction** — uploaded PDFs currently store metadata only; switch to `unpdf` (or similar) so a PDF textbook contents page works the same as the paste-contents flow.

### Medium

6. **Parent invites tutor** — currently only the tutor → parent direction is built. Parents on the dashboard need an "Invite a tutor" button.
7. **Curriculum expansion** — currently VCAA Maths F-10A + VCE Maths only. Add English, Science, Humanities for VCAA; add NSW / Queensland / national curriculums later.
8. **Per-org branding (white-label)** — Phase 6. Custom logo / colours / subdomain per `organisations` row. Schema is already in place.
9. **Loading skeletons across pages** — `Skeleton` primitive exists; not yet wired into individual pages.
10. **Error toasts** — currently inline `<p className="text-red-500">` messages. A shared toast system would feel more polished.
11. **Push notifications / web push** — let parents get a notification when a new report is sent.
12. **Mobile app** — React Native wrapper around the same APIs. Far future.

### Polish + UX

13. Tutor-side previews of recent activity per student (session count, last contact).
14. Org-wide analytics for the admin dashboard (currently a placeholder).
15. Bulk-add students from CSV (B2B onboarding).
16. Tutor scheduling / calendar integration.
17. Parent ↔ tutor messaging.
18. International curriculum, multi-language support.

---

## Manual Configuration Checklist

For anyone setting up a fresh deployment:

1. Supabase project created (Singapore region)
2. Run `supabase/schema.sql` in SQL Editor (creates tables + RLS)
3. Run `supabase/storage.sql` (creates `resources` and `session-photos` buckets), or create via Dashboard → Storage
4. Supabase Auth: enable Email and Google providers; set Site URL = `https://app.tuterly.com.au`; add redirect URL `https://app.tuterly.com.au/auth/callback`
5. Resend: verify the sender domain or use Resend's `onboarding@resend.dev` for testing
6. Vercel: link repo, set all env vars (see list above), connect domain `app.tuterly.com.au`

---

## Success Metrics (First 3 Months)

- 5–10 paying customers (mix of B2C and B2T)
- 50+ reports generated
- 90%+ parent open rate on reports (`parent_viewed_at` tracked)
- 1 tutoring company on B2B trial
- Lisa Tran partnership established
- Cost per acquisition under $30

---

## Estimated Costs (current burn at low volume)

| Item | Monthly Cost |
|------|-------------|
| Supabase Pro | $25 |
| Vercel Pro | $20 |
| Anthropic API | $10–50 (usage based, prompt caching offsets) |
| OpenAI Whisper | ~$0.006/min of audio |
| Resend | Free under 3000 emails/mo |
| Domain | ~$3 |
| **Total** | **~$60–100/month** |

Break-even: 2–3 paying customers covers all infrastructure costs.

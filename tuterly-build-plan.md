# Tuterly — Full Build Plan

## Overview

Tuterly is a SaaS platform that helps tutors generate professional session reports and gives parents visibility into their child's tutoring progress. It's built on the proven Premier+ system by Bayside Academics, restructured for multi-tenant use.

---

## Revenue Model

| Plan | Who Pays | Price | What They Get |
|------|----------|-------|---------------|
| Parent Plan | Parent | $35-49/mo per student | Dashboard, reports, progress tracking, invite tutor |
| Tutor Plan | Tutor | $15-25/mo per active student | Add students, generate reports, look premium |
| Business Plan | Company | $50-100/mo per tutor seat | White-label, all students, team management |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Website | Next.js on Vercel (marketing site) |
| App/Portal | Next.js on Vercel (the product) |
| Auth | Supabase Auth (Google + email/password) |
| Database | Supabase (PostgreSQL) |
| AI | Anthropic Claude API (report generation) |
| Email | Resend (notifications, reminders) |
| Payments | Stripe (subscriptions) |
| File Storage | Supabase Storage (document uploads) |

---

## Domain & URL Structure

```
tuterly.com.au          → Marketing website
app.tuterly.com.au      → The product (login, dashboards)
```

---

## Phase 1: Foundation (Week 1)

### 1.1 Supabase Project Setup

Create new Supabase project called `tuterly`. Region: Singapore (closest to Melbourne).

### 1.2 Database Schema

Run this SQL in Supabase SQL Editor:

```sql
-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ═══ PROFILES ═══
-- Extends Supabase auth.users with app-specific data
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null,
  role text not null check (role in ('parent', 'tutor', 'admin')),
  avatar_url text,
  phone text,
  org_id uuid, -- for B2B: which organisation they belong to
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ═══ ORGANISATIONS ═══
-- For B2B: tutoring companies
create table organisations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  logo_url text,
  primary_color text default '#00C2E0',
  owner_id uuid references profiles(id),
  plan text default 'trial' check (plan in ('trial', 'starter', 'pro', 'enterprise')),
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz default now()
);

-- Add foreign key after both tables exist
alter table profiles add constraint fk_org foreign key (org_id) references organisations(id);

-- ═══ STUDENTS ═══
create table students (
  id uuid primary key default uuid_generate_v4(),
  first_name text not null,
  last_name text not null,
  year_level text not null,
  school text,
  subjects text[] default '{}',
  goals text,
  concerns text,
  term_outline text,
  parent_id uuid references profiles(id), -- which parent owns this student
  org_id uuid references organisations(id), -- for B2B
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ═══ TUTOR-STUDENT LINKS ═══
-- Many-to-many: a tutor can have many students, a student can have many tutors
create table tutor_students (
  id uuid primary key default uuid_generate_v4(),
  tutor_id uuid not null references profiles(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  status text default 'active' check (status in ('active', 'paused', 'ended')),
  created_at timestamptz default now(),
  unique(tutor_id, student_id)
);

-- ═══ SESSIONS ═══
create table sessions (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references students(id) on delete cascade,
  tutor_id uuid not null references profiles(id),
  date date not null default current_date,
  duration_minutes int default 60,
  raw_notes text, -- tutor's dot-point notes
  status text default 'pending' check (status in ('pending', 'notes_added', 'report_generated', 'sent_to_parent')),
  created_at timestamptz default now()
);

-- ═══ REPORTS ═══
-- Separated from sessions for flexibility
create table reports (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references sessions(id) on delete cascade,
  content text not null, -- the generated markdown report
  sent_at timestamptz, -- when it was sent to parent
  parent_viewed_at timestamptz, -- when parent first opened it
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ═══ RATINGS ═══
-- Per-subtopic confidence ratings from each session
create table ratings (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references sessions(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  topic text not null, -- e.g. "Quadratic Expressions"
  subtopic text not null, -- e.g. "Factorising Monic Quadratics"
  confidence int not null check (confidence between 1 and 5),
  created_at timestamptz default now()
);

-- ═══ RESOURCES ═══
-- Documents uploaded by parents or tutors
create table resources (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references students(id) on delete cascade,
  uploaded_by uuid not null references profiles(id),
  name text not null,
  category text not null, -- 'term_outline', 'assessment_schedule', 'school_report', 'textbook', 'other'
  content text, -- extracted text content
  file_url text, -- if stored as file
  notes text,
  created_at timestamptz default now()
);

-- ═══ INVITES ═══
-- Parent invites tutor, or tutor invites parent
create table invites (
  id uuid primary key default uuid_generate_v4(),
  from_user_id uuid not null references profiles(id),
  to_email text not null,
  student_id uuid references students(id),
  role text not null check (role in ('parent', 'tutor')), -- what role the invitee will have
  token text not null unique default encode(gen_random_bytes(32), 'hex'),
  status text default 'pending' check (status in ('pending', 'accepted', 'expired')),
  created_at timestamptz default now(),
  expires_at timestamptz default now() + interval '7 days'
);

-- ═══ SUBSCRIPTIONS ═══
create table subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id),
  plan text not null check (plan in ('parent_monthly', 'tutor_monthly', 'business_monthly')),
  stripe_subscription_id text,
  status text default 'trial' check (status in ('trial', 'active', 'cancelled', 'expired')),
  trial_ends_at timestamptz default now() + interval '14 days',
  current_period_end timestamptz,
  created_at timestamptz default now()
);

-- ═══ INDEXES ═══
create index idx_students_parent on students(parent_id);
create index idx_students_org on students(org_id);
create index idx_sessions_student on sessions(student_id);
create index idx_sessions_tutor on sessions(tutor_id);
create index idx_sessions_date on sessions(date desc);
create index idx_reports_session on reports(session_id);
create index idx_ratings_student on ratings(student_id);
create index idx_tutor_students_tutor on tutor_students(tutor_id);
create index idx_tutor_students_student on tutor_students(student_id);
create index idx_invites_token on invites(token);
create index idx_invites_email on invites(to_email);

-- ═══ ROW LEVEL SECURITY ═══
alter table profiles enable row level security;
alter table students enable row level security;
alter table sessions enable row level security;
alter table reports enable row level security;
alter table ratings enable row level security;
alter table resources enable row level security;
alter table invites enable row level security;
alter table tutor_students enable row level security;
alter table organisations enable row level security;
alter table subscriptions enable row level security;

-- RLS Policies (start permissive, tighten later)
-- Users can read/write their own profile
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Parents can see their own students
create policy "Parents see own students" on students for select using (parent_id = auth.uid());
create policy "Parents can add students" on students for insert with check (parent_id = auth.uid());

-- Tutors can see students linked to them
create policy "Tutors see linked students" on students for select using (
  id in (select student_id from tutor_students where tutor_id = auth.uid())
);

-- Tutors can see/add sessions for their students
create policy "Tutors see own sessions" on sessions for select using (tutor_id = auth.uid());
create policy "Tutors add sessions" on sessions for insert with check (tutor_id = auth.uid());

-- Parents can see sessions for their students
create policy "Parents see student sessions" on sessions for select using (
  student_id in (select id from students where parent_id = auth.uid())
);

-- Reports visible to session tutor and student's parent
create policy "View reports" on reports for select using (
  session_id in (
    select id from sessions where tutor_id = auth.uid()
    union
    select s.id from sessions s join students st on s.student_id = st.id where st.parent_id = auth.uid()
  )
);

-- Function to auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'parent')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
```

### 1.3 Supabase Auth Setup

In Supabase Dashboard → Authentication → Providers:
- Enable **Email** (already default)
- Enable **Google** OAuth:
  1. Go to console.cloud.google.com
  2. Create OAuth credentials
  3. Add redirect URL: `https://YOUR_SUPABASE_URL/auth/v1/callback`
  4. Paste Client ID and Secret into Supabase

### 1.4 Project Structure

```
tuterly/
├── app/
│   ├── layout.js              # Root layout, fonts, metadata
│   ├── page.js                # Landing/login page
│   ├── auth/
│   │   ├── callback/route.js  # OAuth callback handler
│   │   └── confirm/route.js   # Email confirmation handler
│   ├── dashboard/
│   │   ├── layout.js          # Protected layout (checks auth)
│   │   ├── page.js            # Role-based redirect
│   │   ├── tutor/
│   │   │   ├── page.js        # Tutor dashboard
│   │   │   ├── students/
│   │   │   │   └── [id]/page.js  # Student detail
│   │   │   └── session/
│   │   │       └── new/page.js   # New session + report
│   │   ├── parent/
│   │   │   ├── page.js        # Parent dashboard
│   │   │   ├── reports/
│   │   │   │   └── [id]/page.js  # View report
│   │   │   └── progress/page.js  # Progress tracking
│   │   └── admin/
│   │       └── page.js        # Business admin dashboard
│   ├── invite/
│   │   └── [token]/page.js    # Accept invite page
│   └── api/
│       ├── generate/route.js  # Claude API for report generation
│       └── email/route.js     # Resend for notifications
├── components/
│   ├── Auth.jsx               # Login/signup forms
│   ├── ReportGenerator.jsx    # The core report generation UI
│   ├── ReportView.jsx         # Rendered report display
│   ├── ProgressTracker.jsx    # Confidence tracking charts
│   ├── StudentCard.jsx        # Student list item
│   ├── SessionNotes.jsx       # Tutor note-taking form
│   ├── ResourceUpload.jsx     # Document upload
│   └── InviteModal.jsx        # Send invite to tutor/parent
├── lib/
│   ├── supabase-client.js     # Browser Supabase client
│   ├── supabase-server.js     # Server Supabase client
│   ├── curriculum.js          # VCAA curriculum data (ported from Premier+)
│   ├── report-prompt.js       # Report generation prompt (ported from Premier+)
│   └── utils.js               # Helper functions
├── public/
│   ├── logo.png
│   └── ...
├── package.json
├── next.config.js
└── .env.local
```

### 1.5 Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ... (for server-side operations)
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=https://app.tuterly.com.au
```

### 1.6 Vercel Setup

- Create new Vercel project linked to `tuterly` GitHub repo
- Add all environment variables
- Connect domain: `app.tuterly.com.au`

---

## Phase 2: Tutor Dashboard (Week 2)

### 2.1 Login/Signup Flow

```
User visits app.tuterly.com.au
        ↓
    Login Page
  [Continue with Google]
  [Continue with Email]
  [New? Sign Up]
        ↓
    Sign Up Form
  - Full name
  - Email
  - Password
  - Role: "I'm a Parent" / "I'm a Tutor"
        ↓
    Email verification
        ↓
    Redirects to role-specific dashboard
```

### 2.2 Tutor Dashboard Features

**Student List**
- See all linked students (via tutor_students table)
- Add a new student (name, year level, school, subjects)
- Click student → student detail page

**Student Detail**
- Student info (editable)
- Session history with reports
- Progress tracking (confidence over time)
- Resources section (upload/view documents)
- "New Session" button

**New Session Flow**
1. Select student (or auto-selected if coming from student detail)
2. Enter session notes (text area with dot-point prompts):
   - What topics were covered?
   - How did the student perform?
   - Any areas of concern?
   - Homework set?
3. Click "Generate Report"
4. AI generates the full structured report (ported from Premier+)
5. Tutor reviews and can edit
6. Rate subtopics (confidence 1-5)
7. Click "Send to Parent"
8. Parent gets email notification + sees in dashboard

### 2.3 Report Generation (Port from Premier+)

Key files to port:
- `buildReportPrompt()` function → `lib/report-prompt.js`
- `getCurriculumForStudent()` → `lib/curriculum.js`
- `formatCurriculumForPrompt()` → `lib/curriculum.js`
- VCAA curriculum data (all year levels) → `lib/curriculum.js`
- API route `/api/generate` → `app/api/generate/route.js`

The report prompt includes:
- Student context (name, year, school, goals, concerns)
- VCAA curriculum descriptors for the student's year level
- Uploaded resources (term outlines, textbooks)
- Session transcript/notes
- Mathematical accuracy rules
- Output format template

---

## Phase 3: Parent Dashboard (Week 3)

### 3.1 Parent Dashboard Features

**My Children**
- List of students (can have multiple children)
- Add a child
- Click child → child detail

**Child Detail**
- Latest session report
- All past reports (scrollable list)
- Progress tracker (confidence chart over time)
- Upload documents (term outlines, assessment schedules)
- "Invite a Tutor" button

**Report View**
- Beautifully rendered report (markdown → styled HTML)
- Print/PDF export button
- Mark specific areas for follow-up

**Progress Tracker (ported from Premier+)**
- Topic → Subtopic hierarchy
- Confidence bars (1-5) per subtopic
- Trend over time (chart showing improvement)
- Click subtopic → AI generates explanation + practice questions

### 3.2 Invite System

**Parent invites Tutor:**
1. Parent clicks "Invite a Tutor" on child's profile
2. Enters tutor's email
3. System sends email: "Sarah has invited you to tutor Julian on Tuterly"
4. Tutor clicks link → signs up (or logs in if existing)
5. Tutor is linked to the student
6. Tutor can now create sessions for this student

**Tutor invites Parent:**
1. Tutor adds a student
2. Enters parent email
3. System sends email: "Ryan has added your child Julian to Tuterly"
4. Parent clicks link → signs up (or logs in)
5. Parent can now view reports for this student

### 3.3 Email Notifications (Resend)

- **New report**: "A session report is ready for Julian — [View Report]"
- **Invite**: "You've been invited to Tuterly — [Accept Invite]"
- **End of day reminder** (later): "You had 3 sessions today — [Add Notes]"

---

## Phase 4: Polish & Launch (Week 4)

### 4.1 Mobile Responsiveness
- All dashboards responsive
- Tutor can add notes from phone
- Parent can read reports on phone

### 4.2 Marketing Website
- `tuterly.com.au` — separate Next.js project
- Hero: "Your tutoring sessions, tracked."
- For Parents / For Tutors / For Businesses sections
- Sample report demo
- Pricing page
- Sign up CTA → redirects to `app.tuterly.com.au`

### 4.3 Demo Mode
- Pre-loaded demo data (sample students, reports, ratings)
- Anyone can try without signing up
- "See a sample report" on marketing site

### 4.4 Analytics
- Dashboard: total users, reports generated, sessions logged
- Per-user: session frequency, report open rates

---

## Future Phases

### Phase 5: Billing (Stripe)
- Free 14-day trial for all plans
- Parent plan: $39/mo per student
- Tutor plan: $19/mo per active student
- Business plan: $75/mo per tutor seat
- Stripe Checkout for signup
- Stripe Customer Portal for management
- Webhook for subscription status changes

### Phase 6: White-labelling (B2B)
- Custom logo and colours per organisation
- Custom subdomain (e.g. `acmetutoring.tuterly.com.au`)
- Admin dashboard for managing tutors and students
- Usage analytics per organisation

### Phase 7: Advanced Features
- Voice-to-notes (speech recognition for session notes)
- PDF export of reports
- Curriculum expansion (beyond VCAA — national curriculum, IB, etc.)
- AI practice question generator (standalone tool)
- Tutor scheduling/calendar integration
- Parent-tutor messaging
- Mobile app (React Native)

### Phase 8: International Expansion
- UK curriculum (National Curriculum, GCSE, A-Level)
- US curriculum (Common Core, state standards)
- NZ curriculum
- Multi-language support
- International pricing

---

## Key Files Ported from Premier+

These contain the core IP and should be extracted from the Premier+ codebase:

1. **Report Generation Prompt** (`buildReportPrompt`)
   - Student context injection
   - VCAA curriculum block
   - Resource integration
   - Mathematical accuracy rules
   - Output format template

2. **VCAA Curriculum Data** (`getCurriculumForStudent`)
   - Years 7-10A Mathematics (all strands and content descriptors)
   - VCE Mathematics (General, Methods, Specialist)
   - Needs expansion: English, Science, Humanities

3. **Confidence Rating System**
   - Topic/subtopic extraction from reports
   - Auto-detection of overall topic
   - Rating UI (1-5 per subtopic)

4. **Progress Tracker Component**
   - Topic → Subtopic hierarchy display
   - Confidence bars with averages
   - Trend over time
   - Drill-down AI explanations

5. **Resource Upload System**
   - Categories (term outline, textbook, assessment schedule, etc.)
   - Text extraction from uploads
   - Integration into report prompt

6. **Report Rendering**
   - Markdown → styled HTML
   - Print-friendly formatting
   - Edit capability for tutors

7. **API Route** (`/api/generate`)
   - Anthropic Claude API call
   - Image support (textbook photos)
   - Error handling

---

## Development Commands

```bash
# Create project
npx create-next-app@latest tuterly --app --tailwind
cd tuterly
npm install @supabase/supabase-js @supabase/ssr resend stripe

# Environment
cp .env.example .env.local
# Fill in Supabase, Anthropic, Resend, Stripe keys

# Development
npm run dev

# Deploy
git push origin main  # Vercel auto-deploys
```

---

## Success Metrics (First 3 Months)

- 5-10 paying customers (mix of B2C and B2T)
- 50+ reports generated
- 90%+ parent open rate on reports
- 1 tutoring company on B2B trial
- Lisa Tran partnership established
- Cost per acquisition under $30

---

## Estimated Costs

| Item | Monthly Cost |
|------|-------------|
| Supabase Pro | $25 |
| Vercel Pro | $20 |
| Anthropic API | $10-50 (usage based) |
| Resend | Free (under 100 emails/day) |
| Domain | ~$3 |
| **Total** | **~$60-100/month** |

Break-even: 2-3 paying customers covers all infrastructure costs.

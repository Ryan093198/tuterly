# Tuterly Payment & Credit System - Build Plan

## Overview

Automated payment chain: Tutor submits notes → Report generates → Credit deducts → Parent notified → Tutor payment queued → Auto top-up if needed → Invoice created.

## Prerequisites

Before building, set up:

1. **Stripe account** at stripe.com
   - Get API keys from Dashboard → Developers → API Keys
   - Enable Stripe Connect (for tutor payouts): Dashboard → Connect → Get Started
   - Enable Stripe Billing (for subscriptions)

2. **Environment variables** - add to .env.local:
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

3. **Install Stripe SDK:**
```bash
npm install stripe @stripe/stripe-js
```

---

## Phase 1: Database Schema

Run this SQL in Supabase SQL Editor:

```sql
-- ═══ CREDITS ═══
-- Tracks each parent's session credit balance
CREATE TABLE credits (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  credits_remaining int NOT NULL DEFAULT 0,
  pack_size int NOT NULL DEFAULT 5, -- 5, 10, or 20
  auto_topup boolean DEFAULT true,
  stripe_payment_method_id text, -- saved card
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(parent_id)
);

-- ═══ CREDIT TRANSACTIONS ═══
-- Log of every credit purchase, deduction, or refund
CREATE TABLE credit_transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id uuid NOT NULL REFERENCES profiles(id),
  type text NOT NULL CHECK (type IN ('purchase', 'deduction', 'refund', 'adjustment')),
  credits int NOT NULL, -- positive for purchase/refund, negative for deduction
  session_id uuid REFERENCES sessions(id), -- linked session if deduction
  stripe_payment_intent_id text, -- linked Stripe charge if purchase
  notes text,
  created_at timestamptz DEFAULT now()
);

-- ═══ TUTOR PAYOUTS ═══
-- Individual payment records per session
CREATE TABLE tutor_payouts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tutor_id uuid NOT NULL REFERENCES profiles(id),
  session_id uuid NOT NULL REFERENCES sessions(id),
  amount decimal(10,2) NOT NULL, -- net amount after commission
  commission decimal(10,2) NOT NULL, -- Tuterly's cut
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'failed')),
  payout_batch_id text, -- groups payouts into weekly batches
  stripe_transfer_id text, -- Stripe Connect transfer ID
  paid_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- ═══ TUTOR STRIPE ACCOUNTS ═══
-- Links tutors to their Stripe Connect accounts
CREATE TABLE tutor_stripe_accounts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tutor_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_account_id text NOT NULL, -- acct_... from Stripe Connect
  onboarding_complete boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(tutor_id)
);

-- ═══ INVOICES ═══
-- Parent-facing invoice records
CREATE TABLE invoices (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id uuid NOT NULL REFERENCES profiles(id),
  type text NOT NULL CHECK (type IN ('subscription', 'session_pack', 'refund')),
  amount decimal(10,2) NOT NULL,
  description text,
  stripe_invoice_id text,
  stripe_payment_intent_id text,
  pdf_url text,
  status text DEFAULT 'paid' CHECK (status IN ('paid', 'pending', 'failed', 'refunded')),
  created_at timestamptz DEFAULT now()
);

-- ═══ SESSION PACK PRICING ═══
-- Configurable pack sizes and prices
CREATE TABLE session_packs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  sessions int NOT NULL,
  price decimal(10,2) NOT NULL, -- total price parent pays
  per_session decimal(10,2) NOT NULL, -- calculated per-session rate
  savings decimal(10,2) DEFAULT 0, -- discount vs single session
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Insert default packs
INSERT INTO session_packs (name, sessions, price, per_session, savings) VALUES
  ('Starter', 5, 350.00, 70.00, 0),
  ('Standard', 10, 670.00, 67.00, 30.00),
  ('Term', 20, 1280.00, 64.00, 120.00);

-- ═══ ADD COLUMNS TO EXISTING TABLES ═══

-- Add rate and commission fields to tutor_students or profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS hourly_rate decimal(10,2);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_customer_id text;

-- Add payment tracking to sessions
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS parent_credit_deducted boolean DEFAULT false;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS tutor_payout_id uuid REFERENCES tutor_payouts(id);

-- ═══ INDEXES ═══
CREATE INDEX idx_credits_parent ON credits(parent_id);
CREATE INDEX idx_credit_tx_parent ON credit_transactions(parent_id);
CREATE INDEX idx_tutor_payouts_tutor ON tutor_payouts(tutor_id);
CREATE INDEX idx_tutor_payouts_status ON tutor_payouts(status);
CREATE INDEX idx_tutor_payouts_batch ON tutor_payouts(payout_batch_id);
CREATE INDEX idx_invoices_parent ON invoices(parent_id);

-- ═══ RLS POLICIES ═══
ALTER TABLE credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_stripe_accounts ENABLE ROW LEVEL SECURITY;

-- Parents see own credits
CREATE POLICY "Parents view own credits" ON credits FOR SELECT USING (parent_id = auth.uid());
CREATE POLICY "Parents view own transactions" ON credit_transactions FOR SELECT USING (parent_id = auth.uid());
CREATE POLICY "Parents view own invoices" ON invoices FOR SELECT USING (parent_id = auth.uid());

-- Tutors see own payouts
CREATE POLICY "Tutors view own payouts" ON tutor_payouts FOR SELECT USING (tutor_id = auth.uid());
CREATE POLICY "Tutors view own stripe account" ON tutor_stripe_accounts FOR SELECT USING (tutor_id = auth.uid());
```

---

## Phase 2: Stripe Setup Files

### lib/stripe.js - Server-side Stripe client
```javascript
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});
```

### lib/stripe-client.js - Client-side Stripe
```javascript
import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};
```

---

## Phase 3: API Routes

### 1. POST /api/payments/create-subscription
Parent subscribes to $29/month plan.

```
Input: { parentId, paymentMethodId }
Process:
  1. Create Stripe Customer (if not exists)
  2. Attach payment method
  3. Create Stripe Subscription ($29/month)
  4. Save stripe_customer_id to profiles table
  5. Return subscription details
```

### 2. POST /api/payments/purchase-pack
Parent buys a session pack.

```
Input: { parentId, packId }
Process:
  1. Look up pack price from session_packs table
  2. Charge parent's card via Stripe (using saved payment method)
  3. Add credits to credits table
  4. Create credit_transaction (type: 'purchase')
  5. Create invoice record
  6. Return updated credit balance
```

### 3. POST /api/payments/auto-topup
Triggered when credits hit 0.

```
Input: { parentId }
Process:
  1. Look up parent's pack_size and stripe_payment_method_id
  2. Look up pack price
  3. Charge card
  4. If successful: add credits, create transaction, create invoice
  5. If failed: email parent, set retry flag, pause future sessions
  6. Retry failed payments after 3 days
```

### 4. POST /api/sessions/complete
THE MAIN TRIGGER - called when tutor submits notes and report is generated.

```
Input: { sessionId }
Process:
  1. Generate report (existing Claude API call)
  2. Save report to database
  
  3. DEDUCT CREDIT
     - Get parent_id from student linked to session
     - Decrement credits_remaining
     - Create credit_transaction (type: 'deduction', session_id)
     - If credits_remaining = 1: email parent "1 session left"
     - If credits_remaining = 0: trigger auto-topup
  
  4. QUEUE TUTOR PAYMENT
     - Get tutor's hourly_rate
     - Calculate commission (15%)
     - Create tutor_payout record (status: 'pending')
     - Link payout to session
  
  5. NOTIFY PARENT
     - Send email: "Session report ready for [student]"
     - Include link to view report
  
  6. UPDATE SESSION
     - Set parent_credit_deducted = true
     - Set status = 'sent_to_parent'
```

### 5. POST /api/payments/process-payouts
Weekly batch payout to tutors (run every Friday via cron).

```
Process:
  1. Get all tutor_payouts with status = 'pending'
  2. Group by tutor_id
  3. For each tutor:
     - Sum all pending amounts
     - Create Stripe Connect Transfer to tutor's connected account
     - Update all payout records: status = 'paid', stripe_transfer_id
     - Email tutor: "Payment of $X for Y sessions sent"
  4. Log batch results
```

### 6. POST /api/stripe/connect-onboard
Tutor sets up their Stripe Connect account to receive payouts.

```
Input: { tutorId }
Process:
  1. Create Stripe Connect Express account
  2. Save stripe_account_id to tutor_stripe_accounts
  3. Generate onboarding link
  4. Return link (tutor completes bank details on Stripe's hosted page)
```

### 7. POST /api/stripe/webhook
Handles Stripe webhook events.

```
Events to handle:
  - invoice.payment_succeeded → update subscription status
  - invoice.payment_failed → notify parent, pause sessions
  - payment_intent.succeeded → confirm pack purchase
  - payment_intent.payment_failed → handle failed top-up
  - account.updated → update tutor onboarding status
```

---

## Phase 4: Cron Jobs

### 1. Weekly tutor payouts (every Sunday at 10am AEST)
```
Route: /api/cron/process-payouts
Schedule: 0 0 * * 0 (every Sunday midnight UTC = 10am AEST, but only process every week)
Action: Process all approved tutor payouts via Stripe Connect
Note: Payouts only process AFTER the weekly review window closes (Saturday midnight)
```

### 2. Retry failed payments (daily)
```
Route: /api/cron/retry-payments
Schedule: 0 2 * * * (daily at 2am UTC)
Action: Find failed auto-topups older than 3 days, retry charge
```

### 3. Low credit reminders (daily)
```
Route: /api/cron/credit-reminders
Schedule: 0 21 * * * (daily at 7am AEST)
Action: Email parents with 1 credit remaining
```

### 4. Tutor session reminders (daily at 9pm AEST)
```
Route: /api/cron/tutor-reminders
Schedule: 0 11 * * * (9pm AEST)
Action: Email tutors who had sessions today but haven't submitted notes
```

Set up cron in vercel.json:
```json
{
  "crons": [
    { "path": "/api/cron/process-payouts", "schedule": "0 0 * * 0" },
    { "path": "/api/cron/retry-payments", "schedule": "0 2 * * *" },
    { "path": "/api/cron/credit-reminders", "schedule": "0 21 * * *" },
    { "path": "/api/cron/tutor-reminders", "schedule": "0 11 * * *" },
    { "path": "/api/cron/open-review-window", "schedule": "0 21 * * 5" }
  ]
}
```

---

## Phase 4B: Duplicate Report Protection

Prevent tutors from accidentally (or intentionally) generating multiple reports for the same session.

### Guards to implement:

**1. One report per session**
```
Before generating a report, check:
- Does this session_id already have a report in the reports table?
- If yes: show error "A report has already been generated for this session"
- Allow editing the existing report, but don't create a new one or deduct another credit
```

**2. Session date validation**
```
- Tutors can only create sessions for today or the past 7 days
- Cannot create a session for a future date
- Cannot create a session for more than 7 days ago (must contact admin)
```

**3. Duplicate session detection**
```
Before creating a new session, check:
- Is there already a session for the same student + same date?
- If yes: warn "You already have a session logged for [student] on [date]. Did you mean to edit that one?"
- Allow override but flag it for admin review
```

**4. Rate limiting**
```
- Max 1 report generation per session_id (hard block)
```

**5. Session duration validation**
```
- Default session: 60 minutes
- Allowed: 30, 45, 60, 90, 120 minutes
- Anything outside this range requires admin approval
- Duration affects payout amount if tutors charge different rates for different durations
```

---

## Phase 4C: Weekly Review Window

Every fortnight, before payouts are processed, tutors get a window to review and correct their sessions.

### How it works:

```
Week 1 (sessions happen)
    ↓
Week 2 (more sessions happen)
    ↓
Friday 7pm AEST - Review window opens
    - Tutor gets email: "Review your sessions for the past week"
    - Dashboard shows: "Payout review - please confirm by Saturday midnight"
    ↓
Tutor reviews:
    - List of all sessions in the pay period
    - Can edit: session duration, date corrections
    - Can flag: "This session was cancelled" or "Wrong duration logged"
    - Can add notes: "Student was 15 min late, only charged for 45 min"
    - Must click "Confirm" to approve their timesheet
    ↓
Saturday midnight - Review window closes
    - If tutor confirmed: sessions marked as "approved"
    - If tutor didn't confirm: sessions auto-approved (assumed correct)
    - Admin gets summary of any edits/flags for review
    ↓
Sunday morning - Payouts process
    - Only "approved" sessions are paid
    - Flagged sessions held for admin review
```

### Database additions:

```sql
-- Add review status to sessions
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS review_status text 
  DEFAULT 'pending' CHECK (review_status IN ('pending', 'confirmed', 'disputed', 'adjusted'));
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS review_notes text;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS original_duration int; -- if duration was changed during review

-- Pay periods
CREATE TABLE pay_periods (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  start_date date NOT NULL,
  end_date date NOT NULL,
  review_opens_at timestamptz,
  review_closes_at timestamptz,
  payout_date date,
  status text DEFAULT 'open' CHECK (status IN ('open', 'review', 'processing', 'paid')),
  created_at timestamptz DEFAULT now()
);
```

### Tutor review dashboard:

```
Pay Period: May 5 - May 18

Review window: Open until Saturday May 19 at midnight
Status: 3 of 14 sessions need confirmation

Sessions:
✓ May 5 - Julian M. (60 min) - $60 - Confirmed
✓ May 5 - Mia S. (60 min) - $60 - Confirmed  
✓ May 7 - Julian M. (60 min) - $60 - Confirmed
○ May 8 - Lachlan D. (60 min) - $60 - [Confirm] [Edit] [Flag]
○ May 10 - Julian M. (60 min) - $60 - [Confirm] [Edit] [Flag]
...

[Edit] opens: change duration, add notes
[Flag] opens: "Session cancelled", "Wrong duration", "Other issue"

[Confirm All Remaining] button at bottom

Total this period: 14 sessions - $714 net (after commission)
Payout date: Sunday May 20
```

### Admin review dashboard:

```
Pay Period: May 5 - May 18

Tutor summaries:
Sarah T. - 14 sessions - $714 - All confirmed ✓
James W. - 10 sessions - $510 - All confirmed ✓
Emily K. - 8 sessions - $408 - 1 flagged ⚠️
  → May 12 flagged: "Student cancelled last minute, only did 30 min"
  → Action: [Approve adjustment] [Reject] [Contact tutor]

[Process all approved payouts] button
```

---

## Phase 5: Dashboard Components

### Parent Dashboard - Credits Section
```
Components needed:
- CreditBalance.jsx - shows remaining credits, pack size, auto-topup toggle
- PurchasePack.jsx - select and buy a session pack
- TransactionHistory.jsx - list of purchases, deductions, refunds
- InvoiceList.jsx - downloadable invoices/receipts
```

### Tutor Dashboard - Payments Section
```
Components needed:
- PayoutSummary.jsx - pending amount, next payout date
- PayoutHistory.jsx - past payouts with amounts and dates
- StripeConnectSetup.jsx - onboarding flow for bank details
- PendingReports.jsx - sessions needing notes (with payment amount shown)
```

### Admin Dashboard - Financials
```
Components needed:
- RevenueOverview.jsx - total revenue, subscriptions, session revenue
- PayoutQueue.jsx - upcoming tutor payouts, approve/hold
- FailedPayments.jsx - parents with failed charges
- CreditOverview.jsx - total credits outstanding across all parents
```

---

## Phase 6: Email Templates (Resend)

### 1. Session report ready
```
To: parent
Subject: "[Student]'s session report is ready"
Body: Summary of session + link to view full report
```

### 2. Low credits warning
```
To: parent  
Subject: "You have 1 session remaining"
Body: "Your next session will trigger an auto top-up of [pack size] sessions ($[amount])"
```

### 3. Auto top-up successful
```
To: parent
Subject: "Session pack topped up - [X] sessions added"
Body: Receipt details + new credit balance
```

### 4. Payment failed
```
To: parent
Subject: "Action needed - payment for session pack failed"
Body: "Please update your card to continue sessions" + link to update
```

### 5. Tutor payout sent
```
To: tutor
Subject: "Payment of $[amount] sent for [X] sessions"
Body: Breakdown of sessions + total amount + expected arrival date
```

### 6. Tutor notes reminder
```
To: tutor
Subject: "You have [X] sessions awaiting notes"
Body: List of students + "Submit notes to release payment" + links
```

---

## Build Order

1. **Database schema** - run the SQL (30 min)
2. **lib/stripe.js setup** - Stripe client files (15 min)
3. **POST /api/sessions/complete** - the main trigger chain (2-3 hours)
   - This is the core: report → credit deduction → tutor payout → parent notification
4. **POST /api/payments/purchase-pack** - buying session packs (1-2 hours)
5. **POST /api/payments/create-subscription** - $29/month subscription (1 hour)
6. **POST /api/stripe/webhook** - handle Stripe events (1-2 hours)
7. **Parent dashboard components** - credits, transactions, invoices (2-3 hours)
8. **Tutor dashboard components** - payouts, pending reports (2 hours)
9. **POST /api/stripe/connect-onboard** - tutor bank setup (1-2 hours)
10. **POST /api/payments/process-payouts** - weekly batch payout (1-2 hours)
11. **Cron jobs** - reminders, retries, payouts (1-2 hours)
12. **Email templates** - all 6 templates (1-2 hours)
13. **Admin dashboard** - revenue overview, payout queue (2-3 hours)
14. **Testing** - end-to-end payment flow testing (2-3 hours)

**Total estimated build time: 20-30 hours across Claude Code sessions**

---

## Testing Checklist

Use Stripe test mode for all testing:

- [ ] Parent can subscribe to $29/month plan
- [ ] Parent can purchase a 5/10/20 session pack
- [ ] Credit balance updates correctly after purchase
- [ ] Tutor submits notes → report generates → credit deducts → payout queued
- [ ] Parent receives email when report is ready
- [ ] Low credit warning email sends at 1 remaining
- [ ] Auto top-up triggers at 0 credits
- [ ] Failed payment handling works (use Stripe test card 4000000000000002)
- [ ] Tutor receives weekly payout
- [ ] Tutor payout amount is correct (rate minus 15% commission)
- [ ] Invoices are generated and downloadable
- [ ] Admin can view all financials
- [ ] Cron jobs fire on schedule

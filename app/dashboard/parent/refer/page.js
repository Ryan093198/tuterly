import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import ParentReferralPanel from "@/components/ParentReferralPanel";

// Refer-a-friend page for parents. The panel loads its own data from
// /api/referral/{code,list} so this is a thin wrapper — keeps the
// admin-DB access (referral code generation, referrals query) inside
// the API routes where auth is enforced.

export default async function ParentReferPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  return (
    <div className="px-4 sm:px-8 py-8 sm:py-10 max-w-3xl mx-auto space-y-8 animate-fade-in-up">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Refer a friend</h1>
        <p className="text-sm text-muted">
          Earn $20 off your next Tuterly invoice for every parent who joins
          on your link, the moment their child has their first session.
        </p>
      </header>

      <ParentReferralPanel />
    </div>
  );
}

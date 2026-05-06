import { createClient } from "@supabase/supabase-js";

// Server-side service-role client. Never expose to the browser — bypasses RLS.
// Use only for trusted operations (invite token lookup, signup webhook handling).
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );
}

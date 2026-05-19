import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import DirectoryClient from "@/components/DirectoryClient";
import { SITE_URL } from "@/lib/site";

const TITLE = "Find a Tutor Near You | Tuterly Tutor Directory Melbourne";
const DESCRIPTION =
  "Browse experienced tutors across Melbourne. Find a tutor by suburb, subject, and year level. No agency markups - tutors set their own rates.";
const URL = `${SITE_URL}/directory`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// /directory is a public marketing page, but its UX changes once the
// parent has signed in: prices unlock, the trial-signup CTA flips to
// an "Enquire about this tutor" form pre-filled with their details.
//
// We resolve the viewer here (server-side) and pass a small `viewer`
// prop to the client component. Anonymous visitors get an empty viewer
// and the existing teaser layout.

export default async function DirectoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let viewer = null;
  if (user?.email) {
    // Pull the parent's display name from profiles. Best-effort — if
    // their profile row hasn't been provisioned yet (rare race) we
    // still treat them as authed for price-reveal purposes.
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", user.id)
      .maybeSingle();

    // Pull the child's year level from the worksheet email signup
    // (captured during the email gate on /worksheets). The signups
    // table is service-role-only, so use the admin client.
    let childYearLevel = null;
    try {
      const admin = createAdminClient();
      const { data: signup } = await admin
        .from("worksheet_email_signups")
        .select("year_level")
        .eq("email", user.email.toLowerCase())
        .maybeSingle();
      childYearLevel = signup?.year_level ?? null;
    } catch {
      // worksheet_email_signups may not exist on every environment yet —
      // gracefully fall through with null.
    }

    viewer = {
      email: profile?.email || user.email,
      fullName: profile?.full_name || null,
      childYearLevel,
    };
  }

  return <DirectoryClient viewer={viewer} />;
}

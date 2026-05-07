import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

export default async function DashboardIndex() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If this user has any unaccepted invites for their email address, route
  // through invite acceptance first. Catches the case where someone signs up
  // cold (not via the invite link) and their role doesn't match the invite.
  if (user?.email) {
    const admin = createAdminClient();
    const { data: pending } = await admin
      .from("invites")
      .select("token, expires_at")
      .eq("to_email", user.email.toLowerCase())
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (pending && new Date(pending.expires_at) > new Date()) {
      redirect(`/invite/${pending.token}`);
    }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  switch (profile?.role) {
    case "tutor":
      redirect("/dashboard/tutor");
    case "admin":
      redirect("/dashboard/admin");
    case "student":
      redirect("/dashboard/student");
    case "parent":
    default:
      redirect("/dashboard/parent");
  }
}
